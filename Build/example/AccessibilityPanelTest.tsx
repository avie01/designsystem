import React, { useState } from 'react';
import { AccessibilityProvider, AccessibilityPanel, Icon } from '../src';

const AccessibilityPanelTest: React.FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <AccessibilityProvider>
      <div style={{ 
        minHeight: '100vh', 
        padding: '2rem', 
        backgroundColor: '#f5f5f5',
        fontFamily: 'Noto Sans, sans-serif'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ color: '#333', marginBottom: '1rem' }}>
            Accessibility Panel Test
          </h1>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            This is a test page for the AccessibilityPanel component. Click the button below to open the accessibility panel.
          </p>
          
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '2rem'
          }}>
            <h2 style={{ color: '#333', marginBottom: '1rem' }}>Test Content</h2>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1rem' }}>
              This content will be affected by the accessibility settings you choose in the panel. 
              You can adjust font size, font family, theme, and other accessibility features.
            </p>
            <button 
              onClick={() => setIsPanelOpen(true)}
              style={{
                background: '#3560c1',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Icon name="user-accessibility" size={20} />
              Open Accessibility Panel
            </button>
          </div>
          
          <div style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>Features to Test</h3>
            <ul style={{ color: '#666', lineHeight: '1.6' }}>
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
        </div>
        
        <AccessibilityPanel 
          open={isPanelOpen} 
          onClose={() => setIsPanelOpen(false)} 
        />
      </div>
    </AccessibilityProvider>
  );
};

export default AccessibilityPanelTest; 