import React, { useState } from 'react';
import Kanban, { KanbanTask, KanbanColumn } from '../components/Kanban/Kanban';
import Button from '../components/Button/Button';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import Modal from '../components/Modal/Modal';
import Icon from '../components/Icon/Icon';
import ODLTheme from '../styles/ODLTheme';
import styles from './TableDemo.module.css';


const KanbanDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'basic' | 'development' | 'custom'>('basic');
  const [showCode, setShowCode] = useState(false);
  const [selectedTask, setSelectedTask] = useState<KanbanTask | null>(null);
  const [viewType, setViewType] = useState<'kanban' | 'table'>('kanban');
  
  // State for drag and drop demo
  const [basicTasks, setBasicTasks] = useState<KanbanTask[]>([]);
  const [developmentTasks, setDevelopmentTasks] = useState<KanbanTask[]>([]);
  const [customTasks, setCustomTasks] = useState<KanbanTask[]>([]);

  // Sample data for demonstrations
  const basicColumns: KanbanColumn[] = [
    { id: 'todo', label: 'To Do Today', icon: 'time' },
    { id: 'in_progress', label: 'Working On', icon: 'renew' },
    { id: 'review', label: 'Waiting', icon: 'view' },
    { id: 'done', label: 'Completed', icon: 'checkmark-filled' }
  ];

  const developmentColumns: KanbanColumn[] = [
    { id: 'backlog', label: 'This Week', icon: 'calendar', color: '#6B7280' },
    { id: 'sprint', label: 'Today', icon: 'flash', color: '#3B82F6' },
    { id: 'development', label: 'In Progress', icon: 'renew', color: '#8B5CF6' },
    { id: 'testing', label: 'Waiting', icon: 'time', color: '#F59E0B' },
    { id: 'deployed', label: 'Done', icon: 'checkmark-filled', color: '#10B981' }
  ];

  // Initialize sample data
  React.useEffect(() => {
    const initialBasicTasks: KanbanTask[] = [
      {
        id: '1',
        title: 'Weekly team standup',
        description: 'Review sprint progress and plan for the week',
        status: 'todo',
        priority: 'high',
        assignee: { name: 'You', initials: 'ME' },
        dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        progress: 0,
        tags: ['meeting', 'planning']
      },
      {
        id: '2',
        title: 'Finish quarterly report',
        description: 'Complete Q4 performance analysis and recommendations',
        status: 'in_progress',
        priority: 'urgent',
        assignee: { name: 'You', initials: 'ME' },
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        progress: 75,
        tags: ['report', 'deadline']
      },
      {
        id: '3',
        title: 'Waiting for client feedback',
        description: 'Proposal sent to client, awaiting approval to proceed',
        status: 'review',
        priority: 'medium',
        assignee: { name: 'You', initials: 'ME' },
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        progress: 100,
        tags: ['client', 'proposal']
      },
      {
        id: '4',
        title: 'Update portfolio website',
        description: 'Add recent projects and refresh design elements',
        status: 'done',
        priority: 'low',
        assignee: { name: 'You', initials: 'ME' },
        dueDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
        progress: 100,
        tags: ['personal', 'portfolio']
      }
    ];
    
    const initialDevelopmentTasks: KanbanTask[] = [
    {
      id: '5',
      title: 'Prepare for client presentation',
      description: 'Create slides and demo for Friday presentation',
      status: 'backlog',
      priority: 'medium',
      assignee: { name: 'You', initials: 'ME' },
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      progress: 0,
      tags: ['presentation', 'client']
    },
    {
      id: '6',
      title: 'Coffee with marketing team',
      description: 'Discuss upcoming campaign collaboration',
      status: 'sprint',
      priority: 'low',
      assignee: { name: 'You', initials: 'ME' },
      dueDate: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
      progress: 0,
      tags: ['meeting', 'collaboration']
    },
    {
      id: '7',
      title: 'Code review for team member',
      description: 'Review pull request for new feature implementation',
      status: 'development',
      priority: 'high',
      assignee: { name: 'You', initials: 'ME' },
      dueDate: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
      progress: 50,
      tags: ['review', 'teamwork']
    },
    {
      id: '8',
      title: 'Waiting for server deployment',
      description: 'IT team is deploying new infrastructure',
      status: 'testing',
      priority: 'medium',
      assignee: { name: 'You', initials: 'ME' },
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      progress: 90,
      tags: ['infrastructure', 'deployment'],
      blockers: ['IT team deployment']
    },
    {
      id: '9',
      title: 'Morning email responses',
      description: 'Replied to client emails and internal messages',
      status: 'deployed',
      priority: 'urgent',
      assignee: { name: 'You', initials: 'ME' },
      progress: 100,
      tags: ['communication', 'admin']
    }
    ];
    
    setBasicTasks(initialBasicTasks);
    setDevelopmentTasks(initialDevelopmentTasks);
    setCustomTasks([...initialBasicTasks]);
  }, []);

  // Task move handlers
  const handleBasicTaskMove = (taskId: string, _fromColumn: string, toColumn: string) => {
    setBasicTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: toColumn } : task
      )
    );
  };

  const handleDevelopmentTaskMove = (taskId: string, _fromColumn: string, toColumn: string) => {
    setDevelopmentTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: toColumn } : task
      )
    );
  };

  const handleCustomTaskMove = (taskId: string, _fromColumn: string, toColumn: string) => {
    setCustomTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: toColumn } : task
      )
    );
  };


  const handleTaskClick = (task: KanbanTask) => {
    setSelectedTask(task);
  };

  const getCodeExample = () => {
    switch (selectedDemo) {
      case 'basic':
        return `import Kanban from '../components/Kanban/Kanban';

const columns = [
  { id: 'todo', label: 'To Do Today', icon: 'time' },
  { id: 'in_progress', label: 'Working On', icon: 'renew' },
  { id: 'review', label: 'Waiting', icon: 'view' },
  { id: 'done', label: 'Completed', icon: 'checkmark-filled' }
];

const [tasks, setTasks] = useState([
  {
    id: '1',
    title: 'Weekly team standup',
    description: 'Review sprint progress and plan for the week',
    status: 'todo',
    priority: 'high',
    assignee: { name: 'You', initials: 'ME' },
    dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
    progress: 0,
    tags: ['meeting', 'planning']
  }
]);

const handleTaskMove = (taskId, _fromColumn, toColumn) => {
  setTasks(prev => 
    prev.map(task => 
      task.id === taskId ? { ...task, status: toColumn } : task
    )
  );
};

<Kanban
  columns={columns}
  tasks={tasks}
  onTaskClick={handleTaskClick}
  onTaskMove={handleTaskMove}
  enableDragAndDrop={true}
/>`;

      case 'development':
        return `const weeklyColumns = [
  { id: 'backlog', label: 'This Week', icon: 'calendar', color: '#6B7280' },
  { id: 'sprint', label: 'Today', icon: 'flash', color: '#3B82F6' },
  { id: 'development', label: 'In Progress', icon: 'renew', color: '#8B5CF6' },
  { id: 'testing', label: 'Waiting', icon: 'time', color: '#F59E0B' },
  { id: 'deployed', label: 'Done', icon: 'checkmark-filled', color: '#10B981' }
];

// Time-based task organization with priority colors
<Kanban
  columns={weeklyColumns}
  tasks={tasks}
  onTaskClick={handleTaskClick}
  onTaskMove={handleTaskMove}
  enableDragAndDrop={true}
/>`;

      case 'custom':
        return `// Personal task board with custom styling
const personalTasks = [
  {
    id: '1',
    title: 'Morning email responses',
    description: 'Reply to urgent emails and set meeting agenda',
    status: 'done',
    priority: 'urgent',
    assignee: { name: 'You', initials: 'ME' },
    progress: 100,
    tags: ['communication', 'admin']
  }
];

<Kanban
  columns={columns}
  tasks={personalTasks}
  onTaskClick={handleTaskClick}
  style={{ 
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    border: '2px solid #cbd5e0'
  }}
/>`;

      default:
        return '';
    }
  };

  return (
    <div className={styles.tableDemo}>
      {/* Breadcrumb Navigation */}
      <DemoBreadcrumb componentName="Kanban Board" />
      
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>Personal Task Board</h1>
            <p>
              Organize your daily work, schedule, and personal tasks with an interactive kanban board. 
              Track your progress, manage priorities, and stay on top of your responsibilities.
            </p>
          </div>
          <div className={styles.headerActions}>
            <div style={{ display: 'flex', gap: ODLTheme.spacing[2], alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: ODLTheme.spacing[1] }}>
                <Button
                  variant={viewType === 'kanban' ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => setViewType('kanban')}
                >
                  <Icon name="view-mode-2" size={16} />
                  Kanban
                </Button>
                <Button
                  variant={viewType === 'table' ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => setViewType('table')}
                >
                  <Icon name="list" size={16} />
                  Table
                </Button>
              </div>
              <Button
                variant="primary"
                size="small"
                onClick={() => {}}
              >
                <Icon name="add" size={16} />
                Create Task
              </Button>
              <Button
                variant={showCode ? 'primary' : 'secondary'}
                size="small"
                onClick={() => setShowCode(!showCode)}
              >
                {showCode ? 'Hide Code' : 'View Code'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Selector */}
      <div className={styles.demoSelector}>
        <div className={styles.demoTabs}>
          {[
            { key: 'basic', label: 'Daily Tasks', desc: 'Your personal daily work board', icon: '📋' },
            { key: 'development', label: 'Weekly Schedule', desc: 'Time-based task organization', icon: '⚡' },
            { key: 'custom', label: 'Custom View', desc: 'Personalized styling options', icon: '🎨' }
          ].map(demo => (
            <button
              key={demo.key}
              className={`${styles.demoTab} ${selectedDemo === demo.key ? styles.active : ''}`}
              onClick={() => setSelectedDemo(demo.key as any)}
            >
              <span className={styles.demoIcon}>{demo.icon}</span>
              <div className={styles.demoTabContent}>
                <span className={styles.demoLabel}>{demo.label}</span>
                <span className={styles.demoDesc}>{demo.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.demoContent}>
        {/* Demo Content */}
        {selectedDemo === 'basic' && (
          <div>
            <div className={styles.sectionHeader}>
              <h2>My Daily Tasks</h2>
              <p>
                Track your personal work tasks and daily schedule with a simple kanban board.
              </p>
            </div>
            <Kanban
              columns={basicColumns}
              tasks={basicTasks}
              onTaskClick={handleTaskClick}
              onTaskMove={handleBasicTaskMove}
              enableDragAndDrop={viewType === 'kanban'}
              viewType={viewType}
            />
          </div>
        )}

        {selectedDemo === 'development' && (
          <div>
            <div className={styles.sectionHeader}>
              <h2>Weekly Schedule View</h2>
              <p>
                Organize your work across the week with priority-based columns and time management.
              </p>
            </div>
            <Kanban
              columns={developmentColumns}
              tasks={developmentTasks}
              onTaskClick={handleTaskClick}
              onTaskMove={handleDevelopmentTaskMove}
              enableDragAndDrop={viewType === 'kanban'}
              viewType={viewType}
            />
          </div>
        )}

        {selectedDemo === 'custom' && (
          <div>
            <div className={styles.sectionHeader}>
              <h2>Personal Task Board</h2>
              <p>
                A customized view of your tasks with personal styling and enhanced visual appeal.
              </p>
            </div>
            <Kanban
              columns={basicColumns}
              tasks={customTasks}
              onTaskClick={handleTaskClick}
              onTaskMove={handleCustomTaskMove}
              enableDragAndDrop={viewType === 'kanban'}
              viewType={viewType}
              style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                border: '2px solid #cbd5e0'
              }}
            />
          </div>
        )}

        {/* Code Example */}
        {showCode && (
          <div className={styles.codePanel}>
            <h3>Code Example</h3>
            <pre className={styles.codeBlock}>
              <code>{getCodeExample()}</code>
            </pre>
          </div>
        )}

        {/* Features Showcase */}
        <div className={styles.featuresShowcase}>
          <div className={styles.sectionHeader}>
            <h2>Personal Task Management Features</h2>
            <p>Everything you need to organize your daily work and personal schedule</p>
          </div>

          <div className={styles.featureGrid}>
            <div className={styles.featureCategory}>
              <h4>📋 Task Organization</h4>
              <ul>
                <li>✨ Drag tasks between workflow stages</li>
                <li>Daily, weekly, and custom views</li>
                <li>Priority-based color coding</li>
                <li>Due date tracking and alerts</li>
                <li>Progress monitoring</li>
                <li>Tag system for categories</li>
                <li>Blocked task indicators</li>
              </ul>
            </div>

            <div className={styles.featureCategory}>
              <h4>⏰ Time Management</h4>
              <ul>
                <li>Today vs. This Week columns</li>
                <li>Overdue task highlighting</li>
                <li>Meeting and deadline reminders</li>
                <li>Time-based prioritization</li>
                <li>Schedule visualization</li>
                <li>Work-life balance tracking</li>
              </ul>
            </div>

            <div className={styles.featureCategory}>
              <h4>📊 Productivity Insights</h4>
              <ul>
                <li>Task completion tracking</li>
                <li>Personal productivity metrics</li>
                <li>Daily accomplishment view</li>
                <li>Goal progress monitoring</li>
                <li>Workload balance analysis</li>
                <li>Time allocation overview</li>
              </ul>
            </div>

            <div className={styles.featureCategory}>
              <h4>🎨 Personal Customization</h4>
              <ul>
                <li>Custom workflow columns</li>
                <li>Personal color schemes</li>
                <li>Custom task categories</li>
                <li>Flexible board layouts</li>
                <li>Personal branding options</li>
                <li>Mobile-friendly design</li>
              </ul>
            </div>
          </div>
        </div>

        <BackToTop />
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <Modal
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          title={selectedTask.title}
          size="medium"
        >
          <div style={{ padding: ODLTheme.spacing[4] }}>
            <p><strong>Description:</strong> {selectedTask.description}</p>
            <p><strong>Status:</strong> {selectedTask.status}</p>
            <p><strong>Priority:</strong> {selectedTask.priority}</p>
            {selectedTask.assignee && (
              <p><strong>Assignee:</strong> {selectedTask.assignee.name}</p>
            )}
            {selectedTask.dueDate && (
              <p><strong>Due Date:</strong> {selectedTask.dueDate.toLocaleDateString()}</p>
            )}
            {selectedTask.progress !== undefined && (
              <p><strong>Progress:</strong> {selectedTask.progress}%</p>
            )}
            {selectedTask.tags && selectedTask.tags.length > 0 && (
              <p><strong>Tags:</strong> {selectedTask.tags.join(', ')}</p>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default KanbanDemo;