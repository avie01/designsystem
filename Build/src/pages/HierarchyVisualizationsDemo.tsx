import React, { useState } from 'react';
import MillerColumns from '../components/MillerColumns/MillerColumns';
import BreadcrumbGrid from '../components/BreadcrumbGrid/BreadcrumbGrid';
import Treemap from '../components/Treemap/Treemap';
import Button from '../components/Button/Button';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import styles from './TableDemo.module.css';

const HierarchyVisualizationsDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'miller' | 'grid' | 'treemap'>('miller');
  const [showCode, setShowCode] = useState(false);

  // Miller Columns Data
  const millerData = [
    {
      id: 'docs',
      label: 'Documents',
      type: 'folder' as const,
      children: [
        {
          id: 'work',
          label: 'Work',
          type: 'folder' as const,
          children: [
            { id: 'reports', label: 'Reports', type: 'folder' as const, children: [
              { id: 'q1', label: 'Q1-2024.pdf', type: 'file' as const },
              { id: 'q2', label: 'Q2-2024.pdf', type: 'file' as const }
            ]},
            { id: 'presentations', label: 'Presentations', type: 'folder' as const, children: [] }
          ]
        },
        {
          id: 'personal',
          label: 'Personal',
          type: 'folder' as const,
          children: [
            { id: 'photos', label: 'Photos', type: 'folder' as const, children: [] },
            { id: 'finance', label: 'Finance', type: 'folder' as const, children: [] }
          ]
        }
      ]
    },
    {
      id: 'downloads',
      label: 'Downloads',
      type: 'folder' as const,
      children: [
        { id: 'software', label: 'Software', type: 'folder' as const, children: [] },
        { id: 'media', label: 'Media', type: 'folder' as const, children: [] }
      ]
    },
    {
      id: 'applications',
      label: 'Applications',
      type: 'folder' as const,
      children: []
    }
  ];

  // BreadcrumbGrid Data - Work-focused with meaningful metadata
  const gridData = [
    {
      id: 'project-alpha',
      label: 'Project Alpha - Q4 Launch',
      type: 'folder' as const,
      status: 'review' as const,
      priority: 'urgent' as const,
      fileCount: 24,
      modified: '2 hours ago',
      owner: 'Sarah Chen',
      sharedWith: 5,
      description: 'Critical Q4 product launch materials',
      children: [
        { 
          id: 'requirements', 
          label: 'Requirements-v3.docx', 
          type: 'file' as const, 
          size: '245 KB', 
          modified: '1 hour ago',
          status: 'approved' as const,
          owner: 'You',
          priority: 'high' as const,
          sharedWith: 3
        },
        { 
          id: 'api-spec', 
          label: 'API-Specification.pdf', 
          type: 'file' as const, 
          size: '2.1 MB', 
          modified: '3 days ago',
          status: 'review' as const,
          owner: 'Mike Johnson',
          priority: 'urgent' as const,
          sharedWith: 8
        },
        { 
          id: 'designs', 
          label: 'UI Designs', 
          type: 'folder' as const, 
          fileCount: 12,
          modified: '1 day ago',
          status: 'approved' as const,
          children: [] 
        }
      ]
    },
    {
      id: 'quarterly-reports',
      label: 'Q3 Financial Reports',
      type: 'folder' as const,
      status: 'approved' as const,
      priority: 'high' as const,
      fileCount: 8,
      modified: 'Yesterday',
      owner: 'Finance Team',
      sharedWith: 12,
      description: 'Board meeting materials - confidential',
      children: [
        { 
          id: 'revenue', 
          label: 'Revenue-Analysis.xlsx', 
          type: 'file' as const, 
          size: '1.8 MB',
          status: 'approved' as const,
          priority: 'high' as const,
          owner: 'Jennifer Liu'
        },
        { 
          id: 'forecast', 
          label: 'Q4-Forecast.pptx', 
          type: 'file' as const, 
          size: '5.2 MB',
          status: 'draft' as const,
          owner: 'You'
        }
      ]
    },
    {
      id: 'contract',
      label: 'Vendor-Contract-2024.pdf',
      type: 'file' as const,
      size: '456 KB',
      modified: '3 hours ago',
      status: 'review' as const,
      priority: 'urgent' as const,
      owner: 'Legal Team',
      sharedWith: 4,
      description: 'Needs signature by EOD'
    },
    {
      id: 'presentation',
      label: 'Team-Strategy-2025.pptx',
      type: 'file' as const,
      size: '12.4 MB',
      modified: 'Today, 9:30 AM',
      status: 'draft' as const,
      priority: 'medium' as const,
      owner: 'You',
      sharedWith: 0,
      description: 'Working draft for Monday meeting'
    },
    {
      id: 'compliance',
      label: 'Compliance Audit',
      type: 'folder' as const,
      fileCount: 32,
      modified: '5 days ago',
      status: 'approved' as const,
      priority: 'low' as const,
      owner: 'Compliance Dept',
      sharedWith: 6,
      description: 'Annual audit documentation'
    },
    {
      id: 'training',
      label: 'New Employee Training',
      type: 'folder' as const,
      fileCount: 15,
      modified: '1 week ago',
      status: 'approved' as const,
      owner: 'HR Team',
      sharedWith: 20,
      description: 'Onboarding materials and guides'
    }
  ];

  // Treemap Data
  const treemapData = [
    { id: 'engineering', name: 'Engineering', value: 45000000, color: '#3B82F6' },
    { id: 'marketing', name: 'Marketing', value: 25000000, color: '#10B981' },
    { id: 'sales', name: 'Sales', value: 20000000, color: '#F59E0B' },
    { id: 'operations', name: 'Operations', value: 15000000, color: '#8B5CF6' },
    { id: 'hr', name: 'Human Resources', value: 8000000, color: '#EC4899' },
    { id: 'finance', name: 'Finance', value: 7000000, color: '#06B6D4' },
    { id: 'legal', name: 'Legal', value: 5000000, color: '#F43F5E' },
    { id: 'admin', name: 'Administration', value: 3000000, color: '#6B7280' }
  ];

  const getCodeExample = (demo: string) => {
    switch (demo) {
      case 'miller':
        return `import MillerColumns from '../components/MillerColumns/MillerColumns';

const MillerExample = () => {
  const data = [
    {
      id: 'docs',
      label: 'Documents',
      type: 'folder',
      children: [
        {
          id: 'work',
          label: 'Work',
          type: 'folder',
          children: [
            { id: 'report', label: 'Report.pdf', type: 'file' }
          ]
        }
      ]
    }
  ];

  return (
    <MillerColumns
      data={data}
      onSelect={(path) => console.log('Selected path:', path)}
      maxColumns={4}
      columnWidth={250}
      height={400}
    />
  );
};`;

      case 'grid':
        return `import BreadcrumbGrid from '../components/BreadcrumbGrid/BreadcrumbGrid';

const GridExample = () => {
  const data = [
    {
      id: 'folder1',
      label: 'Project Docs',
      type: 'folder',
      modified: '2 days ago',
      children: [
        { 
          id: 'file1', 
          label: 'README.md', 
          type: 'file',
          size: '4.2 KB',
          modified: '1 hour ago'
        }
      ]
    }
  ];

  return (
    <BreadcrumbGrid
      data={data}
      onItemClick={(item) => console.log('Clicked:', item)}
      gridColumns={6}
      showDetails={true}
    />
  );
};`;

      case 'treemap':
        return `import Treemap from '../components/Treemap/Treemap';

const TreemapExample = () => {
  const data = [
    { id: 'eng', name: 'Engineering', value: 450, color: '#3B82F6' },
    { id: 'sales', name: 'Sales', value: 250, color: '#10B981' },
    { id: 'marketing', name: 'Marketing', value: 200, color: '#F59E0B' },
    { id: 'hr', name: 'HR', value: 100, color: '#8B5CF6' }
  ];

  return (
    <Treemap
      data={data}
      colorScheme="default"
      showLabels={true}
      showValues={true}
      height={400}
      onClick={(node) => console.log('Clicked:', node)}
    />
  );
};`;

      default:
        return '';
    }
  };

  return (
    <div className={styles.tableDemo}>
      <DemoBreadcrumb componentName="Hierarchy Visualizations" />
      
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>Hierarchy Visualizations</h1>
            <p>Multiple ways to display hierarchical data, each optimized for different use cases</p>
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
            { key: 'miller', label: 'Miller Columns', desc: 'macOS Finder style', icon: '🗂️' },
            { key: 'grid', label: 'Breadcrumb Grid', desc: 'Visual navigation', icon: '🎯' },
            { key: 'treemap', label: 'Treemap', desc: 'Size proportions', icon: '📊' }
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
        {selectedDemo === 'miller' && (
          <div>
            <h2>Miller Columns Navigation</h2>
            <p style={{ marginBottom: '24px', color: '#6B7280' }}>
              Progressive disclosure pattern popularized by macOS Finder. Click folders to navigate deeper.
            </p>
            <MillerColumns
              data={millerData}
              onSelect={(path) => console.log('Selected path:', path)}
              maxColumns={4}
              columnWidth={250}
              height={400}
              showIcons={true}
            />
          </div>
        )}

        {selectedDemo === 'grid' && (
          <div>
            <h2>Breadcrumb Grid View</h2>
            <p style={{ marginBottom: '24px', color: '#6B7280' }}>
              Visual file browser with breadcrumb navigation. Click folders to navigate, click files to select.
            </p>
            <BreadcrumbGrid
              data={gridData}
              onNavigate={(path) => console.log('Navigated to:', path)}
              onItemClick={(item) => console.log('Clicked item:', item)}
              gridColumns={6}
              showDetails={true}
            />
          </div>
        )}

        {selectedDemo === 'treemap' && (
          <div>
            <h2>Treemap Visualization</h2>
            <p style={{ marginBottom: '24px', color: '#6B7280' }}>
              Budget allocation by department. Size represents budget amount, hover for details.
            </p>
            <Treemap
              data={treemapData}
              colorScheme="default"
              showLabels={true}
              showValues={true}
              height={400}
              onClick={(node) => console.log('Clicked:', node)}
            />
          </div>
        )}

        {/* Code Panel */}
        {showCode && (
          <div className={styles.codePanel} style={{ marginTop: '32px' }}>
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
          <h3>Hierarchy Visualization Features</h3>
          <p>Everything you need for displaying hierarchical and tree-structured data</p>
        </div>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCategory}>
            <h4>🎨 Core Features</h4>
            <ul>
              <li>✓ Multiple visualization types</li>
              <li>✓ Interactive navigation</li>
              <li>✓ Collapsible nodes</li>
              <li>✓ Hover states and tooltips</li>
              <li>✓ ODL theme integration</li>
              <li>✓ Carbon icons support</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>⚡ Advanced Features</h4>
            <ul>
              <li>✓ Resizable panes</li>
              <li>✓ Progressive disclosure</li>
              <li>✓ Metadata display</li>
              <li>✓ Custom color schemes</li>
              <li>✓ Multi-level nesting</li>
              <li>✓ State management</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>🎯 Visualization Types</h4>
            <ul>
              <li>✓ Miller Columns (Finder-style)</li>
              <li>✓ Breadcrumb + Grid</li>
              <li>✓ Organization Charts</li>
              <li>✓ Treemaps</li>
              <li>✓ Nested Accordions</li>
              <li>✓ Dual-pane Explorer</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>🚀 Performance</h4>
            <ul>
              <li>✓ Efficient rendering</li>
              <li>✓ Smooth animations</li>
              <li>✓ Optimized for large datasets</li>
              <li>✓ Lazy loading support</li>
              <li>✓ Virtual scrolling ready</li>
              <li>✓ Memory efficient</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>♿ Accessibility</h4>
            <ul>
              <li>✓ Keyboard navigation</li>
              <li>✓ ARIA labels</li>
              <li>✓ Focus management</li>
              <li>✓ Screen reader support</li>
              <li>✓ High contrast mode</li>
              <li>✓ WCAG 2.1 compliant</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>💼 Use Cases</h4>
            <ul>
              <li>✓ File browsers</li>
              <li>✓ Organization structures</li>
              <li>✓ Category navigation</li>
              <li>✓ Data analysis</li>
              <li>✓ Project hierarchies</li>
              <li>✓ Content management</li>
            </ul>
          </div>
        </div>
      </div>

      <BackToTop />
    </div>
  );
};

export default HierarchyVisualizationsDemo;