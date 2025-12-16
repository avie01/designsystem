import type { Meta, StoryObj } from '@storybook/react';
import Breadcrumb from './Breadcrumb';
import Icon from '../Icon/Icon';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Navigation breadcrumb component for showing hierarchical page structure.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'text',
      description: 'Character or element used to separate breadcrumb items',
    },
    maxItems: {
      control: 'number',
      description: 'Maximum number of items to display before collapsing',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic breadcrumb
export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Laptops', href: '/products/electronics/laptops' },
    ],
  },
};

// With current page
export const WithCurrentPage: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Documentation', href: '/docs' },
      { label: 'Getting Started', current: true },
    ],
  },
};

// Custom separator
export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Settings', href: '/settings' },
      { label: 'Profile', href: '/settings/profile' },
    ],
    separator: '→',
  },
};

// With icons
export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', icon: <Icon name="home" size={16} /> },
      { label: 'Dashboard', href: '/dashboard', icon: <Icon name="dashboard" size={16} /> },
      { label: 'Analytics', href: '/analytics', icon: <Icon name="analytics" size={16} /> },
    ],
  },
};

// Collapsed items
export const CollapsedItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Category', href: '/category' },
      { label: 'Subcategory', href: '/category/sub' },
      { label: 'Item Type', href: '/category/sub/type' },
      { label: 'Specific Item', href: '/category/sub/type/item' },
      { label: 'Details', current: true },
    ],
    maxItems: 3,
  },
};

// Single item
export const SingleItem: Story = {
  args: {
    items: [
      { label: 'Home', current: true },
    ],
  },
};

// With dropdown for collapsed items
export const WithDropdown: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Level 1', href: '/level1' },
      { label: 'Level 2', href: '/level1/level2' },
      { label: 'Level 3', href: '/level1/level2/level3' },
      { label: 'Level 4', href: '/level1/level2/level3/level4' },
      { label: 'Current Page', current: true },
    ],
    maxItems: 3,
    showDropdown: true,
  },
};

// Application example
export const ApplicationExample: Story = {
  args: {
    items: [
      { label: 'Applications', href: '/applications' },
      { label: 'Development', href: '/applications/development' },
      { label: 'DA-2024-001', href: '/applications/development/DA-2024-001' },
      { label: 'Documents', current: true },
    ],
  },
};

// Different styles
export const DifferentStyles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '14px', color: '#666' }}>Default style:</p>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Item', current: true },
          ]}
        />
      </div>
      
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '14px', color: '#666' }}>With slash separator:</p>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Item', current: true },
          ]}
          separator="/"
        />
      </div>
      
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '14px', color: '#666' }}>With arrow separator:</p>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Item', current: true },
          ]}
          separator="→"
        />
      </div>
      
      <div>
        <p style={{ marginBottom: '0.5rem', fontSize: '14px', color: '#666' }}>With custom separator:</p>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Item', current: true },
          ]}
          separator={<Icon name="chevron-right" size={12} />}
        />
      </div>
    </div>
  ),
};

// Interactive example
export const Interactive: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', onClick: () => alert('Navigate to Home') },
      { label: 'Products', href: '/products', onClick: () => alert('Navigate to Products') },
      { label: 'Electronics', href: '/electronics', onClick: () => alert('Navigate to Electronics') },
      { label: 'Current Item', current: true },
    ],
  },
};