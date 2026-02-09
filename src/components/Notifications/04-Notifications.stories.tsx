import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Notifications, { Notification } from './Notifications';

const mockNotifications: Notification[] = [
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

const meta: Meta<typeof Notifications> = {
  title: 'Design System/Components/Notifications',
  component: Notifications,
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

const NotificationsWithState = ({ initialNotifications }: { initialNotifications: Notification[] }) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isOpen, setIsOpen] = useState(true);

  const handleDismiss = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  return (
    <Notifications
      notifications={notifications}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onNotificationDismiss={handleDismiss}
      onNotificationRead={handleRead}
    />
  );
};

export const Default: Story = {
  render: () => <NotificationsWithState initialNotifications={mockNotifications} />,
};

export const AllUnread: Story = {
  render: () => (
    <NotificationsWithState
      initialNotifications={mockNotifications.map(n => ({ ...n, read: false }))}
    />
  ),
};

export const AllRead: Story = {
  name: '03 All Read',
  render: () => (
    <NotificationsWithState
      initialNotifications={mockNotifications.map(n => ({ ...n, read: true }))}
    />
  ),
};

export const Empty: Story = {
  render: () => <NotificationsWithState initialNotifications={[]} />,
};

export const SingleNotification: Story = {
  render: () => (
    <NotificationsWithState
      initialNotifications={[mockNotifications[0]]}
    />
  ),
};

export const MixedNotificationTypes: Story = {
  name: '06 Mixed Notification Types',
  render: () => (
    <NotificationsWithState
      initialNotifications={[
        { ...mockNotifications[0], type: 'info', read: false },
        { ...mockNotifications[1], type: 'success', read: false },
        { ...mockNotifications[2], type: 'warning', read: false },
        { ...mockNotifications[3], type: 'error', read: false },
      ]}
    />
  ),
};
