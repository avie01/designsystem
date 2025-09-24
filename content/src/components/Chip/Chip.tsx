import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import './Chip.css';

// Self-contained utility function to replace clsx
const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export interface ChipProps {
  /** Size variant - affects typography and spacing */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state - affects colors and interaction */
  disabled?: boolean;
  /** Error state - uses error colors */
  error?: boolean;
  /** The text content to display */
  label: string;
  /** The color variant of the chip */
  variant?: 'blue' | 'lightGreen' | 'darkGreen' | 'orange' | 'red' | 'yellow' | 'purple' | 'teal' | 'burgundy' | 'grey' | 'white' | 'success' | 'error' | 'warning' | 'info';
  /** Whether to show the document icon */
  showDocumentIcon?: boolean;
  /** Whether to show the info icon */
  showInfoIcon?: boolean;
  /** Custom icon name from Carbon library */
  iconName?: string;
  /** Whether the chip is clickable */
  clickable?: boolean;
  /** Callback when chip is clicked */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** ARIA label for screen readers */
  'aria-label'?: string;
  /** ARIA described by for additional context */
  'aria-describedby'?: string;
  /** Keyboard event handlers */
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const Chip: React.FC<ChipProps> = ({
  size = 'md',
  disabled = false,
  error = false,
  label,
  variant = 'grey',
  showDocumentIcon = false,
  showInfoIcon = false,
  iconName,
  clickable = false,
  onClick,
  className = "",
  style,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  onKeyDown,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  // Generate component classes
  const componentClasses = classNames(
    'chip',
    `chip--${size}`,
    `chip--${variant}`,
    clickable && 'chip--clickable',
    disabled && 'chip--disabled',
    error && 'chip--error',
    className
  );

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
    if (e.key === 'Escape') {
      e.currentTarget.blur();
    }
    
    onKeyDown?.(e);
  };

  const handleClick = () => {
    if (!disabled && clickable && onClick) {
      onClick();
    }
  };

  return (
    <span
      className={componentClasses}
      style={style}
      role={clickable ? 'button' : 'status'}
      aria-label={ariaLabel || `${label} chip${clickable ? ', clickable' : ''}`}
      aria-describedby={ariaDescribedBy}
      tabIndex={disabled ? -1 : clickable ? 0 : -1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {/* Document icon */}
      {showDocumentIcon && (
        <div className="chip__icon">
          <Icon 
            name="document" 
            size={size === 'sm' ? 12 : size === 'lg' ? 20 : 16}
          />
        </div>
      )}
      
      {/* Custom icon */}
      {iconName && !showDocumentIcon && (
        <div className="chip__icon">
          <Icon 
            name={iconName} 
            size={size === 'sm' ? 12 : size === 'lg' ? 20 : 16}
          />
        </div>
      )}
      
      {/* Label text */}
      <span className="chip__text">{label}</span>
      
      {/* Info icon */}
      {showInfoIcon && (
        <div className="chip__icon">
          <Icon 
            name="information" 
            size={size === 'sm' ? 12 : size === 'lg' ? 20 : 16}
          />
        </div>
      )}
    </span>
  );
};

export default Chip; 