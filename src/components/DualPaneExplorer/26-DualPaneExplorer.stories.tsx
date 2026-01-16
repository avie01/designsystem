import type { Meta, StoryObj } from '@storybook/react';
import DualPaneExplorer, { ExplorerNode } from './DualPaneExplorer';

const meta: Meta<typeof DualPaneExplorer> = {
  title: 'Design System/Components/DualPaneExplorer',
  component: DualPaneExplorer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A dual-pane file explorer interface with a resizable tree navigation on the left and a detail view on the right. Supports metadata display, custom content, and interactive node selection.',
      },
    },
  },
  tags: ['autodocs', 'hidden'],
  argTypes: {
    data: {
      description: 'Array of explorer nodes with hierarchical structure',
      control: false,
      table: {
        disable: true,
      },
    },
    defaultSelectedId: {
      description: 'ID of the initially selected node',
      control: 'text',
    },
    splitPosition: {
      description: 'Initial split position as percentage (20-60)',
      control: { type: 'range', min: 20, max: 60, step: 5 },
    },
    showMetadata: {
      description: 'Whether to show metadata panel',
      control: 'boolean',
    },
    treeTitle: {
      description: 'Title for the tree navigation panel',
      control: 'text',
    },
    onNodeSelect: {
      description: 'Callback fired when a node is selected',
      control: false,
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const projectStructureData: ExplorerNode[] = [
  {
    id: 'src',
    label: 'src',
    type: 'folder',
    children: [
      {
        id: 'components',
        label: 'components',
        type: 'folder',
        children: [
          {
            id: 'button-tsx',
            label: 'Button.tsx',
            type: 'file',
            metadata: {
              size: '3.2 KB',
              modified: '2025-01-10',
              created: '2024-08-15',
              author: 'Sarah Chen',
            },
            content: (
              <div style={{ fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.6' }}>
                <pre style={{ margin: 0 }}>
{`import React from 'react';
import { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  ...props
}) => {
  return (
    <button className={\`btn btn-\${variant} btn-\${size}\`} {...props}>
      {children}
    </button>
  );
};`}
                </pre>
              </div>
            ),
          },
          {
            id: 'input-tsx',
            label: 'Input.tsx',
            type: 'file',
            metadata: {
              size: '4.8 KB',
              modified: '2025-01-08',
              created: '2024-08-15',
              author: 'Mike Johnson',
            },
          },
          {
            id: 'table-tsx',
            label: 'Table.tsx',
            type: 'file',
            metadata: {
              size: '12.5 KB',
              modified: '2025-01-12',
              created: '2024-09-01',
              author: 'Emily Davis',
            },
          },
        ],
      },
      {
        id: 'utils',
        label: 'utils',
        type: 'folder',
        children: [
          {
            id: 'helpers-ts',
            label: 'helpers.ts',
            type: 'file',
            metadata: {
              size: '2.1 KB',
              modified: '2025-01-05',
              created: '2024-07-20',
              author: 'Alex Kim',
            },
          },
          {
            id: 'validators-ts',
            label: 'validators.ts',
            type: 'file',
            metadata: {
              size: '5.7 KB',
              modified: '2025-01-09',
              created: '2024-08-10',
              author: 'Sarah Chen',
            },
          },
        ],
      },
      {
        id: 'styles',
        label: 'styles',
        type: 'folder',
        children: [
          {
            id: 'global-css',
            label: 'global.css',
            type: 'file',
            metadata: {
              size: '8.3 KB',
              modified: '2025-01-11',
              created: '2024-07-15',
              author: 'Emily Davis',
            },
          },
          {
            id: 'theme-css',
            label: 'theme.css',
            type: 'file',
            metadata: {
              size: '6.9 KB',
              modified: '2025-01-07',
              created: '2024-07-15',
              author: 'Mike Johnson',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'public',
    label: 'public',
    type: 'folder',
    children: [
      {
        id: 'index-html',
        label: 'index.html',
        type: 'file',
        metadata: {
          size: '1.2 KB',
          modified: '2024-12-20',
          created: '2024-07-10',
          author: 'Alex Kim',
        },
      },
      {
        id: 'favicon-ico',
        label: 'favicon.ico',
        type: 'file',
        metadata: {
          size: '15.2 KB',
          modified: '2024-08-01',
          created: '2024-07-10',
          author: 'Design Team',
        },
      },
    ],
  },
  {
    id: 'package-json',
    label: 'package.json',
    type: 'file',
    metadata: {
      size: '2.8 KB',
      modified: '2025-01-12',
      created: '2024-07-10',
      author: 'Multiple',
      version: '1.4.2',
    },
    content: (
      <div style={{ fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.6' }}>
        <pre style={{ margin: 0 }}>
{`{
  "name": "odl-design-system",
  "version": "1.4.2",
  "description": "ODL Component Library",
  "main": "dist/index.js",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}`}
        </pre>
      </div>
    ),
  },
  {
    id: 'readme-md',
    label: 'README.md',
    type: 'file',
    metadata: {
      size: '4.5 KB',
      modified: '2025-01-10',
      created: '2024-07-10',
      author: 'Multiple',
    },
  },
];

const documentLibraryData: ExplorerNode[] = [
  {
    id: 'projects',
    label: 'Projects',
    type: 'folder',
    children: [
      {
        id: 'project-alpha',
        label: 'Project Alpha',
        type: 'folder',
        metadata: {
          modified: '2025-01-12',
          created: '2024-06-01',
        },
        children: [
          {
            id: 'alpha-proposal',
            label: 'Proposal.pdf',
            type: 'file',
            metadata: {
              size: '2.4 MB',
              modified: '2024-06-15',
              created: '2024-06-05',
              author: 'Project Team',
            },
          },
          {
            id: 'alpha-budget',
            label: 'Budget.xlsx',
            type: 'file',
            metadata: {
              size: '156 KB',
              modified: '2024-12-20',
              created: '2024-06-10',
              author: 'Finance',
            },
          },
        ],
      },
      {
        id: 'project-beta',
        label: 'Project Beta',
        type: 'folder',
        metadata: {
          modified: '2025-01-10',
          created: '2024-09-15',
        },
        children: [
          {
            id: 'beta-spec',
            label: 'Specification.docx',
            type: 'file',
            metadata: {
              size: '892 KB',
              modified: '2024-11-22',
              created: '2024-09-20',
              author: 'Tech Lead',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    type: 'folder',
    children: [
      {
        id: 'q4-report',
        label: 'Q4-2024-Report.pdf',
        type: 'file',
        metadata: {
          size: '3.8 MB',
          modified: '2025-01-05',
          created: '2025-01-02',
          author: 'Analytics Team',
        },
      },
      {
        id: 'annual-summary',
        label: 'Annual-Summary.pdf',
        type: 'file',
        metadata: {
          size: '5.2 MB',
          modified: '2025-01-08',
          created: '2025-01-08',
          author: 'Executive Team',
        },
      },
    ],
  },
  {
    id: 'templates',
    label: 'Templates',
    type: 'folder',
    children: [
      {
        id: 'contract-template',
        label: 'Contract-Template.docx',
        type: 'file',
        metadata: {
          size: '124 KB',
          modified: '2024-08-15',
          created: '2024-03-10',
          author: 'Legal',
        },
      },
      {
        id: 'invoice-template',
        label: 'Invoice-Template.xlsx',
        type: 'file',
        metadata: {
          size: '89 KB',
          modified: '2024-10-01',
          created: '2024-02-20',
          author: 'Accounting',
        },
      },
    ],
  },
];

const codebaseData: ExplorerNode[] = [
  {
    id: 'frontend',
    label: 'frontend',
    type: 'folder',
    children: [
      {
        id: 'app-tsx',
        label: 'App.tsx',
        type: 'file',
        metadata: {
          size: '15.7 KB',
          modified: '2025-01-12',
          author: 'Frontend Team',
        },
      },
      {
        id: 'router-tsx',
        label: 'Router.tsx',
        type: 'file',
        metadata: {
          size: '8.9 KB',
          modified: '2025-01-11',
          author: 'Frontend Team',
        },
      },
    ],
  },
  {
    id: 'backend',
    label: 'backend',
    type: 'folder',
    children: [
      {
        id: 'server-ts',
        label: 'server.ts',
        type: 'file',
        metadata: {
          size: '12.3 KB',
          modified: '2025-01-10',
          author: 'Backend Team',
        },
      },
      {
        id: 'api',
        label: 'api',
        type: 'folder',
        children: [
          {
            id: 'users-ts',
            label: 'users.ts',
            type: 'file',
            metadata: {
              size: '6.5 KB',
              modified: '2025-01-09',
              author: 'API Team',
            },
          },
          {
            id: 'auth-ts',
            label: 'auth.ts',
            type: 'file',
            metadata: {
              size: '9.2 KB',
              modified: '2025-01-12',
              author: 'Security Team',
            },
          },
        ],
      },
    ],
  },
];

export const Default: Story = {
  args: {
    data: projectStructureData,
    splitPosition: 30,
    showMetadata: true,
    treeTitle: 'Project Files',
  },
};

export const DocumentLibrary: Story = {
  name: '02 Document Library',
  args: {
    data: documentLibraryData,
    defaultSelectedId: 'q4-report',
    splitPosition: 30,
    showMetadata: true,
    treeTitle: 'Document Library',
  },
};

export const CodeExplorer: Story = {
  args: {
    data: codebaseData,
    splitPosition: 25,
    showMetadata: true,
    treeTitle: 'Codebase',
  },
};

export const WithSelectedFile: Story = {
  name: '04 With Selected File',
  args: {
    data: projectStructureData,
    defaultSelectedId: 'button-tsx',
    splitPosition: 30,
    showMetadata: true,
    treeTitle: 'Project Files',
  },
};

export const WithSelectedPackageJson: Story = {
  args: {
    data: projectStructureData,
    defaultSelectedId: 'package-json',
    splitPosition: 30,
    showMetadata: true,
    treeTitle: 'Project Files',
  },
};

export const WideLeftPane: Story = {
  name: '06 Wide Left Pane',
  args: {
    data: projectStructureData,
    splitPosition: 45,
    showMetadata: true,
    treeTitle: 'Files',
  },
};

export const NarrowLeftPane: Story = {
  args: {
    data: projectStructureData,
    splitPosition: 20,
    showMetadata: true,
    treeTitle: 'Files',
  },
};

export const WithoutMetadata: Story = {
  name: '08 Without Metadata',
  args: {
    data: projectStructureData,
    defaultSelectedId: 'button-tsx',
    splitPosition: 30,
    showMetadata: false,
    treeTitle: 'Project Files',
  },
};

export const CustomTitle: Story = {
  args: {
    data: documentLibraryData,
    splitPosition: 30,
    showMetadata: true,
    treeTitle: 'My Documents',
  },
};

export const WithClickHandler: Story = {
  name: '10 With Click Handler',
  args: {
    data: projectStructureData,
    splitPosition: 30,
    showMetadata: true,
    treeTitle: 'Project Files',
    onNodeSelect: (node) => {
      console.log('Selected node:', node);
      alert(`Selected: ${node.label} (${node.type})`);
    },
  },
};
