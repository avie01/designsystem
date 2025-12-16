// Checklist and compliance types

export interface ChecklistItem {
  id: string;
  text: string;
  status: 'compliant' | 'non-compliant' | 'not-applicable' | 'pending';
  notes?: string;
  reference?: string;
  content?: string;
  sourceRef?: {
    documentId?: string;
    sectionId?: string;
    blockId?: string;
    category?: string;
    document?: string;
    section?: string;
  };
  type?: string;
  children?: ChecklistItem[];
  order?: number;
  createdAt?: Date;
  createdBy?: string;
}

export interface ComplianceChecklist {
  id: string;
  title: string;
  items: ChecklistItem[];
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Selection {
  id: string;
  text: string;
  startLine: number;
  endLine: number;
  sectionId?: string;
  blockId?: string;
  timestamp: number;
  blocks?: ContentBlock[];
  startBlockId?: string;
}

export interface ContentBlock {
  id: string;
  text: string;
  lineNumber: number;
  type?: string;
  selected?: boolean;
}
