import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Dropdown from './Dropdown';
import type { DropdownOption } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Dropdown label text',
      table: {
        type: { summary: 'string' },
      },
    },
    options: {
      control: 'object',
      description: 'Array of dropdown options',
      table: {
        type: { summary: 'DropdownOption[]' },
      },
    },
    value: {
      control: 'text',
      description: 'Selected value',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no selection',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Select an option' },
      },
    },
    searchable: {
      control: 'boolean',
      description: 'Whether the dropdown is searchable',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    multiple: {
      control: 'boolean',
      description: 'Whether multiple selections are allowed',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Whether the dropdown is required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the dropdown is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Whether the dropdown has an error',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      description: 'Change event handler',
      table: {
        type: { summary: '(value: string) => void' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample options
const basicOptions: DropdownOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
  { value: 'option5', label: 'Option 5' },
];

const countryOptions: DropdownOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
];

// Basic dropdown
export const Default: Story = {
  args: {
    label: 'Select Option',
    options: basicOptions,
    placeholder: 'Choose an option',
  },
};

// With selected value
export const WithValue: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    value: 'us',
  },
};

// Searchable
export const Searchable: Story = {
  args: {
    label: 'Search Countries',
    options: countryOptions,
    searchable: true,
    placeholder: 'Type to search...',
  },
};

// Required
export const Required: Story = {
  args: {
    label: 'Required Field',
    options: basicOptions,
    required: true,
    placeholder: 'This field is required',
  },
};

// Error state
export const ErrorState: Story = {
  args: {
    label: 'Select Option',
    options: basicOptions,
    error: true,
    errorMessage: 'Please select a valid option',
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Disabled Dropdown',
    options: basicOptions,
    value: 'option1',
    disabled: true,
  },
};