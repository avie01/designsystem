import React, { useState } from 'react';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import Button from '../components/Button/Button';
import List, { ListItem } from '../components/List/List';
import styles from './TableDemo.module.css';

type DemoType = 'basic' | 'hierarchical' | 'multiselect' | 'interactive' | 'sizes' | 'emoji';
type ListSize = 'sm' | 'md' | 'lg';

const ListDemo: React.FC = () => {
  const [showCode, setShowCode] = useState(false);
  const [selectedDemo, setSelectedDemo] = useState<DemoType>('basic');
  const [selectedSize, setSelectedSize] = useState<ListSize>('md');

  // Sample data for different demo types
  const basicItems: ListItem[] = [
    { id: '1', label: 'Option', icon: 'folder' },
    { id: '2', label: 'Option', icon: 'folder' },
    { id: '3', label: 'Option', icon: 'folder' },
    { id: '4', label: 'Option', icon: 'folder', selected: true },
    { id: '5', label: 'Option', icon: 'folder' },
    { id: '6', label: 'Option', icon: 'folder' },
  ];

  const hierarchicalItems: ListItem[] = [
    {
      id: '1',
      label: 'Documents',
      icon: 'folder',
      children: [
        { id: '1-1', label: 'Reports', icon: 'folder' },
        { id: '1-2', label: 'Presentations', icon: 'folder' },
        { id: '1-3', label: 'Contracts', icon: 'folder' },
      ]
    },
    {
      id: '2',
      label: 'Projects',
      icon: 'folder',
      selected: true,
      children: [
        {
          id: '2-1',
          label: 'ODL Design System',
          icon: 'folder',
          children: [
            { id: '2-1-1', label: 'Components', icon: 'folder' },
            { id: '2-1-2', label: 'Documentation', icon: 'folder' },
            { id: '2-1-3', label: 'Examples', icon: 'folder' },
          ]
        },
        { id: '2-2', label: 'Marketing Site', icon: 'folder' },
        { id: '2-3', label: 'Mobile App', icon: 'folder' },
      ]
    },
    {
      id: '3',
      label: 'Archive',
      icon: 'folder',
      children: [
        { id: '3-1', label: 'Old Projects', icon: 'folder' },
        { id: '3-2', label: 'Backup Files', icon: 'folder' },
      ]
    },
  ];

  const multiselectItems: ListItem[] = [
    { id: '1', label: 'Task 1: Review design mockups', icon: 'checkbox' },
    { id: '2', label: 'Task 2: Update documentation', icon: 'checkbox', selected: true },
    { id: '3', label: 'Task 3: Test new features', icon: 'checkbox' },
    { id: '4', label: 'Task 4: Deploy to staging', icon: 'checkbox', selected: true },
    { id: '5', label: 'Task 5: Conduct user interviews', icon: 'checkbox' },
    { id: '6', label: 'Task 6: Analyze metrics', icon: 'checkbox', disabled: true },
  ];

  const interactiveItems: ListItem[] = [
    { id: '1', label: 'Notifications', icon: 'notification' },
    { id: '2', label: 'User Profile', icon: 'user' },
    { id: '3', label: 'Account Settings', icon: 'settings' },
    { id: '4', label: 'Security & Privacy', icon: 'security' },
    { id: '5', label: 'Billing & Payments', icon: 'receipt' },
    { id: '6', label: 'Help & Support', icon: 'help' },
    { id: '7', label: 'Sign Out', icon: 'logout', disabled: true },
  ];

  // Size demo items with captions for large size
  const sizeItems: ListItem[] = [
    { 
      id: '1', 
      label: 'Design System Documentation', 
      icon: 'folder',
      caption: 'Complete guidelines and component specifications'
    },
    { 
      id: '2', 
      label: 'Component Library', 
      icon: 'folder', 
      selected: true,
      caption: 'Reusable UI components and patterns'
    },
    { 
      id: '3', 
      label: 'Brand Assets', 
      icon: 'folder',
      caption: 'Logos, icons, and brand identity resources'
    },
    { 
      id: '4', 
      label: 'Templates & Examples', 
      icon: 'folder',
      caption: 'Ready-to-use templates and code examples'
    },
    { 
      id: '5', 
      label: 'Testing & QA', 
      icon: 'folder',
      caption: 'Automated tests and quality assurance tools'
    },
  ];

  // Emoji/Flag icon demo items
  const emojiItems: ListItem[] = [
    { id: '1', label: 'United States', icon: '🇺🇸' },
    { id: '2', label: 'United Kingdom', icon: '🇬🇧' },
    { id: '3', label: 'Canada', icon: '🇨🇦', selected: true },
    { id: '4', label: 'Australia', icon: '🇦🇺' },
    { id: '5', label: 'Germany', icon: '🇩🇪' },
    { id: '6', label: 'France', icon: '🇫🇷' },
    { id: '7', label: 'Japan', icon: '🇯🇵' },
    { id: '8', label: 'China', icon: '🇨🇳' },
  ];

  const demos = [
    {
      key: 'basic' as DemoType,
      label: 'Basic List',
      desc: 'Simple list with icons and selection',
      icon: '📋'
    },
    {
      key: 'hierarchical' as DemoType,
      label: 'Hierarchical',
      desc: 'Nested items with expand/collapse',
      icon: '🌳'
    },
    {
      key: 'multiselect' as DemoType,
      label: 'Multi-Select',
      desc: 'Multiple item selection',
      icon: '☑️'
    },
    {
      key: 'interactive' as DemoType,
      label: 'Interactive',
      desc: 'Clickable actions and states',
      icon: '⚡'
    },
    {
      key: 'sizes' as DemoType,
      label: 'Size Variations',
      desc: 'Small, medium, and large sizes',
      icon: '📏'
    },
    {
      key: 'emoji' as DemoType,
      label: 'Emoji Icons',
      desc: 'Lists with emoji and flag icons',
      icon: '🌍'
    }
  ];

  const getCurrentItems = (): ListItem[] => {
    switch (selectedDemo) {
      case 'hierarchical':
        return hierarchicalItems;
      case 'multiselect':
        return multiselectItems;
      case 'interactive':
        return interactiveItems;
      case 'sizes':
        return sizeItems;
      case 'emoji':
        return emojiItems;
      default:
        return basicItems;
    }
  };

  const getCodeExample = (demo: DemoType): string => {
    switch (demo) {
      case 'basic':
        return `import List from '../components/List/List';

const items = [
  { id: '1', label: 'Documents', icon: 'folder' },
  { id: '2', label: 'Images', icon: 'folder' },
  { id: '3', label: 'Videos', icon: 'folder', selected: true },
  { id: '4', label: 'Music', icon: 'folder' },
];

<List 
  items={items}
  selectable={true}
  onItemClick={(item) => console.log('Clicked:', item)}
/>`;

      case 'hierarchical':
        return `import List from '../components/List/List';

const items = [
  {
    id: '1',
    label: 'Documents',
    icon: 'folder',
    children: [
      { id: '1-1', label: 'Reports', icon: 'folder' },
      { id: '1-2', label: 'Presentations', icon: 'folder' },
    ]
  },
  {
    id: '2',
    label: 'Projects',
    icon: 'folder',
    children: [
      { id: '2-1', label: 'Website', icon: 'folder' },
      { id: '2-2', label: 'Mobile App', icon: 'folder' },
    ]
  }
];

<List 
  items={items}
  hierarchical={true}
  showExpandIcons={true}
  onItemClick={(item) => console.log('Clicked:', item)}
/>`;

      case 'multiselect':
        return `import List from '../components/List/List';

const items = [
  { id: '1', label: 'Task 1', icon: 'checkbox' },
  { id: '2', label: 'Task 2', icon: 'checkbox', selected: true },
  { id: '3', label: 'Task 3', icon: 'checkbox' },
  { id: '4', label: 'Task 4', icon: 'checkbox', disabled: true },
];

<List 
  items={items}
  multiSelect={true}
  onSelectionChange={(selected) => console.log('Selected:', selected)}
/>`;

      case 'interactive':
        return `import List from '../components/List/List';

const items = [
  { id: '1', label: 'User Profile', icon: 'user' },
  { id: '2', label: 'Settings', icon: 'settings' },
  { id: '3', label: 'Help', icon: 'help' },
  { id: '4', label: 'Sign Out', icon: 'logout', disabled: true },
];

<List 
  items={items}
  onItemClick={(item) => {
    if (item.id === '1') navigateToProfile();
    if (item.id === '2') openSettings();
    if (item.id === '3') showHelp();
  }}
/>`;

      case 'sizes':
        return `import List from '../components/List/List';

// Items with captions for large size
const items = [
  { 
    id: '1', 
    label: 'Design System', 
    icon: 'folder',
    caption: 'Complete design guidelines'
  },
  { 
    id: '2', 
    label: 'Components', 
    icon: 'folder',
    caption: 'Reusable UI components'
  },
];

// Small size - compact
<List items={items} size="sm" />

// Medium size - default
<List items={items} size="md" />

// Large size - with captions
<List items={items} size="lg" />`;

      case 'emoji':
        return `import List from '../components/List/List';

// Items with emoji/flag icons
const items = [
  { id: '1', label: 'United States', icon: '🇺🇸' },
  { id: '2', label: 'United Kingdom', icon: '🇬🇧' },
  { id: '3', label: 'Canada', icon: '🇨🇦', selected: true },
  { id: '4', label: 'Australia', icon: '🇦🇺' },
  { id: '5', label: 'Germany', icon: '🇩🇪' },
  { id: '6', label: 'France', icon: '🇫🇷' },
];

<List 
  items={items}
  onItemClick={(item) => console.log('Selected:', item)}
/>`;

      default:
        return '';
    }
  };

  const handleItemClick = (item: ListItem) => {
    console.log('Item clicked:', item);
  };

  const handleSelectionChange = (selectedItems: ListItem[]) => {
    console.log('Selection changed:', selectedItems);
  };

  return (
    <div className={styles.tableDemo}>
      <DemoBreadcrumb componentName="List" />

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>List Component</h1>
            <p>
              Flexible list component with support for hierarchical data, 
              multiple selection, and custom interactions. Perfect for navigation 
              menus, file browsers, task lists, and settings panels.
            </p>
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
          {demos.map(demo => (
            <button
              key={demo.key}
              className={`${styles.demoTab} ${selectedDemo === demo.key ? styles.active : ''}`}
              onClick={() => setSelectedDemo(demo.key)}
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
        <div className={styles.tableSection}>
          <div className={styles.sectionHeader}>
            <h2>{demos.find(d => d.key === selectedDemo)?.label} Demo</h2>
            <p>{demos.find(d => d.key === selectedDemo)?.desc}</p>
          </div>
          <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
            {selectedDemo === 'sizes' ? (
              <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {(['sm', 'md', 'lg'] as ListSize[]).map(size => (
                  <div key={size} style={{ minWidth: '300px', maxWidth: '400px' }}>
                    <h4 style={{ textAlign: 'center', marginBottom: '1rem', textTransform: 'capitalize' }}>
                      {size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'} Size
                    </h4>
                    <List
                      items={getCurrentItems()}
                      size={size}
                      onItemClick={handleItemClick}
                      onSelectionChange={handleSelectionChange}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <List
                  items={getCurrentItems()}
                  size={selectedDemo === 'sizes' ? selectedSize : 'md'}
                  hierarchical={selectedDemo === 'hierarchical'}
                  multiSelect={selectedDemo === 'multiselect'}
                  onItemClick={handleItemClick}
                  onSelectionChange={handleSelectionChange}
                  showExpandIcons={selectedDemo === 'hierarchical'}
                />
              </div>
            )}
          </div>
        </div>

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
          <h3>List Component Features</h3>
          <p>Everything you need for flexible list interfaces</p>
        </div>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCategory}>
            <h4>🎨 Core Features</h4>
            <ul>
              <li>✓ Three size variations (sm, md, lg)</li>
              <li>✓ Customizable icons</li>
              <li>✓ Single & multi-selection</li>
              <li>✓ Disabled states</li>
              <li>✓ Hover effects</li>
              <li>✓ Click handlers</li>
              <li>✓ Caption support (large size)</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>🌳 Hierarchical</h4>
            <ul>
              <li>✓ Nested list items</li>
              <li>✓ Expand/collapse</li>
              <li>✓ Multi-level nesting</li>
              <li>✓ Visual indentation</li>
              <li>✓ Tree navigation</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>⚡ Advanced</h4>
            <ul>
              <li>✓ Custom item renderers</li>
              <li>✓ Selection callbacks</li>
              <li>✓ Keyboard navigation</li>
              <li>✓ Dynamic data</li>
              <li>✓ State management</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>🎯 Use Cases</h4>
            <ul>
              <li>✓ Navigation menus</li>
              <li>✓ File browsers</li>
              <li>✓ Task lists</li>
              <li>✓ Settings panels</li>
              <li>✓ Sidebar content</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>♿ Accessibility</h4>
            <ul>
              <li>✓ ARIA support</li>
              <li>✓ Keyboard navigation</li>
              <li>✓ Screen reader friendly</li>
              <li>✓ Focus management</li>
              <li>✓ Semantic markup</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>🎨 Customization</h4>
            <ul>
              <li>✓ ODL Theme compliant</li>
              <li>✓ CSS custom properties</li>
              <li>✓ Flexible styling</li>
              <li>✓ Icon customization</li>
              <li>✓ Layout options</li>
            </ul>
          </div>
        </div>
      </div>

      <BackToTop />
    </div>
  );
};

export default ListDemo;