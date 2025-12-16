import React, { useState } from 'react';
import clsx from 'clsx';
import { 
  NavigationRail, 
  Icon,
  Button
} from '../src';
import DemoNavigation from './DemoNavigation';

const RightNavigationDemo: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [navRailCollapsed, setNavRailCollapsed] = useState(false);

  // Navigation Rail menu items for right side
  const navRailItems = [
    { 
      id: 'notifications', 
      iconName: 'flash', 
      label: 'Notifications', 
      path: '/notifications',
      description: 'View all notifications'
    },
    { 
      id: 'messages', 
      iconName: 'information', 
      label: 'Messages', 
      path: '/messages',
      description: 'Direct messages'
    },
    { 
      id: 'favorites', 
      iconName: 'workflow-automation', 
      label: 'Favorites', 
      path: '/favorites',
      description: 'Saved items'
    },
    { 
      id: 'profile', 
      iconName: 'ai-label', 
      label: 'Profile', 
      path: '/profile',
      description: 'User profile settings'
    },
    { 
      id: 'images', 
      iconName: 'image', 
      label: 'Images', 
      path: '/images',
      description: 'Manage images and media'
    }
  ];

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DemoNavigation 
        title="Right Navigation Rail" 
        description="Collapsible right sidebar navigation with icons and tooltips"
      />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Main Demo Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Right Navigation Rail</h2>
                <p className="text-gray-600">Collapsible right sidebar navigation with responsive width handling</p>
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
                <div className="flex-1 bg-white rounded-l-lg p-4">
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
                <div className={clsx(
                  "bg-white rounded-r-lg transition-all duration-300 overflow-hidden",
                  navRailCollapsed ? "w-16" : "w-64"
                )}>
                  <NavigationRail
                    currentPath={currentPath}
                    onNavigate={handleNavigate}
                    menuItems={navRailItems}
                    collapsed={navRailCollapsed}
                    showTooltips={true}
                    position="right"
                  />
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
                <li>• Responsive width handling (64px collapsed, 256px expanded)</li>
                <li>• Text truncation for long labels</li>
                <li>• Right-side positioning</li>
              </ul>
            </div>
          </div>

          {/* Full Page Layout Demo */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Full Page Layout</h2>
              <p className="text-gray-600">Realistic page layout with right navigation</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg bg-gray-50 h-80 overflow-hidden">
              <div className="flex h-full">
                <div className="flex-1 bg-white p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Main Content Area</h4>
                  <p className="text-sm text-gray-600">
                    This demonstrates how the Right Navigation Rail integrates with a full page layout. 
                    The rail smoothly transitions between collapsed (64px) and expanded (256px) states.
                  </p>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      Current path: <span className="font-medium">{currentPath}</span>
                    </p>
                  </div>
                </div>
                <div className={clsx(
                  "bg-white transition-all duration-300 overflow-hidden",
                  navRailCollapsed ? "w-16" : "w-64"
                )}>
                  <NavigationRail
                    currentPath={currentPath}
                    onNavigate={handleNavigate}
                    menuItems={navRailItems}
                    collapsed={navRailCollapsed}
                    showTooltips={true}
                    position="right"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Usage Examples Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage Examples</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Usage</h3>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`import { NavigationRail } from '@odl/components';

const menuItems = [
  { id: 'notifications', iconName: 'notification', label: 'Notifications', path: '/notifications' },
  { id: 'messages', iconName: 'chat', label: 'Messages', path: '/messages' }
];

<NavigationRail
  currentPath={currentPath}
  onNavigate={handleNavigate}
  menuItems={menuItems}
  collapsed={false}
  showTooltips={true}
  position="right"
/>`}
                </pre>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">With State Management</h3>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`const [currentPath, setCurrentPath] = useState('/notifications');
const [collapsed, setCollapsed] = useState(false);

const handleNavigate = (path: string) => {
  setCurrentPath(path);
};

<NavigationRail
  currentPath={currentPath}
  onNavigate={handleNavigate}
  menuItems={menuItems}
  collapsed={collapsed}
  showTooltips={true}
  position="right"
/>`}
                </pre>
              </div>
            </div>
          </div>

          {/* Props Documentation */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Props Documentation</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prop</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">currentPath</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">string</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Current active path</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">onNavigate</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">(path: string) =&gt; void</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Callback when navigation occurs</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">menuItems</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">MenuItem[]</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Array of menu items to display</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">collapsed</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">false</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Whether the rail is collapsed</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">showTooltips</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">boolean</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">true</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Whether to show tooltips on hover</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">position</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'left' | 'right'</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'left'</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Position of the navigation rail</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Use Cases</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Icon name="notification" className="w-5 h-5 mr-2" />
                  Notifications Panel
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Perfect for displaying notifications, alerts, and system messages. 
                  Users can quickly access important information without leaving their current context.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Real-time notifications</li>
                  <li>• Message center</li>
                  <li>• System alerts</li>
                  <li>• Quick actions</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Icon name="user" className="w-5 h-5 mr-2" />
                  User Actions
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Ideal for user-specific actions like profile settings, favorites, 
                  recent items, and help documentation.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• User profile</li>
                  <li>• Favorites/bookmarks</li>
                  <li>• Recent items</li>
                  <li>• Help & support</li>
                </ul>
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

export default RightNavigationDemo; 