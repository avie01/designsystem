import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import AlertPanel, { Alert } from './AlertPanel';

const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Planning Scheme Update',
    message: 'New amendments to the local planning scheme have been published.',
    type: 'info',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
  },
  {
    id: '2',
    title: 'Development Application Approved',
    message: 'Your development application DA-2024-001 has been approved.',
    type: 'success',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
  },
  {
    id: '3',
    title: 'Submission Deadline Approaching',
    message: 'The deadline for public submissions closes in 3 days.',
    type: 'warning',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: '4',
    title: 'Document Upload Failed',
    message: 'Failed to upload supporting documents. Please try again.',
    type: 'error',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: '5',
    title: 'System Maintenance Completed',
    message: 'Scheduled maintenance has been completed successfully.',
    type: 'info',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    read: true,
  },
];

const meta: Meta<typeof AlertPanel> = {
  title: 'Components/Feedback/AlertPanel',
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
