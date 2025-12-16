import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import Icon from '../Icon/Icon';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    error: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your text here...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email...',
    type: 'email',
  },
};

export const WithIcon: Story = {
  args: {
    placeholder: 'Search for something...',
    icon: <Icon name="search" className="w-4 h-4" />,
  },
};

export const WithIconRight: Story = {
  args: {
    placeholder: 'Enter password...',
    type: 'password',
    iconRight: <Icon name="view" className="w-4 h-4" />,
  },
};

export const WithBothIcons: Story = {
  args: {
    placeholder: 'Enter amount...',
    type: 'number',
    icon: <Icon name="dollar" className="w-4 h-4" />,
    iconRight: <Icon name="calculator" className="w-4 h-4" />,
  },
};

export const Required: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'This field is disabled',
    value: 'Disabled value',
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    value: 'invalid-email',
    error: true,
    errorMessage: 'Please enter a valid email address',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    helperText: 'Password must be at least 8 characters long',
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Input States</h3>
        
        <Input
          label="Default Input"
          placeholder="Default state"
        />
        
        <Input
          label="With Icon"
          placeholder="Search with icon"
          icon={<Icon name="search" className="w-4 h-4" />}
        />
        
        <Input
          label="Required Field"
          placeholder="This field is required"
          required={true}
        />
        
        <Input
          label="Disabled Field"
          placeholder="This field is disabled"
          value="Disabled value"
          disabled={true}
        />
        
        <Input
          label="Error State"
          placeholder="This field has an error"
          value="invalid value"
          error={true}
          errorMessage="This field contains an error"
        />
        
        <Input
          label="With Helper Text"
          placeholder="This field has helper text"
          helperText="This is helpful information about the field"
        />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Input Types</h3>
        
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
        />
        
        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          iconRight={<Icon name="view" className="w-4 h-4" />}
        />
        
        <Input
          label="Number"
          type="number"
          placeholder="Enter a number"
          icon={<Icon name="calculator" className="w-4 h-4" />}
        />
        
        <Input
          label="Phone"
          type="tel"
          placeholder="Enter phone number"
          icon={<Icon name="phone" className="w-4 h-4" />}
        />
      </div>
    </div>
  ),
}; 