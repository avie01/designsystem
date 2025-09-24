import designTokensData from '../../shared/design-tokens.json';

export const designTokens = designTokensData;

// Color tokens
export const colors = {
  light: designTokensData.color['light-theme'].obj,
  dark: designTokensData.color['dark-theme'].space,
};

// Spacing tokens
export const spacing = designTokensData.spacing;

// Font tokens
export const fonts = designTokensData.font;

// Border radius tokens
export const borderRadius = designTokensData['border-radius'];

// CSS custom properties for easy use
export const cssVariables = {
  // Light theme colors
  '--color-white': colors.light['white-ff'],
  '--color-wave': colors.light.wave,
  '--color-light-deco': colors.light['light-deco'],
  '--color-twilight': colors.light.twilight,
  '--color-night': colors.light.night,
  '--color-blue-default': colors.light['blue-default'],
  '--color-active-background': colors.light['active-background'],
  
  // Dark theme colors
  '--color-vacuum': colors.dark.vacuum,
  '--color-deep-space': colors.dark['deep-space'],
  '--color-dark-deco': colors.dark['dark-deco'],
  '--color-moonlight': colors.dark.moonlight,
  '--color-white-dark': colors.dark['white-ff'],
  '--color-blue': colors.dark.blue,
  '--color-dk-blue': colors.dark['dk-blue'],
  
  // Spacing
  '--spacing-xs': `${spacing.xs}px`,
  '--spacing-sm': `${spacing.sm}px`,
  '--spacing-md': `${spacing.md}px`,
  '--spacing-lg': `${spacing.lg}px`,
  '--spacing-xl': `${spacing.xl}px`,
  '--spacing-xxl': `${spacing.xxl}px`,
  
  // Border radius
  '--border-radius-sm': `${borderRadius.sm}px`,
  '--border-radius-md': `${borderRadius.md}px`,
  '--border-radius-lg': `${borderRadius.lg}px`,
}; 