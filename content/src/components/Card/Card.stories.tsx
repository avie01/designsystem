import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';
import { ODLTheme } from '../../styles/ODLTheme';

const meta: Meta<typeof Card> = {
  title: 'Components/Layout/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    bordered: {
      control: 'boolean',
    },
    hoverable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600 }}>Card Title</h3>
        <p style={{ margin: 0, color: ODLTheme.colors.text.secondary, fontSize: '14px' }}>
          This is a simple card component for grouping related content.
        </p>
      </div>
    ),
    padding: 'lg',
    shadow: 'md',
    bordered: true,
  },
};

export const Hoverable: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600 }}>Hoverable Card</h3>
        <p style={{ margin: 0, color: ODLTheme.colors.text.secondary, fontSize: '14px' }}>
          Hover over this card to see the effect.
        </p>
      </div>
    ),
    padding: 'lg',
    shadow: 'sm',
    bordered: true,
    hoverable: true,
  },
};

export const Clickable: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600 }}>Clickable Card</h3>
        <p style={{ margin: 0, color: ODLTheme.colors.text.secondary, fontSize: '14px' }}>
          Click this card to trigger an action.
        </p>
      </div>
    ),
    padding: 'lg',
    shadow: 'md',
    bordered: true,
    hoverable: true,
    onClick: () => alert('Card clicked!'),
  },
};

export const NoBorder: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600 }}>No Border</h3>
        <p style={{ margin: 0, color: ODLTheme.colors.text.secondary, fontSize: '14px' }}>
          Card without a border, only shadow.
        </p>
      </div>
    ),
    padding: 'lg',
    shadow: 'lg',
    bordered: false,
  },
};

export const SmallPadding: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 600 }}>Compact Card</h3>
        <p style={{ margin: 0, color: ODLTheme.colors.text.secondary, fontSize: '13px' }}>
          Smaller padding for compact layouts.
        </p>
      </div>
    ),
    padding: 'sm',
    shadow: 'sm',
    bordered: true,
  },
};

export const CardGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      {['Project A', 'Project B', 'Project C'].map((title) => (
        <Card key={title} padding="lg" shadow="sm" bordered hoverable>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600 }}>{title}</h3>
          <p style={{ margin: 0, color: ODLTheme.colors.text.secondary, fontSize: '14px' }}>
            Card description goes here.
          </p>
        </Card>
      ))}
    </div>
  ),
};
