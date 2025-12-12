import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import Icon from '../components/Icon/Icon';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import DemoComparison from '../components/DemoComparison/DemoComparison';
import { ODLThemeProvider } from '../theme/ODLThemeProvider';
import { Breadcrumbs, Link, Typography, Box } from '@mui/material';
import ODLTheme from '../styles/ODLTheme';
import styles from './TableDemo.module.css';

// MUI Breadcrumb Component with ODL Styling
interface MUIBreadcrumbProps {
  items: { label: string; path?: string; icon?: string }[];
  onNavigate?: (path: string) => void;
}

const MUIBreadcrumb: React.FC<MUIBreadcrumbProps> = ({ items, onNavigate }) => {
  const handleClick = (path: string, event: React.MouseEvent) => {
    event.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <Breadcrumbs
      separator={<Icon name="chevron-right" size={16} color={ODLTheme.colors.text.secondary} />}
      sx={{
        '& .MuiBreadcrumbs-separator': {
          marginLeft: '8px',
          marginRight: '8px'
        }
      }}
    >
      {items.map((item, index) => (
        index < items.length - 1 ? (
          <Link
            key={item.path}
            component="button"
            variant="body2"
            color="inherit"
            onClick={(event) => item.path && handleClick(item.path, event)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: ODLTheme.colors.text.secondary,
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 400,
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              '&:hover': {
                color: ODLTheme.colors.primary,
                textDecoration: 'underline'
              }
            }}
          >
            {item.icon && <Icon name={item.icon} size={14} />}
            {item.label}
          </Link>
        ) : (
          <Typography
            key={index}
            color="text.primary"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: ODLTheme.colors.text.primary
            }}
          >
            {item.icon && <Icon name={item.icon} size={14} />}
            {item.label}
          </Typography>
        )
      ))}
    </Breadcrumbs>
  );
};

const BreadcrumbDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'basic' | 'icons' | 'interactive' | 'variations' | 'responsive'>('basic');
  const [showCode, setShowCode] = useState(false);
  const [showComparison, setShowComparison] = useState(true);
  const [currentPath, setCurrentPath] = useState('/dashboard/products/electronics');

  const handleNavigation = (path: string) => {
    setCurrentPath(path);
    console.log('Navigating to:', path);
  };

  return (
    <ODLThemeProvider enableMui={true}>
      <div className={styles.tableDemo}>
      {/* Breadcrumb Navigation */}
      <DemoBreadcrumb componentName="Breadcrumb Component" />
      
      {/* Enhanced Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>Breadcrumb Component Showcase</h1>
            <p>Hierarchical navigation showing users their current location within the application</p>
          </div>
          <div className={styles.headerActions}>
            <button
              className={showComparison ? styles.primaryButton : styles.secondaryButton}
              onClick={() => setShowComparison(!showComparison)}
            >
              {showComparison ? 'Hide Comparison' : 'Show Comparison'}
            </button>
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
            { key: 'basic', label: 'Basic', desc: 'Simple breadcrumb navigation', icon: '🔗' },
            { key: 'icons', label: 'With Icons', desc: 'Breadcrumbs with icon elements', icon: '✨' },
            { key: 'interactive', label: 'Interactive', desc: 'Click to navigate', icon: '👆' },
            { key: 'variations', label: 'Variations', desc: 'Different styles and sizes', icon: '🎨' },
            { key: 'responsive', label: 'Responsive', desc: 'Mobile-friendly breadcrumbs', icon: '📱' }
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
              <h2>Basic Breadcrumbs</h2>
              <p>Simple breadcrumb navigation patterns for different use cases</p>
            </div>

            {/* ODL vs MUI Breadcrumb Comparison */}
            {showComparison && (
              <DemoComparison
                title="Breadcrumb Component Comparison"
                description="ODL Breadcrumb vs MUI Breadcrumbs with ODL Styling"
                odlExample={
                  <div style={{ padding: '1rem', background: 'white', borderRadius: '4px' }}>
                    <Breadcrumb
                      items={[
                        { label: 'Home', path: '/' },
                        { label: 'Products', path: '/products' },
                        { label: 'Electronics', path: '/products/electronics' },
                        { label: 'Laptops' }
                      ]}
                      onNavigate={handleNavigation}
                    />
                  </div>
                }
                muiExample={
                  <div style={{ padding: '1rem', background: 'white', borderRadius: '4px' }}>
                    <MUIBreadcrumb
                      items={[
                        { label: 'Home', path: '/' },
                        { label: 'Products', path: '/products' },
                        { label: 'Electronics', path: '/products/electronics' },
                        { label: 'Laptops' }
                      ]}
                      onNavigate={handleNavigation}
                    />
                  </div>
                }
              />
            )}
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Standard Breadcrumb</h3>
                  <Breadcrumb 
                    items={[
                      { label: 'Home', path: '/' },
                      { label: 'Products', path: '/products' },
                      { label: 'Electronics', path: '/products/electronics' },
                      { label: 'Laptops' }
                    ]}
                    onNavigate={handleNavigation}
                  />
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Short Path</h3>
                  <Breadcrumb 
                    items={[
                      { label: 'Dashboard', path: '/dashboard' },
                      { label: 'Settings' }
                    ]}
                    onNavigate={handleNavigation}
                  />
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Long Path with Truncation</h3>
                  <Breadcrumb 
                    items={[
                      { label: 'Home', path: '/' },
                      { label: '...', path: undefined },
                      { label: 'Category', path: '/products/electronics/computers' },
                      { label: 'Subcategory', path: '/products/electronics/computers/laptops' },
                      { label: 'Product Details' }
                    ]}
                    onNavigate={handleNavigation}
                  />
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>File System Navigation</h3>
                  <Breadcrumb 
                    items={[
                      { label: 'Documents', path: '/documents' },
                      { label: 'Projects', path: '/documents/projects' },
                      { label: '2024', path: '/documents/projects/2024' },
                      { label: 'Q1 Report.pdf' }
                    ]}
                    onNavigate={handleNavigation}
                  />
                </div>
              </div>
              
              <div style={{ marginTop: '2rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  <strong>Tip:</strong> The last item in the breadcrumb is typically non-clickable and represents the current page.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'icons' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Breadcrumbs with Icons</h2>
              <p>Enhanced breadcrumbs with icon indicators for better visual hierarchy</p>
            </div>

            {/* ODL vs MUI Breadcrumb with Icons Comparison */}
            {showComparison && (
              <DemoComparison
                title="Breadcrumb with Icons Comparison"
                description="ODL Breadcrumb vs MUI Breadcrumbs with Icon Support"
                odlExample={
                  <div style={{ padding: '1rem', background: 'white', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Icon name="home" size={16} color="#6b7280" />
                      <Breadcrumb
                        items={[
                          { label: 'Dashboard', path: '/dashboard' },
                          { label: 'Analytics', path: '/dashboard/analytics' },
                          { label: 'Reports' }
                        ]}
                        onNavigate={handleNavigation}
                      />
                    </div>
                  </div>
                }
                muiExample={
                  <div style={{ padding: '1rem', background: 'white', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Icon name="home" size={16} color="#6b7280" />
                      <MUIBreadcrumb
                        items={[
                          { label: 'Dashboard', path: '/dashboard' },
                          { label: 'Analytics', path: '/dashboard/analytics' },
                          { label: 'Reports' }
                        ]}
                        onNavigate={handleNavigation}
                      />
                    </div>
                  </div>
                }
              />
            )}
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>With Home Icon</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Icon name="home" size={16} color="#6b7280" />
                    <Breadcrumb 
                      items={[
                        { label: 'Dashboard', path: '/dashboard' },
                        { label: 'Analytics', path: '/dashboard/analytics' },
                        { label: 'Reports' }
                      ]}
                      onNavigate={handleNavigation}
                    />
                  </div>
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Folder Navigation</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Icon name="folder" size={16} color="#6b7280" />
                    <Breadcrumb 
                      items={[
                        { label: 'Root', path: '/' },
                        { label: 'src', path: '/src' },
                        { label: 'components', path: '/src/components' },
                        { label: 'Button.tsx' }
                      ]}
                      onNavigate={handleNavigation}
                    />
                  </div>
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>User Path</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Icon name="user" size={16} color="#6b7280" />
                    <Breadcrumb 
                      items={[
                        { label: 'Account', path: '/account' },
                        { label: 'Profile', path: '/account/profile' },
                        { label: 'Edit' }
                      ]}
                      onNavigate={handleNavigation}
                    />
                  </div>
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Settings Path</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Icon name="settings" size={16} color="#6b7280" />
                    <Breadcrumb 
                      items={[
                        { label: 'Settings', path: '/settings' },
                        { label: 'Security', path: '/settings/security' },
                        { label: 'Two-Factor Authentication' }
                      ]}
                      onNavigate={handleNavigation}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ODL vs MUI Breadcrumb with Icons Comparison */}
        {selectedDemo === 'icons' && showComparison && (
          <DemoComparison
            title="Breadcrumb with Icons Comparison"
            description="ODL Breadcrumb vs MUI Breadcrumbs with Icon Support"
            odlExample={
              <div style={{ padding: '1rem', background: 'white', borderRadius: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Icon name="home" size={16} color="#6b7280" />
                  <Breadcrumb
                    items={[
                      { label: 'Dashboard', path: '/dashboard' },
                      { label: 'Analytics', path: '/dashboard/analytics' },
                      { label: 'Reports' }
                    ]}
                    onNavigate={handleNavigation}
                  />
                </div>
              </div>
            }
            muiExample={
              <div style={{ padding: '1rem', background: 'white', borderRadius: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Icon name="home" size={16} color="#6b7280" />
                  <MUIBreadcrumb
                    items={[
                      { label: 'Dashboard', path: '/dashboard' },
                      { label: 'Analytics', path: '/dashboard/analytics' },
                      { label: 'Reports' }
                    ]}
                    onNavigate={handleNavigation}
                  />
                </div>
              </div>
            }
          />
        )}

        {selectedDemo === 'interactive' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Interactive Breadcrumb</h2>
              <p>Click on breadcrumb items to navigate</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Current Path</h3>
                <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '0.375rem', marginBottom: '1rem' }}>
                  <code style={{ fontSize: '0.875rem', color: '#374151' }}>{currentPath}</code>
                </div>
                
                <Breadcrumb 
                  items={currentPath.split('/').filter(Boolean).map((segment, index, arr) => ({
                    label: segment.charAt(0).toUpperCase() + segment.slice(1),
                    path: index < arr.length - 1 ? '/' + arr.slice(0, index + 1).join('/') : undefined
                  }))}
                  onNavigate={(path) => {
                    setCurrentPath(path);
                    console.log('Navigating to:', path);
                  }}
                />
              </div>

              <div>
                <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Quick Navigation Examples</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <button
                    onClick={() => setCurrentPath('/home')}
                    style={{
                      padding: '0.75rem',
                      background: '#f3f4f6',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    Go to Home
                  </button>
                  <button
                    onClick={() => setCurrentPath('/products/electronics/phones')}
                    style={{
                      padding: '0.75rem',
                      background: '#f3f4f6',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    Go to Phones
                  </button>
                  <button
                    onClick={() => setCurrentPath('/dashboard/analytics/reports/2024')}
                    style={{
                      padding: '0.75rem',
                      background: '#f3f4f6',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    Go to 2024 Reports
                  </button>
                  <button
                    onClick={() => setCurrentPath('/settings/account/profile/edit')}
                    style={{
                      padding: '0.75rem',
                      background: '#f3f4f6',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.375rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem'
                    }}
                  >
                    Go to Edit Profile
                  </button>
                </div>
              </div>

              <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0f9ff', borderRadius: '0.5rem', border: '1px solid #bae6fd' }}>
                <p style={{ fontSize: '0.875rem', color: '#0369a1' }}>
                  <strong>Info:</strong> Click on any breadcrumb item (except the last one) to navigate to that path.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'variations' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Breadcrumb Variations</h2>
              <p>Different styles and configurations for various use cases</p>
            </div>

            {/* ODL vs MUI Breadcrumb Variations Comparison */}
            {showComparison && (
              <DemoComparison
                title="Breadcrumb Variations Comparison"
                description="ODL Custom Styles vs MUI Breadcrumbs with Various Separators"
                odlExample={
                  <div style={{ padding: '1rem', background: 'white', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                        <a href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>Home</a>
                        <span style={{ color: '#9ca3af' }}>/</span>
                        <a href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>Products</a>
                        <span style={{ color: '#9ca3af' }}>/</span>
                        <span style={{ color: '#374151', fontWeight: 500 }}>Laptops</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ padding: '0.25rem 0.75rem', background: '#e5e7eb', borderRadius: '9999px', fontSize: '0.875rem' }}>
                          Home
                        </span>
                        <Icon name="chevron-right" size={12} color="#9ca3af" />
                        <span style={{ padding: '0.25rem 0.75rem', background: '#3b82f6', color: 'white', borderRadius: '9999px', fontSize: '0.875rem' }}>
                          Current
                        </span>
                      </div>
                    </div>
                  </div>
                }
                muiExample={
                  <div style={{ padding: '1rem', background: 'white', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <Breadcrumbs
                        separator="/"
                        sx={{
                          '& .MuiBreadcrumbs-separator': {
                            color: '#9ca3af',
                            marginLeft: '0.75rem',
                            marginRight: '0.75rem'
                          }
                        }}
                      >
                        <Link
                          component="button"
                          onClick={() => {}}
                          sx={{
                            color: '#3b82f6',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' }
                          }}
                        >
                          Home
                        </Link>
                        <Link
                          component="button"
                          onClick={() => {}}
                          sx={{
                            color: '#3b82f6',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' }
                          }}
                        >
                          Products
                        </Link>
                        <Typography sx={{ color: '#374151', fontWeight: 500, fontSize: '0.875rem' }}>
                          Laptops
                        </Typography>
                      </Breadcrumbs>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Box sx={{
                          padding: '0.25rem 0.75rem',
                          background: '#e5e7eb',
                          borderRadius: '9999px',
                          fontSize: '0.875rem'
                        }}>
                          Home
                        </Box>
                        <Icon name="chevron-right" size={12} color="#9ca3af" />
                        <Box sx={{
                          padding: '0.25rem 0.75rem',
                          background: '#3b82f6',
                          color: 'white',
                          borderRadius: '9999px',
                          fontSize: '0.875rem'
                        }}>
                          Current
                        </Box>
                      </div>
                    </div>
                  </div>
                }
              />
            )}
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>With Slash Separator</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                    <a href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>Home</a>
                    <span style={{ color: '#9ca3af' }}>/</span>
                    <a href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>Products</a>
                    <span style={{ color: '#9ca3af' }}>/</span>
                    <a href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>Electronics</a>
                    <span style={{ color: '#9ca3af' }}>/</span>
                    <span style={{ color: '#374151', fontWeight: 500 }}>Laptops</span>
                  </div>
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>With Arrow Separator</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                    <a href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>Dashboard</a>
                    <span style={{ color: '#9ca3af' }}>→</span>
                    <a href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>Reports</a>
                    <span style={{ color: '#9ca3af' }}>→</span>
                    <span style={{ color: '#374151', fontWeight: 500 }}>Monthly</span>
                  </div>
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Pill Style</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ padding: '0.25rem 0.75rem', background: '#e5e7eb', borderRadius: '9999px', fontSize: '0.875rem' }}>
                      Home
                    </span>
                    <Icon name="chevron-right" size={12} color="#9ca3af" />
                    <span style={{ padding: '0.25rem 0.75rem', background: '#e5e7eb', borderRadius: '9999px', fontSize: '0.875rem' }}>
                      Catalog
                    </span>
                    <Icon name="chevron-right" size={12} color="#9ca3af" />
                    <span style={{ padding: '0.25rem 0.75rem', background: '#3b82f6', color: 'white', borderRadius: '9999px', fontSize: '0.875rem' }}>
                      Items
                    </span>
                  </div>
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>With Background</h3>
                  <div style={{ padding: '1rem', background: '#f3f4f6', borderRadius: '0.375rem' }}>
                    <Breadcrumb 
                      items={[
                        { label: 'Admin', path: '/admin' },
                        { label: 'Users', path: '/admin/users' },
                        { label: 'Permissions' }
                      ]}
                      onNavigate={handleNavigation}
                    />
                  </div>
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Large Size</h3>
                  <div style={{ fontSize: '1.125rem' }}>
                    <Breadcrumb 
                      items={[
                        { label: 'Store', path: '/store' },
                        { label: 'Categories', path: '/store/categories' },
                        { label: 'Featured' }
                      ]}
                      onNavigate={handleNavigation}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ODL vs MUI Breadcrumb Variations Comparison */}
        {selectedDemo === 'variations' && showComparison && (
          <DemoComparison
            title="Breadcrumb Variations Comparison"
            description="ODL Custom Styles vs MUI Breadcrumbs with Various Separators"
            odlExample={
              <div style={{ padding: '1rem', background: 'white', borderRadius: '4px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                    <a href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>Home</a>
                    <span style={{ color: '#9ca3af' }}>/</span>
                    <a href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>Products</a>
                    <span style={{ color: '#9ca3af' }}>/</span>
                    <span style={{ color: '#374151', fontWeight: 500 }}>Laptops</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ padding: '0.25rem 0.75rem', background: '#e5e7eb', borderRadius: '9999px', fontSize: '0.875rem' }}>
                      Home
                    </span>
                    <Icon name="chevron-right" size={12} color="#9ca3af" />
                    <span style={{ padding: '0.25rem 0.75rem', background: '#3b82f6', color: 'white', borderRadius: '9999px', fontSize: '0.875rem' }}>
                      Current
                    </span>
                  </div>
                </div>
              </div>
            }
            muiExample={
              <div style={{ padding: '1rem', background: 'white', borderRadius: '4px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <Breadcrumbs
                    separator="/"
                    sx={{
                      '& .MuiBreadcrumbs-separator': {
                        color: '#9ca3af',
                        marginLeft: '0.75rem',
                        marginRight: '0.75rem'
                      }
                    }}
                  >
                    <Link
                      component="button"
                      onClick={() => {}}
                      sx={{
                        color: '#3b82f6',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      Home
                    </Link>
                    <Link
                      component="button"
                      onClick={() => {}}
                      sx={{
                        color: '#3b82f6',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      Products
                    </Link>
                    <Typography sx={{ color: '#374151', fontWeight: 500, fontSize: '0.875rem' }}>
                      Laptops
                    </Typography>
                  </Breadcrumbs>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Box sx={{
                      padding: '0.25rem 0.75rem',
                      background: '#e5e7eb',
                      borderRadius: '9999px',
                      fontSize: '0.875rem'
                    }}>
                      Home
                    </Box>
                    <Icon name="chevron-right" size={12} color="#9ca3af" />
                    <Box sx={{
                      padding: '0.25rem 0.75rem',
                      background: '#3b82f6',
                      color: 'white',
                      borderRadius: '9999px',
                      fontSize: '0.875rem'
                    }}>
                      Current
                    </Box>
                  </div>
                </div>
              </div>
            }
          />
        )}

        {selectedDemo === 'responsive' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Responsive Breadcrumbs</h2>
              <p>Mobile-friendly breadcrumb patterns</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Mobile View (Collapsed)</h3>
                  <div style={{ maxWidth: '320px', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem' }}>
                    <Breadcrumb 
                      items={[
                        { label: '...', path: '/products' },
                        { label: 'Electronics', path: '/products/electronics' },
                        { label: 'Phone' }
                      ]}
                      onNavigate={handleNavigation}
                    />
                  </div>
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Dropdown Style for Mobile</h3>
                  <div style={{ maxWidth: '320px', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem' }}>
                    <button 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      <Icon name="chevron-down" size={16} />
                      Current: Phone Details
                    </button>
                  </div>
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Back Button Style</h3>
                  <div style={{ maxWidth: '320px', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button 
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          padding: '0.5rem',
                          background: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '0.375rem',
                          cursor: 'pointer',
                          fontSize: '0.875rem'
                        }}
                      >
                        <Icon name="arrow-left" size={16} />
                        Back
                      </button>
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>to Electronics</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Scrollable for Long Paths</h3>
                  <div style={{ maxWidth: '400px', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', overflowX: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                      <Breadcrumb 
                        items={[
                          { label: 'Home', path: '/' },
                          { label: 'Products', path: '/products' },
                          { label: 'Electronics', path: '/products/electronics' },
                          { label: 'Computers', path: '/products/electronics/computers' },
                          { label: 'Laptops', path: '/products/electronics/computers/laptops' },
                          { label: 'Gaming Laptops' }
                        ]}
                        onNavigate={handleNavigation}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: '2rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  <strong>Best Practice:</strong> On mobile devices, consider showing only the immediate parent and current page, or use a dropdown/back button pattern.
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
          <h3>Breadcrumb Component Features</h3>
          <p>Everything you need for hierarchical navigation</p>
        </div>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCategory}>
            <h4>🔗 Navigation</h4>
            <ul>
              <li>✓ Clickable items</li>
              <li>✓ Path tracking</li>
              <li>✓ Current page indicator</li>
              <li>✓ Navigation callbacks</li>
              <li>✓ URL integration</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>🎨 Styles</h4>
            <ul>
              <li>✓ Multiple separators</li>
              <li>✓ Icon support</li>
              <li>✓ Custom styling</li>
              <li>✓ Pill style variant</li>
              <li>✓ Size variations</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>📱 Responsive</h4>
            <ul>
              <li>✓ Mobile optimization</li>
              <li>✓ Collapsible paths</li>
              <li>✓ Dropdown mode</li>
              <li>✓ Back button style</li>
              <li>✓ Scrollable container</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>👍 Accessibility</h4>
            <ul>
              <li>✓ ARIA navigation</li>
              <li>✓ Keyboard support</li>
              <li>✓ Screen reader friendly</li>
              <li>✓ Focus management</li>
              <li>✓ Semantic HTML</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>⚡ Features</h4>
            <ul>
              <li>✓ Path truncation</li>
              <li>✓ Dynamic generation</li>
              <li>✓ Custom separators</li>
              <li>✓ Flexible items</li>
              <li>✓ Event handlers</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>🎯 Use Cases</h4>
            <ul>
              <li>✓ File navigation</li>
              <li>✓ E-commerce categories</li>
              <li>✓ Admin panels</li>
              <li>✓ Document hierarchy</li>
              <li>✓ Multi-step forms</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <BackToTop />
      </div>
    </ODLThemeProvider>
  );

  // Helper function to generate code examples
  function getCodeExample(demo: string): string {
    const examples = {
      basic: `// Basic Breadcrumb
<Breadcrumb 
  items={[
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Electronics', path: '/products/electronics' },
    { label: 'Laptops' } // Current page (no path)
  ]}
  onNavigate={(path) => console.log('Navigate to:', path)}
/>`,
      
      icons: `// Breadcrumb with Icons
<div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
  <Icon name="folder" size={16} />
  <Breadcrumb 
    items={[
      { label: 'Root', path: '/' },
      { label: 'src', path: '/src' },
      { label: 'components', path: '/src/components' },
      { label: 'Button.tsx' }
    ]}
    onNavigate={handleNavigation}
  />
</div>`,
      
      interactive: `// Interactive Breadcrumb
const [currentPath, setCurrentPath] = useState('/dashboard');

<Breadcrumb 
  items={currentPath.split('/').filter(Boolean).map((segment, index, arr) => ({
    label: segment.charAt(0).toUpperCase() + segment.slice(1),
    path: index < arr.length - 1 ? '/' + arr.slice(0, index + 1).join('/') : undefined
  }))}
  onNavigate={(path) => setCurrentPath(path)}
/>`,
      
      variations: `// Custom Separator Style
<div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
  <a href="#">Home</a>
  <span>/</span>
  <a href="#">Products</a>
  <span>/</span>
  <span style={{ fontWeight: 500 }}>Current Page</span>
</div>

// Pill Style
<div style={{ display: 'flex', gap: '0.5rem' }}>
  <span style={{ padding: '0.25rem 0.75rem', background: '#e5e7eb', borderRadius: '9999px' }}>
    Home
  </span>
  <Icon name="chevron-right" size={12} />
  <span style={{ padding: '0.25rem 0.75rem', background: '#3b82f6', color: 'white', borderRadius: '9999px' }}>
    Current
  </span>
</div>`,
      
      responsive: `// Mobile Collapsed
<Breadcrumb 
  items={[
    { label: '...', path: '/products' },
    { label: 'Category', path: '/products/category' },
    { label: 'Item' }
  ]}
/>

// Back Button Style
<button onClick={() => history.back()}>
  <Icon name="arrow-left" /> Back to Previous
</button>`
    };
    
    return examples[demo as keyof typeof examples] || examples.basic;
  }
};

export default BreadcrumbDemo;