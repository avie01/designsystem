import React, { useState } from 'react';
import Icon from '../components/Icon/Icon';
import styles from './TableDemo.module.css';

interface ComponentInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'layout' | 'navigation' | 'input' | 'display' | 'feedback' | 'data';
  status: 'stable' | 'beta' | 'experimental';
  path: string;
}

const components: ComponentInfo[] = [
  // Data Components
  {
    id: 'table',
    name: 'Table',
    description: 'Powerful data tables with sorting, filtering, and pagination',
    icon: 'list',
    category: 'data',
    status: 'stable',
    path: '/table-demo'
  },
  {
    id: 'advanced-table',
    name: 'Advanced Table',
    description: 'Feature-rich tables with search, export, and bulk actions',
    icon: 'grid',
    category: 'data',
    status: 'stable',
    path: '/advanced-table-demo'
  },
  
  // Navigation Components
  {
    id: 'header',
    name: 'Header',
    description: 'Navigation header with branding, search, and user management',
    icon: 'header',
    category: 'navigation',
    status: 'stable',
    path: '/header-demo'
  },
  {
    id: 'navigation-rail',
    name: 'Navigation Rail',
    description: 'Vertical navigation sidebar with collapsible sections',
    icon: 'navigation',
    category: 'navigation',
    status: 'stable',
    path: '/navigation-rail-demo'
  },
  {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    description: 'Hierarchical navigation showing current location',
    icon: 'chevron-right',
    category: 'navigation',
    status: 'stable',
    path: '/breadcrumb-demo'
  },
  {
    id: 'tabs',
    name: 'Tabs',
    description: 'Tabbed interface for organizing content',
    icon: 'folder',
    category: 'navigation',
    status: 'stable',
    path: '/tabs-demo'
  },
  
  // Input Components
  {
    id: 'button',
    name: 'Button',
    description: 'Interactive buttons with multiple variants and states',
    icon: 'add',
    category: 'input',
    status: 'stable',
    path: '/button-demo'
  },
  {
    id: 'input',
    name: 'Input',
    description: 'Text input fields with validation and formatting',
    icon: 'edit',
    category: 'input',
    status: 'stable',
    path: '/input-demo'
  },
  {
    id: 'dropdown',
    name: 'Dropdown',
    description: 'Select menus with search and multi-select options',
    icon: 'chevron-down',
    category: 'input',
    status: 'stable',
    path: '/dropdown-demo'
  },
  
  // Display Components
  {
    id: 'cards',
    name: 'Cards',
    description: 'Content containers with various layouts and styles',
    icon: 'document',
    category: 'display',
    status: 'stable',
    path: '/cards-demo'
  },
  {
    id: 'chip',
    name: 'Chip',
    description: 'Compact elements for tags and selections',
    icon: 'checkmark-outline',
    category: 'display',
    status: 'stable',
    path: '/chip-demo'
  },
  {
    id: 'user-avatar',
    name: 'User Avatar',
    description: 'Profile pictures with status indicators',
    icon: 'user',
    category: 'display',
    status: 'stable',
    path: '/user-avatar-demo'
  },
  
  // Feedback Components
  {
    id: 'modal',
    name: 'Modal',
    description: 'Dialog overlays for focused interactions',
    icon: 'information',
    category: 'feedback',
    status: 'stable',
    path: '/modal-demo'
  },
  {
    id: 'alert-banner',
    name: 'Alert Banner',
    description: 'Notification banners for important messages',
    icon: 'notification',
    category: 'feedback',
    status: 'stable',
    path: '/alert-banner-demo'
  },
  {
    id: 'drawer',
    name: 'Drawer',
    description: 'Slide-out panels for additional content',
    icon: 'overflow-menu-vertical',
    category: 'feedback',
    status: 'stable',
    path: '/drawer-demo'
  },
  {
    id: 'popover',
    name: 'Popover',
    description: 'Contextual overlays triggered by user actions',
    icon: 'help',
    category: 'feedback',
    status: 'stable',
    path: '/popover-demo'
  },
  
  // Layout Components
  {
    id: 'page-manager',
    name: 'Page Manager',
    description: 'Layout system with multiple view options',
    icon: 'dashboard',
    category: 'layout',
    status: 'stable',
    path: '/page-manager-demo'
  },
  {
    id: 'header',
    name: 'Header',
    description: 'Application headers with navigation and branding',
    icon: 'workflow-automation',
    category: 'layout',
    status: 'stable',
    path: '/header-demo'
  },
  {
    id: 'accessibility-panel',
    name: 'Accessibility Panel',
    description: 'Tools for improving application accessibility',
    icon: 'accessibility',
    category: 'layout',
    status: 'beta',
    path: '/accessibility-panel-demo'
  }
];

const categoryInfo = {
  data: { label: 'Data Display', icon: 'chart-line', color: '#667eea' },
  navigation: { label: 'Navigation', icon: 'navigation', color: '#764ba2' },
  input: { label: 'Form & Input', icon: 'edit', color: '#f59e0b' },
  display: { label: 'Display', icon: 'view', color: '#10b981' },
  feedback: { label: 'Feedback', icon: 'notification', color: '#ef4444' },
  layout: { label: 'Layout', icon: 'dashboard', color: '#6366f1' }
};

const ComponentsShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredComponents = components.filter(component => {
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
    const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          component.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const groupedComponents = filteredComponents.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {} as Record<string, ComponentInfo[]>);

  return (
    <div className={styles.tableDemo}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>ODL Component Library</h1>
            <p>Comprehensive showcase of all components with interactive examples and documentation</p>
          </div>
          <div className={styles.headerActions}>
            <div className="relative">
              <Icon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-300" />
              <input
                type="text"
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:bg-white/30 focus:border-white/50 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className={styles.demoSelector}>
        <div className={styles.demoTabs}>
          <button
            className={`${styles.demoTab} ${selectedCategory === 'all' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            <span className={styles.demoIcon}>🎯</span>
            <div className={styles.demoTabContent}>
              <span className={styles.demoLabel}>All Components</span>
              <span className={styles.demoDesc}>{components.length} components</span>
            </div>
          </button>
          {Object.entries(categoryInfo).map(([key, info]) => {
            const count = components.filter(c => c.category === key).length;
            return (
              <button
                key={key}
                className={`${styles.demoTab} ${selectedCategory === key ? styles.active : ''}`}
                onClick={() => setSelectedCategory(key)}
              >
                <Icon name={info.icon} className={styles.demoIcon} size={24} />
                <div className={styles.demoTabContent}>
                  <span className={styles.demoLabel}>{info.label}</span>
                  <span className={styles.demoDesc}>{count} components</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Components Grid */}
      <div className={styles.demoContent}>
        {Object.entries(groupedComponents).map(([category, categoryComponents]) => (
          <div key={category} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Icon 
                name={categoryInfo[category as keyof typeof categoryInfo].icon} 
                size={24} 
                style={{ color: categoryInfo[category as keyof typeof categoryInfo].color }}
              />
              <h2 className="text-2xl font-semibold text-gray-800">
                {categoryInfo[category as keyof typeof categoryInfo].label}
              </h2>
              <span className="text-sm text-gray-500">
                ({categoryComponents.length} components)
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryComponents.map(component => (
                <a
                  key={component.id}
                  href={component.path === '/table-demo' ? '/table-demo.html' : '#'}
                  className="group relative bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200 text-left block"
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      component.status === 'stable' ? 'bg-green-100 text-green-700' :
                      component.status === 'beta' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {component.status}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                      <Icon name={component.icon} size={24} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {component.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {component.description}
                  </p>

                  {/* Arrow Icon */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon name="arrow-right" size={20} className="text-blue-600" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComponentsShowcase;