import React from 'react';
import { ODLTheme } from '../../styles/ODLTheme';
import Checkbox from '../Checkbox/Checkbox';
import IconButton from '../IconButton/IconButton';
import FileType, { FileTypeVariant } from '../FileType/FileType';

export type ThumbnailCardSize = 'small' | 'medium' | 'large';

export interface ThumbnailCardsProps {
  /** Size variant of the thumbnail card */
  size?: ThumbnailCardSize;
  /** Thumbnail image source */
  thumbnailSrc?: string;
  /** Title of the card */
  title?: string;
  /** File type for the icon next to title */
  fileType?: FileTypeVariant;
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  /** Whether the card is selected */
  selected?: boolean;
  /** Whether the card is disabled */
  disabled?: boolean;
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Checkbox change handler */
  onCheckboxChange?: (checked: boolean) => void;
  /** Icon name for the ghost icon button */
  iconName?: string;
  /** Icon button click handler */
  onIconClick?: () => void;
}

const ThumbnailCards: React.FC<ThumbnailCardsProps> = ({
  size = 'large',
  thumbnailSrc,
  title = 'Document Title',
  fileType = 'folder',
  className = '',
  onClick,
  selected = false,
  disabled = false,
  checked = false,
  onCheckboxChange,
  iconName = 'overflow-menu-vertical',
  onIconClick,
}) => {
  // Size configurations
  const sizeConfig = {
    small: {
      width: '180px',
      height: '248px',
      padding: '16px',
      gap: '8px',
      thumbnailSize: '148px',
      titleFontSize: '14px',
    },
    medium: {
      width: '226px',
      height: '310px',
      padding: '16px',
      gap: '9px',
      thumbnailSize: '194px',
      titleFontSize: '15px',
    },
    large: {
      width: '272px',
      height: '372px',
      padding: '16px',
      gap: '10px',
      thumbnailSize: '240px',
      titleFontSize: '16px',
    },
  };

  const config = sizeConfig[size];

  const cardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: config.width,
    height: config.height,
    padding: config.padding,
    gap: '4px',
    borderRadius: '4px',
    border: '1px solid #d1d1d1',
    boxShadow: selected ? 'inset 0 0 0 2px #3560C1' : 'none',
    background: disabled 
      ? '#F5F5F5' 
      : selected 
        ? '#E0F3FE'
        : 'var(--paper-obj-white-ff, #FFF)',
    cursor: disabled ? 'not-allowed' : (onClick ? 'pointer' : 'default'),
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
  };

  const hoverStyle: React.CSSProperties = {
    ...cardStyle,
    border: selected 
      ? '2px solid #3560C1' 
      : '1px solid #B0B0B0',
    background: '#e8e8e8',
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const thumbnailStyle: React.CSSProperties = {
    width: config.thumbnailSize,
    height: size === 'small' ? '120px' : size === 'medium' ? '180px' : '240px',
    borderRadius: '4px',
    backgroundColor: '#F0F0F0',
    backgroundImage: thumbnailSrc ? `url(${thumbnailSrc})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    color: '#666',
    marginLeft: '0',
    marginRight: '0',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '4px',
  };

  const imageContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginBottom: '16px',
  };

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    textAlign: 'left',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '16px', // base size
    fontWeight: 500, // medium
    color: disabled ? '#999' : ODLTheme.colors.text.primary,
    margin: 0,
    lineHeight: 1.3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      style={isHovered && !disabled ? hoverStyle : cardStyle}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-label={`${title}${selected ? ', selected' : ''}${disabled ? ', disabled' : ''}`}
      aria-describedby={`thumbnail-${title?.replace(/\s+/g, '-').toLowerCase()}-content`}
    >
      {/* Header with Checkbox and Icon Button */}
      <div style={headerStyle}>
        <Checkbox
          checked={checked || selected}
          onChange={onCheckboxChange}
          disabled={disabled}
          size="lg"
          aria-label={`Select ${title}`}
        />
        <IconButton
          icon={iconName}
          variant="ghost"
          size={size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md'}
          onClick={onIconClick}
          disabled={disabled}
          aria-label={`More options for ${title}`}
        />
      </div>

      {/* Image Container */}
      <div style={imageContainerStyle}>
        <div style={thumbnailStyle}>
          {!thumbnailSrc && (
            <svg 
              width="100%" 
              height="100%" 
              viewBox="0 0 100 100" 
              xmlns="http://www.w3.org/2000/svg"
              style={{ borderRadius: '4px' }}
              role="img"
              aria-label="Document preview"
            >
              <rect width="100" height="100" fill="#F8F9FA"/>
              <rect x="10" y="15" width="80" height="3" fill="#E9ECEF" rx="1"/>
              <rect x="10" y="22" width="70" height="2" fill="#E9ECEF" rx="1"/>
              <rect x="10" y="27" width="75" height="2" fill="#E9ECEF" rx="1"/>
              <rect x="10" y="32" width="65" height="2" fill="#E9ECEF" rx="1"/>
              <rect x="10" y="37" width="80" height="2" fill="#E9ECEF" rx="1"/>
              <rect x="10" y="42" width="60" height="2" fill="#E9ECEF" rx="1"/>
              <rect x="10" y="50" width="75" height="2" fill="#E9ECEF" rx="1"/>
              <rect x="10" y="55" width="70" height="2" fill="#E9ECEF" rx="1"/>
              <rect x="10" y="60" width="65" height="2" fill="#E9ECEF" rx="1"/>
              <rect x="10" y="65" width="80" height="2" fill="#E9ECEF" rx="1"/>
              <rect x="10" y="70" width="55" height="2" fill="#E9ECEF" rx="1"/>
              <rect x="10" y="78" width="30" height="8" fill="#DEE2E6" rx="2"/>
              <rect x="45" y="78" width="25" height="8" fill="#DEE2E6" rx="2"/>
            </svg>
          )}
        </div>
      </div>

      {/* Content Below Image */}
      <div 
        id={`thumbnail-${title?.replace(/\s+/g, '-').toLowerCase()}-content`}
        style={contentStyle}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={onClick && !disabled ? 0 : -1}
        role={onClick ? 'button' : undefined}
        aria-disabled={disabled}
        aria-label={onClick ? `Open ${title}` : undefined}
      >
        <FileType type={fileType} size={24} aria-hidden="true" />
        <h4 style={titleStyle} id={`thumbnail-${title?.replace(/\s+/g, '-').toLowerCase()}-title`}>{title}</h4>
      </div>
    </div>
  );
};

export default ThumbnailCards;