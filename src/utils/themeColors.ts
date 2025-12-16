/**
 * Theme-aware color utilities
 * Gets the current CSS variable values that adapt to the active theme
 */

export const getThemeColor = (cssVariable: string): string => {
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  return computedStyle.getPropertyValue(cssVariable).trim();
};

export const ThemeColors = {
  get white() { return getThemeColor('--odl-white'); },
  get background() { return getThemeColor('--odl-background'); },
  get surface() { return getThemeColor('--odl-surface'); },
  get surfaceHover() { return getThemeColor('--odl-surface-hover'); },
  get border() { return getThemeColor('--odl-border'); },
  get primary() { return getThemeColor('--odl-primary'); },
  get primaryHover() { return getThemeColor('--odl-primary-hover'); },
  get primaryLight() { return getThemeColor('--odl-primary-light'); },
  get textPrimary() { return getThemeColor('--odl-text-primary'); },
  get textSecondary() { return getThemeColor('--odl-text-secondary'); },
  get textTertiary() { return getThemeColor('--odl-text-tertiary'); },
  get error() { return getThemeColor('--odl-error'); },
  get warning() { return getThemeColor('--odl-warning'); },
  get success() { return getThemeColor('--odl-success'); },
  get info() { return getThemeColor('--odl-info'); },
};

// For components that need to use inline styles but want theme support
export const useThemeStyles = () => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      height: '100vh',
      backgroundColor: 'var(--odl-background)'
    },
    card: {
      backgroundColor: 'var(--odl-white)',
      border: '1px solid var(--odl-border)',
      borderRadius: '8px'
    },
    header: {
      backgroundColor: 'var(--odl-white)',
      borderBottom: '1px solid var(--odl-border)'
    },
    text: {
      primary: { color: 'var(--odl-text-primary)' },
      secondary: { color: 'var(--odl-text-secondary)' },
      tertiary: { color: 'var(--odl-text-tertiary)' }
    },
    status: {
      error: { color: 'var(--odl-error)' },
      warning: { color: 'var(--odl-warning)' },
      success: { color: 'var(--odl-success)' },
      info: { color: 'var(--odl-info)' }
    }
  };
};