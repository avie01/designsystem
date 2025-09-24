import React, { useState } from 'react';
import { Icon, createLazyComponent } from '../src';
import Header from '../src/components/Header/Header';
import NavigationRail from '../src/components/NavigationRail/NavigationRail';
import { AccessibilityProvider, useAccessibility } from '../src/context/AccessibilityContext';
import AccessibilityPanel from '../src/components/AccessibilityPanel/AccessibilityPanel';
import NavigationComponentsDemo from './NavigationComponentsDemo';
import LeftNavigationDemo from './LeftNavigationDemo';
import RightNavigationDemo from './RightNavigationDemo';
import Button from '../src/components/Button/Button';
import Cards from '../src/components/Cards/Cards';
import Table from '../src/components/Table/Table';
import Chip from '../src/components/Chip/Chip';
import Input from '../src/components/Input/Input';
import UserAvatar from '../src/components/UserAvatar/UserAvatar';
import isovistData from '../src/data/iso20.json';
import ODLTheme from '../src/styles/ODLTheme';
import Popover from '../src/components/Popover/Popover';
import { governmentDocuments, getDocumentStats } from '../src/data/Building_constent_table';
import Graph from '../src/components/Graph/Graph';
import styles from './MultiPageExample.module.css';
import LoginPage from '../src/pages/LoginPage';


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
  { loadingMessage: 'Loading plan editor...' }
);
const LazyApplicationSummaryPage = createLazyComponent(
  () => import('../src/pages/ApplicationSummaryPage'),
  { loadingMessage: 'Loading application summary...' }
);
const LazyEditingPage = createLazyComponent(
  () => import('../src/pages/EditingPage'),
  { loadingMessage: 'Loading editor...' }
);
const LazyComplianceChecklistPage = createLazyComponent(
  () => import('../src/pages/ComplianceChecklistPage'),
  { loadingMessage: 'Loading compliance checklist...' }
);
const LazyCityPlanHomepage = createLazyComponent(
  () => import('../src/pages/CityPlanHomepage'),
  { loadingMessage: 'Loading city plan map...' }
);
const LazyConsultation = createLazyComponent(
  () => import('../src/pages/Consultation'),
  { loadingMessage: 'Loading consultation page...' }
);
const LazySubmissionInbox = createLazyComponent(
  () => import('../src/pages/SubmissionInbox'),
  { loadingMessage: 'Loading submission inbox...' }
);


// ADMIN PAGES (ODL styling)
const LazyPlanEditor = createLazyComponent(
  () => import('../src/pages/Applications'),
  { loadingMessage: 'Loading plan editor...' }
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

interface DashboardContentProps {
  onNavigate: (path: string) => void;
  onApplicationClick: (amendmentName: string) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ onNavigate, onApplicationClick }) => {
  // Convert amendments data for display
  const amendments = isovistData.amendments || [];
  
  // Calculate stats
  const totalAmendments = amendments.length;
  const awaitingApproval = amendments.filter(a => 
    a.sendToManager === true || (typeof a.sendToManager === 'number' && a.sendToManager > 0)
  ).length;
  const draftStatus = amendments.filter(a => a.status === 'Draft').length;
  const totalComments = amendments.reduce((sum, a) => sum + a.comments, 0);

  // Data for graphs
  const weeklyTrendData = [
    { day: 'Mon', applications: 12 },
    { day: 'Tue', applications: 19 },
    { day: 'Wed', applications: 15 },
    { day: 'Thu', applications: 25 },
    { day: 'Fri', applications: 22 },
    { day: 'Sat', applications: 8 },
    { day: 'Sun', applications: 5 }
  ];

  const statusData = [
    { name: 'Draft', value: draftStatus, fill: '#FFA500' },
    { name: 'State Interests', value: amendments.filter(a => a.status.includes('State')).length, fill: '#3B82F6' },
    { name: 'Approved', value: amendments.filter(a => a.approved > 0).length, fill: '#10B981' },
    { name: 'Pending', value: awaitingApproval, fill: '#F59E0B' }
  ];

  const departmentData = [
    { name: 'Planning', current: 15 },
    { name: 'Building', current: 8 },
    { name: 'Engineering', current: 12 },
    { name: 'Environment', current: 6 }
  ];

  const monthlyVolumeData = [
    { month: 'Jan', residential: 45 },
    { month: 'Feb', residential: 52 },
    { month: 'Mar', residential: 48 },
    { month: 'Apr', residential: 63 },
    { month: 'May', residential: 58 },
    { month: 'Jun', residential: 65 }
  ];

  const getStatusColor = (status: string): 'green' | 'yellow' | 'red' | 'blue' | 'grey' => {
    switch (status.toLowerCase()) {
      case 'approved': return 'green';
      case 'draft': return 'yellow';
      case 'review': return 'blue';
      case 'in progress': return 'blue';
      default: return 'grey';
    }
  };

  return (
    <>
      {/* Compact graph cards for space-efficient dashboard */}
      {/* <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="compact-card" style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px', border: '1px solid #f5f5f5' }}>
          <h5 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#525252' }}>Weekly trend</h5>
          <Graph type="line" data={weeklyTrendData} dataKeys={['applications']} xAxisKey="day" height={120} showLegend={false} />
        </div>
        <div className="compact-card" style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px', border: '1px solid #f5f5f5' }}>
          <h5 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#525252' }}>Status</h5>
          <Graph type="pie" data={statusData} dataKeys={['value']} height={120} />
        </div>
        <div className="compact-card" style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px', border: '1px solid #f5f5f5' }}>
          <h5 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#525252' }}>Referrals</h5>
          <Graph type="bar" data={departmentData} dataKeys={['current']} xAxisKey="name" height={120} showLegend={false} />
        </div>
        <div className="compact-card" style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px', border: '1px solid #f5f5f5' }}>
          <h5 style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#525252' }}>Monthly volume</h5>
          <Graph type="area" data={monthlyVolumeData} dataKeys={['residential']} xAxisKey="month" height={120} gradient={true} showLegend={false} />
        </div>
      </div> */}

      {/* Content wrapper with ODL background */}
      <div style={{ 
        padding: ODLTheme.spacing[6],
        backgroundColor: '#EDF1F5',
        borderRadius: '16px',
        overflow: 'hidden'
      }}>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: ODLTheme.spacing[4] }}>
        {/* ePlan documents - Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Control Panel */}
          <div className="flex flex-col" style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Quick actions</h3>
                <p className="text-sm text-gray-500">Edit documents or find what you need</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              {/* Search/Find Section */}
              <div className="flex items-end gap-1">
                <div className="flex-1">
                  <Input
                    placeholder="Search documents, policies, or amendments..."
                    hideLabel={true}
                    size="lg"
                  />
                </div>
                <Button 
                  variant="primary" 
                  icon={<Icon name="search" size={20} />}
                  style={{ height: '44px', alignSelf: 'stretch' }}
                >
                  Search
                </Button>
              </div>
              
              {/* All Action Buttons - inline */}
              <div className="flex gap-2 flex-wrap items-center">
                <Button
                  variant="ghost"
                  size="medium"
                  icon={<Icon name="document-tasks" size={16} />}
                  onClick={() => onNavigate('/plan-editor')}
                >
                  ePlan Editor
                </Button>
                <Button
                  variant="ghost"
                  size="medium"
                  icon={<Icon name="send" size={16} />}
                  onClick={() => alert('Opening Submissions...')}
                >
                  Submissions
                </Button>
                <Button
                  variant="ghost"
                  size="medium"
                  icon={<Icon name="document-pdf" size={16} />}
                  onClick={() => alert('Opening Report Templates...')}
                >
                  Report Templates
                </Button>
                <div style={{ width: '1px', height: '24px', backgroundColor: '#E5E7EB', margin: '0 8px' }} />
                <Button 
                  variant="ghost" 
                  size="medium"
                  icon={<Icon name="add" size={20} />}
                  onClick={() => window.location.href = '#'}
                  aria-label="New document"
                  title="New document"
                  style={{ padding: '8px', minWidth: 'auto' }}
                />
                <Button 
                  variant="ghost" 
                  size="medium"
                  icon={<Icon name="catalog" size={20} />}
                  onClick={() => window.location.href = '#'}
                  aria-label="Browse files"
                  title="Browse files"
                  style={{ padding: '8px', minWidth: 'auto' }}
                />
              </div>
            </div>
          </div>
          
          {/* ePlan documents Panel */}
          <div className="flex flex-col" style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px', flex: 1 }}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">ePlan documents</h3>
                <p className="text-sm text-gray-500">Latest activity and status updates</p>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => window.location.href = '#'}
                style={{ fontSize: '14px' }}
              >
                View all
              </Button>
            </div>
            
            <div className="space-y-3">
              {amendments.slice(0, 3).map((amendment, index) => {
                const parts = amendment.amendment.split(' - ');
                return (
                  <div key={index} className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div>
                          <p 
                            style={{ 
                              fontWeight: 500, 
                              color: 'rgb(53, 96, 193)', 
                              textDecoration: 'underline transparent', 
                              transition: 'text-decoration-color 0.2s',
                              cursor: 'pointer',
                              fontSize: '14px'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.textDecorationColor = 'rgb(53, 96, 193)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.textDecorationColor = 'transparent' }}
                            onClick={() => onApplicationClick(amendment.amendment)}
                          >
                            {parts[0]}
                          </p>
                          {parts[1] && <p className="text-xs text-gray-500">{parts[1]}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-600">{amendment.role}</span>
                        <span className="text-xs text-gray-600">{amendment.step}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Chip
                        label={amendment.status}
                        variant={getStatusColor(amendment.status)}
                        size="small"
                      />
                      <span className="text-xs text-gray-500">{amendment.comments} comments</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Running consultations Section */}
          <div className="flex flex-col" style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px', marginTop: '16px' }}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Running consultations</h3>
                <p className="text-sm text-gray-500">Active public consultation processes</p>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('/consultation')}
                style={{ fontSize: '14px' }}
              >
                View all
              </Button>
            </div>
            
            <div className="space-y-3">
              {[
                {
                  id: '1',
                  title: 'Infrastructure Design Planning',
                  type: 'Major Amendment',
                  status: 'Active',
                  submissions: 47,
                  daysLeft: 14,
                  trending: 'Traffic concerns',
                  progress: 65
                },
                {
                  id: '2',
                  title: 'Sandgate District Neighbourhood Plan',
                  type: 'Neighbourhood Plan', 
                  status: 'Active',
                  submissions: 123,
                  daysLeft: 7,
                  trending: 'Building heights',
                  progress: 82
                },
                {
                  id: '3',
                  title: 'Local Heritage Amendment',
                  type: 'Qualified State Interest',
                  status: 'Review',
                  submissions: 89,
                  daysLeft: 3,
                  trending: 'Preservation support',
                  progress: 93
                }
              ].map((consultation, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between px-3 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => onNavigate(`/submission-inbox/${consultation.id}`)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div style={{ flex: 1 }}>
                        <p 
                          style={{ 
                            fontWeight: 500, 
                            color: 'rgb(53, 96, 193)', 
                            fontSize: '14px',
                            marginBottom: '2px'
                          }}
                        >
                          {consultation.title}
                        </p>
                        <p className="text-xs text-gray-500">{consultation.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-2">
                        <Icon name="document" size={14} color="#6B7280" />
                        <span className="text-xs text-gray-600">{consultation.submissions} submissions</span>
                      </div>
                      {consultation.trending && (
                        <div className="flex items-center gap-2">
                          <Icon name="trending-up" size={14} color="#6B7280" />
                          <span className="text-xs text-gray-600">{consultation.trending}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div style={{ textAlign: 'right' }}>
                      <Chip
                        label={consultation.status}
                        variant={consultation.status === 'Active' ? 'success' : consultation.status === 'Review' ? 'info' : 'secondary'}
                        size="small"
                      />
                      <div style={{ marginTop: '4px' }}>
                        <span style={{ 
                          fontSize: '11px', 
                          color: consultation.daysLeft <= 3 ? '#EF4444' : consultation.daysLeft <= 7 ? '#F59E0B' : '#6B7280',
                          fontWeight: 500
                        }}>
                          {consultation.daysLeft} days left
                        </span>
                      </div>
                    </div>
                    <Icon name="chevron-right" size={20} color="#9CA3AF" />
                    <div style={{ width: '60px' }}>
                      <div style={{ 
                        width: '100%', 
                        height: '4px', 
                        backgroundColor: '#E5E7EB',
                        borderRadius: '2px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${consultation.progress}%`,
                          height: '100%',
                          backgroundColor: consultation.daysLeft <= 3 ? '#EF4444' : consultation.daysLeft <= 7 ? '#F59E0B' : '#10B981',
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Quick Stats */}
            <div style={{ 
              marginTop: '12px', 
              paddingTop: '12px', 
              borderTop: '1px solid #E5E7EB',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '20px', fontWeight: 600, color: '#111827', margin: 0 }}>5</p>
                <p style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>Active</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '20px', fontWeight: 600, color: '#111827', margin: 0 }}>382</p>
                <p style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>Total Submissions</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '20px', fontWeight: 600, color: '#111827', margin: 0 }}>3</p>
                <p style={{ fontSize: '11px', color: '#6B7280', marginTop: '2px' }}>Ending Soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity - Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* New Container - Account Manager */}
          <div className="flex flex-col" style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px' }}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Account manager</h3>
                <p className="text-sm text-gray-500">Manage your account and settings</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); alert('Opening user management...'); }}
                style={{ 
                  color: '#0066CC',
                  fontSize: '14px',
                  textDecoration: 'none',
                  padding: '4px 0',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
                onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
              >
                Manage users
              </a>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); alert('Opening email issues for last 7 days...'); }}
                style={{ 
                  color: '#0066CC',
                  fontSize: '14px',
                  textDecoration: 'none',
                  padding: '4px 0',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
                onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
              >
                View emails sent issues for the last 7 days
              </a>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); alert('Opening email diagnostic data for last 7 days...'); }}
                style={{ 
                  color: '#0066CC',
                  fontSize: '14px',
                  textDecoration: 'none',
                  padding: '4px 0',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
                onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
              >
                View email diagnostic data for the last 7 days
              </a>
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); alert('Opening email diagnostic data by date range...'); }}
                style={{ 
                  color: '#0066CC',
                  fontSize: '14px',
                  textDecoration: 'none',
                  padding: '4px 0',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
                onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
              >
                View email diagnostic data by date range
              </a>
            </div>
          </div>

          {/* Recent Activity - Limited to 3 items */}
          <div className="flex flex-col" style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px', flex: 1 }}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Recent activity</h3>
                <p className="text-sm text-gray-500">Latest updates</p>
              </div>
              <Button 
                variant="tertiary" 
                onClick={() => window.location.href = '#'}
                style={{ fontSize: '14px' }}
              >
                View all
              </Button>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  user: 'Sarah Chen',
                  action: 'Updated status',
                  item: 'Policy Amendment 2024-03',
                  from: 'Draft',
                  to: 'Review',
                  time: '2 hours ago',
                  avatar: 'SC'
                },
                {
                  user: 'Michael Torres',
                  action: 'Added comment',
                  item: 'Zoning Revision A-15',
                  details: 'Requested clarification on setback requirements',
                  time: '4 hours ago',
                  avatar: 'MT'
                },
                {
                  user: 'Emma Watson',
                  action: 'Approved amendment',
                  item: 'Building Code Update B-22',
                  from: 'Review',
                  to: 'Approved',
                  time: '6 hours ago',
                  avatar: 'EW'
                }
              ].slice(0, 3).map((entry, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <UserAvatar 
                    user={{ name: entry.user }}
                    size="sm"
                    showPopup={false}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900 text-sm">{entry.user}</span>
                      <span className="text-gray-500 text-sm">{entry.action}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{entry.item}</p>
                    {entry.from && entry.to && (
                      <div className="flex items-center gap-2 text-xs">
                        <Chip label={entry.from} variant="grey" size="small" />
                        <Icon name="arrow-right" size={12} color="#6B7280" />
                        <Chip label={entry.to} variant={getStatusColor(entry.to)} size="small" />
                      </div>
                    )}
                    {entry.details && (
                      <p className="text-xs text-gray-600 mt-1">{entry.details}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">{entry.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

const MultiPageExample: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [currentPath, setCurrentPath] = useState('/');
  const [selectedBcNumber, setSelectedBcNumber] = useState<string | null>(null);
  const [isLeftNavCollapsed, setIsLeftNavCollapsed] = useState(false);
  const [selectedView, setSelectedView] = useState<'overview' | 'applications' | 'team' | 'reports'>('overview');
  const [selectedApplications, setSelectedApplications] = useState<Set<string>>(new Set());
  const [selectedAmendment, setSelectedAmendment] = useState<string | null>(null);

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setCurrentPath('/');
  };

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Sample applications data
  const applications = [
    { id: '1', reference: 'DA/2024/001', address: '123 Main Street', type: 'Residential', status: 'under-review', assignedTo: 'Sarah Chen', daysRemaining: 2, priority: 'high' as const },
    { id: '2', reference: 'DA/2024/002', address: '456 Oak Avenue', type: 'Commercial', status: 'awaiting-info', assignedTo: 'Michael Torres', daysRemaining: 7, priority: 'medium' as const },
    { id: '3', reference: 'DA/2024/003', address: '789 Pine Road', type: 'Industrial', status: 'approved', assignedTo: 'Emma Wilson', daysRemaining: 14, priority: 'low' as const },
    { id: '4', reference: 'DA/2024/004', address: '321 Elm Street', type: 'Mixed Use', status: 'under-review', assignedTo: 'James Park', daysRemaining: 1, priority: 'high' as const },
    { id: '5', reference: 'DA/2024/005', address: '654 Cedar Lane', type: 'Residential', status: 'rejected', assignedTo: 'Lisa Anderson', daysRemaining: 0, priority: 'medium' as const },
  ];

  const menuItems = [
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
      label: 'Plan Editor', 
      path: '/plan-editor',
      description: 'Edit and manage planning documents'
    },
    { 
      id: 'editing', 
      iconName: 'edit', 
      label: 'Document Editor', 
      path: '/editing',
      description: 'Edit policy documents and amendments'
    },
    { 
      id: 'map', 
      iconName: 'location', 
      label: 'Map', 
      path: '/map'
    },
    { 
      id: 'consultation', 
      iconName: 'chat', 
      label: 'Consultation', 
      path: '/consultation',
      description: 'Public consultation and feedback management'
    }
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
    // Clear navigation source flag when navigating via menu
    if (path === '/editing') {
      sessionStorage.setItem('navigationSource', 'menu');
    }
  };

  const handleApplicationClick = (amendmentName: string) => {
    setSelectedAmendment(amendmentName);
    setCurrentPath('/editing');
    // Set a flag to indicate navigation came from applications
    sessionStorage.setItem('navigationSource', 'applications');
  };

  const handleBackFromApplication = () => {
    setSelectedBcNumber(null);
  };

  const handleLayoutChange = (layoutId: string) => {
    // This function is called by PageManager but we don't need it for per-page layouts
    console.log('Layout changed to:', layoutId);
  };

  const getPageContent = () => {
    // Use the logged-in user's name
    const userName = "Scott";
    
    const pages: Record<string, { title: string; content: string; breadcrumbs: Array<{ label: string; path?: string; icon?: string }> }> = {
      '/': { 
        title: `Welcome back, ${userName}`, 
        content: '',
        breadcrumbs: [
          { label: 'Isovist', path: '/', icon: 'home' },
          { label: 'Dashboard' }
        ]
      },
      '/plan-editor': { 
        title: 'Plan Editor', 
        content: 'Edit and manage planning documents and amendments.',
        breadcrumbs: [
          { label: 'Home', path: '/', icon: 'home' },
          { label: 'Plan Editor' }
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
          { label: 'Plan Editor', path: '/plan-editor', icon: 'application' },
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
      '/map': { 
        title: 'City Plan Map', 
        content: '',
        breadcrumbs: [
          { label: 'Dashboard', path: '/', icon: 'home' },
          { label: 'Map' }
        ]
      },
      '/consultation': { 
        title: 'Public Consultation', 
        content: 'Manage public feedback and consultation processes for planning applications.',
        breadcrumbs: [
          { label: 'Home', path: '/', icon: 'home' },
          { label: 'Public Consultation' }
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

    // Handle dynamic submission-inbox paths
    if (currentPath.startsWith('/submission-inbox/')) {
      const consultationId = currentPath.split('/')[2];
      
      // Map consultation IDs to names
      const consultationNames: { [key: string]: string } = {
        '1': 'Infrastructure Design Planning Scheme Policy Amendment',
        '2': 'Sandgate District Neighbourhood Plan',
        '3': 'Local Heritage Amendment',
        '4': 'Housing Affordability Amendment',
        '5': 'Climate Resilience Planning Scheme',
      };
      
      const consultationName = consultationNames[consultationId] || 'Consultation';
      
      return {
        title: `Submissions - ${consultationName}`,
        content: '',
        breadcrumbs: [
          { label: 'Home', path: '/', icon: 'home' },
          { label: 'Public Consultation', path: '/consultation' },
          { label: consultationName }
        ]
      };
    }

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
              {/* Navigation Items */}
              <nav 
                role="menubar" 
                aria-orientation="vertical"
                style={{ 
                  flex: 1, 
                  overflowY: isLeftNavCollapsed ? 'hidden' : 'auto', 
                  overflowX: 'hidden',
                  padding: '8px 0 8px 0' 
                }}
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
                        borderRadius: '0 4px 4px 0',
                        margin: '1px 0',
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
              
              {/* Spacer to push collapse button to bottom */}
              <div style={{ flex: 1, minHeight: '20px' }} />
              
              {/* Collapse Toggle at Bottom */}
              <button
                onClick={() => setIsLeftNavCollapsed(!isLeftNavCollapsed)}
                aria-label={isLeftNavCollapsed ? 'Expand navigation menu' : 'Collapse navigation menu'}
                aria-expanded={!isLeftNavCollapsed}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  padding: isLeftNavCollapsed ? '12px' : '10px 16px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  borderLeft: '3px solid transparent',
                  borderRadius: '0 4px 4px 0',
                  margin: '1px 0',
                  justifyContent: isLeftNavCollapsed ? 'center' : 'flex-start',
                  color: '#6B7280',
                  marginBottom: '12px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F9FAFB';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Icon name={isLeftNavCollapsed ? 'chevron-right' : 'chevron-left'} size={20} />
                {!isLeftNavCollapsed && (
                  <span style={{
                    marginLeft: '12px',
                    fontSize: '14px',
                    fontWeight: '400',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
                  }}>
                    Collapse
                  </span>
                )}
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main 
            role="main"
            aria-label="Main content area"
            className={styles.mainContent} 
            style={{ flex: 1, overflow: 'auto', padding: '24px' }}
          >
            {/* Page Title and Breadcrumbs */}
            {!selectedBcNumber && (
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
                                setCurrentPath('/plan-editor');
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
                
                {currentPath !== '/consultation' && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1 }}>
                      <div>
                        <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#111827', margin: 0 }}>
                          {currentPath === '/editing' ? (selectedAmendment || 'Document Editor') : currentPage.title}
                        </h1>
                        <p style={{ color: '#6B7280', marginTop: '4px' }}>
                          {currentPage.content}
                        </p>
                      </div>
                    </div>
                  
                  {/* Document Authors - Only show on editing page */}
                  {currentPath === '/editing' && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '-8px',
                      marginLeft: '24px'
                    }}>
                      <div style={{ marginLeft: '-8px' }}>
                        <UserAvatar 
                          user={{ 
                            name: 'Sarah Chen',
                            role: 'Lead Author'
                          }}
                          size="md"
                          showPopup={true}
                          style={{ 
                            border: '2px solid white',
                            position: 'relative',
                            zIndex: 3
                          }}
                        />
                      </div>
                      
                      <div style={{ marginLeft: '-12px' }}>
                        <UserAvatar 
                          user={{ 
                            name: 'Michael Torres',
                            role: 'Contributor'
                          }}
                          size="md"
                          showPopup={true}
                          style={{ 
                            border: '2px solid white',
                            position: 'relative',
                            zIndex: 2
                          }}
                        />
                      </div>
                      
                      <div style={{ marginLeft: '-12px' }}>
                        <UserAvatar 
                          user={{ 
                            name: 'Emma Wilson',
                            role: 'Reviewer'
                          }}
                          size="md"
                          showPopup={true}
                          style={{ 
                            border: '2px solid white',
                            position: 'relative',
                            zIndex: 1
                          }}
                        />
                      </div>
                    </div>
                  )}
                  </div>
                )}
              </div>
            )}

            {/* Dynamic Content */}
            <div>
              {/* Dynamic Content */}
              {currentPath === '/components' ? (
                <LazyComponentsShowcase />
              ) : 
              /* ADMIN PAGES - ODL Styling */
              currentPath === '/' ? (
                // Default Dashboard 
                <DashboardContent onNavigate={handleNavigate} onApplicationClick={handleApplicationClick} />
              ) : currentPath === '/plan-editor' ? (
                selectedBcNumber ? (
                  <LazyApplicationSummaryPage 
                    bcNumber={selectedBcNumber}
                    onBack={handleBackFromApplication}
                  />
                ) : (
                  <LazyPlanEditor onApplicationClick={handleApplicationClick} />
                )
              ) : currentPath === '/referrals' ? (
                <LazyEditingPage />
              ) : currentPath === '/editing' ? (
                <LazyComplianceChecklistPage 
                  amendmentTitle={selectedAmendment} 
                  onBack={() => {
                    setCurrentPath('/plan-editor');
                    setSelectedAmendment(null);
                  }}
                  fromPage="Admin Dashboard"
                />
              ) : currentPath === '/map' ? (
                <LazyCityPlanHomepage />
              ) : currentPath === '/consultation' ? (
                <LazyConsultation onNavigate={handleNavigate} />
              ) : currentPath.startsWith('/submission-inbox') ? (
                <LazySubmissionInbox 
                  onNavigate={handleNavigate}
                  consultationId={currentPath.split('/')[2]}
                />
              ) :
              null}
            </div>
          </main>

        </div>
      </div>
    </AccessibilityProvider>
  );
};

export default MultiPageExample; 