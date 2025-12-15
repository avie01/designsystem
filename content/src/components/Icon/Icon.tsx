import React, { lazy, Suspense, useMemo } from 'react';
import { carbonIconMapping } from '../../utils/carbonIconMap';

// Self-contained utility function to replace clsx
const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export interface IconProps {
  /** The name of the Carbon icon to display */
  name: string;
  /** Additional CSS classes */
  className?: string;
  /**
   * Alt text for accessibility - required for meaningful icons, optional for decorative ones
   *
   * IMPORTANT ACCESSIBILITY GUIDELINES:
   * - For icons that convey meaning (e.g., in buttons): Provide descriptive alt text
   *   Example: alt="Delete item", alt="Save changes", alt="Open settings menu"
   * - For purely decorative icons: Either set alt="" (empty string) OR set aria-hidden="true"
   *   Decorative icons are those that duplicate adjacent text or are visual padding
   * - Avoid generic alt text like "settings" or "menu" - be specific about the action/purpose
   * - When icon has onClick: ALWAYS provide meaningful alt text describing the action
   *
   * In development mode, you'll get console warnings for missing or generic alt text
   */
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
  /**
   * Hide icon from screen readers - use for decorative icons only
   *
   * WHEN TO USE aria-hidden="true":
   * - Icon is purely decorative (visual enhancement only)
   * - Icon's meaning is already communicated by adjacent text
   * - Examples: icon next to "Save" button, flag next to country name, checkmark on completed item
   *
   * WHEN NOT TO USE aria-hidden:
   * - Icon conveys essential information (use alt text instead)
   * - Icon is standalone with no text context
   * - Icon is interactive (has onClick handler)
   *
   * Default: undefined (icon is announced to screen readers)
   * Set to "true" or true for decorative icons (or use alt="" as alternative)
   */
  'aria-hidden'?: boolean | 'true' | 'false';
  /** Additional props for the icon element */
  [key: string]: any;
}

// Fallback icon component for loading states
const IconFallback: React.FC<Omit<IconProps, 'name'>> = ({ 
  className = "w-6 h-6",
  size,
  color,
  onClick,
  ...props 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  };

  const iconStyle = {
    width: typeof size === 'number' ? size : undefined,
    height: typeof size === 'number' ? size : undefined,
    color: color,
    cursor: onClick ? 'pointer' : 'default',
  };

  const finalClassName = typeof size === 'string' && size in sizeClasses ? sizeClasses[size as keyof typeof sizeClasses] : className;

  return (
    <div 
      className={classNames(finalClassName, !!onClick && 'cursor-pointer', 'animate-pulse bg-gray-200 rounded')}
      style={iconStyle}
      onClick={onClick}
      {...(props as React.HTMLAttributes<HTMLDivElement>)}
    />
  );
};

// Dynamic icon loader with memoization
const iconComponentCache: Record<string, any> = {};

// Create lazy-loaded icon component dynamically
const createLazyIcon = (carbonExportName: string) => {
  if (!iconComponentCache[carbonExportName]) {
    iconComponentCache[carbonExportName] = lazy(() =>
      import('@carbon/icons-react').then((m: any) => {
        // Try to get the icon from the module
        const icon = m[carbonExportName];
        if (!icon) {
          console.warn(`Carbon icon '${carbonExportName}' not found in @carbon/icons-react`);
          // Return a default icon if not found
          return { default: m.Help || m.Warning };
        }
        return { default: icon };
      }).catch(err => {
        console.error(`Failed to load Carbon icon '${carbonExportName}':`, err);
        // Return a fallback on error
        return import('@carbon/icons-react').then(m => ({ default: m.Help }));
      })
    );
  }
  return iconComponentCache[carbonExportName];
};

const Icon: React.FC<IconProps> = ({
  name,
  className = "w-6 h-6",
  alt = "",
  width,
  height,
  size,
  color,
  onClick,
  'aria-hidden': ariaHidden,
  ...props
}) => {
  // Development-time accessibility warning
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Warn if icon is clickable but lacks accessibility attributes
      if (onClick && !alt && !ariaHidden) {
        console.warn(
          `Icon: Clickable icon "${name}" should have either 'alt' text (for meaningful icons) ` +
          `or 'aria-hidden="true"' (for decorative icons). This helps screen reader users understand the icon's purpose.`
        );
      }
      // Warn if alt text is too generic (just the icon name)
      if (alt && alt === name && onClick) {
        console.warn(
          `Icon: alt text for "${name}" should be more descriptive than the icon name. ` +
          `Provide context like "alt='Delete item'" or "alt='Open settings menu'" instead of just "${name}".`
        );
      }
    }
  }, [name, alt, onClick, ariaHidden]);

  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  };

  const iconStyle = useMemo(() => ({
    width: typeof size === 'number' ? size : width,
    height: typeof size === 'number' ? size : height,
    color: color || undefined,
    cursor: onClick ? 'pointer' : 'default',
  }), [size, width, height, color, onClick]);

  const finalClassName = typeof size === 'string' && size in sizeClasses ? sizeClasses[size as keyof typeof sizeClasses] : className;
  
  // Get the Carbon icon export name from our mapping
  const carbonExportName = useMemo(() => {
    // Check if the name exists in our mapping
    if (carbonIconMapping[name]) {
      return carbonIconMapping[name];
    }
    
    // If not found, try converting the name to different formats
    // Handle PascalCase (e.g., "AlarmAdd")
    const pascalToKebab = name
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
      .toLowerCase();
    
    if (carbonIconMapping[pascalToKebab]) {
      return carbonIconMapping[pascalToKebab];
    }
    
    // If still not found, try the name as-is (it might be the Carbon export name)
    // Convert first letter to uppercase for Carbon convention
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    
    console.warn(`Icon '${name}' not found in mapping. Trying '${capitalizedName}' directly from Carbon.`);
    return capitalizedName;
  }, [name]);
  
  // Get the lazy-loaded component for this icon
  const IconComponent = useMemo(() => createLazyIcon(carbonExportName), [carbonExportName]);
  
  if (!IconComponent) {
    // Fallback icon for unknown icons
    return (
      <svg
        className={classNames(finalClassName, onClick && 'cursor-pointer')}
        style={iconStyle}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
        aria-label={ariaHidden ? undefined : (alt || name)}
        aria-hidden={ariaHidden}
        {...(props as React.SVGAttributes<SVGElement>)}
      >
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor">?</text>
      </svg>
    );
  }
  
  return (
    <Suspense fallback={<IconFallback className={finalClassName} size={size} color={color} onClick={onClick} />}>
      <IconComponent
        className={classNames(finalClassName, onClick && 'cursor-pointer')}
        style={iconStyle}
        width={typeof size === 'number' ? size : width}
        height={typeof size === 'number' ? size : height}
        onClick={onClick}
        aria-label={ariaHidden ? undefined : (alt || name)}
        aria-hidden={ariaHidden}
        {...(props as any)}
      />
    </Suspense>
  );
};

export default Icon;