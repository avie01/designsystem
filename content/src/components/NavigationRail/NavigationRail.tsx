import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import './NavigationRail.css';

export interface MenuItem {
  /** Unique identifier for the menu item */
  id: string;
  /** Icon name to display */
  iconName: string;
  /** Display label for the menu item */
  label: string;
  /** Navigation path */
  path: string;
  /** Optional description for tooltips */
  description?: string;
  /** Optional keyboard shortcut */
  shortcut?: string;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Child menu items */
  children?: MenuItem[];
}

export interface NavigationRailProps {
  /** Current active path */
  currentPath: string;
  /** Callback when navigation occurs */
  onNavigate: (path: string) => void;
  /** Array of menu items to display */
  menuItems: MenuItem[];
  /** Whether the rail is collapsed (shows only icons) */
  collapsed?: boolean;
  /** Whether to show tooltips on hover */
  showTooltips?: boolean;
  /** Position of the navigation rail */
  position?: 'left' | 'right';
  /** Theme variant */
  theme?: 'light' | 'dark';
  /** Whether to show help icon at bottom */
  showHelpIcon?: boolean;
  /** Callback for help icon click */
  onHelpClick?: () => void;
  /** Whether to show collapse toggle */
  showCollapseToggle?: boolean;
  /** Callback for collapse toggle */
  onCollapseToggle?: (collapsed: boolean) => void;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label */
  'aria-label'?: string;
}

const NavigationRail: React.FC<NavigationRailProps> = ({
  currentPath,
  onNavigate,
  menuItems = [],
  collapsed = false,
  showTooltips = true,
  position = 'left',
  theme = 'light',
  showHelpIcon = false,
  onHelpClick,
  showCollapseToggle = false,
  onCollapseToggle,
  size = 'md',
  disabled = false,
  error = false,
  className = '',
  'aria-label': ariaLabel
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [helpHovered, setHelpHovered] = useState(false);
  const [chevronHovered, setChevronHovered] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const menuContainerRef = React.useRef<HTMLDivElement>(null);

  const handleItemClick = (item: MenuItem) => {
    if (!item.disabled && !disabled) {
      if (item.children && item.children.length > 0) {
        // Toggle expansion for items with children
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(item.id)) {
          newExpanded.delete(item.id);
        } else {
          newExpanded.add(item.id);
        }
        setExpandedItems(newExpanded);
      } else {
        // Navigate for items without children
        onNavigate(item.path);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, callback?: () => void) => {
    if ((e.key === 'Enter' || e.key === ' ') && callback) {
      e.preventDefault();
      callback();
    }
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
      return;
    }

    e.preventDefault();

    const buttons = menuContainerRef.current?.querySelectorAll('button:not([disabled])') as NodeListOf<HTMLButtonElement>;
    if (!buttons || buttons.length === 0) return;

    const activeElement = document.activeElement as HTMLElement;
    const currentIndex = Array.from(buttons).indexOf(activeElement as HTMLButtonElement);
    let nextIndex = currentIndex;

    if (e.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % buttons.length;
    } else if (e.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = buttons.length - 1;
    }

    buttons[nextIndex].focus();
  };

  const railClasses = [
    'navigation-rail',
    collapsed ? 'navigation-rail--collapsed' : 'navigation-rail--expanded',
    `navigation-rail--${size}`,
    position === 'right' && 'navigation-rail--right',
    theme === 'dark' && 'navigation-rail--dark',
    error && 'navigation-rail--error',
    disabled && 'navigation-rail--disabled',
    className
  ].filter(Boolean).join(' ');

  const menuClasses = [
    'navigation-rail__menu',
    collapsed && 'navigation-rail__menu--collapsed'
  ].filter(Boolean).join(' ');

  const getIconColor = (isActive: boolean, isHovered: boolean, itemDisabled: boolean) => {
    if (itemDisabled) return undefined;
    if (theme === 'dark') {
      return isActive ? 'var(--odl-white)' : isHovered ? 'var(--odl-text-primary-dark)' : 'var(--odl-text-secondary-dark)';
    }
    return isActive ? 'var(--odl-primary)' : isHovered ? 'var(--odl-text-primary)' : 'var(--odl-text-secondary)';
  };

  return (
    <nav 
      className={railClasses}
      aria-label={ariaLabel || 'Main navigation'}
      role="navigation"
    >
      <div className="navigation-rail__container">
        {/* Main menu items */}
        <div className={menuClasses} ref={menuContainerRef} onKeyDown={handleMenuKeyDown}>
          {menuItems.map((item) => {
            const isActive = currentPath === item.path || Boolean(item.children?.some(child => currentPath === child.path));
            const isHovered = hoveredItem === item.id;
            const isExpanded = expandedItems.has(item.id);
            const hasChildren = item.children && item.children.length > 0;
            const itemDisabled = !!(item.disabled || disabled);
            
            const itemClasses = [
              'navigation-rail__item',
              collapsed && 'navigation-rail__item--collapsed',
              isActive && 'navigation-rail__item--active',
              theme === 'dark' && 'navigation-rail__item--dark'
            ].filter(Boolean).join(' ');
            
            return (
              <React.Fragment key={item.id}>
                <button
                  className={itemClasses}
                  onClick={() => handleItemClick(item)}
                  onKeyDown={(e) => handleKeyDown(e, () => handleItemClick(item))}
                  disabled={itemDisabled}
                  aria-label={item.description || item.label}
                  aria-current={isActive ? 'page' : undefined}
                  aria-expanded={hasChildren ? isExpanded : undefined}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  tabIndex={itemDisabled ? -1 : 0}
                >
                  {/* Active indicator bar */}
                  {isActive && !hasChildren && (
                    <div className={`navigation-rail__indicator ${position === 'right' ? 'navigation-rail__indicator--right' : ''}`} />
                  )}
                  
                  {/* Icon */}
                  <Icon
                    name={item.iconName}
                    size={20}
                    color={getIconColor(isActive, isHovered, itemDisabled as boolean)}
                    className="navigation-rail__icon"
                    aria-hidden="true"
                  />
                  
                  {/* Label */}
                  {!collapsed && (
                    <span className="navigation-rail__label">
                      {item.label}
                    </span>
                  )}
                  
                  {/* Expand/Collapse chevron for items with children */}
                  {!collapsed && hasChildren && (
                    <Icon 
                      name={isExpanded ? 'chevron-down' : 'chevron-right'}
                      size={16}
                      className="navigation-rail__chevron"
                      aria-hidden="true"
                    />
                  )}
                  
                  {/* Tooltip */}
                  {collapsed && showTooltips && isHovered && !itemDisabled && (
                    <div className={`navigation-rail__tooltip ${position === 'right' ? 'navigation-rail__tooltip--right' : ''}`}>
                      {item.label}
                      {item.shortcut && (
                        <div className="navigation-rail__tooltip-shortcut">
                          {item.shortcut}
                        </div>
                      )}
                    </div>
                  )}
                </button>
                
                {/* Child items */}
                {!collapsed && hasChildren && isExpanded && (
                  <div className="navigation-rail__children">
                    {item.children?.map((child) => {
                      const isChildActive = currentPath === child.path;
                      const isChildHovered = hoveredItem === child.id;
                      const childDisabled: boolean = !!(child.disabled || disabled);
                      
                      const childClasses = [
                        'navigation-rail__item',
                        'navigation-rail__child-item',
                        isChildActive && 'navigation-rail__item--active',
                        theme === 'dark' && 'navigation-rail__item--dark'
                      ].filter(Boolean).join(' ');
                      
                      return (
                        <button
                          key={child.id}
                          className={childClasses}
                          onClick={() => !childDisabled && onNavigate(child.path)}
                          onKeyDown={(e) => handleKeyDown(e, () => !childDisabled && onNavigate(child.path))}
                          disabled={childDisabled}
                          aria-label={child.description || child.label}
                          aria-current={isChildActive ? 'page' : undefined}
                          onMouseEnter={() => setHoveredItem(child.id)}
                          onMouseLeave={() => setHoveredItem(null)}
                          tabIndex={childDisabled ? -1 : 0}
                        >
                          {isChildActive && (
                            <div className={`navigation-rail__indicator ${position === 'right' ? 'navigation-rail__indicator--right' : ''}`} />
                          )}
                          
                          <Icon 
                            name={child.iconName} 
                            size={16}
                            color={getIconColor(isChildActive, isChildHovered, childDisabled)}
                            className="navigation-rail__icon"
                            aria-hidden="true"
                          />
                          
                          <span className="navigation-rail__label">
                            {child.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </React.Fragment>
            );
          })}
          
          {/* Collapse toggle */}
          {showCollapseToggle && (
            <button
              className={`navigation-rail__item ${collapsed ? 'navigation-rail__item--collapsed' : ''} ${theme === 'dark' ? 'navigation-rail__item--dark' : ''}`}
              onMouseEnter={() => setChevronHovered(true)}
              onMouseLeave={() => setChevronHovered(false)}
              onClick={() => onCollapseToggle && onCollapseToggle(!collapsed)}
              onKeyDown={(e) => handleKeyDown(e, () => onCollapseToggle && onCollapseToggle(!collapsed))}
              aria-label={collapsed ? "Expand menu" : "Collapse menu"}
              disabled={disabled}
              tabIndex={disabled ? -1 : 0}
            >
              <Icon 
                name={collapsed ? "chevron-right" : "chevron-left"}
                size={20}
                className="navigation-rail__icon"
                color={getIconColor(false, chevronHovered, false)}
                style={{
                  transform: position === 'right' ? 'rotate(180deg)' : 'none',
                }}
                aria-hidden="true"
              />
              
              {!collapsed && (
                <span className="navigation-rail__label">
                  Collapse
                </span>
              )}
              
              {/* Tooltip for chevron */}
              {collapsed && showTooltips && chevronHovered && !disabled && (
                <div className={`navigation-rail__tooltip ${position === 'right' ? 'navigation-rail__tooltip--right' : ''}`}>
                  Expand menu
                </div>
              )}
            </button>
          )}
        </div>
        
        {/* Bottom controls */}
        {showHelpIcon && (
          <div className="navigation-rail__bottom">
            <button
              className={`navigation-rail__item ${collapsed ? 'navigation-rail__item--collapsed' : ''} ${theme === 'dark' ? 'navigation-rail__item--dark' : ''}`}
              onMouseEnter={() => setHelpHovered(true)}
              onMouseLeave={() => setHelpHovered(false)}
              onClick={onHelpClick}
              onKeyDown={(e) => handleKeyDown(e, onHelpClick)}
              aria-label="Help & Support"
              disabled={disabled}
              tabIndex={disabled ? -1 : 0}
            >
              <Icon 
                name="help" 
                size={20}
                className="navigation-rail__icon"
                color={getIconColor(false, helpHovered, false)}
                aria-hidden="true"
              />
              
              {!collapsed && (
                <span className="navigation-rail__label">
                  Help
                </span>
              )}
              
              {/* Tooltip for help */}
              {collapsed && showTooltips && helpHovered && !disabled && (
                <div className={`navigation-rail__tooltip ${position === 'right' ? 'navigation-rail__tooltip--right' : ''}`}>
                  Help & Support
                </div>
              )}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationRail;