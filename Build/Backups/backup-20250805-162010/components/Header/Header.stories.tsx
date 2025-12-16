import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Header from './Header';
import Icon from '../Icon/Icon';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    subtitle: {
      control: 'text',
    },
    compact: {
      control: 'boolean',
    },
    showBreadcrumb: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Dashboard',
    subtitle: 'Overview of your system metrics and key performance indicators',
  },
};

export const WithBreadcrumbs: Story = {
  args: {
    title: 'Analytics',
    subtitle: 'View detailed analytics and reporting',
    showBreadcrumb: true,
    breadcrumbs: [
      { label: 'Dashboard', path: '/' },
      { label: 'Analytics', path: '/analytics' },
    ],
  },
};

export const WithUser: Story = {
  args: {
    title: 'Settings',
    subtitle: 'Configure system preferences and user settings',
    user: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  },
};

export const Compact: Story = {
  args: {
    title: 'Quick Actions',
    compact: true,
    user: {
      name: 'Jane Smith',
    },
  },
};

export const WithCustomActions: Story = {
  args: {
    title: 'Project Management',
    subtitle: 'Manage your projects and tasks',
    user: {
      name: 'Admin User',
      email: 'admin@example.com',
    },
    actions: (
      <div className="flex items-center space-x-2">
        <button className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Icon name="add" className="w-4 h-4 mr-2" />
          New Project
        </button>
        <button className="px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
          <Icon name="download" className="w-4 h-4 mr-2" />
          Export
        </button>
      </div>
    ),
  },
};

export const ComplexBreadcrumbs: Story = {
  args: {
    title: 'User Profile',
    subtitle: 'Manage your account settings and preferences',
    showBreadcrumb: true,
    breadcrumbs: [
      { label: 'Dashboard', path: '/' },
      { label: 'Users', path: '/users' },
      { label: 'John Doe', path: '/users/john-doe' },
      { label: 'Profile' },
    ],
    user: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  },
}; 