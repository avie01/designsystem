import React from 'react';
import { TextStyleKit } from '@tiptap/extension-text-style';
import type { Editor } from '@tiptap/react';
import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import Icon from '../Icon/Icon';
import ODLTheme from '../../styles/ODLTheme';
import styles from './SimpleEditor.module.css';

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

function MenuBar({ editor, onCancel, onInsertImage }: { editor: Editor; onSave: () => void; onCancel: () => void; onInsertImage?: () => void }) {
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
    }),
  });

  const getButtonClass = (isActive: boolean) =>
    `${styles.iconButton} ${isActive ? styles.iconButtonActive : ''}`;

  return (
    <div className={styles.menuBar}>
      <div className={styles.menuHeader}>
        <h2 className={styles.menuTitle}>Formatting Tools</h2>
        <button
          onClick={onCancel}
          className={styles.closeButton}
          aria-label="Close formatting tools"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 5L5 15M5 5l10 10" />
          </svg>
        </button>
      </div>

      <div className={styles.toolbar}>
        <button
          className={getButtonClass(editorState.isBold)}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          aria-label="Bold"
          aria-pressed={editorState.isBold}
        >
          <Icon name="text-bold" size={18} />
        </button>
        <button
          className={getButtonClass(editorState.isItalic)}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          aria-label="Italic"
          aria-pressed={editorState.isItalic}
        >
          <Icon name="text-italic" size={18} />
        </button>
        <button
          className={getButtonClass(editorState.isUnderline)}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editorState.canUnderline}
          aria-label="Underline"
          aria-pressed={editorState.isUnderline}
        >
          <Icon name="text-underline" size={18} />
        </button>
        <button
          className={getButtonClass(editorState.isStrike)}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          aria-label="Strikethrough"
          aria-pressed={editorState.isStrike}
        >
          <Icon name="text-strikethrough" size={18} />
        </button>
        <button
          className={getButtonClass(editorState.isCode)}
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          aria-label="Inline code"
          aria-pressed={editorState.isCode}
        >
          <Icon name="code" size={18} />
        </button>

        <div className={styles.divider} />

        <button
          className={getButtonClass(editorState.isParagraph)}
          onClick={() => editor.chain().focus().setParagraph().run()}
          aria-label="Paragraph"
          aria-pressed={editorState.isParagraph}
        >
          <span className={styles.headingLabel}>P</span>
        </button>
        <button
          className={getButtonClass(editorState.isHeading1)}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          aria-label="Heading 1"
          aria-pressed={editorState.isHeading1}
        >
          <span className={styles.headingLabel}>H1</span>
        </button>
        <button
          className={getButtonClass(editorState.isHeading2)}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          aria-label="Heading 2"
          aria-pressed={editorState.isHeading2}
        >
          <span className={styles.headingLabel}>H2</span>
        </button>
        <button
          className={getButtonClass(editorState.isHeading3)}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          aria-label="Heading 3"
          aria-pressed={editorState.isHeading3}
        >
          <span className={styles.headingLabel}>H3</span>
        </button>

        <div className={styles.divider} />

        <button
          className={getButtonClass(editorState.isBulletList)}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Bullet list"
          aria-pressed={editorState.isBulletList}
        >
          <Icon name="list-bulleted" size={18} />
        </button>
        <button
          className={getButtonClass(editorState.isOrderedList)}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Ordered list"
          aria-pressed={editorState.isOrderedList}
        >
          <Icon name="list-numbered" size={18} />
        </button>

        <div className={styles.divider} />

        <button
          type="button"
          className={styles.iconButton}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            alert('Table insertion not yet implemented');
          }}
          aria-label="Insert table"
        >
          <Icon name="table" size={18} />
        </button>
        <button
          className={styles.iconButton}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onInsertImage) {
              onInsertImage();
            } else {
              alert('Image insertion not yet implemented');
            }
          }}
          aria-label="Insert image"
          type="button"
        >
          <Icon name="image" size={18} />
        </button>
        <button
          type="button"
          className={styles.iconButton}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            alert('Graph insertion not yet implemented');
          }}
          aria-label="Insert graph"
        >
          <Icon name="chart-line" size={18} />
        </button>

        <div className={styles.divider} />

        <button
          className={styles.iconButton}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
          aria-label="Undo"
        >
          <Icon name="undo" size={18} />
        </button>
        <button
          className={styles.iconButton}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
          aria-label="Redo"
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

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (editorRef.current && !editorRef.current.contains(event.target as Node)) {
        onSave();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

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
    <div className={styles.editorContainer}>
      <MenuBar editor={editor} onSave={onSave} onCancel={onCancel} onInsertImage={onInsertImage} />
      <div
        ref={editorRef}
        onKeyDown={handleKeyDown}
        className={styles.editorWrapper}
      >
        <EditorContent editor={editor} />
        <div className={styles.editorFooter}>
          Click outside to save • Esc to cancel
        </div>
      </div>
    </div>
  );
};

export default SimpleEditor;
