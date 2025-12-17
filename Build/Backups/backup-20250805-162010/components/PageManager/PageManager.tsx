import React, { useState } from 'react';
import clsx from 'clsx';
import { PageTemplate, NavigationRail, CustomRightNavigationRail, Icon, DesignTokensProvider } from '../../index';
import Table from '../Table/Table';
import Chip from '../Chip/Chip';
import UserAvatar from '../UserAvatar/UserAvatar';
import Button from '../Button/Button';
import DocumentTreemap from '../DocumentTreemap/DocumentTreemap';
import Tabs from '../Tabs/Tabs';
import { governmentDocuments, getDocumentStats } from '../../data/governmentDocuments';



export interface PageLayout {
  id: string;
  name: string;
  description: string;
  showLeftNavRail: boolean;
  showRightNavRail: boolean;
  leftNavRailCollapsed: boolean;
  rightNavRailCollapsed: boolean;
  layout: 'single' | 'two-column' | 'dashboard' | 'tree-menu' | 'three-cards' | 'messages-table';
}

export interface PageManagerProps {
  /** Array of available page layouts */
  layouts: PageLayout[];
  /** Current active layout ID */
  currentLayoutId: string;
  /** Callback when layout changes */
  onLayoutChange: (layoutId: string) => void;
  /** Menu items for navigation rails */
  menuItems: Array<{
    id: string;
    iconName: string;
    label: string;
    path: string;
    description?: string;
  }>;
  /** Menu items for right navigation rail (optional) */
  rightNavItems?: Array<{
    id: string;
    iconName: string;
    label: string;
    path: string;
    description?: string;
  }>;
  /** Current path for navigation */
  currentPath: string;
  /** Navigation callback */
  onNavigate: (path: string) => void;
  /** Page title */
  title: string;
  /** Page subtitle */
  subtitle?: string;
  /** Breadcrumb items */
  breadcrumbs?: Array<{
    label: string;
    path?: string;
    icon?: string;
  }>;
  /** Custom content to render in the main content area */
  customContent?: React.ReactNode;
  /** User information for the header avatar */
  user?: {
    name: string;
    role?: string;
    department?: string;
    email?: string;
    avatar?: string;
  };
}

const PageManager: React.FC<PageManagerProps> = ({
  layouts,
  currentLayoutId,

  menuItems,
  rightNavItems,
  currentPath,
  onNavigate,
  title,
  subtitle,
  breadcrumbs,
  customContent,
  user,
}) => {
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [alerts, setAlerts] = useState<Array<{
    id: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
    timestamp: Date;
    read: boolean;
  }>>([
    {
      id: '1',
      title: 'Document Updated',
      message: 'API Documentation v2.1 has been updated by Sarah Johnson',
      type: 'info',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      read: false
    },
    {
      id: '2',
      title: 'Security Alert',
      message: 'New security vulnerability detected in production environment',
      type: 'warning',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      read: false
    },
    {
      id: '3',
      title: 'Deployment Successful',
      message: 'Version 1.2.0 has been successfully deployed to production',
      type: 'success',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: true
    },
    {
      id: '4',
      title: 'System Error',
      message: 'Database connection timeout detected in staging environment',
      type: 'error',
      timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      read: false
    },
    {
      id: '5',
      title: 'Team Meeting',
      message: 'Weekly team meeting scheduled for tomorrow at 10:00 AM',
      type: 'info',
      timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      read: true
    }
  ]);

  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [newMessageForm, setNewMessageForm] = useState({
    recipient: '',
    subject: '',
    message: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  // Security alerts state
  const [securityAlerts, setSecurityAlerts] = useState<Array<{
    id: string;
    title: string;
    message: string;
    type: 'error' | 'warning';
    timestamp: Date;
    dismissed: boolean;
  }>>([
    {
      id: 'sec-1',
      title: 'Unauthorized Access Attempt',
      message: 'User ID: 84729 attempted to access DOC-001 without proper clearance',
      type: 'error',
      timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
      dismissed: false
    },
    {
      id: 'sec-2',
      title: 'Document Classification Mismatch',
      message: 'DOC-005 classification level may need review',
      type: 'warning',
      timestamp: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
      dismissed: false
    }
  ]);

  // Notifications state
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    title: string;
    message: string;
    type: 'info' | 'warning' | 'error' | 'success';
    timestamp: Date;
    read: boolean;
    source: 'alert' | 'system';
  }>>([
    {
      id: 'notif-1',
      title: 'System Update',
      message: 'Security patches have been applied successfully',
      type: 'success',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      source: 'system'
    },
    {
      id: 'notif-2',
      title: 'Document Review',
      message: 'DOC-003 has been approved for publication',
      type: 'info',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: true,
      source: 'system'
    }
  ]);

  // Filter state for treemap interactions
  const [tableFilter, setTableFilter] = useState<{
    classification?: string;
    department?: string;
  }>({});

  // Column selection state
  const [selectedColumns, setSelectedColumns] = useState<string[]>([
    'Document ID', 'Document Title', 'Classification', 'Owner', 'Department', 'Status', 'Workflow', 'Access Level', 'Last Modified'
  ]);

  // Column selection modal state
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [availableColumns] = useState<string[]>([
    'Document ID', 'Document Title', 'Classification', 'Owner', 'Department', 'Status', 'Workflow', 'Access Level', 'Last Modified'
  ]);

  // Messages data for the interactive table
  const messagesData = [
    {
      id: '1',
      sender: 'Sarah Johnson',
      subject: 'Project Update - Q4 Review',
      status: 'unread',
      priority: 'high',
      date: '2024-01-15',
      category: 'work'
    },
    {
      id: '2',
      sender: 'Mike Chen',
      subject: 'Weekly Team Meeting',
      status: 'read',
      priority: 'medium',
      date: '2024-01-14',
      category: 'meeting'
    },
    {
      id: '3',
      sender: 'Emily Rodriguez',
      subject: 'Client Feedback - Design Review',
      status: 'unread',
      priority: 'high',
      date: '2024-01-13',
      category: 'client'
    },
    {
      id: '4',
      sender: 'David Kim',
      subject: 'System Maintenance Notice',
      status: 'read',
      priority: 'low',
      date: '2024-01-12',
      category: 'system'
    },
    {
      id: '5',
      sender: 'Lisa Thompson',
      subject: 'Budget Approval Request',
      status: 'unread',
      priority: 'high',
      date: '2024-01-11',
      category: 'finance'
    },
    {
      id: '6',
      sender: 'Alex Wong',
      subject: 'New Feature Implementation',
      status: 'read',
      priority: 'medium',
      date: '2024-01-10',
      category: 'development'
    },
    {
      id: '7',
      sender: 'Rachel Green',
      subject: 'Marketing Campaign Results',
      status: 'read',
      priority: 'medium',
      date: '2024-01-09',
      category: 'marketing'
    },
    {
      id: '8',
      sender: 'Tom Wilson',
      subject: 'Security Audit Report',
      status: 'unread',
      priority: 'high',
      date: '2024-01-08',
      category: 'security'
    },
    {
      id: '9',
      sender: 'Jessica Lee',
      subject: 'Training Session Reminder',
      status: 'read',
      priority: 'low',
      date: '2024-01-07',
      category: 'training'
    },
    {
      id: '10',
      sender: 'Ryan Davis',
      subject: 'Product Launch Timeline',
      status: 'unread',
      priority: 'high',
      date: '2024-01-06',
      category: 'product'
    }
  ];

  // Analytics data for the tables
  const analyticsData = [
    {
      id: '1',
      metric: 'Page Views',
      value: '12,456',
      change: '+15.2%',
      trend: 'up',
      category: 'traffic'
    },
    {
      id: '2',
      metric: 'Conversion Rate',
      value: '3.2%',
      change: '+0.8%',
      trend: 'up',
      category: 'conversion'
    },
    {
      id: '3',
      metric: 'Bounce Rate',
      value: '42.1%',
      change: '-2.1%',
      trend: 'down',
      category: 'engagement'
    },
    {
      id: '4',
      metric: 'Avg. Session',
      value: '2m 34s',
      change: '+12.3%',
      trend: 'up',
      category: 'engagement'
    },
    {
      id: '5',
      metric: 'Revenue',
      value: '$45,234',
      change: '+8.7%',
      trend: 'up',
      category: 'revenue'
    }
  ];

  const performanceData = [
    {
      id: '1',
      page: '/dashboard',
      loadTime: '1.2s',
      performance: 'excellent',
      users: '2,456',
      category: 'core'
    },
    {
      id: '2',
      page: '/analytics',
      loadTime: '2.1s',
      performance: 'good',
      users: '1,234',
      category: 'analytics'
    },
    {
      id: '3',
      page: '/messages',
      loadTime: '0.8s',
      performance: 'excellent',
      users: '3,567',
      category: 'communication'
    },
    {
      id: '4',
      page: '/settings',
      loadTime: '1.5s',
      performance: 'good',
      users: '892',
      category: 'admin'
    },
    {
      id: '5',
      page: '/catalog',
      loadTime: '3.2s',
      performance: 'poor',
      users: '567',
      category: 'content'
    }
  ];

  // User information data
  const userData = {
    'Sarah Johnson': {
      name: 'Sarah Johnson',
      role: 'Senior Developer',
      department: 'Engineering',
      email: 'sarah.johnson@company.com'
    },
    'Mike Chen': {
      name: 'Mike Chen',
      role: 'Product Manager',
      department: 'Product',
      email: 'mike.chen@company.com'
    },
    'Emily Rodriguez': {
      name: 'Emily Rodriguez',
      role: 'UX Designer',
      department: 'Design',
      email: 'emily.rodriguez@company.com'
    },
    'David Kim': {
      name: 'David Kim',
      role: 'Security Engineer',
      department: 'Security',
      email: 'david.kim@company.com'
    },
    'Lisa Thompson': {
      name: 'Lisa Thompson',
      role: 'QA Engineer',
      department: 'Quality Assurance',
      email: 'lisa.thompson@company.com'
    },
    'Alex Wong': {
      name: 'Alex Wong',
      role: 'DevOps Engineer',
      department: 'Operations',
      email: 'alex.wong@company.com'
    },
    'Rachel Green': {
      name: 'Rachel Green',
      role: 'UI Designer',
      department: 'Design',
      email: 'rachel.green@company.com'
    },
    'Tom Wilson': {
      name: 'Tom Wilson',
      role: 'Performance Engineer',
      department: 'Engineering',
      email: 'tom.wilson@company.com'
    },
    'Jessica Lee': {
      name: 'Jessica Lee',
      role: 'Technical Writer',
      department: 'Documentation',
      email: 'jessica.lee@company.com'
    },
    'Ryan Davis': {
      name: 'Ryan Davis',
      role: 'Architecture Lead',
      department: 'Engineering',
      email: 'ryan.davis@company.com'
    }
  };

  // Document management data
  const documentsData = [
    {
      id: '1',
      name: 'API Documentation v2.1',
      type: 'documentation',
      status: 'published',
      author: 'Sarah Johnson',
      lastModified: '2024-01-15',
      version: '2.1.0',
      size: '2.4 MB',
      category: 'api',
      sharedWith: ['Mike Chen', 'Alex Wong', 'David Kim']
    },
    {
      id: '2',
      name: 'Component Library Guide',
      type: 'guide',
      status: 'review',
      author: 'Mike Chen',
      lastModified: '2024-01-14',
      version: '1.0.0',
      size: '1.8 MB',
      category: 'components',
      sharedWith: ['Sarah Johnson', 'Emily Rodriguez']
    },
    {
      id: '3',
      name: 'Database Schema Design',
      type: 'design',
      status: 'draft',
      author: 'Emily Rodriguez',
      lastModified: '2024-01-13',
      version: '0.9.0',
      size: '3.2 MB',
      category: 'database',
      sharedWith: ['David Kim']
    },
    {
      id: '4',
      name: 'Security Implementation',
      type: 'documentation',
      status: 'published',
      author: 'David Kim',
      lastModified: '2024-01-12',
      version: '1.2.0',
      size: '1.5 MB',
      category: 'security',
      sharedWith: ['Sarah Johnson', 'Tom Wilson', 'Rachel Green', 'Alex Wong']
    },
    {
      id: '5',
      name: 'Testing Strategy',
      type: 'strategy',
      status: 'review',
      author: 'Lisa Thompson',
      lastModified: '2024-01-11',
      version: '1.1.0',
      size: '2.1 MB',
      category: 'testing',
      sharedWith: ['Mike Chen', 'Emily Rodriguez', 'Jessica Lee']
    },
    {
      id: '6',
      name: 'Deployment Guide',
      type: 'guide',
      status: 'published',
      author: 'Alex Wong',
      lastModified: '2024-01-10',
      version: '1.0.0',
      size: '1.9 MB',
      category: 'deployment',
      sharedWith: ['Sarah Johnson', 'Mike Chen', 'David Kim', 'Rachel Green']
    },
    {
      id: '7',
      name: 'UI/UX Design System',
      type: 'design',
      status: 'draft',
      author: 'Rachel Green',
      lastModified: '2024-01-09',
      version: '0.8.0',
      size: '4.2 MB',
      category: 'design',
      sharedWith: ['Emily Rodriguez', 'Jessica Lee']
    },
    {
      id: '8',
      name: 'Performance Optimization',
      type: 'documentation',
      status: 'published',
      author: 'Tom Wilson',
      lastModified: '2024-01-08',
      version: '1.3.0',
      size: '2.7 MB',
      category: 'performance',
      sharedWith: ['Sarah Johnson', 'Alex Wong', 'David Kim']
    },
    {
      id: '9',
      name: 'Code Review Guidelines',
      type: 'guide',
      status: 'review',
      author: 'Jessica Lee',
      lastModified: '2024-01-07',
      version: '1.0.0',
      size: '1.2 MB',
      category: 'process',
      sharedWith: ['Mike Chen', 'Lisa Thompson', 'Ryan Davis']
    },
    {
      id: '10',
      name: 'Architecture Overview',
      type: 'documentation',
      status: 'published',
      author: 'Ryan Davis',
      lastModified: '2024-01-06',
      version: '2.0.0',
      size: '3.8 MB',
      category: 'architecture',
      sharedWith: ['Sarah Johnson', 'David Kim', 'Tom Wilson', 'Alex Wong', 'Rachel Green']
    }
  ];

  const currentLayout = layouts.find(layout => layout.id === currentLayoutId) || layouts[0];

  // Tabs state for document registry
  const [activeTab, setActiveTab] = useState('all');
  const documentTabs = [
    {
      id: 'all',
      label: 'All Documents',
      content: null
    },
    {
      id: 'classified',
      label: 'Classified',
      content: null
    },
    {
      id: 'confidential',
      label: 'Confidential',
      content: null
    },
    {
      id: 'restricted',
      label: 'Restricted',
      content: null
    }
  ];

  // Filter documents based on selected category
  const filteredDocuments = React.useMemo(() => {
    if (selectedCategory === 'all') {
      return documentsData;
    }
    return documentsData.filter(doc => doc.category === selectedCategory);
  }, [documentsData, selectedCategory]);

  const handleNavigate = (path: string) => {
    // Auto-expand navigation rails if they are collapsed when an item is clicked
    if (leftCollapsed) {
      setLeftCollapsed(false);
    }
    if (rightCollapsed) {
      setRightCollapsed(false);
    }
    onNavigate(path);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderName)) {
        newSet.delete(folderName);
      } else {
        newSet.add(folderName);
      }
      return newSet;
    });
  };











  const handleCloseNewMessageModal = () => {
    setShowNewMessageModal(false);
    setNewMessageForm({
      recipient: '',
      subject: '',
      message: '',
      priority: 'medium'
    });
  };

  const handleSubmitNewMessage = () => {
    // Here you would typically send the message to your backend
    console.log('New message:', newMessageForm);
    
    // Add the new message to the list (for demo purposes)
    // const newMessage = {
    //   id: allMessages.length + 1,
    //   sender: 'You',
    //   subject: newMessageForm.subject,
    //   status: 'Read',
    //   date: new Date().toISOString().split('T')[0],
    //   priority: newMessageForm.priority
    // };
    
    // In a real app, you'd update the messages list here
    handleCloseNewMessageModal();
  };

  const handleFormChange = (field: string, value: string) => {
    setNewMessageForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAlertRead = (alertId: string) => {
    console.log('Marking alert as read:', alertId);
    setAlerts(prev => {
      const updated = prev.map(alert => 
        alert.id === alertId ? { ...alert, read: true } : alert
      );
      console.log('Updated alerts:', updated);
      return updated;
    });
  };

  // Handle dismissing security alerts and moving to notifications
  const handleDismissSecurityAlert = (alertId: string) => {
    const alertToDismiss = securityAlerts.find(alert => alert.id === alertId);
    if (alertToDismiss) {
      // Mark alert as dismissed
      setSecurityAlerts(prevAlerts => 
        prevAlerts.map(alert => 
          alert.id === alertId ? { ...alert, dismissed: true } : alert
        )
      );

      // Add to notifications
      const newNotification = {
        id: `notif-${Date.now()}`,
        title: alertToDismiss.title,
        message: alertToDismiss.message,
        type: alertToDismiss.type,
        timestamp: new Date(),
        read: false,
        source: 'alert' as const
      };

      setNotifications(prevNotifications => [newNotification, ...prevNotifications]);
    }
  };

  // Handle treemap node clicks for filtering
  const handleTreemapNodeClick = (node: { classification?: string; department?: string }) => {
    setTableFilter(node);
  };

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'b' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        setLeftCollapsed(prev => !prev);
      }
      if (event.key === 'n' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        setRightCollapsed(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const renderContent = () => {
    // If custom content is provided, render it instead of default content
    if (customContent) {
      return customContent;
    }
    
    // Special case for settings page
    if (currentPath === '/settings') {
      return (
        <div className="h-full space-y-6">
          {/* Settings Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
              <p className="text-gray-600 mt-1">Configure Build preferences and system options</p>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" icon={<Icon name="save" className="w-4 h-4" />}>
                Save Changes
              </Button>
              <Button icon={<Icon name="refresh" className="w-4 h-4" />}>
                Reset to Defaults
              </Button>
            </div>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Column - Main Settings */}
            <div className="space-y-4">
              {/* General Settings */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <Icon name="settings" className="w-4 h-4 text-blue-600 mr-2" />
                  General Settings
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">System Name</label>
                      <input
                        type="text"
                        defaultValue="Build Production"
                        className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Environment</label>
                      <select className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        <option>Production</option>
                        <option>Staging</option>
                        <option>Development</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">System Description</label>
                    <textarea
                      rows={2}
                      defaultValue="Build project management system for enterprise teams"
                      className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Security Settings */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <Icon name="security" className="w-4 h-4 text-green-600 mr-2" />
                  Security & Access
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout</label>
                      <select className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        <option>30 minutes</option>
                        <option>1 hour</option>
                        <option>4 hours</option>
                        <option>8 hours</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password Policy</label>
                      <select className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        <option>Standard</option>
                        <option>Enhanced</option>
                        <option>Strict</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="mfa" className="mr-2" defaultChecked />
                      <label htmlFor="mfa" className="text-sm text-gray-700">Enable Multi-Factor Authentication</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="audit" className="mr-2" />
                      <label htmlFor="audit" className="text-sm text-gray-700">Enable Audit Logging</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <Icon name="notification" className="w-4 h-4 text-purple-600 mr-2" />
                  Notifications
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Notifications</label>
                      <select className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        <option>All notifications</option>
                        <option>Important only</option>
                        <option>None</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Push Notifications</label>
                      <select className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                        <option>Enabled</option>
                        <option>Disabled</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Project updates</span>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Task assignments</span>
                      <input type="checkbox" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">System alerts</span>
                      <input type="checkbox" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Quick Actions & Status */}
            <div className="space-y-4">
              {/* System Status */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <Icon name="dashboard" className="w-4 h-4 text-orange-600 mr-2" />
                  System Status
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Database</span>
                    <Chip label="Online" variant="success" size="small" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">API Services</span>
                    <Chip label="Online" variant="success" size="small" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">File Storage</span>
                    <Chip label="Online" variant="success" size="small" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Email Service</span>
                    <Chip label="Warning" variant="warning" size="small" />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <Icon name="add" className="w-4 h-4 text-blue-600 mr-2" />
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button 
                    variant="secondary" 
                    icon={<Icon name="user" className="w-4 h-4" />}
                    className="w-full justify-start text-sm py-1.5"
                  >
                    Manage Users
                  </Button>
                  <Button 
                    variant="secondary" 
                    icon={<Icon name="folder" className="w-4 h-4" />}
                    className="w-full justify-start text-sm py-1.5"
                  >
                    Backup Data
                  </Button>
                  <Button 
                    variant="secondary" 
                    icon={<Icon name="analytics" className="w-4 h-4" />}
                    className="w-full justify-start text-sm py-1.5"
                  >
                    View Logs
                  </Button>
                  <Button 
                    variant="secondary" 
                    icon={<Icon name="settings" className="w-4 h-4" />}
                    className="w-full justify-start text-sm py-1.5"
                  >
                    Advanced Settings
                  </Button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center">
                  <Icon name="time" className="w-4 h-4 text-gray-600 mr-2" />
                  Recent Activity
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Settings updated</p>
                      <p className="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">New user added</p>
                      <p className="text-xs text-gray-500">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">System backup</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    switch (currentLayout.layout) {
      case 'two-column':
        return (
          <div className="grid grid-cols-2 gap-6 h-full">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Search Interface</h3>
              <p className="text-gray-600 mb-4">
                Search functionality with various action buttons and filters.
              </p>
              
              {/* Search Bar */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex-1 relative">
                    <Icon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for documents, users, or content..."
                      className="w-full pl-10 pr-4 py-2 bg-[#f5f5f5] border-0 border-b border-[#525965] focus:outline-none focus:ring-0 focus:border-2 focus:border-blue-500"
                    />
                  </div>
                  <Button 
                    icon={<Icon name="search" className="w-4 h-4" />}
                    onClick={() => alert('Search executed!')}
                  >
                    Search
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <h4 className="text-md font-medium text-gray-700">Quick Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    icon={<Icon name="add" className="w-4 h-4" />}
                    onClick={() => alert('Add new item')}
                  >
                    Add Item
                  </Button>
                  <Button 
                    variant="secondary"
                    icon={<Icon name="download" className="w-4 h-4" />}
                    onClick={() => alert('Export data')}
                  >
                    Export
                  </Button>
                  <Button 
                    variant="text"
                    icon={<Icon name="settings" className="w-4 h-4" />}
                    onClick={() => alert('Open settings')}
                  >
                    Settings
                  </Button>
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="mt-6 space-y-4">
                <h4 className="text-md font-medium text-gray-700">Filters</h4>
                <div className="flex flex-wrap gap-2">
                  <Button size="small" variant="secondary">All</Button>
                  <Button size="small" variant="secondary">Documents</Button>
                  <Button size="small" variant="secondary">Users</Button>
                  <Button size="small" variant="secondary">Recent</Button>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Search Results</h3>
              <p className="text-gray-600 mb-4">
                Results and advanced search options with action buttons.
              </p>
              
              {/* Results Actions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Found 24 results</span>
                  <div className="flex gap-2">
                    <Button 
                      size="small"
                      icon={<Icon name="view" className="w-4 h-4" />}
                      variant="secondary"
                    >
                      View
                    </Button>
                    <Button 
                      size="small"
                      icon={<Icon name="edit" className="w-4 h-4" />}
                      variant="secondary"
                    >
                      Edit
                    </Button>
                    <Button 
                      size="small"
                      icon={<Icon name="delete" className="w-4 h-4" />}
                      variant="destructive"
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                {/* Advanced Search */}
                <div className="bg-gray-50 p-4 space-y-3">
                  <h4 className="text-md font-medium text-gray-700">Advanced Search</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      size="small"
                      icon={<Icon name="calendar" className="w-4 h-4" />}
                      variant="secondary"
                    >
                      Date Range
                    </Button>
                    <Button 
                      size="small"
                      icon={<Icon name="user" className="w-4 h-4" />}
                      variant="secondary"
                    >
                      By Author
                    </Button>
                    <Button 
                      size="small"
                      icon={<Icon name="tag" className="w-4 h-4" />}
                      variant="secondary"
                    >
                      By Tag
                    </Button>
                  </div>
                </div>

                {/* Bulk Actions */}
                <div className="space-y-3">
                  <h4 className="text-md font-medium text-gray-700">Bulk Actions</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      icon={<Icon name="download" className="w-4 h-4" />}
                      iconRight={<Icon name="arrow-down" className="w-4 h-4" />}
                      variant="secondary"
                    >
                      Download All
                    </Button>
                    <Button 
                      icon={<Icon name="share" className="w-4 h-4" />}
                      variant="secondary"
                    >
                      Share Selected
                    </Button>
                    <Button 
                      icon={<Icon name="archive" className="w-4 h-4" />}
                      variant="text"
                    >
                      Archive
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tree-menu':
        return (
          <div className="flex h-full">
            {/* Tree Menu Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pt-0">Document Categories</h3>
              <div className="space-y-2">
                {/* All Documents */}
                <div 
                  className={clsx(
                    "flex items-center p-2 rounded cursor-pointer group",
                    selectedCategory === 'all' 
                      ? 'bg-[#E0F3FE] text-[#0F62FE] border border-[#0F62FE]' 
                      : 'hover:bg-gray-50'
                  )}
                  onClick={() => setSelectedCategory('all')}
                >
                  <Icon name="folder" className="w-4 h-4 text-gray-500 mr-2 group-hover:text-gray-600" />
                  <span className="text-sm font-medium">All Documents</span>
                </div>

                {/* Documentation Folder */}
                <div 
                  className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer group"
                  onClick={() => toggleFolder('documentation')}
                >
                  <Icon name="folder" className="w-4 h-4 text-blue-500 mr-2 group-hover:text-blue-600" />
                  <span className="text-sm group-hover:text-gray-800">Documentation</span>
                  <Icon 
                    name={expandedFolders.has('documentation') ? 'chevron-down' : 'chevron-right'} 
                    className="w-3 h-3 text-gray-400 ml-auto group-hover:text-gray-600 transition-transform duration-200" 
                  />
                </div>
                {expandedFolders.has('documentation') && (
                  <div className="ml-4 space-y-1">
                    <div 
                      className={clsx(
                        "flex items-center p-2 rounded cursor-pointer group",
                        selectedCategory === 'api' 
                          ? 'bg-[#E0F3FE] text-[#0F62FE] border border-[#0F62FE]' 
                          : 'hover:bg-gray-50'
                      )}
                      onClick={() => setSelectedCategory('api')}
                    >
                      <Icon name="document" className="w-4 h-4 text-gray-500 mr-2 group-hover:text-blue-600" />
                      <span className="text-sm group-hover:text-gray-800">API Docs</span>
                    </div>
                    <div 
                      className={clsx(
                        "flex items-center p-2 rounded cursor-pointer group",
                        selectedCategory === 'components' 
                          ? 'bg-[#E0F3FE] text-[#0F62FE] border border-[#0F62FE]' 
                          : 'hover:bg-gray-50'
                      )}
                      onClick={() => setSelectedCategory('components')}
                    >
                      <Icon name="document" className="w-4 h-4 text-gray-500 mr-2 group-hover:text-blue-600" />
                      <span className="text-sm group-hover:text-gray-800">User Guides</span>
                    </div>
                  </div>
                )}
                
                {/* Guides Folder */}
                <div 
                  className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer group"
                  onClick={() => toggleFolder('guides')}
                >
                  <Icon name="folder" className="w-4 h-4 text-green-500 mr-2 group-hover:text-green-600" />
                  <span className="text-sm group-hover:text-gray-800">Guides</span>
                  <Icon 
                    name={expandedFolders.has('guides') ? 'chevron-down' : 'chevron-right'} 
                    className="w-3 h-3 text-gray-400 ml-auto group-hover:text-gray-600 transition-transform duration-200" 
                  />
                </div>
                {expandedFolders.has('guides') && (
                  <div className="ml-4 space-y-1">
                    <div 
                      className={clsx(
                        "flex items-center p-2 rounded cursor-pointer group",
                        selectedCategory === 'deployment' 
                          ? 'bg-[#E0F3FE] text-[#0F62FE] border border-[#0F62FE]' 
                          : 'hover:bg-gray-50'
                      )}
                      onClick={() => setSelectedCategory('deployment')}
                    >
                      <Icon name="document" className="w-4 h-4 text-gray-500 mr-2 group-hover:text-blue-600" />
                      <span className="text-sm group-hover:text-gray-800">Setup Guides</span>
                    </div>
                    <div 
                      className={clsx(
                        "flex items-center p-2 rounded cursor-pointer group",
                        selectedCategory === 'process' 
                          ? 'bg-[#E0F3FE] text-[#0F62FE] border border-[#0F62FE]' 
                          : 'hover:bg-gray-50'
                      )}
                      onClick={() => setSelectedCategory('process')}
                    >
                      <Icon name="document" className="w-4 h-4 text-gray-500 mr-2 group-hover:text-blue-600" />
                      <span className="text-sm group-hover:text-gray-800">Tutorials</span>
                    </div>
                  </div>
                )}
                
                {/* Design Folder */}
                <div 
                  className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer group"
                  onClick={() => toggleFolder('design')}
                >
                  <Icon name="folder" className="w-4 h-4 text-purple-500 mr-2 group-hover:text-purple-600" />
                  <span className="text-sm group-hover:text-gray-800">Design</span>
                  <Icon 
                    name={expandedFolders.has('design') ? 'chevron-down' : 'chevron-right'} 
                    className="w-3 h-3 text-gray-400 ml-auto group-hover:text-gray-600 transition-transform duration-200" 
                  />
                </div>
                {expandedFolders.has('design') && (
                  <div className="ml-4 space-y-1">
                    <div 
                      className={clsx(
                        "flex items-center p-2 rounded cursor-pointer group",
                        selectedCategory === 'design' 
                          ? 'bg-[#E0F3FE] text-[#0F62FE] border border-[#0F62FE]' 
                          : 'hover:bg-gray-50'
                      )}
                      onClick={() => setSelectedCategory('design')}
                    >
                      <Icon name="document" className="w-4 h-4 text-gray-500 mr-2 group-hover:text-blue-600" />
                      <span className="text-sm group-hover:text-gray-800">UI/UX</span>
                    </div>
                    <div 
                      className={clsx(
                        "flex items-center p-2 rounded cursor-pointer group",
                        selectedCategory === 'database' 
                          ? 'bg-[#E0F3FE] text-[#0F62FE] border border-[#0F62FE]' 
                          : 'hover:bg-gray-50'
                      )}
                      onClick={() => setSelectedCategory('database')}
                    >
                      <Icon name="document" className="w-4 h-4 text-gray-500 mr-2 group-hover:text-blue-600" />
                      <span className="text-sm group-hover:text-gray-800">Wireframes</span>
                    </div>
                  </div>
                )}
                
                {/* Strategy Folder */}
                <div 
                  className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer group"
                  onClick={() => toggleFolder('strategy')}
                >
                  <Icon name="folder" className="w-4 h-4 text-orange-500 mr-2 group-hover:text-orange-600" />
                  <span className="text-sm group-hover:text-gray-800">Strategy</span>
                  <Icon 
                    name={expandedFolders.has('strategy') ? 'chevron-down' : 'chevron-right'} 
                    className="w-3 h-3 text-gray-400 ml-auto group-hover:text-gray-600 transition-transform duration-200" 
                  />
                </div>
                {expandedFolders.has('strategy') && (
                  <div className="ml-4 space-y-1">
                    <div 
                      className={clsx(
                        "flex items-center p-2 rounded cursor-pointer group",
                        selectedCategory === 'architecture' 
                          ? 'bg-[#E0F3FE] text-[#0F62FE] border border-[#0F62FE]' 
                          : 'hover:bg-gray-50'
                      )}
                      onClick={() => setSelectedCategory('architecture')}
                    >
                      <Icon name="document" className="w-4 h-4 text-gray-500 mr-2 group-hover:text-blue-600" />
                      <span className="text-sm group-hover:text-gray-800">Architecture</span>
                    </div>
                    <div 
                      className={clsx(
                        "flex items-center p-2 rounded cursor-pointer group",
                        selectedCategory === 'testing' 
                          ? 'bg-[#E0F3FE] text-[#0F62FE] border border-[#0F62FE]' 
                          : 'hover:bg-gray-50'
                      )}
                      onClick={() => setSelectedCategory('testing')}
                    >
                      <Icon name="document" className="w-4 h-4 text-gray-500 mr-2 group-hover:text-blue-600" />
                      <span className="text-sm group-hover:text-gray-800">Roadmaps</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 p-6 pt-4">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Document Management</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedCategory === 'all' 
                      ? 'All development documentation and resources' 
                      : `Showing ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} documents (${filteredDocuments.length} items)`
                    }
                  </p>
                </div>
                <button className="bg-[#0F62FE] text-white px-4 py-2 rounded-lg hover:bg-[#0043CE] transition-colors duration-200 flex items-center gap-2">
                  <Icon name="add" className="w-4 h-4" />
                  New Document
                </button>
              </div>
              
              <Table
                data={filteredDocuments}
                columns={[
                  {
                    key: 'name',
                    header: 'Document Name',
                    sortable: true,
                    render: (item) => (
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-[#0F62FE] rounded flex items-center justify-center text-white text-sm font-medium mr-3">
                          {item.type === 'documentation' ? '📄' : 
                           item.type === 'guide' ? '📖' : 
                           item.type === 'design' ? '🎨' : 
                           item.type === 'strategy' ? '📊' : '📝'}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-xs text-gray-500">v{item.version}</div>
                        </div>
                      </div>
                    )
                  },
                  {
                    key: 'type',
                    header: 'Type',
                    sortable: true,
                    render: (item) => (
                      <Chip 
                        label={item.type.charAt(0).toUpperCase() + item.type.slice(1)} 
                        variant="secondary" 
                        size="small" 
                        fillVariant="outlined"
                      />
                    )
                  },
                  {
                    key: 'status',
                    header: 'Status',
                    sortable: true,
                    render: (item) => {
                      const statusConfig: Record<string, { variant: 'success' | 'warning' | 'error' | 'info', label: string }> = {
                        published: { variant: 'success', label: 'Published' },
                        review: { variant: 'warning', label: 'In Review' },
                        draft: { variant: 'error', label: 'Draft' }
                      };
                      const config = statusConfig[item.status];
                      return (
                        <Chip 
                          label={config.label} 
                          variant={config.variant} 
                          size="small"
                        />
                      );
                    }
                  },
                  {
                    key: 'author',
                    header: 'Author',
                    sortable: true,
                    render: (item) => (
                      <div className="flex items-center">
                        <UserAvatar
                          user={userData[item.author as keyof typeof userData]}
                          size="small"
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{item.author}</span>
                      </div>
                    )
                  },
                  {
                    key: 'sharedWith',
                    header: 'Shared With',
                    sortable: true,
                    render: (item) => (
                      <div className="flex items-center">
                        {item.sharedWith && item.sharedWith.length > 0 ? (
                          <div className="flex -space-x-2">
                            {item.sharedWith.slice(0, 3).map((user, index) => (
                              <UserAvatar
                                key={index}
                                user={userData[user as keyof typeof userData]}
                                size="small"
                                className="border-2 border-white"
                              />
                            ))}
                            {item.sharedWith.length > 3 && (
                              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs font-medium border-2 border-white shadow-sm">
                                +{item.sharedWith.length - 3}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">Not shared</span>
                        )}
                      </div>
                    )
                  },
                  {
                    key: 'lastModified',
                    header: 'Last Modified',
                    sortable: true,
                    render: (item) => (
                      <span className="text-sm text-gray-600">
                        {new Date(item.lastModified).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    )
                  },
                  {
                    key: 'size',
                    header: 'Size',
                    sortable: true,
                    alignRight: true,
                    render: (item) => (
                      <span className="text-sm text-gray-600">{item.size}</span>
                    )
                  }
                ]}
                selectable={true}
                hoverable={true}
                striped={true}
                bordered={false}
                compact={false}
                onRowSelect={(selectedItems) => {
                  console.log('Selected documents:', selectedItems);
                }}
                onRowActivate={(item) => {
                  console.log('Opening document:', item);
                  // Here you could open a modal, navigate to document viewer, etc.
                }}
                getRowKey={(item) => item.id}
                aria-label="Document management table with sorting and selection capabilities"
              />
            </div>
          </div>
        );

                   case 'three-cards':
               return (
                 <div className="space-y-6">
                   {/* Three Cards on Top */}
                   <div className="grid grid-cols-3 gap-6">
                     <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-lg shadow-lg text-white">
                       <div className="flex items-center mb-4">
                         <Icon name="dashboard" className="w-8 h-8 mr-3" />
                         <h3 className="text-xl font-semibold">Primary Card</h3>
                       </div>
                       <p className="text-3xl font-bold mb-2">1,234</p>
                       <p className="text-blue-100">+12% from last month</p>
                     </div>

                     <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-lg shadow-lg text-white">
                       <div className="flex items-center mb-4">
                         <Icon name="analytics" className="w-8 h-8 mr-3" />
                         <h3 className="text-xl font-semibold">Secondary Card</h3>
                       </div>
                       <p className="text-3xl font-bold mb-2">456</p>
                       <p className="text-green-100">Currently active</p>
                     </div>

                     <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-lg shadow-lg text-white">
                       <div className="flex items-center mb-4">
                         <Icon name="security" className="w-8 h-8 mr-3" />
                         <h3 className="text-xl font-semibold">Tertiary Card</h3>
                       </div>
                       <p className="text-3xl font-bold mb-2">98%</p>
                       <p className="text-purple-100">System health</p>
                     </div>
                   </div>

                   {/* Content Below Cards */}
                   <div>
                     <h3 className="text-lg font-semibold text-gray-800 mb-4">Content Section</h3>
                     <p className="text-gray-600 mb-4">
                       This layout features three prominent cards at the top with content below.
                     </p>
                     <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-gray-50 rounded-lg">
                         <h4 className="font-medium text-gray-800 mb-4">Key Metrics</h4>
                         <Table
                           data={analyticsData}
                           columns={[
                             {
                               key: 'metric',
                               header: 'Metric',
                               sortable: true,
                               render: (item) => (
                                 <span className="font-medium text-gray-900">{item.metric}</span>
                               )
                             },
                             {
                               key: 'value',
                               header: 'Value',
                               sortable: true,
                               render: (item) => (
                                 <span className="font-semibold text-gray-900">{item.value}</span>
                               )
                             },
                             {
                               key: 'change',
                               header: 'Change',
                               sortable: true,
                               render: (item) => (
                                 <Chip 
                                   label={item.change} 
                                   variant={item.trend === 'up' ? 'success' : 'error'} 
                                   size="small"
                                 />
                               )
                             },
                             {
                               key: 'category',
                               header: 'Category',
                               sortable: true,
                               render: (item) => (
                                 <Chip 
                                   label={item.category} 
                                   variant="secondary" 
                                   size="small" 
                                   fillVariant="outlined"
                                 />
                               )
                             }
                           ]}
                           selectable={false}
                           hoverable={true}
                           striped={true}
                           bordered={false}
                           compact={true}
                           aria-label="Key metrics analytics table"
                         />
                       </div>
                       <div className="p-4 bg-gray-50 rounded-lg">
                         <h4 className="font-medium text-gray-800 mb-4">Page Performance</h4>
                         <Table
                           data={performanceData}
                           columns={[
                             {
                               key: 'page',
                               header: 'Page',
                               sortable: true,
                               render: (item) => (
                                 <span className="font-medium text-gray-900">{item.page}</span>
                               )
                             },
                             {
                               key: 'loadTime',
                               header: 'Load Time',
                               sortable: true,
                               render: (item) => (
                                 <span className="text-sm text-gray-600">{item.loadTime}</span>
                               )
                             },
                             {
                               key: 'performance',
                               header: 'Performance',
                               sortable: true,
                               render: (item) => {
                                 const performanceConfig: Record<string, { variant: 'success' | 'warning' | 'error', label: string }> = {
                                   excellent: { variant: 'success', label: 'Excellent' },
                                   good: { variant: 'warning', label: 'Good' },
                                   poor: { variant: 'error', label: 'Poor' }
                                 };
                                 const config = performanceConfig[item.performance];
                                 return (
                                   <Chip 
                                     label={config.label} 
                                     variant={config.variant} 
                                     size="small"
                                   />
                                 );
                               }
                             },
                             {
                               key: 'users',
                               header: 'Users',
                               sortable: true,
                               alignRight: true,
                               render: (item) => (
                                 <span className="text-sm text-gray-600">{item.users}</span>
                               )
                             }
                           ]}
                           selectable={false}
                           hoverable={true}
                           striped={true}
                           bordered={false}
                           compact={true}
                           aria-label="Page performance analytics table"
                         />
                       </div>
                     </div>
                   </div>
                 </div>
               );

             case 'messages-table':
               return (
                 <div className="space-y-6">
                   <div className="flex items-center justify-between mb-6">
                     <div>
                       <h3 className="text-lg font-semibold text-gray-800">Messages</h3>
                       <p className="text-sm text-gray-600 mt-1">Manage your messages and notifications</p>
                     </div>
                     <button className="bg-[#0F62FE] text-white px-4 py-2 rounded-lg hover:bg-[#0043CE] transition-colors duration-200 flex items-center gap-2">
                       <Icon name="add" className="w-4 h-4" />
                       New Message
                     </button>
                   </div>
                   
                   <Table
                     data={messagesData}
                     columns={[
                       {
                         key: 'sender',
                         header: 'Sender',
                         sortable: true,
                         render: (item) => (
                           <div className="flex items-center">
                             <div className="w-8 h-8 bg-[#0F62FE] rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                               {item.sender.split(' ').map(n => n[0]).join('')}
                             </div>
                             <span className="font-medium text-gray-900">{item.sender}</span>
                           </div>
                         )
                       },
                       {
                         key: 'subject',
                         header: 'Subject',
                         sortable: true,
                         render: (item) => (
                           <div>
                             <div className="font-medium text-gray-900">{item.subject}</div>
                             <Chip 
                               label={item.category} 
                               variant="secondary" 
                               size="small" 
                               fillVariant="outlined"
                             />
                           </div>
                         )
                       },
                       {
                         key: 'status',
                         header: 'Status',
                         sortable: true,
                         render: (item) => (
                           <Chip 
                             label={item.status === 'unread' ? 'Unread' : 'Read'} 
                             variant={item.status === 'unread' ? 'primary' : 'secondary'} 
                             size="small"
                           />
                         )
                       },
                       {
                         key: 'priority',
                         header: 'Priority',
                         sortable: true,
                         render: (item) => {
                           const priorityConfig: Record<string, { variant: 'error' | 'warning' | 'success', label: string }> = {
                             high: { variant: 'error', label: 'High' },
                             medium: { variant: 'warning', label: 'Medium' },
                             low: { variant: 'success', label: 'Low' }
                           };
                           const config = priorityConfig[item.priority];
                           return (
                             <Chip 
                               label={config.label} 
                               variant={config.variant} 
                               size="small"
                             />
                           );
                         }
                       },
                       {
                         key: 'date',
                         header: 'Date',
                         sortable: true,
                         alignRight: true,
                         render: (item) => (
                           <span className="text-sm text-gray-600">
                             {new Date(item.date).toLocaleDateString('en-US', {
                               month: 'short',
                               day: 'numeric',
                               year: 'numeric'
                             })}
                           </span>
                         )
                       }
                     ]}
                     selectable={true}
                     hoverable={true}
                     striped={true}
                     bordered={false}
                     compact={false}
                     onRowSelect={(selectedItems) => {
                       console.log('Selected messages:', selectedItems);
                     }}
                     onRowActivate={(item) => {
                       console.log('Activated message:', item);
                       // Here you could open a modal, navigate to detail page, etc.
                     }}
                     getRowKey={(item) => item.id}
                     aria-label="Messages table with sorting and selection capabilities"
                   />
                 </div>
               );

      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Government Document Management Dashboard */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Government Document Management</h2>
              <p className="text-gray-600">Sensitive document tracking and workflow management system</p>
            </div>

            {/* Security Alerts */}
            {securityAlerts.filter(alert => !alert.dismissed).length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Icon name="security" className="w-6 h-6 text-red-600 mr-3" />
                    <h3 className="text-lg font-semibold text-red-800">Security Alerts</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-red-600">
                      {securityAlerts.filter(alert => !alert.dismissed).length} active
                    </span>
                    <span className="text-sm text-gray-500">
                      {notifications.filter(n => n.source === 'alert' && !n.read).length} in notifications
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  {securityAlerts
                    .filter(alert => !alert.dismissed)
                    .map(alert => (
                      <div key={alert.id} className="flex items-center justify-between p-3 bg-red-100 rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-red-800">{alert.title}</p>
                          <p className="text-xs text-red-600">{alert.message}</p>
                          <p className="text-xs text-red-500 mt-1">
                            {alert.timestamp.toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Chip 
                            label={alert.type === 'error' ? 'BLOCKED' : 'REVIEW'} 
                            variant={alert.type} 
                            size="small" 
                          />
                          <button
                            onClick={() => handleDismissSecurityAlert(alert.id)}
                            className="p-1 text-red-600 hover:text-red-800 hover:bg-red-200 rounded transition-colors"
                            title="Dismiss and move to notifications"
                          >
                            <Icon name="close" className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}



            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div 
                className="p-6 border border-[#EDF1F5] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => onNavigate('/total-documents')}
              >
                <div className="flex items-center mb-4">
                  <Icon name="document" className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-700">Total Documents</h3>
                </div>
                <p className="text-3xl font-bold text-blue-600">{getDocumentStats().total}</p>
                <p className="text-sm text-gray-500 mt-1">Active sensitive files</p>
              </div>
              
              <div 
                className="p-6 border border-[#EDF1F5] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => onNavigate('/active-workflows')}
              >
                <div className="flex items-center mb-4">
                  <Icon name="workflow" className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-700">Active Workflows</h3>
                </div>
                <p className="text-3xl font-bold text-green-600">{getDocumentStats().byStatus['Pending Review'] + getDocumentStats().byStatus['In Review'] + getDocumentStats().byStatus['Pending Approval']}</p>
                <p className="text-sm text-gray-500 mt-1">Pending approvals</p>
              </div>
              
              <div 
                className="p-6 border border-[#EDF1F5] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => onNavigate('/top-secret-files')}
              >
                <div className="flex items-center mb-4">
                  <Icon name="security" className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-700">Top Secret Files</h3>
                </div>
                <p className="text-3xl font-bold text-red-600">{getDocumentStats().byClassification['TOP SECRET']}</p>
                <p className="text-sm text-gray-500 mt-1">Maximum clearance required</p>
              </div>
              
              <div 
                className="p-6 border border-[#EDF1F5] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => onNavigate('/departments')}
              >
                <div className="flex items-center mb-4">
                  <Icon name="user" className="w-6 h-6 text-purple-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-700">Departments</h3>
                </div>
                <p className="text-3xl font-bold text-purple-600">{Object.keys(getDocumentStats().byDepartment).length}</p>
                <p className="text-sm text-gray-500 mt-1">Active departments</p>
              </div>

              <div 
                className="p-6 border border-[#EDF1F5] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => onNavigate('/security-status')}
              >
                <div className="flex items-center mb-4">
                  <Icon name="security" className="w-6 h-6 text-orange-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-700">Security Status</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active Alerts</span>
                    <span className={`text-lg font-bold ${securityAlerts.filter(alert => !alert.dismissed).length > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {securityAlerts.filter(alert => !alert.dismissed).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Notifications</span>
                    <span className="text-lg font-bold text-blue-600">
                      {notifications.filter(n => n.source === 'alert' && !n.read).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">System Status</span>
                    <span className={`text-sm font-medium ${securityAlerts.filter(alert => !alert.dismissed).length > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {securityAlerts.filter(alert => !alert.dismissed).length > 0 ? 'ATTENTION' : 'SECURE'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Status Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="p-6 border border-[#EDF1F5] rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Icon name="pending" className="w-5 h-5 text-orange-600 mr-2" />
                  Pending Review ({getDocumentStats().byStatus['Pending Review']})
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Top Secret Files</span>
                    <Chip label={governmentDocuments.filter(doc => doc.status === 'Pending Review' && doc.classification === 'TOP SECRET').length.toString()} variant="warning" size="small" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Secret Files</span>
                    <Chip label={governmentDocuments.filter(doc => doc.status === 'Pending Review' && doc.classification === 'SECRET').length.toString()} variant="warning" size="small" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Confidential Files</span>
                    <Chip label={governmentDocuments.filter(doc => doc.status === 'Pending Review' && doc.classification === 'CONFIDENTIAL').length.toString()} variant="warning" size="small" />
                  </div>
                </div>
              </div>

              <div className="p-6 border border-[#EDF1F5] rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Icon name="approved" className="w-5 h-5 text-green-600 mr-2" />
                  Approved ({getDocumentStats().byStatus['Approved']})
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Intelligence Reports</span>
                    <Chip label={governmentDocuments.filter(doc => doc.status === 'Approved' && doc.department === 'Intelligence').length.toString()} variant="success" size="small" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Defense Documents</span>
                    <Chip label={governmentDocuments.filter(doc => doc.status === 'Approved' && doc.department === 'Defense').length.toString()} variant="success" size="small" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Finance Reports</span>
                    <Chip label={governmentDocuments.filter(doc => doc.status === 'Approved' && doc.department === 'Finance').length.toString()} variant="success" size="small" />
                  </div>
                </div>
              </div>

              <div className="p-6 border border-[#EDF1F5] rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Icon name="rejected" className="w-5 h-5 text-red-600 mr-2" />
                  In Review ({getDocumentStats().byStatus['In Review']})
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Top Secret Files</span>
                    <Chip label={governmentDocuments.filter(doc => doc.status === 'In Review' && doc.classification === 'TOP SECRET').length.toString()} variant="info" size="small" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Secret Files</span>
                    <Chip label={governmentDocuments.filter(doc => doc.status === 'In Review' && doc.classification === 'SECRET').length.toString()} variant="info" size="small" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Confidential Files</span>
                    <Chip label={governmentDocuments.filter(doc => doc.status === 'In Review' && doc.classification === 'CONFIDENTIAL').length.toString()} variant="info" size="small" />
                  </div>
                </div>
              </div>
            </div>

            {/* Workflow Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 border border-[#EDF1F5] rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Icon name="workflow-automation" className="w-5 h-5 text-blue-600 mr-2" />
                  Active Workflows
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">Security Clearance Review</p>
                        <p className="text-xs text-gray-500">8 documents pending</p>
                      </div>
                      <Chip label="In Progress" variant="info" size="small" />
                    </div>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">Budget Approval Process</p>
                        <p className="text-xs text-gray-500">5 documents pending</p>
                      </div>
                      <Chip label="Active" variant="success" size="small" />
                    </div>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-sm">Policy Review Committee</p>
                        <p className="text-xs text-gray-500">3 documents pending</p>
                      </div>
                      <Chip label="Review" variant="warning" size="small" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border border-[#EDF1F5] rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Icon name="user" className="w-5 h-5 text-purple-600 mr-2" />
                  Recent Access Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <UserAvatar user={{ name: "Sarah Johnson" }} size="small" className="mr-3" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Sarah Johnson</p>
                      <p className="text-xs text-gray-500">Accessed DOC-001 at 14:30</p>
                    </div>
                    <Chip label="Level 5" variant="info" size="small" />
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <UserAvatar user={{ name: "Michael Chen" }} size="small" className="mr-3" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Michael Chen</p>
                      <p className="text-xs text-gray-500">Updated DOC-002 at 09:15</p>
                    </div>
                    <Chip label="Level 4" variant="info" size="small" />
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <UserAvatar user={{ name: "Emily Rodriguez" }} size="small" className="mr-3" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Emily Rodriguez</p>
                      <p className="text-xs text-gray-500">Created DOC-003 at 16:45</p>
                    </div>
                    <Chip label="Level 5" variant="info" size="small" />
                  </div>
                </div>
              </div>
            </div>

            {/* Document Visualization */}
            <div>
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Document Classification & Department Overview</h3>
                <p className="text-sm text-gray-600 mt-1">Visual representation of document distribution by classification and department</p>
              </div>
              <div className="p-6">
                <DocumentTreemap 
                  data={governmentDocuments} 
                  onNodeClick={handleTreemapNodeClick}
                />
              </div>
            </div>

            {/* Document Table */}
            <div>
              <div className="p-6 border-b border-gray-200">
                {/* Document Registry Tabs */}
                <div className="mb-4">
                  <Tabs 
                    tabs={documentTabs}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    variant="default"
                    showContent={false}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Sensitive Document Registry</h3>
                    <p className="text-sm text-gray-600 mt-1">Real-time tracking of all classified documents and their current status</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    {tableFilter.classification || tableFilter.department ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Filtered by:</span>
                        <Chip 
                          label={`${tableFilter.classification || ''} ${tableFilter.department ? `- ${tableFilter.department}` : ''}`.trim()} 
                          variant="info" 
                          size="small" 
                        />
                        <button
                          onClick={() => setTableFilter({})}
                          className="text-sm text-red-600 hover:text-red-800 transition-colors duration-200"
                        >
                          Clear Filter
                        </button>
                      </div>
                    ) : null}
                    <button
                      onClick={() => setShowColumnModal(true)}
                      className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      title="Select columns to display"
                    >
                      <Icon name="column-insert" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                {(() => {
                  // Filter data based on treemap selection
                  let filteredData = governmentDocuments;
                  
                  if (tableFilter.classification) {
                    filteredData = filteredData.filter(doc => doc.classification === tableFilter.classification);
                  }
                  
                  if (tableFilter.department) {
                    filteredData = filteredData.filter(doc => doc.department === tableFilter.department);
                  }
                  
                  // Define all possible columns
                  const allColumns = {
                    'Document ID': { 
                      key: 'id', 
                      header: 'Document ID', 
                      sortable: true,
                      render: (item: any) => <span className="text-sm">{item.id}</span>
                    },
                    'Document Title': { 
                      key: 'title', 
                      header: 'Document Title', 
                      sortable: true,
                      render: (item: any) => <span className="font-medium">{item.title}</span>
                    },
                    'Classification': { 
                      key: 'classification', 
                      header: 'Classification', 
                      sortable: true,
                      render: (item: any) => (
                        <Chip 
                          label={item.classification.toLowerCase().replace(/\b\w/g, (l: string) => l.toUpperCase())} 
                          variant={item.classification === 'TOP SECRET' ? 'error' : item.classification === 'SECRET' ? 'warning' : 'info'} 
                          size="small" 
                        />
                      )
                    },
                    'Owner': { 
                      key: 'owner', 
                      header: 'Owner', 
                      sortable: true,
                      render: (item: any) => <span>{item.owner}</span>
                    },
                    'Department': { 
                      key: 'department', 
                      header: 'Department', 
                      sortable: true,
                      render: (item: any) => <span>{item.department}</span>
                    },
                    'Status': { 
                      key: 'status', 
                      header: 'Status', 
                      sortable: true,
                      render: (item: any) => (
                        <Chip 
                          label={item.status} 
                          variant={item.status === 'Approved' ? 'success' : item.status === 'Pending Review' ? 'warning' : 'info'} 
                          size="small" 
                        />
                      )
                    },
                    'Workflow': { 
                      key: 'workflow', 
                      header: 'Workflow', 
                      sortable: true,
                      render: (item: any) => <span>{item.workflow}</span>
                    },
                    'Access Level': { 
                      key: 'accessLevel', 
                      header: 'Access Level', 
                      sortable: true,
                      render: (item: any) => <span className="text-sm">{item.accessLevel}</span>
                    },
                    'Last Modified': { 
                      key: 'lastModified', 
                      header: 'Last Modified', 
                      sortable: true,
                      render: (item: any) => <span className="text-sm">{item.lastModified}</span>
                    }
                  };

                  // Filter columns based on selected columns
                  const columns = selectedColumns
                    .filter(columnName => allColumns[columnName as keyof typeof allColumns])
                    .map(columnName => allColumns[columnName as keyof typeof allColumns]);

                  return (
                    <Table
                      data={filteredData}
                      columns={columns}
                  onRowSelect={(selectedItems) => {
                    console.log('Selected documents:', selectedItems);
                  }}
                  onRowActivate={(item) => {
                    console.log('Activated document:', item);
                  }}
                  getRowKey={(item) => item.id}
                  compact={true}
                  selectable={true}
                  paginated={true}
                  itemsPerPage={25}
                  aria-label="Government document registry with sorting and selection capabilities"
                />
                  );
                })()}
              </div>
            </div>

            {/* Column Selection Modal */}
            {showColumnModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 w-96">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Select Columns to Display</h3>
                    <button
                      onClick={() => setShowColumnModal(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Icon name="close" className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {availableColumns.map((column) => (
                      <div key={column} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">{column}</span>
                        <button
                          onClick={() => {
                            if (selectedColumns.includes(column)) {
                              setSelectedColumns(prev => prev.filter(c => c !== column));
                            } else {
                              setSelectedColumns(prev => [...prev, column]);
                            }
                          }}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            selectedColumns.includes(column) ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              selectedColumns.includes(column) ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setShowColumnModal(false)}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setShowColumnModal(false)}
                      className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        );

      default: // single column
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <Icon name="dashboard" className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
                </div>
                <p className="text-3xl font-bold text-blue-600">1,234</p>
                <p className="text-sm text-gray-500 mt-1">+12% from last month</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <Icon name="notification" className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-700">Active Sessions</h3>
                </div>
                <p className="text-3xl font-bold text-green-600">456</p>
                <p className="text-sm text-gray-500 mt-1">Currently online</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <Icon name="security" className="w-6 h-6 text-purple-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-700">System Health</h3>
                </div>
                <p className="text-3xl font-bold text-purple-600">98%</p>
                <p className="text-sm text-gray-500 mt-1">All systems operational</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Icon Gallery</h2>
              <p className="text-gray-600 mb-4">
                Available icons in the component library:
              </p>
              <div className="grid grid-cols-6 gap-4">
                {menuItems.map((item) => (
                  <div key={item.id} className="text-center">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Icon name={item.iconName} className="w-8 h-8 mx-auto" />
                    </div>
                    <p className="text-xs mt-1 text-gray-600">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  const handleRightNavIconClick = (item: any) => {
    // Expand the right navigation rail when an icon is clicked while collapsed
    setRightCollapsed(false);
    // Optionally navigate to the item's path after expanding
    if (item.path) {
      handleNavigate(item.path);
    }
  };

  return (
    <DesignTokensProvider>
      <PageTemplate
        title={title}
        subtitle={subtitle}
        breadcrumbs={breadcrumbs}
        onBreadcrumbNavigate={handleNavigate}
        showLeftNavRail={currentLayout.showLeftNavRail}
        showRightNavRail={currentLayout.showRightNavRail}
        leftNavRailCollapsed={leftCollapsed}
        rightNavRailCollapsed={rightCollapsed}
        alerts={alerts}
        onAlertRead={handleAlertRead}
        user={user}
        leftNavRail={
          currentLayout.showLeftNavRail ? (
            <div className="relative">
              <NavigationRail 
                currentPath={currentPath}
                menuItems={menuItems}
                onNavigate={handleNavigate}
                collapsed={leftCollapsed}
                showTooltips={true}
              />
              
              {/* Toggle button for left rail */}
              <button
                onClick={() => setLeftCollapsed(prev => !prev)}
                className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:shadow-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 z-10"
                aria-label={leftCollapsed ? 'Expand left navigation' : 'Collapse left navigation'}
              >
                <Icon 
                  name={leftCollapsed ? 'chevron-right' : 'chevron-left'} 
                  className="w-4 h-4 text-gray-600"
                />
              </button>
            </div>
          ) : undefined
        }
        rightNavRail={
          currentLayout.showRightNavRail ? (
            <div className="relative">
              <CustomRightNavigationRail 
                currentPath={currentPath}
                menuItems={rightNavItems || menuItems}
                actionItems={[
                  { id: 'go-to-detail', iconName: 'document', label: 'Go to detail page', action: () => console.log('Go to detail page') },
                  { id: 'email', iconName: 'email', label: 'Email', action: () => console.log('Email action') },
                  { id: 'alias-move-copy', iconName: 'folder', label: 'Alias Move Copy', action: () => console.log('Alias Move Copy action') },
                  { id: 'download', iconName: 'download', label: 'Download', action: () => console.log('Download action') },
                  { id: 'publish', iconName: 'globe', label: 'Publish', action: () => console.log('Publish action') },
                  { id: 'edit-new-version', iconName: 'edit', label: 'Edit new version', action: () => console.log('Edit new version action') },
                  { id: 'edit-office-online', iconName: 'document', label: 'Edit in office online', action: () => console.log('Edit in office online action') },
                  { id: 'upload-new-version', iconName: 'upload', label: 'Upload new version', action: () => console.log('Upload new version action') },
                  { id: 'start-workflow', iconName: 'workflow-automation', label: 'Start workflow', action: () => console.log('Start workflow action') },
                  { id: 'preview', iconName: 'view', label: 'Preview', action: () => console.log('Preview action') },
                  { id: 'create-rendition', iconName: 'image', label: 'Create rendition', action: () => console.log('Create rendition action') },
                  { id: 'upload-rendition', iconName: 'upload', label: 'Upload rendition', action: () => console.log('Upload rendition action') },
                  { id: 'delete', iconName: 'delete', label: 'Delete', action: () => console.log('Delete action') }
                ]}
                onNavigate={handleNavigate}
                collapsed={rightCollapsed}
                showTooltips={true}
                onIconClick={handleRightNavIconClick}
              />
              
              {/* Toggle button for right rail */}
              <button
                onClick={() => setRightCollapsed(prev => !prev)}
                className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:shadow-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 z-10"
                aria-label={rightCollapsed ? 'Expand right navigation' : 'Collapse right navigation'}
              >
                <Icon 
                  name={rightCollapsed ? 'chevron-right' : 'chevron-left'} 
                  className="w-4 h-4 text-gray-600"
                />
              </button>
            </div>
          ) : undefined
        }
      >
        {renderContent()}
      </PageTemplate>

      {/* New Message Modal */}
      {showNewMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl mx-4 rounded-none shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">New Message</h2>
              <button
                onClick={handleCloseNewMessageModal}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Icon name="close" className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Recipient Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <input
                  type="text"
                  value={newMessageForm.recipient}
                  onChange={(e) => handleFormChange('recipient', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter recipient email or name"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={newMessageForm.subject}
                  onChange={(e) => handleFormChange('subject', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter message subject"
                />
              </div>

              {/* Priority Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={newMessageForm.priority}
                  onChange={(e) => handleFormChange('priority', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={newMessageForm.message}
                  onChange={(e) => handleFormChange('message', e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter your message here..."
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={handleCloseNewMessageModal}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitNewMessage}
                disabled={!newMessageForm.recipient || !newMessageForm.subject || !newMessageForm.message}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-none hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <Icon name="send" className="w-4 h-4 mr-2" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </DesignTokensProvider>
  );
};

export default PageManager; 