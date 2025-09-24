import React from 'react';
import Icon from '../Icon/Icon';
import { useAccessibility } from '../../context/AccessibilityContext';
import styles from './AccessibilityPanel.module.css';

const ThemeToggle: React.FC = () => {
  const { settings, updateSettings } = useAccessibility();

  const themes = [
    { value: 'default', label: 'Default', icon: 'monitor' },
    { value: 'high-contrast-light', label: 'High Contrast Light', icon: 'sun' },
    { value: 'high-contrast-dark', label: 'High Contrast Dark', icon: 'moon' }
  ] as const;

  const handleThemeChange = (theme: typeof settings.theme) => {
    updateSettings({ theme });
  };

  return (
    <div className={styles.settingGroup}>
      <div className={styles.settingHeader}>
        <Icon name="monitor" size={16} />
        <h4 className={styles.settingLabel}>
          Theme
        </h4>
      </div>
      <p className={styles.settingDescription}>
        Choose your preferred color theme for better visibility
      </p>
      <div className={styles.buttonGroup}>
        {themes.map((theme) => (
          <button
            key={theme.value}
            onClick={() => handleThemeChange(theme.value)}
            className={`${styles.themeButton} ${settings.theme === theme.value ? styles.selected : ''}`}
            aria-label={`Switch to ${theme.label} theme`}
            aria-pressed={settings.theme === theme.value}
            data-selected={settings.theme === theme.value}
          >
            <Icon name={theme.icon} size={16} />
            <span className={styles.buttonText}>{theme.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeToggle; 