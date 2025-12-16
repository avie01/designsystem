import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import Icon from '../Icon/Icon';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'text', 'destructive'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Tertiary: Story = {
  args: {
    children: 'Tertiary Button',
    variant: 'tertiary',
  },
};

export const Text: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'destructive',
  },
};

export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading Button',
    loading: true,
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Button with Icon',
    icon: <Icon name="add" className="w-4 h-4" />,
  },
};

export const WithIconRight: Story = {
  args: {
    children: 'Button with Icon Right',
    iconRight: <Icon name="arrow-right" className="w-4 h-4" />,
  },
};

export const WithBothIcons: Story = {
  args: {
    children: 'Button with Icons',
    icon: <Icon name="add" className="w-4 h-4" />,
    iconRight: <Icon name="arrow-right" className="w-4 h-4" />,
  },
};

export const IconOnly: Story = {
  args: {
    children: '',
    icon: <Icon name="settings" className="w-4 h-4" />,
    size: 'small',
  },
};

export const IconOnlyLarge: Story = {
  args: {
    children: '',
    icon: <Icon name="settings" className="w-6 h-6" />,
    size: 'large',
  },
};

export const CommonIconPatterns: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Common Icon Patterns</h3>
        <div className="flex flex-wrap gap-2">
          <Button icon={<Icon name="add" className="w-4 h-4" />}>
            Add Item
          </Button>
          <Button iconRight={<Icon name="arrow-right" className="w-4 h-4" />}>
            Continue
          </Button>
          <Button 
            icon={<Icon name="download" className="w-4 h-4" />}
            iconRight={<Icon name="arrow-down" className="w-4 h-4" />}
          >
            Download
          </Button>
          <Button 
            icon={<Icon name="save" className="w-4 h-4" />}
            variant="outline"
          >
            Save
          </Button>
          <Button 
            icon={<Icon name="delete" className="w-4 h-4" />}
            variant="tertiary"
          >
            Delete
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Icon Only Buttons</h3>
        <div className="flex flex-wrap gap-2">
          <Button icon={<Icon name="settings" className="w-4 h-4" />} size="small" />
          <Button icon={<Icon name="settings" className="w-4 h-4" />} />
          <Button icon={<Icon name="settings" className="w-5 h-5" />} size="large" />
          <Button icon={<Icon name="add" className="w-4 h-4" />} variant="outline" />
          <Button icon={<Icon name="close" className="w-4 h-4" />} variant="tertiary" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Loading with Icons</h3>
        <div className="flex flex-wrap gap-2">
          <Button 
            icon={<Icon name="save" className="w-4 h-4" />}
            loading
          >
            Saving...
          </Button>
          <Button 
            iconRight={<Icon name="arrow-right" className="w-4 h-4" />}
            loading
          >
            Processing...
          </Button>
        </div>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Primary Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" size="small">Small Primary</Button>
          <Button variant="primary" size="medium">Medium Primary</Button>
          <Button variant="primary" size="large">Large Primary</Button>
          <Button variant="primary" disabled>Disabled Primary</Button>
          <Button variant="primary" loading>Loading Primary</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Secondary Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="small">Small Secondary</Button>
          <Button variant="secondary" size="medium">Medium Secondary</Button>
          <Button variant="secondary" size="large">Large Secondary</Button>
          <Button variant="secondary" disabled>Disabled Secondary</Button>
          <Button variant="secondary" loading>Loading Secondary</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Tertiary Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="tertiary" size="small">Small Tertiary</Button>
          <Button variant="tertiary" size="medium">Medium Tertiary</Button>
          <Button variant="tertiary" size="large">Large Tertiary</Button>
          <Button variant="tertiary" disabled>Disabled Tertiary</Button>
          <Button variant="tertiary" loading>Loading Tertiary</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Text Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="text" size="small">Small Text</Button>
          <Button variant="text" size="medium">Medium Text</Button>
          <Button variant="text" size="large">Large Text</Button>
          <Button variant="text" disabled>Disabled Text</Button>
          <Button variant="text" loading>Loading Text</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Destructive Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="destructive" size="small">Small Destructive</Button>
          <Button variant="destructive" size="medium">Medium Destructive</Button>
          <Button variant="destructive" size="large">Large Destructive</Button>
          <Button variant="destructive" disabled>Disabled Destructive</Button>
          <Button variant="destructive" loading>Loading Destructive</Button>
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [count, setCount] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    
    const handleClick = () => {
      setLoading(true);
      setTimeout(() => {
        setCount(prev => prev + 1);
        setLoading(false);
      }, 1000);
    };
    
    return (
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-lg mb-2">Click count: {count}</p>
          <Button 
            onClick={handleClick} 
            loading={loading}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Click Me!'}
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" onClick={() => alert('Primary clicked!')}>
            Primary Action
          </Button>
          <Button variant="outline" onClick={() => alert('Outline clicked!')}>
            Secondary Action
          </Button>
          <Button variant="tertiary" onClick={() => alert('Tertiary clicked!')}>
            Tertiary Action
          </Button>
        </div>
      </div>
    );
  },
}; 