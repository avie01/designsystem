import type { Meta, StoryObj } from '@storybook/react';
import Cards from './Cards';

const meta: Meta<typeof Cards> = {
  title: 'Layout/Cards',
  component: Cards,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A horizontal card component with checkbox, folder icon, text content, tag, and action icons. Perfect for list items and document/file displays.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    selected: {
      control: 'boolean',
      description: 'Whether the card is selected (checkbox state)',
    },
    title: {
      control: 'text',
      description: 'Primary text content',
    },
    subtitle: {
      control: 'text',
      description: 'Secondary text content',
    },
    tag: {
      control: 'text',
      description: 'Tag text to display',
    },
    showInfoIcon: {
      control: 'boolean',
      description: 'Whether to show the information icon',
    },
    showMenuIcon: {
      control: 'boolean',
      description: 'Whether to show the ellipsis menu icon',
    },
    onSelect: {
      action: 'selected',
      description: 'Callback when checkbox is clicked',
    },
    onInfoClick: {
      action: 'info clicked',
      description: 'Callback when info icon is clicked',
    },
    onMenuClick: {
      action: 'menu clicked',
      description: 'Callback when menu icon is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selected: false,
    title: "Title - h4 - Primary",
    subtitle: "Body - body2 - Secondary",
    tag: "fA7985",
    showInfoIcon: true,
    showMenuIcon: true,
  },
};

export const Selected: Story = {
  args: {
    selected: true,
    title: "Selected Document",
    subtitle: "This card is currently selected",
    tag: "fA7985",
    showInfoIcon: true,
    showMenuIcon: true,
  },
};

export const WithoutTag: Story = {
  args: {
    selected: false,
    title: "Document without tag",
    subtitle: "This card doesn't have a tag",
    showInfoIcon: true,
    showMenuIcon: true,
  },
};

export const WithoutIcons: Story = {
  args: {
    selected: false,
    title: "Document without action icons",
    subtitle: "This card has no info or menu icons",
    tag: "fA7985",
    showInfoIcon: false,
    showMenuIcon: false,
  },
};

export const LongTitle: Story = {
  args: {
    selected: false,
    title: "This is a very long document title that might wrap to multiple lines",
    subtitle: "Secondary text for the long title document",
    tag: "fA7985",
    showInfoIcon: true,
    showMenuIcon: true,
  },
};

export const CustomTag: Story = {
  args: {
    selected: false,
    title: "Custom tagged document",
    subtitle: "This document has a custom tag",
    tag: "CUSTOM",
    showInfoIcon: true,
    showMenuIcon: true,
  },
}; 