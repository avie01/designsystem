import React from 'react';
import BaseHeader from './BaseHeader';
import { LOGOS } from '../../assets';

export interface ConnectHeaderProps {
  /** Navigation callback */
  onNavigate: (path: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** User initials for avatar */
  userInitials?: string;
  /** User avatar background color */
  avatarColor?: string;
}

const ConnectHeader: React.FC<ConnectHeaderProps> = ({
  onNavigate,
  className = '',
  userInitials = 'MB',
  avatarColor = '#8ccfa1'
}) => {
  return (
    <BaseHeader
      onNavigate={onNavigate}
      className={className}
      logo={LOGOS.CONNECT}
      logoAlt="Connect"
      productTitle="Communication Platform"
      brandColor="#00928f"
      userInitials={userInitials}
      avatarColor={avatarColor}
    />
  );
};

export default ConnectHeader; 