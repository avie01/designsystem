import React, { useState } from 'react';
import Icon from './Icon';
import { carbonIcons } from './carbonIconMapping';

interface IconBrowserProps {
  /** Number of icons to show per page */
  perPage?: number;
  /** Whether to show search functionality */
  showSearch?: boolean;
  /** Whether to show category filtering */
  showCategories?: boolean;
}

export const IconBrowser: React.FC<IconBrowserProps> = ({
  perPage = 24,
  showSearch = true,
  showCategories = true,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter icons based on search term and category
  const filteredIcons = carbonIcons.filter(iconName => {
    const matchesSearch = iconName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || iconName.startsWith(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(carbonIcons.map(icon => icon.split('-')[0])))];

  // Paginate results
  const totalPages = Math.ceil(filteredIcons.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentIcons = filteredIcons.slice(startIndex, endIndex);

  return (
    <div className="icon-browser">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Icon Browser</h2>
        <p className="text-gray-600 mb-4">
          Browse {carbonIcons.length} available Carbon icons. Click on an icon to copy its name.
        </p>
        
        <div className="flex flex-wrap gap-4 mb-4">
          {showSearch && (
            <div className="flex-1 min-w-64">
              <input
                type="text"
                placeholder="Search icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          
          {showCategories && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          )}
        </div>
        
        <div className="text-sm text-gray-500">
          Showing {filteredIcons.length} of {carbonIcons.length} icons
        </div>
      </div>

      <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
        {currentIcons.map(iconName => (
          <div
            key={iconName}
            className="text-center p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors"
            onClick={() => {
              navigator.clipboard.writeText(iconName);
              // You could add a toast notification here
            }}
            title={`Click to copy: ${iconName}`}
          >
            <div className="bg-gray-50 p-2 rounded mb-2">
              <Icon name={iconName} className="w-6 h-6 mx-auto" />
            </div>
            <p className="text-xs text-gray-600 truncate">{iconName}</p>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default IconBrowser; 