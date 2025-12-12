import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Tabs from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ODL Tabs component with keyboard navigation support. Provides accessible tab navigation with ARIA attributes and keyboard controls (Arrow keys, Home, End).',
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
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    showContent: {
      control: 'boolean',
      description: 'Whether to display tab content',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleTabs = [
  {
    id: 'overview',
    label: 'Overview',
    content: (
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Overview</h3>
        <p style={{ color: 'var(--color-dusk)' }}>
          This is the overview tab content. It provides a high-level summary of the information.
        </p>
      </div>
    ),
  },
  {
    id: 'details',
    label: 'Details',
    content: (
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Details</h3>
        <p style={{ color: 'var(--color-dusk)' }}>
          This is the details tab content. It provides more detailed information about the subject.
        </p>
        <ul style={{ marginTop: '12px', paddingLeft: '20px', color: 'var(--color-dusk)' }}>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    content: (
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Settings</h3>
        <p style={{ color: 'var(--color-dusk)' }}>
          This is the settings tab content. Configure your preferences here.
        </p>
      </div>
    ),
  },
  {
    id: 'help',
    label: 'Help',
    disabled: true,
    content: (
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Help</h3>
        <p style={{ color: 'var(--color-dusk)' }}>This tab is disabled.</p>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    tabs: sampleTabs,
    variant: 'default',
    showContent: true,
  },
};

export const CompactVariant: Story = {
  args: {
    tabs: sampleTabs,
    variant: 'compact',
    showContent: true,
  },
};

export const WithoutContent: Story = {
  args: {
    tabs: sampleTabs,
    variant: 'default',
    showContent: false,
  },
};

export const ControlledTabs: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState('overview');

    return (
      <div>
        <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: 'var(--color-wave)', borderRadius: '4px' }}>
          <p style={{ fontSize: '14px', margin: 0 }}>
            Current active tab: <strong>{activeTab}</strong>
          </p>
        </div>
        <Tabs
          tabs={sampleTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="default"
        />
      </div>
    );
  },
};

export const ManyTabs: Story = {
  args: {
    tabs: [
      { id: 'tab1', label: 'Tab 1', content: <div>Content for Tab 1</div> },
      { id: 'tab2', label: 'Tab 2', content: <div>Content for Tab 2</div> },
      { id: 'tab3', label: 'Tab 3', content: <div>Content for Tab 3</div> },
      { id: 'tab4', label: 'Tab 4', content: <div>Content for Tab 4</div> },
      { id: 'tab5', label: 'Tab 5', content: <div>Content for Tab 5</div> },
      { id: 'tab6', label: 'Tab 6', content: <div>Content for Tab 6</div> },
      { id: 'tab7', label: 'Tab 7', content: <div>Content for Tab 7</div> },
      { id: 'tab8', label: 'Tab 8', content: <div>Content for Tab 8</div> },
    ],
    variant: 'default',
  },
};

export const WithDisabledTabs: Story = {
  args: {
    tabs: [
      { id: 'active1', label: 'Active Tab', content: <div>This tab is active and clickable</div> },
      { id: 'disabled1', label: 'Disabled Tab', content: <div>This content should not be accessible</div>, disabled: true },
      { id: 'active2', label: 'Another Active', content: <div>This tab is also active</div> },
      { id: 'disabled2', label: 'Also Disabled', content: <div>This content should not be accessible</div>, disabled: true },
    ],
    variant: 'default',
  },
};

export const LongLabels: Story = {
  args: {
    tabs: [
      { id: 'short', label: 'Short', content: <div>Short label tab</div> },
      { id: 'medium', label: 'Medium Length Label', content: <div>Medium length label tab</div> },
      { id: 'long', label: 'This is a Very Long Tab Label', content: <div>Very long label tab</div> },
      { id: 'normal', label: 'Normal', content: <div>Normal label tab</div> },
    ],
    variant: 'default',
  },
};

export const BothVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Default Variant</h4>
        <Tabs tabs={sampleTabs.slice(0, 3)} variant="default" />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Compact Variant</h4>
        <Tabs tabs={sampleTabs.slice(0, 3)} variant="compact" />
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    tabs: sampleTabs,
    variant: 'default',
    showContent: true,
  },
};
