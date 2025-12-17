import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Table from './Table';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'object',
      description: 'Column definitions for the table',
      table: {
        type: { summary: 'Column[]' },
      },
    },
    data: {
      control: 'object',
      description: 'Data rows to display in the table',
      table: {
        type: { summary: 'any[]' },
      },
    },
    striped: {
      control: 'boolean',
      description: 'Whether to show alternating row colors',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hoverable: {
      control: 'boolean',
      description: 'Whether rows show hover effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    sortable: {
      control: 'boolean',
      description: 'Whether columns are sortable',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    emptyMessage: {
      control: 'text',
      description: 'Message to show when table has no data',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'No data available' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'Active' },
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
];

// Basic table
export const Default: Story = {
  args: {
    data: sampleData,
    columns: columns,
  },
};

// Striped rows
export const Striped: Story = {
  args: {
    data: sampleData,
    columns: columns,
    striped: true,
  },
};

// With hover effect
export const Hoverable: Story = {
  args: {
    data: sampleData,
    columns: columns,
    hoverable: true,
  },
};

// Sortable columns
export const Sortable: Story = {
  args: {
    data: sampleData,
    columns: columns.map(col => ({ ...col, sortable: true })),
    sortable: true,
  },
};

// Empty state
export const EmptyState: Story = {
  args: {
    data: [],
    columns: columns,
    emptyMessage: 'No data available',
  },
};