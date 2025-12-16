import React, { useState } from 'react';
import ODLTheme from '../styles/ODLTheme';
import Button from '../components/Button/Button';
import Cards from '../components/Cards/Cards';
import StatusCard from '../components/StatusCard/StatusCard';
import Dropdown from '../components/Dropdown/Dropdown';
import Icon from '../components/Icon/Icon';
import Input from '../components/Input/Input';

// Simplified Tabs Component with inline styles (matching TabsDemo)
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
                fontSize: variant === 'default' ? ODLTheme.typography.fontSize.sm : ODLTheme.typography.fontSize.xs,
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
                <div style={{
                  position: 'absolute',
                  bottom: '-1px',
                  left: 0,
                  right: 0,
                  height: '2px',
                  backgroundColor: ODLTheme.colors.primary,
                  borderRadius: '1px'
                }} />
              )}
            </button>
          );
        })}
      </div>

      {showContent && activeTabData && activeTabData.content && (
        <div style={{ paddingTop: ODLTheme.spacing[4] }}>
          {activeTabData.content}
        </div>
      )}
    </div>
  );
};

interface TeamMember {
  id: string;
  name: string;
  role: string;
  activeApplications: number;
  completedThisWeek: number;
  avgProcessingTime: number;
  status: 'online' | 'away' | 'offline';
}

interface Application {
  id: string;
  reference: string;
  address: string;
  type: string;
  status: 'pending' | 'under-review' | 'awaiting-info' | 'approved' | 'rejected';
  assignedTo: string;
  lodgedDate: string;
  dueDate: string;
  daysRemaining: number;
  priority: 'high' | 'medium' | 'low';
  value: string;
}

const CouncilDashboard: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'overview' | 'applications' | 'team' | 'reports'>('overview');
  const [selectedApplications, setSelectedApplications] = useState<Set<string>>(new Set());
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [quickFilter, setQuickFilter] = useState<string>('all');

  // Mock data for team members
  const teamMembers: TeamMember[] = [
    { id: '1', name: 'Sarah Chen', role: 'Senior Planner', activeApplications: 8, completedThisWeek: 3, avgProcessingTime: 4.2, status: 'online' },
    { id: '2', name: 'Michael Torres', role: 'Planning Officer', activeApplications: 12, completedThisWeek: 5, avgProcessingTime: 3.8, status: 'online' },
    { id: '3', name: 'Emma Wilson', role: 'Senior Planner', activeApplications: 7, completedThisWeek: 4, avgProcessingTime: 3.5, status: 'away' },
    { id: '4', name: 'James Park', role: 'Planning Officer', activeApplications: 10, completedThisWeek: 2, avgProcessingTime: 5.1, status: 'online' },
    { id: '5', name: 'Lisa Anderson', role: 'Principal Planner', activeApplications: 6, completedThisWeek: 6, avgProcessingTime: 2.9, status: 'online' },
    { id: '6', name: 'David Kim', role: 'Planning Officer', activeApplications: 11, completedThisWeek: 3, avgProcessingTime: 4.5, status: 'offline' },
    { id: '7', name: 'Rachel Green', role: 'Senior Planner', activeApplications: 9, completedThisWeek: 4, avgProcessingTime: 3.7, status: 'online' },
    { id: '8', name: 'Tom Martinez', role: 'Planning Officer', activeApplications: 13, completedThisWeek: 2, avgProcessingTime: 4.8, status: 'online' },
    { id: '9', name: 'Sophie Taylor', role: 'Planning Officer', activeApplications: 8, completedThisWeek: 5, avgProcessingTime: 3.3, status: 'away' },
    { id: '10', name: 'Kevin Zhang', role: 'Senior Planner', activeApplications: 7, completedThisWeek: 4, avgProcessingTime: 3.6, status: 'online' },
  ];

  // Mock data for applications
  const applications: Application[] = [
    { id: '1', reference: 'DA/2024/0451', address: '45 Main Street, Riverside', type: 'Residential - New Dwelling', status: 'under-review', assignedTo: 'Sarah Chen', lodgedDate: '2024-01-15', dueDate: '2024-02-15', daysRemaining: 3, priority: 'high', value: '$450,000' },
    { id: '2', reference: 'DA/2024/0452', address: '123 Park Avenue, Hillside', type: 'Commercial - Alterations', status: 'pending', assignedTo: 'Michael Torres', lodgedDate: '2024-01-16', dueDate: '2024-02-20', daysRemaining: 8, priority: 'medium', value: '$180,000' },
    { id: '3', reference: 'DA/2024/0453', address: '78 Ocean Road, Beachside', type: 'Residential - Extension', status: 'awaiting-info', assignedTo: 'Emma Wilson', lodgedDate: '2024-01-10', dueDate: '2024-02-12', daysRemaining: 0, priority: 'high', value: '$95,000' },
    { id: '4', reference: 'DA/2024/0454', address: '234 Forest Lane, Greenwood', type: 'Subdivision', status: 'under-review', assignedTo: 'James Park', lodgedDate: '2024-01-08', dueDate: '2024-02-18', daysRemaining: 6, priority: 'high', value: '$1,200,000' },
    { id: '5', reference: 'DA/2024/0455', address: '567 River Street, Waterfront', type: 'Mixed Use Development', status: 'under-review', assignedTo: 'Lisa Anderson', lodgedDate: '2024-01-12', dueDate: '2024-02-22', daysRemaining: 10, priority: 'medium', value: '$3,500,000' },
    { id: '6', reference: 'DA/2024/0456', address: '89 Garden Way, Parklands', type: 'Residential - Pool', status: 'approved', assignedTo: 'David Kim', lodgedDate: '2024-01-05', dueDate: '2024-02-05', daysRemaining: -7, priority: 'low', value: '$35,000' },
    { id: '7', reference: 'DA/2024/0457', address: '456 Industrial Drive, Commerce Park', type: 'Industrial - Warehouse', status: 'pending', assignedTo: 'Rachel Green', lodgedDate: '2024-01-18', dueDate: '2024-02-25', daysRemaining: 13, priority: 'medium', value: '$850,000' },
    { id: '8', reference: 'DA/2024/0458', address: '12 School Street, Education Quarter', type: 'Institutional - School Extension', status: 'under-review', assignedTo: 'Tom Martinez', lodgedDate: '2024-01-14', dueDate: '2024-02-21', daysRemaining: 9, priority: 'high', value: '$2,100,000' },
  ];

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'approved': return ODLTheme.colors.success;
      case 'rejected': return ODLTheme.colors.error;
      case 'awaiting-info': return ODLTheme.colors.warning;
      case 'under-review': return ODLTheme.colors.info;
      default: return ODLTheme.colors.text.secondary;
    }
  };

  const getStatusBackground = (status: Application['status']) => {
    switch (status) {
      case 'approved': return ODLTheme.colors.successLight;
      case 'rejected': return ODLTheme.colors.errorLight;
      case 'awaiting-info': return ODLTheme.colors.warningLight;
      case 'under-review': return ODLTheme.colors.infoLight;
      default: return ODLTheme.colors.surface;
    }
  };

  const getPriorityColor = (priority: Application['priority']) => {
    switch (priority) {
      case 'high': return ODLTheme.colors.error;
      case 'medium': return ODLTheme.colors.warning;
      case 'low': return ODLTheme.colors.success;
      default: return ODLTheme.colors.text.secondary;
    }
  };

  const filteredApplications = applications.filter(app => {
    // Apply quick filter first
    if (quickFilter === 'urgent' && app.priority !== 'high' && app.daysRemaining > 3) return false;
    if (quickFilter === 'completed' && app.status !== 'approved' && app.status !== 'rejected') return false;
    if (quickFilter === 'my-team') {
      // Filter to show only first 5 team members' applications for demo
      const myTeam = ['Sarah Chen', 'Michael Torres', 'Emma Wilson', 'James Park', 'Lisa Anderson'];
      if (!myTeam.includes(app.assignedTo)) return false;
    }
    
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || app.priority === filterPriority;
    const matchesSearch = app.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#EDF1F5' }}>
      {/* Header */}
      <div style={{
        background: ODLTheme.colors.white,
        borderBottom: `1px solid ${ODLTheme.colors.border}`,
        padding: `${ODLTheme.spacing[4]} ${ODLTheme.spacing[6]}`,
        boxShadow: ODLTheme.shadows.sm,
      }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: ODLTheme.spacing[3] }}>
            <div>
              <h1 style={{
                fontSize: ODLTheme.typography.fontSize['2xl'],
                fontWeight: ODLTheme.typography.fontWeight.bold,
                color: ODLTheme.colors.text.primary,
                marginBottom: ODLTheme.spacing[1],
              }}>
                Development Applications Dashboard
              </h1>
              <p style={{
                fontSize: ODLTheme.typography.fontSize.sm,
                color: ODLTheme.colors.text.secondary,
              }}>
                Planning & Development Department • {new Date().toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div style={{ display: 'flex', gap: ODLTheme.spacing[3] }}>
              <Button variant="secondary" size="small" icon={<Icon name="download" size={16} />}>
                Export Report
              </Button>
              <Button variant="primary" size="small" icon={<Icon name="add" size={16} />}>
                New Application
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: ODLTheme.spacing[4],
            marginTop: ODLTheme.spacing[4],
          }}>
            <StatusCard
              icon="document-tasks"
              title="Total Active"
              metric="91"
              subtitle="Active applications"
              comparison="+8% vs last week"
              trend="up"
              variant="primary"
              onClick={() => setQuickFilter('')}
            />
            <StatusCard
              icon="view"
              title="Under Review"
              metric="34"
              subtitle="Being processed"
              comparison="+12% vs last week"
              trend="up"
              variant="info"
              onClick={() => setFilterStatus('under-review')}
            />
            <StatusCard
              icon="time"
              title="Awaiting Info"
              metric="18"
              subtitle="Pending response"
              comparison="-5% vs last week"
              trend="down"
              variant="warning"
              onClick={() => setFilterStatus('information-requested')}
            />
            <StatusCard
              icon="warning"
              title="Due This Week"
              metric="23"
              subtitle="Deadline approaching"
              comparison="+3% vs last week"
              trend="up"
              variant="error"
              onClick={() => setQuickFilter('urgent')}
            />
            <StatusCard
              icon="checkmark-filled"
              title="Completed This Week"
              metric="37"
              subtitle="Processed & closed"
              comparison="+15% vs last week"
              trend="up"
              variant="success"
              onClick={() => setQuickFilter('completed')}
            />
            <StatusCard
              icon="chart-average"
              title="Avg Processing"
              metric="3.9"
              subtitle="days (department avg)"
              comparison="-0.3 days"
              trend="down"
              variant="default"
              onClick={() => console.log('Processing time details')}
            />
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{
        background: ODLTheme.colors.white,
        borderBottom: `1px solid ${ODLTheme.colors.border}`,
        paddingLeft: ODLTheme.spacing[6],
        paddingRight: ODLTheme.spacing[6],
      }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <SimpleTabs
            tabs={[
              { id: 'overview', label: 'Overview', icon: 'dashboard' },
              { id: 'applications', label: 'Applications', icon: 'document' },
              { id: 'team', label: 'Team Performance', icon: 'user-multiple' },
              { id: 'reports', label: 'Reports', icon: 'analytics' },
            ]}
            activeTab={selectedView}
            onTabChange={(id) => setSelectedView(id as any)}
            variant="default"
          />
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: ODLTheme.spacing[6] }}>
        {/* Overview Tab */}
        {selectedView === 'overview' && (
          <div style={{ display: 'grid', gap: ODLTheme.spacing[6] }}>
            {/* Critical Applications */}
            <div style={{
              background: ODLTheme.colors.white,
              border: `1px solid ${ODLTheme.colors.border}`,
              borderRadius: ODLTheme.borders.radius.lg,
              padding: ODLTheme.spacing[6],
            }}>
              <h2 style={{
                fontSize: ODLTheme.typography.fontSize.lg,
                fontWeight: ODLTheme.typography.fontWeight.semibold,
                marginBottom: ODLTheme.spacing[4],
                color: ODLTheme.colors.text.primary,
              }}>
                ⚠️ Requires Immediate Attention
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {applications
                  .filter(app => app.daysRemaining <= 3 || app.priority === 'high')
                  .slice(0, 5)
                  .map((app, index, array) => (
                    <div key={app.id} style={{ marginTop: index === 0 ? '0' : '-1px' }}>
                      <Cards
                        title={`${app.reference} - ${app.address}`}
                        subtitle={`${app.type} • Assigned to ${app.assignedTo} • Due in ${app.daysRemaining} days`}
                        tag={app.status.replace('-', ' ').toUpperCase()}
                        selected={selectedApplications.has(app.id)}
                        onSelect={(selected) => {
                          const newSelected = new Set(selectedApplications);
                          if (selected) {
                            newSelected.add(app.id);
                          } else {
                            newSelected.delete(app.id);
                          }
                          setSelectedApplications(newSelected);
                        }}
                        style={{
                          borderRadius: index === 0 ? '8px 8px 0 0' : 
                                       index === array.length - 1 ? '0 0 8px 8px' : 
                                       '0'
                        }}
                      />
                    </div>
                  ))}
              </div>
            </div>

            {/* Team Performance Summary */}
            <div style={{
              background: ODLTheme.colors.white,
              border: `1px solid ${ODLTheme.colors.border}`,
              borderRadius: ODLTheme.borders.radius.lg,
              padding: ODLTheme.spacing[6],
            }}>
              <h2 style={{
                fontSize: ODLTheme.typography.fontSize.lg,
                fontWeight: ODLTheme.typography.fontWeight.semibold,
                marginBottom: ODLTheme.spacing[4],
                color: ODLTheme.colors.text.primary,
              }}>
                👥 Team Status Overview
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: ODLTheme.spacing[4],
              }}>
                {teamMembers.slice(0, 6).map(member => {
                  const getInitials = () => {
                    return member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
                  };
                  
                  const getStatusColor = () => {
                    switch (member.status) {
                      case 'online': return ODLTheme.colors.success;
                      case 'away': return ODLTheme.colors.warning;
                      case 'offline': return ODLTheme.colors.text.tertiary;
                      default: return ODLTheme.colors.text.tertiary;
                    }
                  };

                  return (
                    <div
                      key={member.id}
                      style={{
                        backgroundColor: ODLTheme.colors.white,
                        border: `1px solid ${ODLTheme.colors.border}`,
                        borderRadius: ODLTheme.borders.radius.md,
                        padding: ODLTheme.spacing[4],
                        transition: ODLTheme.transitions.base,
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
                        e.currentTarget.style.boxShadow = ODLTheme.shadows.md;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = ODLTheme.colors.white;
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {/* Header with Avatar and Info */}
                      <div style={{ display: 'flex', gap: ODLTheme.spacing[3], marginBottom: ODLTheme.spacing[3] }}>
                        {/* Mini Avatar */}
                        <div style={{ position: 'relative' }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: ODLTheme.colors.primary,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: ODLTheme.colors.white,
                            fontSize: ODLTheme.typography.fontSize.sm,
                            fontWeight: ODLTheme.typography.fontWeight.semibold,
                          }}>
                            {getInitials()}
                          </div>
                          {/* Status Indicator */}
                          <div style={{
                            position: 'absolute',
                            bottom: '0',
                            right: '0',
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: getStatusColor(),
                            border: `2px solid ${ODLTheme.colors.white}`,
                          }} />
                        </div>

                        {/* Name and Role */}
                        <div style={{ flex: 1 }}>
                          <h4 style={{
                            fontSize: ODLTheme.typography.fontSize.base,
                            fontWeight: ODLTheme.typography.fontWeight.semibold,
                            color: ODLTheme.colors.text.primary,
                            margin: 0,
                            marginBottom: ODLTheme.spacing[1],
                          }}>
                            {member.name}
                          </h4>
                          <p style={{
                            fontSize: ODLTheme.typography.fontSize.xs,
                            color: ODLTheme.colors.text.secondary,
                            margin: 0,
                          }}>
                            {member.role}
                          </p>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr',
                        gap: ODLTheme.spacing[3],
                        paddingTop: ODLTheme.spacing[3],
                        borderTop: `1px solid ${ODLTheme.colors.border}`,
                      }}>
                        <div>
                          <p style={{
                            fontSize: ODLTheme.typography.fontSize.xs,
                            color: ODLTheme.colors.text.tertiary,
                            margin: 0,
                            marginBottom: ODLTheme.spacing[1],
                          }}>
                            Active
                          </p>
                          <p style={{
                            fontSize: ODLTheme.typography.fontSize.lg,
                            fontWeight: ODLTheme.typography.fontWeight.bold,
                            color: ODLTheme.colors.primary,
                            margin: 0,
                          }}>
                            {member.activeApplications}
                          </p>
                        </div>
                        <div>
                          <p style={{
                            fontSize: ODLTheme.typography.fontSize.xs,
                            color: ODLTheme.colors.text.tertiary,
                            margin: 0,
                            marginBottom: ODLTheme.spacing[1],
                          }}>
                            This Week
                          </p>
                          <p style={{
                            fontSize: ODLTheme.typography.fontSize.lg,
                            fontWeight: ODLTheme.typography.fontWeight.bold,
                            color: ODLTheme.colors.success,
                            margin: 0,
                          }}>
                            {member.completedThisWeek}
                          </p>
                        </div>
                      </div>

                      {/* Performance Indicator */}
                      <div style={{
                        marginTop: ODLTheme.spacing[3],
                        padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[3]}`,
                        backgroundColor: member.avgProcessingTime > 4 ? ODLTheme.colors.warningLight : ODLTheme.colors.successLight,
                        borderRadius: ODLTheme.borders.radius.base,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                        <span style={{
                          fontSize: ODLTheme.typography.fontSize.xs,
                          color: ODLTheme.colors.text.secondary,
                        }}>
                          Avg Processing
                        </span>
                        <span style={{
                          fontSize: ODLTheme.typography.fontSize.sm,
                          fontWeight: ODLTheme.typography.fontWeight.semibold,
                          color: member.avgProcessingTime > 4 ? ODLTheme.colors.warning : ODLTheme.colors.success,
                        }}>
                          {member.avgProcessingTime} days
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {selectedView === 'applications' && (
          <div>
            {/* Filters */}
            <div style={{
              background: ODLTheme.colors.white,
              border: `1px solid ${ODLTheme.colors.border}`,
              borderRadius: ODLTheme.borders.radius.lg,
              padding: ODLTheme.spacing[4],
              marginBottom: ODLTheme.spacing[4],
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px 200px 200px', gap: ODLTheme.spacing[3], alignItems: 'end' }}>
                <Input
                  label="Search Applications"
                  placeholder="Search by reference, address, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  icon={<Icon name="search" size={16} />}
                />
                <Dropdown
                  label="Status"
                  options={[
                    { value: 'all', label: 'All Status' },
                    { value: 'pending', label: 'Pending' },
                    { value: 'under-review', label: 'Under Review' },
                    { value: 'awaiting-info', label: 'Awaiting Info' },
                    { value: 'approved', label: 'Approved' },
                    { value: 'rejected', label: 'Rejected' },
                  ]}
                  value={filterStatus}
                  onChange={(value) => setFilterStatus(value)}
                />
                <Dropdown
                  label="Priority"
                  options={[
                    { value: 'all', label: 'All Priorities' },
                    { value: 'high', label: 'High' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'low', label: 'Low' },
                  ]}
                  value={filterPriority}
                  onChange={(value) => setFilterPriority(value)}
                />
                <Button variant="secondary" size="small">
                  Clear Filters
                </Button>
              </div>
            </div>

            {/* Applications List */}
            <div style={{
              background: ODLTheme.colors.white,
              border: `1px solid ${ODLTheme.colors.border}`,
              borderRadius: ODLTheme.borders.radius.lg,
              overflow: 'hidden',
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: ODLTheme.colors.surface }}>
                    <th style={{ padding: ODLTheme.spacing[3], textAlign: 'left', fontSize: ODLTheme.typography.fontSize.sm, fontWeight: ODLTheme.typography.fontWeight.semibold }}>
                      Reference
                    </th>
                    <th style={{ padding: ODLTheme.spacing[3], textAlign: 'left', fontSize: ODLTheme.typography.fontSize.sm, fontWeight: ODLTheme.typography.fontWeight.semibold }}>
                      Address
                    </th>
                    <th style={{ padding: ODLTheme.spacing[3], textAlign: 'left', fontSize: ODLTheme.typography.fontSize.sm, fontWeight: ODLTheme.typography.fontWeight.semibold }}>
                      Type
                    </th>
                    <th style={{ padding: ODLTheme.spacing[3], textAlign: 'left', fontSize: ODLTheme.typography.fontSize.sm, fontWeight: ODLTheme.typography.fontWeight.semibold }}>
                      Status
                    </th>
                    <th style={{ padding: ODLTheme.spacing[3], textAlign: 'left', fontSize: ODLTheme.typography.fontSize.sm, fontWeight: ODLTheme.typography.fontWeight.semibold }}>
                      Assigned To
                    </th>
                    <th style={{ padding: ODLTheme.spacing[3], textAlign: 'left', fontSize: ODLTheme.typography.fontSize.sm, fontWeight: ODLTheme.typography.fontWeight.semibold }}>
                      Priority
                    </th>
                    <th style={{ padding: ODLTheme.spacing[3], textAlign: 'left', fontSize: ODLTheme.typography.fontSize.sm, fontWeight: ODLTheme.typography.fontWeight.semibold }}>
                      Days Remaining
                    </th>
                    <th style={{ padding: ODLTheme.spacing[3], textAlign: 'left', fontSize: ODLTheme.typography.fontSize.sm, fontWeight: ODLTheme.typography.fontWeight.semibold }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app, index) => (
                    <tr
                      key={app.id}
                      style={{
                        borderTop: index > 0 ? `1px solid ${ODLTheme.colors.border}` : 'none',
                        background: index % 2 === 0 ? ODLTheme.colors.white : ODLTheme.colors.surface,
                      }}
                    >
                      <td style={{ padding: ODLTheme.spacing[3], fontSize: ODLTheme.typography.fontSize.sm, fontWeight: ODLTheme.typography.fontWeight.medium }}>
                        {app.reference}
                      </td>
                      <td style={{ padding: ODLTheme.spacing[3], fontSize: ODLTheme.typography.fontSize.sm }}>
                        {app.address}
                      </td>
                      <td style={{ padding: ODLTheme.spacing[3], fontSize: ODLTheme.typography.fontSize.sm }}>
                        {app.type}
                      </td>
                      <td style={{ padding: ODLTheme.spacing[3] }}>
                        <span style={{
                          padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`,
                          background: getStatusBackground(app.status),
                          color: getStatusColor(app.status),
                          borderRadius: ODLTheme.borders.radius.base,
                          fontSize: ODLTheme.typography.fontSize.xs,
                          fontWeight: ODLTheme.typography.fontWeight.medium,
                        }}>
                          {app.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: ODLTheme.spacing[3], fontSize: ODLTheme.typography.fontSize.sm }}>
                        {app.assignedTo}
                      </td>
                      <td style={{ padding: ODLTheme.spacing[3] }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: ODLTheme.spacing[1],
                        }}>
                          <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: getPriorityColor(app.priority),
                          }} />
                          <span style={{ fontSize: ODLTheme.typography.fontSize.sm, textTransform: 'capitalize' }}>
                            {app.priority}
                          </span>
                        </span>
                      </td>
                      <td style={{ padding: ODLTheme.spacing[3], fontSize: ODLTheme.typography.fontSize.sm }}>
                        <span style={{
                          color: app.daysRemaining <= 3 ? ODLTheme.colors.error :
                                 app.daysRemaining <= 7 ? ODLTheme.colors.warning :
                                 ODLTheme.colors.text.primary,
                          fontWeight: app.daysRemaining <= 3 ? ODLTheme.typography.fontWeight.semibold : ODLTheme.typography.fontWeight.normal,
                        }}>
                          {app.daysRemaining > 0 ? `${app.daysRemaining} days` : app.daysRemaining === 0 ? 'Due Today' : 'Overdue'}
                        </span>
                      </td>
                      <td style={{ padding: ODLTheme.spacing[3] }}>
                        <div style={{ display: 'flex', gap: ODLTheme.spacing[2] }}>
                          <Button variant="ghost" size="xs">View</Button>
                          <Button variant="secondary" size="xs">Assign</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Team Tab */}
        {selectedView === 'team' && (
          <div>
            <div style={{
              background: ODLTheme.colors.white,
              border: `1px solid ${ODLTheme.colors.border}`,
              borderRadius: ODLTheme.borders.radius.lg,
              padding: ODLTheme.spacing[6],
            }}>
              <h2 style={{
                fontSize: ODLTheme.typography.fontSize.lg,
                fontWeight: ODLTheme.typography.fontWeight.semibold,
                marginBottom: ODLTheme.spacing[4],
                color: ODLTheme.colors.text.primary,
              }}>
                Team Performance Metrics
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: ODLTheme.spacing[4],
              }}>
                {teamMembers.map(member => (
                  <div
                    key={member.id}
                    style={{
                      border: `1px solid ${ODLTheme.colors.border}`,
                      borderRadius: ODLTheme.borders.radius.md,
                      padding: ODLTheme.spacing[5],
                      background: ODLTheme.colors.white,
                      transition: `all ${ODLTheme.transitions.base}`,
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = ODLTheme.shadows.lg;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: ODLTheme.spacing[4] }}>
                      <div>
                        <h3 style={{
                          fontSize: ODLTheme.typography.fontSize.md,
                          fontWeight: ODLTheme.typography.fontWeight.semibold,
                          color: ODLTheme.colors.text.primary,
                          marginBottom: ODLTheme.spacing[1],
                        }}>
                          {member.name}
                        </h3>
                        <p style={{
                          fontSize: ODLTheme.typography.fontSize.sm,
                          color: ODLTheme.colors.text.secondary,
                        }}>
                          {member.role}
                        </p>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: ODLTheme.spacing[2],
                      }}>
                        <span style={{
                          fontSize: ODLTheme.typography.fontSize.xs,
                          color: ODLTheme.colors.text.tertiary,
                        }}>
                          {member.status}
                        </span>
                        <div style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: member.status === 'online' ? ODLTheme.colors.success :
                                     member.status === 'away' ? ODLTheme.colors.warning :
                                     ODLTheme.colors.text.tertiary,
                        }} />
                      </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: ODLTheme.spacing[4] }}>
                      <div>
                        <p style={{
                          fontSize: ODLTheme.typography.fontSize.xs,
                          color: ODLTheme.colors.text.tertiary,
                          marginBottom: ODLTheme.spacing[1],
                        }}>
                          Active Applications
                        </p>
                        <p style={{
                          fontSize: ODLTheme.typography.fontSize['2xl'],
                          fontWeight: ODLTheme.typography.fontWeight.bold,
                          color: ODLTheme.colors.primary,
                        }}>
                          {member.activeApplications}
                        </p>
                      </div>
                      <div>
                        <p style={{
                          fontSize: ODLTheme.typography.fontSize.xs,
                          color: ODLTheme.colors.text.tertiary,
                          marginBottom: ODLTheme.spacing[1],
                        }}>
                          Completed This Week
                        </p>
                        <p style={{
                          fontSize: ODLTheme.typography.fontSize['2xl'],
                          fontWeight: ODLTheme.typography.fontWeight.bold,
                          color: ODLTheme.colors.success,
                        }}>
                          {member.completedThisWeek}
                        </p>
                      </div>
                    </div>
                    
                    <div style={{
                      marginTop: ODLTheme.spacing[4],
                      paddingTop: ODLTheme.spacing[4],
                      borderTop: `1px solid ${ODLTheme.colors.border}`,
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{
                            fontSize: ODLTheme.typography.fontSize.xs,
                            color: ODLTheme.colors.text.tertiary,
                            marginBottom: ODLTheme.spacing[1],
                          }}>
                            Avg Processing Time
                          </p>
                          <p style={{
                            fontSize: ODLTheme.typography.fontSize.lg,
                            fontWeight: ODLTheme.typography.fontWeight.semibold,
                            color: member.avgProcessingTime > 4 ? ODLTheme.colors.warning : ODLTheme.colors.text.primary,
                          }}>
                            {member.avgProcessingTime} days
                          </p>
                        </div>
                        <Button variant="ghost" size="xs">View Details</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {selectedView === 'reports' && (
          <div style={{
            background: ODLTheme.colors.white,
            border: `1px solid ${ODLTheme.colors.border}`,
            borderRadius: ODLTheme.borders.radius.lg,
            padding: ODLTheme.spacing[8],
            textAlign: 'center',
          }}>
            <Icon name="analytics" size={48} />
            <h2 style={{
              fontSize: ODLTheme.typography.fontSize.xl,
              fontWeight: ODLTheme.typography.fontWeight.semibold,
              marginTop: ODLTheme.spacing[4],
              marginBottom: ODLTheme.spacing[2],
              color: ODLTheme.colors.text.primary,
            }}>
              Reports & Analytics
            </h2>
            <p style={{
              fontSize: ODLTheme.typography.fontSize.base,
              color: ODLTheme.colors.text.secondary,
              marginBottom: ODLTheme.spacing[6],
            }}>
              Generate detailed reports on application processing, team performance, and departmental metrics.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: ODLTheme.spacing[3] }}>
              <Button variant="primary" icon={<Icon name="document" size={16} />}>
                Generate Monthly Report
              </Button>
              <Button variant="secondary" icon={<Icon name="download" size={16} />}>
                Export Data
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CouncilDashboard;