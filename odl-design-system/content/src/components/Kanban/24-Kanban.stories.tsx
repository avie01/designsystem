import type { Meta, StoryObj } from '@storybook/react';
import Kanban, { KanbanColumn, KanbanTask } from './Kanban';

const meta: Meta<typeof Kanban> = {
  title: 'Design System/Components/Kanban',
  component: Kanban,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Interactive Kanban board for task management with drag-and-drop functionality, priority tracking, and customizable columns. Supports both kanban and table view modes.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: false,
      table: {
        disable: true,
      },
      description: 'Array of column definitions'
    },
    tasks: {
      control: false,
      table: {
        disable: true,
      },
      description: 'Array of tasks to display'
    },
    enableDragAndDrop: {
      control: 'boolean',
      description: 'Enable drag and drop functionality'
    },
    viewType: {
      control: 'select',
      options: ['kanban', 'table'],
      description: 'Display mode for tasks'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicColumns: KanbanColumn[] = [
  { id: 'todo', label: 'To Do', icon: 'time' },
  { id: 'in_progress', label: 'In Progress', icon: 'renew' },
  { id: 'review', label: 'Review', icon: 'view' },
  { id: 'done', label: 'Done', icon: 'checkmark-filled' }
];

const developmentColumns: KanbanColumn[] = [
  { id: 'backlog', label: 'Backlog', icon: 'calendar', color: '#6B7280' },
  { id: 'sprint', label: 'Sprint', icon: 'flash', color: '#3B82F6' },
  { id: 'development', label: 'Development', icon: 'renew', color: '#8B5CF6' },
  { id: 'testing', label: 'Testing', icon: 'time', color: '#F59E0B' },
  { id: 'deployed', label: 'Deployed', icon: 'checkmark-filled', color: '#10B981' }
];

const basicTasks: KanbanTask[] = [
  {
    id: '1',
    title: 'Design new homepage',
    description: 'Create mockups for the new homepage layout',
    status: 'todo',
    priority: 'high',
    assignee: { name: 'Sarah Johnson', initials: 'SJ' },
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    progress: 0,
    tags: ['design', 'ui']
  },
  {
    id: '2',
    title: 'Implement authentication',
    description: 'Add OAuth2 authentication flow',
    status: 'in_progress',
    priority: 'urgent',
    assignee: { name: 'Mike Chen', initials: 'MC' },
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    progress: 65,
    tags: ['backend', 'security']
  },
  {
    id: '3',
    title: 'Code review PR #234',
    description: 'Review new feature implementation',
    status: 'review',
    priority: 'medium',
    assignee: { name: 'Alex Kim', initials: 'AK' },
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    progress: 100,
    tags: ['review', 'frontend']
  },
  {
    id: '4',
    title: 'Update dependencies',
    description: 'Upgrade to latest stable versions',
    status: 'done',
    priority: 'low',
    assignee: { name: 'Emma Davis', initials: 'ED' },
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    progress: 100,
    tags: ['maintenance']
  }
];

const developmentTasks: KanbanTask[] = [
  {
    id: '5',
    title: 'Refactor user service',
    description: 'Improve code quality and performance',
    status: 'backlog',
    priority: 'medium',
    assignee: { name: 'John Smith', initials: 'JS' },
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    progress: 0,
    tags: ['refactor', 'backend']
  },
  {
    id: '6',
    title: 'Add unit tests',
    description: 'Increase code coverage to 80%',
    status: 'sprint',
    priority: 'high',
    assignee: { name: 'Lisa Wong', initials: 'LW' },
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    progress: 30,
    tags: ['testing', 'quality']
  },
  {
    id: '7',
    title: 'Build dashboard component',
    description: 'Create analytics dashboard with charts',
    status: 'development',
    priority: 'urgent',
    assignee: { name: 'David Lee', initials: 'DL' },
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    progress: 45,
    tags: ['frontend', 'charts']
  },
  {
    id: '8',
    title: 'API integration testing',
    description: 'Test third-party API connections',
    status: 'testing',
    priority: 'high',
    assignee: { name: 'Rachel Green', initials: 'RG' },
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    progress: 90,
    tags: ['testing', 'integration'],
    blockers: ['Waiting for API credentials']
  },
  {
    id: '9',
    title: 'Deploy v2.1.0',
    description: 'Release new version to production',
    status: 'deployed',
    priority: 'urgent',
    assignee: { name: 'Tom Anderson', initials: 'TA' },
    progress: 100,
    tags: ['deployment', 'release']
  }
];

const priorityTasks: KanbanTask[] = [
  {
    id: '10',
    title: 'Critical security patch',
    description: 'Fix vulnerability in auth module',
    status: 'todo',
    priority: 'urgent',
    assignee: { name: 'Security Team', initials: 'ST' },
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    progress: 0,
    tags: ['security', 'urgent']
  },
  {
    id: '11',
    title: 'Performance optimization',
    description: 'Reduce page load time by 50%',
    status: 'in_progress',
    priority: 'high',
    assignee: { name: 'Performance Team', initials: 'PT' },
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    progress: 40,
    tags: ['performance']
  },
  {
    id: '12',
    title: 'Documentation update',
    description: 'Update API documentation',
    status: 'review',
    priority: 'medium',
    assignee: { name: 'Tech Writer', initials: 'TW' },
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    progress: 85,
    tags: ['docs']
  },
  {
    id: '13',
    title: 'Update color scheme',
    description: 'Refresh brand colors across app',
    status: 'done',
    priority: 'low',
    assignee: { name: 'Design Team', initials: 'DT' },
    progress: 100,
    tags: ['design', 'ui']
  }
];

export const Default: Story = {
  args: {
    columns: basicColumns,
    tasks: basicTasks,
    enableDragAndDrop: false,
    viewType: 'kanban'
  }
};

export const WithDragAndDrop: Story = {
  name: '02 With Drag And Drop',
  args: {
    columns: basicColumns,
    tasks: basicTasks,
    enableDragAndDrop: true,
    viewType: 'kanban'
  }
};

export const DevelopmentWorkflow: Story = {
  args: {
    columns: developmentColumns,
    tasks: developmentTasks,
    enableDragAndDrop: true,
    viewType: 'kanban'
  }
};

export const TableView: Story = {
  name: '04 Table View',
  args: {
    columns: basicColumns,
    tasks: basicTasks,
    enableDragAndDrop: false,
    viewType: 'table'
  }
};

export const PriorityTracking: Story = {
  args: {
    columns: basicColumns,
    tasks: priorityTasks,
    enableDragAndDrop: true,
    viewType: 'kanban'
  }
};

export const EmptyBoard: Story = {
  name: '06 Empty Board',
  args: {
    columns: basicColumns,
    tasks: [],
    enableDragAndDrop: true,
    viewType: 'kanban'
  }
};
