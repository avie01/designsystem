import React from 'react';
import { cn } from '../../utils/classNames';
import Icon from '../Icon/Icon';
import Spinner from '../Spinner/Spinner';

export interface ButtonProps {
  /** The button text or content */
  children: React.ReactNode;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive';
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Additional CSS classes */
  className?: string;
  /** Icon name to display on the left */
  leftIcon?: string;
  /** Icon name to display on the right */
  rightIcon?: string;
  /** Whether to show loading state */
  loading?: boolean;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Whether button takes full width */
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className,
  leftIcon,
  rightIcon,
  loading = false,
  style,
  fullWidth = false,
}) => {
  const isDisabled = disabled || loading;

  // Base styles using Tailwind classes
  const baseStyles = cn(
    // Base layout and typography
    'inline-flex items-center justify-center',
    'font-medium rounded',
    'transition-all duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    
    // Full width option
    fullWidth && 'w-full',
    
    // Disabled state
    isDisabled && 'cursor-not-allowed opacity-60',
    !isDisabled && 'hover:shadow-md active:scale-[0.98]'
  );

  // Size variants with ODL spacing
  const sizeStyles = {
    xs: 'px-2 py-1 text-xs gap-1',
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5',
  };

  // Variant styles using ODL colors
  const variantStyles = {
    primary: cn(
      'bg-odl-primary text-white',
      'hover:bg-odl-primary-hover',
      'focus-visible:ring-odl-primary',
      'disabled:bg-gray-300 disabled:text-gray-500'
    ),
    secondary: cn(
      'bg-white text-odl-text-primary',
      'border border-odl-border',
      'hover:bg-odl-surface',
      'focus-visible:ring-odl-primary',
      'disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200'
    ),
    tertiary: cn(
      'bg-odl-primary-light text-odl-primary',
      'hover:bg-blue-100',
      'focus-visible:ring-odl-primary',
      'disabled:bg-gray-100 disabled:text-gray-400'
    ),
    ghost: cn(
      'bg-transparent text-odl-text-primary',
      'hover:bg-odl-surface',
      'focus-visible:ring-odl-primary',
      'disabled:text-gray-400'
    ),
    destructive: cn(
      'bg-odl-error text-white',
      'hover:bg-red-700',
      'focus-visible:ring-odl-error',
      'disabled:bg-gray-300 disabled:text-gray-500'
    ),
  };


  return (
    <button
      type={type}
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      disabled={isDisabled}
      onClick={onClick}
      style={style}
    >
      {loading && <Spinner className="animate-spin" size={16} />}
      {!loading && leftIcon && (
        <Icon name={leftIcon as any} size={size === 'xs' ? 12 : size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      )}
      {children}
      {!loading && rightIcon && (
        <Icon name={rightIcon as any} size={size === 'xs' ? 12 : size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      )}
    </button>
  );
};

export default Button;