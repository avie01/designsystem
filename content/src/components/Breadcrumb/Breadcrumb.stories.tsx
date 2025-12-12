import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Breadcrumb from './Breadcrumb';
import { Chip as MUIChip } from '@mui/material';
import {
  CheckmarkFilled,
  Time,
  Timer,
  UserAdmin,
  Cloud,
  PlayFilledAlt,
  Version
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
    yellow: {
      backgroundColor: '#FFF1C7',
      color: '#8A6116',
      '&:hover': {
        backgroundColor: '#FFE8B3',
      },
    },
    darkGreen: {
      backgroundColor: '#1B4721',
      color: '#FFFFFF',
      '& .MuiChip-icon': {
        color: '#FFFFFF',
      },
      '&:hover': {
        backgroundColor: '#245A2C',
      },
    },
    teal: {
      backgroundColor: '#D9FBFB',
      color: '#005D5D',
      '&:hover': {
        backgroundColor: '#C3F7F7',
      },
    },
    orange: {
      backgroundColor: '#FCEEDA',
      color: '#C93713',
      '&:hover': {
        backgroundColor: '#FAE5C8',
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
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A breadcrumb component for showing navigation hierarchy. Supports clickable items with path navigation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // For complex arrays, it's better to not make them editable in controls
    // Instead, provide different stories with various configurations
    items: {
      description: 'Array of breadcrumb items with label, optional path, and optional icon',
      table: {
        type: {
          summary: 'BreadcrumbItem[]',
          detail: `interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: string;
}

// Items are predefined in each story
// See different stories for various breadcrumb configurations`
        },
        category: 'Data',
        disable: true,
      },
    },
    separator: {
      control: 'text',
      description: 'Separator between breadcrumb items (default is chevron icon)',
      table: {
        type: { summary: 'string | React.ReactNode' },
        defaultValue: { summary: 'ChevronIcon' },
        category: 'Appearance',
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling',
      table: {
        type: { summary: 'string' },
        category: 'Appearance',
      },
    },
    onNavigate: {
      control: false,
      description: 'Callback function when a breadcrumb item with a path is clicked',
      table: {
        type: { summary: '(path: string) => void' },
        category: 'Events',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic breadcrumb with navigation
export const Default: Story = {
  args: {
    items: [
      { label: 'Home', path: '/' },
      { label: 'Products', path: '/products' },
      { label: 'Electronics', path: '/products/electronics' },
      { label: 'Laptops' }, // Current page (no path)
    ],
    onNavigate: (path) => console.log('Breadcrumb clicked:', path),
  },
};

// Short breadcrumb
export const Short: Story = {
  args: {
    items: [
      { label: 'Home', path: '/' },
      { label: 'Settings' },
    ],
    onNavigate: (path) => console.log('Breadcrumb clicked:', path),
  },
};

// Long breadcrumb trail
export const LongTrail: Story = {
  args: {
    items: [
      { label: 'Home', path: '/' },
      { label: 'Documents', path: '/documents' },
      { label: 'Projects', path: '/documents/projects' },
      { label: '2024', path: '/documents/projects/2024' },
      { label: 'Q1', path: '/documents/projects/2024/q1' },
      { label: 'Reports', path: '/documents/projects/2024/q1/reports' },
      { label: 'Final Report' },
    ],
    onNavigate: (path) => console.log('Breadcrumb clicked:', path),
  },
};

// Application context
export const ApplicationContext: Story = {
  args: {
    items: [
      { label: 'Applications', path: '/applications' },
      { label: 'Development', path: '/applications/development' },
      { label: 'DA/2024/1234' },
    ],
    onNavigate: (path) => console.log('Breadcrumb clicked:', path),
  },
};

// File system navigation
export const FileSystem: Story = {
  args: {
    items: [
      { label: 'Root', path: '/' },
      { label: 'Users', path: '/users' },
      { label: 'John', path: '/users/john' },
      { label: 'Documents', path: '/users/john/documents' },
      { label: 'Work', path: '/users/john/documents/work' },
      { label: 'Reports' },
    ],
    onNavigate: (path) => console.log('Breadcrumb clicked:', path),
  },
};

// Dashboard breadcrumb
export const Dashboard: Story = {
  args: {
    items: [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Analytics', path: '/dashboard/analytics' },
      { label: 'Performance Metrics' },
    ],
    onNavigate: (path) => console.log('Breadcrumb clicked:', path),
  },
};

// Settings navigation
export const Settings: Story = {
  args: {
    items: [
      { label: 'Settings', path: '/settings' },
      { label: 'Account', path: '/settings/account' },
      { label: 'Security', path: '/settings/account/security' },
      { label: 'Two-Factor Authentication' },
    ],
    onNavigate: (path) => console.log('Breadcrumb clicked:', path),
  },
};

// Interactive example with all items clickable
export const AllClickable: Story = {
  args: {
    items: [
      { label: 'Level 1', path: '/level1' },
      { label: 'Level 2', path: '/level2' },
      { label: 'Level 3', path: '/level3' },
      { label: 'Level 4', path: '/level4' },
    ],
    onNavigate: (path) => console.log('Breadcrumb clicked:', path),
  },
  parameters: {
    docs: {
      description: {
        story: 'All items are clickable. Check the Actions tab to see navigation events.',
      },
    },
  },
};

// Non-interactive breadcrumb (display only)
export const DisplayOnly: Story = {
  args: {
    items: [
      { label: 'Home' },
      { label: 'Products' },
      { label: 'Electronics' },
      { label: 'Laptops' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumb without paths - display only, no navigation.',
      },
    },
  },
};

// With custom className
export const CustomStyling: Story = {
  args: {
    items: [
      { label: 'Home', path: '/' },
      { label: 'Custom', path: '/custom' },
      { label: 'Styled' },
    ],
    className: 'custom-breadcrumb-class',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example with custom className for additional styling.',
      },
    },
  },
};

// Custom separator - slash
export const SlashSeparator: Story = {
  args: {
    items: [
      { label: 'Home', path: '/' },
      { label: 'Products', path: '/products' },
      { label: 'Electronics', path: '/products/electronics' },
      { label: 'Laptops' },
    ],
    separator: '/',
    onNavigate: (path) => console.log('Breadcrumb clicked:', path),
  },
};

// Custom separator - arrow
export const ArrowSeparator: Story = {
  args: {
    items: [
      { label: 'Step 1', path: '/step1' },
      { label: 'Step 2', path: '/step2' },
      { label: 'Step 3', path: '/step3' },
      { label: 'Complete' },
    ],
    separator: '→',
    onNavigate: (path) => console.log('Breadcrumb clicked:', path),
  },
};

// Custom separator - pipe
export const PipeSeparator: Story = {
  args: {
    items: [
      { label: 'Admin', path: '/admin' },
      { label: 'Users', path: '/admin/users' },
      { label: 'Permissions', path: '/admin/users/permissions' },
      { label: 'Edit' },
    ],
    separator: '|',
    onNavigate: (path) => console.log('Breadcrumb clicked:', path),
  },
};

// Custom separator - double chevron
export const DoubleChevronSeparator: Story = {
  args: {
    items: [
      { label: 'Start', path: '/start' },
      { label: 'Middle', path: '/middle' },
      { label: 'End' },
    ],
    separator: '»',
    onNavigate: (path) => console.log('Breadcrumb clicked:', path),
  },
};

// Custom separator - dot
export const DotSeparator: Story = {
  args: {
    items: [
      { label: 'Category', path: '/category' },
      { label: 'Subcategory', path: '/subcategory' },
      { label: 'Item' },
    ],
    separator: '•',
    onNavigate: (path) => console.log('Breadcrumb clicked:', path),
  },
};

// Interactive Playground with appearance control
export const Playground: Story = {
  args: {
    items: [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Projects', path: '/projects' },
      { label: 'ODL Library', path: '/projects/odl' },
      { label: 'Components' },
    ],
    onNavigate: (path: string) => console.log('Breadcrumb clicked:', path),
    appearance: 'default',
    chip1Label: 'Active',
    chip1Variant: 'lightGreen',
    chip1Icon: 'checkmark',
    chip2Label: 'v2.1.0',
    chip2Variant: 'blue',
    chip2Icon: 'version',
  } as any,
  // Simplified render - just pass through the props
  render: (args) => <Breadcrumb {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Use the controls to experiment with different breadcrumb appearances. Select an appearance style from the dropdown to see how breadcrumbs can be enhanced with chips for different contexts.',
      },
    },
  },
};

// Story with Chips in breadcrumb
export const WithChips: Story = {
  render: () => {
    const breadcrumbItems = [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'Projects', path: '/projects' },
      { label: 'ODL Library', path: '/projects/odl' },
      { label: 'Components' }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Basic breadcrumb with status chips */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Breadcrumb with Status Chips</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Breadcrumb
              items={breadcrumbItems}
              onNavigate={(path) => console.log('Breadcrumb clicked:', path)}
            />
            <MUIChip label="Active" sx={getODLChipStyles('lightGreen', 'sm')} icon={<CheckmarkFilled size={14} />} />
            <MUIChip label="v2.1.0" sx={getODLChipStyles('blue', 'sm')} icon={<Version size={14} />} />
          </div>
        </div>

        {/* Breadcrumb with inline chips */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Breadcrumb with Inline Chips</h4>
          <Breadcrumb
            items={[
              { label: 'Home', path: '/' },
              { label: 'Users', path: '/users' },
              { label: 'John Doe', path: '/users/john' },
            ]}
            onNavigate={(path) => console.log('Breadcrumb clicked:', path)}
            separator={
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#9ca3af' }}>/</span>
                <MUIChip label="Admin" sx={getODLChipStyles('purple', 'sm')} icon={<UserAdmin size={14} />} />
                <span style={{ color: '#9ca3af' }}>/</span>
              </div>
            }
          />
        </div>

        {/* Breadcrumb with environment chips */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Environment Context with Chips</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <MUIChip label="Production" sx={getODLChipStyles('darkGreen', 'sm')} icon={<Cloud size={14} />} />
            <span style={{ color: '#9ca3af' }}>→</span>
            <Breadcrumb
              items={[
                { label: 'AWS', path: '/aws' },
                { label: 'us-east-1', path: '/aws/us-east-1' },
                { label: 'Services', path: '/aws/us-east-1/services' },
                { label: 'Lambda' }
              ]}
              onNavigate={(path) => console.log('Breadcrumb clicked:', path)}
            />
            <MUIChip label="23 Functions" sx={getODLChipStyles('grey', 'sm')} />
          </div>
        </div>

        {/* File path with type chips */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>File Path with Type Indicators</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Breadcrumb
              items={[
                { label: 'src', path: '/src' },
                { label: 'components', path: '/src/components' },
                { label: 'Breadcrumb', path: '/src/components/Breadcrumb' },
                { label: 'Breadcrumb.tsx' }
              ]}
              onNavigate={(path) => console.log('Breadcrumb clicked:', path)}
            />
            <MUIChip label="TypeScript" sx={getODLChipStyles('blue', 'sm')} />
            <MUIChip label="Modified" sx={getODLChipStyles('yellow', 'sm')} />
          </div>
        </div>

        {/* Workflow status breadcrumb */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Workflow Status Breadcrumb</h4>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px',
            background: '#f9fafb',
            borderRadius: '8px',
            gap: '16px'
          }}>
            <Breadcrumb
              items={[
                { label: 'Pipelines', path: '/pipelines' },
                { label: 'Data Processing', path: '/pipelines/data' },
                { label: 'ETL Job #1234' }
              ]}
              onNavigate={(path) => console.log('Breadcrumb clicked:', path)}
            />
            <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
              <MUIChip label="Running" sx={getODLChipStyles('blue', 'sm')} icon={<PlayFilledAlt size={14} />} />
              <MUIChip label="3/5 Steps" sx={getODLChipStyles('grey', 'sm')} />
              <MUIChip label="2m 34s" sx={getODLChipStyles('grey', 'sm')} icon={<Timer size={14} />} />
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Examples of breadcrumbs enhanced with Chip components to provide additional context like status, environment, file types, and workflow states. The chips can be placed inline, at the end, or as separators.',
      },
    },
  },
};