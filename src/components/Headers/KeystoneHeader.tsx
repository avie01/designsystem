import React from 'react';
import { Icon } from '../../index';

export interface KeystoneHeaderProps {
  /** Navigation callback */
  onNavigate: (path: string) => void;
  /** Additional CSS classes */
  className?: string;
}

const KeystoneHeader: React.FC<KeystoneHeaderProps> = ({
  onNavigate,
  className = ''
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
              src="/Logos/Objective-Keystone-H.png"
              alt="Keystone"
              className="h-8 w-auto object-contain"
            />
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <span className="text-lg font-semibold text-gray-900">Project Portfolio Management</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700">
            <Icon name="notification" className="w-5 h-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <Icon name="settings" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeystoneHeader; 