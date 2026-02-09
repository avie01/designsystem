import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import TaskCard from './TaskCard';
import Chip from '../Chip/Chip';

const meta: Meta<typeof TaskCard> = {
  title: 'Design System/Components/TaskCard',
  component: TaskCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'TaskCard component for displaying task information including title, description, status, priority, due dates, and assignees. Ideal for task management interfaces, kanban boards, and to-do lists.',
      },
    },
  },
  tags: ['autodocs', 'Ready for dev'],
  args: {
    title: 'Sample Task',
    status: 'todo',
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The task title',
    },
    description: {
      control: 'text',
      description: 'Optional task description',
    },
    status: {
      control: 'select',
      options: ['todo', 'in-progress', 'completed', 'blocked'],
      description: 'Current status of the task',
    },
    priority: {
      control: 'select',
      options: ['low', 'medium', 'high', 'critical'],
      description: 'Priority level of the task',
    },
    dueDate: {
      control: 'text',
      description: 'Due date string',
    },
    assignee: {
      control: 'text',
      description: 'Name of the assignee',
    },
    completed: {
      control: 'boolean',
      description: 'Whether the task is completed',
    },
    showCheckbox: {
      control: 'boolean',
      description: 'Show completion checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the card is disabled',
    },
    defaultExpanded: {
      control: 'boolean',
      description: 'Whether the card is expanded by default',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '01 Default',
  args: {
    title: 'Review pull request',
    description: (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        Approval - Due 28 Feb 2026, 11:01 AM
        <Chip label="Open" variant="green" size="sm" />
      </span>
    ),
    status: 'todo',
    priority: 'medium',
    dueDate: 'Feb 15, 2026',
    assignee: 'John Doe',
    defaultExpanded: true,
    taskType: 'Approval',
    taskName: 'Review and approve',
    taskDescription: 'This task requires a thorough review of all submitted documents and verification of compliance with company standards before final approval can be granted.',
    statusLabel: 'Open',
    workspace: { label: 'North Shire City Council', href: '#' },
    linkedDocument: { label: 'Policy Document', href: '#' },
    assignedTo: [
      { name: 'Scott Marshall', status: 'Not started' },
      { name: 'Emily Chen', status: 'In progress' },
    ],
    showActions: true,
  },
  render: (args) => (
    <TaskCard
      {...args}
      onReject={() => alert('Rejected')}
      onApprove={() => alert('Approved')}
    />
  ),
};

export const AllStatuses: Story = {
  name: '02 All Statuses',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
      <TaskCard
        title="New feature request"
        description="Implement dark mode toggle in settings."
        status="todo"
        priority="medium"
        dueDate="Feb 20, 2026"
      />
      <TaskCard
        title="API integration"
        description="Connect to the payment gateway service."
        status="in-progress"
        priority="high"
        dueDate="Feb 12, 2026"
        assignee="Jane Smith"
      />
      <TaskCard
        title="Documentation update"
        description="Update README with new installation steps."
        status="completed"
        priority="low"
        assignee="Bob Wilson"
      />
      <TaskCard
        title="Security audit"
        description="Waiting for third-party security review."
        status="blocked"
        priority="critical"
        dueDate="Feb 10, 2026"
        assignee="Alice Brown"
      />
    </div>
  ),
};

export const AllPriorities: Story = {
  name: '03 All Priorities',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
      <TaskCard
        title="Critical bug fix"
        description="Production server crashing on user login."
        status="in-progress"
        priority="critical"
        dueDate="Today"
        assignee="DevOps Team"
      />
      <TaskCard
        title="Performance optimization"
        description="Reduce page load time by 50%."
        status="todo"
        priority="high"
        dueDate="Feb 14, 2026"
      />
      <TaskCard
        title="UI improvements"
        description="Update button styles across the app."
        status="todo"
        priority="medium"
        dueDate="Feb 28, 2026"
      />
      <TaskCard
        title="Code cleanup"
        description="Remove deprecated utility functions."
        status="todo"
        priority="low"
      />
    </div>
  ),
};

export const WithCheckbox: Story = {
  name: '04 With Checkbox',
  render: () => {
    const [tasks, setTasks] = React.useState([
      { id: 1, title: 'Set up development environment', completed: true },
      { id: 2, title: 'Create project structure', completed: true },
      { id: 3, title: 'Implement core components', completed: false },
      { id: 4, title: 'Write unit tests', completed: false },
      { id: 5, title: 'Deploy to staging', completed: false },
    ]);

    const toggleTask = (id: number, completed: boolean) => {
      setTasks(tasks.map(task =>
        task.id === id ? { ...task, completed } : task
      ));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
        <h4 style={{ marginBottom: '8px', fontSize: '16px', fontWeight: 600 }}>Project Setup Checklist</h4>
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            title={task.title}
            showCheckbox
            completed={task.completed}
            onToggleComplete={(completed) => toggleTask(task.id, completed)}
            status={task.completed ? 'completed' : 'todo'}
          />
        ))}
      </div>
    );
  },
};

export const WithTags: Story = {
  name: '05 With Tags',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
      <TaskCard
        title="Build login component"
        description="Create reusable login form with validation."
        status="in-progress"
        priority="high"
        tags={['Frontend', 'React', 'Auth']}
        assignee="Sarah Chen"
        dueDate="Feb 16, 2026"
      />
      <TaskCard
        title="Database migration"
        description="Migrate user data to new schema."
        status="todo"
        priority="critical"
        tags={['Backend', 'PostgreSQL', 'Migration']}
        assignee="Mike Johnson"
        dueDate="Feb 12, 2026"
      />
      <TaskCard
        title="Write API documentation"
        description="Document all REST endpoints with examples."
        status="completed"
        priority="medium"
        tags={['Docs', 'API']}
        assignee="Emily Davis"
      />
    </div>
  ),
};

export const Clickable: Story = {
  name: '06 Clickable Cards',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
      <TaskCard
        title="Design review meeting"
        description="Review new dashboard mockups with the team."
        status="todo"
        priority="medium"
        dueDate="Feb 11, 2026"
        assignee="Design Team"
        onClick={() => alert('Opening task details...')}
      />
      <TaskCard
        title="Sprint planning"
        description="Plan tasks for the upcoming sprint."
        status="in-progress"
        priority="high"
        dueDate="Feb 10, 2026"
        onClick={() => alert('Opening task details...')}
      />
      <TaskCard
        title="Disabled task"
        description="This task cannot be interacted with."
        status="blocked"
        disabled
        onClick={() => alert('This should not fire')}
      />
    </div>
  ),
};

export const MinimalCards: Story = {
  name: '07 Minimal Cards',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '350px' }}>
      <h4 style={{ marginBottom: '8px', fontSize: '16px', fontWeight: 600 }}>Quick Tasks</h4>
      <TaskCard title="Reply to client email" status="todo" />
      <TaskCard title="Update project timeline" status="in-progress" />
      <TaskCard title="Submit expense report" status="completed" />
      <TaskCard title="Schedule team sync" status="todo" />
    </div>
  ),
};

export const KanbanExample: Story = {
  name: '08 Kanban Board Example',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', minWidth: '900px' }}>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600, color: '#6C757D' }}>TO DO (3)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <TaskCard
            title="Research competitors"
            description="Analyze top 5 competitors in the market."
            status="todo"
            priority="medium"
            tags={['Research']}
          />
          <TaskCard
            title="Create wireframes"
            status="todo"
            priority="high"
            assignee="Lisa Park"
            dueDate="Feb 18, 2026"
          />
          <TaskCard
            title="Set up CI/CD"
            description="Configure GitHub Actions for automated deployments."
            status="todo"
            priority="medium"
            tags={['DevOps']}
          />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600, color: '#0288D1' }}>IN PROGRESS (2)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <TaskCard
            title="Implement search"
            description="Add full-text search to the products page."
            status="in-progress"
            priority="high"
            assignee="Tom Lee"
            dueDate="Feb 14, 2026"
            tags={['Frontend', 'Search']}
          />
          <TaskCard
            title="User testing"
            description="Conduct usability tests with 5 users."
            status="in-progress"
            priority="medium"
            assignee="UX Team"
          />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: 600, color: '#2E7D32' }}>COMPLETED (2)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <TaskCard
            title="Design system setup"
            status="completed"
            priority="high"
            assignee="Design Team"
            tags={['Design']}
          />
          <TaskCard
            title="Project kickoff"
            status="completed"
            assignee="Project Manager"
          />
        </div>
      </div>
    </div>
  ),
};

export const Playground: Story = {
  name: '09 Playground',
  args: {
    title: 'Interactive Task Card',
    description: 'Use the controls panel to customize this task card and see all available options.',
    status: 'todo',
    priority: 'medium',
    dueDate: 'Feb 20, 2026',
    assignee: 'Your Name',
    tags: ['Storybook', 'Demo'],
    showCheckbox: true,
    completed: false,
    disabled: false,
  },
};
