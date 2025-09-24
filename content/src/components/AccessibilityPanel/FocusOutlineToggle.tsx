import React from 'react';
import Icon from '../Icon/Icon';
import { useAccessibility } from '../../context/AccessibilityContext';
import styles from './AccessibilityPanel.module.css';

const FocusOutlineToggle: React.FC = () => {
  const { settings, updateSettings } = useAccessibility();

  const handleFocusOutlineChange = (checked: boolean) => {
    updateSettings({ focusOutline: checked });
  };

  return (
    <div className={styles.settingGroup}>
      <div className={styles.settingHeader}>
        <Icon name="tablet" size={16} />
        <h4 className={styles.settingLabel}>
          Focus Outline
        </h4>
      </div>
      <p className={styles.settingDescription}>
        Show thick focus outlines for better keyboard navigation visibility
      </p>
      <div className={styles.switchControl}>
        <input
          type="checkbox"
          id="focus-outline-toggle"
          checked={settings.focusOutline}
          onChange={(e) => handleFocusOutlineChange(e.target.checked)}
          aria-label="Toggle focus outline"
        />
        <label htmlFor="focus-outline-toggle">
          Enable focus outline
        </label>
      </div>
    </div>
  );
};

export default FocusOutlineToggle; 