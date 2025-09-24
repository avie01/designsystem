import React, { useState } from 'react';
import Icon from '../components/Icon/Icon';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import UserAvatar from '../components/UserAvatar/UserAvatar';
import type { UserInfo } from '../components/UserAvatar/UserAvatar';
import styles from './TableDemo.module.css';

// Self-contained Button component for the demo
const Button: React.FC<{
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium';
  onClick?: () => void;
  children: React.ReactNode;
}> = ({ variant = 'primary', size = 'medium', onClick, children }) => {
  const baseStyles: React.CSSProperties = {
    padding: size === 'small' ? '6px 12px' : '8px 16px',
    fontSize: size === 'small' ? '13px' : '14px',
    fontWeight: 500,
    borderRadius: '4px',
    cursor: 'pointer',
    border: '1px solid',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  };

  const variantStyles: React.CSSProperties = variant === 'primary' 
    ? {
        backgroundColor: '#3560C1',
        borderColor: '#3560C1',
        color: 'white',
      }
    : {
        backgroundColor: 'white',
        borderColor: '#D1D1D1',
        color: '#3560C1',
      };

  return (
    <button 
      style={{ ...baseStyles, ...variantStyles }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.backgroundColor = '#2850B1';
        } else {
          e.currentTarget.style.backgroundColor = '#F5F5F5';
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.backgroundColor = '#3560C1';
        } else {
          e.currentTarget.style.backgroundColor = 'white';
        }
      }}
    >
      {children}
    </button>
  );
};

const UserAvatarDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'colors' | 'sizes' | 'interactive' | 'states'>('colors');
  const [showCode, setShowCode] = useState(false);

  // Sample users
  const sampleUsers: UserInfo[] = [
    {
      name: 'Sarah Mitchell',
      role: 'Senior Planner',
      department: 'Development Assessment',
      email: 'sarah.mitchell@council.gov.au',
    },
    {
      name: 'James Chen',
      role: 'Planning Officer',
      department: 'Strategic Planning',
      email: 'james.chen@council.gov.au',
    },
    {
      name: 'Emma Wilson',
      role: 'Team Lead',
      department: 'Development Assessment',
      email: 'emma.wilson@council.gov.au',
    },
    {
      name: 'Michael Brown',
      role: 'Principal Planner',
      department: 'Major Projects',
      email: 'michael.brown@council.gov.au',
    },
    {
      name: 'Lisa Anderson',
      role: 'Assessment Officer',
      department: 'Development Assessment',
      email: 'lisa.anderson@council.gov.au',
    },
    {
      name: 'David Lee',
      role: 'Planning Coordinator',
      department: 'Strategic Planning',
      email: 'david.lee@council.gov.au',
    },
  ];

  const getCodeExample = (demo: string) => {
    const examples: Record<string, string> = {
      colors: `// Auto-generated colors based on user names
<UserAvatar user={{ name: "Sarah Mitchell", role: "Senior Planner" }} />
<UserAvatar user={{ name: "James Chen", role: "Planning Officer" }} />
<UserAvatar user={{ name: "Emma Wilson", role: "Team Lead" }} />
<UserAvatar user={{ name: "Michael Brown", role: "Principal Planner" }} />`,

      sizes: `// Size variants - sm, md, lg
<UserAvatar user={user} size="sm" />
<UserAvatar user={user} size="md" />
<UserAvatar user={user} size="lg" />`,

      interactive: `// Clickable avatars with accessibility
<UserAvatar 
  user={user} 
  clickable 
  onClick={() => console.log('Avatar clicked!')} 
  aria-label="Click to view user profile"
/>

// With custom popup
<UserAvatar 
  user={user} 
  showPopup={true}
/>`,

      states: `// Different states
<UserAvatar user={user} />
<UserAvatar user={user} disabled />
<UserAvatar user={user} error />
<UserAvatar user={user} clickable disabled />`,
    };

    return examples[demo] || '';
  };

  return (
    <div className={styles.tableDemo}>
      {/* Breadcrumb Navigation */}
      <DemoBreadcrumb componentName="UserAvatar Component" />
      
      {/* Enhanced Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>UserAvatar Component Showcase</h1>
            <p>Accessible user avatars with ODL compliance, auto-generated colors, and rich tooltips</p>
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
            { key: 'colors', label: 'Auto Colors', desc: 'Generated from names', icon: '🎨' },
            { key: 'sizes', label: 'Sizes', desc: 'Small, medium, large', icon: '📏' },
            { key: 'interactive', label: 'Interactive', desc: 'Clickable with tooltips', icon: '👆' },
            { key: 'states', label: 'States', desc: 'Disabled, error states', icon: '🔧' },
          ].map(demo => (
            <button
              key={demo.key}
              className={`${styles.demoTab} ${selectedDemo === demo.key ? styles.active : ''}`}
              onClick={() => setSelectedDemo(demo.key as any)}
            >
              <span className={styles.demoIcon}>{demo.icon}</span>
              <div className={styles.demoTabContent}>
                <span className={styles.demoLabel}>{demo.label}</span>
                <span className={styles.demoDesc}>{demo.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <div className={styles.demoContent}>
        {selectedDemo === 'colors' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Auto-Generated Colors</h2>
              <p>Consistent colors generated from user names using ODL chart color palette</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center' }}>
                {sampleUsers.map(user => (
                  <div key={user.name} style={{ textAlign: 'center' }}>
                    <UserAvatar user={user} size="lg" />
                    <p style={{ marginTop: '8px', fontSize: '12px', color: '#525252', maxWidth: '80px' }}>
                      {user.name.split(' ')[0]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'sizes' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Size Variants</h2>
              <p>Three standard sizes with proper touch targets for accessibility</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <UserAvatar user={sampleUsers[0]} size="sm" />
                  <p style={{ marginTop: '8px', fontSize: '12px', color: '#525252' }}>Small (24px)</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <UserAvatar user={sampleUsers[0]} size="md" />
                  <p style={{ marginTop: '8px', fontSize: '12px', color: '#525252' }}>Medium (32px)</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <UserAvatar user={sampleUsers[0]} size="lg" />
                  <p style={{ marginTop: '8px', fontSize: '12px', color: '#525252' }}>Large (40px)</p>
                </div>
              </div>
              
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem', marginTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Clickable Sizes</h3>
                <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  All sizes meet WCAG 44px minimum touch target when clickable
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center' }}>
                    <UserAvatar 
                      user={sampleUsers[1]} 
                      size="sm" 
                      clickable 
                      onClick={() => alert('Small avatar clicked!')} 
                    />
                    <p style={{ marginTop: '8px', fontSize: '12px', color: '#525252' }}>Clickable Small</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <UserAvatar 
                      user={sampleUsers[1]} 
                      size="md" 
                      clickable 
                      onClick={() => alert('Medium avatar clicked!')} 
                    />
                    <p style={{ marginTop: '8px', fontSize: '12px', color: '#525252' }}>Clickable Medium</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <UserAvatar 
                      user={sampleUsers[1]} 
                      size="lg" 
                      clickable 
                      onClick={() => alert('Large avatar clicked!')} 
                    />
                    <p style={{ marginTop: '8px', fontSize: '12px', color: '#525252' }}>Clickable Large</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'interactive' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Interactive Features</h2>
              <p>Clickable avatars with keyboard navigation and rich tooltips</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>With Tooltips</h3>
                <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  Hover to see detailed user information
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  {sampleUsers.slice(0, 4).map(user => (
                    <UserAvatar 
                      key={user.name} 
                      user={user} 
                      size="lg"
                      showPopup={true}
                    />
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Clickable Actions</h3>
                <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  Click or use Enter/Space keys for keyboard accessibility
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  {sampleUsers.slice(0, 3).map(user => (
                    <UserAvatar 
                      key={user.name} 
                      user={user} 
                      size="lg"
                      clickable
                      showPopup={true}
                      onClick={() => alert(`Clicked ${user.name}'s avatar!`)}
                      aria-label={`View ${user.name}'s profile`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'states' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Component States</h2>
              <p>Disabled and error states following ODL design patterns</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Normal States</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    <div style={{ textAlign: 'center' }}>
                      <UserAvatar user={sampleUsers[0]} size="lg" />
                      <p style={{ marginTop: '8px', fontSize: '12px', color: '#525252' }}>Normal</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <UserAvatar user={sampleUsers[0]} size="lg" clickable onClick={() => alert('Clicked!')} />
                      <p style={{ marginTop: '8px', fontSize: '12px', color: '#525252' }}>Clickable</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Disabled States</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    <div style={{ textAlign: 'center' }}>
                      <UserAvatar user={sampleUsers[1]} size="lg" disabled />
                      <p style={{ marginTop: '8px', fontSize: '12px', color: '#525252' }}>Disabled</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <UserAvatar 
                        user={sampleUsers[1]} 
                        size="lg" 
                        clickable 
                        disabled 
                        onClick={() => alert('Should not fire')} 
                      />
                      <p style={{ marginTop: '8px', fontSize: '12px', color: '#525252' }}>Disabled Clickable</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Error States</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    <div style={{ textAlign: 'center' }}>
                      <UserAvatar user={sampleUsers[2]} size="lg" error />
                      <p style={{ marginTop: '8px', fontSize: '12px', color: '#525252' }}>Error</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <UserAvatar 
                        user={sampleUsers[2]} 
                        size="lg" 
                        clickable 
                        error 
                        onClick={() => alert('Error state clicked')} 
                      />
                      <p style={{ marginTop: '8px', fontSize: '12px', color: '#525252' }}>Error Clickable</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Code Panel */}
        {showCode && (
          <div className={styles.codePanel}>
            <h3>Code Example</h3>
            <pre className={styles.codeBlock}>
              <code>{getCodeExample(selectedDemo)}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Features Showcase */}
      <div className={styles.featuresShowcase}>
        <div className={styles.sectionHeader}>
          <h3>UserAvatar Component Features</h3>
          <p>Full ODL compliance with WCAG 2.1 AA accessibility standards</p>
        </div>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCategory}>
            <h4>🎨 ODL Compliance</h4>
            <ul>
              <li>✓ CSS custom properties</li>
              <li>✓ ODL color constants</li>
              <li>✓ 8px grid spacing</li>
              <li>✓ ODL typography</li>
              <li>✓ Consistent theming</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>♿ Accessibility</h4>
            <ul>
              <li>✓ WCAG 2.1 AA compliant</li>
              <li>✓ Keyboard navigation</li>
              <li>✓ ARIA attributes</li>
              <li>✓ Focus indicators</li>
              <li>✓ 44px touch targets</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>⚡ Interactive</h4>
            <ul>
              <li>✓ Clickable avatars</li>
              <li>✓ Hover tooltips</li>
              <li>✓ Disabled states</li>
              <li>✓ Error states</li>
              <li>✓ Custom handlers</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>🎯 Smart Features</h4>
            <ul>
              <li>✓ Auto color generation</li>
              <li>✓ Initial extraction</li>
              <li>✓ Consistent naming</li>
              <li>✓ Image fallbacks</li>
              <li>✓ Rich user details</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>🚀 Performance</h4>
            <ul>
              <li>✓ CSS-based styling</li>
              <li>✓ No inline styles</li>
              <li>✓ Efficient rendering</li>
              <li>✓ Small bundle size</li>
              <li>✓ Tree shakeable</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>💡 Use Cases</h4>
            <ul>
              <li>✓ User profiles</li>
              <li>✓ Team displays</li>
              <li>✓ Comment systems</li>
              <li>✓ Collaboration tools</li>
              <li>✓ Contact lists</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <BackToTop />
    </div>
  );
};

export default UserAvatarDemo;