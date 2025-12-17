import React from 'react';
import { Icon } from '../src';

interface DemoNavigationProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const DemoNavigation: React.FC<DemoNavigationProps> = ({
  title,
  description,
  showBackButton = true,
  onBackClick
}) => {
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      // Default behavior - go back in browser history
      window.history.back();
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button
                onClick={handleBackClick}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <Icon name="arrow-left" className="w-5 h-5" />
                <span className="text-sm font-medium">Back to Home</span>
              </button>
            )}
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Icon name="navigation" className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                {description && (
                  <p className="text-sm text-gray-600">{description}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Icon name="chevron-right" className="w-4 h-4" />
            <span>ODL Components</span>
            <Icon name="chevron-right" className="w-4 h-4" />
            <span className="font-medium text-gray-900">{title}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoNavigation; 