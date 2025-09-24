import React, { useState } from 'react';
import Icon from '../Icon/Icon';

// Self-contained utility function to replace clsx
const clsx = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

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
  /** Whether this item is disabled */
  disabled?: boolean;
}

export interface ActionItem {
  /** Unique identifier for the action item */
  id: string;
  /** Icon name to display */
  iconName: string;
  /** Display label for the action item */
  label: string;
  /** Action callback */
  action: () => void;
}

export interface CustomRightNavigationRailProps {
  /** Current active path */
  currentPath: string;
  /** Callback when navigation occurs */
  onNavigate: (path: string) => void;
  /** Array of menu items to display */
  menuItems: MenuItem[];
  /** Array of action items for the Actions menu */
  actionItems?: ActionItem[];
  /** Additional CSS classes */
  className?: string;
  /** Whether to show tooltips on hover */
  showTooltips?: boolean;
  /** Callback when an icon is clicked */
  onIconClick?: (item: MenuItem) => void;
}

const CustomRightNavigationRail: React.FC<CustomRightNavigationRailProps> = ({
  currentPath,
  onNavigate,
  menuItems,
  actionItems = [],
  className,
  showTooltips = true,
  onIconClick,
}) => {
  // Using design tokens directly
  const [showActionsMenu, setShowActionsMenu] = useState(false);

  const handleItemClick = (item: MenuItem) => {
    if (!item.disabled) {
      if (onIconClick) {
        // Call the slide-out callback
        onIconClick(item);
      } else {
        // Normal navigation behavior
        if (item.path === '/notifications') {
          // Toggle actions menu for Actions item
          setShowActionsMenu(!showActionsMenu);
        } else {
          // Close actions menu and navigate
          setShowActionsMenu(false);
          onNavigate(item.path);
        }
      }
    }
  };

  const handleActionClick = (action: ActionItem) => {
    action.action();
    setShowActionsMenu(false);
  };

  return (
    <nav 
      className={clsx(
        'flex flex-col transition-all duration-300 ease-in-out h-full w-full min-h-full overflow-hidden border-l border-gray-200 bg-white',
        className
      )}
    >
      <div className="flex flex-col h-full min-h-full">
        <div className="flex flex-col gap-2 flex-1 min-h-0">
          {/* Actions Menu - Show at top when open */}
          {showActionsMenu && (
            <div>
              <div className="p-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Actions</h4>
                    <p className="text-xs text-gray-600">Quick actions and tools</p>
                  </div>
                  <button
                    onClick={() => setShowActionsMenu(false)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors duration-150"
                  >
                    <Icon 
                      name="close" 
                      className="w-4 h-4 text-gray-500" 
                    />
                  </button>
                </div>
              </div>
              <div>
                {actionItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleActionClick(item)}
                    className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-100 transition-colors duration-150 group"
                  >
                    <div className="flex-shrink-0 w-5 h-5 mr-2 flex items-center justify-center">
                      <Icon 
                        name={item.iconName} 
                        className="w-4 h-4 text-gray-500 group-hover:text-gray-700" 
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Main menu items - Hide when Actions menu is open */}
          {!showActionsMenu && (
            <div className="flex flex-col gap-0 flex-1">
              {menuItems.map((item) => {
                const isActive = currentPath === item.path;
                const isActionsItem = item.path === '/notifications';
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    disabled={item.disabled}
                    className={clsx(
                      'relative flex items-center justify-center transition-all duration-200 group w-full h-12',
                      isActive 
                        ? 'bg-[var(--color-active-background)] before:absolute before:right-0 before:top-0 before:h-full before:w-1 before:bg-[var(--color-blue-default)]' 
                        : 'hover:bg-gray-100',
                      item.disabled && 'opacity-50 cursor-not-allowed',
                      isActionsItem && showActionsMenu && 'bg-blue-50 border-r-2 border-blue-500'
                    )}
                    aria-label={item.label}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <div className="flex items-center justify-center w-full min-w-0 overflow-hidden">
                      <div className="p-1.5 flex-shrink-0">
                        <Icon 
                          name={item.iconName} 
                          alt={item.label} 
                          className="w-6 h-6" 
                          style={{ color: '#525965' }}
                        />
                      </div>
                    </div>
                    
                    {/* Tooltip */}
                    {showTooltips && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 max-w-xs">
                        <div className="truncate">
                          {item.label}
                        </div>
                        {item.description && (
                          <div className="text-xs text-gray-300 mt-1 truncate">
                            {item.description}
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default CustomRightNavigationRail; 