import React, { useState } from 'react';
import BaseHeader from '../components/Headers/BaseHeader';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import Button from '../components/Button/Button';

const BaseHeaderDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'default' | 'sizes' | 'states' | 'accessibility'>('default');
  const [showCode, setShowCode] = useState(false);

  const handleNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
  };

  const handleNotification = () => {
    console.log('Notification clicked');
  };

  const handleSettings = () => {
    console.log('Settings clicked');
  };

  const handleAvatar = () => {
    console.log('Avatar clicked');
  };

  const getHeaderCode = () => {
    switch (selectedDemo) {
      case 'default':
        return `<BaseHeader
  onNavigate={handleNavigation}
  logo="/assets/Logos/Product=Build-light theme.svg"
  logoAlt="Build logo"
  productTitle="Build AU"
  userInitials="SM"
  onNotificationClick={handleNotification}
  onSettingsClick={handleSettings}
  onAvatarClick={handleAvatar}
/>`;
      case 'sizes':
        return `{/* Small */}
<BaseHeader size="sm" {...props} />

{/* Medium (Default) */}
<BaseHeader size="md" {...props} />

{/* Large */}
<BaseHeader size="lg" {...props} />`;
      case 'states':
        return `{/* Error State */}
<BaseHeader error={true} {...props} />

{/* Disabled State */}
<BaseHeader disabled={true} {...props} />`;
      case 'accessibility':
        return `<BaseHeader
  aria-label="Main navigation header"
  onNavigate={handleNavigation}
  onNotificationClick={handleNotification}
  onSettingsClick={handleSettings}
  onAvatarClick={handleAvatar}
  onKeyDown={(e) => {
    if (e.key === 'Escape') {
      // Handle escape key
    }
  }}
  {...otherProps}
/>`;
      default:
        return '';
    }
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'var(--odl-font-family-sans)' }}>
      <DemoBreadcrumb 
        items={[
          { label: 'Components', path: '/' },
          { label: 'Headers', path: '/headers' },
          { label: 'BaseHeader', path: '/base-header-demo' }
        ]} 
      />

      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: 'var(--odl-font-size-xl)', 
          fontWeight: 'var(--odl-font-weight-semibold)',
          color: 'var(--odl-text-primary)',
          marginBottom: '8px'
        }}>
          BaseHeader Component
        </h1>
        <p style={{ 
          color: 'var(--odl-text-secondary)', 
          fontSize: 'var(--odl-font-size-base)',
          lineHeight: 'var(--odl-line-height-normal)'
        }}>
          ODL-compliant header component with full WCAG 2.1 AA accessibility support.
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
          { key: 'default', label: 'Default' },
          { key: 'sizes', label: 'Sizes' },
          { key: 'states', label: 'States' },
          { key: 'accessibility', label: 'Accessibility' }
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
        {selectedDemo === 'default' && (
          <BaseHeader
            onNavigate={handleNavigation}
            logo="/assets/Logos/Product=Build-light theme.svg"
            logoAlt="Build logo"
            productTitle="Build AU"
            userInitials="SM"
            onNotificationClick={handleNotification}
            onSettingsClick={handleSettings}
            onAvatarClick={handleAvatar}
          />
        )}

        {selectedDemo === 'sizes' && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ 
                fontSize: 'var(--odl-font-size-base)', 
                marginBottom: '8px',
                color: 'var(--odl-text-primary)'
              }}>
                Small
              </h3>
              <BaseHeader
                size="sm"
                onNavigate={handleNavigation}
                logo="/assets/Logos/Product=Connect-light theme.svg"
                logoAlt="Connect logo"
                productTitle="Connect"
                userInitials="JD"
                onNotificationClick={handleNotification}
                onSettingsClick={handleSettings}
                onAvatarClick={handleAvatar}
              />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ 
                fontSize: 'var(--odl-font-size-base)', 
                marginBottom: '8px',
                color: 'var(--odl-text-primary)'
              }}>
                Medium (Default)
              </h3>
              <BaseHeader
                size="md"
                onNavigate={handleNavigation}
                logo="/assets/Logos/Product=Keystone-light theme.svg"
                logoAlt="Keystone logo"
                productTitle="Keystone"
                userInitials="MK"
                onNotificationClick={handleNotification}
                onSettingsClick={handleSettings}
                onAvatarClick={handleAvatar}
              />
            </div>
            <div>
              <h3 style={{ 
                fontSize: 'var(--odl-font-size-base)', 
                marginBottom: '8px',
                color: 'var(--odl-text-primary)'
              }}>
                Large
              </h3>
              <BaseHeader
                size="lg"
                onNavigate={handleNavigation}
                logo="/assets/Logos/Product=Nexus-light theme.svg"
                logoAlt="Nexus logo"
                productTitle="Nexus"
                userInitials="AL"
                onNotificationClick={handleNotification}
                onSettingsClick={handleSettings}
                onAvatarClick={handleAvatar}
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
                color: 'var(--odl-text-primary)'
              }}>
                Error State
              </h3>
              <BaseHeader
                error={true}
                onNavigate={handleNavigation}
                logo="/assets/Logos/Product=Regworks-light theme.svg"
                logoAlt="Regworks logo"
                productTitle="Regworks"
                userInitials="ER"
                onNotificationClick={handleNotification}
                onSettingsClick={handleSettings}
                onAvatarClick={handleAvatar}
              />
            </div>
            <div>
              <h3 style={{ 
                fontSize: 'var(--odl-font-size-base)', 
                marginBottom: '8px',
                color: 'var(--odl-text-primary)'
              }}>
                Disabled State
              </h3>
              <BaseHeader
                disabled={true}
                onNavigate={handleNavigation}
                logo="/assets/Logos/Product=3SIXTY-light theme.svg"
                logoAlt="3SIXTY logo"
                productTitle="3SIXTY"
                userInitials="DS"
                onNotificationClick={handleNotification}
                onSettingsClick={handleSettings}
                onAvatarClick={handleAvatar}
              />
            </div>
          </div>
        )}

        {selectedDemo === 'accessibility' && (
          <BaseHeader
            aria-label="Accessible header navigation demo"
            onNavigate={handleNavigation}
            logo="/assets/Logos/Product=Build-light theme.svg"
            logoAlt="Build logo with full accessibility support"
            productTitle="Build AU - Accessible"
            userInitials="AC"
            onNotificationClick={handleNotification}
            onSettingsClick={handleSettings}
            onAvatarClick={handleAvatar}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                console.log('Escape key pressed - close menus');
              }
            }}
          />
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
            ♿ WCAG 2.1 AA Compliant
          </h3>
          <ul style={{ 
            color: 'var(--odl-text-secondary)', 
            fontSize: 'var(--odl-font-size-sm)',
            lineHeight: 'var(--odl-line-height-normal)',
            paddingLeft: '16px'
          }}>
            <li>Full keyboard navigation support</li>
            <li>Screen reader compatible with ARIA labels</li>
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
            <li>WCAG AA compliant color contrasts</li>
            <li>8px grid spacing system</li>
            <li>Consistent size variations</li>
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
            🔧 Standard Architecture
          </h3>
          <ul style={{ 
            color: 'var(--odl-text-secondary)', 
            fontSize: 'var(--odl-font-size-sm)',
            lineHeight: 'var(--odl-line-height-normal)',
            paddingLeft: '16px'
          }}>
            <li>Standard ODL component props</li>
            <li>Size, disabled, and error states</li>
            <li>Proper event handling</li>
            <li>CSS class-based styling</li>
          </ul>
        </div>
      </div>

      <BackToTop />
    </div>
  );
};

export default BaseHeaderDemo;