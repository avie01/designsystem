import React, { useState } from 'react';
import Chip from '../components/Chip/Chip';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import Icon from '../components/Icon/Icon';
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

const ChipDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'colors' | 'icons' | 'interactive' | 'status' | 'tags' | 'custom'>('colors');
  const [showCode, setShowCode] = useState(false);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [tags, setTags] = useState(['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML']);
  const [newTag, setNewTag] = useState('');

  const handleChipClick = (chipId: string) => {
    setSelectedChips(prev => 
      prev.includes(chipId) 
        ? prev.filter(id => id !== chipId)
        : [...prev, chipId]
    );
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const getCodeExample = (demo: string) => {
    const examples: Record<string, string> = {
      colors: `// ODL chip color variants
<Chip label="Blue chip" variant="blue" />
<Chip label="Light green" variant="lightGreen" />
<Chip label="Dark green" variant="darkGreen" />
<Chip label="Orange chip" variant="orange" />
<Chip label="Red chip" variant="red" />
<Chip label="Yellow chip" variant="yellow" />
<Chip label="Purple chip" variant="purple" />
<Chip label="Teal chip" variant="teal" />
<Chip label="Burgundy" variant="burgundy" />
<Chip label="Grey chip" variant="grey" />
<Chip label="White chip" variant="white" />

// Size variants
<Chip label="Small" variant="blue" size="sm" />
<Chip label="Medium" variant="blue" size="md" />
<Chip label="Large" variant="blue" size="lg" />

// States
<Chip label="Normal" variant="blue" />
<Chip label="Disabled" variant="blue" disabled />
<Chip label="Error" variant="red" error />`,

      icons: `// Chips with icons
<Chip 
  label="Document" 
  variant="blue" 
  showDocumentIcon 
/>

<Chip 
  label="Alert" 
  variant="red" 
  showInfoIcon 
/>

<Chip 
  label="Custom icon" 
  variant="lightGreen" 
  iconName="checkmark" 
/>

// Icons on both sides
<Chip 
  label="Important" 
  variant="orange" 
  showDocumentIcon
  showInfoIcon 
/>`,


      interactive: `// Clickable chips
<Chip 
  label="Click me" 
  variant="blue"
  clickable 
  onClick={() => console.log('Chip clicked!')} 
/>

// Selection state management
const [selected, setSelected] = useState(false);

<Chip 
  label={selected ? "Selected" : "Click to select"}
  variant={selected ? "blue" : "grey"}
  clickable 
  onClick={() => setSelected(!selected)} 
/>`,

      status: `// Status indicator chips
<Chip label="Active" variant="lightGreen" />
<Chip label="Pending" variant="yellow" />
<Chip label="Inactive" variant="grey" />
<Chip label="Error" variant="red" />
<Chip label="New" variant="blue" />

// With icons
<Chip label="Draft" variant="grey" iconName="edit" />
<Chip label="Published" variant="lightGreen" iconName="checkmark" />
<Chip label="Archived" variant="orange" iconName="archive" />`,

      tags: `// Tag management system
const [tags, setTags] = useState(['React', 'TypeScript']);

{tags.map(tag => (
  <Chip 
    key={tag}
    label={tag}
    variant="blue"
    iconName="tag"
    clickable
    onClick={() => removeTag(tag)}
  />
))}

// Add new tag functionality
<input 
  value={newTag} 
  onChange={(e) => setNewTag(e.target.value)}
  onKeyPress={(e) => e.key === 'Enter' && addTag()}
/>`,

      custom: `// Document chips with icons
<Chip 
  label="Report.pdf" 
  variant="blue"
  showDocumentIcon
  showInfoIcon
/>

// Metric chips
<div style={{ display: 'flex', gap: '8px' }}>
  <Chip label="Users: 1,234" variant="blue" iconName="user" />
  <Chip label="Revenue: $45.6K" variant="lightGreen" iconName="currency" />
  <Chip label="Growth: +12%" variant="lightGreen" iconName="trending-up" />
</div>

// Category chips
<Chip label="Technology" variant="purple" iconName="application" />
<Chip label="Business" variant="teal" iconName="briefcase" />
<Chip label="Design" variant="orange" iconName="paint-brush" />`
    };

    return examples[demo] || '';
  };

  return (
    <div className={styles.tableDemo}>
      {/* Breadcrumb Navigation */}
      <DemoBreadcrumb componentName="Chip Component" />
      
      {/* Enhanced Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>Chip Component Showcase</h1>
            <p>Compact elements for displaying small pieces of information, tags, or status indicators</p>
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
            { key: 'colors', label: 'Colors', desc: 'ODL color palette', icon: '🎨' },
            { key: 'icons', label: 'With Icons', desc: 'Carbon icon integration', icon: '🎯' },
            { key: 'interactive', label: 'Interactive', desc: 'Clickable chips', icon: '👆' },
            { key: 'status', label: 'Status', desc: 'Status indicators', icon: '🚦' },
            { key: 'tags', label: 'Tags', desc: 'Tag management', icon: '🏷️' },
            { key: 'custom', label: 'Custom', desc: 'Advanced examples', icon: '✨' }
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
              <h2>ODL Chip Colors</h2>
              <p>Complete color palette based on ODL design specifications</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Light Colors</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <Chip label="Blue" variant="blue" />
                  <Chip label="Light Green" variant="lightGreen" />
                  <Chip label="Orange" variant="orange" />
                  <Chip label="Yellow" variant="yellow" />
                  <Chip label="Purple" variant="purple" />
                  <Chip label="Teal" variant="teal" />
                  <Chip label="Red" variant="red" />
                  <Chip label="Grey" variant="grey" />
                  <Chip label="White" variant="white" />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Size Variants</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
                  <Chip label="Small" variant="blue" size="sm" />
                  <Chip label="Medium" variant="blue" size="md" />
                  <Chip label="Large" variant="blue" size="lg" />
                </div>
              </div>
              
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Dark Colors</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <Chip label="Dark Green" variant="darkGreen" />
                  <Chip label="Burgundy" variant="burgundy" />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>States</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280', minWidth: '80px' }}>Normal:</span>
                    <Chip label="Active" variant="blue" />
                    <Chip label="Clickable" variant="blue" clickable onClick={() => console.log('Clicked!')} />
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280', minWidth: '80px' }}>Disabled:</span>
                    <Chip label="Disabled" variant="blue" disabled />
                    <Chip label="Disabled Clickable" variant="blue" clickable disabled onClick={() => console.log('Should not click')} />
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280', minWidth: '80px' }}>Error:</span>
                    <Chip label="Error State" variant="red" error />
                    <Chip label="Error Clickable" variant="red" error clickable onClick={() => console.log('Error clicked')} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'icons' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Chips with Icons</h2>
              <p>Carbon Design System icons integrated with chips</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Document Icons</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <Chip label="Report.pdf" variant="blue" showDocumentIcon />
                  <Chip label="Spreadsheet.xlsx" variant="lightGreen" showDocumentIcon />
                  <Chip label="Presentation.pptx" variant="orange" showDocumentIcon />
                  <Chip label="Archive.zip" variant="grey" showDocumentIcon />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Info Icons</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <Chip label="Important" variant="red" showInfoIcon />
                  <Chip label="Warning" variant="yellow" showInfoIcon />
                  <Chip label="Notice" variant="blue" showInfoIcon />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Custom Icons</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <Chip label="Approved" variant="lightGreen" iconName="checkmark" />
                  <Chip label="Rejected" variant="red" iconName="close" />
                  <Chip label="In Progress" variant="yellow" iconName="time" />
                  <Chip label="Locked" variant="grey" iconName="locked" />
                  <Chip label="Favorite" variant="purple" iconName="star" />
                  <Chip label="Settings" variant="teal" iconName="settings" />
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'interactive' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Interactive Chips</h2>
              <p>Chips that respond to user interactions for selection and actions</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Clickable Chips</h3>
                <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>Click the chips below to select/deselect them</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {['React', 'Vue', 'Angular', 'Svelte', 'Next.js'].map(tech => (
                    <Chip
                      key={tech}
                      label={tech}
                      variant={selectedChips.includes(tech) ? 'blue' : 'grey'}
                      iconName={selectedChips.includes(tech) ? 'checkmark' : undefined}
                      clickable
                      onClick={() => handleChipClick(tech)}
                    />
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Filter Selection</h3>
                <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>Use chips for multi-select filters</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {['All', 'Active', 'Pending', 'Completed', 'Archived'].map(filter => (
                    <Chip
                      key={filter}
                      label={filter}
                      variant={selectedChips.includes(filter) ? 'blue' : 'white'}
                      iconName={selectedChips.includes(filter) ? 'checkmark' : undefined}
                      clickable
                      onClick={() => handleChipClick(filter)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'status' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Status Chips</h2>
              <p>Visual indicators for different states and conditions</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>System Status</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <Chip label="Online" variant="lightGreen" iconName="checkmark-filled" />
                  <Chip label="Offline" variant="red" iconName="error-filled" />
                  <Chip label="Maintenance" variant="yellow" iconName="warning" />
                  <Chip label="Beta" variant="blue" iconName="beta" />
                  <Chip label="Deprecated" variant="grey" iconName="subtract" />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Document Status</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <Chip label="Draft" variant="grey" iconName="edit" />
                  <Chip label="In review" variant="yellow" iconName="view" />
                  <Chip label="Approved" variant="lightGreen" iconName="checkmark" />
                  <Chip label="Published" variant="lightGreen" showDocumentIcon />
                  <Chip label="Archived" variant="grey" iconName="archive" />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Priority Levels</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <Chip label="Critical" variant="red" showInfoIcon />
                  <Chip label="High" variant="orange" showInfoIcon />
                  <Chip label="Medium" variant="yellow" />
                  <Chip label="Low" variant="grey" />
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'tags' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Tag Management</h2>
              <p>Dynamic tag system with add and remove functionality</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Removable Tags</h3>
                <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>Click on any tag to remove it</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                  {tags.map(tag => (
                    <div key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Chip
                        label={tag}
                        variant="blue"
                        iconName="tag"
                        clickable
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    placeholder="Add new tag..."
                    style={{
                      padding: '6px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '14px',
                      minWidth: '200px'
                    }}
                  />
                  <Button size="small" onClick={handleAddTag}>Add Tag</Button>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Category Tags</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <Chip label="Technology" variant="purple" iconName="application" />
                  <Chip label="Business" variant="teal" iconName="briefcase" />
                  <Chip label="Design" variant="orange" iconName="paint-brush" />
                  <Chip label="Marketing" variant="lightGreen" iconName="chart-line" />
                  <Chip label="Sales" variant="blue" iconName="shopping-cart" />
                  <Chip label="Support" variant="yellow" iconName="headset" />
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'custom' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Custom Examples</h2>
              <p>Advanced use cases and combinations</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Metric Chips</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <Chip label="Users: 1,234" variant="blue" iconName="user" />
                  <Chip label="Revenue: $45.6K" variant="lightGreen" iconName="currency" />
                  <Chip label="Growth: +12%" variant="lightGreen" iconName="trending-up" />
                  <Chip label="Bounce: 2.3%" variant="yellow" iconName="analytics" />
                  <Chip label="Errors: 3" variant="red" iconName="error" />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>User Roles</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <Chip label="Admin" variant="burgundy" iconName="user-admin" />
                  <Chip label="Editor" variant="orange" iconName="edit" />
                  <Chip label="Viewer" variant="blue" iconName="view" />
                  <Chip label="Guest" variant="grey" iconName="user" />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Mixed Usage</h3>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1rem',
                  padding: '1rem',
                  background: '#f9fafb',
                  borderRadius: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280', minWidth: '80px' }}>Status:</span>
                    <Chip label="Active" variant="lightGreen" iconName="checkmark-filled" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280', minWidth: '80px' }}>Priority:</span>
                    <Chip label="High" variant="orange" showInfoIcon />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280', minWidth: '80px' }}>Tags:</span>
                    <Chip label="Frontend" variant="purple" iconName="application" />
                    <Chip label="React" variant="blue" iconName="logo-react" />
                    <Chip label="TypeScript" variant="teal" iconName="code" />
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
          <h3>Chip Component Features</h3>
          <p>Everything you need for displaying tags, labels, and status indicators</p>
        </div>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCategory}>
            <h4>🎨 Core Features</h4>
            <ul>
              <li>✓ 6 color variants</li>
              <li>✓ 3 size options</li>
              <li>✓ Filled and outlined styles</li>
              <li>✓ Automatic text casing</li>
              <li>✓ Overflow handling</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>⚡ Interactive</h4>
            <ul>
              <li>✓ Clickable chips</li>
              <li>✓ Hover effects</li>
              <li>✓ Selection states</li>
              <li>✓ Keyboard accessible</li>
              <li>✓ Active animations</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>🎯 Customization</h4>
            <ul>
              <li>✓ Custom className support</li>
              <li>✓ Flexible sizing</li>
              <li>✓ Color variants</li>
              <li>✓ Style combinations</li>
              <li>✓ Event handlers</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>🚀 Performance</h4>
            <ul>
              <li>✓ Lightweight component</li>
              <li>✓ No external dependencies</li>
              <li>✓ Efficient rendering</li>
              <li>✓ Optimized animations</li>
              <li>✓ Minimal DOM updates</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>👍 Accessibility</h4>
            <ul>
              <li>✓ ARIA role support</li>
              <li>✓ Keyboard navigation</li>
              <li>✓ Focus indicators</li>
              <li>✓ Screen reader friendly</li>
              <li>✓ Semantic HTML</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>💡 Use Cases</h4>
            <ul>
              <li>✓ Status indicators</li>
              <li>✓ Category labels</li>
              <li>✓ Tag management</li>
              <li>✓ Filter options</li>
              <li>✓ Metadata display</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <BackToTop />
    </div>
  );
};

export default ChipDemo;