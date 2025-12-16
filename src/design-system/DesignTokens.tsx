import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { designTokens, cssVariables } from './tokens';
import { useAccessibility } from '../context/AccessibilityContext';

interface DesignTokensContextType {
  tokens: typeof designTokens;
  cssVars: typeof cssVariables;
}

const DesignTokensContext = createContext<DesignTokensContextType | undefined>(undefined);

interface DesignTokensProviderProps {
  children: ReactNode;
}

export const DesignTokensProvider: React.FC<DesignTokensProviderProps> = ({ children }) => {
  // Get access to the accessibility settings
  let accessibilityContext;
  try {
    accessibilityContext = useAccessibility();
  } catch (error) {
    // If the AccessibilityProvider is not available, ignore
    accessibilityContext = null;
  }

  // Apply accessibility settings to design tokens
  useEffect(() => {
    if (!accessibilityContext) return;

    const { settings } = accessibilityContext;
    const root = document.documentElement;
    
    // Apply the design system class to the root element
    root.classList.add('odl-design-system');
    
    // We don't want to modify the default theme, so only make changes for high contrast themes
    if (settings && (settings.theme === 'high-contrast-light' || settings.theme === 'high-contrast-dark')) {
      // Only focus on making the high contrast themes work correctly
      document.querySelectorAll('.odl-component')
        .forEach(element => {
          if (element instanceof HTMLElement) {
            // Add a data attribute to indicate which elements are part of the component library
            element.setAttribute('data-odl-component', 'true');
          }
        });
    }
  }, [accessibilityContext]);

  const value = {
    tokens: designTokens,
    cssVars: cssVariables,
  };

  return (
    <DesignTokensContext.Provider value={value}>
      {children}
    </DesignTokensContext.Provider>
  );
};

export const useDesignTokens = (): DesignTokensContextType => {
  const context = useContext(DesignTokensContext);
  if (!context) {
    throw new Error('useDesignTokens must be used within a DesignTokensProvider');
  }
  return context;
};

