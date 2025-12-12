import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import SimpleEditor from './SimpleEditor';
import Button from '../Button/Button';

const meta: Meta<typeof SimpleEditor> = {
  title: 'Components/Editors/SimpleEditor',
  component: SimpleEditor,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Rich text editor component built with TipTap. Supports formatting, headings, lists, and inline code. Perfect for document editing and content creation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'HTML content for the editor',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      description: 'Callback when content changes',
      table: {
        type: { summary: '(content: string) => void' },
      },
    },
    onSave: {
      description: 'Callback when save is triggered',
      table: {
        type: { summary: '() => void' },
      },
    },
    onCancel: {
      description: 'Callback when cancel is triggered',
      table: {
        type: { summary: '() => void' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        type: { summary: 'string' },
      },
    },
    onInsertImage: {
      description: 'Callback when insert image is clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [content, setContent] = useState('<p>Start typing to edit this text...</p>');
    const [isEditing, setIsEditing] = useState(true);

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {!isEditing ? (
          <div>
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <Button onClick={() => setIsEditing(true)} style={{ marginTop: '16px' }}>
              Edit
            </Button>
          </div>
        ) : (
          <SimpleEditor
            content={content}
            onChange={setContent}
            onSave={() => {
              setIsEditing(false);
              console.log('Saved:', content);
            }}
            onCancel={() => {
              setIsEditing(false);
              console.log('Cancelled');
            }}
          />
        )}
      </div>
    );
  },
};

export const WithInitialContent: Story = {
  render: () => {
    const [content, setContent] = useState(`
      <h1>Document Title</h1>
      <p>This is a paragraph with <strong>bold text</strong>, <em>italic text</em>, and <u>underlined text</u>.</p>
      <h2>Features</h2>
      <ul>
        <li>Text formatting (bold, italic, underline, strikethrough)</li>
        <li>Headings (H1 to H6)</li>
        <li>Lists (bulleted and numbered)</li>
        <li>Inline code formatting</li>
      </ul>
      <h3>Code Example</h3>
      <p>You can add inline code like <code>const x = 42;</code> within text.</p>
    `);

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <SimpleEditor
          content={content}
          onChange={setContent}
          onSave={() => console.log('Saved:', content)}
          onCancel={() => console.log('Cancelled')}
        />
      </div>
    );
  },
};

export const EmptyEditor: Story = {
  render: () => {
    const [content, setContent] = useState('');

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <SimpleEditor
          content={content}
          onChange={setContent}
          onSave={() => console.log('Saved:', content)}
          onCancel={() => console.log('Cancelled')}
          placeholder="Start writing your document..."
        />
      </div>
    );
  },
};

export const DocumentEditor: Story = {
  render: () => {
    const [content, setContent] = useState(`
      <h1>Project Proposal</h1>
      <p><strong>Project Name:</strong> ODL Design System Enhancement</p>
      <p><strong>Date:</strong> January 2024</p>

      <h2>Executive Summary</h2>
      <p>This proposal outlines the plan to enhance the ODL Design System with additional components and improved accessibility features.</p>

      <h2>Objectives</h2>
      <ol>
        <li>Expand component library with 20 new components</li>
        <li>Achieve WCAG 2.1 AA compliance across all components</li>
        <li>Improve documentation and examples</li>
        <li>Add Storybook integration for better component showcase</li>
      </ol>

      <h2>Timeline</h2>
      <p>The project is expected to take <strong>3 months</strong> to complete, starting February 1, 2024.</p>

      <h3>Phase 1: Planning (Weeks 1-2)</h3>
      <ul>
        <li>Requirements gathering</li>
        <li>Component prioritization</li>
        <li>Architecture review</li>
      </ul>

      <h3>Phase 2: Development (Weeks 3-10)</h3>
      <ul>
        <li>Component development</li>
        <li>Accessibility testing</li>
        <li>Documentation writing</li>
      </ul>

      <h3>Phase 3: Testing & Launch (Weeks 11-12)</h3>
      <ul>
        <li>Integration testing</li>
        <li>User acceptance testing</li>
        <li>Production deployment</li>
      </ul>

      <h2>Resources</h2>
      <p>Required resources include:</p>
      <ul>
        <li>2 Frontend Developers</li>
        <li>1 UX Designer</li>
        <li>1 QA Engineer</li>
        <li>1 Technical Writer</li>
      </ul>
    `);

    return (
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px' }}>
        <SimpleEditor
          content={content}
          onChange={setContent}
          onSave={() => {
            alert('Document saved successfully!');
            console.log('Content:', content);
          }}
          onCancel={() => {
            if (confirm('Discard changes?')) {
              console.log('Changes discarded');
            }
          }}
        />
      </div>
    );
  },
};

export const WithImageHandler: Story = {
  render: () => {
    const [content, setContent] = useState('<p>Click the image button in the toolbar to insert an image.</p>');

    const handleInsertImage = () => {
      const imageUrl = prompt('Enter image URL:');
      if (imageUrl) {
        console.log('Insert image:', imageUrl);
        alert(`Image insertion would add: ${imageUrl}\n\nNote: Full image insertion requires additional TipTap configuration.`);
      }
    };

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <SimpleEditor
          content={content}
          onChange={setContent}
          onSave={() => console.log('Saved:', content)}
          onCancel={() => console.log('Cancelled')}
          onInsertImage={handleInsertImage}
        />
      </div>
    );
  },
};

export const FormattingShowcase: Story = {
  render: () => {
    const [content, setContent] = useState(`
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>

      <p>This is a regular paragraph with <strong>bold</strong>, <em>italic</em>, <u>underlined</u>, and <s>strikethrough</s> text.</p>

      <p>You can also use <code>inline code</code> formatting.</p>

      <h3>Unordered List</h3>
      <ul>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </ul>

      <h3>Ordered List</h3>
      <ol>
        <li>First step</li>
        <li>Second step</li>
        <li>Third step</li>
      </ol>

      <h3>Mixed Formatting</h3>
      <p><strong><em>Bold and italic combined</em></strong></p>
      <p><u><strong>Underlined and bold</strong></u></p>
      <p><s><em>Strikethrough and italic</em></s></p>
    `);

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>
            <strong>Tip:</strong> This example showcases all available formatting options.
            Try selecting text and using the toolbar to apply different styles.
          </p>
        </div>
        <SimpleEditor
          content={content}
          onChange={setContent}
          onSave={() => console.log('Saved:', content)}
          onCancel={() => console.log('Cancelled')}
        />
      </div>
    );
  },
};

export const MinimalSetup: Story = {
  render: () => {
    const [content, setContent] = useState('');

    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h3 style={{ marginBottom: '16px' }}>Quick Note</h3>
        <SimpleEditor
          content={content}
          onChange={setContent}
          onSave={() => {
            console.log('Note saved:', content);
            alert('Note saved!');
          }}
          onCancel={() => {
            setContent('');
          }}
        />
      </div>
    );
  },
};

export const Playground: Story = {
  render: () => {
    const [content, setContent] = useState('<p>Edit this text and explore the toolbar options...</p>');

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <SimpleEditor
          content={content}
          onChange={setContent}
          onSave={() => console.log('Saved:', content)}
          onCancel={() => console.log('Cancelled')}
        />
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <h4 style={{ marginTop: 0 }}>HTML Output Preview:</h4>
          <pre style={{
            backgroundColor: '#fff',
            padding: '12px',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '12px',
            maxHeight: '200px'
          }}>
            {content}
          </pre>
        </div>
      </div>
    );
  },
};
