# Compliance Checklist Builder - Complete Implementation for Claude Code

## PROJECT: NSW Council Planning Officer Compliance Checklist Builder
**Location**: `/Users/andrewk/Documents/ODL-Library/Isovist/`
**Integration**: Isovist React/TypeScript application with ODL components

## OBJECTIVE
Build a compliance checklist system where planning officers can:
1. View NSW legislation documents (starting with Housing SEPP 2021)
2. Select text from legislation using mouse
3. Press keyboard shortcuts (C, H, M) to create checklist items
4. Export checklists for building consent applications

## IMPLEMENTATION INSTRUCTIONS

### Phase 1: Create File Structure

Create the following files in the Isovist project:

```
/Users/andrewk/Documents/ODL-Library/Isovist/src/
├── pages/admin/
│   └── ComplianceChecklistPage.tsx
├── components/ComplianceChecklist/
│   ├── DocumentViewer/
│   │   ├── DocumentViewer.tsx
│   │   └── DocumentViewer.css
│   ├── ChecklistBuilder/
│   │   └── ChecklistTable.tsx
│   └── SelectionControls/
│       └── KeyboardIndicator.tsx
├── hooks/
│   ├── useTextSelection.ts
│   └── useChecklistBuilder.ts
├── types/
│   ├── legislation.types.ts
│   └── checklist.types.ts
├── services/
│   └── legislationService.ts
└── data/demo-legislation/
    └── nsw-housing-sepp-2021.json
```

### Phase 2: Create Type Definitions

#### File: `src/types/legislation.types.ts`
```typescript
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
```

#### File: `src/types/checklist.types.ts`
```typescript
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
}
```

### Phase 3: Create Demo Data

#### File: `src/data/demo-legislation/nsw-housing-sepp-2021.json`
Copy the JSON content from the artifact "nsw-housing-sepp-demo-content" into this file.

### Phase 4: Create Custom Hooks

#### File: `src/hooks/useTextSelection.ts`
```typescript
import { useState, useCallback, useEffect } from 'react';
import { Selection, ContentBlock } from '../types';

export const useTextSelection = () => {
  const [selections, setSelections] = useState<Selection[]>([]);
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') setIsShiftPressed(true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') setIsShiftPressed(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleSelection = useCallback((event: React.MouseEvent) => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const text = selection.toString().trim();
    if (!text) return;

    const range = selection.getRangeAt(0);
    const startElement = range.startContainer.parentElement;
    const endElement = range.endContainer.parentElement;
    
    const newSelection: Selection = {
      id: `sel-${Date.now()}-${Math.random()}`,
      text,
      startLine: parseInt(startElement?.dataset.lineNumber || '0'),
      endLine: parseInt(endElement?.dataset.lineNumber || '0'),
      sectionId: startElement?.closest('[data-section-id]')?.getAttribute('data-section-id') || '',
      blocks: [],
      timestamp: Date.now()
    };

    if (isShiftPressed) {
      setSelections(prev => [...prev, newSelection]);
    } else {
      setSelections([newSelection]);
    }

    selection.removeAllRanges();
  }, [isShiftPressed]);

  const mergeSelections = useCallback((): Selection | null => {
    if (selections.length < 2) return selections[0] || null;

    const sorted = [...selections].sort((a, b) => a.timestamp - b.timestamp);
    
    return {
      id: `merged-${Date.now()}`,
      text: sorted.map(s => s.text).join('\n'),
      startLine: Math.min(...sorted.map(s => s.startLine)),
      endLine: Math.max(...sorted.map(s => s.endLine)),
      sectionId: sorted[0].sectionId,
      blocks: sorted.flatMap(s => s.blocks),
      timestamp: Date.now()
    };
  }, [selections]);

  const clearSelections = useCallback(() => {
    setSelections([]);
  }, []);

  return {
    selections,
    handleSelection,
    mergeSelections,
    clearSelections,
    isMultiSelect: isShiftPressed
  };
};
```

#### File: `src/hooks/useChecklistBuilder.ts`
```typescript
import { useState, useCallback, useEffect } from 'react';
import { ChecklistItem, ComplianceChecklist, Selection } from '../types';

export const useChecklistBuilder = (bcNumber?: string) => {
  const [checklist, setChecklist] = useState<ComplianceChecklist>({
    id: `checklist-${Date.now()}`,
    name: `Compliance Checklist - ${bcNumber || 'Draft'}`,
    projectId: '',
    bcNumber: bcNumber || '',
    items: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draft',
    owner: 'Current User',
    department: 'Planning & Development'
  });

  useEffect(() => {
    if (bcNumber) {
      const savedChecklist = localStorage.getItem(`checklist-${bcNumber}`);
      if (savedChecklist) {
        try {
          setChecklist(JSON.parse(savedChecklist));
        } catch (error) {
          console.error('Error loading saved checklist:', error);
        }
      }
    }
  }, [bcNumber]);

  const addItem = useCallback((item: ChecklistItem) => {
    setChecklist(prev => ({
      ...prev,
      items: [...prev.items, { ...item, order: prev.items.length }],
      updatedAt: new Date().toISOString()
    }));
  }, []);

  const updateItem = useCallback((itemId: string, updates: Partial<ChecklistItem>) => {
    setChecklist(prev => ({
      ...prev,
      items: prev.items.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      ),
      updatedAt: new Date().toISOString()
    }));
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setChecklist(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId),
      updatedAt: new Date().toISOString()
    }));
  }, []);

  const saveChecklist = useCallback(() => {
    if (bcNumber) {
      localStorage.setItem(`checklist-${bcNumber}`, JSON.stringify(checklist));
      console.log('Checklist saved:', checklist);
    }
  }, [checklist, bcNumber]);

  const exportChecklist = useCallback((format: 'pdf' | 'excel' | 'json') => {
    switch (format) {
      case 'json':
        const dataStr = JSON.stringify(checklist, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = `checklist-${bcNumber}-${Date.now()}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        break;
        
      case 'pdf':
        alert('PDF export would be implemented with jsPDF library');
        break;
        
      case 'excel':
        alert('Excel export would be implemented with SheetJS library');
        break;
    }
  }, [checklist, bcNumber]);

  return {
    checklist,
    addItem,
    updateItem,
    removeItem,
    saveChecklist,
    exportChecklist
  };
};
```

### Phase 5: Create Services

#### File: `src/services/legislationService.ts`
```typescript
import { LegislationDocument } from '../types';
import legislationData from '../data/demo-legislation/nsw-housing-sepp-2021.json';

class LegislationService {
  async loadDocument(documentId: string): Promise<LegislationDocument> {
    // In production, this would fetch from an API
    // For demo, we're using local JSON
    return legislationData as LegislationDocument;
  }

  async listAvailableDocuments(): Promise<Array<{id: string, title: string}>> {
    return [
      { id: 'nsw-sepp-housing-2021', title: 'State Environmental Planning Policy (Housing) 2021' },
      { id: 'building-code-2024', title: 'National Construction Code 2024' },
      { id: 'fire-safety-standards', title: 'Fire Safety Standards' },
      { id: 'accessibility-requirements', title: 'Accessibility Requirements' }
    ];
  }

  getSectionById(document: LegislationDocument, sectionId: string): any {
    const findSection = (sections: any[], id: string): any => {
      for (const section of sections) {
        if (section.id === id) return section;
        if (section.subsections) {
          const found = findSection(section.subsections, id);
          if (found) return found;
        }
      }
      return null;
    };
    return findSection(document.sections, sectionId);
  }
}

export const legislationService = new LegislationService();
```

### Phase 6: Create Components

#### File: `src/components/ComplianceChecklist/DocumentViewer/DocumentViewer.tsx`
```typescript
import React, { useRef, useEffect } from 'react';
import { LegislationDocument, Section, ContentBlock, Selection } from '../../../types';
import ODLTheme from '../../../styles/ODLTheme';
import { colors } from '../../../design-system/designTokens';
import './DocumentViewer.css';

interface Props {
  document: LegislationDocument | null;
  selections: Selection[];
  onSelection: (event: React.MouseEvent) => void;
  selectedSection: string | null;
}

export const DocumentViewer: React.FC<Props> = ({ 
  document, 
  selections, 
  onSelection,
  selectedSection 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedSection && containerRef.current) {
      const element = containerRef.current.querySelector(`[data-section-id="${selectedSection}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedSection]);

  if (!document) {
    return (
      <div className="flex items-center justify-center h-64">
        <p style={{ color: colors.secondary }}>Loading document...</p>
      </div>
    );
  }

  const isTextSelected = (text: string) => {
    return selections.some(sel => sel.text.includes(text) || text.includes(sel.text));
  };

  const renderContentBlock = (block: ContentBlock, sectionId: string) => {
    const isSelected = isTextSelected(block.text);
    const emphasisClass = block.metadata?.emphasis ? `emphasis-${block.metadata.emphasis}` : '';
    
    return (
      <div
        key={block.id}
        className={`content-block ${block.type} ${emphasisClass} ${isSelected ? 'selected' : ''}`}
        data-line-number={block.lineNumber}
        data-block-id={block.id}
        data-section-id={sectionId}
        style={{
          padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`,
          borderRadius: ODLTheme.spacing[1],
          backgroundColor: isSelected ? `${ODLTheme.colors.primary}10` : 'transparent',
          borderLeft: isSelected ? `3px solid ${ODLTheme.colors.primary}` : '3px solid transparent',
          cursor: block.selectable ? 'text' : 'default',
          marginBottom: ODLTheme.spacing[1],
          transition: ODLTheme.transitions.base
        }}
      >
        <span className="line-number" style={{ 
          color: colors.secondary,
          fontSize: ODLTheme.typography.fontSize.xs,
          marginRight: ODLTheme.spacing[3],
          minWidth: '30px',
          display: 'inline-block'
        }}>
          {block.lineNumber}
        </span>
        
        {block.metadata?.clause && (
          <span className="clause-ref" style={{
            color: ODLTheme.colors.primary,
            fontWeight: ODLTheme.typography.fontWeight.semibold,
            marginRight: ODLTheme.spacing[2]
          }}>
            [{block.metadata.clause}]
          </span>
        )}
        
        <span className="content-text" style={{
          color: block.type === 'note' ? colors.secondary : colors.text.primary
        }}>
          {block.text}
        </span>
        
        {block.type === 'note' && (
          <span style={{
            marginLeft: ODLTheme.spacing[2],
            padding: `0 ${ODLTheme.spacing[2]}`,
            backgroundColor: colors.backgroundGray,
            borderRadius: ODLTheme.spacing[1],
            fontSize: ODLTheme.typography.fontSize.xs,
            color: colors.secondary
          }}>
            NOTE
          </span>
        )}
      </div>
    );
  };

  const renderSection = (section: Section, level: number = 0) => {
    const isCurrentSection = section.id === selectedSection;
    
    return (
      <div
        key={section.id}
        className={`document-section level-${level}`}
        data-section-id={section.id}
        style={{
          marginBottom: ODLTheme.spacing[6],
          paddingLeft: isCurrentSection ? ODLTheme.spacing[3] : ODLTheme.spacing[4] * level,
          borderLeft: isCurrentSection ? `3px solid ${ODLTheme.colors.primary}` : 'none'
        }}
      >
        <h3 style={{
          fontSize: level === 0 ? ODLTheme.typography.fontSize.xl : 
                   level === 1 ? ODLTheme.typography.fontSize.lg : 
                   level === 2 ? ODLTheme.typography.fontSize.base :
                   ODLTheme.typography.fontSize.sm,
          fontWeight: ODLTheme.typography.fontWeight.semibold,
          color: colors.primary,
          marginBottom: ODLTheme.spacing[3]
        }}>
          {section.sectionNumber} {section.title}
        </h3>
        
        {section.content.map(block => renderContentBlock(block, section.id))}
        
        {section.subsections?.map(subsection => renderSection(subsection, level + 1))}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="document-viewer"
      onMouseUp={onSelection}
      style={{
        fontFamily: ODLTheme.typography.fontFamily,
        fontSize: ODLTheme.typography.fontSize.base,
        lineHeight: 1.6,
        color: colors.primary,
        userSelect: 'text'
      }}
    >
      {document.sections.map(section => renderSection(section))}
    </div>
  );
};
```

#### File: `src/components/ComplianceChecklist/DocumentViewer/DocumentViewer.css`
```css
.document-viewer {
  max-height: calc(100vh - 300px);
  overflow-y: auto;
  padding: 16px;
}

.content-block {
  position: relative;
  margin-bottom: 8px;
}

.content-block.selected {
  background-color: rgba(59, 130, 246, 0.1);
  border-left: 3px solid #3B82F6;
}

.content-block.note {
  font-style: italic;
  opacity: 0.8;
}

.content-block.list {
  padding-left: 20px;
}

.emphasis-mandatory {
  font-weight: 600;
}

.emphasis-discretionary {
  font-style: italic;
}

.emphasis-definition {
  background-color: rgba(251, 191, 36, 0.1);
  padding: 2px 4px;
  border-radius: 2px;
}

.line-number {
  user-select: none;
}

.document-section {
  margin-bottom: 24px;
}

.document-section.level-0 {
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 16px;
}
```

#### File: `src/components/ComplianceChecklist/ChecklistBuilder/ChecklistTable.tsx`
```typescript
import React, { useState } from 'react';
import Table from '../../Table/Table';
import Icon from '../../Icon/Icon';
import Chip from '../../Chip/Chip';
import { ChecklistItem } from '../../../types';
import ODLTheme from '../../../styles/ODLTheme';
import { colors, statusColors } from '../../../design-system/designTokens';

interface Props {
  items: ChecklistItem[];
  onUpdateItem: (id: string, updates: Partial<ChecklistItem>) => void;
  onRemoveItem: (id: string) => void;
  compact?: boolean;
  showActions?: boolean;
  editable?: boolean;
}

export const ChecklistTable: React.FC<Props> = ({
  items,
  onUpdateItem,
  onRemoveItem,
  compact = false,
  showActions = false,
  editable = false
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const statusOptions: Array<ChecklistItem['status']> = [
    'pending', 'compliant', 'non-compliant', 'not-applicable'
  ];

  const getStatusColor = (status: ChecklistItem['status']) => {
    const colorMap = {
      'pending': { bg: statusColors.mango, text: 'black' },
      'compliant': { bg: statusColors.lime, text: 'black' },
      'non-compliant': { bg: statusColors.raspberry, text: 'white' },
      'not-applicable': { bg: statusColors.nutmeg, text: 'white' }
    };
    return colorMap[status];
  };

  const columns = [
    {
      key: 'type',
      label: 'Type',
      width: '10%',
      render: (item: ChecklistItem) => (
        <Chip
          label={item.type}
          variant={item.type === 'heading' ? 'blue' : 'grey'}
          size="small"
        />
      )
    },
    {
      key: 'content',
      label: 'Requirement',
      width: compact ? '50%' : '40%',
      render: (item: ChecklistItem) => {
        if (editable && editingId === item.id) {
          return (
            <textarea
              className="w-full p-2 border rounded"
              value={item.content}
              onChange={(e) => onUpdateItem(item.id, { content: e.target.value })}
              rows={3}
              style={{
                fontSize: ODLTheme.typography.fontSize.sm,
                fontFamily: ODLTheme.typography.fontFamily
              }}
            />
          );
        }
        return (
          <div>
            <p style={{ 
              fontSize: ODLTheme.typography.fontSize.sm,
              color: item.type === 'heading' ? colors.primary : colors.text.primary,
              fontWeight: item.type === 'heading' ? ODLTheme.typography.fontWeight.semibold : 'normal'
            }}>
              {item.content}
            </p>
            {!compact && item.sourceRef?.clause && (
              <p style={{ 
                fontSize: ODLTheme.typography.fontSize.xs, 
                color: colors.secondary,
                marginTop: ODLTheme.spacing[1]
              }}>
                Ref: {item.sourceRef.clause} | Lines {item.sourceRef.lineNumbers.join('-')}
              </p>
            )}
          </div>
        );
      }
    },
    {
      key: 'status',
      label: 'Status',
      width: '15%',
      render: (item: ChecklistItem) => {
        if (editable) {
          return (
            <select
              value={item.status}
              onChange={(e) => onUpdateItem(item.id, { 
                status: e.target.value as ChecklistItem['status'] 
              })}
              className="px-2 py-1 border rounded text-sm"
              style={{
                backgroundColor: getStatusColor(item.status).bg,
                color: getStatusColor(item.status).text
              }}
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                </option>
              ))}
            </select>
          );
        }
        const statusColor = getStatusColor(item.status);
        return (
          <span
            className="px-2 py-1 rounded text-xs"
            style={{
              backgroundColor: statusColor.bg,
              color: statusColor.text
            }}
          >
            {item.status.replace('-', ' ')}
          </span>
        );
      }
    }
  ];

  if (!compact) {
    columns.push({
      key: 'notes',
      label: 'Notes',
      width: '20%',
      render: (item: ChecklistItem) => {
        if (editable && editingId === item.id) {
          return (
            <textarea
              className="w-full p-2 border rounded"
              value={item.notes || ''}
              onChange={(e) => onUpdateItem(item.id, { notes: e.target.value })}
              placeholder="Add notes..."
              rows={2}
              style={{
                fontSize: ODLTheme.typography.fontSize.sm,
                fontFamily: ODLTheme.typography.fontFamily
              }}
            />
          );
        }
        return (
          <p style={{ 
            fontSize: ODLTheme.typography.fontSize.sm,
            color: colors.secondary 
          }}>
            {item.notes || '-'}
          </p>
        );
      }
    });
  }

  if (showActions) {
    columns.push({
      key: 'actions',
      label: 'Actions',
      width: '15%',
      render: (item: ChecklistItem) => (
        <div className="flex gap-2">
          {editable && (
            <button
              onClick={() => setEditingId(editingId === item.id ? null : item.id)}
              className="p-1 hover:bg-gray-100 rounded"
              title={editingId === item.id ? "Save" : "Edit"}
            >
              <Icon 
                name={editingId === item.id ? "checkmark" : "edit"} 
                size={16} 
              />
            </button>
          )}
          <button
            onClick={() => {
              if (confirm('Remove this item from the checklist?')) {
                onRemoveItem(item.id);
              }
            }}
            className="p-1 hover:bg-red-50 rounded text-red-600"
            title="Remove"
          >
            <Icon name="trash-can" size={16} />
          </button>
        </div>
      )
    });
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Icon name="document" size={48} />
        <p className="mt-2">No checklist items yet</p>
        <p className="text-sm mt-1">Select text from the document and press:</p>
        <div className="flex justify-center gap-2 mt-2">
          <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">C</kbd>
          <span className="text-xs">for item</span>
          <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">H</kbd>
          <span className="text-xs">for heading</span>
          <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">M</kbd>
          <span className="text-xs">to merge</span>
        </div>
      </div>
    );
  }

  return (
    <Table
      data={items}
      columns={columns}
      pageSize={compact ? 5 : 10}
      paginated={!compact}
      striped={true}
      hoverable={true}
      compact={compact}
    />
  );
};
```

#### File: `src/components/ComplianceChecklist/SelectionControls/KeyboardIndicator.tsx`
```typescript
import React from 'react';
import Icon from '../../Icon/Icon';
import ODLTheme from '../../../styles/ODLTheme';

interface Props {
  selections: any[];
}

export const KeyboardIndicator: React.FC<Props> = ({ selections }) => {
  if (selections.length === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="information" size={16} />
          <span className="font-medium text-blue-700">
            {selections.length} selection{selections.length > 1 ? 's' : ''} active
          </span>
        </div>
        <div className="flex gap-3 text-xs">
          <span className="px-2 py-1 bg-white rounded border border-gray-300">
            Press <kbd className="font-bold">C</kbd> for Item
          </span>
          <span className="px-2 py-1 bg-white rounded border border-gray-300">
            Press <kbd className="font-bold">H</kbd> for Heading
          </span>
          {selections.length > 1 && (
            <span className="px-2 py-1 bg-white rounded border border-gray-300">
              Press <kbd className="font-bold">M</kbd> to Merge
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
```

### Phase 7: Create Main Page

#### File: `src/pages/admin/ComplianceChecklistPage.tsx`
```typescript
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Table from '../../components/Table/Table';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import Tabs from '../../components/Tabs/Tabs';
import { DocumentViewer } from '../../components/ComplianceChecklist/DocumentViewer/DocumentViewer';
import { ChecklistTable } from '../../components/ComplianceChecklist/ChecklistBuilder/ChecklistTable';
import { KeyboardIndicator } from '../../components/ComplianceChecklist/SelectionControls/KeyboardIndicator';
import { useChecklistBuilder } from '../../hooks/useChecklistBuilder';
import { useTextSelection } from '../../hooks/useTextSelection';
import { legislationService } from '../../services/legislationService';
import { LegislationDocument, ChecklistItem } from '../../types';
import ODLTheme from '../../styles/ODLTheme';
import { colors, spacing, borderRadius } from '../../design-system/designTokens';

const ComplianceChecklistPage: React.FC = () => {
  const { bcNumber } = useParams<{ bcNumber: string }>();
  const navigate = useNavigate();
  
  const [activeDocument, setActiveDocument] = useState<LegislationDocument | null>(null);
  const [activeTab, setActiveTab] = useState<'document' | 'checklist' | 'review'>('document');
  const [showTOC, setShowTOC] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  
  const { 
    checklist, 
    addItem, 
    updateItem, 
    removeItem,
    exportChecklist,
    saveChecklist 
  } = useChecklistBuilder(bcNumber);
  
  const {
    selections,
    handleSelection,
    mergeSelections,
    clearSelections
  } = useTextSelection();

  // Load document
  useEffect(() => {
    legislationService.loadDocument('nsw-sepp-housing-2021').then(setActiveDocument);
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      const key = event.key.toLowerCase();
      
      switch(key) {
        case 'c':
          if (selections.length > 0) {
            event.preventDefault();
            handleCreateChecklistItem('item');
          }
          break;
        case 'h':
          if (selections.length > 0) {
            event.preventDefault();
            handleCreateChecklistItem('heading');
          }
          break;
        case 'm':
          if (selections.length > 1) {
            event.preventDefault();
            handleMergeSelections();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selections]);

  const handleCreateChecklistItem = useCallback((type: 'item' | 'heading' | 'merged') => {
    if (!activeDocument || selections.length === 0) return;

    const selection = selections[0];
    const section = legislationService.getSectionById(activeDocument, selection.sectionId);
    
    const newItem: ChecklistItem = {
      id: `item-${Date.now()}`,
      type,
      content: selection.text,
      status: 'pending',
      sourceRef: {
        documentId: activeDocument.id,
        documentTitle: activeDocument.title,
        sectionId: selection.sectionId,
        sectionNumber: section?.sectionNumber || '',
        lineNumbers: [selection.startLine, selection.endLine],
        originalText: selection.text,
      },
      createdBy: 'Current User',
      createdAt: new Date().toISOString(),
      order: checklist.items.length
    };

    addItem(newItem);
    clearSelections();
  }, [activeDocument, selections, checklist.items.length, addItem, clearSelections]);

  const handleMergeSelections = useCallback(() => {
    const merged = mergeSelections();
    if (merged) {
      handleCreateChecklistItem('merged');
    }
  }, [mergeSelections, handleCreateChecklistItem]);

  const tabItems = [
    { id: 'document', label: 'Document View', icon: 'document' },
    { id: 'checklist', label: `Checklist (${checklist.items.length})`, icon: 'list' },
    { id: 'review', label: 'Review & Export', icon: 'checkmark' }
  ];

  const styles = {
    container: {
      backgroundColor: colors.backgroundGray,
      padding: spacing.md,
      minHeight: 'calc(100vh - 120px)'
    },
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: showTOC ? '250px 1fr 350px' : '1fr 350px',
      gap: spacing.md,
      height: 'calc(100vh - 200px)'
    },
    panel: {
      backgroundColor: colors.backgroundWhite,
      borderRadius: borderRadius.md,
      padding: spacing.md,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      overflow: 'auto'
    }
  };

  const renderTableOfContents = () => {
    if (!activeDocument) return null;

    const renderSection = (section: any, level: number = 0) => (
      <div key={section.id}>
        <button
          className={`w-full text-left py-1 px-2 hover:bg-gray-100 rounded text-sm ${
            selectedSection === section.id ? 'bg-blue-50 text-blue-600' : ''
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
          onClick={() => setSelectedSection(section.id)}
        >
          {section.sectionNumber} {section.title}
        </button>
        {section.subsections?.map((sub: any) => renderSection(sub, level + 1))}
      </div>
    );

    return (
      <div className="space-y-1">
        {activeDocument.sections.map(section => renderSection(section))}
      </div>
    );
  };

  return (
    <div className="w-full">
      <header className="flex items-center gap-4 mb-4">
        <button
          onClick={() => navigate('/applications')}
          className="p-2 hover:bg-gray-100 rounded transition-colors"
        >
          <Icon name="arrow-left" size={20} />
        </button>
        <div>
          <nav className="flex items-center gap-2 text-xs mb-1" style={{ color: colors.secondary }}>
            <button className="cursor-pointer hover:opacity-80" onClick={() => navigate('/')}>
              Objective Build
            </button>
            <Icon name="chevron-right" size={12} />
            <button className="cursor-pointer hover:opacity-80" onClick={() => navigate('/applications')}>
              Applications
            </button>
            <Icon name="chevron-right" size={12} />
            <span>{bcNumber || 'New'}</span>
            <Icon name="chevron-right" size={12} />
            <span>Compliance Checklist</span>
          </nav>
          <h1 className="text-lg font-semibold" style={{ color: colors.primary }}>
            Compliance Checklist Builder
          </h1>
          <p className="text-sm mt-1" style={{ color: colors.secondary }}>
            {bcNumber ? `Building Consent: ${bcNumber}` : 'New Checklist'}
          </p>
        </div>
      </header>

      <div className="mb-4">
        <Tabs
          tabs={tabItems}
          activeTab={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId as any)}
          showContent={false}
        />
      </div>

      <main style={styles.container}>
        {activeTab === 'document' && (
          <div style={styles.mainGrid}>
            {showTOC && (
              <aside style={styles.panel}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold" style={{ color: colors.primary }}>
                    Table of Contents
                  </h2>
                  <button
                    onClick={() => setShowTOC(false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Icon name="close" size={16} />
                  </button>
                </div>
                {renderTableOfContents()}
              </aside>
            )}

            <section style={styles.panel}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold" style={{ color: colors.primary }}>
                  {activeDocument?.title || 'Loading...'}
                </h2>
                <div className="flex gap-2">
                  {!showTOC && (
                    <button
                      onClick={() => setShowTOC(true)}
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      <Icon name="list" size={20} />
                    </button>
                  )}
                </div>
              </div>
              
              <KeyboardIndicator selections={selections} />
              
              <DocumentViewer
                document={activeDocument}
                selections={selections}
                onSelection={handleSelection}
                selectedSection={selectedSection}
              />
            </section>

            <aside style={styles.panel}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold" style={{ color: colors.primary }}>
                  Checklist Items ({checklist.items.length})
                </h2>
                <button
                  onClick={() => setActiveTab('checklist')}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  View All
                </button>
              </div>
              <ChecklistTable
                items={checklist.items}
                onUpdateItem={updateItem}
                onRemoveItem={removeItem}
                compact={true}
              />
            </aside>
          </div>
        )}

        {activeTab === 'checklist' && (
          <div style={styles.panel}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold" style={{ color: colors.primary }}>
                Compliance Checklist
              </h2>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => saveChecklist()}
                >
                  <Icon name="save" size={16} />
                  Save Draft
                </Button>
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => exportChecklist('json')}
                >
                  <Icon name="download" size={16} />
                  Export
                </Button>
              </div>
            </div>
            <ChecklistTable
              items={checklist.items}
              onUpdateItem={updateItem}
              onRemoveItem={removeItem}
              showActions={true}
              editable={true}
            />
          </div>
        )}

        {activeTab === 'review' && (
          <div style={styles.panel}>
            <h2 className="text-lg font-semibold mb-4" style={{ color: colors.primary }}>
              Review & Export
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <Button variant="secondary" onClick={() => exportChecklist('pdf')}>
                <Icon name="document" size={20} />
                Export as PDF
              </Button>
              <Button variant="secondary" onClick={() => exportChecklist('excel')}>
                <Icon name="data-table" size={20} />
                Export as Excel
              </Button>
              <Button variant="secondary" onClick={() => exportChecklist('json')}>
                <Icon name="code" size={20} />
                Export as JSON
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ComplianceChecklistPage;
```

### Phase 8: Add Route

In your existing routes file, add:

```typescript
import ComplianceChecklistPage from './pages/admin/ComplianceChecklistPage';

// Add to routes
{
  path: '/compliance-checklist/:bcNumber?',
  element: <ComplianceChecklistPage />
}
```

## TESTING INSTRUCTIONS

1. Navigate to `/compliance-checklist/BC-2024-001`
2. Click on a section in the Table of Contents
3. Select text in the document viewer
4. Press 'C' to create a checklist item
5. View the item in the right panel
6. Click "Checklist" tab to see all items
7. Edit status and notes
8. Export as JSON

## NOTES FOR CLAUDE CODE

- All components use existing ODL components from Isovist
- Follows ODLTheme for all styling
- Uses Carbon icons via Icon component
- Compatible with existing Table, Button, Tabs components
- Data persists in localStorage
- Ready for API integration

## SUCCESS CRITERIA

✅ Text selection works with visual feedback
✅ Keyboard shortcuts (C, H, M) create checklist items
✅ Items show source references and clause numbers
✅ Status can be updated (pending/compliant/non-compliant)
✅ Export to JSON works
✅ Follows all ODL styling patterns