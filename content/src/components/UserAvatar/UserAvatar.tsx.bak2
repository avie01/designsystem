import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import './UserAvatar.css';

// Self-contained utility function to replace clsx
const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export interface UserInfo {
  name: string;
  role?: string;
  department?: string;
  email?: string;
  avatar?: string;
}

export interface UserAvatarProps {
  /** User information to display */
  user: UserInfo;
  /** Size variant - affects avatar dimensions */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show the hover popup with user details */
  showPopup?: boolean;
  /** Whether the avatar is clickable */
  clickable?: boolean;
  /** Disabled state - affects colors and interaction */
  disabled?: boolean;
  /** Error state - uses error styling */
  error?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** ARIA label for screen readers */
  'aria-label'?: string;
  /** ARIA described by for additional context */
  'aria-describedby'?: string;
  /** Click event handler */
  onClick?: () => void;
  /** Keyboard event handlers */
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = 'md',
  showPopup = true,
  clickable = false,
  disabled = false,
  error = false,
  className = "",
  style,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  onClick,
  onKeyDown,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Color palette mapped to ODL chart colors
  const avatarColorVariants = [
    'blue',
    'emerald', 
    'violet',
    'amber',
    'rose',
    'cyan',
    'indigo',
    'lime',
    'fuchsia',
    'orange',
    'teal',
    'sky',
  ];

  const getUserColorVariant = (userName: string) => {
    // Generate consistent color based on user name
    const hash = userName.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return avatarColorVariants[Math.abs(hash) % avatarColorVariants.length];
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
    if (e.key === 'Escape') {
      e.currentTarget.blur();
      setShowTooltip(false);
    }
    
    onKeyDown?.(e);
  };

  const handleClick = () => {
    if (!disabled && clickable && onClick) {
      onClick();
    }
  };

  // Generate component classes
  const avatarClasses = classNames(
    'user-avatar',
    `user-avatar--${size}`,
    `user-avatar--${getUserColorVariant(user.name)}`,
    clickable && 'user-avatar--clickable',
    disabled && 'user-avatar--disabled',
    error && 'user-avatar--error',
    className
  );

  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="user-avatar-container">
      <div
        className={avatarClasses}
        style={style}
        role={clickable ? 'button' : 'img'}
        aria-label={ariaLabel || `${user.name} avatar${clickable ? ', clickable' : ''}`}
        aria-describedby={ariaDescribedBy}
        tabIndex={disabled ? -1 : clickable ? 0 : -1}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => !disabled && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          setShowTooltip(false);
        }}
        title={!showPopup ? user.name : undefined}
      >
        {user.avatar ? (
          <img 
            src={user.avatar} 
            alt={user.name}
            className="user-avatar__image"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {/* Hover Popup */}
      {showPopup && showTooltip && (
        <div 
          className={classNames(
            'user-avatar-tooltip',
            showTooltip && 'user-avatar-tooltip--visible'
          )}
          role="tooltip"
          aria-label={`User details for ${user.name}`}
        >
          <div className="user-avatar-tooltip__content">
            {/* Arrow */}
            <div className="user-avatar-tooltip__arrow"></div>
            
            {/* User Info */}
            <div className="user-avatar-tooltip__header">
              <div className={classNames(
                'user-avatar',
                'user-avatar-tooltip__avatar',
                size === 'sm' ? 'user-avatar--md' : 'user-avatar--lg',
                `user-avatar--${getUserColorVariant(user.name)}`
              )}>
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="user-avatar__image"
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              <div>
                <div className="user-avatar-tooltip__name">{user.name}</div>
                {user.role && (
                  <div className="user-avatar-tooltip__role">{user.role}</div>
                )}
              </div>
            </div>

            {/* Additional Info */}
            {(user.department || user.email) && (
              <div className="user-avatar-tooltip__details">
                {user.department && (
                  <div className="user-avatar-tooltip__detail-item">
                    <Icon name="building" size={16} className="user-avatar-tooltip__detail-icon" />
                    <span>{user.department}</span>
                  </div>
                )}
                {user.email && (
                  <div className="user-avatar-tooltip__detail-item">
                    <Icon name="email" size={16} className="user-avatar-tooltip__detail-icon" />
                    <span>{user.email}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAvatar; 