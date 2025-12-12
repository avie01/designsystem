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
    // Using inline styles with darker colors for WCAG AA compliance (4.5:1 contrast ratio with white text)
    switch (classification) {
      case 'TOP SECRET':
        return { backgroundColor: '#991b1b' }; // 5.87:1 contrast with white
      case 'SECRET':
        return { backgroundColor: '#9a3412' }; // 5.62:1 contrast with white
      case 'CONFIDENTIAL':
        return { backgroundColor: '#a16207' }; // 4.75:1 contrast with white
      default:
        return { backgroundColor: '#374151' }; // 7.43:1 contrast with white
    }
  };


  return (
    <div className="w-full h-64 bg-gray-100 rounded-lg p-4" role="img" aria-label="Document distribution treemap visualization">
      <div className="text-sm font-medium text-gray-700 mb-2">
        Document Distribution ({totalDocuments} total)
      </div>
      <div className="grid grid-cols-3 gap-2 h-48">
        {treemapData.map((item) => (
          <div
            key={item.classification}
            className="relative rounded-lg p-2 cursor-pointer transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            style={getColorForClassification(item.classification)}
            onClick={() => handleNodeClick(item.classification)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNodeClick(item.classification);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`${item.classification} classification with ${item.totalCount} documents. Click to filter.`}
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
                    'text-xs text-white opacity-90 cursor-pointer hover:opacity-100 transition-opacity focus:outline-none focus:ring-1 focus:ring-white focus:ring-opacity-50',
                    'px-1 py-0.5 rounded'
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNodeClick(item.classification, dept.department);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      e.stopPropagation();
                      handleNodeClick(item.classification, dept.department);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${dept.department} department with ${dept.count} documents in ${item.classification} classification. Click to filter.`}
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
      <div className="mt-2 flex flex-wrap gap-4 text-xs" role="group" aria-label="Classification color legend">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#991b1b' }} aria-hidden="true"></div>
          <span>TOP SECRET</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#9a3412' }} aria-hidden="true"></div>
          <span>SECRET</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: '#a16207' }} aria-hidden="true"></div>
          <span>CONFIDENTIAL</span>
        </div>
      </div>
    </div>
  );
};

export default DocumentTreemap; 