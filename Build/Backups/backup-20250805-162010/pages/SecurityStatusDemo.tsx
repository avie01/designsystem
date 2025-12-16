import React from 'react';
import PageTemplate from '../components/PageTemplate/PageTemplate';
import Table from '../components/Table/Table';
import DemoNavigation from '../components/DemoNavigation';
import Icon from '../components/Icon/Icon';

const SecurityStatusDemo: React.FC = () => {
  // Sample security status data (20 items)
  const securityStatus = [
    { id: 'SEC-001', alertType: 'Unauthorized Access Attempt', severity: 'High', status: 'Active', department: 'Intelligence', affectedSystems: 3, assignedTo: 'Sarah Johnson', lastUpdated: '2024-12-15 14:30' },
    { id: 'SEC-002', alertType: 'Suspicious Network Activity', severity: 'Medium', status: 'Resolved', department: 'Cybersecurity', affectedSystems: 1, assignedTo: 'David Wilson', lastUpdated: '2024-12-14 09:15' },
    { id: 'SEC-003', alertType: 'Data Breach Attempt', severity: 'Critical', status: 'Active', department: 'Defense', affectedSystems: 5, assignedTo: 'Michael Chen', lastUpdated: '2024-12-13 16:45' },
    { id: 'SEC-004', alertType: 'Phishing Campaign Detected', severity: 'Medium', status: 'Resolved', department: 'Communications', affectedSystems: 2, assignedTo: 'Alex Martinez', lastUpdated: '2024-12-12 11:20' },
    { id: 'SEC-005', alertType: 'Malware Detection', severity: 'High', status: 'Active', department: 'Technology', affectedSystems: 4, assignedTo: 'Jennifer Lee', lastUpdated: '2024-12-11 13:55' },
    { id: 'SEC-006', alertType: 'Unauthorized Document Access', severity: 'Critical', status: 'Active', department: 'Intelligence', affectedSystems: 1, assignedTo: 'Sarah Johnson', lastUpdated: '2024-12-10 08:30' },
    { id: 'SEC-007', alertType: 'System Vulnerability Scan', severity: 'Low', status: 'Resolved', department: 'Cybersecurity', affectedSystems: 8, assignedTo: 'David Wilson', lastUpdated: '2024-12-09 15:10' },
    { id: 'SEC-008', alertType: 'Failed Login Attempts', severity: 'Medium', status: 'Resolved', department: 'Operations', affectedSystems: 1, assignedTo: 'Rachel Green', lastUpdated: '2024-12-08 12:45' },
    { id: 'SEC-009', alertType: 'Data Exfiltration Attempt', severity: 'Critical', status: 'Active', department: 'Defense', affectedSystems: 3, assignedTo: 'Michael Chen', lastUpdated: '2024-12-07 10:20' },
    { id: 'SEC-010', alertType: 'Suspicious Email Activity', severity: 'Medium', status: 'Resolved', department: 'Communications', affectedSystems: 2, assignedTo: 'Alex Martinez', lastUpdated: '2024-12-06 14:15' },
    { id: 'SEC-011', alertType: 'Network Intrusion Detection', severity: 'High', status: 'Active', department: 'Cybersecurity', affectedSystems: 6, assignedTo: 'David Wilson', lastUpdated: '2024-12-05 09:30' },
    { id: 'SEC-012', alertType: 'Unauthorized System Access', severity: 'Critical', status: 'Active', department: 'Technology', affectedSystems: 2, assignedTo: 'Jennifer Lee', lastUpdated: '2024-12-04 16:00' },
    { id: 'SEC-013', alertType: 'Data Loss Prevention Alert', severity: 'Medium', status: 'Resolved', department: 'Finance', affectedSystems: 1, assignedTo: 'Emily Rodriguez', lastUpdated: '2024-12-03 11:45' },
    { id: 'SEC-014', alertType: 'Ransomware Detection', severity: 'Critical', status: 'Active', department: 'Operations', affectedSystems: 4, assignedTo: 'Rachel Green', lastUpdated: '2024-12-02 13:20' },
    { id: 'SEC-015', alertType: 'Social Engineering Attempt', severity: 'Medium', status: 'Resolved', department: 'Human Resources', affectedSystems: 1, assignedTo: 'Amanda White', lastUpdated: '2024-12-01 08:15' },
    { id: 'SEC-016', alertType: 'Zero-Day Vulnerability', severity: 'Critical', status: 'Active', department: 'Cybersecurity', affectedSystems: 7, assignedTo: 'David Wilson', lastUpdated: '2024-11-30 15:30' },
    { id: 'SEC-017', alertType: 'Insider Threat Detection', severity: 'High', status: 'Active', department: 'Internal Affairs', affectedSystems: 2, assignedTo: 'Robert Davis', lastUpdated: '2024-11-29 12:10' },
    { id: 'SEC-018', alertType: 'API Security Breach', severity: 'Medium', status: 'Resolved', department: 'Technology', affectedSystems: 3, assignedTo: 'Jennifer Lee', lastUpdated: '2024-11-28 09:45' },
    { id: 'SEC-019', alertType: 'Database Access Violation', severity: 'Critical', status: 'Active', department: 'Intelligence', affectedSystems: 1, assignedTo: 'Sarah Johnson', lastUpdated: '2024-11-27 14:20' },
    { id: 'SEC-020', alertType: 'Perimeter Security Breach', severity: 'High', status: 'Active', department: 'Defense', affectedSystems: 2, assignedTo: 'Michael Chen', lastUpdated: '2024-11-26 11:35' }
  ];

  const columns = [
    { 
      key: 'id', 
      header: 'Alert ID', 
      sortable: true,
      render: (item: any) => <span className="text-sm">{item.id}</span>
    },
    { 
      key: 'alertType', 
      header: 'Alert Type', 
      sortable: true,
      render: (item: any) => <span className="text-sm font-medium">{item.alertType}</span>
    },
    { 
      key: 'severity', 
      header: 'Severity', 
      sortable: true,
      render: (item: any) => (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded whitespace-nowrap overflow-hidden`}>
          <span className="truncate">{item.severity}</span>
        </span>
      )
    },
    { 
      key: 'status', 
      header: 'Status', 
      sortable: true,
      render: (item: any) => (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded whitespace-nowrap overflow-hidden`}>
          <span className="truncate">{item.status}</span>
        </span>
      )
    },
    { 
      key: 'department', 
      header: 'Department', 
      sortable: true,
      render: (item: any) => <span className="text-sm">{item.department}</span>
    },
    { 
      key: 'affectedSystems', 
      header: 'Affected Systems', 
      sortable: true,
      render: (item: any) => <span className="text-sm">{item.affectedSystems}</span>
    },
    { 
      key: 'assignedTo', 
      header: 'Assigned To', 
      sortable: true,
      render: (item: any) => <span className="text-sm">{item.assignedTo}</span>
    },
    { 
      key: 'lastUpdated', 
      header: 'Last Updated', 
      sortable: true,
      render: (item: any) => <span className="text-sm">{item.lastUpdated}</span>
    }
  ];

  return (
    <PageTemplate
      title="Security Status"
      subtitle="Active security alerts and system status"
      breadcrumbs={[
        { label: 'ODL Components', path: '/' },
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Security Status' }
      ]}
      showLeftNavRail={false}
      showRightNavRail={false}
    >
      <DemoNavigation title="Security Status" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Security Status</h1>
            <p className="text-gray-600 mt-1">All {securityStatus.length} security alerts and system status</p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="security" className="w-6 h-6 text-orange-600" />
            <span className="text-lg font-semibold text-orange-600">{securityStatus.length}</span>
          </div>
        </div>

        {/* Security Status Table */}
        <div className="border border-[#EDF1F5] rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Security Alert Management</h3>
            <p className="text-sm text-gray-600 mt-1">All active security alerts with their severity, status, and assigned personnel</p>
          </div>
          <div className="overflow-x-auto">
            <Table
              data={securityStatus}
              columns={columns}
              compact={true}
              selectable={true}
              paginated={true}
              itemsPerPage={25}
              onRowSelect={(selectedItems: any) => console.log('Selected items:', selectedItems)}
            />
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default SecurityStatusDemo; 