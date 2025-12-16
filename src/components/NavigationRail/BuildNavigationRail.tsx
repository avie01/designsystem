import React, { useState } from 'react';
import Icon from '../Icon/Icon';

// Self-contained utility function to replace clsx
const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export interface BuildMenuItem {
  id: string;
  iconName: string;
  label: string;
  path: string;
  description?: string;
  disabled?: boolean;
}

export interface BuildNavigationRailProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  collapsed?: boolean;
  className?: string;
}

const BuildNavigationRail: React.FC<BuildNavigationRailProps> = ({
  currentPath,
  onNavigate,
  collapsed = false,
  className
}) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  // Define menu items based on the Figma design
  const menuItems: BuildMenuItem[] = [
    {
      id: 'dashboard',
      iconName: 'dashboard',
      label: 'Dashboard',
      path: '/'
    },
    {
      id: 'applications',
      iconName: 'document-tasks',
      label: 'Applications',
      path: '/applications'
    },
    {
      id: 'regulation',
      iconName: 'document',
      label: 'Regulation management',
      path: '/regulation'
    },
    {
      id: 'tasks',
      iconName: 'calendar',
      label: 'Tasks and scheduling',
      path: '/tasks'
    },
    {
      id: 'reporting',
      iconName: 'chart-line',
      label: 'Reporting',
      path: '/reporting'
    },
    {
      id: 'teams',
      iconName: 'user-multiple',
      label: 'Teams',
      path: '/teams'
    },
    {
      id: 'admin',
      iconName: 'settings',
      label: 'Admin settings',
      path: '/admin'
    }
  ];

  const helpItem: BuildMenuItem = {
    id: 'help',
    iconName: 'help',
    label: 'Help and support',
    path: '/help'
  };

  const handleItemClick = (item: BuildMenuItem) => {
    if (!item.disabled) {
      onNavigate(item.path);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderMenuItem = (item: BuildMenuItem, isActive: boolean) => (
    <button
      key={item.id}
      onClick={() => handleItemClick(item)}
      disabled={item.disabled}
      className={classNames(
        'relative flex items-center transition-all duration-200 w-full',
        isCollapsed ? 'px-3 py-3 justify-center' : 'px-4 py-3 justify-start',
        isActive 
          ? 'bg-blue-50 text-blue-700 before:absolute before:top-0 before:left-0 before:h-full before:w-1 before:bg-blue-600' 
          : 'hover:bg-gray-100 text-gray-700',
        item.disabled && 'opacity-50 cursor-not-allowed'
      )}
      aria-label={item.label}
      aria-current={isActive ? 'page' : undefined}
      title={isCollapsed ? item.label : undefined}
    >
      <div className={classNames(
        'flex items-center gap-3',
        isCollapsed ? 'justify-center' : 'justify-start w-full'
      )}>
        <Icon 
          name={item.iconName} 
          size={20}
          className={classNames(
            'flex-shrink-0',
            isActive ? 'text-blue-600' : 'text-gray-600'
          )}
        />
        {!isCollapsed && (
          <span className="text-sm font-medium whitespace-nowrap">
            {item.label}
          </span>
        )}
      </div>
    </button>
  );

  return (
    <nav 
      className={classNames(
        'flex flex-col h-full bg-white border-r border-gray-200',
        isCollapsed ? 'w-14' : 'w-64',
        'transition-all duration-300 ease-in-out',
        className
      )}
    >
      {/* Main navigation items */}
      <div className="flex-1 flex flex-col pt-4">
        <div className="flex flex-col">
          {menuItems.map(item => {
            const isActive = currentPath === item.path || 
                           (item.path === '/' && currentPath === '/') ||
                           (item.path !== '/' && currentPath.startsWith(item.path));
            return renderMenuItem(item, isActive);
          })}
          
          {/* Collapse/Expand button - placed after main menu items */}
          <button
            onClick={toggleCollapse}
            className="relative flex items-center transition-all duration-200 w-full px-3 py-3 justify-center hover:bg-gray-100 text-gray-700 mt-2"
            aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
          >
            <div className={classNames(
              'flex items-center gap-3',
              isCollapsed ? 'justify-center' : 'justify-start w-full px-1'
            )}>
              <Icon 
                name={isCollapsed ? 'chevron-right' : 'chevron-left'} 
                size={20}
                className="text-gray-600 flex-shrink-0"
              />
              {!isCollapsed && (
                <span className="text-sm font-medium whitespace-nowrap">
                  Collapse
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Bottom section with help only */}
      <div className="border-t border-gray-200">
        {/* Help and support */}
        {renderMenuItem(helpItem, currentPath === helpItem.path)}
      </div>
    </nav>
  );
};

export default BuildNavigationRail;