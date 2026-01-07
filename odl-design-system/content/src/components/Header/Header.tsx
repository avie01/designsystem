import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import UserAvatar from '../UserAvatar/UserAvatar';
import IconButton from '../IconButton/IconButton';
import './Header.css';

export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: Date;
  read: boolean;
}

export interface HeaderProps {
  /** Product variant */
  variant?: 'build' | 'connect' | 'keystone' | 'nexus' | 'regworks' | '3sixty' | 'keyplan' | 'redact' | 'trapeze';
  /** User name */
  userName?: string;
  /** User role */
  userRole?: string;
  /** User initials (auto-generated if not provided) */
  userInitials?: string;
  /** Show search bar */
  hasSearch?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Search value */
  searchValue?: string;
  /** Search change handler */
  onSearchChange?: (value: string) => void;
  /** Notification count */
  notificationCount?: number;
  /** Alerts/notifications */
  alerts?: Alert[];
  /** Logo click handler */
  onLogoClick?: () => void;
  /** Profile click handler */
  onProfileClick?: () => void;
  /** Notification click handler */
  onNotificationClick?: () => void;
  /** Settings click handler */
  onSettingsClick?: () => void;
  /** Alert read handler */
  onAlertRead?: (alertId: string) => void;
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

  // Legacy props for backward compatibility
  /** @deprecated Use variant instead */
  logo?: string;
  /** @deprecated Use variant instead */
  logoAlt?: string;
  /** @deprecated Use variant instead */
  title?: string;
  /** @deprecated Use userName and userRole instead */
  user?: {
    name: string;
    role?: string;
    initials?: string;
  };
  /** @deprecated Use onProfileClick instead */
  onUserClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  // New props
  variant = 'build',
  userName,
  userRole,
  userInitials,
  hasSearch = false,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  notificationCount = 0,
  alerts = [],
  onLogoClick,
  onProfileClick,
  onNotificationClick,
  onSettingsClick,
  size = 'md',
  disabled = false,
  error = false,
  className = '',
  'aria-label': ariaLabel,
  
  // Legacy props (backward compatibility)
  logo: legacyLogo,
  logoAlt: legacyLogoAlt,
  title: legacyTitle,
  user: legacyUser,
  onUserClick: legacyOnUserClick
}) => {
  // Variant configurations
  const getVariantConfig = (variant: string) => {
    const configs = {
      'build': {
        logo: '/assets/Logos/Objective-Build-H.svg',
        title: 'Build',
        logoAlt: 'Objective Build Logo',
        color: '#5DA10C'
      },
      'connect': {
        logo: '/assets/Logos/Product=Connect-light theme.svg',
        title: 'Connect',
        logoAlt: 'Connect Logo',
        color: '#0B77D8'
      },
      'keystone': {
        logo: '/assets/Logos/Objective-Keystone-H.svg',
        title: 'Keystone',
        logoAlt: 'Objective Keystone Logo',
        color: '#00928F'
      },
      'nexus': {
        logo: '/assets/Logos/Product=Nexus-light theme.svg',
        title: 'Nexus',
        logoAlt: 'Nexus Logo',
        color: '#0B77D8'
      },
      'regworks': {
        logo: '/assets/Logos/Product=Regworks-light theme.svg',
        title: 'Regworks',
        logoAlt: 'Regworks Logo',
        color: '#00928F'
      },
      '3sixty': {
        logo: '/assets/Logos/Product=3SIXTY-light theme.svg',
        title: '3Sixty',
        logoAlt: '3Sixty Logo',
        color: '#0B77D8'
      },
      'keyplan': {
        logo: '/assets/Logos/Product=Keyplan-light theme.svg',
        title: 'Keyplan',
        logoAlt: 'Keyplan Logo',
        color: '#00928F'
      },
      'redact': {
        logo: '/assets/Logos/Product=Redact-light theme.svg',
        title: 'Redact',
        logoAlt: 'Redact Logo',
        color: '#0B77D8'
      },
      'trapeze': {
        logo: '/assets/Logos/Product=Trapeze-light theme.svg',
        title: 'Trapeze',
        logoAlt: 'Trapeze Logo',
        color: '#0B77D8'
      }
    };
    return configs[variant as keyof typeof configs] || configs['build'];
  };

  const variantConfig = getVariantConfig(variant);
  
  // Support legacy props
  const logo = legacyLogo || variantConfig.logo;
  const logoAlt = legacyLogoAlt || variantConfig.logoAlt;
  const title = legacyTitle || variantConfig.title;
  
  // User information (prefer new props over legacy)
  const currentUser = {
    name: userName || legacyUser?.name,
    role: userRole || legacyUser?.role,
    initials: userInitials || legacyUser?.initials || userName?.charAt(0) || legacyUser?.name?.charAt(0) || 'U'
  };
  
  const handleUserClick = onProfileClick || legacyOnUserClick;

  const [localSearchValue, setLocalSearchValue] = useState(searchValue);

  const handleSearchChange = (value: string) => {
    setLocalSearchValue(value);
    onSearchChange?.(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent, callback?: () => void) => {
    if ((e.key === 'Enter' || e.key === ' ') && callback) {
      e.preventDefault();
      callback();
    }
  };

  const unreadAlerts = alerts.filter(alert => !alert.read);
  const alertCount = unreadAlerts.length;
  const finalNotificationCount = notificationCount || alertCount;

  const headerClasses = [
    'header',
    `header--${variant}`,
    `header--${size}`,
    error && 'header--error',
    disabled && 'header--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <header 
      className={headerClasses}
      aria-label={ariaLabel || `${title} header navigation`}
      role="banner"
    >
      <div className="header__container">
        {/* Left Section - Logo and Title */}
        <div className="header__left">
          <button
            className="header__logo-button"
            onClick={onLogoClick}
            onKeyDown={(e) => handleKeyDown(e, onLogoClick)}
            aria-label={`Navigate to ${title} home page`}
            tabIndex={disabled ? -1 : 0}
            disabled={disabled}
          >
            <img
              src={logo}
              alt={logoAlt}
              className="header__logo"
            />
          </button>
        </div>

        {/* Center Section - Search (Optional) */}
        <div className="header__center">
          {hasSearch && onSearchChange && (
            <Input
              className="header__search"
              type="text"
              placeholder={searchPlaceholder}
              value={localSearchValue}
              onChange={handleSearchChange}
              disabled={disabled}
              error={error}
              aria-label="Search applications and content"
            />
          )}
        </div>

        {/* Right Section - Actions and User */}
        <div className="header__right">
          <div className="header__notification-container">
            <IconButton
              icon="notification"
              variant="disabled"
              size="medium"
              onClick={onNotificationClick}
              aria-label={`Notifications ${finalNotificationCount > 0 ? `(${finalNotificationCount} unread)` : ''}`}
              disabled={disabled}
            />
            {finalNotificationCount > 0 && (
              <span className="header__badge" aria-hidden="true">
                {finalNotificationCount > 99 ? '99+' : finalNotificationCount}
              </span>
            )}
          </div>

          <IconButton
            icon="settings"
            variant="disabled"
            size="medium"
            onClick={onSettingsClick}
            aria-label="Open settings"
            disabled={disabled}
          />

          {(currentUser.name || currentUser.initials) && (
            <div className="header__user-info">
              <UserAvatar 
                user={{
                  name: currentUser.name || 'User',
                  role: currentUser.role,
                }}
                size="sm"
                showPopup={false}
                clickable={true}
                onClick={handleUserClick}
                disabled={disabled}
                aria-label={`User menu for ${currentUser.name || currentUser.initials}`}
              />
              {currentUser.name && (
                <div className="header__user-details">
                  <div className="header__user-name">{currentUser.name}</div>
                  {currentUser.role && (
                    <div className="header__user-role">{currentUser.role}</div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;