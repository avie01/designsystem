import React, { useState } from 'react';
import './List.css';
import Icon from '../Icon/Icon';
import Badge from '../Badge/Badge';
import { ODLSpacing, ODLTypography } from '../../styles/ODLTheme';

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
  /** Optional badge value to display */
  badgeValue?: number | string;
  /** Optional badge variant (defaults to 'blue-dark') */
  badgeVariant?: 'brown-dark' | 'blue-dark' | 'pink-dark' | 'red-dark' | 'orange-dark' | 'yellow-dark' | 'olive-dark' | 'green-dark' | 'mint-dark' | 'purple-dark';
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
  /** Whether to show badges for items with badge values */
  showBadges?: boolean;
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
  showBadges = false,
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [focusedItemId, setFocusedItemId] = useState<string | null>(null);

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

  const handleItemClick = (item: ListItem) => {
    if (item.disabled) return;

    // Handle selection
    if (selectable) {
      const newSelected = new Set(selectedItems);
      
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

  const renderListItem = (item: ListItem, level: number = 0): React.ReactNode => {
    const isSelected = selectedItems.has(item.id);
    const isExpanded = expandedItems.has(item.id);
    const isFocused = focusedItemId === item.id;
    const hasChildren = hierarchical && item.children && item.children.length > 0;

    return (
      <React.Fragment key={item.id}>
        <div
          role="option"
          className={`list-item ${isSelected ? 'list-item--selected' : ''} ${
            item.disabled ? 'list-item--disabled' : ''
          }`}
          style={{ paddingLeft: `${level * parseInt(ODLSpacing['5']) + parseInt(ODLSpacing['2'])}px` }}
          onClick={() => handleItemClick(item)}
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
          ref={(el) => {
            if (isFocused && el) {
              el.focus();
            }
          }}
        >
          {item.icon && (
            <span className="list-item-icon">
              {typeof item.icon === 'string' ? (
                // Check if it's an emoji/text or an icon name
                /[\u{1F000}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{1F900}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(item.icon) ? (
                  <span style={{ fontSize: 'inherit' }}>{item.icon}</span>
                ) : (
                  <Icon 
                    name={item.icon} 
                    size={size === 'sm' ? parseInt(ODLTypography.fontSize.sm) : 
                          size === 'lg' ? parseInt(ODLTypography.fontSize.md) : 
                          parseInt(ODLTypography.fontSize.base)} 
                  />
                )
              ) : (
                item.icon
              )}
            </span>
          )}
          <div className="list-item-content">
            <span className="list-item-label">{item.label}</span>
            {item.caption && size === 'lg' && (
              <span className="list-item-caption">{item.caption}</span>
            )}
          </div>
          {showBadges && item.badgeValue !== undefined && (
            <Badge
              value={item.badgeValue}
              variant={item.badgeVariant || 'blue-dark'}
            />
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
            >
              <Icon
                name="chevron-right"
                size={size === 'sm' ? parseInt(ODLTypography.fontSize.xs) :
                      size === 'lg' ? parseInt(ODLTypography.fontSize.base) :
                      parseInt(ODLTypography.fontSize.sm)}
                aria-hidden="true"
                style={{
                  transition: 'transform 0.4s ease-in-out',
                  transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                  display: 'inline-block'
                }}
              />
            </button>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="list-children">
            {item.children!.map(child => renderListItem(child, level + 1))}
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className={`list-container list-container--${size} ${className}`}>
      <div
        role="listbox"
        className="list-items"
        aria-label={ariaLabel}
        aria-multiselectable={multiSelect}
        onKeyDown={handleListKeyDown}
        tabIndex={focusedItemId === null ? 0 : -1}
        onFocus={() => {
          if (focusedItemId === null && items.length > 0) {
            setFocusedItemId(items[0].id);
          }
        }}
      >
        {items.map(item => renderListItem(item))}
      </div>
    </div>
  );
};

export default List;