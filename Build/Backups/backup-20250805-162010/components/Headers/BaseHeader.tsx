import React from 'react';
import { Icon } from '../../index';

export interface BaseHeaderProps {
  /** Navigation callback */
  onNavigate: (path: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** Logo source */
  logo: string;
  /** Logo alt text */
  logoAlt: string;
  /** Product title */
  productTitle: string;
  /** Brand color */
  brandColor: string;
  /** User initials for avatar */
  userInitials?: string;
  /** User avatar background color */
  avatarColor?: string;
}

const BaseHeader: React.FC<BaseHeaderProps> = ({
  onNavigate,
  className = '',
  logo,
  logoAlt,
  productTitle,

  userInitials = 'MB',
  avatarColor = '#8ccfa1'
}) => {
  return (
    <div className={`bg-white border-b border-gray-200 px-6 py-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('/')}
          >
            <img
              src={logo}
              alt={logoAlt}
              className="h-8 w-auto object-contain"
            />
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <span className="text-lg font-semibold text-gray-900">{productTitle}</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700">
            <Icon name="notification" className="w-5 h-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <Icon name="settings" className="w-5 h-5" />
          </button>
          <div 
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
            style={{ backgroundColor: avatarColor }}
          >
            {userInitials}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseHeader; 