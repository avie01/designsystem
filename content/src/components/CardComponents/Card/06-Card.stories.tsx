import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';
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
          This is a simple card component for grouping related content. Hover to see animations!
        </p>
      </div>
    ),
    padding: 'lg',
    shadow: 'md',
    bordered: true,
    hoverable: true,
  },
};

export const Hoverable: Story = {
  name: '02 Hoverable',
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
    shadow: 'md',
    bordered: true,
    hoverable: true,
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
          Card without a border, only shadow. Hover to see lift effect!
        </p>
      </div>
    ),
    padding: 'lg',
    shadow: 'lg',
    bordered: false,
    hoverable: true,
  },
};

export const SmallPadding: Story = {
  name: '05 Small Padding',
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 600 }}>Compact Card</h3>
        <p style={{ margin: 0, color: ODLTheme.colors.text.secondary, fontSize: '13px' }}>
          Smaller padding for compact layouts. Hover for animation!
        </p>
      </div>
    ),
    padding: 'sm',
    shadow: 'sm',
    bordered: true,
    hoverable: true,
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
          shadow="sm"
          bordered
          hoverable
          onClick={() => alert(`Clicked: ${title}`)}
          ariaLabel={`${title} card - click to view details`}
        >
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600 }}>{title}</h3>
          <p style={{ margin: 0, color: ODLTheme.colors.text.secondary, fontSize: '14px' }}>
            Card description goes here. Click or hover to see animations!
          </p>
        </Card>
      ))}
    </div>
  ),
};
