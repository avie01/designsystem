import type { Meta, StoryObj } from '@storybook/react';
import TreeNavigation, { TreeNode } from './TreeNavigation';

const meta: Meta<typeof TreeNavigation> = {
  title: 'Design System/Components/TreeNavigation',
  component: TreeNavigation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Hierarchical folder navigation with expand/collapse functionality for organizing content. Perfect for file explorers, navigation menus, and document structures.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Header title for the tree navigation'
    },
    nodes: {
      control: false,
      table: {
        disable: true,
      },
      description: 'Array of tree nodes to display'
    },
    selectedNodeId: {
      control: 'text',
      description: 'ID of the currently selected node'
    },
    expandedNodeIds: {
      control: false,
      table: {
        disable: true,
      },
      description: 'Array of node IDs that should be expanded by default'
    },
    showFilter: {
      control: 'boolean',
      description: 'Whether to show the filter icon in the header'
    },
    hideScrollbar: {
      control: 'boolean',
      description: 'Whether to hide the scrollbar'
    },
    onNodeSelect: {
      control: false,
      table: {
        disable: true,
      },
      description: 'Callback when a node is selected'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicNodes: TreeNode[] = [
  {
    id: '1',
    label: 'Network Defense',
    type: 'folder',
    children: []
  },
  {
    id: '2',
    label: 'Security Policies',
    type: 'folder',
    children: [
      { id: '2-1', label: 'Security Audits', type: 'folder', children: [] },
      { id: '2-2', label: 'Incident Response', type: 'folder', children: [] }
    ]
  },
  {
    id: '3',
    label: 'Threat Intelligence',
    type: 'folder',
    children: []
  }
];

const documentsNodes: TreeNode[] = [
  {
    id: 'doc-1',
    label: 'Project Documentation',
    type: 'folder',
    children: [
      { id: 'doc-1-1', label: 'README.md', type: 'file' },
      { id: 'doc-1-2', label: 'CHANGELOG.md', type: 'file' },
      { id: 'doc-1-3', label: 'LICENSE', type: 'file' },
      {
        id: 'doc-1-4',
        label: 'Technical Specs',
        type: 'folder',
        children: [
          { id: 'doc-1-4-1', label: 'architecture.pdf', type: 'file' },
          { id: 'doc-1-4-2', label: 'database-schema.sql', type: 'file' },
          { id: 'doc-1-4-3', label: 'api-documentation.md', type: 'file' }
        ]
      }
    ]
  },
  {
    id: 'doc-2',
    label: 'Contracts',
    type: 'folder',
    children: [
      { id: 'doc-2-1', label: 'service-agreement.pdf', type: 'file' },
      { id: 'doc-2-2', label: 'nda-template.docx', type: 'file' },
      {
        id: 'doc-2-3',
        label: '2024 Contracts',
        type: 'folder',
        children: [
          { id: 'doc-2-3-1', label: 'q1-contracts.zip', type: 'file' },
          { id: 'doc-2-3-2', label: 'q2-contracts.zip', type: 'file' }
        ]
      }
    ]
  },
  {
    id: 'doc-3',
    label: 'Reports',
    type: 'folder',
    children: [
      { id: 'doc-3-1', label: 'annual-report-2024.pdf', type: 'file' },
      { id: 'doc-3-2', label: 'quarterly-metrics.xlsx', type: 'file' }
    ]
  }
];

const deepNodes: TreeNode[] = [
  {
    id: 'a1',
    label: 'Infrastructure',
    type: 'folder',
    children: [
      {
        id: 'a1-1',
        label: 'Network Security',
        type: 'folder',
        children: [
          { id: 'a1-1-1', label: 'Firewall Rules', type: 'file' },
          { id: 'a1-1-2', label: 'VPN Configuration', type: 'file' },
          { id: 'a1-1-3', label: 'DMZ Setup', type: 'file' }
        ]
      },
      {
        id: 'a1-2',
        label: 'Cloud Security',
        type: 'folder',
        children: [
          { id: 'a1-2-1', label: 'AWS Policies', type: 'file' },
          { id: 'a1-2-2', label: 'Azure Security', type: 'file' },
          { id: 'a1-2-3', label: 'GCP Controls', type: 'file' }
        ]
      }
    ]
  },
  {
    id: 'a2',
    label: 'Application Security',
    type: 'folder',
    children: [
      {
        id: 'a2-1',
        label: 'Web Applications',
        type: 'folder',
        children: [
          { id: 'a2-1-1', label: 'OWASP Top 10', type: 'file' },
          { id: 'a2-1-2', label: 'XSS Prevention', type: 'file' }
        ]
      },
      {
        id: 'a2-2',
        label: 'Mobile Security',
        type: 'folder',
        children: [
          { id: 'a2-2-1', label: 'iOS Security', type: 'file' },
          { id: 'a2-2-2', label: 'Android Security', type: 'file' }
        ]
      }
    ]
  }
];

export const Default: Story = {
  name: '01 Default',
  args: {
    title: 'Global folder',
    nodes: basicNodes,
    showFilter: true
  }
};

export const WithDocuments: Story = {
  args: {
    title: 'Document Repository',
    nodes: documentsNodes,
    expandedNodeIds: ['doc-1', 'doc-1-4'],
    showFilter: true
  }
};

export const DeepNesting: Story = {
  name: '03 Deep Nesting',
  args: {
    title: 'Security Framework',
    nodes: deepNodes,
    expandedNodeIds: ['a1', 'a1-1', 'a2'],
    showFilter: true
  }
};

export const NoFilter: Story = {
  args: {
    title: 'Organization Structure',
    nodes: basicNodes,
    showFilter: false
  }
};

export const WithSelection: Story = {
  name: '05 With Selection',
  args: {
    title: 'Project Explorer',
    nodes: documentsNodes,
    selectedNodeId: 'doc-1-1',
    expandedNodeIds: ['doc-1'],
    showFilter: true
  }
};
