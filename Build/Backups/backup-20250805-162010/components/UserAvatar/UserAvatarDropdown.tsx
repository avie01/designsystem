import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import Icon from '../Icon/Icon';
import { useAccessibility } from '../../context/AccessibilityContext';

export interface UserInfo {
  name: string;
  role?: string;
  department?: string;
  email?: string;
  avatar?: string;
}

export interface DropdownItem {
  id: string;
  label: string;
  icon: string;
  onClick: () => void;
}

export interface UserAvatarDropdownProps {
  user: UserInfo;
  size?: 'small' | 'medium' | 'large';
  dropdownItems?: DropdownItem[];
  className?: string;
}

const UserAvatarDropdown: React.FC<UserAvatarDropdownProps> = ({
  user,
  size = 'medium',
  dropdownItems = [],
  className,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openPanel } = useAccessibility();

  // Color palette for different users
  const avatarColors = [
    'bg-[#0F62FE]', // Blue
    'bg-[#FF6B35]', // Orange
    'bg-[#4CAF50]', // Green
    'bg-[#9C27B0]', // Purple
    'bg-[#FF5722]', // Deep Orange
    'bg-[#2196F3]', // Light Blue
    'bg-[#FF9800]', // Amber
    'bg-[#795548]', // Brown
    'bg-[#607D8B]', // Blue Grey
    'bg-[#E91E63]', // Pink
  ];

  const getUserColor = (userName: string) => {
    // Generate consistent color based on user name
    const hash = userName.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return avatarColors[Math.abs(hash) % avatarColors.length];
  };

  const sizeClasses = {
    small: 'w-6 h-6 text-[10px]',
    medium: 'w-8 h-8 text-xs',
    large: 'w-10 h-10 text-sm',
  };

  const initials = user.name.split(' ').map(n => n[0]).join('');

  // Default dropdown items
  const defaultDropdownItems: DropdownItem[] = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'user',
      onClick: () => {
        console.log('Profile clicked');
        setIsDropdownOpen(false);
      },
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings',
      onClick: () => {
        console.log('Settings clicked');
        setIsDropdownOpen(false);
      },
    },
    {
      id: 'accessibility',
      label: 'Accessibility',
      icon: 'accessibility',
      onClick: () => {
        console.log('Accessibility clicked');
        openPanel();
        setIsDropdownOpen(false);
      },
    },
  ];

  const itemsToShow = dropdownItems.length > 0 ? dropdownItems : defaultDropdownItems;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Avatar Button */}
      <div
        className={clsx(
          `${getUserColor(user.name)} rounded-full flex items-center justify-center text-white font-normal border-2 border-white shadow-sm hover:scale-110 transition-transform cursor-pointer`,
          sizeClasses[size],
          className
        )}
        onClick={toggleDropdown}
        title={user.name}
        data-user-avatar="true"
      >
        {user.avatar ? (
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          initials
        )}
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 z-50">
          <div 
            className="bg-white border-2 border-[#0F62FE] rounded-[4px] shadow-lg min-w-56 py-1"
            style={{ borderRadius: '4px' }}
          >
            {/* User Info Section */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center">
                <div className={clsx(
                  `${getUserColor(user.name)} rounded-full flex items-center justify-center text-white font-normal mr-3`,
                  size === 'small' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm'
                )}>
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{user.name}</div>
                  {user.role && (
                    <div className="text-sm text-gray-600">{user.role}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Dropdown Items */}
            <div className="py-1">
              {itemsToShow.map((item) => (
                <button
                  key={item.id}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
                  onClick={item.onClick}
                >
                  <Icon 
                    name={item.icon} 
                    size="small" 
                    className="text-gray-500"
                    style={{ marginRight: '16px' }}
                  />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatarDropdown; 