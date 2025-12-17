import React from 'react';
import clsx from 'clsx';
import Icon from '../Icon/Icon';
import { useDesignTokens } from '../../design-system/DesignTokens';

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

export interface RightNavigationRailProps {
  /** Current active path */
  currentPath: string;
  /** Callback when navigation occurs */
  onNavigate: (path: string) => void;
  /** Array of menu items to display */
  menuItems: MenuItem[];
  /** Whether the rail is collapsed (shows only icons) */
  collapsed?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show tooltips on hover */
  showTooltips?: boolean;
  /** Position of the navigation rail */
  position?: 'left' | 'right';
  /** Theme variant */
  theme?: 'light' | 'dark';
}

const RightNavigationRail: React.FC<RightNavigationRailProps> = ({
  currentPath,
  onNavigate,
  menuItems,
  collapsed = false,
  className,
  showTooltips = true,

}) => {
  const { cssVars } = useDesignTokens();

  const handleItemClick = (item: MenuItem) => {
    if (!item.disabled) {
      onNavigate(item.path);
    }
  };

  return (
    <nav 
      className={clsx(
        'flex flex-col transition-all duration-300 ease-in-out h-full w-full min-h-full overflow-hidden border-l border-gray-200',
        className
      )}
      style={{
        '--color-active-background': cssVars['--color-active-background'],
        '--color-blue-default': cssVars['--color-blue-default'],
      } as React.CSSProperties}
    >
      <div className="flex flex-col h-full min-h-full">
        <div className="flex flex-col gap-2 flex-1 min-h-0">
          {/* Main menu items */}
          <div className="flex flex-col gap-0 flex-1">
            {menuItems.map((item) => {
              const isActive = currentPath === item.path;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  className={clsx(
                    'relative flex items-center justify-center transition-all duration-200 group w-full h-12',
                    collapsed ? '' : 'px-4',
                    isActive 
                      ? 'bg-[var(--color-active-background)] before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-[var(--color-blue-default)]' 
                      : 'hover:bg-gray-100',
                    item.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className={clsx(
                    'flex items-center w-full min-w-0 overflow-hidden',
                    collapsed ? 'justify-center' : 'justify-start text-left'
                  )}>
                    <div className="p-1.5 flex-shrink-0">
                      <Icon 
                        name={item.iconName} 
                        alt={item.label} 
                        className="w-6 h-6" 
                        style={{ color: '#525965' }}
                      />
                    </div>
                    
                    <span className={clsx(
                      'text-sm font-medium text-gray-700 transition-all duration-200 truncate',
                      collapsed ? 'w-0 overflow-hidden opacity-0' : 'ml-3 opacity-100 flex-1 min-w-0'
                    )}>
                      {item.label}
                    </span>
                  </div>
                  
                  {/* Tooltip */}
                  {showTooltips && collapsed && (
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
        </div>
      </div>
    </nav>
  );
};

export default RightNavigationRail; 