import React from 'react';
import * as CarbonIcons from '@carbon/icons-react';
import { getCarbonIconName } from './carbonIconMapping';

// Self-contained utility function to replace clsx
const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export interface IconProps {
  /** The name of the Carbon icon to display */
  name: string;
  /** Additional CSS classes */
  className?: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Width of the icon */
  width?: number | string;
  /** Height of the icon */
  height?: number | string;
  /** Size of the icon (small, medium, large) or numeric value */
  size?: 'small' | 'medium' | 'large' | number;
  /** Color of the icon (applies to SVG fill/stroke) */
  color?: string;
  /** Whether the icon should be clickable */
  onClick?: () => void;
  /** Additional props for the icon element */
  [key: string]: unknown;
}

const Icon: React.FC<IconProps> = ({ 
  name, 
  className = "w-6 h-6", 
  alt = "", 
  width,
  height,
  size,
  color,
  onClick,
  ...props 
}) => {
  const carbonIconName = getCarbonIconName(name);
  const CarbonIcon = (CarbonIcons as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>)[carbonIconName];

  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  };

  const iconStyle = {
    width: typeof size === 'number' ? size : width,
    height: typeof size === 'number' ? size : height,
    color: color,
    cursor: onClick ? 'pointer' : 'default',
  };

  const finalClassName = typeof size === 'string' ? sizeClasses[size] : className;
  
  if (!CarbonIcon) {
    // Fallback icon using inline SVG
    return (
      <svg 
        className={classNames(finalClassName, onClick && 'cursor-pointer')}
        style={iconStyle}
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
        {...props}
      >
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor">?</text>
      </svg>
    );
  }
  
  return (
    <CarbonIcon 
      className={classNames(finalClassName, onClick && 'cursor-pointer')}
      style={iconStyle}
      width={typeof size === 'number' ? size : width}
      height={typeof size === 'number' ? size : height}
      onClick={onClick}
      aria-label={alt || name}
      {...props}
    />
  );
};

export default Icon; 