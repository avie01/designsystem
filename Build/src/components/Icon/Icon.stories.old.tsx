import type { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';
import { PlaneSea } from '@carbon/icons-react';

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'dashboard',
        'settings',
        'search',
        'security',
        'notification',
        'code',
        'document',
        'analytics',
        'chevron-right',
        'help',
        'folder',
      ],
    },
    className: {
      control: 'text',
    },
    width: {
      control: 'number',
    },
    height: {
      control: 'number',
    },
    color: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'dashboard',
    className: 'w-6 h-6',
  },
};

export const Large: Story = {
  args: {
    name: 'search',
    className: 'w-12 h-12',
  },
};

export const Colored: Story = {
  args: {
    name: 'security',
    className: 'w-8 h-8',
    color: '#3560c1',
  },
};

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-6 gap-4 p-4">
              {[
          'dashboard',
          'settings',
          'search',
          'security',
          'notification',
          'code',
          'document',
          'analytics',
          'chevron-right',
          'help',
          'folder',
        ].map((iconName) => (
        <div key={iconName} className="text-center">
          <div className="bg-gray-50 p-3 rounded-lg">
            <Icon name={iconName} className="w-8 h-8 mx-auto" />
          </div>
          <p className="text-xs mt-1 text-gray-600">{iconName}</p>
        </div>
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    name: 'help',
    className: 'w-6 h-6 cursor-pointer',
    onClick: () => alert('Icon clicked!'),
  },
}; 