import React, { useState, useEffect, useCallback, KeyboardEvent } from 'react';
import Icon from '../Icon/Icon';
import './AlertBanner.css';

export interface AlertBannerProps {
  /** The alert message content */
  children: React.ReactNode;
  /** Alert type/variant */
  variant?: 'info' | 'success' | 'warning' | 'error' | 'ai-suggestion';
  /** Component size */
  size?: 'small' | 'medium' | 'large';
  /** Whether the alert is dismissible */
  dismissible?: boolean;
  /** Whether the alert is disabled */
  disabled?: boolean;
  /** Callback when alert is dismissed */
  onDismiss?: () => void;
  /** Whether the alert is visible */
  visible?: boolean;
  /** Auto-dismiss after specified milliseconds */
  autoDismiss?: number;
  /** Additional CSS classes */
  className?: string;
  /** Icon to display (optional, will use default based on variant) */
  icon?: React.ReactNode;
  /** Whether to show a close button */
  showCloseButton?: boolean;
  /** Alert title (optional) */
  title?: string;
  /** Action buttons (optional) */
  actions?: React.ReactNode;
  /** Accessible label for the alert */
  'aria-label'?: string;
}

const AlertBanner: React.FC<AlertBannerProps> = ({
  children,
  variant = 'info',
  size = 'medium',
  dismissible = false,
  disabled = false,
  onDismiss,
  visible = true,
  autoDismiss,
  className,
  icon,
  showCloseButton = true,
  title,
  actions,
  'aria-label': ariaLabel,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = useCallback(() => {
    setIsDismissed(true);
    onDismiss?.();
  }, [onDismiss]);

  // Handle keyboard events (Escape key)
  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape' && dismissible && !disabled) {
      handleDismiss();
    }
  }, [dismissible, disabled, handleDismiss]);

  // Auto-dismiss functionality
  useEffect(() => {
    if (autoDismiss && isVisible && !isDismissed && !disabled) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoDismiss);

      return () => clearTimeout(timer);
    }
  }, [autoDismiss, isVisible, isDismissed, disabled, handleDismiss]);

  // Update visibility when prop changes
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const getDefaultIcon = () => {
    const iconSize = size === 'small' ? 16 : size === 'large' ? 24 : 20;
    const iconClasses = `alert-banner__icon alert-banner__icon--${variant}`;
    
    switch (variant) {
      case 'success':
        return <Icon name="checkmark-filled" size={iconSize} className={iconClasses} />;
      case 'warning':
        return <Icon name="warning" size={iconSize} className={iconClasses} />;
      case 'error':
        return <Icon name="error-filled" size={iconSize} className={iconClasses} />;
      case 'ai-suggestion':
        return <Icon name="search" size={iconSize} className={iconClasses} />;
      default:
        return <Icon name="information" size={iconSize} className={iconClasses} />;
    }
  };

  // Build CSS classes using BEM methodology
  const alertClasses = [
    'alert-banner',
    `alert-banner--${variant}`,
    `alert-banner--${size}`,
    disabled && 'alert-banner--disabled',
    isVisible && !isDismissed ? 'alert-banner--visible' : 'alert-banner--hidden',
    className
  ].filter(Boolean).join(' ');

  if (!isVisible || isDismissed) return null;

  return (
    <section
      className={alertClasses}
      role="alert"
      aria-live="assertive"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      tabIndex={dismissible ? 0 : -1}
    >
      {/* Icon */}
      <div className="alert-banner__icon">
        {icon || getDefaultIcon()}
      </div>

      {/* Content */}
      <div className="alert-banner__content">
        {title && (
          <div className="alert-banner__title">
            {title}
          </div>
        )}
        <div className="alert-banner__message">
          {children}
        </div>
        {actions && (
          <div className="alert-banner__actions">
            {actions}
          </div>
        )}
      </div>

      {/* Close Button */}
      {dismissible && showCloseButton && !disabled && (
        <button
          onClick={handleDismiss}
          className="alert-banner__close-button"
          aria-label="Close alert"
          type="button"
        >
          <Icon 
            name="close" 
            size={size === 'small' ? 14 : size === 'large' ? 18 : 16}
          />
        </button>
      )}
    </section>
  );
};

export default AlertBanner;