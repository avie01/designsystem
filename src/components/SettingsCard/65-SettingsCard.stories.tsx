import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import SettingsCard from './SettingsCard';
import { useTheme } from '../../../.storybook/theme-decorator';

const meta: Meta<typeof SettingsCard> = {
  title: 'Design System/Components/SettingsCard',
  component: SettingsCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A card component designed for settings and configuration interfaces. Supports icons, toggles, navigation arrows, and various states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Primary text content',
    },
    description: {
      control: 'text',
      description: 'Secondary description text',
    },
    icon: {
      control: 'text',
      description: 'Icon name to display on the left',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the card is disabled',
    },
    showToggle: {
      control: 'boolean',
      description: 'Whether to show a toggle switch',
    },
    toggled: {
      control: 'boolean',
      description: 'Toggle state',
    },
    showArrow: {
      control: 'boolean',
      description: 'Whether to show navigation arrow',
    },
    showDivider: {
      control: 'boolean',
      description: 'Whether to show bottom divider',
    },
    value: {
      control: 'text',
      description: 'Value text displayed on the right',
    },
    tag: {
      control: 'text',
      description: 'Tag/badge text',
    },
    tagVariant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'Tag color variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '01 Default',
  args: {
    title: 'General Settings',
    description: 'Configure general application preferences',
    icon: 'settings',
    showArrow: true,
  },
};

export const WithToggle: Story = {
  name: '02 With Toggle',
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [autoSave, setAutoSave] = useState(true);

    return (
      <div style={{ maxWidth: '500px' }}>
        <SettingsCard
          title="Push Notifications"
          description="Receive push notifications for important updates"
          icon="notification"
          showToggle
          toggled={notifications}
          onToggle={setNotifications}
        />
        <SettingsCard
          title="Dark Mode"
          description="Enable dark theme across the application"
          icon="moon"
          showToggle
          toggled={darkMode}
          onToggle={setDarkMode}
        />
        <SettingsCard
          title="Auto-save"
          description="Automatically save changes as you work"
          icon="save"
          showToggle
          toggled={autoSave}
          onToggle={setAutoSave}
          showDivider={false}
        />
      </div>
    );
  },
};

export const WithNavigation: Story = {
  name: '03 With Navigation',
  render: () => {
    const { colors } = useTheme();

    return (
      <div style={{ maxWidth: '500px', border: `1px solid ${colors.border}`, borderRadius: '8px', overflow: 'hidden' }}>
        <SettingsCard
          title="Account"
          description="Manage your account settings"
          icon="user-avatar"
          showArrow
          onClick={() => alert('Navigate to Account')}
        />
        <SettingsCard
          title="Privacy"
          description="Control your privacy preferences"
          icon="locked"
          showArrow
          onClick={() => alert('Navigate to Privacy')}
        />
        <SettingsCard
          title="Security"
          description="Manage security and login options"
          icon="security"
          showArrow
          onClick={() => alert('Navigate to Security')}
        />
        <SettingsCard
          title="Notifications"
          description="Configure notification preferences"
          icon="notification"
          showArrow
          onClick={() => alert('Navigate to Notifications')}
          showDivider={false}
        />
      </div>
    );
  },
};

export const WithValues: Story = {
  name: '04 With Values',
  render: () => {
    const { colors } = useTheme();

    return (
      <div style={{ maxWidth: '500px', border: `1px solid ${colors.border}`, borderRadius: '8px', overflow: 'hidden' }}>
        <SettingsCard
          title="Language"
          icon="globe"
          value="English (US)"
          showArrow
          onClick={() => alert('Change Language')}
        />
        <SettingsCard
          title="Time Zone"
          icon="time"
          value="Pacific Time (PT)"
          showArrow
          onClick={() => alert('Change Time Zone')}
        />
        <SettingsCard
          title="Date Format"
          icon="calendar"
          value="MM/DD/YYYY"
          showArrow
          onClick={() => alert('Change Date Format')}
        />
        <SettingsCard
          title="Currency"
          icon="currency"
          value="USD ($)"
          showArrow
          onClick={() => alert('Change Currency')}
          showDivider={false}
        />
      </div>
    );
  },
};

export const WithTags: Story = {
  name: '05 With Tags',
  render: () => {
    const { colors } = useTheme();

    return (
      <div style={{ maxWidth: '500px', border: `1px solid ${colors.border}`, borderRadius: '8px', overflow: 'hidden' }}>
        <SettingsCard
          title="Two-Factor Authentication"
          description="Add an extra layer of security"
          icon="security"
          tag="Enabled"
          tagVariant="success"
          showArrow
          onClick={() => alert('Manage 2FA')}
        />
        <SettingsCard
          title="Backup Settings"
          description="Configure automatic backups"
          icon="cloud-upload"
          tag="Pending"
          tagVariant="warning"
          showArrow
          onClick={() => alert('Manage Backups')}
        />
        <SettingsCard
          title="API Access"
          description="Manage API keys and tokens"
          icon="api"
          tag="Expired"
          tagVariant="error"
          showArrow
          onClick={() => alert('Manage API')}
        />
        <SettingsCard
          title="Beta Features"
          description="Try new features before release"
          icon="star"
          tag="New"
          tagVariant="info"
          showArrow
          onClick={() => alert('Manage Beta Features')}
          showDivider={false}
        />
      </div>
    );
  },
};

export const DisabledStates: Story = {
  name: '06 Disabled States',
  render: () => {
    const { colors } = useTheme();

    return (
      <div style={{ maxWidth: '500px', border: `1px solid ${colors.border}`, borderRadius: '8px', overflow: 'hidden' }}>
        <SettingsCard
          title="Enabled Setting"
          description="This setting is available"
          icon="checkmark"
          showArrow
          onClick={() => alert('Clicked')}
        />
        <SettingsCard
          title="Disabled Setting"
          description="This setting is not available"
          icon="close"
          showArrow
          disabled
          onClick={() => alert('This should not fire')}
        />
        <SettingsCard
          title="Disabled Toggle"
          description="Toggle is disabled"
          icon="locked"
          showToggle
          toggled={true}
          disabled
        />
        <SettingsCard
          title="Another Enabled Setting"
          description="This one works fine"
          icon="checkmark"
          showArrow
          onClick={() => alert('Clicked')}
          showDivider={false}
        />
      </div>
    );
  },
};

export const WithoutIcons: Story = {
  name: '07 Without Icons',
  render: () => {
    const { colors } = useTheme();

    return (
      <div style={{ maxWidth: '500px', border: `1px solid ${colors.border}`, borderRadius: '8px', overflow: 'hidden' }}>
        <SettingsCard
          title="Email Preferences"
          description="Manage your email notification settings"
          showArrow
          onClick={() => alert('Navigate')}
        />
        <SettingsCard
          title="Data Export"
          description="Download a copy of your data"
          showArrow
          onClick={() => alert('Navigate')}
        />
        <SettingsCard
          title="Delete Account"
          description="Permanently delete your account and data"
          tag="Danger"
          tagVariant="error"
          showArrow
          onClick={() => alert('Navigate')}
          showDivider={false}
        />
      </div>
    );
  },
};

export const MixedContent: Story = {
  name: '08 Mixed Content',
  render: () => {
    const { colors } = useTheme();
    const [syncEnabled, setSyncEnabled] = useState(true);

    return (
      <div style={{ maxWidth: '500px', border: `1px solid ${colors.border}`, borderRadius: '8px', overflow: 'hidden' }}>
        <SettingsCard
          title="Profile"
          description="View and edit your profile"
          icon="user-avatar"
          showArrow
          onClick={() => alert('Navigate to Profile')}
        />
        <SettingsCard
          title="Sync Settings"
          description="Keep your settings synced across devices"
          icon="renew"
          showToggle
          toggled={syncEnabled}
          onToggle={setSyncEnabled}
        />
        <SettingsCard
          title="Storage Used"
          description="Manage your storage"
          icon="folder"
          value="2.4 GB / 5 GB"
          showArrow
          onClick={() => alert('Manage Storage')}
        />
        <SettingsCard
          title="Subscription"
          description="Manage your subscription plan"
          icon="purchase"
          tag="Pro"
          tagVariant="success"
          showArrow
          onClick={() => alert('Manage Subscription')}
          showDivider={false}
        />
      </div>
    );
  },
};

export const FullSettingsPage: Story = {
  name: '09 Full Settings Page Example',
  render: () => {
    const { colors } = useTheme();
    const [notifications, setNotifications] = useState(true);
    const [emailUpdates, setEmailUpdates] = useState(false);
    const [twoFactor, setTwoFactor] = useState(true);

    return (
      <div style={{ maxWidth: '600px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600, color: colors.textPrimary }}>
          Account Settings
        </h3>
        <div style={{ border: `1px solid ${colors.border}`, borderRadius: '8px', overflow: 'hidden', marginBottom: '24px' }}>
          <SettingsCard
            title="Personal Information"
            description="Update your name, email, and profile picture"
            icon="user-avatar"
            showArrow
            onClick={() => alert('Navigate')}
          />
          <SettingsCard
            title="Password"
            description="Change your password"
            icon="password"
            value="Last changed 30 days ago"
            showArrow
            onClick={() => alert('Navigate')}
            showDivider={false}
          />
        </div>

        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600, color: colors.textPrimary }}>
          Notifications
        </h3>
        <div style={{ border: `1px solid ${colors.border}`, borderRadius: '8px', overflow: 'hidden', marginBottom: '24px' }}>
          <SettingsCard
            title="Push Notifications"
            description="Receive notifications on your device"
            icon="notification"
            showToggle
            toggled={notifications}
            onToggle={setNotifications}
          />
          <SettingsCard
            title="Email Updates"
            description="Receive weekly digest emails"
            icon="email"
            showToggle
            toggled={emailUpdates}
            onToggle={setEmailUpdates}
            showDivider={false}
          />
        </div>

        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600, color: colors.textPrimary }}>
          Security
        </h3>
        <div style={{ border: `1px solid ${colors.border}`, borderRadius: '8px', overflow: 'hidden' }}>
          <SettingsCard
            title="Two-Factor Authentication"
            description="Add an extra layer of security to your account"
            icon="security"
            showToggle
            toggled={twoFactor}
            onToggle={setTwoFactor}
          />
          <SettingsCard
            title="Active Sessions"
            description="Manage devices where you're logged in"
            icon="laptop"
            value="3 devices"
            showArrow
            onClick={() => alert('Navigate')}
          />
          <SettingsCard
            title="Login History"
            description="View your recent login activity"
            icon="recently-viewed"
            showArrow
            onClick={() => alert('Navigate')}
            showDivider={false}
          />
        </div>
      </div>
    );
  },
};

export const WithSecondaryButton: Story = {
  name: '10 With Secondary Button',
  render: () => {
    const { colors } = useTheme();

    return (
      <div style={{ maxWidth: '600px', border: `1px solid ${colors.border}`, borderRadius: '8px', overflow: 'hidden' }}>
        <SettingsCard
          title="Export Data"
          description="Download all your data in a portable format"
          icon="download"
          buttonLabel="Export"
          buttonVariant="secondary"
          onButtonClick={() => alert('Export started')}
        />
        <SettingsCard
          title="Clear Cache"
          description="Remove temporary files to free up space"
          icon="trash-can"
          buttonLabel="Clear"
          buttonVariant="secondary"
          onButtonClick={() => alert('Cache cleared')}
        />
        <SettingsCard
          title="Sync Now"
          description="Manually sync your data with the server"
          icon="renew"
          buttonLabel="Sync"
          buttonVariant="secondary"
          onButtonClick={() => alert('Syncing...')}
          showDivider={false}
        />
      </div>
    );
  },
};

export const WithPrimaryButton: Story = {
  name: '11 With Primary Button',
  render: () => {
    const { colors } = useTheme();

    return (
      <div style={{ maxWidth: '600px', border: `1px solid ${colors.border}`, borderRadius: '8px', overflow: 'hidden' }}>
        <SettingsCard
          title="Upgrade Plan"
          description="Get access to premium features"
          icon="star"
          buttonLabel="Upgrade"
          buttonVariant="primary"
          onButtonClick={() => alert('Upgrade flow started')}
        />
        <SettingsCard
          title="Connect Account"
          description="Link your external accounts for seamless integration"
          icon="connect"
          buttonLabel="Connect"
          buttonVariant="primary"
          onButtonClick={() => alert('Connect flow started')}
        />
        <SettingsCard
          title="Verify Email"
          description="Confirm your email address to unlock all features"
          icon="email"
          buttonLabel="Verify"
          buttonVariant="primary"
          onButtonClick={() => alert('Verification email sent')}
          showDivider={false}
        />
      </div>
    );
  },
};

export const WithDropdown: Story = {
  name: '12 With Dropdown',
  render: () => {
    const { colors } = useTheme();
    const [language, setLanguage] = useState('en');
    const [timezone, setTimezone] = useState('pst');
    const [theme, setTheme] = useState('system');

    const languageOptions = [
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Spanish' },
      { value: 'fr', label: 'French' },
      { value: 'de', label: 'German' },
      { value: 'ja', label: 'Japanese' },
    ];

    const timezoneOptions = [
      { value: 'pst', label: 'Pacific Time (PT)' },
      { value: 'mst', label: 'Mountain Time (MT)' },
      { value: 'cst', label: 'Central Time (CT)' },
      { value: 'est', label: 'Eastern Time (ET)' },
      { value: 'utc', label: 'UTC' },
    ];

    const themeOptions = [
      { value: 'system', label: 'System Default' },
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' },
    ];

    return (
      <div style={{ maxWidth: '600px', border: `1px solid ${colors.border}`, borderRadius: '8px', overflow: 'hidden' }}>
        <SettingsCard
          title="Language"
          description="Select your preferred language"
          icon="globe"
          dropdownOptions={languageOptions}
          dropdownValue={language}
          onDropdownChange={setLanguage}
          dropdownPlaceholder="Select language"
        />
        <SettingsCard
          title="Time Zone"
          description="Set your local time zone"
          icon="time"
          dropdownOptions={timezoneOptions}
          dropdownValue={timezone}
          onDropdownChange={setTimezone}
          dropdownPlaceholder="Select timezone"
        />
        <SettingsCard
          title="Theme"
          description="Choose your preferred color scheme"
          icon="color-palette"
          dropdownOptions={themeOptions}
          dropdownValue={theme}
          onDropdownChange={setTheme}
          dropdownPlaceholder="Select theme"
          showDivider={false}
        />
      </div>
    );
  },
};

export const AllActionTypes: Story = {
  name: '13 All Action Types',
  render: () => {
    const { colors } = useTheme();
    const [autoBackup, setAutoBackup] = useState(true);
    const [frequency, setFrequency] = useState('daily');

    const frequencyOptions = [
      { value: 'hourly', label: 'Hourly' },
      { value: 'daily', label: 'Daily' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'monthly', label: 'Monthly' },
    ];

    return (
      <div style={{ maxWidth: '600px', border: `1px solid ${colors.border}`, borderRadius: '8px', overflow: 'hidden' }}>
        <SettingsCard
          title="Auto Backup"
          description="Automatically backup your data"
          icon="cloud-upload"
          showToggle
          toggled={autoBackup}
          onToggle={setAutoBackup}
        />
        <SettingsCard
          title="Backup Frequency"
          description="How often should we backup your data"
          icon="time"
          dropdownOptions={frequencyOptions}
          dropdownValue={frequency}
          onDropdownChange={setFrequency}
        />
        <SettingsCard
          title="Backup Now"
          description="Create an immediate backup of your data"
          icon="save"
          buttonLabel="Backup"
          buttonVariant="secondary"
          onButtonClick={() => alert('Backup started')}
        />
        <SettingsCard
          title="Restore Data"
          description="Restore from a previous backup"
          icon="restart"
          buttonLabel="Restore"
          buttonVariant="primary"
          onButtonClick={() => alert('Restore flow started')}
        />
        <SettingsCard
          title="Backup History"
          description="View all previous backups"
          icon="recently-viewed"
          showArrow
          onClick={() => alert('Navigate to history')}
          showDivider={false}
        />
      </div>
    );
  },
};

export const Playground: Story = {
  name: '14 Playground',
  args: {
    title: 'Setting Title',
    description: 'Setting description goes here',
    icon: 'settings',
    disabled: false,
    showToggle: false,
    toggled: false,
    showArrow: true,
    showDivider: true,
    value: '',
    tag: '',
    tagVariant: 'default',
    buttonLabel: '',
    buttonVariant: 'secondary',
  },
};
