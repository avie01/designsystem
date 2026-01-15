import React, { useState, useRef, useEffect } from 'react';
import Icon from '../Icon/Icon';
import Checkbox from '../Checkbox/Checkbox';
import Badge from '../Badge/Badge';
import IconButton from '../IconButton/IconButton';
import { PopupMenuItem } from '../PopupMenu/PopupMenu';
import { ODLTheme } from '../../styles/ODLTheme';
import { useTheme } from '../../../.storybook/theme-decorator';

const ODLSpacing = ODLTheme.spacing;
const ODLTypography = ODLTheme.typography;

export interface ListItem {
  id: string;
  label: string;
  icon?: string | React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  children?: ListItem[];
  expanded?: boolean;
  /** Optional caption/description text (shown in large size) */
  caption?: string;
  /** Action menu items for the item (used with withActions prop) */
  actions?: PopupMenuItem[];
}

export interface ListProps {
  /** Array of list items */
  items: ListItem[];
  /** Size variant of the list */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the list allows selection */
  selectable?: boolean;
  /** Whether the list allows multiple selection */
  multiSelect?: boolean;
  /** Whether to show hierarchical items */
  hierarchical?: boolean;
  /** Callback when an item is selected */
  onItemClick?: (item: ListItem) => void;
  /** Callback when selection changes */
  onSelectionChange?: (selectedItems: ListItem[]) => void;
  /** Additional CSS classes */
  className?: string;
  /** Custom item renderer */
  renderItem?: (item: ListItem, level: number) => React.ReactNode;
  /** Whether to show expand/collapse icons for hierarchical items */
  showExpandIcons?: boolean;
  /** ARIA label for the listbox - required for accessibility */
  ariaLabel?: string;
  /** Whether to show checkboxes for multi-select mode */
  showCheckboxes?: boolean;
  /** Whether the list items are draggable for reordering */
  draggable?: boolean;
  /** Callback when items are reordered via drag and drop */
  onReorder?: (reorderedItems: ListItem[]) => void;
  /** Whether to show action menu buttons on list items */
  withActions?: boolean;
}

const List: React.FC<ListProps> = ({
  items,
  size = 'md',
  selectable = true,
  multiSelect = false,
  hierarchical = false,
  onItemClick,
  onSelectionChange,
  className = '',
  showExpandIcons = true,
  ariaLabel = 'List',
  showCheckboxes = false,
  showBadges = false,
  draggable = false,
  onReorder,
  withActions = false,
}) => {
  const { colors } = useTheme();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [focusedItemId, setFocusedItemId] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragOverItemId, setDragOverItemId] = useState<string | null>(null);
  const [internalItems, setInternalItems] = useState<ListItem[]>(items);

  useEffect(() => {
    setInternalItems(items);
  }, [items]);

  // Inject dynamic styles for theme-aware colors
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .list-item:hover:not(.list-item--disabled) {
        background-color: ${colors.grey400} !important;
      }
      .list-item:focus-visible {
        outline: 2px solid ${colors.primaryMain} !important;
        outline-offset: 2px !important;
      }
      .list-item--selected {
        background-color: ${colors.selectedLight} !important;
        border-left: 4px solid ${colors.primaryMain} !important;
      }
      .list-item--selected:hover {
        background-color: ${colors.grey400} !important;
      }
      .list-expand-icon:hover {
        color: ${colors.primaryMain} !important;
      }
      .list-item--dragging {
        opacity: 0.5 !important;
        background-color: ${colors.grey300} !important;
      }
      .list-item--drag-over {
        border-top: 2px solid ${colors.primaryMain} !important;
      }
      .list-drag-handle {
        cursor: grab !important;
      }
      .list-drag-handle:active {
        cursor: grabbing !important;
      }
      .list-drag-handle:hover {
        color: ${colors.primaryMain} !important;
      }
    `;
    document.head.appendChild(style);
    styleRef.current = style;

    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [colors]);

  // Initialize selected items from props
  const initialSelected = new Set(
    items.filter(item => item.selected).map(item => item.id)
  );
  const [selectedItems, setSelectedItems] = useState<Set<string>>(initialSelected);

  // Flatten list for keyboard navigation
  const getAllItemIds = (itemList: ListItem[]): string[] => {
    return itemList.reduce((acc: string[], item: ListItem) => {
      acc.push(item.id);
      if (hierarchical && item.children && expandedItems.has(item.id)) {
        acc.push(...getAllItemIds(item.children));
      }
      return acc;
    }, []);
  };

  const handleListKeyDown = (e: React.KeyboardEvent) => {
    const allItemIds = getAllItemIds(items);
    const currentIndex = allItemIds.indexOf(focusedItemId || '');

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = Math.min(currentIndex + 1, allItemIds.length - 1);
      setFocusedItemId(allItemIds[nextIndex]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = Math.max(currentIndex - 1, 0);
      setFocusedItemId(allItemIds[prevIndex]);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const focusedItem = flattenItems(items).find(item => item.id === focusedItemId);
      if (focusedItem) {
        handleItemClick(focusedItem);
      }
    }
  };

  const flattenItems = (itemList: ListItem[]): ListItem[] => {
    return itemList.reduce((acc: ListItem[], item: ListItem) => {
      acc.push(item);
      if (hierarchical && item.children && expandedItems.has(item.id)) {
        acc.push(...flattenItems(item.children));
      }
      return acc;
    }, []);
  };

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItemId(itemId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', itemId);
  };

  const handleDragEnd = () => {
    setDraggedItemId(null);
    setDragOverItemId(null);
  };

  const handleDragOver = (e: React.DragEvent, itemId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (itemId !== draggedItemId) {
      setDragOverItemId(itemId);
    }
  };

  const handleDragLeave = () => {
    setDragOverItemId(null);
  };

  const handleDrop = (e: React.DragEvent, targetItemId: string) => {
    e.preventDefault();
    if (!draggedItemId || draggedItemId === targetItemId) {
      setDraggedItemId(null);
      setDragOverItemId(null);
      return;
    }

    const draggedIndex = internalItems.findIndex(item => item.id === draggedItemId);
    const targetIndex = internalItems.findIndex(item => item.id === targetItemId);

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedItemId(null);
      setDragOverItemId(null);
      return;
    }

    const newItems = [...internalItems];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);

    setInternalItems(newItems);
    setDraggedItemId(null);
    setDragOverItemId(null);

    if (onReorder) {
      onReorder(newItems);
    }
  };

  const handleItemClick = (item: ListItem) => {
    if (item.disabled) return;

    // Handle selection
    if (selectable) {
      const newSelected = new Set<string>(selectedItems);
      
      if (multiSelect) {
        if (newSelected.has(item.id)) {
          newSelected.delete(item.id);
        } else {
          newSelected.add(item.id);
        }
      } else {
        newSelected.clear();
        newSelected.add(item.id);
      }
      
      setSelectedItems(newSelected);
      
      if (onSelectionChange) {
        const selectedItemsArray = items.filter(i => newSelected.has(i.id));
        onSelectionChange(selectedItemsArray);
      }
    }

    if (onItemClick) {
      onItemClick(item);
    }
  };

  const renderListItem = (item: ListItem & { _isLastChild?: boolean }, level: number = 0): React.ReactNode => {
    const isSelected = selectedItems.has(item.id);
    const isExpanded = expandedItems.has(item.id);
    const isFocused = focusedItemId === item.id;
    const hasChildren = hierarchical && item.children && item.children.length > 0;
    const isDragging = draggedItemId === item.id;
    const isDragOver = dragOverItemId === item.id;

    const itemStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      position: 'relative',
      borderBottom: item._isLastChild ? 'none' : `1px solid ${colors.grey400}`,
      borderLeft: isSelected ? `4px solid ${colors.primaryMain}` : '4px solid transparent',
      borderTop: isDragOver ? `2px solid ${colors.primaryMain}` : '2px solid transparent',
      cursor: item.disabled ? 'not-allowed' : 'pointer',
      fontSize: size === 'sm' ? ODLTypography.fontSize.sm : size === 'lg' ? ODLTypography.fontSize.md : ODLTypography.fontSize.base,
      fontWeight: ODLTypography.fontWeight.normal,
      color: item.disabled ? colors.grey600 : colors.textPrimary,
      transition: 'all 0.2s ease',
      boxSizing: 'border-box',
      paddingLeft: isSelected ? `${level * parseInt(ODLSpacing['5']) + 20 - 4}px` : `${level * parseInt(ODLSpacing['5']) + 16}px`,
      paddingRight: '16px',
      paddingTop: size === 'sm' ? ODLSpacing['1'] : size === 'lg' ? ODLSpacing['4'] : ODLSpacing['3'],
      paddingBottom: size === 'sm' ? ODLSpacing['1'] : size === 'lg' ? ODLSpacing['4'] : ODLSpacing['3'],
      minHeight: size === 'sm' ? '30px' : size === 'lg' ? '52px' : '42px',
      backgroundColor: item.disabled ? 'transparent' : isSelected ? colors.selectedLight : 'transparent',
      opacity: isDragging ? 0.5 : 1,
    };

    return (
      <React.Fragment key={item.id}>
        <div
          role="option"
          className={`list-item ${isSelected ? 'list-item--selected' : ''} ${
            item.disabled ? 'list-item--disabled' : ''
          } ${isDragging ? 'list-item--dragging' : ''} ${isDragOver ? 'list-item--drag-over' : ''}`}
          style={itemStyles}
          onClick={() => handleItemClick(item)}
          onMouseEnter={() => !item.disabled && setHoveredItem(item.id)}
          onMouseLeave={() => {
            setHoveredItem(null);
            if (draggable) handleDragLeave();
          }}
          onKeyDown={(e) => {
            if (item.disabled) return;
            if (e.key === 'ArrowRight' && hasChildren) {
              e.preventDefault();
              if (!isExpanded) {
                toggleExpanded(item.id);
              }
            } else if (e.key === 'ArrowLeft' && hasChildren) {
              e.preventDefault();
              if (isExpanded) {
                toggleExpanded(item.id);
              }
            }
          }}
          tabIndex={isFocused ? 0 : -1}
          onFocus={() => setFocusedItemId(item.id)}
          onBlur={() => {
            if (isFocused) setFocusedItemId(null);
          }}
          aria-selected={isSelected}
          aria-disabled={item.disabled}
          aria-level={level + 1}
          aria-expanded={hasChildren ? isExpanded : undefined}
          draggable={draggable && !item.disabled && level === 0}
          onDragStart={draggable ? (e) => handleDragStart(e, item.id) : undefined}
          onDragEnd={draggable ? handleDragEnd : undefined}
          onDragOver={draggable ? (e) => handleDragOver(e, item.id) : undefined}
          onDrop={draggable ? (e) => handleDrop(e, item.id) : undefined}
          ref={(el) => {
            if (isFocused && el) {
              el.focus();
            }
          }}
        >
          {draggable && level === 0 && !item.disabled && (
            <span
              className="list-drag-handle"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: colors.grey600,
                marginRight: size === 'sm' ? ODLSpacing['1'] : ODLSpacing['2'],
                cursor: 'grab',
                flexShrink: 0,
              }}
              onMouseDown={(e) => e.stopPropagation()}
              aria-label="Drag to reorder"
            >
              <Icon
                name="draggable"
                size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16}
              />
            </span>
          )}
          {showCheckboxes && multiSelect && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginRight: size === 'sm' ? ODLSpacing['2'] : ODLSpacing['3'],
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleItemClick(item);
              }}
            >
              <Checkbox
                checked={isSelected}
                disabled={item.disabled}
                onChange={() => handleItemClick(item)}
                size={size}
                aria-label={`Select ${item.label}`}
              />
            </span>
          )}
          {item.icon && (
            <span 
              className="list-item-icon"
              style={{
                color: item.disabled ? colors.grey600 : isSelected ? colors.primaryMain : colors.textSecondary,
                display: 'inline-flex',
                alignItems: 'center',
                verticalAlign: 'middle',
                flexShrink: 0,
                marginRight: size === 'sm' ? ODLSpacing['1'] : size === 'lg' ? ODLSpacing['3'] : ODLSpacing['2'],
              }}
            >
              {typeof item.icon === 'string' ? (
                // Check if it's an emoji/text or an icon name
                /[\u{1F000}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{1F900}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(item.icon) ? (
                  <span style={{ fontSize: 'inherit' }}>{item.icon}</span>
                ) : (
                  <Icon 
                    name={item.icon} 
                    size={size === 'sm' ? parseInt(ODLTypography.fontSize.sm) : 
                          size === 'lg' ? parseInt(ODLTypography.fontSize.md) : 
                          20} 
                  />
                )
              ) : (
                item.icon
              )}
            </span>
          )}
          <div 
            className="list-item-content"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              verticalAlign: 'middle',
              overflow: 'hidden',
            }}
          >
            <span 
              className="list-item-label"
              style={{
                display: 'inline',
                verticalAlign: 'middle',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >{item.label}</span>
            {item.caption && size === 'lg' && (
              <span 
                className="list-item-caption"
                style={{
                  display: 'block',
                  fontSize: ODLTypography.fontSize.base,
                  color: item.disabled ? colors.grey600 : colors.textSecondary,
                  marginTop: '0px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontWeight: ODLTypography.fontWeight.normal,
                }}
              >{item.caption}</span>
            )}
          </div>
          {showBadges && item.badgeValue !== undefined && (
            <Badge
              value={item.badgeValue}
              variant={item.badgeVariant || 'blue-dark'}
            />
          )}
          {withActions && item.actions && item.actions.length > 0 && (
            <span
              className="list-item-actions"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginLeft: 'auto',
                flexShrink: 0,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <IconButton
                icon="overflow-menu-vertical"
                variant="disabled"
                size={size === 'sm' ? 'xs' : size === 'lg' ? 'medium' : 'small'}
                aria-label={`Actions for ${item.label}`}
                menuItems={item.actions}
                menuAlign="right"
                menuSize={size}
                disabled={item.disabled}
              />
            </span>
          )}
          {hasChildren && showExpandIcons && (
            <button
              type="button"
              className="list-expand-icon"
              aria-label={isExpanded ? `Collapse ${item.label}` : `Expand ${item.label}`}
              aria-expanded={isExpanded}
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(item.id);
              }}
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                right: '16px',
                color: item.disabled ? colors.grey600 : colors.textSecondary,
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                verticalAlign: 'middle',
                flexShrink: 0,
                background: 'none',
                border: 'none',
                padding: 0,
              }}
            >
              <Icon
                name={isExpanded ? "chevron-down" : "chevron-right"}
                size={size === 'sm' ? parseInt(ODLTypography.fontSize.xs) :
                      size === 'lg' ? parseInt(ODLTypography.fontSize.base) :
                      20}
                aria-hidden="true"
              />
            </button>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="list-children">
            {item.children!.map((child, index) => {
              // Remove border from last child item
              const childWithNoBorder = index === item.children!.length - 1 ? 
                { ...child, _isLastChild: true } : child;
              return renderListItem(childWithNoBorder, level + 1);
            })}
          </div>
        )}
      </React.Fragment>
    );
  };

  const containerStyles: React.CSSProperties = {
    backgroundColor: colors.paper,
    border: `1px solid ${colors.grey400}`,
    borderRadius: ODLTheme.borders.radius.base,
    fontFamily: ODLTypography.fontFamily.sans,
    overflow: 'hidden',
    listStyle: 'none',
    paddingLeft: '16px',
    paddingRight: '16px',
  };

  const itemsContainerStyles: React.CSSProperties = {
    listStyle: 'none',
    margin: '0 -16px',
    padding: 0,
  };

  const displayItems = draggable ? internalItems : items;

  return (
    <div className={`list-container list-container--${size} ${className}`} style={containerStyles}>
      <div
        role="listbox"
        className="list-items"
        aria-label={ariaLabel}
        aria-multiselectable={multiSelect}
        onKeyDown={handleListKeyDown}
        tabIndex={focusedItemId === null ? 0 : -1}
        onFocus={() => {
          if (focusedItemId === null && displayItems.length > 0) {
            setFocusedItemId(displayItems[0].id);
          }
        }}
        style={itemsContainerStyles}
      >
        {displayItems.map((item, index) => {
          // Remove border from last item
          const itemWithNoBorder = index === displayItems.length - 1 ?
            { ...item, _isLastChild: true } : item;
          return renderListItem(itemWithNoBorder);
        })}
      </div>
    </div>
  );
};

export default List;