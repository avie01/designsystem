import React from 'react';
import { Icon } from '../../index';
import './BaseHeader.css';

export interface BaseHeaderProps {
  /** Navigation callback */
  onNavigate: (path: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** Logo source */
  logo: string;
  /** Logo alt text */
  logoAlt: string;
  /** Product title */
  productTitle: string;
  /** Brand color (deprecated - use CSS custom properties) */
  brandColor?: string;
  /** User initials for avatar */
  userInitials?: string;
  /** User avatar background color (deprecated - use CSS custom properties) */
  avatarColor?: string;
  /** Size variant - affects typography and spacing */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state - affects colors and interaction */
  disabled?: boolean;
  /** Error state - uses error colors */
  error?: boolean;
  /** ARIA label for screen readers */
  'aria-label'?: string;
  /** Keyboard event handlers */
  onKeyDown?: (e: React.KeyboardEvent) => void;
  /** Notification click handler */
  onNotificationClick?: () => void;
  /** Settings click handler */
  onSettingsClick?: () => void;
  /** Avatar click handler */
  onAvatarClick?: () => void;
}

const BaseHeader: React.FC<BaseHeaderProps> = ({
  onNavigate,
  className = '',
  logo,
  logoAlt,
  productTitle,
  userInitials = 'MB',
  size = 'md',
  disabled = false,
  error = false,
  'aria-label': ariaLabel,
  onKeyDown,
  onNotificationClick,
  onSettingsClick,
  onAvatarClick
}) => {
  const handleKeyDown = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback();
    }
    onKeyDown?.(e);
  };

  const headerClasses = [
    'base-header',
    `base-header--${size}`,
    error && 'base-header--error',
    disabled && 'base-header--disabled',
    className
  ].filter(Boolean).join(' ');

  return (
    <header 
      className={headerClasses}
      aria-label={ariaLabel || `${productTitle} header navigation`}
      role="banner"
    >
      <div className="base-header__content">
        <div className="base-header__logo-section">
          <button
            className="base-header__logo-button"
            onClick={() => onNavigate('/')}
            onKeyDown={(e) => handleKeyDown(e, () => onNavigate('/'))}
            aria-label={`Navigate to ${productTitle} home page`}
            tabIndex={disabled ? -1 : 0}
            disabled={disabled}
          >
            <img
              src={logo}
              alt={logoAlt}
              className="base-header__logo"
            />
          </button>
          <div className="base-header__divider" aria-hidden="true"></div>
          <h1 className="base-header__title">{productTitle}</h1>
        </div>
        <div className="base-header__actions">
          <button
            className="base-header__action-button"
            onClick={onNotificationClick}
            onKeyDown={(e) => handleKeyDown(e, onNotificationClick || (() => {}))}
            aria-label="View notifications"
            tabIndex={disabled ? -1 : 0}
            disabled={disabled}
          >
            <Icon name="notification" size={20} aria-hidden="true" />
          </button>
          <button
            className="base-header__action-button"
            onClick={onSettingsClick}
            onKeyDown={(e) => handleKeyDown(e, onSettingsClick || (() => {}))}
            aria-label="Open settings"
            tabIndex={disabled ? -1 : 0}
            disabled={disabled}
          >
            <Icon name="settings" size={20} aria-hidden="true" />
          </button>
          <button
            className="base-header__avatar"
            onClick={onAvatarClick}
            onKeyDown={(e) => handleKeyDown(e, onAvatarClick || (() => {}))}
            aria-label={`User menu for ${userInitials}`}
            tabIndex={disabled ? -1 : 0}
            disabled={disabled}
          >
            {userInitials}
          </button>
        </div>
      </div>
    </header>
  );
};

export default BaseHeader; 