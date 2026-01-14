import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import A4Editor from './A4Editor';

const meta: Meta<typeof A4Editor> = {
  title: 'Design System/Components/A4Editor',
  component: A4Editor,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A4-styled document editor component built with TipTap. Renders content within an A4 page layout with automatic page breaks, zoom control, and full rich text formatting support. Perfect for document creation, reports, and printable content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    initialContent: {
      control: 'text',
      description: 'Initial HTML content for the editor',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '<p></p>' },
      },
    },
    zoom: {
      control: { type: 'range', min: 50, max: 200, step: 10 },
      description: 'Zoom level (50-200)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when editor is empty',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Start writing...' },
      },
    },
    editable: {
      control: 'boolean',
      description: 'Whether the editor is editable',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Show loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onUpdate: {
      control: false,
      description: 'Callback when content changes',
      table: {
        type: { summary: '(html: string) => void' },
      },
    },
    className: {
      control: 'text',
      description: 'Custom className for the wrapper',
      table: {
        type: { summary: 'string' },
      },
    },
    showToolbar: {
      control: 'boolean',
      description: 'Show/hide the formatting toolbar',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    onInsertImage: {
      control: false,
      description: 'Callback for custom image insertion',
      table: {
        type: { summary: '() => void' },
      },
    },
    onInsertTable: {
      control: false,
      description: 'Callback for custom table insertion',
      table: {
        type: { summary: '() => void' },
      },
    },
    toolbarRight: {
      control: false,
      description: 'Custom content to render on the right side of the toolbar (e.g., zoom dropdown)',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '01 Default',
  render: () => {
    const [content, setContent] = useState('<p>Start typing to create your document...</p>');

    return (
      <div style={{ height: '100vh' }}>
        <A4Editor
          initialContent={content}
          onUpdate={setContent}
          placeholder="Start writing your document..."
        />
      </div>
    );
  },
};

export const WithInitialContent: Story = {
  name: '02 With Initial Content',
  render: () => {
    const [content, setContent] = useState(`
      <h1>Project Proposal</h1>
      <p><strong>Project Name:</strong> ODL Design System Enhancement</p>
      <p><strong>Date:</strong> January 2024</p>

      <h2>Executive Summary</h2>
      <p>This proposal outlines the plan to enhance the ODL Design System with additional components and improved accessibility features. The A4Editor component provides a familiar document editing experience with automatic pagination.</p>

      <h2>Key Features</h2>
      <ul>
        <li>A4 page layout with proper margins (25mm)</li>
        <li>Automatic page break detection</li>
        <li>Zoom control (50% - 200%)</li>
        <li>Full rich text formatting support</li>
        <li>Print-ready output</li>
      </ul>

      <h2>Technical Specifications</h2>
      <p>The editor uses the following dimensions:</p>
      <ul>
        <li><strong>Page Width:</strong> 210mm (A4 standard)</li>
        <li><strong>Page Height:</strong> 297mm (A4 standard)</li>
        <li><strong>Margins:</strong> 25mm on all sides</li>
        <li><strong>Content Width:</strong> 160mm</li>
      </ul>

      <h3>Supported Formatting</h3>
      <p>The editor supports various text formatting options including <strong>bold</strong>, <em>italic</em>, <u>underline</u>, and <s>strikethrough</s> text.</p>

      <p>You can also use <code>inline code</code> for technical content.</p>

      <blockquote>
        This is a blockquote. Use it to highlight important information or quotes from external sources.
      </blockquote>

      <h2>Conclusion</h2>
      <p>The A4Editor component provides a professional document editing experience that integrates seamlessly with the ODL Design System.</p>
    `);

    return (
      <div style={{ height: '100vh' }}>
        <A4Editor
          initialContent={content}
          onUpdate={setContent}
        />
      </div>
    );
  },
};

export const ZoomControl: Story = {
  name: '03 Zoom Control',
  render: () => {
    const [content, setContent] = useState('<h1>Zoom Demo</h1><p>Use the dropdown in the toolbar to adjust the zoom level of the document.</p><p>This is useful for previewing how the document will look at different sizes, or for users who need larger text for accessibility.</p>');
    const [zoom, setZoom] = useState(100);

    const zoomOptions = [50, 75, 100, 125, 150, 175, 200];

    const ZoomDropdown = (
      <select
        className="a4-zoom-select"
        value={zoom}
        onChange={(e) => setZoom(Number(e.target.value))}
        aria-label="Zoom level"
      >
        {zoomOptions.map((value) => (
          <option key={value} value={value}>
            {value}%
          </option>
        ))}
      </select>
    );

    return (
      <div style={{ height: '100vh' }}>
        <A4Editor
          initialContent={content}
          onUpdate={setContent}
          zoom={zoom}
          toolbarRight={ZoomDropdown}
        />
      </div>
    );
  },
};

export const ReadOnly: Story = {
  name: '04 Read Only',
  render: () => {
    const content = `
      <h1>Read-Only Document</h1>
      <p>This document is in read-only mode. Users can view and scroll through the content but cannot make any edits.</p>

      <h2>Use Cases</h2>
      <ul>
        <li>Document preview before export</li>
        <li>Published documents that should not be modified</li>
        <li>Viewing historical versions of documents</li>
        <li>Sharing documents with view-only access</li>
      </ul>

      <p>The read-only mode maintains all visual formatting while preventing any modifications to the content.</p>
    `;

    return (
      <div style={{ height: '100vh' }}>
        <A4Editor
          initialContent={content}
          editable={false}
        />
      </div>
    );
  },
};

export const LoadingState: Story = {
  name: '05 Loading State',
  render: () => {
    const [isLoading, setIsLoading] = useState(true);
    const [content, setContent] = useState('');

    React.useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setContent('<h1>Content Loaded</h1><p>The document content has been loaded successfully. This demonstrates how the loading state works when fetching document content asynchronously.</p>');
      }, 3000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{
          padding: '16px 24px',
          backgroundColor: '#fff',
          borderBottom: '1px solid #E0E0E0'
        }}>
          <button
            onClick={() => {
              setIsLoading(true);
              setContent('');
              setTimeout(() => {
                setIsLoading(false);
                setContent('<h1>Reloaded Content</h1><p>The document has been reloaded.</p>');
              }, 2000);
            }}
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            Reload Content
          </button>
          <span style={{ marginLeft: '16px', fontSize: '14px', color: '#525252' }}>
            {isLoading ? 'Loading...' : 'Content loaded'}
          </span>
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <A4Editor
            initialContent={content}
            onUpdate={setContent}
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  },
};

export const MultiplePages: Story = {
  name: '06 Multiple Pages',
  render: () => {
    const longContent = `
      <h1>Multi-Page Document</h1>
      <p>This document demonstrates automatic page break handling when content exceeds one page.</p>

      <h2>Chapter 1: Introduction</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

      <h2>Chapter 2: Background</h2>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>

      <h2>Chapter 3: Methodology</h2>
      <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
      <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</p>

      <h3>3.1 Data Collection</h3>
      <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>

      <h3>3.2 Analysis</h3>
      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>

      <h2>Chapter 4: Results</h2>
      <p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p>
      <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>

      <h3>4.1 Key Findings</h3>
      <ul>
        <li>Finding 1: Lorem ipsum dolor sit amet</li>
        <li>Finding 2: Consectetur adipiscing elit</li>
        <li>Finding 3: Sed do eiusmod tempor</li>
        <li>Finding 4: Incididunt ut labore</li>
      </ul>

      <h3>4.2 Statistical Analysis</h3>
      <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>

      <h2>Chapter 5: Discussion</h2>
      <p>Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

      <h2>Chapter 6: Conclusion</h2>
      <p>In conclusion, this document demonstrates the A4Editor's ability to handle multi-page documents with automatic pagination. The editor calculates content height and renders the appropriate number of page backgrounds.</p>
      <p>Page numbers are automatically displayed at the bottom of each page, and page separators help users understand where page breaks occur.</p>

      <h2>References</h2>
      <ol>
        <li>Reference 1: Author A, "Title of Work", Journal, 2024</li>
        <li>Reference 2: Author B, "Another Work", Conference, 2023</li>
        <li>Reference 3: Author C, "Third Reference", Book, 2022</li>
      </ol>
    `;

    const [content, setContent] = useState(longContent);

    return (
      <div style={{ height: '100vh' }}>
        <A4Editor
          initialContent={content}
          onUpdate={setContent}
        />
      </div>
    );
  },
};

export const EmptyDocument: Story = {
  name: '07 Empty Document',
  render: () => {
    const [content, setContent] = useState('');

    return (
      <div style={{ height: '100vh' }}>
        <A4Editor
          initialContent={content}
          onUpdate={setContent}
          placeholder="Start writing your document here..."
        />
      </div>
    );
  },
};

export const FormattingShowcase: Story = {
  name: '08 Formatting Showcase',
  render: () => {
    const formattedContent = `
      <h1>Text Formatting Guide</h1>
      <p>This document showcases all available text formatting options in the A4Editor.</p>

      <h2>Headings</h2>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>

      <h2>Text Styles</h2>
      <p><strong>Bold text</strong> - Use for emphasis</p>
      <p><em>Italic text</em> - Use for titles or foreign words</p>
      <p><u>Underlined text</u> - Use sparingly</p>
      <p><s>Strikethrough text</s> - Use for corrections</p>
      <p><strong><em>Bold and italic combined</em></strong></p>
      <p>Text with <sup>superscript</sup> and <sub>subscript</sub></p>
      <p>Inline <code>code formatting</code> for technical terms</p>
      <p>Highlighted text using <mark>mark element</mark></p>

      <h2>Lists</h2>
      <h3>Unordered List</h3>
      <ul>
        <li>First item</li>
        <li>Second item
          <ul>
            <li>Nested item 1</li>
            <li>Nested item 2</li>
          </ul>
        </li>
        <li>Third item</li>
      </ul>

      <h3>Ordered List</h3>
      <ol>
        <li>First step</li>
        <li>Second step</li>
        <li>Third step</li>
      </ol>

      <h2>Blockquote</h2>
      <blockquote>
        This is a blockquote. It's perfect for highlighting important quotes or key information that should stand out from the regular text flow.
      </blockquote>

      <h2>Code Block</h2>
      <pre><code>function hello() {
  console.log("Hello, World!");
}
hello();</code></pre>

      <h2>Links</h2>
      <p>Visit the <a href="https://example.com">ODL Design System</a> for more information.</p>

      <h2>Horizontal Rule</h2>
      <p>Content above the rule.</p>
      <hr>
      <p>Content below the rule.</p>
    `;

    const [content, setContent] = useState(formattedContent);

    return (
      <div style={{ height: '100vh' }}>
        <A4Editor
          initialContent={content}
          onUpdate={setContent}
        />
      </div>
    );
  },
};
