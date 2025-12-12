import type { Meta, StoryObj } from '@storybook/react';
import BreadcrumbGrid, { GridItem } from './BreadcrumbGrid';

const mockData: GridItem[] = [
  {
    id: 'projects',
    label: 'Projects',
    type: 'folder',
    fileCount: 12,
    modified: 'Today',
    children: [
      {
        id: 'planning',
        label: 'Planning Applications',
        type: 'folder',
        fileCount: 5,
        status: 'review',
        children: [
          { id: 'da-001', label: 'DA-2024-001.pdf', type: 'file', size: '2.4 MB', status: 'approved' },
          { id: 'da-002', label: 'DA-2024-002.pdf', type: 'file', size: '1.8 MB', status: 'draft' },
          { id: 'site-plan', label: 'Site Plan.dwg', type: 'file', size: '5.2 MB' },
        ],
      },
      {
        id: 'reports',
        label: 'Reports',
        type: 'folder',
        fileCount: 8,
        children: [
          { id: 'annual-2023', label: 'Annual Report 2023.pdf', type: 'file', size: '4.1 MB' },
          { id: 'quarterly-q4', label: 'Q4 Summary.xlsx', type: 'file', size: '890 KB' },
        ],
      },
    ],
  },
  {
    id: 'documents',
    label: 'Documents',
    type: 'folder',
    fileCount: 24,
    modified: 'Yesterday',
    sharedWith: 5,
    children: [
      { id: 'policy-1', label: 'Policy Guidelines.docx', type: 'file', size: '156 KB', owner: 'John Smith' },
      { id: 'template-1', label: 'Application Template.docx', type: 'file', size: '89 KB', owner: 'Jane Doe' },
    ],
  },
  {
    id: 'images',
    label: 'Images',
    type: 'folder',
    fileCount: 45,
    modified: '2 days ago',
    children: [
      { id: 'site-photo-1', label: 'Site Photo 1.jpg', type: 'file', size: '3.2 MB' },
      { id: 'site-photo-2', label: 'Site Photo 2.jpg', type: 'file', size: '2.8 MB' },
      { id: 'aerial-view', label: 'Aerial View.png', type: 'file', size: '5.6 MB' },
    ],
  },
  {
    id: 'archives',
    label: 'Archives',
    type: 'folder',
    fileCount: 156,
    modified: 'Last week',
    status: 'archived',
    children: [],
  },
  { id: 'readme', label: 'README.md', type: 'file', size: '4 KB', modified: 'Today' },
  { id: 'config', label: 'config.json', type: 'file', size: '2 KB', modified: 'Yesterday' },
];

const meta: Meta<typeof BreadcrumbGrid> = {
  title: 'Components/Navigation/BreadcrumbGrid',
  component: BreadcrumbGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: false,
      description: 'Array of grid items with hierarchical structure',
    },
    gridColumns: {
      control: { type: 'range', min: 3, max: 8, step: 1 },
      description: 'Number of columns in the grid',
    },
    showDetails: {
      control: 'boolean',
      description: 'Whether to show item details like size and modified date',
    },
    onNavigate: {
      control: false,
      description: 'Callback when navigating to a folder',
    },
    onItemClick: {
      control: false,
      description: 'Callback when clicking a file item',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: mockData,
    showDetails: true,
  },
};

export const CompactView: Story = {
  args: {
    data: mockData,
    showDetails: false,
  },
};

export const WithCallbacks: Story = {
  args: {
    data: mockData,
    showDetails: true,
    onNavigate: (path) => console.log('Navigated to:', path.map(p => p.label).join(' > ')),
    onItemClick: (item) => console.log('Clicked item:', item.label),
  },
};

export const EmptyFolder: Story = {
  args: {
    data: [
      {
        id: 'empty-folder',
        label: 'Empty Folder',
        type: 'folder',
        fileCount: 0,
        children: [],
      },
    ],
    showDetails: true,
  },
};

export const FilesOnly: Story = {
  args: {
    data: [
      { id: 'doc-1', label: 'Document.pdf', type: 'file', size: '1.2 MB', modified: 'Today' },
      { id: 'doc-2', label: 'Spreadsheet.xlsx', type: 'file', size: '890 KB', modified: 'Yesterday' },
      { id: 'doc-3', label: 'Presentation.pptx', type: 'file', size: '3.4 MB', modified: '2 days ago' },
      { id: 'doc-4', label: 'Image.jpg', type: 'file', size: '2.1 MB', modified: 'Last week' },
      { id: 'doc-5', label: 'Archive.zip', type: 'file', size: '15.6 MB', modified: 'Last month' },
      { id: 'doc-6', label: 'Code.tsx', type: 'file', size: '12 KB', modified: 'Today' },
    ],
    showDetails: true,
  },
};

export const WithStatusAndPriority: Story = {
  args: {
    data: [
      { id: 'f1', label: 'Urgent Review.pdf', type: 'file', size: '2.1 MB', status: 'review', priority: 'urgent' },
      { id: 'f2', label: 'Approved Plan.pdf', type: 'file', size: '1.5 MB', status: 'approved', priority: 'high' },
      { id: 'f3', label: 'Draft Document.docx', type: 'file', size: '890 KB', status: 'draft', priority: 'medium' },
      { id: 'f4', label: 'Archived Report.pdf', type: 'file', size: '3.2 MB', status: 'archived', priority: 'low' },
    ],
    showDetails: true,
  },
};
