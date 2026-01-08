import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Design System/Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['build', 'connect', 'keystone', 'nexus', 'keyplan', 'regworks', 'trapeze', '3sixty'],
      description: 'Header variant for different products',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'build' },
      },
    },
    userName: {
      control: 'text',
      description: 'Name of the logged-in user',
      table: {
        type: { summary: 'string' },
      },
    },
    userRole: {
      control: 'text',
      description: 'Role of the logged-in user',
      table: {
        type: { summary: 'string' },
      },
    },
    notifications: {
      control: 'number',
      description: 'Number of notifications to display',
      table: {
        type: { summary: 'number' },
      },
    },
    showSearch: {
      control: 'boolean',
      description: 'Whether to show the search button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    className: {
      control: false,
      description: 'Additional CSS classes',
      table: {
        disable: true,
        type: { summary: 'string' },
      },
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
  },
};

// Connect variant
export const Connect: Story = {
  name: '02 Connect',
  args: {
    variant: 'connect',
    userName: 'Jane Smith',
    userRole: 'Administrator',
  },
};

// Keystone variant
export const Keystone: Story = {
  args: {
    variant: 'keystone',
    userName: 'Alice Johnson',
    userRole: 'Manager',
  },
};

// Nexus variant
export const Nexus: Story = {
  name: '04 Nexus',
  args: {
    variant: 'nexus',
    userName: 'Mike Wilson',
    userRole: 'Project Manager',
  },
};

// Keyplan variant
export const Keyplan: Story = {
  name: '05 Keyplan',
  args: {
    variant: 'keyplan',
    userName: 'Sarah Brown',
    userRole: 'Urban Planner',
  },
};

// Regworks variant
export const Regworks: Story = {
  name: '06 Regworks',
  args: {
    variant: 'regworks',
    userName: 'David Lee',
    userRole: 'Compliance Officer',
  },
};

// Trapeze variant
export const Trapeze: Story = {
  name: '07 Trapeze',
  args: {
    variant: 'trapeze',
    userName: 'Emma Davis',
    userRole: 'Transport Analyst',
  },
};

// 3Sixty variant
export const ThreeSixty: Story = {
  name: '08 3Sixty',
  args: {
    variant: '3sixty',
    userName: 'Tom Garcia',
    userRole: 'Operations Manager',
  },
};

// With notifications
export const WithNotifications: Story = {
  name: '09 With Notifications',
  args: {
    variant: 'build',
    userName: 'John Doe',
    userRole: 'Planning Officer',
    notifications: 5,
  },
};

// All variants showcase
export const AllVariants: Story = {
  name: '10 All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>
        All Header Variants
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '500', color: '#666' }}>
            Build - New application + Help + Notification
          </h4>
          <Header
            variant="build"
            userName="John Doe"
            userRole="Planning Officer"
            notificationCount={3}
          />
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '500', color: '#666' }}>
            Connect - Search + Settings
          </h4>
          <Header
            variant="connect"
            userName="Jane Smith"
            userRole="Administrator"
          />
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '500', color: '#666' }}>
            Keystone - Notification only
          </h4>
          <Header
            variant="keystone"
            userName="Alice Johnson"
            userRole="Manager"
            notificationCount={1}
          />
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '500', color: '#666' }}>
            Nexus - Search only
          </h4>
          <Header
            variant="nexus"
            userName="Mike Wilson"
            userRole="Project Manager"
          />
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '500', color: '#666' }}>
            Keyplan - Notification + Settings
          </h4>
          <Header
            variant="keyplan"
            userName="Sarah Brown"
            userRole="Urban Planner"
          />
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '500', color: '#666' }}>
            Regworks - No buttons
          </h4>
          <Header
            variant="regworks"
            userName="David Lee"
            userRole="Compliance Officer"
          />
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '500', color: '#666' }}>
            Trapeze - No buttons
          </h4>
          <Header
            variant="trapeze"
            userName="Emma Davis"
            userRole="Transport Analyst"
          />
        </div>

        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '500', color: '#666' }}>
            3Sixty - Notification + Settings
          </h4>
          <Header
            variant="3sixty"
            userName="Tom Garcia"
            userRole="Operations Manager"
          />
        </div>

      </div>
    </div>
  ),
};