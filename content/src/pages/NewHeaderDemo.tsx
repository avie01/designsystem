import React, { useState } from 'react';
import Header from '../components/Header/Header';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import Button from '../components/Button/Button';

const NewHeaderDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'basic' | 'search' | 'sizes' | 'states'>('basic');
  const [showCode, setShowCode] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [notifications] = useState([
    { id: '1', title: 'New Message', message: 'You have a new message', type: 'info' as const, timestamp: new Date(), read: false },
    { id: '2', title: 'System Update', message: 'System will be updated tonight', type: 'warning' as const, timestamp: new Date(), read: false }
  ]);

  const handleLogoClick = () => {
    console.log('Logo clicked - navigate to home');
  };

  const handleNotificationClick = () => {
    console.log('Notifications clicked');
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked');
  };

  const handleUserClick = () => {
    console.log('User menu clicked');
  };

  const getHeaderCode = () => {
    switch (selectedDemo) {
      case 'basic':
        return `<Header
  logo="/src/Images/logos/Objective-Build-H.svg"
  logoAlt="Build logo"
  title="Build AU"
  user={{
    name: "Scott Marshall",
    role: "Administrator",
    initials: "SM"
  }}
  onLogoClick={handleLogoClick}
  onNotificationClick={handleNotificationClick}
  onSettingsClick={handleSettingsClick}
  onUserClick={handleUserClick}
/>`;
      case 'search':
        return `<Header
  logo="/src/Images/logos/Product=Connect-light theme.svg"
  logoAlt="Connect logo"
  title="Connect"
  hasSearch={true}
  searchPlaceholder="Search properties..."
  searchValue={searchValue}
  onSearchChange={setSearchValue}
  user={{
    name: "Jane Doe",
    role: "Property Manager",
    initials: "JD"
  }}
  alerts={notifications}
  onLogoClick={handleLogoClick}
  onNotificationClick={handleNotificationClick}
  onSettingsClick={handleSettingsClick}
  onUserClick={handleUserClick}
/>`;
      case 'sizes':
        return `{/* Small */}
<Header size="sm" {...props} />

{/* Medium (Default) */}
<Header size="md" {...props} />

{/* Large */}
<Header size="lg" {...props} />`;
      case 'states':
        return `{/* Error State */}
<Header error={true} {...props} />

{/* Disabled State */}
<Header disabled={true} {...props} />`;
      default:
        return '';
    }
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'var(--odl-font-family-sans)' }}>
      <DemoBreadcrumb componentName="Header" />

      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: 'var(--odl-font-size-xl)', 
          fontWeight: 'var(--odl-font-weight-semibold)',
          color: 'var(--odl-text-primary)',
          marginBottom: '8px'
        }}>
          Header Component (Simplified)
        </h1>
        <p style={{ 
          color: 'var(--odl-text-secondary)', 
          fontSize: 'var(--odl-font-size-base)',
          lineHeight: 'var(--odl-line-height-normal)'
        }}>
          ODL-compliant header component with external logo support and configurable variations.
        </p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <Button
          onClick={() => setShowCode(!showCode)}
          variant="secondary"
          style={{ marginRight: '12px' }}
        >
          {showCode ? 'Hide Code' : 'View Code'}
        </Button>
      </div>

      {/* Demo Selector */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '32px',
        borderBottom: '1px solid var(--odl-border)',
        paddingBottom: '16px'
      }}>
        {[
          { key: 'basic', label: 'Basic' },
          { key: 'search', label: 'With Search' },
          { key: 'sizes', label: 'Sizes' },
          { key: 'states', label: 'States' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSelectedDemo(key as any)}
            style={{
              padding: '8px 16px',
              border: '1px solid var(--odl-border)',
              borderRadius: 'var(--odl-border-radius-base)',
              background: selectedDemo === key ? 'var(--odl-primary)' : 'var(--odl-white)',
              color: selectedDemo === key ? 'var(--odl-white)' : 'var(--odl-text-primary)',
              cursor: 'pointer',
              transition: 'var(--odl-transition-color)'
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {showCode && (
        <div style={{
          backgroundColor: 'var(--odl-surface)',
          border: '1px solid var(--odl-border)',
          borderRadius: 'var(--odl-border-radius-base)',
          padding: '16px',
          marginBottom: '32px',
          fontFamily: 'monospace',
          fontSize: '14px',
          overflow: 'auto'
        }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {getHeaderCode()}
          </pre>
        </div>
      )}

      {/* Demo Content */}
      <div style={{ 
        border: '1px solid var(--odl-border)',
        borderRadius: 'var(--odl-border-radius-base)',
        overflow: 'hidden',
        marginBottom: '32px'
      }}>
        {selectedDemo === 'basic' && (
          <Header
            logo="/src/Images/logos/Objective-Build-H.svg"
            logoAlt="Build logo"
            title="Build AU"
            user={{
              name: "Scott Marshall",
              role: "Administrator",
              initials: "SM"
            }}
            onLogoClick={handleLogoClick}
            onNotificationClick={handleNotificationClick}
            onSettingsClick={handleSettingsClick}
            onUserClick={handleUserClick}
          />
        )}

        {selectedDemo === 'search' && (
          <Header
            logo="/src/Images/logos/Product=Connect-light theme.svg"
            logoAlt="Connect logo"
            title="Connect"
            hasSearch={true}
            searchPlaceholder="Search properties..."
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            user={{
              name: "Jane Doe",
              role: "Property Manager",
              initials: "JD"
            }}
            alerts={notifications}
            onLogoClick={handleLogoClick}
            onNotificationClick={handleNotificationClick}
            onSettingsClick={handleSettingsClick}
            onUserClick={handleUserClick}
          />
        )}

        {selectedDemo === 'sizes' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ 
                fontSize: 'var(--odl-font-size-base)', 
                marginBottom: '8px',
                color: 'var(--odl-text-primary)',
                padding: '8px 16px',
                backgroundColor: 'var(--odl-surface)'
              }}>
                Small
              </h3>
              <Header
                size="sm"
                logo="/src/Images/logos/Product=Keystone-light theme.svg"
                logoAlt="Keystone logo"
                title="Keystone"
                user={{ name: "K Smith", initials: "KS" }}
                onLogoClick={handleLogoClick}
                onNotificationClick={handleNotificationClick}
                onSettingsClick={handleSettingsClick}
                onUserClick={handleUserClick}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ 
                fontSize: 'var(--odl-font-size-base)', 
                marginBottom: '8px',
                color: 'var(--odl-text-primary)',
                padding: '8px 16px',
                backgroundColor: 'var(--odl-surface)'
              }}>
                Medium (Default)
              </h3>
              <Header
                size="md"
                logo="/src/Images/logos/Product=Nexus-light theme.svg"
                logoAlt="Nexus logo"
                title="Nexus"
                user={{ name: "N Xavier", initials: "NX" }}
                onLogoClick={handleLogoClick}
                onNotificationClick={handleNotificationClick}
                onSettingsClick={handleSettingsClick}
                onUserClick={handleUserClick}
              />
            </div>
            <div>
              <h3 style={{ 
                fontSize: 'var(--odl-font-size-base)', 
                marginBottom: '8px',
                color: 'var(--odl-text-primary)',
                padding: '8px 16px',
                backgroundColor: 'var(--odl-surface)'
              }}>
                Large
              </h3>
              <Header
                size="lg"
                logo="/src/Images/logos/Product=Regworks-light theme.svg"
                logoAlt="Regworks logo"
                title="Regworks"
                user={{ name: "R Wilson", initials: "RW" }}
                onLogoClick={handleLogoClick}
                onNotificationClick={handleNotificationClick}
                onSettingsClick={handleSettingsClick}
                onUserClick={handleUserClick}
              />
            </div>
          </div>
        )}

        {selectedDemo === 'states' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ 
                fontSize: 'var(--odl-font-size-base)', 
                marginBottom: '8px',
                color: 'var(--odl-text-primary)',
                padding: '8px 16px',
                backgroundColor: 'var(--odl-surface)'
              }}>
                Error State
              </h3>
              <Header
                error={true}
                logo="/src/Images/logos/Product=3SIXTY-light theme.svg"
                logoAlt="3SIXTY logo"
                title="3SIXTY - Error"
                user={{ name: "E Roberts", initials: "ER" }}
                onLogoClick={handleLogoClick}
                onNotificationClick={handleNotificationClick}
                onSettingsClick={handleSettingsClick}
                onUserClick={handleUserClick}
              />
            </div>
            <div>
              <h3 style={{ 
                fontSize: 'var(--odl-font-size-base)', 
                marginBottom: '8px',
                color: 'var(--odl-text-primary)',
                padding: '8px 16px',
                backgroundColor: 'var(--odl-surface)'
              }}>
                Disabled State
              </h3>
              <Header
                disabled={true}
                logo="/src/Images/logos/Product=Trapeze-light theme.svg"
                logoAlt="Trapeze logo"
                title="Trapeze - Disabled"
                user={{ name: "D Smith", initials: "DS" }}
                onLogoClick={handleLogoClick}
                onNotificationClick={handleNotificationClick}
                onSettingsClick={handleSettingsClick}
                onUserClick={handleUserClick}
              />
            </div>
          </div>
        )}
      </div>

      {/* Features showcase */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div style={{
          padding: '20px',
          border: '1px solid var(--odl-border)',
          borderRadius: 'var(--odl-border-radius-base)',
          backgroundColor: 'var(--odl-white)'
        }}>
          <h3 style={{ 
            fontSize: 'var(--odl-font-size-base)', 
            fontWeight: 'var(--odl-font-weight-semibold)',
            marginBottom: '8px',
            color: 'var(--odl-text-primary)'
          }}>
            🎯 Simplified & Flexible
          </h3>
          <ul style={{ 
            color: 'var(--odl-text-secondary)', 
            fontSize: 'var(--odl-font-size-sm)',
            lineHeight: 'var(--odl-line-height-normal)',
            paddingLeft: '16px'
          }}>
            <li>Single component with variations</li>
            <li>External SVG logo support</li>
            <li>Configurable search functionality</li>
            <li>Clean, maintainable codebase</li>
          </ul>
        </div>

        <div style={{
          padding: '20px',
          border: '1px solid var(--odl-border)',
          borderRadius: 'var(--odl-border-radius-base)',
          backgroundColor: 'var(--odl-white)'
        }}>
          <h3 style={{ 
            fontSize: 'var(--odl-font-size-base)', 
            fontWeight: 'var(--odl-font-weight-semibold)',
            marginBottom: '8px',
            color: 'var(--odl-text-primary)'
          }}>
            ♿ WCAG 2.1 AA Compliant
          </h3>
          <ul style={{ 
            color: 'var(--odl-text-secondary)', 
            fontSize: 'var(--odl-font-size-sm)',
            lineHeight: 'var(--odl-line-height-normal)',
            paddingLeft: '16px'
          }}>
            <li>Full keyboard navigation support</li>
            <li>Screen reader compatible</li>
            <li>High contrast focus indicators</li>
            <li>Semantic HTML structure</li>
          </ul>
        </div>

        <div style={{
          padding: '20px',
          border: '1px solid var(--odl-border)',
          borderRadius: 'var(--odl-border-radius-base)',
          backgroundColor: 'var(--odl-white)'
        }}>
          <h3 style={{ 
            fontSize: 'var(--odl-font-size-base)', 
            fontWeight: 'var(--odl-font-weight-semibold)',
            marginBottom: '8px',
            color: 'var(--odl-text-primary)'
          }}>
          🎨 ODL Design System
          </h3>
          <ul style={{ 
            color: 'var(--odl-text-secondary)', 
            fontSize: 'var(--odl-font-size-sm)',
            lineHeight: 'var(--odl-line-height-normal)',
            paddingLeft: '16px'
          }}>
            <li>100% CSS custom properties</li>
            <li>No hardcoded colors or values</li>
            <li>Responsive design built-in</li>
            <li>Standard ODL component patterns</li>
          </ul>
        </div>
      </div>

      <BackToTop />
    </div>
  );
};

export default NewHeaderDemo;