import React from 'react';
import { ODLTheme } from '../../styles/ODLTheme';
import Icon from '../Icon/Icon';

export interface RadioButtonProps {
  /** Whether the radio button is checked */
  checked?: boolean;
  /** Label text for the radio button */
  label?: string;
  /** Whether the radio button is disabled */
  disabled?: boolean;
  /** Whether the radio button has an error state */
  error?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** ID for the radio input */
  id?: string;
  /** Name attribute for the radio input (required for grouping) */
  name?: string;
  /** Value attribute for the radio input */
  value?: string;
}

export interface RadioButtonGroupProps {
  /** Array of radio button options */
  options: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  /** Currently selected value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Layout orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Gap between radio buttons */
  gap?: string | number;
  /** Additional CSS classes */
  className?: string;
  /** Group label */
  label?: string;
  /** Whether the group has an error state */
  error?: boolean;
  /** Error message to display */
  errorMessage?: string;
  /** Size variant for all radio buttons in the group */
  size?: 'sm' | 'md' | 'lg';
  /** Name attribute for the radio button group */
  name: string;
  /** Whether the entire group is disabled */
  disabled?: boolean;
}

export default function RadioButton({
  checked = false,
  label,
  disabled = false,
  error = false,
  className = '',
  onChange,
  size = 'md',
  id,
  name,
  value,
}: RadioButtonProps) {
  const [isPressed, setIsPressed] = React.useState(false);

  // Add hover and pressed state CSS
  React.useEffect(() => {
    const styleId = 'odl-radio-interaction-styles';
    
    // Remove existing style if it exists
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      document.head.removeChild(existingStyle);
    }
    
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .odl-radio-wrapper {
        transition: background-color 0.15s ease;
        background-color: transparent;
      }
      
      .odl-radio-wrapper:hover:not([aria-disabled="true"]) {
        background-color: #E8E8E8 !important;
      }
      
      .odl-radio-wrapper.pressed:not([aria-disabled="true"]) {
        background-color: #d1d1d1 !important;
      }
      
      .odl-radio-wrapper[aria-disabled="true"]:hover,
      .odl-radio-wrapper[aria-disabled="true"].pressed {
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

  const radioStyle: React.CSSProperties = {
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

  const hiddenInputStyle: React.CSSProperties = {
    position: 'absolute',
    opacity: 0,
    width: 0,
    height: 0,
    margin: 0,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(e.target.checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!disabled && onChange) {
        onChange(true);
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

  const renderRadioIcon = () => {
    const iconColor = disabled ? '#ACACAC' : (error ? '#D0000A' : (checked ? '#3560C1' : '#525965'));
    
    if (checked) {
      return (
        <Icon
          name="radio-button-checked"
          size={dimensions.iconSize}
          color={iconColor}
          aria-hidden="true"
        />
      );
    }

    return (
      <Icon
        name="radio-button"
        size={dimensions.iconSize}
        color={iconColor}
        aria-hidden="true"
      />
    );
  };

  return (
    <div style={containerStyle} className={className}>
      <div
        className={`odl-radio-wrapper${isPressed ? ' pressed' : ''}`}
        style={radioStyle}
        onClick={() => !disabled && onChange?.(true)}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        tabIndex={disabled ? -1 : 0}
        role="radio"
        aria-checked={checked}
        aria-disabled={disabled ? 'true' : 'false'}
        aria-labelledby={label ? `${id}-label` : undefined}
        {...(error && { 'aria-invalid': true })}
      >
        <input
          type="radio"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          style={hiddenInputStyle}
          id={id}
          name={name}
          value={value}
        />
        {renderRadioIcon()}
      </div>
      {label && (
        <label
          htmlFor={id}
          id={`${id}-label`}
          style={labelStyle}
          onClick={() => !disabled && onChange?.(true)}
        >
          {label}
        </label>
      )}
    </div>
  );
}

export function RadioButtonGroup({
  options,
  value,
  onChange,
  orientation = 'vertical',
  gap = '12px',
  className = '',
  label,
  error = false,
  errorMessage,
  size = 'md',
  name,
  disabled = false,
}: RadioButtonGroupProps) {
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

  const handleOptionChange = (optionValue: string) => {
    if (onChange && !disabled) {
      onChange(optionValue);
    }
  };

  return (
    <div style={containerStyle} className={className}>
      {label && (
        <label style={labelStyle}>
          {label}
        </label>
      )}
      <div style={groupStyle} role="radiogroup" aria-labelledby={label ? undefined : undefined}>
        {options.map((option) => (
          <RadioButton
            key={option.value}
            checked={value === option.value}
            label={option.label}
            disabled={disabled || option.disabled}
            error={error}
            onChange={() => handleOptionChange(option.value)}
            size={size}
            name={name}
            value={option.value}
            id={`${name}-${option.value}`}
          />
        ))}
      </div>
      {error && errorMessage && (
        <div style={errorStyle} role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
}