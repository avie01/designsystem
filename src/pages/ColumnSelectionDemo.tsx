import React, { useState } from 'react';
import ColumnSelectionTree, { ColumnGroup } from '../components/ColumnSelectionTree/ColumnSelectionTree';
import DemoNavigation from '../components/DemoNavigation';
import Icon from '../components/Icon/Icon';

const ColumnSelectionDemo: React.FC = () => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);

  // Column groups based on the demo pages
  const columnGroups: ColumnGroup[] = [
    {
      id: 'total-documents',
      name: 'Total Documents',
      columns: [
        { key: 'id', header: 'Document ID', sortable: true },
        { key: 'title', header: 'Document Title', sortable: true },
        { key: 'classification', header: 'Classification', sortable: true },
        { key: 'department', header: 'Department', sortable: true },
        { key: 'status', header: 'Status', sortable: true },
        { key: 'accessLevel', header: 'Access Level', sortable: true },
        { key: 'lastModified', header: 'Last Modified', sortable: true }
      ],
      expanded: true
    },
    {
      id: 'active-workflows',
      name: 'Active Workflows',
      columns: [
        { key: 'id', header: 'Workflow ID', sortable: true },
        { key: 'title', header: 'Workflow Title', sortable: true },
        { key: 'workflow', header: 'Workflow Type', sortable: true },
        { key: 'status', header: 'Status', sortable: true },
        { key: 'documents', header: 'Documents', sortable: true },
        { key: 'priority', header: 'Priority', sortable: true },
        { key: 'assignedTo', header: 'Assigned To', sortable: true },
        { key: 'lastUpdated', header: 'Last Updated', sortable: true }
      ]
    },
    {
      id: 'top-secret-files',
      name: 'Top Secret Files',
      columns: [
        { key: 'id', header: 'Document ID', sortable: true },
        { key: 'title', header: 'Document Title', sortable: true },
        { key: 'classification', header: 'Classification', sortable: true },
        { key: 'department', header: 'Department', sortable: true },
        { key: 'status', header: 'Status', sortable: true },
        { key: 'accessLevel', header: 'Access Level', sortable: true },
        { key: 'clearance', header: 'Clearance', sortable: true },
        { key: 'lastModified', header: 'Last Modified', sortable: true }
      ]
    },
    {
      id: 'departments',
      name: 'Departments',
      columns: [
        { key: 'id', header: 'Department ID', sortable: true },
        { key: 'name', header: 'Department Name', sortable: true },
        { key: 'director', header: 'Director', sortable: true },
        { key: 'documents', header: 'Documents', sortable: true },
        { key: 'activeWorkflows', header: 'Active Workflows', sortable: true },
        { key: 'clearanceLevel', header: 'Clearance Level', sortable: true },
        { key: 'lastActivity', header: 'Last Activity', sortable: true }
      ]
    },
    {
      id: 'security-status',
      name: 'Security Status',
      columns: [
        { key: 'id', header: 'Alert ID', sortable: true },
        { key: 'alertType', header: 'Alert Type', sortable: true },
        { key: 'severity', header: 'Severity', sortable: true },
        { key: 'status', header: 'Status', sortable: true },
        { key: 'department', header: 'Department', sortable: true },
        { key: 'affectedSystems', header: 'Affected Systems', sortable: true },
        { key: 'assignedTo', header: 'Assigned To', sortable: true },
        { key: 'lastUpdated', header: 'Last Updated', sortable: true }
      ]
    }
  ];

  const handleColumnSelectionChange = (columns: string[]) => {
    setSelectedColumns(columns);
  };

  // Get selected column definitions
  const getSelectedColumnDefinitions = () => {
    const selectedDefs: { key: string; header: string; sortable?: boolean }[] = [];
    
    columnGroups.forEach(group => {
      group.columns.forEach(column => {
        if (selectedColumns.includes(column.key)) {
          selectedDefs.push(column);
        }
      });
    });
    
    return selectedDefs;
  };

  const selectedColumnDefinitions = getSelectedColumnDefinitions();

  return (
    <div>
      <DemoNavigation 
        title="Column Selection Tree" 
        breadcrumbPath="ODL Components > Column Selection Tree"
      />
      
      <div style={{ padding: '24px', maxWidth: '100%', margin: '0 auto', overflow: 'hidden' }}>
        <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Column Selection Tree</h1>
            <p className="text-gray-600 mt-1">Select columns from different data sources using the tree interface</p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="folder" className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-semibold text-blue-600">{selectedColumns.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Column Selection Tree */}
          <div>
            <ColumnSelectionTree
              groups={columnGroups}
              selectedColumns={selectedColumns}
              onColumnSelectionChange={handleColumnSelectionChange}
              showIcons={true}
            />
          </div>

          {/* Selected Columns Display */}
          <div className="border border-[#EDF1F5] rounded-lg">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Selected Columns</h3>
              <p className="text-sm text-gray-600 mt-1">
                {selectedColumnDefinitions.length} column{selectedColumnDefinitions.length !== 1 ? 's' : ''} selected
              </p>
            </div>
            
            <div className="p-6">
              {selectedColumnDefinitions.length > 0 ? (
                <div className="space-y-3">
                  {selectedColumnDefinitions.map((column, _index) => (
                    <div key={column.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-700">{column.header}</span>
                        {column.sortable && (
                          <Icon name="sort" className="w-3 h-3 ml-2 text-gray-400" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Key: {column.key}</span>
                        <button
                          onClick={() => {
                            const newSelected = selectedColumns.filter(c => c !== column.key);
                            setSelectedColumns(newSelected);
                          }}
                          className="text-xs text-red-600 hover:text-red-800 transition-colors duration-200"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Icon name="folder" className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No columns selected</p>
                  <p className="text-sm text-gray-400 mt-1">Use the tree to select columns</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="border border-[#EDF1F5] rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">How to Use</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Column Selection</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Click on group names to expand/collapse</li>
                  <li>• Check individual columns to select them</li>
                  <li>• Use "Select All" to select all columns in a group</li>
                  <li>• Sortable columns show a sort icon</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Hierarchical organization by data source</li>
                  <li>• Visual feedback for selected items</li>
                  <li>• Bulk selection/deselection per group</li>
                  <li>• Clear all selection option</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ColumnSelectionDemo; 