import type { Meta, StoryObj } from '@storybook/react';
import Input from './Input';
import React from 'react';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component supporting text, password, email, number, date, search, and textarea types with validation and various states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'date', 'search', 'textarea'],
      description: 'The type of input field',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'The size of the input field',
    },
    label: {
      control: 'text',
      description: 'Label text for the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display when error is true',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    error: {
      control: 'boolean',
      description: 'Whether the input has an error state',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the input is read-only',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic text input
export const Default: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
    type: 'text',
    size: 'md',
  },
};

// With value
export const WithValue: Story = {
  args: {
    label: 'Email',
    value: 'user@example.com',
    type: 'email',
    size: 'md',
  },
};

// Required field
export const Required: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
    type: 'text',
    size: 'md',
  },
};

// With helper text
export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters',
    size: 'md',
  },
};

// Error state
export const ErrorState: Story = {
  args: {
    label: 'Email',
    value: 'invalid-email',
    type: 'email',
    error: true,
    errorMessage: 'Please enter a valid email address',
    size: 'md',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'Cannot edit this',
    disabled: true,
    type: 'text',
    size: 'md',
  },
};

// Read-only state
export const ReadOnly: Story = {
  args: {
    label: 'Read-only Field',
    value: 'Read-only value',
    readOnly: true,
    type: 'text',
    size: 'md',
  },
};

// Search input
export const SearchInput: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    size: 'md',
  },
};

// Number input
export const NumberInput: Story = {
  args: {
    label: 'Age',
    type: 'number',
    placeholder: 'Enter your age',
    min: 0,
    max: 120,
    size: 'md',
  },
};

// Date input
export const DateInput: Story = {
  args: {
    label: 'Date of Birth',
    type: 'date',
    size: 'md',
  },
};

// Textarea
export const TextareaInput: Story = {
  args: {
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter a description...',
    rows: 4,
    resize: 'vertical',
    size: 'md',
  },
};

// Textarea with character count
export const TextareaWithCount: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    const maxLength = 500;
    
    return (
      <Input
        type="textarea"
        label="Bio"
        value={value}
        onChange={setValue}
        placeholder="Tell us about yourself..."
        rows={5}
        resize="vertical"
        helperText={`${value.length}/${maxLength} characters`}
        error={value.length > maxLength}
        errorMessage={value.length > maxLength ? 'Bio exceeds maximum length' : undefined}
      />
    );
  },
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Input size="xs" placeholder="Extra small input" label="XS Size" />
      <Input size="sm" placeholder="Small input" label="Small Size" />
      <Input size="md" placeholder="Medium input" label="Medium Size" />
      <Input size="lg" placeholder="Large input" label="Large Size" />
    </div>
  ),
};

// Form example
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    });

    const handleChange = (field: string) => (value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Input
            label="First Name"
            value={formData.firstName}
            onChange={handleChange('firstName')}
            required
          />
          <Input
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange('lastName')}
            required
          />
        </div>
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          required
          helperText="We'll never share your email"
        />
        <Input
          label="Phone"
          type="text"
          value={formData.phone}
          onChange={handleChange('phone')}
          placeholder="(555) 123-4567"
        />
        <Input
          label="Message"
          type="textarea"
          value={formData.message}
          onChange={handleChange('message')}
          rows={4}
          placeholder="Your message here..."
        />
      </div>
    );
  },
};

// With prefix and suffix (if supported)
export const WithPrefixSuffix: Story = {
  args: {
    label: 'Price',
    type: 'number',
    placeholder: '0.00',
    prefix: '$',
    suffix: 'USD',
    size: 'md',
  },
};