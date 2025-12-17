import React from 'react';

// Self-contained utility function to replace clsx
// const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
//   return classes.filter(Boolean).join(' ');
// };

// Simple chevron icon component
const ChevronIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg 
    style={{ 
      width: '12px', 
      height: '12px', 
      color: '#9ca3af',
      ...style 
    }}
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
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        color: '#4b5563'
      }}
      className={className}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            separator ? (
              typeof separator === 'string' ? (
                <span style={{ color: '#9ca3af', margin: '0 8px' }}>{separator}</span>
              ) : (
                separator
              )
            ) : (
              <ChevronIcon />
            )
          )}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {item.path && onNavigate ? (
              <button
                onClick={() => handleClick(item)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: '#3b82f6',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                  e.currentTarget.style.color = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                  e.currentTarget.style.color = '#3b82f6';
                }}
              >
                {item.label}
              </button>
            ) : (
              <span style={{
                color: index === items.length - 1 ? '#1f2937' : '#4b5563',
                fontWeight: index === items.length - 1 ? 500 : 400
              }}>
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