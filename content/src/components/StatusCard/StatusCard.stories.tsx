import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import StatusCard from './StatusCard';

const meta: Meta<typeof StatusCard> = {
  title: 'Components/Cards/StatusCard',
  component: StatusCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ODL StatusCard component for displaying key metrics and status information with icons, trends, and comparisons. Fully accessible and follows ODL design system guidelines.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main title/label',
      table: {
        type: { summary: 'string' },
      },
    },
    metric: {
      control: 'text',
      description: 'Large metric value to display',
      table: {
        type: { summary: 'string | number' },
      },
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle or description',
      table: {
        type: { summary: 'string' },
      },
    },
    comparison: {
      control: 'text',
      description: 'Comparison value (e.g., "+12% vs last week")',
      table: {
        type: { summary: 'string' },
      },
    },
    trend: {
      control: 'select',
      options: ['up', 'down', 'neutral', undefined],
      description: 'Trend direction for comparison',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'info'],
      description: 'Color variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    icon: {
      control: 'text',
      description: 'Icon name from Carbon icons',
      table: {
        type: { summary: 'string' },
      },
    },
    onClick: {
      description: 'Click handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'user',
    title: 'Total Users',
    metric: '2,845',
    subtitle: 'Active users',
    comparison: '+12%',
    trend: 'up',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
      <StatusCard
        variant="default"
        icon="dashboard"
        title="Default"
        metric="1,234"
        subtitle="Total items"
        comparison="+5%"
        trend="up"
      />
      <StatusCard
        variant="primary"
        icon="folder"
        title="Primary"
        metric="567"
        subtitle="Active projects"
        comparison="+8%"
        trend="up"
      />
      <StatusCard
        variant="success"
        icon="checkmark-filled"
        title="Success"
        metric="892"
        subtitle="Completed tasks"
        comparison="+15%"
        trend="up"
      />
      <StatusCard
        variant="warning"
        icon="warning"
        title="Warning"
        metric="23"
        subtitle="Pending reviews"
        comparison="+3"
        trend="neutral"
      />
      <StatusCard
        variant="error"
        icon="close-filled"
        title="Error"
        metric="12"
        subtitle="Failed items"
        comparison="-2"
        trend="down"
      />
      <StatusCard
        variant="info"
        icon="information-filled"
        title="Info"
        metric="456"
        subtitle="Total notifications"
        comparison="+10%"
        trend="up"
      />
    </div>
  ),
};

export const WithTrends: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
      <StatusCard
        variant="success"
        icon="trending-up"
        title="Revenue"
        metric="$45,231"
        subtitle="This month"
        comparison="+20.1%"
        trend="up"
      />
      <StatusCard
        variant="error"
        icon="trending-down"
        title="Expenses"
        metric="$12,456"
        subtitle="This month"
        comparison="-5.4%"
        trend="down"
      />
      <StatusCard
        variant="primary"
        icon="chart-line"
        title="Profit Margin"
        metric="32.4%"
        subtitle="Current"
        comparison="0%"
        trend="neutral"
      />
    </div>
  ),
};

export const BusinessMetrics: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
      <StatusCard
        variant="primary"
        icon="shopping-cart"
        title="Total Sales"
        metric="$127,500"
        subtitle="Last 30 days"
        comparison="+18%"
        trend="up"
      />
      <StatusCard
        variant="success"
        icon="user-multiple"
        title="New Customers"
        metric="1,429"
        subtitle="This quarter"
        comparison="+23%"
        trend="up"
      />
      <StatusCard
        variant="info"
        icon="chart-bar"
        title="Conversion Rate"
        metric="3.24%"
        subtitle="Current rate"
        comparison="+0.8%"
        trend="up"
      />
      <StatusCard
        variant="warning"
        icon="time"
        title="Avg Response Time"
        metric="2.4h"
        subtitle="Support tickets"
        comparison="-0.3h"
        trend="down"
      />
    </div>
  ),
};

export const ApplicationMetrics: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
      <StatusCard
        variant="primary"
        icon="rocket"
        title="Active Deployments"
        metric="24"
        subtitle="Production"
        comparison="+3"
        trend="up"
      />
      <StatusCard
        variant="success"
        icon="checkmark-outline"
        title="Uptime"
        metric="99.9%"
        subtitle="Last 30 days"
        comparison="+0.1%"
        trend="up"
      />
      <StatusCard
        variant="error"
        icon="warning-alt"
        title="Critical Errors"
        metric="7"
        subtitle="This week"
        comparison="-12"
        trend="down"
      />
      <StatusCard
        variant="info"
        icon="user-activity"
        title="Active Users"
        metric="12,456"
        subtitle="Currently online"
        comparison="+234"
        trend="up"
      />
    </div>
  ),
};

export const WithoutComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
      <StatusCard
        variant="primary"
        icon="folder"
        title="Total Projects"
        metric="156"
        subtitle="All time"
      />
      <StatusCard
        variant="success"
        icon="document"
        title="Documents"
        metric="3,421"
        subtitle="Total files"
      />
    </div>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
      <StatusCard
        variant="primary"
        title="Total Revenue"
        metric="$234,567"
        subtitle="Year to date"
        comparison="+12%"
        trend="up"
      />
      <StatusCard
        variant="success"
        title="Growth Rate"
        metric="23.5%"
        subtitle="Monthly growth"
        comparison="+3.2%"
        trend="up"
      />
    </div>
  ),
};

export const Clickable: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
      <StatusCard
        variant="primary"
        icon="folder"
        title="Active Projects"
        metric="42"
        subtitle="Click to view all"
        comparison="+5"
        trend="up"
        onClick={() => alert('Navigating to projects...')}
      />
      <StatusCard
        variant="success"
        icon="task"
        title="Completed Tasks"
        metric="287"
        subtitle="Click to view details"
        comparison="+23"
        trend="up"
        onClick={() => alert('Navigating to tasks...')}
      />
    </div>
  ),
};

export const LargeNumbers: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
      <StatusCard
        variant="primary"
        icon="globe"
        title="Total Page Views"
        metric="2.4M"
        subtitle="This month"
        comparison="+340K"
        trend="up"
      />
      <StatusCard
        variant="success"
        icon="download"
        title="Downloads"
        metric="1.2M"
        subtitle="All time"
        comparison="+15%"
        trend="up"
      />
      <StatusCard
        variant="info"
        icon="data-base"
        title="Database Size"
        metric="127GB"
        subtitle="Current usage"
        comparison="+12GB"
        trend="up"
      />
    </div>
  ),
};

export const Playground: Story = {
  args: {
    variant: 'primary',
    icon: 'folder',
    title: 'Total Items',
    metric: '1,234',
    subtitle: 'Active items',
    comparison: '+12%',
    trend: 'up',
  },
};
