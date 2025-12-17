import React from 'react';
import BaseHeader from './BaseHeader';
import { LOGOS } from '../../assets';

export interface KeyplanHeaderProps {
  /** Navigation callback */
  onNavigate: (path: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** User initials for avatar */
  userInitials?: string;
  /** User avatar background color */
  avatarColor?: string;
}

const KeyplanHeader: React.FC<KeyplanHeaderProps> = ({
  onNavigate,
  className = '',
  userInitials = 'MB',
  avatarColor = '#8ccfa1'
}) => {
  return (
    <BaseHeader
      onNavigate={onNavigate}
      className={className}
      logo={LOGOS.KEYPLAN}
      logoAlt="Keyplan"
      productTitle="Event Planning Platform"
      brandColor="#00928f"
      userInitials={userInitials}
      avatarColor={avatarColor}
    />
  );
};

export default KeyplanHeader; 