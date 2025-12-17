import React from 'react';
import './Switch.css';

export interface SwitchProps {
  /** Whether the switch is checked */
  checked?: boolean;
  /** Callback when switch state changes */
  onChange?: (checked: boolean) => void;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Label for the switch */
  label?: string;
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** ARIA labelled by - references label element */
  'aria-labelledby'?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  disabled = false,
  label,
  size = 'medium',
  className = '',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onChange?.(!checked);
    }
  };

  const switchClasses = [
    'switch',
    `switch--${size}`,
    checked && 'switch--checked',
    disabled && 'switch--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={switchClasses}>
      <input
        type="checkbox"
        className="switch__input"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
      />
      <div
        className="switch__track"
        onKeyDown={handleKeyDown}
        role="presentation"
      >
        <div className="switch__thumb" />
      </div>
      {label && <label className="switch__label">{label}</label>}
    </div>
  );
};

export default Switch;
