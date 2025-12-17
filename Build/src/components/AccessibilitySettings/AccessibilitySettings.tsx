import React, { useState, useEffect } from 'react';
import ODLTheme from '../../styles/ODLTheme';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import { themes, applyTheme } from '../../styles/ODLThemeArchitecture';
import './AccessibilitySettings.css';

export interface AccessibilitySettingsProps {
  onClose: () => void;
  onSettingsChange: (settings: AccessibilityConfig) => void;
}

export interface AccessibilityConfig {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  theme: 'default' | 'dark' | 'highContrastLight' | 'highContrastDark';
  spacing: 'compact' | 'comfortable' | 'spacious';
  reducedMotion: boolean;
  focusIndicators: 'default' | 'enhanced';
  fontFamily: 'default' | 'dyslexic' | 'monospace';
  lineHeight: 'tight' | 'normal' | 'relaxed' | 'loose';
  letterSpacing: 'normal' | 'wide' | 'wider';
  cursorSize: 'normal' | 'large' | 'extra-large';
  highlightLinks: boolean;
  highlightButtons: boolean;
  readingGuide: boolean;
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
}

const defaultSettings: AccessibilityConfig = {
  fontSize: 'medium',
  theme: 'default',
  spacing: 'comfortable',
  reducedMotion: false,
  focusIndicators: 'default',
  fontFamily: 'default',
  lineHeight: 'normal',
  letterSpacing: 'normal',
  cursorSize: 'normal',
  highlightLinks: false,
  highlightButtons: false,
  readingGuide: false,
  colorBlindMode: 'none'
};

const fontSizeMap = {
  'small': '0.875',
  'medium': '1',
  'large': '1.125',
  'extra-large': '1.25'
};

const AccessibilitySettings: React.FC<AccessibilitySettingsProps> = ({ onClose, onSettingsChange }) => {
  const [settings, setSettings] = useState<AccessibilityConfig>(() => {
    const saved = localStorage.getItem('odl-accessibility-settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [activeSection, setActiveSection] = useState<'vision' | 'motor' | 'reading' | 'cognitive'>('vision');

  useEffect(() => {
    localStorage.setItem('odl-accessibility-settings', JSON.stringify(settings));
    onSettingsChange(settings);
    applySettings(settings);
  }, [settings, onSettingsChange]);

  const applySettings = (config: AccessibilityConfig) => {
    const root = document.documentElement;
    
    // Font size adjustments
    root.style.setProperty('--accessibility-font-scale', fontSizeMap[config.fontSize]);
    
    // Apply theme (handles contrast)
    applyTheme(config.theme);
    
    // Spacing adjustments
    const spacingMap = {
      'compact': '0.875',
      'comfortable': '1',
      'spacious': '1.25'
    };
    root.style.setProperty('--accessibility-spacing-scale', spacingMap[config.spacing]);
    
    // Motion preferences
    if (config.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
    
    // Focus indicators
    if (config.focusIndicators === 'enhanced') {
      root.classList.add('enhanced-focus');
    } else {
      root.classList.remove('enhanced-focus');
    }
    
    // Font family
    const fontMap = {
      'default': ODLTheme.typography.fontFamily.sans,
      'dyslexic': '"OpenDyslexic", "Comic Sans MS", sans-serif',
      'monospace': '"Courier New", Consolas, monospace'
    };
    root.style.setProperty('--accessibility-font-family', fontMap[config.fontFamily]);
    
    // Line height
    const lineHeightMap = {
      'tight': '1.2',
      'normal': '1.5',
      'relaxed': '1.75',
      'loose': '2'
    };
    root.style.setProperty('--accessibility-line-height', lineHeightMap[config.lineHeight]);
    
    // Letter spacing
    const letterSpacingMap = {
      'normal': 'normal',
      'wide': '0.05em',
      'wider': '0.1em'
    };
    root.style.setProperty('--accessibility-letter-spacing', letterSpacingMap[config.letterSpacing]);
    
    // Visual aids
    root.classList.toggle('highlight-links', config.highlightLinks);
    root.classList.toggle('highlight-buttons', config.highlightButtons);
    root.classList.toggle('reading-guide', config.readingGuide);
    
    // Color blind modes
    root.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
    if (config.colorBlindMode !== 'none') {
      root.classList.add(config.colorBlindMode);
    }
  };

  const updateSetting = <K extends keyof AccessibilityConfig>(
    key: K,
    value: AccessibilityConfig[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const presets = [
    {
      name: 'Dark Mode',
      config: {
        theme: 'dark' as const,
      }
    },
    {
      name: 'Low Vision',
      config: {
        fontSize: 'large' as const,
        theme: 'highContrastLight' as const,
        spacing: 'spacious' as const,
        focusIndicators: 'enhanced' as const,
        lineHeight: 'relaxed' as const,
        highlightLinks: true,
        highlightButtons: true
      }
    },
    {
      name: 'Dyslexia Friendly',
      config: {
        fontFamily: 'dyslexic' as const,
        lineHeight: 'loose' as const,
        letterSpacing: 'wide' as const,
        spacing: 'spacious' as const
      }
    },
    {
      name: 'High Contrast Dark',
      config: {
        theme: 'highContrastDark' as const,
        focusIndicators: 'enhanced' as const,
        highlightLinks: true,
        highlightButtons: true
      }
    }
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setSettings(prev => ({ ...prev, ...preset.config }));
  };

  return (
    <div className="accessibility-panel">
      {/* Quick Presets */}
      <div className="accessibility-presets">
        <h3 className="accessibility-section-title">Quick Presets</h3>
        <div className="accessibility-preset-grid">
          {presets.map(preset => (
            <button
              key={preset.name}
              className="accessibility-preset-btn"
              onClick={() => applyPreset(preset)}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Section Tabs */}
      <div className="accessibility-tabs">
        <button
          className={`accessibility-tab ${activeSection === 'vision' ? 'active' : ''}`}
          onClick={() => setActiveSection('vision')}
        >
          <Icon name="view" size={16} />
          Vision
        </button>
        <button
          className={`accessibility-tab ${activeSection === 'motor' ? 'active' : ''}`}
          onClick={() => setActiveSection('motor')}
        >
          <Icon name="touch" size={16} />
          Motor
        </button>
        <button
          className={`accessibility-tab ${activeSection === 'reading' ? 'active' : ''}`}
          onClick={() => setActiveSection('reading')}
        >
          <Icon name="document" size={16} />
          Reading
        </button>
        <button
          className={`accessibility-tab ${activeSection === 'cognitive' ? 'active' : ''}`}
          onClick={() => setActiveSection('cognitive')}
        >
          <Icon name="idea" size={16} />
          Cognitive
        </button>
      </div>

      {/* Settings Content */}
      <div className="accessibility-content">
        {activeSection === 'vision' && (
          <div className="accessibility-section">
            {/* Text Size */}
            <div className="accessibility-setting">
              <label className="accessibility-label">
                <Icon name="text-font" size={16} />
                Text Size
              </label>
              <div className="accessibility-button-group">
                {(['small', 'medium', 'large', 'extra-large'] as const).map(size => (
                  <button
                    key={size}
                    className={`accessibility-option-btn ${settings.fontSize === size ? 'active' : ''}`}
                    onClick={() => updateSetting('fontSize', size)}
                  >
                    {size.replace('-', ' ')}
                  </button>
                ))}
              </div>
              <div className="accessibility-preview">
                <span style={{ fontSize: `${fontSizeMap[settings.fontSize]}em` }}>
                  Sample text preview
                </span>
              </div>
            </div>

            {/* Theme / Contrast */}
            <div className="accessibility-setting">
              <label className="accessibility-label">
                <Icon name="contrast" size={16} />
                Theme & Contrast
              </label>
              <div className="accessibility-button-group">
                <button
                  className={`accessibility-option-btn ${settings.theme === 'default' ? 'active' : ''}`}
                  onClick={() => updateSetting('theme', 'default')}
                >
                  Light
                </button>
                <button
                  className={`accessibility-option-btn ${settings.theme === 'dark' ? 'active' : ''}`}
                  onClick={() => updateSetting('theme', 'dark')}
                >
                  Dark
                </button>
                <button
                  className={`accessibility-option-btn ${settings.theme === 'highContrastLight' ? 'active' : ''}`}
                  onClick={() => updateSetting('theme', 'highContrastLight')}
                >
                  High Contrast Light
                </button>
                <button
                  className={`accessibility-option-btn ${settings.theme === 'highContrastDark' ? 'active' : ''}`}
                  onClick={() => updateSetting('theme', 'highContrastDark')}
                >
                  High Contrast Dark
                </button>
              </div>
            </div>

            {/* Color Blind Mode */}
            <div className="accessibility-setting">
              <label className="accessibility-label">
                <Icon name="color-palette" size={16} />
                Color Blind Mode
              </label>
              <select 
                className="accessibility-select"
                value={settings.colorBlindMode}
                onChange={(e) => updateSetting('colorBlindMode', e.target.value as any)}
              >
                <option value="none">None</option>
                <option value="protanopia">Protanopia (Red-blind)</option>
                <option value="deuteranopia">Deuteranopia (Green-blind)</option>
                <option value="tritanopia">Tritanopia (Blue-blind)</option>
              </select>
            </div>

            {/* Visual Aids */}
            <div className="accessibility-setting">
              <label className="accessibility-label">
                <Icon name="view-filled" size={16} />
                Visual Aids
              </label>
              <div className="accessibility-checkbox-group">
                <label className="accessibility-checkbox">
                  <input
                    type="checkbox"
                    checked={settings.highlightLinks}
                    onChange={(e) => updateSetting('highlightLinks', e.target.checked)}
                  />
                  <span>Highlight Links</span>
                </label>
                <label className="accessibility-checkbox">
                  <input
                    type="checkbox"
                    checked={settings.highlightButtons}
                    onChange={(e) => updateSetting('highlightButtons', e.target.checked)}
                  />
                  <span>Highlight Buttons</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'motor' && (
          <div className="accessibility-section">
            {/* Focus Indicators */}
            <div className="accessibility-setting">
              <label className="accessibility-label">
                <Icon name="target" size={16} />
                Focus Indicators
              </label>
              <div className="accessibility-button-group">
                {(['default', 'enhanced'] as const).map(type => (
                  <button
                    key={type}
                    className={`accessibility-option-btn ${settings.focusIndicators === type ? 'active' : ''}`}
                    onClick={() => updateSetting('focusIndicators', type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Cursor Size */}
            <div className="accessibility-setting">
              <label className="accessibility-label">
                <Icon name="cursor-1" size={16} />
                Cursor Size
              </label>
              <div className="accessibility-button-group">
                {(['normal', 'large', 'extra-large'] as const).map(size => (
                  <button
                    key={size}
                    className={`accessibility-option-btn ${settings.cursorSize === size ? 'active' : ''}`}
                    onClick={() => updateSetting('cursorSize', size)}
                  >
                    {size.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Spacing */}
            <div className="accessibility-setting">
              <label className="accessibility-label">
                <Icon name="maximize" size={16} />
                Click Target Spacing
              </label>
              <div className="accessibility-button-group">
                {(['compact', 'comfortable', 'spacious'] as const).map(spacing => (
                  <button
                    key={spacing}
                    className={`accessibility-option-btn ${settings.spacing === spacing ? 'active' : ''}`}
                    onClick={() => updateSetting('spacing', spacing)}
                  >
                    {spacing}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'reading' && (
          <div className="accessibility-section">
            {/* Font Family */}
            <div className="accessibility-setting">
              <label className="accessibility-label">
                <Icon name="text-font" size={16} />
                Font Style
              </label>
              <div className="accessibility-button-group">
                {(['default', 'dyslexic', 'monospace'] as const).map(font => (
                  <button
                    key={font}
                    className={`accessibility-option-btn ${settings.fontFamily === font ? 'active' : ''}`}
                    onClick={() => updateSetting('fontFamily', font)}
                  >
                    {font}
                  </button>
                ))}
              </div>
            </div>

            {/* Line Height */}
            <div className="accessibility-setting">
              <label className="accessibility-label">
                <Icon name="text-line-spacing" size={16} />
                Line Spacing
              </label>
              <div className="accessibility-button-group">
                {(['tight', 'normal', 'relaxed', 'loose'] as const).map(height => (
                  <button
                    key={height}
                    className={`accessibility-option-btn ${settings.lineHeight === height ? 'active' : ''}`}
                    onClick={() => updateSetting('lineHeight', height)}
                  >
                    {height}
                  </button>
                ))}
              </div>
            </div>

            {/* Letter Spacing */}
            <div className="accessibility-setting">
              <label className="accessibility-label">
                <Icon name="text-tracking" size={16} />
                Letter Spacing
              </label>
              <div className="accessibility-button-group">
                {(['normal', 'wide', 'wider'] as const).map(spacing => (
                  <button
                    key={spacing}
                    className={`accessibility-option-btn ${settings.letterSpacing === spacing ? 'active' : ''}`}
                    onClick={() => updateSetting('letterSpacing', spacing)}
                  >
                    {spacing}
                  </button>
                ))}
              </div>
            </div>

            {/* Reading Guide */}
            <div className="accessibility-setting">
              <label className="accessibility-checkbox">
                <input
                  type="checkbox"
                  checked={settings.readingGuide}
                  onChange={(e) => updateSetting('readingGuide', e.target.checked)}
                />
                <Icon name="rule" size={16} />
                <span>Enable Reading Guide (highlights current line)</span>
              </label>
            </div>
          </div>
        )}

        {activeSection === 'cognitive' && (
          <div className="accessibility-section">
            {/* Reduced Motion */}
            <div className="accessibility-setting">
              <label className="accessibility-checkbox">
                <input
                  type="checkbox"
                  checked={settings.reducedMotion}
                  onChange={(e) => updateSetting('reducedMotion', e.target.checked)}
                />
                <Icon name="pause-filled" size={16} />
                <span>Reduce motion and animations</span>
              </label>
              <p className="accessibility-help-text">
                Minimizes animations and transitions that might cause discomfort
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="accessibility-footer">
        <Button
          variant="ghost"
          onClick={resetSettings}
          icon={<Icon name="reset" size={16} />}
        >
          Reset to Defaults
        </Button>
        <Button
          variant="primary"
          onClick={onClose}
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default AccessibilitySettings;