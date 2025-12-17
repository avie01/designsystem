import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
// import Cards from '../components/Cards/Cards';
import Chip from '../components/Chip/Chip';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import Button from '../components/Button/Button';
import Icon from '../components/Icon/Icon';
import Header from '../components/Header/Header';
import NavigationRail from '../components/NavigationRail/NavigationRail';
import ODLTheme from '../styles/ODLTheme';
import styles from './TableDemo.module.css';

// Import MUI templates from PageTemplates
import {
  BasicPageTemplate,
  DashboardTemplate,
  TableListTemplate,
  TwoColumnTemplate,
  FormPageTemplate,
  CardsGridTemplate
} from '../templates/PageTemplates';

const TemplatesDemo: React.FC = () => {
  const [showCode, setShowCode] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('basic');

  const getCodeExample = () => {
    return `// Basic Page Template with Navigation Rails
import React, { useState } from 'react';
import NavigationRail from '../components/NavigationRail/NavigationRail';
import Header from '../components/Header/Header';

const MyPage: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(true);
  
  const leftMenuItems = [
    { id: 'dashboard', iconName: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { id: 'applications', iconName: 'document-tasks', label: 'Applications', path: '/applications' },
    { id: 'tasks', iconName: 'calendar', label: 'Tasks', path: '/tasks' },
    { id: 'reports', iconName: 'chart-line', label: 'Reports', path: '/reports' },
    { id: 'settings', iconName: 'settings', label: 'Settings', path: '/settings' },
  ];
  
  const rightMenuItems = [
    { id: 'notifications', iconName: 'notification', label: 'Notifications', path: '/notifications' },
    { id: 'profile', iconName: 'user', label: 'Profile', path: '/profile' },
    { id: 'search', iconName: 'search', label: 'Search', path: '/search' },
  ];
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Header */}
      <Header variant="build" userName="John Doe" />
      
      {/* Main Layout */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left Navigation Rail */}
        <NavigationRail
          currentPath={currentPath}
          onNavigate={setCurrentPath}
          menuItems={leftMenuItems}
          collapsed={isLeftCollapsed}
          position="left"
          theme="light"
          showHelpIcon={true}
          showCollapseToggle={true}
          onCollapseToggle={setIsLeftCollapsed}
        />
        
        {/* Main Content with Content Border */}
        <div style={{ flex: 1, padding: '24px' }}>
          <div style={{ 
            background: '#EDF1F5',
            borderRadius: '16px',
            padding: '24px',
            minHeight: '100%'
          }}>
            <div style={{ 
              background: 'white',
              borderRadius: '8px',
              padding: '24px'
            }}>
              <h1>Page Title</h1>
              <p>Your content goes here...</p>
            </div>
          </div>
        </div>
        
        {/* Right Navigation Rail */}
        <NavigationRail
          currentPath={currentPath}
          onNavigate={setCurrentPath}
          menuItems={rightMenuItems}
          collapsed={isRightCollapsed}
          position="right"
          theme="light"
          showCollapseToggle={true}
          onCollapseToggle={setIsRightCollapsed}
        />
      </div>
    </div>
  );
};

export default MyPage;`;
  };

  // Template preview components with realistic header and navigation
  const BasicTemplate = () => {
    const [currentPath, setCurrentPath] = useState('/dashboard');
    const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
    const [isRightCollapsed, setIsRightCollapsed] = useState(true);
    
    // Left navigation menu items
    const leftMenuItems = [
      { id: 'dashboard', iconName: 'dashboard', label: 'Dashboard', path: '/dashboard', description: 'View your dashboard' },
      { id: 'applications', iconName: 'document-tasks', label: 'Applications', path: '/applications', description: 'Manage applications' },
      { id: 'tasks', iconName: 'calendar', label: 'Tasks', path: '/tasks', description: 'View tasks' },
      { id: 'reports', iconName: 'chart-line', label: 'Reports', path: '/reports', description: 'View reports' },
      { id: 'teams', iconName: 'user-multiple', label: 'Teams', path: '/teams', description: 'Manage teams' },
      { id: 'settings', iconName: 'settings', label: 'Settings', path: '/settings', description: 'System settings' },
    ];
    
    // Right navigation menu items - contextual tools
    const rightMenuItems = [
      { id: 'notifications', iconName: 'notification', label: 'Notifications', path: '/notifications', description: 'View notifications' },
      { id: 'profile', iconName: 'user', label: 'Profile', path: '/profile', description: 'Your profile' },
      { id: 'search', iconName: 'search', label: 'Search', path: '/search', description: 'Search content' },
      { id: 'filters', iconName: 'filter', label: 'Filters', path: '/filters', description: 'Apply filters' },
    ];
    
    return (
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        height: '1080px',
        background: ODLTheme.colors.white,
        position: 'relative'
      }}>
        {/* Header */}
        <Header variant="build" userName="John Doe" />

        {/* Main Layout */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Left Navigation Rail - Using ODL NavigationRail Component */}
          <div style={{ 
            height: '100%', 
            borderRight: `1px solid ${ODLTheme.colors.border}` 
          }}>
            <NavigationRail
              currentPath={currentPath}
              onNavigate={setCurrentPath}
              menuItems={leftMenuItems}
              collapsed={isLeftCollapsed}
              position="left"
              theme="light"
              showHelpIcon={true}
              showCollapseToggle={true}
              onCollapseToggle={setIsLeftCollapsed}
              showTooltips={true}
            />
          </div>

          {/* Main Content Area with Content Border */}
          <div style={{ 
            flex: 1, 
            overflow: 'auto', 
            overflowY: 'auto',
            padding: ODLTheme.spacing[6], 
            background: ODLTheme.colors.white 
          }}>
            <Breadcrumb 
              items={[
                { label: 'Home', path: '/' },
                { label: 'Templates', path: '/templates' },
                { label: 'Page Templates' }
              ]}
              onNavigate={(path) => console.log('Navigate to:', path)}
            />
            <h1 style={{
              fontSize: ODLTheme.typography.fontSize['2xl'],
              fontWeight: ODLTheme.typography.fontWeight.semibold,
              color: ODLTheme.colors.text.primary, 
              margin: `${ODLTheme.spacing[4]} 0 ${ODLTheme.spacing[2]} 0` 
            }}>
              Page Title
            </h1>
            <p style={{ 
              fontSize: ODLTheme.typography.fontSize.base, 
              color: ODLTheme.colors.text.secondary, 
              margin: `0 0 ${ODLTheme.spacing[6]} 0` 
            }}>
              Page subtitle or description goes here
            </p>
            <div style={{ 
              background: '#EDF1F5',
              borderRadius: ODLTheme.spacing[4],
              padding: `${ODLTheme.spacing[6]} ${ODLTheme.spacing[6]}`,
              minHeight: 'fit-content',
              height: 'fit-content'
            }}>
              <div style={{ 
                background: ODLTheme.colors.white,
                borderRadius: ODLTheme.spacing[2],
                padding: ODLTheme.spacing[6]
              }}>
                {/* Enhanced Dashboard Cards */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: ODLTheme.spacing[6],
                  marginBottom: ODLTheme.spacing[6]
                }}>
                  {/* Recent Activity Card */}
                  <div style={{
                    background: ODLTheme.colors.white,
                    border: `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.border}`,
                    borderRadius: ODLTheme.borders.radius.lg,
                    padding: ODLTheme.spacing[6],
                    boxShadow: ODLTheme.shadows.sm,
                    transition: ODLTheme.transitions.base,
                    cursor: 'pointer',
                    minHeight: '180px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = ODLTheme.shadows.md;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = ODLTheme.shadows.sm;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  >
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: ODLTheme.spacing[3]
                      }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          background: ODLTheme.colors.primaryLight,
                          borderRadius: ODLTheme.borders.radius.md,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: ODLTheme.spacing[3]
                        }}>
                          <Icon name="notification" size={20} style={{ color: ODLTheme.colors.primary }} />
                        </div>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: ODLTheme.spacing[2]
                        }}>
                          <h3 style={{
                            fontSize: ODLTheme.typography.fontSize.lg,
                            fontWeight: ODLTheme.typography.fontWeight.semibold,
                            color: ODLTheme.colors.text.primary,
                            margin: 0
                          }}>
                            Recent Activity
                          </h3>
                          <Chip label="New" variant="lightGreen" size="sm" style={{ alignSelf: 'flex-start' }} />
                        </div>
                      </div>
                      <p style={{
                        fontSize: ODLTheme.typography.fontSize.base,
                        color: ODLTheme.colors.text.secondary,
                        margin: 0,
                        lineHeight: ODLTheme.typography.lineHeight.normal
                      }}>
                        Stay updated with your latest applications, approvals, and system notifications
                      </p>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: ODLTheme.spacing[4],
                      paddingTop: ODLTheme.spacing[4],
                      borderTop: `1px solid ${ODLTheme.colors.surface}`
                    }}>
                      <span style={{
                        fontSize: ODLTheme.typography.fontSize.sm,
                        color: ODLTheme.colors.text.tertiary
                      }}>
                        3 new items
                      </span>
                      <Icon name="arrow-right" size={16} style={{ color: ODLTheme.colors.primary }} />
                    </div>
                  </div>

                  {/* Quick Actions Card */}
                  <div style={{
                    background: ODLTheme.colors.white,
                    border: `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.border}`,
                    borderRadius: ODLTheme.borders.radius.lg,
                    padding: ODLTheme.spacing[6],
                    boxShadow: ODLTheme.shadows.sm,
                    transition: ODLTheme.transitions.base,
                    cursor: 'pointer',
                    minHeight: '180px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = ODLTheme.shadows.md;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = ODLTheme.shadows.sm;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  >
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: ODLTheme.spacing[3]
                      }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          background: ODLTheme.colors.infoLight,
                          borderRadius: ODLTheme.borders.radius.md,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: ODLTheme.spacing[3]
                        }}>
                          <Icon name="lightning" size={20} style={{ color: ODLTheme.colors.info }} />
                        </div>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: ODLTheme.spacing[2]
                        }}>
                          <h3 style={{
                            fontSize: ODLTheme.typography.fontSize.lg,
                            fontWeight: ODLTheme.typography.fontWeight.semibold,
                            color: ODLTheme.colors.text.primary,
                            margin: 0
                          }}>
                            Quick Actions
                          </h3>
                          <Chip label="Tools" variant="blue" size="sm" style={{ alignSelf: 'flex-start' }} />
                        </div>
                      </div>
                      <p style={{
                        fontSize: ODLTheme.typography.fontSize.base,
                        color: ODLTheme.colors.text.secondary,
                        margin: 0,
                        lineHeight: ODLTheme.typography.lineHeight.normal
                      }}>
                        Access frequently used tools and shortcuts to streamline your workflow
                      </p>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: ODLTheme.spacing[4],
                      paddingTop: ODLTheme.spacing[4],
                      borderTop: `1px solid ${ODLTheme.colors.surface}`
                    }}>
                      <span style={{
                        fontSize: ODLTheme.typography.fontSize.sm,
                        color: ODLTheme.colors.text.tertiary
                      }}>
                        5 shortcuts
                      </span>
                      <Icon name="arrow-right" size={16} style={{ color: ODLTheme.colors.primary }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Navigation Rail - Using ODL NavigationRail Component */}
          <div style={{ 
            height: '100%', 
            borderLeft: `1px solid ${ODLTheme.colors.border}` 
          }}>
            <NavigationRail
              currentPath={currentPath}
              onNavigate={setCurrentPath}
              menuItems={rightMenuItems}
              collapsed={isRightCollapsed}
              position="right"
              theme="light"
              showCollapseToggle={true}
              onCollapseToggle={setIsRightCollapsed}
              showTooltips={true}
            />
          </div>
        </div>
      </div>
    );
  };








  return (
    <div className={styles.tableDemo}>
      {/* Breadcrumb Navigation */}
      <DemoBreadcrumb componentName="Page Templates" />
      
      {/* Enhanced Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>Page Templates Showcase</h1>
            <p>Ready-to-use wireframe templates with content borders for rapid page development</p>
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


      {/* Template Preview Section */}
      <div className={styles.tableSection}>
        <div className={styles.sectionHeader}>
          <h2>Basic Page Template</h2>
          <p>Standard layout with left and right navigation rails, content border wrapper in the center</p>
        </div>
        <div style={{ 
          padding: '2rem', 
          background: 'white', 
          borderRadius: '0 0 12px 12px',
          overflow: 'auto',
          height: '1120px'
        }}>
          <BasicTemplate />
        </div>
      </div>

      {/* Code Example */}
      {showCode && (
        <div className={styles.codePanel}>
          <h3>Code Example</h3>
          <pre className={styles.codeBlock}>
            <code>{getCodeExample()}</code>
          </pre>
        </div>
      )}

      {/* Features Showcase */}
      <div className={styles.featuresShowcase}>
        <div className={styles.sectionHeader}>
          <h3>Basic Template Features</h3>
          <p>Essential layout structure with navigation rails and content wrapper</p>
        </div>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCategory}>
            <h4>🎨 Layout Structure</h4>
            <ul>
              <li>✓ Header with Build branding</li>
              <li>✓ Left navigation rail</li>
              <li>✓ Right navigation rail</li>
              <li>✓ Content border wrapper pattern</li>
              <li>✓ Grey outer frame (#EDF1F5)</li>
              <li>✓ White inner container</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>🧭 Navigation Features</h4>
            <ul>
              <li>✓ Collapsible navigation rails</li>
              <li>✓ Icon-based menu items</li>
              <li>✓ Tooltips on hover</li>
              <li>✓ Help icon integration</li>
              <li>✓ Toggle collapse buttons</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>📱 Responsive Design</h4>
            <ul>
              <li>✓ Flexible layout system</li>
              <li>✓ Collapsible sidebars</li>
              <li>✓ Mobile-friendly spacing</li>
              <li>✓ Adaptive breakpoints</li>
              <li>✓ Consistent 24px padding</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>🚀 Quick Start</h4>
            <ul>
              <li>✓ Copy template code</li>
              <li>✓ Customize menu items</li>
              <li>✓ Replace placeholder content</li>
              <li>✓ Keep wrapper structure</li>
              <li>✓ Ready to use</li>
            </ul>
          </div>
        </div>
      </div>

      {/* MUI Templates Section */}
      <div className={styles.tableSection} style={{ marginTop: '3rem' }}>
        <div className={styles.sectionHeader}>
          <h2>MUI Template Showcase</h2>
          <p>Page templates built with Material-UI components and ODL theming</p>
        </div>

        {/* Template Selector */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          <Button
            variant={selectedTemplate === 'basic' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setSelectedTemplate('basic')}
          >
            Basic Page
          </Button>
          <Button
            variant={selectedTemplate === 'dashboard' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setSelectedTemplate('dashboard')}
          >
            Dashboard
          </Button>
          <Button
            variant={selectedTemplate === 'table' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setSelectedTemplate('table')}
          >
            Table List
          </Button>
          <Button
            variant={selectedTemplate === 'twoColumn' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setSelectedTemplate('twoColumn')}
          >
            Two Column
          </Button>
          <Button
            variant={selectedTemplate === 'form' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setSelectedTemplate('form')}
          >
            Form Page
          </Button>
          <Button
            variant={selectedTemplate === 'cards' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setSelectedTemplate('cards')}
          >
            Cards Grid
          </Button>
        </div>

        {/* Template Display Area */}
        <div style={{
          padding: '2rem',
          background: 'white',
          borderRadius: '12px',
          border: `1px solid ${ODLTheme.colors.border}`,
          minHeight: '600px'
        }}>
          {selectedTemplate === 'basic' && <BasicPageTemplate />}
          {selectedTemplate === 'dashboard' && <DashboardTemplate />}
          {selectedTemplate === 'table' && <TableListTemplate />}
          {selectedTemplate === 'twoColumn' && <TwoColumnTemplate />}
          {selectedTemplate === 'form' && <FormPageTemplate />}
          {selectedTemplate === 'cards' && <CardsGridTemplate />}
        </div>
      </div>

      <BackToTop />
    </div>
  );
};

export default TemplatesDemo;