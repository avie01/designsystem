import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types for accessibility settings
export interface HighContrastCustomization {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  accentColor: string;
}

export interface AccessibilitySettings {
  theme: 'default' | 'high-contrast-light' | 'high-contrast-dark';
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  fontFamily: 'default' | 'OpenDyslexic' | 'Atkinson Hyperlegible';
  focusOutline: boolean;
  colorBlindFilter: 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  highContrastLight: HighContrastCustomization;
  highContrastDark: HighContrastCustomization;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  resetToDefault: () => void;
  exportSettings: () => void;
  importSettings: (settings: AccessibilitySettings) => void;
  isPanelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
}

const defaultSettings: AccessibilitySettings = {
  theme: 'default',
  fontSize: 'medium',
  fontFamily: 'default',
  focusOutline: false,
  colorBlindFilter: 'normal',
  highContrastLight: {
    backgroundColor: '#ffffff',
    textColor: '#000000',
    borderColor: '#000000',
    accentColor: '#3560c1'
  },
  highContrastDark: {
    backgroundColor: '#000000',
    textColor: '#ffffff',
    borderColor: '#ffffff',
    accentColor: '#3560c1'
  }
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    // Load settings from localStorage on initialization
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      try {
        return { ...defaultSettings, ...JSON.parse(savedSettings) };
      } catch (error) {
        console.warn('Failed to parse saved accessibility settings:', error);
      }
    }
    return defaultSettings;
  });

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply theme
    root.setAttribute('data-theme', settings.theme);
    
    // Apply font size
    const fontSizeMap = {
      small: '12px',
      medium: '14px',
      large: '18px',
      xlarge: '24px'
    };
    root.style.setProperty('--accessibility-font-size', fontSizeMap[settings.fontSize]);
    
    // Apply font family
    const fontFamilyMap = {
      default: 'Noto Sans, sans-serif',
      OpenDyslexic: 'OpenDyslexic, sans-serif',
      'Atkinson Hyperlegible': 'Atkinson Hyperlegible, sans-serif'
    };
    root.style.setProperty('--accessibility-font-family', fontFamilyMap[settings.fontFamily]);
    
    // Apply focus outline
    if (settings.focusOutline) {
      root.style.setProperty('--focus-outline', '2px solid #3560c1');
    } else {
      root.style.setProperty('--focus-outline', 'none');
    }
    
    // Apply color blind filter
    if (settings.colorBlindFilter !== 'normal') {
      root.style.setProperty('--color-blind-filter', `url(#${settings.colorBlindFilter})`);
    } else {
      root.style.setProperty('--color-blind-filter', 'none');
    }
    
    // Apply high contrast theme colors
    if (settings.theme === 'high-contrast-light') {
      const colors = settings.highContrastLight;
      root.style.setProperty('--high-contrast-bg', colors.backgroundColor);
      root.style.setProperty('--high-contrast-text', colors.textColor);
      root.style.setProperty('--high-contrast-border', colors.borderColor);
      root.style.setProperty('--high-contrast-accent', colors.accentColor);
    } else if (settings.theme === 'high-contrast-dark') {
      const colors = settings.highContrastDark;
      root.style.setProperty('--high-contrast-bg', colors.backgroundColor);
      root.style.setProperty('--high-contrast-text', colors.textColor);
      root.style.setProperty('--high-contrast-border', colors.borderColor);
      root.style.setProperty('--high-contrast-accent', colors.accentColor);
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetToDefault = () => {
    setSettings(defaultSettings);
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'accessibility-settings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importSettings = (importedSettings: AccessibilitySettings) => {
    setSettings(importedSettings);
  };

  const openPanel = () => {
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  const value: AccessibilityContextType = {
    settings,
    updateSettings,
    resetToDefault,
    exportSettings,
    importSettings,
    isPanelOpen,
    openPanel,
    closePanel
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}; 