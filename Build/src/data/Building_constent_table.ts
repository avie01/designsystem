import { TableRowData } from '../types/common';

export interface GovernmentDocument extends TableRowData {
  id: string;
  title: string;
  classification: 'TOP SECRET' | 'SECRET' | 'CONFIDENTIAL' | 'RESTRICTED' | 'UNCLASSIFIED';
  owner: string;
  department: string;
  agency: string;
  status: 'Pending Review' | 'In Review' | 'Approved' | 'Rejected' | 'Pending Approval' | 'Archived' | 'Lodged' | 'Under Review' | 'Issued' | 'In Progress' | 'Final Certificate' | 'Active';
  lastModified: string;
  workflow: string;
  accessLevel: string;
  size: string;
  tags: string[];
  description?: string;
  securityClearance: string;
  retentionPeriod: string;
  lastAccessedBy?: string;
  lastAccessedAt?: string;
}
export const governmentDocuments: GovernmentDocument[] = [
  {
    id: 'BCN-101',
    title: 'Residential New Build – Lodgement',
    classification: 'CONFIDENTIAL',
    owner: 'Sarah Thompson',
    department: 'Planning & Development',
    agency: 'Building Authority',
    status: 'Lodged',
    lastModified: '2025-06-15 09:42',
    workflow: 'Residential Consent',
    size: '3.1 MB',
    tags: ['Residential', 'Lodgement', 'Australia'],
    description: 'Initial lodgement documents for a new residential dwelling in accordance with local council submission requirements.',
    securityClearance: 'Level 2',
    retentionPeriod: '7 years',
    accessLevel: 'Department Access'
  },
  {
    id: 'BCN-102',
    title: 'Commercial Office – Preliminary Assessment',
    classification: 'UNCLASSIFIED',
    owner: 'Daniel Murphy',
    department: 'Planning & Development',
    agency: 'Building Authority',
    status: 'Under Review',
    lastModified: '2025-06-28 14:11',
    workflow: 'Commercial Consent',
    size: '4.9 MB',
    tags: ['Commercial', 'Assessment', 'Australia'],
    description: 'Pre‑assessment documentation for a multi‑storey commercial building, including site analysis and NCC compliance statements.',
    securityClearance: 'Level 1',
    retentionPeriod: '5 years',
    accessLevel: 'Public Access'
  },
  {
    id: 'BCN-103',
    title: 'Industrial Warehouse – Structural Engineering Review',
    classification: 'RESTRICTED',
    owner: 'Rebecca Li',
    department: 'Building Approvals',
    agency: 'Building Authority',
    status: 'In Progress',
    lastModified: '2025-07-05 10:56',
    workflow: 'Industrial Consent',
    size: '6.2 MB',
    tags: ['Industrial', 'Engineering', 'Assessment'],
    description: 'Structural engineering review for steel frame construction in accordance with AS/NZS standards.',
    securityClearance: 'Level 3',
    retentionPeriod: '10 years',
    accessLevel: 'Restricted Access'
  },
  {
    id: 'BCN-104',
    title: 'Residential Alteration – Stage 1 Approval',
    classification: 'UNCLASSIFIED',
    owner: 'Michael Harris',
    department: 'Planning & Development',
    agency: 'Building Authority',
    status: 'Approved',
    lastModified: '2025-07-12 16:24',
    workflow: 'Residential Renovation',
    size: '2.7 MB',
    tags: ['Residential', 'Alteration', 'Stage 1'],
    description: 'Stage 1 approval for alterations to an existing dwelling, including updated floor plans and site works.',
    securityClearance: 'Level 1',
    retentionPeriod: '5 years',
    accessLevel: 'Public Access'
  },
  {
    id: 'BCN-105',
    title: 'Residential New Build – Stage 2 Approval',
    classification: 'UNCLASSIFIED',
    owner: 'James O\'Connor',
    department: 'Planning & Development',
    agency: 'Building Authority',
    status: 'Approved',
    lastModified: '2025-07-18 10:18',
    size: '5.6 MB',
    tags: ['Residential', 'Stage 2', 'Approval'],
    description: 'Approval documentation for Stage 2 of residential building consent, including structural compliance and fire safety measures.',
    securityClearance: 'Level 1',
    retentionPeriod: '5 years',
    accessLevel: 'Public Access',
    workflow: 'Residential Consent'
  },
  {
    id: 'BCN-106',
    title: 'Community Hall – Permit Issuance',
    classification: 'UNCLASSIFIED',
    owner: 'Olivia Bennett',
    department: 'Building Approvals',
    agency: 'Building Authority',
    status: 'Issued',
    lastModified: '2025-07-22 13:03',
    workflow: 'Public Building Consent',
    size: '4.4 MB',
    tags: ['Community', 'Permit', 'Australia'],
    description: 'Issued building permit for community hall redevelopment, ready for commencement of works.',
    securityClearance: 'Level 1',
    retentionPeriod: '5 years',
    accessLevel: 'Public Access'
  },
  {
    id: 'BCN-107',
    title: 'Retail Fit‑Out – On‑Site Inspection',
    classification: 'UNCLASSIFIED',
    owner: 'Ethan Williams',
    department: 'Building Inspections',
    agency: 'Building Authority',
    status: 'In Progress',
    lastModified: '2025-07-26 09:18',
    workflow: 'Retail Consent',
    size: '2.9 MB',
    tags: ['Retail', 'Inspection', 'Australia'],
    description: 'Ongoing compliance inspection for new retail tenancy fit‑out in accordance with NCC requirements.',
    securityClearance: 'Level 2',
    retentionPeriod: '5 years',
    accessLevel: 'Department Access'
  },
  {
    id: 'BCN-108',
    title: 'Apartment Complex – Final Inspection',
    classification: 'CONFIDENTIAL',
    owner: 'Charlotte Davies',
    department: 'Building Inspections',
    agency: 'Building Authority',
    status: 'In Progress',
    lastModified: '2025-07-28 11:27',
    workflow: 'Residential Multi‑Dwelling Consent',
    size: '7.3 MB',
    tags: ['Apartments', 'Inspection', 'Australia'],
    description: 'Final building inspection prior to issuing occupation certificate for multi‑storey apartment complex.',
    securityClearance: 'Level 2',
    retentionPeriod: '7 years',
    accessLevel: 'Department Access'
  },
  {
    id: 'BCN-109',
    title: 'School Upgrade – Occupation Certificate',
    classification: 'UNCLASSIFIED',
    owner: 'Liam Anderson',
    department: 'Building Approvals',
    agency: 'Building Authority',
    status: 'Final Certificate',
    lastModified: '2025-08-01 15:49',
    workflow: 'Educational Facility Consent',
    size: '3.7 MB',
    tags: ['School', 'Occupation Certificate', 'Australia'],
    description: 'Occupation certificate issued for upgraded school facilities following compliance sign‑off.',
    securityClearance: 'Level 1',
    retentionPeriod: '7 years',
    accessLevel: 'Public Access'
  },
  {
    id: 'BCN-110',
    title: 'Hospital Wing Extension – Occupation Certificate',
    classification: 'RESTRICTED',
    owner: 'Amelia Wright',
    department: 'Building Approvals',
    agency: 'Building Authority',
    status: 'Final Certificate',
    lastModified: '2025-08-03 10:05',
    workflow: 'Health Facility Consent',
    size: '8.1 MB',
    tags: ['Hospital', 'Occupation Certificate', 'Australia'],
    description: 'Occupation certificate issued for hospital wing extension following final compliance checks.',
    securityClearance: 'Level 3',
    retentionPeriod: '10 years',
    accessLevel: 'Restricted Access'
  }
];
export const getDocumentStats = () => {
  // Get unique statuses
  const statusCounts = new Map<string, number>();
  const classificationCounts = new Map<string, number>();
  const departmentCounts = new Map<string, number>();
  
  governmentDocuments.forEach(doc => {
    statusCounts.set(doc.status, (statusCounts.get(doc.status) || 0) + 1);
    classificationCounts.set(doc.classification, (classificationCounts.get(doc.classification) || 0) + 1);
    departmentCounts.set(doc.department, (departmentCounts.get(doc.department) || 0) + 1);
  });
  const stats = {
    total: governmentDocuments.length,
    byClassification: Array.from(classificationCounts.entries()).map(([classification, count]) => ({
      classification,
      count
    })),
    byStatus: Array.from(statusCounts.entries()).map(([status, count]) => ({
      status,
      count
    })),
    byDepartment: Array.from(departmentCounts.entries()).map(([department, count]) => ({
      department,
      count
    }))
  };
  return stats;
}; 
