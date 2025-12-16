// File: src/styles/ODLThemeArchitecture.ts
// This is a complete, self-contained theme system that won't break your existing design

import React from 'react';

export interface ThemeColors {
  // Text
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textDisabled: string;
  textInverse: string;
  textLink: string;
  
  // Backgrounds
  bgPrimary: string;
  bgSecondary: string;
  bgElevated: string;
  bgOverlay: string;
  bgDisabled: string;
  
  // Borders
  borderSubtle: string;
  borderMedium: string;
  borderStrong: string;
  borderFocus: string;
  
  // Interactive States
  interactivePrimary: string;
  interactivePrimaryHover: string;
  interactivePrimaryActive: string;
  interactiveSecondary: string;
  interactiveSecondaryHover: string;
  interactiveSecondaryActive: string;
  
  // Status
  statusError: string;
  statusErrorBg: string;
  statusSuccess: string;
  statusSuccessBg: string;
  statusWarning: string;
  statusWarningBg: string;
  statusInfo: string;
  statusInfoBg: string;
}

export interface ThemeDefinition {
  name: string;
  colors: ThemeColors;
  focusStyle: {
    outline: string;
    outlineOffset: string;
  };
  transitions: {
    enabled: boolean;
    duration: string;
  };
}

// Complete theme definitions
export const themes: Record<string, ThemeDefinition> = {
  default: {
    name: 'Light',
    colors: {
      textPrimary: '#161616',
      textSecondary: '#525252',
      textTertiary: '#8D8D8D',
      textDisabled: '#C6C6C6',
      textInverse: '#FFFFFF',
      textLink: '#3560C1',
      bgPrimary: '#FFFFFF',
      bgSecondary: '#EDF1F5',  // Updated to match your preference
      bgElevated: '#FFFFFF',
      bgOverlay: 'rgba(0, 0, 0, 0.5)',
      bgDisabled: '#F4F4F4',
      borderSubtle: '#E0E0E0',
      borderMedium: '#C6C6C6',
      borderStrong: '#8D8D8D',
      borderFocus: '#3560C1',
      interactivePrimary: '#3560C1',
      interactivePrimaryHover: '#2A4FA3',
      interactivePrimaryActive: '#1E3A8A',
      interactiveSecondary: '#FFFFFF',
      interactiveSecondaryHover: '#F4F4F4',
      interactiveSecondaryActive: '#E0E0E0',
      statusError: '#DA1E28',
      statusErrorBg: '#FFD7D9',
      statusSuccess: '#24A148',
      statusSuccessBg: '#DEFBE6',
      statusWarning: '#F1C21B',
      statusWarningBg: '#FFF1C7',
      statusInfo: '#0F62FE',
      statusInfoBg: '#E8F4FD',
    },
    focusStyle: {
      outline: '2px solid #3560C1',
      outlineOffset: '2px',
    },
    transitions: {
      enabled: true,
      duration: '0.2s',
    },
  },
  
  dark: {
    name: 'Dark',
    colors: {
      textPrimary: '#F4F4F4',
      textSecondary: '#C6C6C6',
      textTertiary: '#8D8D8D',
      textDisabled: '#525252',
      textInverse: '#161616',
      textLink: '#78A9FF',
      bgPrimary: '#161616',
      bgSecondary: '#262626',
      bgElevated: '#393939',
      bgOverlay: 'rgba(0, 0, 0, 0.7)',
      bgDisabled: '#393939',
      borderSubtle: '#393939',
      borderMedium: '#525252',
      borderStrong: '#6F6F6F',
      borderFocus: '#78A9FF',
      interactivePrimary: '#78A9FF',
      interactivePrimaryHover: '#A6C8FF',
      interactivePrimaryActive: '#5A8FDB',
      interactiveSecondary: '#393939',
      interactiveSecondaryHover: '#474747',
      interactiveSecondaryActive: '#525252',
      statusError: '#FF8389',
      statusErrorBg: '#4A1B18',
      statusSuccess: '#42BE65',
      statusSuccessBg: '#1B4A25',
      statusWarning: '#F1C21B',
      statusWarningBg: '#4A4818',
      statusInfo: '#78A9FF',
      statusInfoBg: '#1B2E4A',
    },
    focusStyle: {
      outline: '2px solid #78A9FF',
      outlineOffset: '2px',
    },
    transitions: {
      enabled: true,
      duration: '0.2s',
    },
  },
  
  highContrastLight: {
    name: 'High Contrast Light',
    colors: {
      textPrimary: '#000000',
      textSecondary: '#000000',
      textTertiary: '#404040',
      textDisabled: '#767676',
      textInverse: '#FFFFFF',
      textLink: '#0000EE',
      bgPrimary: '#FFFFFF',
      bgSecondary: '#FFFFFF',
      bgElevated: '#FFFFFF',
      bgOverlay: 'rgba(0, 0, 0, 0.85)',
      bgDisabled: '#E8E8E8',
      borderSubtle: '#767676',
      borderMedium: '#000000',
      borderStrong: '#000000',
      borderFocus: '#000000',
      interactivePrimary: '#000000',
      interactivePrimaryHover: '#333333',
      interactivePrimaryActive: '#000000',
      interactiveSecondary: '#FFFFFF',
      interactiveSecondaryHover: '#F0F0F0',
      interactiveSecondaryActive: '#E0E0E0',
      statusError: '#B30000',
      statusErrorBg: '#FFFFFF',
      statusSuccess: '#006B00',
      statusSuccessBg: '#FFFFFF',
      statusWarning: '#965F00',
      statusWarningBg: '#FFFFFF',
      statusInfo: '#0043CE',
      statusInfoBg: '#FFFFFF',
    },
    focusStyle: {
      outline: '3px solid #000000',
      outlineOffset: '2px',
    },
    transitions: {
      enabled: false,
      duration: '0s',
    },
  },
  
  highContrastDark: {
    name: 'High Contrast Dark',
    colors: {
      textPrimary: '#FFFFFF',
      textSecondary: '#FFFFFF',
      textTertiary: '#C0C0C0',
      textDisabled: '#949494',
      textInverse: '#000000',
      textLink: '#40E0D0',
      bgPrimary: '#000000',
      bgSecondary: '#000000',
      bgElevated: '#222222',  // Using flowkit charcoal from tokens
      bgOverlay: 'rgba(0, 0, 0, 0.95)',
      bgDisabled: '#48494B',  // Using obj lt blue from tokens
      borderSubtle: '#949494',
      borderMedium: '#FFFFFF',
      borderStrong: '#FFFFFF',
      borderFocus: '#FFFFFF',
      interactivePrimary: '#FFFFFF',
      interactivePrimaryHover: '#E0E0E0',
      interactivePrimaryActive: '#CCCCCC',
      interactiveSecondary: '#000000',
      interactiveSecondaryHover: '#1A1A1A',
      interactiveSecondaryActive: '#333333',
      statusError: '#FF6B6B',
      statusErrorBg: '#000000',
      statusSuccess: '#51CF66',
      statusSuccessBg: '#000000',
      statusWarning: '#FFD43B',
      statusWarningBg: '#000000',
      statusInfo: '#339AF0',
      statusInfoBg: '#000000',
    },
    focusStyle: {
      outline: '3px solid #FFFFFF',
      outlineOffset: '2px',
    },
    transitions: {
      enabled: false,
      duration: '0s',
    },
  },
};

// CSS Variable mapping - matches existing ODL variables
export const cssVariableMap = {
  textPrimary: '--odl-text-primary',
  textSecondary: '--odl-text-secondary',
  textTertiary: '--odl-text-tertiary',
  textDisabled: '--odl-text-disabled',
  textInverse: '--odl-text-inverse',
  textLink: '--odl-primary',
  bgPrimary: '--odl-white',
  bgSecondary: '--odl-background',
  bgElevated: '--odl-surface',
  bgOverlay: '--odl-overlay',
  bgDisabled: '--odl-surface',
  borderSubtle: '--odl-border',
  borderMedium: '--odl-border',
  borderStrong: '--odl-border',
  borderFocus: '--odl-primary',
  interactivePrimary: '--odl-primary',
  interactivePrimaryHover: '--odl-primary-hover',
  interactivePrimaryActive: '--odl-primary-dark',
  interactiveSecondary: '--odl-white',
  interactiveSecondaryHover: '--odl-surface-hover',
  interactiveSecondaryActive: '--odl-surface',
  statusError: '--odl-error',
  statusErrorBg: '--odl-error-light',
  statusSuccess: '--odl-success',
  statusSuccessBg: '--odl-success-light',
  statusWarning: '--odl-warning',
  statusWarningBg: '--odl-warning-light',
  statusInfo: '--odl-info',
  statusInfoBg: '--odl-info-light',
};

// Apply theme function
export function applyTheme(themeName: 'default' | 'dark' | 'highContrastLight' | 'highContrastDark') {
  const theme = themes[themeName];
  if (!theme) return;
  
  const root = document.documentElement;
  
  // Apply all color variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssVar = cssVariableMap[key as keyof typeof cssVariableMap];
    if (cssVar) {
      root.style.setProperty(cssVar, value);
    }
  });
  
  // Apply focus styles
  root.style.setProperty('--odl-focus-outline', theme.focusStyle.outline);
  root.style.setProperty('--odl-focus-outline-offset', theme.focusStyle.outlineOffset);
  
  // Apply transition settings
  root.style.setProperty('--odl-transition-duration', theme.transitions.duration);
  
  // Set theme attribute for CSS targeting
  root.setAttribute('data-odl-theme', themeName);
  
  // Store in localStorage
  localStorage.setItem('odl-selected-theme', themeName);
}

// Initialize theme on load
export function initializeTheme() {
  const savedTheme = localStorage.getItem('odl-selected-theme') as keyof typeof themes;
  
  // Check for system preference
  const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  let themeToApply: keyof typeof themes = 'default';
  
  if (savedTheme && themes[savedTheme]) {
    themeToApply = savedTheme;
  } else if (prefersHighContrast) {
    themeToApply = prefersDark ? 'highContrastDark' : 'highContrastLight';
  }
  
  applyTheme(themeToApply);
}

// React hook for theme management
export function useODLTheme() {
  const [currentTheme, setCurrentTheme] = React.useState<keyof typeof themes>('default');
  
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('odl-selected-theme') as keyof typeof themes;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);
  
  const changeTheme = (themeName: keyof typeof themes) => {
    applyTheme(themeName);
    setCurrentTheme(themeName);
  };
  
  return {
    currentTheme,
    changeTheme,
    themes: Object.keys(themes) as Array<keyof typeof themes>,
    themeData: themes[currentTheme],
  };
}

// Component style generator
export function getComponentStyles(component: string, theme?: keyof typeof themes) {
  const activeTheme = theme || (localStorage.getItem('odl-selected-theme') as keyof typeof themes) || 'default';
  const themeData = themes[activeTheme];
  
  const styles = {
    button: {
      primary: {
        backgroundColor: themeData.colors.interactivePrimary,
        color: themeData.colors.textInverse,
        border: `2px solid ${themeData.colors.interactivePrimary}`,
        transition: `all ${themeData.transitions.duration} ease`,
        '&:hover': {
          backgroundColor: themeData.colors.interactivePrimaryHover,
        },
        '&:active': {
          backgroundColor: themeData.colors.interactivePrimaryActive,
        },
        '&:focus-visible': {
          outline: themeData.focusStyle.outline,
          outlineOffset: themeData.focusStyle.outlineOffset,
        },
      },
      secondary: {
        backgroundColor: themeData.colors.interactiveSecondary,
        color: themeData.colors.textPrimary,
        border: `2px solid ${themeData.colors.borderMedium}`,
        transition: `all ${themeData.transitions.duration} ease`,
        '&:hover': {
          backgroundColor: themeData.colors.interactiveSecondaryHover,
        },
        '&:active': {
          backgroundColor: themeData.colors.interactiveSecondaryActive,
        },
        '&:focus-visible': {
          outline: themeData.focusStyle.outline,
          outlineOffset: themeData.focusStyle.outlineOffset,
        },
      },
    },
    input: {
      backgroundColor: themeData.colors.bgPrimary,
      color: themeData.colors.textPrimary,
      border: `1px solid ${themeData.colors.borderMedium}`,
      '&:focus': {
        outline: themeData.focusStyle.outline,
        outlineOffset: '0px',
        borderColor: themeData.colors.borderFocus,
      },
      '&:disabled': {
        backgroundColor: themeData.colors.bgDisabled,
        color: themeData.colors.textDisabled,
        cursor: 'not-allowed',
      },
    },
    card: {
      backgroundColor: themeData.colors.bgElevated,
      color: themeData.colors.textPrimary,
      border: `1px solid ${themeData.colors.borderSubtle}`,
      '&:hover': {
        borderColor: themeData.colors.borderMedium,
      },
    },
  };
  
  return styles[component as keyof typeof styles] || {};
}

// Simple integration component
export const ThemeSwitcher: React.FC = () => {
  const { currentTheme, changeTheme, themes: themeList } = useODLTheme();
  
  return (
    <div className="odl-theme-switcher">
      <label htmlFor="theme-select">Theme:</label>
      <select 
        id="theme-select"
        value={currentTheme} 
        onChange={(e) => changeTheme(e.target.value as keyof typeof themes)}
        className="odl-input"
      >
        {themeList.map(themeName => (
          <option key={themeName} value={themeName}>
            {themes[themeName].name}
          </option>
        ))}
      </select>
    </div>
  );
};

// Initialize on import
if (typeof window !== 'undefined') {
  // Don't auto-initialize to avoid conflicts with AccessibilitySettings
  // initializeTheme();
}