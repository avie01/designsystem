import React, { useState } from 'react';
import { useTheme, themeColors } from '../../../.storybook/theme-decorator';
import { ODLTheme } from '../../styles/ODLTheme';
import Icon from '../Icon/Icon';

export interface ChipProps {
  /** Size variant - affects typography and spacing */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state - affects colors and interaction */
  disabled?: boolean;
  /** Error state - uses error colors */
  error?: boolean;
  /** The text content to display */
  label: string;
  /** The color variant of the chip */
  variant?: 'blue' | 'pink' | 'red' | 'orange' | 'yellow' | 'olive' | 'mint' | 'brown' | 'purple' | 'green' | 'success' | 'error' | 'warning' | 'info' | 'neutral';
  /** Whether to show the document icon */
  showDocumentIcon?: boolean;
  /** Whether to show the info icon */
  showInfoIcon?: boolean;
  /** Custom icon name from Carbon library */
  iconName?: string;
  /** Whether the chip is clickable */
  clickable?: boolean;
  /** Callback when chip is clicked */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** ARIA label for screen readers */
  'aria-label'?: string;
  /** ARIA described by for additional context */
  'aria-describedby'?: string;
  /** Keyboard event handlers */
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const Chip: React.FC<ChipProps> = ({
  size = 'md',
  disabled = false,
  error = false,
  label,
  variant = 'neutral',
  showDocumentIcon = false,
  showInfoIcon = false,
  iconName,
  clickable = false,
  onClick,
  className = "",
  style,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  onKeyDown,
}) => {
  const { colors, theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // Get contrasting text color based on current theme
  const getContrastingTextColor = (chipVariant: string) => {
    if (theme === 'light') {
      // In light mode, use dark mode chip colors for text
      switch (chipVariant) {
        case 'blue': return themeColors.dark.chipBlue;
        case 'pink': return themeColors.dark.chipPink;
        case 'red': return themeColors.dark.chipRed;
        case 'orange': return themeColors.dark.chipOrange;
        case 'yellow': return themeColors.dark.chipYellow;
        case 'olive': return themeColors.dark.chipOlive;
        case 'mint': return themeColors.dark.chipMint;
        case 'brown': return themeColors.dark.chipBrown;
        case 'purple': return themeColors.dark.chipPurple;
        case 'green': return themeColors.dark.chipGreen;
        default: return ODLTheme.colors.text.primary;
      }
    } else if (theme === 'dark') {
      // In dark mode, use light mode chip colors for text
      switch (chipVariant) {
        case 'blue': return themeColors.light.chipBlue;
        case 'pink': return themeColors.light.chipPink;
        case 'red': return themeColors.light.chipRed;
        case 'orange': return themeColors.light.chipOrange;
        case 'yellow': return themeColors.light.chipYellow;
        case 'olive': return themeColors.light.chipOlive;
        case 'mint': return themeColors.light.chipMint;
        case 'brown': return themeColors.light.chipBrown;
        case 'purple': return themeColors.light.chipPurple;
        case 'green': return themeColors.light.chipGreen;
        default: return ODLTheme.colors.text.inverse;
      }
    } else {
      // High contrast mode - use high contrast colors for text
      return ODLTheme.colors.text.primary;
    }
  };

  // Get variant-specific colors from theme
  const getVariantColors = () => {
    if (error) {
      return {
        backgroundColor: colors.errorLight,
        color: ODLTheme.colors.text.primary,
      };
    }

    switch (variant) {
      case 'blue':
        return { backgroundColor: colors.chipBlue, color: getContrastingTextColor('blue') };
      case 'pink':
        return { backgroundColor: colors.chipPink, color: getContrastingTextColor('pink') };
      case 'red':
        return { backgroundColor: colors.chipRed, color: getContrastingTextColor('red') };
      case 'orange':
        return { backgroundColor: colors.chipOrange, color: getContrastingTextColor('orange') };
      case 'yellow':
        return { backgroundColor: colors.chipYellow, color: getContrastingTextColor('yellow') };
      case 'olive':
        return { backgroundColor: colors.chipOlive, color: getContrastingTextColor('olive') };
      case 'mint':
        return { backgroundColor: colors.chipMint, color: getContrastingTextColor('mint') };
      case 'brown':
        return { backgroundColor: colors.chipBrown, color: getContrastingTextColor('brown') };
      case 'purple':
        return { backgroundColor: colors.chipPurple, color: getContrastingTextColor('purple') };
      case 'green':
        return { backgroundColor: colors.chipGreen, color: getContrastingTextColor('green') };
      case 'success':
        return { backgroundColor: colors.successLight, color: ODLTheme.colors.text.primary };
      case 'warning':
        return { backgroundColor: colors.warningLight, color: ODLTheme.colors.text.primary };
      case 'info':
        return { backgroundColor: colors.info, color: ODLTheme.colors.text.primary };
      case 'neutral':
      default:
        return { backgroundColor: ODLTheme.colors.surface, color: ODLTheme.colors.text.primary };
    }
  };

  // Get ODL-compliant styles based on size and theme
  const getODLStyles = () => {
    const { backgroundColor, color } = getVariantColors();
    
    // Use ODL Typography and Spacing
    const sizeConfig = {
      sm: {
        padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`,
        fontSize: ODLTheme.typography.fontSize.sm,
        gap: ODLTheme.spacing[1],
        iconSize: 12,
        height: '24px',
      },
      md: {
        padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[3]}`,
        fontSize: ODLTheme.typography.fontSize.base,
        gap: ODLTheme.spacing[2],
        iconSize: 16,
        height: '28px',
      },
      lg: {
        padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[4]}`,
        fontSize: ODLTheme.typography.fontSize.md,
        gap: ODLTheme.spacing[2],
        iconSize: 20,
        height: '32px',
      },
    };

    const config = sizeConfig[size];

    return {
      // Layout & Display
      display: 'inline-flex',
      alignItems: 'center',
      gap: config.gap,
      padding: config.padding,
      height: config.height,
      
      // Typography (ODL Typography base/medium)
      fontFamily: ODLTheme.typography.fontFamily.sans,
      fontSize: config.fontSize,
      fontWeight: ODLTheme.typography.fontWeight.medium, // 500
      lineHeight: ODLTheme.typography.lineHeight.snug,
      
      // Colors
      backgroundColor: backgroundColor,
      color: disabled ? ODLTheme.colors.text.disabled : color,
      
      // Border & Shape
      borderRadius: ODLTheme.borders.radius.base, // 4px
      border: 'none',
      
      // Interaction
      cursor: clickable && !disabled ? 'pointer' : 'default',
      opacity: disabled ? 0.6 : (clickable && isHovered && !disabled ? 0.8 : 1),
      transition: ODLTheme.transitions.base,
      
      // Text behavior
      whiteSpace: 'nowrap' as const,
      
      // Custom overrides
      ...style,
      
      // Icon size for child components
      '--chip-icon-size': `${config.iconSize}px`,
    } as React.CSSProperties & { '--chip-icon-size': string };
  };

  // Handle keyboard navigation with ODL interaction patterns
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
    if (e.key === 'Escape') {
      (e.currentTarget as HTMLElement).blur();
    }

    onKeyDown?.(e);
  };

  const handleClick = () => {
    if (!disabled && clickable && onClick) {
      onClick();
    }
  };

  const chipStyles = getODLStyles();
  const iconSize = chipStyles['--chip-icon-size'] ? parseInt(chipStyles['--chip-icon-size']) : 16;
  
  // Use contrasting color for icons (same as text)
  const getIconColor = () => {
    if (disabled) return ODLTheme.colors.text.disabled;
    if (error) return ODLTheme.colors.text.primary;
    
    // For non-error states, use the same contrasting color logic as text
    return getContrastingTextColor(variant);
  };
  
  const iconColor = getIconColor();

  return (
    <span
      className={className}
      style={chipStyles}
      role={clickable ? 'button' : 'status'}
      aria-label={ariaLabel || `${label} chip${clickable ? ', clickable' : ''}`}
      aria-describedby={ariaDescribedBy}
      tabIndex={disabled ? -1 : clickable ? 0 : -1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Document icon */}
      {showDocumentIcon && (
        <Icon 
          name="document" 
          size={iconSize}
          color={iconColor}
        />
      )}
      
      {/* Custom icon */}
      {iconName && !showDocumentIcon && (
        <Icon 
          name={iconName} 
          size={iconSize}
          color={iconColor}
        />
      )}
      
      {/* Label text - using ODL Typography */}
      <span>{label}</span>
      
      {/* Info icon */}
      {showInfoIcon && (
        <Icon 
          name="information" 
          size={iconSize}
          color={iconColor}
        />
      )}
    </span>
  );
};

export default Chip; 