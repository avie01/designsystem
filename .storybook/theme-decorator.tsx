import * as React from 'react';
import type { Decorator } from '@storybook/react';

// Define theme colors based on DESIGN_SYSTEM_COMPLETE.md
export const themeColors = {
  light: {
    // Primary Colors
    primaryNight: '#32373F',
    primaryTwilight: '#525965', 
    primaryMain: '#3560C1',
    primaryHover: '#0037B1', 
    primaryPressed: '#00277F',
    // Secondary Colors
    secondaryLight: '#DAE8FF',
    secondaryMain: '#CCDBFE', 
    secondaryDark: '#B2CAFE',
    // Base Colors
    paper: '#FFFFFF',
    default: '#EDF1F5',
    // Grey Scale
    grey700: '#707070',
    grey600: '#ACACAC',
    grey500: '#D1D1D1',
    grey400: '#E8E8E8', 
    grey450: '#E0F3FE',
    grey300: '#F5F5F5',
    grey200: '#F7F7F7',
    grey100: '#F8F8F8',
    grey50: '#FAFAFA',
    // Input specific colors
    inputBackground: '#F5F5F5', // grey300
    inputBorder: '#ACACAC',     // grey600
    // Text Colors  
    textPrimary: '#32373F',
    textSecondary: '#525965',
    textMuted: '#707070',
    textDisabled: '#ACACAC',
    textInverse: '#FFFFFF',
    // State Colors
    successLight: '#DFF8DF',
    successMain: '#2A7D2A',
    warningLight: '#FDEED3', 
    warningMain: '#F3AD2E',
    errorLight: '#F7E4E6',
    errorMain: '#D0000A',
    errorPressed: '#F7E4E6',
    info: '#E0F3FF',
    // Selection colors
    selectedLight: '#E0F3FE',
    // Background
    background: '#FFFFFF',
    surfaceHover: '#F5F5F5',
    border: '#D1D1D1',
    // Chip Colors
    chipBlue: '#E5F5FE',
    chipPink: '#F7E2F9',
    chipRed: '#F8E8EA',
    chipOrange: '#FCEEDA',
    chipYellow: '#FFFBCE',
    chipOlive: '#DAE3BF',
    chipMint: '#D0FAF7',
    chipBrown: '#E1D5C7',
    chipPurple: '#D6C8F6',
    chipGreen: '#E4F7E4',
    chipWhite: '#FFFFFF',
    // Spacing (mapped to px values from design system)
    spacing: {
      0: '0px',
      1: '4px',  // xs
      2: '8px',  // s  
      3: '12px', // m
      4: '16px', // l
      5: '24px', // xl
      6: '32px', // xxl
      7: '48px'  // xxxl
    },
    // Typography
    fontSize: {
      xs: '12px',
      sm: '14px', 
      base: '16px',
      lg: '18px',
      xl: '20px'
    }
  },
  dark: {
    // Primary Colors
    primaryNight: '#FFFFFF',
    primaryTwilight: '#E1E7F2',
    primaryMain: '#A7C2FD',
    primaryHover: '#D3E1FE',
    primaryDark: '#7C9FFC',
    primaryPressed: '#7C9FFC', 
    // Secondary Colors
    secondaryLight: '#464F62',
    secondaryMain: '#CCDBFE',
    secondaryDark: '#7C9FFC',
    // Base Colors
    paper: '#28292B',
    default: '#1D1D1D',
    // Grey Scale
    grey700: '#96A5BD',
    grey600: '#6C7789',
    grey500: '#8A9AB3',
    grey400: '#38393B',
    grey450: '#48494B',
    grey300: '#3C3D3F', 
    grey200: '#6F7073',
    grey100: '#88898C',
    grey50: '#CCCDCE',
    // Input specific colors
    inputBackground: '#3C3D3F', // grey300
    inputBorder: '#6C7789',     // grey600
    // Text Colors
    textPrimary: '#FFFFFF',
    textSecondary: '#E1E7F2',
    textMuted: '#96A5BD',
    textDisabled: '#6C7789',
    textInverse: '#000000',
    // State Colors
    successLight: '#1B4A25',
    successMain: '#40D6BD',
    warningLight: '#4A481B',
    warningMain: '#F3BE5F',
    errorLight: '#4A1B1B', 
    errorMain: '#FC9BA5',
    errorPressed: '#4A1B1B',
    info: '#1B2E4A',
    // Selection colors
    selectedLight: '#1B2E4A',
    // Background
    background: '#1D1D1D',
    surfaceHover: '#3C3D3F',
    border: '#38393B',
    // Chip Colors (Dark Mode)
    chipBlue: '#082A78',
    chipPink: '#9C27B0',
    chipRed: '#C2185B',
    chipOrange: '#C93713',
    chipYellow: '#A15202',
    chipOlive: '#54622C',
    chipMint: '#1F787A',
    chipBrown: '#4F3E34',
    chipPurple: '#381A93',
    chipGreen: '#31622C',
    chipWhite: '#28292B',
    // Spacing (same values for all themes)
    spacing: {
      0: '0px',
      1: '4px', 
      2: '8px',
      3: '12px',
      4: '16px',
      5: '24px',
      6: '32px',
      7: '48px'
    },
    // Typography
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px', 
      lg: '18px',
      xl: '20px'
    }
  },
  highContrast: {
    // Primary Colors
    primaryNight: '#000000',
    primaryTwilight: '#000000', 
    primaryMain: '#000000',
    primaryHover: '#000000',
    primaryPressed: '#000000',
    // Secondary Colors
    secondaryLight: '#DAE8FF',
    secondaryMain: '#CCDBFE',
    secondaryDark: '#B2CAFE',
    // Base Colors
    paper: '#FFFFFF',
    default: '#EDF1F5',
    // Grey Scale
    grey700: '#000000',
    grey600: '#ACACAC',
    grey500: '#000000', 
    grey400: '#E8E8E8',
    grey300: '#F5F5F5',
    grey200: '#F7F7F7', 
    grey100: '#F8F8F8',
    grey50: '#FAFAFA',
    // Input specific colors
    inputBackground: '#F5F5F5', // grey300
    inputBorder: '#ACACAC',     // grey600
    // Text Colors
    textPrimary: '#000000',
    textSecondary: '#000000',
    textMuted: '#000000',
    textDisabled: '#ACACAC',
    textInverse: '#FFFFFF',
    // State Colors
    successLight: '#DFF8DF',
    successMain: '#2A7D2A',
    warningLight: '#FDEED3',
    warningMain: '#F3AD2E',
    errorLight: '#F7E4E6',
    errorMain: '#D0000A', 
    info: '#E0F3FF',
    // Selection colors
    selectedLight: '#E0F3FE',
    // Background
    background: '#FFFFFF',
    surfaceHover: '#F5F5F5',
    border: '#000000',
    // Chip Colors (High Contrast - same as light mode)
    chipBlue: '#E5F5FE',
    chipPink: '#F7E2F9',
    chipRed: '#F8E8EA',
    chipOrange: '#FCEEDA',
    chipYellow: '#FFFBCE',
    chipOlive: '#DAE3BF',
    chipMint: '#D0FAF7',
    chipBrown: '#E1D5C7',
    chipPurple: '#D6C8F6',
    chipGreen: '#E4F7E4',
    chipWhite: '#FFFFFF',
    // Spacing (same values for all themes)
    spacing: {
      0: '0px',
      1: '4px',
      2: '8px', 
      3: '12px',
      4: '16px',
      5: '24px',
      6: '32px',
      7: '48px'
    },
    // Typography
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px', 
      xl: '20px'
    }
  }
};

export const ThemeContext = React.createContext<{
  theme: 'light' | 'dark' | 'highContrast';
  colors: typeof themeColors.light;
}>({
  theme: 'light',
  colors: themeColors.light,
});

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeContext.Provider');
  }
  return context;
};

export const withTheme: Decorator = (Story, context) => {
  const theme = context.globals?.theme || 'light';
  const colors = themeColors[theme as keyof typeof themeColors] || themeColors.light;

  React.useEffect(() => {
    // Apply theme to document root
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.style.backgroundColor = colors.background;
      document.documentElement.style.color = colors.textPrimary;
      
      // Set CSS custom properties for theme variables
      const root = document.documentElement;
      root.style.setProperty('--theme-primary-main', colors.primaryMain);
      root.style.setProperty('--theme-primary-hover', colors.primaryHover);
      root.style.setProperty('--theme-primary-dark', colors.primaryDark || colors.primaryPressed);
      root.style.setProperty('--theme-primary-pressed', colors.primaryPressed);
      root.style.setProperty('--theme-primary-night', colors.primaryNight);
      root.style.setProperty('--theme-primary-twilight', colors.primaryTwilight);
      root.style.setProperty('--theme-primary-light', colors.selectedLight);
      root.style.setProperty('--theme-secondary-light', colors.secondaryLight);
      root.style.setProperty('--theme-secondary-main', colors.secondaryMain);
      root.style.setProperty('--theme-secondary-dark', colors.secondaryDark);
      root.style.setProperty('--theme-paper', colors.paper);
      root.style.setProperty('--theme-grey-300', colors.grey300);
      root.style.setProperty('--theme-grey-400', colors.grey400);
      root.style.setProperty('--theme-grey-450', colors.grey450 || '#48494B');
      root.style.setProperty('--theme-grey-600', colors.grey600);
      root.style.setProperty('--theme-error-main', colors.errorMain);
      root.style.setProperty('--theme-error-light', colors.errorLight);
      root.style.setProperty('--theme-error-pressed', colors.errorPressed || '#F7E4E6');
      root.style.setProperty('--theme-text-disabled', colors.textDisabled);
      root.style.setProperty('--theme-text-secondary', colors.textSecondary);
      root.style.setProperty('--theme-text-inverse', colors.textInverse);
    }
  }, [theme, colors]);

  return (
    <ThemeContext.Provider value={{ theme: theme as any, colors }}>
      <div
        style={{
          backgroundColor: colors.background,
          color: colors.textPrimary,
          minHeight: '100vh',
          padding: '1rem',
          margin: '-1rem',
        }}
      >
        <Story />
      </div>
    </ThemeContext.Provider>
  );
};