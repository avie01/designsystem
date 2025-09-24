/**
 * ODL Design System Theme Constants
 * 
 * ALWAYS use these constants instead of hardcoding colors, spacing, etc.
 * This ensures consistency across all components.
 */

// ============================================
// COLORS
// ============================================
export const ODLColors = {
  // Primary Colors
  primary: '#3560C1',           // ODL Primary Blue
  primaryHover: '#2A4FA3',      // Darker blue for hover
  primaryLight: '#E0F3FE',      // Light blue background
  primaryDark: '#1E3A8A',       // Dark blue for emphasis
  
  // Status Colors
  success: '#24A148',           // Green for success/positive
  successLight: '#DEFBE6',      // Light green background
  error: '#DA1E28',             // Red for errors/negative
  errorLight: '#FFD7D9',        // Light red background
  warning: '#B07C0C',           // Dark amber for warning text (WCAG AA compliant - 4.5:1)
  warningBackground: '#F1C21B', // Bright yellow for warning backgrounds only
  warningLight: '#FFF1C7',      // Light yellow background
  info: '#0F62FE',              // Info blue
  infoLight: '#E8F4FD',         // Light info background
  
  // Neutral Colors
  white: '#FFFFFF',
  background: '#FFFFFF',        // Page background
  wave: '#EDF1F5',              // Content wrapper background (outer frame)
  surface: '#F4F4F4',
  surfaceHover: '#EBEBEB',          // Hover state for surface elements (inputs, etc.)
  border: '#E0E0E0',
  
  text: {
    primary: '#161616',         // Main text color
    secondary: '#525252',       // Secondary text
    tertiary: '#6B6B6B',        // Tertiary/muted text (WCAG AA compliant - 4.5:1)
    disabled: '#C6C6C6',        // Disabled text
    inverse: '#FFFFFF',         // White text
  },
  
  // Chart Colors - Modern and vibrant palette for data visualization
  charts: {
    blue: '#3B82F6',           // Bright blue
    emerald: '#10B981',        // Emerald green  
    violet: '#8B5CF6',         // Purple
    amber: '#F59E0B',          // Amber/Orange
    rose: '#F43F5E',           // Rose/Pink
    cyan: '#06B6D4',           // Cyan
    indigo: '#6366F1',         // Indigo
    lime: '#84CC16',           // Lime green
    fuchsia: '#D946EF',        // Fuchsia
    orange: '#EA580C',         // Darker orange for better readability
    teal: '#14B8A6',           // Teal
    sky: '#0EA5E9',            // Sky blue
  },
} as const;

// ============================================
// TYPOGRAPHY
// ============================================
export const ODLTypography = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    mono: 'Consolas, "Courier New", monospace',
  },
  
  fontSize: {
    xs: '11px',
    sm: '12px',
    base: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '40px',
  },
  
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    tight: 1,
    snug: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    // Input-specific line heights (pixel values for precise control)
    inputSm: '1rem',      // 16px - for small inputs
    inputBase: '1.125rem', // 18px - for base inputs
  },
} as const;

// ============================================
// SPACING
// ============================================
export const ODLSpacing = {
  // Base spacing units (use these for consistency)
  '0': '0',
  '1': '4px',
  '2': '8px',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '8': '32px',
  '10': '40px',
  '12': '48px',
  '16': '64px',
  '20': '80px',
} as const;

// ============================================
// BORDERS
// ============================================
export const ODLBorders = {
  radius: {
    none: '0',
    sm: '2px',
    base: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  
  width: {
    none: '0',
    thin: '1px',
    base: '2px',
    thick: '4px',
  },
} as const;

// ============================================
// SHADOWS
// ============================================
export const ODLShadows = {
  none: 'none',
  sm: '0 1px 2px rgba(0,0,0,0.05)',
  base: '0 2px 4px rgba(0,0,0,0.04)',
  md: '0 4px 8px rgba(0,0,0,0.06)',
  lg: '0 4px 12px rgba(0,0,0,0.08)',
  xl: '0 8px 24px rgba(0,0,0,0.12)',
  focus: `0 0 0 2px ${ODLColors.primary}`,
} as const;

// ============================================
// Z-INDEX
// ============================================
export const ODLZIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  tooltip: 1500,
  notification: 2000,
} as const;

// ============================================
// TRANSITIONS
// ============================================
export const ODLTransitions = {
  fast: 'all 0.15s ease',
  base: 'all 0.2s ease',
  slow: 'all 0.3s ease',
  
  // Specific transitions
  color: 'color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease',
  transform: 'transform 0.2s ease',
  opacity: 'opacity 0.2s ease',
  
  // Input-specific transition for precise interaction feedback
  input: 'all 0.15s cubic-bezier(0.2, 0, 0.38, 0.9)',
} as const;

// ============================================
// BREAKPOINTS
// ============================================
export const ODLBreakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================
// COMPONENT STYLES
// ============================================
export const ODLComponentStyles = {
  // Button styles
  button: {
    base: {
      fontFamily: ODLTypography.fontFamily.sans,
      fontWeight: ODLTypography.fontWeight.medium,
      borderRadius: ODLBorders.radius.base,
      transition: ODLTransitions.base,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: ODLSpacing[2],
    },
    sizes: {
      xs: {
        padding: `${ODLSpacing[1]} ${ODLSpacing[2]}`,
        fontSize: ODLTypography.fontSize.xs,
      },
      small: {
        padding: `${ODLSpacing[2]} ${ODLSpacing[3]}`,
        fontSize: ODLTypography.fontSize.sm,
      },
      medium: {
        padding: `${ODLSpacing[2]} ${ODLSpacing[4]}`,
        fontSize: ODLTypography.fontSize.base,
      },
      large: {
        padding: `${ODLSpacing[3]} ${ODLSpacing[5]}`,
        fontSize: ODLTypography.fontSize.md,
      },
    },
    variants: {
      primary: {
        backgroundColor: ODLColors.primary,
        color: ODLColors.text.inverse,
        border: `${ODLBorders.width.thin} solid ${ODLColors.primary}`,
      },
      secondary: {
        backgroundColor: ODLColors.white,
        color: ODLColors.text.primary,
        border: `${ODLBorders.width.thin} solid ${ODLColors.border}`,
      },
      ghost: {
        backgroundColor: ODLColors.white,
        color: ODLColors.primary,
        border: `${ODLBorders.width.thin} solid ${ODLColors.primary}`,
      },
      destructive: {
        backgroundColor: ODLColors.error,
        color: ODLColors.text.inverse,
        border: `${ODLBorders.width.thin} solid ${ODLColors.error}`,
      },
    },
  },
  
  // Card styles
  card: {
    base: {
      backgroundColor: ODLColors.white,
      border: `${ODLBorders.width.thin} solid ${ODLColors.border}`,
      borderRadius: ODLBorders.radius.md,
      padding: ODLSpacing[5],
      transition: ODLTransitions.base,
      boxShadow: ODLShadows.base,
    },
    hover: {
      backgroundColor: '#F8F8F8',
      boxShadow: ODLShadows.lg,
    },
    selected: {
      backgroundColor: ODLColors.primaryLight,
      borderLeft: `${ODLBorders.width.thick} solid ${ODLColors.primary}`,
    },
  },
  
  // Input styles
  input: {
    base: {
      fontFamily: ODLTypography.fontFamily.sans,
      fontSize: ODLTypography.fontSize.base,
      padding: `${ODLSpacing[2]} ${ODLSpacing[3]}`,
      border: `${ODLBorders.width.thin} solid ${ODLColors.border}`,
      borderRadius: ODLBorders.radius.base,
      backgroundColor: ODLColors.white,
      color: ODLColors.text.primary,
      transition: ODLTransitions.base,
    },
    focus: {
      borderColor: ODLColors.primary,
      outline: 'none',
      boxShadow: ODLShadows.focus,
    },
    error: {
      borderColor: ODLColors.error,
      backgroundColor: ODLColors.errorLight,
    },
  },
  
  // Badge/Tag styles
  badge: {
    base: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: `${ODLSpacing[1]} ${ODLSpacing[3]}`,
      borderRadius: ODLBorders.radius.xl,
      fontSize: ODLTypography.fontSize.sm,
      fontWeight: ODLTypography.fontWeight.medium,
      backgroundColor: ODLColors.surface,
      color: ODLColors.text.primary,
    },
  },
} as const;

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Apply ODL theme styles to a component
 */
export const applyODLStyles = (
  baseStyles: React.CSSProperties,
  ...additionalStyles: (React.CSSProperties | undefined)[]
): React.CSSProperties => {
  return Object.assign({}, baseStyles, ...additionalStyles.filter(Boolean));
};

/**
 * Get status color based on type
 */
export const getStatusColor = (status: 'success' | 'error' | 'warning' | 'info' | 'neutral') => {
  switch (status) {
    case 'success': return ODLColors.success;
    case 'error': return ODLColors.error;
    case 'warning': return ODLColors.warning;
    case 'info': return ODLColors.info;
    default: return ODLColors.text.secondary;
  }
};

/**
 * Get status background color
 */
export const getStatusBackground = (status: 'success' | 'error' | 'warning' | 'info' | 'neutral') => {
  switch (status) {
    case 'success': return ODLColors.successLight;
    case 'error': return ODLColors.errorLight;
    case 'warning': return ODLColors.warningLight;
    case 'info': return ODLColors.infoLight;
    default: return ODLColors.surface;
  }
};

/**
 * Get warning background color (bright yellow)
 */
export const getWarningBackground = () => ODLColors.warningBackground;

// Export everything as default for easy importing
const ODLTheme = {
  colors: ODLColors,
  typography: ODLTypography,
  spacing: ODLSpacing,
  borders: ODLBorders,
  shadows: ODLShadows,
  zIndex: ODLZIndex,
  transitions: ODLTransitions,
  breakpoints: ODLBreakpoints,
  components: ODLComponentStyles,
  // Utility functions
  applyStyles: applyODLStyles,
  getStatusColor,
  getStatusBackground,
  // Form Styles
  formStyles: {
    select: {
      padding: `8px 12px`,
      border: `1px solid #E0E0E0`,
      borderRadius: '4px',
      fontSize: '14px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      background: '#FFFFFF',
      color: '#161616',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      outline: 'none',
      appearance: 'none' as const,
      minHeight: '36px',
    },
    selectWrapper: {
      position: 'relative' as const,
      display: 'inline-block',
    }
  }
};

export default ODLTheme;