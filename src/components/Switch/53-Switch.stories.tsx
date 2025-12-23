import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Switch from './Switch';
import { useTheme } from '../../../.storybook/theme-decorator';

const meta: Meta<typeof Switch> = {
  title: 'Design System/Components/Switch',
  component: Switch,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ODL Switch component for boolean input with on/off states. Provides clear visual feedback and multiple size variants.',
      },
    },
  },
  tags: ['autodocs', 'Ready for dev'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked/on',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text for the switch',
      table: {
        type: { summary: 'string' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Whether the switch has an error state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the switch',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    description: {
      control: 'text',
      description: 'Description text below the switch',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      control: false,
      description: 'Change handler function',
      table: {
        type: { summary: '(checked: boolean) => void' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
      },
    },
    id: {
      control: 'text',
      description: 'ID for the switch input',
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      control: 'text',
      description: 'Name attribute for the switch input',
      table: {
        type: { summary: 'string' },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'ARIA label for accessibility when no visible label is provided',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default switch
export const Default: Story = {
  args: {
    label: 'Enable notifications',
    checked: false,
  },
};

// All States showcase
export const AllStates: Story = {
  name: '02 All States',
  render: () => {
    const { colors } = useTheme();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Switch States</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[4] || '16px' }}>
            <Switch
              label="Default (Off)"
              checked={false}
            />
            <Switch
              label="Checked (On)"
              checked={true}
            />
            <Switch
              label="Disabled Off"
              checked={false}
              disabled={true}
            />
            <Switch
              label="Disabled On"
              checked={true}
              disabled={true}
            />
            <Switch
              label="Error State"
              checked={false}
              error={true}
            />
            <Switch
              label="Error + Checked"
              checked={true}
              error={true}
            />
          </div>
        </div>
      </div>
    );
  },
};

// Size variations
export const Sizes: Story = {
  name: '03 Sizes',
  render: () => {
    const { colors } = useTheme();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Switch Sizes</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[4] || '16px' }}>
            <Switch
              size="sm"
              label="Small Switch"
              checked={true}
            />
            <Switch
              size="md"
              label="Medium Switch (Default)"
              checked={true}
            />
            <Switch
              size="lg"
              label="Large Switch"
              checked={true}
            />
          </div>
        </div>
      </div>
    );
  },
};

// Interactive switches
export const Interactive: Story = {
  name: '04 Interactive',
  render: () => {
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
    const [autoSaveEnabled, setAutoSaveEnabled] = React.useState(true);
    const { colors } = useTheme();

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Interactive Switches</h4>
          <p style={{ marginBottom: colors.spacing[4] || '16px', fontSize: colors.fontSize?.sm || '14px', color: colors.textSecondary }}>
            Try toggling these switches to see them in action.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[4] || '16px' }}>
            <Switch
              label="Push Notifications"
              description="Receive notifications about important updates"
              checked={notificationsEnabled}
              onChange={setNotificationsEnabled}
              id="notifications-switch"
            />
            <Switch
              label="Dark Mode"
              description="Switch to dark theme for better viewing in low light"
              checked={darkModeEnabled}
              onChange={setDarkModeEnabled}
              id="dark-mode-switch"
            />
            <Switch
              label="Auto Save"
              description="Automatically save your work every 5 minutes"
              checked={autoSaveEnabled}
              onChange={setAutoSaveEnabled}
              id="auto-save-switch"
            />
          </div>
        </div>
      </div>
    );
  },
};

// With descriptions
export const WithDescriptions: Story = {
  name: '05 With Descriptions',
  render: () => {
    const { colors } = useTheme();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Switches with Descriptions</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[4] || '16px' }}>
            <Switch
              label="Email Notifications"
              description="Get notified via email about important account activities"
              checked={true}
            />
            <Switch
              label="Two-Factor Authentication"
              description="Add an extra layer of security to your account"
              checked={false}
            />
            <Switch
              label="Marketing Communications"
              description="Receive updates about new features and promotions"
              checked={false}
              disabled={true}
            />
            <Switch
              label="Data Sharing"
              description="Allow anonymous usage data to help improve our services"
              checked={false}
              error={true}
            />
          </div>
        </div>
      </div>
    );
  },
};

// Layout examples
export const LayoutExamples: Story = {
  name: '06 Layout Examples',
  render: () => {
    const { colors } = useTheme();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Layout Variations</h4>
          
          {/* Compact list */}
          <div style={{ marginBottom: colors.spacing[5] || '20px' }}>
            <h5 style={{ marginBottom: colors.spacing[2] || '8px', fontSize: '12px', fontWeight: 500, color: colors.textSecondary, textTransform: 'uppercase' }}>Settings Panel</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[3] || '12px', backgroundColor: colors.grey100, padding: colors.spacing[3] || '12px', borderRadius: '8px' }}>
              <Switch
                size="sm"
                label="Show tooltips"
                checked={true}
              />
              <Switch
                size="sm"
                label="Enable keyboard shortcuts"
                checked={false}
              />
              <Switch
                size="sm"
                label="Auto-collapse sidebar"
                checked={true}
              />
            </div>
          </div>

          {/* Without labels */}
          <div>
            <h5 style={{ marginBottom: colors.spacing[2] || '8px', fontSize: '12px', fontWeight: 500, color: colors.textSecondary, textTransform: 'uppercase' }}>Standalone Switches</h5>
            <div style={{ display: 'flex', gap: colors.spacing[4] || '16px', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: colors.textPrimary }}>Features:</span>
              <Switch
                checked={true}
                aria-label="Feature A"
              />
              <Switch
                checked={false}
                aria-label="Feature B"
              />
              <Switch
                checked={true}
                aria-label="Feature C"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Accessibility example
export const Accessibility: Story = {
  name: '07 Accessibility',
  render: () => {
    const { colors } = useTheme();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Accessibility Features</h4>
          <p style={{ marginBottom: colors.spacing[4] || '16px', fontSize: colors.fontSize?.sm || '14px', color: colors.textSecondary }}>
            All switches are keyboard accessible. Use Tab to focus and Space to toggle.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[4] || '16px' }}>
            <Switch
              label="Keyboard Navigation"
              description="Focus with Tab, toggle with Space"
              checked={false}
              id="keyboard-switch"
            />
            <Switch
              label="Screen Reader Support"
              description="Includes proper ARIA labels and descriptions"
              checked={true}
              id="screen-reader-switch"
            />
            <Switch
              aria-label="Unlabeled switch with ARIA label"
              checked={false}
              id="aria-switch"
            />
          </div>
          <p style={{ marginTop: colors.spacing[4] || '16px', fontSize: colors.fontSize?.xs || '12px', color: colors.textMuted }}>
            Try using keyboard navigation to interact with these switches
          </p>
        </div>
      </div>
    );
  },
};

// Playground
export const Playground: Story = {
  name: '08 Playground',
  args: {
    label: 'Toggle Setting',
    description: 'Enable or disable this feature',
    checked: false,
    disabled: false,
    error: false,
    size: 'md',
    id: 'playground-switch',
  },
};