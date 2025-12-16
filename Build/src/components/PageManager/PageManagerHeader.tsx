import React from 'react';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import { usePageManager } from './PageManagerContext';

interface PageManagerHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Array<{
    label: string;
    path?: string;
    icon?: string;
  }>;
  onBreadcrumbClick?: (path?: string) => void;
}

const PageManagerHeader: React.FC<PageManagerHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  onBreadcrumbClick,
}) => {
  const { alerts, notifications } = usePageManager();
  
  const unreadAlerts = alerts.filter(a => !a.read).length;
  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <Icon name="chevron-right" className="w-4 h-4 text-gray-400" />}
              {crumb.path ? (
                <button
                  onClick={() => onBreadcrumbClick?.(crumb.path)}
                  className="hover:text-gray-900 transition-colors flex items-center space-x-1"
                >
                  {crumb.icon && <Icon name={crumb.icon} className="w-4 h-4" />}
                  <span>{crumb.label}</span>
                </button>
              ) : (
                <span className="flex items-center space-x-1 text-gray-900 font-medium">
                  {crumb.icon && <Icon name={crumb.icon} className="w-4 h-4" />}
                  <span>{crumb.label}</span>
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Title and Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-3">
          {/* Notifications Bell */}
          <Button
            variant="text"
            size="small"
            className="relative"
            aria-label={`${unreadNotifications} unread notifications`}
          >
            <Icon name="notification" className="w-5 h-5" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unreadNotifications}
              </span>
            )}
          </Button>

          {/* Alerts */}
          <Button
            variant="text"
            size="small"
            className="relative"
            aria-label={`${unreadAlerts} unread alerts`}
          >
            <Icon name="warning-alt" className="w-5 h-5" />
            {unreadAlerts > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unreadAlerts}
              </span>
            )}
          </Button>

          {/* Settings */}
          <Button
            variant="text"
            size="small"
            aria-label="Settings"
          >
            <Icon name="settings" className="w-5 h-5" />
          </Button>

          {/* Help */}
          <Button
            variant="text"
            size="small"
            aria-label="Help"
          >
            <Icon name="help" className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageManagerHeader;