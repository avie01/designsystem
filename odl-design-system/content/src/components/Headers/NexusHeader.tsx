import React from 'react';
import BaseHeader from './BaseHeader';
import { LOGOS } from '../../assets';

export interface NexusHeaderProps {
  /** Navigation callback */
  onNavigate: (path: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** User initials for avatar */
  userInitials?: string;
  /** User avatar background color */
  avatarColor?: string;
}

const NexusHeader: React.FC<NexusHeaderProps> = ({
  onNavigate,
  className = '',
  userInitials = 'MB',
  avatarColor = '#8ccfa1'
}) => {
  return (
    <BaseHeader
      onNavigate={onNavigate}
      className={className}
      logo={LOGOS.NEXUS}
      logoAlt="Nexus"
      productTitle="Data Integration Platform"
      brandColor="#00928f"
      userInitials={userInitials}
      avatarColor={avatarColor}
    />
  );
};

export default NexusHeader; 