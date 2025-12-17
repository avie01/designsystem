import React from 'react';
import clsx from 'clsx';

export interface InputProps {
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  /** Input placeholder */
  placeholder?: string;
  /** Input value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Input name */
  name?: string;
  /** Input id */
  id?: string;
  /** Additional CSS classes */
  className?: string;
  /** Icon to display before input */
  icon?: React.ReactNode;
  /** Icon to display after input */
  iconRight?: React.ReactNode;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Label for the input */
  label?: string;
  /** Helper text */
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  required = false,
  name,
  id,
  className,
  icon,
  iconRight,
  error = false,
  errorMessage,
  label,
  helperText,
}) => {
  // Use ODL base input class with overrides for specific styling
  const baseClasses = 'odl-input-base bg-[#f5f5f5] border-0 border-b border-[#525965] focus:ring-0 focus:border-2 focus:border-blue-500';
  
  const stateClasses = {
    default: 'text-gray-900 placeholder-gray-500',
    disabled: 'text-gray-400 bg-gray-100 cursor-not-allowed',
    error: 'border-red-500 focus:border-red-500',
  };

  const getStateClass = () => {
    if (disabled) return stateClasses.disabled;
    if (error) return stateClasses.error;
    return stateClasses.default;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="odl-form-group">
      {label && (
        <label 
          htmlFor={id} 
          className="odl-form-label"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={clsx(
            baseClasses,
            getStateClass(),
            icon && 'pl-10',
            iconRight && 'pr-10',
            className
          )}
        />
        
        {iconRight && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {iconRight}
          </div>
        )}
      </div>
      
      {errorMessage && (
        <p className="odl-form-error">
          {errorMessage}
        </p>
      )}
      
      {helperText && !error && (
        <p className="odl-form-help">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;