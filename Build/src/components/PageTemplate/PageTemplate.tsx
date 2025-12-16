import React from 'react';
import Header from '../Header/Header';
import './PageTemplate.css';

// Self-contained utility function to replace clsx
const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Simple breadcrumb component
const SimpleBreadcrumb: React.FC<{
  items: Array<{
    label: string;
    path?: string;
    icon?: string;
  }>;
  onNavigate?: (path: string) => void;
  className?: string;
}> = ({ items, onNavigate, className }) => {
  return (
    <nav className={classNames('simple-breadcrumb', className)} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <svg 
              className="simple-breadcrumb__separator" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
          <div className="simple-breadcrumb__item">
            {item.path && onNavigate ? (
              <button
                onClick={() => onNavigate(item.path!)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNavigate(item.path!);
                  }
                }}
                className="simple-breadcrumb__link"
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </button>
            ) : (
              <span 
                className={classNames(
                  'simple-breadcrumb__text',
                  index === items.length - 1 ? 'simple-breadcrumb__text--current' : ''
                )}
                aria-current={index === items.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </div>
        </React.Fragment>
      ))}
    </nav>
  );
};

export interface PageTemplateProps {
  /** The main page title */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** The main content to display */
  children: React.ReactNode;
  /** Breadcrumb items to display */
  breadcrumbs?: Array<{
    label: string;
    path?: string;
    icon?: string;
  }>;
  /** Callback when breadcrumb item is clicked */
  onBreadcrumbNavigate?: (path: string) => void;
  /** Whether to show the left navigation rail */
  showLeftNavRail?: boolean;
  /** Whether to show the right navigation rail */
  showRightNavRail?: boolean;
  /** Left navigation rail component */
  leftNavRail?: React.ReactNode;
  /** Right navigation rail component */
  rightNavRail?: React.ReactNode;
  /** Whether the left navigation rail is collapsed */
  leftNavRailCollapsed?: boolean;
  /** Whether the right navigation rail is collapsed */
  rightNavRailCollapsed?: boolean;
  /** Brand color for the header (uses ODL primary by default) */
  brandColor?: string;
  /** Header background color (uses ODL white by default) */
  headerColor?: string;
  /** Navigation rail color (uses ODL white by default) */
  navRailColor?: string;
  /** Background color (uses ODL white by default) */
  backgroundColor?: string;
  /** Additional container styling options */
  containerColor?: string;
  /** Alerts to display in the header */
  alerts?: Array<{
    id: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
    timestamp: Date;
    read: boolean;
  }>;
  /** Callback when alert is marked as read */
  onAlertRead?: (alertId: string) => void;
  /** User information for the header avatar */
  user?: {
    name: string;
    role?: string;
    department?: string;
    email?: string;
    avatar?: string;
  };
  /** Additional CSS classes */
  className?: string;
}

const PageTemplate: React.FC<PageTemplateProps> = React.memo(({
  title,
  subtitle,
  children,
  breadcrumbs,
  onBreadcrumbNavigate,
  showLeftNavRail = false,
  showRightNavRail = false,
  leftNavRail,
  rightNavRail,
  brandColor,
  headerColor,
  navRailColor,
  backgroundColor,
  alerts,
  onAlertRead,
  user,
  className,
}) => {
  return (
    <div 
      className={classNames('page-template', className)}
      style={{ 
        backgroundColor: backgroundColor || 'var(--odl-white)'
      }}
    >
      {/* Header */}
      <Header 
        brandColor={brandColor}
        backgroundColor={headerColor}
        user={user}
        alerts={alerts}
        onAlertRead={onAlertRead}
      />

      {/* Main content area */}
      <div className="page-template__main-content">
        {/* Navigation rail on left side */}
        {showLeftNavRail && leftNavRail}

        {/* Background and content */}
        <div 
          className="page-template__content-wrapper"
          style={{ backgroundColor: backgroundColor || 'var(--odl-white)' }}
        >
          {/* Title section */}
          <div className="page-template__title-section">
            <div className="page-template__title-container">
              {/* Breadcrumbs */}
              {breadcrumbs && breadcrumbs.length > 0 && (
                <div className="page-template__breadcrumb-wrapper">
                  <SimpleBreadcrumb 
                    items={breadcrumbs}
                    onNavigate={onBreadcrumbNavigate}
                  />
                </div>
              )}
              <div className="page-template__title-content">
                <h1 className="page-template__title">
                  {title}
                </h1>
                {subtitle && (
                  <p className="page-template__subtitle">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Container frame - fills available space */}
          <div 
            className="page-template__container-frame"
            style={{ backgroundColor: backgroundColor || 'var(--odl-white)' }}
          >
            {/* Content container - fills parent */}
            <div className="page-template__content-container">
              {children}
            </div>
          </div>
        </div>

        {/* Navigation rail on right side */}
        {showRightNavRail && (
          <div 
            className="page-template__right-nav-rail"
            style={{ 
              backgroundColor: navRailColor || 'var(--odl-white)'
            }}
          >
            {rightNavRail}
          </div>
        )}
      </div>
    </div>
  );
});

export default PageTemplate;