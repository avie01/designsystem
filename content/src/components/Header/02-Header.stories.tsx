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
      options: ['build', 'connect', 'keystone'],
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

// With notifications
export const WithNotifications: Story = {
  name: '04 With Notifications',
  args: {
    variant: 'build',
    userName: 'John Doe',
    userRole: 'Planning Officer',
    notifications: 5,
  },
};