import React, { useState } from 'react';
import ODLTheme from '../styles/ODLTheme';

// ODL Components
import Button from '../components/Button/ButtonTW';
import Input from '../components/Input/InputTW';
import Dropdown from '../components/Dropdown/Dropdown';
import AdvancedTable, { TableColumn } from '../components/AdvancedTable/AdvancedTable';
import Cards from '../components/Cards/CardsTW';
import Chip from '../components/Chip/ChipTW';
import Breadcrumb from '../components/Breadcrumb/BreadcrumbTW';
import SimpleTabs from '../components/SimpleTabs/SimpleTabs';
import Icon from '../components/Icon/Icon';
import Graph from '../components/Graph/Graph';
import AlertBanner from '../components/AlertBanner/AlertBanner';
import Accordion from '../components/Accordion/Accordion';
import NavigationRail from '../components/NavigationRail/NavigationRail';
import Header from '../components/Header/Header';
import Drawer from '../components/Drawer/Drawer';

/**
 * PURE ODL PAGE TEMPLATES
 * Templates built exclusively with ODL Design System components
 * No MUI dependencies - showcases native ODL component library
 */

// ============================================
// APP SHELL WRAPPER - Reusable layout component
// ============================================
interface AppShellWrapperProps {
  children: React.ReactNode;
  currentPage?: string;
  pageTitle?: string;
  pageSubtitle?: string;
  showBreadcrumb?: boolean;
  breadcrumbItems?: Array<{ label: string; href?: string }>;
}

export const ODLAppShellWrapper: React.FC<AppShellWrapperProps> = ({
  children,
  currentPage = '/dashboard',
  pageTitle,
  pageSubtitle,
  showBreadcrumb = true,
  breadcrumbItems,
}) => {
  const [currentPath, setCurrentPath] = useState(currentPage);
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(true);

  // Left navigation menu items - main navigation
  const leftMenuItems = [
    { id: 'dashboard', label: 'Dashboard', iconName: 'dashboard', path: '/dashboard', description: 'View your dashboard' },
    { id: 'projects', label: 'Projects', iconName: 'folder', path: '/projects', description: 'Manage projects' },
    { id: 'tasks', label: 'Tasks', iconName: 'calendar', path: '/tasks', description: 'View tasks' },
    { id: 'team', label: 'Team', iconName: 'user-multiple', path: '/team', description: 'Manage team' },
    { id: 'reports', label: 'Reports', iconName: 'chart-line', path: '/reports', description: 'View reports' },
    { id: 'settings', label: 'Settings', iconName: 'settings', path: '/settings', description: 'System settings' },
  ];

  // Right navigation menu items - contextual tools
  const rightMenuItems = [
    { id: 'notifications', label: 'Notifications', iconName: 'notification', path: '/notifications', description: 'View notifications' },
    { id: 'profile', label: 'Profile', iconName: 'user', path: '/profile', description: 'Your profile' },
    { id: 'search', label: 'Search', iconName: 'search', path: '/search', description: 'Search content' },
    { id: 'filters', label: 'Filters', iconName: 'filter', path: '/filters', description: 'Apply filters' },
  ];

  const getActiveLabel = () => {
    const item = leftMenuItems.find(m => m.path === currentPath);
    return item?.label || 'Dashboard';
  };

  const defaultBreadcrumb = [
    { label: 'Home', href: '/' },
    { label: getActiveLabel() },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: ODLTheme.colors.white
    }}>
      {/* Header - Build variant with user info */}
      <Header variant="build" userName="John Doe" />

      {/* Main Layout with Navigation Rails */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Navigation Rail */}
        <div style={{
          height: '100%',
          borderRight: `1px solid ${ODLTheme.colors.border}`
        }}>
          <NavigationRail
            menuItems={leftMenuItems}
            currentPath={currentPath}
            onNavigate={(path) => setCurrentPath(path)}
            collapsed={isLeftCollapsed}
            position="left"
            theme="light"
            showHelpIcon={true}
            showCollapseToggle={true}
            onCollapseToggle={setIsLeftCollapsed}
            showTooltips={true}
          />
        </div>

        {/* Main Content Area */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: ODLTheme.spacing[6],
          background: ODLTheme.colors.white
        }}>
          {showBreadcrumb && (
            <Breadcrumb items={breadcrumbItems || defaultBreadcrumb} />
          )}

          {pageTitle && (
            <h1 style={{
              fontSize: ODLTheme.typography.fontSize['2xl'],
              fontWeight: ODLTheme.typography.fontWeight.semibold,
              color: ODLTheme.colors.text.primary,
              margin: `${ODLTheme.spacing[4]} 0 ${ODLTheme.spacing[2]} 0`
            }}>
              {pageTitle}
            </h1>
          )}

          {pageSubtitle && (
            <p style={{
              fontSize: ODLTheme.typography.fontSize.base,
              color: ODLTheme.colors.text.secondary,
              margin: `0 0 ${ODLTheme.spacing[6]} 0`
            }}>
              {pageSubtitle}
            </p>
          )}

          {/* Grey Outer Frame / White Inner Container Pattern */}
          <div style={{
            background: '#EDF1F5',
            borderRadius: ODLTheme.borders.radius.lg,
            padding: ODLTheme.spacing[6],
            minHeight: '400px'
          }}>
            <div style={{
              background: ODLTheme.colors.white,
              borderRadius: ODLTheme.borders.radius.md,
              padding: ODLTheme.spacing[6]
            }}>
              {children}
            </div>
          </div>
        </div>

        {/* Right Navigation Rail - Contextual Tools */}
        <div style={{
          height: '100%',
          borderLeft: `1px solid ${ODLTheme.colors.border}`
        }}>
          <NavigationRail
            menuItems={rightMenuItems}
            currentPath={currentPath}
            onNavigate={(path) => setCurrentPath(path)}
            collapsed={isRightCollapsed}
            position="right"
            theme="light"
            showCollapseToggle={true}
            onCollapseToggle={setIsRightCollapsed}
            showTooltips={true}
          />
        </div>
      </div>
    </div>
  );
};

// ============================================
// DASHBOARD CONTENT (for use inside App Shell)
// ============================================
const DashboardContent: React.FC = () => {
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', trend: 'up' as const },
    { label: 'Active Projects', value: '56', change: '+5%', trend: 'up' as const },
    { label: 'Pending Tasks', value: '89', change: '-3%', trend: 'down' as const },
    { label: 'Revenue', value: '$12.5K', change: '+18%', trend: 'up' as const },
  ];

  const chartData = [
    { name: 'Jan', value: 400, target: 350 },
    { name: 'Feb', value: 300, target: 380 },
    { name: 'Mar', value: 500, target: 400 },
    { name: 'Apr', value: 450, target: 420 },
    { name: 'May', value: 600, target: 450 },
    { name: 'Jun', value: 550, target: 480 },
  ];

  const recentActivity = [
    { id: '1', title: 'New user registered', description: 'John Smith joined the platform', time: '2 min ago' },
    { id: '2', title: 'Project completed', description: 'Marketing Campaign Q1 finished', time: '1 hour ago' },
    { id: '3', title: 'Task assigned', description: 'Review design mockups', time: '3 hours ago' },
  ];

  return (
    <>
      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: ODLTheme.spacing[4],
        marginBottom: ODLTheme.spacing[6]
      }}>
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              backgroundColor: ODLTheme.colors.white,
              borderRadius: ODLTheme.borders.radius.md,
              padding: ODLTheme.spacing[4],
              boxShadow: ODLTheme.shadows.sm,
              border: `1px solid ${ODLTheme.colors.border}`,
            }}
          >
            <p style={{
              fontSize: ODLTheme.typography.fontSize.sm,
              color: ODLTheme.colors.text.secondary,
              marginBottom: ODLTheme.spacing[2]
            }}>
              {stat.label}
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: ODLTheme.spacing[3] }}>
              <span style={{
                fontSize: ODLTheme.typography.fontSize['xl'],
                fontWeight: ODLTheme.typography.fontWeight.bold,
                color: ODLTheme.colors.text.primary
              }}>
                {stat.value}
              </span>
              <Chip
                label={stat.change}
                variant={stat.trend === 'up' ? 'success' : 'error'}
                size="small"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: ODLTheme.spacing[4],
        marginBottom: ODLTheme.spacing[6]
      }}>
        <div style={{
          backgroundColor: ODLTheme.colors.white,
          borderRadius: ODLTheme.borders.radius.md,
          padding: ODLTheme.spacing[4],
          boxShadow: ODLTheme.shadows.sm,
          border: `1px solid ${ODLTheme.colors.border}`,
        }}>
          <h3 style={{
            fontSize: ODLTheme.typography.fontSize.base,
            fontWeight: ODLTheme.typography.fontWeight.semibold,
            marginBottom: ODLTheme.spacing[4]
          }}>
            Performance Overview
          </h3>
          <Graph
            type="area"
            data={chartData}
            dataKeys={['value', 'target']}
            xAxisKey="name"
            height={200}
          />
        </div>

        <div style={{
          backgroundColor: ODLTheme.colors.white,
          borderRadius: ODLTheme.borders.radius.md,
          padding: ODLTheme.spacing[4],
          boxShadow: ODLTheme.shadows.sm,
          border: `1px solid ${ODLTheme.colors.border}`,
        }}>
          <h3 style={{
            fontSize: ODLTheme.typography.fontSize.base,
            fontWeight: ODLTheme.typography.fontWeight.semibold,
            marginBottom: ODLTheme.spacing[4]
          }}>
            Monthly Comparison
          </h3>
          <Graph
            type="bar"
            data={chartData}
            dataKeys={['value']}
            xAxisKey="name"
            height={200}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        backgroundColor: ODLTheme.colors.white,
        borderRadius: ODLTheme.borders.radius.md,
        padding: ODLTheme.spacing[4],
        boxShadow: ODLTheme.shadows.sm,
        border: `1px solid ${ODLTheme.colors.border}`,
      }}>
        <h3 style={{
          fontSize: ODLTheme.typography.fontSize.base,
          fontWeight: ODLTheme.typography.fontWeight.semibold,
          marginBottom: ODLTheme.spacing[4]
        }}>
          Recent Activity
        </h3>
        <Cards
          items={recentActivity.map(item => ({
            id: item.id,
            title: item.title,
            subtitle: item.description,
            metadata: item.time,
          }))}
          layout="list"
          onCardClick={(item) => console.log('Activity clicked:', item)}
        />
      </div>
    </>
  );
};

// ============================================
// DASHBOARD TEMPLATE (Wrapped in App Shell)
// ============================================
export const ODLDashboardTemplate: React.FC = () => {
  return (
    <ODLAppShellWrapper
      currentPage="/dashboard"
      pageTitle="Dashboard"
      pageSubtitle="Welcome back! Here's what's happening with your projects."
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: 'Dashboard' },
      ]}
    >
      <DashboardContent />
    </ODLAppShellWrapper>
  );
};

// ============================================
// STANDALONE DASHBOARD (without App Shell - for backwards compatibility)
// ============================================
export const ODLDashboardStandalone: React.FC = () => {
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', trend: 'up' as const },
    { label: 'Active Projects', value: '56', change: '+5%', trend: 'up' as const },
    { label: 'Pending Tasks', value: '89', change: '-3%', trend: 'down' as const },
    { label: 'Revenue', value: '$12.5K', change: '+18%', trend: 'up' as const },
  ];

  const chartData = [
    { name: 'Jan', value: 400, target: 350 },
    { name: 'Feb', value: 300, target: 380 },
    { name: 'Mar', value: 500, target: 400 },
    { name: 'Apr', value: 450, target: 420 },
    { name: 'May', value: 600, target: 450 },
    { name: 'Jun', value: 550, target: 480 },
  ];

  const recentActivity = [
    { id: '1', title: 'New user registered', description: 'John Smith joined the platform', time: '2 min ago' },
    { id: '2', title: 'Project completed', description: 'Marketing Campaign Q1 finished', time: '1 hour ago' },
    { id: '3', title: 'Task assigned', description: 'Review design mockups', time: '3 hours ago' },
  ];

  return (
    <div style={{ padding: ODLTheme.spacing[6], backgroundColor: ODLTheme.colors.wave, minHeight: '100vh' }}>
      {/* Header Section */}
      <div style={{ marginBottom: ODLTheme.spacing[6] }}>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Dashboard' },
          ]}
        />
        <h1 style={{
          fontSize: ODLTheme.typography.fontSize['2xl'],
          fontWeight: ODLTheme.typography.fontWeight.semibold,
          color: ODLTheme.colors.text.primary,
          marginTop: ODLTheme.spacing[4],
          marginBottom: ODLTheme.spacing[2]
        }}>
          Dashboard
        </h1>
        <p style={{ color: ODLTheme.colors.text.secondary, fontSize: ODLTheme.typography.fontSize.base }}>
          Welcome back! Here's what's happening with your projects.
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: ODLTheme.spacing[4],
        marginBottom: ODLTheme.spacing[6]
      }}>
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              backgroundColor: ODLTheme.colors.white,
              borderRadius: ODLTheme.borders.radius.md,
              padding: ODLTheme.spacing[5],
              boxShadow: ODLTheme.shadows.base,
              border: `1px solid ${ODLTheme.colors.border}`,
              transition: ODLTheme.transitions.base,
            }}
          >
            <p style={{
              fontSize: ODLTheme.typography.fontSize.sm,
              color: ODLTheme.colors.text.secondary,
              marginBottom: ODLTheme.spacing[2]
            }}>
              {stat.label}
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: ODLTheme.spacing[3] }}>
              <span style={{
                fontSize: ODLTheme.typography.fontSize['2xl'],
                fontWeight: ODLTheme.typography.fontWeight.bold,
                color: ODLTheme.colors.text.primary
              }}>
                {stat.value}
              </span>
              <Chip
                label={stat.change}
                variant={stat.trend === 'up' ? 'success' : 'error'}
                size="small"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: ODLTheme.spacing[4],
        marginBottom: ODLTheme.spacing[6]
      }}>
        <div style={{
          backgroundColor: ODLTheme.colors.white,
          borderRadius: ODLTheme.borders.radius.md,
          padding: ODLTheme.spacing[5],
          boxShadow: ODLTheme.shadows.base,
          border: `1px solid ${ODLTheme.colors.border}`,
        }}>
          <h3 style={{
            fontSize: ODLTheme.typography.fontSize.lg,
            fontWeight: ODLTheme.typography.fontWeight.semibold,
            marginBottom: ODLTheme.spacing[4]
          }}>
            Performance Overview
          </h3>
          <Graph
            type="area"
            data={chartData}
            dataKeys={['value', 'target']}
            xAxisKey="name"
            height={250}
          />
        </div>

        <div style={{
          backgroundColor: ODLTheme.colors.white,
          borderRadius: ODLTheme.borders.radius.md,
          padding: ODLTheme.spacing[5],
          boxShadow: ODLTheme.shadows.base,
          border: `1px solid ${ODLTheme.colors.border}`,
        }}>
          <h3 style={{
            fontSize: ODLTheme.typography.fontSize.lg,
            fontWeight: ODLTheme.typography.fontWeight.semibold,
            marginBottom: ODLTheme.spacing[4]
          }}>
            Monthly Comparison
          </h3>
          <Graph
            type="bar"
            data={chartData}
            dataKeys={['value']}
            xAxisKey="name"
            height={250}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        backgroundColor: ODLTheme.colors.white,
        borderRadius: ODLTheme.borders.radius.md,
        padding: ODLTheme.spacing[5],
        boxShadow: ODLTheme.shadows.base,
        border: `1px solid ${ODLTheme.colors.border}`,
      }}>
        <h3 style={{
          fontSize: ODLTheme.typography.fontSize.lg,
          fontWeight: ODLTheme.typography.fontWeight.semibold,
          marginBottom: ODLTheme.spacing[4]
        }}>
          Recent Activity
        </h3>
        <Cards
          items={recentActivity.map(item => ({
            id: item.id,
            title: item.title,
            subtitle: item.description,
            metadata: item.time,
          }))}
          layout="list"
          onCardClick={(item) => console.log('Activity clicked:', item)}
        />
      </div>
    </div>
  );
};

// ============================================
// TABLE LIST TEMPLATE
// ============================================
interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: 'active' | 'pending' | 'inactive';
  joinDate: string;
}

const TableContent: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<Employee[]>([]);

  const employeeData: Employee[] = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', department: 'Engineering', role: 'Senior Developer', status: 'active', joinDate: '2023-01-15' },
    { id: '2', name: 'Michael Chen', email: 'michael@example.com', department: 'Design', role: 'UI/UX Designer', status: 'active', joinDate: '2023-03-22' },
    { id: '3', name: 'Emily Rodriguez', email: 'emily@example.com', department: 'Marketing', role: 'Marketing Manager', status: 'pending', joinDate: '2024-01-08' },
    { id: '4', name: 'David Kim', email: 'david@example.com', department: 'Engineering', role: 'Developer', status: 'active', joinDate: '2023-06-10' },
    { id: '5', name: 'Lisa Thompson', email: 'lisa@example.com', department: 'HR', role: 'HR Specialist', status: 'inactive', joinDate: '2022-11-20' },
    { id: '6', name: 'James Wilson', email: 'james@example.com', department: 'Sales', role: 'Sales Rep', status: 'active', joinDate: '2023-09-05' },
    { id: '7', name: 'Anna Martinez', email: 'anna@example.com', department: 'Engineering', role: 'Tech Lead', status: 'active', joinDate: '2022-04-18' },
    { id: '8', name: 'Robert Brown', email: 'robert@example.com', department: 'Finance', role: 'Accountant', status: 'pending', joinDate: '2024-02-01' },
  ];

  const columns: TableColumn<Employee>[] = [
    {
      key: 'name',
      label: 'Employee',
      sortable: true,
      render: (item) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[3] }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: ODLTheme.colors.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: ODLTheme.colors.white,
            fontSize: ODLTheme.typography.fontSize.sm,
            fontWeight: ODLTheme.typography.fontWeight.medium
          }}>
            {item.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div style={{ fontWeight: ODLTheme.typography.fontWeight.medium }}>{item.name}</div>
            <div style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.secondary }}>{item.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'department',
      label: 'Department',
      sortable: true,
      render: (item) => <Chip label={item.department} variant="info" size="small" />
    },
    { key: 'role', label: 'Role', sortable: true },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (item) => (
        <Chip
          label={item.status}
          variant={item.status === 'active' ? 'success' : item.status === 'pending' ? 'warning' : 'error'}
          size="small"
        />
      )
    },
    { key: 'joinDate', label: 'Join Date', sortable: true },
  ];

  return (
    <>
      {/* Header with Action Button */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: ODLTheme.spacing[4]
      }}>
        <div />
        <Button variant="primary" size="md" leftIcon="add">
          Add Employee
        </Button>
      </div>

      {/* Alert Banner */}
      {selectedRows.length > 0 && (
        <div style={{ marginBottom: ODLTheme.spacing[4] }}>
          <AlertBanner
            type="info"
            message={`${selectedRows.length} employee(s) selected`}
            dismissible
          />
        </div>
      )}

      {/* Table */}
      <div style={{
        backgroundColor: ODLTheme.colors.white,
        borderRadius: ODLTheme.borders.radius.md,
        boxShadow: ODLTheme.shadows.sm,
        border: `1px solid ${ODLTheme.colors.border}`,
        overflow: 'hidden'
      }}>
        <AdvancedTable
          data={employeeData}
          columns={columns}
          selectable
          onRowSelect={setSelectedRows}
          paginated
          itemsPerPage={5}
          showSearch
          showExport
          showColumnToggle
          getRowKey={(item) => item.id}
        />
      </div>
    </>
  );
};

export const ODLTablePageTemplate: React.FC = () => {
  return (
    <ODLAppShellWrapper
      currentPage="/team"
      pageTitle="Employee Directory"
      pageSubtitle="Manage your team members and their permissions"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: 'Team', href: '/team' },
        { label: 'Employees' },
      ]}
    >
      <TableContent />
    </ODLAppShellWrapper>
  );
};

// ============================================
// FORM PAGE TEMPLATE
// ============================================
const FormContent: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    role: '',
    bio: ''
  });

  const departmentOptions = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
  ];

  return (
    <>
      {/* Personal Information Section */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h2 style={{
          fontSize: ODLTheme.typography.fontSize.lg,
          fontWeight: ODLTheme.typography.fontWeight.semibold,
          color: ODLTheme.colors.primary,
          marginBottom: ODLTheme.spacing[4],
          paddingBottom: ODLTheme.spacing[2],
          borderBottom: `2px solid ${ODLTheme.colors.primaryLight}`
        }}>
          Personal Information
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: ODLTheme.spacing[4]
        }}>
          <Input
            label="First Name"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={(val) => setFormData({ ...formData, firstName: val })}
            required
          />
          <Input
            label="Last Name"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={(val) => setFormData({ ...formData, lastName: val })}
            required
          />
        </div>

        <div style={{ marginTop: ODLTheme.spacing[4] }}>
          <Input
            label="Email Address"
            type="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={(val) => setFormData({ ...formData, email: val })}
            required
          />
        </div>
      </div>

      {/* Organization Section */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h2 style={{
          fontSize: ODLTheme.typography.fontSize.lg,
          fontWeight: ODLTheme.typography.fontWeight.semibold,
          color: ODLTheme.colors.primary,
          marginBottom: ODLTheme.spacing[4],
          paddingBottom: ODLTheme.spacing[2],
          borderBottom: `2px solid ${ODLTheme.colors.primaryLight}`
        }}>
          Organization Details
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: ODLTheme.spacing[4]
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: ODLTheme.typography.fontSize.sm,
              fontWeight: ODLTheme.typography.fontWeight.medium,
              marginBottom: ODLTheme.spacing[2],
              color: ODLTheme.colors.text.primary
            }}>
              Department
            </label>
            <Dropdown
              options={departmentOptions}
              value={formData.department}
              onChange={(val) => setFormData({ ...formData, department: val })}
              placeholder="Select department"
            />
          </div>
          <Input
            label="Role / Title"
            placeholder="e.g. Senior Developer"
            value={formData.role}
            onChange={(val) => setFormData({ ...formData, role: val })}
          />
        </div>

        <div style={{ marginTop: ODLTheme.spacing[4] }}>
          <Input
            label="Bio"
            type="textarea"
            placeholder="Brief description about the employee..."
            value={formData.bio}
            onChange={(val) => setFormData({ ...formData, bio: val })}
            rows={4}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: ODLTheme.spacing[3],
        paddingTop: ODLTheme.spacing[4],
        borderTop: `1px solid ${ODLTheme.colors.border}`
      }}>
        <Button variant="secondary" size="md">
          Cancel
        </Button>
        <Button variant="primary" size="md">
          Save Employee
        </Button>
      </div>
    </>
  );
};

export const ODLFormPageTemplate: React.FC = () => {
  return (
    <ODLAppShellWrapper
      currentPage="/team"
      pageTitle="Add New Employee"
      pageSubtitle="Fill out the form below to add a new team member"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: 'Team', href: '/team' },
        { label: 'Add Employee' },
      ]}
    >
      <FormContent />
    </ODLAppShellWrapper>
  );
};

// ============================================
// DETAIL PAGE TEMPLATE
// ============================================
const DetailContent: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const project = {
    name: 'Website Redesign',
    status: 'In Progress',
    progress: 65,
    dueDate: '2024-03-15',
    team: ['Sarah J.', 'Michael C.', 'Emily R.'],
    description: 'Complete redesign of the company website with modern UI/UX principles and improved performance.',
  };

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div style={{ padding: ODLTheme.spacing[4] }}>
          <h3 style={{ fontSize: ODLTheme.typography.fontSize.lg, marginBottom: ODLTheme.spacing[3] }}>Project Overview</h3>
          <p style={{ color: ODLTheme.colors.text.secondary, lineHeight: 1.6 }}>{project.description}</p>

          <div style={{ marginTop: ODLTheme.spacing[6] }}>
            <h4 style={{ marginBottom: ODLTheme.spacing[3] }}>Progress</h4>
            <div style={{
              height: '8px',
              backgroundColor: ODLTheme.colors.surface,
              borderRadius: ODLTheme.borders.radius.full,
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${project.progress}%`,
                height: '100%',
                backgroundColor: ODLTheme.colors.primary,
                borderRadius: ODLTheme.borders.radius.full
              }} />
            </div>
            <span style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.secondary }}>
              {project.progress}% Complete
            </span>
          </div>
        </div>
      )
    },
    {
      id: 'tasks',
      label: 'Tasks',
      badge: '12',
      content: (
        <div style={{ padding: ODLTheme.spacing[4] }}>
          <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>Active Tasks</h3>
          <Accordion
            items={[
              { title: 'Design homepage mockups', content: 'Create wireframes and high-fidelity mockups for the new homepage layout.' },
              { title: 'Implement responsive navigation', content: 'Build mobile-first responsive navigation component.' },
              { title: 'Setup CI/CD pipeline', content: 'Configure automated testing and deployment workflows.' },
            ]}
          />
        </div>
      )
    },
    {
      id: 'team',
      label: 'Team',
      badge: String(project.team.length),
      content: (
        <div style={{ padding: ODLTheme.spacing[4] }}>
          <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>Team Members</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: ODLTheme.spacing[3] }}>
            {project.team.map((member, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: ODLTheme.spacing[3],
                padding: ODLTheme.spacing[3],
                backgroundColor: ODLTheme.colors.surface,
                borderRadius: ODLTheme.borders.radius.md
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: ODLTheme.colors.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: ODLTheme.colors.white,
                  fontWeight: ODLTheme.typography.fontWeight.medium
                }}>
                  {member.split(' ').map(n => n[0]).join('')}
                </div>
                <span style={{ fontWeight: ODLTheme.typography.fontWeight.medium }}>{member}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
  ];

  return (
    <>
      {/* Header with Status and Actions */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: ODLTheme.spacing[4]
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[3] }}>
          <Chip label={project.status} variant="info" size="small" />
          <span style={{ color: ODLTheme.colors.text.secondary, fontSize: ODLTheme.typography.fontSize.sm }}>
            Due: {project.dueDate}
          </span>
        </div>
        <div style={{ display: 'flex', gap: ODLTheme.spacing[2] }}>
          <Button variant="ghost" size="sm" leftIcon="settings" onClick={() => setIsDrawerOpen(true)}>
            Settings
          </Button>
          <Button variant="secondary" size="sm" leftIcon="edit">
            Edit
          </Button>
          <Button variant="primary" size="sm" leftIcon="checkmark">
            Mark Complete
          </Button>
        </div>
      </div>

      {/* Tabs Content */}
      <div style={{
        backgroundColor: ODLTheme.colors.white,
        borderRadius: ODLTheme.borders.radius.md,
        boxShadow: ODLTheme.shadows.sm,
        border: `1px solid ${ODLTheme.colors.border}`,
        overflow: 'hidden'
      }}>
        <SimpleTabs tabs={tabs} />
      </div>

      {/* Settings Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Project Settings"
        position="right"
        width="400px"
        footer={
          <div style={{ display: 'flex', gap: ODLTheme.spacing[2], justifyContent: 'flex-end' }}>
            <Button variant="secondary" size="sm" onClick={() => setIsDrawerOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsDrawerOpen(false)}>
              Save Changes
            </Button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: ODLTheme.spacing[4] }}>
          <Input
            label="Project Name"
            value={project.name}
            onChange={() => {}}
            placeholder="Enter project name"
            fullWidth
          />

          <Dropdown
            label="Status"
            options={[
              { value: 'planning', label: 'Planning' },
              { value: 'in-progress', label: 'In Progress' },
              { value: 'review', label: 'Review' },
              { value: 'completed', label: 'Completed' },
            ]}
            value="in-progress"
            onChange={() => {}}
            placeholder="Select status"
          />

          <Input
            label="Due Date"
            type="date"
            value={project.dueDate}
            onChange={() => {}}
            fullWidth
          />

          <Input
            label="Description"
            type="textarea"
            value={project.description}
            onChange={() => {}}
            rows={4}
            placeholder="Project description..."
            fullWidth
          />
        </div>
      </Drawer>
    </>
  );
};

export const ODLDetailPageTemplate: React.FC = () => {
  return (
    <ODLAppShellWrapper
      currentPage="/projects"
      pageTitle="Website Redesign"
      pageSubtitle="Complete redesign of the company website with modern UI/UX principles"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: 'Website Redesign' },
      ]}
    >
      <DetailContent />
    </ODLAppShellWrapper>
  );
};

// ============================================
// CARDS GRID TEMPLATE
// ============================================
const CardsGridContent: React.FC = () => {
  const projects = [
    { id: '1', title: 'Project Alpha', description: 'Development project for new features', status: 'In Progress', category: 'Development' },
    { id: '2', title: 'Marketing Campaign', description: 'Q1 2024 marketing initiatives', status: 'Planning', category: 'Marketing' },
    { id: '3', title: 'User Research', description: 'Customer feedback analysis', status: 'Completed', category: 'Research' },
    { id: '4', title: 'Bug Fixes', description: 'Priority bug resolution sprint', status: 'In Progress', category: 'Development' },
    { id: '5', title: 'Design System', description: 'Component library updates', status: 'Review', category: 'Design' },
    { id: '6', title: 'Documentation', description: 'Technical docs update', status: 'Planning', category: 'Documentation' },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'info';
      case 'Planning': return 'warning';
      case 'Review': return 'default';
      default: return 'default';
    }
  };

  return (
    <>
      {/* Header with Action Button */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: ODLTheme.spacing[4]
      }}>
        <Button variant="primary" size="md" leftIcon="add">
          New Project
        </Button>
      </div>

      {/* Filter Bar */}
      <div style={{
        display: 'flex',
        gap: ODLTheme.spacing[3],
        marginBottom: ODLTheme.spacing[4]
      }}>
        <Chip label="All" variant="default" size="small" />
        <Chip label="Development" variant="info" size="small" />
        <Chip label="Design" variant="info" size="small" />
        <Chip label="Marketing" variant="info" size="small" />
      </div>

      {/* Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: ODLTheme.spacing[4]
      }}>
        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              backgroundColor: ODLTheme.colors.white,
              borderRadius: ODLTheme.borders.radius.md,
              padding: ODLTheme.spacing[5],
              boxShadow: ODLTheme.shadows.sm,
              border: `1px solid ${ODLTheme.colors.border}`,
              borderTop: `4px solid ${ODLTheme.colors.primary}`,
              cursor: 'pointer',
              transition: ODLTheme.transitions.base,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: ODLTheme.spacing[3] }}>
              <h3 style={{
                fontSize: ODLTheme.typography.fontSize.base,
                fontWeight: ODLTheme.typography.fontWeight.semibold,
                color: ODLTheme.colors.text.primary
              }}>
                {project.title}
              </h3>
              <Chip label={project.status} variant={getStatusVariant(project.status) as any} size="small" />
            </div>
            <p style={{
              color: ODLTheme.colors.text.secondary,
              fontSize: ODLTheme.typography.fontSize.sm,
              marginBottom: ODLTheme.spacing[4]
            }}>
              {project.description}
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: ODLTheme.spacing[3],
              borderTop: `1px solid ${ODLTheme.colors.border}`
            }}>
              <Chip label={project.category} variant="default" size="small" />
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export const ODLCardsGridTemplate: React.FC = () => {
  return (
    <ODLAppShellWrapper
      currentPage="/projects"
      pageTitle="Projects"
      pageSubtitle="6 projects total"
      breadcrumbItems={[
        { label: 'Home', href: '/' },
        { label: 'Projects' },
      ]}
    >
      <CardsGridContent />
    </ODLAppShellWrapper>
  );
};

// ============================================
// APP SHELL TEMPLATE (with Navigation Rails)
// ============================================
export const ODLAppShellTemplate: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(true);

  // Left navigation menu items - main navigation
  const leftMenuItems = [
    { id: 'dashboard', label: 'Dashboard', iconName: 'dashboard', path: '/dashboard', description: 'View your dashboard' },
    { id: 'projects', label: 'Projects', iconName: 'folder', path: '/projects', description: 'Manage projects' },
    { id: 'tasks', label: 'Tasks', iconName: 'calendar', path: '/tasks', description: 'View tasks' },
    { id: 'team', label: 'Team', iconName: 'user-multiple', path: '/team', description: 'Manage team' },
    { id: 'reports', label: 'Reports', iconName: 'chart-line', path: '/reports', description: 'View reports' },
    { id: 'settings', label: 'Settings', iconName: 'settings', path: '/settings', description: 'System settings' },
  ];

  // Right navigation menu items - contextual tools
  const rightMenuItems = [
    { id: 'notifications', label: 'Notifications', iconName: 'notification', path: '/notifications', description: 'View notifications' },
    { id: 'profile', label: 'Profile', iconName: 'user', path: '/profile', description: 'Your profile' },
    { id: 'search', label: 'Search', iconName: 'search', path: '/search', description: 'Search content' },
    { id: 'filters', label: 'Filters', iconName: 'filter', path: '/filters', description: 'Apply filters' },
  ];

  const getActiveLabel = () => {
    const item = leftMenuItems.find(m => m.path === currentPath);
    return item?.label || 'Dashboard';
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: ODLTheme.colors.white
    }}>
      {/* Header - Build variant with user info */}
      <Header variant="build" userName="John Doe" />

      {/* Main Layout with Navigation Rails */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Navigation Rail */}
        <div style={{
          height: '100%',
          borderRight: `1px solid ${ODLTheme.colors.border}`
        }}>
          <NavigationRail
            menuItems={leftMenuItems}
            currentPath={currentPath}
            onNavigate={(path) => setCurrentPath(path)}
            collapsed={isLeftCollapsed}
            position="left"
            theme="light"
            showHelpIcon={true}
            showCollapseToggle={true}
            onCollapseToggle={setIsLeftCollapsed}
            showTooltips={true}
          />
        </div>

        {/* Main Content Area with Content Border Pattern */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: ODLTheme.spacing[6],
          background: ODLTheme.colors.white
        }}>
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: getActiveLabel() },
            ]}
          />
          <h1 style={{
            fontSize: ODLTheme.typography.fontSize['2xl'],
            fontWeight: ODLTheme.typography.fontWeight.semibold,
            color: ODLTheme.colors.text.primary,
            margin: `${ODLTheme.spacing[4]} 0 ${ODLTheme.spacing[2]} 0`
          }}>
            {getActiveLabel()}
          </h1>
          <p style={{
            fontSize: ODLTheme.typography.fontSize.base,
            color: ODLTheme.colors.text.secondary,
            margin: `0 0 ${ODLTheme.spacing[6]} 0`
          }}>
            Page subtitle or description goes here
          </p>

          {/* Grey Outer Frame / White Inner Container Pattern */}
          <div style={{
            background: '#EDF1F5',
            borderRadius: ODLTheme.borders.radius.lg,
            padding: ODLTheme.spacing[6],
            minHeight: '400px'
          }}>
            <div style={{
              background: ODLTheme.colors.white,
              borderRadius: ODLTheme.borders.radius.md,
              padding: ODLTheme.spacing[6]
            }}>
              {/* Sample Dashboard Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: ODLTheme.spacing[6],
                marginBottom: ODLTheme.spacing[6]
              }}>
                {/* Card 1 - Recent Activity */}
                <div style={{
                  background: ODLTheme.colors.white,
                  border: `1px solid ${ODLTheme.colors.border}`,
                  borderRadius: ODLTheme.borders.radius.lg,
                  padding: ODLTheme.spacing[6],
                  boxShadow: ODLTheme.shadows.sm,
                  minHeight: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: ODLTheme.spacing[3] }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: ODLTheme.colors.primaryLight,
                        borderRadius: ODLTheme.borders.radius.md,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: ODLTheme.spacing[3]
                      }}>
                        <Icon name="notification" size={20} style={{ color: ODLTheme.colors.primary }} />
                      </div>
                      <div>
                        <h3 style={{
                          fontSize: ODLTheme.typography.fontSize.lg,
                          fontWeight: ODLTheme.typography.fontWeight.semibold,
                          color: ODLTheme.colors.text.primary,
                          margin: 0
                        }}>
                          Recent Activity
                        </h3>
                        <div style={{ marginTop: ODLTheme.spacing[1] }}>
                          <Chip label="New" variant="success" size="small" />
                        </div>
                      </div>
                    </div>
                    <p style={{
                      fontSize: ODLTheme.typography.fontSize.base,
                      color: ODLTheme.colors.text.secondary,
                      margin: 0
                    }}>
                      Stay updated with your latest activities and notifications
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: ODLTheme.spacing[4],
                    paddingTop: ODLTheme.spacing[4],
                    borderTop: `1px solid ${ODLTheme.colors.surface}`
                  }}>
                    <span style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.tertiary }}>
                      3 new items
                    </span>
                    <Icon name="arrow-right" size={16} style={{ color: ODLTheme.colors.primary }} />
                  </div>
                </div>

                {/* Card 2 - Quick Actions */}
                <div style={{
                  background: ODLTheme.colors.white,
                  border: `1px solid ${ODLTheme.colors.border}`,
                  borderRadius: ODLTheme.borders.radius.lg,
                  padding: ODLTheme.spacing[6],
                  boxShadow: ODLTheme.shadows.sm,
                  minHeight: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: ODLTheme.spacing[3] }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: ODLTheme.colors.infoLight,
                        borderRadius: ODLTheme.borders.radius.md,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: ODLTheme.spacing[3]
                      }}>
                        <Icon name="lightning" size={20} style={{ color: ODLTheme.colors.info }} />
                      </div>
                      <div>
                        <h3 style={{
                          fontSize: ODLTheme.typography.fontSize.lg,
                          fontWeight: ODLTheme.typography.fontWeight.semibold,
                          color: ODLTheme.colors.text.primary,
                          margin: 0
                        }}>
                          Quick Actions
                        </h3>
                        <div style={{ marginTop: ODLTheme.spacing[1] }}>
                          <Chip label="Tools" variant="info" size="small" />
                        </div>
                      </div>
                    </div>
                    <p style={{
                      fontSize: ODLTheme.typography.fontSize.base,
                      color: ODLTheme.colors.text.secondary,
                      margin: 0
                    }}>
                      Access frequently used tools and shortcuts
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: ODLTheme.spacing[4],
                    paddingTop: ODLTheme.spacing[4],
                    borderTop: `1px solid ${ODLTheme.colors.surface}`
                  }}>
                    <span style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.tertiary }}>
                      5 shortcuts
                    </span>
                    <Icon name="arrow-right" size={16} style={{ color: ODLTheme.colors.primary }} />
                  </div>
                </div>
              </div>

              <p style={{ color: ODLTheme.colors.text.secondary, textAlign: 'center' }}>
                Content for "{getActiveLabel()}" - Use this template as a starting point for your application.
              </p>
            </div>
          </div>
        </div>

        {/* Right Navigation Rail - Contextual Tools */}
        <div style={{
          height: '100%',
          borderLeft: `1px solid ${ODLTheme.colors.border}`
        }}>
          <NavigationRail
            menuItems={rightMenuItems}
            currentPath={currentPath}
            onNavigate={(path) => setCurrentPath(path)}
            collapsed={isRightCollapsed}
            position="right"
            theme="light"
            showCollapseToggle={true}
            onCollapseToggle={setIsRightCollapsed}
            showTooltips={true}
          />
        </div>
      </div>
    </div>
  );
};

// Export all templates
export default {
  ODLDashboardTemplate,
  ODLTablePageTemplate,
  ODLFormPageTemplate,
  ODLDetailPageTemplate,
  ODLCardsGridTemplate,
  ODLAppShellTemplate,
};
