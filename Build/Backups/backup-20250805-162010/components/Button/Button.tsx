import React, { useState } from 'react';
import clsx from 'clsx';

export interface ButtonProps {
  /** The button text or content */
  children: React.ReactNode;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'text' | 'destructive';
  /** Button size */
  size?: 'small' | 'medium' | 'large';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Additional CSS classes */
  className?: string;
  /** Icon to display before text */
  icon?: React.ReactNode;
  /** Icon to display after text */
  iconRight?: React.ReactNode;
  /** Whether to show loading state */
  loading?: boolean;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
  className,
  icon,
  iconRight,
  loading = false,
  style,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Use ODL base button class as foundation
  const baseClasses = 'odl-button-base';
  
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm min-h-8',
    medium: 'px-4 py-2 text-sm min-h-9',
    large: 'px-6 py-3 text-base min-h-11',
  };

  const variantClasses = {
    primary: 'odl-button-primary',
    secondary: 'odl-button-secondary',
    tertiary: clsx(
      'bg-blue-100 text-gray-700 border border-blue-100',
      'hover:bg-blue-200 hover:border-blue-200 hover:text-gray-800',
      'disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400'
    ),
    text: clsx(
      'bg-transparent text-gray-700 border border-transparent',
      'hover:bg-gray-200 hover:text-gray-800',
      'disabled:bg-transparent disabled:text-gray-400'
    ),
    destructive: clsx(
      'bg-transparent text-red-600 border border-transparent',
      'hover:bg-red-50 hover:text-red-700',
      'disabled:bg-transparent disabled:text-gray-400'
    ),
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      style={{
        transform: isPressed ? 'scale(0.95)' : isHovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.2s ease-in-out',
        ...style
      }}
      className={clsx(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        'rounded-none', // 0 border radius as requested
        isDisabled && 'cursor-not-allowed',
        className
      )}
      onClick={onClick}
      disabled={isDisabled}
      onMouseEnter={() => !isDisabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => !isDisabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => !isDisabled && setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
    >
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && icon && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {!loading && iconRight && (
        <span className="ml-2">{iconRight}</span>
      )}
    </button>
  );
};

export default Button;