import React from 'react';

// Self-contained utility function to replace clsx
const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

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

    return Object.entries(classificationGroups).map(([classification, departments]) => ({
      classification,
      departments: Object.entries(departments).map(([department, count]) => ({
        department,
        count
      })),
      totalCount: Object.values(departments).reduce((sum, count) => sum + count, 0)
    }));
  };

  const treemapData = processData();
  const totalDocuments = treemapData.reduce((sum, item) => sum + item.totalCount, 0);

  const handleNodeClick = (classification?: string, department?: string) => {
    if (onNodeClick) {
      onNodeClick({ classification, department });
    }
  };

  const getColorForClassification = (classification: string) => {
    switch (classification) {
      case 'TOP SECRET':
        return 'bg-red-600';
      case 'SECRET':
        return 'bg-orange-500';
      case 'CONFIDENTIAL':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };


  return (
    <div className="w-full h-64 bg-gray-100 rounded-lg p-4">
      <div className="text-sm font-medium text-gray-700 mb-2">
        Document Distribution ({totalDocuments} total)
      </div>
      <div className="grid grid-cols-3 gap-2 h-48">
        {treemapData.map((item) => (
          <div
            key={item.classification}
            className={classNames(
              'relative rounded-lg p-2 cursor-pointer transition-all duration-200 hover:scale-105',
              getColorForClassification(item.classification)
            )}
            onClick={() => handleNodeClick(item.classification)}
            title={`${item.classification}: ${item.totalCount} documents`}
          >
            <div className="text-white text-xs font-medium mb-1">
              {item.classification}
            </div>
            <div className="text-white text-xs opacity-90">
              {item.totalCount} docs
            </div>
            
            {/* Department breakdown */}
            <div className="mt-2 space-y-1">
              {item.departments.map((dept) => (
                <div
                  key={dept.department}
                  className={classNames(
                    'text-xs text-white opacity-80 cursor-pointer hover:opacity-100 transition-opacity',
                    'px-1 py-0.5 rounded'
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNodeClick(item.classification, dept.department);
                  }}
                  title={`${dept.department}: ${dept.count} documents`}
                >
                  {dept.department}: {dept.count}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="mt-2 flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-600 rounded"></div>
          <span>TOP SECRET</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span>SECRET</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span>CONFIDENTIAL</span>
        </div>
      </div>
    </div>
  );
};

export default DocumentTreemap; 