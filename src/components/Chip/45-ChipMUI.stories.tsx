import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Chip as MUIChip } from '@mui/material';
import {
  CheckmarkFilled,
  Checkmark,
  Close,
  CloseFilled,
  Information,
  Warning,
  WarningFilled,
  WarningAltFilled as ErrorFilled,
  WarningAlt as Error,
  User,
  UserAdmin,
  Calendar,
  Time,
  Tag,
  Document,
  Folder,
  Settings,
  Notification,
  Search,
  Filter,
  Edit,
  View,
  TrashCan,
  Archive,
  Download,
  Upload,
  Star,
  StarFilled,
  Add,
  Subtract,
  Play,
  Pause,
  Stop,
  Locked,
  Currency,
  Growth as TrendingUp,
  Analytics,
  Application,
  Portfolio,
  PaintBrush,
  ChartLineData,
  ShoppingCart,
  Headphones,
  Code,
  Beta,
  LogoReact,
  LogoVue,
  LogoGithub
} from '@carbon/icons-react';

// ODL styling function for MUI chips - exact ODL styles
const getODLChipStyles = (variant: string = 'grey', size: string = 'md') => {
  const baseStyles = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    borderRadius: '4px', // ODL border-radius-base
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
      '& .MuiChip-deleteIcon': {
        fontSize: '14px',
        marginRight: '4px',
        marginLeft: '-2px',
      },
      '& .MuiChip-label': {
        paddingLeft: '8px',
        paddingRight: '8px',
        paddingTop: '2px',
        paddingBottom: '2px',
      },
    },
    md: {
      minHeight: '28px',
      fontSize: '14px',
      '& .MuiChip-icon': {
        fontSize: '16px',
        marginLeft: '8px',
        marginRight: '-4px',
      },
      '& .MuiChip-deleteIcon': {
        fontSize: '16px',
        marginRight: '8px',
        marginLeft: '-4px',
      },
      '& .MuiChip-label': {
        paddingLeft: '12px',
        paddingRight: '12px',
        paddingTop: '4px',
        paddingBottom: '4px',
      },
    },
    lg: {
      minHeight: '32px',
      fontSize: '16px',
      '& .MuiChip-icon': {
        fontSize: '18px',
        marginLeft: '12px',
        marginRight: '-4px',
      },
      '& .MuiChip-deleteIcon': {
        fontSize: '18px',
        marginRight: '12px',
        marginLeft: '-4px',
      },
      '& .MuiChip-label': {
        paddingLeft: '16px',
        paddingRight: '16px',
        paddingTop: '8px',
        paddingBottom: '8px',
      },
    },
  };

  const variantStyles = {
    blue: {
      backgroundColor: '#E0F3FE', // --chip-primary-light
      color: '#3560C1', // --chip-primary
      '&:hover': {
        backgroundColor: '#C8E6FA',
      },
    },
    lightGreen: {
      backgroundColor: '#DEFBE6', // --chip-success-light
      color: '#31622C', // --chip-green-text
      '&:hover': {
        backgroundColor: '#C8F5D3',
      },
    },
    darkGreen: {
      backgroundColor: '#1B4721', // --chip-green-dark
      color: '#FFFFFF', // --chip-text-inverse
      '& .MuiChip-icon': {
        color: '#FFFFFF', // White icon for dark background
      },
      '&:hover': {
        backgroundColor: '#245A2C',
      },
    },
    orange: {
      backgroundColor: '#FCEEDA', // --chip-orange-light
      color: '#C93713', // --chip-orange
      '&:hover': {
        backgroundColor: '#FAE5C8',
      },
    },
    red: {
      backgroundColor: '#FFD7D9', // --chip-error-light
      color: '#A2191F', // Darker red for better contrast (4.5:1)
      '&:hover': {
        backgroundColor: '#FFC7CA',
      },
    },
    yellow: {
      backgroundColor: '#FFF1C7', // --chip-warning-light
      color: '#8A6116', // Darker yellow for contrast
      '&:hover': {
        backgroundColor: '#FFE8B3',
      },
    },
    purple: {
      backgroundColor: '#F0E5FF', // --chip-purple-light
      color: '#6929C4', // --chip-purple
      '&:hover': {
        backgroundColor: '#E5D4FF',
      },
    },
    teal: {
      backgroundColor: '#D9FBFB', // --chip-teal-light
      color: '#005D5D', // --chip-teal
      '&:hover': {
        backgroundColor: '#C3F7F7',
      },
    },
    burgundy: {
      backgroundColor: '#750E13', // --chip-burgundy
      color: '#FFFFFF',
      '& .MuiChip-icon': {
        color: '#FFFFFF', // White icon for dark background
      },
      '&:hover': {
        backgroundColor: '#8A1116',
      },
    },
    grey: {
      backgroundColor: '#F4F4F4', // --chip-surface
      color: '#525252', // --chip-text-secondary
      '&:hover': {
        backgroundColor: '#EBEBEB', // --chip-surface-hover
      },
    },
    white: {
      backgroundColor: '#FFFFFF',
      color: '#525252', // --chip-text-secondary
      border: '1px solid #E0E0E0', // --chip-border
      '&:hover': {
        backgroundColor: '#FAFAFA',
      },
    },
    success: {
      backgroundColor: '#DEFBE6', // --chip-success-light
      color: '#198038', // Darker green for better contrast (4.5:1)
      '&:hover': {
        backgroundColor: '#C8F5D3',
      },
    },
    error: {
      backgroundColor: '#FFD7D9', // --chip-error-light
      color: '#A2191F', // Darker red for better contrast (4.5:1)
      '&:hover': {
        backgroundColor: '#FFC7CA',
      },
    },
    warning: {
      backgroundColor: '#FFF1C7', // --chip-warning-light
      color: '#8A6116', // Darker for contrast
      '&:hover': {
        backgroundColor: '#FFE8B3',
      },
    },
    info: {
      backgroundColor: '#E8F4FD', // --chip-info-light
      color: '#0043CE', // Darker blue for better contrast (4.5:1)
      '&:hover': {
        backgroundColor: '#D4E8FC',
      },
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size as keyof typeof sizeStyles],
    ...variantStyles[variant as keyof typeof variantStyles],
  };
};

// Carbon icon mapping - matching ODL Chip icons
const iconMap: { [key: string]: React.ComponentType<any> } = {
  checkmark: Checkmark,
  'checkmark-filled': CheckmarkFilled,
  close: Close,
  'close-filled': CloseFilled,
  information: Information,
  warning: Warning,
  'warning-filled': WarningFilled,
  'error-filled': ErrorFilled,
  error: Error,
  user: User,
  'user-admin': UserAdmin,
  calendar: Calendar,
  time: Time,
  tag: Tag,
  document: Document,
  folder: Folder,
  settings: Settings,
  notification: Notification,
  search: Search,
  filter: Filter,
  edit: Edit,
  view: View,
  trash: TrashCan,
  archive: Archive,
  download: Download,
  upload: Upload,
  star: Star,
  'star-filled': StarFilled,
  add: Add,
  subtract: Subtract,
  play: Play,
  pause: Pause,
  stop: Stop,
  locked: Locked,
  currency: Currency,
  'trending-up': TrendingUp,
  analytics: Analytics,
  application: Application,
  briefcase: Portfolio,
  'paint-brush': PaintBrush,
  'chart-line': ChartLineData,
  'shopping-cart': ShoppingCart,
  headset: Headphones,
  code: Code,
  beta: Beta,
  'logo-react': LogoReact,
  'logo-vue': LogoVue,
  'logo-github': LogoGithub,
};

const getIcon = (iconName: string, size: string = 'md') => {
  const Icon = iconMap[iconName];
  if (!Icon) return null;

  const iconSize = size === 'sm' ? 14 : size === 'md' ? 16 : 18;
  return <Icon size={iconSize} />;
};

const meta: Meta = {
  title: 'Design System/Components/Chip',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Material-UI Chip component styled to match ODL design system. Supports various colors, sizes, icons, and interactive states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Text content of the chip',
      table: {
        disable: true,
        type: { summary: 'string' },
        defaultValue: { summary: 'Chip' },
      },
    },
    variant: {
      control: 'select',
      options: ['blue', 'lightGreen', 'darkGreen', 'orange', 'red', 'yellow', 'purple', 'teal', 'burgundy', 'grey', 'white', 'success', 'error', 'warning', 'info'],
      description: 'Color variant of the chip',
      table: {
        disable: true,
        type: { summary: 'string' },
        defaultValue: { summary: 'grey' },
      },
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the chip',
      table: {
        disable: true,
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    icon: {
      control: 'select',
      options: ['none', 'checkmark', 'checkmark-filled', 'close', 'close-filled', 'information', 'warning', 'warning-filled', 'error', 'error-filled', 'user', 'user-admin', 'calendar', 'time', 'tag', 'document', 'folder', 'settings', 'notification', 'search', 'filter', 'edit', 'view', 'trash', 'archive', 'download', 'upload', 'star', 'star-filled', 'locked', 'currency', 'trending-up', 'analytics', 'application', 'briefcase', 'paint-brush', 'chart-line', 'shopping-cart', 'headset', 'code', 'beta'],
      description: 'Icon to display in the chip',
      table: {
        disable: true,
        type: { summary: 'string' },
        defaultValue: { summary: 'none' },
      },
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the chip is clickable',
      table: {
        disable: true,
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    deletable: {
      disable: true,
      control: 'boolean',
      description: 'Whether the chip shows a delete icon',
      table: {
        disable: true,
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
};

export default meta;

type Story = StoryObj<{
  label: string;
  variant: string;
  size: 'sm' | 'md' | 'lg';
  icon: string;
  clickable: boolean;
  deletable: boolean;
}>;

// Default chip
export const Default: Story = {
  name: '01 Default',
  args: {
    label: 'Default Chip',
    variant: 'grey',
    size: 'md',
    icon: 'none',
    clickable: false,
    deletable: false,
  },
  render: (args) => (
    <MUIChip
      label={args.label}
      sx={getODLChipStyles(args.variant, args.size)}
      icon={args.icon !== 'none' ? getIcon(args.icon, args.size) : undefined}
      clickable={args.clickable}
      onDelete={args.deletable ? () => console.log('Delete clicked') : undefined}
      deleteIcon={args.deletable ? <Close size={args.size === 'sm' ? 14 : args.size === 'md' ? 16 : 18} /> : undefined}
      onClick={args.clickable ? () => console.log('Chip clicked') : undefined}
    />
  ),
};

// All variants showcase
export const AllVariants: Story = {
  name: '02 All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ marginBottom: '12px' }}>Color Variants</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <MUIChip label="Blue" sx={getODLChipStyles('blue')} />
          <MUIChip label="Light Green" sx={getODLChipStyles('lightGreen')} />
          <MUIChip label="Dark Green" sx={getODLChipStyles('darkGreen')} />
          <MUIChip label="Orange" sx={getODLChipStyles('orange')} />
          <MUIChip label="Red" sx={getODLChipStyles('red')} />
          <MUIChip label="Yellow" sx={getODLChipStyles('yellow')} />
          <MUIChip label="Purple" sx={getODLChipStyles('purple')} />
          <MUIChip label="Teal" sx={getODLChipStyles('teal')} />
          <MUIChip label="Burgundy" sx={getODLChipStyles('burgundy')} />
          <MUIChip label="Grey" sx={getODLChipStyles('grey')} />
          <MUIChip label="White" sx={getODLChipStyles('white')} />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px' }}>Semantic Variants</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <MUIChip label="Success" sx={getODLChipStyles('success')} icon={<CheckmarkFilled size={16} />} />
          <MUIChip label="Error" sx={getODLChipStyles('error')} icon={<ErrorFilled size={16} />} />
          <MUIChip label="Warning" sx={getODLChipStyles('warning')} icon={<Warning size={16} />} />
          <MUIChip label="Info" sx={getODLChipStyles('info')} icon={<Information size={16} />} />
        </div>
      </div>
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  name: '03 Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <MUIChip label="Small" sx={getODLChipStyles('blue', 'sm')} />
      <MUIChip label="Medium" sx={getODLChipStyles('blue', 'md')} />
      <MUIChip label="Large" sx={getODLChipStyles('blue', 'lg')} />
    </div>
  ),
};

// With icons
export const WithIcons: Story = {
  name: '04 With Icons',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <MUIChip label="User" sx={getODLChipStyles('purple')} icon={<User size={16} />} />
      <MUIChip label="Calendar" sx={getODLChipStyles('blue')} icon={<Calendar size={16} />} />
      <MUIChip label="Settings" sx={getODLChipStyles('grey')} icon={<Settings size={16} />} />
      <MUIChip label="Notification" sx={getODLChipStyles('orange')} icon={<Notification size={16} />} />
      <MUIChip label="Document" sx={getODLChipStyles('teal')} icon={<Document size={16} />} />
    </div>
  ),
};

// Clickable chips
export const Clickable: Story = {
  name: '05 Clickable',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <MUIChip
        label="Click me"
        sx={getODLChipStyles('blue')}
        clickable
        onClick={() => console.log('Clicked!')}
      />
      <MUIChip
        label="Filter"
        sx={getODLChipStyles('purple')}
        icon={<Filter size={16} />}
        clickable
        onClick={() => console.log('Filter clicked!')}
      />
      <MUIChip
        label="Search"
        sx={getODLChipStyles('teal')}
        icon={<Search size={16} />}
        clickable
        onClick={() => console.log('Search clicked!')}
      />
    </div>
  ),
};

// Deletable chips
export const Deletable: Story = {
  name: '06 Deletable',
  render: () => {
    const [chips, setChips] = React.useState([
      { id: 1, label: 'Apple', variant: 'lightGreen' },
      { id: 2, label: 'Banana', variant: 'yellow' },
      { id: 3, label: 'Cherry', variant: 'red' },
      { id: 4, label: 'Grape', variant: 'purple' },
    ]);

    const handleDelete = (id: number) => {
      setChips(chips.filter(chip => chip.id !== id));
    };

    return (
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {chips.map(chip => (
          <MUIChip
            key={chip.id}
            label={chip.label}
            sx={getODLChipStyles(chip.variant)}
            onDelete={() => handleDelete(chip.id)}
            deleteIcon={<Close size={16} />}
          />
        ))}
      </div>
    );
  },
};

// Status chips
export const StatusChips: Story = {
  name: '07 Status Chips',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <MUIChip label="Active" sx={getODLChipStyles('lightGreen')} icon={<CheckmarkFilled size={16} />} />
      <MUIChip label="Pending" sx={getODLChipStyles('yellow')} icon={<Time size={16} />} />
      <MUIChip label="Inactive" sx={getODLChipStyles('grey')} icon={<Pause size={16} />} />
      <MUIChip label="Error" sx={getODLChipStyles('red')} icon={<ErrorFilled size={16} />} />
      <MUIChip label="Completed" sx={getODLChipStyles('darkGreen')} icon={<CheckmarkFilled size={16} />} />
    </div>
  ),
};

// Tag chips
export const TagChips: Story = {
  name: '08 Tag Chips',
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <MUIChip label="React" sx={getODLChipStyles('blue', 'sm')} />
      <MUIChip label="TypeScript" sx={getODLChipStyles('blue', 'sm')} />
      <MUIChip label="JavaScript" sx={getODLChipStyles('yellow', 'sm')} />
      <MUIChip label="CSS" sx={getODLChipStyles('purple', 'sm')} />
      <MUIChip label="HTML" sx={getODLChipStyles('orange', 'sm')} />
      <MUIChip label="Node.js" sx={getODLChipStyles('lightGreen', 'sm')} />
    </div>
  ),
};