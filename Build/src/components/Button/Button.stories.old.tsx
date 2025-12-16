import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import Icon from '../Icon/Icon';
import ODLTheme from '../../styles/ODLTheme';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and states. Supports icons, loading states, and custom styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'text', 'destructive', 'ghost'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'small', 'medium', 'large'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    loading: {
      control: 'boolean',
      description: 'Whether to show loading state',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the button is selected/active',
    },
    children: {
      control: 'text',
      description: 'Button content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Primary button story
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    size: 'medium',
  },
};

// Secondary button story
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    size: 'medium',
  },
};

// Tertiary button story
export const Tertiary: Story = {
  args: {
    children: 'Tertiary Button',
    variant: 'tertiary',
    size: 'medium',
  },
};

// Text button story
export const Text: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
    size: 'medium',
  },
};

// Destructive button story
export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
    size: 'medium',
  },
};

// Ghost button story
export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    size: 'medium',
  },
};

// Button with icon on left
export const WithIconLeft: Story = {
  args: {
    children: 'Save',
    variant: 'primary',
    size: 'medium',
    icon: <Icon name="save" size={16} />,
  },
};

// Button with icon on right
export const WithIconRight: Story = {
  args: {
    children: 'Next',
    variant: 'primary',
    size: 'medium',
    iconRight: <Icon name="arrow-right" size={16} />,
  },
};

// Loading state
export const Loading: Story = {
  args: {
    children: 'Processing...',
    variant: 'primary',
    size: 'medium',
    loading: true,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'primary',
    size: 'medium',
    disabled: true,
  },
};

// Selected state
export const Selected: Story = {
  args: {
    children: 'Selected',
    variant: 'secondary',
    size: 'medium',
    selected: true,
  },
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="text">Text</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

// Button group example
export const ButtonGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Save Changes</Button>
    </div>
  ),
};

// Icon-only buttons
export const IconOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button variant="ghost" size="sm">
        <Icon name="edit" size={16} />
      </Button>
      <Button variant="ghost" size="sm">
        <Icon name="trash-can" size={16} />
      </Button>
      <Button variant="ghost" size="sm">
        <Icon name="settings" size={16} />
      </Button>
    </div>
  ),
};

// ODL Theme showcase
export const ODLThemeShowcase: Story = {
  render: () => (
    <div style={{ 
      padding: ODLTheme.spacing[6],
      backgroundColor: ODLTheme.colors.surface,
      borderRadius: ODLTheme.borders.radius.lg
    }}>
      <h3 style={{ 
        color: ODLTheme.colors.text.primary,
        fontSize: ODLTheme.typography.fontSize.xl,
        marginBottom: ODLTheme.spacing[4]
      }}>
        ODL Theme Button Examples
      </h3>
      <p style={{ 
        color: ODLTheme.colors.text.secondary,
        marginBottom: ODLTheme.spacing[6]
      }}>
        These buttons demonstrate proper ODL theme usage with consistent colors and spacing.
      </p>
      
      <div style={{ display: 'flex', gap: ODLTheme.spacing[3], flexWrap: 'wrap' }}>
        <Button 
          variant="primary" 
          style={{ backgroundColor: ODLTheme.colors.primary }}
        >
          Primary ({ODLTheme.colors.primary})
        </Button>
        <Button 
          variant="secondary"
          style={{ borderColor: ODLTheme.colors.border }}
        >
          Secondary
        </Button>
        <Button 
          variant="destructive"
          style={{ backgroundColor: ODLTheme.colors.error }}
        >
          Error ({ODLTheme.colors.error})
        </Button>
      </div>
      
      <div style={{ 
        marginTop: ODLTheme.spacing[6],
        padding: ODLTheme.spacing[4],
        backgroundColor: ODLTheme.colors.primaryLight,
        borderRadius: ODLTheme.borders.radius.md
      }}>
        <p style={{ 
          color: ODLTheme.colors.primaryDark,
          fontSize: ODLTheme.typography.fontSize.sm
        }}>
          All components use ODL theme constants for consistent styling
        </p>
      </div>
    </div>
  ),
};