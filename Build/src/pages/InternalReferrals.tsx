import React, { useState, useMemo } from 'react';
import ODLTheme from '../styles/ODLTheme';
import Icon from '../components/Icon/Icon';
import Button from '../components/Button/Button';
import Chip from '../components/Chip/Chip';
import Table from '../components/Table/Table';
import Input from '../components/Input/Input';
import Modal from '../components/Modal/Modal';
import Dropdown from '../components/Dropdown/Dropdown';
import Drawer from '../components/Drawer/Drawer';
import AlertBanner from '../components/AlertBanner/AlertBanner';
import InlineMetricCard from '../components/InlineMetricCard/InlineMetricCard';

interface Referral {
  id: string;
  applicationId: string;
  applicationTitle: string;
  department: string;
  referredTo: string;
  referredDate: string;
  dueDate: string;
  status: 'pending' | 'reviewing' | 'responded' | 'overdue' | 'withdrawn';
  priority: 'urgent' | 'high' | 'normal';
  daysRemaining: number;
  responseDate?: string;
  responseType?: 'approved' | 'conditional' | 'concerns' | 'objection';
  comments?: string;
}

const InternalReferrals: React.FC = () => {
  const [selectedReferrals, setSelectedReferrals] = useState<Set<string>>(new Set());
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewReferralModal, setShowNewReferralModal] = useState(false);
  const [showBulkActionsMenu, setShowBulkActionsMenu] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'quarter'>('week');
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [notification, setNotification] = useState<{ show: boolean; message: string; type: 'success' | 'info' | 'warning' | 'error' }>({ show: false, message: '', type: 'success' });

  // Sample data
  const referrals: Referral[] = [
    {
      id: 'REF-2024-001',
      applicationId: 'DA/2024/0892',
      applicationTitle: 'Mixed Use Development - 45 Harbor Street',
      department: 'Traffic & Transport',
      referredTo: 'Sarah Chen',
      referredDate: '2024-03-15',
      dueDate: '2024-03-29',
      status: 'pending',
      priority: 'urgent',
      daysRemaining: 2,
    },
    {
      id: 'REF-2024-002',
      applicationId: 'DA/2024/0875',
      applicationTitle: 'Heritage Restoration - 122 Main Street',
      department: 'Heritage',
      referredTo: 'Michael Roberts',
      referredDate: '2024-03-14',
      dueDate: '2024-03-28',
      status: 'reviewing',
      priority: 'high',
      daysRemaining: 1,
    },
    {
      id: 'REF-2024-003',
      applicationId: 'DA/2024/0850',
      applicationTitle: 'Residential Subdivision - Greenfield Estate',
      department: 'Environmental Services',
      referredTo: 'Emma Wilson',
      referredDate: '2024-03-10',
      dueDate: '2024-03-24',
      status: 'responded',
      priority: 'normal',
      daysRemaining: -3,
      responseDate: '2024-03-22',
      responseType: 'conditional',
      comments: 'Approved subject to stormwater management conditions',
    },
    {
      id: 'REF-2024-004',
      applicationId: 'DA/2024/0903',
      applicationTitle: 'Commercial Renovation - Bay Street Plaza',
      department: 'Building Services',
      referredTo: 'James Thompson',
      referredDate: '2024-03-12',
      dueDate: '2024-03-26',
      status: 'overdue',
      priority: 'high',
      daysRemaining: -1,
    },
    {
      id: 'REF-2024-005',
      applicationId: 'DA/2024/0815',
      applicationTitle: 'Public Park Upgrade - Memorial Gardens',
      department: 'Parks & Recreation',
      referredTo: 'Lisa Anderson',
      referredDate: '2024-03-13',
      dueDate: '2024-03-27',
      status: 'responded',
      priority: 'normal',
      daysRemaining: 0,
      responseDate: '2024-03-25',
      responseType: 'approved',
      comments: 'Fully supported with minor landscaping suggestions',
    },
  ];


  // Quick stats with comparisons
  const stats = useMemo(() => {
    const total = referrals.length;
    const pending = referrals.filter(r => r.status === 'pending').length;
    const overdue = referrals.filter(r => r.status === 'overdue').length;
    const todayDue = referrals.filter(r => r.daysRemaining === 0).length;
    const responded = referrals.filter(r => r.status === 'responded').length;
    const reviewing = referrals.filter(r => r.status === 'reviewing').length;
    const avgResponseTime = 8.2; // days
    
    // Calculate trends (simulated for demo)
    const weeklyChange = {
      total: Math.round(total * 0.08), // +8%
      pending: pending > 0 ? 3 : 0, // 3 new today
      overdue: overdue > 0 ? -2 : 0, // -2 from yesterday
      responded: Math.round(responded * 0.15), // +15%
      responseTime: -0.5 // improvement
    };

    return { 
      total, 
      pending, 
      overdue, 
      todayDue, 
      responded, 
      reviewing,
      avgResponseTime,
      weeklyChange 
    };
  }, []);

  // Send reminder function
  const handleSendReminder = (referral: Referral) => {
    // Simulate sending reminder
    setNotification({
      show: true,
      message: `Reminder sent to ${referral.referredTo} for ${referral.applicationId}`,
      type: 'success'
    });

    // Auto-hide notification after 4 seconds
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  // Filtered referrals
  const filteredReferrals = useMemo(() => {
    return referrals.filter(referral => {
      const matchesStatus = filterStatus === 'all' || referral.status === filterStatus;
      const matchesDepartment = filterDepartment === 'all' || referral.department === filterDepartment;
      const matchesSearch = searchQuery === '' || 
        referral.applicationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        referral.applicationTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        referral.department.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesStatus && matchesDepartment && matchesSearch;
    });
  }, [filterStatus, filterDepartment, searchQuery]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'responded': return 'success';
      case 'reviewing': return 'info';
      case 'pending': return 'default';
      case 'overdue': return 'error';
      case 'withdrawn': return 'grey';
      default: return 'grey';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'urgent': return 'error';
      case 'high': return 'warning';
      case 'normal': return 'info';
      default: return 'grey';
    }
  };

  const tableColumns = [
    {
      key: 'applicationId',
      label: 'Application',
      sortable: true,
      render: (row: Referral) => (
        <div 
          onClick={() => {
            setSelectedReferral(row);
            setShowDetailsDrawer(true);
          }}
          style={{ cursor: 'pointer' }}
        >
          <div style={{ 
            fontWeight: ODLTheme.typography.fontWeight.semibold,
            color: ODLTheme.colors.primary,
            fontSize: ODLTheme.typography.fontSize.base
          }}>
            {row.applicationId}
          </div>
          <div style={{ 
            fontSize: ODLTheme.typography.fontSize.sm,
            color: ODLTheme.colors.text.secondary,
            marginTop: '2px'
          }}>
            {row.applicationTitle}
          </div>
        </div>
      )
    },
    {
      key: 'department',
      label: 'Department',
      sortable: true,
      render: (row: Referral) => (
        <div>
          <div style={{ fontSize: ODLTheme.typography.fontSize.base }}>
            {row.department}
          </div>
          <div style={{ 
            fontSize: ODLTheme.typography.fontSize.sm,
            color: ODLTheme.colors.text.secondary 
          }}>
            {row.referredTo}
          </div>
        </div>
      )
    },
    {
      key: 'dates',
      label: 'Timeline',
      render: (row: Referral) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: ODLTheme.typography.fontSize.sm }}>
            Sent: {new Date(row.referredDate).toLocaleDateString('en-AU')}
          </div>
          <div style={{ 
            fontSize: ODLTheme.typography.fontSize.sm,
            color: row.daysRemaining < 0 ? ODLTheme.colors.error : 
                   row.daysRemaining <= 2 ? '#8D6708' : 
                   ODLTheme.colors.text.secondary
          }}>
            Due: {new Date(row.dueDate).toLocaleDateString('en-AU')}
            {row.daysRemaining >= 0 ? ` (${row.daysRemaining} days)` : ` (${Math.abs(row.daysRemaining)} days overdue)`}
          </div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row: Referral) => (
        <Chip 
          label={row.status.charAt(0).toUpperCase() + row.status.slice(1)} 
          variant={getStatusColor(row.status)}
          size="small"
        />
      )
    },
    {
      key: 'priority',
      label: 'Priority',
      sortable: true,
      render: (row: Referral) => (
        <Chip 
          label={row.priority.charAt(0).toUpperCase() + row.priority.slice(1)} 
          variant={getPriorityColor(row.priority)}
          size="small"
        />
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      alignRight: true,
      render: (row: Referral) => (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          {row.status === 'pending' && (
            <Button size="small" variant="ghost" leftIcon="email">
              Remind
            </Button>
          )}
          {row.status === 'responded' && (
            <Button size="small" variant="ghost" leftIcon="view">
              View Response
            </Button>
          )}
          <Button size="small" variant="ghost">
            <Icon name="overflow-menu-vertical" size={16} />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div style={{ 
      backgroundColor: ODLTheme.colors.surface, 
      borderRadius: ODLTheme.borders.radius.lg,
      padding: ODLTheme.spacing[6],
      height: 'fit-content'
    }}>
      <div style={{
        backgroundColor: ODLTheme.colors.white,
        borderRadius: ODLTheme.borders.radius.md,
        padding: ODLTheme.spacing[6]
      }}>
      {/* Notification */}
      {notification.show && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 10000,
          maxWidth: '400px',
          animation: 'slideInRight 0.3s ease-out'
        }}>
          <AlertBanner
            variant={notification.type}
            message={notification.message}
            showIcon={true}
            dismissible={true}
            onDismiss={() => setNotification({ show: false, message: '', type: 'success' })}
          />
        </div>
      )}

      {/* Ultra-Compact Inline Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: ODLTheme.spacing[2],
        marginBottom: ODLTheme.spacing[6]
      }}>
        <InlineMetricCard
          icon="document-tasks"
          iconColor={ODLTheme.colors.primary}
          label="Total Referrals"
          value={stats.total}
          trend={`+${Math.round((stats.weeklyChange.total / stats.total) * 100)}% this week`}
          trendColor={ODLTheme.colors.success}
          onClick={() => {
            setFilterStatus('all');
            setSearchQuery('');
          }}
        />

        <InlineMetricCard
          icon="view"
          iconColor={ODLTheme.colors.info}
          label="Under Review"
          value={stats.reviewing}
          trend="Currently reviewing"
          trendColor={ODLTheme.colors.info}
          onClick={() => {
            setFilterStatus('reviewing');
            setSearchQuery('');
          }}
        />

        <InlineMetricCard
          icon="time"
          iconColor={ODLTheme.colors.warning}
          label="Pending"
          value={stats.pending}
          trend={`+${stats.weeklyChange.pending} today`}
          trendColor={ODLTheme.colors.warning}
          onClick={() => {
            setFilterStatus('pending');
            setSearchQuery('');
          }}
        />

        <InlineMetricCard
          icon="warning"
          iconColor={ODLTheme.colors.error}
          label="Overdue"
          value={stats.overdue}
          trend="Immediate attention"
          trendColor={ODLTheme.colors.error}
          onClick={() => {
            setFilterStatus('overdue');
            setSearchQuery('');
          }}
        />

        <InlineMetricCard
          icon="checkmark-filled"
          iconColor={ODLTheme.colors.success}
          label="Responded"
          value={stats.responded}
          trend={`+${stats.weeklyChange.responded} this week`}
          trendColor={ODLTheme.colors.success}
          onClick={() => {
            setFilterStatus('responded');
            setSearchQuery('');
          }}
        />

        <InlineMetricCard
          icon="chart-line"
          iconColor="#8B5CF6"
          label="Avg Response Time"
          value={`${stats.avgResponseTime} days`}
          trend={`-${Math.abs(stats.weeklyChange.responseTime)} days improvement`}
          trendColor={ODLTheme.colors.success}
          onClick={() => {
            setNotification({
              show: true,
              message: `Average response time: ${stats.avgResponseTime} days (improved by ${Math.abs(stats.weeklyChange.responseTime)} days)`,
              type: 'success'
            });
            setTimeout(() => {
              setNotification({ show: false, message: '', type: 'success' });
            }, 4000);
          }}
        />
      </div>
      
      {/* Main Content */}
      <div style={{ 
        background: 'white',
        borderRadius: '8px',
        padding: '24px'
      }}>
      {/* Quick Actions Bar */}
      <div style={{
        padding: '16px 0',
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
          <Button 
            variant="primary" 
            size="small"
            leftIcon="add"
            onClick={() => setShowNewReferralModal(true)}
          >
            New Referral
          </Button>
          <Button 
            variant="secondary" 
            size="small"
            leftIcon="send"
            disabled={selectedReferrals.size === 0}
          >
            Bulk Refer ({selectedReferrals.size})
          </Button>
          <Button 
            variant="ghost" 
            size="small"
            leftIcon="email"
            disabled={selectedReferrals.size === 0}
            onClick={() => {
              const selectedCount = selectedReferrals.size;
              setNotification({
                show: true,
                message: `${selectedCount} reminder${selectedCount > 1 ? 's' : ''} sent successfully`,
                type: 'success'
              });
              setSelectedReferrals(new Set());
              setTimeout(() => {
                setNotification({ show: false, message: '', type: 'success' });
              }, 4000);
            }}
          >
            Send Reminders
          </Button>
          <Button 
            variant="ghost" 
            size="small"
            leftIcon="download"
          >
            Export Report
          </Button>
        </div>

        {/* Quick Filters */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Chip 
            label="Urgent Only" 
            variant="error"
            clickable
            onClick={() => {}}
          />
          <Chip 
            label="Due Today" 
            variant="warning"
            clickable
            onClick={() => {}}
          />
          <Chip 
            label="Overdue" 
            variant="error"
            clickable
            onClick={() => {}}
          />
        </div>
      </div>

      {/* Main Content - Referrals Table */}
      <div>
          {/* Filters */}
          <div style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <Input
              type="text"
              placeholder="Search applications, departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon="search"
              style={{ flex: 2 }}
            />
            <Dropdown
              value={filterStatus}
              onChange={(value) => setFilterStatus(value)}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'pending', label: 'Pending' },
                { value: 'reviewing', label: 'Reviewing' },
                { value: 'responded', label: 'Responded' },
                { value: 'overdue', label: 'Overdue' }
              ]}
              placeholder="Filter by status"
              style={{ minWidth: '120px' }}
            />
            <Dropdown
              value={filterDepartment}
              onChange={(value) => setFilterDepartment(value)}
              options={[
                { value: 'all', label: 'All Departments' },
                { value: 'Traffic & Transport', label: 'Traffic & Transport' },
                { value: 'Heritage', label: 'Heritage' },
                { value: 'Environmental Services', label: 'Environmental Services' },
                { value: 'Building Services', label: 'Building Services' },
                { value: 'Parks & Recreation', label: 'Parks & Recreation' }
              ]}
              placeholder="Filter by department"
              style={{ minWidth: '150px' }}
            />
          </div>

          {/* Referrals Table */}
          <div style={{
            background: 'white',
            borderRadius: ODLTheme.borders.radius.md,
            border: `1px solid ${ODLTheme.colors.border}`,
            overflow: 'hidden'
          }}>
            <Table
              data={filteredReferrals}
              columns={tableColumns}
              selectable
              hoverable
              paginated
              itemsPerPage={10}
              onSelectionChange={(selected) => setSelectedReferrals(new Set(selected.map(r => r.id)))}
              emptyMessage="No referrals found matching your criteria"
            />
          </div>
      </div>

      {/* New Referral Modal */}
        {showNewReferralModal && (
          <Modal
            isOpen={showNewReferralModal}
            onClose={() => setShowNewReferralModal(false)}
            title="Create New Referral"
            size="medium"
            actions={[
              {
                label: 'Cancel',
                onClick: () => setShowNewReferralModal(false),
                variant: 'secondary'
              },
              {
                label: 'Send Referral',
                onClick: () => setShowNewReferralModal(false),
                variant: 'primary'
              }
            ]}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Input
                label="Application ID"
                type="text"
                placeholder="DA/2024/XXXX"
                required
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Input
                  label="Department"
                  type="select"
                  required
                >
                  <option>Traffic & Transport</option>
                  <option>Heritage</option>
                  <option>Environmental Services</option>
                  <option>Building Services</option>
                </Input>
                <Input
                  label="Assigned To"
                  type="text"
                  placeholder="Staff member name"
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <Input
                  label="Priority"
                  type="select"
                  required
                >
                  <option>Normal</option>
                  <option>High</option>
                  <option>Urgent</option>
                </Input>
                <Input
                  label="Due Date"
                  type="date"
                  required
                />
              </div>
              <Input
                label="Comments"
                type="textarea"
                placeholder="Add any specific requirements or context..."
                rows={4}
              />
            </div>
          </Modal>
        )}

      {/* Referral Details Drawer */}
      <Drawer
        isOpen={showDetailsDrawer}
        onClose={() => setShowDetailsDrawer(false)}
        position="right"
        size={600}
        title={selectedReferral ? `Referral ${selectedReferral.id}` : ''}
        showOverlay={true}
        footer={
          <>
            <Button variant="ghost" size="small" onClick={() => setShowDetailsDrawer(false)}>
              Close
            </Button>
            <Button variant="primary" size="small" leftIcon="document">
              View Application
            </Button>
          </>
        }
      >
        {selectedReferral && (
          <div style={{ padding: '24px' }}>
            {/* Application Details */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ 
                fontSize: ODLTheme.typography.fontSize.xl,
                fontWeight: ODLTheme.typography.fontWeight.semibold,
                marginBottom: '16px',
                color: ODLTheme.colors.text.primary
              }}>
                Application Details
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <span style={{ 
                    fontSize: ODLTheme.typography.fontSize.sm,
                    color: ODLTheme.colors.text.tertiary
                  }}>Application ID</span>
                  <div style={{ 
                    fontSize: ODLTheme.typography.fontSize.base,
                    fontWeight: ODLTheme.typography.fontWeight.medium,
                    color: ODLTheme.colors.primary
                  }}>
                    {selectedReferral.applicationId}
                  </div>
                </div>
                <div>
                  <span style={{ 
                    fontSize: ODLTheme.typography.fontSize.sm,
                    color: ODLTheme.colors.text.tertiary
                  }}>Project Title</span>
                  <div style={{ 
                    fontSize: ODLTheme.typography.fontSize.base,
                    color: ODLTheme.colors.text.primary
                  }}>
                    {selectedReferral.applicationTitle}
                  </div>
                </div>
              </div>
            </div>

            {/* Referral Status */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ 
                fontSize: ODLTheme.typography.fontSize.lg,
                fontWeight: ODLTheme.typography.fontWeight.semibold,
                marginBottom: '16px',
                color: ODLTheme.colors.text.primary
              }}>
                Referral Status
              </h3>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <Chip 
                  label={selectedReferral.status.charAt(0).toUpperCase() + selectedReferral.status.slice(1)} 
                  variant={getStatusColor(selectedReferral.status)}
                  size="medium"
                />
                <Chip 
                  label={selectedReferral.priority.charAt(0).toUpperCase() + selectedReferral.priority.slice(1)} 
                  variant={getPriorityColor(selectedReferral.priority)}
                  size="medium"
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <span style={{ 
                    fontSize: ODLTheme.typography.fontSize.sm,
                    color: ODLTheme.colors.text.tertiary
                  }}>Sent Date</span>
                  <div style={{ fontSize: ODLTheme.typography.fontSize.base }}>
                    {new Date(selectedReferral.referredDate).toLocaleDateString('en-AU')}
                  </div>
                </div>
                <div>
                  <span style={{ 
                    fontSize: ODLTheme.typography.fontSize.sm,
                    color: ODLTheme.colors.text.tertiary
                  }}>Due Date</span>
                  <div style={{ 
                    fontSize: ODLTheme.typography.fontSize.base,
                    color: selectedReferral.daysRemaining < 0 ? ODLTheme.colors.error : 
                           selectedReferral.daysRemaining <= 2 ? '#8D6708' : 
                           ODLTheme.colors.text.primary
                  }}>
                    {new Date(selectedReferral.dueDate).toLocaleDateString('en-AU')}
                    {selectedReferral.daysRemaining >= 0 
                      ? ` (${selectedReferral.daysRemaining} days remaining)` 
                      : ` (${Math.abs(selectedReferral.daysRemaining)} days overdue)`}
                  </div>
                </div>
              </div>
            </div>

            {/* Department & Assignment */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ 
                fontSize: ODLTheme.typography.fontSize.lg,
                fontWeight: ODLTheme.typography.fontWeight.semibold,
                marginBottom: '16px',
                color: ODLTheme.colors.text.primary
              }}>
                Department & Assignment
              </h3>
              <div style={{ 
                background: '#f8f9fa',
                padding: '16px',
                borderRadius: ODLTheme.borders.radius.md,
                border: `1px solid ${ODLTheme.colors.border}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <Icon name="group" size={20} color={ODLTheme.colors.primary} />
                  <div>
                    <div style={{ 
                      fontSize: ODLTheme.typography.fontSize.sm,
                      color: ODLTheme.colors.text.tertiary
                    }}>Department</div>
                    <div style={{ 
                      fontSize: ODLTheme.typography.fontSize.base,
                      fontWeight: ODLTheme.typography.fontWeight.medium
                    }}>
                      {selectedReferral.department}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Icon name="user" size={20} color={ODLTheme.colors.primary} />
                  <div>
                    <div style={{ 
                      fontSize: ODLTheme.typography.fontSize.sm,
                      color: ODLTheme.colors.text.tertiary
                    }}>Assigned To</div>
                    <div style={{ 
                      fontSize: ODLTheme.typography.fontSize.base,
                      fontWeight: ODLTheme.typography.fontWeight.medium
                    }}>
                      {selectedReferral.referredTo}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '16px' }}>
                <Button 
                  variant="secondary" 
                  size="small"
                  leftIcon="alarm"
                  onClick={() => handleSendReminder(selectedReferral)}
                >
                  Send Reminder
                </Button>
              </div>
            </div>

            {/* Response Details (if responded) */}
            {selectedReferral.responseDate && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ 
                  fontSize: ODLTheme.typography.fontSize.lg,
                  fontWeight: ODLTheme.typography.fontWeight.semibold,
                  marginBottom: '16px',
                  color: ODLTheme.colors.text.primary
                }}>
                  Response Details
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <span style={{ 
                      fontSize: ODLTheme.typography.fontSize.sm,
                      color: ODLTheme.colors.text.tertiary
                    }}>Response Date</span>
                    <div style={{ fontSize: ODLTheme.typography.fontSize.base }}>
                      {new Date(selectedReferral.responseDate).toLocaleDateString('en-AU')}
                    </div>
                  </div>
                  {selectedReferral.responseType && (
                    <div>
                      <span style={{ 
                        fontSize: ODLTheme.typography.fontSize.sm,
                        color: ODLTheme.colors.text.tertiary
                      }}>Response Type</span>
                      <div style={{ fontSize: ODLTheme.typography.fontSize.base }}>
                        {selectedReferral.responseType.charAt(0).toUpperCase() + selectedReferral.responseType.slice(1)}
                      </div>
                    </div>
                  )}
                  {selectedReferral.comments && (
                    <div>
                      <span style={{ 
                        fontSize: ODLTheme.typography.fontSize.sm,
                        color: ODLTheme.colors.text.tertiary
                      }}>Comments</span>
                      <div style={{ 
                        fontSize: ODLTheme.typography.fontSize.base,
                        padding: '12px',
                        background: '#f8f9fa',
                        borderRadius: ODLTheme.borders.radius.sm,
                        marginTop: '8px'
                      }}>
                        {selectedReferral.comments}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        )}
      </Drawer>
      
      {/* Animation styles */}
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
      </div>
      </div>
    </div>
  );
};

export default InternalReferrals;