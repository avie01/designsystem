import React from 'react';
import { Icon } from '../../index';

export interface LayoutSwitcherProps {
  /** Available layouts */
  layouts: Array<{
    id: string;
    name: string;
    description: string;
    layout: 'single' | 'two-column' | 'dashboard';
  }>;
  /** Current active layout ID */
  currentLayoutId: string;
  /** Callback when layout changes */
  onLayoutChange: (layoutId: string) => void;
}

const LayoutSwitcher: React.FC<LayoutSwitcherProps> = ({
  layouts,
  currentLayoutId,
  onLayoutChange,
}) => {
  const getLayoutIcon = (layout: string) => {
    switch (layout) {
      case 'single':
        return 'document';
      case 'two-column':
        return 'grid';
      case 'dashboard':
        return 'dashboard';
      default:
        return 'document';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Page Layout</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {layouts.map((layout) => (
          <button
            key={layout.id}
            onClick={() => onLayoutChange(layout.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              currentLayoutId === layout.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center mb-2">
              <Icon 
                name={getLayoutIcon(layout.layout)} 
                className={`w-5 h-5 mr-2 ${
                  currentLayoutId === layout.id ? 'text-blue-600' : 'text-gray-600'
                }`} 
              />
              <span className={`font-medium ${
                currentLayoutId === layout.id ? 'text-blue-800' : 'text-gray-800'
              }`}>
                {layout.name}
              </span>
            </div>
            <p className={`text-sm ${
              currentLayoutId === layout.id ? 'text-blue-700' : 'text-gray-600'
            }`}>
              {layout.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LayoutSwitcher; 