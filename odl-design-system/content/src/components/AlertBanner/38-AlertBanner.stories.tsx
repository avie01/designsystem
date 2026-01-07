import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import AlertBanner from './AlertBanner';

const meta: Meta<typeof AlertBanner> = {
  title: 'Design System/Components/AlertBanner',
  component: AlertBanner,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error', 'ai-suggestion'],
      description: 'Alert variant/severity level',
      table: {
        type: { summary: '"info" | "success" | "warning" | "error" | "ai-suggestion"' },
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
      control: false,
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

// Info alert
export const Info: Story = {
  name: '01 Info',
  args: {
    variant: 'info',
    title: 'Information',
    children: 'This is an informational message.',
    visible: true,
  },
};

// Success alert
export const Success: Story = {
  name: '02 Success',
  args: {
    variant: 'success',
    title: 'Success!',
    children: 'Your changes have been saved.',
    visible: true,
  },
};

// Warning alert
export const Warning: Story = {
  name: '03 Warning',
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Please review before proceeding.',
    visible: true,
  },
};

// Error alert
export const Error: Story = {
  name: '04 Error',
  args: {
    variant: 'error',
    title: 'Error',
    children: 'An error occurred. Please try again.',
    visible: true,
  },
};

// Dismissible
export const Dismissible: Story = {
  name: '05 Dismissible',
  args: {
    variant: 'info',
    title: 'Dismissible Alert',
    children: 'Click the X to dismiss this alert.',
    dismissible: true,
    visible: true,
  },
};

// AI Suggestion
export const AISuggestion: Story = {
  name: '06 AI Suggestion',
  args: {
    variant: 'ai-suggestion',
    title: 'Search assist',
    children: "We've curated these suggestions based on your preferences and browsing history.",
    dismissible: true,
    visible: true,
  },
};