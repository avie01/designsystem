import React, { useState, useMemo } from 'react';
import Icon from '../components/Icon/Icon';
import Button from '../components/Button/Button';
import Dropdown from '../components/Dropdown/Dropdown';
import Input from '../components/Input/Input';
import Chip from '../components/Chip/Chip';
import Badge from '../components/Badge/Badge';
import Modal from '../components/Modal/Modal';
import Graph from '../components/Graph/Graph';
import InlineMetricCard from '../components/InlineMetricCard/InlineMetricCard';
import Kanban, { KanbanTask, KanbanColumn } from '../components/Kanban/Kanban';
import ODLTheme from '../styles/ODLTheme';
import plannerTasksData from '../data/plannerTasks.json';

// Task interface following ODL objectives - extends KanbanTask
interface Task extends KanbanTask {
  type: 'assessment' | 'review' | 'inspection' | 'meeting' | 'documentation' | 'approval';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue' | 'blocked';
  createdDate: Date;
  applicationId?: string;
  applicationTitle?: string;
  estimatedHours: number;
  actualHours?: number;
  dependencies?: string[];
  objective: string; // ODL: What this task achieves
  outcome: string; // ODL: Expected result
  assignee?: string; // Team member assigned to this task
  assigneeAvatar?: string; // Avatar URL or initials
  assigneeRole?: string; // Role of the assignee
}

// Simple tabs component from demos
interface SimpleTabItem {
  id: string;
  label: string;
  icon?: string;
  count?: number;
}

const SimpleTabs: React.FC<{
  tabs: SimpleTabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}> = ({ tabs, activeTab, onTabChange }) => (
  <div style={{
    display: 'flex',
    gap: ODLTheme.spacing[1],
    borderBottom: `1px solid ${ODLTheme.colors.border}`,
    marginBottom: ODLTheme.spacing[6]
  }}>
    {tabs.map(tab => (
      <button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        style={{
          padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
          background: activeTab === tab.id ? ODLTheme.colors.white : 'transparent',
          border: activeTab === tab.id ? `1px solid ${ODLTheme.colors.border}` : '1px solid transparent',
          borderBottom: activeTab === tab.id ? '1px solid white' : 'none',
          marginBottom: '-1px',
          borderRadius: `${ODLTheme.borders.radius.md} ${ODLTheme.borders.radius.md} 0 0`,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: ODLTheme.spacing[2],
          fontSize: ODLTheme.typography.fontSize.base,
          color: activeTab === tab.id ? ODLTheme.colors.text.primary : ODLTheme.colors.text.secondary,
          fontWeight: activeTab === tab.id ? ODLTheme.typography.fontWeight.medium : ODLTheme.typography.fontWeight.normal,
          transition: ODLTheme.transitions.base
        }}
      >
        {tab.icon && <Icon name={tab.icon as any} size={16} />}
        {tab.label}
        {tab.count !== undefined && (
          <span style={{
            background: activeTab === tab.id ? ODLTheme.colors.primary : ODLTheme.colors.surface,
            color: activeTab === tab.id ? ODLTheme.colors.white : ODLTheme.colors.text.secondary,
            padding: `0 ${ODLTheme.spacing[2]}`,
            borderRadius: ODLTheme.borders.radius.full,
            fontSize: ODLTheme.typography.fontSize.xs,
            fontWeight: ODLTheme.typography.fontWeight.semibold
          }}>
            {tab.count}
          </span>
        )}
      </button>
    ))}
  </div>
);

const TasksSchedulingPage: React.FC = () => {
  const [activeView, setActiveView] = useState<'kanban' | 'list' | 'calendar' | 'timeline'>('kanban');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Team members for workload management
  const teamMembers = [
    { id: 'unassigned', name: 'Unassigned', role: 'Pool', avatar: '🔵' },
    { id: 'john_smith', name: 'John Smith', role: 'Senior Inspector', avatar: 'JS' },
    { id: 'sarah_chen', name: 'Sarah Chen', role: 'Building Assessor', avatar: 'SC' },
    { id: 'mike_wilson', name: 'Mike Wilson', role: 'Planning Officer', avatar: 'MW' }
  ];

  // Load tasks from JSON data
  const generateTasks = (): Task[] => {
    return plannerTasksData.tasks.map((task, index) => {
      // Assign tasks to team members based on type and index
      let assigneeId = 'unassigned';
      let assignee = null;
      
      if (task.status !== 'pending') {
        // Distribute non-pending tasks among team members
        const memberIndex = (index % 3) + 1; // Skip unassigned (index 0)
        const member = teamMembers[memberIndex];
        assigneeId = member.id;
        assignee = {
          name: member.name,
          initials: member.avatar,
          avatar: member.avatar
        };
      }
      
      return {
        ...task,
        dueDate: new Date(task.dueDate),
        createdDate: new Date(task.createdDate),
        status: assigneeId, // Status field must match column ID for Kanban to show cards
        taskStatus: task.status as Task['status'], // Keep original status as separate field
        type: task.type as Task['type'],
        priority: task.priority as 'urgent' | 'high' | 'medium' | 'low',
        assignee: assignee
      };
    });
  };

  const [tasks, setTasks] = useState<Task[]>(generateTasks());

  // Handle task movement between columns (assign to team members)
  const handleTaskMove = (taskId: string, fromColumn: string, toColumn: string) => {
    const member = teamMembers.find(m => m.id === toColumn);
    if (!member) return;
    
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              status: toColumn, // Status must match the column ID
              assignee: toColumn === 'unassigned' ? null : {
                name: member.name,
                initials: member.avatar,
                avatar: member.avatar
              },
              taskStatus: toColumn === 'unassigned' ? 'pending' : 'in_progress'
            }
          : task
      )
    );
  };

  // Use all tasks without filtering
  const filteredTasks = tasks;

  // ODL: Calculate metrics for objective tracking
  const metrics = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const overdue = tasks.filter(t => t.status === 'overdue' || 
      (t.status !== 'completed' && t.dueDate < new Date())).length;
    const blocked = tasks.filter(t => t.status === 'blocked').length;
    const avgProgress = tasks.reduce((acc, t) => acc + t.progress, 0) / total;

    return { total, completed, overdue, blocked, avgProgress };
  }, [tasks]);

  // Task priority colors
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return ODLTheme.colors.error;
      case 'high': return ODLTheme.colors.warning;
      case 'medium': return ODLTheme.colors.info;
      case 'low': return ODLTheme.colors.success;
      default: return ODLTheme.colors.text.secondary;
    }
  };

  // Task status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return ODLTheme.colors.success;
      case 'in_progress': return ODLTheme.colors.info;
      case 'blocked': return ODLTheme.colors.error;
      case 'overdue': return ODLTheme.colors.error;
      case 'pending': return ODLTheme.colors.text.secondary;
      default: return ODLTheme.colors.text.tertiary;
    }
  };

  // Task type icons
  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'assessment': return 'document-tasks';
      case 'review': return 'view';
      case 'inspection': return 'location';
      case 'meeting': return 'calendar';
      case 'documentation': return 'document';
      case 'approval': return 'checkmark-filled';
      default: return 'task';
    }
  };

  // Kanban columns - first column for unassigned, rest for team members
  const kanbanColumns: KanbanColumn[] = teamMembers.map(member => ({
    id: member.id,
    label: member.id === 'unassigned' ? 'Unassigned Tasks' : member.name,
    icon: member.id === 'unassigned' ? 'user-multiple' : 'user',
    subtitle: member.role,
    color: member.id === 'unassigned' ? ODLTheme.colors.text.tertiary : ODLTheme.colors.primary
  }));


  return (
    <div style={{ 
      backgroundColor: '#EDF1F5', 
      borderRadius: '16px',
      padding: '24px',
      height: 'fit-content'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px'
      }}>
        {/* Ultra-Compact Inline Metrics - ODL: Key performance indicators */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: ODLTheme.spacing[2],
        marginBottom: ODLTheme.spacing[6]
      }}>
        <InlineMetricCard
          icon="task"
          iconColor={ODLTheme.colors.primary}
          label="Total Tasks"
          value={metrics.total}
          trend={`${metrics.avgProgress.toFixed(0)}% avg progress`}
          trendColor={ODLTheme.colors.primary}
        />

        <InlineMetricCard
          icon="checkmark-filled"
          iconColor={ODLTheme.colors.success}
          label="Completed"
          value={metrics.completed}
          trend={`${((metrics.completed / metrics.total) * 100).toFixed(0)}% completion rate`}
          trendColor={ODLTheme.colors.success}
        />

        <InlineMetricCard
          icon="warning"
          iconColor={ODLTheme.colors.error}
          label="Overdue"
          value={metrics.overdue}
          trend="Immediate attention"
          trendColor={ODLTheme.colors.error}
        />

        <InlineMetricCard
          icon="warning-alt"
          iconColor={ODLTheme.colors.warning}
          label="Blocked"
          value={metrics.blocked}
          trend="Awaiting dependencies"
          trendColor={ODLTheme.colors.warning}
        />
      </div>


      {/* Filters and Actions Bar */}
      <div style={{
        marginBottom: ODLTheme.spacing[4]
      }}>
        {/* Single row - View Switcher and Create button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: ODLTheme.spacing[3]
        }}>

          <div style={{ 
            display: 'flex', 
            border: `1px solid ${ODLTheme.colors.border}`,
            borderRadius: ODLTheme.borders.radius.base,
            overflow: 'hidden'
          }}>
            {(['kanban', 'list', 'calendar', 'timeline'] as const).map((view, index) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                style={{
                  padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[3]}`,
                  background: activeView === view ? ODLTheme.colors.primary : ODLTheme.colors.white,
                  color: activeView === view ? ODLTheme.colors.white : ODLTheme.colors.text.secondary,
                  border: 'none',
                  borderRight: index < 3 ? `1px solid ${ODLTheme.colors.border}` : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: ODLTheme.spacing[2],
                  transition: ODLTheme.transitions.base,
                  fontSize: ODLTheme.typography.fontSize.sm,
                  fontWeight: activeView === view ? ODLTheme.typography.fontWeight.medium : ODLTheme.typography.fontWeight.normal
                }}
                title={view.charAt(0).toUpperCase() + view.slice(1)}
              >
                <Icon 
                  name={
                    view === 'kanban' ? 'data-table' :
                    view === 'list' ? 'list' :
                    view === 'calendar' ? 'calendar' :
                    'time'
                  } 
                  size={16} 
                />
                <span>{view.charAt(0).toUpperCase() + view.slice(1)}</span>
              </button>
            ))}
          </div>

          <Button
            variant="primary"
            size="small"
            onClick={() => setShowCreateModal(true)}
            leftIcon="add"
            style={{ whiteSpace: 'nowrap' }}
          >
            Create Task
          </Button>
        </div>
      </div>

      {/* Kanban Board View */}
      {activeView === 'kanban' && (
        <Kanban
          columns={kanbanColumns}
          tasks={filteredTasks}
          onTaskClick={(task) => setSelectedTask(task as Task)}
          onTaskMove={handleTaskMove}
          enableDragAndDrop={true}
        />
      )}

      {/* List View */}
      {activeView === 'list' && (
        <Kanban
          columns={kanbanColumns}
          tasks={filteredTasks}
          onTaskClick={(task) => setSelectedTask(task)}
          onTaskMove={handleTaskMove}
          enableDragAndDrop={false}
          viewType="table"
        />
      )}

      {/* Calendar View Placeholder */}
      {activeView === 'calendar' && (
        <div style={{
          background: ODLTheme.colors.white,
          border: `1px solid ${ODLTheme.colors.border}`,
          borderRadius: ODLTheme.borders.radius.md,
          padding: ODLTheme.spacing[8],
          textAlign: 'center',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon name="calendar" size={48} color={ODLTheme.colors.text.tertiary} />
          <h3 style={{
            fontSize: ODLTheme.typography.fontSize.xl,
            color: ODLTheme.colors.text.secondary,
            marginTop: ODLTheme.spacing[4]
          }}>
            Calendar View
          </h3>
          <p style={{
            fontSize: ODLTheme.typography.fontSize.base,
            color: ODLTheme.colors.text.tertiary,
            marginTop: ODLTheme.spacing[2]
          }}>
            Visual calendar with task scheduling coming soon
          </p>
        </div>
      )}

      {/* Timeline View - Weekly Workload */}
      {activeView === 'timeline' && (
        <div style={{
          background: ODLTheme.colors.white,
          border: `1px solid ${ODLTheme.colors.border}`,
          borderRadius: ODLTheme.borders.radius.md,
          padding: ODLTheme.spacing[4]
        }}>
          <h3 style={{
            fontSize: ODLTheme.typography.fontSize.lg,
            color: ODLTheme.colors.text.primary,
            marginBottom: ODLTheme.spacing[4],
            fontWeight: ODLTheme.typography.fontWeight.semibold
          }}>
            Weekly Workload Timeline
          </h3>
          
          {/* Week Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: ODLTheme.spacing[4],
            padding: ODLTheme.spacing[3],
            background: ODLTheme.colors.surface,
            borderRadius: ODLTheme.borders.radius.base
          }}>
            <Button variant="ghost" size="small">
              <Icon name="arrow-left" size={16} />
              Previous Week
            </Button>
            <h4 style={{
              fontSize: ODLTheme.typography.fontSize.base,
              color: ODLTheme.colors.text.primary,
              fontWeight: ODLTheme.typography.fontWeight.medium,
              margin: 0
            }}>
              {new Date().toLocaleDateString('en-AU', { 
                month: 'long', 
                day: 'numeric' 
              })} - {new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-AU', { 
                month: 'long', 
                day: 'numeric' 
              })}
            </h4>
            <Button variant="ghost" size="small">
              Next Week
              <Icon name="arrow-right" size={16} />
            </Button>
          </div>

          {/* Weekly Timeline Grid - Only Days with Work */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: ODLTheme.spacing[3],
            marginBottom: ODLTheme.spacing[4]
          }}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              .map((day, index) => {
                const dayTasks = filteredTasks.filter(task => {
                  if (!task.dueDate) return false;
                  const taskDay = task.dueDate.getDay();
                  const mondayBasedDay = taskDay === 0 ? 6 : taskDay - 1; // Convert Sunday (0) to 6, others -1
                  return mondayBasedDay === index;
                });
                
                return { day, index, dayTasks };
              })
              .filter(({ dayTasks }) => dayTasks.length > 0) // Only show days with tasks
              .map(({ day, index, dayTasks }) => {
              
              const totalHours = dayTasks.reduce((sum, task) => sum + (task.estimatedHours || 2), 0);
              const isToday = new Date().getDay() === (index === 6 ? 0 : index + 1);
              
              return (
                <div key={day} style={{
                  background: isToday ? ODLTheme.colors.primaryLight : ODLTheme.colors.white,
                  border: `2px solid ${isToday ? ODLTheme.colors.primary : ODLTheme.colors.border}`,
                  borderRadius: ODLTheme.borders.radius.base,
                  padding: ODLTheme.spacing[3],
                  minHeight: '300px'
                }}>
                  {/* Day Header */}
                  <div style={{
                    textAlign: 'center',
                    marginBottom: ODLTheme.spacing[3],
                    paddingBottom: ODLTheme.spacing[2],
                    borderBottom: `1px solid ${ODLTheme.colors.border}`
                  }}>
                    <div style={{
                      fontSize: ODLTheme.typography.fontSize.sm,
                      fontWeight: ODLTheme.typography.fontWeight.semibold,
                      color: isToday ? ODLTheme.colors.primary : ODLTheme.colors.text.primary,
                      marginBottom: ODLTheme.spacing[1]
                    }}>
                      {day}
                    </div>
                    <div style={{
                      fontSize: ODLTheme.typography.fontSize.xs,
                      color: ODLTheme.colors.text.secondary
                    }}>
                      {totalHours}h total
                    </div>
                  </div>

                  {/* Day Tasks */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: ODLTheme.spacing[2] }}>
                    {dayTasks.slice(0, 4).map(task => (
                      <div
                        key={task.id}
                        onClick={() => setSelectedTask(task)}
                        style={{
                          background: task.priority === 'urgent' ? ODLTheme.colors.errorLight :
                                    task.priority === 'high' ? ODLTheme.colors.warningLight :
                                    task.priority === 'medium' ? ODLTheme.colors.infoLight :
                                    ODLTheme.colors.successLight,
                          border: `1px solid ${
                            task.priority === 'urgent' ? ODLTheme.colors.error :
                            task.priority === 'high' ? ODLTheme.colors.warning :
                            task.priority === 'medium' ? ODLTheme.colors.info :
                            ODLTheme.colors.success
                          }`,
                          borderRadius: ODLTheme.borders.radius.sm,
                          padding: ODLTheme.spacing[2],
                          cursor: 'pointer',
                          transition: ODLTheme.transitions.base
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-1px)';
                          e.currentTarget.style.boxShadow = ODLTheme.shadows.sm;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <div style={{
                          fontSize: ODLTheme.typography.fontSize.xs,
                          fontWeight: ODLTheme.typography.fontWeight.medium,
                          color: ODLTheme.colors.text.primary,
                          marginBottom: ODLTheme.spacing[1],
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {task.title}
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <span style={{
                            fontSize: ODLTheme.typography.fontSize.xs,
                            color: ODLTheme.colors.text.tertiary
                          }}>
                            {task.estimatedHours || 2}h
                          </span>
                          <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: task.status === 'completed' ? ODLTheme.colors.success :
                                       task.status === 'in_progress' ? ODLTheme.colors.warning :
                                       task.status === 'blocked' ? ODLTheme.colors.error :
                                       ODLTheme.colors.text.tertiary
                          }} />
                        </div>
                      </div>
                    ))}
                    {dayTasks.length > 4 && (
                      <div style={{
                        fontSize: ODLTheme.typography.fontSize.xs,
                        color: ODLTheme.colors.text.tertiary,
                        textAlign: 'center',
                        padding: ODLTheme.spacing[1]
                      }}>
                        +{dayTasks.length - 4} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Weekly Summary */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: ODLTheme.spacing[4],
            marginTop: ODLTheme.spacing[4]
          }}>
            <div style={{
              background: ODLTheme.colors.surface,
              padding: ODLTheme.spacing[4],
              borderRadius: ODLTheme.borders.radius.base
            }}>
              <h5 style={{
                fontSize: ODLTheme.typography.fontSize.sm,
                fontWeight: ODLTheme.typography.fontWeight.semibold,
                color: ODLTheme.colors.text.primary,
                marginBottom: ODLTheme.spacing[2]
              }}>
                This Week's Focus
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: ODLTheme.spacing[1] }}>
                {filteredTasks
                  .filter(t => t.priority === 'urgent' || t.priority === 'high')
                  .slice(0, 3)
                  .map(task => (
                    <div key={task.id} style={{
                      fontSize: ODLTheme.typography.fontSize.xs,
                      color: ODLTheme.colors.text.secondary
                    }}>
                      • {task.title}
                    </div>
                  ))
                }
              </div>
            </div>

            <div style={{
              background: ODLTheme.colors.surface,
              padding: ODLTheme.spacing[4],
              borderRadius: ODLTheme.borders.radius.base
            }}>
              <h5 style={{
                fontSize: ODLTheme.typography.fontSize.sm,
                fontWeight: ODLTheme.typography.fontWeight.semibold,
                color: ODLTheme.colors.text.primary,
                marginBottom: ODLTheme.spacing[2]
              }}>
                Workload Distribution
              </h5>
              <div style={{
                display: 'flex',
                height: '20px',
                borderRadius: ODLTheme.borders.radius.sm,
                overflow: 'hidden',
                marginBottom: ODLTheme.spacing[2]
              }}>
                <div style={{
                  background: ODLTheme.colors.error,
                  width: `${(tasks.filter(t => t.priority === 'urgent').length / tasks.length) * 100}%`
                }} />
                <div style={{
                  background: ODLTheme.colors.warning,
                  width: `${(tasks.filter(t => t.priority === 'high').length / tasks.length) * 100}%`
                }} />
                <div style={{
                  background: ODLTheme.colors.info,
                  width: `${(tasks.filter(t => t.priority === 'medium').length / tasks.length) * 100}%`
                }} />
                <div style={{
                  background: ODLTheme.colors.success,
                  width: `${(tasks.filter(t => t.priority === 'low').length / tasks.length) * 100}%`
                }} />
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: ODLTheme.typography.fontSize.xs,
                color: ODLTheme.colors.text.tertiary
              }}>
                <span>Urgent</span>
                <span>High</span>
                <span>Medium</span>
                <span>Low</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Task Detail Modal */}
      {selectedTask && (
        <Modal
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          title={selectedTask.title}
          size="large"
        >
          <div style={{ padding: ODLTheme.spacing[4] }}>
            {/* Task Objective - ODL Core */}
            <div style={{
              background: ODLTheme.colors.primaryLight,
              padding: ODLTheme.spacing[3],
              borderRadius: ODLTheme.borders.radius.md,
              marginBottom: ODLTheme.spacing[4]
            }}>
              <h4 style={{
                fontSize: ODLTheme.typography.fontSize.sm,
                fontWeight: ODLTheme.typography.fontWeight.semibold,
                color: ODLTheme.colors.primary,
                marginBottom: ODLTheme.spacing[2]
              }}>
                Task Objective
              </h4>
              <p style={{ fontSize: ODLTheme.typography.fontSize.base, color: ODLTheme.colors.text.primary }}>
                {selectedTask.objective}
              </p>
              <div style={{ marginTop: ODLTheme.spacing[2] }}>
                <strong style={{ fontSize: ODLTheme.typography.fontSize.sm }}>Expected Outcome:</strong>
                <p style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.secondary }}>
                  {selectedTask.outcome}
                </p>
              </div>
            </div>

            {/* Task Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: ODLTheme.spacing[4] }}>
              <div>
                <h4 style={{ fontSize: ODLTheme.typography.fontSize.sm, fontWeight: ODLTheme.typography.fontWeight.semibold, marginBottom: ODLTheme.spacing[2] }}>
                  Details
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: ODLTheme.spacing[2] }}>
                  <div>
                    <span style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.secondary }}>Type: </span>
                    <span style={{ fontSize: ODLTheme.typography.fontSize.sm }}>{selectedTask.type}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.secondary }}>Priority: </span>
                    <Chip
                      label={selectedTask.priority}
                      style={{
                        backgroundColor: getPriorityColor(selectedTask.priority) + '20',
                        color: getPriorityColor(selectedTask.priority)
                      }}
                    />
                  </div>
                  <div>
                    <span style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.secondary }}>Status: </span>
                    <Chip
                      label={selectedTask.status.replace('_', ' ')}
                      style={{
                        backgroundColor: getStatusColor(selectedTask.status) + '20',
                        color: getStatusColor(selectedTask.status)
                      }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: ODLTheme.typography.fontSize.sm, fontWeight: ODLTheme.typography.fontWeight.semibold, marginBottom: ODLTheme.spacing[2] }}>
                  Timeline
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: ODLTheme.spacing[2] }}>
                  <div>
                    <span style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.secondary }}>Created: </span>
                    <span style={{ fontSize: ODLTheme.typography.fontSize.sm }}>
                      {selectedTask.createdDate.toLocaleDateString('en-AU')}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.secondary }}>Due: </span>
                    <span style={{
                      fontSize: ODLTheme.typography.fontSize.sm,
                      color: selectedTask.dueDate < new Date() && selectedTask.status !== 'completed'
                        ? ODLTheme.colors.error
                        : ODLTheme.colors.text.primary
                    }}>
                      {selectedTask.dueDate.toLocaleDateString('en-AU')}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.secondary }}>Est. Hours: </span>
                    <span style={{ fontSize: ODLTheme.typography.fontSize.sm }}>{selectedTask.estimatedHours}h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginTop: ODLTheme.spacing[4] }}>
              <h4 style={{ fontSize: ODLTheme.typography.fontSize.sm, fontWeight: ODLTheme.typography.fontWeight.semibold, marginBottom: ODLTheme.spacing[2] }}>
                Description
              </h4>
              <p style={{ fontSize: ODLTheme.typography.fontSize.base, color: ODLTheme.colors.text.secondary }}>
                {selectedTask.description}
              </p>
            </div>

            {/* Blockers */}
            {selectedTask.blockers && selectedTask.blockers.length > 0 && (
              <div style={{
                marginTop: ODLTheme.spacing[4],
                padding: ODLTheme.spacing[3],
                background: ODLTheme.colors.errorLight,
                borderRadius: ODLTheme.borders.radius.md
              }}>
                <h4 style={{
                  fontSize: ODLTheme.typography.fontSize.sm,
                  fontWeight: ODLTheme.typography.fontWeight.semibold,
                  color: ODLTheme.colors.error,
                  marginBottom: ODLTheme.spacing[2],
                  display: 'flex',
                  alignItems: 'center',
                  gap: ODLTheme.spacing[1]
                }}>
                  <Icon name="warning" size={16} />
                  Blockers
                </h4>
                <ul style={{ margin: 0, paddingLeft: ODLTheme.spacing[4] }}>
                  {selectedTask.blockers.map((blocker, index) => (
                    <li key={index} style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.primary }}>
                      {blocker}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div style={{
              display: 'flex',
              gap: ODLTheme.spacing[3],
              marginTop: ODLTheme.spacing[6],
              paddingTop: ODLTheme.spacing[4],
              borderTop: `1px solid ${ODLTheme.colors.border}`
            }}>
              <Button variant="primary" size="small" leftIcon="edit">
                Edit Task
              </Button>
              <Button variant="secondary" size="small" leftIcon="user">
                Reassign
              </Button>
              <Button variant="ghost" size="small" leftIcon="checkmark">
                Mark Complete
              </Button>
            </div>
          </div>
        </Modal>
      )}
      </div>
    </div>
  );
};

export default TasksSchedulingPage;