import { useTheme } from '../../.storybook/theme-decorator';

/**
 * Hook to access the current theme and theme-specific colors
 * @returns {object} An object containing:
 *   - theme: Current theme mode ('light' | 'dark' | 'highContrast')
 *   - colors: Theme-specific color values
 */
export const useODLTheme = () => {
  return useTheme();
};

export default useODLTheme;