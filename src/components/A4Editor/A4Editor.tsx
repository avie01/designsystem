import React, { useState, useEffect, useId, useCallback } from 'react';
import { useEditor, EditorContent, Editor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import Icon from '../Icon/Icon';
import './PagedEditor.css';
import './styles/grapesjs-overrides.css';

/**
 * ODL Theme tokens for inline styles
 * Uses CSS variables for dynamic theming across light, dark, and high contrast modes
 */
const ODLTokens = {
  colors: {
    white: 'var(--odl-white, #FFFFFF)',
    wave: 'var(--odl-wave, #EDF1F5)',
    border: 'var(--odl-border, #E0E0E0)',
    textPrimary: 'var(--odl-text-primary, #161616)',
    textSecondary: 'var(--odl-text-secondary, #525252)',
    textTertiary: 'var(--odl-text-tertiary, #8D8D8D)',
    primary: 'var(--odl-primary, #3560C1)',
    primaryLight: 'var(--odl-primary-light, #E0F3FE)',
  },
  spacing: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
  },
  shadows: {
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  borderRadius: {
    base: '4px',
  },
  fontSize: {
    xs: '11px',
    sm: '12px',
    base: '14px',
    md: '16px',
  },
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", sans-serif',
  },
};

interface ToolbarProps {
  editor: Editor;
  onInsertImage?: () => void;
  onInsertTable?: () => void;
  toolbarRight?: React.ReactNode;
}

function Toolbar({ editor, onInsertImage, onInsertTable, toolbarRight }: ToolbarProps) {
  const editorState = useEditorState({
    editor,
    selector: ctx => ({
      isBold: ctx.editor.isActive('bold') ?? false,
      canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
      isItalic: ctx.editor.isActive('italic') ?? false,
      canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
      isUnderline: ctx.editor.isActive('underline') ?? false,
      canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
      isStrike: ctx.editor.isActive('strike') ?? false,
      canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
      isCode: ctx.editor.isActive('code') ?? false,
      canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
      isParagraph: ctx.editor.isActive('paragraph') ?? false,
      isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
      isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
      isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
      isBulletList: ctx.editor.isActive('bulletList') ?? false,
      isOrderedList: ctx.editor.isActive('orderedList') ?? false,
      isBlockquote: ctx.editor.isActive('blockquote') ?? false,
      isHighlight: ctx.editor.isActive('highlight') ?? false,
      isAlignLeft: ctx.editor.isActive({ textAlign: 'left' }) ?? false,
      isAlignCenter: ctx.editor.isActive({ textAlign: 'center' }) ?? false,
      isAlignRight: ctx.editor.isActive({ textAlign: 'right' }) ?? false,
      isSubscript: ctx.editor.isActive('subscript') ?? false,
      isSuperscript: ctx.editor.isActive('superscript') ?? false,
      canUndo: ctx.editor.can().chain().undo().run() ?? false,
      canRedo: ctx.editor.can().chain().redo().run() ?? false,
    }),
  });

  return (
    <div className="a4-toolbar">
      <div className="a4-toolbar-group">
        <button
          className={`a4-toolbar-button ${editorState.isBold ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          aria-label="Bold"
          aria-pressed={editorState.isBold}
          title="Bold (Ctrl+B)"
        >
          <Icon name="text-bold" size={18} />
        </button>
        <button
          className={`a4-toolbar-button ${editorState.isItalic ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          aria-label="Italic"
          aria-pressed={editorState.isItalic}
          title="Italic (Ctrl+I)"
        >
          <Icon name="text-italic" size={18} />
        </button>
        <button
          className={`a4-toolbar-button ${editorState.isUnderline ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editorState.canUnderline}
          aria-label="Underline"
          aria-pressed={editorState.isUnderline}
          title="Underline (Ctrl+U)"
        >
          <Icon name="text-underline" size={18} />
        </button>
        <button
          className={`a4-toolbar-button ${editorState.isStrike ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          aria-label="Strikethrough"
          aria-pressed={editorState.isStrike}
          title="Strikethrough"
        >
          <Icon name="text-strikethrough" size={18} />
        </button>
        <button
          className={`a4-toolbar-button ${editorState.isHighlight ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          aria-label="Highlight"
          aria-pressed={editorState.isHighlight}
          title="Highlight"
        >
          <Icon name="highlight" size={18} />
        </button>
      </div>

      <div className="a4-toolbar-divider" />

      <div className="a4-toolbar-group">
        <button
          className={`a4-toolbar-button ${editorState.isParagraph ? 'active' : ''}`}
          onClick={() => editor.chain().focus().setParagraph().run()}
          aria-label="Paragraph"
          aria-pressed={editorState.isParagraph}
          title="Paragraph"
        >
          <span className="a4-toolbar-label">P</span>
        </button>
        <button
          className={`a4-toolbar-button ${editorState.isHeading1 ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          aria-label="Heading 1"
          aria-pressed={editorState.isHeading1}
          title="Heading 1"
        >
          <span className="a4-toolbar-label">H1</span>
        </button>
        <button
          className={`a4-toolbar-button ${editorState.isHeading2 ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          aria-label="Heading 2"
          aria-pressed={editorState.isHeading2}
          title="Heading 2"
        >
          <span className="a4-toolbar-label">H2</span>
        </button>
        <button
          className={`a4-toolbar-button ${editorState.isHeading3 ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          aria-label="Heading 3"
          aria-pressed={editorState.isHeading3}
          title="Heading 3"
        >
          <span className="a4-toolbar-label">H3</span>
        </button>
      </div>

      <div className="a4-toolbar-divider" />

      <div className="a4-toolbar-group">
        <button
          className={`a4-toolbar-button ${editorState.isBulletList ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Bullet list"
          aria-pressed={editorState.isBulletList}
          title="Bullet List"
        >
          <Icon name="list-bulleted" size={18} />
        </button>
        <button
          className={`a4-toolbar-button ${editorState.isOrderedList ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Ordered list"
          aria-pressed={editorState.isOrderedList}
          title="Numbered List"
        >
          <Icon name="list-numbered" size={18} />
        </button>
        <button
          className={`a4-toolbar-button ${editorState.isBlockquote ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          aria-label="Blockquote"
          aria-pressed={editorState.isBlockquote}
          title="Blockquote"
        >
          <Icon name="quotes" size={18} />
        </button>
        <button
          className={`a4-toolbar-button ${editorState.isCode ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          aria-label="Inline code"
          aria-pressed={editorState.isCode}
          title="Inline Code"
        >
          <Icon name="code" size={18} />
        </button>
      </div>

      <div className="a4-toolbar-divider" />

      <div className="a4-toolbar-group">
        <button
          className={`a4-toolbar-button ${editorState.isAlignLeft ? 'active' : ''}`}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          aria-label="Align left"
          aria-pressed={editorState.isAlignLeft}
          title="Align Left"
        >
          <Icon name="text-align-left" size={18} />
        </button>
        <button
          className={`a4-toolbar-button ${editorState.isAlignCenter ? 'active' : ''}`}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          aria-label="Align center"
          aria-pressed={editorState.isAlignCenter}
          title="Align Center"
        >
          <Icon name="text-align-center" size={18} />
        </button>
        <button
          className={`a4-toolbar-button ${editorState.isAlignRight ? 'active' : ''}`}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          aria-label="Align right"
          aria-pressed={editorState.isAlignRight}
          title="Align Right"
        >
          <Icon name="text-align-right" size={18} />
        </button>
      </div>

      <div className="a4-toolbar-divider" />

      <div className="a4-toolbar-group">
        <button
          className={`a4-toolbar-button ${editorState.isSubscript ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          aria-label="Subscript"
          aria-pressed={editorState.isSubscript}
          title="Subscript"
        >
          <Icon name="text-subscript" size={18} />
        </button>
        <button
          className={`a4-toolbar-button ${editorState.isSuperscript ? 'active' : ''}`}
          onClick={() => editor.chain().focus().toggleSuperscript().run()}
          aria-label="Superscript"
          aria-pressed={editorState.isSuperscript}
          title="Superscript"
        >
          <Icon name="text-superscript" size={18} />
        </button>
      </div>

      <div className="a4-toolbar-divider" />

      <div className="a4-toolbar-group">
        <button
          className="a4-toolbar-button"
          onClick={() => {
            if (onInsertTable) {
              onInsertTable();
            } else {
              editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
            }
          }}
          aria-label="Insert table"
          title="Insert Table"
        >
          <Icon name="table" size={18} />
        </button>
        <button
          className="a4-toolbar-button"
          onClick={() => {
            if (onInsertImage) {
              onInsertImage();
            } else {
              const url = window.prompt('Enter image URL:');
              if (url) {
                editor.chain().focus().setImage({ src: url }).run();
              }
            }
          }}
          aria-label="Insert image"
          title="Insert Image"
        >
          <Icon name="image" size={18} />
        </button>
        <button
          className="a4-toolbar-button"
          onClick={() => {
            const url = window.prompt('Enter link URL:');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          aria-label="Insert link"
          title="Insert Link"
        >
          <Icon name="link" size={18} />
        </button>
        <button
          className="a4-toolbar-button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          aria-label="Horizontal rule"
          title="Horizontal Rule"
        >
          <Icon name="subtract" size={18} />
        </button>
      </div>

      <div className="a4-toolbar-divider" />

      <div className="a4-toolbar-group">
        <button
          className="a4-toolbar-button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
          aria-label="Undo"
          title="Undo (Ctrl+Z)"
        >
          <Icon name="undo" size={18} />
        </button>
        <button
          className="a4-toolbar-button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
          aria-label="Redo"
          title="Redo (Ctrl+Y)"
        >
          <Icon name="redo" size={18} />
        </button>
      </div>

      {toolbarRight && (
        <>
          <div className="a4-toolbar-spacer" />
          <div className="a4-toolbar-right">
            {toolbarRight}
          </div>
        </>
      )}
    </div>
  );
}

export interface A4EditorProps {
  /** Initial HTML content for the editor */
  initialContent?: string;
  /** Zoom level (50-200), defaults to 100 */
  zoom?: number;
  /** Placeholder text when editor is empty */
  placeholder?: string;
  /** Whether the editor is read-only */
  editable?: boolean;
  /** Callback when content changes */
  onUpdate?: (html: string) => void;
  /** External editor instance (optional - component creates its own if not provided) */
  editor?: Editor | null;
  /** Show loading state */
  isLoading?: boolean;
  /** Custom className for the wrapper */
  className?: string;
  /** Show/hide toolbar (default: true) */
  showToolbar?: boolean;
  /** Callback for custom image insertion */
  onInsertImage?: () => void;
  /** Callback for custom table insertion */
  onInsertTable?: () => void;
  /** Custom content to render on the right side of the toolbar */
  toolbarRight?: React.ReactNode;
  /** Enable GrapesJS drag-and-drop template builder mode */
  templateBuilder?: boolean;
}

/**
 * Global styles configuration for the template builder
 */
interface GlobalStyles {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
  fontFamily: string;
  fontSize: string;
  headingFont: string;
  lineHeight: string;
}

const defaultGlobalStyles: GlobalStyles = {
  primaryColor: '#3560C1',
  secondaryColor: '#E0F3FE',
  textColor: '#161616',
  backgroundColor: '#FFFFFF',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontSize: '16px',
  headingFont: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  lineHeight: '1.6',
};

const fontOptions = [
  { value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', label: 'System Default' },
  { value: '"Noto Sans", sans-serif', label: 'Noto Sans' },
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: '"Times New Roman", serif', label: 'Times New Roman' },
  { value: '"Courier New", monospace', label: 'Courier New' },
  { value: '"Helvetica Neue", Helvetica, sans-serif', label: 'Helvetica' },
];

const fontSizeOptions = [
  { value: '12px', label: '12px' },
  { value: '14px', label: '14px' },
  { value: '16px', label: '16px (Default)' },
  { value: '18px', label: '18px' },
  { value: '20px', label: '20px' },
];

const lineHeightOptions = [
  { value: '1.2', label: 'Tight (1.2)' },
  { value: '1.4', label: 'Normal (1.4)' },
  { value: '1.6', label: 'Relaxed (1.6)' },
  { value: '1.8', label: 'Loose (1.8)' },
  { value: '2', label: 'Double (2.0)' },
];

/**
 * GlobalStylesPanel - Panel for editing document-wide styles
 */
interface GlobalStylesPanelProps {
  styles: GlobalStyles;
  onChange: (styles: GlobalStyles) => void;
}

const GlobalStylesPanel: React.FC<GlobalStylesPanelProps> = ({ styles, onChange }) => {
  const handleChange = (key: keyof GlobalStyles, value: string) => {
    onChange({ ...styles, [key]: value });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px',
    fontSize: '13px',
    border: `1px solid ${ODLTokens.colors.border}`,
    borderRadius: '4px',
    backgroundColor: ODLTokens.colors.white,
    color: ODLTokens.colors.textPrimary,
    fontFamily: 'inherit',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 500,
    color: ODLTokens.colors.textSecondary,
    marginBottom: '4px',
  };

  const fieldStyle: React.CSSProperties = {
    marginBottom: '12px',
  };

  const colorInputStyle: React.CSSProperties = {
    width: '100%',
    height: '36px',
    padding: '2px',
    border: `1px solid ${ODLTokens.colors.border}`,
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const sectionStyle: React.CSSProperties = {
    padding: '12px',
    borderBottom: `1px solid ${ODLTokens.colors.border}`,
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    color: ODLTokens.colors.textTertiary,
    marginBottom: '12px',
  };

  return (
    <div>
      {/* Colors Section */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Colors</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Primary</label>
            <input
              type="color"
              value={styles.primaryColor}
              onChange={(e) => handleChange('primaryColor', e.target.value)}
              style={colorInputStyle}
              title="Primary color for links, buttons, accents"
            />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Secondary</label>
            <input
              type="color"
              value={styles.secondaryColor}
              onChange={(e) => handleChange('secondaryColor', e.target.value)}
              style={colorInputStyle}
              title="Secondary color for highlights, backgrounds"
            />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Text</label>
            <input
              type="color"
              value={styles.textColor}
              onChange={(e) => handleChange('textColor', e.target.value)}
              style={colorInputStyle}
              title="Main text color"
            />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Background</label>
            <input
              type="color"
              value={styles.backgroundColor}
              onChange={(e) => handleChange('backgroundColor', e.target.value)}
              style={colorInputStyle}
              title="Page background color"
            />
          </div>
        </div>
      </div>

      {/* Typography Section */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>Typography</div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Body Font</label>
          <select
            value={styles.fontFamily}
            onChange={(e) => handleChange('fontFamily', e.target.value)}
            style={inputStyle}
          >
            {fontOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Heading Font</label>
          <select
            value={styles.headingFont}
            onChange={(e) => handleChange('headingFont', e.target.value)}
            style={inputStyle}
          >
            {fontOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Font Size</label>
            <select
              value={styles.fontSize}
              onChange={(e) => handleChange('fontSize', e.target.value)}
              style={inputStyle}
            >
              {fontSizeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Line Height</label>
            <select
              value={styles.lineHeight}
              onChange={(e) => handleChange('lineHeight', e.target.value)}
              style={inputStyle}
            >
              {lineHeightOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div style={{ padding: '12px' }}>
        <button
          onClick={() => onChange(defaultGlobalStyles)}
          style={{
            width: '100%',
            padding: '8px 12px',
            fontSize: '13px',
            fontWeight: 500,
            color: ODLTokens.colors.textSecondary,
            backgroundColor: ODLTokens.colors.wave,
            border: `1px solid ${ODLTokens.colors.border}`,
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
};

/**
 * TemplateBuilder - GrapesJS-based drag-and-drop template builder
 * Lazy loaded to avoid bundle bloat when not using templateBuilder mode
 */
interface TemplateBuilderProps {
  initialContent?: string;
  onUpdate?: (html: string) => void;
  editable?: boolean;
  className?: string;
}

const TemplateBuilder: React.FC<TemplateBuilderProps> = ({
  initialContent = '',
  onUpdate,
  editable = true,
  className = '',
}) => {
  const containerId = useId().replace(/:/g, '-');
  const editorContainerId = `gjs-editor${containerId}`;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [globalStyles, setGlobalStyles] = useState<GlobalStyles>(defaultGlobalStyles);
  const [activePanel, setActivePanel] = useState<'styles' | 'global' | 'layers'>('global');
  const editorRef = React.useRef<any>(null);

  // Apply global styles to the GrapesJS canvas
  const applyGlobalStyles = useCallback((styles: GlobalStyles) => {
    const editor = editorRef.current;
    if (!editor) return;

    const frame = editor.Canvas.getFrameEl();
    if (!frame?.contentDocument) return;

    const doc = frame.contentDocument;

    // Create or update the global styles stylesheet
    let styleEl = doc.getElementById('global-template-styles');
    if (!styleEl) {
      styleEl = doc.createElement('style');
      styleEl.id = 'global-template-styles';
      doc.head.appendChild(styleEl);
    }

    styleEl.textContent = `
      :root {
        --template-primary: ${styles.primaryColor};
        --template-secondary: ${styles.secondaryColor};
        --template-text: ${styles.textColor};
        --template-bg: ${styles.backgroundColor};
        --template-font: ${styles.fontFamily};
        --template-heading-font: ${styles.headingFont};
        --template-font-size: ${styles.fontSize};
        --template-line-height: ${styles.lineHeight};
      }
      .a4-page-wrapper {
        background-color: ${styles.backgroundColor} !important;
        color: ${styles.textColor} !important;
        font-family: ${styles.fontFamily} !important;
        font-size: ${styles.fontSize} !important;
        line-height: ${styles.lineHeight} !important;
      }
      .a4-page-wrapper h1,
      .a4-page-wrapper h2,
      .a4-page-wrapper h3,
      .a4-page-wrapper h4,
      .a4-page-wrapper h5,
      .a4-page-wrapper h6 {
        font-family: ${styles.headingFont} !important;
        color: ${styles.textColor} !important;
      }
      .a4-page-wrapper a {
        color: ${styles.primaryColor} !important;
      }
      .a4-page-wrapper blockquote {
        border-left-color: ${styles.primaryColor} !important;
        background-color: ${styles.secondaryColor} !important;
      }
      .a4-page-wrapper table thead tr {
        background-color: ${styles.primaryColor} !important;
      }
      .a4-page-wrapper .badge,
      .a4-page-wrapper button:not([style*="background"]) {
        background-color: ${styles.primaryColor} !important;
      }
    `;
  }, []);

  // Handle global styles change
  const handleGlobalStylesChange = useCallback((newStyles: GlobalStyles) => {
    setGlobalStyles(newStyles);
    applyGlobalStyles(newStyles);
  }, [applyGlobalStyles]);

  useEffect(() => {
    let mounted = true;

    const initGrapesJS = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Lazy load GrapesJS
        const grapesjs = (await import('grapesjs')).default;
        await import('grapesjs/dist/css/grapes.min.css');

        if (!mounted) return;

        // Wait for DOM element to be ready
        await new Promise(resolve => setTimeout(resolve, 100));

        const container = document.getElementById(editorContainerId);
        if (!container) {
          throw new Error(`Container element not found`);
        }

        // A4 dimensions
        const A4_WIDTH_PX = 793.7; // 210mm
        const A4_HEIGHT_PX = 1122.5; // 297mm
        const MARGIN_PX = 94.5; // 25mm

        // Initialize GrapesJS
        const editor = grapesjs.init({
          container: `#${editorContainerId}`,
          height: '100%',
          width: 'auto',
          fromElement: false,
          storageManager: false,
          noticeOnUnload: false,

          // Device manager for A4
          deviceManager: {
            devices: [
              {
                id: 'a4',
                name: 'A4 Page',
                width: `${A4_WIDTH_PX}px`,
              },
            ],
          },

          // Panel manager
          panels: {
            defaults: [],
          },

          // Block manager categories
          blockManager: {
            appendTo: '#blocks-container' + containerId,
          },

          // Style manager
          styleManager: {
            appendTo: '#styles-container' + containerId,
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

          // Layer manager
          layerManager: {
            appendTo: '#layers-container' + containerId,
          },

          // Canvas styles
          canvas: {
            styles: [
              `
                body {
                  background-color: #EDF1F5 !important;
                  margin: 0 !important;
                  padding: 24px !important;
                }
                .a4-page-wrapper {
                  width: ${A4_WIDTH_PX}px;
                  min-height: ${A4_HEIGHT_PX}px;
                  background: #FFFFFF;
                  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                  padding: ${MARGIN_PX}px;
                  margin: 0 auto;
                  box-sizing: border-box;
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                  font-size: 16px;
                  line-height: 1.6;
                  color: #161616;
                }
              `,
            ],
          },
        });

        if (!mounted) {
          editor.destroy();
          return;
        }

        // Add custom blocks
        addTemplateBlocks(editor);

        // Set initial content or default structure
        if (initialContent) {
          editor.setComponents(`
            <div class="a4-page-wrapper">
              ${initialContent}
            </div>
          `);
        } else {
          editor.setComponents(`
            <div class="a4-page-wrapper" data-gjs-type="wrapper" data-gjs-droppable="true" data-gjs-draggable="false" data-gjs-removable="false">
              <h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 600;">Document Title</h1>
              <p style="margin: 0 0 16px 0;">Drag and drop blocks from the sidebar to build your template...</p>
            </div>
          `);
        }

        // Handle content changes
        const handleChange = () => {
          if (onUpdate) {
            const wrapper = editor.getWrapper();
            const html = wrapper?.getInnerHTML() || '';
            onUpdate(html);
          }
        };

        editor.on('component:update', handleChange);
        editor.on('component:add', handleChange);
        editor.on('component:remove', handleChange);

        // Set editability
        if (!editable) {
          editor.getWrapper()?.set({
            badgable: false,
            hoverable: false,
            selectable: false,
          });
        }

        editorRef.current = editor;
        setIsLoading(false);

        // Apply global styles after a short delay to ensure iframe is ready
        setTimeout(() => {
          if (mounted) {
            applyGlobalStyles(globalStyles);
          }
        }, 200);
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to initialize template builder'));
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
    };
  }, [editorContainerId, editable, applyGlobalStyles, globalStyles]);

  if (error) {
    return (
      <div className={`a4-template-builder ${className}`}>
        <div className="a4-template-builder-error">
          <svg className="a4-template-builder-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <div className="a4-template-builder-error-message">
            {error.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`a4-template-builder gjs-editor-wrapper ${className}`}>
      {/* Header */}
      <div className="a4-template-builder-header">
        <div className="a4-template-builder-header-title">Template Builder</div>
        <div className="a4-template-builder-header-actions">
          <span style={{ fontSize: '12px', color: ODLTokens.colors.textTertiary }}>
            Drag blocks from the sidebar to build your template
          </span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="a4-template-builder-main">
        {/* Left Sidebar - Blocks */}
        <div className="a4-template-builder-sidebar">
          <div style={{ padding: '12px 8px', borderBottom: `1px solid ${ODLTokens.colors.border}` }}>
            <div style={{
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: ODLTokens.colors.textPrimary
            }}>
              Blocks
            </div>
          </div>
          <div id={`blocks-container${containerId}`}></div>
        </div>

        {/* Canvas */}
        <div className="a4-template-builder-canvas">
          {isLoading && (
            <div className="a4-template-builder-loading">
              <div className="a4-template-builder-loading-spinner" />
              <span>Loading Template Builder...</span>
            </div>
          )}
          <div
            id={editorContainerId}
            style={{
              height: '100%',
              visibility: isLoading ? 'hidden' : 'visible',
            }}
          />
        </div>

        {/* Right Sidebar - Global Styles, Element Styles & Layers */}
        <div className="a4-template-builder-properties">
          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            borderBottom: `1px solid ${ODLTokens.colors.border}`,
          }}>
            <button
              onClick={() => setActivePanel('global')}
              style={{
                flex: 1,
                padding: '10px 8px',
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activePanel === 'global' ? ODLTokens.colors.white : ODLTokens.colors.wave,
                color: activePanel === 'global' ? ODLTokens.colors.primary : ODLTokens.colors.textSecondary,
                borderBottom: activePanel === 'global' ? `2px solid ${ODLTokens.colors.primary}` : '2px solid transparent',
                marginBottom: '-1px',
              }}
            >
              Global
            </button>
            <button
              onClick={() => setActivePanel('styles')}
              style={{
                flex: 1,
                padding: '10px 8px',
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activePanel === 'styles' ? ODLTokens.colors.white : ODLTokens.colors.wave,
                color: activePanel === 'styles' ? ODLTokens.colors.primary : ODLTokens.colors.textSecondary,
                borderBottom: activePanel === 'styles' ? `2px solid ${ODLTokens.colors.primary}` : '2px solid transparent',
                marginBottom: '-1px',
              }}
            >
              Element
            </button>
            <button
              onClick={() => setActivePanel('layers')}
              style={{
                flex: 1,
                padding: '10px 8px',
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activePanel === 'layers' ? ODLTokens.colors.white : ODLTokens.colors.wave,
                color: activePanel === 'layers' ? ODLTokens.colors.primary : ODLTokens.colors.textSecondary,
                borderBottom: activePanel === 'layers' ? `2px solid ${ODLTokens.colors.primary}` : '2px solid transparent',
                marginBottom: '-1px',
              }}
            >
              Layers
            </button>
          </div>

          {/* Global Styles Panel */}
          <div style={{ display: activePanel === 'global' ? 'block' : 'none' }}>
            <GlobalStylesPanel
              styles={globalStyles}
              onChange={handleGlobalStylesChange}
            />
          </div>

          {/* Element Styles Panel (GrapesJS) */}
          <div
            id={`styles-container${containerId}`}
            style={{ display: activePanel === 'styles' ? 'block' : 'none' }}
          />

          {/* Layers Panel (GrapesJS) */}
          <div
            id={`layers-container${containerId}`}
            style={{ display: activePanel === 'layers' ? 'block' : 'none' }}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Carbon-style SVG icons for GrapesJS blocks
 * Icons are 32x32 with centered paths
 */
const BlockIcons = {
  // Text & Typography
  text: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M25 4H7v2h7v18h4V6h7V4z"/></svg>',
  heading: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M25 4H7v2h7v18h4V6h7V4z"/></svg>',
  paragraph: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M27 4H13a7 7 0 000 14h4v10h2V6h4v22h2V6h2V4zm-14 12a5 5 0 010-10h4v10z"/></svg>',

  // Media
  image: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M19 14a3 3 0 10-3-3 3 3 0 003 3zm0-4a1 1 0 11-1 1 1 1 0 011-1z"/><path fill="currentColor" d="M26 4H6a2 2 0 00-2 2v20a2 2 0 002 2h20a2 2 0 002-2V6a2 2 0 00-2-2zm0 22H6v-6l5-5 5.59 5.59a2 2 0 002.82 0L21 19l5 5zm0-4.83l-3.59-3.59a2 2 0 00-2.82 0L18 19.17l-5.59-5.59a2 2 0 00-2.82 0L6 17.17V6h20z"/></svg>',
  video: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M21 26H4a2 2 0 01-2-2V8a2 2 0 012-2h17a2 2 0 012 2v4.06l5.42-3.87A1 1 0 0130 9v14a1 1 0 01-1.58.81L23 19.94V24a2 2 0 01-2 2zM4 8v16h17v-6a1 1 0 011.58-.81L28 21.06V10.94l-5.42 3.87A1 1 0 0121 14V8z"/></svg>',

  // Layout
  columns2: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M16 4H4v24h12V4zm-2 22H6V6h8zM28 4H18v24h10V4zm-2 22h-6V6h6z"/></svg>',
  columns3: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M12 4H4v24h8V4zm-2 22H6V6h4zM22 4h-8v24h8V4zm-2 22h-4V6h4zM28 4h-4v24h4V4z"/></svg>',
  columns4: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M10 4H4v24h6V4zm18 0h-6v24h6V4zM16 4h-4v24h4V4zM22 4h-4v24h4V4z"/></svg>',
  grid: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M14 4H4v10h10V4zm-2 8H6V6h6zM28 4H18v10h10V4zm-2 8h-6V6h6zM14 18H4v10h10V18zm-2 8H6v-6h6zM28 18H18v10h10V18zm-2 8h-6v-6h6z"/></svg>',
  section: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M26 4H6a2 2 0 00-2 2v20a2 2 0 002 2h20a2 2 0 002-2V6a2 2 0 00-2-2zm0 22H6V6h20z"/></svg>',
  sidebarLeft: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M28 4H4a2 2 0 00-2 2v20a2 2 0 002 2h24a2 2 0 002-2V6a2 2 0 00-2-2zM4 6h8v20H4zm10 20V6h14v20z"/></svg>',
  sidebarRight: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M28 4H4a2 2 0 00-2 2v20a2 2 0 002 2h24a2 2 0 002-2V6a2 2 0 00-2-2zM4 6h14v20H4zm16 20V6h8v20z"/></svg>',

  // Basic elements
  divider: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M4 15h24v2H4z"/></svg>',
  spacer: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M16 4l-6 6h4v12h-4l6 6 6-6h-4V10h4l-6-6z"/></svg>',
  quote: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M12 15H6.11A9 9 0 0110 8.86l1.79-1.2L10.69 6 8.9 7.2A11 11 0 004 16.35V23a2 2 0 002 2h6a2 2 0 002-2v-6a2 2 0 00-2-2zM26 15h-5.89A9 9 0 0124 8.86l1.79-1.2L24.69 6l-1.79 1.2A11 11 0 0018 16.35V23a2 2 0 002 2h6a2 2 0 002-2v-6a2 2 0 00-2-2z"/></svg>',
  link: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M29.25 6.76a6 6 0 00-8.5 0l1.42 1.42a4 4 0 115.67 5.67l-8 8a4 4 0 11-5.67-5.66l1.41-1.42-1.41-1.42-1.42 1.42a6 6 0 000 8.5A6 6 0 0017 25a6 6 0 004.27-1.76l8-8a6 6 0 00-.02-8.48z"/><path fill="currentColor" d="M4.19 24.82a4 4 0 010-5.67l8-8a4 4 0 015.67 0A3.94 3.94 0 0119 14a4 4 0 01-1.17 2.85L15.71 19l1.42 1.42 2.12-2.12a6 6 0 00-8.51-8.51l-8 8a6 6 0 000 8.51A6 6 0 007 28a6.07 6.07 0 004.28-1.76l-1.42-1.42a4 4 0 01-5.67 0z"/></svg>',

  // Lists
  listBulleted: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><circle cx="6" cy="8" r="2" fill="currentColor"/><circle cx="6" cy="16" r="2" fill="currentColor"/><circle cx="6" cy="24" r="2" fill="currentColor"/><path fill="currentColor" d="M12 7h18v2H12zM12 15h18v2H12zM12 23h18v2H12z"/></svg>',
  listNumbered: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M14 7h16v2H14zM14 15h16v2H14zM14 23h16v2H14zM6 12.5H3.5v-1H5V10H3.5V9H6V7H2v6.5h4zM3.5 25H6v2H2v-2l3.5-3H2v-2h4v2l-2.5 3z"/></svg>',

  // Table
  table: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M27 3H5a2 2 0 00-2 2v22a2 2 0 002 2h22a2 2 0 002-2V5a2 2 0 00-2-2zm0 2v4H5V5zm-12 6h5v6h-5zm-2 0v6H5v-6zm9 0h5v6h-5zm-9 8v6H5v-6zm2 0h5v6h-5zm7 0h5v6h-5z"/></svg>',
  dataTable: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M29 5a2 2 0 00-2-2H5a2 2 0 00-2 2v22a2 2 0 002 2h22a2 2 0 002-2zM5 5h22v4H5zm0 6h5v6H5zm0 8h5v6H5zm22 6H12V11h15z"/></svg>',

  // Components
  card: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M28 4H4a2 2 0 00-2 2v20a2 2 0 002 2h24a2 2 0 002-2V6a2 2 0 00-2-2zm0 22H4v-8h24zm0-10H4V6h24z"/></svg>',
  alert: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M16 2a14 14 0 1014 14A14 14 0 0016 2zm0 26a12 12 0 1112-12 12 12 0 01-12 12z"/><path fill="currentColor" d="M15 8h2v11h-2zM16 22a1.5 1.5 0 101.5 1.5A1.5 1.5 0 0016 22z"/></svg>',
  success: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M16 2a14 14 0 1014 14A14 14 0 0016 2zm0 26a12 12 0 1112-12 12 12 0 01-12 12z"/><path fill="currentColor" d="M14 21.5l-5-4.96 1.59-1.57L14 18.35 21.41 11 23 12.58l-9 8.92z"/></svg>',
  warning: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M16 2L1 29h30zm0 4.11L26.89 27H5.11zM15 12h2v8h-2zm1 11a1.5 1.5 0 101.5 1.5A1.5 1.5 0 0016 23z"/></svg>',
  badge: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M23 2H9a2 2 0 00-2 2v6a10 10 0 0018 0V4a2 2 0 00-2-2zm0 8a8 8 0 01-14 0V4h14zM4 22h24v2H4zM4 26h18v2H4z"/></svg>',
  button: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M26 10H6a2 2 0 00-2 2v8a2 2 0 002 2h20a2 2 0 002-2v-8a2 2 0 00-2-2zm0 10H6v-8h20z"/></svg>',
  stats: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M28 26H6V6h22V4H4v24h24zM16 18l-4 4-1.41-1.41L13.17 18l-2.58-2.59L12 14l4 4zm6-2l-4-4 1.41-1.41L22 13.17l2.59-2.58L26 12l-4 4 4 4-1.41 1.41L22 18.83l-2.59 2.58L18 20l4-4z"/></svg>',
  feature: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M11.61 29.92a1 1 0 01-.6-1.8L16 24.14l5 3.98a1 1 0 01-1.21 1.58L16 26.86l-3.79 2.84a1 1 0 01-.6.22z"/><path fill="currentColor" d="M16 4a9 9 0 019 9 8.87 8.87 0 01-2.55 6.24l-.1.1L16 24.2l-6.36-4.86-.1-.1A8.87 8.87 0 017 13a9 9 0 019-9m0-2a11 11 0 00-11 11 10.85 10.85 0 003.13 7.63L16 27l7.87-6.37A10.85 10.85 0 0027 13 11 11 0 0016 2z"/></svg>',
  testimonial: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M16 8a5 5 0 105 5 5 5 0 00-5-5zm0 8a3 3 0 113-3 3 3 0 01-3 3zM16 18c-3.86 0-7.14 1.63-8 4h2.13c.75-1.25 3-2 5.87-2s5.12.75 5.87 2H24c-.86-2.37-4.14-4-8-4z"/><path fill="currentColor" d="M26 4H6a2 2 0 00-2 2v20a2 2 0 002 2h20a2 2 0 002-2V6a2 2 0 00-2-2zm0 22H6V6h20z"/></svg>',
  timeline: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><circle cx="9" cy="8" r="2" fill="currentColor"/><circle cx="9" cy="16" r="2" fill="currentColor"/><circle cx="9" cy="24" r="2" fill="currentColor"/><path fill="currentColor" d="M9 12v-2M9 20v-2M9 28v-2" stroke="currentColor" stroke-width="2"/><path fill="currentColor" d="M14 7h14v2H14zM14 15h14v2H14zM14 23h14v2H14z"/></svg>',
  progress: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M28 21H4a2 2 0 01-2-2v-6a2 2 0 012-2h24a2 2 0 012 2v6a2 2 0 01-2 2zM4 13v6h24v-6zm2 2h10v2H6z"/></svg>',
  checkList: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M14 20.18l-3.59-3.59L9 18l5 5 9-9-1.41-1.42L14 20.18z"/><path fill="currentColor" d="M25 5h-3V4a2 2 0 00-2-2h-8a2 2 0 00-2 2v1H7a2 2 0 00-2 2v21a2 2 0 002 2h18a2 2 0 002-2V7a2 2 0 00-2-2zM12 4h8v4h-8zm13 24H7V7h3v3h12V7h3z"/></svg>',

  // Media & Document
  logo: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M26 10h-2V6a2 2 0 00-2-2H10a2 2 0 00-2 2v4H6a2 2 0 00-2 2v12a2 2 0 002 2h5v4h10v-4h5a2 2 0 002-2V12a2 2 0 00-2-2zm-6 18h-8v-8h8zm6-4h-4v-6H10v6H6V12h20z"/></svg>',
  avatar: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M16 8a5 5 0 105 5 5 5 0 00-5-5zm0 8a3 3 0 113-3 3 3 0 01-3 3z"/><path fill="currentColor" d="M16 2a14 14 0 1014 14A14 14 0 0016 2zm-6 24.38v-.14a5.77 5.77 0 0112 0v.14a11.9 11.9 0 01-12 0zm13.75-1.73a7.77 7.77 0 00-15.5 0 12 12 0 1115.5 0z"/></svg>',
  map: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M16 18a5 5 0 115-5 5 5 0 01-5 5zm0-8a3 3 0 103 3 3 3 0 00-3-3z"/><path fill="currentColor" d="M16 2A11.013 11.013 0 005 13a10.889 10.889 0 002.216 6.6s.3.395.349.452L16 30l8.439-9.953c.044-.053.345-.447.345-.447l.001-.003A10.885 10.885 0 0027 13 11.013 11.013 0 0016 2zm6.791 16.177L16 26.75l-6.793-8.576A8.9 8.9 0 017 13a9 9 0 0118 0 8.9 8.9 0 01-2.209 5.177z"/></svg>',
  header: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M28 4H4a2 2 0 00-2 2v20a2 2 0 002 2h24a2 2 0 002-2V6a2 2 0 00-2-2zM4 6h24v6H4zm0 20V14h24v12z"/></svg>',
  footer: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M28 4H4a2 2 0 00-2 2v20a2 2 0 002 2h24a2 2 0 002-2V6a2 2 0 00-2-2zM4 6h24v14H4zm0 20v-4h24v4z"/></svg>',
  signature: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M27 25H5a1 1 0 000 2h22a1 1 0 000-2zM22.48 6.63a2.28 2.28 0 00-3.18-.11l-8.89 8.14a2.24 2.24 0 00-.73 1.31l-.35 2.42a1.09 1.09 0 00.3.94 1.1 1.1 0 00.78.32 1.22 1.22 0 00.17 0l2.42-.35a2.22 2.22 0 001.28-.72l8.89-8.14a2.27 2.27 0 00.31-3.81z"/></svg>',
  contact: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M28 6H4a2 2 0 00-2 2v16a2 2 0 002 2h24a2 2 0 002-2V8a2 2 0 00-2-2zm0 2v2.61l-12 8-12-8V8zm-24 16v-9.94l11.35 7.57a1 1 0 001.3 0L28 14.06V24z"/></svg>',
  calendar: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M26 4h-4V2h-2v2h-8V2h-2v2H6a2 2 0 00-2 2v20a2 2 0 002 2h20a2 2 0 002-2V6a2 2 0 00-2-2zm0 22H6V12h20zm0-16H6V6h4v2h2V6h8v2h2V6h4z"/></svg>',
  reference: '<svg viewBox="0 0 32 32" width="32" height="32" style="display:block;margin:0 auto;"><path fill="currentColor" d="M16 2a14 14 0 1014 14A14 14 0 0016 2zm0 26a12 12 0 1112-12 12 12 0 01-12 12z"/><path fill="currentColor" d="M16 10a2 2 0 102 2 2 2 0 00-2-2zM16 16h-2v2h2v6h-2v2h6v-2h-2v-8h-2z"/></svg>',
};

/**
 * Add custom template blocks to GrapesJS
 */
function addTemplateBlocks(editor: any) {
  const bm = editor.BlockManager;

  // ============================================
  // BASIC BLOCKS
  // ============================================

  // Text block
  bm.add('text-block', {
    label: 'Text',
    category: 'Basic',
    content: '<p style="margin: 0 0 16px 0;">Enter your text here...</p>',
    media: BlockIcons.text,
  });

  // Heading block
  bm.add('heading-block', {
    label: 'Heading',
    category: 'Basic',
    content: '<h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 600;">Heading</h1>',
    media: BlockIcons.heading,
  });

  // Subheading block
  bm.add('subheading-block', {
    label: 'Subheading',
    category: 'Basic',
    content: '<h2 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">Subheading</h2>',
    media: BlockIcons.heading,
  });

  // H3 Heading
  bm.add('h3-block', {
    label: 'H3 Heading',
    category: 'Basic',
    content: '<h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">Section Title</h3>',
    media: BlockIcons.heading,
  });

  // Image block
  bm.add('image-block', {
    label: 'Image',
    category: 'Basic',
    content: {
      type: 'image',
      style: { 'max-width': '100%', height: 'auto', 'margin-bottom': '16px' },
      attributes: {
        src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgMTUwIDE1MCI+PHJlY3QgZmlsbD0iI2U5ZWNlZiIgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiLz48dGV4dCBmaWxsPSIjYWRiNWJkIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlPC90ZXh0Pjwvc3ZnPg==',
      },
    },
    media: BlockIcons.image,
  });

  // Divider block
  bm.add('divider-block', {
    label: 'Divider',
    category: 'Basic',
    content: '<hr style="border: none; border-top: 1px solid #E0E0E0; margin: 24px 0;">',
    media: BlockIcons.divider,
  });

  // Spacer block
  bm.add('spacer-block', {
    label: 'Spacer',
    category: 'Basic',
    content: '<div style="height: 32px;"></div>',
    media: BlockIcons.spacer,
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
    media: BlockIcons.quote,
  });

  // Bullet List block
  bm.add('list-block', {
    label: 'Bullet List',
    category: 'Basic',
    content: `
      <ul style="margin: 0 0 16px 0; padding-left: 24px;">
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
      </ul>
    `,
    media: BlockIcons.listBulleted,
  });

  // Numbered List block
  bm.add('numbered-list-block', {
    label: 'Numbered List',
    category: 'Basic',
    content: `
      <ol style="margin: 0 0 16px 0; padding-left: 24px;">
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </ol>
    `,
    media: BlockIcons.listNumbered,
  });

  // Link block
  bm.add('link-block', {
    label: 'Link',
    category: 'Basic',
    content: '<a href="#" style="color: #3560C1; text-decoration: underline;">Click here</a>',
    media: BlockIcons.link,
  });

  // ============================================
  // LAYOUT BLOCKS
  // ============================================

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
    media: BlockIcons.columns2,
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
    media: BlockIcons.columns3,
  });

  // Four columns block
  bm.add('four-columns', {
    label: '4 Columns',
    category: 'Layout',
    content: `
      <div style="display: flex; gap: 12px; margin-bottom: 16px;">
        <div style="flex: 1; min-height: 50px; padding: 12px; background: #f8f9fa; border-radius: 4px; font-size: 14px;">Col 1</div>
        <div style="flex: 1; min-height: 50px; padding: 12px; background: #f8f9fa; border-radius: 4px; font-size: 14px;">Col 2</div>
        <div style="flex: 1; min-height: 50px; padding: 12px; background: #f8f9fa; border-radius: 4px; font-size: 14px;">Col 3</div>
        <div style="flex: 1; min-height: 50px; padding: 12px; background: #f8f9fa; border-radius: 4px; font-size: 14px;">Col 4</div>
      </div>
    `,
    media: BlockIcons.columns4,
  });

  // Sidebar Left
  bm.add('sidebar-left', {
    label: 'Sidebar Left',
    category: 'Layout',
    content: `
      <div style="display: flex; gap: 24px; margin-bottom: 16px;">
        <div style="width: 200px; min-height: 100px; padding: 12px; background: #f8f9fa; border-radius: 4px;">Sidebar</div>
        <div style="flex: 1; min-height: 100px; padding: 12px; background: #f8f9fa; border-radius: 4px;">Main Content</div>
      </div>
    `,
    media: BlockIcons.sidebarLeft,
  });

  // Sidebar Right
  bm.add('sidebar-right', {
    label: 'Sidebar Right',
    category: 'Layout',
    content: `
      <div style="display: flex; gap: 24px; margin-bottom: 16px;">
        <div style="flex: 1; min-height: 100px; padding: 12px; background: #f8f9fa; border-radius: 4px;">Main Content</div>
        <div style="width: 200px; min-height: 100px; padding: 12px; background: #f8f9fa; border-radius: 4px;">Sidebar</div>
      </div>
    `,
    media: BlockIcons.sidebarRight,
  });

  // Grid 2x2
  bm.add('grid-2x2', {
    label: 'Grid 2x2',
    category: 'Layout',
    content: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
        <div style="min-height: 80px; padding: 12px; background: #f8f9fa; border-radius: 4px;">Cell 1</div>
        <div style="min-height: 80px; padding: 12px; background: #f8f9fa; border-radius: 4px;">Cell 2</div>
        <div style="min-height: 80px; padding: 12px; background: #f8f9fa; border-radius: 4px;">Cell 3</div>
        <div style="min-height: 80px; padding: 12px; background: #f8f9fa; border-radius: 4px;">Cell 4</div>
      </div>
    `,
    media: BlockIcons.grid,
  });

  // Section/Container block
  bm.add('section-block', {
    label: 'Section',
    category: 'Layout',
    content: `
      <div style="padding: 24px; margin-bottom: 16px; background: #f8f9fa; border-radius: 4px; min-height: 100px;">
        <p style="margin: 0; color: #6c757d;">Drop content here...</p>
      </div>
    `,
    media: BlockIcons.section,
  });

  // ============================================
  // TABLE BLOCKS
  // ============================================

  // Basic Table
  bm.add('table-block', {
    label: 'Table',
    category: 'Tables',
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
    media: BlockIcons.table,
  });

  // Striped Table
  bm.add('striped-table', {
    label: 'Striped Table',
    category: 'Tables',
    content: `
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <thead>
          <tr style="background: #3560C1; color: white;">
            <th style="padding: 12px; text-align: left;">Name</th>
            <th style="padding: 12px; text-align: left;">Role</th>
            <th style="padding: 12px; text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr style="background: #ffffff;">
            <td style="padding: 12px; border-bottom: 1px solid #E0E0E0;">Item 1</td>
            <td style="padding: 12px; border-bottom: 1px solid #E0E0E0;">Description</td>
            <td style="padding: 12px; border-bottom: 1px solid #E0E0E0; text-align: right;">$100.00</td>
          </tr>
          <tr style="background: #f8f9fa;">
            <td style="padding: 12px; border-bottom: 1px solid #E0E0E0;">Item 2</td>
            <td style="padding: 12px; border-bottom: 1px solid #E0E0E0;">Description</td>
            <td style="padding: 12px; border-bottom: 1px solid #E0E0E0; text-align: right;">$150.00</td>
          </tr>
          <tr style="background: #ffffff;">
            <td style="padding: 12px; border-bottom: 1px solid #E0E0E0;">Item 3</td>
            <td style="padding: 12px; border-bottom: 1px solid #E0E0E0;">Description</td>
            <td style="padding: 12px; border-bottom: 1px solid #E0E0E0; text-align: right;">$75.00</td>
          </tr>
        </tbody>
      </table>
    `,
    media: BlockIcons.table,
  });

  // Data Table
  bm.add('data-table', {
    label: 'Data Table',
    category: 'Tables',
    content: `
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 14px;">
        <thead>
          <tr style="background: #161616; color: white;">
            <th style="padding: 10px 12px; text-align: left; font-weight: 500;">ID</th>
            <th style="padding: 10px 12px; text-align: left; font-weight: 500;">Product</th>
            <th style="padding: 10px 12px; text-align: center; font-weight: 500;">Qty</th>
            <th style="padding: 10px 12px; text-align: right; font-weight: 500;">Price</th>
            <th style="padding: 10px 12px; text-align: center; font-weight: 500;">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #E0E0E0; color: #525252;">#001</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #E0E0E0;">Product Name</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #E0E0E0; text-align: center;">5</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #E0E0E0; text-align: right;">$99.00</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #E0E0E0; text-align: center;"><span style="background: #d4edda; color: #155724; padding: 2px 8px; border-radius: 12px; font-size: 12px;">Active</span></td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #E0E0E0; color: #525252;">#002</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #E0E0E0;">Another Product</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #E0E0E0; text-align: center;">12</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #E0E0E0; text-align: right;">$149.00</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #E0E0E0; text-align: center;"><span style="background: #fff3cd; color: #856404; padding: 2px 8px; border-radius: 12px; font-size: 12px;">Pending</span></td>
          </tr>
        </tbody>
      </table>
    `,
    media: BlockIcons.dataTable,
  });

  // ============================================
  // COMPONENT BLOCKS
  // ============================================

  // Card block
  bm.add('card-block', {
    label: 'Card',
    category: 'Components',
    content: `
      <div style="border: 1px solid #E0E0E0; border-radius: 8px; overflow: hidden; margin-bottom: 16px; background: white;">
        <div style="height: 120px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
        <div style="padding: 16px;">
          <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Card Title</h3>
          <p style="margin: 0; color: #525252; font-size: 14px;">Card description goes here. Add more details about this item.</p>
        </div>
      </div>
    `,
    media: BlockIcons.card,
  });

  // Alert/Callout - Info
  bm.add('alert-info', {
    label: 'Info Alert',
    category: 'Components',
    content: `
      <div style="padding: 16px; margin-bottom: 16px; background: #E0F3FE; border-left: 4px solid #3560C1; border-radius: 4px;">
        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <span style="color: #3560C1; font-size: 20px;">ℹ</span>
          <div>
            <strong style="display: block; margin-bottom: 4px; color: #161616;">Information</strong>
            <span style="color: #525252; font-size: 14px;">This is an informational message for the user.</span>
          </div>
        </div>
      </div>
    `,
    media: BlockIcons.alert,
  });

  // Alert/Callout - Success
  bm.add('alert-success', {
    label: 'Success Alert',
    category: 'Components',
    content: `
      <div style="padding: 16px; margin-bottom: 16px; background: #d4edda; border-left: 4px solid #28a745; border-radius: 4px;">
        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <span style="color: #28a745; font-size: 20px;">✓</span>
          <div>
            <strong style="display: block; margin-bottom: 4px; color: #161616;">Success</strong>
            <span style="color: #525252; font-size: 14px;">Operation completed successfully.</span>
          </div>
        </div>
      </div>
    `,
    media: BlockIcons.success,
  });

  // Alert/Callout - Warning
  bm.add('alert-warning', {
    label: 'Warning Alert',
    category: 'Components',
    content: `
      <div style="padding: 16px; margin-bottom: 16px; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <span style="color: #856404; font-size: 20px;">⚠</span>
          <div>
            <strong style="display: block; margin-bottom: 4px; color: #161616;">Warning</strong>
            <span style="color: #525252; font-size: 14px;">Please review this information carefully.</span>
          </div>
        </div>
      </div>
    `,
    media: BlockIcons.warning,
  });

  // Badge block
  bm.add('badge-block', {
    label: 'Badge',
    category: 'Components',
    content: '<span style="display: inline-block; padding: 4px 12px; background: #3560C1; color: white; border-radius: 16px; font-size: 12px; font-weight: 500;">Badge</span>',
    media: BlockIcons.badge,
  });

  // Button block
  bm.add('button-block', {
    label: 'Button',
    category: 'Components',
    content: '<button style="display: inline-block; padding: 12px 24px; background: #3560C1; color: white; border: none; border-radius: 4px; font-size: 14px; font-weight: 500; cursor: pointer;">Button</button>',
    media: BlockIcons.button,
  });

  // Button Outline
  bm.add('button-outline', {
    label: 'Button Outline',
    category: 'Components',
    content: '<button style="display: inline-block; padding: 12px 24px; background: transparent; color: #3560C1; border: 2px solid #3560C1; border-radius: 4px; font-size: 14px; font-weight: 500; cursor: pointer;">Button</button>',
    media: BlockIcons.button,
  });

  // Stats Card
  bm.add('stats-card', {
    label: 'Stats Card',
    category: 'Components',
    content: `
      <div style="padding: 20px; background: white; border: 1px solid #E0E0E0; border-radius: 8px; margin-bottom: 16px;">
        <div style="font-size: 14px; color: #525252; margin-bottom: 8px;">Total Revenue</div>
        <div style="font-size: 32px; font-weight: 700; color: #161616; margin-bottom: 8px;">$24,500</div>
        <div style="font-size: 14px; color: #28a745;">↑ 12.5% from last month</div>
      </div>
    `,
    media: BlockIcons.stats,
  });

  // Feature Box
  bm.add('feature-box', {
    label: 'Feature Box',
    category: 'Components',
    content: `
      <div style="padding: 24px; background: #f8f9fa; border-radius: 8px; text-align: center; margin-bottom: 16px;">
        <div style="width: 48px; height: 48px; background: #3560C1; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
          <span style="color: white; font-size: 24px;">★</span>
        </div>
        <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Feature Title</h3>
        <p style="margin: 0; color: #525252; font-size: 14px;">Brief description of this amazing feature and its benefits.</p>
      </div>
    `,
    media: BlockIcons.feature,
  });

  // Testimonial
  bm.add('testimonial-block', {
    label: 'Testimonial',
    category: 'Components',
    content: `
      <div style="padding: 24px; background: white; border: 1px solid #E0E0E0; border-radius: 8px; margin-bottom: 16px;">
        <div style="font-size: 24px; color: #3560C1; margin-bottom: 12px;">"</div>
        <p style="margin: 0 0 16px 0; font-style: italic; color: #525252; font-size: 16px; line-height: 1.6;">
          This product has completely transformed how we work. Highly recommended for any team looking to improve their workflow.
        </p>
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 40px; height: 40px; background: #E0E0E0; border-radius: 50%;"></div>
          <div>
            <div style="font-weight: 600; color: #161616;">John Doe</div>
            <div style="font-size: 14px; color: #8D8D8D;">CEO, Company Name</div>
          </div>
        </div>
      </div>
    `,
    media: BlockIcons.testimonial,
  });

  // Timeline Item
  bm.add('timeline-item', {
    label: 'Timeline Item',
    category: 'Components',
    content: `
      <div style="display: flex; gap: 16px; margin-bottom: 16px;">
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div style="width: 12px; height: 12px; background: #3560C1; border-radius: 50%;"></div>
          <div style="width: 2px; flex: 1; background: #E0E0E0;"></div>
        </div>
        <div style="flex: 1; padding-bottom: 24px;">
          <div style="font-size: 12px; color: #8D8D8D; margin-bottom: 4px;">January 2024</div>
          <div style="font-weight: 600; color: #161616; margin-bottom: 8px;">Event Title</div>
          <p style="margin: 0; color: #525252; font-size: 14px;">Description of what happened during this event or milestone.</p>
        </div>
      </div>
    `,
    media: BlockIcons.timeline,
  });

  // Progress Bar
  bm.add('progress-bar', {
    label: 'Progress Bar',
    category: 'Components',
    content: `
      <div style="margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="font-size: 14px; color: #161616;">Progress</span>
          <span style="font-size: 14px; color: #525252;">75%</span>
        </div>
        <div style="height: 8px; background: #E0E0E0; border-radius: 4px; overflow: hidden;">
          <div style="width: 75%; height: 100%; background: #3560C1; border-radius: 4px;"></div>
        </div>
      </div>
    `,
    media: BlockIcons.progress,
  });

  // Icon List
  bm.add('icon-list', {
    label: 'Icon List',
    category: 'Components',
    content: `
      <div style="margin-bottom: 16px;">
        <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
          <span style="color: #28a745; font-size: 16px;">✓</span>
          <span style="color: #161616;">Feature one included</span>
        </div>
        <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
          <span style="color: #28a745; font-size: 16px;">✓</span>
          <span style="color: #161616;">Feature two included</span>
        </div>
        <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
          <span style="color: #28a745; font-size: 16px;">✓</span>
          <span style="color: #161616;">Feature three included</span>
        </div>
        <div style="display: flex; align-items: flex-start; gap: 12px;">
          <span style="color: #dc3545; font-size: 16px;">✗</span>
          <span style="color: #8D8D8D;">Feature not included</span>
        </div>
      </div>
    `,
    media: BlockIcons.checkList,
  });

  // ============================================
  // MEDIA BLOCKS
  // ============================================

  // Logo Placeholder
  bm.add('logo-placeholder', {
    label: 'Logo',
    category: 'Media',
    content: `
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
        <div style="width: 48px; height: 48px; background: #3560C1; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
          <span style="color: white; font-size: 20px; font-weight: 700;">L</span>
        </div>
        <div>
          <div style="font-size: 18px; font-weight: 700; color: #161616;">Company Name</div>
          <div style="font-size: 12px; color: #8D8D8D;">Tagline goes here</div>
        </div>
      </div>
    `,
    media: BlockIcons.logo,
  });

  // Avatar
  bm.add('avatar-block', {
    label: 'Avatar',
    category: 'Media',
    content: `
      <div style="width: 64px; height: 64px; background: #E0E0E0; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;">
        <span style="font-size: 24px; color: #8D8D8D;">👤</span>
      </div>
    `,
    media: BlockIcons.avatar,
  });

  // Video Placeholder
  bm.add('video-placeholder', {
    label: 'Video',
    category: 'Media',
    content: `
      <div style="position: relative; background: #161616; border-radius: 8px; overflow: hidden; margin-bottom: 16px; aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center;">
        <div style="width: 64px; height: 64px; background: rgba(255,255,255,0.9); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;">
          <span style="font-size: 24px; margin-left: 4px;">▶</span>
        </div>
      </div>
    `,
    media: BlockIcons.video,
  });

  // Map Placeholder
  bm.add('map-placeholder', {
    label: 'Map',
    category: 'Media',
    content: `
      <div style="background: #E0E0E0; border-radius: 8px; height: 200px; margin-bottom: 16px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 8px;">
        <span style="font-size: 32px;">📍</span>
        <span style="font-size: 14px; color: #525252;">Map Location</span>
      </div>
    `,
    media: BlockIcons.map,
  });

  // ============================================
  // DOCUMENT BLOCKS
  // ============================================

  // Page Header
  bm.add('page-header', {
    label: 'Page Header',
    category: 'Document',
    content: `
      <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 2px solid #161616; margin-bottom: 24px;">
        <div>
          <div style="font-size: 12px; color: #8D8D8D; text-transform: uppercase; letter-spacing: 1px;">Company Name</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 12px; color: #8D8D8D;">Document Title</div>
        </div>
      </div>
    `,
    media: BlockIcons.header,
  });

  // Page Footer
  bm.add('page-footer', {
    label: 'Page Footer',
    category: 'Document',
    content: `
      <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid #E0E0E0; margin-top: 24px; font-size: 12px; color: #8D8D8D;">
        <div>© 2024 Company Name. All rights reserved.</div>
        <div>Page 1 of 1</div>
      </div>
    `,
    media: BlockIcons.footer,
  });

  // Signature Block
  bm.add('signature-block', {
    label: 'Signature',
    category: 'Document',
    content: `
      <div style="margin: 32px 0 16px 0;">
        <div style="border-bottom: 1px solid #161616; width: 250px; margin-bottom: 8px; height: 40px;"></div>
        <div style="font-size: 14px; color: #161616;">Signature</div>
        <div style="font-size: 12px; color: #8D8D8D; margin-top: 4px;">Date: _______________</div>
      </div>
    `,
    media: BlockIcons.signature,
  });

  // Contact Info
  bm.add('contact-info', {
    label: 'Contact Info',
    category: 'Document',
    content: `
      <div style="margin-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span>📧</span>
          <span style="color: #525252; font-size: 14px;">email@example.com</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span>📞</span>
          <span style="color: #525252; font-size: 14px;">+1 (555) 123-4567</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span>📍</span>
          <span style="color: #525252; font-size: 14px;">123 Business St, City, ST 12345</span>
        </div>
      </div>
    `,
    media: BlockIcons.contact,
  });

  // Date Field
  bm.add('date-field', {
    label: 'Date Field',
    category: 'Document',
    content: `
      <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 16px;">
        <span style="font-weight: 600; color: #161616;">Date:</span>
        <span style="color: #525252;">January 15, 2024</span>
      </div>
    `,
    media: BlockIcons.calendar,
  });

  // Reference Number
  bm.add('reference-number', {
    label: 'Reference #',
    category: 'Document',
    content: `
      <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 16px;">
        <span style="font-weight: 600; color: #161616;">Reference:</span>
        <span style="color: #525252; font-family: monospace;">#INV-2024-001</span>
      </div>
    `,
    media: BlockIcons.reference,
  });
}

/**
 * A4Editor - Standalone A4-styled editor component
 *
 * This component renders a TipTap editor within an A4 page layout.
 * It can be used independently without requiring EditorContext or other app dependencies.
 * Uses ODL Design System tokens for consistent theming.
 */
const A4Editor: React.FC<A4EditorProps> = ({
  initialContent = '<p></p>',
  zoom = 100,
  placeholder = 'Start writing...',
  editable = true,
  onUpdate,
  editor: externalEditor,
  isLoading = false,
  className = '',
  showToolbar = true,
  onInsertImage,
  onInsertTable,
  toolbarRight,
  templateBuilder = false,
}) => {
  const [contentHeight, setContentHeight] = useState(0);

  // If templateBuilder mode is enabled, render the GrapesJS builder
  if (templateBuilder) {
    return (
      <TemplateBuilder
        initialContent={initialContent}
        onUpdate={onUpdate}
        editable={editable}
        className={className}
      />
    );
  }

  // A4 dimensions in mm
  const A4_WIDTH_MM = 210;
  const A4_HEIGHT_MM = 297;
  const MARGIN_MM = 25;
  const GAP_MM = 6;

  // Content area dimensions
  const contentWidth = A4_WIDTH_MM - MARGIN_MM * 2; // 160mm
  const pageContentHeight = A4_HEIGHT_MM - MARGIN_MM * 2; // 247mm

  // Convert mm to pixels for calculations
  const MM_TO_PX = 3.779527559;
  const pageContentHeightPx = pageContentHeight * MM_TO_PX;

  // Create internal editor if no external editor provided
  const internalEditor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'editor-link',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({ multicolor: true }),
      Typography,
      Placeholder.configure({
        placeholder,
      }),
      Underline,
      Subscript,
      Superscript,
      TextStyle,
      Color,
      FontFamily,
    ],
    content: initialContent,
    editable,
    editorProps: {
      attributes: {
        class: 'a4-editor-content',
      },
    },
    onUpdate: ({ editor }) => {
      if (onUpdate) {
        onUpdate(editor.getHTML());
      }
    },
  });

  // Use external editor if provided, otherwise use internal
  const editor = externalEditor ?? internalEditor;

  // Monitor content height to determine number of pages needed
  useEffect(() => {
    if (!editor) return;

    const updateContentHeight = () => {
      const editorElement = editor.view.dom;
      if (editorElement) {
        setContentHeight(editorElement.scrollHeight);
      }
    };

    const handleUpdate = () => {
      setTimeout(updateContentHeight, 50);
    };

    editor.on('update', handleUpdate);
    editor.on('create', handleUpdate);

    // Initial calculation
    updateContentHeight();

    // Also listen to window resize
    window.addEventListener('resize', updateContentHeight);

    return () => {
      editor.off('update', handleUpdate);
      editor.off('create', handleUpdate);
      window.removeEventListener('resize', updateContentHeight);
    };
  }, [editor]);

  // Calculate number of pages needed
  const numberOfPages = Math.max(1, Math.ceil(contentHeight / pageContentHeightPx));

  if (!editor) {
    return null;
  }

  return (
    <div className={`a4-editor-wrapper ${className}`}>
      {showToolbar && editable && (
        <Toolbar
          editor={editor}
          onInsertImage={onInsertImage}
          onInsertTable={onInsertTable}
          toolbarRight={toolbarRight}
        />
      )}
      <div className="a4-paged-editor-wrapper">
        <div
          className="a4-paged-editor-container"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
          }}
        >
          {/* Single continuous content area styled to look like pages */}
          <div
            className="a4-continuous-editor"
            style={{
              width: `${A4_WIDTH_MM}mm`,
              position: 'relative',
            }}
          >
            {/* Page backgrounds */}
            {Array.from({ length: numberOfPages }, (_, pageIndex) => (
              <React.Fragment key={`page-bg-${pageIndex}`}>
                {/* Page separator for pages after the first */}
                {pageIndex > 0 && (
                  <div
                    className="a4-page-separator a4-page-separator-bg"
                    style={{
                      height: `${GAP_MM}mm`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: `${A4_WIDTH_MM}mm`,
                      position: 'relative',
                      zIndex: 5,
                    }}
                  >
                    <div
                      style={{
                        fontSize: ODLTokens.fontSize.sm,
                        fontFamily: ODLTokens.fontFamily.sans,
                        color: ODLTokens.colors.textTertiary,
                        backgroundColor: ODLTokens.colors.white,
                        padding: `${ODLTokens.spacing[1]} ${ODLTokens.spacing[2]}`,
                        borderRadius: ODLTokens.borderRadius.base,
                        border: `1px solid ${ODLTokens.colors.border}`,
                      }}
                    >
                      Page {pageIndex + 1}
                    </div>
                  </div>
                )}

                {/* Page background */}
                <div
                  className="a4-page-background"
                  style={{
                    width: `${A4_WIDTH_MM}mm`,
                    height: `${A4_HEIGHT_MM}mm`,
                    background: ODLTokens.colors.white,
                    boxShadow: ODLTokens.shadows.medium,
                    border: `1px solid ${ODLTokens.colors.border}`,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {/* Page number */}
                  <div
                    className="a4-page-number"
                    style={{
                      position: 'absolute',
                      bottom: '10mm',
                      right: '25mm',
                      fontSize: ODLTokens.fontSize.xs,
                      fontFamily: ODLTokens.fontFamily.sans,
                      color: ODLTokens.colors.textTertiary,
                      userSelect: 'none',
                      pointerEvents: 'none',
                      zIndex: 15,
                    }}
                  >
                    {pageIndex + 1}
                  </div>
                </div>
              </React.Fragment>
            ))}

            {/* Single editor content that flows across all pages */}
            <div
              className={`a4-editor-content-overlay ${isLoading ? 'generating' : ''}`}
              style={{
                position: 'absolute',
                top: `${MARGIN_MM}mm`,
                left: `${MARGIN_MM}mm`,
                width: `${contentWidth}mm`,
                zIndex: 20,
                paddingBottom: `${GAP_MM * (numberOfPages - 1)}mm`,
              }}
            >
              <div
                style={{
                  pageBreakInside: 'avoid',
                  breakInside: 'avoid',
                  position: 'relative',
                }}
              >
                <EditorContent editor={editor} />

                {/* Loading state overlay */}
                {isLoading && editor.isEmpty && (
                  <div
                    className="a4-editor-loading-state"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: ODLTokens.spacing[3],
                      color: ODLTokens.colors.textSecondary,
                      paddingTop: '1em',
                      fontSize: ODLTokens.fontSize.md,
                      fontFamily: ODLTokens.fontFamily.sans,
                      lineHeight: '1.6',
                    }}
                  >
                    <div
                      className="a4-editor-spinner"
                      style={{
                        width: '16px',
                        height: '16px',
                        border: `2px solid ${ODLTokens.colors.border}`,
                        borderTopColor: ODLTokens.colors.primary,
                        borderRadius: '50%',
                        flexShrink: 0,
                      }}
                    />
                    <span>Loading...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default A4Editor;
