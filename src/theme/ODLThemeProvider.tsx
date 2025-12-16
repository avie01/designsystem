/**
 * Unified Theme Provider for ODL and MUI Components
 * Provides theme context for both ODL native components and MUI components
 */

import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { odlMuiTheme } from './muiTheme';

interface ODLThemeProviderProps {
  children: React.ReactNode;
  /**
   * Enable MUI theme provider
   * @default true
   */
  enableMui?: boolean;
  /**
   * Include CssBaseline for MUI global styles reset
   * @default true
   */
  includeCssBaseline?: boolean;
}

/**
 * Unified theme provider that supports both ODL and MUI components
 *
 * Usage:
 * ```tsx
 * <ODLThemeProvider>
 *   <App />
 * </ODLThemeProvider>
 * ```
 */
export const ODLThemeProvider: React.FC<ODLThemeProviderProps> = ({
  children,
  enableMui = true,
  includeCssBaseline = true,
}) => {
  // If MUI is enabled, wrap with MUI theme provider
  if (enableMui) {
    return (
      <MuiThemeProvider theme={odlMuiTheme}>
        {includeCssBaseline && <CssBaseline />}
        {children}
      </MuiThemeProvider>
    );
  }

  // For ODL-only components, just pass through
  // ODL components use CSS variables from globals.css
  return <>{children}</>;
};

export default ODLThemeProvider;