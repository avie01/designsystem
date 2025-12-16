import React, { useState, useMemo } from 'react';
import PageTemplate from '../components/PageTemplate/PageTemplate';
import Table from '../components/Table/Table';
import DemoNavigation from '../components/DemoNavigation';
import Icon from '../components/Icon/Icon';
import Tabs, { TabItem } from '../components/Tabs/Tabs';
import DocumentTreemap from '../components/DocumentTreemap/DocumentTreemap';

const TotalDocumentsDemo: React.FC = () => {
  const [activeClassification, setActiveClassification] = useState('Sensitive');
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  
  // Sample government documents data with metadata
  const governmentDocuments = [
    { 
      id: 'DOC-001', 
      title: 'National Security Assessment Q4 2024', 
      classification: 'TOP SECRET', 
      department: 'Intelligence', 
      status: 'Approved', 
      accessLevel: 'Level 5', 
      lastModified: '2024-12-15 14:30',
      disposalSchedule: 'Permanent Retention',
      auditTrail: [
        { action: 'Created', user: 'John Smith', timestamp: '2024-12-15 14:30', details: 'Document created' },
        { action: 'Reviewed', user: 'Sarah Johnson', timestamp: '2024-12-15 16:45', details: 'Security review completed' },
        { action: 'Approved', user: 'Mike Wilson', timestamp: '2024-12-15 18:20', details: 'Final approval granted' }
      ]
    },
    { 
      id: 'DOC-002', 
      title: 'Defense Budget Allocation Report', 
      classification: 'SECRET', 
      department: 'Defense', 
      status: 'Pending Review', 
      accessLevel: 'Level 4', 
      lastModified: '2024-12-14 09:15',
      disposalSchedule: '10 Years',
      auditTrail: [
        { action: 'Created', user: 'Lisa Brown', timestamp: '2024-12-14 09:15', details: 'Initial draft created' },
        { action: 'Submitted', user: 'Lisa Brown', timestamp: '2024-12-14 15:30', details: 'Submitted for review' }
      ]
    },
    { 
      id: 'DOC-003', 
      title: 'Foreign Policy Analysis - Eastern Region', 
      classification: 'TOP SECRET', 
      department: 'Intelligence', 
      status: 'In Review', 
      accessLevel: 'Level 5', 
      lastModified: '2024-12-13 16:45',
      disposalSchedule: 'Permanent Retention',
      auditTrail: [
        { action: 'Created', user: 'David Chen', timestamp: '2024-12-13 16:45', details: 'Analysis document created' },
        { action: 'Reviewed', user: 'Emma Davis', timestamp: '2024-12-14 10:20', details: 'Technical review completed' }
      ]
    },
    { 
      id: 'DOC-004', 
      title: 'Infrastructure Security Protocol', 
      classification: 'CONFIDENTIAL', 
      department: 'Defense', 
      status: 'Approved', 
      accessLevel: 'Level 3', 
      lastModified: '2024-12-12 11:20',
      disposalSchedule: '5 Years',
      auditTrail: [
        { action: 'Created', user: 'Alex Thompson', timestamp: '2024-12-12 11:20', details: 'Protocol document created' },
        { action: 'Approved', user: 'Rachel Green', timestamp: '2024-12-12 14:15', details: 'Security protocol approved' }
      ]
    },
    { 
      id: 'DOC-005', 
      title: 'Economic Impact Assessment', 
      classification: 'SECRET', 
      department: 'Finance', 
      status: 'Pending Approval', 
      accessLevel: 'Level 4', 
      lastModified: '2024-12-11 13:55',
      disposalSchedule: '7 Years',
      auditTrail: [
        { action: 'Created', user: 'Mark Anderson', timestamp: '2024-12-11 13:55', details: 'Assessment document created' },
        { action: 'Reviewed', user: 'Jennifer Lee', timestamp: '2024-12-12 09:30', details: 'Economic analysis reviewed' }
      ]
    }
  ];

  // Filter documents based on classification
  const filteredDocuments = useMemo(() => {
    const classificationMap: { [key: string]: string[] } = {
      'Sensitive': ['TOP SECRET', 'SECRET'],
      'Internal': ['CONFIDENTIAL'],
      'Public': ['UNCLASSIFIED', 'PUBLIC']
    };
    
    const allowedClassifications = classificationMap[activeClassification] || [];
    return governmentDocuments.filter(doc => 
      allowedClassifications.includes(doc.classification)
    );
  }, [governmentDocuments, activeClassification]);

  // Classification tabs
  const classificationTabs: TabItem[] = [
    {
      id: 'Sensitive',
      label: 'Sensitive',
      content: null
    },
    {
      id: 'Internal', 
      label: 'Internal',
      content: null
    },
    {
      id: 'Public',
      label: 'Public', 
      content: null
    }
  ];

  const columns = [
    { 
      key: 'id', 
      header: 'Document ID', 
      sortable: true,
      render: (item: any) => <span className="text-xs">{item.id}</span>
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
      render: (item: any) => <span className="text-xs">{item.accessLevel}</span>
    },
    { 
      key: 'lastModified', 
      header: 'Last Modified', 
      sortable: true,
      render: (item: any) => <span className="text-xs">{item.lastModified}</span>
    }
  ];

  return (
    <PageTemplate
      title="Total Documents"
      subtitle="Complete registry of all sensitive government documents"
      breadcrumbs={[
        { label: 'ODL Components', path: '/' },
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Total Documents' }
      ]}
      showLeftNavRail={false}
      showRightNavRail={true}
      rightNavRail={
        <div className="p-6 space-y-6 bg-white h-full border-l border-gray-200">
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">📄 Document Metadata</h3>
            {selectedDocument ? (
              <>
                <p className="text-sm text-gray-600 font-medium">{selectedDocument.title}</p>
                <p className="text-xs text-blue-600 mt-1">✅ Selected: {selectedDocument.id}</p>
              </>
            ) : (
              <p className="text-sm text-gray-500 italic">👆 Click on a table row to view document details</p>
            )}
          </div>

          {selectedDocument && (
            <>
              {/* Document Details */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Document Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ID:</span>
                      <span className="font-medium">{selectedDocument.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Classification:</span>
                      <span className="font-medium">{selectedDocument.classification}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Department:</span>
                      <span className="font-medium">{selectedDocument.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium">{selectedDocument.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Access Level:</span>
                      <span className="font-medium">{selectedDocument.accessLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Modified:</span>
                      <span className="font-medium">{selectedDocument.lastModified}</span>
                    </div>
                  </div>
                </div>

                {/* Disposal Schedule */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Disposal Schedule</h4>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="calendar" className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">{selectedDocument.disposalSchedule}</span>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">
                      {selectedDocument.disposalSchedule === 'Permanent Retention' 
                        ? 'Document must be retained permanently'
                        : `Document will be disposed after ${selectedDocument.disposalSchedule}`
                      }
                    </p>
                  </div>
                </div>

                {/* Audit Trail */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Audit Trail</h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {selectedDocument.auditTrail.map((entry: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-800">{entry.action}</span>
                          <span className="text-xs text-gray-500">{entry.timestamp}</span>
                        </div>
                        <div className="text-xs text-gray-600 mb-1">by {entry.user}</div>
                        <div className="text-xs text-gray-500">{entry.details}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      }
    >
      <DemoNavigation title="Total Documents" />
      
      <div className="space-y-6">
        {/* Header Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Documents Card */}
          <div className="bg-white border border-[#EDF1F5] rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Total Documents</h3>
                <p className="text-2xl font-bold text-blue-600">{governmentDocuments.length}</p>
              </div>
              <Icon name="document" className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          {/* Filtered Documents Card */}
          <div className="bg-white border border-[#EDF1F5] rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Filtered Documents</h3>
                <p className="text-2xl font-bold text-green-600">{filteredDocuments.length}</p>
              </div>
              <Icon name="filter" className="w-8 h-8 text-green-600" />
            </div>
          </div>

          {/* Active Classification Card */}
          <div className="bg-white border border-[#EDF1F5] rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Active Classification</h3>
                <p className="text-2xl font-bold text-purple-600">{activeClassification}</p>
              </div>
              <Icon name="security" className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Classification Tabs */}
        <div className="border border-[#EDF1F5] rounded-lg bg-white">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Document Classification</h3>
            <p className="text-sm text-gray-600 mt-1">Filter documents by security classification level</p>
          </div>
          <div className="p-6 bg-gray-50">
            <Tabs
              tabs={classificationTabs}
              activeTab={activeClassification}
              onTabChange={setActiveClassification}
              showContent={false}
            />
          </div>
        </div>

        {/* Document Treemap */}
        <div className="border border-[#EDF1F5] rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Document Distribution - {activeClassification} Documents</h3>
            <p className="text-sm text-gray-600 mt-1">Interactive visualization of document distribution by classification and department</p>
          </div>
          <div className="p-6">
            <DocumentTreemap
              data={filteredDocuments}
              onNodeClick={(node) => {
                console.log('Treemap node clicked:', node);
                // You can add additional filtering logic here
              }}
            />
          </div>
        </div>

        {/* Document Table */}
        <div className="border border-[#EDF1F5] rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Document Registry - {activeClassification} Documents</h3>
            <p className="text-sm text-gray-600 mt-1">Showing {filteredDocuments.length} of {governmentDocuments.length} documents</p>
          </div>
          <div className="overflow-x-auto">
            <Table
              data={filteredDocuments}
              columns={columns}
              compact={true}
              selectable={true}
              paginated={true}
              itemsPerPage={25}
              onRowSelect={(selectedItems) => {
                console.log('Row selected:', selectedItems);
                if (selectedItems.length > 0) {
                  console.log('Setting selected document:', selectedItems[0]);
                  setSelectedDocument(selectedItems[0]);
                  // Add visual feedback
                  alert(`Selected document: ${selectedItems[0].title}`);
                } else {
                  console.log('Clearing selected document');
                  setSelectedDocument(null);
                }
              }}
            />
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default TotalDocumentsDemo; 