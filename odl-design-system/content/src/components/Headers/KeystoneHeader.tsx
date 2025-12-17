import React from 'react';
import { Icon, Button } from '../../index';

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
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('/')}
            aria-label="Navigate to Keystone home page"
          >
            <img
              src="/Logos/Objective-Keystone-H.png"
              alt="Keystone"
              className="h-8 w-auto object-contain"
            />
          </Button>
          <div className="h-6 w-px bg-gray-300"></div>
          <span className="text-lg font-semibold text-gray-900">Project Portfolio Management</span>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" aria-label="View notifications">
            <Icon name="notification" size={20} aria-hidden="true" />
          </Button>
          <Button variant="ghost" size="sm" aria-label="Open settings">
            <Icon name="settings" size={20} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KeystoneHeader; 