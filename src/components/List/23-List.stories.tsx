import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import List, { ListItem } from './List';

const meta: Meta<typeof List> = {
  title: 'Design System/Components/List',
  component: List,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ODL List component supporting flat and hierarchical data structures with selection and expansion capabilities. Fully accessible and follows ODL design system guidelines.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: false,
      description: 'Array of list items',
      table: {
        type: { summary: 'ListItem[]' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the list',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    selectable: {
      control: 'boolean',
      description: 'Whether the list allows selection',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    multiSelect: {
      control: 'boolean',
      description: 'Whether the list allows multiple selection',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hierarchical: {
      control: 'boolean',
      description: 'Whether to show hierarchical items',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showExpandIcons: {
      control: 'boolean',
      description: 'Whether to show expand/collapse icons for hierarchical items',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    onItemClick: {
      control: false,
      table: {
        disable: true,
      },
    },
    onSelectionChange: {
      control: false,
      table: {
        disable: true,
      },
    },
    className: {
      control: false,
      table: {
        disable: true,
      },
    },
    renderItem: {
      control: false,
      table: {
        disable: true,
      },
    },
    ariaLabel: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems: ListItem[] = [
  { id: '1', label: 'Dashboard', icon: 'dashboard' },
  { id: '2', label: 'Projects', icon: 'folder' },
  { id: '3', label: 'Tasks', icon: 'task' },
  { id: '4', label: 'Settings', icon: 'settings' },
  { id: '5', label: 'Help', icon: 'help' },
];

const itemsWithCaptions: ListItem[] = [
  { id: '1', label: 'Inbox', caption: '12 new messages', icon: 'email' },
  { id: '2', label: 'Drafts', caption: '3 items', icon: 'document' },
  { id: '3', label: 'Sent', caption: '45 items', icon: 'send' },
  { id: '4', label: 'Trash', caption: 'Empty', icon: 'trash-can' },
];

const hierarchicalItems: ListItem[] = [
  {
    id: '1',
    label: 'Projects',
    icon: 'folder',
    children: [
      { id: '1-1', label: 'Website Redesign', icon: 'document' },
      { id: '1-2', label: 'Mobile App', icon: 'document' },
      { id: '1-3', label: 'API Development', icon: 'document' },
    ],
  },
  {
    id: '2',
    label: 'Documents',
    icon: 'folder',
    children: [
      { id: '2-1', label: 'Reports', icon: 'chart-bar' },
      { id: '2-2', label: 'Presentations', icon: 'presentation-file' },
      {
        id: '2-3',
        label: 'Contracts',
        icon: 'document-signed',
        children: [
          { id: '2-3-1', label: 'Q1 2024', icon: 'document' },
          { id: '2-3-2', label: 'Q2 2024', icon: 'document' },
        ],
      },
    ],
  },
  {
    id: '3',
    label: 'Media',
    icon: 'folder',
    children: [
      { id: '3-1', label: 'Images', icon: 'image' },
      { id: '3-2', label: 'Videos', icon: 'video' },
    ],
  },
];

const itemsWithDisabled: ListItem[] = [
  { id: '1', label: 'Active Item', icon: 'checkmark' },
  { id: '2', label: 'Disabled Item', icon: 'close', disabled: true },
  { id: '3', label: 'Another Active Item', icon: 'checkmark' },
];

const itemsWithSelection: ListItem[] = [
  { id: '1', label: 'Selected by default', icon: 'checkmark', selected: true },
  { id: '2', label: 'Not selected', icon: 'folder' },
  { id: '3', label: 'Also selected', icon: 'checkmark', selected: true },
  { id: '4', label: 'Not selected', icon: 'folder' },
];

export const Default: Story = {
  args: {
    items: basicItems,
    size: 'md',
  },
};

export const Sizes: Story = {
  name: '02 Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Small</h4>
        <div style={{ maxWidth: '300px' }}>
          <List items={basicItems} size="sm" />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Medium (Default)</h4>
        <div style={{ maxWidth: '300px' }}>
          <List items={basicItems} size="md" />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Large</h4>
        <div style={{ maxWidth: '400px' }}>
          <List items={itemsWithCaptions} size="lg" />
        </div>
      </div>
    </div>
  ),
};

export const WithCaptions: Story = {
  args: {
    items: itemsWithCaptions,
    size: 'lg',
  },
};

export const Hierarchical: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <List items={hierarchicalItems} hierarchical={true} />
    </div>
  ),
};

export const MultipleSelection: Story = {
  name: '05 Multiple Selection',
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
        Multiple Selection Enabled
      </h4>
      <List items={basicItems} multiSelect={true} />
    </div>
  ),
};

export const SingleSelection: Story = {
  name: '06 Single Selection',
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
        Single Selection (Default)
      </h4>
      <List items={basicItems} multiSelect={false} />
    </div>
  ),
};

export const WithDisabledItems: Story = {
  name: '07 With Disabled Items',
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <List items={itemsWithDisabled} />
    </div>
  ),
};

export const WithDefaultSelection: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <List items={itemsWithSelection} multiSelect={true} />
    </div>
  ),
};

export const NonSelectable: Story = {
  name: '09 Non Selectable',
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
        Non-Selectable List
      </h4>
      <List items={basicItems} selectable={false} />
    </div>
  ),
};

export const FileExplorer: Story = {
  name: '10 File Explorer',
  render: () => {
    const fileItems: ListItem[] = [
      {
        id: 'root',
        label: 'My Documents',
        icon: 'folder',
        children: [
          {
            id: 'projects',
            label: 'Projects',
            icon: 'folder',
            children: [
              { id: 'proj1', label: 'project-plan.pdf', icon: 'document-pdf' },
              { id: 'proj2', label: 'budget.xlsx', icon: 'document-excel' },
            ],
          },
          {
            id: 'images',
            label: 'Images',
            icon: 'folder',
            children: [
              { id: 'img1', label: 'screenshot.png', icon: 'image' },
              { id: 'img2', label: 'logo.svg', icon: 'image' },
            ],
          },
          { id: 'readme', label: 'README.md', icon: 'document' },
        ],
      },
    ];

    return (
      <div style={{ maxWidth: '500px', background: 'white', padding: '16px', borderRadius: '8px' }}>
        <List items={fileItems} hierarchical={true} size="md" />
      </div>
    );
  },
};

export const NavigationMenu: Story = {
  name: '11 Navigation Menu',
  render: () => {
    const navItems: ListItem[] = [
      {
        id: 'analytics',
        label: 'Analytics',
        icon: 'chart-line',
        children: [
          { id: 'overview', label: 'Overview', icon: 'dashboard' },
          { id: 'reports', label: 'Reports', icon: 'chart-bar' },
          { id: 'insights', label: 'Insights', icon: 'light-bulb' },
        ],
      },
      {
        id: 'users',
        label: 'Users',
        icon: 'user-multiple',
        children: [
          { id: 'all-users', label: 'All Users', icon: 'user' },
          { id: 'teams', label: 'Teams', icon: 'group' },
          { id: 'permissions', label: 'Permissions', icon: 'locked' },
        ],
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: 'settings',
        children: [
          { id: 'general', label: 'General', icon: 'settings-adjust' },
          { id: 'security', label: 'Security', icon: 'security' },
          { id: 'integrations', label: 'Integrations', icon: 'plug' },
        ],
      },
    ];

    return (
      <div style={{ maxWidth: '350px', background: 'white', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <List items={navItems} hierarchical={true} />
      </div>
    );
  },
};

export const Playground: Story = {
  name: '12 Playground',
  args: {
    items: basicItems,
    size: 'md',
    selectable: true,
    multiSelect: false,
    hierarchical: false,
    showExpandIcons: true,
  },
};

export const ThemeSupport: Story = {
  name: '13 Theme Support',
  render: () => {
    const themeItems: ListItem[] = [
      { id: '1', label: 'Primary Action', icon: 'star', selected: true },
      { id: '2', label: 'Secondary Action', icon: 'settings' },
      { id: '3', label: 'Disabled Option', icon: 'close', disabled: true },
      { 
        id: '4', 
        label: 'Nested Options', 
        icon: 'folder',
        children: [
          { id: '4-1', label: 'Sub Option 1', icon: 'document' },
          { id: '4-2', label: 'Sub Option 2', icon: 'document' },
        ]
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
            The List component automatically adapts to the current theme
          </h4>
          <p style={{ marginBottom: '16px', fontSize: '14px', opacity: 0.7 }}>
            Try switching between Light, Dark, and High Contrast themes using the toolbar above
          </p>
          <div style={{ maxWidth: '400px' }}>
            <List items={themeItems} hierarchical={true} multiSelect={true} />
          </div>
        </div>
      </div>
    );
  },
};
