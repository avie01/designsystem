import React, { useState, useEffect } from 'react';
import Icon from '../Icon/Icon';
import { useAccessibility } from '../../context/AccessibilityContext';
import ThemeToggle from './ThemeToggle';
import FontSelector from './FontSelector';
import FocusOutlineToggle from './FocusOutlineToggle';
import ColorBlindFilter from './ColorBlindFilter';
import HighContrastCustomization from './HighContrastCustomization';
import styles from './AccessibilityPanel.module.css';

interface AccessibilityPanelProps {
  open: boolean;
  onClose: () => void;
}

const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({ open, onClose }) => {
  const { settings, resetToDefault, exportSettings, importSettings } = useAccessibility();
  const [importError, setImportError] = useState<string | null>(null);

  // Focus management and keyboard navigation
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (open && !target.closest(`.${styles.slideOutPanel}`)) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (open && event.key === 'Escape') {
        onClose();
      }
    };

    const handleTabKey = (event: KeyboardEvent) => {
      if (open && event.key === 'Tab') {
        const panel = document.querySelector(`.${styles.slideOutPanel}`);
        if (panel && !panel.contains(event.target as Node)) {
          onClose();
        }
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('keydown', handleTabKey);
      
      // Focus the panel when it opens
      setTimeout(() => {
        const panel = document.querySelector(`.${styles.slideOutPanel}`);
        if (panel) {
          (panel as HTMLElement).focus();
        }
      }, 100);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [open, onClose]);

  // Panel positioning - keep panel fixed in place
  useEffect(() => {
    if (open) {
      // Ensure panel stays in place when open
      // No scroll tracking needed since panel is fixed
    }
  }, [open]);

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedSettings = JSON.parse(e.target?.result as string);
        importSettings(importedSettings);
        setImportError(null);
      } catch (error) {
        setImportError('Invalid settings file format');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    resetToDefault();
  };

  if (!open) return null;

  return (
    <>
      {/* SVG Filters for Color Blind Simulation */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="protanopia">
            <feColorMatrix
              type="matrix"
              values="0.567 0.433 0 0 0 0.558 0.442 0 0 0 0 0.242 0.758 0 0 0 0 0 1 0"
            />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix
              type="matrix"
              values="0.625 0.375 0 0 0 0.7 0.3 0 0 0 0 0.3 0.7 0 0 0 0 0 1 0"
            />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix
              type="matrix"
              values="0.95 0.05 0 0 0 0 0.433 0.567 0 0 0 0.475 0.525 0 0 0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>

      <div 
        className={`${styles.slideOutPanel} ${open ? styles.open : ''}`}
        role="dialog"
        aria-labelledby="accessibility-panel-title"
        aria-modal="true"
        tabIndex={-1}
        data-theme={settings.theme}
      >
        <div className={styles.panelContent}>
          {/* Header */}
          <div className={styles.panelHeader}>
            <div className={styles.headerContent}>
              <Icon name="monitor" size={20} />
              <h2 
                id="accessibility-panel-title"
                className={styles.panelTitle}
              >
                Accessibility
              </h2>
            </div>
            <button
              onClick={onClose}
              className={styles.closeButton}
              aria-label="Close accessibility panel"
              tabIndex={0}
            >
              <Icon name="close" size={18} />
            </button>
          </div>

          {/* Settings */}
          <div className={styles.settingsContainer}>
            {/* Theme Toggle */}
            <ThemeToggle />
            
            <div className={styles.divider} />
            
            {/* Font Selector */}
            <FontSelector />
            
            <div className={styles.divider} />
            
            {/* Focus Outline Toggle */}
            <FocusOutlineToggle />
            
            <div className={styles.divider} />
            
            {/* Color Blind Filter */}
            <ColorBlindFilter />
            
            <div className={styles.divider} />
            
            {/* High Contrast Customization */}
            <HighContrastCustomization />
          </div>

          {/* Import Error Alert */}
          {importError && (
            <div className={`${styles.alert} ${styles.error}`}>
              {importError}
            </div>
          )}

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button
              onClick={exportSettings}
              className={styles.actionButton}
              aria-label="Export accessibility settings"
            >
              <Icon name="download" size={16} />
              Export
            </button>
            
            <button
              className={styles.actionButton}
              aria-label="Import accessibility settings"
            >
              <Icon name="upload" size={16} />
              Import
              <input
                type="file"
                accept=".json"
                onChange={handleImportSettings}
                style={{ display: 'none' }}
                aria-label="Select settings file to import"
              />
            </button>
            
            <button
              onClick={handleReset}
              className={styles.actionButton}
              aria-label="Reset to default settings"
            >
              <Icon name="refresh" size={16} />
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccessibilityPanel; 