import React from 'react';
import './Breadcrumb.css';

// Self-contained utility function to replace clsx
const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Simple chevron icon component
const ChevronIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className || 'breadcrumb__separator-icon'}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

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
  /** Separator between breadcrumb items */
  separator?: string | React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  onNavigate,
  separator,
  className,
}) => {
  const handleClick = (item: BreadcrumbItem) => {
    if (item.path && onNavigate) {
      onNavigate(item.path);
    }
  };

  return (
    <nav
      className={classNames('breadcrumb', className)}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            separator ? (
              typeof separator === 'string' ? (
                <span className="breadcrumb__separator">{separator}</span>
              ) : (
                separator
              )
            ) : (
              <ChevronIcon />
            )
          )}
          <div className="breadcrumb__item">
            {item.path && onNavigate ? (
              <button
                onClick={() => handleClick(item)}
                className="breadcrumb__link"
                aria-current={index === items.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </button>
            ) : (
              <span className={classNames(
                'breadcrumb__text',
                index === items.length - 1 && 'breadcrumb__text--current'
              )}>
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