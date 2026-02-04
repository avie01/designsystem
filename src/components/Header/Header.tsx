import React, { useState, useEffect, useRef } from 'react';
import Icon from '../Icon/Icon';
import IconButton from '../IconButton/IconButton';
import Button from '../Button/Button';
import Input from '../Input/Input';
import UserAvatar from '../UserAvatar/UserAvatar';
import { ODLTheme } from '../../styles/ODLTheme';
import { useTheme } from '../../../.storybook/theme-decorator';
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
  variant?: 'build' | 'connect' | 'keystone' | 'nexus' | 'regworks' | '3sixty' | 'keyplan' | 'trapeze';
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
  // Variant configurations with light/dark mode logos
  const getVariantConfig = (variant: string, isDark: boolean = false) => {
    const configs = {
      'build': {
        lightLogo: '/assets/build-light.svg',
        darkLogo: '/assets/build-dark.svg',
        title: 'Build',
        logoAlt: 'Build Logo',
        color: '#5DA10C'
      },
      'connect': {
        lightLogo: '/assets/connect-light.svg',
        darkLogo: '/assets/connect-dark.svg',
        title: 'Connect',
        logoAlt: 'Connect Logo',
        color: '#0B77D8'
      },
      'keystone': {
        lightLogo: '/assets/keystone-light.svg',
        darkLogo: '/assets/keystone-dark.svg',
        title: 'Keystone',
        logoAlt: 'Keystone Logo',
        color: '#00928F'
      },
      'nexus': {
        lightLogo: '/assets/nexus-light.svg',
        darkLogo: '/assets/nexus-dark.svg',
        title: 'Nexus',
        logoAlt: 'Nexus Logo',
        color: '#0B77D8'
      },
      'regworks': {
        lightLogo: '/assets/regworks-light.svg',
        darkLogo: '/assets/regworks-dark.svg',
        title: 'Regworks',
        logoAlt: 'Regworks Logo',
        color: '#00928F'
      },
      '3sixty': {
        lightLogo: '/assets/3sixty-light.svg',
        darkLogo: '/assets/3sixty-dark.svg',
        title: '3Sixty',
        logoAlt: '3Sixty Logo',
        color: '#0B77D8'
      },
      'keyplan': {
        lightLogo: '/assets/keyplan-light.svg',
        darkLogo: '/assets/keyplan-dark.svg',
        title: 'Keyplan',
        logoAlt: 'Keyplan Logo',
        color: '#5DA10C'
      },
      'trapeze': {
        lightLogo: '/assets/trapeze-light.svg',
        darkLogo: '/assets/trapeze-dark.svg',
        title: 'Trapeze',
        logoAlt: 'Trapeze Logo',
        color: '#5DA10C'
      }
    };
    
    const config = configs[variant as keyof typeof configs] || configs['build'];
    return {
      ...config,
      logo: isDark ? config.darkLogo : config.lightLogo
    };
  };

  const { colors } = useTheme();
  const isDark = (colors as any).mode === 'dark' || colors.paper === '#000000' || colors.textPrimary === '#FFFFFF';
  const variantConfig = getVariantConfig(variant, isDark);
  
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

  const styleRef = useRef<HTMLStyleElement | null>(null);

  // Inject dynamic styles for theme-aware colors
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .header {
        background-color: ${colors.paper} !important;
        border-bottom-color: ${colors.grey400} !important;
      }
      .header--error {
        border-bottom-color: ${colors.errorMain} !important;
      }
      .header__logo-button:hover {
        background-color: ${colors.grey300} !important;
      }
      .header__logo-button:focus {
        outline-color: ${colors.primaryMain} !important;
      }
      .header__action-button {
        color: ${colors.primaryTwilight} !important;
      }
      .header__action-button:hover:not(:disabled) {
        color: ${colors.primaryNight} !important;
        background-color: ${colors.grey300} !important;
      }
      .header__action-button:focus {
        outline-color: ${colors.primaryMain} !important;
      }
      .header__action-button:disabled {
        color: ${colors.textDisabled} !important;
      }
      .header__badge {
        background-color: ${colors.errorMain} !important;
        color: ${colors.textInverse} !important;
      }
      .header__user-name {
        color: ${colors.primaryNight} !important;
      }
      .header__user-role {
        color: ${colors.primaryTwilight} !important;
      }
      .header__avatar {
        background-color: ${colors.primaryMain} !important;
        color: ${colors.textInverse} !important;
      }
      .header__avatar:hover {
        background-color: ${colors.primaryHover} !important;
      }
      .header__avatar:focus {
        outline-color: ${colors.primaryMain} !important;
      }
    `;
    document.head.appendChild(style);
    styleRef.current = style;

    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [colors, variantConfig.color]);

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
          {variant === 'build' && (
            <Button
              variant="text"
              size="md"
              onClick={() => console.log('New application clicked')}
              icon={<Icon name="add" size={16} />}
              disabled={disabled}
            >
              New application
            </Button>
          )}
          
          {variant === 'build' && (
            <IconButton
              icon="help"
              onClick={onSettingsClick}
              aria-label="Help"
              variant="disabled"
              size="small"
              disabled={disabled}
              style={{
                minWidth: '40px',
                minHeight: '40px',
              }}
            />
          )}

          {variant === 'connect' && (
            <>
              <Button
                variant="secondary"
                size="md"
                onClick={() => console.log('Search clicked')}
                icon={<Icon name="search" size={16} />}
                disabled={disabled}
              >
                Search
              </Button>
              
              <IconButton
                icon="settings"
                onClick={onSettingsClick}
                aria-label="Open settings"
                variant="disabled"
                size="small"
                disabled={disabled}
                style={{
                  minWidth: '40px',
                  minHeight: '40px',
                }}
              />
            </>
          )}

          {variant === 'keystone' && (
            <IconButton
              icon="notification"
              onClick={onNotificationClick}
              aria-label={`Notifications ${finalNotificationCount > 0 ? `(${finalNotificationCount} unread)` : ''}`}
              variant="disabled"
              size="small"
              disabled={disabled}
              style={{
                minWidth: '40px',
                minHeight: '40px',
              }}
            />
          )}

          {variant === 'nexus' && (
            <Button
              variant="secondary"
              size="md"
              onClick={() => console.log('Search clicked')}
              icon={<Icon name="search" size={16} />}
              disabled={disabled}
            >
              Search
            </Button>
          )}

          {variant !== 'build' && variant !== 'connect' && variant !== 'keystone' && variant !== 'nexus' && variant !== 'regworks' && variant !== 'trapeze' && (
            <>
              <IconButton
                icon="notification"
                onClick={onNotificationClick}
                aria-label={`Notifications ${finalNotificationCount > 0 ? `(${finalNotificationCount} unread)` : ''}`}
                variant="disabled"
                size="small"
                disabled={disabled}
                style={{
                  minWidth: '40px',
                  minHeight: '40px',
                }}
              />

              <IconButton
                icon="settings"
                onClick={onSettingsClick}
                aria-label="Open settings"
                variant="disabled"
                size="small"
                disabled={disabled}
                style={{
                  minWidth: '40px',
                  minHeight: '40px',
                }}
              />
            </>
          )}

          {variant === 'build' && (
            <div style={{ position: 'relative' }}>
              <IconButton
                icon="notification"
                onClick={onNotificationClick}
                aria-label={`Notifications ${finalNotificationCount > 0 ? `(${finalNotificationCount} unread)` : ''}`}
                variant="disabled"
                size="small"
                disabled={disabled}
                style={{
                  minWidth: '40px',
                  minHeight: '40px',
                }}
              />
              {finalNotificationCount > 0 && (
                <span className="header__badge" aria-hidden="true">
                  {finalNotificationCount > 99 ? '99+' : finalNotificationCount}
                </span>
              )}
            </div>
          )}

          {variant !== 'build' && variant !== 'connect' && finalNotificationCount > 0 && (
            <div style={{ position: 'absolute', top: '4px', right: '4px' }}>
              <span className="header__badge" aria-hidden="true">
                {finalNotificationCount > 99 ? '99+' : finalNotificationCount}
              </span>
            </div>
          )}

          {(currentUser.name || currentUser.initials) && (
            <div className="header__user-info">
              <UserAvatar 
                user={{
                  name: currentUser.name || 'User',
                  role: currentUser.role,
                }}
                showPopup={false}
                disabled={disabled}
                aria-label={`User menu for ${currentUser.name || currentUser.initials}`}
              />
              {currentUser.name && (
                <div className="header__user-details">
                  <div className="header__user-name">{currentUser.name}</div>
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