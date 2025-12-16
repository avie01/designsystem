import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Application header with product branding, navigation, and user profile. Supports multiple ODL product variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['build', 'connect', 'keystone', 'nexus', 'regworks', '3sixty', 'custom'],
      description: 'Product variant for styling and branding',
    },
    userName: {
      control: 'text',
      description: 'Name of the logged-in user',
    },
    userRole: {
      control: 'text',
      description: 'Role of the logged-in user',
    },
    showSearch: {
      control: 'boolean',
      description: 'Whether to show the search functionality',
    },
    notifications: {
      control: 'number',
      description: 'Number of unread notifications',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Build variant
export const Build: Story = {
  args: {
    variant: 'build',
    userName: 'John Doe',
    userRole: 'Planning Officer',
    notifications: 3,
  },
};

// Connect variant
export const Connect: Story = {
  args: {
    variant: 'connect',
    userName: 'Jane Smith',
    userRole: 'Administrator',
    showSearch: true,
    notifications: 5,
  },
};

// Keystone variant
export const Keystone: Story = {
  args: {
    variant: 'keystone',
    userName: 'Alice Johnson',
    userRole: 'Manager',
    showSearch: true,
  },
};

// Nexus variant
export const Nexus: Story = {
  args: {
    variant: 'nexus',
    userName: 'Bob Williams',
    userRole: 'Developer',
    showSearch: true,
    notifications: 1,
  },
};

// Regworks variant
export const Regworks: Story = {
  args: {
    variant: 'regworks',
    userName: 'Charlie Brown',
    userRole: 'Compliance Officer',
    showSearch: true,
  },
};

// 3Sixty variant
export const ThreeSixty: Story = {
  args: {
    variant: '3sixty',
    userName: 'Diana Prince',
    userRole: 'HR Manager',
    showSearch: true,
    notifications: 2,
  },
};

// Custom variant
export const Custom: Story = {
  args: {
    variant: 'custom',
    customBrandColor: '#9333ea',
    customLogoText: 'MyApp',
    userName: 'Custom User',
    userRole: 'Custom Role',
    showSearch: true,
  },
};

// With navigation items
export const WithNavigation: Story = {
  args: {
    variant: 'build',
    userName: 'John Doe',
    userRole: 'Planning Officer',
    navigationItems: [
      { label: 'Dashboard', href: '/', active: true },
      { label: 'Applications', href: '/applications' },
      { label: 'Reports', href: '/reports' },
      { label: 'Settings', href: '/settings' },
    ],
  },
};

// With dropdown menus
export const WithDropdowns: Story = {
  args: {
    variant: 'connect',
    userName: 'Jane Smith',
    userRole: 'Administrator',
    dropdownMenus: [
      {
        label: 'Projects',
        items: [
          { label: 'Active Projects', href: '/projects/active' },
          { label: 'Archived Projects', href: '/projects/archived' },
          { label: 'Create New', href: '/projects/new' },
        ],
      },
      {
        label: 'Team',
        items: [
          { label: 'Members', href: '/team/members' },
          { label: 'Roles', href: '/team/roles' },
          { label: 'Permissions', href: '/team/permissions' },
        ],
      },
    ],
  },
};

// Mobile responsive
export const MobileView: Story = {
  args: {
    variant: 'build',
    userName: 'John Doe',
    userRole: 'Planning Officer',
    mobileMenuOpen: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Build</h3>
        <Header variant="build" userName="User" userRole="Role" />
      </div>
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Connect</h3>
        <Header variant="connect" userName="User" userRole="Role" />
      </div>
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Keystone</h3>
        <Header variant="keystone" userName="User" userRole="Role" />
      </div>
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Nexus</h3>
        <Header variant="nexus" userName="User" userRole="Role" />
      </div>
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>Regworks</h3>
        <Header variant="regworks" userName="User" userRole="Role" />
      </div>
      <div>
        <h3 style={{ marginBottom: '0.5rem' }}>3Sixty</h3>
        <Header variant="3sixty" userName="User" userRole="Role" />
      </div>
    </div>
  ),
};