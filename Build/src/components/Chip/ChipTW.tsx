import React from 'react';
import { cn } from '../../utils/classNames';
import Icon from '../Icon/Icon';

export interface ChipProps {
  /** Chip label text */
  label: string;
  /** Chip variant */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'grey' | 'purple';
  /** Chip size */
  size?: 'small' | 'medium' | 'large';
  /** Whether chip is clickable */
  onClick?: () => void;
  /** Whether to show close button */
  onClose?: () => void;
  /** Icon name to display */
  icon?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether chip is selected */
  selected?: boolean;
}

const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'default',
  size = 'medium',
  onClick,
  onClose,
  icon,
  className,
  selected = false,
}) => {
  // Base styles
  const baseStyles = cn(
    'inline-flex items-center gap-1 rounded-full font-medium transition-all duration-200',
    onClick && 'cursor-pointer hover:shadow-md',
    selected && 'ring-2 ring-offset-1'
  );

  // Size styles
  const sizeStyles = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-1.5 text-base',
  };

  // Variant styles with ODL colors
  const variantStyles = {
    default: cn(
      'bg-odl-primary-light text-odl-primary',
      selected && 'ring-odl-primary'
    ),
    success: cn(
      'bg-odl-success-light text-green-800',
      selected && 'ring-odl-success'
    ),
    warning: cn(
      'bg-odl-warning-light text-yellow-800',
      selected && 'ring-odl-warning'
    ),
    error: cn(
      'bg-odl-error-light text-red-800',
      selected && 'ring-odl-error'
    ),
    info: cn(
      'bg-odl-info-light text-blue-800',
      selected && 'ring-odl-info'
    ),
    grey: cn(
      'bg-gray-100 text-gray-700',
      selected && 'ring-gray-400'
    ),
    purple: cn(
      'bg-purple-100 text-purple-800',
      selected && 'ring-purple-400'
    ),
  };

  const iconSize = size === 'small' ? 12 : size === 'large' ? 16 : 14;

  return (
    <span
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      onClick={onClick}
    >
      {icon && (
        <Icon name={icon as any} size={iconSize} />
      )}
      {label}
      {onClose && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="ml-1 -mr-1 hover:bg-black/10 rounded-full p-0.5 transition-colors"
        >
          <Icon name="close" size={iconSize} />
        </button>
      )}
    </span>
  );
};

export default Chip;