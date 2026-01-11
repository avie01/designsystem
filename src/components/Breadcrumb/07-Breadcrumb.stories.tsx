import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Breadcrumb from './Breadcrumb';
import { Chip as MUIChip } from '@mui/material';
import {
  CheckmarkFilled,
  Time,
  Cloud,
  PlayFilledAlt,
  Version,
  UserAdmin,
} from '@carbon/icons-react';

// ODL styling function for MUI chips
const getODLChipStyles = (variant: string = 'grey', size: string = 'sm') => {
  const baseStyles = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    borderRadius: '4px',
    fontWeight: 400,
    transition: 'color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
    border: 'none',
    textTransform: 'none' as const,
    cursor: 'default',
  };

  const sizeStyles = {
    sm: {
      minHeight: '24px',
      fontSize: '12px',
      '& .MuiChip-icon': {
        fontSize: '14px',
        marginLeft: '4px',
        marginRight: '-2px',
      },
      '& .MuiChip-label': {
        paddingLeft: '8px',
        paddingRight: '8px',
        paddingTop: '2px',
        paddingBottom: '2px',
      },
    },
  };

  const variantStyles: { [key: string]: any } = {
    blue: {
      backgroundColor: '#E0F3FE',
      color: '#3560C1',
      '&:hover': {
        backgroundColor: '#C8E6FA',
      },
    },
    lightGreen: {
      backgroundColor: '#DEFBE6',
      color: '#31622C',
      '&:hover': {
        backgroundColor: '#C8F5D3',
      },
    },
    purple: {
      backgroundColor: '#F0E5FF',
      color: '#6929C4',
      '&:hover': {
        backgroundColor: '#E5D4FF',
      },
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size as keyof typeof sizeStyles],
    ...variantStyles[variant as keyof typeof variantStyles],
  };
};

const meta: Meta<typeof Breadcrumb> = {
  title: 'Design System/Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A breadcrumb component for showing navigation hierarchy. Supports text, chips, and icons with various separator styles.',
      },
    },
  },
  tags: ['autodocs', 'Ready for dev'],
  argTypes: {
    items: {
      description: 'Array of breadcrumb items with label, optional path, and optional icon',
      table: {
        type: {
          summary: 'BreadcrumbItem[]',
          detail: `interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: React.ReactNode | string;
}`
        },
        category: 'Data',
        disable: true,
      },
    },
    separatorStyle: {
      control: 'select',
      options: ['chevron', 'slash', 'arrow', 'pipe', 'doubleChevron', 'dot', 'colon', 'dash'],
      description: 'Preset separator style',
      table: {
        type: { summary: 'chevron | slash | arrow | pipe | doubleChevron | dot | colon | dash' },
        defaultValue: { summary: 'chevron' },
        category: 'Appearance',
      },
    },
    separator: {
      control: 'text',
      description: 'Custom separator (overrides separatorStyle)',
      table: {
        type: { summary: 'string | React.ReactNode' },
        category: 'Appearance',
      },
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Size variant of the breadcrumb',
      table: {
        type: { summary: 'small | default | large' },
        defaultValue: { summary: 'default' },
        category: 'Appearance',
      },
    },
    spacing: {
      control: 'select',
      options: ['compact', 'comfortable', 'spacious'],
      description: 'Spacing preset between items',
      table: {
        type: { summary: 'compact | comfortable | spacious' },
        defaultValue: { summary: 'comfortable' },
        category: 'Appearance',
      },
    },
    colorScheme: {
      control: 'select',
      options: [undefined, 'light', 'dark', 'primary'],
      description: 'Color scheme variant',
      table: {
        type: { summary: 'light | dark | primary' },
        category: 'Appearance',
      },
    },
    showSeparator: {
      control: 'boolean',
      description: 'Show separators between items',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Appearance',
      },
    },
    iconSize: {
      control: { type: 'select', options: ['auto', 12, 14, 16, 18, 20] },
      description: 'Icon size - "auto" scales with breadcrumb size, or specify pixel value',
      table: {
        type: { summary: 'auto | number' },
        defaultValue: { summary: 'auto' },
        category: 'Icons',
      },
    },
    iconStyle: {
      control: 'select',
      options: ['default', 'outline', 'filled'],
      description: 'Icon style variant for Carbon icons',
      table: {
        type: { summary: 'default | outline | filled' },
        defaultValue: { summary: 'default' },
        category: 'Icons',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Text and Separator
export const TextAndSeparator: Story = {
  name: '01 Text and Separator',
  args: {
    items: [
      { label: 'Home', path: '/' },
      { label: 'Products', path: '/products' },
      { label: 'Electronics', path: '/products/electronics' },
      { label: 'Laptops' },
    ],
    onNavigate: (path) => console.log('Breadcrumb clicked:', path),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic breadcrumbs with text labels and separator styles. Use separatorStyle prop to choose from: chevron, slash, arrow, pipe, doubleChevron, dot, colon, or dash.',
      },
    },
  },
};

// 2. Chips and Separator
export const ChipsAndSeparator: Story = {
  name: '02 Chips and Separator',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Status Tags with Separator</h4>
        <Breadcrumb
          items={[
            { label: <MUIChip label="Development" size="small" sx={getODLChipStyles('lightGreen')} /> as any },
            { label: <MUIChip label="In Progress" size="small" sx={getODLChipStyles('blue')} /> as any },
            { label: <MUIChip label="Feature: Auth" size="small" sx={getODLChipStyles('purple')} /> as any },
          ]}
          separatorStyle="arrow"
          onNavigate={(path) => console.log('Clicked:', path)}
        />
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Project Tags with Separator</h4>
        <Breadcrumb
          items={[
            { label: <MUIChip label="Team A" size="small" sx={getODLChipStyles('blue')} /> as any },
            { label: <MUIChip label="Q4 2024" size="small" sx={getODLChipStyles('lightGreen')} /> as any },
            { label: <MUIChip label="Release v2.0" size="small" sx={getODLChipStyles('purple')} /> as any },
          ]}
          separatorStyle="pipe"
          onNavigate={(path) => console.log('Clicked:', path)}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumbs with chip-based labels, useful for displaying tags, statuses, or categories. Mix and match different separators.',
      },
    },
  },
};

// 3. Icons and Separator
export const IconsAndSeparator: Story = {
  name: '03 Icons and Separator',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Dashboard Navigation (Carbon Components)</h4>
        <Breadcrumb
          items={[
            { label: 'Dashboard', path: '/dashboard', icon: <Cloud size={16} /> },
            { label: 'Analytics', path: '/analytics', icon: <Time size={16} /> },
            { label: 'Reports', icon: <CheckmarkFilled size={16} /> },
          ]}
          separatorStyle="arrow"
          onNavigate={(path) => console.log('Clicked:', path)}
        />
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Pipeline Status (Icon Names as Strings)</h4>
        <Breadcrumb
          items={[
            { label: 'Start', path: '/', icon: 'play--filled' },
            { label: 'Processing', path: '/process', icon: 'data--structured' },
            { label: 'Complete', icon: 'checkmark--filled' },
          ]}
          size="large"
          iconSize="auto"
          spacing="spacious"
          separatorStyle="pipe"
          colorScheme="primary"
          style={{ paddingLeft: '24px' }}
          onNavigate={(path) => console.log('Clicked:', path)}
        />
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Admin Hierarchy (Mixed: Components + Strings)</h4>
        <Breadcrumb
          items={[
            { label: 'Admin', path: '/admin', icon: <UserAdmin size={16} /> },
            { label: 'Users', path: '/users', icon: 'user--admin' },
            { label: 'Permissions', icon: <CheckmarkFilled size={16} /> },
          ]}
          separatorStyle="slash"
          onNavigate={(path) => console.log('Clicked:', path)}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumbs with icon support. Icons can be passed as Carbon components (e.g., <Cloud />) or as string names (e.g., "cloud"). Icons auto-scale with breadcrumb size.',
      },
    },
  },
};

// 4. Mix of All
export const MixOfAll: Story = {
  name: '04 Mix of All',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Complete Navigation with Icons, Text, and Chips</h4>
        <Breadcrumb
          items={[
            { label: 'Dashboard', path: '/', icon: <Cloud size={16} /> },
            { label: <MUIChip label="Active" size="small" sx={getODLChipStyles('lightGreen')} /> as any },
            { label: 'Projects', path: '/projects', icon: 'folder' },
            { label: <MUIChip label="v2.0.0" size="small" sx={getODLChipStyles('blue')} /> as any },
            { label: 'Settings', icon: 'settings' },
          ]}
          size="large"
          separatorStyle="arrow"
          spacing="spacious"
          colorScheme="primary"
          onNavigate={(path) => console.log('Clicked:', path)}
        />
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Complex Pipeline with All Types</h4>
        <Breadcrumb
          items={[
            { label: <MUIChip label="Dev Team" size="small" sx={getODLChipStyles('purple')} /> as any },
            { label: 'Build', path: '/build', icon: <PlayFilledAlt size={16} /> },
            { label: <MUIChip label="In Progress" size="small" sx={getODLChipStyles('blue')} /> as any },
            { label: 'Deploy', path: '/deploy', icon: 'play--filled' },
            { label: <MUIChip label="Ready" size="small" sx={getODLChipStyles('lightGreen')} /> as any },
          ]}
          separatorStyle="pipe"
          spacing="comfortable"
          onNavigate={(path) => console.log('Clicked:', path)}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive breadcrumbs combining text labels, chip badges, and icons for complex navigation hierarchies.',
      },
    },
  },
};

// Playground for interactive testing
export const Playground: Story = {
  name: '05 Playground',
  args: {
    items: [
      { label: 'Home', path: '/', icon: 'home' },
      { label: 'Products', path: '/products', icon: 'table' },
      { label: 'Electronics' },
    ],
    onNavigate: (path) => console.log('Breadcrumb clicked:', path),
    separatorStyle: 'chevron',
    size: 'default',
    spacing: 'comfortable',
    showSeparator: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test all breadcrumb props. Use the controls below to experiment with different separators, sizes, spacing, and color schemes.',
      },
    },
  },
};
