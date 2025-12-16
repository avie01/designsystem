import React, { useState } from 'react';
import { Icon, createLazyComponent } from '../src';
import Header from '../src/components/Header/Header';
import NavigationRail from '../src/components/NavigationRail/NavigationRail';
import { AccessibilityProvider, useAccessibility } from '../src/context/AccessibilityContext';
import { PageManagerProvider } from '../src/components/PageManager/PageManagerContext';
import AccessibilityPanel from '../src/components/AccessibilityPanel/AccessibilityPanel';
import NavigationComponentsDemo from './NavigationComponentsDemo';
import LeftNavigationDemo from './LeftNavigationDemo';
import RightNavigationDemo from './RightNavigationDemo';
import Button from '../src/components/Button/Button';
import Cards from '../src/components/Cards/Cards';
import Table from '../src/components/Table/Table';
import Chip from '../src/components/Chip/Chip';
import Popover from '../src/components/Popover/Popover';
import ODLTheme from '../src/styles/ODLTheme';
import { governmentDocuments, getDocumentStats } from '../src/data/Building_constent_table';
import Graph from '../src/components/Graph/Graph';
import TasksSchedulingPage from '../src/pages/TasksSchedulingPage';
import styles from './MultiPageExample.module.css';


// Simplified Tabs Component (from CouncilDashboard)
interface SimpleTabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
}

interface SimpleTabsProps {
  tabs: SimpleTabItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: 'default' | 'compact';
  showContent?: boolean;
}

const SimpleTabs: React.FC<SimpleTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
  showContent = false
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(activeTab || tabs[0]?.id || '');
  const currentActiveTab = activeTab || internalActiveTab;

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (disabled) return;
    if (onTabChange) {
      onTabChange(tabId);
    } else {
      setInternalActiveTab(tabId);
    }
  };

  const activeTabData = tabs.find(tab => tab.id === currentActiveTab);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ 
        display: 'flex', 
        borderBottom: `1px solid ${ODLTheme.colors.border}`, 
        gap: 0 
      }}>
        {tabs.map((tab) => {
          const isActive = tab.id === currentActiveTab;
          const isDisabled = tab.disabled;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id, isDisabled)}
              style={{
                position: 'relative',
                background: 'none',
                border: 'none',
                fontFamily: 'inherit',
                fontSize: variant === 'default' ? ODLTheme.typography.fontSize.base : ODLTheme.typography.fontSize.sm,
                fontWeight: isActive ? ODLTheme.typography.fontWeight.medium : ODLTheme.typography.fontWeight.normal,
                color: isActive ? ODLTheme.colors.primary : isDisabled ? ODLTheme.colors.text.disabled : ODLTheme.colors.text.secondary,
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                padding: variant === 'default' ? `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}` : `${ODLTheme.spacing[2]} ${ODLTheme.spacing[3]}`,
                borderRadius: 0,
                outline: 'none',
                transition: ODLTheme.transitions.base,
                opacity: isDisabled ? 0.6 : 1,
                whiteSpace: 'nowrap',
                minWidth: 0,
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (!isDisabled && !isActive) {
                  e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
                }
              }}
              onMouseLeave={(e) => {
                if (!isDisabled) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[2] }}>
                {tab.icon && (!tab.iconPosition || tab.iconPosition === 'left') && (
                  <Icon name={tab.icon as any} size={16} />
                )}
                <span>{tab.label}</span>
                {tab.icon && tab.iconPosition === 'right' && (
                  <Icon name={tab.icon as any} size={16} />
                )}
              </div>
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: ODLTheme.colors.primary,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
      {showContent && activeTabData?.content && (
        <div style={{ padding: ODLTheme.spacing[4] }}>
          {activeTabData.content}
        </div>
      )}
    </div>
  );
};

// Lazy load heavy page components for better performance with custom loading messages
const LazyApplicationsPage = createLazyComponent(
  () => import('../src/pages/ApplicationsPage'),
  { loadingMessage: 'Loading applications...' }
);
const LazyApplicationSummaryPage = createLazyComponent(
  () => import('../src/pages/ApplicationSummaryPage'),
  { loadingMessage: 'Loading application summary...' }
);
const LazyEditingPage = createLazyComponent(
  () => import('../src/pages/EditingPage'),
  { loadingMessage: 'Loading editor...' }
);
const LazyActiveWorkflows = createLazyComponent(
  () => import('../src/pages/ActiveWorkflows'),
  { loadingMessage: 'Loading workflows...' }
);
const LazyTotalDocuments = createLazyComponent(
  () => import('../src/pages/TotalDocuments'),
  { loadingMessage: 'Loading documents...' }
);
const LazyInternalReferrals = createLazyComponent(
  () => import('../src/pages/InternalReferrals'),
  { loadingMessage: 'Loading referrals...' }
);
const LazyComplianceChecklist = createLazyComponent(
  () => import('../src/pages/ComplianceChecklistPage'),
  { loadingMessage: 'Loading compliance checklist...' }
);

// PUBLIC PAGES (Custom styling)
const LazyCityPlanHomepage = createLazyComponent(
  () => import('../src/pages/CityPlanHomepage'),
  { loadingMessage: 'Loading city plan...' }
);

const LazyPlanDetails = createLazyComponent(
  () => import('../src/pages/PlanDetails'),
  { loadingMessage: 'Loading plan details...' }
);

const LazyPlanningExport = createLazyComponent(
  () => import('../src/pages/PlanningExport'),
  { loadingMessage: 'Loading export page...' }
);

const LazyBrisbanePropertyPanelDemo = createLazyComponent(
  () => import('../src/pages/BrisbanePropertyPanelDemo'),
  { loadingMessage: 'Loading property panel...' }
);

const LazyPublicServices = createLazyComponent(
  () => import('../src/pages/public/PublicServices'),
  { loadingMessage: 'Loading services...' }
);
const LazyPropertyMapViewer = createLazyComponent(
  () => import('../src/pages/public/PropertyMapViewer'),
  { loadingMessage: 'Loading property map...' }
);

const LazyPublicContact = createLazyComponent(
  () => import('../src/pages/public/PublicContact'),
  { loadingMessage: 'Loading contact page...' }
);

// ADMIN PAGES (ODL styling)
const LazyAdminDashboard = createLazyComponent(
  () => import('../src/pages/admin/AdminDashboard'),
  { loadingMessage: 'Loading admin dashboard...' }
);

// Wrapper component to use accessibility context
const AccessibilityPanelWrapper: React.FC = () => {
  const { isPanelOpen, closePanel } = useAccessibility();
  
  return (
    <AccessibilityPanel 
      open={isPanelOpen} 
      onClose={closePanel} 
    />
  );
};

// Dashboard content component matching original DashboardLayout
interface StatCard {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  sparklineData?: {month: string; value: number}[];
  graphType?: 'line' | 'area' | 'bar';
  comparison?: string;
  period?: string;
  color: string;
  teamMembers?: {
    name: string;
    initials: string;
    status: string;
    color: string;
  }[];
}

// Sample data for activities and alerts (mimicking PageManagerContext)
const recentActivities = [
  {
    id: '1',
    title: 'Building Consent BC-2024-0523 submitted',
    description: 'New residential building consent application',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    color: 'blue',
    icon: 'document',
    user: 'Sarah Mitchell',
    relatedItem: 'BC-2024-0523'
  },
  {
    id: '2',
    title: 'Site inspection completed',
    description: 'Foundation inspection passed at Riverside Complex',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    color: 'green',
    icon: 'checkmark-filled',
    user: 'John Smith',
    relatedItem: 'BC-2024-0487'
  },
  {
    id: '3',
    title: 'Document review required',
    description: 'Planning documents need additional review',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    color: 'orange',
    icon: 'warning',
    user: 'Emily Chen',
    relatedItem: 'BC-2024-0501'
  },
  {
    id: '4',
    title: 'Building consent approved',
    description: 'Main Street renovation approved',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    color: 'green',
    icon: 'checkmark-circle',
    user: 'Michael Torres',
    relatedItem: 'BC-2024-0412'
  },
  {
    id: '5',
    title: 'Compliance alert resolved',
    description: 'Fire safety compliance issue resolved',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    color: 'purple',
    icon: 'security',
    user: 'Lisa Anderson',
    relatedItem: 'BC-2024-0398'
  }
];

const securityAlerts = [
  {
    id: '1',
    title: 'High Priority Review',
    description: 'Critical safety inspection overdue',
    severity: 'critical' as const,
    status: 'active' as const,
    bcNumber: 'BC-2024-0367'
  },
  {
    id: '2',
    title: 'Documentation Missing',
    description: 'Fire safety certificate not uploaded',
    severity: 'high' as const,
    status: 'investigating' as const,
    bcNumber: 'BC-2024-0501'
  },
  {
    id: '3',
    title: 'Compliance Check',
    description: 'Routine compliance verification',
    severity: 'medium' as const,
    status: 'resolved' as const,
    bcNumber: 'BC-2024-0445'
  }
];

// Import the existing DashboardLayout
const LazyDashboardLayout = createLazyComponent(
  () => import('../src/components/PageManager/layouts/DashboardLayout'),
  { loadingMessage: 'Loading dashboard...' }
);

const DashboardContent: React.FC = () => {
  const stats = getDocumentStats();
  
  // Create custom stats for the planning officer dashboard
  const dashboardStats = [
    {
      title: 'My Active Cases',
      value: stats.underReview + stats.pending,
      icon: 'folder-open',
      trend: { value: 12, isPositive: true },
      color: 'blue',
    },
    {
      title: 'Today\'s Inspections',
      value: '3',
      icon: 'calendar',
      trend: { value: 5, isPositive: true },
      color: 'green',
    },
    {
      title: 'Awaiting Referrals',
      value: stats.pending,
      icon: 'share',
      trend: { value: 8, isPositive: false },
      color: 'orange',
    },
    {
      title: 'Avg Processing Time',
      value: '12.4 days',
      icon: 'time',
      trend: { value: 2, isPositive: true },
      color: 'purple',
    },
  ];

  return <LazyDashboardLayout stats={dashboardStats} />;
};

const MultiPageExample: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [selectedBcNumber, setSelectedBcNumber] = useState<string | null>(null);
  const [isLeftNavCollapsed, setIsLeftNavCollapsed] = useState(false);
  const [selectedView, setSelectedView] = useState<'overview' | 'applications' | 'team' | 'reports'>('overview');
  const [selectedApplications, setSelectedApplications] = useState<Set<string>>(new Set());
  const [selectedAmendment, setSelectedAmendment] = useState<string | null>(null);

  // Sample applications data
  const applications = [
    { id: '1', reference: 'DA/2024/001', address: '123 Main Street', type: 'Residential', status: 'under-review', assignedTo: 'Sarah Chen', daysRemaining: 2, priority: 'high' as const },
    { id: '2', reference: 'DA/2024/002', address: '456 Oak Avenue', type: 'Commercial', status: 'awaiting-info', assignedTo: 'Michael Torres', daysRemaining: 7, priority: 'medium' as const },
    { id: '3', reference: 'DA/2024/003', address: '789 Pine Road', type: 'Industrial', status: 'approved', assignedTo: 'Emma Wilson', daysRemaining: 14, priority: 'low' as const },
    { id: '4', reference: 'DA/2024/004', address: '321 Elm Street', type: 'Mixed Use', status: 'under-review', assignedTo: 'James Park', daysRemaining: 1, priority: 'high' as const },
    { id: '5', reference: 'DA/2024/005', address: '654 Cedar Lane', type: 'Residential', status: 'rejected', assignedTo: 'Lisa Anderson', daysRemaining: 0, priority: 'medium' as const },
  ];

  const menuItems = [
    // MAIN APPLICATION SECTION
    { 
      id: 'main-header',
      type: 'header',
      label: '━━━ MAIN APPLICATION ━━━',
      style: { 
        color: '#3560C1',
        fontSize: '11px',
        fontWeight: '700',
        letterSpacing: '0.5px',
        padding: '12px 16px 8px 16px'
      }
    },
    { 
      id: 'dashboard', 
      iconName: 'dashboard', 
      label: 'Dashboard', 
      path: '/',
      description: 'Main application dashboard with overview and statistics'
    },
    { 
      id: 'admin-dashboard', 
      iconName: 'application', 
      label: 'Applications', 
      path: '/admin',
      description: 'Building consent applications and management'
    },
    { 
      id: 'editing', 
      iconName: 'edit', 
      label: 'Document Editor', 
      path: '/referrals',
      description: 'Edit policy documents and amendments'
    },
    { 
      id: 'tasks', 
      iconName: 'calendar', 
      label: 'Tasks & Scheduling', 
      path: '/tasks',
      description: 'Manage inspection tasks and scheduling'
    },
    { 
      id: 'workflows', 
      iconName: 'flow', 
      label: 'Active Workflows', 
      path: '/workflows',
      description: 'Monitor and manage ongoing workflow processes'
    },
    { 
      id: 'documents', 
      iconName: 'document', 
      label: 'Documents', 
      path: '/documents',
      description: 'Centralized document repository'
    },
    { 
      id: 'referrals', 
      iconName: 'share', 
      label: 'Internal Referrals', 
      path: '/internal-referrals',
      description: 'Manage departmental reviews and referrals'
    },
    { 
      id: 'compliance-checklist', 
      iconName: 'checkmark-outline', 
      label: 'Compliance Checklist', 
      path: '/compliance-checklist',
      description: 'Manage compliance requirements and checklists'
    },
    { 
      id: 'property-map', 
      iconName: 'map', 
      label: 'Property Map', 
      path: '/property-map',
      description: 'Interactive property map with GIS overlay and building consent search'
    },

    // PUBLIC PAGES SECTION  
    { 
      id: 'public-header',
      type: 'header',
      label: '━━━ PUBLIC PAGES ━━━',
      style: { 
        color: '#7C3AED',
        fontSize: '11px',
        fontWeight: '700',
        letterSpacing: '0.5px',
        padding: '24px 16px 8px 16px',
        borderTop: '1px solid #E5E7EB',
        marginTop: '12px'
      }
    },
    { 
      id: 'city-plan-home', 
      iconName: 'map', 
      label: 'City Plan', 
      path: '/city-plan',
      description: 'Brisbane City Plan homepage with search and planning tools',
      badge: { text: 'PUBLIC', color: '#7C3AED' }
    },
    { 
      id: 'plan-details', 
      iconName: 'document', 
      label: 'Plan Details', 
      path: '/plan-details',
      description: 'Detailed planning information and property lookup',
      badge: { text: 'PUBLIC', color: '#7C3AED' }
    },
    { 
      id: 'planning-export', 
      iconName: 'download', 
      label: 'Export Planning Items', 
      path: '/planning-export',
      description: 'Export and manage selected planning information',
      badge: { text: 'PUBLIC', color: '#7C3AED' }
    },
  ];




  // Define layouts for different pages
  const getLayoutForPage = (path: string) => {
    switch (path) {
      case '/': // Dashboard - Full dashboard layout
        return {
          id: 'dashboard',
          name: 'Dashboard',
          description: 'Full dashboard with stats cards and charts',
          showLeftNavRail: true,
          leftNavRailCollapsed: false,
          layout: 'dashboard' as const,
        };
      
      case '/admin': // Dashboard - Custom layout
        return {
          id: 'admin',
          name: 'Dashboard',
          description: 'Administrative dashboard for building consent applications',
          showLeftNavRail: true,
          leftNavRailCollapsed: false,
          layout: 'custom' as const,
        };
      
      case '/search': // Search - Two column layout
        return {
          id: 'two-column',
          name: 'Two Column',
          description: 'Split layout with left and right content areas',
          showLeftNavRail: true,
          leftNavRailCollapsed: false,
          layout: 'two-column' as const,
        };
      
      case '/security': // Security - Tree menu layout
        return {
          id: 'tree-menu',
          name: 'Tree Menu',
          description: 'Layout with tree menu sidebar',
          showLeftNavRail: true,
          leftNavRailCollapsed: false,
          layout: 'tree-menu' as const,
        };
      
                   case '/messages': // Messages - Messages table layout
               return {
                 id: 'messages-table',
                 name: 'Messages Table',
                 description: 'Layout with message table and pagination',
                 showLeftNavRail: true,
                        leftNavRailCollapsed: false,
                        layout: 'messages-table' as const,
               };
      
      case '/settings': // Settings - Two column layout
        return {
          id: 'two-column-settings',
          name: 'Two Column',
          description: 'Split layout for settings',
          showLeftNavRail: true,
          leftNavRailCollapsed: false,
          layout: 'two-column' as const,
        };
      
      case '/development': // Development - Tree menu layout
        return {
          id: 'tree-menu-dev',
          name: 'Tree Menu',
          description: 'Development tools with tree menu',
          showLeftNavRail: true,
          leftNavRailCollapsed: false,
          layout: 'tree-menu' as const,
        };
      
      case '/blog': // Blog - Three cards layout
        return {
          id: 'three-cards-blog',
          name: 'Three Cards',
          description: 'Blog with featured articles',
          showLeftNavRail: true,
          leftNavRailCollapsed: false,
          layout: 'three-cards' as const,
        };
      
      case '/management': // Management - Dashboard layout
        return {
          id: 'dashboard-management',
          name: 'Dashboard',
          description: 'Management dashboard',
          showLeftNavRail: true,
          leftNavRailCollapsed: false,
          layout: 'dashboard' as const,
        };
      
      case '/analytics': // Analytics - Three cards layout
        return {
          id: 'three-cards-analytics',
          name: 'Three Cards',
          description: 'Analytics with key metrics',
          showLeftNavRail: true,
          leftNavRailCollapsed: false,
          layout: 'three-cards' as const,
        };
      

      
      default: // Default - Single column layout
        return {
          id: 'single',
          name: 'Single Column',
          description: 'Traditional single column layout',
          showLeftNavRail: true,
          leftNavRailCollapsed: false,
          layout: 'single' as const,
        };
    }
  };

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    setSelectedBcNumber(null); // Clear selected application when navigating
    console.log('Navigate to:', path);
  };

  const handleApplicationClick = (bcNumber: string) => {
    // Set the BC number directly (e.g., BCN-101, BCN-102, etc.)
    setSelectedBcNumber(bcNumber);
  };

  const handleBackFromApplication = () => {
    setSelectedBcNumber(null);
  };

  const handleLayoutChange = (layoutId: string) => {
    // This function is called by PageManager but we don't need it for per-page layouts
    console.log('Layout changed to:', layoutId);
  };

  const getPageContent = () => {
    // Get the username from the header (you could also store this in state)
    const userName = "Scott";
    
    const pages: Record<string, { title: string; content: string; breadcrumbs: Array<{ label: string; path?: string; icon?: string }> }> = {
      '/': { 
        title: 'Welcome back, Scott', 
        content: 'Monitor building consent applications and key metrics.',
        breadcrumbs: [
          { label: 'Isovist', path: '/', icon: 'home' },
          { label: 'Dashboard' }
        ]
      },
      // PUBLIC PAGES
      '/public/home': { 
        title: 'Welcome to Isovist', 
        content: 'Public-facing homepage with custom styling and design',
        breadcrumbs: [
          { label: 'Public', path: '/public/home', icon: 'home' },
          { label: 'Home' }
        ]
      },
      '/public/services': { 
        title: 'Our Services', 
        content: 'Browse our public services catalog',
        breadcrumbs: [
          { label: 'Public', path: '/public/home', icon: 'home' },
          { label: 'Services' }
        ]
      },
      '/public/contact': { 
        title: 'Contact Us', 
        content: 'Get in touch with our team',
        breadcrumbs: [
          { label: 'Public', path: '/public/home', icon: 'home' },
          { label: 'Contact' }
        ]
      },
      '/city-plan': { 
        title: 'Brisbane City Plan', 
        content: '',
        breadcrumbs: [
          { label: 'Public', path: '/public/home', icon: 'home' },
          { label: 'City Plan' }
        ]
      },
      '/plan-details': { 
        title: 'Plan Details', 
        content: 'Detailed planning information and property lookup with interactive maps',
        breadcrumbs: [
          { label: 'Public', path: '/public/home', icon: 'home' },
          { label: 'Plan Details' }
        ]
      },
      '/planning-export': { 
        title: 'Export Planning Items', 
        content: 'Export and manage selected planning information for property development',
        breadcrumbs: [
          { label: 'Public', path: '/public/home', icon: 'home' },
          { label: 'Plan Details', path: '/plan-details' },
          { label: 'Export' }
        ]
      },
      '/brisbane-property-panel': { 
        title: 'Brisbane Property Panel', 
        content: 'Pixel-perfect recreation of Brisbane City Plan property details menu',
        breadcrumbs: [
          { label: 'Public', path: '/public/home', icon: 'home' },
          { label: 'Property Panel' }
        ]
      },
      '/property-map': { 
        title: 'Property Map Viewer', 
        content: 'Interactive property map with GIS overlay and building consent search',
        breadcrumbs: [
          { label: 'Dashboard', path: '/', icon: 'home' },
          { label: 'Property Map' }
        ]
      },
      '/compliance-checklist': { 
        title: 'Compliance Checklist', 
        content: 'Review and manage compliance requirements and regulatory checklists.',
        breadcrumbs: [
          { label: 'Dashboard', path: '/', icon: 'home' },
          { label: 'Compliance Checklist' }
        ]
      },
      '/admin': { 
        title: 'Applications', 
        content: 'Administrative dashboard for managing building consent applications, tracking status, and processing submissions.',
        breadcrumbs: [
          { label: 'Admin', path: '/admin', icon: 'dashboard' },
          { label: 'Applications' }
        ]
      },
      '/referrals': { 
        title: 'Editing', 
        content: 'Manage departmental reviews and track response times.',
        breadcrumbs: [
          { label: 'Dashboard', path: '/', icon: 'home' },
          { label: 'Editing' }
        ]
      },
      '/editing': { 
        title: selectedAmendment || 'Document Editor', 
        content: 'Edit policy documents and amendments',
        breadcrumbs: [
          { label: 'Admin Dashboard', path: '/admin', icon: 'dashboard' },
          { label: selectedAmendment || 'Document Editor' }
        ]
      },
      '/regulation': { 
        title: 'Regulation Management', 
        content: 'Access building codes, compliance regulations, and regulatory requirements.',
        breadcrumbs: [
          { label: 'Dashboard', path: '/', icon: 'home' },
          { label: 'Regulation Management' }
        ]
      },
      '/tasks': { 
        title: 'Tasks and Scheduling', 
        content: 'Manage inspection tasks, schedule site visits, and track task completion.',
        breadcrumbs: [
          { label: 'Dashboard', path: '/', icon: 'home' },
          { label: 'Tasks and Scheduling' }
        ]
      },
      '/workflows': { 
        title: 'Active Workflows', 
        content: 'Monitor and manage ongoing workflow processes across departments.',
        breadcrumbs: [
          { label: 'Dashboard', path: '/', icon: 'home' },
          { label: 'Active Workflows' }
        ]
      },
      '/documents': { 
        title: 'Document Management', 
        content: 'Centralized repository for all council documents and files.',
        breadcrumbs: [
          { label: 'Dashboard', path: '/', icon: 'home' },
          { label: 'Documents' }
        ]
      },
      '/internal-referrals': { 
        title: 'Internal Referrals', 
        content: 'Manage departmental reviews and track response times for planning applications.',
        breadcrumbs: [
          { label: 'Dashboard', path: '/', icon: 'home' },
          { label: 'Internal Referrals' }
        ]
      },
      '/reporting': { 
        title: 'Reporting', 
        content: 'Generate compliance reports, analytics, and performance metrics.',
        breadcrumbs: [
          { label: 'Dashboard', path: '/', icon: 'home' },
          { label: 'Reporting' }
        ]
      },
      '/teams': { 
        title: 'Teams', 
        content: 'Manage inspection teams, assign staff, and monitor team performance.',
        breadcrumbs: [
          { label: 'Dashboard', path: '/', icon: 'home' },
          { label: 'Teams' }
        ]
      },
      '/help': { 
        title: 'Help and Support', 
        content: 'Access documentation, tutorials, and contact support.',
        breadcrumbs: [
          { label: 'Dashboard', path: '/', icon: 'home' },
          { label: 'Help and Support' }
        ]
      },
      '/search': { 
        title: 'Search', 
        content: 'Search functionality with two-column layout for better organization.',
        breadcrumbs: [
          { label: 'Dashboard', path: '/', icon: 'home' },
          { label: 'Search', icon: 'search' }
        ]
      },
      '/security': { 
        title: 'Security', 
        content: 'Security settings and monitoring tools with tree menu navigation.',
        breadcrumbs: [
          { label: 'Dashboard', path: '/', icon: 'home' },
          { label: 'Security', icon: 'security' }
        ]
      },
      '/messages': { 
        title: 'Messages', 
        content: 'Message center and notifications with three prominent cards layout.',
        breadcrumbs: [
          { label: 'Dashboard', path: '/', icon: 'home' },
          { label: 'Messages', icon: 'notification' }
        ]
      },
      '/settings': { 
        title: 'Settings', 
        content: 'System and user preferences configuration in two-column layout. Click the accessibility button to test the AccessibilityPanel component. Try changing font size, theme, and other accessibility features to see them applied in real-time.',
        breadcrumbs: [
          { label: 'Dashboard', path: '/', icon: 'home' },
          { label: 'Settings', icon: 'settings' }
        ]
      },
      '/development': { 
        title: 'Development', 
        content: 'Development tools and resources with tree menu for easy navigation.',
        breadcrumbs: [
          { label: 'Dashboard', path: '/', icon: 'home' },
          { label: 'Development', icon: 'code' }
        ]
      },
      '/blog': { 
        title: 'Blog', 
        content: 'Latest updates and technical articles with featured cards layout.',
        breadcrumbs: [
          { label: 'Dashboard', path: '/', icon: 'home' },
          { label: 'Blog', icon: 'document' }
        ]
      },
      '/management': { 
        title: 'Management', 
        content: 'System administration and user management dashboard.',
        breadcrumbs: [
          { label: 'Dashboard', path: '/', icon: 'home' },
          { label: 'Management', icon: 'user-multiple' }
        ]
      },
      '/analytics': { 
        title: 'Analytics', 
        content: 'Data analytics and reporting tools with key metrics cards.',
        breadcrumbs: [
          { label: 'Dashboard', path: '/', icon: 'home' },
          { label: 'Analytics', icon: 'analytics' }
        ]
      },
  
      '/components/left-navigation': { 
        title: 'Left Navigation Rail', 
        content: 'Collapsible left sidebar navigation with icons and tooltips.',
        breadcrumbs: [
          { label: 'Dashboard', path: '/', icon: 'home' },
          { label: 'Component Catalog', path: '/catalog', icon: 'folder' },
          { label: 'Navigation Components', path: '/components/navigation', icon: 'navigation' },
          { label: 'Left Navigation Rail', icon: 'navigation' }
        ]
      },
      '/components/right-navigation': { 
        title: 'Right Navigation Rail', 
        content: 'Collapsible right sidebar navigation with icons and tooltips.',
        breadcrumbs: [
          { label: 'Dashboard', path: '/', icon: 'home' },
          { label: 'Component Catalog', path: '/catalog', icon: 'folder' },
          { label: 'Navigation Components', path: '/components/navigation', icon: 'navigation' },
          { label: 'Right Navigation Rail', icon: 'navigation' }
        ]
      },

    };

    return pages[currentPath] || { title: 'Not Found', content: 'Page not found', breadcrumbs: [] };
  };

  const currentPage = getPageContent();
  const currentLayout = getLayoutForPage(currentPath);


  // Custom content for settings page
  const getSettingsContent = () => {
    if (currentPath !== '/settings') return null;

    return (
      <div className={styles.settingsContent}>
        <div className={styles.settingsSection}>
          <h3>Account Settings</h3>
          <div className={styles.settingItem}>
            <label className={styles.settingLabel}>
              <input type="checkbox" className={styles.checkbox} defaultChecked />
              Email notifications
            </label>
          </div>
          <div className={styles.settingItem}>
            <label className={styles.settingLabel}>
              <input type="checkbox" className={styles.checkbox} />
              SMS notifications
            </label>
          </div>
          <div className={styles.settingItem}>
            <label className={styles.settingLabel}>
              <input type="checkbox" className={styles.checkbox} defaultChecked />
              Two-factor authentication
            </label>
          </div>
        </div>

        <div className={styles.settingsSection}>
          <h3>Privacy Settings</h3>
          <div className={styles.settingItem}>
            <label className={styles.settingLabel}>
              <input type="checkbox" className={styles.checkbox} defaultChecked />
              Profile visibility
            </label>
          </div>
          <div className={styles.settingItem}>
            <label className={styles.settingLabel}>
              <input type="checkbox" className={styles.checkbox} />
              Data analytics
            </label>
          </div>
        </div>

        <div className={styles.settingsSection}>
          <h3>Interface Settings</h3>
          <div className={styles.settingItem}>
            <label className={styles.settingLabel}>
              <span>Dark mode</span>
              <div className={styles.toggleSwitch}>
                <input type="checkbox" className={styles.toggleInput} />
                <span className={styles.toggleSlider}></span>
              </div>
            </label>
          </div>
          <div className={styles.settingItem}>
            <label className={styles.settingLabel}>
              <span>Compact layout</span>
              <div className={styles.toggleSwitch}>
                <input type="checkbox" className={styles.toggleInput} defaultChecked />
                <span className={styles.toggleSlider}></span>
              </div>
            </label>
          </div>
          <div className={styles.settingItem}>
            <label className={styles.settingLabel}>
              <span>Show tooltips</span>
              <div className={styles.toggleSwitch}>
                <input type="checkbox" className={styles.toggleInput} defaultChecked />
                <span className={styles.toggleSlider}></span>
              </div>
            </label>
          </div>
        </div>

        <div className={styles.settingsSection}>
          <h3>Form Controls</h3>
          <div className={styles.settingItem}>
            <label className={styles.settingLabel}>
              <span>Username</span>
              <input type="text" className={styles.textInput} placeholder="Enter username" />
            </label>
          </div>
          <div className={styles.settingItem}>
            <label className={styles.settingLabel}>
              <span>Email</span>
              <input type="email" className={styles.textInput} placeholder="Enter email" />
            </label>
          </div>
          <div className={styles.settingItem}>
            <label className={styles.settingLabel}>
              <span>Theme</span>
              <select className={styles.selectInput}>
                <option>Default</option>
                <option>Light</option>
                <option>Dark</option>
                <option>High Contrast</option>
              </select>
            </label>
          </div>
        </div>

        <div className={styles.settingsSection}>
          <h3>Action Buttons</h3>
          <div className={styles.buttonGroup}>
            <button className={styles.primaryButton}>
              <Icon name="save" size={16} />
              Save Changes
            </button>
            <button className={styles.secondaryButton}>
              <Icon name="refresh" size={16} />
              Reset
            </button>
            <button className={styles.dangerButton}>
              <Icon name="delete" size={16} />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    );
  };

  const settingsContent = getSettingsContent();

  return (
    <PageManagerProvider>
      <AccessibilityProvider>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'white' }}>
          <AccessibilityPanelWrapper />
        
        {/* Header */}
        <Header 
          variant="build"
          userName="Scott"
          userRole="Senior Developer"
          onProfileClick={() => console.log('Profile clicked')}
          onNotificationClick={() => console.log('Notifications clicked')}
          notificationCount={3}
        />

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Left Navigation */}
          <aside 
            role="navigation"
            aria-label="Main navigation"
            style={{ 
              width: isLeftNavCollapsed ? '64px' : '240px',
              transition: 'width 0.3s ease',
              borderRight: '1px solid #E5E7EB',
              background: '#FFFFFF'
            }}
          >
            {/* Custom Navigation with Clear sections */}
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Collapse Toggle */}
              <div style={{ 
                padding: '12px',
                borderBottom: '1px solid #E5E7EB',
                display: 'flex',
                justifyContent: isLeftNavCollapsed ? 'center' : 'flex-end'
              }}>
                <button
                  onClick={() => setIsLeftNavCollapsed(!isLeftNavCollapsed)}
                  aria-label={isLeftNavCollapsed ? 'Expand navigation menu' : 'Collapse navigation menu'}
                  aria-expanded={!isLeftNavCollapsed}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6B7280',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s ease',
                    minWidth: '32px',
                    minHeight: '32px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F3F4F6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = '2px solid #3560C1';
                    e.currentTarget.style.outlineOffset = '2px';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = 'none';
                  }}
                >
                  <Icon name={isLeftNavCollapsed ? 'chevron-right' : 'chevron-left'} size={20} />
                </button>
              </div>

              {/* Navigation Items */}
              <nav 
                role="menubar" 
                aria-orientation="vertical"
                style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}
              >
                {menuItems.map((item: any) => {
                  // Section Headers
                  if (item.type === 'header') {
                    return !isLeftNavCollapsed && (
                      <div key={item.id} style={{
                        ...item.style,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        {item.label}
                      </div>
                    );
                  }

                  // Navigation Items
                  return (
                    <button
                      key={item.id}
                      onClick={() => item.path && handleNavigate(item.path)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          item.path && handleNavigate(item.path);
                        }
                      }}
                      aria-label={`Navigate to ${item.label}. ${item.description}`}
                      aria-current={currentPath === item.path ? 'page' : undefined}
                      tabIndex={0}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        padding: isLeftNavCollapsed ? '12px' : '10px 16px',
                        background: currentPath === item.path ? 
                          (item.badge?.text === 'PUBLIC' ? '#7C3AED08' : 
                           item.badge?.text === 'DEMOS' ? '#05966908' : '#3560C108') : 
                          'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative',
                        borderLeft: currentPath === item.path ? 
                          `3px solid ${item.badge?.color || '#3560C1'}` : 
                          '3px solid transparent',
                        borderRadius: isLeftNavCollapsed ? '4px' : '0 4px 4px 0',
                        margin: isLeftNavCollapsed ? '2px' : '1px 0',
                        fontFamily: 'inherit',
                        fontSize: '14px',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => {
                        if (currentPath !== item.path) {
                          e.currentTarget.style.background = '#F9FAFB';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (currentPath !== item.path) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.outline = '2px solid #3560C1';
                        e.currentTarget.style.outlineOffset = '2px';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.outline = 'none';
                      }}
                    >
                      <Icon 
                        name={item.iconName} 
                        size={20} 
                        color={currentPath === item.path ? (item.badge?.color || '#374151') : '#6B7280'}
                      />
                      
                      {!isLeftNavCollapsed && (
                        <div style={{ 
                          marginLeft: '12px',
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '8px'
                        }}>
                          <span style={{ 
                            fontSize: '14px',
                            fontWeight: currentPath === item.path ? '600' : '400',
                            color: currentPath === item.path ? '#111827' : '#374151'
                          }}>
                            {item.label}
                          </span>
                          {item.badge && (
                            <span style={{
                              fontSize: '10px',
                              fontWeight: '700',
                              padding: '3px 8px',
                              borderRadius: '4px',
                              background: `${item.badge.color}20`,
                              color: item.badge.color,
                              border: `1px solid ${item.badge.color}40`,
                              letterSpacing: '0.5px',
                              flexShrink: 0
                            }}>
                              {item.badge.text}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main 
            role="main"
            aria-label="Main content area"
            className={styles.mainContent} 
            style={{ 
              flex: 1, 
              overflow: 'auto',
              padding: ['/city-plan', '/plan-details', '/planning-export'].includes(currentPath) ? '0' : '24px'
            }}
          >
            {/* Page Title and Breadcrumbs - Hidden for public pages */}
            {!selectedBcNumber && !['/city-plan', '/plan-details', '/planning-export'].includes(currentPath) && (
              <div style={{ marginBottom: '24px' }}>
                {/* Breadcrumbs for all pages */}
                {currentPage.breadcrumbs && currentPage.breadcrumbs.length > 0 && (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    color: '#6B7280',
                    fontSize: '14px',
                    marginBottom: '8px'
                  }}>
                    {currentPage.breadcrumbs.map((crumb, index) => (
                      <React.Fragment key={index}>
                        {crumb.path ? (
                          <span 
                            onClick={() => {
                              if (currentPath === '/editing' && crumb.path === '/admin') {
                                setCurrentPath('/admin');
                                setSelectedAmendment(null);
                              } else {
                                handleNavigate(crumb.path);
                              }
                            }}
                            style={{ 
                              cursor: 'pointer',
                              color: '#3B82F6',
                              textDecoration: 'none',
                              transition: 'color 0.2s ease',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.textDecoration = 'underline';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.textDecoration = 'none';
                            }}
                          >
                            {crumb.icon && <Icon name={crumb.icon} size={14} />}
                            {crumb.label}
                          </span>
                        ) : (
                          <span style={{ 
                            color: '#111827', 
                            fontWeight: 500,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            {crumb.icon && <Icon name={crumb.icon} size={14} />}
                            {crumb.label}
                          </span>
                        )}
                        {index < currentPage.breadcrumbs.length - 1 && (
                          <Icon name="chevron-right" size={14} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
                
                <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#111827', margin: 0 }}>
                  {currentPath === '/editing' ? (selectedAmendment || 'Document Editor') : currentPage.title}
                </h1>
                {currentPage.content && (
                  <p style={{ color: '#6B7280', marginTop: '4px' }}>
                    {currentPage.content}
                  </p>
                )}
              </div>
            )}

            {/* Dynamic Content */}
            <div>
              {/* PUBLIC PAGES - Custom Styling */}
              {currentPath === '/city-plan' ? (
                <LazyCityPlanHomepage />
              ) : currentPath === '/plan-details' ? (
                <LazyPlanDetails />
              ) : currentPath === '/planning-export' ? (
                <LazyPlanningExport />
              ) : currentPath === '/brisbane-property-panel' ? (
                <LazyBrisbanePropertyPanelDemo />
              ) : currentPath === '/public/services' ? (
                <LazyPublicServices />
              ) : currentPath === '/public/contact' ? (
                <LazyPublicContact />
              ) : currentPath === '/components' ? (
                <LazyComponentsShowcase />
              ) : 
              /* ADMIN PAGES - ODL Styling */
              currentPath === '/' ? (
                // Default Dashboard 
                <DashboardContent />
              ) : currentPath === '/admin' ? (
                selectedBcNumber ? (
                  <LazyApplicationSummaryPage 
                    bcNumber={selectedBcNumber}
                    onBack={handleBackFromApplication}
                  />
                ) : (
                  <LazyApplicationsPage onApplicationClick={handleApplicationClick} />
                )
              ) : currentPath === '/referrals' ? (
                <LazyEditingPage />
              ) : currentPath === '/editing' ? (
                <LazyEditingPage 
                  amendmentTitle={selectedAmendment} 
                  onBack={() => {
                    setCurrentPath('/admin');
                    setSelectedAmendment(null);
                  }}
                  fromPage="Admin Dashboard"
                />
              ) : currentPath === '/tasks' ? (
                <TasksSchedulingPage />
              ) : currentPath === '/workflows' ? (
                <LazyActiveWorkflows />
              ) : currentPath === '/documents' ? (
                <LazyTotalDocuments />
              ) : currentPath === '/internal-referrals' ? (
                <LazyInternalReferrals />
              ) : currentPath === '/compliance-checklist' ? (
                <LazyComplianceChecklist />
              ) : currentPath === '/property-map' ? (
                <LazyPropertyMapViewer />
              ) :
              currentPath === '/admin' ? settingsContent :
              null}
            </div>
          </main>

        </div>
      </div>
    </AccessibilityProvider>
  </PageManagerProvider>
  );
};

export default MultiPageExample; 