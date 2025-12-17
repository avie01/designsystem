import React from 'react';
import clsx from 'clsx';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Header from '../Header/Header';

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
  /** Brand color for the top strip (default: #ff0000) */
  brandColor?: string;
  /** Header background color (default: #2a7d2a) */
  headerColor?: string;
  /** Navigation rail color (default: #dc0016) */
  navRailColor?: string;
  /** Background color (default: #3560c1) */
  backgroundColor?: string;
  /** Container border color (default: #f3ad2e) */
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
  leftNavRailCollapsed = false,
  rightNavRailCollapsed = false,
  brandColor = '#5DA10C',
  headerColor = '#ffffff',
  navRailColor = '#ffffff',
  backgroundColor = '#ffffff',
  containerColor = '#EDF1F5',
  alerts = [],
  onAlertRead,
  user,
  className,
}) => {
  return (
    <div className={clsx(
      'bg-white box-border content-stretch flex flex-col gap-px items-start justify-start p-0 relative h-screen',
      className
    )}>
      {/* Header */}
      <Header 
        brandColor={brandColor}
        backgroundColor={headerColor}
        userInitials="MB"
        userAvatarColor="#8ccfa1"
        user={user}
        alerts={alerts}
        onAlertRead={onAlertRead}
      />

      {/* Main content area */}
      <div className="bg-[#edf1f5] box-border content-stretch flex flex-row gap-px h-full flex-1 items-start justify-start p-0 relative shrink-0 w-full">
        {/* Navigation rail on left side */}
        {showLeftNavRail && (
          <div 
            className="h-full shrink-0 flex flex-col transition-all duration-300 ease-in-out min-h-full"
            style={{ 
              backgroundColor: navRailColor,
              width: leftNavRailCollapsed ? '3.5rem' : '16rem', // 56px when collapsed, 256px when expanded
              height: '100%'
            }}
          >
            {leftNavRail}
          </div>
        )}

        {/* Background and content */}
        <div 
          className="basis-0 box-border content-stretch flex flex-col grow h-full items-start justify-start min-h-px min-w-px overflow-x-clip overflow-y-auto px-6 py-0 relative shrink-0 transition-all duration-300 ease-in-out"
          style={{ backgroundColor: backgroundColor }}
        >
          {/* Title section */}
          <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start p-0 relative shrink-0 w-full">
            <div className="basis-0 box-border content-stretch flex flex-row gap-[18px] grow items-start justify-start min-h-px min-w-px pl-0 pr-6 py-[22px] relative shrink-0">
              <div className="basis-0 box-border content-stretch flex flex-row gap-[18px] grow items-start justify-start min-h-px min-w-px p-0 relative shrink-0">
                <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start p-0 relative shrink-0">
                  {/* Breadcrumbs */}
                  {breadcrumbs && breadcrumbs.length > 0 && (
                    <Breadcrumb 
                      items={breadcrumbs}
                      onNavigate={onBreadcrumbNavigate}
                      className="mb-1"
                    />
                  )}
                  <div className="box-border content-stretch flex flex-row gap-3 items-start justify-start p-0 relative shrink-0">
                    <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start p-0 relative shrink-0">
                      <div className="flex flex-col font-['Noto_Sans:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#32373f] text-[20px] text-left text-nowrap">
                        <p className="block leading-[36px] whitespace-pre">{title}</p>
                      </div>
                      {subtitle && (
                        <div className="text-[#32373f] text-sm leading-5">
                          {subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Container frame - fills x axis with 24px margin and 24px padding */}
          <div 
            className="box-border content-stretch flex flex-col gap-0.5 items-start justify-start p-[24px] relative rounded-2xl shrink-0 w-full flex-1"
            style={{ backgroundColor: containerColor }}
          >
            {/* Inner container - white fills parent container */}
            <div className="bg-white rounded-lg shrink-0 w-full p-6 flex-1 overflow-auto">
              {children}
            </div>
          </div>
        </div>

        {/* Navigation rail on right side */}
        {showRightNavRail && (
          <div 
            className="h-full shrink-0 flex flex-col transition-all duration-300 ease-in-out min-h-full"
            style={{ 
              backgroundColor: navRailColor,
              width: rightNavRailCollapsed ? '3.5rem' : '16rem', // 56px when collapsed, 256px when expanded
              height: '100%'
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