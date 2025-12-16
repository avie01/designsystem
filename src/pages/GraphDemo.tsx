import React, { useState } from 'react';
import Graph, { chartColors } from '../components/Graph/Graph';
import Button from '../components/Button/Button';
import Icon from '../components/Icon/Icon';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import ODLTheme from '../styles/ODLTheme';
import styles from './TableDemo.module.css';

type DemoType = 'line' | 'area' | 'bar' | 'pie' | 'radar' | 'scatter' | 'composed' | 'radial' | 'dashboard' | 'compact';

const GraphDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<DemoType>('line');
  const [showCode, setShowCode] = useState(false);
  const [animated, setAnimated] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [curved, setCurved] = useState(true);
  const [gradient, setGradient] = useState(true);

  // Sample data for different chart types
  const lineData = [
    { name: 'Jan', applications: 4000, approved: 2400, rejected: 400 },
    { name: 'Feb', applications: 3000, approved: 1398, rejected: 210 },
    { name: 'Mar', applications: 2000, approved: 9800, rejected: 290 },
    { name: 'Apr', applications: 2780, approved: 3908, rejected: 200 },
    { name: 'May', applications: 1890, approved: 4800, rejected: 181 },
    { name: 'Jun', applications: 2390, approved: 3800, rejected: 250 },
    { name: 'Jul', applications: 3490, approved: 4300, rejected: 210 }
  ];

  const areaData = [
    { month: 'Jan', residential: 65, commercial: 28, industrial: 12 },
    { month: 'Feb', residential: 59, commercial: 48, industrial: 15 },
    { month: 'Mar', residential: 80, commercial: 40, industrial: 18 },
    { month: 'Apr', residential: 81, commercial: 19, industrial: 22 },
    { month: 'May', residential: 56, commercial: 86, industrial: 25 },
    { month: 'Jun', residential: 55, commercial: 27, industrial: 30 }
  ];

  const barData = [
    { name: 'Planning', current: 12, previous: 8 },
    { name: 'Building', current: 19, previous: 15 },
    { name: 'Environmental', current: 3, previous: 5 },
    { name: 'Heritage', current: 5, previous: 3 },
    { name: 'Subdivision', current: 8, previous: 7 },
    { name: 'Other', current: 2, previous: 4 }
  ];

  const pieData = [
    { name: 'Approved', value: 400 },
    { name: 'Pending', value: 300 },
    { name: 'Under Review', value: 200 },
    { name: 'Rejected', value: 100 },
    { name: 'Withdrawn', value: 50 }
  ];

  const radarData = [
    { subject: 'Timeliness', A: 120, B: 110, fullMark: 150 },
    { subject: 'Compliance', A: 98, B: 130, fullMark: 150 },
    { subject: 'Quality', A: 86, B: 130, fullMark: 150 },
    { subject: 'Communication', A: 99, B: 100, fullMark: 150 },
    { subject: 'Documentation', A: 85, B: 90, fullMark: 150 },
    { subject: 'Efficiency', A: 65, B: 85, fullMark: 150 }
  ];

  const scatterData = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
    { x: 180, y: 350, z: 300 },
    { x: 130, y: 220, z: 250 },
    { x: 160, y: 380, z: 450 },
    { x: 190, y: 420, z: 380 }
  ];

  const composedData = [
    { name: 'Week 1', applications: 590, processed: 800, efficiency: 1400 },
    { name: 'Week 2', applications: 868, processed: 967, efficiency: 1506 },
    { name: 'Week 3', applications: 1397, processed: 1098, efficiency: 989 },
    { name: 'Week 4', applications: 1480, processed: 1200, efficiency: 1228 },
    { name: 'Week 5', applications: 1520, processed: 1108, efficiency: 1100 }
  ];

  const radialData = [
    { name: 'Q1 Target', value: 85, fill: chartColors.blue },
    { name: 'Q2 Target', value: 65, fill: chartColors.emerald },
    { name: 'Q3 Target', value: 75, fill: chartColors.amber },
    { name: 'Q4 Target', value: 90, fill: chartColors.violet }
  ];

  const getCodeExample = (demo: DemoType): string => {
    switch (demo) {
      case 'line':
        return `import Graph from '../components/Graph/Graph';

const lineData = [
  { name: 'Jan', applications: 4000, approved: 2400, rejected: 400 },
  { name: 'Feb', applications: 3000, approved: 1398, rejected: 210 },
  { name: 'Mar', applications: 2000, approved: 9800, rejected: 290 },
  // ... more data
];

// Line chart with multiple series
<Graph
  type="line"
  data={lineData}
  dataKeys={['applications', 'approved', 'rejected']}
  xAxisKey="name"
  height={400}
  curved={true}
  animated={true}
  showGrid={true}
  showLegend={true}
/>`;

      case 'area':
        return `import Graph from '../components/Graph/Graph';

const areaData = [
  { month: 'Jan', residential: 65, commercial: 28, industrial: 12 },
  { month: 'Feb', residential: 59, commercial: 48, industrial: 15 },
  // ... more data
];

// Area chart with gradient fill
<Graph
  type="area"
  data={areaData}
  dataKeys={['residential', 'commercial', 'industrial']}
  xAxisKey="month"
  height={400}
  gradient={true}
  stacked={true}
  animated={true}
/>`;

      case 'bar':
        return `import Graph from '../components/Graph/Graph';

const barData = [
  { name: 'Planning', current: 12, previous: 8 },
  { name: 'Building', current: 19, previous: 15 },
  // ... more data
];

// Grouped bar chart
<Graph
  type="bar"
  data={barData}
  dataKeys={['current', 'previous']}
  xAxisKey="name"
  height={400}
  animated={true}
/>

// Stacked bar chart
<Graph
  type="bar"
  data={barData}
  dataKeys={['current', 'previous']}
  xAxisKey="name"
  stacked={true}
  height={400}
/>`;

      case 'pie':
        return `import Graph from '../components/Graph/Graph';

const pieData = [
  { name: 'Approved', value: 400 },
  { name: 'Pending', value: 300 },
  { name: 'Under Review', value: 200 },
  // ... more data
];

// Pie chart with custom colors
<Graph
  type="pie"
  data={pieData}
  dataKeys={['value']}
  height={400}
  animated={true}
/>`;

      case 'radar':
        return `import Graph from '../components/Graph/Graph';

const radarData = [
  { subject: 'Timeliness', A: 120, B: 110, fullMark: 150 },
  { subject: 'Compliance', A: 98, B: 130, fullMark: 150 },
  // ... more data
];

// Radar chart for comparison
<Graph
  type="radar"
  data={radarData}
  dataKeys={['A', 'B']}
  xAxisKey="subject"
  height={400}
  animated={true}
/>`;

      case 'scatter':
        return `import Graph from '../components/Graph/Graph';

const scatterData = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  // ... more data
];

// Scatter plot for correlation analysis
<Graph
  type="scatter"
  data={scatterData}
  dataKeys={['x', 'y']}
  height={400}
  animated={true}
  showGrid={true}
/>`;

      case 'composed':
        return `import Graph from '../components/Graph/Graph';

const composedData = [
  { name: 'Week 1', applications: 590, processed: 800, efficiency: 1400 },
  { name: 'Week 2', applications: 868, processed: 967, efficiency: 1506 },
  // ... more data
];

// Composed chart with bar and line
<Graph
  type="composed"
  data={composedData}
  dataKeys={['applications', 'processed', 'efficiency']}
  xAxisKey="name"
  height={400}
  animated={true}
/>`;

      case 'radial':
        return `import Graph from '../components/Graph/Graph';

const radialData = [
  { name: 'Q1', value: 18.9, fill: '#3B82F6' },
  { name: 'Q2', value: 28.8, fill: '#10B981' },
  // ... more data
];

// Radial bar chart for progress
<Graph
  type="radial"
  data={radialData}
  dataKeys={['value']}
  height={400}
  animated={true}
  showLegend={true}
/>`;

      case 'dashboard':
        return `// Dashboard with multiple charts
<div className="dashboard-grid">
  <div className="metric-card">
    <Graph type="line" data={lineData} dataKeys={['applications']} height={250} />
  </div>
  <div className="metric-card">
    <Graph type="bar" data={barData} dataKeys={['current']} height={250} />
  </div>
  <div className="metric-card">
    <Graph type="pie" data={pieData} dataKeys={['value']} height={250} />
  </div>
  <div className="metric-card">
    <Graph type="area" data={areaData} dataKeys={['residential']} height={250} gradient={true} />
  </div>
</div>`;

      case 'compact':
        return `// Compact cards for space-efficient dashboards
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
  <div className="compact-card">
    <h5>Weekly Trend</h5>
    <Graph type="line" data={lineData} dataKeys={['applications']} height={120} showLegend={false} />
  </div>
  <div className="compact-card">
    <h5>Status</h5>
    <Graph type="pie" data={pieData} dataKeys={['value']} height={120} />
  </div>
  <div className="compact-card">
    <h5>Department</h5>
    <Graph type="bar" data={barData} dataKeys={['current']} height={120} showLegend={false} />
  </div>
  <div className="compact-card">
    <h5>Monthly Volume</h5>
    <Graph type="area" data={areaData} dataKeys={['residential']} height={120} gradient={true} showLegend={false} />
  </div>
</div>`;

      default:
        return '';
    }
  };

  const demoTabs = [
    { key: 'line', label: 'Line', desc: 'Trend analysis', icon: '📈' },
    { key: 'area', label: 'Area', desc: 'Volume over time', icon: '📊' },
    { key: 'bar', label: 'Bar', desc: 'Comparisons', icon: '📊' },
    { key: 'pie', label: 'Pie', desc: 'Proportions', icon: '🥧' },
    { key: 'radar', label: 'Radar', desc: 'Multi-dimensional', icon: '🎯' },
    { key: 'scatter', label: 'Scatter', desc: 'Correlations', icon: '🔵' },
    { key: 'composed', label: 'Composed', desc: 'Mixed types', icon: '🎨' },
    { key: 'radial', label: 'Radial', desc: 'Progress indicators', icon: '⭕' },
    { key: 'dashboard', label: 'Dashboard', desc: 'Multiple charts', icon: '📊' },
    { key: 'compact', label: 'Compact', desc: 'Small cards', icon: '🗂️' }
  ];

  return (
    <div className={styles.tableDemo}>
      <DemoBreadcrumb componentName="Graphs" />
      
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>Graph Component</h1>
            <p>Beautiful, animated charts and graphs with Recharts integration and ODL styling</p>
          </div>
          <div className={styles.headerActions}>
            <Button
              variant={showCode ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setShowCode(!showCode)}
            >
              <Icon name="code" size={20} />
              {showCode ? 'Hide Code' : 'View Code'}
            </Button>
          </div>
        </div>
      </div>

      {/* Demo Selector */}
      <div className={styles.demoSelector}>
        <div className={styles.demoTabs}>
          {demoTabs.map(demo => (
            <button
              key={demo.key}
              className={`${styles.demoTab} ${selectedDemo === demo.key ? styles.active : ''}`}
              onClick={() => setSelectedDemo(demo.key as DemoType)}
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

      {/* Settings Panel */}
      {selectedDemo !== 'dashboard' && selectedDemo !== 'compact' && selectedDemo !== 'pie' && selectedDemo !== 'radial' && (
        <div style={{ 
          maxWidth: '1400px', 
          margin: '2rem auto',
          padding: '0 2rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#1f2937',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Icon name="settings" size={20} />
              Chart Settings
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                background: '#f8fafc',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: '1px solid #e2e8f0'
              }}>
                <input
                  type="checkbox"
                  id="animated"
                  checked={animated}
                  onChange={(e) => setAnimated(e.target.checked)}
                  style={{
                    width: '1.25rem',
                    height: '1.25rem',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                />
                <label htmlFor="animated" style={{
                  fontWeight: 500,
                  color: '#374151',
                  cursor: 'pointer'
                }}>
                  Animated
                </label>
              </div>
              {selectedDemo !== 'radar' && selectedDemo !== 'scatter' && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: '#f8fafc',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: '1px solid #e2e8f0'
                }}>
                  <input
                    type="checkbox"
                    id="showGrid"
                    checked={showGrid}
                    onChange={(e) => setShowGrid(e.target.checked)}
                    style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  />
                  <label htmlFor="showGrid" style={{
                    fontWeight: 500,
                    color: '#374151',
                    cursor: 'pointer'
                  }}>
                    Show Grid
                  </label>
                </div>
              )}
              {selectedDemo !== 'scatter' && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: '#f8fafc',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: '1px solid #e2e8f0'
                }}>
                  <input
                    type="checkbox"
                    id="showLegend"
                    checked={showLegend}
                    onChange={(e) => setShowLegend(e.target.checked)}
                    style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  />
                  <label htmlFor="showLegend" style={{
                    fontWeight: 500,
                    color: '#374151',
                    cursor: 'pointer'
                  }}>
                    Show Legend
                  </label>
                </div>
              )}
              {(selectedDemo === 'line' || selectedDemo === 'area') && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: '#f8fafc',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: '1px solid #e2e8f0'
                }}>
                  <input
                    type="checkbox"
                    id="curved"
                    checked={curved}
                    onChange={(e) => setCurved(e.target.checked)}
                    style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  />
                  <label htmlFor="curved" style={{
                    fontWeight: 500,
                    color: '#374151',
                    cursor: 'pointer'
                  }}>
                    Curved Lines
                  </label>
                </div>
              )}
              {selectedDemo === 'area' && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: '#f8fafc',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: '1px solid #e2e8f0'
                }}>
                  <input
                    type="checkbox"
                    id="gradient"
                    checked={gradient}
                    onChange={(e) => setGradient(e.target.checked)}
                    style={{
                      width: '1.25rem',
                      height: '1.25rem',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  />
                  <label htmlFor="gradient" style={{
                    fontWeight: 500,
                    color: '#374151',
                    cursor: 'pointer'
                  }}>
                    Gradient Fill
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Demo Content */}
      <div className={styles.demoContent}>
        {selectedDemo === 'line' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Line Chart</h2>
              <p>Track trends and changes over time with smooth animated lines</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <Graph
                type="line"
                data={lineData}
                dataKeys={['applications', 'approved', 'rejected']}
                xAxisKey="name"
                height={400}
                curved={curved}
                animated={animated}
                showGrid={showGrid}
                showLegend={showLegend}
              />
            </div>
          </div>
        )}

        {selectedDemo === 'area' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Area Chart</h2>
              <p>Visualize cumulative totals and volume changes with beautiful gradients</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <h3 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>
                Stacked Area Chart
              </h3>
              <Graph
                type="area"
                data={areaData}
                dataKeys={['residential', 'commercial', 'industrial']}
                xAxisKey="month"
                height={400}
                gradient={gradient}
                stacked={true}
                curved={curved}
                animated={animated}
                showGrid={showGrid}
                showLegend={showLegend}
              />
              
              <h3 style={{ margin: '3rem 0 1rem', color: ODLTheme.colors.text.primary }}>
                Overlapping Area Chart
              </h3>
              <Graph
                type="area"
                data={areaData}
                dataKeys={['residential', 'commercial']}
                xAxisKey="month"
                height={400}
                gradient={gradient}
                stacked={false}
                curved={curved}
                animated={animated}
                showGrid={showGrid}
                showLegend={showLegend}
              />
            </div>
          </div>
        )}

        {selectedDemo === 'bar' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Bar Chart</h2>
              <p>Compare values across categories with clear visual distinctions</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <h3 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>
                Grouped Bar Chart
              </h3>
              <Graph
                type="bar"
                data={barData}
                dataKeys={['current', 'previous']}
                xAxisKey="name"
                height={400}
                animated={animated}
                showGrid={showGrid}
                showLegend={showLegend}
              />
              
              <h3 style={{ margin: '3rem 0 1rem', color: ODLTheme.colors.text.primary }}>
                Stacked Bar Chart
              </h3>
              <Graph
                type="bar"
                data={barData}
                dataKeys={['current', 'previous']}
                xAxisKey="name"
                stacked={true}
                height={400}
                animated={animated}
                showGrid={showGrid}
                showLegend={showLegend}
              />
            </div>
          </div>
        )}

        {selectedDemo === 'pie' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Pie Chart</h2>
              <p>Show proportions and percentages in an intuitive circular format</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Graph
                  type="pie"
                  data={pieData}
                  dataKeys={['value']}
                  height={400}
                  animated={animated}
                />
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'radar' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Radar Chart</h2>
              <p>Compare multiple variables across different dimensions</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Graph
                  type="radar"
                  data={radarData}
                  dataKeys={['A', 'B']}
                  xAxisKey="subject"
                  height={400}
                  animated={animated}
                  showLegend={showLegend}
                />
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'scatter' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Scatter Plot</h2>
              <p>Identify patterns, correlations and outliers in your data</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <Graph
                type="scatter"
                data={scatterData}
                dataKeys={['x', 'y']}
                height={400}
                animated={animated}
                showGrid={showGrid}
              />
            </div>
          </div>
        )}

        {selectedDemo === 'composed' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Composed Chart</h2>
              <p>Combine different chart types for comprehensive data visualization</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <Graph
                type="composed"
                data={composedData}
                dataKeys={['applications', 'processed', 'efficiency']}
                xAxisKey="name"
                height={400}
                animated={animated}
                showGrid={showGrid}
                showLegend={showLegend}
              />
            </div>
          </div>
        )}

        {selectedDemo === 'radial' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Radial Bar Chart</h2>
              <p>Display progress and achievement levels in a circular format</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Graph
                  type="radial"
                  data={radialData}
                  dataKeys={['value']}
                  height={400}
                  animated={animated}
                  showLegend={showLegend}
                />
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'compact' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Compact Cards</h2>
              <p>Space-efficient chart cards perfect for dense dashboards and summary views</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem'
              }}>
                {/* Compact metric cards with small charts */}
                <div style={{
                  padding: '1rem',
                  background: 'white',
                  borderRadius: ODLTheme.borders.radius.md,
                  border: `1px solid ${ODLTheme.colors.border}`
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '0.75rem'
                  }}>
                    <h5 style={{ margin: 0, color: ODLTheme.colors.text.primary, fontSize: '0.875rem' }}>
                      Weekly Applications
                    </h5>
                    <span style={{ 
                      color: chartColors.emerald,
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      +12.5%
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '100px' }}>
                    <Graph
                      type="line"
                      data={lineData}
                      dataKeys={['applications']}
                      xAxisKey="name"
                      width="100%"
                      height={100}
                      showLegend={false}
                      showGrid={false}
                      animated={true}
                    />
                  </div>
                </div>

                <div style={{
                  padding: '1rem',
                  background: 'white',
                  borderRadius: ODLTheme.borders.radius.md,
                  border: `1px solid ${ODLTheme.colors.border}`
                }}>
                  <h5 style={{ margin: '0 0 0.75rem 0', color: ODLTheme.colors.text.primary, fontSize: '0.875rem' }}>
                    Status Distribution
                  </h5>
                  <Graph
                    type="pie"
                    data={pieData.slice(0, 4)}
                    dataKeys={['value']}
                    width="100%"
                    height={100}
                    animated={true}
                    showTooltip={true}
                    showLegend={true}
                  />
                </div>

                <div style={{
                  padding: '1rem',
                  background: 'white',
                  borderRadius: ODLTheme.borders.radius.md,
                  border: `1px solid ${ODLTheme.colors.border}`
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '0.75rem'
                  }}>
                    <h5 style={{ margin: 0, color: ODLTheme.colors.text.primary, fontSize: '0.875rem' }}>
                      Department Activity
                    </h5>
                    <span style={{ 
                      color: chartColors.amber,
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      6 Depts
                    </span>
                  </div>
                  <Graph
                    type="bar"
                    data={barData}
                    dataKeys={['current']}
                    xAxisKey="name"
                    width="100%"
                    height={100}
                    showLegend={false}
                    showGrid={false}
                    animated={true}
                  />
                </div>

                <div style={{
                  padding: '1rem',
                  background: 'white',
                  borderRadius: ODLTheme.borders.radius.md,
                  border: `1px solid ${ODLTheme.colors.border}`
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '0.75rem'
                  }}>
                    <h5 style={{ margin: 0, color: ODLTheme.colors.text.primary, fontSize: '0.875rem' }}>
                      Zone Breakdown
                    </h5>
                    <span style={{ 
                      color: chartColors.rose,
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      -5.2%
                    </span>
                  </div>
                  <Graph
                    type="area"
                    data={areaData}
                    dataKeys={['residential']}
                    xAxisKey="month"
                    width="100%"
                    height={100}
                    gradient={true}
                    showLegend={false}
                    showGrid={false}
                    animated={true}
                  />
                </div>

                <div style={{
                  padding: '1rem',
                  background: 'white',
                  borderRadius: ODLTheme.borders.radius.md,
                  border: `1px solid ${ODLTheme.colors.border}`
                }}>
                  <h5 style={{ margin: '0 0 0.75rem 0', color: ODLTheme.colors.text.primary, fontSize: '0.875rem' }}>
                    Performance Score
                  </h5>
                  <Graph
                    type="radial"
                    data={radialData.slice(0, 2)}
                    dataKeys={['value']}
                    width="100%"
                    height={100}
                    showLegend={true}
                    animated={true}
                  />
                </div>

                <div style={{
                  padding: '1rem',
                  background: 'white',
                  borderRadius: ODLTheme.borders.radius.md,
                  border: `1px solid ${ODLTheme.colors.border}`
                }}>
                  <h5 style={{ margin: '0 0 0.75rem 0', color: ODLTheme.colors.text.primary, fontSize: '0.875rem' }}>
                    Efficiency Matrix
                  </h5>
                  <Graph
                    type="scatter"
                    data={scatterData.slice(0, 20)}
                    dataKeys={['x', 'y']}
                    width="100%"
                    height={100}
                    showGrid={false}
                    animated={true}
                  />
                </div>
              </div>

              {/* Ultra-compact inline sparklines */}
              <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>
                Ultra-Compact Inline Metrics
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '0.5rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem',
                  background: 'white',
                  borderRadius: ODLTheme.borders.radius.sm,
                  border: `1px solid ${ODLTheme.colors.border}`
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', color: ODLTheme.colors.text.secondary }}>
                      Applications
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 600, color: ODLTheme.colors.text.primary }}>
                      2,847
                    </div>
                  </div>
                  <div style={{ width: '80px', height: '40px' }}>
                    <Graph
                      type="line"
                      data={lineData}
                      dataKeys={['applications']}
                      xAxisKey="name"
                      height={40}
                      showLegend={false}
                      showGrid={false}
                      showTooltip={false}
                      colors={[chartColors.blue]}
                    />
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem',
                  background: 'white',
                  borderRadius: ODLTheme.borders.radius.sm,
                  border: `1px solid ${ODLTheme.colors.border}`
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', color: ODLTheme.colors.text.secondary }}>
                      Approved
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 600, color: ODLTheme.colors.text.primary }}>
                      1,923
                    </div>
                  </div>
                  <div style={{ width: '80px', height: '40px' }}>
                    <Graph
                      type="area"
                      data={lineData}
                      dataKeys={['approved']}
                      xAxisKey="name"
                      height={40}
                      showLegend={false}
                      showGrid={false}
                      showTooltip={false}
                      gradient={true}
                      colors={[chartColors.emerald]}
                    />
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem',
                  background: 'white',
                  borderRadius: ODLTheme.borders.radius.sm,
                  border: `1px solid ${ODLTheme.colors.border}`
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', color: ODLTheme.colors.text.secondary }}>
                      Rejected
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 600, color: ODLTheme.colors.text.primary }}>
                      341
                    </div>
                  </div>
                  <div style={{ width: '80px', height: '40px' }}>
                    <Graph
                      type="bar"
                      data={lineData}
                      dataKeys={['rejected']}
                      xAxisKey="name"
                      height={40}
                      showLegend={false}
                      showGrid={false}
                      showTooltip={false}
                      colors={[chartColors.rose]}
                    />
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem',
                  background: 'white',
                  borderRadius: ODLTheme.borders.radius.sm,
                  border: `1px solid ${ODLTheme.colors.border}`
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', color: ODLTheme.colors.text.secondary }}>
                      Processing
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 600, color: ODLTheme.colors.text.primary }}>
                      583
                    </div>
                  </div>
                  <div style={{ width: '80px', height: '40px' }}>
                    <Graph
                      type="line"
                      data={areaData}
                      dataKeys={['commercial']}
                      xAxisKey="month"
                      height={40}
                      showLegend={false}
                      showGrid={false}
                      showTooltip={false}
                      colors={[chartColors.amber]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'dashboard' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Dashboard Example</h2>
              <p>Combine multiple charts to create comprehensive dashboards</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '2rem'
              }}>
                <div style={{
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: ODLTheme.borders.radius.lg,
                  border: `1px solid ${ODLTheme.colors.border}`
                }}>
                  <h4 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>
                    Application Trends
                  </h4>
                  <Graph
                    type="line"
                    data={lineData}
                    dataKeys={['applications', 'approved']}
                    xAxisKey="name"
                    height={250}
                    curved={true}
                    animated={true}
                  />
                </div>

                <div style={{
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: ODLTheme.borders.radius.lg,
                  border: `1px solid ${ODLTheme.colors.border}`
                }}>
                  <h4 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>
                    Department Comparison
                  </h4>
                  <Graph
                    type="bar"
                    data={barData}
                    dataKeys={['current', 'previous']}
                    xAxisKey="name"
                    height={250}
                    animated={true}
                  />
                </div>

                <div style={{
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: ODLTheme.borders.radius.lg,
                  border: `1px solid ${ODLTheme.colors.border}`
                }}>
                  <h4 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>
                    Status Distribution
                  </h4>
                  <Graph
                    type="pie"
                    data={pieData}
                    dataKeys={['value']}
                    height={250}
                    animated={true}
                  />
                </div>

                <div style={{
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: ODLTheme.borders.radius.lg,
                  border: `1px solid ${ODLTheme.colors.border}`
                }}>
                  <h4 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>
                    Zone Distribution
                  </h4>
                  <Graph
                    type="area"
                    data={areaData}
                    dataKeys={['residential', 'commercial', 'industrial']}
                    xAxisKey="month"
                    height={250}
                    gradient={true}
                    stacked={true}
                    animated={true}
                  />
                </div>

                <div style={{
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: ODLTheme.borders.radius.lg,
                  border: `1px solid ${ODLTheme.colors.border}`
                }}>
                  <h4 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>
                    Performance Metrics
                  </h4>
                  <Graph
                    type="radar"
                    data={radarData}
                    dataKeys={['A', 'B']}
                    xAxisKey="subject"
                    height={250}
                    animated={true}
                  />
                </div>

                <div style={{
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: ODLTheme.borders.radius.lg,
                  border: `1px solid ${ODLTheme.colors.border}`
                }}>
                  <h4 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>
                    Quarterly Progress
                  </h4>
                  <Graph
                    type="radial"
                    data={radialData}
                    dataKeys={['value']}
                    height={250}
                    animated={true}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Code Panel */}
        {showCode && (
          <div className={styles.codePanel}>
            <h3>
              <Icon name="code" size={20} style={{ marginRight: '0.5rem' }} />
              Code Example
            </h3>
            <pre className={styles.codeBlock}>
              <code>{getCodeExample(selectedDemo)}</code>
            </pre>
          </div>
        )}

        {/* Features Showcase */}
        <div className={styles.featuresShowcase}>
          <div className={styles.sectionHeader}>
            <h3>Graph Component Features</h3>
            <p>Powerful charting capabilities with beautiful animations and ODL theming</p>
          </div>
          
          <div className={styles.featureGrid}>
            <div className={styles.featureCategory}>
              <h4>📊 Chart Types</h4>
              <ul>
                <li>Line charts for trends</li>
                <li>Area charts with gradients</li>
                <li>Bar charts (grouped/stacked)</li>
                <li>Pie charts with labels</li>
                <li>Radar charts for comparison</li>
                <li>Scatter plots for correlation</li>
                <li>Composed charts (mixed types)</li>
                <li>Radial bar charts</li>
                <li>Treemap visualization</li>
              </ul>
            </div>
            
            <div className={styles.featureCategory}>
              <h4>🎨 Styling Options</h4>
              <ul>
                <li>ODL theme integration</li>
                <li>Custom color palettes</li>
                <li>Gradient fills</li>
                <li>Curved or straight lines</li>
                <li>Customizable tooltips</li>
                <li>Legend positioning</li>
                <li>Grid line styling</li>
                <li>Responsive sizing</li>
                <li>Animation controls</li>
              </ul>
            </div>
            
            <div className={styles.featureCategory}>
              <h4>⚡ Performance</h4>
              <ul>
                <li>Smooth animations</li>
                <li>Responsive container</li>
                <li>Optimized rendering</li>
                <li>Lazy loading support</li>
                <li>Memory efficient</li>
                <li>Fast data updates</li>
                <li>Mobile optimized</li>
                <li>Touch interactions</li>
              </ul>
            </div>
            
            <div className={styles.featureCategory}>
              <h4>🔧 Configuration</h4>
              <ul>
                <li>Multiple data series</li>
                <li>Custom axis labels</li>
                <li>Stacked variations</li>
                <li>Show/hide elements</li>
                <li>Custom dimensions</li>
                <li>Data key mapping</li>
                <li>Animation duration</li>
                <li>Tooltip formatting</li>
              </ul>
            </div>
            
            <div className={styles.featureCategory}>
              <h4>📱 Responsive Design</h4>
              <ul>
                <li>Auto-sizing to container</li>
                <li>Mobile-friendly touch</li>
                <li>Flexible layouts</li>
                <li>Breakpoint support</li>
                <li>Orientation handling</li>
                <li>Dynamic resizing</li>
                <li>Zoom capabilities</li>
                <li>Pan gestures</li>
              </ul>
            </div>
            
            <div className={styles.featureCategory}>
              <h4>💼 Use Cases</h4>
              <ul>
                <li>Analytics dashboards</li>
                <li>Performance metrics</li>
                <li>Financial reports</li>
                <li>Progress tracking</li>
                <li>Data comparisons</li>
                <li>Trend analysis</li>
                <li>KPI visualization</li>
                <li>Statistical displays</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <BackToTop />
    </div>
  );
};

export default GraphDemo;