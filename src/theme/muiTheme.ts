/**
 * MUI Theme Configuration using ODL Design Tokens
 * This creates a Material-UI theme that uses ODL's design system values
 */

import { createTheme } from '@mui/material/styles';
import ODLTheme from '../styles/ODLTheme';

// Extend MUI's theme to include custom variants
declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }
}

// Extend Button variants to include ODL custom variants
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    ghost: true;
    tertiary: true;
    destructive: true;
  }
}

// Create MUI theme from ODL tokens
export const odlMuiTheme = createTheme({
  palette: {
    primary: {
      main: ODLTheme.colors.primary,
      light: ODLTheme.colors.primaryLight,
      dark: ODLTheme.colors.primaryDark,
      contrastText: ODLTheme.colors.white,
    },
    secondary: {
      main: ODLTheme.colors.text.secondary,
      light: ODLTheme.colors.surface,
      dark: ODLTheme.colors.text.primary,
      contrastText: ODLTheme.colors.white,
    },
    tertiary: {
      main: ODLTheme.colors.surface,
      light: ODLTheme.colors.surfaceHover,
      dark: ODLTheme.colors.border,
      contrastText: ODLTheme.colors.text.primary,
    },
    error: {
      main: ODLTheme.colors.error,
      light: ODLTheme.colors.errorLight,
      contrastText: ODLTheme.colors.white,
    },
    warning: {
      main: ODLTheme.colors.warning,
      light: ODLTheme.colors.warningLight,
      dark: ODLTheme.colors.warningBackground,
      contrastText: ODLTheme.colors.text.primary,
    },
    success: {
      main: ODLTheme.colors.success,
      light: ODLTheme.colors.successLight,
      contrastText: ODLTheme.colors.white,
    },
    info: {
      main: ODLTheme.colors.info,
      light: ODLTheme.colors.infoLight,
      contrastText: ODLTheme.colors.white,
    },
    background: {
      default: ODLTheme.colors.background,
      paper: ODLTheme.colors.surface,
    },
    text: {
      primary: ODLTheme.colors.text.primary,
      secondary: ODLTheme.colors.text.secondary,
      disabled: ODLTheme.colors.text.disabled,
    },
    divider: ODLTheme.colors.border,
  },

  typography: {
    fontFamily: ODLTheme.typography.fontFamily.sans,
    fontSize: 14, // ODL base font size

    h1: {
      fontSize: ODLTheme.typography.fontSize['4xl'],
      fontWeight: ODLTheme.typography.fontWeight.bold,
      lineHeight: ODLTheme.typography.lineHeight.tight,
    },
    h2: {
      fontSize: ODLTheme.typography.fontSize['3xl'],
      fontWeight: ODLTheme.typography.fontWeight.semibold,
      lineHeight: ODLTheme.typography.lineHeight.tight,
    },
    h3: {
      fontSize: ODLTheme.typography.fontSize['2xl'],
      fontWeight: ODLTheme.typography.fontWeight.semibold,
      lineHeight: ODLTheme.typography.lineHeight.snug,
    },
    h4: {
      fontSize: ODLTheme.typography.fontSize.xl,
      fontWeight: ODLTheme.typography.fontWeight.medium,
      lineHeight: ODLTheme.typography.lineHeight.snug,
    },
    h5: {
      fontSize: ODLTheme.typography.fontSize.lg,
      fontWeight: ODLTheme.typography.fontWeight.medium,
      lineHeight: ODLTheme.typography.lineHeight.normal,
    },
    h6: {
      fontSize: ODLTheme.typography.fontSize.md,
      fontWeight: ODLTheme.typography.fontWeight.medium,
      lineHeight: ODLTheme.typography.lineHeight.normal,
    },
    body1: {
      fontSize: ODLTheme.typography.fontSize.base,
      lineHeight: ODLTheme.typography.lineHeight.normal,
    },
    body2: {
      fontSize: ODLTheme.typography.fontSize.sm,
      lineHeight: ODLTheme.typography.lineHeight.normal,
    },
    button: {
      fontSize: ODLTheme.typography.fontSize.base,
      fontWeight: ODLTheme.typography.fontWeight.medium,
      textTransform: 'none', // ODL doesn't use uppercase buttons
    },
    caption: {
      fontSize: ODLTheme.typography.fontSize.xs,
      lineHeight: ODLTheme.typography.lineHeight.normal,
    },
  },

  // Use ODL's 4px base spacing unit
  spacing: 4,

  shape: {
    borderRadius: parseInt(ODLTheme.borders.radius.base), // 4px
  },

  shadows: [
    'none',
    ODLTheme.shadows.sm,
    ODLTheme.shadows.base,
    ODLTheme.shadows.md,
    ODLTheme.shadows.lg,
    ODLTheme.shadows.xl,
    ODLTheme.shadows.xl, // MUI needs 25 shadows, reuse for higher indices
    ODLTheme.shadows.xl,
    ODLTheme.shadows.xl,
    ODLTheme.shadows.xl,
    ODLTheme.shadows.xl,
    ODLTheme.shadows.xl,
    ODLTheme.shadows.xl,
    ODLTheme.shadows.xl,
    ODLTheme.shadows.xl,
    ODLTheme.shadows.xl,
    ODLTheme.shadows.xl,
    ODLTheme.shadows.xl,
    ODLTheme.shadows.xl,
    ODLTheme.shadows.xl,
    ODLTheme.shadows.xl,
    ODLTheme.shadows.xl,
    ODLTheme.shadows.xl,
    ODLTheme.shadows.xl,
    ODLTheme.shadows.xl,
  ],

  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },

  // Component-specific overrides
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: ODLTheme.colors.background,
          color: ODLTheme.colors.text.primary,
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '2px', // ODL uses 2px for buttons, not 4px
          fontFamily: ODLTheme.typography.fontFamily.sans,
          fontWeight: ODLTheme.typography.fontWeight.medium,
          transition: ODLTheme.transitions.base,
          boxShadow: 'none',
          gap: '8px',

          '&:focus-visible': {
            outline: `2px solid ${ODLTheme.colors.primary}`,
            outlineOffset: '2px',
          },
        },
        // Size variants matching ODL exactly
        sizeLarge: {
          padding: '16px 24px', // spacing-4 spacing-6
          fontSize: '14px', // base font size (same as medium in ODL)
          minHeight: '48px', // spacing-12
        },
        sizeMedium: {
          padding: '12px 20px', // spacing-3 spacing-5
          fontSize: '14px', // base font size
          minHeight: '44px', // spacing-11
        },
        sizeSmall: {
          padding: '8px 16px', // spacing-2 spacing-4
          fontSize: '12px', // sm font size
          minHeight: '36px',
        },
        // Primary variant (contained in MUI)
        contained: {
          backgroundColor: ODLTheme.colors.primary,
          color: ODLTheme.colors.white,
          boxShadow: 'none',

          '&:hover': {
            backgroundColor: ODLTheme.colors.primaryHover,
            transform: 'translateY(-1px)',
            boxShadow: ODLTheme.shadows.md,
          },
          '&:active': {
            backgroundColor: ODLTheme.colors.primaryDark,
            transform: 'translateY(0)',
          },
          '&.Mui-disabled': {
            backgroundColor: ODLTheme.colors.primary,
            color: ODLTheme.colors.white,
            opacity: 0.6,
          },
        },
        // Secondary variant (outlined in MUI)
        outlined: {
          backgroundColor: ODLTheme.colors.white,
          color: ODLTheme.colors.text.secondary,
          borderColor: ODLTheme.colors.border,
          borderWidth: '1px',

          '&:hover': {
            backgroundColor: ODLTheme.colors.surface,
            borderColor: ODLTheme.colors.border,
            transform: 'translateY(-1px)',
          },
          '&:active': {
            backgroundColor: ODLTheme.colors.surfaceHover,
            transform: 'translateY(0)',
          },
          '&.Mui-disabled': {
            opacity: 0.6,
            borderColor: ODLTheme.colors.border,
          },
        },
        // Text variant
        text: {
          backgroundColor: 'transparent',
          color: ODLTheme.colors.text.secondary,
          padding: '12px 20px', // Add padding like ODL

          '&:hover': {
            backgroundColor: 'transparent',
            textDecoration: 'underline',
          },
        },
      },
      variants: [
        {
          props: { variant: 'ghost' },
          style: {
            backgroundColor: 'transparent',
            color: ODLTheme.colors.text.secondary,
            padding: '12px 20px',
            boxShadow: 'none',

            '&:hover': {
              backgroundColor: ODLTheme.colors.surface,
              boxShadow: 'none',
            },
            '&:active': {
              backgroundColor: ODLTheme.colors.surface,
            },
            '&.Mui-disabled': {
              opacity: 0.6,
            },
          },
        },
        {
          props: { variant: 'tertiary' },
          style: {
            backgroundColor: ODLTheme.colors.primaryLight,
            color: ODLTheme.colors.text.secondary,
            border: 'none',
            padding: '12px 20px',
            boxShadow: 'none',

            '&:hover': {
              backgroundColor: ODLTheme.colors.primaryLight,
              transform: 'translateY(-1px)',
              boxShadow: 'none',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
            '&.Mui-disabled': {
              opacity: 0.6,
            },
          },
        },
        {
          props: { variant: 'destructive' },
          style: {
            backgroundColor: ODLTheme.colors.errorLight,
            color: ODLTheme.colors.error,
            border: 'none',
            padding: '12px 20px',
            boxShadow: 'none',

            '&:hover': {
              backgroundColor: ODLTheme.colors.errorLight,
              transform: 'translateY(-1px)',
              color: ODLTheme.colors.error,
            },
            '&:active': {
              backgroundColor: ODLTheme.colors.error,
              color: ODLTheme.colors.white,
              transform: 'translateY(0)',
            },
            '&.Mui-disabled': {
              opacity: 0.6,
            },
          },
        },
      ],
    },

    MuiTextField: {
      defaultProps: {
        variant: 'standard', // Use standard variant for bottom border
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            position: 'relative',
            transform: 'none',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '1.125rem',
            color: ODLTheme.colors.text.primary,
            marginBottom: '8px',
            fontFamily: ODLTheme.typography.fontFamily.sans,

            '&.Mui-focused': {
              color: ODLTheme.colors.text.primary,
            },
            '&.Mui-error': {
              color: ODLTheme.colors.error,
            },
          },

          '& .MuiInput-root': {
            backgroundColor: ODLTheme.colors.surface,
            padding: '12px 16px',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '1.125rem',
            fontFamily: ODLTheme.typography.fontFamily.sans,
            borderRadius: 0,
            transition: 'all 0.15s cubic-bezier(0.2, 0, 0.38, 0.9)',

            '&:before': {
              borderBottom: `2px solid ${ODLTheme.colors.border}`,
              transition: 'border-color 0.15s cubic-bezier(0.2, 0, 0.38, 0.9)',
            },

            '&:after': {
              borderBottom: `2px solid ${ODLTheme.colors.primary}`,
            },

            '&:hover:not(.Mui-disabled):not(.Mui-error):before': {
              borderBottom: `2px solid ${ODLTheme.colors.primary}`,
            },

            '&:hover': {
              backgroundColor: ODLTheme.colors.surfaceHover,
            },

            '&.Mui-focused': {
              backgroundColor: ODLTheme.colors.surface,
              border: `2px solid ${ODLTheme.colors.primary}`,
              padding: '10px 14px', // Adjust for border

              '&:before, &:after': {
                display: 'none', // Hide bottom border when focused
              },
            },

            '&.Mui-error': {
              '&:before': {
                borderBottomColor: ODLTheme.colors.error,
              },
              '&:after': {
                borderBottomColor: ODLTheme.colors.error,
              },
            },

            '&.Mui-disabled': {
              backgroundColor: ODLTheme.colors.surface,
              color: ODLTheme.colors.text.disabled,
              '&:before': {
                borderBottomStyle: 'solid',
                borderBottomColor: ODLTheme.colors.border,
              },
            },
          },

          '& .MuiInput-input': {
            padding: 0,
            height: 'auto',

            '&::placeholder': {
              color: ODLTheme.colors.text.tertiary,
              opacity: 1,
            },
          },

          '& .MuiFormHelperText-root': {
            marginTop: '4px',
            fontSize: '12px',

            '&.Mui-error': {
              color: ODLTheme.colors.error,
            },
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: ODLTheme.borders.radius.md,
          boxShadow: ODLTheme.shadows.base,
          border: `1px solid ${ODLTheme.colors.border}`,
          backgroundColor: ODLTheme.colors.white,

          '&:hover': {
            boxShadow: ODLTheme.shadows.md,
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: ODLTheme.borders.radius.full,
          fontSize: ODLTheme.typography.fontSize.sm,
          fontWeight: ODLTheme.typography.fontWeight.medium,
          height: 'auto',
          padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[3]}`,
        },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: ODLTheme.borders.radius.base,
          fontSize: ODLTheme.typography.fontSize.base,
        },
        standardSuccess: {
          backgroundColor: ODLTheme.colors.successLight,
          color: ODLTheme.colors.text.primary,
          borderLeft: `4px solid ${ODLTheme.colors.success}`,
        },
        standardError: {
          backgroundColor: ODLTheme.colors.errorLight,
          color: ODLTheme.colors.text.primary,
          borderLeft: `4px solid ${ODLTheme.colors.error}`,
        },
        standardWarning: {
          backgroundColor: ODLTheme.colors.warningLight,
          color: ODLTheme.colors.text.primary,
          borderLeft: `4px solid ${ODLTheme.colors.warning}`,
        },
        standardInfo: {
          backgroundColor: ODLTheme.colors.infoLight,
          color: ODLTheme.colors.text.primary,
          borderLeft: `4px solid ${ODLTheme.colors.info}`,
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: ODLTheme.shadows.sm,
          backgroundColor: ODLTheme.colors.white,
          color: ODLTheme.colors.text.primary,
          borderBottom: `1px solid ${ODLTheme.colors.border}`,
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: ODLTheme.colors.white,
          borderRight: `1px solid ${ODLTheme.colors.border}`,
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: ODLTheme.borders.radius.lg,
          padding: ODLTheme.spacing[6],
          boxShadow: ODLTheme.shadows.xl,
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${ODLTheme.colors.border}`,
        },
        indicator: {
          backgroundColor: ODLTheme.colors.primary,
          height: '2px',
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: ODLTheme.typography.fontSize.base,
          fontWeight: ODLTheme.typography.fontWeight.normal,
          color: ODLTheme.colors.text.secondary,

          '&.Mui-selected': {
            color: ODLTheme.colors.primary,
            fontWeight: ODLTheme.typography.fontWeight.medium,
          },
        },
      },
    },
  },
});

export default odlMuiTheme;