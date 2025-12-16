import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import './CollapsibleCard.css';

export interface CollapsibleCardProps {
  title: string;
  children?: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
  onToggle?: (expanded: boolean) => void;
}

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
  title,
  children,
  defaultExpanded = false,
  className = '',
  onToggle
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    onToggle?.(newExpanded);
  };

  return (
    <div className={`collapsible-card ${expanded ? 'collapsible-card--expanded' : ''} ${className}`}>
      <button 
        className="collapsible-card-header"
        onClick={handleToggle}
        aria-expanded={expanded}
        aria-controls={`collapsible-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <h3 className="collapsible-card-title">{title}</h3>
        <Icon 
          name={expanded ? 'chevron-up' : 'chevron-down'} 
          size={20}
          className="collapsible-card-icon"
        />
      </button>
      
      {expanded && (
        <div 
          className="collapsible-card-content"
          id={`collapsible-content-${title.replace(/\s+/g, '-').toLowerCase()}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleCard;