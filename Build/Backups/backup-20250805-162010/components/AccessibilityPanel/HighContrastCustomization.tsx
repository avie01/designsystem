import React from 'react';
import Icon from '../Icon/Icon';
import { useAccessibility, HighContrastCustomization } from '../../context/AccessibilityContext';
import styles from './AccessibilityPanel.module.css';

const HighContrastCustomizationComponent: React.FC = () => {
  const { settings, updateSettings } = useAccessibility();

  const handleColorChange = (
    theme: 'highContrastLight' | 'highContrastDark',
    property: keyof HighContrastCustomization,
    value: string
  ) => {
    updateSettings({
      [theme]: {
        ...settings[theme],
        [property]: value
      }
    });
  };

  const resetToDefault = (theme: 'highContrastLight' | 'highContrastDark') => {
    const defaultColors = theme === 'highContrastLight' 
      ? {
          backgroundColor: '#ffffff',
          textColor: '#000000',
          borderColor: '#000000',
          accentColor: '#3560c1'
        }
      : {
          backgroundColor: '#000000',
          textColor: '#ffffff',
          borderColor: '#ffffff',
          accentColor: '#3560c1'
        };

    updateSettings({
      [theme]: defaultColors
    });
  };

  if (settings.theme === 'default') {
    return null;
  }

  const currentTheme = settings.theme === 'high-contrast-light' ? 'highContrastLight' : 'highContrastDark';
  const currentSettings = settings[currentTheme];
  const themeLabel = settings.theme === 'high-contrast-light' ? 'High Contrast Light' : 'High Contrast Dark';

  return (
    <div className={styles.settingGroup}>
      <div className={styles.settingHeader}>
        <Icon name="desktop" size={16} />
        <h4 className={styles.settingLabel}>
          Customize {themeLabel} Theme
        </h4>
      </div>
      <p className={styles.settingDescription}>
        Customize colors for better visibility and personal preference
      </p>
      
      <div className={styles.colorCustomization}>
        <div className={styles.colorOption}>
          <label className={styles.colorLabel}>Background Color</label>
          <div className={styles.colorInputGroup}>
            <input
              type="color"
              value={currentSettings.backgroundColor}
              onChange={(e) => handleColorChange(currentTheme, 'backgroundColor', e.target.value)}
              className={styles.colorInput}
              aria-label="Background color"
            />
            <input
              type="text"
              value={currentSettings.backgroundColor}
              onChange={(e) => handleColorChange(currentTheme, 'backgroundColor', e.target.value)}
              className={styles.colorTextInput}
              placeholder="#ffffff"
            />
          </div>
        </div>

        <div className={styles.colorOption}>
          <label className={styles.colorLabel}>Text Color</label>
          <div className={styles.colorInputGroup}>
            <input
              type="color"
              value={currentSettings.textColor}
              onChange={(e) => handleColorChange(currentTheme, 'textColor', e.target.value)}
              className={styles.colorInput}
              aria-label="Text color"
            />
            <input
              type="text"
              value={currentSettings.textColor}
              onChange={(e) => handleColorChange(currentTheme, 'textColor', e.target.value)}
              className={styles.colorTextInput}
              placeholder="#000000"
            />
          </div>
        </div>

        <div className={styles.colorOption}>
          <label className={styles.colorLabel}>Border Color</label>
          <div className={styles.colorInputGroup}>
            <input
              type="color"
              value={currentSettings.borderColor}
              onChange={(e) => handleColorChange(currentTheme, 'borderColor', e.target.value)}
              className={styles.colorInput}
              aria-label="Border color"
            />
            <input
              type="text"
              value={currentSettings.borderColor}
              onChange={(e) => handleColorChange(currentTheme, 'borderColor', e.target.value)}
              className={styles.colorTextInput}
              placeholder="#000000"
            />
          </div>
        </div>

        <div className={styles.colorOption}>
          <label className={styles.colorLabel}>Accent Color</label>
          <div className={styles.colorInputGroup}>
            <input
              type="color"
              value={currentSettings.accentColor}
              onChange={(e) => handleColorChange(currentTheme, 'accentColor', e.target.value)}
              className={styles.colorInput}
              aria-label="Accent color"
            />
            <input
              type="text"
              value={currentSettings.accentColor}
              onChange={(e) => handleColorChange(currentTheme, 'accentColor', e.target.value)}
              className={styles.colorTextInput}
              placeholder="#3560c1"
            />
          </div>
        </div>

        <button
          onClick={() => resetToDefault(currentTheme)}
          className={styles.resetButton}
          aria-label={`Reset ${themeLabel} colors to default`}
        >
                        <Icon name="refresh" size={16} />
          Reset to Default
        </button>
      </div>
    </div>
  );
};

export default HighContrastCustomizationComponent; 