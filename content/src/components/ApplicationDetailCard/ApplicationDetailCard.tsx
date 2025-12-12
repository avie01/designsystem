import React from 'react';

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

const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="grid grid-cols-[140px_1fr] gap-2 py-1">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-sm text-gray-900">{value}</span>
  </div>
);

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
        <DetailRow label="Site address" value={siteAddress} />
        <DetailRow label="Reference" value={reference} />
        <DetailRow label="Applicant" value={applicant} />
        <DetailRow label="Owner" value={owner} />
        <DetailRow label="Contact" value={contact} />
        <DetailRow label="Description" value={description} />
        <DetailRow label="Approver" value={approver} />
      </div>
    </div>
  );
};

export default ApplicationDetailCard;
