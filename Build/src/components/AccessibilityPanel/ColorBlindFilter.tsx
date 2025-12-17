import React, { useEffect } from 'react';
import Icon from '../Icon/Icon';
import { useAccessibility } from '../../context/AccessibilityContext';
import styles from './AccessibilityPanel.module.css';

const ColorBlindFilter: React.FC = () => {
  const { settings, updateSettings } = useAccessibility();

  const colorBlindFilters = [
    { value: 'normal', label: 'Normal Vision' },
    { value: 'protanopia', label: 'Protanopia (Red-Blind)' },
    { value: 'deuteranopia', label: 'Deuteranopia (Green-Blind)' },
    { value: 'tritanopia', label: 'Tritanopia (Blue-Blind)' }
  ] as const;

  // Update the data-color-blind-filter attribute on the html element
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (settings.colorBlindFilter !== 'normal') {
      htmlElement.setAttribute('data-color-blind-filter', settings.colorBlindFilter);
    } else {
      htmlElement.removeAttribute('data-color-blind-filter');
    }
  }, [settings.colorBlindFilter]);

  const handleColorBlindFilterChange = (filter: typeof settings.colorBlindFilter) => {
    updateSettings({ colorBlindFilter: filter });
  };

  return (
    <div className={styles.settingGroup}>
      <div className={styles.settingHeader}>
        <Icon name="laptop" size={16} />
        <h4 className={styles.settingLabel}>
          Color Vision Filter
        </h4>
      </div>
      <p className={styles.settingDescription}>
        Simulate different types of color vision deficiency
      </p>
      <div className={styles.selectControl}>
        <select
          value={settings.colorBlindFilter}
          onChange={(e) => handleColorBlindFilterChange(e.target.value as typeof settings.colorBlindFilter)}
          aria-label="Select color vision filter"
        >
          {colorBlindFilters.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ColorBlindFilter;