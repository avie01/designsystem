import type { Meta, StoryObj } from '@storybook/react';
import Stepper from './Stepper';
import Button from '../Button/Button';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Forms/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    steps: {
      control: false,
      description: 'Array of step objects with title, description, status, and optional content',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Stepper orientation',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Component size',
    },
    showDescription: {
      control: 'boolean',
      description: 'Whether to show step descriptions',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the stepper is disabled',
    },
    compact: {
      control: 'boolean',
      description: 'Use compact spacing',
    },
    expandedContent: {
      control: 'boolean',
      description: 'Show expanded content for current step',
    },
    onStepClick: {
      control: false,
      description: 'Callback when a step is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const HorizontalDefault: Story = {
  args: {
    orientation: 'horizontal',
    steps: [
      {
        id: 'step-1',
        title: 'Account Details',
        description: 'Enter your basic information',
        status: 'finished',
        icon: 'user',
      },
      {
        id: 'step-2',
        title: 'Preferences',
        description: 'Choose your settings',
        status: 'current',
        icon: 'settings',
      },
      {
        id: 'step-3',
        title: 'Review',
        description: 'Confirm your choices',
        status: 'waiting',
        icon: 'checkmark',
      },
    ],
    showDescription: true,
    size: 'medium',
  },
};

export const VerticalDefault: Story = {
  args: {
    orientation: 'vertical',
    steps: [
      {
        id: 'step-1',
        title: 'Personal Information',
        description: 'Provide your name and contact details',
        status: 'finished',
      },
      {
        id: 'step-2',
        title: 'Address',
        description: 'Enter your shipping address',
        status: 'finished',
      },
      {
        id: 'step-3',
        title: 'Payment',
        description: 'Add payment method',
        status: 'current',
      },
      {
        id: 'step-4',
        title: 'Confirmation',
        description: 'Review and submit',
        status: 'waiting',
      },
    ],
    showDescription: true,
    size: 'medium',
  },
};

export const WithIcons: Story = {
  args: {
    orientation: 'horizontal',
    steps: [
      {
        id: 'step-1',
        title: 'Upload',
        description: 'Upload your documents',
        status: 'finished',
        icon: 'upload',
      },
      {
        id: 'step-2',
        title: 'Process',
        description: 'Processing your files',
        status: 'current',
        icon: 'settings',
      },
      {
        id: 'step-3',
        title: 'Complete',
        description: 'All done!',
        status: 'waiting',
        icon: 'checkmark',
      },
    ],
    showDescription: true,
    size: 'medium',
  },
};

export const WithError: Story = {
  args: {
    orientation: 'horizontal',
    steps: [
      {
        id: 'step-1',
        title: 'Create Account',
        description: 'Set up your profile',
        status: 'finished',
      },
      {
        id: 'step-2',
        title: 'Verify Email',
        description: 'Check your inbox',
        status: 'error',
      },
      {
        id: 'step-3',
        title: 'Complete Setup',
        description: 'Finish configuration',
        status: 'waiting',
      },
    ],
    showDescription: true,
    error: 'Email verification failed. Please try again.',
    size: 'medium',
  },
};

export const SmallSize: Story = {
  args: {
    orientation: 'horizontal',
    steps: [
      {
        id: 'step-1',
        title: 'Start',
        status: 'finished',
      },
      {
        id: 'step-2',
        title: 'Progress',
        status: 'current',
      },
      {
        id: 'step-3',
        title: 'End',
        status: 'waiting',
      },
    ],
    showDescription: false,
    size: 'small',
  },
};

export const LargeSize: Story = {
  args: {
    orientation: 'horizontal',
    steps: [
      {
        id: 'step-1',
        title: 'Getting Started',
        description: 'Begin your journey',
        status: 'finished',
        icon: 'rocket',
      },
      {
        id: 'step-2',
        title: 'In Progress',
        description: 'Working on it',
        status: 'current',
        icon: 'in-progress',
      },
      {
        id: 'step-3',
        title: 'Completion',
        description: 'Almost there',
        status: 'waiting',
        icon: 'star',
      },
    ],
    showDescription: true,
    size: 'large',
  },
};

export const Compact: Story = {
  args: {
    orientation: 'horizontal',
    steps: [
      {
        id: 'step-1',
        title: 'Select',
        status: 'finished',
      },
      {
        id: 'step-2',
        title: 'Configure',
        status: 'current',
      },
      {
        id: 'step-3',
        title: 'Deploy',
        status: 'waiting',
      },
      {
        id: 'step-4',
        title: 'Monitor',
        status: 'waiting',
      },
    ],
    showDescription: false,
    compact: true,
    size: 'small',
  },
};

export const WithExpandedContent: Story = {
  args: {
    orientation: 'vertical',
    steps: [
      {
        id: 'step-1',
        title: 'Account Setup',
        description: 'Create your account credentials',
        status: 'finished',
      },
      {
        id: 'step-2',
        title: 'Profile Details',
        description: 'Fill in your profile information',
        status: 'current',
        content: (
          <div style={{ padding: '16px 0' }}>
            <p style={{ marginBottom: '12px', color: '#666' }}>
              Please provide the following information to complete your profile.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 500 }}>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 500 }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                />
              </div>
            </div>
          </div>
        ),
        actions: (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="secondary" size="sm">
              Back
            </Button>
            <Button variant="primary" size="sm">
              Continue
            </Button>
          </div>
        ),
      },
      {
        id: 'step-3',
        title: 'Preferences',
        description: 'Set your notification preferences',
        status: 'waiting',
      },
    ],
    showDescription: true,
    expandedContent: true,
    size: 'medium',
  },
};

export const ClickableSteps: Story = {
  args: {
    orientation: 'horizontal',
    steps: [
      {
        id: 'step-1',
        title: 'Basic Info',
        description: 'Your details',
        status: 'finished',
      },
      {
        id: 'step-2',
        title: 'Address',
        description: 'Location',
        status: 'current',
      },
      {
        id: 'step-3',
        title: 'Review',
        description: 'Confirm',
        status: 'waiting',
      },
    ],
    showDescription: true,
    onStepClick: (stepIndex, step) => {
      console.log(`Clicked step ${stepIndex}:`, step.title);
    },
    size: 'medium',
  },
};

export const AllCompleted: Story = {
  args: {
    orientation: 'horizontal',
    steps: [
      {
        id: 'step-1',
        title: 'Registration',
        description: 'Account created',
        status: 'finished',
        icon: 'user',
      },
      {
        id: 'step-2',
        title: 'Verification',
        description: 'Email confirmed',
        status: 'finished',
        icon: 'email',
      },
      {
        id: 'step-3',
        title: 'Setup Complete',
        description: 'Ready to go',
        status: 'finished',
        icon: 'checkmark',
      },
    ],
    showDescription: true,
    size: 'medium',
  },
};

export const LongVerticalStepper: Story = {
  args: {
    orientation: 'vertical',
    steps: [
      {
        id: 'step-1',
        title: 'Project Initialization',
        description: 'Set up project structure',
        status: 'finished',
      },
      {
        id: 'step-2',
        title: 'Install Dependencies',
        description: 'Download required packages',
        status: 'finished',
      },
      {
        id: 'step-3',
        title: 'Configure Environment',
        description: 'Set up environment variables',
        status: 'finished',
      },
      {
        id: 'step-4',
        title: 'Database Setup',
        description: 'Initialize database schema',
        status: 'current',
      },
      {
        id: 'step-5',
        title: 'Run Tests',
        description: 'Execute test suite',
        status: 'waiting',
      },
      {
        id: 'step-6',
        title: 'Deploy',
        description: 'Push to production',
        status: 'waiting',
      },
    ],
    showDescription: true,
    size: 'medium',
  },
};

export const Disabled: Story = {
  args: {
    orientation: 'horizontal',
    steps: [
      {
        id: 'step-1',
        title: 'Start',
        description: 'Begin process',
        status: 'finished',
      },
      {
        id: 'step-2',
        title: 'Current',
        description: 'In progress',
        status: 'current',
      },
      {
        id: 'step-3',
        title: 'End',
        description: 'Complete',
        status: 'waiting',
      },
    ],
    showDescription: true,
    disabled: true,
    size: 'medium',
  },
};
