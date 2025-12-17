import React from 'react';
import { Icon, Button } from '../../index';
// import BuildAULogo from '../../../products/build-au/components/BuildAULogo';

export interface BuildAUHeaderProps {
  /** Navigation callback */
  onNavigate: (path: string) => void;
  /** Additional CSS classes */
  className?: string;
}

const BuildAUHeader: React.FC<BuildAUHeaderProps> = ({

  className = ''
}) => {
  return (
    <div className={`bg-white border-b border-gray-200 px-6 py-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* <BuildAULogo size="medium" onClick={() => onNavigate('/')} /> */}
          <div className="h-8 w-8 bg-gray-300 rounded flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-600">BU</span>
          </div>
          <div className="h-6 w-px bg-gray-300"></div>
          <span className="text-lg font-semibold text-gray-900">Australian Construction Platform</span>
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

export default BuildAUHeader; 