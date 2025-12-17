import React, { lazy, Suspense, useMemo } from 'react';

// Self-contained utility function to replace clsx
const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter((cls): cls is string => Boolean(cls) && typeof cls === 'string').join(' ');
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

// Fallback icon component for loading states
const IconFallback: React.FC<Omit<IconProps, 'name'>> = ({ 
  className = "w-6 h-6",
  size,
  color,
  onClick,
  alt
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  };

  const iconStyle: React.CSSProperties = {
    width: typeof size === 'number' ? size : undefined,
    height: typeof size === 'number' ? size : undefined,
    color: color as string || undefined,
    cursor: onClick ? 'pointer' : 'default',
  };

  const finalClassName = typeof size === 'string' && size in sizeClasses ? sizeClasses[size as keyof typeof sizeClasses] : (className || "w-6 h-6");

  return (
    <div 
      className={classNames(finalClassName as string, !!onClick && 'cursor-pointer', 'animate-pulse bg-gray-200 rounded')}
      style={iconStyle}
      onClick={onClick as React.MouseEventHandler<HTMLDivElement>}
      title={alt as string}
    />
  );
};

// Map of icon names to their lazy-loaded components
// Only include icons that are actually used in the codebase
const iconComponents = {
  // Navigation icons
  'arrow-left': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.ArrowLeft }))),
  'arrow-right': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.ArrowRight }))),
  'chevron-right': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.ChevronRight }))),
  'chevron-down': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.ChevronDown }))),
  'draggable': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.Draggable }))),
  'generate-ai': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.AiGenerate }))),
  
  // Document icons
  'document': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.Document }))),
  'document-blank': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.DocumentBlank }))),
  'folder': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.Folder }))),
  
  // Status icons
  'checkmark-filled': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.CheckmarkFilled }))),
  'warning': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.Warning }))),
  'pause-filled': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.PauseFilled }))),
  
  // Action icons
  'add': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.Add }))),
  'edit': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.Edit }))),
  'view': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.View }))),
  'renew': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.Renew }))),
  'download': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.Download }))),
  
  // UI icons
  'list': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.List }))),
  'grid': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.Grid }))),
  'map': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.Map }))),
  'filter': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.Filter }))),
  'sort': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.SortAscending }))),
  'overflow-menu-vertical': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.OverflowMenuVertical }))),
  
  // Communication icons
  'chat': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.Chat }))),
  
  // Security icons
  'security': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.Security }))),
  
  // User icons
  'user': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.User }))),
  'user-accessibility': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.Accessibility }))),
  
  // Calendar icon
  'calendar': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.Calendar }))),
  
  // Navigation icon (use Compass instead of Navigation)
  'navigation': lazy(() => import('@carbon/icons-react').then(m => ({ default: m.Compass }))),
};

const Icon: React.FC<IconProps> = ({ 
  name, 
  className = "w-6 h-6", 
  alt = "", 
  width,
  height,
  size,
  color,
  onClick
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  };

  const iconStyle = useMemo((): React.CSSProperties => ({
    width: typeof size === 'number' ? size : width,
    height: typeof size === 'number' ? size : height,
    color: color,
    cursor: onClick ? 'pointer' : 'default',
  }), [size, width, height, color, onClick]);

  const finalClassName = typeof size === 'string' ? sizeClasses[size as keyof typeof sizeClasses] : (className || "w-6 h-6");
  
  // Get the lazy-loaded component for this icon
  const IconComponent = iconComponents[name as keyof typeof iconComponents];
  
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
        aria-label={alt || name}
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
        aria-label={alt || name}
      />
    </Suspense>
  );
};

export default Icon;