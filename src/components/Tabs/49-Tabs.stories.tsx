import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Tabs from './Tabs';
import {
  Add,
  Settings,
  Help,
  ChevronRight,
  ArrowRight,
  Download,
  Edit,
  Delete,
  Search,
  Filter,
  Analytics,
  User,
  ChartLine,
  DataTable
} from '@carbon/icons-react';

const meta: Meta<typeof Tabs> = {
  title: 'Design System/Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ODL Tabs component with keyboard navigation support. Provides accessible tab navigation with ARIA attributes and keyboard controls (Arrow keys, Home, End).',
      },
    },
  },
  tags: ['autodocs', 'Ready for dev'],
  args: {
    variant: 'default',
    showContent: true,
    fullWidth: false,
  },
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
      description: 'Whether tabs stretch to fill full width',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
  name: '01 Default',
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
  name: '04 Controlled Tabs',
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
  name: '05 Many Tabs',
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
  name: '06 With Disabled Tabs',
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
  name: '07 Long Labels',
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
  name: '08 Both Variants',
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

// Full Width tabs
export const FullWidth: Story = {
  name: '09 Full Width',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Full Width Tabs</h4>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: '#6C757D' }}>
          Tabs stretch to fill the full width of their container, with equal distribution.
        </p>
        <Tabs 
          tabs={[
            {
              id: 'overview',
              label: 'Overview',
              content: <div>Overview content in full width layout</div>
            },
            {
              id: 'analytics',
              label: 'Analytics',
              content: <div>Analytics content in full width layout</div>
            },
            {
              id: 'reports',
              label: 'Reports',
              content: <div>Reports content in full width layout</div>
            }
          ]}
          variant="default"
          fullWidth={true}
          showContent={true}
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Full Width vs Standard</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '12px', color: '#6C757D' }}>Standard (content-width):</p>
            <Tabs 
              tabs={[
                { id: 'tab1', label: 'Tab One', content: <div>Standard content</div> },
                { id: 'tab2', label: 'Tab Two', content: <div>Standard content</div> }
              ]}
              variant="default"
              fullWidth={false}
            />
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '12px', color: '#6C757D' }}>Full width:</p>
            <Tabs 
              tabs={[
                { id: 'tab1', label: 'Tab One', content: <div>Full width content</div> },
                { id: 'tab2', label: 'Tab Two', content: <div>Full width content</div> }
              ]}
              variant="default"
              fullWidth={true}
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Tabs with left icons
export const WithLeftIcons: Story = {
  name: '10 With Left Icons',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Tabs with Left Icons</h4>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: '#6C757D' }}>
          Icons appear to the left of the tab label, helping users quickly identify sections.
        </p>
        <Tabs 
          tabs={[
            {
              id: 'analytics',
              label: 'Analytics',
              iconLeft: <Analytics size={16} />,
              content: (
                <div>
                  <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Analytics Dashboard</h3>
                  <p style={{ color: 'var(--color-dusk)' }}>
                    View comprehensive analytics and performance metrics for your application.
                  </p>
                </div>
              )
            },
            {
              id: 'users',
              label: 'Users',
              iconLeft: <User size={16} />,
              content: (
                <div>
                  <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>User Management</h3>
                  <p style={{ color: 'var(--color-dusk)' }}>
                    Manage user accounts, permissions, and access controls.
                  </p>
                </div>
              )
            },
            {
              id: 'reports',
              label: 'Reports',
              iconLeft: <ChartLine size={16} />,
              content: (
                <div>
                  <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Reports & Exports</h3>
                  <p style={{ color: 'var(--color-dusk)' }}>
                    Generate and download comprehensive reports in various formats.
                  </p>
                </div>
              )
            },
            {
              id: 'settings',
              label: 'Settings',
              iconLeft: <Settings size={16} />,
              content: (
                <div>
                  <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Application Settings</h3>
                  <p style={{ color: 'var(--color-dusk)' }}>
                    Configure application preferences and system settings.
                  </p>
                </div>
              )
            }
          ]}
          variant="default"
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Compact with Left Icons</h4>
        <Tabs 
          tabs={[
            {
              id: 'data',
              label: 'Data',
              iconLeft: <DataTable size={14} />
            },
            {
              id: 'search',
              label: 'Search',
              iconLeft: <Search size={14} />
            },
            {
              id: 'filter',
              label: 'Filter',
              iconLeft: <Filter size={14} />
            }
          ]}
          variant="compact"
          showContent={false}
        />
      </div>
    </div>
  ),
};

// Tabs with right icons
export const WithRightIcons: Story = {
  name: '11 With Right Icons',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Tabs with Right Icons</h4>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: '#6C757D' }}>
          Icons appear to the right of the tab label, often indicating actions or status.
        </p>
        <Tabs 
          tabs={[
            {
              id: 'overview',
              label: 'Overview',
              iconRight: <ArrowRight size={16} />,
              content: (
                <div>
                  <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Project Overview</h3>
                  <p style={{ color: 'var(--color-dusk)' }}>
                    Navigate to the main project dashboard and summary information.
                  </p>
                </div>
              )
            },
            {
              id: 'edit',
              label: 'Edit Mode',
              iconRight: <Edit size={16} />,
              content: (
                <div>
                  <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Edit Content</h3>
                  <p style={{ color: 'var(--color-dusk)' }}>
                    Switch to edit mode to modify content and configuration.
                  </p>
                </div>
              )
            },
            {
              id: 'export',
              label: 'Export',
              iconRight: <Download size={16} />,
              content: (
                <div>
                  <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Export Data</h3>
                  <p style={{ color: 'var(--color-dusk)' }}>
                    Download and export your data in various formats.
                  </p>
                </div>
              )
            },
            {
              id: 'advanced',
              label: 'Advanced',
              iconRight: <ChevronRight size={16} />,
              disabled: false,
              content: (
                <div>
                  <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 600 }}>Advanced Options</h3>
                  <p style={{ color: 'var(--color-dusk)' }}>
                    Access advanced configuration and power-user features.
                  </p>
                </div>
              )
            }
          ]}
          variant="default"
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Action Indicators</h4>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: '#6C757D' }}>
          Right icons can indicate that clicking the tab will perform an action.
        </p>
        <Tabs 
          tabs={[
            {
              id: 'add',
              label: 'Add New',
              iconRight: <Add size={16} />
            },
            {
              id: 'delete',
              label: 'Delete Selected',
              iconRight: <Delete size={16} />
            }
          ]}
          variant="compact"
          showContent={false}
        />
      </div>
    </div>
  ),
};

export const Playground: Story = {
  name: '12 Playground',
  args: {
    tabs: sampleTabs,
    variant: 'default',
    showContent: true,
    fullWidth: false,
  },
};
