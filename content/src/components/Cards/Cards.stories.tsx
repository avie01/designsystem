import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Cards from './Cards';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';

const meta: Meta<typeof Cards> = {
  title: 'Components/Cards',
  component: Cards,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Card content (use render function for complex content)',
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the card is clickable',
    },
    hoverable: {
      control: 'boolean',
      description: 'Whether the card shows hover effects',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for clickable cards',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    style: {
      control: 'object',
      description: 'Additional inline styles',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic card
export const Default: Story = {
  render: (args) => (
    <Cards {...args}>
      <div style={{ padding: '1.5rem' }}>
        <h3>Card Title</h3>
        <p>This is a basic card with some content.</p>
      </div>
    </Cards>
  ),
};

// Card with header and footer
export const WithHeaderFooter: Story = {
  render: () => (
    <Cards>
      <div style={{ borderBottom: '1px solid #e5e7eb', padding: '1rem' }}>
        <h3 style={{ margin: 0 }}>Card Header</h3>
      </div>
      <div style={{ padding: '1rem' }}>
        <p>Card content goes here.</p>
      </div>
      <div style={{ borderTop: '1px solid #e5e7eb', padding: '1rem' }}>
        <Button size="sm">Action</Button>
      </div>
    </Cards>
  ),
};

// Status card
export const StatusCard: Story = {
  render: () => (
    <Cards>
      <div style={{ padding: '1.5rem' }}>
        <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 8px 0' }}>Total Applications</p>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 8px 0' }}>1,234</h2>
        <p style={{ color: '#10b981', fontSize: '14px', margin: 0 }}>
          ↑ 12% vs last month
        </p>
      </div>
    </Cards>
  ),
};

// Clickable card
export const Clickable: Story = {
  args: {
    clickable: true,
    hoverable: true,
    onClick: () => alert('Card clicked!'),
  },
  render: (args) => (
    <Cards {...args}>
      <div style={{ padding: '1.5rem' }}>
        <h3>Clickable Card</h3>
        <p>Click this card to trigger an action.</p>
      </div>
    </Cards>
  ),
};