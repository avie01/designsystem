import { TableRowData } from './common';

export interface LegislationDocument extends TableRowData {
  id: string;
  title: string;
  version: string;
  effectiveDate: string;
  jurisdiction: 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'ACT' | 'NT' | 'Federal';
  documentType: 'building-code' | 'standard' | 'guideline' | 'regulation';
  sections: Section[];
  metadata: {
    lastUpdated: string;
    source: string;
    agency: string;
  };
}

export interface Section {
  id: string;
  sectionNumber: string;
  title: string;
  content: ContentBlock[];
  subsections?: Section[];
  level: number;
}

export interface ContentBlock {
  id: string;
  type: 'paragraph' | 'list' | 'table' | 'note' | 'warning';
  text: string;
  lineNumber: number;
  selectable: boolean;
  metadata?: {
    listType?: 'ordered' | 'unordered';
    emphasis?: 'mandatory' | 'advisory' | 'informative' | 'discretionary' | 'definition';
    clause?: string;
    term?: string;
  };
}