import React, { useState } from 'react';
import Header from '../components/Header/Header';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import Button from '../components/Button/Button';
import styles from './TableDemo.module.css';

const HeaderDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'build' | 'connect' | 'keystone' | 'nexus' | 'regworks' | '3sixty' | 'custom'>('build');
  const [showCode, setShowCode] = useState(false);

  const getHeaderCode = (variant: string) => {
    const commonProps = `  user={{ name: 'Scott Marshall', initials: 'SM' }}
  hasSearch={true}
  backgroundColor="#ffffff"`;
    
    switch (variant) {
      case 'build':
        return `<Header 
  variant="build"
${commonProps}
  searchPlaceholder="New application"
/>`;
      case 'connect':
        return `<Header 
  variant="connect"
${commonProps}
  searchPlaceholder="Property text"
/>`;
      case 'keystone':
        return `<Header 
  variant="keystone"
${commonProps}
  searchPlaceholder="Property text"
/>`;
      case 'nexus':
        return `<Header 
  variant="nexus"
${commonProps}
  searchPlaceholder="Search applications"
/>`;
      case 'regworks':
        return `<Header 
  variant="regworks"
${commonProps}
  searchPlaceholder="Search regulations"
/>`;
      case '3sixty':
        return `<Header 
  variant="3sixty"
${commonProps}
  searchPlaceholder="Search applications"
/>`;
      case 'custom':
        return `<Header 
  variant="custom"
  brandColor="#6B46C1"
  logoText="Custom Brand"
${commonProps}
  searchPlaceholder="Custom search..."
/>`;
      default:
        return '';
    }
  };

  return (
    <div className={styles.tableDemo}>
      {/* Breadcrumb Navigation */}
      <DemoBreadcrumb componentName="Header Component" />
      
      {/* Enhanced Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>Header Component Showcase</h1>
            <p>Navigation headers with branding, search, and user management for all ODL products</p>
          </div>
          <div className={styles.headerActions}>
            <Button
              variant={showCode ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setShowCode(!showCode)}
            >
              {showCode ? 'Hide Code' : 'View Code'}
            </Button>
          </div>
        </div>
      </div>

      {/* Demo Selector */}
      <div className={styles.demoSelector}>
        <div className={styles.demoTabs}>
          {[
            { key: 'build', label: 'Build Header', icon: '🏗️' },
            { key: 'connect', label: 'Connect Header', icon: '🔗' },
            { key: 'keystone', label: 'Keystone Header', icon: '🗝️' },
            { key: 'nexus', label: 'Nexus Header', icon: '🔮' },
            { key: 'regworks', label: 'Regworks Header', icon: '📋' },
            { key: '3sixty', label: '3Sixty Header', icon: '🎯' },
            { key: 'custom', label: 'Custom Header', icon: '🎨' }
          ].map(demo => (
            <button
              key={demo.key}
              className={`${styles.demoTab} ${selectedDemo === demo.key ? styles.active : ''}`}
              onClick={() => setSelectedDemo(demo.key as any)}
            >
              <span className={styles.demoIcon}>{demo.icon}</span>
              <span className={styles.demoLabel}>{demo.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <div className={styles.demoContent}>
        {selectedDemo === 'build' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Objective Build Header</h2>
              <p>Green branding (#5DA10C) with application search functionality and embedded SVG logo</p>
            </div>
            <div style={{ padding: '0', background: 'white', borderRadius: '0 0 12px 12px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
              <Header 
                variant="build"
                user={{ name: 'Scott Marshall', initials: 'SM' }}
                hasSearch={true}
                searchPlaceholder="New application"
                backgroundColor="#ffffff"
              />
            </div>
            {showCode && (
              <div className={styles.codeBlock}>
                <pre><code>{getHeaderCode('build')}</code></pre>
              </div>
            )}
          </div>
        )}

        {selectedDemo === 'connect' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Objective Connect Header</h2>
              <p>Blue branding (#0B77D8) with property search functionality and embedded SVG logo</p>
            </div>
            <div style={{ padding: '0', background: 'white', borderRadius: '0 0 12px 12px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
              <Header 
                variant="connect"
                user={{ name: 'Scott Marshall', initials: 'SM' }}
                hasSearch={true}
                searchPlaceholder="Property text"
                backgroundColor="#ffffff"
              />
            </div>
            {showCode && (
              <div className={styles.codeBlock}>
                <pre><code>{getHeaderCode('connect')}</code></pre>
              </div>
            )}
          </div>
        )}

        {selectedDemo === 'keystone' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Objective Keystone Header</h2>
              <p>Teal branding (#00928F) optimized for property management workflows</p>
            </div>
            <div style={{ padding: '0', background: 'white', borderRadius: '0 0 12px 12px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
              <Header 
                variant="keystone"
                user={{ name: 'Scott Marshall', initials: 'SM' }}
                hasSearch={true}
                searchPlaceholder="Property text"
                backgroundColor="#ffffff"
              />
            </div>
            {showCode && (
              <div className={styles.codeBlock}>
                <pre><code>{getHeaderCode('keystone')}</code></pre>
              </div>
            )}
          </div>
        )}

        {selectedDemo === 'nexus' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Objective Nexus Header</h2>
              <p>Purple branding (#6B46C1) designed for comprehensive application management systems</p>
            </div>
            <div style={{ padding: '0', background: 'white', borderRadius: '0 0 12px 12px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
              <Header 
                variant="nexus"
                user={{ name: 'Scott Marshall', initials: 'SM' }}
                hasSearch={true}
                searchPlaceholder="Search applications"
                backgroundColor="#ffffff"
              />
            </div>
            {showCode && (
              <div className={styles.codeBlock}>
                <pre><code>{getHeaderCode('nexus')}</code></pre>
              </div>
            )}
          </div>
        )}

        {selectedDemo === 'regworks' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Regworks Header</h2>
              <p>Red branding (#DC2626) specialized for regulatory compliance and management workflows</p>
            </div>
            <div style={{ padding: '0', background: 'white', borderRadius: '0 0 12px 12px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
              <Header 
                variant="regworks"
                user={{ name: 'Scott Marshall', initials: 'SM' }}
                hasSearch={true}
                searchPlaceholder="Search regulations"
                backgroundColor="#ffffff"
              />
            </div>
            {showCode && (
              <div className={styles.codeBlock}>
                <pre><code>{getHeaderCode('regworks')}</code></pre>
              </div>
            )}
          </div>
        )}

        {selectedDemo === '3sixty' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Objective 3Sixty Header</h2>
              <p>Blue branding (#0B77D8) with 360-degree view functionality</p>
            </div>
            <div style={{ padding: '0', background: 'white', borderRadius: '0 0 12px 12px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
              <Header 
                variant="3sixty"
                user={{ name: 'Scott Marshall', initials: 'SM' }}
                hasSearch={true}
                searchPlaceholder="Search applications"
                backgroundColor="#ffffff"
              />
            </div>
            {showCode && (
              <div className={styles.codeBlock}>
                <pre><code>{getHeaderCode('3sixty')}</code></pre>
              </div>
            )}
          </div>
        )}

        {selectedDemo === 'custom' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Custom Header Configuration</h2>
              <p>Fully customizable with configurable branding colors and logo text while maintaining consistent functionality</p>
            </div>
            <div style={{ padding: '0', background: 'white', borderRadius: '0 0 12px 12px', border: '1px solid #e0e0e0', overflow: 'hidden' }}>
              <Header 
                variant="custom"
                brandColor="#6B46C1"
                logoText="Custom Brand"
                user={{ name: 'Scott Marshall', initials: 'SM' }}
                hasSearch={true}
                searchPlaceholder="Custom search..."
                backgroundColor="#ffffff"
              />
            </div>
            {showCode && (
              <div className={styles.codeBlock}>
                <pre><code>{getHeaderCode('custom')}</code></pre>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Features Showcase */}
      <div className={styles.featuresShowcase}>
        <div className={styles.sectionHeader}>
          <h3>Header Component Features</h3>
          <p>Everything you need for navigation header implementations</p>
        </div>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCategory}>
            <h4>🏗️ Product Variants</h4>
            <ul>
              <li>✓ Build header (green)</li>
              <li>✓ Connect header (blue)</li>
              <li>✓ Keystone header (teal)</li>
              <li>✓ Nexus header (purple)</li>
              <li>✓ Regworks header (red)</li>
              <li>✓ Custom configuration</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>🎨 Visual Elements</h4>
            <ul>
              <li>✓ Embedded SVG logos</li>
              <li>✓ Brand color theming</li>
              <li>✓ Carbon icon system</li>
              <li>✓ Consistent typography</li>
              <li>✓ Responsive layout</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>🔍 Search Features</h4>
            <ul>
              <li>✓ Integrated search bar</li>
              <li>✓ Custom placeholders</li>
              <li>✓ Search icon integration</li>
              <li>✓ Keyboard shortcuts</li>
              <li>✓ Auto-focus support</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>👤 User Management</h4>
            <ul>
              <li>✓ User avatar display</li>
              <li>✓ Initials fallback</li>
              <li>✓ Dropdown menu</li>
              <li>✓ Profile actions</li>
              <li>✓ Logout functionality</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>🔔 Notifications</h4>
            <ul>
              <li>✓ Alert bell icon</li>
              <li>✓ Unread count badges</li>
              <li>✓ Dropdown notifications</li>
              <li>✓ Click interactions</li>
              <li>✓ State management</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>👍 Accessibility</h4>
            <ul>
              <li>✓ ARIA labels</li>
              <li>✓ Keyboard navigation</li>
              <li>✓ Focus indicators</li>
              <li>✓ Screen reader support</li>
              <li>✓ High contrast mode</li>
            </ul>
          </div>
        </div>
      </div>

      <BackToTop />
    </div>
  );
};

export default HeaderDemo;