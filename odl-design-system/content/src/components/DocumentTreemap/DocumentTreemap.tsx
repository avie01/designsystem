import React from 'react';
import './DocumentTreemap.css';

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

  const getClassificationClass = (classification: string): string => {
    switch (classification) {
      case 'TOP SECRET':
        return 'document-treemap__item--top-secret';
      case 'SECRET':
        return 'document-treemap__item--secret';
      case 'CONFIDENTIAL':
        return 'document-treemap__item--confidential';
      default:
        return 'document-treemap__item--default';
    }
  };

  const getLegendColorClass = (classification: string): string => {
    switch (classification) {
      case 'TOP SECRET':
        return 'document-treemap__legend-color--top-secret';
      case 'SECRET':
        return 'document-treemap__legend-color--secret';
      case 'CONFIDENTIAL':
        return 'document-treemap__legend-color--confidential';
      default:
        return '';
    }
  };

  return (
    <div className="document-treemap" role="img" aria-label="Document distribution treemap visualization">
      <div className="document-treemap__title">
        Document Distribution ({totalDocuments} total)
      </div>
      <div className="document-treemap__grid">
        {treemapData.map((item) => (
          <div
            key={item.classification}
            className={classNames(
              'document-treemap__item',
              getClassificationClass(item.classification)
            )}
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
            <div className="document-treemap__classification">
              {item.classification}
            </div>
            <div className="document-treemap__count">
              {item.totalCount} docs
            </div>

            <div className="document-treemap__departments">
              {item.departments.map((dept) => (
                <div
                  key={dept.department}
                  className="document-treemap__department"
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

      <div className="document-treemap__legend" role="group" aria-label="Classification color legend">
        <div className="document-treemap__legend-item">
          <div
            className={classNames('document-treemap__legend-color', getLegendColorClass('TOP SECRET'))}
            aria-hidden="true"
          />
          <span>TOP SECRET</span>
        </div>
        <div className="document-treemap__legend-item">
          <div
            className={classNames('document-treemap__legend-color', getLegendColorClass('SECRET'))}
            aria-hidden="true"
          />
          <span>SECRET</span>
        </div>
        <div className="document-treemap__legend-item">
          <div
            className={classNames('document-treemap__legend-color', getLegendColorClass('CONFIDENTIAL'))}
            aria-hidden="true"
          />
          <span>CONFIDENTIAL</span>
        </div>
      </div>
    </div>
  );
};

export default DocumentTreemap;
