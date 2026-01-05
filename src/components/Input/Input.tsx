import React, { useEffect, useRef } from 'react';
import Icon from '../Icon/Icon';
import { ODLTheme } from '../../styles/ODLTheme';
import { useTheme } from '../../../.storybook/theme-decorator';
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
  // Get theme colors
  const { colors } = useTheme();
  
  // Handle legacy API compatibility
  const actualLabel = label || labelText;
  const actualError = error || invalid || false;
  const actualErrorMessage = errorMessage || invalidText;
  const styleRef = useRef<HTMLStyleElement | null>(null);

  // Inject dynamic styles for hover, focus, and placeholder states
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .custom-input:hover:not(.custom-input--disabled):not(.custom-input--readonly) {
        background-color: ${colors.grey400} !important;
        border: ${ODLTheme.borders.width.base} solid transparent !important;
        border-bottom: 1px solid ${colors.inputBorder} !important;
        box-shadow: inset 0 0 0 1px ${colors.primaryMain} !important;
      }
      .custom-input:focus:not(.custom-input--readonly),
      .custom-input:active:not(.custom-input--readonly) {
        background-color: ${colors.grey400} !important;
        border-bottom: none !important;
        border: 1px solid ${colors.primaryMain} !important;
        box-shadow: inset 0 0 0 1px ${colors.primaryMain} !important;
        outline: none !important;
      }
      .custom-input:focus-visible:not(.custom-input--readonly) {
        background-color: ${colors.grey400} !important;
        border-bottom: none !important;
        border: 1px solid ${colors.primaryMain} !important;
        box-shadow: inset 0 0 0 1px ${colors.primaryMain} !important;
        outline: none !important;
      }
      .custom-input--readonly:focus,
      .custom-input--readonly:active {
        border: ${ODLTheme.borders.width.base} solid transparent !important;
        border-bottom: 1px solid ${colors.inputBorder} !important;
        outline: none !important;
      }
      .custom-input::placeholder {
        color: ${colors.textMuted} !important;
        opacity: 1 !important;
      }
      .custom-input--disabled::placeholder {
        color: ${colors.textDisabled} !important;
      }
      .custom-input--error {
        background-color: ${colors.grey400} !important;
      }
      .custom-input--error:focus,
      .custom-input--error:active {
        background-color: ${colors.grey400} !important;
        border: ${ODLTheme.borders.width.base} solid transparent !important;
        box-shadow: inset 0 0 0 ${ODLTheme.borders.width.base} ${colors.errorMain} !important;
        outline: none !important;
      }
      /* Date input calendar icon styling - hide native icon */
      input[type="date"]::-webkit-calendar-picker-indicator {
        opacity: 0;
        position: absolute;
        right: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
      input[type="date"]::-moz-calendar-picker-indicator {
        opacity: 0;
        position: absolute;
        right: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
      input[type="date"]::-ms-calendar-picker-indicator {
        opacity: 0;
        position: absolute;
        right: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
    styleRef.current = style;

    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [colors]);

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

  // Automatically add calendar icon for date inputs if no iconRight is provided
  const shouldShowDateIcon = type === 'date' && !iconRight && !actualError;

  const inputClasses = [
    'custom-input',
    sizeClasses[size],
    actualError ? 'custom-input--error' : '',
    disabled ? 'custom-input--disabled' : '',
    readOnly ? 'custom-input--readonly' : '',
    icon ? 'custom-input--with-icon' : '',
    (iconRight || actualError || shouldShowDateIcon) ? 'custom-input--with-right-elements' : '',
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

  // Dynamic styles using ODLTheme
  const getInputStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      width: '100%',
      padding: size === 'sm' 
        ? `${ODLTheme.spacing[2]} ${ODLTheme.spacing[3]}`
        : size === 'lg'
        ? `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`
        : `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
      border: `${ODLTheme.borders.width.base} solid transparent`,
      borderBottom: `1px solid ${colors.inputBorder}`,
      backgroundColor: colors.inputBackground,
      color: disabled ? colors.textDisabled : colors.textPrimary,
      fontSize: size === 'sm' 
        ? ODLTheme.typography.fontSize.xs
        : ODLTheme.typography.fontSize.base,
      fontWeight: ODLTheme.typography.fontWeight.normal,
      lineHeight: size === 'sm'
        ? ODLTheme.typography.lineHeight.inputSm
        : ODLTheme.typography.lineHeight.inputBase,
      fontFamily: ODLTheme.typography.fontFamily.sans,
      outline: 'none',
      transition: ODLTheme.transitions.input,
      borderRadius: 0,
    };

    if (icon && type !== 'textarea') {
      baseStyles.paddingLeft = ODLTheme.spacing[10];
    }
    if ((iconRight || actualError) && type !== 'textarea') {
      baseStyles.paddingRight = ODLTheme.spacing[10];
    }
    if (actualError && type === 'textarea') {
      baseStyles.paddingRight = ODLTheme.spacing[10];
    }
    if (size === 'lg') {
      baseStyles.minHeight = ODLTheme.spacing[11];
      baseStyles.height = ODLTheme.spacing[11];
    }
    if (actualError) {
      baseStyles.backgroundColor = colors.grey400;
      baseStyles.border = `${ODLTheme.borders.width.base} solid ${colors.errorMain}`;
      baseStyles.borderBottom = `${ODLTheme.borders.width.base} solid ${colors.errorMain}`;
    }
    if (disabled) {
      baseStyles.borderBottom = `${ODLTheme.borders.width.base} solid transparent`;
      baseStyles.cursor = 'not-allowed';
    }
    if (readOnly) {
      baseStyles.cursor = 'default';
    }

    return baseStyles;
  };

  const labelStyles: React.CSSProperties = {
    display: 'block',
    fontSize: ODLTheme.typography.fontSize.base,
    fontWeight: ODLTheme.typography.fontWeight.semibold,
    lineHeight: ODLTheme.typography.lineHeight.inputBase,
    color: colors.primaryNight,
    marginBottom: ODLTheme.spacing[2],
    fontFamily: ODLTheme.typography.fontFamily.sans,
  };

  const helperTextStyles: React.CSSProperties = {
    marginTop: 0,
    marginBottom: ODLTheme.spacing[3],
    fontSize: ODLTheme.typography.fontSize.base,
    lineHeight: 1.5,
    color: colors.primaryTwilight,
    fontWeight: ODLTheme.typography.fontWeight.normal,
    fontFamily: ODLTheme.typography.fontFamily.sans,
  };

  const errorMessageStyles: React.CSSProperties = {
    marginTop: ODLTheme.spacing[1],
    fontSize: ODLTheme.typography.fontSize.xs,
    lineHeight: ODLTheme.typography.lineHeight.inputSm,
    color: colors.errorMain,
    fontWeight: ODLTheme.typography.fontWeight.normal,
    fontFamily: ODLTheme.typography.fontFamily.sans,
  };

  const iconStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const leftIconStyles: React.CSSProperties = {
    ...iconStyles,
    left: ODLTheme.spacing[3],
    color: colors.primaryTwilight,
  };

  const rightIconStyles: React.CSSProperties = {
    ...iconStyles,
    right: ODLTheme.spacing[3],
    color: colors.primaryTwilight,
  };

  const dateIconStyles: React.CSSProperties = {
    ...iconStyles,
    right: ODLTheme.spacing[3],
    color: colors.primaryNight,
    pointerEvents: 'none', // Allow click to pass through to native date picker
  };

  const errorIconStyles: React.CSSProperties = {
    ...rightIconStyles,
    color: colors.errorMain,
  };

  return (
    <div className="input-wrapper" style={{ marginBottom: 0, width: '100%' }}>
      {actualLabel && !hideLabel && (
        <label 
          htmlFor={id} 
          className="input-label"
          style={labelStyles}
        >
          {actualLabel}
          {required && (
            <span style={{ color: colors.errorMain }}> *</span>
          )}
        </label>
      )}
      {helperText && !actualError && actualLabel && !hideLabel && (
        <div id={`${inputId}-helper`} className="input-helper-text" style={helperTextStyles}>
          {helperText}
        </div>
      )}
      
      <div className="input-field-wrapper" style={{ position: 'relative' }}>
        {icon && type !== 'textarea' && (
          <div className="input-icon input-icon--left" style={leftIconStyles}>
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
            style={getInputStyles()}
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
            style={getInputStyles()}
            aria-invalid={actualError}
            aria-label={finalAriaLabel}
            aria-describedby={describedByIds}
          />
        )}
        
        {iconRight && !actualError && type !== 'textarea' && (
          <div className="input-icon input-icon--right" style={rightIconStyles}>
            {iconRight}
          </div>
        )}
        
        {shouldShowDateIcon && (
          <div className="input-icon input-icon--right" style={dateIconStyles}>
            <Icon name="calendar" size={16} />
          </div>
        )}
        
        {actualError && (
          <div className="input-icon input-icon--right input-error-icon" style={errorIconStyles}>
            <Icon name="warning" size={16} />
          </div>
        )}
      </div>
      
      {actualErrorMessage && actualError && (
        <div id={`${inputId}-error`} className="input-error-message" style={errorMessageStyles}>
          {actualErrorMessage}
        </div>
      )}
    </div>
  );
};

export default Input;