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

export const AISuggestion: Story = {
  name: '07 AI Suggestion',
  args: {
    children: (
      <div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src="/src/assets/ai.svg" alt="AI" width="20" height="20" />
              <h3 style={{ margin: '0', fontSize: '16px', fontWeight: 600 }}>Search assist</h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <IconButton 
                icon="settings"
                variant="ghost"
                size="small"
                aria-label="Settings"
              />
              <IconButton 
                icon="edit"
                variant="ghost"
                size="small"
                aria-label="Edit"
              />
              <IconButton 
                icon="close"
                variant="ghost"
                size="small"
                aria-label="Close"
              />
            </div>
          </div>
          <p style={{ margin: '0 0 0 0', color: ODLTheme.colors.text.secondary, fontSize: '14px', fontStyle: 'italic' }}>
            We've curated these suggestions based on your preferences and browsing history.
          </p>
        </div>
        <style>{`
          @keyframes electricFlow {
            0% { border-image-source: linear-gradient(45deg, #067BD6, #13ABA7 50%, #609F1E); }
            25% { border-image-source: linear-gradient(135deg, #067BD6, #13ABA7 50%, #609F1E); }
            50% { border-image-source: linear-gradient(225deg, #067BD6, #13ABA7 50%, #609F1E); }
            75% { border-image-source: linear-gradient(315deg, #067BD6, #13ABA7 50%, #609F1E); }
            100% { border-image-source: linear-gradient(45deg, #067BD6, #13ABA7 50%, #609F1E); }
          }
        `}</style>
      </div>
    ),
    padding: 'none',
    shadow: 'none',
    bordered: false,
    hoverable: false,
    className: 'electric-border',
    style: {
      backgroundColor: '#F9FDF9',
      padding: '16px',
      position: 'relative',
      border: '2px solid',
      borderImage: 'linear-gradient(45deg, #067BD6, #13ABA7 50%, #609F1E) 1',
      borderRadius: '4px',
      animation: 'electricFlow 2.5s linear infinite'
    },
  },
};
