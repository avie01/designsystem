import React from 'react';
import { Icon } from '../../index';

export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: string;
}

export interface BreadcrumbProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Callback when breadcrumb item is clicked */
  onNavigate?: (path: string) => void;
  /** Additional CSS classes */
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  onNavigate,
  className,
}) => {
  const handleClick = (item: BreadcrumbItem) => {
    if (item.path && onNavigate) {
      onNavigate(item.path);
    }
  };

  return (
    <nav className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <Icon name="chevron-right" className="w-3 h-3 text-gray-400" />
          )}
          <div className="flex items-center">
            {item.icon && (
              <Icon name={item.icon} className="w-3 h-3 mr-1" />
            )}
            {item.path && onNavigate ? (
              <button
                onClick={() => handleClick(item)}
                className="hover:text-gray-800 hover:underline transition-colors duration-200"
              >
                {item.label}
              </button>
            ) : (
              <span className={index === items.length - 1 ? 'text-gray-800 font-medium' : ''}>
                {item.label}
              </span>
            )}
          </div>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb; 