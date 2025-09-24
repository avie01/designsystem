import React from 'react';
import Icon from '../Icon/Icon';
import ODLTheme from '../../styles/ODLTheme';
import Table, { TableColumn } from '../Table/Table';

// Kanban interfaces
export interface KanbanTask {
  id: string;
  title: string;
  description?: string;
  priority?: 'urgent' | 'high' | 'medium' | 'low';
  status: string;
  assignee?: {
    name: string;
    initials: string;
    avatar?: string;
  };
  dueDate?: Date;
  progress?: number;
  tags?: string[];
  blockers?: string[];
  [key: string]: any; // Allow additional properties
}

export interface KanbanColumn {
  id: string;
  label: string;
  icon?: string;
  color?: string;
}

export interface KanbanProps {
  columns: KanbanColumn[];
  tasks: KanbanTask[];
  onTaskClick?: (task: KanbanTask) => void;
  onTaskMove?: (taskId: string, fromColumn: string, toColumn: string) => void;
  renderTaskCard?: (task: KanbanTask, isDragging?: boolean) => React.ReactNode;
  enableDragAndDrop?: boolean;
  className?: string;
  style?: React.CSSProperties;
  viewType?: 'kanban' | 'table';
}

// Default task card component
const DefaultTaskCard: React.FC<{ 
  task: KanbanTask; 
  onTaskClick?: (task: KanbanTask) => void;
  isDragging?: boolean;
  enableDragAndDrop?: boolean;
  onTaskMove?: (taskId: string, fromColumn: string, toColumn: string) => void;
  onDragStart?: (taskId: string) => void;
  onDragEnd?: () => void;
}> = ({ task, onTaskClick, isDragging = false, enableDragAndDrop = false, onTaskMove, onDragStart, onDragEnd }) => {
  const [draggedOver, setDraggedOver] = React.useState(false);
  
  const handleDragStart = (e: React.DragEvent) => {
    if (!enableDragAndDrop) return;
    e.dataTransfer.setData('text/plain', JSON.stringify({
      taskId: task.id,
      fromColumn: task.status
    }));
    e.dataTransfer.effectAllowed = 'move';
    onDragStart?.(task.id);
    
    // Create a properly constrained drag image
    const originalElement = e.currentTarget as HTMLElement;
    const dragImage = originalElement.cloneNode(true) as HTMLElement;
    
    // Apply fixed styling to prevent expansion
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-10000px';
    dragImage.style.left = '-10000px';
    dragImage.style.width = originalElement.offsetWidth + 'px';
    dragImage.style.maxWidth = originalElement.offsetWidth + 'px';
    dragImage.style.minWidth = originalElement.offsetWidth + 'px';
    dragImage.style.height = originalElement.offsetHeight + 'px';
    dragImage.style.opacity = '0.8';
    dragImage.style.transform = 'rotate(2deg) scale(0.9)';
    dragImage.style.pointerEvents = 'none';
    dragImage.style.zIndex = '9999';
    dragImage.style.boxSizing = 'border-box';
    
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, originalElement.offsetWidth / 2, originalElement.offsetHeight / 2);
    
    // Clean up after a brief delay
    setTimeout(() => {
      if (document.body.contains(dragImage)) {
        document.body.removeChild(dragImage);
      }
    }, 1);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (!enableDragAndDrop) return;
    onDragEnd?.();
    setDraggedOver(false);
  };
  
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'urgent': return ODLTheme.colors.error;
      case 'high': return ODLTheme.colors.warning;
      case 'medium': return ODLTheme.colors.info;
      case 'low': return ODLTheme.colors.success;
      default: return ODLTheme.colors.text.secondary;
    }
  };

  return (
    <div
      draggable={enableDragAndDrop}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => onTaskClick?.(task)}
      style={{
        background: ODLTheme.colors.white,
        border: `1px solid ${ODLTheme.colors.border}`,
        borderRadius: ODLTheme.borders.radius.md,
        padding: ODLTheme.spacing[3],
        marginBottom: ODLTheme.spacing[2],
        cursor: enableDragAndDrop ? 'grab' : (onTaskClick ? 'pointer' : 'default'),
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isDragging ? 'rotate(2deg) scale(1.02)' : 'rotate(0deg) scale(1)',
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 1000 : 1,
        boxShadow: isDragging ? ODLTheme.shadows.lg : (draggedOver ? ODLTheme.shadows.md : ODLTheme.shadows.sm),
        ':hover': {
          boxShadow: ODLTheme.shadows.md,
          transform: enableDragAndDrop ? 'translateY(-2px)' : 'none'
        }
      }}
      onMouseEnter={(e) => {
        if (onTaskClick || enableDragAndDrop) {
          e.currentTarget.style.boxShadow = ODLTheme.shadows.md;
          if (enableDragAndDrop) {
            e.currentTarget.style.transform = 'translateY(-2px)';
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!isDragging) {
          e.currentTarget.style.boxShadow = ODLTheme.shadows.sm;
          e.currentTarget.style.transform = 'translateY(0px)';
        }
      }}
      onMouseDown={(e) => {
        if (enableDragAndDrop) {
          e.currentTarget.style.cursor = 'grabbing';
        }
      }}
      onMouseUp={(e) => {
        if (enableDragAndDrop) {
          e.currentTarget.style.cursor = 'grab';
        }
      }}
    >
      {/* Priority indicator */}
      {task.priority && (
        <div style={{
          height: '3px',
          background: getPriorityColor(task.priority),
          margin: `-${ODLTheme.spacing[3]} -${ODLTheme.spacing[3]} ${ODLTheme.spacing[2]} -${ODLTheme.spacing[3]}`,
          borderRadius: `${ODLTheme.borders.radius.md} ${ODLTheme.borders.radius.md} 0 0`
        }} />
      )}

      {/* Task header */}
      <div style={{ marginBottom: ODLTheme.spacing[2] }}>
        <h4 style={{
          fontSize: ODLTheme.typography.fontSize.sm,
          fontWeight: ODLTheme.typography.fontWeight.medium,
          color: ODLTheme.colors.text.primary,
          margin: 0
        }}>
          {task.title}
        </h4>
        {task.description && (
          <p style={{
            fontSize: ODLTheme.typography.fontSize.xs,
            color: ODLTheme.colors.text.secondary,
            margin: 0,
            marginTop: ODLTheme.spacing[1]
          }}>
            {task.description}
          </p>
        )}
      </div>

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div style={{ display: 'flex', gap: ODLTheme.spacing[1], flexWrap: 'wrap', marginBottom: ODLTheme.spacing[2] }}>
          {task.tags.slice(0, 2).map(tag => (
            <span
              key={tag}
              style={{
                fontSize: ODLTheme.typography.fontSize.xs,
                background: ODLTheme.colors.primaryLight,
                color: ODLTheme.colors.primary,
                padding: `0 ${ODLTheme.spacing[2]}`,
                borderRadius: ODLTheme.borders.radius.sm
              }}
            >
              {tag}
            </span>
          ))}
          {task.tags.length > 2 && (
            <span style={{
              fontSize: ODLTheme.typography.fontSize.xs,
              color: ODLTheme.colors.text.tertiary
            }}>
              +{task.tags.length - 2}
            </span>
          )}
        </div>
      )}

      {/* Progress bar */}
      {typeof task.progress === 'number' && (
        <div style={{
          background: ODLTheme.colors.surface,
          height: '4px',
          borderRadius: ODLTheme.borders.radius.sm,
          marginBottom: ODLTheme.spacing[2],
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${task.progress}%`,
            height: '100%',
            background: task.progress === 100 ? ODLTheme.colors.success : ODLTheme.colors.primary,
            transition: 'width 0.3s ease'
          }} />
        </div>
      )}

      {/* Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: ODLTheme.typography.fontSize.xs
      }}>
        {/* Assignee */}
        {task.assignee && (
          <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[1] }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: ODLTheme.borders.radius.full,
              background: ODLTheme.colors.primary,
              color: ODLTheme.colors.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: ODLTheme.typography.fontSize.xs,
              fontWeight: ODLTheme.typography.fontWeight.semibold
            }}>
              {task.assignee.initials}
            </div>
            <span style={{ color: ODLTheme.colors.text.secondary }}>
              {task.assignee.name.split(' ')[0]}
            </span>
          </div>
        )}

        {/* Due date */}
        {task.dueDate && (
          <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[1] }}>
            <Icon name="calendar" size={12} color={ODLTheme.colors.text.tertiary} />
            <span style={{
              color: task.dueDate < new Date() 
                ? ODLTheme.colors.error 
                : ODLTheme.colors.text.tertiary
            }}>
              {task.dueDate.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
            </span>
          </div>
        )}
      </div>

      {/* Blockers indicator */}
      {task.blockers && task.blockers.length > 0 && (
        <div style={{
          marginTop: ODLTheme.spacing[2],
          padding: ODLTheme.spacing[2],
          background: ODLTheme.colors.errorLight,
          borderRadius: ODLTheme.borders.radius.sm,
          fontSize: ODLTheme.typography.fontSize.xs,
          color: ODLTheme.colors.error,
          display: 'flex',
          alignItems: 'center',
          gap: ODLTheme.spacing[1]
        }}>
          <Icon name="warning" size={12} />
          {task.blockers[0]}
        </div>
      )}
    </div>
  );
};

const Kanban: React.FC<KanbanProps> = ({
  columns,
  tasks,
  onTaskClick,
  onTaskMove,
  renderTaskCard,
  enableDragAndDrop = false,
  className,
  style,
  viewType = 'kanban'
}) => {
  const [draggedTask, setDraggedTask] = React.useState<string | null>(null);
  const [draggedOverColumn, setDraggedOverColumn] = React.useState<string | null>(null);
  
  const handleDrop = (e: React.DragEvent, targetColumn: string) => {
    e.preventDefault();
    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      const { taskId, fromColumn } = data;
      
      if (taskId && fromColumn && fromColumn !== targetColumn && onTaskMove) {
        onTaskMove(taskId, fromColumn, targetColumn);
      }
    } catch (error) {
      console.warn('Invalid drag data');
    }
    
    setDraggedTask(null);
    setDraggedOverColumn(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDraggedOverColumn(columnId);
  };

  const handleDragLeave = (e: React.DragEvent, columnId: string) => {
    // Only clear if we're actually leaving the column (not just moving to a child)
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDraggedOverColumn(null);
    }
  };

  // Table configuration
  const tableColumns: TableColumn<KanbanTask>[] = [
    {
      key: 'title',
      label: 'Task',
      width: '30%',
      render: (task) => (
        <div>
          <div style={{ 
            fontSize: ODLTheme.typography.fontSize.sm,
            fontWeight: ODLTheme.typography.fontWeight.medium,
            color: ODLTheme.colors.text.primary,
            marginBottom: ODLTheme.spacing[1]
          }}>
            {task.title}
          </div>
          {task.description && (
            <div style={{ 
              fontSize: ODLTheme.typography.fontSize.xs,
              color: ODLTheme.colors.text.secondary 
            }}>
              {task.description}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      width: '15%',
      render: (task) => {
        const column = columns.find(col => col.id === task.status);
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[1] }}>
            {column?.icon && (
              <Icon name={column.icon as any} size={14} color={column.color || ODLTheme.colors.primary} />
            )}
            <span style={{ 
              fontSize: ODLTheme.typography.fontSize.xs,
              color: column?.color || ODLTheme.colors.text.primary,
              fontWeight: ODLTheme.typography.fontWeight.medium
            }}>
              {column?.label || task.status}
            </span>
          </div>
        );
      }
    },
    {
      key: 'priority',
      label: 'Priority',
      width: '10%',
      render: (task) => {
        if (!task.priority) return null;
        const getPriorityColor = (priority: string) => {
          switch (priority) {
            case 'urgent': return ODLTheme.colors.error;
            case 'high': return ODLTheme.colors.warning;
            case 'medium': return ODLTheme.colors.info;
            case 'low': return ODLTheme.colors.success;
            default: return ODLTheme.colors.text.secondary;
          }
        };
        return (
          <span style={{
            fontSize: ODLTheme.typography.fontSize.xs,
            color: getPriorityColor(task.priority),
            fontWeight: ODLTheme.typography.fontWeight.medium,
            textTransform: 'capitalize'
          }}>
            {task.priority}
          </span>
        );
      }
    },
    {
      key: 'assignee',
      label: 'Assignee',
      width: '15%',
      render: (task) => {
        if (!task.assignee) return null;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[1] }}>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: ODLTheme.borders.radius.full,
              background: ODLTheme.colors.primary,
              color: ODLTheme.colors.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: ODLTheme.typography.fontSize.xs,
              fontWeight: ODLTheme.typography.fontWeight.semibold
            }}>
              {task.assignee.initials}
            </div>
            <span style={{ 
              fontSize: ODLTheme.typography.fontSize.xs,
              color: ODLTheme.colors.text.secondary
            }}>
              {task.assignee.name.split(' - ')[0]}
            </span>
          </div>
        );
      }
    },
    {
      key: 'progress',
      label: 'Progress',
      width: '10%',
      render: (task) => {
        if (typeof task.progress !== 'number') return null;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[2] }}>
            <div style={{
              background: ODLTheme.colors.surface,
              height: '4px',
              borderRadius: ODLTheme.borders.radius.sm,
              width: '40px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${task.progress}%`,
                height: '100%',
                background: task.progress === 100 ? ODLTheme.colors.success : ODLTheme.colors.primary,
                transition: 'width 0.3s ease'
              }} />
            </div>
            <span style={{ 
              fontSize: ODLTheme.typography.fontSize.xs,
              color: ODLTheme.colors.text.secondary,
              minWidth: '30px'
            }}>
              {task.progress}%
            </span>
          </div>
        );
      }
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      width: '10%',
      render: (task) => {
        if (!task.dueDate) return null;
        const isOverdue = task.dueDate < new Date();
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[1] }}>
            <Icon name="calendar" size={12} color={isOverdue ? ODLTheme.colors.error : ODLTheme.colors.text.tertiary} />
            <span style={{
              fontSize: ODLTheme.typography.fontSize.xs,
              color: isOverdue ? ODLTheme.colors.error : ODLTheme.colors.text.tertiary
            }}>
              {task.dueDate.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
            </span>
          </div>
        );
      }
    },
    {
      key: 'tags',
      label: 'Tags',
      width: '10%',
      render: (task) => {
        if (!task.tags || task.tags.length === 0) return null;
        return (
          <div style={{ display: 'flex', gap: ODLTheme.spacing[1], flexWrap: 'wrap' }}>
            {task.tags.slice(0, 2).map(tag => (
              <span
                key={tag}
                style={{
                  fontSize: ODLTheme.typography.fontSize.xs,
                  background: ODLTheme.colors.primaryLight,
                  color: ODLTheme.colors.primary,
                  padding: `0 ${ODLTheme.spacing[1]}`,
                  borderRadius: ODLTheme.borders.radius.sm
                }}
              >
                {tag}
              </span>
            ))}
            {task.tags.length > 2 && (
              <span style={{
                fontSize: ODLTheme.typography.fontSize.xs,
                color: ODLTheme.colors.text.tertiary
              }}>
                +{task.tags.length - 2}
              </span>
            )}
          </div>
        );
      }
    }
  ];

  if (viewType === 'table') {
    return (
      <div className={className} style={style}>
        <Table
          data={tasks}
          columns={tableColumns}
          onRowActivate={onTaskClick}
          hoverable={true}
          striped={true}
          compact={false}
          getRowKey={(task) => task.id}
        />
      </div>
    );
  }
  
  return (
    <div 
      className={className}
      style={{
        background: ODLTheme.colors.white,
        border: `1px solid ${ODLTheme.colors.border}`,
        borderRadius: ODLTheme.borders.radius.lg,
        padding: ODLTheme.spacing[4],
        boxShadow: ODLTheme.shadows.sm,
        ...style
      }}
    >
      {/* Column Headers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
        gap: '1px',
        background: ODLTheme.colors.border,
        borderRadius: ODLTheme.borders.radius.md,
        marginBottom: ODLTheme.spacing[4]
      }}>
        {columns.map((column, index) => {
          const columnTasks = tasks.filter(task => task.status === column.id);

          return (
            <div key={column.id} style={{
              background: ODLTheme.colors.surface,
              padding: ODLTheme.spacing[3],
              display: 'flex',
              alignItems: 'center',
              gap: ODLTheme.spacing[2],
              ...(index === 0 && {
                borderTopLeftRadius: ODLTheme.borders.radius.md,
                borderBottomLeftRadius: ODLTheme.borders.radius.md
              }),
              ...(index === columns.length - 1 && {
                borderTopRightRadius: ODLTheme.borders.radius.md,
                borderBottomRightRadius: ODLTheme.borders.radius.md
              })
            }}>
              {column.icon && (
                <Icon name={column.icon as any} size={16} color={ODLTheme.colors.text.secondary} />
              )}
              <h3 style={{
                fontSize: ODLTheme.typography.fontSize.sm,
                fontWeight: ODLTheme.typography.fontWeight.semibold,
                color: ODLTheme.colors.text.primary,
                margin: 0,
                flex: 1
              }}>
                {column.label}
              </h3>
              <span style={{
                background: column.color || ODLTheme.colors.primary,
                color: ODLTheme.colors.white,
                padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`,
                borderRadius: ODLTheme.borders.radius.full,
                fontSize: ODLTheme.typography.fontSize.xs,
                fontWeight: ODLTheme.typography.fontWeight.bold,
                minWidth: '24px',
                textAlign: 'center'
              }}>
                {columnTasks.length}
              </span>
            </div>
          );
        })}
      </div>

      {/* Column Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
        gap: '1px',
        background: ODLTheme.colors.border,
        borderRadius: ODLTheme.borders.radius.md,
        minHeight: '400px'
      }}>
        {columns.map((column, index) => {
          const columnTasks = tasks.filter(task => task.status === column.id);

          return (
            <div 
              key={`${column.id}-content`}
              onDrop={(e) => handleDrop(e, column.id)}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, column.id)}
              onDragLeave={(e) => handleDragLeave(e, column.id)}
              style={{
                background: draggedOverColumn === column.id ? ODLTheme.colors.primaryLight : ODLTheme.colors.white,
                padding: ODLTheme.spacing[3],
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: draggedOverColumn === column.id ? 'scale(1.02)' : 'scale(1)',
                boxShadow: draggedOverColumn === column.id ? 'inset 0 0 0 2px ' + ODLTheme.colors.primary : 'none',
                minHeight: '200px',
                ...(index === 0 && {
                  borderTopLeftRadius: ODLTheme.borders.radius.md,
                  borderBottomLeftRadius: ODLTheme.borders.radius.md
                }),
                ...(index === columns.length - 1 && {
                  borderTopRightRadius: ODLTheme.borders.radius.md,
                  borderBottomRightRadius: ODLTheme.borders.radius.md
                })
              }}
            >
              {columnTasks.map(task => (
                renderTaskCard ? 
                  renderTaskCard(task, draggedTask === task.id) : 
                  <DefaultTaskCard 
                    key={task.id} 
                    task={task} 
                    onTaskClick={onTaskClick}
                    isDragging={draggedTask === task.id}
                    enableDragAndDrop={enableDragAndDrop}
                    onTaskMove={onTaskMove}
                    onDragStart={setDraggedTask}
                    onDragEnd={() => setDraggedTask(null)}
                  />
              ))}
              
              {/* Drop zone indicator for empty columns */}
              {enableDragAndDrop && columnTasks.length === 0 && draggedOverColumn === column.id && (
                <div style={{
                  border: `2px dashed ${ODLTheme.colors.primary}`,
                  borderRadius: ODLTheme.borders.radius.md,
                  padding: ODLTheme.spacing[6],
                  textAlign: 'center',
                  color: ODLTheme.colors.primary,
                  fontSize: ODLTheme.typography.fontSize.sm,
                  animation: 'pulse 1s infinite'
                }}>
                  Drop task here
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Kanban;