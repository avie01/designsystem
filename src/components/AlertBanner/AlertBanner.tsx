import React, { useState, useEffect, useCallback, KeyboardEvent } from 'react';
import { useTheme } from '../../../.storybook/theme-decorator';
import Icon from '../Icon/Icon';
import IconButton from '../IconButton/IconButton';
import aiIcon from '../../assets/ai.svg';
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
  const { colors } = useTheme();
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

  // Get variant-specific colors from theme
  const getVariantColors = () => {
    const iconColor = disabled ? colors.textDisabled : colors.textPrimary;
    
    switch (variant) {
      case 'success':
        return {
          backgroundColor: colors.successLight,
          iconColor: disabled ? colors.textDisabled : colors.successMain,
        };
      case 'warning':
        return {
          backgroundColor: colors.warningLight,
          iconColor: disabled ? colors.textDisabled : colors.warningMain,
        };
      case 'error':
        return {
          backgroundColor: colors.errorLight,
          iconColor: disabled ? colors.textDisabled : colors.errorMain,
        };
      case 'ai-suggestion':
        return {
          backgroundColor: '#F9FDF9',
          iconColor: disabled ? colors.textDisabled : colors.primaryMain,
        };
      case 'info':
      default:
        return {
          backgroundColor: colors.info,
          iconColor: disabled ? colors.textDisabled : colors.primaryMain,
        };
    }
  };

  const getDefaultIcon = () => {
    const iconSize = size === 'small' ? 16 : size === 'large' ? 24 : 20;
    const { iconColor } = getVariantColors();
    
    switch (variant) {
      case 'success':
        return <Icon name="checkmark-outline" size={iconSize} color={iconColor} />;
      case 'warning':
        return <Icon name="warning-alt" size={iconSize} color={iconColor} />;
      case 'error':
        return <Icon name="error-outline" size={iconSize} color={iconColor} />;
      case 'ai-suggestion':
        return (
          <img 
            src={aiIcon} 
            alt="AI suggestion" 
            style={{ 
              width: iconSize, 
              height: iconSize,
              display: 'block'
            }} 
          />
        );
      default:
        return <Icon name="information" size={iconSize} color={iconColor} />;
    }
  };

  // Get dynamic styles based on theme
  const getDynamicStyles = () => {
    const { backgroundColor } = getVariantColors();
    const spacing = {
      small: { padding: colors.spacing[3], gap: colors.spacing[2] },
      medium: { padding: colors.spacing[4], gap: colors.spacing[3] },
      large: { padding: colors.spacing[6], gap: colors.spacing[4] },
    };
    
    return {
      backgroundColor,
      color: disabled ? colors.textDisabled : colors.textPrimary,
      ...spacing[size],
      borderRadius: variant === 'ai-suggestion' ? '0' : '2px',
      marginBottom: colors.spacing[3],
      transition: 'all 0.2s ease',
      fontFamily: '"Noto Sans", sans-serif',
      display: 'flex',
      alignItems: 'flex-start',
      transform: isVisible && !isDismissed ? 'translateY(0px)' : 'translateY(-20px)',
      opacity: disabled ? 0.6 : (isVisible && !isDismissed ? 1 : 0),
    };
  };

  // Build CSS classes using BEM methodology (keeping for additional CSS features)
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
      style={getDynamicStyles()}
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
        <IconButton
          icon="close"
          onClick={handleDismiss}
          aria-label="Close alert"
          variant="disabled"
          size={size === 'small' ? 'xs' : size === 'large' ? 'medium' : 'small'}
          customHoverBg={colors.grey400}
          style={{
            alignSelf: 'flex-start',
            marginTop: '-3px',
          }}
        />
      )}
    </section>
  );
};

export default AlertBanner;