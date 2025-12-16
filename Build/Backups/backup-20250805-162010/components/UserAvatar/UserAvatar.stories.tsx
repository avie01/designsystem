import type { Meta, StoryObj } from '@storybook/react';
import UserAvatar from './UserAvatar';

const meta: Meta<typeof UserAvatar> = {
  title: 'Components/UserAvatar',
  component: UserAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
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
    size: 'small',
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
    size: 'large',
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
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
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
        size="small"
      />
      <UserAvatar
        user={{
          name: 'Mike Chen',
          role: 'Product Manager',
          department: 'Product',
          email: 'mike.chen@company.com',
        }}
        size="small"
      />
      <UserAvatar
        user={{
          name: 'Emily Rodriguez',
          role: 'UX Designer',
          department: 'Design',
          email: 'emily.rodriguez@company.com',
        }}
        size="small"
      />
      <UserAvatar
        user={{
          name: 'David Kim',
          role: 'Security Engineer',
          department: 'Security',
          email: 'david.kim@company.com',
        }}
        size="small"
      />
    </div>
  ),
}; 