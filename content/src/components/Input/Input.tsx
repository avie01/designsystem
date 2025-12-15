import React from 'react';
import Icon from '../Icon/Icon';
import './Input.css';

export interface InputProps {
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'textarea';
  /** Input placeholder */
  placeholder?: string;
  /** Input value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input is read-only */
  readOnly?: boolean;
  /** Whether the input is required */
  required?: boolean;
  /** Input name */
  name?: string;
  /** Input id */
  id?: string;
  /** Additional CSS classes */
  className?: string;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Label for the input */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Hide label visually */
  hideLabel?: boolean;
  /** Icon element to display before input */
  icon?: React.ReactNode;
  /** Icon element to display after input */
  iconRight?: React.ReactNode;
  /** Number of rows for textarea */
  rows?: number;
  /** Whether textarea is resizable */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  /** Aria label for the input (required when label is hidden) */
  'aria-label'?: string;
  /** Aria describedby for additional context */
  'aria-describedby'?: string;

  // Legacy API compatibility (Carbon Design System style)
  /** Legacy: Label text (alias for label) */
  labelText?: string;
  /** Legacy: Invalid state (alias for error) */
  invalid?: boolean;
  /** Legacy: Invalid text (alias for errorMessage) */
  invalidText?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  readOnly = false,
  required = false,
  name,
  id,
  className = '',
  error = false,
  errorMessage,
  label,
  helperText,
  size = 'md',
  hideLabel = false,
  icon,
  iconRight,
  rows = 4,
  resize = 'vertical',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  // Legacy props
  labelText,
  invalid,
  invalidText,
}) => {
  // Handle legacy API compatibility
  const actualLabel = label || labelText;
  const actualError = error || invalid || false;
  const actualErrorMessage = errorMessage || invalidText;

  // Determine aria-label: use provided one, or fallback to label if hidden
  const finalAriaLabel = ariaLabel || (hideLabel && actualLabel ? actualLabel : undefined);

  // Build aria-describedby combining custom and auto-generated IDs
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const describedByIds = [
    ariaDescribedBy,
    actualErrorMessage ? `${inputId}-error` : null,
    helperText ? `${inputId}-helper` : null
  ].filter(Boolean).join(' ') || undefined;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  // Custom styling classes
  const sizeClasses = {
    sm: 'input-size--sm',
    md: 'input-size--md', 
    lg: 'input-size--lg'
  };

  const inputClasses = [
    'custom-input',
    sizeClasses[size],
    actualError ? 'custom-input--error' : '',
    disabled ? 'custom-input--disabled' : '',
    readOnly ? 'custom-input--readonly' : '',
    icon ? 'custom-input--with-icon' : '',
    (iconRight || actualError) ? 'custom-input--with-right-elements' : '',
    className
  ].filter(Boolean).join(' ');

  const textareaClasses = [
    'custom-input',
    sizeClasses[size],
    actualError ? 'custom-input--error' : '',
    disabled ? 'custom-input--disabled' : '',
    readOnly ? 'custom-input--readonly' : '',
    actualError ? 'custom-textarea--with-error' : '',
    resize ? `custom-textarea--resize-${resize}` : 'custom-textarea--resize-vertical',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="input-wrapper">
      {actualLabel && !hideLabel && (
        <label 
          htmlFor={id} 
          className="input-label"
        >
          {actualLabel}
          {required && <span className="input-label--required"> *</span>}
        </label>
      )}
      
      <div className="input-field-wrapper">
        {icon && type !== 'textarea' && (
          <div className="input-icon input-icon--left">
            {icon}
          </div>
        )}
        
        {type === 'textarea' ? (
          <textarea
            id={inputId}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            className={textareaClasses}
            aria-invalid={actualError}
            aria-label={finalAriaLabel}
            aria-describedby={describedByIds}
            rows={rows}
          />
        ) : (
          <input
            type={type}
            id={inputId}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            required={required}
            className={inputClasses}
            aria-invalid={actualError}
            aria-label={finalAriaLabel}
            aria-describedby={describedByIds}
          />
        )}
        
        {iconRight && !actualError && type !== 'textarea' && (
          <div className="input-icon input-icon--right">
            {iconRight}
          </div>
        )}
        
        {actualError && (
          <div className="input-icon input-icon--right input-error-icon">
            <Icon name="warning" size={16} />
          </div>
        )}
      </div>
      
      {actualErrorMessage && actualError && (
        <div id={`${inputId}-error`} className="input-error-message">
          {actualErrorMessage}
        </div>
      )}

      {helperText && !actualError && (
        <div id={`${inputId}-helper`} className="input-helper-text">
          {helperText}
        </div>
      )}
    </div>
  );
};

export default Input;