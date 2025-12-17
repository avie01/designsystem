import React, { useState } from 'react';
import { AccessibilityProvider } from '../context/AccessibilityContext';
import AccessibilityPanel from '../components/AccessibilityPanel/AccessibilityPanel';
import Icon from '../components/Icon/Icon';
import styles from './AccessibilityPanelDemo.module.css';

const AccessibilityPanelDemo: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <AccessibilityProvider>
      <div className={styles.demoContainer}>
        <div className={styles.header}>
          <h1>Accessibility Panel Demo</h1>
          <p>This demo shows the AccessibilityPanel component with all its features.</p>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h2>Features</h2>
            <ul>
              <li>Theme switching (Default, High Contrast Light, High Contrast Dark)</li>
              <li>Font size adjustment (Small, Medium, Large, Extra Large)</li>
              <li>Font family selection (Default, OpenDyslexic, Atkinson Hyperlegible)</li>
              <li>Focus outline toggle for better keyboard navigation</li>
              <li>Color vision filters (Normal, Protanopia, Deuteranopia, Tritanopia)</li>
              <li>High contrast theme customization</li>
              <li>Settings export/import functionality</li>
              <li>Reset to default settings</li>
            </ul>
          </div>

          <div className={styles.section}>
            <h2>Usage</h2>
            <p>Click the accessibility button below to open the panel:</p>
            <button 
              onClick={togglePanel}
              className={styles.accessibilityButton}
              aria-label="Open accessibility panel"
            >
              <Icon name="user-accessibility" size={20} />
              Open Accessibility Panel
            </button>
          </div>

          <div className={styles.section}>
            <h2>Test Content</h2>
            <p>This content will be affected by the accessibility settings you choose in the panel.</p>
            <div className={styles.testContent}>
              <h3>Sample Text</h3>
              <p>This is a sample paragraph to demonstrate how the accessibility settings affect text rendering. You can adjust the font size, font family, and other settings in the panel to see the changes in real-time.</p>
              <button className={styles.testButton}>Test Button</button>
              <input type="text" placeholder="Test input field" className={styles.testInput} />
            </div>
          </div>
        </div>

        <AccessibilityPanel 
          open={isPanelOpen} 
          onClose={() => setIsPanelOpen(false)} 
        />
      </div>
    </AccessibilityProvider>
  );
};

export default AccessibilityPanelDemo; 