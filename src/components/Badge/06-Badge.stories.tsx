import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Badge from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Design System/Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badge is a visual indicator for a value or status descriptor with fixed dimensions (25px × 21px). It uses the ODL Dark Chip colors as background variants with white text.',
      },
    },
  },
  tags: ['autodocs', 'Ready for dev'],
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'The value to display in the badge',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '12' },
      },
    },
    variant: {
      control: 'select',
      options: [
        'brown-dark',
        'blue-dark',
        'pink-dark',
        'red-dark',
        'orange-dark',
        'yellow-dark',
        'olive-dark',
        'green-dark',
        'mint-dark',
        'purple-dark',
      ],
      description: 'Color variant of the badge using ODL Dark Chip colors',
      table: {
        type: { summary: 'BadgeVariant' },
        defaultValue: { summary: 'blue-dark' },
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

// Basic usage
export const Default: Story = {
  args: {
    value: 12,
    variant: 'blue-dark',
  },
};

// Different values
export const DifferentValues: Story = {
  name: '02 Different Values',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge value={1} variant="blue-dark" />
      <Badge value={9} variant="red-dark" />
      <Badge value={12} variant="green-dark" />
      <Badge value={99} variant="orange-dark" />
      <Badge value={999} variant="purple-dark" />
      <Badge value="A" variant="pink-dark" />
      <Badge value="B+" variant="mint-dark" />
      <Badge value="★" variant="yellow-dark" />
    </div>
  ),
};

// All color variants
export const AllVariants: Story = {
  name: '03 All Color Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          All Badge Variants (Dark Chip Colors)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Badge value={12} variant="brown-dark" />
            <span style={{ fontSize: '14px', color: '#666' }}>brown-dark</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Badge value={12} variant="blue-dark" />
            <span style={{ fontSize: '14px', color: '#666' }}>blue-dark</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Badge value={12} variant="pink-dark" />
            <span style={{ fontSize: '14px', color: '#666' }}>pink-dark</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Badge value={12} variant="red-dark" />
            <span style={{ fontSize: '14px', color: '#666' }}>red-dark</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Badge value={12} variant="orange-dark" />
            <span style={{ fontSize: '14px', color: '#666' }}>orange-dark</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Badge value={12} variant="yellow-dark" />
            <span style={{ fontSize: '14px', color: '#666' }}>yellow-dark</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Badge value={12} variant="olive-dark" />
            <span style={{ fontSize: '14px', color: '#666' }}>olive-dark</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Badge value={12} variant="green-dark" />
            <span style={{ fontSize: '14px', color: '#666' }}>green-dark</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Badge value={12} variant="mint-dark" />
            <span style={{ fontSize: '14px', color: '#666' }}>mint-dark</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Badge value={12} variant="purple-dark" />
            <span style={{ fontSize: '14px', color: '#666' }}>purple-dark</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Usage examples
export const UsageExamples: Story = {
  name: '04 Usage Examples',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          Common Use Cases
        </h3>
        
        {/* Notification counts */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '14px', marginBottom: '12px', color: '#666' }}>Notification Counts</h4>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Messages</span>
              <Badge value={3} variant="blue-dark" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Alerts</span>
              <Badge value={7} variant="red-dark" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Updates</span>
              <Badge value={1} variant="green-dark" />
            </div>
          </div>
        </div>

        {/* Status indicators */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '14px', marginBottom: '12px', color: '#666' }}>Status Indicators</h4>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Active Tasks</span>
              <Badge value={5} variant="orange-dark" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Pending Reviews</span>
              <Badge value={2} variant="yellow-dark" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Completed</span>
              <Badge value={12} variant="green-dark" />
            </div>
          </div>
        </div>

        {/* Priority levels */}
        <div>
          <h4 style={{ fontSize: '14px', marginBottom: '12px', color: '#666' }}>Priority Levels</h4>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>P1 - Critical</span>
              <Badge value="P1" variant="red-dark" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>P2 - High</span>
              <Badge value="P2" variant="orange-dark" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>P3 - Medium</span>
              <Badge value="P3" variant="blue-dark" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>P4 - Low</span>
              <Badge value="P4" variant="green-dark" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Different content types
export const ContentTypes: Story = {
  name: '05 Content Types',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          Different Content Types
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          {/* Numbers */}
          <div>
            <h4 style={{ fontSize: '14px', marginBottom: '12px', color: '#666' }}>Numbers</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Badge value={1} variant="blue-dark" />
              <Badge value={22} variant="green-dark" />
              <Badge value={333} variant="purple-dark" />
              <Badge value={9999} variant="red-dark" />
            </div>
          </div>

          {/* Letters */}
          <div>
            <h4 style={{ fontSize: '14px', marginBottom: '12px', color: '#666' }}>Letters</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Badge value="A" variant="mint-dark" />
              <Badge value="B" variant="olive-dark" />
              <Badge value="C" variant="pink-dark" />
              <Badge value="D" variant="yellow-dark" />
            </div>
          </div>

          {/* Symbols */}
          <div>
            <h4 style={{ fontSize: '14px', marginBottom: '12px', color: '#666' }}>Symbols</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Badge value="★" variant="yellow-dark" />
              <Badge value="♥" variant="red-dark" />
              <Badge value="✓" variant="green-dark" />
              <Badge value="!" variant="orange-dark" />
            </div>
          </div>

          {/* Mixed */}
          <div>
            <h4 style={{ fontSize: '14px', marginBottom: '12px', color: '#666' }}>Mixed</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Badge value="1A" variant="blue-dark" />
              <Badge value="B+" variant="purple-dark" />
              <Badge value="#3" variant="brown-dark" />
              <Badge value="v2" variant="mint-dark" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Integration example
export const IntegrationExample: Story = {
  name: '06 Integration Example',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          Integration with Other Components
        </h3>
        
        {/* Mock navigation items with badges */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '300px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '12px 16px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            <span>Dashboard</span>
            <Badge value={3} variant="blue-dark" />
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '12px 16px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            <span>Messages</span>
            <Badge value={12} variant="red-dark" />
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '12px 16px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            <span>Tasks</span>
            <Badge value={7} variant="orange-dark" />
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            padding: '12px 16px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            <span>Reports</span>
            <Badge value={1} variant="green-dark" />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive playground
export const Playground: Story = {
  name: '07 Playground',
  args: {
    value: 12,
    variant: 'blue-dark',
  },
};