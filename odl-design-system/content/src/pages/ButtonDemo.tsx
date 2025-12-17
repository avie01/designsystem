import React, { useState } from 'react';
import Button from '../components/Button/Button';
import Switch from '../components/Switch/Switch';
import Icon from '../components/Icon/Icon';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import DemoComparison from '../components/DemoComparison/DemoComparison';
import { Button as MUIButton } from '../components-mui/Button';
import { ODLThemeProvider } from '../theme/ODLThemeProvider';
import styles from './TableDemo.module.css';

const ButtonDemo: React.FC = () => {
  const [showComparison, _setShowComparison] = useState(true);
  const [selectedDemo, setSelectedDemo] = useState<'variants' | 'sizes' | 'states' | 'icons' | 'groups' | 'interactive' | 'switches'>('variants');
  const [showCode, setShowCode] = useState(false);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [clickCounts, setClickCounts] = useState<Record<string, number>>({});
  const [buttonSettings, setButtonSettings] = useState({
    variant: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
    fullWidth: false,
  });
  const [selectedView, setSelectedView] = useState<'list' | 'grid' | 'chart'>('grid');
  const [selectedPage, setSelectedPage] = useState(1);
  const [switchStates, setSwitchStates] = useState<Record<string, boolean>>({
    switch1: false,
    switch2: true,
    switch3: false,
  });

  // Button Group Component for demonstrating selection
  const ButtonGroup = () => {
    return (
      <div style={{ display: 'flex', gap: '0' }}>
        <Button 
          variant="secondary" 
          selected={selectedView === 'list'}
          onClick={() => setSelectedView('list')}
          style={{ borderRadius: '2px 0 0 2px', borderRight: selectedView === 'list' ? 'none' : '1px solid #D1D1D1' }}
        >
          <Icon name="list" size={16} />
          List View
        </Button>
        <Button 
          variant="secondary"
          selected={selectedView === 'grid'}
          onClick={() => setSelectedView('grid')}
          style={{ borderRadius: '0', borderLeft: selectedView === 'list' ? 'none' : '1px solid #D1D1D1', borderRight: selectedView === 'chart' ? 'none' : '1px solid #D1D1D1' }}
        >
          <Icon name="grid" size={16} />
          Grid View
        </Button>
        <Button 
          variant="secondary"
          selected={selectedView === 'chart'}
          onClick={() => setSelectedView('chart')}
          style={{ borderRadius: '0 2px 2px 0', borderLeft: selectedView === 'grid' ? 'none' : '1px solid #D1D1D1' }}
        >
          <Icon name="chart-bar" size={16} />
          Chart View
        </Button>
      </div>
    );
  };

  const handleButtonClick = (buttonId: string) => {
    setClickCounts(prev => ({
      ...prev,
      [buttonId]: (prev[buttonId] || 0) + 1
    }));
  };

  const simulateLoading = (buttonId: string) => {
    setLoadingStates(prev => ({ ...prev, [buttonId]: true }));
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [buttonId]: false }));
    }, 2000);
  };

  return (
    <ODLThemeProvider enableMui={true}>
    <div className={styles.tableDemo}>
      {/* Breadcrumb Navigation */}
      <DemoBreadcrumb componentName="Button Component" />
      
      {/* Enhanced Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>Button Component Showcase</h1>
            <p>Interactive buttons with multiple variants, sizes, and states for all your UI needs</p>
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
            { key: 'variants', label: 'Variants', desc: 'Different button styles', icon: '🎨' },
            { key: 'sizes', label: 'Sizes', desc: 'Various button dimensions', icon: '📏' },
            { key: 'states', label: 'States', desc: 'Loading and disabled states', icon: '⚡' },
            { key: 'icons', label: 'With Icons', desc: 'Buttons with icon elements', icon: '✨' },
            { key: 'groups', label: 'Button Groups', desc: 'Grouped button layouts', icon: '🔲' },
            { key: 'interactive', label: 'Interactive', desc: 'Live configuration demo', icon: '🎛️' },
            { key: 'switches', label: 'Switches', desc: 'Toggle switch component', icon: '🔄' }
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
        {selectedDemo === 'variants' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Button Variants</h2>
              <p>Different button styles for various use cases and hierarchy levels</p>
            </div>

            {/* ODL vs MUI Comparison */}
            {showComparison && (
              <DemoComparison
                title="Button Variant Comparison"
                description="Side-by-side comparison of ODL and MUI button variants"
                odlExample={
                  <>
                    <Button variant="primary">Primary Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="tertiary">Tertiary Button</Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="destructive">Destructive</Button>
                  </>
                }
                muiExample={
                  <>
                    <MUIButton variant="primary">Primary Button</MUIButton>
                    <MUIButton variant="secondary">Secondary Button</MUIButton>
                    <MUIButton variant="tertiary">Tertiary Button</MUIButton>
                    <MUIButton variant="ghost">Ghost Button</MUIButton>
                    <MUIButton variant="destructive">Destructive</MUIButton>
                  </>
                }
              />
            )}

            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="tertiary">Tertiary Button</Button>
                <Button variant="destructive">Destructive Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="text">Text Button</Button>
              </div>
              
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Selected State</h3>
                <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  When a button is selected, it automatically becomes primary regardless of its original variant.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  <Button variant="secondary" selected>Selected Secondary</Button>
                  <Button variant="tertiary" selected>Selected Tertiary</Button>
                  <Button variant="text" selected>Selected Text</Button>
                  <Button variant="ghost" selected>Selected Ghost</Button>
                </div>
              </div>
              
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Usage Guidelines</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>✓ <strong>Primary:</strong> Main actions like Save, Submit, Continue</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ <strong>Secondary:</strong> Secondary actions like Cancel, Back</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ <strong>Tertiary:</strong> Less prominent actions</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ <strong>Destructive:</strong> Delete, Remove, or other destructive actions</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ <strong>Ghost:</strong> Toolbar actions and icon buttons</li>
                  <li style={{ marginBottom: '0.5rem' }}>✓ <strong>Text:</strong> Inline actions and links</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'sizes' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Button Sizes</h2>
              <p>Multiple size options to fit different contexts and layouts</p>
            </div>

            {/* ODL vs MUI Size Comparison */}
            {showComparison && (
              <DemoComparison
                title="Button Size Comparison"
                description="Size variations in ODL and MUI buttons"
                odlExample={
                  <>
                    <Button variant="primary" size="xs">Extra Small</Button>
                    <Button variant="primary" size="small">Small Button</Button>
                    <Button variant="primary" size="medium">Medium Button</Button>
                    <Button variant="primary" size="large">Large Button</Button>
                  </>
                }
                muiExample={
                  <>
                    <MUIButton variant="primary" size="small">Small Button</MUIButton>
                    <MUIButton variant="primary" size="medium">Medium Button</MUIButton>
                    <MUIButton variant="primary" size="large">Large Button</MUIButton>
                  </>
                }
              />
            )}

            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {['primary', 'secondary'].map(variant => (
                  <div key={variant}>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600, textTransform: 'capitalize' }}>
                      {variant} Buttons
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                      <Button variant={variant as any} size="xs">Extra Small</Button>
                      <Button variant={variant as any} size="small">Small</Button>
                      <Button variant={variant as any} size="medium">Medium</Button>
                      <Button variant={variant as any} size="large">Large</Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '2rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  <strong>Tip:</strong> Use consistent button sizes within the same context. Mix sizes only when establishing clear visual hierarchy.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'states' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Button States</h2>
              <p>Different states to provide feedback and control user interactions</p>
            </div>

            {/* ODL vs MUI States Comparison */}
            {showComparison && (
              <DemoComparison
                title="Button States Comparison"
                description="Loading and disabled states in ODL and MUI"
                odlExample={
                  <>
                    <Button variant="primary">Normal Button</Button>
                    <Button variant="primary" disabled>Disabled Button</Button>
                    <Button variant="primary" loading>Loading Button</Button>
                  </>
                }
                muiExample={
                  <>
                    <MUIButton variant="primary">Normal Button</MUIButton>
                    <MUIButton variant="primary" disabled>Disabled Button</MUIButton>
                    <MUIButton variant="primary" loading>Loading Button</MUIButton>
                  </>
                }
              />
            )}
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Normal State</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Button variant="primary">Enabled Button</Button>
                    <Button variant="secondary">Enabled Button</Button>
                  </div>
                </div>
                
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Disabled State</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Button variant="primary" disabled>Disabled Button</Button>
                    <Button variant="secondary" disabled>Disabled Button</Button>
                  </div>
                </div>
                
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Loading State</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <Button variant="primary" loading>Loading...</Button>
                    <Button variant="secondary" loading>Processing...</Button>
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: '2rem', borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Interactive States Demo</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Click Counter</p>
                    <Button 
                      variant="primary"
                      onClick={() => handleButtonClick('counter')}
                    >
                      Clicked {clickCounts['counter'] || 0} times
                    </Button>
                  </div>
                  
                  <div>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Async Action</p>
                    <Button 
                      variant="secondary"
                      loading={loadingStates['async']}
                      onClick={() => simulateLoading('async')}
                      disabled={loadingStates['async']}
                    >
                      {loadingStates['async'] ? 'Processing...' : 'Start Task'}
                    </Button>
                  </div>
                  
                  <div>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Toggle State</p>
                    <Button 
                      variant={clickCounts['toggle'] % 2 === 0 ? 'tertiary' : 'primary'}
                      onClick={() => handleButtonClick('toggle')}
                    >
                      {clickCounts['toggle'] % 2 === 0 ? 'Off' : 'On'}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: '2rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  <strong>Pro tip:</strong> Use loading states for async operations and provide visual feedback for all user interactions.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'icons' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Buttons with Icons</h2>
              <p>Enhance buttons with icons for better visual communication</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Icon Position</h3>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Button variant="primary" icon={<Icon name="add" size={16} />}>
                      Add Item
                    </Button>
                    <Button variant="secondary" icon={<Icon name="download" size={16} />}>
                      Download
                    </Button>
                    <Button variant="tertiary" iconRight={<Icon name="arrow-right" size={16} />}>
                      Continue
                    </Button>
                    <Button variant="ghost" icon={<Icon name="settings" size={16} />}>
                      Settings
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Icon-Only Buttons</h3>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Button variant="ghost" size="small">
                      <Icon name="edit" size={16} />
                    </Button>
                    <Button variant="ghost" size="small">
                      <Icon name="close" size={16} />
                    </Button>
                    <Button variant="ghost" size="small">
                      <Icon name="overflow-menu-vertical" size={16} />
                    </Button>
                    <Button variant="primary" size="small">
                      <Icon name="add" size={16} />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Action Buttons</h3>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Button variant="primary" icon={<Icon name="checkmark-filled" size={16} />}>
                      Save Changes
                    </Button>
                    <Button variant="destructive" icon={<Icon name="warning" size={16} />}>
                      Delete Item
                    </Button>
                    <Button variant="secondary" icon={<Icon name="upload" size={16} />}>
                      Upload File
                    </Button>
                    <Button variant="tertiary" icon={<Icon name="renew" size={16} />}>
                      Refresh
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'interactive' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Interactive Configuration</h2>
              <p>Customize button properties and see changes in real-time</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                <div style={{ borderRight: '1px solid #e5e7eb', paddingRight: '2rem' }}>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Settings</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                        Variant
                      </label>
                      <select 
                        value={buttonSettings.variant}
                        onChange={(e) => setButtonSettings({ ...buttonSettings, variant: e.target.value })}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #e5e7eb' }}
                      >
                        <option value="primary">Primary</option>
                        <option value="secondary">Secondary</option>
                        <option value="tertiary">Tertiary</option>
                        <option value="destructive">Destructive</option>
                        <option value="ghost">Ghost</option>
                        <option value="text">Text</option>
                      </select>
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500 }}>
                        Size
                      </label>
                      <select 
                        value={buttonSettings.size}
                        onChange={(e) => setButtonSettings({ ...buttonSettings, size: e.target.value })}
                        style={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #e5e7eb' }}
                      >
                        <option value="xs">Extra Small</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                    
                    <div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={buttonSettings.disabled}
                          onChange={(e) => setButtonSettings({ ...buttonSettings, disabled: e.target.checked })}
                        />
                        Disabled
                      </label>
                    </div>
                    
                    <div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={buttonSettings.loading}
                          onChange={(e) => setButtonSettings({ ...buttonSettings, loading: e.target.checked })}
                        />
                        Loading
                      </label>
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div>
                    <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600, textAlign: 'center' }}>Preview</h3>
                    <Button 
                      variant={buttonSettings.variant as any}
                      size={buttonSettings.size as any}
                      disabled={buttonSettings.disabled}
                      loading={buttonSettings.loading}
                      onClick={() => !buttonSettings.disabled && !buttonSettings.loading && alert('Button clicked!')}
                    >
                      Custom Button
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'groups' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Button Groups</h2>
              <p>Grouped button layouts for related actions</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Horizontal Button Group (with selection)</h3>
                  <ButtonGroup />
                </div>
                
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Action Button Groups</h3>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: '0' }}>
                      <Button variant="primary" icon={<Icon name="save" size={16} />}>
                        Save
                      </Button>
                      <Button variant="secondary" style={{ marginLeft: '1px' }}>
                        <Icon name="chevron-down" size={16} />
                      </Button>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0' }}>
                      <Button variant="secondary" icon={<Icon name="export" size={16} />}>
                        Export
                      </Button>
                      <Button variant="secondary" style={{ marginLeft: '1px' }}>
                        <Icon name="chevron-down" size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Toolbar Button Group</h3>
                  <div style={{ display: 'flex', gap: '0', background: '#f9fafb', padding: '0.5rem', borderRadius: '2px' }}>
                    <Button variant="ghost" size="small">
                      <Icon name="text-bold" size={16} />
                    </Button>
                    <Button variant="ghost" size="small">
                      <Icon name="text-italic" size={16} />
                    </Button>
                    <Button variant="ghost" size="small">
                      <Icon name="text-underline" size={16} />
                    </Button>
                    <Button variant="ghost" size="small">
                      <Icon name="text-strikethrough" size={16} />
                    </Button>
                    <div style={{ width: '1px', background: '#e5e7eb', margin: '0 0.5rem' }} />
                    <Button variant="ghost" size="small">
                      <Icon name="text-align-left" size={16} />
                    </Button>
                    <Button variant="ghost" size="small">
                      <Icon name="text-align-center" size={16} />
                    </Button>
                    <Button variant="ghost" size="small">
                      <Icon name="text-align-right" size={16} />
                    </Button>
                    <Button variant="ghost" size="small">
                      <Icon name="text-align-justify" size={16} />
                    </Button>
                    <div style={{ width: '1px', background: '#e5e7eb', margin: '0 0.5rem' }} />
                    <Button variant="ghost" size="small">
                      <Icon name="list-bulleted" size={16} />
                    </Button>
                    <Button variant="ghost" size="small">
                      <Icon name="list-numbered" size={16} />
                    </Button>
                    <Button variant="ghost" size="small">
                      <Icon name="text-indent-less" size={16} />
                    </Button>
                    <Button variant="ghost" size="small">
                      <Icon name="text-indent-more" size={16} />
                    </Button>
                    <div style={{ width: '1px', background: '#e5e7eb', margin: '0 0.5rem' }} />
                    <Button variant="ghost" size="small">
                      <Icon name="link" size={16} />
                    </Button>
                    <Button variant="ghost" size="small">
                      <Icon name="image" size={16} />
                    </Button>
                    <Button variant="ghost" size="small">
                      <Icon name="code" size={16} />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Pagination Button Group</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Button 
                      variant="secondary" 
                      size="small" 
                      disabled={selectedPage === 1}
                      onClick={() => setSelectedPage(Math.max(1, selectedPage - 1))}
                    >
                      <Icon name="chevron-left" size={16} />
                      Previous
                    </Button>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <Button 
                        variant="secondary" 
                        size="small" 
                        selected={selectedPage === 1} 
                        onClick={() => setSelectedPage(1)}
                        style={{ minWidth: '32px' }}
                      >1</Button>
                      <Button 
                        variant="secondary" 
                        size="small" 
                        selected={selectedPage === 2}
                        onClick={() => setSelectedPage(2)}
                        style={{ minWidth: '32px' }}
                      >2</Button>
                      <Button 
                        variant="secondary" 
                        size="small" 
                        selected={selectedPage === 3}
                        onClick={() => setSelectedPage(3)}
                        style={{ minWidth: '32px' }}
                      >3</Button>
                      <Button variant="secondary" size="small" disabled style={{ minWidth: '32px' }}>...</Button>
                      <Button 
                        variant="secondary" 
                        size="small" 
                        selected={selectedPage === 10}
                        onClick={() => setSelectedPage(10)}
                        style={{ minWidth: '32px' }}
                      >10</Button>
                    </div>
                    <Button 
                      variant="secondary" 
                      size="small"
                      disabled={selectedPage === 10}
                      onClick={() => setSelectedPage(Math.min(10, selectedPage + 1))}
                    >
                      Next
                      <Icon name="chevron-right" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'switches' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Switch (Toggle) Component</h2>
              <p>Interactive toggle switches for binary states</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Sizes */}
                <div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Switch Sizes</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <Switch size="small" />
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Small</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <Switch size="medium" />
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Medium (default)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <Switch size="large" />
                      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Large</span>
                    </div>
                  </div>
                </div>

                {/* States */}
                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Switch States</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    <div>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>Off State</p>
                      <Switch checked={false} onChange={(checked) => setSwitchStates({...switchStates, switch1: checked})} />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>On State</p>
                      <Switch checked={true} onChange={(checked) => setSwitchStates({...switchStates, switch2: checked})} />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>Disabled (Off)</p>
                      <Switch disabled={true} checked={false} />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>Disabled (On)</p>
                      <Switch disabled={true} checked={true} />
                    </div>
                  </div>
                </div>

                {/* Interactive Demo */}
                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: 600 }}>Interactive Switches</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    <div>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Dark Mode</p>
                      <Switch
                        checked={switchStates.switch1}
                        onChange={(checked) => setSwitchStates({...switchStates, switch1: checked})}
                        aria-label="Toggle dark mode"
                      />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Notifications</p>
                      <Switch
                        checked={switchStates.switch2}
                        onChange={(checked) => setSwitchStates({...switchStates, switch2: checked})}
                        aria-label="Toggle notifications"
                      />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Auto-Save</p>
                      <Switch
                        checked={switchStates.switch3}
                        onChange={(checked) => setSwitchStates({...switchStates, switch3: checked})}
                        aria-label="Toggle auto-save"
                      />
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '2rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    <strong>Tip:</strong> Switches are ideal for toggling features on/off. They provide clear visual feedback with icons and smooth animations.
                  </p>
                </div>
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
          <h3>Button Component Features</h3>
          <p>Everything you need for interactive button implementations</p>
        </div>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCategory}>
            <h4>🎨 Variants</h4>
            <ul>
              <li>✓ Primary buttons</li>
              <li>✓ Secondary buttons</li>
              <li>✓ Tertiary buttons</li>
              <li>✓ Destructive actions</li>
              <li>✓ Ghost & text buttons</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>📏 Sizes</h4>
            <ul>
              <li>✓ Extra small (xs)</li>
              <li>✓ Small size</li>
              <li>✓ Medium (default)</li>
              <li>✓ Large size</li>
              <li>✓ Responsive sizing</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>⚡ States</h4>
            <ul>
              <li>✓ Hover effects</li>
              <li>✓ Active/pressed state</li>
              <li>✓ Focus indicators</li>
              <li>✓ Disabled state</li>
              <li>✓ Loading spinner</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>✨ Features</h4>
            <ul>
              <li>✓ Icon support</li>
              <li>✓ Icon positioning</li>
              <li>✓ Full width option</li>
              <li>✓ Custom onClick</li>
              <li>✓ Keyboard navigation</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>👍 Accessibility</h4>
            <ul>
              <li>✓ ARIA attributes</li>
              <li>✓ Keyboard support</li>
              <li>✓ Focus management</li>
              <li>✓ Screen reader friendly</li>
              <li>✓ High contrast mode</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>🎯 Best Practices</h4>
            <ul>
              <li>✓ Clear action labels</li>
              <li>✓ Visual hierarchy</li>
              <li>✓ Consistent spacing</li>
              <li>✓ Proper contrast ratios</li>
              <li>✓ Touch-friendly targets</li>
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
    const examples: Record<string, string> = {
      variants: `// Button Variants
<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="tertiary">Tertiary Button</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="text">Text Button</Button>`,
      
      sizes: `// Button Sizes
<Button size="xs">Extra Small</Button>
<Button size="small">Small Button</Button>
<Button size="medium">Medium Button</Button>
<Button size="large">Large Button</Button>`,
      
      states: `// Button States
<Button disabled>Disabled Button</Button>
<Button loading>Loading...</Button>
<Button onClick={() => handleClick()}>Click Me</Button>`,
      
      icons: `// Buttons with Icons
<Button icon={<Icon name="add" />}>Add Item</Button>
<Button iconRight={<Icon name="arrow-right" />}>Continue</Button>
<Button variant="ghost">
  <Icon name="settings" />
</Button>`,
      
      groups: `// Button Groups
// Horizontal Button Group
<div style={{ display: 'flex', gap: 0 }}>
  <Button variant="secondary" style={{ borderRadius: '2px 0 0 2px' }}>
    List View
  </Button>
  <Button variant="primary" style={{ borderRadius: '0' }}>
    Grid View
  </Button>
  <Button variant="secondary" style={{ borderRadius: '0 2px 2px 0' }}>
    Chart View
  </Button>
</div>

// Action Button with Dropdown
<div style={{ display: 'flex' }}>
  <Button variant="primary" icon={<Icon name="save" />}>
    Save
  </Button>
  <Button variant="secondary" style={{ marginLeft: '1px' }}>
    <Icon name="chevron-down" />
  </Button>
</div>`,
      
      interactive: `// Custom Configuration
<Button
  variant="${buttonSettings.variant}"
  size="${buttonSettings.size}"
  disabled={${buttonSettings.disabled}}
  loading={${buttonSettings.loading}}
  onClick={() => console.log('clicked')}
>
  Custom Button
</Button>`,

      switches: `// Switch Sizes
<Switch size="small" />
<Switch size="medium" />
<Switch size="large" />

// Switch States
<Switch checked={false} />
<Switch checked={true} />
<Switch disabled={true} checked={false} />

// Interactive Switch
const [isOn, setIsOn] = useState(false);
<Switch
  checked={isOn}
  onChange={setIsOn}
  aria-label="Toggle dark mode"
/>`
    };

    return examples[demo as keyof typeof examples] || examples.variants;
  }
};

export default ButtonDemo;