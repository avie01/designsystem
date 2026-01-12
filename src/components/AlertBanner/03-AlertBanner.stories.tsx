import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import AlertBanner from './AlertBanner';
import Button from '../Button/Button';

const meta: Meta<typeof AlertBanner> = {
  title: 'Design System/Components/AlertBanner',
  component: AlertBanner,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs', 'Ready for dev'],
  args: {
    variant: 'info',
    visible: true,
    dismissible: false,
    disabled: false,
    showCloseButton: true,
    size: 'medium',
  },
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
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Component size',
      table: {
        type: { summary: '"small" | "medium" | "large"' },
        defaultValue: { summary: 'medium' },
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
    disabled: {
      control: 'boolean',
      description: 'Whether the alert is disabled',
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
      control: false,
      description: 'Additional CSS classes',
      table: {
        disable: true,
        type: { summary: 'string' },
      },
    },
    actions: {
      control: false,
      description: 'Action buttons displayed below the message',
      table: {
        type: { summary: 'React.ReactNode' },
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

// AI Suggestion with Animated Gradient Border
export const AISuggestion: Story = {
  name: '06 AI Suggestion',
  args: {
    variant: 'ai-suggestion',
    title: 'AI Suggestion',
    children: "We've curated these suggestions based on your preferences and browsing history.",
    dismissible: true,
    visible: true,
    className: 'alert-banner--gradient-persist',
  },
  parameters: {
    docs: {
      description: {
        story: 'AI Suggestion variant features a premium animated gradient border that rotates through aurora colors (purple, blue, cyan, green, yellow, orange, pink). By default, the border effect fades out after 4 seconds. Use `alert-banner--gradient-persist` class to keep it visible.',
      },
    },
  },
};

// AI Suggestion with Auto-Fade (Default Behavior)
export const AISuggestionWithFade: Story = {
  name: '06b AI Suggestion (Auto-Fade)',
  args: {
    variant: 'ai-suggestion',
    title: 'AI Insight',
    children: 'This gradient border will smoothly fade out after 4 seconds, creating a subtle attention-grabbing effect when the alert first appears.',
    dismissible: true,
    visible: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default AI Suggestion behavior - the animated gradient border fades out after 4 seconds. Refresh the page or toggle visibility to see the effect again.',
      },
    },
  },
};

// With Actions
export const WithActions: Story = {
  name: '07 With Actions',
  args: {
    variant: 'info',
    title: 'Update Available',
    children: 'A new version is available. Would you like to update now or schedule for later?',
    dismissible: true,
    visible: true,
  },
  render: (args) => (
    <AlertBanner
      {...args}
      actions={
        <>
          <Button variant="secondary" size="medium">
            Update Now
          </Button>
          <Button variant="secondary" size="medium">
            Remind Me Later
          </Button>
        </>
      }
    />
  ),
};

// With Actions - Warning
export const WithActionsWarning: Story = {
  name: '08 With Actions Warning',
  args: {
    variant: 'warning',
    title: 'Session Expiring',
    children: 'Your session will expire in 5 minutes. Save your work to avoid losing any changes.',
    dismissible: true,
    visible: true,
  },
  render: (args) => (
    <AlertBanner
      {...args}
      actions={
        <>
          <Button variant="secondary" size="medium">
            Extend Session
          </Button>
          <Button variant="secondary" size="medium">
            Save & Logout
          </Button>
        </>
      }
    />
  ),
};