import React, { useState } from 'react';
import MegaMenu, { MegaMenuSection } from '../components/MegaMenu/MegaMenu';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import { ODLThemeProvider } from '../theme/ODLThemeProvider';
import styles from './TableDemo.module.css';

const MegaMenuDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'basic' | 'search' | 'featured' | 'positions' | 'widths' | 'interactive'>('basic');
  const [showCode, setShowCode] = useState(false);
  const [clickedItem, setClickedItem] = useState<string | null>(null);

  // Sample menu data
  const basicMenuSections: MegaMenuSection[] = [
    {
      label: 'Products',
      columns: [
        {
          title: 'Software',
          items: [
            { label: 'SaaS Platform', description: 'Cloud-based solutions', badge: { label: 'Premium', variant: 'premium' } },
            { label: 'Enterprise Suite', description: 'For large organizations', badge: { label: 'Premium', variant: 'premium' } },
            { label: 'Starter Plan', description: 'Perfect for teams', badge: { label: 'New', variant: 'new' } }
          ]
        },
        {
          title: 'Services',
          items: [
            { label: 'Consulting', description: 'Expert guidance', badge: { label: 'Premium', variant: 'premium' } },
            { label: 'Implementation', description: 'Get started quickly' },
            { label: 'Support', description: '24/7 assistance' }
          ]
        }
      ]
    },
    {
      label: 'Resources',
      columns: [
        {
          title: 'Learning',
          items: [
            { label: 'Documentation', icon: 'document' },
            { label: 'Tutorials', icon: 'play' },
            { label: 'API Reference', icon: 'code' }
          ]
        },
        {
          title: 'Community',
          items: [
            { label: 'Forums', icon: 'chat' },
            { label: 'GitHub', icon: 'logo-github' },
            { label: 'Blog', icon: 'pen' }
          ]
        }
      ]
    },
    {
      label: 'Company',
      columns: [
        {
          title: 'About',
          items: [
            { label: 'Our Story', description: 'Since 2020' },
            { label: 'Team', description: 'Meet the crew' },
            { label: 'Careers', description: 'Join us!' }
          ]
        },
        {
          title: 'Legal',
          items: [
            { label: 'Privacy Policy' },
            { label: 'Terms of Service' },
            { label: 'Security' }
          ]
        }
      ]
    }
  ];

  const featuredMenuSections: MegaMenuSection[] = [
    {
      label: 'Solutions',
      featured: [
        { label: 'Enterprise', icon: 'building' },
        { label: 'Startup', icon: 'rocket' },
        { label: 'Healthcare', icon: 'health' }
      ],
      columns: [
        {
          title: 'Industries',
          items: [
            { label: 'Financial Services', featured: true },
            { label: 'Healthcare', featured: true },
            { label: 'Retail' },
            { label: 'Manufacturing' }
          ]
        },
        {
          title: 'Use Cases',
          items: [
            { label: 'Digital Transformation' },
            { label: 'Customer Analytics' },
            { label: 'Data Management' }
          ]
        }
      ]
    }
  ];

  const handleMenuItemClick = (item: string) => {
    setClickedItem(item);
  };

  const getCodeExample = (demo: string): string => {
    const examples: Record<string, string> = {
      basic: `import MegaMenu from '@odl/components/MegaMenu';

const menuSections = [
  {
    label: 'Products',
    columns: [
      {
        title: 'Software',
        items: [
          { label: 'SaaS Platform', description: 'Cloud-based' },
          { label: 'Enterprise Suite', description: 'For large orgs' }
        ]
      }
    ]
  }
];

<MegaMenu
  trigger="Menu"
  sections={menuSections}
  onItemClick={(item) => console.log(item)}
/>`,
      search: `<MegaMenu
  trigger="Search Menu"
  sections={menuSections}
  showSearch={true}
  searchPlaceholder="Find services..."
  onSearch={(term) => console.log('Search:', term)}
  onItemClick={handleClick}
/>`,
      featured: `<MegaMenu
  trigger="Featured Items"
  sections={[
    {
      label: 'Solutions',
      featured: [
        { label: 'Enterprise', icon: 'building' },
        { label: 'Startup', icon: 'rocket' }
      ],
      columns: [...]
    }
  ]}
/>`,
      positions: `// Left (default)
<MegaMenu trigger="Left" position="left" ... />

// Center
<MegaMenu trigger="Center" position="center" ... />

// Right
<MegaMenu trigger="Right" position="right" ... />`,
      widths: `// Wide (default, 800px)
<MegaMenu trigger="Wide" width="wide" ... />

// Extra Wide (1200px)
<MegaMenu trigger="Extra Wide" width="extra-wide" ... />

// Full (responsive)
<MegaMenu trigger="Full Width" width="full" ... />`,
      interactive: `<MegaMenu
  trigger="Interactive Demo"
  sections={sections}
  position="center"
  width="wide"
  showSearch={true}
  onItemClick={(item) => setClickedItem(item)}
  onSearch={(term) => handleSearch(term)}
/>`
    };

    return examples[demo] || examples.basic;
  };

  return (
    <ODLThemeProvider enableMui={true}>
      <div className={styles.tableDemo}>
        {/* Breadcrumb Navigation */}
        <DemoBreadcrumb componentName="MegaMenu Component" />

        {/* Enhanced Header Section */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerText}>
              <h1>MegaMenu Component Showcase</h1>
              <p>Comprehensive dropdown menus with multi-column layouts, search, and featured sections</p>
            </div>
            <div className={styles.headerActions}>
              <button
                style={{
                  padding: '8px 16px',
                  background: showCode ? '#3560C1' : '#E5E5E5',
                  color: showCode ? 'white' : '#161616',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
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
              { key: 'basic', label: 'Basic', desc: 'Simple multi-column menu', icon: '📋' },
              { key: 'search', label: 'With Search', desc: 'Searchable items', icon: '🔍' },
              { key: 'featured', label: 'Featured Items', desc: 'Highlighted sections', icon: '⭐' },
              { key: 'positions', label: 'Positions', desc: 'Alignment options', icon: '↔️' },
              { key: 'widths', label: 'Widths', desc: 'Size variations', icon: '↕️' },
              { key: 'interactive', label: 'Interactive', desc: 'Full demo', icon: '🎛️' }
            ].map((demo) => (
              <button
                key={demo.key}
                style={{
                  padding: '12px 16px',
                  background: selectedDemo === demo.key ? '#3560C1' : 'transparent',
                  color: selectedDemo === demo.key ? 'white' : '#525252',
                  border: 'none',
                  borderBottom: selectedDemo === demo.key ? '3px solid #3560C1' : 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: selectedDemo === demo.key ? '600' : '500',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setSelectedDemo(demo.key as any)}
              >
                <span style={{ marginRight: '8px' }}>{demo.icon}</span>
                {demo.label}
              </button>
            ))}
          </div>
        </div>

        {/* Demo Content */}
        <div className={styles.demoContent}>
          {/* Basic */}
          {selectedDemo === 'basic' && (
            <div className={styles.tableSection} style={{ overflow: 'visible' }}>
              <div className={styles.sectionHeader}>
                <h2>Basic MegaMenu</h2>
                <p>Multi-column dropdown with organized sections and items</p>
              </div>
              <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px', overflow: 'visible' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <MegaMenu
                    trigger="Open Menu"
                    sections={basicMenuSections}
                    onItemClick={handleMenuItemClick}
                  />
                  {clickedItem && (
                    <div style={{ fontSize: '14px', color: '#525252' }}>
                      Last clicked: <strong>{clickedItem}</strong>
                    </div>
                  )}
                </div>
                <div style={{ marginTop: '2rem', padding: '1rem', background: '#f9fafb', borderRadius: '8px' }}>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                    💡 Hover over menu items to see hover states. Use arrow keys and Escape to navigate.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* With Search */}
          {selectedDemo === 'search' && (
            <div className={styles.tableSection} style={{ overflow: 'visible' }}>
              <div className={styles.sectionHeader}>
                <h2>MegaMenu with Search</h2>
                <p>Search functionality to filter menu items</p>
              </div>
              <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px', overflow: 'visible' }}>
                <MegaMenu
                  trigger="Search Menu"
                  sections={basicMenuSections}
                  showSearch={true}
                  searchPlaceholder="Find a service..."
                  onItemClick={handleMenuItemClick}
                />
                <div style={{ marginTop: '2rem', padding: '1rem', background: '#f9fafb', borderRadius: '8px' }}>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                    Search the menu to quickly find items. The search input appears at the top of the menu.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Featured Items */}
          {selectedDemo === 'featured' && (
            <div className={styles.tableSection} style={{ overflow: 'visible' }}>
              <div className={styles.sectionHeader}>
                <h2>MegaMenu with Featured Items</h2>
                <p>Highlight important options with featured sections</p>
              </div>
              <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px', overflow: 'visible' }}>
                <MegaMenu
                  trigger="View Solutions"
                  sections={featuredMenuSections}
                  onItemClick={handleMenuItemClick}
                />
                <div style={{ marginTop: '2rem', padding: '1rem', background: '#f9fafb', borderRadius: '8px' }}>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                    Featured items appear at the top with icons or images for quick access to important categories.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Positions */}
          {selectedDemo === 'positions' && (
            <div className={styles.tableSection} style={{ overflow: 'visible' }}>
              <div className={styles.sectionHeader}>
                <h2>Position Variations</h2>
                <p>Align menus to different positions</p>
              </div>
              <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px', overflow: 'visible' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ marginBottom: '1rem', fontWeight: '500', fontSize: '14px' }}>Left Aligned</p>
                    <MegaMenu
                      trigger="Left"
                      sections={basicMenuSections}
                      position="left"
                      width="wide"
                      onItemClick={handleMenuItemClick}
                    />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ marginBottom: '1rem', fontWeight: '500', fontSize: '14px' }}>Center Aligned</p>
                    <MegaMenu
                      trigger="Center"
                      sections={basicMenuSections}
                      position="center"
                      width="wide"
                      onItemClick={handleMenuItemClick}
                    />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ marginBottom: '1rem', fontWeight: '500', fontSize: '14px' }}>Right Aligned</p>
                    <MegaMenu
                      trigger="Right"
                      sections={basicMenuSections}
                      position="right"
                      width="wide"
                      onItemClick={handleMenuItemClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Widths */}
          {selectedDemo === 'widths' && (
            <div className={styles.tableSection} style={{ overflow: 'visible' }}>
              <div className={styles.sectionHeader}>
                <h2>Width Variations</h2>
                <p>Different menu widths for various use cases</p>
              </div>
              <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px', overflow: 'visible' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <div>
                    <p style={{ marginBottom: '1rem', fontWeight: '500', fontSize: '14px' }}>Wide (800px)</p>
                    <MegaMenu
                      trigger="Wide Menu"
                      sections={basicMenuSections}
                      width="wide"
                      onItemClick={handleMenuItemClick}
                    />
                  </div>
                  <div>
                    <p style={{ marginBottom: '1rem', fontWeight: '500', fontSize: '14px' }}>Extra Wide (1200px)</p>
                    <MegaMenu
                      trigger="Extra Wide Menu"
                      sections={basicMenuSections}
                      width="extra-wide"
                      onItemClick={handleMenuItemClick}
                    />
                  </div>
                  <div>
                    <p style={{ marginBottom: '1rem', fontWeight: '500', fontSize: '14px' }}>Full Width</p>
                    <MegaMenu
                      trigger="Full Width Menu"
                      sections={basicMenuSections}
                      width="full"
                      onItemClick={handleMenuItemClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Interactive */}
          {selectedDemo === 'interactive' && (
            <div className={styles.tableSection} style={{ overflow: 'visible' }}>
              <div className={styles.sectionHeader}>
                <h2>Interactive Demo</h2>
                <p>Full-featured MegaMenu with all options enabled</p>
              </div>
              <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px', overflow: 'visible' }}>
                <div style={{ marginBottom: '2rem' }}>
                  <MegaMenu
                    trigger="Complete MegaMenu"
                    sections={basicMenuSections}
                    position="center"
                    width="extra-wide"
                    showSearch={true}
                    searchPlaceholder="Search menu items..."
                    onItemClick={handleMenuItemClick}
                  />
                </div>
                {clickedItem && (
                  <div style={{ padding: '1rem', background: '#D1FAE5', borderRadius: '8px', marginBottom: '1rem' }}>
                    <p style={{ margin: 0, color: '#065F46', fontSize: '14px' }}>
                      ✓ Last clicked item: <strong>{clickedItem}</strong>
                    </p>
                  </div>
                )}
                <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '8px' }}>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginTop: 0 }}>
                    <strong>Features:</strong>
                  </p>
                  <ul style={{ fontSize: '14px', color: '#6b7280', margin: '0.5rem 0 0 1.5rem', paddingLeft: 0 }}>
                    <li>Multi-column layout with organized sections</li>
                    <li>Search functionality to filter items</li>
                    <li>Keyboard navigation (arrow keys, Escape)</li>
                    <li>Hover effects and visual feedback</li>
                    <li>Responsive design for mobile and desktop</li>
                    <li>Full accessibility with ARIA attributes</li>
                  </ul>
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
            <h3>MegaMenu Component Features</h3>
            <p>Everything you need for comprehensive navigation menus</p>
          </div>

          <div className={styles.featureGrid}>
            <div className={styles.featureCategory}>
              <h4>📐 Layout</h4>
              <ul>
                <li>✓ Multi-column layout</li>
                <li>✓ Featured sections</li>
                <li>✓ Organized categories</li>
                <li>✓ Icon support</li>
                <li>✓ Descriptions</li>
              </ul>
            </div>

            <div className={styles.featureCategory}>
              <h4>🎯 Positioning</h4>
              <ul>
                <li>✓ Left alignment</li>
                <li>✓ Center alignment</li>
                <li>✓ Right alignment</li>
                <li>✓ Multiple width options</li>
                <li>✓ Responsive behavior</li>
              </ul>
            </div>

            <div className={styles.featureCategory}>
              <h4>🔍 Search</h4>
              <ul>
                <li>✓ Optional search bar</li>
                <li>✓ Real-time filtering</li>
                <li>✓ Clear button</li>
                <li>✓ Customizable placeholder</li>
                <li>✓ Search callbacks</li>
              </ul>
            </div>

            <div className={styles.featureCategory}>
              <h4>⌨️ Navigation</h4>
              <ul>
                <li>✓ Keyboard navigation</li>
                <li>✓ Arrow key support</li>
                <li>✓ Tab navigation</li>
                <li>✓ Escape to close</li>
                <li>✓ Click-outside handling</li>
              </ul>
            </div>

            <div className={styles.featureCategory}>
              <h4>♿ Accessibility</h4>
              <ul>
                <li>✓ ARIA attributes</li>
                <li>✓ Role definitions</li>
                <li>✓ Focus management</li>
                <li>✓ Screen reader support</li>
                <li>✓ WCAG 2.1 AA compliant</li>
              </ul>
            </div>

            <div className={styles.featureCategory}>
              <h4>📱 Responsive</h4>
              <ul>
                <li>✓ Mobile-friendly</li>
                <li>✓ Touch support</li>
                <li>✓ Adaptive layout</li>
                <li>✓ Bottom sheet on mobile</li>
                <li>✓ Flexible grid</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <BackToTop />
      </div>
    </ODLThemeProvider>
  );
};

export default MegaMenuDemo;
