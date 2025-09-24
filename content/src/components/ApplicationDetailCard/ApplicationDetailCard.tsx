import React from 'react';
import { colors } from '../../design-system/designTokens';

export interface ApplicationDetailCardProps {
  siteAddress: string;
  reference: string;
  applicant: string;
  owner: string;
  contact: string;
  description: string;
  approver: string;
  className?: string;
}

const ApplicationDetailCard: React.FC<ApplicationDetailCardProps> = ({
  siteAddress,
  reference,
  applicant,
  owner,
  contact,
  description,
  approver,
  className = ''
}) => {
  return (
    <div className={className}>
      <div className="space-y-2">
        <div className="grid gap-2 py-1" style={{ gridTemplateColumns: '140px 1fr' }}>
          <span className="text-sm" style={{ color: colors.secondary }}>Site address</span>
          <span className="text-sm" style={{ color: colors.primary }}>{siteAddress}</span>
        </div>
        
        <div className="grid gap-2 py-1" style={{ gridTemplateColumns: '140px 1fr' }}>
          <span className="text-sm" style={{ color: colors.secondary }}>Reference</span>
          <span className="text-sm" style={{ color: colors.primary }}>{reference}</span>
        </div>
        
        <div className="grid gap-2 py-1" style={{ gridTemplateColumns: '140px 1fr' }}>
          <span className="text-sm" style={{ color: colors.secondary }}>Applicant</span>
          <span className="text-sm" style={{ color: colors.primary }}>{applicant}</span>
        </div>
        
        <div className="grid gap-2 py-1" style={{ gridTemplateColumns: '140px 1fr' }}>
          <span className="text-sm" style={{ color: colors.secondary }}>Owner</span>
          <span className="text-sm" style={{ color: colors.primary }}>{owner}</span>
        </div>
        
        <div className="grid gap-2 py-1" style={{ gridTemplateColumns: '140px 1fr' }}>
          <span className="text-sm" style={{ color: colors.secondary }}>Contact</span>
          <span className="text-sm" style={{ color: colors.primary }}>{contact}</span>
        </div>
        
        <div className="grid gap-2 py-1" style={{ gridTemplateColumns: '140px 1fr' }}>
          <span className="text-sm" style={{ color: colors.secondary }}>Description</span>
          <span className="text-sm" style={{ color: colors.primary }}>{description}</span>
        </div>
        
        <div className="grid gap-2 py-1" style={{ gridTemplateColumns: '140px 1fr' }}>
          <span className="text-sm" style={{ color: colors.secondary }}>Approver</span>
          <span className="text-sm" style={{ color: colors.primary }}>{approver}</span>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailCard;