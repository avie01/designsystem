import React from 'react';
import { cn } from '../../utils/classNames';
import Icon from '../Icon/Icon';

export interface BreadcrumbItem {
  /** Display label for the breadcrumb item */
  label: string;
  /** Navigation path/URL */
  path?: string;
  /** Icon name to display */
  icon?: string;
}

export interface BreadcrumbProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Callback when a breadcrumb is clicked */
  onNavigate?: (path: string) => void;
  /** Separator between items */
  separator?: 'chevron' | 'slash' | 'arrow';
  /** Additional CSS classes */
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  onNavigate,
  separator = 'chevron',
  className,
  size = 'md',
}) => {
  // Size styles
  const sizeStyles = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  // Separator components
  const separators = {
    chevron: <Icon name="chevron-right" size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14} />,
    slash: <span>/</span>,
    arrow: <span>→</span>,
  };

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center', className)}>
      <ol className={cn('flex items-center gap-2', sizeStyles[size])}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isClickable = !isLast && item.path;

          return (
            <li key={index} className="flex items-center gap-2">
              {item.icon && (
                <Icon 
                  name={item.icon as any} 
                  size={size === 'sm' ? 12 : size === 'lg' ? 16 : 14}
                  className="text-odl-text-tertiary"
                />
              )}
              
              {isClickable ? (
                <button
                  onClick={() => onNavigate?.(item.path!)}
                  className={cn(
                    'text-odl-primary hover:text-odl-primary-hover',
                    'hover:underline transition-colors duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-odl-primary focus-visible:ring-offset-1 rounded'
                  )}
                >
                  {item.label}
                </button>
              ) : (
                <span 
                  className={cn(
                    isLast ? 'text-odl-text-primary font-medium' : 'text-odl-text-secondary'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              
              {!isLast && (
                <span className="text-odl-text-tertiary ml-2">
                  {separators[separator]}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;