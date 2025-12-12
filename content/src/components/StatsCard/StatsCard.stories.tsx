import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import StatsCard from './StatsCard';

const meta: Meta<typeof StatsCard> = {
  title: 'Components/Cards/StatsCard',
  component: StatsCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ODL StatsCard component for displaying statistics with an icon, value, and label. Simple and compact design for dashboard metrics. Fully accessible and follows ODL design system guidelines.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The main number/value to display',
      table: {
        type: { summary: 'number | string' },
      },
    },
    label: {
      control: 'text',
      description: 'The label describing what the value represents',
      table: {
        type: { summary: 'string' },
      },
    },
    iconName: {
      control: 'text',
      description: 'Icon name from the Carbon icon set',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'list' },
      },
    },
    iconColor: {
      control: 'color',
      description: 'Icon color',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#0284c7' },
      },
    },
    iconBackground: {
      control: 'color',
      description: 'Background color for the icon container',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#e0f2fe' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1234,
    label: 'Total Items',
    iconName: 'list',
  },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      <StatsCard
        value={2845}
        label="Users"
        iconName="user"
        iconColor="#0284c7"
        iconBackground="#e0f2fe"
      />
      <StatsCard
        value={156}
        label="Projects"
        iconName="folder"
        iconColor="#7c3aed"
        iconBackground="#f3e8ff"
      />
      <StatsCard
        value={892}
        label="Completed"
        iconName="checkmark-filled"
        iconColor="#059669"
        iconBackground="#d1fae5"
      />
      <StatsCard
        value={23}
        label="Pending"
        iconName="time"
        iconColor="#ea580c"
        iconBackground="#fed7aa"
      />
      <StatsCard
        value={12}
        label="Failed"
        iconName="warning"
        iconColor="#dc2626"
        iconBackground="#fecaca"
      />
      <StatsCard
        value={567}
        label="In Progress"
        iconName="in-progress"
        iconColor="#0891b2"
        iconBackground="#cffafe"
      />
    </div>
  ),
};

export const BusinessMetrics: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      <StatsCard
        value="$127.5K"
        label="Revenue"
        iconName="currency-dollar"
        iconColor="#059669"
        iconBackground="#d1fae5"
      />
      <StatsCard
        value="1,429"
        label="New Customers"
        iconName="user-multiple"
        iconColor="#0284c7"
        iconBackground="#e0f2fe"
      />
      <StatsCard
        value="3.24%"
        label="Conversion Rate"
        iconName="chart-line"
        iconColor="#7c3aed"
        iconBackground="#f3e8ff"
      />
      <StatsCard
        value="2.4h"
        label="Avg Response"
        iconName="time"
        iconColor="#ea580c"
        iconBackground="#fed7aa"
      />
    </div>
  ),
};

export const ApplicationStats: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      <StatsCard
        value="99.9%"
        label="Uptime"
        iconName="checkmark-outline"
        iconColor="#059669"
        iconBackground="#d1fae5"
      />
      <StatsCard
        value="12,456"
        label="Active Users"
        iconName="user-activity"
        iconColor="#0284c7"
        iconBackground="#e0f2fe"
      />
      <StatsCard
        value="24"
        label="Deployments"
        iconName="rocket"
        iconColor="#7c3aed"
        iconBackground="#f3e8ff"
      />
      <StatsCard
        value="7"
        label="Critical Issues"
        iconName="warning-alt"
        iconColor="#dc2626"
        iconBackground="#fecaca"
      />
    </div>
  ),
};

export const ProjectManagement: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      <StatsCard
        value={42}
        label="Active Projects"
        iconName="folder"
        iconColor="#0284c7"
        iconBackground="#e0f2fe"
      />
      <StatsCard
        value={287}
        label="Total Tasks"
        iconName="task"
        iconColor="#7c3aed"
        iconBackground="#f3e8ff"
      />
      <StatsCard
        value={156}
        label="Completed"
        iconName="checkmark-filled"
        iconColor="#059669"
        iconBackground="#d1fae5"
      />
      <StatsCard
        value={89}
        label="In Progress"
        iconName="in-progress"
        iconColor="#0891b2"
        iconBackground="#cffafe"
      />
      <StatsCard
        value={42}
        label="To Do"
        iconName="circle-dash"
        iconColor="#6b7280"
        iconBackground="#f3f4f6"
      />
    </div>
  ),
};

export const ContentMetrics: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      <StatsCard
        value={3421}
        label="Documents"
        iconName="document"
        iconColor="#0284c7"
        iconBackground="#e0f2fe"
      />
      <StatsCard
        value={1234}
        label="Images"
        iconName="image"
        iconColor="#7c3aed"
        iconBackground="#f3e8ff"
      />
      <StatsCard
        value={567}
        label="Videos"
        iconName="video"
        iconColor="#ea580c"
        iconBackground="#fed7aa"
      />
      <StatsCard
        value="127GB"
        label="Storage Used"
        iconName="data-base"
        iconColor="#059669"
        iconBackground="#d1fae5"
      />
    </div>
  ),
};

export const EcommerceMetrics: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      <StatsCard
        value={1847}
        label="Total Orders"
        iconName="shopping-cart"
        iconColor="#0284c7"
        iconBackground="#e0f2fe"
      />
      <StatsCard
        value="$45.2K"
        label="Revenue"
        iconName="currency-dollar"
        iconColor="#059669"
        iconBackground="#d1fae5"
      />
      <StatsCard
        value={234}
        label="Products"
        iconName="cube"
        iconColor="#7c3aed"
        iconBackground="#f3e8ff"
      />
      <StatsCard
        value={12}
        label="Out of Stock"
        iconName="warning"
        iconColor="#dc2626"
        iconBackground="#fecaca"
      />
    </div>
  ),
};

export const LargeNumbers: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      <StatsCard
        value="2.4M"
        label="Page Views"
        iconName="view"
        iconColor="#0284c7"
        iconBackground="#e0f2fe"
      />
      <StatsCard
        value="1.2M"
        label="Downloads"
        iconName="download"
        iconColor="#059669"
        iconBackground="#d1fae5"
      />
      <StatsCard
        value="847K"
        label="Visitors"
        iconName="user-multiple"
        iconColor="#7c3aed"
        iconBackground="#f3e8ff"
      />
    </div>
  ),
};

export const PercentageValues: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      <StatsCard
        value="98.5%"
        label="Success Rate"
        iconName="checkmark-outline"
        iconColor="#059669"
        iconBackground="#d1fae5"
      />
      <StatsCard
        value="23.4%"
        label="Bounce Rate"
        iconName="chart-line"
        iconColor="#ea580c"
        iconBackground="#fed7aa"
      />
      <StatsCard
        value="67.8%"
        label="Engagement"
        iconName="user-activity"
        iconColor="#0284c7"
        iconBackground="#e0f2fe"
      />
    </div>
  ),
};

export const CompactGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
      <StatsCard value={42} label="Projects" iconName="folder" iconColor="#0284c7" iconBackground="#e0f2fe" />
      <StatsCard value={287} label="Tasks" iconName="task" iconColor="#7c3aed" iconBackground="#f3e8ff" />
      <StatsCard value={156} label="Done" iconName="checkmark-filled" iconColor="#059669" iconBackground="#d1fae5" />
      <StatsCard value={89} label="In Progress" iconName="in-progress" iconColor="#0891b2" iconBackground="#cffafe" />
      <StatsCard value={42} label="To Do" iconName="circle-dash" iconColor="#6b7280" iconBackground="#f3f4f6" />
      <StatsCard value={12} label="Overdue" iconName="warning" iconColor="#dc2626" iconBackground="#fecaca" />
    </div>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      <StatsCard
        value={1234}
        label="Custom Style"
        iconName="star-filled"
        iconColor="#facc15"
        iconBackground="#fef9c3"
        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      />
      <StatsCard
        value={5678}
        label="Another Custom"
        iconName="trophy"
        iconColor="#f59e0b"
        iconBackground="#fed7aa"
        className="custom-stats-card"
      />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    value: 1234,
    label: 'Total Items',
    iconName: 'list',
    iconColor: '#0284c7',
    iconBackground: '#e0f2fe',
  },
};
