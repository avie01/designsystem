import React from 'react';
import { UserAvatarDropdown, DemoNavigation } from '../index';

const UserAvatarDropdownDemo: React.FC = () => {
  const sampleUsers = [
    {
      name: 'John Smith',
      role: 'Senior Developer',
      department: 'Engineering',
      email: 'john.smith@company.com',
    },
    {
      name: 'Sarah Johnson',
      role: 'Product Manager',
      department: 'Product',
      email: 'sarah.johnson@company.com',
    },
    {
      name: 'Mike Wilson',
      role: 'UX Designer',
      department: 'Design',
      email: 'mike.wilson@company.com',
    },
  ];

  const customDropdownItems = [
    {
      id: 'profile',
      label: 'View Profile',
      icon: 'user',
      onClick: () => {
        alert('Profile clicked!');
      },
    },
    {
      id: 'settings',
      label: 'Account Settings',
      icon: 'settings',
      onClick: () => {
        alert('Settings clicked!');
      },
    },
    {
      id: 'accessibility',
      label: 'Accessibility Options',
      icon: 'accessibility',
      onClick: () => {
        alert('Accessibility clicked!');
      },
    },
    {
      id: 'logout',
      label: 'Sign Out',
      icon: 'logout',
      onClick: () => {
        alert('Logout clicked!');
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DemoNavigation title="UserAvatarDropdown Demo" />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            UserAvatarDropdown Component
          </h1>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Overview
            </h2>
            <p className="text-gray-600 mb-4">
              The UserAvatarDropdown component extends the UserAvatar with dropdown functionality. 
              Click on any avatar to see the dropdown menu with Profile, Settings, and Accessibility options.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Default Dropdown</h3>
                <div className="flex items-center space-x-4">
                  {sampleUsers.map((user, index) => (
                    <div key={index} className="text-center">
                      <UserAvatarDropdown user={user} size="medium" />
                      <p className="text-sm text-gray-600 mt-2">{user.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Custom Dropdown Items</h3>
                <div className="flex items-center space-x-4">
                  {sampleUsers.slice(0, 2).map((user, index) => (
                    <div key={index} className="text-center">
                      <UserAvatarDropdown 
                        user={user} 
                        size="medium"
                        dropdownItems={customDropdownItems}
                      />
                      <p className="text-sm text-gray-600 mt-2">{user.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Different Sizes</h3>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <UserAvatarDropdown user={sampleUsers[0]} size="small" />
                    <p className="text-sm text-gray-600 mt-2">Small</p>
                  </div>
                  <div className="text-center">
                    <UserAvatarDropdown user={sampleUsers[1]} size="medium" />
                    <p className="text-sm text-gray-600 mt-2">Medium</p>
                  </div>
                  <div className="text-center">
                    <UserAvatarDropdown user={sampleUsers[2]} size="large" />
                    <p className="text-sm text-gray-600 mt-2">Large</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Features
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Click to toggle dropdown menu
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Dropdown with 4px border radius and 2px blue border
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                User info section with avatar and details
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Icon-based menu items with hover effects
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Click outside to close dropdown
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Customizable dropdown items
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Multiple size options (small, medium, large)
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Usage Example
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm text-gray-800 overflow-x-auto">
{`import { UserAvatarDropdown } from '../src';

const user = {
  name: 'John Smith',
  role: 'Senior Developer',
  department: 'Engineering',
  email: 'john.smith@company.com',
};

const customItems = [
  {
    id: 'profile',
    label: 'View Profile',
    icon: 'user',
    onClick: () => console.log('Profile clicked'),
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    onClick: () => console.log('Settings clicked'),
  },
  {
    id: 'accessibility',
    label: 'Accessibility',
    icon: 'accessibility',
    onClick: () => console.log('Accessibility clicked'),
  },
];

<UserAvatarDropdown 
  user={user}
  size="medium"
  dropdownItems={customItems}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAvatarDropdownDemo; 