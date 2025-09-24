import React, { useState, useEffect } from 'react';

// Self-contained utility function to replace clsx
const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Simple icon components
const MonitorIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const CloseIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const DownloadIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const UploadIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const RefreshIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

interface AccessibilityPanelProps {
  open: boolean;
  onClose: () => void;
}

const AccessibilityPanel: React.FC<AccessibilityPanelProps> = ({ open, onClose }) => {
  const [importError, setImportError] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    theme: 'light',
    fontSize: 'medium',
    focusOutline: true,
    colorBlindFilter: 'none',
    highContrast: false
  });

  // Focus management and keyboard navigation
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (open && !target.closest('.accessibility-panel')) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (open && event.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      
      // Focus the panel when it opens
      setTimeout(() => {
        const panel = document.querySelector('.accessibility-panel');
        if (panel) {
          (panel as HTMLElement).focus();
        }
      }, 100);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [open, onClose]);

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedSettings = JSON.parse(e.target?.result as string);
        setSettings(importedSettings);
        setImportError(null);
      } catch (error) {
        setImportError('Invalid settings file format');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    setSettings({
      theme: 'light',
      fontSize: 'medium',
      focusOutline: true,
      colorBlindFilter: 'none',
      highContrast: false
    });
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'accessibility-settings.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
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
        className={classNames(
          'accessibility-panel fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-labelledby="accessibility-panel-title"
        aria-modal="true"
        tabIndex={-1}
        data-theme={settings.theme}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <MonitorIcon size={20} />
              <h2 
                id="accessibility-panel-title"
                className="text-lg font-semibold text-gray-900"
              >
                Accessibility
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close accessibility panel"
              tabIndex={0}
            >
              <CloseIcon size={18} />
            </button>
          </div>

          {/* Settings */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {/* Theme Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <select 
                value={settings.theme}
                onChange={(e) => setSettings({...settings, theme: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            
            <div className="border-t border-gray-200"></div>
            
            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Font Size</label>
              <select 
                value={settings.fontSize}
                onChange={(e) => setSettings({...settings, fontSize: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            
            <div className="border-t border-gray-200"></div>
            
            {/* Focus Outline */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.focusOutline}
                  onChange={(e) => setSettings({...settings, focusOutline: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Show Focus Outline</span>
              </label>
            </div>
            
            <div className="border-t border-gray-200"></div>
            
            {/* Color Blind Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color Blind Filter</label>
              <select 
                value={settings.colorBlindFilter}
                onChange={(e) => setSettings({...settings, colorBlindFilter: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="none">None</option>
                <option value="protanopia">Protanopia</option>
                <option value="deuteranopia">Deuteranopia</option>
                <option value="tritanopia">Tritanopia</option>
              </select>
            </div>
            
            <div className="border-t border-gray-200"></div>
            
            {/* High Contrast */}
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.highContrast}
                  onChange={(e) => setSettings({...settings, highContrast: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">High Contrast</span>
              </label>
            </div>
          </div>

          {/* Import Error Alert */}
          {importError && (
            <div className="mx-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {importError}
            </div>
          )}

          {/* Action Buttons */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <button
              onClick={exportSettings}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              aria-label="Export accessibility settings"
            >
              <DownloadIcon size={16} />
              Export
            </button>
            
            <button
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors relative"
              aria-label="Import accessibility settings"
            >
              <UploadIcon size={16} />
              Import
              <input
                type="file"
                accept=".json"
                onChange={handleImportSettings}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Select settings file to import"
              />
            </button>
            
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              aria-label="Reset to default settings"
            >
              <RefreshIcon size={16} />
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccessibilityPanel; 