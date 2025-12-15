import React from 'react';
import Button from '../../Button/Button';
import './DocumentLibraryCard.css';

export interface DocumentLibraryCardProps {
  title?: string;
  onView?: () => void;
  className?: string;
}

const DocumentLibraryCard: React.FC<DocumentLibraryCardProps> = ({
  title = 'Document library',
  onView,
  className = ''
}) => {
  return (
    <div className={`document-library-card ${className}`}>
      <div className="document-library-header">
        <h3 className="document-library-title">{title}</h3>
        <Button 
          variant="secondary" 
          size="small"
          onClick={onView}
          style={{ height: '32px', borderRadius: '4px' }}
        >
          View
        </Button>
      </div>
    </div>
  );
};

export default DocumentLibraryCard;