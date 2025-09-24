import React, { useState } from 'react';
import './List.css';
import Icon from '../Icon/Icon';
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
  renderItem,
  showExpandIcons = true,
}) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  
  // Initialize selected items from props
  const initialSelected = new Set(
    items.filter(item => item.selected).map(item => item.id)
  );
  const [selectedItems, setSelectedItems] = useState<Set<string>>(initialSelected);

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
    const hasChildren = hierarchical && item.children && item.children.length > 0;

    return (
      <React.Fragment key={item.id}>
        <div
          className={`list-item ${isSelected ? 'list-item--selected' : ''} ${
            item.disabled ? 'list-item--disabled' : ''
          }`}
          style={{ paddingLeft: `${level * parseInt(ODLSpacing['5']) + parseInt(ODLSpacing['2'])}px` }}
          onClick={() => handleItemClick(item)}
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
          {hasChildren && showExpandIcons && (
            <span 
              className="list-expand-icon"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(item.id);
              }}
            >
              <Icon 
                name={isExpanded ? "chevron-down" : "chevron-right"} 
                size={size === 'sm' ? parseInt(ODLTypography.fontSize.xs) : 
                      size === 'lg' ? parseInt(ODLTypography.fontSize.base) : 
                      parseInt(ODLTypography.fontSize.sm)} 
              />
            </span>
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
      <div className="list-items">
        {items.map(item => renderListItem(item))}
      </div>
    </div>
  );
};

export default List;