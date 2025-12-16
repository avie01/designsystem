import React, { useState, useEffect } from 'react';
import Icon from '../Icon/Icon';
import clsx from 'clsx';

export interface AlertBannerProps {
  /** The alert message content */
  children: React.ReactNode;
  /** Alert type/variant */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /** Whether the alert is dismissible */
  dismissible?: boolean;
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
}

const AlertBanner: React.FC<AlertBannerProps> = ({
  children,
  variant = 'info',
  dismissible = false,
  onDismiss,
  visible = true,
  autoDismiss,
  className,
  icon,
  showCloseButton = true,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [isDismissed, setIsDismissed] = useState(false);



  // Auto-dismiss functionality
  useEffect(() => {
    if (autoDismiss && isVisible && !isDismissed) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoDismiss);

      return () => clearTimeout(timer);
    }
  }, [autoDismiss, isVisible, isDismissed]);

  // Update visibility when prop changes
  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const handleDismiss = () => {
    if (dismissible) {
      setIsDismissed(true);
      onDismiss?.();
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          backgroundColor: '#d4edda',
          borderColor: '#c3e6cb',
          textColor: '#155724',
          iconColor: '#28a745'
        };
      case 'warning':
        return {
          backgroundColor: '#fff3cd',
          borderColor: '#ffeaa7',
          textColor: '#856404',
          iconColor: '#ffc107'
        };
      case 'error':
        return {
          backgroundColor: '#f8d7da',
          borderColor: '#f5c6cb',
          textColor: '#721c24',
          iconColor: '#dc3545'
        };
      default: // info
        return {
          backgroundColor: '#d1ecf1',
          borderColor: '#bee5eb',
          textColor: '#0c5460',
          iconColor: '#3560c1'
        };
    }
  };

  const getDefaultIcon = () => {
    switch (variant) {
      case 'success':
        return 'checkmark';
      case 'warning':
        return 'warning';
      case 'error':
        return 'close';
      default:
        return 'information';
    }
  };

  const variantStyles = getVariantStyles();

  if (!isVisible || isDismissed) return null;

  return (
    <div
      className={clsx(
        'flex items-start gap-3 p-4 border-l-4 rounded-r-lg shadow-sm',
        className
      )}
      style={{
        backgroundColor: variantStyles.backgroundColor,
        borderColor: variantStyles.borderColor,
        color: variantStyles.textColor,
        borderLeftWidth: '4px',
        borderLeftStyle: 'solid',
        opacity: isVisible && !isDismissed ? 1 : 0,
        transform: isVisible && !isDismissed ? 'translateY(0px)' : 'translateY(-20px)',
        transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out'
      }}
      role="alert"
      aria-live="polite"
    >
      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">
        {icon || (
          <Icon 
            name={getDefaultIcon()} 
            size={20} 
            style={{ color: variantStyles.iconColor }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium">
          {children}
        </div>
      </div>

      {/* Close Button */}
      {dismissible && showCloseButton && (
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors duration-200"
          aria-label="Close alert"
          style={{
            transform: 'scale(1)',
            transition: 'transform 0.2s ease-in-out'
          }}
        >
          <Icon 
            name="close" 
            size={16} 
            style={{ color: variantStyles.textColor }}
          />
        </button>
      )}
    </div>
  );
};

export default AlertBanner; 