import React from 'react';
import PageTemplate from '../components/PageTemplate/PageTemplate';
import Table from '../components/Table/Table';
import DemoNavigation from '../components/DemoNavigation';
import Icon from '../components/Icon/Icon';

const TopSecretFilesDemo: React.FC = () => {
  // Sample top secret documents data (20 documents)
  const topSecretDocuments = [
    { id: 'TS-001', title: 'National Security Assessment Q4 2024', classification: 'TOP SECRET', department: 'Intelligence', status: 'Approved', accessLevel: 'Level 5', clearance: 'TS/SCI', lastModified: '2024-12-15 14:30' },
    { id: 'TS-002', title: 'Foreign Policy Analysis - Eastern Region', classification: 'TOP SECRET', department: 'Intelligence', status: 'In Review', accessLevel: 'Level 5', clearance: 'TS/SCI', lastModified: '2024-12-13 16:45' },
    { id: 'TS-003', title: 'Cybersecurity Threat Report', classification: 'TOP SECRET', department: 'Intelligence', status: 'Approved', accessLevel: 'Level 5', clearance: 'TS/SCI', lastModified: '2024-12-10 08:30' },
    { id: 'TS-004', title: 'Intelligence Briefing - Domestic Threats', classification: 'TOP SECRET', department: 'Intelligence', status: 'Pending Review', accessLevel: 'Level 5', clearance: 'TS/SCI', lastModified: '2024-12-07 10:20' },
    { id: 'TS-005', title: 'Counter-terrorism Strategy', classification: 'TOP SECRET', department: 'Intelligence', status: 'Approved', accessLevel: 'Level 5', clearance: 'TS/SCI', lastModified: '2024-12-04 16:00' },
    { id: 'TS-006', title: 'Intelligence Assessment - Cyber Threats', classification: 'TOP SECRET', department: 'Intelligence', status: 'Approved', accessLevel: 'Level 5', clearance: 'TS/SCI', lastModified: '2024-12-01 08:15' },
    { id: 'TS-007', title: 'Foreign Intelligence Summary', classification: 'TOP SECRET', department: 'Intelligence', status: 'In Review', accessLevel: 'Level 5', clearance: 'TS/SCI', lastModified: '2024-11-28 09:45' },
    { id: 'TS-008', title: 'Intelligence Report - Regional Conflicts', classification: 'TOP SECRET', department: 'Intelligence', status: 'Approved', accessLevel: 'Level 5', clearance: 'TS/SCI', lastModified: '2024-11-25 16:50' },
    { id: 'TS-009', title: 'Counter-intelligence Operations', classification: 'TOP SECRET', department: 'Intelligence', status: 'Pending Review', accessLevel: 'Level 5', clearance: 'TS/SCI', lastModified: '2024-11-22 08:55' },
    { id: 'TS-010', title: 'Intelligence Briefing - International Relations', classification: 'TOP SECRET', department: 'Intelligence', status: 'Approved', accessLevel: 'Level 5', clearance: 'TS/SCI', lastModified: '2024-11-19 09:10' },
    { id: 'TS-011', title: 'Intelligence Analysis - Emerging Threats', classification: 'TOP SECRET', department: 'Intelligence', status: 'In Review', accessLevel: 'Level 5', clearance: 'TS/SCI', lastModified: '2024-11-16 16:35' },
    { id: 'TS-012', title: 'Intelligence Summary - Domestic Security', classification: 'TOP SECRET', department: 'Intelligence', status: 'Approved', accessLevel: 'Level 5', clearance: 'TS/SCI', lastModified: '2024-11-13 09:40' },
    { id: 'TS-013', title: 'Intelligence Report - Global Security', classification: 'TOP SECRET', department: 'Intelligence', status: 'Pending Review', accessLevel: 'Level 5', clearance: 'TS/SCI', lastModified: '2024-11-10 08:30' },
    { id: 'TS-014', title: 'Intelligence Assessment - Regional Stability', classification: 'TOP SECRET', department: 'Intelligence', status: 'Approved', accessLevel: 'Level 5', clearance: 'TS/SCI', lastModified: '2024-11-07 16:25' },
    { id: 'TS-015', title: 'Intelligence Analysis - Economic Espionage', classification: 'TOP SECRET', department: 'Intelligence', status: 'Approved', accessLevel: 'Level 5', clearance: 'TS/SCI', lastModified: '2024-11-01 08:15' },
    { id: 'TS-016', title: 'Intelligence Report - Border Security', classification: 'TOP SECRET', department: 'Intelligence', status: 'Pending Review', accessLevel: 'Level 5', clearance: 'TS/SCI', lastModified: '2024-10-29 16:10' },
    { id: 'TS-017', title: 'Nuclear Security Protocol', classification: 'TOP SECRET', department: 'Defense', status: 'Approved', accessLevel: 'Level 5', clearance: 'TS/SCI', lastModified: '2024-10-26 12:30' },
    { id: 'TS-018', title: 'Strategic Defense Initiative', classification: 'TOP SECRET', department: 'Defense', status: 'In Review', accessLevel: 'Level 5', clearance: 'TS/SCI', lastModified: '2024-10-23 14:45' },
    { id: 'TS-019', title: 'Advanced Weapons Technology', classification: 'TOP SECRET', department: 'Defense', status: 'Approved', accessLevel: 'Level 5', clearance: 'TS/SCI', lastModified: '2024-10-20 09:15' },
    { id: 'TS-020', title: 'Classified Financial Operations', classification: 'TOP SECRET', department: 'Finance', status: 'Pending Review', accessLevel: 'Level 5', clearance: 'TS/SCI', lastModified: '2024-10-17 11:20' }
  ];

  const columns = [
    { 
      key: 'id', 
      header: 'Document ID', 
      sortable: true,
      render: (item: any) => <span className="text-sm">{item.id}</span>
    },
    { 
      key: 'title', 
      header: 'Document Title', 
      sortable: true,
      render: (item: any) => <span className="text-sm font-medium">{item.title}</span>
    },
    { 
      key: 'classification', 
      header: 'Classification', 
      sortable: true,
      render: (item: any) => (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded whitespace-nowrap overflow-hidden`}>
          <span className="truncate">
            {item.classification.toLowerCase().replace(/\b\w/g, (l: string) => l.toUpperCase())}
          </span>
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
      key: 'accessLevel', 
      header: 'Access Level', 
      sortable: true,
      render: (item: any) => <span className="text-sm">{item.accessLevel}</span>
    },
    { 
      key: 'clearance', 
      header: 'Clearance', 
      sortable: true,
      render: (item: any) => <span className="text-sm">{item.clearance}</span>
    },
    { 
      key: 'lastModified', 
      header: 'Last Modified', 
      sortable: true,
      render: (item: any) => <span className="text-sm">{item.lastModified}</span>
    }
  ];

  return (
    <PageTemplate
      title="Top Secret Files"
      subtitle="Maximum clearance required documents"
      breadcrumbs={[
        { label: 'ODL Components', path: '/' },
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Top Secret Files' }
      ]}
      showLeftNavRail={false}
      showRightNavRail={false}
    >
      <DemoNavigation title="Top Secret Files" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Top Secret Files</h1>
            <p className="text-gray-600 mt-1">All {topSecretDocuments.length} top secret documents requiring maximum clearance</p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="security" className="w-6 h-6 text-red-600" />
            <span className="text-lg font-semibold text-red-600">{topSecretDocuments.length}</span>
          </div>
        </div>

        {/* Document Table */}
        <div className="border border-[#EDF1F5] rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Top Secret Document Registry</h3>
            <p className="text-sm text-gray-600 mt-1">All documents requiring TS/SCI clearance and Level 5 access</p>
          </div>
          <div className="overflow-x-auto">
            <Table
              data={topSecretDocuments}
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

export default TopSecretFilesDemo; 