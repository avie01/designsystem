import React, { useState } from 'react';
import clsx from 'clsx';
import Icon from '../Icon/Icon';

export interface CardsProps {
  /** Whether the card is selected (checkbox state) */
  selected?: boolean;
  /** Primary text content */
  title?: string;
  /** Secondary text content */
  subtitle?: string;
  /** Tag text to display */
  tag?: string;
  /** Whether to show the information icon */
  showInfoIcon?: boolean;
  /** Whether to show the ellipsis menu icon */
  showMenuIcon?: boolean;
  /** Callback when checkbox is clicked */
  onSelect?: (selected: boolean) => void;
  /** Callback when info icon is clicked */
  onInfoClick?: () => void;
  /** Callback when menu icon is clicked */
  onMenuClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

const Cards: React.FC<CardsProps> = ({
  selected = false,
  title = "Title - h4 - Primary",
  subtitle = "Body - body2 - Secondary",
  tag = "fA7985",
  showInfoIcon = true,
  showMenuIcon = true,
  onSelect,
  onInfoClick,
  onMenuClick,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
      return (
      <div 
        className={clsx('cards-container', className)}
        style={{
          display: 'flex',
          width: '100%',
          padding: '0.75rem 0.5rem 0.75rem 1rem',
          alignItems: 'center',
          gap: '0.75rem',
          backgroundColor: selected ? '#E0F3FE' : isHovered ? '#E8E8E8' : '#ffffff',
          border: isFocused ? '2px solid #3560c1' : '1px solid #e0e0e0',
          borderRadius: '0px',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        tabIndex={0}
      >
      {/* Checkbox */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => onSelect?.(e.target.checked)}
          className="w-4 h-4 text-[#0F62FE] bg-gray-100 border-gray-300 rounded focus:ring-[#0F62FE] focus:ring-2"
          style={{ cursor: 'pointer' }}
        />
      </div>

      {/* Folder Icon */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Icon 
          name="folder" 
          size={24}
          color="#ff8c00"
        />
      </div>

      {/* Text Content */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '2px',
        minWidth: 0,
      }}>
        <div style={{
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#333333',
          lineHeight: '1.2',
        }}>
          {title}
        </div>
        <div style={{
          fontSize: '14px',
          color: '#666666',
          lineHeight: '1.2',
        }}>
          {subtitle}
        </div>
      </div>

      {/* Tag */}
      {tag && (
        <div style={{
          backgroundColor: '#f5f5f5',
          color: '#333333',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '500',
          whiteSpace: 'nowrap',
        }}>
          {tag}
        </div>
      )}

      {/* Information Icon */}
      {showInfoIcon && (
        <div 
          onClick={onInfoClick}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
            color: '#333333',
            transition: 'color 0.2s ease-in-out',
          }}
        >
          <Icon 
            name="information" 
            size={16}
            color="#333333"
          />
        </div>
      )}

      {/* Ellipsis Menu Icon */}
      {showMenuIcon && (
        <div 
          onClick={onMenuClick}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
            color: '#333333',
            transition: 'color 0.2s ease-in-out',
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            alignItems: 'center',
          }}>
            <div style={{
              width: '3px',
              height: '3px',
              backgroundColor: '#333333',
              borderRadius: '50%',
            }} />
            <div style={{
              width: '3px',
              height: '3px',
              backgroundColor: '#333333',
              borderRadius: '50%',
            }} />
            <div style={{
              width: '3px',
              height: '3px',
              backgroundColor: '#333333',
              borderRadius: '50%',
            }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cards; 