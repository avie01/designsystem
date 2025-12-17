import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import AlertPanel, { Alert } from './AlertPanel';

const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Document Workflow Updated',
    message: 'Quarterly financial reports workflow has been updated with new approval stages.',
    type: 'info',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
  },
  {
    id: '2',
    title: 'Document Approved',
    message: 'Contract-2024-056 has been approved and is ready for distribution.',
    type: 'success',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
  },
  {
    id: '3',
    title: 'Document Expiration Notice',
    message: 'Policy Manual 2023 will expire in 2 weeks. Please schedule a review.',
    type: 'warning',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: '4',
    title: 'File Storage Limit Exceeded',
    message: 'Your document repository has reached 95% capacity. Archive old documents.',
    type: 'error',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: '5',
    title: 'ECM Metadata Index Updated',
    message: 'Document search index has been updated successfully with latest records.',
    type: 'info',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    read: true,
  },
];

const meta: Meta<typeof AlertPanel> = {
  title: 'Design System/Components/AlertPanel',
  component: AlertPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', width: '400px', height: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const AlertPanelWithState = ({ initialAlerts }: { initialAlerts: Alert[] }) => {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [isOpen, setIsOpen] = useState(true);

  const handleDismiss = (alertId: string) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  const handleRead = (alertId: string) => {
    setAlerts(prev => prev.map(a =>
      a.id === alertId ? { ...a, read: true } : a
    ));
  };

  return (
    <AlertPanel
      alerts={alerts}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onAlertDismiss={handleDismiss}
      onAlertRead={handleRead}
    />
  );
};

export const Default: Story = {
  render: () => <AlertPanelWithState initialAlerts={mockAlerts} />,
};

export const AllUnread: Story = {
  render: () => (
    <AlertPanelWithState
      initialAlerts={mockAlerts.map(a => ({ ...a, read: false }))}
    />
  ),
};

export const AllRead: Story = {
  name: '03 All Read',
  render: () => (
    <AlertPanelWithState
      initialAlerts={mockAlerts.map(a => ({ ...a, read: true }))}
    />
  ),
};

export const Empty: Story = {
  render: () => <AlertPanelWithState initialAlerts={[]} />,
};

export const SingleAlert: Story = {
  render: () => (
    <AlertPanelWithState
      initialAlerts={[mockAlerts[0]]}
    />
  ),
};

export const MixedAlertTypes: Story = {
  name: '06 Mixed Alert Types',
  render: () => (
    <AlertPanelWithState
      initialAlerts={[
        { ...mockAlerts[0], type: 'info', read: false },
        { ...mockAlerts[1], type: 'success', read: false },
        { ...mockAlerts[2], type: 'warning', read: false },
        { ...mockAlerts[3], type: 'error', read: false },
      ]}
    />
  ),
};
