import React from 'react';
import { TextStyleKit } from '@tiptap/extension-text-style';
import type { Editor } from '@tiptap/react';
import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import ODLTheme from '../../styles/ODLTheme';

const extensions = [
  TextStyleKit, 
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5, 6]
    }
  }),
  Placeholder.configure({
    placeholder: 'Enter text...'
  }),
  Underline
];


function MenuBar({ editor, onSave, onCancel, onInsertImage }: { editor: Editor; onSave: () => void; onCancel: () => void; onInsertImage?: () => void }) {
  // Icon button style helper
  const getIconButtonStyle = (isActive: boolean, isDisabled: boolean = false) => ({
    background: isActive ? ODLTheme.colors.primaryLight : 'transparent',
    border: 'none',
    padding: '6px',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ODLTheme.borders.radius.sm,
    color: isActive ? ODLTheme.colors.primary : ODLTheme.colors.text.primary,
    transition: 'all 0.2s ease',
    opacity: isDisabled ? 0.4 : 1
  });
  
  // Read the current editor's state, and re-render the component when it changes
  const editorState = useEditorState({
    editor,
    selector: ctx => {
      return {
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
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive('paragraph') ?? false,
        isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
        isBlockquote: ctx.editor.isActive('blockquote') ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      }
    },
  });


  return (
    <div style={{
      backgroundColor: ODLTheme.colors.white,
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      width: '100%',
      position: 'sticky',
      top: '-30px',
      zIndex: 100
    }}>
      {/* Header with title and close button */}
      <div style={{
          padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
          borderBottom: `1px solid ${ODLTheme.colors.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <h2 style={{ 
          fontSize: ODLTheme.typography.fontSize.lg, 
          fontWeight: ODLTheme.typography.fontWeight.semibold,
          margin: 0,
          color: ODLTheme.colors.text.primary
        }}>
          Formatting Tools
        </h2>
        <button
          onClick={onCancel}
          style={{
            background: 'none',
            border: 'none',
            padding: ODLTheme.spacing[1],
            cursor: 'pointer',
            color: ODLTheme.colors.text.secondary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: ODLTheme.borders.radius.sm,
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = ODLTheme.colors.surface}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          aria-label="Close formatting tools"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 5L5 15M5 5l10 10" />
          </svg>
        </button>
      </div>
      
      {/* Toolbar content - all in one line */}
      <div style={{
        display: 'flex',
        gap: '4px',
        padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[3]}`,
        alignItems: 'center',
        overflowX: 'auto',
        whiteSpace: 'nowrap'
      }}>
      {/* Text formatting */}
      <button
        style={getIconButtonStyle(editorState.isBold, !editorState.canBold)}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editorState.canBold}
        aria-label="Bold"
        aria-pressed={editorState.isBold}
        onMouseEnter={(e) => !editorState.isBold && (e.currentTarget.style.backgroundColor = ODLTheme.colors.surface)}
        onMouseLeave={(e) => !editorState.isBold && (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <Icon name="text-bold" size={18} />
      </button>
      <button
        style={getIconButtonStyle(editorState.isItalic, !editorState.canItalic)}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editorState.canItalic}
        aria-label="Italic"
        aria-pressed={editorState.isItalic}
        onMouseEnter={(e) => !editorState.isItalic && (e.currentTarget.style.backgroundColor = ODLTheme.colors.surface)}
        onMouseLeave={(e) => !editorState.isItalic && (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <Icon name="text-italic" size={18} />
      </button>
      <button
        style={getIconButtonStyle(editorState.isUnderline, !editorState.canUnderline)}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editorState.canUnderline}
        aria-label="Underline"
        aria-pressed={editorState.isUnderline}
        onMouseEnter={(e) => !editorState.isUnderline && (e.currentTarget.style.backgroundColor = ODLTheme.colors.surface)}
        onMouseLeave={(e) => !editorState.isUnderline && (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <Icon name="text-underline" size={18} />
      </button>
      <button
        style={getIconButtonStyle(editorState.isStrike, !editorState.canStrike)}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editorState.canStrike}
        aria-label="Strikethrough"
        aria-pressed={editorState.isStrike}
        onMouseEnter={(e) => !editorState.isStrike && (e.currentTarget.style.backgroundColor = ODLTheme.colors.surface)}
        onMouseLeave={(e) => !editorState.isStrike && (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <Icon name="text-strikethrough" size={18} />
      </button>
      <button
        style={getIconButtonStyle(editorState.isCode, !editorState.canCode)}
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editorState.canCode}
        aria-label="Inline code"
        aria-pressed={editorState.isCode}
        onMouseEnter={(e) => !editorState.isCode && (e.currentTarget.style.backgroundColor = ODLTheme.colors.surface)}
        onMouseLeave={(e) => !editorState.isCode && (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <Icon name="code" size={18} />
      </button>

      <div style={{ width: '1px', height: '20px', backgroundColor: ODLTheme.colors.border, margin: '0 4px' }} />

      {/* Headings */}
      <button
        style={getIconButtonStyle(editorState.isParagraph, false)}
        onClick={() => editor.chain().focus().setParagraph().run()}
        aria-label="Paragraph"
        aria-pressed={editorState.isParagraph}
        onMouseEnter={(e) => !editorState.isParagraph && (e.currentTarget.style.backgroundColor = ODLTheme.colors.surface)}
        onMouseLeave={(e) => !editorState.isParagraph && (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <span style={{ fontSize: '14px', fontWeight: 600 }}>P</span>
      </button>
      <button
        style={getIconButtonStyle(editorState.isHeading1, false)}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        aria-label="Heading 1"
        aria-pressed={editorState.isHeading1}
        onMouseEnter={(e) => !editorState.isHeading1 && (e.currentTarget.style.backgroundColor = ODLTheme.colors.surface)}
        onMouseLeave={(e) => !editorState.isHeading1 && (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <span style={{ fontSize: '14px', fontWeight: 600 }}>H1</span>
      </button>
      <button
        style={getIconButtonStyle(editorState.isHeading2, false)}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        aria-label="Heading 2"
        aria-pressed={editorState.isHeading2}
        onMouseEnter={(e) => !editorState.isHeading2 && (e.currentTarget.style.backgroundColor = ODLTheme.colors.surface)}
        onMouseLeave={(e) => !editorState.isHeading2 && (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <span style={{ fontSize: '14px', fontWeight: 600 }}>H2</span>
      </button>
      <button
        style={getIconButtonStyle(editorState.isHeading3, false)}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        aria-label="Heading 3"
        aria-pressed={editorState.isHeading3}
        onMouseEnter={(e) => !editorState.isHeading3 && (e.currentTarget.style.backgroundColor = ODLTheme.colors.surface)}
        onMouseLeave={(e) => !editorState.isHeading3 && (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <span style={{ fontSize: '14px', fontWeight: 600 }}>H3</span>
      </button>

      <div style={{ width: '1px', height: '20px', backgroundColor: ODLTheme.colors.border, margin: '0 4px' }} />

      {/* Lists and blocks */}
      <button
        style={getIconButtonStyle(editorState.isBulletList, false)}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        aria-label="Bullet list"
        aria-pressed={editorState.isBulletList}
        onMouseEnter={(e) => !editorState.isBulletList && (e.currentTarget.style.backgroundColor = ODLTheme.colors.surface)}
        onMouseLeave={(e) => !editorState.isBulletList && (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <Icon name="list-bulleted" size={18} />
      </button>
      <button
        style={getIconButtonStyle(editorState.isOrderedList, false)}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label="Ordered list"
        aria-pressed={editorState.isOrderedList}
        onMouseEnter={(e) => !editorState.isOrderedList && (e.currentTarget.style.backgroundColor = ODLTheme.colors.surface)}
        onMouseLeave={(e) => !editorState.isOrderedList && (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <Icon name="list-numbered" size={18} />
      </button>

      <div style={{ width: '1px', height: '20px', backgroundColor: ODLTheme.colors.border, margin: '0 4px' }} />

      {/* Insert elements */}
      <button
        type="button"
        style={getIconButtonStyle(false, false)}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          alert('Table insertion not yet implemented');
        }}
        aria-label="Insert table"
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ODLTheme.colors.surface)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <Icon name="table" size={18} />
      </button>
      <button
        style={getIconButtonStyle(false, false)}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Image button clicked in SimpleEditor');
          console.log('onInsertImage callback exists:', !!onInsertImage);
          if (onInsertImage) {
            console.log('Calling onInsertImage callback');
            onInsertImage();
          } else {
            alert('Image insertion not yet implemented');
          }
        }}
        aria-label="Insert image"
        type="button"
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ODLTheme.colors.surface)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <Icon name="image" size={18} />
      </button>
      <button
        type="button"
        style={getIconButtonStyle(false, false)}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          alert('Graph insertion not yet implemented');
        }}
        aria-label="Insert graph"
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = ODLTheme.colors.surface)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <Icon name="chart-line" size={18} />
      </button>

      <div style={{ width: '1px', height: '20px', backgroundColor: ODLTheme.colors.border, margin: '0 4px' }} />

      {/* History */}
      <button
        style={getIconButtonStyle(false, !editorState.canUndo)}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editorState.canUndo}
        aria-label="Undo"
        onMouseEnter={(e) => editorState.canUndo && (e.currentTarget.style.backgroundColor = ODLTheme.colors.surface)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <Icon name="undo" size={18} />
      </button>
      <button
        style={getIconButtonStyle(false, !editorState.canRedo)}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editorState.canRedo}
        aria-label="Redo"
        onMouseEnter={(e) => editorState.canRedo && (e.currentTarget.style.backgroundColor = ODLTheme.colors.surface)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <Icon name="redo" size={18} />
      </button>
      </div>
    </div>
  );
}

interface SimpleEditorProps {
  content: string;
  onChange: (content: string) => void;
  onSave: () => void;
  onCancel: () => void;
  placeholder?: string;
  elementRef?: React.RefObject<HTMLElement>;
  onInsertImage?: () => void;
}

const SimpleEditor: React.FC<SimpleEditorProps> = ({
  content,
  onChange,
  onSave,
  onCancel,
  placeholder = "Enter text...",
  elementRef,
  onInsertImage
}) => {
  const editorRef = React.useRef<HTMLDivElement>(null);
  
  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        style: `
          min-height: 200px;
          height: auto;
          overflow: visible;
          padding: ${ODLTheme.spacing[3]};
          font-family: inherit;
          font-size: ${ODLTheme.typography.fontSize.base};
          line-height: 1.6;
          color: ${ODLTheme.colors.text.primary};
          outline: none;
        `
      }
    }
  });

  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Handle click outside to save
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editorRef.current && !editorRef.current.contains(event.target as Node)) {
        onSave();
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onSave]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onCancel();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div style={{ 
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      position: 'relative'
    }}>
      <MenuBar editor={editor} onSave={onSave} onCancel={onCancel} onInsertImage={onInsertImage} />
      <div 
        ref={editorRef}
        onKeyDown={handleKeyDown}
        style={{
          border: `2px solid ${ODLTheme.colors.primary}`,
          borderRadius: ODLTheme.borders.radius.base,
          backgroundColor: ODLTheme.colors.white,
          overflow: 'auto',
          minHeight: '200px',
          flex: 1,
          marginTop: ODLTheme.spacing[2]
        }}
      >
        <EditorContent editor={editor} />
        <div style={{
          padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[3]}`,
          fontSize: ODLTheme.typography.fontSize.xs,
          color: ODLTheme.colors.text.secondary,
          backgroundColor: ODLTheme.colors.surface,
          borderTop: `1px solid ${ODLTheme.colors.border}`
        }}>
          Click outside to save • Esc to cancel
        </div>
      </div>
    </div>
  );
};

export default SimpleEditor;