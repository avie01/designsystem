import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Button from './Button';
import { useTheme } from '../../../.storybook/theme-decorator';
import {
  Add,
  Edit,
  Delete,
  Download,
  Upload,
  Search,
  Settings,
  ChevronRight,
  ChevronLeft,
  Save,
  Close,
  CheckmarkFilled,
  Copy,
  Filter,
  Renew,
  Send,
  Share,
  Star,
  Calendar,
  Notification,
  Help,
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  Stop
} from '@carbon/icons-react';

const meta: Meta<typeof Button> = {
  title: 'Design System/Components/Button',
  component: Button,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ODL Button component with multiple variants, sizes, and icon support. Fully accessible and follows ODL design system guidelines.',
      },
    },
  },
  tags: ['autodocs', 'Ready for dev'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'text', 'destructive', 'ghost'],
      description: 'Button variant style',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'small', 'medium', 'large'],
      description: 'Button size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      control: false,
      table: {
        disable: true,
      },
      description: 'Click handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic button
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
};

// All variants showcase
export const AllVariants: Story = {
  name: '02 All Variants',
  render: () => {
    const { colors } = useTheme();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing?.[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing?.[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Button Variants</h4>
          <div style={{ display: 'flex', gap: colors.spacing?.[3] || '12px', flexWrap: 'wrap' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="tertiary">Tertiary</Button>
            <Button variant="text">Text</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>
      </div>
    );
  },
};

// All sizes
export const Sizes: Story = {
  name: '03 Sizes',
  render: () => {
    const { colors } = useTheme();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing?.[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing?.[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Button Sizes</h4>
          <div style={{ display: 'flex', gap: colors.spacing?.[3] || '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Button size="xs">Extra Small</Button>
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
          </div>
        </div>
      </div>
    );
  },
};

// Icon buttons - Left icon
export const WithLeftIcon: Story = {
  name: '04 With Left Icon',
  render: () => {
    const { colors } = useTheme();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing?.[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing?.[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Buttons with Left Icons</h4>
          <div style={{ display: 'flex', gap: colors.spacing?.[3] || '12px', flexWrap: 'wrap' }}>
            <Button variant="primary">
              <Add size={16} style={{ marginRight: colors.spacing?.[2] || '8px' }} />
              Add Item
            </Button>
            <Button variant="secondary">
              <Edit size={16} style={{ marginRight: colors.spacing?.[2] || '8px' }} />
              Edit
            </Button>
            <Button variant="tertiary">
              <Download size={16} style={{ marginRight: colors.spacing?.[2] || '8px' }} />
              Download
            </Button>
            <Button variant="destructive">
              <Delete size={16} style={{ marginRight: colors.spacing?.[2] || '8px' }} />
              Delete
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

// Icon buttons - Right icon
export const WithRightIcon: Story = {
  name: '05 With Right Icon',
  render: () => {
    const { colors } = useTheme();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing?.[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing?.[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Buttons with Right Icons</h4>
          <div style={{ display: 'flex', gap: colors.spacing?.[3] || '12px', flexWrap: 'wrap' }}>
            <Button variant="primary">
              Next
              <ChevronRight size={16} style={{ marginLeft: colors.spacing?.[2] || '8px' }} />
            </Button>
            <Button variant="secondary">
              Previous
              <ChevronLeft size={16} style={{ marginLeft: colors.spacing?.[2] || '8px' }} />
            </Button>
            <Button variant="tertiary">
              Continue
              <ArrowRight size={16} style={{ marginLeft: colors.spacing?.[2] || '8px' }} />
            </Button>
            <Button variant="text">
              Learn More
              <ArrowRight size={16} style={{ marginLeft: colors.spacing?.[2] || '8px' }} />
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

// Icon only buttons
export const IconOnly: Story = {
  name: '06 Icon Only',
  render: () => {
    const { colors } = useTheme();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing?.[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing?.[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Icon Only Buttons</h4>
          <div style={{ display: 'flex', gap: colors.spacing?.[3] || '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button variant="primary" aria-label="Add">
              <Add size={20} />
            </Button>
            <Button variant="secondary" aria-label="Edit">
              <Edit size={20} />
            </Button>
            <Button variant="tertiary" aria-label="Settings">
              <Settings size={20} />
            </Button>
            <Button variant="ghost" aria-label="Search">
              <Search size={20} />
            </Button>
            <Button variant="destructive" aria-label="Delete">
              <Delete size={20} />
            </Button>
            <Button variant="text" aria-label="Close">
              <Close size={20} />
            </Button>
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: colors.spacing?.[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Icon Only - Different Sizes</h4>
          <div style={{ display: 'flex', gap: colors.spacing?.[3] || '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Button size="xs" variant="primary" aria-label="Add">
              <Add size={14} />
            </Button>
            <Button size="small" variant="primary" aria-label="Add">
              <Add size={16} />
            </Button>
            <Button size="medium" variant="primary" aria-label="Add">
              <Add size={20} />
            </Button>
            <Button size="large" variant="primary" aria-label="Add">
              <Add size={24} />
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

// States
export const States: Story = {
  name: '07 States',
  render: () => {
    const { colors } = useTheme();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing?.[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing?.[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Disabled State</h4>
          <div style={{ display: 'flex', gap: colors.spacing?.[3] || '12px', flexWrap: 'wrap' }}>
            <Button variant="primary" disabled>Primary Disabled</Button>
            <Button variant="secondary" disabled>Secondary Disabled</Button>
            <Button variant="tertiary" disabled>Tertiary Disabled</Button>
            <Button variant="destructive" disabled>Destructive Disabled</Button>
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: colors.spacing?.[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Loading State</h4>
          <div style={{ display: 'flex', gap: colors.spacing?.[3] || '12px', flexWrap: 'wrap' }}>
            <Button variant="primary" loading>Loading...</Button>
            <Button variant="secondary" loading>Processing...</Button>
            <Button variant="tertiary" loading>Please wait...</Button>
          </div>
        </div>
      </div>
    );
  },
};

// Common button patterns
export const CommonPatterns: Story = {
  name: '08 Common Patterns',
  render: () => {
    const { colors } = useTheme();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing?.[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing?.[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Action Buttons</h4>
          <div style={{ display: 'flex', gap: colors.spacing?.[3] || '12px', flexWrap: 'wrap' }}>
            <Button variant="primary">
              <Save size={16} style={{ marginRight: colors.spacing?.[2] || '8px' }} />
              Save
            </Button>
            <Button variant="secondary">
              <Copy size={16} style={{ marginRight: colors.spacing?.[2] || '8px' }} />
              Copy
            </Button>
            <Button variant="tertiary">
              <Share size={16} style={{ marginRight: colors.spacing?.[2] || '8px' }} />
              Share
            </Button>
            <Button variant="primary">
              <Send size={16} style={{ marginRight: colors.spacing?.[2] || '8px' }} />
              Send
            </Button>
            <Button variant="secondary">
              <Upload size={16} style={{ marginRight: colors.spacing?.[2] || '8px' }} />
              Upload
            </Button>
            <Button variant="tertiary">
              <Download size={16} style={{ marginRight: colors.spacing?.[2] || '8px' }} />
              Download
            </Button>
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: colors.spacing?.[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Navigation Buttons</h4>
          <div style={{ display: 'flex', gap: colors.spacing?.[3] || '12px', flexWrap: 'wrap' }}>
            <Button variant="text">
              <ArrowLeft size={16} style={{ marginRight: colors.spacing?.[2] || '8px' }} />
              Back
            </Button>
            <Button variant="primary">
              Next
              <ArrowRight size={16} style={{ marginLeft: colors.spacing?.[2] || '8px' }} />
            </Button>
            <Button variant="secondary">
              <ChevronLeft size={16} style={{ marginRight: colors.spacing?.[2] || '8px' }} />
              Previous
            </Button>
            <Button variant="secondary">
              Continue
              <ChevronRight size={16} style={{ marginLeft: colors.spacing?.[2] || '8px' }} />
            </Button>
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: colors.spacing?.[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Media Controls</h4>
          <div style={{ display: 'flex', gap: colors.spacing?.[3] || '12px', flexWrap: 'wrap' }}>
            <Button variant="primary" aria-label="Play">
              <Play size={20} />
            </Button>
            <Button variant="secondary" aria-label="Pause">
              <Pause size={20} />
            </Button>
            <Button variant="tertiary" aria-label="Stop">
              <Stop size={20} />
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

// Button groups
export const ButtonGroups: Story = {
  name: '09 Button Groups',
  render: () => {
    const { colors } = useTheme();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing?.[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing?.[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Dialog Actions</h4>
          <div style={{ display: 'flex', gap: colors.spacing?.[2] || '8px', justifyContent: 'flex-end' }}>
            <Button variant="text">Cancel</Button>
            <Button variant="primary">Confirm</Button>
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: colors.spacing?.[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Form Actions</h4>
          <div style={{ display: 'flex', gap: colors.spacing?.[2] || '8px' }}>
            <Button variant="primary">
              <Save size={16} style={{ marginRight: colors.spacing?.[2] || '8px' }} />
              Save
            </Button>
            <Button variant="secondary">Save as Draft</Button>
            <Button variant="text">Cancel</Button>
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: colors.spacing?.[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Destructive Actions</h4>
          <div style={{ display: 'flex', gap: colors.spacing?.[2] || '8px', justifyContent: 'flex-end' }}>
            <Button variant="secondary">Cancel</Button>
            <Button variant="destructive">
              <Delete size={16} style={{ marginRight: colors.spacing?.[2] || '8px' }} />
              Delete Item
            </Button>
          </div>
        </div>
      </div>
    );
  },
};


// Interactive playground
export const Playground: Story = {
  name: '10 Playground',
  args: {
    children: 'Click Me',
    variant: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
  },
};