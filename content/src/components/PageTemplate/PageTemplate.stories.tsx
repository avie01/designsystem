import type { Meta, StoryObj } from '@storybook/react';
import PageTemplate from './PageTemplate';
import NavigationRail from '../NavigationRail/NavigationRail';

const meta: Meta<typeof PageTemplate> = {
  title: 'Components/Layout/PageTemplate',
  component: PageTemplate,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main page title',
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle',
    },
    children: {
      control: false,
      description: 'Main content to display',
    },
    breadcrumbs: {
      control: false,
      description: 'Array of breadcrumb items',
    },
    showLeftNavRail: {
      control: 'boolean',
      description: 'Whether to show the left navigation rail',
    },
    showRightNavRail: {
      control: 'boolean',
      description: 'Whether to show the right navigation rail',
    },
    leftNavRail: {
      control: false,
      description: 'Left navigation rail component',
    },
    rightNavRail: {
      control: false,
      description: 'Right navigation rail component',
    },
    user: {
      control: false,
      description: 'User information for header avatar',
    },
    alerts: {
      control: false,
      description: 'Alerts to display in header',
    },
    onBreadcrumbNavigate: {
      control: false,
      description: 'Callback when breadcrumb item is clicked',
    },
    onAlertRead: {
      control: false,
      description: 'Callback when alert is marked as read',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockUser = {
  name: 'Jane Doe',
  role: 'Planning Officer',
  department: 'Urban Development',
  email: 'jane.doe@council.gov.au',
};

const mockAlerts = [
  {
    id: '1',
    title: 'New Application Received',
    message: 'A new development application has been submitted.',
    type: 'info' as const,
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    read: false,
  },
  {
    id: '2',
    title: 'Review Complete',
    message: 'Your review has been approved by the supervisor.',
    type: 'success' as const,
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    read: true,
  },
];

const mockBreadcrumbs = [
  { label: 'Home', path: '/' },
  { label: 'Applications', path: '/applications' },
  { label: 'DA-2024-001' },
];

const SampleContent = () => (
  <div style={{ padding: '24px', background: '#f5f5f5', borderRadius: '8px', minHeight: '400px' }}>
    <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Sample Content Area</h2>
    <p style={{ margin: 0, color: '#666', lineHeight: 1.6 }}>
      This is the main content area of the page template. You can place any content here,
      such as forms, tables, cards, or other components from the design system.
    </p>
    <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600 }}>Card {i}</h3>
          <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>Sample card content goes here.</p>
        </div>
      ))}
    </div>
  </div>
);

const LeftNavRailContent = () => (
  <NavigationRail
    items={[
      { id: 'dashboard', icon: 'dashboard', label: 'Dashboard', href: '/dashboard' },
      { id: 'applications', icon: 'document', label: 'Applications', href: '/applications', active: true },
      { id: 'map', icon: 'map', label: 'Map View', href: '/map' },
      { id: 'reports', icon: 'report', label: 'Reports', href: '/reports' },
      { id: 'settings', icon: 'settings', label: 'Settings', href: '/settings' },
    ]}
    onItemClick={(item) => console.log('Clicked:', item.label)}
  />
);

export const Default: Story = {
  args: {
    title: 'Development Application',
    subtitle: 'DA-2024-001 - 123 Main Street',
    breadcrumbs: mockBreadcrumbs,
    user: mockUser,
    alerts: mockAlerts,
    children: <SampleContent />,
  },
};

export const WithLeftNavigation: Story = {
  args: {
    title: 'Dashboard',
    subtitle: 'Overview of all applications',
    breadcrumbs: [{ label: 'Home', path: '/' }, { label: 'Dashboard' }],
    user: mockUser,
    showLeftNavRail: true,
    leftNavRail: <LeftNavRailContent />,
    children: <SampleContent />,
  },
};

export const MinimalHeader: Story = {
  args: {
    title: 'Simple Page',
    children: <SampleContent />,
  },
};

export const WithSubtitle: Story = {
  args: {
    title: 'Property Details',
    subtitle: 'Lot 42 on RP123456 - Residential Zone',
    breadcrumbs: [
      { label: 'Home', path: '/' },
      { label: 'Properties', path: '/properties' },
      { label: 'Lot 42' },
    ],
    children: <SampleContent />,
  },
};

export const WithAlerts: Story = {
  args: {
    title: 'Notifications Demo',
    subtitle: 'Demonstrating the alert panel',
    user: mockUser,
    alerts: [
      { id: '1', title: 'Urgent Review Required', message: 'Application DA-2024-005 needs immediate attention.', type: 'warning', timestamp: new Date(), read: false },
      { id: '2', title: 'System Update', message: 'The system will undergo maintenance tonight.', type: 'info', timestamp: new Date(Date.now() - 3600000), read: false },
      { id: '3', title: 'Approval Granted', message: 'Your request has been approved.', type: 'success', timestamp: new Date(Date.now() - 7200000), read: true },
    ],
    onAlertRead: (alertId) => console.log('Alert read:', alertId),
    children: <SampleContent />,
  },
};

export const CustomColors: Story = {
  args: {
    title: 'Custom Styled Page',
    subtitle: 'With custom background color',
    breadcrumbs: mockBreadcrumbs,
    user: mockUser,
    backgroundColor: '#f0f4f8',
    children: <SampleContent />,
  },
};

export const LongBreadcrumbs: Story = {
  args: {
    title: 'Deeply Nested Page',
    breadcrumbs: [
      { label: 'Home', path: '/' },
      { label: 'Applications', path: '/applications' },
      { label: 'Development', path: '/applications/development' },
      { label: 'Residential', path: '/applications/development/residential' },
      { label: 'Single Dwelling', path: '/applications/development/residential/single' },
      { label: 'DA-2024-001' },
    ],
    onBreadcrumbNavigate: (path) => console.log('Navigate to:', path),
    children: <SampleContent />,
  },
};
