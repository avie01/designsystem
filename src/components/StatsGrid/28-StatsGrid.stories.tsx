import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import StatsGrid from './StatsGrid';
import StatsCard from '../CardComponents/StatsCard/StatsCard';

const meta: Meta<typeof StatsGrid> = {
  title: 'Design System/Components/StatsGrid',
  component: StatsGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ODL StatsGrid component for arranging StatsCard components in a responsive grid layout. Supports fixed columns or auto-fit responsive layout. Fully accessible and follows ODL design system guidelines.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'number',
      description: 'Number of columns (auto-fit with minmax by default)',
      table: {
        disable: true,
        type: { summary: 'number' },
      },
    },
    minColumnWidth: {
      control: 'text',
      description: 'Minimum column width for auto-fit',
      table: {
        disable: true,
        type: { summary: 'string' },
        defaultValue: { summary: '200px' },
      },
    },
    gap: {
      control: 'text',
      description: 'Gap between grid items',
      table: {
        disable: true,
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '01 Default',
  render: () => (
    <StatsGrid>
      <StatsCard value={2845} label="Total Users" iconName="user" iconColor="#0284c7" iconBackground="#e0f2fe" />
      <StatsCard value={156} label="Projects" iconName="folder" iconColor="#7c3aed" iconBackground="#f3e8ff" />
      <StatsCard value={892} label="Completed" iconName="checkmark-filled" iconColor="#059669" iconBackground="#d1fae5" />
      <StatsCard value={23} label="Pending" iconName="time" iconColor="#ea580c" iconBackground="#fed7aa" />
    </StatsGrid>
  ),
};

export const TwoColumns: Story = {
  name: '02 Two Columns',
  render: () => (
    <StatsGrid columns={2}>
      <StatsCard value={2845} label="Total Users" iconName="user" iconColor="#0284c7" iconBackground="#e0f2fe" />
      <StatsCard value={156} label="Projects" iconName="folder" iconColor="#7c3aed" iconBackground="#f3e8ff" />
      <StatsCard value={892} label="Completed" iconName="checkmark-filled" iconColor="#059669" iconBackground="#d1fae5" />
      <StatsCard value={23} label="Pending" iconName="time" iconColor="#ea580c" iconBackground="#fed7aa" />
    </StatsGrid>
  ),
};

export const ThreeColumns: Story = {
  name: '03 Three Columns',
  render: () => (
    <StatsGrid columns={3}>
      <StatsCard value={2845} label="Total Users" iconName="user" iconColor="#0284c7" iconBackground="#e0f2fe" />
      <StatsCard value={156} label="Projects" iconName="folder" iconColor="#7c3aed" iconBackground="#f3e8ff" />
      <StatsCard value={892} label="Completed" iconName="checkmark-filled" iconColor="#059669" iconBackground="#d1fae5" />
      <StatsCard value={23} label="Pending" iconName="time" iconColor="#ea580c" iconBackground="#fed7aa" />
      <StatsCard value={12} label="Failed" iconName="warning" iconColor="#dc2626" iconBackground="#fecaca" />
      <StatsCard value={567} label="In Progress" iconName="in-progress" iconColor="#0891b2" iconBackground="#cffafe" />
    </StatsGrid>
  ),
};

export const FourColumns: Story = {
  name: '04 Four Columns',
  render: () => (
    <StatsGrid columns={4}>
      <StatsCard value={2845} label="Total Users" iconName="user" iconColor="#0284c7" iconBackground="#e0f2fe" />
      <StatsCard value={156} label="Projects" iconName="folder" iconColor="#7c3aed" iconBackground="#f3e8ff" />
      <StatsCard value={892} label="Completed" iconName="checkmark-filled" iconColor="#059669" iconBackground="#d1fae5" />
      <StatsCard value={23} label="Pending" iconName="time" iconColor="#ea580c" iconBackground="#fed7aa" />
    </StatsGrid>
  ),
};

export const CustomGap: Story = {
  name: '05 Custom Gap',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Small Gap (8px)</h4>
        <StatsGrid gap="8px">
          <StatsCard value={2845} label="Users" iconName="user" iconColor="#0284c7" iconBackground="#e0f2fe" />
          <StatsCard value={156} label="Projects" iconName="folder" iconColor="#7c3aed" iconBackground="#f3e8ff" />
          <StatsCard value={892} label="Completed" iconName="checkmark-filled" iconColor="#059669" iconBackground="#d1fae5" />
        </StatsGrid>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Large Gap (24px)</h4>
        <StatsGrid gap="24px">
          <StatsCard value={2845} label="Users" iconName="user" iconColor="#0284c7" iconBackground="#e0f2fe" />
          <StatsCard value={156} label="Projects" iconName="folder" iconColor="#7c3aed" iconBackground="#f3e8ff" />
          <StatsCard value={892} label="Completed" iconName="checkmark-filled" iconColor="#059669" iconBackground="#d1fae5" />
        </StatsGrid>
      </div>
    </div>
  ),
};

export const CustomMinWidth: Story = {
  name: '06 Custom Min Width',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Min Width: 150px</h4>
        <StatsGrid minColumnWidth="150px">
          <StatsCard value={2845} label="Users" iconName="user" iconColor="#0284c7" iconBackground="#e0f2fe" />
          <StatsCard value={156} label="Projects" iconName="folder" iconColor="#7c3aed" iconBackground="#f3e8ff" />
          <StatsCard value={892} label="Done" iconName="checkmark-filled" iconColor="#059669" iconBackground="#d1fae5" />
          <StatsCard value={23} label="Pending" iconName="time" iconColor="#ea580c" iconBackground="#fed7aa" />
        </StatsGrid>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Min Width: 250px</h4>
        <StatsGrid minColumnWidth="250px">
          <StatsCard value={2845} label="Total Users" iconName="user" iconColor="#0284c7" iconBackground="#e0f2fe" />
          <StatsCard value={156} label="Active Projects" iconName="folder" iconColor="#7c3aed" iconBackground="#f3e8ff" />
          <StatsCard value={892} label="Completed Tasks" iconName="checkmark-filled" iconColor="#059669" iconBackground="#d1fae5" />
        </StatsGrid>
      </div>
    </div>
  ),
};

export const BusinessDashboard: Story = {
  name: '07 Business Dashboard',
  render: () => (
    <div>
      <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Business Metrics</h3>
      <StatsGrid columns={4}>
        <StatsCard value="$127.5K" label="Revenue" iconName="currency-dollar" iconColor="#059669" iconBackground="#d1fae5" />
        <StatsCard value="1,429" label="New Customers" iconName="user-multiple" iconColor="#0284c7" iconBackground="#e0f2fe" />
        <StatsCard value="3.24%" label="Conversion Rate" iconName="chart-line" iconColor="#7c3aed" iconBackground="#f3e8ff" />
        <StatsCard value="2.4h" label="Avg Response" iconName="time" iconColor="#ea580c" iconBackground="#fed7aa" />
      </StatsGrid>
    </div>
  ),
};

export const ProjectManagement: Story = {
  name: '08 Project Management',
  render: () => (
    <div>
      <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Project Overview</h3>
      <StatsGrid columns={5}>
        <StatsCard value={42} label="Active Projects" iconName="folder" iconColor="#0284c7" iconBackground="#e0f2fe" />
        <StatsCard value={287} label="Total Tasks" iconName="task" iconColor="#7c3aed" iconBackground="#f3e8ff" />
        <StatsCard value={156} label="Completed" iconName="checkmark-filled" iconColor="#059669" iconBackground="#d1fae5" />
        <StatsCard value={89} label="In Progress" iconName="in-progress" iconColor="#0891b2" iconBackground="#cffafe" />
        <StatsCard value={42} label="To Do" iconName="circle-dash" iconColor="#6b7280" iconBackground="#f3f4f6" />
      </StatsGrid>
    </div>
  ),
};

export const ApplicationMetrics: Story = {
  name: '09 Application Metrics',
  render: () => (
    <div>
      <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Application Health</h3>
      <StatsGrid>
        <StatsCard value="99.9%" label="Uptime" iconName="checkmark-outline" iconColor="#059669" iconBackground="#d1fae5" />
        <StatsCard value="12,456" label="Active Users" iconName="user-activity" iconColor="#0284c7" iconBackground="#e0f2fe" />
        <StatsCard value="24" label="Deployments" iconName="rocket" iconColor="#7c3aed" iconBackground="#f3e8ff" />
        <StatsCard value="7" label="Critical Issues" iconName="warning-alt" iconColor="#dc2626" iconBackground="#fecaca" />
      </StatsGrid>
    </div>
  ),
};

export const EcommerceDashboard: Story = {
  name: '10 Ecommerce Dashboard',
  render: () => (
    <div>
      <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>E-commerce Dashboard</h3>
      <StatsGrid columns={4}>
        <StatsCard value={1847} label="Total Orders" iconName="shopping-cart" iconColor="#0284c7" iconBackground="#e0f2fe" />
        <StatsCard value="$45.2K" label="Revenue" iconName="currency-dollar" iconColor="#059669" iconBackground="#d1fae5" />
        <StatsCard value={234} label="Products" iconName="cube" iconColor="#7c3aed" iconBackground="#f3e8ff" />
        <StatsCard value={12} label="Out of Stock" iconName="warning" iconColor="#dc2626" iconBackground="#fecaca" />
      </StatsGrid>
    </div>
  ),
};

export const ContentManagement: Story = {
  name: '11 Content Management',
  render: () => (
    <div>
      <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Content Library</h3>
      <StatsGrid columns={4}>
        <StatsCard value={3421} label="Documents" iconName="document" iconColor="#0284c7" iconBackground="#e0f2fe" />
        <StatsCard value={1234} label="Images" iconName="image" iconColor="#7c3aed" iconBackground="#f3e8ff" />
        <StatsCard value={567} label="Videos" iconName="video" iconColor="#ea580c" iconBackground="#fed7aa" />
        <StatsCard value="127GB" label="Storage Used" iconName="data-base" iconColor="#059669" iconBackground="#d1fae5" />
      </StatsGrid>
    </div>
  ),
};

export const MultipleGrids: Story = {
  name: '12 Multiple Grids',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>User Metrics</h3>
        <StatsGrid columns={3}>
          <StatsCard value="12,456" label="Total Users" iconName="user-multiple" iconColor="#0284c7" iconBackground="#e0f2fe" />
          <StatsCard value="8,234" label="Active Today" iconName="user-activity" iconColor="#059669" iconBackground="#d1fae5" />
          <StatsCard value="1,429" label="New This Week" iconName="user-follow" iconColor="#7c3aed" iconBackground="#f3e8ff" />
        </StatsGrid>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Financial Metrics</h3>
        <StatsGrid columns={4}>
          <StatsCard value="$234.5K" label="Total Revenue" iconName="currency-dollar" iconColor="#059669" iconBackground="#d1fae5" />
          <StatsCard value="$45.2K" label="This Month" iconName="chart-line" iconColor="#0284c7" iconBackground="#e0f2fe" />
          <StatsCard value="$89.1K" label="Expenses" iconName="wallet" iconColor="#ea580c" iconBackground="#fed7aa" />
          <StatsCard value="$145.4K" label="Profit" iconName="trending-up" iconColor="#059669" iconBackground="#d1fae5" />
        </StatsGrid>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>System Status</h3>
        <StatsGrid columns={5}>
          <StatsCard value="99.9%" label="Uptime" iconName="checkmark-outline" iconColor="#059669" iconBackground="#d1fae5" />
          <StatsCard value="23ms" label="Latency" iconName="time" iconColor="#0284c7" iconBackground="#e0f2fe" />
          <StatsCard value="245" label="Requests/s" iconName="chart-bar" iconColor="#7c3aed" iconBackground="#f3e8ff" />
          <StatsCard value="127GB" label="Storage" iconName="data-base" iconColor="#0891b2" iconBackground="#cffafe" />
          <StatsCard value="24" label="Servers" iconName="server" iconColor="#6b7280" iconBackground="#f3f4f6" />
        </StatsGrid>
      </div>
    </div>
  ),
};

export const SizeVariants: Story = {
  name: '13 Size Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Small</h4>
        <StatsGrid columns={4}>
          <StatsCard value={2845} label="Total Users" iconName="user" size="sm" />
          <StatsCard value={156} label="Projects" iconName="folder" size="sm" />
          <StatsCard value={892} label="Completed" iconName="checkmark-filled" size="sm" />
          <StatsCard value={23} label="Pending" iconName="time" size="sm" />
        </StatsGrid>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Medium (Default)</h4>
        <StatsGrid columns={4}>
          <StatsCard value={2845} label="Total Users" iconName="user" size="md" />
          <StatsCard value={156} label="Projects" iconName="folder" size="md" />
          <StatsCard value={892} label="Completed" iconName="checkmark-filled" size="md" />
          <StatsCard value={23} label="Pending" iconName="time" size="md" />
        </StatsGrid>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Large</h4>
        <StatsGrid columns={4}>
          <StatsCard value={2845} label="Total Users" iconName="user" size="lg" />
          <StatsCard value={156} label="Projects" iconName="folder" size="lg" />
          <StatsCard value={892} label="Completed" iconName="checkmark-filled" size="lg" />
          <StatsCard value={23} label="Pending" iconName="time" size="lg" />
        </StatsGrid>
      </div>
    </div>
  ),
};

export const ThemeSupport: Story = {
  name: '14 Theme Support',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
          Theme Adaptive StatsGrid
        </h4>
        <p style={{ marginBottom: '16px', fontSize: '14px', opacity: 0.7 }}>
          Try switching between Light, Dark, and High Contrast themes using the toolbar above
        </p>
        <StatsGrid columns={4}>
          <StatsCard value={2845} label="Total Users" iconName="user" />
          <StatsCard value={156} label="Projects" iconName="folder" />
          <StatsCard value={892} label="Completed" iconName="checkmark-filled" />
          <StatsCard value={23} label="Disabled" iconName="time" disabled={true} />
        </StatsGrid>
      </div>
    </div>
  ),
};

export const Playground: Story = {
  name: '15 Playground',
  render: (args) => (
    <StatsGrid {...args}>
      <StatsCard value={2845} label="Total Users" iconName="user" />
      <StatsCard value={156} label="Projects" iconName="folder" />
      <StatsCard value={892} label="Completed" iconName="checkmark-filled" />
      <StatsCard value={23} label="Pending" iconName="time" />
    </StatsGrid>
  ),
  args: {
    columns: undefined,
    minColumnWidth: '200px',
    gap: '16px',
  },
};
