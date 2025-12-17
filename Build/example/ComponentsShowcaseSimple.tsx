import React from 'react';
import ReactDOM from 'react-dom/client';

const ComponentsShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [searchTerm, setSearchTerm] = React.useState('');

  const components = [
    // Data Components
    {
      id: 'table',
      name: 'Table',
      description: 'Powerful data tables with sorting, filtering, and pagination',
      category: 'data',
      status: 'stable',
      path: '/table-demo.html',
      icon: '📊' // Table/List icon
    },
    // Navigation Components
    {
      id: 'header',
      name: 'Header',
      description: 'Application header with branding and user profile',
      category: 'navigation',
      status: 'stable',
      path: '/header-demo.html',
      icon: '🎯' // Header icon
    },
    {
      id: 'navigation-rail',
      name: 'Navigation Rail',
      description: 'Vertical navigation sidebar with collapsible sections, icon-based primary navigation, expandable sub-menus, and active state indicators for comprehensive application navigation',
      category: 'navigation',
      status: 'stable',
      path: '/navigation-rail-demo.html',
      icon: '🧭' // Navigation icon
    },
    {
      id: 'breadcrumb',
      name: 'Breadcrumb',
      description: 'Hierarchical navigation showing current location',
      category: 'navigation',
      status: 'stable',
      path: '/breadcrumb-demo.html',
      icon: '🔗' // Link/Chain icon
    },
    {
      id: 'tabs',
      name: 'Tabs',
      description: 'Tabbed interface for organizing content',
      category: 'navigation',
      status: 'stable',
      path: '/tabs-demo.html',
      icon: '📑' // Folder/Tab icon
    },
    {
      id: 'tree-navigation',
      name: 'Tree Navigation',
      description: 'Hierarchical folder navigation with expand/collapse functionality',
      category: 'navigation',
      status: 'stable',
      path: '/tree-navigation-demo.html',
      icon: '🌳' // Tree icon
    },
    // Input Components
    {
      id: 'button',
      name: 'Button',
      description: 'Interactive buttons with multiple variants and states',
      category: 'input',
      status: 'stable',
      path: '/button-demo.html',
      icon: '🔘' // Button icon
    },
    {
      id: 'input',
      name: 'Input',
      description: 'Text input fields with validation and formatting',
      category: 'input',
      status: 'stable',
      path: '/input-demo.html',
      icon: '✏️' // Edit icon
    },
    {
      id: 'dropdown',
      name: 'Dropdown',
      description: 'Select menus with search and multi-select options',
      category: 'input',
      status: 'stable',
      path: '/dropdown-demo.html',
      icon: '📝' // List dropdown
    },
    {
      id: 'list',
      name: 'List',
      description: 'Hierarchical lists with expand/collapse, multi-select, and custom interactions',
      category: 'display',
      status: 'stable',
      path: '/list-demo.html',
      icon: '📋' // List icon
    },
    // Display Components
    {
      id: 'cards',
      name: 'Cards',
      description: 'Content containers with various layouts and styles',
      category: 'display',
      status: 'stable',
      path: '/cards-demo.html',
      icon: '🗂️' // Document/Card icon
    },
    {
      id: 'chip',
      name: 'Chip',
      description: 'Compact elements for tags and selections',
      category: 'display',
      status: 'stable',
      path: '/chip-demo.html',
      icon: '🏷️' // Tag icon
    },
    {
      id: 'user-avatar',
      name: 'User Avatar',
      description: 'Profile pictures with status indicators',
      category: 'display',
      status: 'stable',
      path: '/user-avatar-demo.html',
      icon: '👤' // User icon
    },
    // Feedback Components
    {
      id: 'modal',
      name: 'Modal',
      description: 'Dialog overlays for focused interactions',
      category: 'feedback',
      status: 'stable',
      path: '/modal-demo.html',
      icon: '💬' // Chat/Dialog icon
    },
    {
      id: 'alert-banner',
      name: 'Alert Banner',
      description: 'Notification banners for important messages',
      category: 'feedback',
      status: 'stable',
      path: '/alert-banner-demo.html',
      icon: '🔔' // Notification icon
    },
    {
      id: 'drawer',
      name: 'Drawer',
      description: 'Sliding panels from any screen edge with overlay options',
      category: 'feedback',
      status: 'stable',
      path: '/drawer-demo.html',
      icon: '📤' // Drawer/Panel icon
    },
    // Navigation Components
    {
      id: 'stepper',
      name: 'Stepper',
      description: 'Guide users through multi-step processes with progress indicators',
      category: 'navigation',
      status: 'stable',
      path: '/stepper-demo.html',
      icon: '📍' // Steps/Progress icon
    },
    // Data Components
    {
      id: 'graphs',
      name: 'Graphs',
      description: 'Beautiful animated charts including line, bar, pie, area, radar and more',
      category: 'data',
      status: 'stable',
      path: '/graph-demo.html',
      icon: '📈' // Graph icon
    },
    {
      id: 'kanban',
      name: 'Kanban Board',
      description: 'Interactive kanban boards for project management and workflow visualization',
      category: 'data',
      status: 'stable',
      path: '/kanban-demo.html',
      icon: '📋' // Board/Task icon
    },
    // Layout Components
    {
      id: 'templates',
      name: 'Page Templates',
      description: 'Ready-to-use wireframe templates with content borders for rapid development',
      category: 'layout',
      status: 'stable',
      path: '/templates-demo.html',
      icon: '📐' // Template/Layout icon
    },
    {
      id: 'hierarchy-visualizations',
      name: 'Hierarchy Visualizations',
      description: 'Multiple ways to display hierarchical data - Miller Columns, Org Charts, Treemaps, and more',
      category: 'data',
      status: 'stable',
      path: '/hierarchy-visualizations-demo.html',
      icon: '🗺️' // Map/Hierarchy icon
    },
  ];

  const categoryInfo: any = {
    all: { label: 'All Components', color: '#667eea' },
    data: { label: 'Data Display', color: '#667eea' },
    navigation: { label: 'Navigation', color: '#764ba2' },
    input: { label: 'Form & Input', color: '#f59e0b' },
    display: { label: 'Display', color: '#10b981' },
    feedback: { label: 'Feedback', color: '#ef4444' },
    layout: { label: 'Layout', color: '#3b82f6' },
  };

  const filteredComponents = components.filter(component => {
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
    const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          component.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '3rem 2rem 2rem',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            ODL Component Library
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
            Comprehensive showcase of all components with interactive examples
          </p>
          <div style={{ marginTop: '2rem' }}>
            <input
              type="text"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                width: '300px',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ 
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: 0 }}>
          {Object.entries(categoryInfo).map(([key, info]: [string, any]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              style={{
                padding: '1.5rem 2rem',
                background: selectedCategory === key ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
                color: selectedCategory === key ? 'white' : '#374151',
                border: 'none',
                borderBottom: selectedCategory === key ? '3px solid #4f46e5' : '3px solid transparent',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 600,
                transition: 'all 0.3s ease'
              }}
            >
              {info.label}
            </button>
          ))}
          <a
            href="/import-guide.html"
            target="_blank"
            style={{
              padding: '1.5rem 2rem',
              background: 'transparent',
              color: '#059669',
              border: 'none',
              borderBottom: '3px solid transparent',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            📚 Import Guide
          </a>
          <a
            href="/compliance-report.html"
            target="_blank"
            style={{
              padding: '1.5rem 2rem',
              background: 'transparent',
              color: '#3560C1',
              border: 'none',
              borderBottom: '3px solid transparent',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            📊 Compliance Report
          </a>
        </div>
      </div>

      {/* Components Grid */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredComponents.map(component => (
            <a
              key={component.id}
              href={component.path}
              style={{
                display: 'block',
                background: 'white',
                borderRadius: '0.75rem',
                border: '1px solid #e5e7eb',
                padding: '1.5rem',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = '#93c5fd';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              {/* Status Badge */}
              <span style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: 500,
                background: component.status === 'stable' ? '#d4f4dd' : '#fff3cd',
                color: component.status === 'stable' ? '#1e7e34' : '#856404'
              }}>
                {component.status}
              </span>

              {/* Icon and Title */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  flexShrink: 0
                }}>
                  {component.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: 600, 
                  color: '#111827',
                  margin: 0
                }}>
                  {component.name}
                </h3>
              </div>
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#6b7280',
                lineHeight: 1.5
              }}>
                {component.description}
              </p>
            </a>
          ))}
        </div>

        {filteredComponents.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
              No components found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ComponentsShowcase />
  </React.StrictMode>
);