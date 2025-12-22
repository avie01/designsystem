import type { Meta, StoryObj } from '@storybook/react';
import MillerColumns, { MillerNode } from './MillerColumns';

const meta: Meta<typeof MillerColumns> = {
  title: 'Design System/Components/MillerColumns',
  component: MillerColumns,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Miller columns browser for hierarchical navigation. Displays multiple columns side-by-side, allowing users to browse through nested data structures efficiently. Popular in file browsers and hierarchical data exploration.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: false,
      table: {
        disable: true,
      },
      description: 'Root level nodes to display'
    },
    maxColumns: {
      control: { type: 'number', min: 2, max: 6 },
      description: 'Maximum number of columns to display'
    },
    columnWidth: {
      control: { type: 'number', min: 150, max: 400 },
      description: 'Width of each column in pixels'
    },
    height: {
      control: { type: 'number', min: 200, max: 800 },
      description: 'Height of the component in pixels'
    },
    showIcons: {
      control: 'boolean',
      description: 'Whether to show folder/file icons'
    },
    onNodeSelect: {
      control: false,
      table: {
        disable: true,
      },
      description: 'Callback when a node is selected'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the component',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the component is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const fileSystemData: MillerNode[] = [
  {
    id: 'root-1',
    label: 'Documents',
    type: 'folder',
    children: [
      {
        id: 'docs-1',
        label: 'Work',
        type: 'folder',
        children: [
          {
            id: 'work-1',
            label: 'Projects',
            type: 'folder',
            children: [
              { id: 'proj-1', label: 'Project Alpha.docx', type: 'file' },
              { id: 'proj-2', label: 'Project Beta.pdf', type: 'file' },
              { id: 'proj-3', label: 'Budget.xlsx', type: 'file' }
            ]
          },
          {
            id: 'work-2',
            label: 'Reports',
            type: 'folder',
            children: [
              { id: 'report-1', label: 'Q1-2024.pdf', type: 'file' },
              { id: 'report-2', label: 'Q2-2024.pdf', type: 'file' },
              { id: 'report-3', label: 'Annual-2023.pdf', type: 'file' }
            ]
          },
          { id: 'work-3', label: 'Notes.txt', type: 'file' }
        ]
      },
      {
        id: 'docs-2',
        label: 'Personal',
        type: 'folder',
        children: [
          {
            id: 'personal-1',
            label: 'Photos',
            type: 'folder',
            children: [
              { id: 'photo-1', label: 'Vacation-2024.jpg', type: 'file' },
              { id: 'photo-2', label: 'Family.jpg', type: 'file' }
            ]
          },
          {
            id: 'personal-2',
            label: 'Finance',
            type: 'folder',
            children: [
              { id: 'finance-1', label: 'Tax-Returns.pdf', type: 'file' },
              { id: 'finance-2', label: 'Receipts.xlsx', type: 'file' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'root-2',
    label: 'Downloads',
    type: 'folder',
    children: [
      { id: 'download-1', label: 'installer.dmg', type: 'file' },
      { id: 'download-2', label: 'document.pdf', type: 'file' },
      {
        id: 'download-3',
        label: 'Archive',
        type: 'folder',
        children: [
          { id: 'archive-1', label: 'old-files.zip', type: 'file' },
          { id: 'archive-2', label: 'backup.tar.gz', type: 'file' }
        ]
      }
    ]
  },
  {
    id: 'root-3',
    label: 'Applications',
    type: 'folder',
    children: [
      { id: 'app-1', label: 'Safari.app', type: 'file' },
      { id: 'app-2', label: 'Mail.app', type: 'file' },
      { id: 'app-3', label: 'Calendar.app', type: 'file' }
    ]
  }
];

const organizationData: MillerNode[] = [
  {
    id: 'org-1',
    label: 'Engineering',
    type: 'folder',
    children: [
      {
        id: 'eng-1',
        label: 'Frontend',
        type: 'folder',
        children: [
          {
            id: 'fe-1',
            label: 'React Team',
            type: 'folder',
            children: [
              { id: 'react-1', label: 'Alice Johnson', type: 'file' },
              { id: 'react-2', label: 'Bob Smith', type: 'file' },
              { id: 'react-3', label: 'Carol White', type: 'file' }
            ]
          },
          {
            id: 'fe-2',
            label: 'Vue Team',
            type: 'folder',
            children: [
              { id: 'vue-1', label: 'David Chen', type: 'file' },
              { id: 'vue-2', label: 'Emma Davis', type: 'file' }
            ]
          }
        ]
      },
      {
        id: 'eng-2',
        label: 'Backend',
        type: 'folder',
        children: [
          {
            id: 'be-1',
            label: 'API Team',
            type: 'folder',
            children: [
              { id: 'api-1', label: 'Frank Miller', type: 'file' },
              { id: 'api-2', label: 'Grace Lee', type: 'file' }
            ]
          },
          {
            id: 'be-2',
            label: 'Database Team',
            type: 'folder',
            children: [
              { id: 'db-1', label: 'Henry Zhang', type: 'file' },
              { id: 'db-2', label: 'Iris Wong', type: 'file' }
            ]
          }
        ]
      },
      {
        id: 'eng-3',
        label: 'DevOps',
        type: 'folder',
        children: [
          { id: 'devops-1', label: 'Jack Brown', type: 'file' },
          { id: 'devops-2', label: 'Kate Wilson', type: 'file' }
        ]
      }
    ]
  },
  {
    id: 'org-2',
    label: 'Design',
    type: 'folder',
    children: [
      {
        id: 'design-1',
        label: 'Product Design',
        type: 'folder',
        children: [
          { id: 'pd-1', label: 'Liam Taylor', type: 'file' },
          { id: 'pd-2', label: 'Mia Anderson', type: 'file' }
        ]
      },
      {
        id: 'design-2',
        label: 'UX Research',
        type: 'folder',
        children: [
          { id: 'ux-1', label: 'Noah Garcia', type: 'file' },
          { id: 'ux-2', label: 'Olivia Martinez', type: 'file' }
        ]
      }
    ]
  },
  {
    id: 'org-3',
    label: 'Marketing',
    type: 'folder',
    children: [
      {
        id: 'mkt-1',
        label: 'Content',
        type: 'folder',
        children: [
          { id: 'content-1', label: 'Paul Robinson', type: 'file' },
          { id: 'content-2', label: 'Quinn Clark', type: 'file' }
        ]
      },
      {
        id: 'mkt-2',
        label: 'Social Media',
        type: 'folder',
        children: [
          { id: 'social-1', label: 'Rachel Lewis', type: 'file' },
          { id: 'social-2', label: 'Sam Walker', type: 'file' }
        ]
      }
    ]
  }
];

const productCatalog: MillerNode[] = [
  {
    id: 'cat-1',
    label: 'Electronics',
    type: 'folder',
    children: [
      {
        id: 'elec-1',
        label: 'Computers',
        type: 'folder',
        children: [
          {
            id: 'comp-1',
            label: 'Laptops',
            type: 'folder',
            children: [
              { id: 'laptop-1', label: 'MacBook Pro 16"', type: 'file' },
              { id: 'laptop-2', label: 'Dell XPS 15', type: 'file' },
              { id: 'laptop-3', label: 'ThinkPad X1 Carbon', type: 'file' }
            ]
          },
          {
            id: 'comp-2',
            label: 'Desktops',
            type: 'folder',
            children: [
              { id: 'desktop-1', label: 'iMac 27"', type: 'file' },
              { id: 'desktop-2', label: 'HP Pavilion', type: 'file' }
            ]
          }
        ]
      },
      {
        id: 'elec-2',
        label: 'Mobile Devices',
        type: 'folder',
        children: [
          {
            id: 'mobile-1',
            label: 'Smartphones',
            type: 'folder',
            children: [
              { id: 'phone-1', label: 'iPhone 15 Pro', type: 'file' },
              { id: 'phone-2', label: 'Samsung Galaxy S24', type: 'file' },
              { id: 'phone-3', label: 'Google Pixel 8', type: 'file' }
            ]
          },
          {
            id: 'mobile-2',
            label: 'Tablets',
            type: 'folder',
            children: [
              { id: 'tablet-1', label: 'iPad Pro', type: 'file' },
              { id: 'tablet-2', label: 'Surface Pro 9', type: 'file' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'cat-2',
    label: 'Home & Garden',
    type: 'folder',
    children: [
      {
        id: 'home-1',
        label: 'Furniture',
        type: 'folder',
        children: [
          { id: 'furn-1', label: 'Office Chairs', type: 'file' },
          { id: 'furn-2', label: 'Standing Desks', type: 'file' },
          { id: 'furn-3', label: 'Bookcases', type: 'file' }
        ]
      },
      {
        id: 'home-2',
        label: 'Garden Tools',
        type: 'folder',
        children: [
          { id: 'garden-1', label: 'Lawn Mowers', type: 'file' },
          { id: 'garden-2', label: 'Hand Tools', type: 'file' }
        ]
      }
    ]
  }
];

export const Default: Story = {
  name: '01 Default',
  args: {
    data: fileSystemData,
    maxColumns: 4,
    columnWidth: 250,
    height: 400,
    showIcons: true
  }
};

export const OrganizationChart: Story = {
  args: {
    data: organizationData,
    maxColumns: 4,
    columnWidth: 220,
    height: 500,
    showIcons: true
  }
};

export const ProductCatalog: Story = {
  name: '03 Product Catalog',
  args: {
    data: productCatalog,
    maxColumns: 4,
    columnWidth: 240,
    height: 450,
    showIcons: true
  }
};

export const WideColumns: Story = {
  args: {
    data: fileSystemData,
    maxColumns: 3,
    columnWidth: 300,
    height: 400,
    showIcons: true
  }
};

export const NarrowColumns: Story = {
  name: '05 Narrow Columns',
  args: {
    data: organizationData,
    maxColumns: 5,
    columnWidth: 180,
    height: 500,
    showIcons: true
  }
};

export const WithoutIcons: Story = {
  args: {
    data: fileSystemData,
    maxColumns: 4,
    columnWidth: 250,
    height: 400,
    showIcons: false
  }
};

export const TallView: Story = {
  name: '07 Tall View',
  args: {
    data: productCatalog,
    maxColumns: 4,
    columnWidth: 250,
    height: 600,
    showIcons: true
  }
};

export const SizeVariants: Story = {
  name: '08 Size Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Small</h4>
        <MillerColumns
          data={fileSystemData.slice(0, 2)}
          size="sm"
          height={300}
          columnWidth={200}
          maxColumns={3}
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Medium (Default)</h4>
        <MillerColumns
          data={fileSystemData.slice(0, 2)}
          size="md"
          height={350}
          columnWidth={250}
          maxColumns={3}
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Large</h4>
        <MillerColumns
          data={fileSystemData.slice(0, 2)}
          size="lg"
          height={400}
          columnWidth={300}
          maxColumns={3}
        />
      </div>
    </div>
  ),
};

export const ThemeSupport: Story = {
  name: '09 Theme Support',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
          Theme Adaptive MillerColumns
        </h4>
        <p style={{ marginBottom: '16px', fontSize: '14px', opacity: 0.7 }}>
          Try switching between Light, Dark, and High Contrast themes using the toolbar above
        </p>
        <MillerColumns
          data={organizationData}
          maxColumns={4}
          columnWidth={250}
          height={400}
          showIcons={true}
        />
      </div>
    </div>
  ),
};
