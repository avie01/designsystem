import React, { useState } from 'react';
import NavigationRail from '../components/NavigationRail/NavigationRail';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import Icon from '../components/Icon/Icon';
import Button from '../components/Button/Button';
import ODLTheme from '../styles/ODLTheme';
import styles from './TableDemo.module.css';

// Using ODL Button component instead of custom implementation

const NavigationRailDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'basic' | 'collapsed' | 'themes' | 'custom' | 'states' | 'integration'>('basic');
  const [showCode, setShowCode] = useState(false);
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [rightPath, setRightPath] = useState('/edit');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);
  const [railPosition, setRailPosition] = useState<'left' | 'right'>('left');
  const [showTooltips, setShowTooltips] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Sample menu items matching the collapsed nav rail design
  const defaultMenuItems = [
    { id: 'dashboard', iconName: 'dashboard', label: 'Dashboard', path: '/dashboard', description: 'View your dashboard', shortcut: '⌘D' },
    { id: 'documents', iconName: 'document', label: 'Documents', path: '/documents', description: 'Browse documents', shortcut: '⌘1' },
    { id: 'folder', iconName: 'folder', label: 'Projects', path: '/projects', description: 'Project folders', shortcut: '⌘2' },
    { id: 'home', iconName: 'home', label: 'Home', path: '/home', description: 'Go to home', shortcut: '⌘H' },
    { id: 'users', iconName: 'user-multiple', label: 'Users', path: '/users', description: 'Manage users', shortcut: '⌘U' },
    { id: 'settings', iconName: 'settings', label: 'Settings', path: '/settings', description: 'System settings', shortcut: '⌘,' },
  ];

  // Right rail menu items - contextual tools for content manipulation
  const contextualMenuItems = [
    { 
      id: 'actions', 
      iconName: 'flash', 
      label: 'Actions', 
      path: '/actions', 
      description: 'Quick actions',
      shortcut: '⌘A',
      children: [
        { id: 'actions-detail', iconName: 'launch', label: 'Go to detail page', path: '/actions/detail', description: 'Navigate to detail page' },
        { id: 'actions-email', iconName: 'email', label: 'Email', path: '/actions/email', description: 'Send via email' },
        { id: 'actions-alias', iconName: 'copy', label: 'Alias Move Copy', path: '/actions/alias', description: 'Alias, move or copy' },
        { id: 'actions-download', iconName: 'download', label: 'Download', path: '/actions/download', description: 'Download file' },
        { id: 'actions-publish', iconName: 'send', label: 'Publish', path: '/actions/publish', description: 'Publish content' },
        { id: 'actions-edit', iconName: 'edit', label: 'Edit new version', path: '/actions/edit', description: 'Edit new version' },
        { id: 'actions-office', iconName: 'document', label: 'Edit in office online', path: '/actions/office', description: 'Edit in office online' },
        { id: 'actions-upload', iconName: 'upload', label: 'Upload new version', path: '/actions/upload', description: 'Upload new version' },
        { id: 'actions-workflow', iconName: 'workflow-automation', label: 'Start workflow', path: '/actions/workflow', description: 'Start workflow' },
        { id: 'actions-preview', iconName: 'view', label: 'Preview', path: '/actions/preview', description: 'Preview content' },
        { id: 'actions-rendition', iconName: 'image', label: 'Create rendition', path: '/actions/rendition', description: 'Create rendition' },
        { id: 'actions-upload-rendition', iconName: 'add-alt', label: 'Upload rendition', path: '/actions/upload-rendition', description: 'Upload rendition' },
        { id: 'actions-delete', iconName: 'trash-can', label: 'Delete', path: '/actions/delete', description: 'Delete item' },
      ]
    },
    { 
      id: 'information', 
      iconName: 'information', 
      label: 'Information', 
      path: '/information', 
      description: 'View information',
      shortcut: '⌘I',
      children: [
        { id: 'info-details', iconName: 'document', label: 'Details', path: '/information/details', description: 'View details' },
        { id: 'info-metadata', iconName: 'data-table', label: 'Metadata', path: '/information/metadata', description: 'View metadata' },
        { id: 'info-history', iconName: 'time', label: 'History', path: '/information/history', description: 'View history' },
      ]
    },
    { 
      id: 'workflow', 
      iconName: 'workflow-automation', 
      label: 'Workflow', 
      path: '/workflow', 
      description: 'Workflow automation',
      shortcut: '⌘W',
      children: [
        { id: 'workflow-create', iconName: 'add', label: 'Create Workflow', path: '/workflow/create', description: 'Create new workflow' },
        { id: 'workflow-manage', iconName: 'list', label: 'Manage', path: '/workflow/manage', description: 'Manage workflows' },
        { id: 'workflow-history', iconName: 'time', label: 'History', path: '/workflow/history', description: 'Workflow history' },
      ]
    },
    { 
      id: 'ai', 
      iconName: 'ai-label', 
      label: 'AI', 
      path: '/ai', 
      description: 'AI assistance',
      shortcut: '⌘K',
      children: [
        { id: 'ai-analyze', iconName: 'chart-line', label: 'Analyze', path: '/ai/analyze', description: 'AI analysis' },
        { id: 'ai-suggest', iconName: 'idea', label: 'Suggestions', path: '/ai/suggest', description: 'AI suggestions' },
        { id: 'ai-automate', iconName: 'workflow-automation', label: 'Automate', path: '/ai/automate', description: 'AI automation' },
        { id: 'ai-insights', iconName: 'chart-bar', label: 'Insights', path: '/ai/insights', description: 'AI insights' },
      ]
    },
    { 
      id: 'preview', 
      iconName: 'view', 
      label: 'Preview', 
      path: '/preview', 
      description: 'Preview content',
      shortcut: '⌘P',
      children: [
        { id: 'preview-desktop', iconName: 'screen', label: 'Desktop View', path: '/preview/desktop', description: 'Preview on desktop' },
        { id: 'preview-mobile', iconName: 'mobile', label: 'Mobile View', path: '/preview/mobile', description: 'Preview on mobile' },
        { id: 'preview-print', iconName: 'print', label: 'Print Preview', path: '/preview/print', description: 'Preview for printing' },
        { id: 'preview-fullscreen', iconName: 'maximize', label: 'Full Screen', path: '/preview/fullscreen', description: 'Full screen preview' },
      ]
    },
    { 
      id: 'export', 
      iconName: 'download', 
      label: 'Export', 
      path: '/export', 
      description: 'Export content',
      children: [
        { id: 'export-pdf', iconName: 'document', label: 'PDF', path: '/export/pdf', description: 'Export as PDF' },
        { id: 'export-excel', iconName: 'chart-bar', label: 'Excel', path: '/export/excel', description: 'Export as Excel' },
        { id: 'export-csv', iconName: 'list', label: 'CSV', path: '/export/csv', description: 'Export as CSV' },
        { id: 'export-image', iconName: 'image', label: 'Image', path: '/export/image', description: 'Export as image' },
      ]
    },
    { 
      id: 'save', 
      iconName: 'save', 
      label: 'Save', 
      path: '/save', 
      description: 'Save changes',
      children: [
        { id: 'save-draft', iconName: 'document-blank', label: 'Save Draft', path: '/save/draft', description: 'Save as draft' },
        { id: 'save-publish', iconName: 'checkmark-filled', label: 'Save & Publish', path: '/save/publish', description: 'Save and publish' },
        { id: 'save-as', iconName: 'save', label: 'Save As', path: '/save/as', description: 'Save as new' },
        { id: 'save-version', iconName: 'version', label: 'Save Version', path: '/save/version', description: 'Save new version' },
      ]
    },
    { 
      id: 'tools', 
      iconName: 'tools', 
      label: 'Tools', 
      path: '/tools', 
      description: 'More tools',
      children: [
        { id: 'tools-compare', iconName: 'chart-line', label: 'Compare', path: '/tools/compare', description: 'Compare items' },
        { id: 'tools-merge', iconName: 'renew', label: 'Merge', path: '/tools/merge', description: 'Merge content' },
        { id: 'tools-validate', iconName: 'checkmark', label: 'Validate', path: '/tools/validate', description: 'Validate content' },
        { id: 'tools-analyze', iconName: 'analytics', label: 'Analyze', path: '/tools/analyze', description: 'Analyze data' },
      ]
    },
  ];

  const buildMenuItems = [
    { id: 'projects', iconName: 'folder', label: 'Projects', path: '/projects' },
    { id: 'planning', iconName: 'document-tasks', label: 'Planning', path: '/planning' },
    { id: 'building', iconName: 'home', label: 'Building', path: '/building' },
    { id: 'inspections', iconName: 'view', label: 'Inspections', path: '/inspections' },
    { id: 'compliance', iconName: 'checkmark-filled', label: 'Compliance', path: '/compliance' },
    { id: 'reports', iconName: 'chart-bar', label: 'Reports', path: '/reports' },
  ];

  const menuWithStates = [
    { id: 'active', iconName: 'checkmark-filled', label: 'Active Item', path: '/active' },
    { id: 'normal', iconName: 'document', label: 'Normal Item', path: '/normal' },
    { id: 'disabled', iconName: 'locked', label: 'Disabled Item', path: '/disabled', disabled: true },
    { id: 'alerts', iconName: 'notification', label: 'Alerts', path: '/alerts' },
    { id: 'warning', iconName: 'warning', label: 'Warning', path: '/warning' },
    { id: 'archive', iconName: 'archive', label: 'Archive', path: '/archive', disabled: true },
  ];

  const getCodeExample = (demo: string) => {
    const examples: Record<string, string> = {
      basic: `// Basic Navigation Rail
import NavigationRail from '@odl/navigation-rail';

const menuItems = [
  { 
    id: 'dashboard', 
    iconName: 'dashboard', 
    label: 'Dashboard', 
    path: '/dashboard',
    description: 'View your dashboard'
  },
  { 
    id: 'applications', 
    iconName: 'application', 
    label: 'Applications', 
    path: '/applications' 
  },
  { 
    id: 'documents', 
    iconName: 'document', 
    label: 'Documents', 
    path: '/documents' 
  },
];

<NavigationRail
  currentPath="/dashboard"
  menuItems={menuItems}
  onNavigate={(path) => console.log('Navigate to:', path)}
/>`,

      collapsed: `// Collapsible Navigation Rail
const [isCollapsed, setIsCollapsed] = useState(false);

<div style={{ display: 'flex' }}>
  <NavigationRail
    currentPath={currentPath}
    menuItems={menuItems}
    collapsed={isCollapsed}
    onNavigate={handleNavigate}
    showTooltips={true}
  />
  
  <button onClick={() => setIsCollapsed(!isCollapsed)}>
    {isCollapsed ? 'Expand' : 'Collapse'}
  </button>
</div>`,

      positions: `// Navigation Rail Positions
<NavigationRail
  currentPath={currentPath}
  menuItems={menuItems}
  position="left"  // or "right"
  onNavigate={handleNavigate}
/>

// Right-side navigation
<NavigationRail
  currentPath={currentPath}
  menuItems={menuItems}
  position="right"
  onNavigate={handleNavigate}
/>`,

      custom: `// Custom Themed Navigation Rail
<NavigationRail
  currentPath={currentPath}
  menuItems={buildMenuItems}
  collapsed={false}
  showTooltips={true}
  position="left"
  className="custom-navigation"
  onNavigate={handleNavigate}
/>

// Build-specific menu items
const buildMenuItems = [
  { id: 'projects', iconName: 'folder', label: 'Projects', path: '/projects' },
  { id: 'planning', iconName: 'document-tasks', label: 'Planning', path: '/planning' },
  { id: 'building', iconName: 'home', label: 'Building', path: '/building' },
  { id: 'inspections', iconName: 'view', label: 'Inspections', path: '/inspections' },
];`,

      states: `// Navigation with Different States
const menuItems = [
  { 
    id: 'active', 
    iconName: 'checkmark-filled', 
    label: 'Active Item', 
    path: '/active' 
  },
  { 
    id: 'disabled', 
    iconName: 'locked', 
    label: 'Disabled Item', 
    path: '/disabled', 
    disabled: true 
  },
];

<NavigationRail
  currentPath="/active"
  menuItems={menuItems}
  onNavigate={handleNavigate}
/>`,

      integration: `// Full Integration Example
const App = () => {
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Navigation Rail */}
      <div style={{ 
        width: isCollapsed ? ODLTheme.spacing[16] : '240px',
        transition: 'width 0.3s ease',
        borderRight: ODLTheme.borders.width.thin + ' solid ' + ODLTheme.colors.border
      }}>
        <NavigationRail
          currentPath={currentPath}
          menuItems={menuItems}
          collapsed={isCollapsed}
          onNavigate={setCurrentPath}
          showTooltips={isCollapsed}
        />
      </div>
      
      {/* Main Content */}
      <div style={{ flex: 1, padding: ODLTheme.spacing[6] }}>
        <button onClick={() => setIsCollapsed(!isCollapsed)}>
          Toggle Navigation
        </button>
        <h1>Current Page: {currentPath}</h1>
      </div>
    </div>
  );
};`
    };

    return examples[demo] || '';
  };

  return (
    <div className={styles.tableDemo}>
      {/* Breadcrumb Navigation */}
      <DemoBreadcrumb componentName="Navigation Rail Component" />
      
      {/* Enhanced Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>Navigation Rail Component Showcase</h1>
            <p>Vertical navigation sidebar with icons, labels, and collapsible states for application navigation</p>
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
            { key: 'basic', label: 'Basic', icon: '🧭' },
            { key: 'collapsed', label: 'Collapsible', icon: '↔️' },
            { key: 'themes', label: 'Themes', icon: '🎨' },
            { key: 'custom', label: 'Custom', icon: '⚙️' },
            { key: 'states', label: 'States', icon: '🚦' },
            { key: 'integration', label: 'Integration', icon: '🔧' }
          ].map(demo => (
            <button
              key={demo.key}
              className={`${styles.demoTab} ${selectedDemo === demo.key ? styles.active : ''}`}
              onClick={() => setSelectedDemo(demo.key as any)}
            >
              <span className={styles.demoIcon}>{demo.icon}</span>
              <div className={styles.demoTabContent}>
                <span className={styles.demoLabel}>{demo.label}</span>
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
              <h2>Basic Navigation Rail</h2>
              <p>Dual navigation rails - primary navigation on the left and contextual tools on the right</p>
            </div>
            <div style={{ background: 'white', borderRadius: `0 0 ${ODLTheme.spacing[3]} ${ODLTheme.spacing[3]}`, height: '1080px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', height: '100%' }}>
                {/* Left Navigation Rail - Primary Navigation */}
                <div style={{ 
                  width: isCollapsed ? '56px' : '240px', // NavigationRail component widths 
                  transition: 'width 0.3s ease',
                  borderRight: `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.border}`,
                  background: ODLTheme.colors.background
                }}>
                  <NavigationRail
                    currentPath={currentPath}
                    menuItems={defaultMenuItems}
                    collapsed={isCollapsed}
                    position="left"
                    onNavigate={setCurrentPath}
                    showTooltips={isCollapsed}
                    showCollapseToggle={true}
                    onCollapseToggle={setIsCollapsed}
                    showHelpIcon={true}
                    onHelpClick={() => alert('Help clicked!')}
                  />
                </div>
                
                {/* Main Content Area */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Header */}
                  <div style={{ 
                    height: '60px', // 60px for demo header - component specification 
                    borderBottom: `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 1.5rem',
                    background: 'white'
                  }}>
                    <h2 style={{ fontSize: ODLTheme.typography.fontSize.xl, fontWeight: 600 }}>
                      {defaultMenuItems.find(item => item.path === currentPath)?.label || 'Dashboard'}
                    </h2>
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1, padding: '1.5rem 1.5rem 1.5rem 0', overflow: 'auto' }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto', paddingLeft: ODLTheme.spacing[6] }}>
                      <h3 style={{ marginBottom: ODLTheme.spacing[6], fontSize: ODLTheme.typography.fontSize.xl, fontWeight: 600, color: ODLTheme.colors.text.primary }}>
                        How to Use Navigation Rails
                      </h3>
                      
                      {/* Instructions */}
                      <div style={{ display: 'grid', gap: ODLTheme.spacing[6], marginBottom: ODLTheme.spacing[8] }}>
                        {/* Left Navigation Instructions */}
                        <div style={{ 
                          padding: ODLTheme.spacing[5], 
                          background: `${ODLTheme.colors.primary}10`, 
                          borderLeft: `${ODLTheme.borders.width.thick} solid ${ODLTheme.colors.primary}`,
                          borderRadius: ODLTheme.spacing[2]
                        }}>
                          <h4 style={{ fontSize: ODLTheme.typography.fontSize.lg, fontWeight: 600, marginBottom: ODLTheme.spacing[3], color: ODLTheme.colors.primary }}>
                            📍 Left Navigation Rail (Primary)
                          </h4>
                          <ol style={{ marginLeft: ODLTheme.spacing[5], color: ODLTheme.colors.text.secondary, lineHeight: 1.8 }}>
                            <li><strong>Click any menu item</strong> to navigate between main sections</li>
                            <li><strong>Click the chevron (˅)</strong> at the bottom to collapse/expand the rail</li>
                            <li><strong>Hover over icons</strong> when collapsed to see tooltips</li>
                            <li><strong>Look for the blue bar</strong> on the left to see which page is active</li>
                          </ol>
                        </div>

                        {/* Right Navigation Instructions */}
                        <div style={{ 
                          padding: ODLTheme.spacing[5], 
                          background: `${ODLTheme.colors.secondary}10`, 
                          borderLeft: `${ODLTheme.borders.width.thick} solid ${ODLTheme.colors.secondary}`,
                          borderRadius: ODLTheme.spacing[2]
                        }}>
                          <h4 style={{ fontSize: ODLTheme.typography.fontSize.lg, fontWeight: 600, marginBottom: ODLTheme.spacing[3], color: ODLTheme.colors.secondary }}>
                            🛠️ Right Navigation Rail (Tools)
                          </h4>
                          <ol style={{ marginLeft: ODLTheme.spacing[5], color: ODLTheme.colors.text.secondary, lineHeight: 1.8 }}>
                            <li><strong>Click Actions or Information</strong> to expand and see sub-options</li>
                            <li><strong>Click child items</strong> (Text, Style, Layout) for specific tools</li>
                            <li><strong>Click the chevron (˅)</strong> to collapse for more workspace</li>
                            <li><strong>Use Share, Export, or Archive</strong> for document actions</li>
                          </ol>
                        </div>
                      </div>

                      {/* Current State */}
                      <div style={{ 
                        padding: '1.25rem', 
                        background: ODLTheme.colors.background, 
                        border: `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.border}`,
                        borderRadius: ODLTheme.borders.radius.md
                      }}>
                        <h4 style={{ fontWeight: 600, marginBottom: ODLTheme.spacing[4], color: ODLTheme.colors.text.primary, fontSize: ODLTheme.typography.fontSize.base }}>
                          🔍 Current State
                        </h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div style={{ 
                            padding: '0.75rem', 
                            background: 'white', 
                            borderRadius: ODLTheme.borders.radius.base,
                            border: `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.border}`
                          }}>
                            <p style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.tertiary, marginBottom: ODLTheme.spacing[1] }}>Left Navigation</p>
                            <p style={{ fontSize: ODLTheme.typography.fontSize.base, fontWeight: 600, color: ODLTheme.colors.primary }}>
                              {defaultMenuItems.find(item => item.path === currentPath)?.label || 'None'}
                            </p>
                            <p style={{ fontSize: ODLTheme.typography.fontSize.xs, color: ODLTheme.colors.text.tertiary, marginTop: ODLTheme.spacing[1] }}>
                              {isCollapsed ? '🟢 Collapsed' : '🔵 Expanded'}
                            </p>
                          </div>
                          <div style={{ 
                            padding: '0.75rem', 
                            background: 'white', 
                            borderRadius: ODLTheme.borders.radius.base,
                            border: `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.border}`
                          }}>
                            <p style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.tertiary, marginBottom: ODLTheme.spacing[1] }}>Right Tools</p>
                            <p style={{ fontSize: ODLTheme.typography.fontSize.base, fontWeight: 600, color: ODLTheme.colors.secondary }}>
                              {contextualMenuItems.find(item => item.path === rightPath)?.label || 'None'}
                            </p>
                            <p style={{ fontSize: ODLTheme.typography.fontSize.xs, color: ODLTheme.colors.text.tertiary, marginTop: ODLTheme.spacing[1] }}>
                              {isRightCollapsed ? '🟢 Collapsed' : '🔵 Expanded'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Tips */}
                      <div style={{ 
                        marginTop: '1.5rem',
                        padding: '1rem', 
                        background: `${ODLTheme.colors.warning}20`, 
                        borderRadius: ODLTheme.borders.radius.md,
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'flex-start'
                      }}>
                        <span style={{ fontSize: '1.25rem' }}>💡</span>
                        <div>
                          <p style={{ fontSize: ODLTheme.typography.fontSize.sm, fontWeight: 600, color: ODLTheme.colors.warning, marginBottom: ODLTheme.spacing[1] }}>
                            Pro Tip
                          </p>
                          <p style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.warning }}>
                            Collapse both rails to maximize your workspace. The icons remain clickable and show helpful tooltips on hover!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Navigation Rail - Contextual Tools */}
                <div style={{ 
                  width: isRightCollapsed ? ODLTheme.spacing[16] : '240px', 
                  transition: 'width 0.3s ease',
                  borderLeft: `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.border}`,
                  background: ODLTheme.colors.background
                }}>
                  <NavigationRail
                    currentPath={rightPath}
                    menuItems={contextualMenuItems}
                    collapsed={isRightCollapsed}
                    position="right"
                    onNavigate={setRightPath}
                    showTooltips={isRightCollapsed}
                    showCollapseToggle={true}
                    onCollapseToggle={setIsRightCollapsed}
                    showHelpIcon={false}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'collapsed' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Collapsible Navigation Rail</h2>
              <p>Toggle between expanded and collapsed states</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: `0 0 ${ODLTheme.borders.radius.lg} ${ODLTheme.borders.radius.lg}`, minHeight: '400px' }}>
              <div style={{ marginBottom: '1rem' }}>
                <Button onClick={() => setIsCollapsed(!isCollapsed)}>
                  {isCollapsed ? 'Expand Navigation' : 'Collapse Navigation'}
                </Button>
                <span style={{ marginLeft: ODLTheme.spacing[4], color: ODLTheme.colors.text.tertiary }}>
                  State: {isCollapsed ? 'Collapsed (Icons Only)' : 'Expanded (Icons + Labels)'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '2rem', height: '400px' }}>
                <div style={{ 
                  borderRight: `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.border}` 
                }}>
                  <NavigationRail
                    currentPath={currentPath}
                    menuItems={defaultMenuItems}
                    collapsed={isCollapsed}
                    onNavigate={setCurrentPath}
                    showTooltips={isCollapsed}
                    showHelpIcon={true}
                    showCollapseToggle={true}
                    onCollapseToggle={setIsCollapsed}
                    onHelpClick={() => alert('Help & Support')}
                  />
                </div>
                <div style={{ flex: 1, padding: '1rem' }}>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Collapsible Features</h3>
                  <div style={{ padding: ODLTheme.spacing[4], background: ODLTheme.colors.surface, borderRadius: ODLTheme.spacing[2] }}>
                    <p>When collapsed:</p>
                    <ul style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
                      <li>• Shows only icons</li>
                      <li>• Tooltips appear on hover</li>
                      <li>• Maintains active state</li>
                      <li>• Smooth width transition</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'themes' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Theme Variants</h2>
              <p>Light and dark themes matching the ODL design system</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: `0 0 ${ODLTheme.borders.radius.lg} ${ODLTheme.borders.radius.lg}`, minHeight: '500px' }}>
              <div style={{ marginBottom: '1rem' }}>
                <Button 
                  variant={theme === 'light' ? 'primary' : 'secondary'}
                  onClick={() => setTheme('light')}
                >
                  Light Theme
                </Button>
                <Button 
                  variant={theme === 'dark' ? 'primary' : 'secondary'}
                  onClick={() => setTheme('dark')}
                  style={{ marginLeft: '0.5rem' }}
                >
                  Dark Theme
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  style={{ marginLeft: '1rem' }}
                >
                  {isCollapsed ? 'Expand' : 'Collapse'}
                </Button>
              </div>
              
              <div style={{ display: 'flex', gap: '2rem' }}>
                {/* Light Theme Demo */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>Light Theme</h3>
                  <div style={{ display: 'flex', height: '400px', border: `1px solid ${ODLTheme.colors.border}`, borderRadius: ODLTheme.spacing[2], overflow: 'hidden' }}>
                    <NavigationRail
                      currentPath="/documents"
                      menuItems={defaultMenuItems}
                      collapsed={isCollapsed}
                      theme="light"
                      showHelpIcon={true}
                      showCollapseToggle={true}
                      onCollapseToggle={setIsCollapsed}
                      onNavigate={setCurrentPath}
                      onHelpClick={() => console.log('Help clicked')}
                    />
                    <div style={{ flex: 1, padding: ODLTheme.spacing[4], background: ODLTheme.colors.background }}>
                      <p style={{ color: ODLTheme.colors.text.secondary, fontSize: ODLTheme.typography.fontSize.base }}>Light theme content area</p>
                    </div>
                  </div>
                </div>
                
                {/* Dark Theme Demo */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 600 }}>Dark Theme (Matching Design)</h3>
                  <div style={{ display: 'flex', height: '400px', border: `1px solid ${ODLTheme.colors.border}`, borderRadius: ODLTheme.spacing[2], overflow: 'hidden', background: ODLTheme.colors.text.primary }}>
                    <NavigationRail
                      currentPath="/documents"
                      menuItems={defaultMenuItems}
                      collapsed={isCollapsed}
                      theme="dark"
                      showHelpIcon={true}
                      showCollapseToggle={true}
                      onCollapseToggle={setIsCollapsed}
                      onNavigate={setCurrentPath}
                      onHelpClick={() => console.log('Help clicked')}
                    />
                    <div style={{ flex: 1, padding: '1rem' }}>
                      <p style={{ color: ODLTheme.colors.text.inverse, fontSize: ODLTheme.typography.fontSize.base }}>Dark theme content area</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'custom' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Product-Specific Navigation</h2>
              <p>Customized navigation for different ODL products</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: `0 0 ${ODLTheme.borders.radius.lg} ${ODLTheme.borders.radius.lg}`, minHeight: '400px' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Build Product Navigation</h3>
                <div style={{ display: 'flex', gap: '2rem', height: '350px' }}>
                  <div style={{ width: '240px', borderRight: `1px solid ${ODLTheme.colors.border}`, background: ODLTheme.colors.surface }}>
                    <NavigationRail
                      currentPath="/projects"
                      menuItems={buildMenuItems}
                      showCollapseToggle={true}
                      collapsed={isCollapsed}
                      onCollapseToggle={setIsCollapsed}
                      onNavigate={setCurrentPath}
                    />
                  </div>
                  <div style={{ flex: 1, padding: '1rem' }}>
                    <p style={{ color: ODLTheme.colors.text.tertiary }}>
                      Custom menu items specific to Build product workflow
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'states' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Navigation Item States</h2>
              <p>Different states for navigation items</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: `0 0 ${ODLTheme.borders.radius.lg} ${ODLTheme.borders.radius.lg}`, minHeight: '400px' }}>
              <div style={{ display: 'flex', gap: '2rem', height: '400px' }}>
                <div style={{ width: '240px', borderRight: `1px solid ${ODLTheme.colors.border}` }}>
                  <NavigationRail
                    currentPath="/active"
                    menuItems={menuWithStates}
                    onNavigate={setCurrentPath}
                  />
                </div>
                <div style={{ flex: 1, padding: '1rem' }}>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Item States</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ padding: ODLTheme.spacing[4], background: `${ODLTheme.colors.primary}10`, borderRadius: ODLTheme.spacing[2] }}>
                      <strong>Active State:</strong> Blue background with left border indicator
                    </div>
                    <div style={{ padding: ODLTheme.spacing[4], background: ODLTheme.colors.surface, borderRadius: ODLTheme.spacing[2] }}>
                      <strong>Normal State:</strong> Default appearance, clickable
                    </div>
                    <div style={{ padding: ODLTheme.spacing[4], background: ODLTheme.colors.background, borderRadius: ODLTheme.spacing[2], opacity: 0.6 }}>
                      <strong>Disabled State:</strong> Reduced opacity, not clickable
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'integration' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Full Page Integration</h2>
              <p>Complete layout example with dual navigation rails (left and right)</p>
            </div>
            <div style={{ background: 'white', borderRadius: `0 0 ${ODLTheme.borders.radius.lg} ${ODLTheme.borders.radius.lg}`, height: '500px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', height: '100%' }}>
                {/* Left Navigation Rail - Primary Navigation */}
                <div style={{ 
                  width: isCollapsed ? ODLTheme.spacing[16] : '240px', // TODO: These are NavigationRail component widths 
                  transition: 'width 0.3s ease',
                  borderRight: `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.border}`,
                  background: ODLTheme.colors.background
                }}>
                  <NavigationRail
                    currentPath={currentPath}
                    menuItems={defaultMenuItems}
                    collapsed={isCollapsed}
                    position="left"
                    onNavigate={setCurrentPath}
                    showTooltips={isCollapsed}
                    showCollapseToggle={true}
                    onCollapseToggle={setIsCollapsed}
                    showHelpIcon={true}
                    onHelpClick={() => alert('Help clicked!')}
                  />
                </div>
                
                {/* Main Content Area */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Header */}
                  <div style={{ 
                    height: '60px', // 60px for demo header - component specification 
                    borderBottom: `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 1.5rem',
                    background: 'white'
                  }}>
                    <Button 
                      size="small"
                      variant="secondary"
                      onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                      <Icon name="menu" size={16} />
                      {!isCollapsed && 'Toggle'}
                    </Button>
                    <h2 style={{ marginLeft: '1rem', fontSize: '1.25rem', fontWeight: 600 }}>
                      {defaultMenuItems.find(item => item.path === currentPath)?.label || 'Page'}
                    </h2>
                  </div>
                  {/* Content */}
                  <div style={{ flex: 1, padding: '1.5rem', overflow: 'auto' }}>
                    <div style={{ maxWidth: '800px' }}>
                      <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 600 }}>
                        Welcome to {defaultMenuItems.find(item => item.path === currentPath)?.label}
                      </h3>
                      <p style={{ marginBottom: ODLTheme.spacing[4], color: ODLTheme.colors.text.tertiary, lineHeight: 1.6 }}>
                        This is a full page integration example showing dual navigation rails - primary navigation on the left and contextual tools on the right.
                        Both rails can be collapsed to save space while maintaining functionality through tooltips.
                      </p>
                      <div style={{ 
                        padding: '1rem', 
                        background: ODLTheme.colors.surface, 
                        borderRadius: ODLTheme.borders.radius.md,
                        marginTop: '1rem'
                      }}>
                        <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Current State:</p>
                        <ul style={{ marginLeft: ODLTheme.spacing[6], color: ODLTheme.colors.text.secondary }}>
                          <li>Left Navigation: <code style={{ background: ODLTheme.colors.surface, padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`, borderRadius: ODLTheme.spacing[1] }}>{currentPath}</code> - {isCollapsed ? 'Collapsed (64px)' : 'Expanded (240px)'}</li>
                          <li>Right Tools: <code style={{ background: ODLTheme.colors.surface, padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`, borderRadius: ODLTheme.spacing[1] }}>{rightPath}</code> - {isRightCollapsed ? 'Collapsed (64px)' : 'Expanded (240px)'}</li>
                          <li>Total Width Used: {(isCollapsed ? 64 : 240) + (isRightCollapsed ? 64 : 240)}px</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Right Navigation Rail - Contextual Tools */}
                <div style={{ 
                  width: isRightCollapsed ? ODLTheme.spacing[16] : '240px', 
                  transition: 'width 0.3s ease',
                  borderLeft: `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.border}`,
                  background: ODLTheme.colors.background
                }}>
                  <NavigationRail
                    currentPath={rightPath}
                    menuItems={contextualMenuItems}
                    collapsed={isRightCollapsed}
                    position="right"
                    onNavigate={setRightPath}
                    showTooltips={isRightCollapsed}
                    showCollapseToggle={true}
                    onCollapseToggle={setIsRightCollapsed}
                    showHelpIcon={false}
                  />
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
          <h3>Navigation Rail Features</h3>
          <p>Everything you need for application navigation</p>
        </div>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCategory}>
            <h4>🎨 Core Features</h4>
            <ul>
              <li>✓ Vertical navigation layout</li>
              <li>✓ Icon and label display</li>
              <li>✓ Active state indication</li>
              <li>✓ Smooth transitions</li>
              <li>✓ Flexible positioning</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>↔️ Collapsible</h4>
            <ul>
              <li>✓ Expand/collapse states</li>
              <li>✓ Icon-only mode</li>
              <li>✓ Tooltip on hover</li>
              <li>✓ Width animation</li>
              <li>✓ State persistence</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>🎯 Customization</h4>
            <ul>
              <li>✓ Custom menu items</li>
              <li>✓ Icon selection</li>
              <li>✓ Position options</li>
              <li>✓ Theme variants</li>
              <li>✓ Disabled states</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>🚀 Performance</h4>
            <ul>
              <li>✓ Lightweight component</li>
              <li>✓ Smooth animations</li>
              <li>✓ Efficient rendering</li>
              <li>✓ Lazy icon loading</li>
              <li>✓ Optimized transitions</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>👍 Accessibility</h4>
            <ul>
              <li>✓ Keyboard navigation</li>
              <li>✓ ARIA attributes</li>
              <li>✓ Focus indicators</li>
              <li>✓ Screen reader support</li>
              <li>✓ Tooltips for context</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>💡 Use Cases</h4>
            <ul>
              <li>✓ Application navigation</li>
              <li>✓ Dashboard sidebars</li>
              <li>✓ Admin panels</li>
              <li>✓ Product menus</li>
              <li>✓ Settings navigation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <BackToTop />
    </div>
  );
};

export default NavigationRailDemo;