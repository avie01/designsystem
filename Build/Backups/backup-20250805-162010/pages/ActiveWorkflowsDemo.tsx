import React from 'react';
import PageTemplate from '../components/PageTemplate/PageTemplate';
import Table from '../components/Table/Table';
import DemoNavigation from '../components/DemoNavigation';
import Icon from '../components/Icon/Icon';

const ActiveWorkflowsDemo: React.FC = () => {
  // Sample workflow documents data (20 documents)
  const workflowDocuments = [
    { id: 'WF-001', title: 'Security Clearance Review - Phase 1', workflow: 'Security Clearance Review', status: 'In Progress', documents: 8, priority: 'High', assignedTo: 'Sarah Johnson', lastUpdated: '2024-12-15 14:30' },
    { id: 'WF-002', title: 'Budget Approval Process - Q4', workflow: 'Budget Approval Process', status: 'Active', documents: 5, priority: 'Medium', assignedTo: 'Michael Chen', lastUpdated: '2024-12-14 09:15' },
    { id: 'WF-003', title: 'Policy Review Committee - New Guidelines', workflow: 'Policy Review Committee', status: 'Review', documents: 3, priority: 'High', assignedTo: 'Emily Rodriguez', lastUpdated: '2024-12-13 16:45' },
    { id: 'WF-004', title: 'Defense Contract Evaluation - Navy', workflow: 'Contract Evaluation', status: 'In Progress', documents: 12, priority: 'Critical', assignedTo: 'David Wilson', lastUpdated: '2024-12-12 11:20' },
    { id: 'WF-005', title: 'Intelligence Briefing Approval', workflow: 'Intelligence Review', status: 'Active', documents: 7, priority: 'High', assignedTo: 'Lisa Thompson', lastUpdated: '2024-12-11 13:55' },
    { id: 'WF-006', title: 'Financial Audit Workflow', workflow: 'Financial Audit', status: 'In Progress', documents: 15, priority: 'Medium', assignedTo: 'Robert Davis', lastUpdated: '2024-12-10 08:30' },
    { id: 'WF-007', title: 'Military Training Protocol Update', workflow: 'Training Protocol', status: 'Review', documents: 4, priority: 'Medium', assignedTo: 'Jennifer Lee', lastUpdated: '2024-12-09 15:10' },
    { id: 'WF-008', title: 'Cybersecurity Assessment Workflow', workflow: 'Security Assessment', status: 'Active', documents: 9, priority: 'Critical', assignedTo: 'Alex Martinez', lastUpdated: '2024-12-08 12:45' },
    { id: 'WF-009', title: 'Foreign Policy Review Process', workflow: 'Policy Review', status: 'In Progress', documents: 6, priority: 'High', assignedTo: 'Maria Garcia', lastUpdated: '2024-12-07 10:20' },
    { id: 'WF-010', title: 'Defense Technology Evaluation', workflow: 'Technology Review', status: 'Active', documents: 11, priority: 'Medium', assignedTo: 'James Brown', lastUpdated: '2024-12-06 14:15' },
    { id: 'WF-011', title: 'Economic Impact Analysis Workflow', workflow: 'Economic Analysis', status: 'In Progress', documents: 8, priority: 'Medium', assignedTo: 'Amanda White', lastUpdated: '2024-12-05 09:30' },
    { id: 'WF-012', title: 'Intelligence Threat Assessment', workflow: 'Threat Assessment', status: 'Review', documents: 5, priority: 'Critical', assignedTo: 'Kevin Johnson', lastUpdated: '2024-12-04 16:00' },
    { id: 'WF-013', title: 'Naval Fleet Deployment Review', workflow: 'Fleet Deployment', status: 'Active', documents: 13, priority: 'High', assignedTo: 'Rachel Green', lastUpdated: '2024-12-03 11:45' },
    { id: 'WF-014', title: 'Budget Reconciliation Process', workflow: 'Budget Reconciliation', status: 'In Progress', documents: 10, priority: 'Medium', assignedTo: 'Thomas Anderson', lastUpdated: '2024-12-02 13:20' },
    { id: 'WF-015', title: 'Counter-terrorism Strategy Review', workflow: 'Strategy Review', status: 'Active', documents: 7, priority: 'Critical', assignedTo: 'Nicole Taylor', lastUpdated: '2024-12-01 08:15' },
    { id: 'WF-016', title: 'Air Force Training Protocol Update', workflow: 'Training Protocol', status: 'Review', documents: 6, priority: 'Medium', assignedTo: 'Christopher Lee', lastUpdated: '2024-11-30 15:30' },
    { id: 'WF-017', title: 'Financial Compliance Workflow', workflow: 'Compliance Review', status: 'In Progress', documents: 14, priority: 'High', assignedTo: 'Stephanie Clark', lastUpdated: '2024-11-29 12:10' },
    { id: 'WF-018', title: 'Intelligence Analysis Pipeline', workflow: 'Intelligence Analysis', status: 'Active', documents: 9, priority: 'Critical', assignedTo: 'Daniel Moore', lastUpdated: '2024-11-28 09:45' },
    { id: 'WF-019', title: 'Defense Procurement Review', workflow: 'Procurement Review', status: 'In Progress', documents: 12, priority: 'Medium', assignedTo: 'Jessica Hall', lastUpdated: '2024-11-27 14:20' },
    { id: 'WF-020', title: 'Economic Policy Framework Review', workflow: 'Policy Framework', status: 'Active', documents: 8, priority: 'High', assignedTo: 'Ryan Miller', lastUpdated: '2024-11-26 11:35' }
  ];

  const columns = [
    { 
      key: 'id', 
      header: 'Workflow ID', 
      sortable: true,
      render: (item: any) => <span className="text-sm">{item.id}</span>
    },
    { 
      key: 'title', 
      header: 'Workflow Title', 
      sortable: true,
      render: (item: any) => <span className="text-sm font-medium">{item.title}</span>
    },
    { 
      key: 'workflow', 
      header: 'Workflow Type', 
      sortable: true,
      render: (item: any) => <span className="text-sm">{item.workflow}</span>
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
      key: 'documents', 
      header: 'Documents', 
      sortable: true,
      render: (item: any) => <span className="text-sm">{item.documents}</span>
    },
    { 
      key: 'priority', 
      header: 'Priority', 
      sortable: true,
      render: (item: any) => <span className="text-sm">{item.priority}</span>
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
      title="Active Workflows"
      subtitle="Current workflow processes and their status"
      breadcrumbs={[
        { label: 'ODL Components', path: '/' },
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Active Workflows' }
      ]}
      showLeftNavRail={false}
      showRightNavRail={false}
    >
      <DemoNavigation title="Active Workflows" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Active Workflows</h1>
            <p className="text-gray-600 mt-1">All {workflowDocuments.length} active workflow processes</p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="workflow-automation" className="w-6 h-6 text-green-600" />
            <span className="text-lg font-semibold text-green-600">{workflowDocuments.length}</span>
          </div>
        </div>

        {/* Workflow Table */}
        <div className="border border-[#EDF1F5] rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Workflow Management</h3>
            <p className="text-sm text-gray-600 mt-1">Active workflow processes with their current status and assigned resources</p>
          </div>
          <div className="overflow-x-auto">
            <Table
              data={workflowDocuments}
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

export default ActiveWorkflowsDemo; 