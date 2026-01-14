import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
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
import './PagedEditor.css';

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
}

/**
 * A4Editor - Standalone A4-styled editor component
 *
 * This component renders a TipTap editor within an A4 page layout.
 * It can be used independently without requiring EditorContext or other app dependencies.
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
}) => {
  const [contentHeight, setContentHeight] = useState(0);

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
        types: ['heading', 'paragraph', 'listItem'],
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
    <div className={`paged-editor-wrapper ${className}`}>
      <div
        className="paged-editor-container"
        style={{
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'top center',
        }}
      >
        {/* Single continuous content area styled to look like pages */}
        <div
          className="continuous-editor"
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
                  className="page-separator page-separator-bg"
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
                      fontSize: '12px',
                      color: '#9ca3af',
                      backgroundColor: 'white',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: '1px solid #e5e7eb',
                    }}
                  >
                    Page {pageIndex + 1}
                  </div>
                </div>
              )}

              {/* Page background */}
              <div
                className="page-background"
                style={{
                  width: `${A4_WIDTH_MM}mm`,
                  height: `${A4_HEIGHT_MM}mm`,
                  background: 'white',
                  boxShadow:
                    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  border: '1px solid #e5e7eb',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Page number */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10mm',
                    right: '25mm',
                    fontSize: '10px',
                    color: '#9ca3af',
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
            className={`editor-content-overlay ${isLoading ? 'generating' : ''}`}
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
                  className="editor-loading-state"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: '#6b7280',
                    paddingTop: '1em',
                    fontSize: '16px',
                    lineHeight: '1.6',
                  }}
                >
                  <div
                    className="editor-spinner"
                    style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid #d1d5db',
                      borderTopColor: '#ec4899',
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
  );
};

export default A4Editor;
