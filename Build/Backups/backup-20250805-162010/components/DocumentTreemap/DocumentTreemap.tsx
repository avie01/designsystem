import React from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';

export interface DocumentTreemapProps {
  data: Array<{
    id: string;
    classification: string;
    department: string;
    status: string;
  }>;
  onNodeClick?: (node: { classification?: string; department?: string }) => void;
}

const DocumentTreemap: React.FC<DocumentTreemapProps> = ({ data, onNodeClick }) => {
  // Process data for treemap
  const processData = () => {
    const classificationGroups: { [key: string]: { [key: string]: number } } = {};
    
    data.forEach(doc => {
      if (!classificationGroups[doc.classification]) {
        classificationGroups[doc.classification] = {};
      }
      if (!classificationGroups[doc.classification][doc.department]) {
        classificationGroups[doc.classification][doc.department] = 0;
      }
      classificationGroups[doc.classification][doc.department]++;
    });

    return {
      name: 'Documents',
      children: Object.entries(classificationGroups).map(([classification, departments]) => ({
        name: classification,
        children: Object.entries(departments).map(([department, count]) => ({
          name: department,
          loc: count
        }))
      }))
    };
  };

  const treemapData = processData();

  const handleNodeClick = (node: any) => {
    if (onNodeClick) {
      // Determine if this is a classification or department node
      const isClassification = node.data.name && ['TOP SECRET', 'SECRET', 'CONFIDENTIAL'].includes(node.data.name);
      const isDepartment = node.data.name && ['Intelligence', 'Defense', 'Finance'].includes(node.data.name);
      
      if (isClassification) {
        onNodeClick({ classification: node.data.name });
      } else if (isDepartment) {
        // Find the parent classification for this department
        const parentClassification = node.parent?.data?.name;
        onNodeClick({ classification: parentClassification, department: node.data.name });
      } else if (node.data.name === 'Documents') {
        // Click on root - clear filters
        onNodeClick({});
      }
    }
  };

  return (
    <div className="w-full h-64">
      <ResponsiveTreeMap
        data={treemapData}
        identity="name"
        value="loc"
        valueFormat=".0f"
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        labelSkipSize={12}
        labelTextColor={{
          from: 'color',
          modifiers: [['darker', 1.2]]
        }}
        parentLabelPosition="top"
        parentLabelTextColor={{
          from: 'color',
          modifiers: [['darker', 2]]
        }}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 0.1]]
        }}
        animate={true}
        onClick={handleNodeClick}
        tooltip={({ node }) => (
          <div className="bg-white px-4 py-1 border border-gray-200 rounded shadow">
            <div className="font-medium text-gray-800 text-sm">{node.data.name}</div>
            <div className="text-xs text-gray-600">{node.value} documents</div>
          </div>
        )}
      />
    </div>
  );
};

export default DocumentTreemap; 