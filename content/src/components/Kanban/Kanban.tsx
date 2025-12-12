import React from 'react';
import Icon from '../Icon/Icon';
import ODLTheme from '../../styles/ODLTheme';
import Table, { TableColumn } from '../Table/Table';
import styles from './Kanban.module.css';

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
  [key: string]: any;
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

const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case 'urgent': return ODLTheme.colors.error;
    case 'high': return ODLTheme.colors.warning;
    case 'medium': return ODLTheme.colors.info;
    case 'low': return ODLTheme.colors.success;
    default: return ODLTheme.colors.text.secondary;
  }
};

const DefaultTaskCard: React.FC<{
  task: KanbanTask;
  onTaskClick?: (task: KanbanTask) => void;
  isDragging?: boolean;
  enableDragAndDrop?: boolean;
  onDragStart?: (taskId: string) => void;
  onDragEnd?: () => void;
}> = ({ task, onTaskClick, isDragging = false, enableDragAndDrop = false, onDragStart, onDragEnd }) => {

  const handleDragStart = (e: React.DragEvent) => {
    if (!enableDragAndDrop) return;
    e.dataTransfer.setData('text/plain', JSON.stringify({
      taskId: task.id,
      fromColumn: task.status
    }));
    e.dataTransfer.effectAllowed = 'move';
    onDragStart?.(task.id);

    const originalElement = e.currentTarget as HTMLElement;
    const dragImage = originalElement.cloneNode(true) as HTMLElement;

    dragImage.style.cssText = `
      position: absolute;
      top: -10000px;
      left: -10000px;
      width: ${originalElement.offsetWidth}px;
      max-width: ${originalElement.offsetWidth}px;
      min-width: ${originalElement.offsetWidth}px;
      height: ${originalElement.offsetHeight}px;
      opacity: 0.8;
      transform: rotate(2deg) scale(0.9);
      pointer-events: none;
      z-index: 9999;
      box-sizing: border-box;
    `;

    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, originalElement.offsetWidth / 2, originalElement.offsetHeight / 2);

    setTimeout(() => {
      if (document.body.contains(dragImage)) {
        document.body.removeChild(dragImage);
      }
    }, 1);
  };

  const handleDragEnd = () => {
    if (!enableDragAndDrop) return;
    onDragEnd?.();
  };

  const cardClasses = [
    styles.taskCard,
    enableDragAndDrop && styles.taskCardDraggable,
    isDragging && styles.taskCardDragging
  ].filter(Boolean).join(' ');

  return (
    <div
      draggable={enableDragAndDrop}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => onTaskClick?.(task)}
      className={cardClasses}
    >
      {task.priority && (
        <div
          className={styles.priorityIndicator}
          style={{ background: getPriorityColor(task.priority) }}
        />
      )}

      <div className={styles.taskHeader}>
        <h4 className={styles.taskTitle}>{task.title}</h4>
        {task.description && (
          <p className={styles.taskDescription}>{task.description}</p>
        )}
      </div>

      {task.tags && task.tags.length > 0 && (
        <div className={styles.tagsContainer}>
          {task.tags.slice(0, 2).map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
          {task.tags.length > 2 && (
            <span className={styles.tagOverflow}>+{task.tags.length - 2}</span>
          )}
        </div>
      )}

      {typeof task.progress === 'number' && (
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${task.progress}%`,
              background: task.progress === 100 ? ODLTheme.colors.success : ODLTheme.colors.primary
            }}
          />
        </div>
      )}

      <div className={styles.taskFooter}>
        {task.assignee && (
          <div className={styles.assignee}>
            <div className={styles.assigneeAvatar}>{task.assignee.initials}</div>
            <span className={styles.assigneeName}>{task.assignee.name.split(' ')[0]}</span>
          </div>
        )}

        {task.dueDate && (
          <div className={styles.dueDate}>
            <Icon name="calendar" size={12} color={ODLTheme.colors.text.tertiary} />
            <span className={task.dueDate < new Date() ? styles.dueDateOverdue : styles.dueDateText}>
              {task.dueDate.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
            </span>
          </div>
        )}
      </div>

      {task.blockers && task.blockers.length > 0 && (
        <div className={styles.blockerIndicator}>
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

  const handleDragLeave = (e: React.DragEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const { clientX: x, clientY: y } = e;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDraggedOverColumn(null);
    }
  };

  const tableColumns: TableColumn<KanbanTask>[] = [
    {
      key: 'title',
      label: 'Task',
      width: '30%',
      render: (task) => (
        <div>
          <div className={styles.tableTaskTitle}>{task.title}</div>
          {task.description && (
            <div className={styles.tableTaskDescription}>{task.description}</div>
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
          <div className={styles.tableStatus}>
            {column?.icon && (
              <Icon name={column.icon as any} size={14} color={column.color || ODLTheme.colors.primary} />
            )}
            <span
              className={styles.tableStatusLabel}
              style={{ color: column?.color || ODLTheme.colors.text.primary }}
            >
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
        return (
          <span
            className={styles.tablePriority}
            style={{ color: getPriorityColor(task.priority) }}
          >
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
          <div className={styles.tableAssignee}>
            <div className={styles.tableAssigneeAvatar}>{task.assignee.initials}</div>
            <span className={styles.tableAssigneeName}>{task.assignee.name.split(' - ')[0]}</span>
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
          <div className={styles.tableProgress}>
            <div className={styles.tableProgressBar}>
              <div
                className={styles.progressFill}
                style={{
                  width: `${task.progress}%`,
                  background: task.progress === 100 ? ODLTheme.colors.success : ODLTheme.colors.primary
                }}
              />
            </div>
            <span className={styles.tableProgressText}>{task.progress}%</span>
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
          <div className={styles.tableDueDate}>
            <Icon name="calendar" size={12} color={isOverdue ? ODLTheme.colors.error : ODLTheme.colors.text.tertiary} />
            <span
              className={styles.tableDueDateText}
              style={{ color: isOverdue ? ODLTheme.colors.error : ODLTheme.colors.text.tertiary }}
            >
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
          <div className={styles.tableTags}>
            {task.tags.slice(0, 2).map(tag => (
              <span key={tag} className={styles.tableTag}>{tag}</span>
            ))}
            {task.tags.length > 2 && (
              <span className={styles.tagOverflow}>+{task.tags.length - 2}</span>
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
    <div className={`${styles.kanbanBoard} ${className || ''}`} style={style}>
      <div
        className={styles.columnHeaders}
        style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
      >
        {columns.map((column) => {
          const columnTasks = tasks.filter(task => task.status === column.id);
          return (
            <div key={column.id} className={styles.columnHeader}>
              {column.icon && (
                <Icon name={column.icon as any} size={16} color={ODLTheme.colors.text.secondary} />
              )}
              <h3 className={styles.columnTitle}>{column.label}</h3>
              <span
                className={styles.columnCount}
                style={{ background: column.color || ODLTheme.colors.primary }}
              >
                {columnTasks.length}
              </span>
            </div>
          );
        })}
      </div>

      <div
        className={styles.columnContent}
        style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
      >
        {columns.map((column) => {
          const columnTasks = tasks.filter(task => task.status === column.id);
          const columnClasses = [
            styles.column,
            draggedOverColumn === column.id && styles.columnDragOver
          ].filter(Boolean).join(' ');

          return (
            <div
              key={`${column.id}-content`}
              onDrop={(e) => handleDrop(e, column.id)}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, column.id)}
              onDragLeave={handleDragLeave}
              className={columnClasses}
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
                    onDragStart={setDraggedTask}
                    onDragEnd={() => setDraggedTask(null)}
                  />
              ))}

              {enableDragAndDrop && columnTasks.length === 0 && draggedOverColumn === column.id && (
                <div className={styles.dropZone}>Drop task here</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Kanban;
