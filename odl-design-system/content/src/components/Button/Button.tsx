import React, { useState, useEffect, useRef } from 'react';
import './Button.css';

export interface ButtonProps {
  /** The button text or content */
  children: React.ReactNode;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'text' | 'destructive' | 'ghost';
  /** Button size */
  size?: 'small' | 'medium' | 'large' | 'xs' | 'sm' | 'md' | 'lg';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in error state */
  error?: boolean;
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
  /** Additional inline styles (for edge cases only) */
  style?: React.CSSProperties;
  /** Whether the button is selected/active */
  selected?: boolean;
  /** Custom hover background color (for ghost variant) */
  customHoverBg?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** ARIA pressed state for toggle buttons */
  'aria-pressed'?: boolean;
  /** ARIA expanded state for dropdown triggers */
  'aria-expanded'?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  error = false,
  onClick,
  type = 'button',
  className,
  icon,
  iconRight,
  loading = false,
  style,
  selected = false,
  customHoverBg,
  'aria-label': ariaLabel,
  'aria-pressed': ariaPressed,
  'aria-expanded': ariaExpanded,
}) => {
  const [_isPressed, setIsPressed] = useState(false);
  const [_isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Normalize size prop
  const normalizedSize = size === 'xs' ? 'xs' : 
                        size === 'small' || size === 'sm' ? 'sm' :
                        size === 'medium' || size === 'md' ? 'md' :
                        size === 'large' || size === 'lg' ? 'lg' : 'md';

  // Build CSS classes
  const buttonClasses = [
    'button',
    `button--${variant}`,
    `button--${normalizedSize}`,
    disabled ? 'button--disabled' : '',
    error ? 'button--error' : '',
    loading ? 'button--loading' : '',
    selected ? 'button--selected' : '',
    (variant === 'ghost' && customHoverBg) ? 'button--custom-hover' : '',
    className
  ].filter(Boolean).join(' ');

  // Handle custom hover background for ghost variant
  useEffect(() => {
    if (variant === 'ghost' && customHoverBg && buttonRef.current) {
      buttonRef.current.style.setProperty('--custom-hover-bg', customHoverBg);
    }
  }, [variant, customHoverBg]);

  // Handle keyboard events for accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsPressed(true);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsPressed(false);
    }
  };

  const isDisabled = disabled || loading;

  return (
    <button
      ref={buttonRef}
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={isDisabled}
      onMouseEnter={() => !isDisabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => !isDisabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => !isDisabled && setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      aria-expanded={ariaExpanded}
      aria-disabled={isDisabled}
      style={style}
    >
      {loading && (
        <svg 
          className="button-spinner"
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle 
            style={{ opacity: 0.25 }}
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            style={{ opacity: 0.75 }}
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && icon && (
        <span className="button-icon button-icon--left">
          {icon}
        </span>
      )}
      <span className="button-content">
        {children}
      </span>
      {!loading && iconRight && (
        <span className="button-icon button-icon--right">
          {iconRight}
        </span>
      )}
    </button>
  );
};

export default Button;