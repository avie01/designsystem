import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import Breadcrumb from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A breadcrumb component for showing navigation hierarchy. Supports clickable items with path navigation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of breadcrumb items with label, optional path, and optional icon',
      table: {
        type: { 
          summary: 'BreadcrumbItem[]',
          detail: `interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: string;
}`
        },
        category: 'Data',
      },
    },
    separator: {
      control: 'text',
      description: 'Separator between breadcrumb items (default is chevron icon)',
      table: {
        type: { summary: 'string | React.ReactNode' },
        defaultValue: { summary: 'ChevronIcon' },
        category: 'Appearance',
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling',
      table: {
        type: { summary: 'string' },
        category: 'Appearance',
      },
    },
    onNavigate: {
      control: false,
      action: 'navigated',
      description: 'Callback function when a breadcrumb item with a path is clicked. Check the Actions tab to see navigation events.',
      table: {
        type: { summary: '(path: string) => void' },
        category: 'Events',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic breadcrumb with navigation
export const Default: Story = {
  args: {
    items: [
      { label: 'Home', path: '/' },
      { label: 'Products', path: '/products' },
      { label: 'Electronics', path: '/products/electronics' },
      { label: 'Laptops' }, // Current page (no path)
    ],
    onNavigate: action('breadcrumb-clicked'),
  },
};

// Short breadcrumb
export const Short: Story = {
  args: {
    items: [
      { label: 'Home', path: '/' },
      { label: 'Settings' },
    ],
    onNavigate: action('breadcrumb-clicked'),
  },
};

// Long breadcrumb trail
export const LongTrail: Story = {
  args: {
    items: [
      { label: 'Home', path: '/' },
      { label: 'Documents', path: '/documents' },
      { label: 'Projects', path: '/documents/projects' },
      { label: '2024', path: '/documents/projects/2024' },
      { label: 'Q1', path: '/documents/projects/2024/q1' },
      { label: 'Reports', path: '/documents/projects/2024/q1/reports' },
      { label: 'Final Report' },
    ],
    onNavigate: action('breadcrumb-clicked'),
  },
};

// Application context
export const ApplicationContext: Story = {
  args: {
    items: [
      { label: 'Applications', path: '/applications' },
      { label: 'Development', path: '/applications/development' },
      { label: 'DA/2024/1234' },
    ],
    onNavigate: action('breadcrumb-clicked'),
  },
};

// File system navigation
export const FileSystem: Story = {
  args: {
    items: [
      { label: 'Root', path: '/' },
      { label: 'Users', path: '/users' },
      { label: 'John', path: '/users/john' },
      { label: 'Documents', path: '/users/john/documents' },
      { label: 'Work', path: '/users/john/documents/work' },
      { label: 'Reports' },
    ],
    onNavigate: action('breadcrumb-clicked'),
  },
};

// Dashboard breadcrumb
export const Dashboard: Story = {
  args: {
    items: [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Analytics', path: '/dashboard/analytics' },
      { label: 'Performance Metrics' },
    ],
    onNavigate: action('breadcrumb-clicked'),
  },
};

// Settings navigation
export const Settings: Story = {
  args: {
    items: [
      { label: 'Settings', path: '/settings' },
      { label: 'Account', path: '/settings/account' },
      { label: 'Security', path: '/settings/account/security' },
      { label: 'Two-Factor Authentication' },
    ],
    onNavigate: action('breadcrumb-clicked'),
  },
};

// Interactive example with all items clickable
export const AllClickable: Story = {
  args: {
    items: [
      { label: 'Level 1', path: '/level1' },
      { label: 'Level 2', path: '/level2' },
      { label: 'Level 3', path: '/level3' },
      { label: 'Level 4', path: '/level4' },
    ],
    onNavigate: action('breadcrumb-clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'All items are clickable. Check the Actions tab to see navigation events.',
      },
    },
  },
};

// Non-interactive breadcrumb (display only)
export const DisplayOnly: Story = {
  args: {
    items: [
      { label: 'Home' },
      { label: 'Products' },
      { label: 'Electronics' },
      { label: 'Laptops' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb without paths - display only, no navigation.',
      },
    },
  },
};

// With custom className
export const CustomStyling: Story = {
  args: {
    items: [
      { label: 'Home', path: '/' },
      { label: 'Custom', path: '/custom' },
      { label: 'Styled' },
    ],
    className: 'custom-breadcrumb-class',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with custom className for additional styling.',
      },
    },
  },
};

// Custom separator - slash
export const SlashSeparator: Story = {
  args: {
    items: [
      { label: 'Home', path: '/' },
      { label: 'Products', path: '/products' },
      { label: 'Electronics', path: '/products/electronics' },
      { label: 'Laptops' },
    ],
    separator: '/',
    onNavigate: action('breadcrumb-clicked'),
  },
};

// Custom separator - arrow
export const ArrowSeparator: Story = {
  args: {
    items: [
      { label: 'Step 1', path: '/step1' },
      { label: 'Step 2', path: '/step2' },
      { label: 'Step 3', path: '/step3' },
      { label: 'Complete' },
    ],
    separator: '→',
    onNavigate: action('breadcrumb-clicked'),
  },
};

// Custom separator - pipe
export const PipeSeparator: Story = {
  args: {
    items: [
      { label: 'Admin', path: '/admin' },
      { label: 'Users', path: '/admin/users' },
      { label: 'Permissions', path: '/admin/users/permissions' },
      { label: 'Edit' },
    ],
    separator: '|',
    onNavigate: action('breadcrumb-clicked'),
  },
};

// Custom separator - double chevron
export const DoubleChevronSeparator: Story = {
  args: {
    items: [
      { label: 'Start', path: '/start' },
      { label: 'Middle', path: '/middle' },
      { label: 'End' },
    ],
    separator: '»',
    onNavigate: action('breadcrumb-clicked'),
  },
};

// Custom separator - dot
export const DotSeparator: Story = {
  args: {
    items: [
      { label: 'Category', path: '/category' },
      { label: 'Subcategory', path: '/subcategory' },
      { label: 'Item' },
    ],
    separator: '•',
    onNavigate: action('breadcrumb-clicked'),
  },
};

// Playground for testing
export const Playground: Story = {
  args: {
    items: [
      { label: 'First', path: '/first' },
      { label: 'Second', path: '/second' },
      { label: 'Third', path: '/third' },
      { label: 'Current' },
    ],
    onNavigate: action('breadcrumb-clicked'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the controls below to experiment with different breadcrumb configurations.',
      },
    },
  },
};