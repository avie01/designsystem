import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import NavigationRail from './NavigationRail';
import Icon from '../Icon/Icon';

const meta: Meta<typeof NavigationRail> = {
  title: 'Design System/Components/NavigationRail',
  component: NavigationRail,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', display: 'flex' }}>
        <Story />
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5' }}>
          <h1>Main Content Area</h1>
          <p>This is the main content area that would be displayed alongside the navigation rail.</p>
        </div>
      </div>
    ),
  ],
  argTypes: {
    currentPath: {
      control: 'text',
      description: 'Current active path',
      table: {
        disable: true,
        type: { summary: 'string' },
      },
    },
    collapsed: {
      control: 'boolean',
      description: 'Whether the rail is collapsed (shows only icons)',
      table: {
        disable: true,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showTooltips: {
      control: 'boolean',
      description: 'Whether to show tooltips on hover',
      table: {
        disable: true,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the navigation rail',
      table: {
        disable: true,
        type: { summary: '"left" | "right"' },
        defaultValue: { summary: 'left' },
      },
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Theme variant',
      table: {
        disable: true,
        type: { summary: '"light" | "dark"' },
        defaultValue: { summary: 'light' },
      },
    },
    showHelpIcon: {
      control: 'boolean',
      description: 'Whether to show help icon at bottom',
      table: {
        disable: true,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showCollapseToggle: {
      control: 'boolean',
      description: 'Whether to show collapse toggle button',
      table: {
        disable: true,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onNavigate: {
      description: 'Callback when navigation occurs',
      table: {
        disable: true,
        type: { summary: '(path: string) => void' },
      },
    },
    onHelpClick: {
      description: 'Callback for help icon click',
      table: {
        disable: true,
        type: { summary: '() => void' },
      },
    },
    onCollapseToggle: {
      description: 'Callback for collapse toggle',
      table: {
        disable: true,
        type: { summary: '(collapsed: boolean) => void' },
      },
    },
    menuItems: {
      control: false,
      description: 'Array of menu items to display',
      table: {
        disable: true,
        type: { summary: 'MenuItem[]' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultMenuItems = [
  { 
    id: 'dashboard', 
    iconName: 'dashboard', 
    label: 'Dashboard', 
    path: '/',
    description: 'Overview of your system metrics and key performance indicators',
    shortcut: '⌘+D'
  },
  { 
    id: 'search', 
    iconName: 'search', 
    label: 'Search', 
    path: '/search',
    description: 'Search and discover content across your organization',
    shortcut: '⌘+K'
  },
  { 
    id: 'security', 
    iconName: 'security', 
    label: 'Security', 
    path: '/security',
    description: 'Manage security settings and monitor system protection',
    shortcut: '⌘+Shift+S'
  },
  { 
    id: 'messages', 
    iconName: 'notification', 
    label: 'Messages', 
    path: '/messages',
    description: 'View and manage your messages and notifications',
    shortcut: '⌘+M'
  },
  { 
    id: 'settings', 
    iconName: 'settings', 
    label: 'Settings', 
    path: '/settings',
    description: 'Configure system preferences and user settings',
    shortcut: '⌘+,'
  },
  { 
    id: 'development', 
    iconName: 'code', 
    label: 'Development', 
    path: '/development',
    description: 'Access development tools and resources',
    shortcut: '⌘+Shift+D'
  },
  { 
    id: 'blog', 
    iconName: 'document', 
    label: 'Blog', 
    path: '/blog',
    description: 'Read the latest updates and technical articles',
    shortcut: '⌘+B'
  },
  { 
    id: 'management', 
    iconName: 'user-multiple', 
    label: 'Management', 
    path: '/management',
    description: 'Manage users, roles, and system administration',
    shortcut: '⌘+U'
  },
  { 
    id: 'analytics', 
    iconName: 'analytics', 
    label: 'Analytics', 
    path: '/analytics',
    description: 'View detailed analytics and reporting',
    shortcut: '⌘+A'
  },
  { 
    id: 'catalog', 
    iconName: 'folder', 
    label: 'Catalog', 
    path: '/catalog',
    description: 'Browse and manage your content catalog',
    shortcut: '⌘+Shift+C'
  },
];

export const Default: Story = {
  name: '01 Default',
  render: (args) => {
    const [collapsed, setCollapsed] = React.useState(false);
    
    return (
      <NavigationRail
        {...args}
        collapsed={collapsed}
        showCollapseToggle={true}
        onCollapseToggle={(newCollapsed) => {
          setCollapsed(newCollapsed);
          console.log('Collapse toggled:', newCollapsed);
        }}
      />
    );
  },
  args: {
    currentPath: '/',
    menuItems: defaultMenuItems,
    onNavigate: (path) => console.log('Navigate to:', path),
  },
};

export const Collapsed: Story = {
  name: '02 Collapsed',
  render: (args) => {
    const [collapsed, setCollapsed] = React.useState(true);
    
    return (
      <NavigationRail
        {...args}
        collapsed={collapsed}
        showCollapseToggle={true}
        onCollapseToggle={(newCollapsed) => {
          setCollapsed(newCollapsed);
          console.log('Collapse toggled:', newCollapsed);
        }}
      />
    );
  },
  args: {
    currentPath: '/search',
    menuItems: defaultMenuItems,
    onNavigate: (path) => console.log('Navigate to:', path),
  },
};

export const WithToggleButton: Story = {
  name: '03 With Toggle Button',
  render: (args) => {
    const [collapsed, setCollapsed] = React.useState(false);
    
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="relative">
          <NavigationRail 
            {...args}
            collapsed={collapsed}
          />
          
          {/* Toggle button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:shadow-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 z-10"
            aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
          >
            <Icon 
              name={collapsed ? 'chevron-right' : 'chevron-left'} 
              className="w-4 h-4 text-gray-600"
            />
          </button>
        </div>
        
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Navigation with Toggle</h1>
          <p className="text-gray-600">
            Click the chevron button to toggle the navigation rail. 
            The navigation smoothly animates between collapsed and expanded states.
          </p>
        </div>
      </div>
    );
  },
  args: {
    currentPath: '/',
    menuItems: defaultMenuItems,
    showCollapseToggle: true,
    onNavigate: (path) => console.log('Navigate to:', path),
    onCollapseToggle: (collapsed) => console.log('Collapse toggled:', collapsed),
  },
};


export const RightPosition: Story = {
  name: '04 Right Position',
  render: (args) => {
    const [collapsed, setCollapsed] = React.useState(false);
    
    return (
      <NavigationRail
        {...args}
        collapsed={collapsed}
        position="right"
        showCollapseToggle={true}
        onCollapseToggle={(newCollapsed) => {
          setCollapsed(newCollapsed);
          console.log('Collapse toggled:', newCollapsed);
        }}
      />
    );
  },
  args: {
    currentPath: '/settings',
    menuItems: defaultMenuItems,
    onNavigate: (path) => console.log('Navigate to:', path),
  },
};

export const WithDisabledItems: Story = {
  name: '05 With Disabled Items',
  render: (args) => {
    const [collapsed, setCollapsed] = React.useState(false);
    
    return (
      <NavigationRail
        {...args}
        collapsed={collapsed}
        showCollapseToggle={true}
        onCollapseToggle={(newCollapsed) => {
          setCollapsed(newCollapsed);
          console.log('Collapse toggled:', newCollapsed);
        }}
      />
    );
  },
  args: {
    currentPath: '/',
    menuItems: [
      ...defaultMenuItems.slice(0, 3),
      { 
        id: 'disabled', 
        iconName: 'status-help', 
        label: 'Disabled Item', 
        path: '/disabled',
        disabled: true,
        description: 'This item is disabled'
      },
      ...defaultMenuItems.slice(3),
    ],
    onNavigate: (path) => console.log('Navigate to:', path),
  },
};

export const NoTooltips: Story = {
  name: '06 No Tooltips',
  render: (args) => {
    const [collapsed, setCollapsed] = React.useState(true);
    
    return (
      <NavigationRail
        {...args}
        collapsed={collapsed}
        showTooltips={false}
        showCollapseToggle={true}
        onCollapseToggle={(newCollapsed) => {
          setCollapsed(newCollapsed);
          console.log('Collapse toggled:', newCollapsed);
        }}
      />
    );
  },
  args: {
    currentPath: '/',
    menuItems: defaultMenuItems,
    onNavigate: (path) => console.log('Navigate to:', path),
  },
}; 