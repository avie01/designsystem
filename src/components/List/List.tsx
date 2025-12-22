import React, { useState, useRef, useEffect } from 'react';
import Icon from '../Icon/Icon';
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
}) => {
  const { colors } = useTheme();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [focusedItemId, setFocusedItemId] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);

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

    const itemStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      position: 'relative',
      borderBottom: item._isLastChild ? 'none' : `1px solid ${colors.grey400}`,
      borderLeft: isSelected ? `4px solid ${colors.primaryMain}` : '4px solid transparent',
      cursor: item.disabled ? 'not-allowed' : 'pointer',
      fontSize: size === 'sm' ? ODLTypography.fontSize.sm : size === 'lg' ? ODLTypography.fontSize.md : ODLTypography.fontSize.base,
      fontWeight: ODLTypography.fontWeight.normal,
      color: item.disabled ? colors.textDisabled : colors.textPrimary,
      transition: 'all 0.2s ease',
      boxSizing: 'border-box',
      paddingLeft: isSelected ? `${level * parseInt(ODLSpacing['5']) + 16 - 4}px` : `${level * parseInt(ODLSpacing['5']) + 16}px`,
      paddingRight: '16px',
      paddingTop: size === 'sm' ? ODLSpacing['1'] : size === 'lg' ? ODLSpacing['4'] : ODLSpacing['3'],
      paddingBottom: size === 'sm' ? ODLSpacing['1'] : size === 'lg' ? ODLSpacing['4'] : ODLSpacing['3'],
      minHeight: size === 'sm' ? '30px' : size === 'lg' ? '52px' : '42px',
      backgroundColor: item.disabled ? 'transparent' : isSelected ? colors.selectedLight : 'transparent',
    };

    return (
      <React.Fragment key={item.id}>
        <div
          role="option"
          className={`list-item ${isSelected ? 'list-item--selected' : ''} ${
            item.disabled ? 'list-item--disabled' : ''
          }`}
          style={itemStyles}
          onClick={() => handleItemClick(item)}
          onMouseEnter={() => !item.disabled && setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
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
            <span 
              className="list-item-icon"
              style={{
                color: isSelected ? colors.primaryMain : colors.textSecondary,
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
                          parseInt(ODLTypography.fontSize.base)} 
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
                  fontSize: ODLTypography.fontSize.sm,
                  color: colors.textSecondary,
                  marginTop: ODLSpacing['1'],
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontWeight: ODLTypography.fontWeight.normal,
                }}
              >{item.caption}</span>
            )}
          </div>
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
                color: colors.textSecondary,
                cursor: 'pointer',
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
                      parseInt(ODLTypography.fontSize.sm)}
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
          if (focusedItemId === null && items.length > 0) {
            setFocusedItemId(items[0].id);
          }
        }}
        style={itemsContainerStyles}
      >
        {items.map((item, index) => {
          // Remove border from last item
          const itemWithNoBorder = index === items.length - 1 ? 
            { ...item, _isLastChild: true } : item;
          return renderListItem(itemWithNoBorder);
        })}
      </div>
    </div>
  );
};

export default List;