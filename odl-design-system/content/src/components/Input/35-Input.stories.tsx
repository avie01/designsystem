import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Design System/Components/Input',
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
      control: false,
      table: {
        disable: true,
      },
      description: 'Change event handler',
    },
    className: {
      control: false,
      table: {
        disable: true,
      },
      description: 'Additional CSS classes',
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
  name: '02 Required',
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
  name: '04 Error State',
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
  name: '06 Textarea',
  args: {
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter description...',
    rows: 4,
  },
};


// Input Variants Showcase
export const AllVariants: Story = {
  name: '07 All Variants',
  render: () => (
    <div style={{ 
      display: 'grid', 
      gap: '24px',
      width: '100%',
      maxWidth: '600px',
      padding: '16px'
    }}>
      <div>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          marginBottom: '16px',
          color: 'var(--odl-text-primary)'
        }}>
          Input Types
        </h3>
        <div style={{ display: 'grid', gap: '16px' }}>
          <Input 
            label="Text Input" 
            type="text" 
            placeholder="Enter text" 
          />
          <Input 
            label="Email" 
            type="email" 
            placeholder="user@example.com" 
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••" 
          />
          <Input 
            label="Number" 
            type="number" 
            placeholder="0" 
          />
          <Input 
            label="Phone" 
            type="tel" 
            placeholder="(555) 123-4567" 
          />
          <Input 
            label="Date" 
            type="date" 
          />
          <Input 
            label="URL" 
            type="url" 
            placeholder="https://example.com" 
          />
        </div>
      </div>

      <div>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          marginBottom: '16px',
          color: 'var(--odl-text-primary)'
        }}>
          Sizes
        </h3>
        <div style={{ display: 'grid', gap: '16px' }}>
          <Input 
            label="Small Input" 
            size="sm" 
            placeholder="Small size" 
          />
          <Input 
            label="Medium Input" 
            size="md" 
            placeholder="Medium size (default)" 
          />
          <Input 
            label="Large Input" 
            size="lg" 
            placeholder="Large size" 
          />
        </div>
      </div>

      <div>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          marginBottom: '16px',
          color: 'var(--odl-text-primary)'
        }}>
          States
        </h3>
        <div style={{ display: 'grid', gap: '16px' }}>
          <Input 
            label="Default State" 
            placeholder="Normal input" 
          />
          <Input 
            label="Required Field" 
            required 
            placeholder="This field is required" 
          />
          <Input 
            label="With Helper Text" 
            placeholder="Enter value" 
            helperText="This text provides additional guidance" 
          />
          <Input 
            label="Error State" 
            error 
            errorMessage="Something went wrong" 
            value="Invalid value" 
          />
          <Input 
            label="Disabled Input" 
            disabled 
            value="Cannot edit this" 
          />
        </div>
      </div>

      <div>
        <h3 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          marginBottom: '16px',
          color: 'var(--odl-text-primary)'
        }}>
          Textarea Variants
        </h3>
        <div style={{ display: 'grid', gap: '16px' }}>
          <Input 
            label="Default Textarea" 
            type="textarea" 
            placeholder="Enter long text..." 
            rows={3}
          />
          <Input 
            label="Large Textarea" 
            type="textarea" 
            placeholder="Enter detailed description..." 
            rows={6}
            size="lg"
          />
          <Input 
            label="Non-resizable Textarea" 
            type="textarea" 
            placeholder="Fixed size..." 
            rows={4}
            resize="none"
          />
          <Input 
            label="Horizontal Resize Only" 
            type="textarea" 
            placeholder="Resize horizontally..." 
            rows={3}
            resize="horizontal"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};