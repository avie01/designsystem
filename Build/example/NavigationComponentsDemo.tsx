import React, { useState } from 'react';
import clsx from 'clsx';
import { 
  NavigationRail, 
  Breadcrumb, 
  TreeNavigation, 
  Icon,
  Button
} from '../src';
import DemoNavigation from './DemoNavigation';

const NavigationComponentsDemo: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [navRailCollapsed, setNavRailCollapsed] = useState(false);
  const [selectedTreePath, setSelectedTreePath] = useState('/dashboard');

  // Navigation Rail menu items
  const navRailItems = [
    { 
      id: 'dashboard', 
      iconName: 'dashboard', 
      label: 'Dashboard', 
      path: '/dashboard',
      description: 'Overview and analytics'
    },
    { 
      id: 'projects', 
      iconName: 'folder', 
      label: 'Projects', 
      path: '/projects',
      description: 'Manage your projects'
    },
    { 
      id: 'users', 
      iconName: 'user-multiple', 
      label: 'Users', 
      path: '/users',
      description: 'User management'
    },
    { 
      id: 'settings', 
      iconName: 'settings', 
      label: 'Settings', 
      path: '/settings',
      description: 'System configuration'
    },
    { 
      id: 'analytics', 
      iconName: 'analytics', 
      label: 'Analytics', 
      path: '/analytics',
      description: 'Data and reports'
    },
    { 
      id: 'messages', 
      iconName: 'notification', 
      label: 'Messages', 
      path: '/messages',
      description: 'Communication center'
    }
  ];

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/', icon: 'home' },
    { label: 'Projects', path: '/projects', icon: 'folder' },
    { label: 'Project Alpha', path: '/projects/alpha' },
    { label: 'Settings' }
  ];

  // Tree Navigation nodes
  const treeNodes = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'dashboard',
      children: [
        {
          id: 'overview',
          label: 'Overview',
          path: '/dashboard/overview',
          icon: 'chart-line'
        },
        {
          id: 'analytics',
          label: 'Analytics',
          path: '/dashboard/analytics',
          icon: 'analytics'
        }
      ]
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: 'folder',
      children: [
        {
          id: 'active',
          label: 'Active Projects',
          path: '/projects/active',
          icon: 'folder-open'
        },
        {
          id: 'archived',
          label: 'Archived Projects',
          path: '/projects/archived',
          icon: 'archive'
        },
        {
          id: 'templates',
          label: 'Templates',
          path: '/projects/templates',
          icon: 'template'
        }
      ]
    },
    {
      id: 'users',
      label: 'Users',
      icon: 'user-multiple',
      children: [
        {
          id: 'active-users',
          label: 'Active Users',
          path: '/users/active',
          icon: 'user'
        },
        {
          id: 'roles',
          label: 'Roles & Permissions',
          path: '/users/roles',
          icon: 'security'
        }
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/settings',
      icon: 'settings'
    }
  ];

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
  };

  const handleTreeNavigate = (path: string) => {
    setSelectedTreePath(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DemoNavigation 
        title="Navigation Components" 
        description="Comprehensive navigation components for building intuitive user interfaces"
      />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Navigation Rail Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Full Page Layout Demo</h3>
              <div className="border border-gray-200 rounded-lg bg-gray-50 h-80 overflow-hidden">
                <div className="flex h-full">
                  <div className={clsx(
                    "bg-white border-r border-gray-200 transition-all duration-300",
                    navRailCollapsed ? "w-16" : "w-64"
                  )}>
                    <NavigationRail
                      currentPath={currentPath}
                      onNavigate={handleNavigate}
                      menuItems={navRailItems}
                      collapsed={navRailCollapsed}
                      showTooltips={true}
                    />
                  </div>
                  <div className="flex-1 bg-white p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Main Content Area</h4>
                    <p className="text-sm text-gray-600">
                      This demonstrates how the Navigation Rail integrates with a full page layout. 
                      The rail smoothly transitions between collapsed (64px) and expanded (256px) states.
                    </p>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        Current path: <span className="font-medium">{currentPath}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Navigation Rail</h2>
                  <p className="text-gray-600">Collapsible sidebar navigation with responsive width handling</p>
                </div>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => setNavRailCollapsed(!navRailCollapsed)}
                >
                  {navRailCollapsed ? 'Expand' : 'Collapse'}
                </Button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex h-64">
                  <div className={clsx(
                    "bg-white rounded-l-lg border-r border-gray-200 transition-all duration-300",
                    navRailCollapsed ? "w-16" : "w-64"
                  )}>
                    <NavigationRail
                      currentPath={currentPath}
                      onNavigate={handleNavigate}
                      menuItems={navRailItems}
                      collapsed={navRailCollapsed}
                      showTooltips={true}
                    />
                  </div>
                  <div className="flex-1 bg-white rounded-r-lg p-4">
                    <div className="text-sm text-gray-600">
                      Current path: <span className="font-medium">{currentPath}</span>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                      Click navigation items to see the path change. Use the toggle button to collapse/expand the rail.
                      <br />
                      <span className="text-xs text-gray-400 mt-1 block">
                        Width: {navRailCollapsed ? '64px (collapsed)' : '256px (expanded)'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Collapsible sidebar with smooth animations</li>
                <li>• Icon-based navigation with tooltips</li>
                <li>• Active state highlighting</li>
                <li>• Keyboard accessibility support</li>
                <li>• Customizable themes and positioning</li>
                <li>• Responsive width handling (64px collapsed, 256px expanded)</li>
                <li>• Text truncation for long labels</li>
              </ul>
            </div>
          </div>

          {/* Breadcrumb Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Breadcrumb Navigation</h2>
              <p className="text-gray-600">Hierarchical navigation showing current location</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <Breadcrumb
                items={breadcrumbItems}
                onNavigate={handleNavigate}
                className="mb-4"
              />
              <div className="text-sm text-gray-600">
                Click on breadcrumb items to navigate. The last item is typically non-clickable.
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Hierarchical path display</li>
                <li>• Clickable navigation links</li>
                <li>• Icon support for each level</li>
                <li>• Responsive design</li>
                <li>• Accessible navigation structure</li>
              </ul>
            </div>
          </div>

          {/* Tree Navigation Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tree Navigation</h2>
              <p className="text-gray-600">Hierarchical tree structure for complex navigation</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold text-gray-900 mb-3">Single Expand Mode</h4>
                <TreeNavigation
                  nodes={treeNodes}
                  currentPath={selectedTreePath}
                  onNavigate={handleTreeNavigate}
                  showIcons={true}
                  allowMultipleExpanded={false}
                  initiallyExpanded={['dashboard']}
                />
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold text-gray-900 mb-3">Multiple Expand Mode</h4>
                <TreeNavigation
                  nodes={treeNodes}
                  currentPath={selectedTreePath}
                  onNavigate={handleTreeNavigate}
                  showIcons={true}
                  allowMultipleExpanded={true}
                  initiallyExpanded={['dashboard', 'projects']}
                />
              </div>
            </div>
            
            <div className="mt-6">
              <div className="text-sm text-gray-600 mb-4">
                Selected path: <span className="font-medium">{selectedTreePath}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Hierarchical tree structure</li>
                <li>• Expandable/collapsible nodes</li>
                <li>• Single or multiple expand modes</li>
                <li>• Icon support for nodes</li>
                <li>• Active state highlighting</li>
                <li>• Keyboard navigation support</li>
              </ul>
            </div>
          </div>

          {/* Usage Examples Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage Examples</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Navigation Rail</h3>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`import { NavigationRail } from '@odl/components';

const menuItems = [
  { id: 'dashboard', iconName: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  { id: 'projects', iconName: 'folder', label: 'Projects', path: '/projects' }
];

<NavigationRail
  currentPath={currentPath}
  onNavigate={handleNavigate}
  menuItems={menuItems}
  collapsed={false}
  showTooltips={true}
/>`}
                </pre>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Breadcrumb</h3>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`import { Breadcrumb } from '@odl/components';

const items = [
  { label: 'Home', path: '/', icon: 'home' },
  { label: 'Projects', path: '/projects' },
  { label: 'Current Page' }
];

<Breadcrumb
  items={items}
  onNavigate={handleNavigate}
/>`}
                </pre>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tree Navigation</h3>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`import { TreeNavigation } from '@odl/components';

const nodes = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    children: [
      { id: 'overview', label: 'Overview', path: '/dashboard/overview' }
    ]
  }
];

<TreeNavigation
  nodes={nodes}
  currentPath={currentPath}
  onNavigate={handleNavigate}
  allowMultipleExpanded={false}
/>`}
                </pre>
              </div>
            </div>
          </div>

          {/* Accessibility Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Accessibility Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Icon name="accessibility" className="w-5 h-5 mr-2" />
                  Keyboard Navigation
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Tab navigation support</li>
                  <li>• Arrow key navigation</li>
                  <li>• Enter/Space activation</li>
                  <li>• Escape key handling</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Icon name="screen-reader" className="w-5 h-5 mr-2" />
                  Screen Reader Support
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Proper ARIA labels</li>
                  <li>• Role attributes</li>
                  <li>• State announcements</li>
                  <li>• Focus management</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Icon name="color" className="w-5 h-5 mr-2" />
                  Visual Design
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• High contrast support</li>
                  <li>• Focus indicators</li>
                  <li>• Hover states</li>
                  <li>• Active state clarity</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationComponentsDemo; 