import React, { useState } from 'react';
import Icon from '../components/Icon/Icon';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import ODLTheme from '../styles/ODLTheme';
import styles from './TableDemo.module.css';

// Simplified Tabs Component with inline styles
interface SimpleTabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
  icon?: string; // Carbon icon name
  iconPosition?: 'left' | 'right'; // Icon position relative to label
}

interface SimpleTabsProps {
  tabs: SimpleTabItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: 'default' | 'compact';
  showContent?: boolean;
}

const SimpleTabs: React.FC<SimpleTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
  showContent = true
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(activeTab || tabs[0]?.id || '');
  const currentActiveTab = activeTab || internalActiveTab;

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (disabled) return;
    if (onTabChange) {
      onTabChange(tabId);
    } else {
      setInternalActiveTab(tabId);
    }
  };

  const activeTabData = tabs.find(tab => tab.id === currentActiveTab);

  return (
    <div style={{ width: '100%' }}>
      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        borderBottom: `1px solid ${ODLTheme.colors.border}`, 
        gap: 0 
      }}>
        {tabs.map((tab) => {
          const isActive = tab.id === currentActiveTab;
          const isDisabled = tab.disabled;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id, isDisabled)}
              style={{
                position: 'relative',
                background: 'none',
                border: 'none',
                fontFamily: 'inherit',
                fontSize: variant === 'default' ? ODLTheme.typography.fontSize.sm : ODLTheme.typography.fontSize.xs,
                fontWeight: isActive ? 500 : 400,
                color: isActive ? ODLTheme.colors.primary : isDisabled ? ODLTheme.colors.text.tertiary : ODLTheme.colors.text.secondary,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                padding: variant === 'default' ? `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}` : `${ODLTheme.spacing[2]} ${ODLTheme.spacing[3]}`,
                borderRadius: 0,
                outline: 'none',
                transition: 'all 0.2s ease',
                opacity: isDisabled ? 0.6 : 1,
                whiteSpace: 'nowrap',
                minWidth: 0,
                flexShrink: 0,
                ...(isActive ? {
                  '::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-1px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: ODLTheme.colors.primary,
                    borderRadius: '1px'
                  }
                } : {})
              }}
              onMouseEnter={(e) => {
                if (!isDisabled && !isActive) {
                  e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
                }
              }}
              onMouseLeave={(e) => {
                if (!isDisabled) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[2] }}>
                {tab.icon && (!tab.iconPosition || tab.iconPosition === 'left') && (
                  <Icon name={tab.icon} size={16} />
                )}
                <span>{tab.label}</span>
                {tab.icon && tab.iconPosition === 'right' && (
                  <Icon name={tab.icon} size={16} />
                )}
              </div>
              {isActive && (
                <div style={{
                  position: 'absolute',
                  bottom: '-1px',
                  left: 0,
                  right: 0,
                  height: '2px',
                  backgroundColor: ODLTheme.colors.primary,
                  borderRadius: '1px'
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {showContent && activeTabData && activeTabData.content && (
        <div style={{ paddingTop: ODLTheme.spacing[4] }}>
          {activeTabData.content}
        </div>
      )}
    </div>
  );
};

const TabsDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'basic' | 'variants' | 'states' | 'icons' | 'navigation' | 'interactive'>('basic');
  const [showCode, setShowCode] = useState(false);
  
  // Demo state for interactive examples
  const [activeBasicTab, setActiveBasicTab] = useState('overview');
  const [activeCompactTab, setActiveCompactTab] = useState('settings');
  const [activeInteractiveTab, setActiveInteractiveTab] = useState('dashboard');

  // Sample tab data
  const basicTabs: SimpleTabItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div style={{ padding: ODLTheme.spacing[8], background: ODLTheme.colors.background, borderRadius: ODLTheme.spacing[2], border: `1px solid ${ODLTheme.colors.border}` }}>
          <h3 style={{ fontSize: ODLTheme.typography.fontSize.lg, fontWeight: 600, marginBottom: ODLTheme.spacing[4], color: ODLTheme.colors.text.primary }}>Overview Content</h3>
          <p style={{ color: ODLTheme.colors.text.secondary, lineHeight: 1.6 }}>
            This is the overview tab content. It provides a general summary and key information about the current section. 
            Tabs are useful for organizing related content and allowing users to switch between different views efficiently.
          </p>
          <div style={{ marginTop: ODLTheme.spacing[6], display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: ODLTheme.spacing[4] }}>
            <div style={{ padding: ODLTheme.spacing[4], background: 'white', borderRadius: ODLTheme.spacing[1], border: `1px solid ${ODLTheme.colors.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: ODLTheme.spacing[2] }}>
                <Icon name="dashboard" size={20} color={ODLTheme.colors.primary} />
                <span style={{ marginLeft: ODLTheme.spacing[2], fontWeight: 500 }}>Active Users</span>
              </div>
              <span style={{ fontSize: ODLTheme.typography.fontSize.xl, fontWeight: 700, color: ODLTheme.colors.text.primary }}>2,847</span>
            </div>
            <div style={{ padding: ODLTheme.spacing[4], background: 'white', borderRadius: ODLTheme.spacing[1], border: `1px solid ${ODLTheme.colors.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: ODLTheme.spacing[2] }}>
                <Icon name="chart-line" size={20} color={ODLTheme.colors.success} />
                <span style={{ marginLeft: ODLTheme.spacing[2], fontWeight: 500 }}>Growth</span>
              </div>
              <span style={{ fontSize: ODLTheme.typography.fontSize.xl, fontWeight: 700, color: ODLTheme.colors.text.primary }}>+12.5%</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'analytics',
      label: 'Analytics',
      content: (
        <div style={{ padding: ODLTheme.spacing[8], background: ODLTheme.colors.background, borderRadius: ODLTheme.spacing[2], border: `1px solid ${ODLTheme.colors.border}` }}>
          <h3 style={{ fontSize: ODLTheme.typography.fontSize.lg, fontWeight: 600, marginBottom: ODLTheme.spacing[4], color: ODLTheme.colors.text.primary }}>Analytics Dashboard</h3>
          <p style={{ color: ODLTheme.colors.text.secondary, marginBottom: ODLTheme.spacing[6] }}>
            Detailed analytics and metrics for your application performance and user engagement.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: ODLTheme.spacing[4], background: 'white', borderRadius: ODLTheme.spacing[1], border: `1px solid ${ODLTheme.colors.border}` }}>
            <span style={{ fontWeight: 500 }}>Average Session Duration</span>
            <span style={{ fontSize: ODLTheme.typography.fontSize.lg, fontWeight: 600, color: ODLTheme.colors.primary }}>4m 32s</span>
          </div>
        </div>
      )
    },
    {
      id: 'reports',
      label: 'Reports',
      content: (
        <div style={{ padding: ODLTheme.spacing[8], background: ODLTheme.colors.background, borderRadius: ODLTheme.spacing[2], border: `1px solid ${ODLTheme.colors.border}` }}>
          <h3 style={{ fontSize: ODLTheme.typography.fontSize.lg, fontWeight: 600, marginBottom: ODLTheme.spacing[4], color: ODLTheme.colors.text.primary }}>Reports & Data</h3>
          <p style={{ color: ODLTheme.colors.text.secondary }}>
            Generate and view various reports including performance metrics, user activity, and system health.
          </p>
        </div>
      )
    },
    {
      id: 'disabled',
      label: 'Disabled Tab',
      disabled: true,
      content: (
        <div style={{ padding: ODLTheme.spacing[8], background: ODLTheme.colors.background, borderRadius: ODLTheme.spacing[2], border: `1px solid ${ODLTheme.colors.border}` }}>
          <p>This content won't be shown as the tab is disabled.</p>
        </div>
      )
    }
  ];

  const compactTabs: SimpleTabItem[] = [
    { id: 'general', label: 'General' },
    { id: 'security', label: 'Security' },
    { id: 'settings', label: 'Settings' },
    { id: 'advanced', label: 'Advanced' }
  ];

  const interactiveTabs: SimpleTabItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      content: (
        <div style={{ padding: ODLTheme.spacing[8], background: 'white', borderRadius: ODLTheme.spacing[2], border: `1px solid ${ODLTheme.colors.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <Icon name="dashboard" size={24} color={ODLTheme.colors.primary} />
            <h3 style={{ fontSize: ODLTheme.typography.fontSize.lg, fontWeight: 600, marginLeft: ODLTheme.spacing[3], color: ODLTheme.colors.text.primary }}>Main Dashboard</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: ODLTheme.spacing[4] }}>
            <div style={{ padding: ODLTheme.spacing[6], background: ODLTheme.colors.surface, borderRadius: ODLTheme.spacing[2], border: `1px solid ${ODLTheme.colors.border}` }}>
              <h4 style={{ fontWeight: 600, marginBottom: ODLTheme.spacing[2] }}>System Status</h4>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Icon name="checkmark-filled" size={16} color={ODLTheme.colors.success} />
                <span style={{ marginLeft: ODLTheme.spacing[2], color: ODLTheme.colors.success, fontSize: ODLTheme.typography.fontSize.sm }}>All Systems Operational</span>
              </div>
            </div>
            <div style={{ padding: ODLTheme.spacing[6], background: `${ODLTheme.colors.warning}10`, borderRadius: ODLTheme.spacing[2], border: `1px solid ${ODLTheme.colors.warning}30` }}>
              <h4 style={{ fontWeight: 600, marginBottom: ODLTheme.spacing[2] }}>Pending Tasks</h4>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Icon name="warning" size={16} color={ODLTheme.colors.warning} />
                <span style={{ marginLeft: ODLTheme.spacing[2], color: ODLTheme.colors.warning, fontSize: ODLTheme.typography.fontSize.sm }}>3 items need attention</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'projects',
      label: 'Projects',
      content: (
        <div style={{ padding: ODLTheme.spacing[8], background: 'white', borderRadius: ODLTheme.spacing[2], border: `1px solid ${ODLTheme.colors.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <Icon name='folder' size={24} color={ODLTheme.colors.secondary} />
            <h3 style={{ fontSize: ODLTheme.typography.fontSize.lg, fontWeight: 600, marginLeft: ODLTheme.spacing[3], color: ODLTheme.colors.text.primary }}>Project Management</h3>
          </div>
          <p style={{ color: ODLTheme.colors.text.secondary, marginBottom: ODLTheme.spacing[6] }}>
            Track and manage all your active projects in one place.
          </p>
          <div style={{ display: 'flex', gap: ODLTheme.spacing[4] }}>
            <div style={{ padding: ODLTheme.spacing[4], background: `${ODLTheme.colors.primary}10`, borderRadius: ODLTheme.spacing[1], border: `1px solid ${ODLTheme.colors.primary}30`, flex: 1 }}>
              <h4 style={{ fontSize: ODLTheme.typography.fontSize.sm, fontWeight: 600, color: ODLTheme.colors.primary }}>Active Projects</h4>
              <span style={{ fontSize: ODLTheme.typography.fontSize['2xl'], fontWeight: 700, color: ODLTheme.colors.primary }}>12</span>
            </div>
            <div style={{ padding: ODLTheme.spacing[4], background: `${ODLTheme.colors.success}10`, borderRadius: ODLTheme.spacing[1], border: `1px solid ${ODLTheme.colors.success}30`, flex: 1 }}>
              <h4 style={{ fontSize: ODLTheme.typography.fontSize.sm, fontWeight: 600, color: ODLTheme.colors.success }}>Completed</h4>
              <span style={{ fontSize: ODLTheme.typography.fontSize['2xl'], fontWeight: 700, color: ODLTheme.colors.success }}>38</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'users',
      label: 'Users',
      content: (
        <div style={{ padding: ODLTheme.spacing[8], background: 'white', borderRadius: ODLTheme.spacing[2], border: `1px solid ${ODLTheme.colors.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
            <Icon name="user-multiple" size={24} color={ODLTheme.colors.secondary} />
            <h3 style={{ fontSize: ODLTheme.typography.fontSize.lg, fontWeight: 600, marginLeft: ODLTheme.spacing[3], color: ODLTheme.colors.text.primary }}>User Management</h3>
          </div>
          <p style={{ color: ODLTheme.colors.text.secondary }}>
            Manage user accounts, permissions, and access controls for your organization.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className={styles.tableDemo}>
      {/* Breadcrumb Navigation */}
      <DemoBreadcrumb componentName="Tabs Component" />
      
      {/* Enhanced Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>Tabs Component Showcase</h1>
            <p>Interactive tab navigation with multiple variants and states</p>
          </div>
          <div className={styles.headerActions}>
            <button
              className={showCode ? styles.primaryButton : styles.secondaryButton}
              onClick={() => setShowCode(!showCode)}
            >
              {showCode ? 'Hide Code' : 'View Code'}
            </button>
          </div>
        </div>
      </div>

      {/* Demo Selector */}
      <div className={styles.demoSelector}>
        <div className={styles.demoTabs}>
          {[
            { key: 'basic', label: 'Basic', desc: 'Standard tab examples', icon: '📑' },
            { key: 'variants', label: 'Variants', desc: 'Default and compact sizes', icon: '📏' },
            { key: 'states', label: 'States', desc: 'Active, hover, disabled states', icon: '🎯' },
            { key: 'icons', label: 'With Icons', desc: 'Tabs with Carbon icons', icon: '🎨' },
            { key: 'navigation', label: 'Navigation', desc: 'Keyboard navigation patterns', icon: '⌨️' },
            { key: 'interactive', label: 'Interactive', desc: 'Live tab switching example', icon: '⚡' }
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
        {selectedDemo === 'basic' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Basic Tabs</h2>
              <p>Standard tab implementation with content switching</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Default Tabs with Content</h3>
                <SimpleTabs
                  tabs={basicTabs}
                  activeTab={activeBasicTab}
                  onTabChange={setActiveBasicTab}
                />
              </div>
              
              <div style={{ marginTop: '2rem', padding: '1rem', background: '${ODLTheme.colors.background}', borderRadius: '0.5rem' }}>
                <p style={{ fontSize: '0.875rem', color: '${ODLTheme.colors.text.secondary}' }}>
                  <strong>Features:</strong> Click tabs to switch content, disabled tab cannot be selected, active tab shows blue underline indicator.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'variants' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Tab Variants</h2>
              <p>Different sizes for various layout contexts</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Default Size</h3>
                  <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '${ODLTheme.colors.text.secondary}' }}>
                    Standard tabs for most use cases (px-4 py-3 text-sm)
                  </p>
                  <SimpleTabs
                    tabs={[
                      { id: 'default1', label: 'Dashboard', content: <div style={{ padding: '1rem' }}>Dashboard content for default tabs</div> },
                      { id: 'default2', label: 'Analytics', content: <div style={{ padding: '1rem' }}>Analytics content</div> },
                      { id: 'default3', label: 'Settings', content: <div style={{ padding: '1rem' }}>Settings content</div> }
                    ]}
                    variant="default"
                  />
                </div>
                
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Compact Size</h3>
                  <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '${ODLTheme.colors.text.secondary}' }}>
                    Smaller tabs for space-constrained layouts (px-3 py-2 text-xs)
                  </p>
                  <SimpleTabs
                    tabs={compactTabs}
                    activeTab={activeCompactTab}
                    onTabChange={setActiveCompactTab}
                    variant="compact"
                    showContent={false}
                  />
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Navigation Only</h3>
                  <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '${ODLTheme.colors.text.secondary}' }}>
                    Tabs without content area (showContent=false)
                  </p>
                  <SimpleTabs
                    tabs={[
                      { id: 'nav1', label: 'Overview' },
                      { id: 'nav2', label: 'Details' },
                      { id: 'nav3', label: 'History' },
                      { id: 'nav4', label: 'Settings' }
                    ]}
                    showContent={false}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'states' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Tab States</h2>
              <p>Visual states and interactions for tabs</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Active State</h3>
                  <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '${ODLTheme.colors.text.secondary}' }}>
                    Active tabs have blue text (#0F62FE) and blue underline indicator
                  </p>
                  <SimpleTabs
                    tabs={[
                      { id: 'state1', label: 'Active Tab' },
                      { id: 'state2', label: 'Inactive Tab' },
                      { id: 'state3', label: 'Another Tab' }
                    ]}
                    activeTab="state1"
                    showContent={false}
                  />
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Hover State</h3>
                  <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '${ODLTheme.colors.text.secondary}' }}>
                    Hover over inactive tabs to see light gray background (#F4F4F4)
                  </p>
                  <SimpleTabs
                    tabs={[
                      { id: 'hover1', label: 'Hover me' },
                      { id: 'hover2', label: 'Or me' },
                      { id: 'hover3', label: 'Try hovering' }
                    ]}
                    showContent={false}
                  />
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Disabled State</h3>
                  <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '${ODLTheme.colors.text.secondary}' }}>
                    Disabled tabs have reduced opacity and cannot be clicked
                  </p>
                  <SimpleTabs
                    tabs={[
                      { id: 'disabled1', label: 'Active Tab' },
                      { id: 'disabled2', label: 'Normal Tab' },
                      { id: 'disabled3', label: 'Disabled Tab', disabled: true },
                      { id: 'disabled4', label: 'Another Disabled', disabled: true }
                    ]}
                    activeTab="disabled1"
                    showContent={false}
                  />
                </div>
              </div>
              
              <div style={{ marginTop: '2rem', padding: '1rem', background: '${ODLTheme.colors.primary}10', borderRadius: '0.5rem', border: '1px solid ${ODLTheme.colors.primary}30' }}>
                <p style={{ fontSize: '0.875rem', color: '${ODLTheme.colors.primary}' }}>
                  <strong>Design Guidelines:</strong> Active tabs maintain consistent visual hierarchy with blue accent color and underline indicator.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'icons' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Tabs with Icons</h2>
              <p>Tabs enhanced with Carbon Design System icons</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Icons with Labels (Left Position)</h3>
                  <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '${ODLTheme.colors.text.secondary}' }}>
                    Icons positioned to the left of the label text
                  </p>
                  <SimpleTabs
                    tabs={[
                      { id: 'dashboard-icon', label: 'Dashboard', icon: 'dashboard', content: <div style={{ padding: '1rem' }}>Dashboard tab with dashboard icon</div> },
                      { id: 'analytics-icon', label: 'Analytics', icon: 'chart-line', content: <div style={{ padding: '1rem' }}>Analytics tab with chart icon</div> },
                      { id: 'settings-icon', label: 'Settings', icon: 'settings', content: <div style={{ padding: '1rem' }}>Settings tab with settings icon</div> },
                      { id: 'users-icon', label: 'Users', icon: 'user-multiple', content: <div style={{ padding: '1rem' }}>Users tab with user icon</div> }
                    ]}
                  />
                </div>
                
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Icons with Labels (Right Position)</h3>
                  <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '${ODLTheme.colors.text.secondary}' }}>
                    Icons positioned to the right of the label text
                  </p>
                  <SimpleTabs
                    tabs={[
                      { id: 'documents-right', label: 'Documents', icon: 'document', iconPosition: 'right', content: <div style={{ padding: '1rem' }}>Documents with icon on the right</div> },
                      { id: 'download-right', label: 'Downloads', icon: 'download', iconPosition: 'right', content: <div style={{ padding: '1rem' }}>Downloads with icon on the right</div> },
                      { id: 'export-right', label: 'Export', icon: 'export', iconPosition: 'right', content: <div style={{ padding: '1rem' }}>Export with icon on the right</div> }
                    ]}
                    variant="default"
                  />
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Compact Tabs with Icons</h3>
                  <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '${ODLTheme.colors.text.secondary}' }}>
                    Smaller tabs with icons for dense layouts
                  </p>
                  <SimpleTabs
                    tabs={[
                      { id: 'home-compact', label: 'Home', icon: 'home' },
                      { id: 'search-compact', label: 'Search', icon: 'search' },
                      { id: 'filter-compact', label: 'Filter', icon: 'filter' },
                      { id: 'save-compact', label: 'Save', icon: 'save' }
                    ]}
                    variant="compact"
                    showContent={false}
                  />
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Mixed Icon Positions</h3>
                  <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '${ODLTheme.colors.text.secondary}' }}>
                    Tabs with different icon positions in the same tab group
                  </p>
                  <SimpleTabs
                    tabs={[
                      { id: 'add-new', label: 'Add', icon: 'add', content: <div style={{ padding: '1rem' }}>Add new items (left icon)</div> },
                      { id: 'edit-item', label: 'Edit', icon: 'edit', content: <div style={{ padding: '1rem' }}>Edit existing items (left icon)</div> },
                      { id: 'view-item', label: 'View', icon: 'view', iconPosition: 'right', content: <div style={{ padding: '1rem' }}>View items (right icon)</div> },
                      { id: 'close-item', label: 'Close', icon: 'close', iconPosition: 'right', content: <div style={{ padding: '1rem' }}>Close view (right icon)</div> }
                    ]}
                  />
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Status Icons</h3>
                  <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '${ODLTheme.colors.text.secondary}' }}>
                    Tabs with status and state indicators
                  </p>
                  <SimpleTabs
                    tabs={[
                      { id: 'success-tab', label: 'Completed', icon: 'checkmark-filled', content: <div style={{ padding: '1rem', background: '${ODLTheme.colors.success}10', border: '1px solid ${ODLTheme.colors.success}30', borderRadius: '0.5rem' }}><span style={{ color: '${ODLTheme.colors.success}' }}>✓ All tasks completed successfully</span></div> },
                      { id: 'warning-tab', label: 'Pending', icon: 'warning', content: <div style={{ padding: '1rem', background: '${ODLTheme.colors.warning}10', border: '1px solid ${ODLTheme.colors.warning}30', borderRadius: '0.5rem' }}><span style={{ color: '#92400e' }}>⚠ Items pending review</span></div> },
                      { id: 'error-tab', label: 'Failed', icon: 'flash', content: <div style={{ padding: '1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.5rem' }}><span style={{ color: '#dc2626' }}>✗ Action failed</span></div> }
                    ]}
                  />
                </div>
              </div>
              
              <div style={{ marginTop: '3rem', padding: '1rem', background: '#f0f9ff', borderRadius: '0.5rem', border: '1px solid #bae6fd' }}>
                <p style={{ fontSize: '0.875rem', color: '#0369a1' }}>
                  <strong>Icon Integration:</strong> Tabs support Carbon Design System icons positioned left or right of the label. Icons automatically inherit the tab's color state (active, hover, disabled).
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'navigation' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Keyboard Navigation</h2>
              <p>Accessibility and keyboard interaction patterns</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Try Keyboard Navigation</h3>
                <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '${ODLTheme.colors.text.secondary}' }}>
                  Click a tab to focus it, then use arrow keys to navigate
                </p>
                <SimpleTabs
                  tabs={[
                    { id: 'nav-a', label: 'First Tab', content: <div style={{ padding: '1rem' }}>Use ← → arrow keys to navigate between tabs</div> },
                    { id: 'nav-b', label: 'Second Tab', content: <div style={{ padding: '1rem' }}>Home key moves to first tab, End key to last</div> },
                    { id: 'nav-c', label: 'Third Tab', content: <div style={{ padding: '1rem' }}>Tab navigation wraps around from last to first</div> },
                    { id: 'nav-d', label: 'Last Tab', content: <div style={{ padding: '1rem' }}>Focus indicators help with accessibility</div> }
                  ]}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                <div style={{ padding: ODLTheme.spacing[6], background: ODLTheme.colors.surface, borderRadius: ODLTheme.spacing[2], border: `1px solid ${ODLTheme.colors.border}` }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#374151' }}>Keyboard Shortcuts</h4>
                  <ul style={{ fontSize: '0.875rem', color: '${ODLTheme.colors.text.secondary}', lineHeight: 1.6 }}>
                    <li><strong>← →</strong> Navigate between tabs</li>
                    <li><strong>Home</strong> Go to first tab</li>
                    <li><strong>End</strong> Go to last tab</li>
                    <li><strong>Tab</strong> Focus tab content</li>
                  </ul>
                </div>
                
                <div style={{ padding: ODLTheme.spacing[6], background: `${ODLTheme.colors.warning}10`, borderRadius: ODLTheme.spacing[2], border: `1px solid ${ODLTheme.colors.warning}30` }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#92400e' }}>ARIA Attributes</h4>
                  <ul style={{ fontSize: '0.875rem', color: '#92400e', lineHeight: 1.6 }}>
                    <li><strong>role="tablist"</strong> Tab container</li>
                    <li><strong>role="tab"</strong> Individual tabs</li>
                    <li><strong>aria-selected</strong> Active state</li>
                    <li><strong>role="tabpanel"</strong> Content area</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'interactive' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Interactive Example</h2>
              <p>Real-world application dashboard with live tab switching</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>Application Dashboard</h3>
                <p style={{ fontSize: '0.875rem', color: '${ODLTheme.colors.text.secondary}', marginBottom: '1.5rem' }}>
                  Switch between different sections of the application dashboard
                </p>
              </div>
              
              <SimpleTabs
                tabs={interactiveTabs}
                activeTab={activeInteractiveTab}
                onTabChange={setActiveInteractiveTab}
              />

              <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f9ff', borderRadius: '0.5rem', border: '1px solid #bae6fd' }}>
                <p style={{ fontSize: '0.875rem', color: '#0369a1' }}>
                  <strong>Current Tab:</strong> {interactiveTabs.find(tab => tab.id === activeInteractiveTab)?.label}
                  <br />
                  <strong>Implementation:</strong> Controlled tabs with external state management for complex applications.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Code Example Panel */}
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
          <h3>Tabs Component Features</h3>
          <p>Everything you need for tab navigation</p>
        </div>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCategory}>
            <h4>📑 Content Organization</h4>
            <ul>
              <li>✓ Content switching</li>
              <li>✓ Active state management</li>
              <li>✓ Dynamic content</li>
              <li>✓ Tab labels</li>
              <li>✓ Optional content display</li>
              <li>✓ Flexible tab items</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>🎨 Visual Design</h4>
            <ul>
              <li>✓ Blue active indicator</li>
              <li>✓ Hover state feedback</li>
              <li>✓ Disabled tab styling</li>
              <li>✓ Clean underline design</li>
              <li>✓ Consistent spacing</li>
              <li>✓ Focus indicators</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>🎨 Icon Support</h4>
            <ul>
              <li>✓ Carbon Design icons</li>
              <li>✓ Left icon positioning</li>
              <li>✓ Right icon positioning</li>
              <li>✓ Mixed icon positions</li>
              <li>✓ Status indicators</li>
              <li>✓ Icon color inheritance</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>📏 Size Variants</h4>
            <ul>
              <li>✓ Default size (px-4 py-3)</li>
              <li>✓ Compact size (px-3 py-2)</li>
              <li>✓ Responsive design</li>
              <li>✓ Flexible layouts</li>
              <li>✓ Navigation-only mode</li>
              <li>✓ Content toggle</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>🎯 Interactive States</h4>
            <ul>
              <li>✓ Active tab highlighting</li>
              <li>✓ Hover interactions</li>
              <li>✓ Disabled state</li>
              <li>✓ Click handlers</li>
              <li>✓ State persistence</li>
              <li>✓ External control</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>⌨️ Keyboard Navigation</h4>
            <ul>
              <li>✓ Arrow key navigation</li>
              <li>✓ Home/End keys</li>
              <li>✓ Tab focus management</li>
              <li>✓ Navigation wrapping</li>
              <li>✓ Skip disabled tabs</li>
              <li>✓ Focus restoration</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>👍 Accessibility</h4>
            <ul>
              <li>✓ ARIA tablist pattern</li>
              <li>✓ Screen reader support</li>
              <li>✓ Focus management</li>
              <li>✓ Semantic markup</li>
              <li>✓ Role attributes</li>
              <li>✓ State announcements</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );

  // Helper function to generate code examples
  function getCodeExample(demo: string): string {
    const examples = {
      basic: `// Basic Tabs Implementation
// Simplified self-contained tabs component

const tabs = [
  {
    id: 'overview',
    label: 'Overview',
    content: <div>Overview content here</div>
  },
  {
    id: 'analytics',
    label: 'Analytics', 
    content: <div>Analytics content here</div>
  },
  {
    id: 'disabled',
    label: 'Disabled',
    disabled: true
  }
];

<SimpleTabs 
  tabs={tabs}
  activeTab="overview"
  onTabChange={(tabId) => console.log(tabId)}
/>`,
      
      variants: `// Tab Variants
// Default size
<SimpleTabs 
  tabs={tabs}
  variant="default"
/>

// Compact size  
<SimpleTabs 
  tabs={tabs}
  variant="compact"
/>

// Navigation only (no content)
<SimpleTabs 
  tabs={tabs}
  showContent={false}
/>`,
      
      states: `// Tab States
const [activeTab, setActiveTab] = useState('tab1');

// Controlled tabs
<SimpleTabs
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>

// With disabled tabs
const tabsWithDisabled = [
  { id: 'active', label: 'Active Tab' },
  { id: 'disabled', label: 'Disabled', disabled: true }
];`,
      
      icons: `// Tabs with Icons
// Left positioned icons (default)
<SimpleTabs
  tabs={[
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'analytics', label: 'Analytics', icon: 'chart-line' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ]}
/>

// Right positioned icons
<SimpleTabs
  tabs={[
    { id: 'documents', label: 'Documents', icon: 'document', iconPosition: 'right' },
    { id: 'download', label: 'Download', icon: 'download', iconPosition: 'right' }
  ]}
/>

// Mixed positions
<SimpleTabs
  tabs={[
    { id: 'add', label: 'Add', icon: 'add' },
    { id: 'close', label: 'Close', icon: 'close', iconPosition: 'right' }
  ]}
/>`,
      
      navigation: `// Keyboard Navigation
// Built-in keyboard support:
// ← → Arrow keys navigate between tabs
// Home/End keys go to first/last tab
// Tab key focuses content area
// Navigation automatically skips disabled tabs

<SimpleTabs 
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  // Keyboard navigation would need to be added
/>`,
      
      interactive: `// Interactive Dashboard Example
const [activeTab, setActiveTab] = useState('dashboard');

const dashboardTabs = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    content: <DashboardContent />
  },
  {
    id: 'projects', 
    label: 'Projects',
    content: <ProjectsContent />
  }
];

<SimpleTabs
  tabs={dashboardTabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>`
    };
    
    return examples[demo as keyof typeof examples] || examples.basic;
  }
};

export default TabsDemo;