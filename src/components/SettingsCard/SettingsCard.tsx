import React, { useState } from 'react';
import { useTheme } from '../../../.storybook/theme-decorator';
import Icon from '../Icon/Icon';
import Switch from '../Switch/Switch';
import Button from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import Chip from '../Chip/Chip';

export interface SettingsCardProps {
  /** Primary text content */
  title: string;
  /** Secondary description text */
  description?: string;
  /** Icon name to display on the left */
  icon?: string;
  /** Whether the card is disabled */
  disabled?: boolean;
  /** Whether to show a toggle switch on the right */
  showToggle?: boolean;
  /** Toggle state (controlled) */
  toggled?: boolean;
  /** Callback when toggle changes */
  onToggle?: (toggled: boolean) => void;
  /** Whether to show an arrow/chevron on the right */
  showArrow?: boolean;
  /** Callback when card is clicked */
  onClick?: () => void;
  /** Whether to show a divider at the bottom */
  showDivider?: boolean;
  /** Additional value text displayed on the right */
  value?: string;
  /** Tag/badge text */
  tag?: string;
  /** Tag variant */
  tagVariant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'blue';
  /** Button label text */
  buttonLabel?: string;
  /** Button variant */
  buttonVariant?: 'primary' | 'secondary';
  /** Callback when button is clicked */
  onButtonClick?: () => void;
  /** Dropdown options */
  dropdownOptions?: { value: string; label: string }[];
  /** Selected dropdown value */
  dropdownValue?: string;
  /** Callback when dropdown value changes */
  onDropdownChange?: (value: string) => void;
  /** Dropdown placeholder text */
  dropdownPlaceholder?: string;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  description,
  icon,
  disabled = false,
  showToggle = false,
  toggled = false,
  onToggle,
  showArrow = false,
  onClick,
  showDivider = true,
  value,
  tag,
  tagVariant = 'default',
  buttonLabel,
  buttonVariant = 'secondary',
  onButtonClick,
  dropdownOptions,
  dropdownValue,
  onDropdownChange,
  dropdownPlaceholder = 'Select...',
  className = '',
  style,
}) => {
  const { colors } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const getChipVariant = (): 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'blue' => {
    switch (tagVariant) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      case 'info':
        return 'info';
      case 'blue':
        return 'blue';
      case 'neutral':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleToggle = (newValue: boolean) => {
    if (!disabled && onToggle) {
      onToggle(newValue);
    }
  };

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    padding: `${colors.spacing[4]} ${colors.spacing[4]}`,
    backgroundColor: disabled ? colors.grey100 : isHovered && onClick ? colors.grey400 : colors.paper,
    borderBottom: showDivider ? `1px solid ${colors.border}` : 'none',
    cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : 'default',
    transition: 'background-color 0.2s ease',
    opacity: disabled ? 0.6 : 1,
    gap: '16px',
    fontFamily: '"Noto Sans", sans-serif',
    ...style,
  };

  const iconContainerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  const contentStyles: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 600,
    color: disabled ? colors.textDisabled : colors.textPrimary,
    lineHeight: '1.5',
    margin: 0,
  };

  const descriptionStyles: React.CSSProperties = {
    fontSize: '14px',
    color: disabled ? colors.textDisabled : colors.textSecondary,
    lineHeight: '1.5',
    margin: 0,
  };

  const valueStyles: React.CSSProperties = {
    fontSize: '14px',
    color: disabled ? colors.textDisabled : colors.textSecondary,
    marginRight: showArrow ? colors.spacing[2] : 0,
  };

  return (
    <div
      className={`settings-card ${className}`}
      style={containerStyles}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick && !disabled ? 0 : undefined}
      aria-disabled={disabled}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick && !disabled) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {icon && (
        <div style={iconContainerStyles}>
          <Icon
            name={icon}
            size={20}
            color={disabled ? colors.textDisabled : colors.textPrimary}
          />
        </div>
      )}

      <div style={contentStyles}>
        <p style={titleStyles}>{title}</p>
        {description && <p style={descriptionStyles}>{description}</p>}
      </div>

      {value && <span style={valueStyles}>{value}</span>}

      {tag && (
        <Chip
          label={tag}
          variant={getChipVariant()}
          size="sm"
          disabled={disabled}
          style={{ marginRight: showArrow ? colors.spacing[2] : 0 }}
        />
      )}

      {buttonLabel && (
        <div onClick={(e) => e.stopPropagation()}>
          <Button
            variant={buttonVariant}
            size="medium"
            onClick={onButtonClick}
            disabled={disabled}
          >
            {buttonLabel}
          </Button>
        </div>
      )}

      {dropdownOptions && dropdownOptions.length > 0 && (
        <div onClick={(e) => e.stopPropagation()} style={{ minWidth: '150px' }}>
          <Dropdown
            options={dropdownOptions}
            value={dropdownValue}
            onChange={onDropdownChange}
            placeholder={dropdownPlaceholder}
            disabled={disabled}
            size="md"
          />
        </div>
      )}

      {showToggle && (
        <div onClick={(e) => e.stopPropagation()}>
          <Switch
            checked={toggled}
            onChange={handleToggle}
            disabled={disabled}
            size="md"
          />
        </div>
      )}

      {showArrow && (
        <Icon
          name="chevron-right"
          size={20}
          color={disabled ? colors.textDisabled : colors.textSecondary}
        />
      )}
    </div>
  );
};

export default SettingsCard;
