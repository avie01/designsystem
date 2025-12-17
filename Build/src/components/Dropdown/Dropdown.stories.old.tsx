import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from './Dropdown';
import React from 'react';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable dropdown select component with search, icons, and multiple selection support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the dropdown',
    },
    label: {
      control: 'text',
      description: 'Label text for the dropdown',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dropdown is disabled',
    },
    error: {
      control: 'boolean',
      description: 'Whether the dropdown has an error state',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
    searchable: {
      control: 'boolean',
      description: 'Whether the dropdown is searchable',
    },
    clearable: {
      control: 'boolean',
      description: 'Whether the dropdown value can be cleared',
    },
    multiple: {
      control: 'boolean',
      description: 'Whether multiple options can be selected',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample options data
const basicOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' },
];

const countryOptions = [
  { value: 'us', label: 'United States', icon: '🇺🇸' },
  { value: 'ca', label: 'Canada', icon: '🇨🇦' },
  { value: 'uk', label: 'United Kingdom', icon: '🇬🇧' },
  { value: 'au', label: 'Australia', icon: '🇦🇺' },
  { value: 'nz', label: 'New Zealand', icon: '🇳🇿' },
];

const statusOptions = [
  { value: 'active', label: 'Active', icon: '🟢' },
  { value: 'pending', label: 'Pending', icon: '🟡' },
  { value: 'inactive', label: 'Inactive', icon: '🔴' },
  { value: 'archived', label: 'Archived', icon: '📁' },
];

// Basic dropdown
export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select an option',
    label: 'Choose Option',
    size: 'md',
  },
};

// With selected value
export const WithValue: Story = {
  args: {
    options: basicOptions,
    value: 'option2',
    label: 'Selected Option',
    size: 'md',
  },
};

// Searchable dropdown
export const Searchable: Story = {
  args: {
    options: countryOptions,
    searchable: true,
    placeholder: 'Search and select a country',
    label: 'Country',
    size: 'md',
  },
};

// With icons
export const WithIcons: Story = {
  args: {
    options: statusOptions,
    placeholder: 'Select status',
    label: 'Status',
    size: 'md',
  },
};

// Multiple selection
export const MultiSelect: Story = {
  args: {
    options: basicOptions,
    multiple: true,
    placeholder: 'Select multiple options',
    label: 'Multiple Selection',
    size: 'md',
  },
};

// Clearable
export const Clearable: Story = {
  args: {
    options: basicOptions,
    clearable: true,
    value: 'option1',
    placeholder: 'Select an option',
    label: 'Clearable Dropdown',
    size: 'md',
  },
};

// Error state
export const ErrorState: Story = {
  args: {
    options: basicOptions,
    error: true,
    errorMessage: 'Please select a valid option',
    placeholder: 'Select an option',
    label: 'Required Field',
    size: 'md',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    options: basicOptions,
    disabled: true,
    value: 'option1',
    label: 'Disabled Dropdown',
    size: 'md',
  },
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Dropdown
        options={basicOptions}
        size="sm"
        placeholder="Small dropdown"
        label="Small"
      />
      <Dropdown
        options={basicOptions}
        size="md"
        placeholder="Medium dropdown"
        label="Medium"
      />
      <Dropdown
        options={basicOptions}
        size="lg"
        placeholder="Large dropdown"
        label="Large"
      />
    </div>
  ),
};

// Long list with search
export const LongListWithSearch: Story = {
  args: {
    options: Array.from({ length: 50 }, (_, i) => ({
      value: `option${i + 1}`,
      label: `Option ${i + 1}`,
    })),
    searchable: true,
    placeholder: 'Search from 50 options',
    label: 'Large Dataset',
    size: 'md',
  },
};

// Grouped options
export const GroupedOptions: Story = {
  args: {
    options: [
      { value: 'apple', label: 'Apple', group: 'Fruits' },
      { value: 'banana', label: 'Banana', group: 'Fruits' },
      { value: 'orange', label: 'Orange', group: 'Fruits' },
      { value: 'carrot', label: 'Carrot', group: 'Vegetables' },
      { value: 'broccoli', label: 'Broccoli', group: 'Vegetables' },
      { value: 'spinach', label: 'Spinach', group: 'Vegetables' },
    ],
    placeholder: 'Select food item',
    label: 'Food Categories',
    searchable: true,
    size: 'md',
  },
};

// Form example with controlled component
export const FormExample: Story = {
  render: () => {
    const [country, setCountry] = React.useState('');
    const [status, setStatus] = React.useState('');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
        <Dropdown
          options={countryOptions}
          value={country}
          onChange={setCountry}
          label="Country"
          placeholder="Select your country"
          searchable
          clearable
        />
        <Dropdown
          options={statusOptions}
          value={status}
          onChange={setStatus}
          label="Account Status"
          placeholder="Select status"
        />
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f3f4f6', borderRadius: '4px' }}>
          <p style={{ margin: 0, fontSize: '14px' }}>
            <strong>Selected Values:</strong><br />
            Country: {country || 'None'}<br />
            Status: {status || 'None'}
          </p>
        </div>
      </div>
    );
  },
};