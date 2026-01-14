import React, { useState, useEffect } from 'react';
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

/**
 * ODL Theme tokens for inline styles
 * These match the CSS variables in the ODL design system
 */
const ODLTokens = {
  colors: {
    white: '#FFFFFF',
    wave: '#EDF1F5',
    border: '#E0E0E0',
    textPrimary: '#161616',
    textSecondary: '#525252',
    textTertiary: '#8D8D8D',
    primary: '#3560C1',
    primaryLight: '#E0F3FE',
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
