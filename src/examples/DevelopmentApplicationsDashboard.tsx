import React, { useState } from 'react';
import Header from '../components/Header/Header';
import NavigationRail from '../components/NavigationRail/NavigationRail';
import Icon from '../components/Icon/Icon';
import Table from '../components/Table/Table';
import { TableRowData } from '../types/common';

// Self-contained Button component from demo
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'text' | 'destructive' | 'ghost';
  size?: 'small' | 'medium' | 'large' | 'xs' | 'sm';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
  style?: React.CSSProperties;
  selected?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  type = 'button',
  className,
  icon,
  iconRight,
  loading = false,
  style,
  selected = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getVariantStyles = () => {
    const primaryColor = '#3560C1';
    const secondaryBorder = '#D1D1D1';
    const textColor = '#525965';
    
    if (selected && !disabled) {
      return {
        backgroundColor: primaryColor,
        color: 'white',
        border: 'none',
        borderRadius: '2px',
        minHeight: size === 'xs' ? '28px' : size === 'small' || size === 'sm' ? '36px' : '44px',
      };
    }
    
    const variants = {
      primary: {
        backgroundColor: disabled ? '#e5e7eb' : primaryColor,
        color: disabled ? '#9ca3af' : 'white',
        border: 'none',
      },
      secondary: {
        backgroundColor: disabled ? '#f9fafb' : 'white',
        color: disabled ? '#9ca3af' : textColor,
        border: `1px solid ${disabled ? '#e5e7eb' : secondaryBorder}`,
      },
      tertiary: {
        backgroundColor: disabled ? '#f3f4f6' : '#DAE8FF',
        color: disabled ? '#9ca3af' : textColor,
        border: 'none',
      },
      text: {
        backgroundColor: 'transparent',
        color: disabled ? '#9ca3af' : textColor,
        border: 'none',
        textDecoration: isHovered && !disabled ? 'underline' : 'none',
      },
      destructive: {
        backgroundColor: disabled ? '#f3f4f6' : '#F7E4E6',
        color: disabled ? '#9ca3af' : '#D0000A',
        border: 'none',
      },
      ghost: {
        backgroundColor: isHovered && !disabled ? '#f3f4f6' : 'transparent',
        color: disabled ? '#9ca3af' : textColor,
        border: 'none',
      },
    };
    
    return variants[variant];
  };

  const sizeStyles = {
    xs: { padding: '4px 8px', fontSize: '12px', minHeight: '28px' },
    sm: { padding: '6px 12px', fontSize: '13px', minHeight: '36px' },
    small: { padding: '6px 12px', fontSize: '13px', minHeight: '36px' },
    medium: { padding: '8px 16px', fontSize: '14px', minHeight: '44px' },
    large: { padding: '10px 20px', fontSize: '16px', minHeight: '48px' },
  };

  const variantStyle = getVariantStyles();
  const sizeStyle = sizeStyles[size as keyof typeof sizeStyles];

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        ...variantStyle,
        ...sizeStyle,
        borderRadius: '2px',
        fontWeight: 500,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'all 0.2s ease',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        transform: isPressed && !disabled ? 'translateY(1px)' : isHovered && !disabled ? 'translateY(-1px)' : 'none',
        ...style,
      }}
    >
      {loading && <span>⌛</span>}
      {!loading && icon}
      {children}
      {!loading && iconRight}
    </button>
  );
};

const DevelopmentApplicationsDashboard: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isRightNavCollapsed, setIsRightNavCollapsed] = useState(true);
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Navigation items
  const navigationItems = [
    { id: 'dashboard', iconName: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { id: 'applications', iconName: 'document-tasks', label: 'Applications', path: '/applications' },
    { id: 'projects', iconName: 'folder', label: 'Projects', path: '/projects' },
    { id: 'reports', iconName: 'chart-bar', label: 'Reports', path: '/reports' },
    { id: 'users', iconName: 'user-multiple', label: 'Users', path: '/users' },
    { id: 'settings', iconName: 'settings', label: 'Settings', path: '/settings' },
  ];

  // Right rail tools - nav-tools pattern
  const toolsMenuItems = [
    { 
      id: 'edit', 
      iconName: 'edit', 
      label: 'Edit', 
      path: '/edit',
      children: [
        { id: 'edit-text', iconName: 'text-bold', label: 'Text', path: '/edit/text' },
        { id: 'edit-style', iconName: 'paint-brush', label: 'Style', path: '/edit/style' },
        { id: 'edit-layout', iconName: 'grid', label: 'Layout', path: '/edit/layout' },
        { id: 'edit-properties', iconName: 'settings', label: 'Properties', path: '/edit/properties' },
      ]
    },
    { 
      id: 'view', 
      iconName: 'view', 
      label: 'View', 
      path: '/view',
      children: [
        { id: 'view-preview', iconName: 'screen', label: 'Preview', path: '/view/preview' },
        { id: 'view-source', iconName: 'code', label: 'Source', path: '/view/source' },
        { id: 'view-outline', iconName: 'list', label: 'Outline', path: '/view/outline' },
        { id: 'view-history', iconName: 'time', label: 'History', path: '/view/history' },
      ]
    },
    {
      id: 'share',
      iconName: 'share',
      label: 'Share',
      path: '/share',
      children: [
        { id: 'share-link', iconName: 'link', label: 'Public Link', path: '/share/link' },
        { id: 'share-team', iconName: 'user-multiple', label: 'Team Access', path: '/share/team' },
        { id: 'share-embed', iconName: 'code', label: 'Embed Code', path: '/share/embed' },
      ]
    },
    {
      id: 'export',
      iconName: 'download',
      label: 'Export',
      path: '/export',
      children: [
        { id: 'export-pdf', iconName: 'document', label: 'PDF', path: '/export/pdf' },
        { id: 'export-word', iconName: 'document', label: 'Word', path: '/export/word' },
        { id: 'export-html', iconName: 'code', label: 'HTML', path: '/export/html' },
        { id: 'export-markdown', iconName: 'document', label: 'Markdown', path: '/export/markdown' },
      ]
    },
    {
      id: 'archive',
      iconName: 'archive',
      label: 'Archive',
      path: '/archive',
      children: [
        { id: 'archive-move', iconName: 'folder', label: 'Move to Archive', path: '/archive/move' },
        { id: 'archive-download', iconName: 'download', label: 'Download Backup', path: '/archive/download' },
        { id: 'archive-delete', iconName: 'trash-can', label: 'Delete', path: '/archive/delete' },
      ]
    },
  ];

  // Define the application data interface
  interface ApplicationData extends TableRowData {
    id: string;
    name: string;
    applicant: string;
    type: string;
    status: 'Under Review' | 'Approved' | 'Pending Info' | 'Rejected';
    statusColor: string;
    submittedDate: string;
    officer: string;
    progress: number;
    [key: string]: unknown;
  }

  // Sample application data
  const applications: ApplicationData[] = [
    { 
      id: 'DA-2024-001', 
      name: 'Residential Tower Development', 
      applicant: 'Skyline Developments Ltd',
      type: 'Major Development',
      status: 'Under Review',
      statusColor: '#F59E0B',
      submittedDate: '2024-01-15',
      officer: 'Sarah Johnson',
      progress: 65
    },
    { 
      id: 'DA-2024-002', 
      name: 'Mixed Use Commercial Complex', 
      applicant: 'Urban Builders Group',
      type: 'Commercial',
      status: 'Approved',
      statusColor: '#10B981',
      submittedDate: '2024-01-10',
      officer: 'Michael Chen',
      progress: 100
    },
    { 
      id: 'DA-2024-003', 
      name: 'Heritage Building Restoration', 
      applicant: 'Heritage Restorations Inc',
      type: 'Heritage',
      status: 'Pending Info',
      statusColor: '#6B7280',
      submittedDate: '2024-01-20',
      officer: 'Emma Wilson',
      progress: 35
    },
    { 
      id: 'DA-2024-004', 
      name: 'Suburban Subdivision', 
      applicant: 'Green Valley Estates',
      type: 'Subdivision',
      status: 'Under Review',
      statusColor: '#F59E0B',
      submittedDate: '2024-01-18',
      officer: 'David Brown',
      progress: 50
    },
    { 
      id: 'DA-2024-005', 
      name: 'Industrial Warehouse Facility', 
      applicant: 'Logistics Solutions Pty',
      type: 'Industrial',
      status: 'Rejected',
      statusColor: '#EF4444',
      submittedDate: '2024-01-05',
      officer: 'Sarah Johnson',
      progress: 0
    },
  ];

  // Stats data
  const stats = [
    { label: 'Total Applications', value: '142', change: '+12%', icon: 'document-tasks', color: '#3560C1' },
    { label: 'Under Review', value: '48', change: '+5%', icon: 'time', color: '#F59E0B' },
    { label: 'Approved', value: '72', change: '+18%', icon: 'checkmark-filled', color: '#10B981' },
    { label: 'Rejected', value: '22', change: '-8%', icon: 'close', color: '#EF4444' },
  ];

  // Filter applications based on tab and search
  const filteredApplications = applications.filter(app => {
    const matchesTab = selectedTab === 'all' || 
      (selectedTab === 'review' && app.status === 'Under Review') ||
      (selectedTab === 'approved' && app.status === 'Approved') ||
      (selectedTab === 'pending' && app.status === 'Pending Info') ||
      (selectedTab === 'rejected' && app.status === 'Rejected');
    
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicant.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });
  
  console.log('Dashboard data:', {
    applications: applications.length,
    filtered: filteredApplications.length,
    stats: stats.length,
    selectedTab
  });

  // Define table columns
  const tableColumns = [
    { 
      key: 'id', 
      label: 'APPLICATION ID', 
      sortable: true, 
      width: '12%',
      render: (item: ApplicationData) => (
        <span style={{ color: '#3560C1', fontWeight: 500 }}>{item.id}</span>
      )
    },
    { 
      key: 'name', 
      label: 'PROJECT NAME', 
      sortable: true, 
      width: '20%',
      render: (item: ApplicationData) => (
        <div>
          <div style={{ fontSize: '14px', fontWeight: 500, color: '#111827' }}>{item.name}</div>
          <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
            Submitted {item.submittedDate}
          </div>
        </div>
      )
    },
    { key: 'applicant', label: 'APPLICANT', sortable: true, width: '18%' },
    { 
      key: 'type', 
      label: 'TYPE', 
      sortable: true, 
      width: '12%',
      render: (item: ApplicationData) => (
        <span style={{
          padding: '4px 8px',
          background: '#F3F4F6',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 500,
          color: '#374151'
        }}>
          {item.type}
        </span>
      )
    },
    { 
      key: 'status', 
      label: 'STATUS', 
      sortable: true, 
      width: '10%',
      render: (item: ApplicationData) => (
        <span style={{
          padding: '4px 8px',
          background: `${item.statusColor}15`,
          color: item.statusColor,
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 500
        }}>
          {item.status}
        </span>
      )
    },
    { 
      key: 'progress', 
      label: 'PROGRESS', 
      sortable: true, 
      width: '10%',
      render: (item: ApplicationData) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ 
            flex: 1, 
            height: '6px', 
            background: '#E5E7EB', 
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${item.progress}%`,
              height: '100%',
              background: item.progress === 100 ? '#10B981' : '#3560C1',
              transition: 'width 0.3s ease'
            }} />
          </div>
          <span style={{ fontSize: '12px', color: '#6B7280', minWidth: '35px' }}>
            {item.progress}%
          </span>
        </div>
      )
    },
    { key: 'officer', label: 'OFFICER', sortable: true, width: '10%' },
    {
      key: 'actions',
      label: 'ACTIONS',
      width: '8%',
      render: (item: ApplicationData) => (
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
          <Button 
            variant="ghost"
            size="xs"
            onClick={() => console.log('View', item.id)}
            style={{ padding: '6px', minHeight: 'auto' }}
          >
            <Icon name="view" size={16} />
          </Button>
          <Button 
            variant="ghost"
            size="xs"
            onClick={() => console.log('Edit', item.id)}
            style={{ padding: '6px', minHeight: 'auto' }}
          >
            <Icon name="edit" size={16} />
          </Button>
          <Button 
            variant="ghost"
            size="xs"
            onClick={() => console.log('More', item.id)}
            style={{ padding: '6px', minHeight: 'auto' }}
          >
            <Icon name="overflow-menu-vertical" size={16} />
          </Button>
        </div>
      )
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#F9FAFB' }}>
      {/* Header */}
      <Header 
        variant="build"
        userName="Andrew K"
        userRole="Planning Officer"
        onProfileClick={() => console.log('Profile clicked')}
        onNotificationClick={() => console.log('Notifications clicked')}
        notificationCount={3}
      />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Navigation */}
        <div style={{ 
          width: isNavCollapsed ? '64px' : '240px',
          transition: 'width 0.3s ease',
          borderRight: '1px solid #E5E7EB',
          background: '#FFFFFF'
        }}>
          <NavigationRail
            currentPath={currentPath}
            menuItems={navigationItems}
            collapsed={isNavCollapsed}
            onNavigate={setCurrentPath}
            showTooltips={isNavCollapsed}
            showCollapseToggle={true}
            onCollapseToggle={setIsNavCollapsed}
            showHelpIcon={true}
          />
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          {/* Page Title and Actions */}
          <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#111827', margin: 0 }}>
                Development Applications
              </h1>
              <p style={{ color: '#6B7280', marginTop: '4px' }}>
                Manage and track development applications across all stages
              </p>
            </div>
            <Button 
              variant="primary"
              icon={<Icon name="add" size={16} />}
              onClick={() => console.log('New application')}
            >
              New Application
            </Button>
          </div>

          {/* Stats Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            {stats.map((stat, index) => (
              <div key={index} style={{
                background: 'white',
                borderRadius: '8px',
                padding: '20px',
                border: '1px solid #E5E7EB',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  background: `${stat.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon name={stat.icon as any} size={24} color={stat.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: '#6B7280', fontSize: '13px', margin: 0 }}>{stat.label}</p>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: 600, margin: '4px 0', color: '#111827' }}>
                      {stat.value}
                    </h3>
                    <span style={{ 
                      fontSize: '12px', 
                      color: stat.change.startsWith('+') ? '#10B981' : '#EF4444',
                      fontWeight: 500
                    }}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters and Search */}
          <div style={{ 
            background: 'white',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            border: '1px solid #E5E7EB'
          }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {/* Tabs */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { key: 'all', label: 'All Applications', icon: 'list' },
                  { key: 'review', label: 'Under Review', icon: 'time' },
                  { key: 'approved', label: 'Approved', icon: 'checkmark-filled' },
                  { key: 'pending', label: 'Pending', icon: 'information' },
                  { key: 'rejected', label: 'Rejected', icon: 'close' },
                ].map(tab => (
                  <Button
                    key={tab.key}
                    variant={selectedTab === tab.key ? 'primary' : 'ghost'}
                    size="small"
                    selected={selectedTab === tab.key}
                    icon={<Icon name={tab.icon as any} size={16} />}
                    onClick={() => setSelectedTab(tab.key)}
                  >
                    {tab.label}
                  </Button>
                ))}
              </div>

              {/* Search */}
              <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ position: 'relative', width: '300px' }}>
                  <Icon 
                    name="search" 
                    size={20} 
                    color="#6B7280"
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                  />
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px 8px 40px',
                      border: '1px solid #E5E7EB',
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Applications Table - Using Basic Table with Core Features */}
          <div style={{
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            overflow: 'hidden'
          }}>
            <Table
              data={filteredApplications}
              columns={tableColumns}
              pageSize={5}
              paginated={true}
              selectable={true}
              striped={true}
              hoverable={true}
              title="Development Applications"
              headerActions={
                <>
                  <button 
                    style={{
                      padding: '6px',
                      color: '#6B7280',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#F3F4F6';
                      e.currentTarget.style.color = '#111827';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#6B7280';
                    }}
                    title="Download"
                  >
                    <Icon name="download" size={20} />
                  </button>
                  <button 
                    style={{
                      padding: '6px',
                      color: '#6B7280',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#F3F4F6';
                      e.currentTarget.style.color = '#111827';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#6B7280';
                    }}
                    title="Filter"
                  >
                    <Icon name="filter" size={20} />
                  </button>
                  <button 
                    style={{
                      padding: '6px',
                      color: '#6B7280',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#F3F4F6';
                      e.currentTarget.style.color = '#111827';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#6B7280';
                    }}
                    title="Settings"
                  >
                    <Icon name="settings" size={20} />
                  </button>
                </>
              }
              onRowSelect={(selected) => console.log('Selected rows:', selected)}
            />
          </div>
        </div>

        {/* Right Navigation - Tools */}
        <div style={{ 
          width: isRightNavCollapsed ? '64px' : '240px',
          transition: 'width 0.3s ease',
          borderLeft: '1px solid #E5E7EB',
          background: '#FFFFFF'
        }}>
          <NavigationRail
            currentPath=""
            menuItems={toolsMenuItems}
            collapsed={isRightNavCollapsed}
            position="right"
            onNavigate={() => {}}
            showTooltips={isRightNavCollapsed}
            showCollapseToggle={true}
            onCollapseToggle={setIsRightNavCollapsed}
          />
        </div>
      </div>
    </div>
  );
};

export default DevelopmentApplicationsDashboard;