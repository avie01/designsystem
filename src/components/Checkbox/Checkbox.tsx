import React from 'react';
import { ODLTheme } from '../../styles/ODLTheme';
import Icon from '../Icon/Icon';

export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Label text for the checkbox */
  label?: string;
  /** Whether the checkbox is disabled */
  disabled?: boolean;
  /** Whether the checkbox is in an indeterminate state */
  indeterminate?: boolean;
  /** Whether the checkbox has an error state */
  error?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** ID for the checkbox input */
  id?: string;
  /** Name attribute for the checkbox input */
  name?: string;
  /** ARIA label for accessibility when no visible label is provided */
  'aria-label'?: string;
}

export interface CheckboxGroupProps {
  /** Array of checkbox items */
  children: React.ReactNode;
  /** Layout orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Gap between checkboxes */
  gap?: string | number;
  /** Additional CSS classes */
  className?: string;
  /** Group label */
  label?: string;
  /** Whether the group has an error state */
  error?: boolean;
  /** Error message to display */
  errorMessage?: string;
}

export default function Checkbox({
  checked = false,
  label,
  disabled = false,
  indeterminate = false,
  error = false,
  className = '',
  onChange,
  size = 'md',
  id,
  name,
  'aria-label': ariaLabel,
}: CheckboxProps) {
  const [isPressed, setIsPressed] = React.useState(false);

  // Add hover and pressed state CSS
  React.useEffect(() => {
    const styleId = 'odl-checkbox-interaction-styles';
    
    // Remove existing style if it exists
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      document.head.removeChild(existingStyle);
    }
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .odl-checkbox-wrapper {
        transition: background-color 0.15s ease;
        background-color: transparent;
      }
      
      .odl-checkbox-wrapper:hover:not([aria-disabled="true"]) {
        background-color: #E8E8E8 !important;
      }
      
      .odl-checkbox-wrapper.pressed:not([aria-disabled="true"]) {
        background-color: #d1d1d1 !important;
      }
      
      .odl-checkbox-wrapper[aria-disabled="true"]:hover,
      .odl-checkbox-wrapper[aria-disabled="true"].pressed {
        background-color: transparent !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      const styleElement = document.getElementById(styleId);
      if (styleElement && document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  const sizeMap = {
    sm: { iconSize: 16, fontSize: '14px' },
    md: { iconSize: 20, fontSize: '16px' },
    lg: { iconSize: 24, fontSize: '18px' }
  };

  const dimensions = sizeMap[size];

  const checkboxStyle: React.CSSProperties = {
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.6 : 1,
    position: 'relative',
    flexShrink: 0,
    width: dimensions.iconSize + 12, // Add more padding around icon
    height: dimensions.iconSize + 12,
    borderRadius: '100px',
    margin: '-6px', // Offset the added padding
    backgroundColor: 'transparent', // Ensure background starts transparent
  };

  const labelStyle: React.CSSProperties = {
    fontSize: dimensions.fontSize,
    color: disabled ? ODLTheme.colors.text.disabled : (error ? '#D0000A' : ODLTheme.colors.text.primary),
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    lineHeight: '1.4',
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: ODLTheme.spacing[2],
  };


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!disabled && onChange) {
        onChange(!checked);
      }
    }
  };

  const handleMouseDown = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  const renderCheckboxIcon = () => {
    const iconColor = error ? '#D0000A' : (checked || indeterminate ? '#3560C1' : '#525965');
    
    if (indeterminate) {
      return (
        <Icon
          name="checkbox-indeterminate-filled"
          size={dimensions.iconSize}
          color={iconColor}
          aria-hidden="true"
        />
      );
    }

    if (checked) {
      return (
        <Icon
          name="checkbox-checked-filled"
          size={dimensions.iconSize}
          color={iconColor}
          aria-hidden="true"
        />
      );
    }

    return (
      <Icon
        name="checkbox"
        size={dimensions.iconSize}
        color={iconColor}
        aria-hidden="true"
      />
    );
  };

  return (
    <div style={containerStyle} className={className}>
      <div
        className={`odl-checkbox-wrapper${isPressed ? ' pressed' : ''}`}
        style={checkboxStyle}
        onClick={() => !disabled && onChange?.(!checked)}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        tabIndex={disabled ? -1 : 0}
        role="checkbox"
        aria-checked={indeterminate ? 'mixed' : checked}
        aria-disabled={disabled ? 'true' : 'false'}
        aria-labelledby={label ? `${id}-label` : undefined}
        aria-label={!label ? ariaLabel : undefined}
        {...(error && { 'aria-invalid': true })}
      >
        {renderCheckboxIcon()}
      </div>
      {label && (
        <div
          id={`${id}-label`}
          style={labelStyle}
          onClick={() => !disabled && onChange?.(!checked)}
        >
          {label}
        </div>
      )}
    </div>
  );
}

export function CheckboxGroup({
  children,
  orientation = 'vertical',
  gap = '12px',
  className = '',
  label,
  error = false,
  errorMessage,
}: CheckboxGroupProps) {
  const groupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: orientation === 'vertical' ? 'column' : 'row',
    gap: gap,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 600,
    color: error ? '#D0000A' : ODLTheme.colors.text.primary,
    marginBottom: '8px',
  };

  const errorStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#D0000A',
    marginTop: '4px',
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={containerStyle} className={className}>
      {label && (
        <label style={labelStyle}>
          {label}
        </label>
      )}
      <div style={groupStyle} role="group" aria-labelledby={label ? undefined : undefined}>
        {children}
      </div>
      {error && errorMessage && (
        <div style={errorStyle} role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
}