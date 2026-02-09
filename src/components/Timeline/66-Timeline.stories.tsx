import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Timeline, { TimelineItem } from './Timeline';
import Button from '../Button/Button';
import { useTheme } from '../../../.storybook/theme-decorator';

const meta: Meta<typeof Timeline> = {
  title: 'Design System/Components/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Timeline component for displaying chronological events or activities. Supports vertical and horizontal orientations, multiple sizes, and interactive features.',
      },
    },
  },
  tags: ['autodocs', 'Ready for dev'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Timeline orientation',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Component size',
    },
    showConnector: {
      control: 'boolean',
      description: 'Show connecting lines between items',
    },
    alternating: {
      control: 'boolean',
      description: 'Alternate items left and right (vertical only)',
    },
    items: {
      control: false,
      description: 'Array of timeline items',
    },
    onItemClick: {
      control: false,
      description: 'Callback when an item is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems: TimelineItem[] = [
  {
    id: '1',
    title: 'Project Started',
    description: 'Initial project setup and configuration completed',
    date: 'Jan 15, 2024',
    time: '9:00 AM',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Design Phase',
    description: 'UI/UX designs approved by stakeholders',
    date: 'Feb 1, 2024',
    time: '2:30 PM',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Development',
    description: 'Core features currently in development',
    date: 'Feb 15, 2024',
    time: '10:00 AM',
    status: 'current',
  },
  {
    id: '4',
    title: 'Testing',
    description: 'QA testing and bug fixes',
    date: 'Mar 1, 2024',
    status: 'pending',
  },
  {
    id: '5',
    title: 'Launch',
    description: 'Production deployment',
    date: 'Mar 15, 2024',
    status: 'pending',
  },
];

export const VerticalDefault: Story = {
  name: '01 Vertical Default',
  args: {
    orientation: 'vertical',
    items: basicItems,
    size: 'medium',
    showConnector: true,
  },
};

export const HorizontalDefault: Story = {
  name: '02 Horizontal Default',
  args: {
    orientation: 'horizontal',
    items: basicItems.slice(0, 4),
    size: 'medium',
    showConnector: true,
  },
};

export const WithIcons: Story = {
  name: '03 With Custom Icons',
  args: {
    orientation: 'vertical',
    size: 'medium',
    items: [
      {
        id: '1',
        title: 'Order Placed',
        description: 'Your order has been confirmed',
        date: 'Dec 10, 2024',
        time: '10:30 AM',
        status: 'completed',
        icon: 'shopping-cart',
      },
      {
        id: '2',
        title: 'Payment Received',
        description: 'Payment successfully processed',
        date: 'Dec 10, 2024',
        time: '10:32 AM',
        status: 'completed',
        icon: 'wallet',
      },
      {
        id: '3',
        title: 'Processing',
        description: 'Order is being prepared',
        date: 'Dec 11, 2024',
        time: '9:00 AM',
        status: 'current',
        icon: 'cube',
      },
      {
        id: '4',
        title: 'Shipped',
        description: 'On the way to you',
        date: 'Expected Dec 13',
        status: 'pending',
        icon: 'delivery',
      },
      {
        id: '5',
        title: 'Delivered',
        description: 'Package delivered',
        date: 'Expected Dec 14',
        status: 'pending',
        icon: 'checkmark',
      },
    ],
  },
};

export const WithError: Story = {
  name: '04 With Error State',
  args: {
    orientation: 'vertical',
    size: 'medium',
    items: [
      {
        id: '1',
        title: 'Request Submitted',
        description: 'Application form submitted successfully',
        date: 'Nov 20, 2024',
        status: 'completed',
      },
      {
        id: '2',
        title: 'Document Review',
        description: 'Documents are being reviewed',
        date: 'Nov 22, 2024',
        status: 'completed',
      },
      {
        id: '3',
        title: 'Verification Failed',
        description: 'Identity verification failed. Please resubmit documents.',
        date: 'Nov 25, 2024',
        status: 'error',
      },
      {
        id: '4',
        title: 'Approval',
        description: 'Final approval pending',
        status: 'pending',
      },
    ],
  },
};

export const SmallSize: Story = {
  name: '05 Small Size',
  args: {
    orientation: 'vertical',
    size: 'small',
    items: basicItems,
    showConnector: true,
  },
};

export const LargeSize: Story = {
  name: '06 Large Size',
  args: {
    orientation: 'vertical',
    size: 'large',
    items: basicItems,
    showConnector: true,
  },
};

export const Alternating: Story = {
  name: '07 Alternating Layout',
  args: {
    orientation: 'vertical',
    size: 'medium',
    alternating: true,
    items: [
      {
        id: '1',
        title: 'Company Founded',
        description: 'Started with a small team of 3 people',
        date: '2018',
        status: 'completed',
      },
      {
        id: '2',
        title: 'First Product Launch',
        description: 'Released our flagship product to market',
        date: '2019',
        status: 'completed',
      },
      {
        id: '3',
        title: 'Series A Funding',
        description: 'Raised $10M in Series A',
        date: '2020',
        status: 'completed',
      },
      {
        id: '4',
        title: 'Global Expansion',
        description: 'Opened offices in 5 new countries',
        date: '2022',
        status: 'completed',
      },
      {
        id: '5',
        title: 'IPO',
        description: 'Preparing for initial public offering',
        date: '2024',
        status: 'current',
      },
    ],
  },
};

export const WithoutConnector: Story = {
  name: '08 Without Connector',
  args: {
    orientation: 'vertical',
    size: 'medium',
    showConnector: false,
    items: basicItems.slice(0, 3),
  },
};

export const ActivityFeed: Story = {
  name: '09 Activity Feed',
  args: {
    orientation: 'vertical',
    size: 'small',
    items: [
      {
        id: '1',
        title: 'John updated the document',
        date: 'Today',
        time: '2:30 PM',
        status: 'completed',
        icon: 'document',
      },
      {
        id: '2',
        title: 'Sarah commented on your post',
        date: 'Today',
        time: '1:15 PM',
        status: 'completed',
        icon: 'chat',
      },
      {
        id: '3',
        title: 'New team member joined',
        description: 'Welcome Mike to the team!',
        date: 'Today',
        time: '11:00 AM',
        status: 'completed',
        icon: 'user-avatar',
      },
      {
        id: '4',
        title: 'Meeting scheduled',
        description: 'Project review at 3 PM',
        date: 'Yesterday',
        time: '4:00 PM',
        status: 'completed',
        icon: 'calendar',
      },
      {
        id: '5',
        title: 'Task completed',
        description: 'Design review finished',
        date: 'Yesterday',
        time: '2:00 PM',
        status: 'completed',
        icon: 'task',
      },
    ],
  },
};

export const Clickable: Story = {
  name: '10 Clickable Items',
  args: {
    orientation: 'vertical',
    size: 'medium',
    items: basicItems,
    onItemClick: (item, index) => {
      alert(`Clicked: ${item.title} (index: ${index})`);
    },
  },
};

export const WithCustomContent: Story = {
  name: '11 With Custom Content',
  render: () => {
    const { colors } = useTheme();

    const itemsWithContent: TimelineItem[] = [
      {
        id: '1',
        title: 'Version 1.0 Released',
        description: 'Initial release with core features',
        date: 'Jan 2024',
        status: 'completed',
        content: (
          <div
            style={{
              padding: '12px',
              backgroundColor: colors.grey100,
              borderRadius: '8px',
              marginTop: '8px',
            }}
          >
            <p style={{ margin: 0, fontSize: '13px', color: colors.textSecondary }}>
              Features included: User authentication, Dashboard, Basic reporting
            </p>
          </div>
        ),
      },
      {
        id: '2',
        title: 'Version 2.0 Released',
        description: 'Major update with new features',
        date: 'Jun 2024',
        status: 'current',
        content: (
          <div style={{ marginTop: '12px' }}>
            <Button variant="secondary" size="small">
              View Release Notes
            </Button>
          </div>
        ),
      },
      {
        id: '3',
        title: 'Version 3.0 Planned',
        description: 'Upcoming features and improvements',
        date: 'Dec 2024',
        status: 'pending',
      },
    ];

    return <Timeline items={itemsWithContent} orientation="vertical" size="medium" />;
  },
};

export const AllSizes: Story = {
  name: '12 All Sizes Comparison',
  render: () => {
    const sampleItems: TimelineItem[] = [
      { id: '1', title: 'Step 1', description: 'First step', status: 'completed' },
      { id: '2', title: 'Step 2', description: 'Second step', status: 'current' },
      { id: '3', title: 'Step 3', description: 'Third step', status: 'pending' },
    ];

    return (
      <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
        <div>
          <h4 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>Small</h4>
          <Timeline items={sampleItems} size="small" />
        </div>
        <div>
          <h4 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>Medium</h4>
          <Timeline items={sampleItems} size="medium" />
        </div>
        <div>
          <h4 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>Large</h4>
          <Timeline items={sampleItems} size="large" />
        </div>
      </div>
    );
  },
};

export const StatusVariants: Story = {
  name: '13 Status Variants',
  args: {
    orientation: 'vertical',
    size: 'medium',
    items: [
      {
        id: '1',
        title: 'Completed Status',
        description: 'This item has been completed successfully',
        status: 'completed',
      },
      {
        id: '2',
        title: 'Current Status',
        description: 'This is the current active item',
        status: 'current',
      },
      {
        id: '3',
        title: 'Error Status',
        description: 'This item encountered an error',
        status: 'error',
      },
      {
        id: '4',
        title: 'Pending Status',
        description: 'This item is pending',
        status: 'pending',
      },
    ],
  },
};
