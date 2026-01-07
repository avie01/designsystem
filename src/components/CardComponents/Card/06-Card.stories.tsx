import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';
import IconButton from '../../IconButton/IconButton';
import { ODLTheme } from '../../../styles/ODLTheme';

const meta: Meta<typeof Card> = {
  title: 'Design System/Components/Info Panel',
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
  name: '01 Default',
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
    shadow: 'none',
    bordered: true,
    hoverable: false,
  },
};

export const Hoverable: Story = {
  name: '02 Hoverable',
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600 }}>Static Card</h3>
        <p style={{ margin: 0, color: ODLTheme.colors.text.secondary, fontSize: '14px' }}>
          This card has no hover effects or shadow.
        </p>
      </div>
    ),
    padding: 'lg',
    shadow: 'none',
    bordered: true,
    hoverable: false,
  },
};

export const Clickable: Story = {
  name: '03 Clickable',
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
    shadow: 'none',
    bordered: true,
    hoverable: false,
    onClick: () => alert('Card clicked!'),
  },
};

export const NoBorder: Story = {
  name: '04 No Border',
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600 }}>No Border</h3>
        <p style={{ margin: 0, color: ODLTheme.colors.text.secondary, fontSize: '14px' }}>
          Card without a border or shadow.
        </p>
      </div>
    ),
    padding: 'lg',
    shadow: 'none',
    bordered: false,
    hoverable: false,
  },
};

export const SmallPadding: Story = {
  name: '05 Small Padding',
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
    shadow: 'none',
    bordered: true,
    hoverable: false,
  },
};

export const CardGrid: Story = {
  name: '06 Card Grid',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      {['Project A', 'Project B', 'Project C'].map((title) => (
        <Card
          key={title}
          padding="lg"
          shadow="none"
          bordered
          hoverable={false}
          onClick={() => alert(`Clicked: ${title}`)}
          ariaLabel={`${title} card - click to view details`}
        >
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600 }}>{title}</h3>
          <p style={{ margin: 0, color: ODLTheme.colors.text.secondary, fontSize: '14px' }}>
            Card description goes here. Click for action!
          </p>
        </Card>
      ))}
    </div>
  ),
};

