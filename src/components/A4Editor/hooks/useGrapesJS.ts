import { useEffect, useRef, useState, useCallback } from 'react';

// Type definitions for GrapesJS
interface GrapesJSEditor {
  getHtml: () => string;
  getCss: () => string;
  setComponents: (html: string) => void;
  on: (event: string, callback: (...args: any[]) => void) => void;
  off: (event: string, callback: (...args: any[]) => void) => void;
  destroy: () => void;
  render: () => void;
  getWrapper: () => any;
  DomComponents: any;
  BlockManager: any;
  Panels: any;
  Canvas: any;
}

interface UseGrapesJSOptions {
  /** Container element ID for GrapesJS */
  containerId: string;
  /** Initial HTML content */
  initialContent?: string;
  /** Callback when content changes */
  onUpdate?: (html: string) => void;
  /** Whether the editor is read-only */
  editable?: boolean;
  /** A4 dimensions configuration */
  a4Config?: {
    width: number; // in mm
    height: number; // in mm
    margin: number; // in mm
  };
}

interface UseGrapesJSReturn {
  /** Whether GrapesJS is loaded and ready */
  isReady: boolean;
  /** Whether GrapesJS is currently loading */
  isLoading: boolean;
  /** Any error that occurred during initialization */
  error: Error | null;
  /** Get current HTML content */
  getContent: () => string;
  /** Set HTML content */
  setContent: (html: string) => void;
  /** GrapesJS editor instance (for advanced usage) */
  editor: GrapesJSEditor | null;
}

// Default A4 configuration
const DEFAULT_A4_CONFIG = {
  width: 210, // mm
  height: 297, // mm
  margin: 25, // mm
};

// Convert mm to pixels (assuming 96 DPI)
const mmToPx = (mm: number): number => mm * 3.779527559;

/**
 * Custom hook for GrapesJS integration with A4Editor
 * Handles lazy loading, initialization, and cleanup
 */
export function useGrapesJS({
  containerId,
  initialContent = '',
  onUpdate,
  editable = true,
  a4Config = DEFAULT_A4_CONFIG,
}: UseGrapesJSOptions): UseGrapesJSReturn {
  const editorRef = useRef<GrapesJSEditor | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const onUpdateRef = useRef(onUpdate);

  // Keep onUpdate ref current
  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  // Calculate dimensions
  const canvasWidth = mmToPx(a4Config.width);
  const canvasHeight = mmToPx(a4Config.height);

  // Initialize GrapesJS
  useEffect(() => {
    let mounted = true;
    let editor: GrapesJSEditor | null = null;

    const initGrapesJS = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Lazy load GrapesJS
        const grapesjs = (await import('grapesjs')).default;

        // Also import the CSS
        await import('grapesjs/dist/css/grapes.min.css');

        if (!mounted) return;

        const container = document.getElementById(containerId);
        if (!container) {
          throw new Error(`Container element with id "${containerId}" not found`);
        }

        // Initialize GrapesJS editor
        editor = grapesjs.init({
          container: `#${containerId}`,
          height: '100%',
          width: 'auto',
          fromElement: false,
          storageManager: false, // Disable local storage

          // Canvas configuration for A4
          deviceManager: {
            devices: [
              {
                id: 'a4',
                name: 'A4 Page',
                width: `${canvasWidth}px`,
                height: `${canvasHeight}px`,
              },
            ],
          },

          // Canvas styling
          canvas: {
            styles: [
              // A4 page styling
              `
                body {
                  background-color: #EDF1F5 !important;
                  padding: 24px !important;
                  min-height: 100%;
                }
                .gjs-dashed *[data-gjs-highlightable] {
                  outline: 1px dashed rgba(53, 96, 193, 0.3);
                }
              `,
            ],
          },

          // Style manager configuration
          styleManager: {
            sectors: [
              {
                name: 'Dimension',
                open: false,
                buildProps: ['width', 'min-height', 'padding', 'margin'],
              },
              {
                name: 'Typography',
                open: true,
                buildProps: ['font-family', 'font-size', 'font-weight', 'color', 'text-align', 'line-height'],
              },
              {
                name: 'Background',
                open: false,
                buildProps: ['background-color', 'background-image'],
              },
              {
                name: 'Border',
                open: false,
                buildProps: ['border', 'border-radius', 'box-shadow'],
              },
            ],
          },

          // Panels configuration
          panels: {
            defaults: [
              {
                id: 'panel-devices',
                el: '.panel__devices',
                buttons: [],
              },
              {
                id: 'basic-actions',
                el: '.panel__basic-actions',
                buttons: [
                  {
                    id: 'visibility',
                    active: true,
                    className: 'btn-toggle-borders',
                    label: '<span class="gjs-pn-btn-icon">&#9633;</span>',
                    command: 'sw-visibility',
                  },
                  {
                    id: 'preview',
                    className: 'btn-preview',
                    label: '<span class="gjs-pn-btn-icon">&#9655;</span>',
                    command: 'preview',
                  },
                  {
                    id: 'undo',
                    className: 'btn-undo',
                    label: '<span class="gjs-pn-btn-icon">&#8630;</span>',
                    command: 'core:undo',
                  },
                  {
                    id: 'redo',
                    className: 'btn-redo',
                    label: '<span class="gjs-pn-btn-icon">&#8631;</span>',
                    command: 'core:redo',
                  },
                ],
              },
            ],
          },
        }) as GrapesJSEditor;

        if (!mounted) {
          editor.destroy();
          return;
        }

        // Add custom A4 page wrapper component
        addA4PageComponent(editor, canvasWidth, canvasHeight, a4Config.margin);

        // Add custom blocks
        addCustomBlocks(editor);

        // Set initial content
        if (initialContent) {
          editor.setComponents(initialContent);
        } else {
          // Set default A4 page structure
          setDefaultA4Structure(editor, canvasHeight, a4Config.margin);
        }

        // Handle content changes
        const handleChange = () => {
          if (onUpdateRef.current) {
            const html = editor?.getHtml() || '';
            onUpdateRef.current(html);
          }
        };

        editor.on('component:update', handleChange);
        editor.on('component:add', handleChange);
        editor.on('component:remove', handleChange);

        // Set editability
        if (!editable) {
          editor.getWrapper().set('badgable', false);
          editor.getWrapper().set('hoverable', false);
          editor.getWrapper().set('selectable', false);
        }

        editorRef.current = editor;
        setIsReady(true);
        setIsLoading(false);
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to initialize GrapesJS'));
          setIsLoading(false);
        }
      }
    };

    initGrapesJS();

    return () => {
      mounted = false;
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
      setIsReady(false);
    };
  }, [containerId, a4Config.width, a4Config.height, a4Config.margin, editable]);

  // Get content callback
  const getContent = useCallback((): string => {
    if (editorRef.current) {
      return editorRef.current.getHtml();
    }
    return '';
  }, []);

  // Set content callback
  const setContent = useCallback((html: string): void => {
    if (editorRef.current) {
      editorRef.current.setComponents(html);
    }
  }, []);

  return {
    isReady,
    isLoading,
    error,
    getContent,
    setContent,
    editor: editorRef.current,
  };
}

/**
 * Add A4 page component to GrapesJS
 */
function addA4PageComponent(
  editor: GrapesJSEditor,
  width: number,
  height: number,
  margin: number
) {
  const marginPx = mmToPx(margin);

  editor.DomComponents.addType('a4-page', {
    model: {
      defaults: {
        tagName: 'div',
        draggable: false,
        droppable: true,
        removable: false,
        copyable: false,
        attributes: { class: 'a4-page' },
        styles: `
          .a4-page {
            width: ${width}px;
            min-height: ${height}px;
            background: #FFFFFF;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            padding: ${marginPx}px;
            margin: 0 auto;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 16px;
            line-height: 1.6;
            color: #161616;
          }
        `,
      },
    },
  });
}

/**
 * Add custom blocks for A4 document building
 */
function addCustomBlocks(editor: GrapesJSEditor) {
  const bm = editor.BlockManager;

  // Clear default blocks
  bm.getAll().reset();

  // Text block
  bm.add('text-block', {
    label: 'Text',
    category: 'Basic',
    content: '<p style="margin: 0 0 16px 0;">Enter your text here...</p>',
    media: '<svg viewBox="0 0 24 24" width="40" height="40"><path fill="currentColor" d="M5 4v3h5.5v12h3V7H19V4z"/></svg>',
  });

  // Heading block
  bm.add('heading-block', {
    label: 'Heading',
    category: 'Basic',
    content: '<h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 600;">Heading</h1>',
    media: '<svg viewBox="0 0 24 24" width="40" height="40"><path fill="currentColor" d="M5 4v3h5.5v12h3V7H19V4z"/></svg>',
  });

  // Subheading block
  bm.add('subheading-block', {
    label: 'Subheading',
    category: 'Basic',
    content: '<h2 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">Subheading</h2>',
    media: '<svg viewBox="0 0 24 24" width="40" height="40"><path fill="currentColor" d="M5 4v3h5.5v12h3V7H19V4z"/></svg>',
  });

  // Image block
  bm.add('image-block', {
    label: 'Image',
    category: 'Basic',
    content: {
      type: 'image',
      style: {
        'max-width': '100%',
        height: 'auto',
        'margin-bottom': '16px',
      },
      attributes: {
        src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgMTUwIDE1MCI+PHJlY3QgZmlsbD0iI2U5ZWNlZiIgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiLz48dGV4dCBmaWxsPSIjYWRiNWJkIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlPC90ZXh0Pjwvc3ZnPg==',
        alt: 'Placeholder image',
      },
    },
    media: '<svg viewBox="0 0 24 24" width="40" height="40"><path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>',
  });

  // Two columns block
  bm.add('two-columns', {
    label: '2 Columns',
    category: 'Layout',
    content: `
      <div style="display: flex; gap: 24px; margin-bottom: 16px;">
        <div style="flex: 1; min-height: 50px; padding: 12px; background: #f8f9fa; border-radius: 4px;">Column 1</div>
        <div style="flex: 1; min-height: 50px; padding: 12px; background: #f8f9fa; border-radius: 4px;">Column 2</div>
      </div>
    `,
    media: '<svg viewBox="0 0 24 24" width="40" height="40"><path fill="currentColor" d="M10 18h5V5h-5v13zm-6 0h5V5H4v13zM16 5v13h5V5h-5z"/></svg>',
  });

  // Three columns block
  bm.add('three-columns', {
    label: '3 Columns',
    category: 'Layout',
    content: `
      <div style="display: flex; gap: 16px; margin-bottom: 16px;">
        <div style="flex: 1; min-height: 50px; padding: 12px; background: #f8f9fa; border-radius: 4px;">Col 1</div>
        <div style="flex: 1; min-height: 50px; padding: 12px; background: #f8f9fa; border-radius: 4px;">Col 2</div>
        <div style="flex: 1; min-height: 50px; padding: 12px; background: #f8f9fa; border-radius: 4px;">Col 3</div>
      </div>
    `,
    media: '<svg viewBox="0 0 24 24" width="40" height="40"><path fill="currentColor" d="M2 20h5V4H2v16zm6 0h5V4H8v16zm6 0h5V4h-5v16z"/></svg>',
  });

  // Container/Section block
  bm.add('section-block', {
    label: 'Section',
    category: 'Layout',
    content: `
      <div style="padding: 24px; margin-bottom: 16px; background: #f8f9fa; border-radius: 4px; min-height: 100px;">
        <p style="margin: 0; color: #6c757d;">Drop content here...</p>
      </div>
    `,
    media: '<svg viewBox="0 0 24 24" width="40" height="40"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>',
  });

  // Divider block
  bm.add('divider-block', {
    label: 'Divider',
    category: 'Basic',
    content: '<hr style="border: none; border-top: 1px solid #E0E0E0; margin: 24px 0;">',
    media: '<svg viewBox="0 0 24 24" width="40" height="40"><path fill="currentColor" d="M4 11h16v2H4z"/></svg>',
  });

  // Quote block
  bm.add('quote-block', {
    label: 'Quote',
    category: 'Basic',
    content: `
      <blockquote style="margin: 0 0 16px 0; padding: 16px 24px; border-left: 4px solid #3560C1; background: #f8f9fa; font-style: italic;">
        "Enter your quote here..."
      </blockquote>
    `,
    media: '<svg viewBox="0 0 24 24" width="40" height="40"><path fill="currentColor" d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/></svg>',
  });

  // List block
  bm.add('list-block', {
    label: 'List',
    category: 'Basic',
    content: `
      <ul style="margin: 0 0 16px 0; padding-left: 24px;">
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
      </ul>
    `,
    media: '<svg viewBox="0 0 24 24" width="40" height="40"><path fill="currentColor" d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',
  });

  // Table block
  bm.add('table-block', {
    label: 'Table',
    category: 'Basic',
    content: `
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <thead>
          <tr style="background: #f8f9fa;">
            <th style="padding: 12px; border: 1px solid #E0E0E0; text-align: left;">Header 1</th>
            <th style="padding: 12px; border: 1px solid #E0E0E0; text-align: left;">Header 2</th>
            <th style="padding: 12px; border: 1px solid #E0E0E0; text-align: left;">Header 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px; border: 1px solid #E0E0E0;">Cell 1</td>
            <td style="padding: 12px; border: 1px solid #E0E0E0;">Cell 2</td>
            <td style="padding: 12px; border: 1px solid #E0E0E0;">Cell 3</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #E0E0E0;">Cell 4</td>
            <td style="padding: 12px; border: 1px solid #E0E0E0;">Cell 5</td>
            <td style="padding: 12px; border: 1px solid #E0E0E0;">Cell 6</td>
          </tr>
        </tbody>
      </table>
    `,
    media: '<svg viewBox="0 0 24 24" width="40" height="40"><path fill="currentColor" d="M3 3v18h18V3H3zm8 16H5v-6h6v6zm0-8H5V5h6v6zm8 8h-6v-6h6v6zm0-8h-6V5h6v6z"/></svg>',
  });
}

/**
 * Set default A4 page structure
 */
function setDefaultA4Structure(
  editor: GrapesJSEditor,
  pageHeight: number,
  margin: number
) {
  const marginPx = mmToPx(margin);

  editor.setComponents(`
    <div class="a4-page" style="
      width: 100%;
      min-height: ${pageHeight - marginPx * 2}px;
      background: #FFFFFF;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #161616;
    ">
      <h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 600;">Document Title</h1>
      <p style="margin: 0 0 16px 0;">Start building your template by dragging blocks from the sidebar...</p>
    </div>
  `);
}

export default useGrapesJS;
