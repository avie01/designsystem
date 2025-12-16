import React from 'react';
import BrisbanePropertyPanel from './BrisbanePropertyPanel';

/**
 * BRISBANE PROPERTY PANEL DEMO
 * Showcase of the pixel-perfect Brisbane City Plan property details menu recreation
 */
const BrisbanePropertyPanelDemo: React.FC = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F5F5F5',
      padding: '40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px'
    }}>
      <h1 style={{
        fontSize: '32px',
        fontWeight: '600',
        color: '#333333',
        margin: '0 0 16px 0',
        textAlign: 'center'
      }}>
        Brisbane Property Panel
      </h1>
      
      <p style={{
        fontSize: '16px',
        color: '#666666',
        textAlign: 'center',
        maxWidth: '600px',
        lineHeight: '1.5',
        margin: '0 0 32px 0'
      }}>
        Pixel-perfect recreation of the Brisbane City Plan property details menu using inline styles.
        All sections are interactive with expand/collapse functionality.
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
      }}>
        <BrisbanePropertyPanel />
      </div>

      <div style={{
        marginTop: '32px',
        padding: '24px',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        border: '1px solid #E0E0E0',
        maxWidth: '600px',
        width: '100%'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#333333',
          margin: '0 0 16px 0'
        }}>
          Features
        </h3>
        <ul style={{
          fontSize: '14px',
          color: '#666666',
          lineHeight: '1.6',
          paddingLeft: '20px',
          margin: '0'
        }}>
          <li>Exact visual recreation of Brisbane City Plan interface</li>
          <li>Interactive expandable sections (Zones, Neighbourhood Plans, Overlays)</li>
          <li>Hover effects on menu items</li>
          <li>Custom shape icons using CSS clip-path</li>
          <li>Responsive design with fixed width layout</li>
          <li>All styling done with inline styles for maximum portability</li>
        </ul>
      </div>
    </div>
  );
};

export default BrisbanePropertyPanelDemo;