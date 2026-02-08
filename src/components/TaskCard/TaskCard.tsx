import React, { useState, useRef, useEffect } from 'react';
import { ODLTheme } from '../../styles/ODLTheme';
import { useTheme } from '../../../.storybook/theme-decorator';
import Icon from '../Icon/Icon';
import Chip from '../Chip/Chip';
import Checkbox from '../Checkbox/Checkbox';
import IconButton from '../IconButton/IconButton';
import Button from '../Button/Button';

export type TaskStatus = 'todo' | 'in-progress' | 'completed' | 'blocked';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';

export interface TaskCardProps {
  /** Task title */
  title: string;
  /** Task description */
  description?: React.ReactNode;
  /** Current status of the task */
  status?: TaskStatus;
  /** Priority level */
  priority?: TaskPriority;
  /** Due date string */
  dueDate?: string;
  /** Assignee name */
  assignee?: string;
  /** Assignee avatar URL */
  assigneeAvatar?: string;
  /** Tags/labels for the task */
  tags?: string[];
  /** Task type label */
  taskType?: string;
  /** Task name value */
  taskName?: string;
  /** Task description for expanded view */
  taskDescription?: string;
  /** Status chip label */
  statusLabel?: string;
  /** Workspace link */
  workspace?: { label: string; href: string };
  /** Linked document */
  linkedDocument?: { label: string; href: string };
  /** Assigned to users */
  assignedTo?: { name: string; status: string; avatar?: string }[];
  /** Show action buttons (Reject/Approve) */
  showActions?: boolean;
  /** Callback when Reject button is clicked */
  onReject?: () => void;
  /** Callback when Approve button is clicked */
  onApprove?: () => void;
  /** Whether the task is completed (shows checkbox) */
  completed?: boolean;
  /** Show checkbox for completion */
  showCheckbox?: boolean;
  /** Callback when task is clicked */
  onClick?: () => void;
  /** Callback when checkbox is toggled */
  onToggleComplete?: (completed: boolean) => void;
  /** Whether the card is disabled */
  disabled?: boolean;
  /** Whether the card is expanded by default */
  defaultExpanded?: boolean;
  /** Controlled expanded state */
  expanded?: boolean;
  /** Callback when expand state changes */
  onExpandChange?: (expanded: boolean) => void;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  status = 'todo',
  priority,
  dueDate,
  assignee,
  assigneeAvatar,
  tags = [],
  taskType,
  taskName,
  taskDescription,
  statusLabel,
  workspace,
  linkedDocument,
  assignedTo,
  showActions = false,
  onReject,
  onApprove,
  completed = false,
  showCheckbox = false,
  onClick,
  onToggleComplete,
  disabled = false,
  defaultExpanded = false,
  expanded: controlledExpanded,
  onExpandChange,
  className = '',
  style,
}) => {
  const { colors } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const [isCompact, setIsCompact] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setIsCompact(entry.contentRect.width < 300);
      }
    });

    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, []);

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newExpanded = !isExpanded;
    if (controlledExpanded === undefined) {
      setInternalExpanded(newExpanded);
    }
    onExpandChange?.(newExpanded);
  };

  const statusConfig: Record<TaskStatus, { label: string; color: string; icon: string }> = {
    'todo': { label: 'To Do', color: colors.grey500 || '#6C757D', icon: 'circle' },
    'in-progress': { label: 'In Progress', color: colors.infoMain || '#0288D1', icon: 'in-progress' },
    'completed': { label: 'Completed', color: colors.successMain || '#2E7D32', icon: 'checkmark-filled' },
    'blocked': { label: 'Blocked', color: colors.errorMain || '#D32F2F', icon: 'warning-filled' },
  };

  const priorityConfig: Record<TaskPriority, { label: string; variant: 'red' | 'orange' | 'yellow' | 'olive' }> = {
    'critical': { label: 'Critical', variant: 'red' },
    'high': { label: 'High', variant: 'orange' },
    'medium': { label: 'Medium', variant: 'yellow' },
    'low': { label: 'Low', variant: 'olive' },
  };

  const cardStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: ODLTheme.spacing[3],
    padding: ODLTheme.spacing[4],
    backgroundColor: colors.paper,
    borderRadius: 0,
    border: `1px solid ${colors.border}`,
    cursor: onClick && !disabled ? 'pointer' : 'default',
    opacity: disabled ? 0.6 : 1,
    transition: ODLTheme.transitions.base,
    boxShadow: 'none',
    ...style,
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: ODLTheme.spacing[3],
  };

  const titleContainerStyles: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: ODLTheme.typography.fontSize.base,
    fontWeight: 600,
    color: completed ? colors.textSecondary : colors.textPrimary,
    textDecoration: completed ? 'line-through' : 'none',
    margin: 0,
    lineHeight: ODLTheme.typography.lineHeight.normal,
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: ODLTheme.typography.fontSize.base,
    color: colors.textSecondary,
    margin: 0,
    lineHeight: ODLTheme.typography.lineHeight.relaxed,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };

  const metaRowStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: ODLTheme.spacing[3],
    flexWrap: 'wrap',
  };

  const statusStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: ODLTheme.spacing[1],
    fontSize: ODLTheme.typography.fontSize.xs,
    color: statusConfig[status].color,
    fontWeight: ODLTheme.typography.fontWeight.medium,
  };

  const dueDateStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: ODLTheme.spacing[1],
    fontSize: ODLTheme.typography.fontSize.xs,
    color: colors.textSecondary,
  };

  const tagsContainerStyles: React.CSSProperties = {
    display: 'flex',
    gap: ODLTheme.spacing[2],
    flexWrap: 'wrap',
  };

  const avatarStyles: React.CSSProperties = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: colors.primaryMain,
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: ODLTheme.typography.fontSize.sm,
    fontWeight: ODLTheme.typography.fontWeight.medium,
    flexShrink: 0,
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (disabled) return;
    if ((e.target as HTMLElement).closest('.task-card-checkbox')) return;
    onClick?.();
  };

  const handleCheckboxChange = (checked: boolean) => {
    if (disabled) return;
    onToggleComplete?.(checked);
  };

  return (
    <div
      ref={cardRef}
      className={`task-card ${className}`}
      style={cardStyles}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick && !disabled ? 0 : undefined}
      aria-disabled={disabled}
    >
      <div style={headerStyles}>
        {showCheckbox && (
          <div className="task-card-checkbox" onClick={e => e.stopPropagation()}>
            <Checkbox
              checked={completed}
              onChange={handleCheckboxChange}
              disabled={disabled}
            />
          </div>
        )}
        {assignee && (
          assigneeAvatar ? (
            <img
              src={assigneeAvatar}
              alt={assignee}
              style={{ ...avatarStyles, objectFit: 'cover' } as React.CSSProperties}
            />
          ) : (
            <span style={avatarStyles} title={assignee}>{getInitials(assignee)}</span>
          )
        )}
        <div style={titleContainerStyles}>
          <h3 style={titleStyles}>{title}</h3>
          {description && (
            <p style={descriptionStyles}>{description}</p>
          )}
        </div>
        <IconButton
          icon={isExpanded ? 'chevron-up' : 'chevron-down'}
          size="sm"
          variant="ghost"
          onClick={handleExpandClick}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
          aria-expanded={isExpanded}
        />
      </div>

      {isExpanded && (
        <>
          {(taskType || taskName) && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isCompact ? '1fr' : '1fr 1fr',
              gap: ODLTheme.spacing[4],
            }}>
              {taskType && (
                <div>
                  <div style={{
                    fontSize: ODLTheme.typography.fontSize.base,
                    color: colors.textPrimary,
                    fontWeight: 600,
                    marginBottom: '4px',
                  }}>
                    Task type
                  </div>
                  <div style={{
                    fontSize: ODLTheme.typography.fontSize.base,
                    color: colors.textPrimary,
                    fontWeight: 400,
                  }}>
                    {taskType}
                  </div>
                </div>
              )}
              {taskName && (
                <div>
                  <div style={{
                    fontSize: ODLTheme.typography.fontSize.base,
                    color: colors.textPrimary,
                    fontWeight: 600,
                    marginBottom: '4px',
                  }}>
                    Task Name
                  </div>
                  <div style={{
                    fontSize: ODLTheme.typography.fontSize.base,
                    color: colors.textPrimary,
                    fontWeight: 400,
                  }}>
                    {taskName}
                  </div>
                </div>
              )}
            </div>
          )}

          {(taskDescription || statusLabel) && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isCompact ? '1fr' : '1fr 1fr',
              gap: ODLTheme.spacing[4],
            }}>
              {taskDescription && (
                <div>
                  <div style={{
                    fontSize: ODLTheme.typography.fontSize.base,
                    color: colors.textPrimary,
                    fontWeight: 600,
                    marginBottom: '4px',
                  }}>
                    Description
                  </div>
                  <div style={{
                    fontSize: ODLTheme.typography.fontSize.base,
                    color: colors.textPrimary,
                    fontWeight: 400,
                  }}>
                    {taskDescription}
                  </div>
                </div>
              )}
              {statusLabel && (
                <div>
                  <div style={{
                    fontSize: ODLTheme.typography.fontSize.base,
                    color: colors.textPrimary,
                    fontWeight: 600,
                    marginBottom: '4px',
                  }}>
                    Status
                  </div>
                  <div>
                    <Chip label={statusLabel} variant="green" size="sm" />
                  </div>
                </div>
              )}
            </div>
          )}

          {(workspace || linkedDocument) && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isCompact ? '1fr' : '1fr 1fr',
              gap: ODLTheme.spacing[4],
            }}>
              {workspace && (
                <div>
                  <div style={{
                    fontSize: ODLTheme.typography.fontSize.base,
                    color: colors.textPrimary,
                    fontWeight: 600,
                    marginBottom: '4px',
                  }}>
                    Workspace
                  </div>
                  <div>
                    <a
                      href={workspace.href}
                      style={{
                        fontSize: ODLTheme.typography.fontSize.base,
                        color: colors.primaryMain,
                        fontWeight: 400,
                        textDecoration: 'none',
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {workspace.label}
                    </a>
                  </div>
                </div>
              )}
              {linkedDocument && (
                <div>
                  <div style={{
                    fontSize: ODLTheme.typography.fontSize.base,
                    color: colors.textPrimary,
                    fontWeight: 600,
                    marginBottom: '4px',
                  }}>
                    Linked to document
                  </div>
                  <div>
                    <a
                      href={linkedDocument.href}
                      style={{
                        fontSize: ODLTheme.typography.fontSize.base,
                        color: colors.primaryMain,
                        fontWeight: 400,
                        textDecoration: 'none',
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {linkedDocument.label}
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {assignedTo && assignedTo.length > 0 && (
            <div>
              <div style={{
                fontSize: ODLTheme.typography.fontSize.base,
                color: colors.textPrimary,
                fontWeight: 600,
                marginBottom: '8px',
              }}>
                Assigned to
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: ODLTheme.spacing[3],
              }}>
                {assignedTo.map((user, index) => {
                  const avatarColors = ['#0F62FE', '#6929C4', '#009D9A', '#9F1853', '#198038', '#002D9C'];
                  const avatarBgColor = avatarColors[index % avatarColors.length];
                  return (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: ODLTheme.spacing[3],
                  }}>
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          flexShrink: 0,
                        }}
                      />
                    ) : (
                      <span style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: avatarBgColor,
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: ODLTheme.typography.fontSize.sm,
                        fontWeight: 500,
                        flexShrink: 0,
                      }}>
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </span>
                    )}
                    <div>
                      <div style={{
                        fontSize: ODLTheme.typography.fontSize.base,
                        color: colors.textPrimary,
                        fontWeight: 600,
                      }}>
                        {user.name}
                      </div>
                      <div style={{
                        fontSize: ODLTheme.typography.fontSize.base,
                        color: colors.textSecondary,
                        fontWeight: 400,
                      }}>
                        {user.status}
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          )}

          {showActions && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: ODLTheme.spacing[2],
            }}>
              <Button
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  onReject?.();
                }}
              >
                Reject
              </Button>
              <Button
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  onApprove?.();
                }}
              >
                Approve
              </Button>
            </div>
          )}

          {tags.length > 0 && (
            <div style={tagsContainerStyles}>
              {tags.map((tag, index) => (
                <Chip key={index} label={tag} variant="neutral" size="sm" />
              ))}
            </div>
          )}
        </>
      )}

    </div>
  );
};

export default TaskCard;
