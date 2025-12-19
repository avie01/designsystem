import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import RadioButton, { RadioButtonGroup } from './RadioButton';

const meta: Meta<typeof RadioButton> = {
  title: 'Design System/Components/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A radio button component for single selection from multiple options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Radio Button',
    name: 'example',
    value: 'option1',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked Radio Button',
    checked: true,
    name: 'example',
    value: 'option1',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Radio Button',
    disabled: true,
    name: 'example',
    value: 'option1',
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked Radio Button',
    checked: true,
    disabled: true,
    name: 'example',
    value: 'option1',
  },
};

export const Error: Story = {
  args: {
    label: 'Error Radio Button',
    error: true,
    name: 'example',
    value: 'option1',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <RadioButton label="Small Radio Button" size="sm" name="size-example" value="small" />
      <RadioButton label="Medium Radio Button" size="md" name="size-example" value="medium" />
      <RadioButton label="Large Radio Button" size="lg" name="size-example" value="large" />
    </div>
  ),
};

export const WithoutLabel: Story = {
  args: {
    name: 'example',
    value: 'option1',
  },
};

export const InteractiveGroup: Story = {
  render: function Component() {
    const [value, setValue] = React.useState<string>('option1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <RadioButtonGroup
          name="interactive-group"
          options={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
          ]}
          value={value}
          onChange={setValue}
          label="Choose an option"
        />
        <div>Selected value: {value}</div>
      </div>
    );
  },
};

export const GroupWithError: Story = {
  render: function Component() {
    const [value, setValue] = React.useState<string>('');

    return (
      <RadioButtonGroup
        name="error-group"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ]}
        value={value}
        onChange={setValue}
        label="Choose an option"
        error={true}
        errorMessage="Please select an option"
      />
    );
  },
};

export const HorizontalGroup: Story = {
  render: function Component() {
    const [value, setValue] = React.useState<string>('option1');

    return (
      <RadioButtonGroup
        name="horizontal-group"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ]}
        value={value}
        onChange={setValue}
        label="Choose an option"
        orientation="horizontal"
      />
    );
  },
};

export const GroupWithDisabledOption: Story = {
  render: function Component() {
    const [value, setValue] = React.useState<string>('option1');

    return (
      <RadioButtonGroup
        name="disabled-option-group"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2 (disabled)', disabled: true },
          { value: 'option3', label: 'Option 3' },
        ]}
        value={value}
        onChange={setValue}
        label="Choose an option"
      />
    );
  },
};

export const DisabledGroup: Story = {
  render: function Component() {
    const [value] = React.useState<string>('option2');

    return (
      <RadioButtonGroup
        name="disabled-group"
        options={[
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' },
        ]}
        value={value}
        onChange={() => {}}
        label="Choose an option"
        disabled={true}
      />
    );
  },
};

export const DifferentSizeGroups: Story = {
  render: function Component() {
    const [value1, setValue1] = React.useState<string>('option1');
    const [value2, setValue2] = React.useState<string>('option1');
    const [value3, setValue3] = React.useState<string>('option1');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <RadioButtonGroup
          name="small-group"
          options={[
            { value: 'option1', label: 'Small Option 1' },
            { value: 'option2', label: 'Small Option 2' },
            { value: 'option3', label: 'Small Option 3' },
          ]}
          value={value1}
          onChange={setValue1}
          label="Small Radio Buttons"
          size="sm"
        />
        <RadioButtonGroup
          name="medium-group"
          options={[
            { value: 'option1', label: 'Medium Option 1' },
            { value: 'option2', label: 'Medium Option 2' },
            { value: 'option3', label: 'Medium Option 3' },
          ]}
          value={value2}
          onChange={setValue2}
          label="Medium Radio Buttons"
          size="md"
        />
        <RadioButtonGroup
          name="large-group"
          options={[
            { value: 'option1', label: 'Large Option 1' },
            { value: 'option2', label: 'Large Option 2' },
            { value: 'option3', label: 'Large Option 3' },
          ]}
          value={value3}
          onChange={setValue3}
          label="Large Radio Buttons"
          size="lg"
        />
      </div>
    );
  },
};