import { TableRowData } from './common';

export interface ChecklistItem extends TableRowData {
  id: string;
  type: 'item' | 'heading' | 'merged';
  content: string;
  status: 'pending' | 'compliant' | 'non-compliant' | 'not-applicable';
  sourceRef: SourceReference;
  notes?: string;
  createdBy: string;
  createdAt: string;
  order: number;
  checkQuestion?: string;
  children?: ChecklistItem[]; // Support for nested checklist items
  isHeaderOnly?: boolean; // When true, acts as section header with no status required
}

export interface SourceReference {
  documentId: string;
  documentTitle: string;
  sectionId: string;
  sectionNumber: string;
  lineNumbers: number[];
  originalText: string;
  clause?: string;
}

export interface ComplianceChecklist extends TableRowData {
  id: string;
  name: string;
  projectId: string;
  bcNumber: string;
  items: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'active' | 'completed' | 'archived';
  owner: string;
  department: string;
}

export interface Selection {
  id: string;
  startLine: number;
  endLine: number;
  text: string;
  sectionId: string;
  blocks: ContentBlock[];
  timestamp: number;
  startBlockId?: string;
  endBlockId?: string;
  range?: {
    startOffset: number;
    endOffset: number;
  };
}

// Re-export ContentBlock for convenience
export type { ContentBlock } from './legislation.types';