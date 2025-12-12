import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Input label text',
      table: {
        type: { summary: 'string' },
      },
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'date', 'textarea'],
      description: 'Input type',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: 'Input value',
      table: {
        type: { summary: 'string' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Whether the input has an error',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the input',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: 'md' },
      },
    },
    rows: {
      control: 'number',
      description: 'Number of rows for textarea',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Resize behavior for textarea',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'vertical' },
      },
    },
    onChange: {
      description: 'Change event handler',
      table: {
        type: { summary: '(value: string) => void' },
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

// Basic input
export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
    type: 'text',
  },
};

// Required field
export const Required: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
    required: true,
  },
};

// With helper text
export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters',
  },
};

// Error state
export const ErrorState: Story = {
  args: {
    label: 'Username',
    value: 'admin',
    error: true,
    errorMessage: 'This username is already taken',
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    value: 'Cannot edit',
    disabled: true,
  },
};

// Textarea
export const Textarea: Story = {
  args: {
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter description...',
    rows: 4,
  },
};