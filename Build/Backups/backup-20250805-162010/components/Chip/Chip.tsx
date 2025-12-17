import React from 'react';
import clsx from 'clsx';

export interface ChipProps {
  /** The text content to display */
  label: string;
  /** The variant/style of the chip */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  /** The size of the chip */
  size?: 'small' | 'medium' | 'large';
  /** Whether the chip is outlined or filled */
  fillVariant?: 'filled' | 'outlined';
  /** Whether the chip is clickable */
  clickable?: boolean;
  /** Callback when chip is clicked */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  fillVariant = 'filled',
  clickable = false,
  onClick,
  className,
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded transition-all duration-200 whitespace-nowrap overflow-hidden';
  
  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-2 text-base',
  };

  const variantClasses = {
    primary: {
      filled: 'bg-[#0F62FE] text-white',
      outlined: 'bg-transparent border border-[#0F62FE] text-[#0F62FE]',
    },
    secondary: {
      filled: 'bg-gray-100 text-gray-700',
      outlined: 'bg-transparent border border-gray-300 text-gray-700',
    },
    success: {
      filled: 'bg-green-100 text-green-800',
      outlined: 'bg-transparent border border-green-500 text-green-700',
    },
    warning: {
      filled: 'bg-yellow-100 text-yellow-800',
      outlined: 'bg-transparent border border-yellow-500 text-yellow-700',
    },
    error: {
      filled: 'bg-red-100 text-red-800',
      outlined: 'bg-transparent border border-red-500 text-red-700',
    },
    info: {
      filled: 'bg-blue-100 text-blue-800',
      outlined: 'bg-transparent border border-blue-500 text-blue-700',
    },
  };

  const clickableClasses = clickable ? 'cursor-pointer hover:shadow-md active:scale-95' : '';

  return (
    <span
      className={clsx(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant][fillVariant],
        clickableClasses,
        className
      )}
      onClick={clickable ? onClick : undefined}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      <span className="truncate">{label}</span>
    </span>
  );
};

export default Chip; 