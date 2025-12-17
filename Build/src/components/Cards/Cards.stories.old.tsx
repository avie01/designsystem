import type { Meta, StoryObj } from '@storybook/react';
import Cards from './Cards';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import React from 'react';

const meta: Meta<typeof Cards> = {
  title: 'Components/Cards',
  component: Cards,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Versatile card components for displaying content in various layouts and styles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated', 'flat'],
      description: 'The visual style variant of the card',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding size for the card content',
    },
    hoverable: {
      control: 'boolean',
      description: 'Whether the card has hover effects',
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the card is clickable',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic card
export const Default: Story = {
  args: {
    children: (
      <div>
        <h3>Card Title</h3>
        <p>This is a basic card with some content. Cards are useful for grouping related information.</p>
      </div>
    ),
  },
};

// Card with header and footer
export const WithHeaderFooter: Story = {
  render: () => (
    <Cards>
      <div style={{ borderBottom: '1px solid #e5e7eb', padding: '1rem' }}>
        <h3 style={{ margin: 0 }}>Card Header</h3>
      </div>
      <div style={{ padding: '1rem' }}>
        <p>Card content goes here. This card has a header and footer section.</p>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
          <div>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 8px 0' }}>Total Applications</p>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 8px 0' }}>1,234</h2>
            <p style={{ color: '#10b981', fontSize: '14px', margin: 0 }}>
              <span>↑ 12%</span> vs last month
            </p>
          </div>
          <Icon name="document" size={24} />
        </div>
      </div>
    </Cards>
  ),
};

// Multiple cards grid
export const CardGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
      {[1, 2, 3, 4, 5, 6].map(i => (
        <Cards key={i} hoverable clickable>
          <div style={{ padding: '1rem' }}>
            <h4>Card {i}</h4>
            <p>Content for card number {i}</p>
          </div>
        </Cards>
      ))}
    </div>
  ),
};

// Feature card
export const FeatureCard: Story = {
  render: () => (
    <Cards>
      <div style={{ padding: '2rem' }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          background: '#eff6ff',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem'
        }}>
          <Icon name="rocket" size={24} />
        </div>
        <h3 style={{ marginBottom: '0.5rem' }}>Quick Start</h3>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
          Get up and running quickly with our comprehensive documentation and examples.
        </p>
        <Button variant="text">Learn more →</Button>
      </div>
    </Cards>
  ),
};

// Profile card
export const ProfileCard: Story = {
  render: () => (
    <Cards>
      <div style={{ padding: '1.5rem', textAlign: 'center' }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: '#e5e7eb',
          margin: '0 auto 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon name="user" size={32} />
        </div>
        <h3 style={{ marginBottom: '0.25rem' }}>John Doe</h3>
        <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Senior Developer</p>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <Button size="sm" variant="secondary">Message</Button>
          <Button size="sm">View Profile</Button>
        </div>
      </div>
    </Cards>
  ),
};

// List card
export const ListCard: Story = {
  render: () => (
    <Cards>
      <div style={{ padding: '1rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Recent Activity</h3>
        {[1, 2, 3, 4].map(i => (
          <div 
            key={i}
            style={{ 
              padding: '0.75rem 0',
              borderBottom: i < 4 ? '1px solid #e5e7eb' : 'none'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Activity item {i}</span>
              <span style={{ color: '#6b7280', fontSize: '14px' }}>2 hours ago</span>
            </div>
          </div>
        ))}
      </div>
    </Cards>
  ),
};

// Image card
export const ImageCard: Story = {
  render: () => (
    <Cards style={{ overflow: 'hidden' }}>
      <div style={{
        height: '200px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <span style={{ color: 'white', fontSize: '18px' }}>Image Placeholder</span>
      </div>
      <div style={{ padding: '1rem' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Beautiful Landscape</h3>
        <p style={{ color: '#6b7280' }}>
          A stunning view of mountains and valleys captured during golden hour.
        </p>
      </div>
    </Cards>
  ),
};

// Selectable cards
export const SelectableCards: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<number | null>(null);
    
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {[1, 2, 3].map(i => (
          <Cards
            key={i}
            clickable
            onClick={() => setSelected(i)}
            style={{
              border: selected === i ? '2px solid #3b82f6' : '1px solid #e5e7eb',
              cursor: 'pointer'
            }}
          >
            <div style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <h4>Option {i}</h4>
                  <p style={{ color: '#6b7280' }}>Description for option {i}</p>
                </div>
                {selected === i && (
                  <Icon name="checkmark-filled" size={20} style={{ color: '#3b82f6' }} />
                )}
              </div>
            </div>
          </Cards>
        ))}
      </div>
    );
  },
};

// Notification card
export const NotificationCard: Story = {
  render: () => (
    <Cards>
      <div style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          background: '#fef3c7',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          <Icon name="warning" size={20} style={{ color: '#f59e0b' }} />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ marginBottom: '0.25rem' }}>System Maintenance</h4>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '0.5rem' }}>
            Scheduled maintenance will occur on Saturday from 2-4 AM.
          </p>
          <Button size="sm" variant="text">Dismiss</Button>
        </div>
      </div>
    </Cards>
  ),
};