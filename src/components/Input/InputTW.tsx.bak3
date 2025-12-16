import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/classNames';
import Icon from '../Icon/Icon';

export interface InputProps {
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'textarea';
  /** Input label */
  label?: string;
  /** Input placeholder */
  placeholder?: string;
  /** Input value */
  value?: string | number;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Blur handler */
  onBlur?: () => void;
  /** Focus handler */
  onFocus?: () => void;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Whether input is required */
  required?: boolean;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Helper text */
  helperText?: string;
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
  /** Icon name to display on the left */
  leftIcon?: string;
  /** Icon name to display on the right */
  rightIcon?: string;
  /** Additional CSS classes */
  className?: string;
  /** Input name attribute */
  name?: string;
  /** Input id attribute */
  id?: string;
  /** Textarea rows */
  rows?: number;
  /** Whether input takes full width */
  fullWidth?: boolean;
  /** Max length for input */
  maxLength?: number;
  /** Pattern for validation */
  pattern?: string;
  /** Autocomplete attribute */
  autoComplete?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  label,
  placeholder,
  value = '',
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  required = false,
  error = false,
  errorMessage,
  helperText,
  size = 'md',
  leftIcon,
  rightIcon,
  className,
  name,
  id,
  rows = 4,
  fullWidth = false,
  maxLength,
  pattern,
  autoComplete,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Handle focus states
  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  // Size styles
  const sizeStyles = {
    sm: {
      input: 'px-3 py-1.5 text-sm',
      icon: 14,
      label: 'text-sm',
    },
    md: {
      input: 'px-4 py-2 text-base',
      icon: 16,
      label: 'text-base',
    },
    lg: {
      input: 'px-5 py-3 text-lg',
      icon: 20,
      label: 'text-lg',
    },
  };

  // Base input styles
  const inputStyles = cn(
    // Base styles
    'w-full rounded border transition-all duration-200',
    'placeholder:text-odl-text-tertiary',
    'focus:outline-none focus:ring-2 focus:ring-offset-1',
    
    // Size styles
    sizeStyles[size].input,
    
    // Icon padding
    leftIcon && 'pl-10',
    rightIcon && 'pr-10',
    type === 'password' && 'pr-10',
    
    // State styles
    error ? [
      'border-odl-error text-odl-error',
      'focus:border-odl-error focus:ring-odl-error-light',
    ] : [
      'border-odl-border text-odl-text-primary',
      'focus:border-odl-primary focus:ring-odl-primary-light',
      'hover:border-odl-primary',
    ],
    
    // Disabled styles
    disabled && [
      'bg-odl-surface cursor-not-allowed opacity-60',
      'hover:border-odl-border',
    ],
    
    // Full width
    fullWidth && 'w-full',
    
    className
  );

  // Wrapper styles
  const wrapperStyles = cn(
    'relative',
    fullWidth && 'w-full',
  );

  // Label styles
  const labelStyles = cn(
    'block mb-1 font-medium text-odl-text-primary',
    sizeStyles[size].label,
    disabled && 'opacity-60',
  );

  // Helper/error text styles
  const helperStyles = cn(
    'mt-1 text-sm',
    error ? 'text-odl-error' : 'text-odl-text-tertiary',
  );

  // Icon styles
  const iconStyles = cn(
    'absolute top-1/2 -translate-y-1/2 text-odl-text-tertiary',
    disabled && 'opacity-60',
  );

  const inputElement = type === 'textarea' ? (
    <textarea
      ref={inputRef as React.RefObject<HTMLTextAreaElement>}
      className={cn(inputStyles, 'resize-y min-h-[100px]')}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      placeholder={placeholder}
      required={required}
      name={name}
      id={id}
      rows={rows}
      maxLength={maxLength}
    />
  ) : (
    <input
      ref={inputRef as React.RefObject<HTMLInputElement>}
      type={type === 'password' && showPassword ? 'text' : type}
      className={inputStyles}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      disabled={disabled}
      placeholder={placeholder}
      required={required}
      name={name}
      id={id}
      maxLength={maxLength}
      pattern={pattern}
      autoComplete={autoComplete}
    />
  );

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label htmlFor={id} className={labelStyles}>
          {label}
          {required && <span className="text-odl-error ml-1">*</span>}
        </label>
      )}
      
      <div className={wrapperStyles}>
        {leftIcon && (
          <div className={cn(iconStyles, 'left-3')}>
            <Icon name={leftIcon as any} size={sizeStyles[size].icon} />
          </div>
        )}
        
        {inputElement}
        
        {type === 'password' && (
          <button
            type="button"
            className={cn(iconStyles, 'right-3 cursor-pointer hover:text-odl-text-primary')}
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            <Icon
              name={showPassword ? 'view-off' : 'view'}
              size={sizeStyles[size].icon}
            />
          </button>
        )}
        
        {rightIcon && type !== 'password' && (
          <div className={cn(iconStyles, 'right-3')}>
            <Icon name={rightIcon as any} size={sizeStyles[size].icon} />
          </div>
        )}
      </div>
      
      {(errorMessage || helperText) && (
        <p className={helperStyles}>
          {errorMessage || helperText}
        </p>
      )}
    </div>
  );
};

export default Input;