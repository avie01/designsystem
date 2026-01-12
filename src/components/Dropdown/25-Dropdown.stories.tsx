import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Dropdown from './Dropdown';
import type { DropdownOption } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Design System/Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'Ready for dev'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'Select Option',
    placeholder: 'Choose an option',
    searchable: false,
    multiple: false,
    required: false,
    disabled: false,
    error: false,
  },
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
      control: false,
      table: {
        disable: true,
      },
      description: 'Change event handler',
    },
    className: {
      control: false,
      table: {
        disable: true,
      },
      description: 'Additional CSS classes',
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
  { value: 'us', label: '🇺🇸 United States' },
  { value: 'uk', label: '🇬🇧 United Kingdom' },
  { value: 'ca', label: '🇨🇦 Canada' },
  { value: 'au', label: '🇦🇺 Australia' },
];

const countryOptionsWithIcons: DropdownOption[] = [
  { value: 'us', label: 'United States', icon: '🇺🇸' },
  { value: 'uk', label: 'United Kingdom', icon: '🇬🇧' },
  { value: 'ca', label: 'Canada', icon: '🇨🇦' },
  { value: 'au', label: 'Australia', icon: '🇦🇺' },
  { value: 'fr', label: 'France', icon: '🇫🇷' },
  { value: 'de', label: 'Germany', icon: '🇩🇪' },
  { value: 'jp', label: 'Japan', icon: '🇯🇵' },
  { value: 'br', label: 'Brazil', icon: '🇧🇷' },
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
  name: '02 With Value',
  args: {
    label: 'Country',
    options: countryOptions,
    value: 'us',
  },
};

// With emoji flag icons
export const WithEmojiFlags: Story = {
  name: '03 With Emoji Flags',
  args: {
    label: 'Select Country',
    options: countryOptionsWithIcons,
    value: 'us',
    placeholder: 'Choose a country...',
  },
};

// Searchable
export const Searchable: Story = {
  name: '04 Searchable',
  args: {
    label: 'Search Countries',
    options: countryOptions,
    searchable: true,
    placeholder: 'Type to search...',
  },
};

// Required
export const Required: Story = {
  name: '05 Required',
  args: {
    label: 'Required Field',
    options: basicOptions,
    required: true,
    placeholder: 'This field is required',
  },
};

// Error state
export const ErrorState: Story = {
  name: '06 Error State',
  args: {
    label: 'Select Option',
    options: basicOptions,
    error: true,
    errorMessage: 'Please select a valid option',
  },
};

// Disabled
export const Disabled: Story = {
  name: '07 Disabled',
  args: {
    label: 'Disabled Dropdown',
    options: basicOptions,
    value: 'option1',
    disabled: true,
  },
};