import React from 'react';
import BaseHeader from './BaseHeader';
import { LOGOS } from '../../assets';

export interface ThreeSixtyHeaderProps {
  /** Navigation callback */
  onNavigate: (path: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** User initials for avatar */
  userInitials?: string;
  /** User avatar background color */
  avatarColor?: string;
}

const ThreeSixtyHeader: React.FC<ThreeSixtyHeaderProps> = ({
  onNavigate,
  className = '',
  userInitials = 'MB',
  avatarColor = '#8ccfa1'
}) => {
  return (
    <BaseHeader
      onNavigate={onNavigate}
      className={className}
      logo={LOGOS.THREESIXTY}
      logoAlt="3SIXTY"
      productTitle="Business Management Platform"
      brandColor="#00928f"
      userInitials={userInitials}
      avatarColor={avatarColor}
    />
  );
};

export default ThreeSixtyHeader; 