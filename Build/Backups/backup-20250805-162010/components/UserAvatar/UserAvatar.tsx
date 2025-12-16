import React, { useState } from 'react';
import clsx from 'clsx';

export interface UserInfo {
  name: string;
  role?: string;
  department?: string;
  email?: string;
  avatar?: string;
}

export interface UserAvatarProps {
  user: UserInfo;
  size?: 'small' | 'medium' | 'large';
  showPopup?: boolean;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = 'medium',
  showPopup = true,
  className,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

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

  return (
    <div className="relative inline-block">
      <div
        className={clsx(
          `${getUserColor(user.name)} rounded-full flex items-center justify-center text-white font-normal border-2 border-white shadow-sm hover:scale-110 transition-transform cursor-pointer`,
          sizeClasses[size],
          className
        )}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        title={user.name}
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

      {/* Hover Popup */}
      {showPopup && showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-48">
            {/* Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-200"></div>
            
            {/* User Info */}
            <div className="flex items-center mb-2">
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

            {/* Additional Info */}
            <div className="space-y-1 text-sm">
              {user.department && (
                <div className="flex items-center text-gray-600">
                  <span className="w-4 h-4 mr-2">🏢</span>
                  <span>{user.department}</span>
                </div>
              )}
              {user.email && (
                <div className="flex items-center text-gray-600">
                  <span className="w-4 h-4 mr-2">📧</span>
                  <span>{user.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar; 