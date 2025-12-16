import React, { useMemo, useState } from 'react';
import { PageTemplate, BuildNavigationRail, CustomRightNavigationRail } from '../../index';
import { PageManagerProvider, usePageManager } from './PageManagerContext';
import AlertPanel from '../AlertPanel/AlertPanel';
import { 
  DashboardLayout, 
  SingleColumnLayout, 
  TwoColumnLayout, 
  TableLayout 
} from './layouts';
import './PageManager.css';

export interface PageLayout {
  id: string;
  name: string;
  description: string;
  showLeftNavRail: boolean;
  showRightNavRail: boolean;
  leftNavRailCollapsed: boolean;
  rightNavRailCollapsed: boolean;
  layout: 'single' | 'two-column' | 'dashboard' | 'table' | 'custom';
}

export interface PageManagerProps {
  /** Array of available page layouts */
  layouts: PageLayout[];
  /** Current active layout ID */
  currentLayoutId: string;
  /** Callback when layout changes */
  onLayoutChange: (layoutId: string) => void;
  /** Menu items for navigation rails */
  menuItems: Array<{
    id: string;
    iconName: string;
    label: string;
    path: string;
    description?: string;
  }>;
  /** Menu items for right navigation rail (optional) */
  rightNavItems?: Array<{
    id: string;
    iconName: string;
    label: string;
    path: string;
    description?: string;
  }>;
  /** Current path for navigation */
  currentPath: string;
  /** Navigation callback */
  onNavigate: (path: string) => void;
  /** Page title */
  title: string;
  /** Page subtitle */
  subtitle?: string;
  /** Breadcrumb items */
  breadcrumbs?: Array<{
    label: string;
    path?: string;
    icon?: string;
  }>;
  /** Custom content to render in the main content area */
  customContent?: React.ReactNode;
  /** User information for the header avatar */
  user?: {
    name: string;
    role?: string;
    department?: string;
    email?: string;
    avatar?: string;
  };
  /** Brand color for the header */
  brandColor?: string;
  /** Primary content for two-column layout */
  primaryContent?: React.ReactNode;
  /** Secondary content for two-column layout */
  secondaryContent?: React.ReactNode;
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

// Inner component that has access to the PageManager context
const PageManagerInner: React.FC<PageManagerProps> = ({
  layouts,
  currentLayoutId,
  onLayoutChange: _onLayoutChange, // Currently unused - layout switcher removed
  menuItems: _menuItems, // Currently unused - left nav functionality removed
  rightNavItems,
  currentPath,
  onNavigate,
  title,
  subtitle,
  breadcrumbs,
  customContent,
  user,
  brandColor = '#5DA10C',
  primaryContent,
  secondaryContent,
  size = 'md',
  disabled = false,
  error = false,
  className = '',
  'aria-label': ariaLabel
}) => {
  const { alerts, dismissAlert, markAlertAsRead } = usePageManager();
  const [showAlertPanel, setShowAlertPanel] = useState(false);
  
  // Calculate unread alert count
  // const unreadAlertCount = useMemo(() => {
  //   return alerts.filter(alert => !alert.read).length;
  // }, [alerts]);
  
  // Get current layout configuration
  const currentLayout = useMemo(() => {
    return layouts.find(l => l.id === currentLayoutId) || layouts[0];
  }, [layouts, currentLayoutId]);

  // Render the appropriate layout based on the current layout type
  const renderLayoutContent = () => {
    switch (currentLayout.layout) {
      case 'dashboard':
        return <DashboardLayout />;
      
      case 'table':
        return <TableLayout />;
      
      case 'two-column':
        return (
          <TwoColumnLayout
            leftContent={primaryContent || <div className="page-manager__section">
              <h2 className="page-manager__section-title">Primary Content</h2>
              <p className="page-manager__section-text">Add your primary content here using the primaryContent prop.</p>
            </div>}
            rightContent={secondaryContent || <div className="page-manager__section">
              <h2 className="page-manager__section-title">Secondary Content</h2>
              <p className="page-manager__section-text">Add your secondary content here using the secondaryContent prop.</p>
            </div>}
            leftWidth="2/3"
          />
        );
      
      case 'single':
        return (
          <SingleColumnLayout>
            {customContent || (
              <div className="page-manager__section">
                <h2 className="page-manager__section-title">Content Area</h2>
                <p className="page-manager__section-text">
                  This is a single column layout. You can add your custom content here using the customContent prop.
                </p>
                <div className="page-manager__grid page-manager__grid--3-col">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="page-manager__card">
                      <h3 className="page-manager__card-title">Section {i}</h3>
                      <p className="page-manager__card-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </SingleColumnLayout>
        );
      
      case 'custom':
        return customContent || (
          <div className="page-manager__custom-content">
            <div className="page-manager__section">
              <h2 className="page-manager__section-title">Custom Layout</h2>
              <p className="page-manager__section-text">
                Provide your custom content using the customContent prop.
              </p>
            </div>
          </div>
        );
      
      default:
        return (
          <SingleColumnLayout>
            <div className="page-manager__section">
              <h2 className="page-manager__section-title">Default Layout</h2>
              <p className="page-manager__section-text">No specific layout configured.</p>
            </div>
          </SingleColumnLayout>
        );
    }
  };

  // Left navigation rail component
  const leftNavRail = currentLayout.showLeftNavRail ? (
    <BuildNavigationRail
      currentPath={currentPath}
      onNavigate={onNavigate}
      collapsed={currentLayout.leftNavRailCollapsed}
    />
  ) : undefined;

  // Right navigation rail component
  const rightNavRail = currentLayout.showRightNavRail && rightNavItems ? (
    <CustomRightNavigationRail
      menuItems={rightNavItems}
      currentPath={currentPath}
      onNavigate={onNavigate}
    />
  ) : undefined;

  const pageManagerClasses = [
    'page-manager',
    `page-manager--${size}`,
    error && 'page-manager--error',
    disabled && 'page-manager--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={pageManagerClasses}
      aria-label={ariaLabel || `${title} page manager`}
      role="main"
    >
      <PageTemplate
        title={title}
        subtitle={subtitle}
        breadcrumbs={breadcrumbs}
        onBreadcrumbNavigate={(path) => path && onNavigate(path)}
        showLeftNavRail={currentLayout.showLeftNavRail}
        showRightNavRail={currentLayout.showRightNavRail}
        leftNavRail={leftNavRail}
        rightNavRail={rightNavRail}
        leftNavRailCollapsed={currentLayout.leftNavRailCollapsed}
        brandColor={brandColor}
        user={user}
        alerts={alerts}
        onAlertRead={markAlertAsRead}
        disabled={disabled}
      >
        {/* Main Content Area */}
        <div className="page-manager__layout-content">
          {renderLayoutContent()}
        </div>
        
        {/* Alert Panel */}
        {showAlertPanel && (
          <div className="page-manager__alert-overlay">
            <div className="page-manager__alert-panel">
              <AlertPanel
                alerts={alerts}
                isOpen={showAlertPanel}
                onClose={() => setShowAlertPanel(false)}
                onAlertDismiss={dismissAlert}
                onAlertRead={markAlertAsRead}
              />
            </div>
          </div>
        )}
      </PageTemplate>
    </div>
  );
};

// Main PageManager component that wraps the inner component with the provider
const PageManager: React.FC<PageManagerProps> = (props) => {
  return (
    <PageManagerProvider>
      <PageManagerInner {...props} />
    </PageManagerProvider>
  );
};

export default PageManager;