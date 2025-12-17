import type { Meta, StoryObj } from '@storybook/react';
import AlertBanner from './AlertBanner';
import React from 'react';

const meta: Meta<typeof AlertBanner> = {
  title: 'Components/AlertBanner',
  component: AlertBanner,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Alert banners for displaying important messages with different severity levels.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'The severity level of the alert',
    },
    title: {
      control: 'text',
      description: 'Alert title',
    },
    message: {
      control: 'text',
      description: 'Alert message content',
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed',
    },
    icon: {
      control: 'boolean',
      description: 'Whether to show an icon',
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
    message: 'This is an informational message to keep you updated.',
    icon: true,
  },
};

// Success alert
export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    message: 'Your changes have been saved successfully.',
    icon: true,
  },
};

// Warning alert
export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    message: 'Please review your input before proceeding.',
    icon: true,
  },
};

// Error alert
export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    message: 'An error occurred while processing your request. Please try again.',
    icon: true,
  },
};

// Dismissible alert
export const Dismissible: Story = {
  render: () => {
    const [isVisible, setIsVisible] = React.useState(true);
    
    if (!isVisible) {
      return (
        <button onClick={() => setIsVisible(true)}>
          Show Alert Again
        </button>
      );
    }
    
    return (
      <AlertBanner
        variant="info"
        title="Dismissible Alert"
        message="This alert can be dismissed by clicking the close button."
        dismissible
        onDismiss={() => setIsVisible(false)}
        icon
      />
    );
  },
};

// Without icon
export const WithoutIcon: Story = {
  args: {
    variant: 'info',
    title: 'Simple Alert',
    message: 'This alert does not have an icon.',
    icon: false,
  },
};

// Title only
export const TitleOnly: Story = {
  args: {
    variant: 'success',
    title: 'Operation completed successfully!',
    icon: true,
  },
};

// Message only
export const MessageOnly: Story = {
  args: {
    variant: 'warning',
    message: 'Your session will expire in 5 minutes. Please save your work.',
    icon: true,
  },
};

// With action button
export const WithAction: Story = {
  args: {
    variant: 'warning',
    title: 'Update Available',
    message: 'A new version is available. Update now to get the latest features.',
    icon: true,
    action: {
      label: 'Update Now',
      onClick: () => alert('Updating...'),
    },
  },
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <AlertBanner
        variant="info"
        title="Info"
        message="This is an informational alert."
        icon
      />
      <AlertBanner
        variant="success"
        title="Success"
        message="This is a success alert."
        icon
      />
      <AlertBanner
        variant="warning"
        title="Warning"
        message="This is a warning alert."
        icon
      />
      <AlertBanner
        variant="error"
        title="Error"
        message="This is an error alert."
        icon
      />
    </div>
  ),
};

// Complex content
export const ComplexContent: Story = {
  args: {
    variant: 'info',
    title: 'System Maintenance Notice',
    children: (
      <div>
        <p>Scheduled maintenance will occur on:</p>
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Saturday, March 15th from 2:00 AM - 4:00 AM EST</li>
          <li>Sunday, March 16th from 3:00 AM - 5:00 AM EST</li>
        </ul>
        <p style={{ marginTop: '0.5rem' }}>
          During this time, some services may be temporarily unavailable.
        </p>
      </div>
    ),
    icon: true,
  },
};

// Inline alert
export const Inline: Story = {
  args: {
    variant: 'info',
    message: 'This is an inline alert without padding adjustments.',
    inline: true,
    icon: true,
  },
};