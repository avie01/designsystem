import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Tile from './Tile';
import { useTheme } from '../../../.storybook/theme-decorator';

const meta: Meta<typeof Tile> = {
  title: 'Design System/Components/Tile',
  component: Tile,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tile is a button component for navigation or action selection. Ideal for dashboards, settings pages, and feature grids.',
      },
    },
  },
  tags: ['autodocs', 'Ready for dev'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title text displayed on the tile',
    },
    description: {
      control: 'text',
      description: 'Optional description text',
    },
    icon: {
      control: 'text',
      description: 'Icon name to display',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Tile size',
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled', 'list'],
      description: 'Tile visual variant',
    },
    showChevron: {
      control: 'boolean',
      description: 'Show chevron arrow on the right',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the tile is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tile is disabled',
    },
    horizontal: {
      control: 'boolean',
      description: 'Use horizontal layout',
    },
    badge: {
      control: 'text',
      description: 'Badge count or text',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '01 Default',
  args: {
    title: 'Dashboard',
    icon: 'dashboard',
    size: 'medium',
    variant: 'default',
  },
};

export const WithDescription: Story = {
  name: '02 With Description',
  args: {
    title: 'Analytics',
    description: 'View reports and insights',
    icon: 'analytics',
    size: 'medium',
    variant: 'default',
  },
};

export const Selected: Story = {
  name: '03 Selected',
  args: {
    title: 'Settings',
    description: 'Configure preferences',
    icon: 'settings',
    size: 'medium',
    selected: true,
  },
};

export const Disabled: Story = {
  name: '04 Disabled',
  args: {
    title: 'Premium',
    description: 'Upgrade required',
    icon: 'locked',
    size: 'medium',
    disabled: true,
  },
};

export const WithBadge: Story = {
  name: '05 With Badge',
  args: {
    title: 'Notifications',
    icon: 'notification',
    size: 'medium',
    badge: 5,
  },
};

export const SmallSize: Story = {
  name: '06 Small Size',
  args: {
    title: 'Files',
    icon: 'folder',
    size: 'small',
  },
};

export const LargeSize: Story = {
  name: '07 Large Size',
  args: {
    title: 'Projects',
    description: 'Manage your projects',
    icon: 'folder',
    size: 'large',
  },
};

export const Horizontal: Story = {
  name: '08 Horizontal Layout',
  args: {
    title: 'Create New Project',
    description: 'Start from scratch or use a template',
    icon: 'add',
    size: 'medium',
    horizontal: true,
  },
};

export const OutlinedVariant: Story = {
  name: '09 Outlined Variant',
  args: {
    title: 'Documents',
    description: 'Browse files',
    icon: 'document',
    size: 'medium',
    variant: 'outlined',
  },
};

export const FilledVariant: Story = {
  name: '10 Filled Variant',
  args: {
    title: 'Reports',
    description: 'Generate reports',
    icon: 'report',
    size: 'medium',
    variant: 'filled',
  },
};

export const AllSizes: Story = {
  name: '11 All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <Tile title="Small" icon="star" size="small" />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Small</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Tile title="Medium" icon="star" size="medium" />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Medium</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Tile title="Large" icon="star" size="large" />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Large</p>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  name: '12 All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Tile title="Default" description="Default style" icon="cube" variant="default" />
      <Tile title="Outlined" description="Outlined style" icon="cube" variant="outlined" />
      <Tile title="Filled" description="Filled style" icon="cube" variant="filled" />
    </div>
  ),
};

export const InteractiveStates: Story = {
  name: '13 Interactive States',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Tile title="Normal" icon="checkmark" />
      <Tile title="Selected" icon="checkmark" selected />
      <Tile title="Disabled" icon="checkmark" disabled />
      <Tile title="With Badge" icon="notification" badge={3} />
    </div>
  ),
};

export const SelectableGroup: Story = {
  name: '14 Selectable Group',
  render: function SelectableGroupStory() {
    const [selected, setSelected] = useState<string>('dashboard');

    const tiles = [
      { id: 'dashboard', title: 'Dashboard', icon: 'dashboard' },
      { id: 'analytics', title: 'Analytics', icon: 'analytics' },
      { id: 'reports', title: 'Reports', icon: 'report' },
      { id: 'settings', title: 'Settings', icon: 'settings' },
    ];

    return (
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {tiles.map((tile) => (
          <Tile
            key={tile.id}
            title={tile.title}
            icon={tile.icon}
            selected={selected === tile.id}
            onClick={() => setSelected(tile.id)}
          />
        ))}
      </div>
    );
  },
};

export const GridLayout: Story = {
  name: '15 Grid Layout',
  render: () => {
    const tiles = [
      { title: 'Dashboard', icon: 'dashboard', description: 'Overview' },
      { title: 'Projects', icon: 'folder', description: 'Manage projects' },
      { title: 'Tasks', icon: 'task', description: 'To-do items', badge: 12 },
      { title: 'Calendar', icon: 'calendar', description: 'Schedule' },
      { title: 'Messages', icon: 'chat', description: 'Inbox', badge: 3 },
      { title: 'Settings', icon: 'settings', description: 'Preferences' },
    ];

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          maxWidth: '500px',
        }}
      >
        {tiles.map((tile, index) => (
          <Tile
            key={index}
            title={tile.title}
            description={tile.description}
            icon={tile.icon}
            badge={tile.badge}
            onClick={() => alert(`Clicked: ${tile.title}`)}
          />
        ))}
      </div>
    );
  },
};

export const HorizontalList: Story = {
  name: '16 Horizontal List',
  render: () => {
    const actions = [
      { title: 'New Document', description: 'Create a blank document', icon: 'document' },
      { title: 'Upload File', description: 'Import from your device', icon: 'upload' },
      { title: 'From Template', description: 'Start with a template', icon: 'copy' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
        {actions.map((action, index) => (
          <Tile
            key={index}
            title={action.title}
            description={action.description}
            icon={action.icon}
            horizontal
            onClick={() => alert(`Clicked: ${action.title}`)}
          />
        ))}
      </div>
    );
  },
};

export const FeatureCards: Story = {
  name: '17 Feature Cards',
  render: () => {
    const { colors } = useTheme();

    const features = [
      { title: 'Cloud Storage', description: 'Store files securely in the cloud', icon: 'cloud', badge: 'New' },
      { title: 'Collaboration', description: 'Work together in real-time', icon: 'group' },
      { title: 'Analytics', description: 'Track performance metrics', icon: 'analytics' },
      { title: 'Integrations', description: 'Connect with other tools', icon: 'api', badge: '20+' },
    ];

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          maxWidth: '500px',
        }}
      >
        {features.map((feature, index) => (
          <Tile
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            badge={feature.badge}
            size="large"
            variant="filled"
            onClick={() => alert(`Learn more: ${feature.title}`)}
          />
        ))}
      </div>
    );
  },
};

export const NavigationTiles: Story = {
  name: '18 Navigation Tiles',
  render: function NavigationTilesStory() {
    const [active, setActive] = useState('home');

    const navItems = [
      { id: 'home', title: 'Home', icon: 'home' },
      { id: 'search', title: 'Search', icon: 'search' },
      { id: 'favorites', title: 'Favorites', icon: 'star' },
      { id: 'profile', title: 'Profile', icon: 'user' },
    ];

    return (
      <div style={{ display: 'flex', gap: '8px' }}>
        {navItems.map((item) => (
          <Tile
            key={item.id}
            title={item.title}
            icon={item.icon}
            size="small"
            selected={active === item.id}
            onClick={() => setActive(item.id)}
          />
        ))}
      </div>
    );
  },
};

export const ListVariant: Story = {
  name: '19 List Variant',
  args: {
    title: 'Account Settings',
    description: 'Manage your account preferences',
    icon: 'settings',
    variant: 'list',
    showChevron: true,
  },
};

export const ListVariantBasic: Story = {
  name: '20 List Variant - Basic',
  render: () => {
    const items = [
      { title: 'Profile', icon: 'user' },
      { title: 'Notifications', icon: 'notification' },
      { title: 'Privacy', icon: 'locked' },
      { title: 'Help', icon: 'help' },
    ];

    return (
      <div style={{ maxWidth: '400px', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
        {items.map((item, index) => (
          <Tile
            key={index}
            title={item.title}
            icon={item.icon}
            variant="list"
            showChevron
            onClick={() => alert(`Navigate to: ${item.title}`)}
          />
        ))}
      </div>
    );
  },
};

export const ListVariantWithDescriptions: Story = {
  name: '21 List Variant - With Descriptions',
  render: () => {
    const items = [
      { title: 'Account', description: 'Personal information and security', icon: 'user' },
      { title: 'Notifications', description: 'Email and push notification settings', icon: 'notification', badge: 3 },
      { title: 'Appearance', description: 'Theme, colors, and display options', icon: 'color-palette' },
      { title: 'Language', description: 'Choose your preferred language', icon: 'translate' },
    ];

    return (
      <div style={{ maxWidth: '450px', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
        {items.map((item, index) => (
          <Tile
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
            variant="list"
            showChevron
            badge={item.badge}
            onClick={() => alert(`Navigate to: ${item.title}`)}
          />
        ))}
      </div>
    );
  },
};

export const ListVariantSelectable: Story = {
  name: '22 List Variant - Selectable',
  render: function SelectableListStory() {
    const [selected, setSelected] = useState('option1');

    const options = [
      { id: 'option1', title: 'Standard Plan', description: 'Basic features for individuals', icon: 'cube' },
      { id: 'option2', title: 'Professional Plan', description: 'Advanced features for teams', icon: 'cube' },
      { id: 'option3', title: 'Enterprise Plan', description: 'Full features for organizations', icon: 'cube' },
    ];

    return (
      <div style={{ maxWidth: '450px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {options.map((option) => (
          <Tile
            key={option.id}
            title={option.title}
            description={option.description}
            icon={option.icon}
            variant="list"
            selected={selected === option.id}
            onClick={() => setSelected(option.id)}
          />
        ))}
      </div>
    );
  },
};

export const ListVariantWithActions: Story = {
  name: '23 List Variant - With Actions',
  render: () => {
    const { colors } = useTheme();

    const items = [
      { title: 'Dark Mode', description: 'Enable dark theme', icon: 'moon', hasToggle: true },
      { title: 'Auto-save', description: 'Save changes automatically', icon: 'save', hasToggle: true },
      { title: 'Sync', description: 'Last synced 5 mins ago', icon: 'restart', hasStatus: true },
    ];

    return (
      <div style={{ maxWidth: '450px', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
        {items.map((item, index) => (
          <Tile
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
            variant="list"
            rightContent={
              item.hasToggle ? (
                <div
                  style={{
                    width: '44px',
                    height: '24px',
                    borderRadius: '12px',
                    backgroundColor: index === 0 ? colors.primaryMain : colors.grey300,
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#fff',
                      position: 'absolute',
                      top: '2px',
                      left: index === 0 ? '22px' : '2px',
                      transition: 'left 0.2s',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                    }}
                  />
                </div>
              ) : item.hasStatus ? (
                <span style={{ fontSize: '12px', color: colors.successMain }}>Synced</span>
              ) : undefined
            }
            onClick={() => alert(`Clicked: ${item.title}`)}
          />
        ))}
      </div>
    );
  },
};

export const ListVariantMenu: Story = {
  name: '24 List Variant - Menu Style',
  render: function MenuStyleStory() {
    const [active, setActive] = useState('dashboard');

    const menuItems = [
      { id: 'dashboard', title: 'Dashboard', icon: 'dashboard' },
      { id: 'projects', title: 'Projects', icon: 'folder', badge: 5 },
      { id: 'tasks', title: 'Tasks', icon: 'task', badge: 12 },
      { id: 'calendar', title: 'Calendar', icon: 'calendar' },
      { id: 'reports', title: 'Reports', icon: 'report' },
      { id: 'settings', title: 'Settings', icon: 'settings' },
    ];

    return (
      <div style={{ maxWidth: '280px', backgroundColor: '#f9fafb', padding: '8px', borderRadius: '8px' }}>
        {menuItems.map((item) => (
          <Tile
            key={item.id}
            title={item.title}
            icon={item.icon}
            variant="list"
            badge={item.badge}
            selected={active === item.id}
            onClick={() => setActive(item.id)}
          />
        ))}
      </div>
    );
  },
};
