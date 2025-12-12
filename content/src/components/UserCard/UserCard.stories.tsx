import type { Meta, StoryObj } from '@storybook/react';
import UserCard from './UserCard';

const meta: Meta<typeof UserCard> = {
  title: 'Components/Cards/UserCard',
  component: UserCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A card component for displaying user information including avatar, status, contact details, tags, and action buttons. Features hover effects and bookmark functionality.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Sarah Johnson',
    role: 'Senior Planning Officer',
    department: 'Development Assessment',
    email: 'sarah.johnson@council.gov.au',
    status: 'active',
    lastActive: 'Active now',
  },
};

export const WithAvatar: Story = {
  args: {
    avatar: 'https://i.pravatar.cc/150?img=5',
    name: 'Michael Chen',
    role: 'Principal Planner',
    department: 'Strategic Planning',
    email: 'michael.chen@council.gov.au',
    status: 'active',
    lastActive: '2 min ago',
  },
};

export const WithInitials: Story = {
  args: {
    initials: 'AR',
    name: 'Amanda Roberts',
    role: 'Development Assessment Manager',
    department: 'Planning & Development',
    email: 'amanda.roberts@council.gov.au',
    status: 'away',
    lastActive: '15 min ago',
  },
};

export const WithTags: Story = {
  args: {
    name: 'Tom Anderson',
    role: 'Building Certifier',
    department: 'Building Services',
    email: 'tom.anderson@council.gov.au',
    status: 'active',
    tags: ['Building Code', 'Compliance', 'Residential'],
  },
};

export const WithActions: Story = {
  args: {
    name: 'Lisa Martinez',
    role: 'Development Coordinator',
    department: 'Infrastructure Planning',
    email: 'lisa.martinez@council.gov.au',
    status: 'active',
    lastActive: 'Active now',
    tags: ['Infrastructure', 'Public Works'],
    actions: {
      onMessage: () => console.log('Message Lisa'),
      onCall: () => console.log('Call Lisa'),
    },
  },
};

export const OfflineStatus: Story = {
  args: {
    name: 'David Wilson',
    role: 'Environmental Planner',
    department: 'Environmental Services',
    email: 'david.wilson@council.gov.au',
    status: 'offline',
    lastActive: '2 hours ago',
    tags: ['Environmental', 'Sustainability'],
  },
};

export const AwayStatus: Story = {
  args: {
    avatar: 'https://i.pravatar.cc/150?img=9',
    name: 'Emma Thompson',
    role: 'Heritage Advisor',
    department: 'Heritage & Culture',
    email: 'emma.thompson@council.gov.au',
    status: 'away',
    lastActive: '30 min ago',
    tags: ['Heritage', 'Conservation'],
  },
};

export const Saved: Story = {
  args: {
    name: 'James Morrison',
    role: 'Transport Planner',
    department: 'Transport & Infrastructure',
    email: 'james.morrison@council.gov.au',
    status: 'active',
    saved: true,
    tags: ['Transport', 'Traffic'],
    actions: {
      onMessage: () => console.log('Message James'),
      onCall: () => console.log('Call James'),
    },
  },
};

export const MinimalInfo: Story = {
  args: {
    name: 'Rachel Green',
    role: 'Administrative Officer',
    status: 'active',
  },
};

export const FullyFeatured: Story = {
  args: {
    avatar: 'https://i.pravatar.cc/150?img=8',
    name: 'Christopher Lee',
    role: 'Chief Planning Officer',
    department: 'Planning & Development',
    email: 'christopher.lee@council.gov.au',
    status: 'active',
    lastActive: 'Active now',
    tags: ['Leadership', 'Strategic Planning', 'Policy'],
    actions: {
      onMessage: () => console.log('Message Christopher'),
      onCall: () => console.log('Call Christopher'),
    },
    saved: false,
  },
};

export const WithCustomClassName: Story = {
  args: {
    name: 'Olivia Brown',
    role: 'Community Engagement Officer',
    department: 'Community Services',
    email: 'olivia.brown@council.gov.au',
    status: 'active',
    tags: ['Community', 'Engagement'],
    className: 'custom-user-card',
  },
};
