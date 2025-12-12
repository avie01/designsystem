import type { Meta, StoryObj } from '@storybook/react';
import UserAvatar from './UserAvatar';

const meta: Meta<typeof UserAvatar> = {
  title: 'Components/UserAvatar',
  component: UserAvatar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ 
        minHeight: '300px', 
        padding: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible'
      }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    showPopup: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    user: {
      name: 'Sarah Johnson',
      role: 'Senior Developer',
      department: 'Engineering',
      email: 'sarah.johnson@company.com',
    },
  },
};

export const Small: Story = {
  args: {
    user: {
      name: 'Mike Chen',
      role: 'Product Manager',
      department: 'Product',
      email: 'mike.chen@company.com',
    },
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    user: {
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      department: 'Design',
      email: 'emily.rodriguez@company.com',
    },
    size: 'lg',
  },
};

export const WithoutPopup: Story = {
  args: {
    user: {
      name: 'David Kim',
      role: 'Security Engineer',
      department: 'Security',
      email: 'david.kim@company.com',
    },
    showPopup: false,
  },
};

export const WithAvatar: Story = {
  args: {
    user: {
      name: 'Lisa Thompson',
      role: 'QA Engineer',
      department: 'Quality Assurance',
      email: 'lisa.thompson@company.com',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
  },
};

export const MultipleUsers: Story = {
  render: () => (
    <div className="flex space-x-2">
      <UserAvatar
        user={{
          name: 'Sarah Johnson',
          role: 'Senior Developer',
          department: 'Engineering',
          email: 'sarah.johnson@company.com',
        }}
        size="sm"
      />
      <UserAvatar
        user={{
          name: 'Mike Chen',
          role: 'Product Manager',
          department: 'Product',
          email: 'mike.chen@company.com',
        }}
        size="sm"
      />
      <UserAvatar
        user={{
          name: 'Emily Rodriguez',
          role: 'UX Designer',
          department: 'Design',
          email: 'emily.rodriguez@company.com',
        }}
        size="sm"
      />
      <UserAvatar
        user={{
          name: 'David Kim',
          role: 'Security Engineer',
          department: 'Security',
          email: 'david.kim@company.com',
        }}
        size="sm"
      />
    </div>
  ),
}; 