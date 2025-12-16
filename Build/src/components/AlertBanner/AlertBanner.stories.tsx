import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import AlertBanner from './AlertBanner';

const meta: Meta<typeof AlertBanner> = {
  title: 'Components/AlertBanner',
  component: AlertBanner,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Alert variant/severity level',
      table: {
        type: { summary: '"info" | "success" | "warning" | "error"' },
        defaultValue: { summary: 'info' },
      },
    },
    title: {
      control: 'text',
      description: 'Alert title text',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      control: 'text',
      description: 'Alert message content',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    visible: {
      control: 'boolean',
      description: 'Whether the alert is visible',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onDismiss: {
      action: 'dismissed',
      description: 'Callback when alert is dismissed',
      table: {
        type: { summary: '() => void' },
      },
    },
    autoDismiss: {
      control: 'number',
      description: 'Auto-dismiss after milliseconds',
      table: {
        type: { summary: 'number' },
      },
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show close button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
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

// Info alert
export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'This is an informational message.',
    visible: true,
  },
};

// Success alert
export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    children: 'Your changes have been saved.',
    visible: true,
  },
};

// Warning alert
export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Please review before proceeding.',
    visible: true,
  },
};

// Error alert
export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'An error occurred. Please try again.',
    visible: true,
  },
};

// Dismissible
export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'Dismissible Alert',
    children: 'Click the X to dismiss this alert.',
    dismissible: true,
    visible: true,
  },
};