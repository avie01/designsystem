import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import NavigationRail from './NavigationRail';
import Icon from '../Icon/Icon';
import { DesignTokensProvider } from '../../design-system/DesignTokens';

const meta: Meta<typeof NavigationRail> = {
  title: 'Components/NavigationRail',
  component: NavigationRail,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <DesignTokensProvider>
        <div style={{ height: '100vh', display: 'flex' }}>
          <Story />
          <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5' }}>
            <h1>Main Content Area</h1>
            <p>This is the main content area that would be displayed alongside the navigation rail.</p>
          </div>
        </div>
      </DesignTokensProvider>
    ),
  ],
  argTypes: {
    currentPath: {
      control: 'text',
    },
    collapsed: {
      control: 'boolean',
    },
    showTooltips: {
      control: 'boolean',
    },
    position: {
      control: 'select',
      options: ['left', 'right'],
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
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
    description: 'Overview of your system metrics and key performance indicators'
  },
  { 
    id: 'search', 
    iconName: 'search', 
    label: 'Search', 
    path: '/search',
    description: 'Search and discover content across your organization'
  },
  { 
    id: 'security', 
    iconName: 'security', 
    label: 'Security', 
    path: '/security',
    description: 'Manage security settings and monitor system protection'
  },
  { 
    id: 'messages', 
    iconName: 'notification', 
    label: 'Messages', 
    path: '/messages',
    description: 'View and manage your messages and notifications'
  },
  { 
    id: 'settings', 
    iconName: 'settings', 
    label: 'Settings', 
    path: '/settings',
    description: 'Configure system preferences and user settings'
  },
  { 
    id: 'development', 
    iconName: 'code', 
    label: 'Development', 
    path: '/development',
    description: 'Access development tools and resources'
  },
  { 
    id: 'blog', 
    iconName: 'document', 
    label: 'Blog', 
    path: '/blog',
    description: 'Read the latest updates and technical articles'
  },
  { 
    id: 'management', 
    iconName: 'user-multiple', 
    label: 'Management', 
    path: '/management',
    description: 'Manage users, roles, and system administration'
  },
  { 
    id: 'analytics', 
    iconName: 'analytics', 
    label: 'Analytics', 
    path: '/analytics',
    description: 'View detailed analytics and reporting'
  },
  { 
    id: 'catalog', 
    iconName: 'folder', 
    label: 'Catalog', 
    path: '/catalog',
    description: 'Browse and manage your content catalog'
  },
];

export const Default: Story = {
  args: {
    currentPath: '/',
    menuItems: defaultMenuItems,
    onNavigate: (path) => console.log('Navigate to:', path),
  },
};

export const Collapsed: Story = {
  args: {
    currentPath: '/search',
    menuItems: defaultMenuItems,
    collapsed: true,
    onNavigate: (path) => console.log('Navigate to:', path),
  },
};

export const WithToggleButton: Story = {
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
    onNavigate: (path) => console.log('Navigate to:', path),
  },
};

export const DarkTheme: Story = {
  args: {
    currentPath: '/security',
    menuItems: defaultMenuItems,
    theme: 'dark',
    onNavigate: (path) => console.log('Navigate to:', path),
  },
};

export const RightPosition: Story = {
  args: {
    currentPath: '/settings',
    menuItems: defaultMenuItems,
    position: 'right',
    onNavigate: (path) => console.log('Navigate to:', path),
  },
};

export const WithDisabledItems: Story = {
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
  args: {
    currentPath: '/',
    menuItems: defaultMenuItems,
    collapsed: true,
    showTooltips: false,
    onNavigate: (path) => console.log('Navigate to:', path),
  },
}; 