import React, { useState, useRef } from 'react';
import { useTheme } from '../../../.storybook/theme-decorator';
import Icon from '../Icon/Icon';

export interface SwitchProps {
  /** Whether the switch is checked/on */
  checked?: boolean;
  /** Label text for the switch */
  label?: string;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Whether the switch has an error state */
  error?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Change handler */
  onChange?: (checked: boolean) => void;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** ID for the switch input */
  id?: string;
  /** Name attribute for the switch input */
  name?: string;
  /** ARIA label for accessibility when no visible label is provided */
  'aria-label'?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Description text below the switch */
  description?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked = false,
  label,
  disabled = false,
  error = false,
  className = '',
  onChange,
  size = 'md',
  id,
  name,
  'aria-label': ariaLabel,
  style,
  description,
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange?.(e.target.checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault();
      if (!disabled) {
        onChange?.(!checked);
      }
    }
  };

  // Size configurations
  const sizeConfig = {
    sm: {
      track: { width: 32, height: 18 },
      thumb: { size: 14, offset: 2 },
      fontSize: '12px',
    },
    md: {
      track: { width: 44, height: 24 },
      thumb: { size: 20, offset: 2 },
      fontSize: '14px',
    },
    lg: {
      track: { width: 52, height: 28 },
      thumb: { size: 24, offset: 2 },
      fontSize: '16px',
    },
  };

  const config = sizeConfig[size];

  // Dynamic styles based on state
  const getTrackStyles = () => {
    let backgroundColor = colors.grey600 || '#525965';
    let borderColor = colors.grey600 || '#525965';

    if (disabled) {
      backgroundColor = colors.grey200;
      borderColor = colors.grey200;
    } else if (checked) {
      backgroundColor = error ? colors.errorMain : colors.primaryMain;
      borderColor = error ? colors.errorMain : colors.primaryMain;
    } else if (error) {
      backgroundColor = colors.grey600 || '#525965';
      borderColor = colors.errorMain;
    }

    return {
      width: config.track.width,
      height: config.track.height,
      backgroundColor,
      border: `1px solid ${borderColor}`,
      borderRadius: config.track.height / 2,
      position: 'relative' as const,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      outline: isFocused ? `2px solid ${colors.primaryMain}20` : 'none',
      outlineOffset: '2px',
    };
  };

  const getThumbStyles = () => {
    const translateX = checked 
      ? config.track.width - config.thumb.size - config.thumb.offset
      : config.thumb.offset;

    return {
      width: config.thumb.size,
      height: config.thumb.size,
      backgroundColor: disabled ? colors.grey400 : colors.paper,
      borderRadius: '50%',
      position: 'absolute' as const,
      top: '50%',
      left: 0,
      transform: `translate(${translateX}px, -50%)`,
      transition: 'transform 0.2s ease',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    };
  };

  const getLabelStyles = () => ({
    fontSize: config.fontSize,
    color: disabled ? colors.textDisabled : error ? colors.errorMain : colors.textPrimary,
    fontWeight: 500,
    lineHeight: '1.5',
  });

  const getDescriptionStyles = () => ({
    fontSize: size === 'sm' ? '11px' : '12px',
    color: disabled ? colors.textDisabled : colors.textSecondary,
    lineHeight: '1.4',
    marginTop: '4px',
  });

  return (
    <div 
      className={`switch-container ${className}`}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: '4px',
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: colors.spacing[2] || '8px',
        }}
      >
        {/* Hidden input for accessibility */}
        <input
          ref={inputRef}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          id={id}
          name={name}
          aria-label={ariaLabel || label}
          aria-describedby={description ? `${id}-description` : undefined}
          style={{
            position: 'absolute',
            opacity: 0,
            width: 0,
            height: 0,
            margin: 0,
            padding: 0,
          }}
        />

        {/* Switch track and thumb */}
        <div
          onClick={() => !disabled && onChange?.(!checked)}
          style={getTrackStyles()}
          role="switch"
          aria-checked={checked}
          aria-disabled={disabled}
          tabIndex={-1}
        >
          {/* Icon opposite to thumb */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: checked 
                ? config.thumb.offset + 2 
                : config.track.width - config.thumb.offset - 2 - (config.thumb.size * 0.6) - 4,
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              paddingRight: (!checked && !error) ? '8px' : '0px',
            }}
          >
            <Icon
              name={
                error ? 'warning-alt' : 
                checked ? 'checkmark' : 
                'close'
              }
              size={size === 'sm' ? 12 : size === 'lg' ? 20 : 16}
              color={
                disabled 
                  ? colors.grey400 
                  : checked 
                    ? colors.paper 
                    : colors.grey300
              }
            />
          </div>
          <div style={getThumbStyles()} />
        </div>

        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            style={{
              ...getLabelStyles(),
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
            onClick={() => !disabled && onChange?.(!checked)}
          >
            {label}
          </label>
        )}
      </div>

      {/* Description */}
      {description && (
        <div
          id={id ? `${id}-description` : undefined}
          style={getDescriptionStyles()}
        >
          {description}
        </div>
      )}
    </div>
  );
};

export default Switch;