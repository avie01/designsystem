import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import SimpleTabs from './SimpleTabs';

const meta: Meta<typeof SimpleTabs> = {
  title: 'Design System/Components/SimpleTabs',
  component: SimpleTabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ODL SimpleTabs component with icon support. A lightweight tab navigation component with optional icons and full-width mode.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'Tab variant style',
      table: {
        disable: true,
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    showContent: {
      control: 'boolean',
      description: 'Whether to display tab content',
      table: {
        disable: true,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether tabs should stretch to fill available width',
      table: {
        disable: true,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicTabs = [
  {
    id: 'home',
    label: 'Home',
    content: (
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Home</h3>
        <p style={{ color: 'var(--color-dusk)' }}>Welcome to the home tab.</p>
      </div>
    ),
  },
  {
    id: 'profile',
    label: 'Profile',
    content: (
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Profile</h3>
        <p style={{ color: 'var(--color-dusk)' }}>View and edit your profile information.</p>
      </div>
    ),
  },
  {
    id: 'messages',
    label: 'Messages',
    content: (
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Messages</h3>
        <p style={{ color: 'var(--color-dusk)' }}>Check your messages here.</p>
      </div>
    ),
  },
];

const tabsWithIcons = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    iconPosition: 'left' as const,
    content: <div><p>Dashboard content with left icon</p></div>,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    iconPosition: 'left' as const,
    content: <div><p>Settings content with left icon</p></div>,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: 'notification',
    iconPosition: 'left' as const,
    content: <div><p>Notifications content with left icon</p></div>,
  },
];

const tabsWithRightIcons = [
  {
    id: 'next',
    label: 'Next',
    icon: 'arrow-right',
    iconPosition: 'right' as const,
    content: <div><p>Content with right icon</p></div>,
  },
  {
    id: 'forward',
    label: 'Forward',
    icon: 'chevron-right',
    iconPosition: 'right' as const,
    content: <div><p>Forward content with right icon</p></div>,
  },
  {
    id: 'continue',
    label: 'Continue',
    icon: 'play',
    iconPosition: 'right' as const,
    content: <div><p>Continue content with right icon</p></div>,
  },
];

export const Default: Story = {
  args: {
    tabs: basicTabs,
    variant: 'default',
    showContent: true,
    fullWidth: false,
  },
};

export const CompactVariant: Story = {
  name: '02 Compact Variant',
  args: {
    tabs: basicTabs,
    variant: 'compact',
    showContent: true,
    fullWidth: false,
  },
};

export const FullWidth: Story = {
  args: {
    tabs: basicTabs,
    variant: 'default',
    showContent: true,
    fullWidth: true,
  },
};

export const WithLeftIcons: Story = {
  name: '04 With Left Icons',
  args: {
    tabs: tabsWithIcons,
    variant: 'default',
    showContent: true,
  },
};

export const WithRightIcons: Story = {
  args: {
    tabs: tabsWithRightIcons,
    variant: 'default',
    showContent: true,
  },
};

export const WithoutContent: Story = {
  args: {
    tabs: basicTabs,
    variant: 'default',
    showContent: false,
  },
};

export const WithDisabledTabs: Story = {
  name: '07 With Disabled Tabs',
  args: {
    tabs: [
      { id: 'enabled1', label: 'Enabled Tab', content: <div>This tab is enabled</div> },
      { id: 'disabled1', label: 'Disabled Tab', content: <div>This should not be visible</div>, disabled: true },
      { id: 'enabled2', label: 'Another Enabled', content: <div>This tab is also enabled</div> },
      { id: 'disabled2', label: 'Also Disabled', content: <div>This should not be visible</div>, disabled: true },
    ],
    variant: 'default',
  },
};

export const ControlledTabs: Story = {
  name: '08 Controlled Tabs',
  render: () => {
    const [activeTab, setActiveTab] = React.useState('home');

    return (
      <div>
        <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: 'var(--color-wave)', borderRadius: '4px' }}>
          <p style={{ fontSize: '14px', margin: 0 }}>
            Current active tab: <strong>{activeTab}</strong>
          </p>
        </div>
        <SimpleTabs
          tabs={basicTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="default"
        />
      </div>
    );
  },
};

export const ManyTabs: Story = {
  name: '09 Many Tabs',
  args: {
    tabs: [
      { id: 'tab1', label: 'Tab 1', icon: 'folder', content: <div>Content 1</div> },
      { id: 'tab2', label: 'Tab 2', icon: 'document', content: <div>Content 2</div> },
      { id: 'tab3', label: 'Tab 3', icon: 'chart', content: <div>Content 3</div> },
      { id: 'tab4', label: 'Tab 4', icon: 'settings', content: <div>Content 4</div> },
      { id: 'tab5', label: 'Tab 5', icon: 'user', content: <div>Content 5</div> },
      { id: 'tab6', label: 'Tab 6', icon: 'notification', content: <div>Content 6</div> },
    ],
    variant: 'default',
  },
};

export const AllVariants: Story = {
  name: '10 All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Default Variant</h4>
        <SimpleTabs tabs={basicTabs} variant="default" />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Compact Variant</h4>
        <SimpleTabs tabs={basicTabs} variant="compact" />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Full Width</h4>
        <SimpleTabs tabs={basicTabs} variant="default" fullWidth={true} />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>With Icons</h4>
        <SimpleTabs tabs={tabsWithIcons} variant="default" />
      </div>
    </div>
  ),
};

export const Playground: Story = {
  name: '11 Playground',
  args: {
    tabs: basicTabs,
    variant: 'default',
    showContent: true,
    fullWidth: false,
  },
};
