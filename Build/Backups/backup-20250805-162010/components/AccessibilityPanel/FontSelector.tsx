import React from 'react';
import Icon from '../Icon/Icon';
import { useAccessibility } from '../../context/AccessibilityContext';
import styles from './AccessibilityPanel.module.css';

const FontSelector: React.FC = () => {
  const { settings, updateSettings } = useAccessibility();

  const fontSizes = [
    { value: 'small', label: 'Small', size: '12px' },
    { value: 'medium', label: 'Medium', size: '14px' },
    { value: 'large', label: 'Large', size: '18px' },
    { value: 'xlarge', label: 'Extra Large', size: '24px' }
  ] as const;

  const fontFamilies = [
    { value: 'default', label: 'Default' },
    { value: 'OpenDyslexic', label: 'OpenDyslexic' },
    { value: 'Atkinson Hyperlegible', label: 'Atkinson Hyperlegible' }
  ] as const;

  const handleFontSizeChange = (fontSize: typeof settings.fontSize) => {
    updateSettings({ fontSize });
  };

  const handleFontFamilyChange = (fontFamily: typeof settings.fontFamily) => {
    updateSettings({ fontFamily });
  };

  return (
    <>
      <div className={styles.settingGroup}>
        <div className={styles.settingHeader}>
          <Icon name="format-text-size" size={16} />
          <h4 className={styles.settingLabel}>
            Font Size
          </h4>
        </div>
        <p className={styles.settingDescription}>
          Adjust the text size for better readability
        </p>
        <div className={styles.buttonGroup}>
          {fontSizes.map((size) => (
            <button
              key={size.value}
              onClick={() => handleFontSizeChange(size.value)}
              className={`${styles.fontSizeButton} ${settings.fontSize === size.value ? styles.selected : ''}`}
              aria-label={`Set font size to ${size.label}`}
              aria-pressed={settings.fontSize === size.value}
              data-selected={settings.fontSize === size.value}
              style={{ fontSize: size.size }}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.settingGroup}>
        <div className={styles.settingHeader}>
          <Icon name="format-text-family" size={16} />
          <h4 className={styles.settingLabel}>
            Font Family
          </h4>
        </div>
        <p className={styles.settingDescription}>
          Choose a font that works best for your reading needs
        </p>
        <div className={styles.selectControl}>
          <select
            value={settings.fontFamily}
            onChange={(e) => handleFontFamilyChange(e.target.value as typeof settings.fontFamily)}
            aria-label="Select font family"
          >
            {fontFamilies.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default FontSelector; 