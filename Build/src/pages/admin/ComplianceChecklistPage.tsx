import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import NavigationRail from '../../components/NavigationRail/NavigationRail';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
// Remove Tabs import - using inline ODL component
import { DocumentViewer } from '../../components/ComplianceChecklist/DocumentViewer/DocumentViewer';
import { ChecklistTable } from '../../components/ComplianceChecklist/ChecklistBuilder/ChecklistTable';
import { ChecklistEditor } from '../../components/ComplianceChecklist/ChecklistEditor/ChecklistEditor';
import { ChecklistOverview } from '../../components/ComplianceChecklist/ChecklistOverview/ChecklistOverview';
import { ChecklistDocumentView } from '../../components/ComplianceChecklist/ChecklistDocumentView/ChecklistDocumentView';
import { KeyboardIndicator } from '../../components/ComplianceChecklist/SelectionControls/KeyboardIndicator';
import { SelectionToolbar } from '../../components/ComplianceChecklist/SelectionControls/SelectionToolbar';
import { SelectionPreview } from '../../components/ComplianceChecklist/SelectionControls/SelectionPreview';
import { useChecklistBuilder } from '../../hooks/useChecklistBuilder';
import { useTextSelection } from '../../hooks/useTextSelection';
import { legislationService } from '../../services/legislationService';
import { LegislationDocument, ChecklistItem } from '../../types';
import ODLTheme from '../../styles/ODLTheme';

const ComplianceChecklistPage: React.FC = () => {
  const { bcNumber } = useParams<{ bcNumber: string }>();
  
  // Layout state
  const [currentPath, setCurrentPath] = useState('/compliance-checklist');
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(true);
  const [isRightCollapsed, setIsRightCollapsed] = useState(true);
  
  // Page state
  const [activeDocument, setActiveDocument] = useState<LegislationDocument | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'document' | 'checklist' | 'review'>('overview');
  const [showTOC, setShowTOC] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [usedItems, setUsedItems] = useState<Set<string>>(new Set()); // Track items added to checklist
  const [removedItems, setRemovedItems] = useState<Set<string>>(new Set()); // Track items removed from checklist
  const [checklistTitle, setChecklistTitle] = useState<string>('Compliance Checklist - Draft');
  const [checklistViewMode, setChecklistViewMode] = useState<'editor' | 'document'>('editor');
  const [reviewViewMode, setReviewViewMode] = useState<'grouped' | 'table'>('grouped');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  
  // Table filters and expanded rows
  const [tableFilters, setTableFilters] = useState({
    type: 'all',
    status: 'all',
    source: 'all'
  });
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  
  // Handle zoom with center preservation
  const handleZoom = useCallback((newZoomLevel: number) => {
    const documentContainer = document.querySelector('[data-zoom-container="document"]') as HTMLElement;
    const checklistContainer = document.querySelector('[data-zoom-container="checklist"]') as HTMLElement;
    
    const container = activeTab === 'document' ? documentContainer : checklistContainer;
    
    if (container) {
      // Get current scroll position and container dimensions
      const currentScrollTop = container.scrollTop;
      const currentScrollLeft = container.scrollLeft;
      const containerHeight = container.clientHeight;
      const containerWidth = container.clientWidth;
      
      // Calculate the center point in the scrollable content
      const centerY = currentScrollTop + containerHeight / 2;
      const centerX = currentScrollLeft + containerWidth / 2;
      
      // Calculate how the center point will change with the new zoom
      const zoomRatio = newZoomLevel / zoomLevel;
      const newCenterY = centerY * zoomRatio;
      const newCenterX = centerX * zoomRatio;
      
      // Update zoom level
      setZoomLevel(newZoomLevel);
      
      // Use setTimeout to adjust scroll after the zoom transform is applied
      setTimeout(() => {
        const newScrollTop = newCenterY - containerHeight / 2;
        const newScrollLeft = newCenterX - containerWidth / 2;
        
        container.scrollTo({
          top: Math.max(0, newScrollTop),
          left: Math.max(0, newScrollLeft),
          behavior: 'auto'
        });
      }, 50);
    } else {
      setZoomLevel(newZoomLevel);
    }
  }, [zoomLevel, activeTab]);
  
  // Sample pre-selected items (normally would come from API) - Only 1 other admin with 2 selections
  const [preSelectedItems] = useState<Map<string, { userId: string; userName: string; userAvatar?: string }>>(new Map([
    // Only 2 items pre-selected by Sarah Mitchell - these will show blue highlighting in document view
    ['fire-safety', { userId: 'sarah-mitchell', userName: 'Sarah Mitchell' }],
    ['accessibility', { userId: 'sarah-mitchell', userName: 'Sarah Mitchell' }]
  ]));
  
  // Custom hooks
  const { 
    checklist, 
    addItem, 
    updateItem, 
    removeItem,
    exportChecklist,
    saveChecklist 
  } = useChecklistBuilder(bcNumber);

  // Add mock data for testing - prevent duplicates
  const [mockDataLoaded, setMockDataLoaded] = useState(false);
  
  useEffect(() => {
    // Temporarily disabled - checklist should start empty except for admin selections
    if (false && checklist.items.length === 0 && !mockDataLoaded) {
      const timestamp = Date.now();
      // Only include admin pre-selected items - Sarah Mitchell's 2 selections
      const mockItems: ChecklistItem[] = [
        {
          id: `mock-1-${timestamp}`,
          type: 'item',
          content: 'Building must comply with minimum setback requirements of 3 metres from front boundary',
          status: 'pending',
          sourceRef: {
            documentId: 'nsw-sepp-housing-2021',
            documentTitle: 'NSW SEPP (Housing) 2021',
            sectionId: 'planning-controls',
            sectionNumber: '4.1.2',
            lineNumbers: [25, 27],
            originalText: 'minimum setback requirements of 3 metres',
            clause: '4.1.2(a)'
          },
          createdBy: 'System',
          createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
          order: 0
        },
        {
          id: `mock-2-${timestamp}`,
          type: 'heading',
          content: 'Fire Safety Requirements',
          status: 'compliant',
          sourceRef: {
            documentId: 'nsw-sepp-housing-2021',
            documentTitle: 'NSW SEPP (Housing) 2021',
            sectionId: 'fire-safety',
            sectionNumber: '5.2',
            lineNumbers: [45, 45],
            originalText: 'Fire Safety Requirements',
            clause: '5.2'
          },
          createdBy: 'Current User',
          createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
          order: 1
        },
        {
          id: `mock-3-${timestamp}`,
          type: 'item',
          content: 'Emergency vehicle access must be provided with minimum 4 metre width clearance',
          status: 'non-compliant',
          sourceRef: {
            documentId: 'nsw-sepp-housing-2021',
            documentTitle: 'NSW SEPP (Housing) 2021',
            sectionId: 'access',
            sectionNumber: '6.3.1',
            lineNumbers: [78, 80],
            originalText: 'Emergency vehicle access must be provided with minimum 4 metre width clearance',
            clause: '6.3.1(b)'
          },
          createdBy: 'Sarah Mitchell',
          createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          order: 2
        },
        {
          id: `mock-4-${timestamp}`,
          type: 'item',
          content: 'Landscaping must retain existing significant trees where feasible',
          status: 'pending',
          sourceRef: {
            documentId: 'nsw-sepp-housing-2021',
            documentTitle: 'NSW SEPP (Housing) 2021',
            sectionId: 'landscaping',
            sectionNumber: '7.1',
            lineNumbers: [92, 94],
            originalText: 'Landscaping must retain existing significant trees where feasible',
            clause: '7.1(c)'
          },
          createdBy: 'James Wong',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          order: 3
        },
        {
          id: `mock-5-${timestamp}`,
          type: 'merged',
          content: 'Parking requirements: minimum 2 spaces per dwelling unit plus visitor parking',
          status: 'compliant',
          sourceRef: {
            documentId: 'nsw-sepp-housing-2021',
            documentTitle: 'NSW SEPP (Housing) 2021',
            sectionId: 'parking',
            sectionNumber: '8.2',
            lineNumbers: [105, 108],
            originalText: 'minimum 2 spaces per dwelling unit plus visitor parking',
            clause: '8.2(a)'
          },
          createdBy: 'Current User',
          createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
          order: 4
        },
        {
          id: `mock-6-${timestamp}`,
          type: 'item',
          content: 'Building height must not exceed 11 metres or 3 storeys whichever is lesser',
          status: 'pending',
          isHeaderOnly: false,
          sourceRef: {
            documentId: 'nsw-sepp-housing-2021',
            documentTitle: 'NSW SEPP (Housing) 2021',
            sectionId: 'height-controls',
            sectionNumber: '4.3',
            lineNumbers: [33, 35],
            originalText: 'Building height must not exceed 11 metres or 3 storeys',
            clause: '4.3(a)'
          },
          createdBy: 'Sarah Mitchell',
          createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
          order: 5
        },
        {
          id: `mock-7-${timestamp}`,
          type: 'item',
          content: 'Stormwater drainage system must connect to public infrastructure',
          status: 'compliant',
          sourceRef: {
            documentId: 'nsw-sepp-housing-2021',
            documentTitle: 'NSW SEPP (Housing) 2021',
            sectionId: 'infrastructure',
            sectionNumber: '9.1',
            lineNumbers: [120, 122],
            originalText: 'Stormwater drainage system must connect to public infrastructure',
            clause: '9.1(b)'
          },
          createdBy: 'James Wong',
          createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
          order: 6
        },
        {
          id: `mock-8-${timestamp}`,
          type: 'heading',
          content: 'Accessibility Compliance',
          status: 'pending',
          isHeaderOnly: true,
          sourceRef: {
            documentId: 'nsw-sepp-housing-2021',
            documentTitle: 'NSW SEPP (Housing) 2021',
            sectionId: 'accessibility',
            sectionNumber: '10',
            lineNumbers: [135, 135],
            originalText: 'Accessibility Compliance',
            clause: '10'
          },
          createdBy: 'Current User',
          createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
          order: 7
        },
        {
          id: `mock-9-${timestamp}`,
          type: 'item',
          content: 'Energy efficiency ratings must meet minimum 6-star NatHERS requirements',
          status: 'non-compliant',
          sourceRef: {
            documentId: 'nsw-sepp-housing-2021',
            documentTitle: 'NSW SEPP (Housing) 2021',
            sectionId: 'energy',
            sectionNumber: '11.2',
            lineNumbers: [148, 150],
            originalText: 'Energy efficiency ratings must meet minimum 6-star NatHERS requirements',
            clause: '11.2(a)'
          },
          createdBy: 'Sarah Mitchell',
          createdAt: new Date(Date.now() - 86400000 * 9).toISOString(),
          order: 8
        },
        {
          id: `mock-10-${timestamp}`,
          type: 'item',
          content: 'Heritage assessment required for buildings constructed before 1940',
          status: 'pending',
          sourceRef: {
            documentId: 'nsw-sepp-housing-2021',
            documentTitle: 'NSW SEPP (Housing) 2021',
            sectionId: 'heritage',
            sectionNumber: '12.1',
            lineNumbers: [165, 167],
            originalText: 'Heritage assessment required for buildings constructed before 1940',
            clause: '12.1(c)'
          },
          createdBy: 'James Wong',
          createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
          order: 9
        },
        // Additional legal coverage items
        {
          id: `mock-11-${timestamp}`,
          type: 'item',
          content: 'Construction certificate required before commencement of works',
          status: 'compliant',
          sourceRef: {
            documentId: 'nsw-environmental-planning-1979',
            documentTitle: 'Environmental Planning and Assessment Act 1979',
            sectionId: 'construction-certificate',
            sectionNumber: '81A',
            lineNumbers: [15, 17],
            originalText: 'Construction certificate required before commencement',
            clause: '81A(1)'
          },
          createdBy: 'Legal Team',
          createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
          order: 10
        },
        {
          id: `mock-12-${timestamp}`,
          type: 'item',
          content: 'Occupation certificate required before occupation of building',
          status: 'pending',
          sourceRef: {
            documentId: 'nsw-environmental-planning-1979',
            documentTitle: 'Environmental Planning and Assessment Act 1979',
            sectionId: 'occupation-certificate',
            sectionNumber: '109C',
            lineNumbers: [22, 24],
            originalText: 'Occupation certificate required before occupation',
            clause: '109C(1)(a)'
          },
          createdBy: 'Legal Team',
          createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
          order: 11
        },
        {
          id: `mock-13-${timestamp}`,
          type: 'item',
          content: 'Building Code of Australia compliance for structural adequacy',
          status: 'compliant',
          sourceRef: {
            documentId: 'national-construction-code-2022',
            documentTitle: 'National Construction Code 2022',
            sectionId: 'structural',
            sectionNumber: 'B1.2',
            lineNumbers: [45, 48],
            originalText: 'Buildings must comply with structural provisions',
            clause: 'B1.2(a)'
          },
          createdBy: 'Structural Engineer',
          createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
          order: 12
        },
        {
          id: `mock-14-${timestamp}`,
          type: 'item',
          content: 'Disability Discrimination Act accessibility requirements',
          status: 'non-compliant',
          sourceRef: {
            documentId: 'disability-discrimination-act-1992',
            documentTitle: 'Disability Discrimination Act 1992',
            sectionId: 'access-buildings',
            sectionNumber: '23',
            lineNumbers: [12, 15],
            originalText: 'Buildings must provide equitable access',
            clause: '23(1)'
          },
          createdBy: 'Access Consultant',
          createdAt: new Date(Date.now() - 86400000 * 18).toISOString(),
          order: 13
        },
        {
          id: `mock-15-${timestamp}`,
          type: 'item',
          content: 'Work Health and Safety Act construction phase compliance',
          status: 'pending',
          sourceRef: {
            documentId: 'work-health-safety-act-2011',
            documentTitle: 'Work Health and Safety Act 2011',
            sectionId: 'construction-work',
            sectionNumber: '291',
            lineNumbers: [8, 11],
            originalText: 'Safe work practices during construction',
            clause: '291(1)(b)'
          },
          createdBy: 'Safety Officer',
          createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
          order: 14
        }
      ];

      // Add mock items to checklist
      mockItems.forEach(item => addItem(item));
      setMockDataLoaded(true);
    }
  }, [checklist.items.length, addItem, mockDataLoaded]);
  
  const {
    selections,
    handleSelection,
    handleBlockSelection: originalHandleBlockSelection,
    mergeSelections,
    clearSelections,
    removeSelection
  } = useTextSelection();

  // Wrapper to handle the new signature with additional parameters
  const handleBlockSelection = useCallback((block: any, sectionId: string, isSelected: boolean, isMultiSelect: boolean, isShiftSelect: boolean, allBlocks?: any[]) => {
    originalHandleBlockSelection(block, sectionId, isSelected, isMultiSelect, isShiftSelect, allBlocks);
  }, [originalHandleBlockSelection]);

  // Navigation menu items
  const leftMenuItems = [
    { id: 'dashboard', iconName: 'dashboard', label: 'Dashboard', path: '/dashboard', description: 'Main dashboard' },
    { id: 'applications', iconName: 'document-tasks', label: 'Applications', path: '/applications', description: 'Building applications' },
    { id: 'compliance', iconName: 'checkmark-outline', label: 'Compliance', path: '/compliance-checklist', description: 'Compliance checklists' },
    { id: 'documents', iconName: 'folder', label: 'Documents', path: '/documents', description: 'Document library' },
    { id: 'reports', iconName: 'chart-line', label: 'Reports', path: '/reports', description: 'Reporting tools' },
    { id: 'settings', iconName: 'settings', label: 'Settings', path: '/settings', description: 'System settings' },
  ];
  
  // Determine if TOC should be shown based on current path
  const shouldShowTOC = useCallback(() => {
    return currentPath === '/documents' || currentPath === '/compliance-checklist' || currentPath === '/editor';
  }, [currentPath]);

  // Dynamic right menu based on current path
  const getRightMenuItems = useCallback(() => {
    const baseItems = [
      { id: 'search', iconName: 'search', label: 'Search', path: '/search', description: 'Search legislation' },
      { id: 'bookmarks', iconName: 'bookmark', label: 'Bookmarks', path: '/bookmarks', description: 'Saved sections' },
      { id: 'export', iconName: 'download', label: 'Export', path: '/export', description: 'Export checklist' },
    ];

    // Only show TOC on documents and checklist pages
    if (shouldShowTOC()) {
      return [
        { 
          id: 'toc', 
          iconName: 'list', 
          label: 'Contents', 
          path: '/toc', 
          description: 'Table of contents' 
        },
        ...baseItems
      ];
    }

    return baseItems;
  }, [currentPath, shouldShowTOC]);

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

    const newUsedItems = new Set(usedItems);

    if (selections.length === 1) {
      // Single selection - create one item as before
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
          clause: section?.content.find(block => block.lineNumber >= selection.startLine && block.lineNumber <= selection.endLine)?.metadata?.clause
        },
        createdBy: 'Current User',
        createdAt: new Date().toISOString(),
        order: checklist.items.length
      };

      addItem(newItem);
      
      // Mark this item as used
      const itemId = selection.startBlockId || `text-${selection.text.substring(0, 50).replace(/\s+/g, '-')}`;
      newUsedItems.add(itemId);
    } else {
      // Multiple selections - create one parent item with children
      const firstSection = legislationService.getSectionById(activeDocument, selections[0].sectionId);
      const startLine = Math.min(...selections.map(s => s.startLine));
      const endLine = Math.max(...selections.map(s => s.endLine));
      const clause = firstSection?.clause || `${firstSection?.sectionNumber || 'Multi-section'}`;
      const parentContent = `Lines ${startLine}-${endLine}\n[${clause}]`;
      
      // Create child items from selections
      const children = selections.map((selection, index) => {
        const section = legislationService.getSectionById(activeDocument, selection.sectionId);
        return {
          id: `child-${Date.now()}-${index}`,
          type: 'item' as const,
          content: selection.text,
          status: 'pending' as const,
          sourceRef: {
            documentId: activeDocument.id,
            documentTitle: activeDocument.title,
            sectionId: selection.sectionId,
            sectionNumber: section?.sectionNumber || '',
            lineNumbers: [selection.startLine, selection.endLine],
            originalText: selection.text,
            clause: section?.content.find(block => block.lineNumber >= selection.startLine && block.lineNumber <= selection.endLine)?.metadata?.clause
          },
          createdBy: 'Current User',
          createdAt: new Date().toISOString(),
          order: index
        };
      });

      const parentItem: ChecklistItem = {
        id: `item-${Date.now()}`,
        type,
        content: parentContent,
        status: 'pending',
        sourceRef: {
          documentId: activeDocument.id,
          documentTitle: activeDocument.title,
          sectionId: firstSection?.id || '',
          sectionNumber: firstSection?.sectionNumber || '',
          lineNumbers: [selections[0].startLine, selections[selections.length - 1].endLine],
          originalText: `Combined: ${selections.length} selected items`,
          clause: firstSection?.content[0]?.metadata?.clause
        },
        createdBy: 'Current User',
        createdAt: new Date().toISOString(),
        order: checklist.items.length,
        children: children
      };

      addItem(parentItem);
      
      // Mark all selected items as used
      selections.forEach(selection => {
        const itemId = selection.startBlockId || `text-${selection.text.substring(0, 50).replace(/\s+/g, '-')}`;
        newUsedItems.add(itemId);
      });
    }

    // Update used items state
    setUsedItems(newUsedItems);
    clearSelections();
  }, [activeDocument, selections, checklist.items.length, addItem, clearSelections, usedItems]);

  const handleMergeSelections = useCallback(() => {
    const merged = mergeSelections();
    if (merged) {
      handleCreateChecklistItem('merged');
    }
  }, [mergeSelections, handleCreateChecklistItem]);

  // Handle removing items (hide them instead of actually deleting)
  const handleRemoveItem = useCallback((itemId: string) => {
    const newRemovedItems = new Set(removedItems);
    newRemovedItems.add(itemId);
    setRemovedItems(newRemovedItems);
  }, [removedItems]);

  // Handle creating items from text selection
  const handleCreateFromSelection = useCallback((type: 'item' | 'heading' | 'merged', selection: any) => {
    if (!activeDocument) return;

    const timestamp = Date.now();
    const newItem: ChecklistItem = {
      id: `created-${timestamp}-${Math.random()}`,
      type,
      content: selection.text,
      status: 'pending' as const,
      sourceRef: {
        documentId: activeDocument.id,
        documentTitle: activeDocument.title,
        sectionId: selection.sectionId,
        sectionNumber: selection.sectionId,
        lineNumbers: [selection.startLine, selection.endLine],
        originalText: selection.text,
        clause: `${selection.startLine}-${selection.endLine}`
      },
      createdBy: 'Current User',
      createdAt: new Date().toISOString(),
      order: checklist.items.length,
      notes: `Created from ${type} selection`
    };

    // Force update by creating new checklist object
    const updatedChecklist = {
      ...checklist,
      items: [...checklist.items, newItem],
      updatedAt: new Date().toISOString()
    };

    // Since we're using mock data, we need to update the state in the parent
    // This is a workaround - in a real app, this would be handled by the data layer
    console.log('Creating new checklist item:', newItem);
    
    // Update the title to show something changed
    if (checklistTitle.includes('Draft')) {
      setChecklistTitle(checklistTitle.replace('Draft', `Draft (${updatedChecklist.items.length} items)`));
    }
    
    // Force a re-render by updating a state that affects the display
    setSelectedSection(prev => prev);
  }, [activeDocument, checklist, checklistTitle, setChecklistTitle]);

  // Filter functions
  const getFilteredItems = useCallback(() => {
    return checklist.items.filter(item => {
      // First filter out removed items
      if (removedItems.has(item.id)) {
        return false;
      }
      
      // Type filter
      if (tableFilters.type !== 'all') {
        const itemType = item.type === 'heading' || item.isHeaderOnly ? 'heading' :
                        item.type === 'merged' ? 'merged' : 'item';
        if (itemType !== tableFilters.type) return false;
      }
      
      // Status filter
      if (tableFilters.status !== 'all' && item.status !== tableFilters.status) {
        return false;
      }
      
      // Source filter
      if (tableFilters.source !== 'all') {
        const docTitle = item.sourceRef?.documentTitle || 'unknown';
        if (!docTitle.toLowerCase().includes(tableFilters.source.toLowerCase())) {
          return false;
        }
      }
      
      return true;
    });
  }, [checklist.items, tableFilters, removedItems]);

  // Toggle row expansion
  const toggleRowExpansion = useCallback((itemId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedRows(newExpanded);
  }, [expandedRows]);

  // Get visible items count (excluding removed items)
  const getVisibleItemsCount = useCallback(() => {
    return checklist.items.filter(item => !removedItems.has(item.id)).length;
  }, [checklist.items, removedItems]);

  const tabItems = [
    { id: 'overview', label: 'Overview', icon: 'dashboard' },
    { id: 'document', label: 'Document View', icon: 'document' },
    { id: 'checklist', label: `Checklist (${getVisibleItemsCount()})`, icon: 'list' },
    { id: 'review', label: `Review & Export (${getVisibleItemsCount()})`, icon: 'checkmark' }
  ];

  const renderTableOfContents = () => {
    if (!activeDocument) return null;

    const renderSection = (section: any, level: number = 0) => (
      <div key={section.id}>
        <button
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'left',
            padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`,
            paddingLeft: `${level * 12 + 8}px`,
            background: selectedSection === section.id ? ODLTheme.colors.primaryLight : 'transparent',
            color: selectedSection === section.id ? ODLTheme.colors.primary : ODLTheme.colors.text.primary,
            border: 'none',
            borderRadius: ODLTheme.borders.radius.sm,
            fontSize: ODLTheme.typography.fontSize.sm,
            cursor: 'pointer',
            marginBottom: '1px',
            transition: ODLTheme.transitions.base,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
          onMouseEnter={(e) => {
            if (selectedSection !== section.id) {
              e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
            }
          }}
          onMouseLeave={(e) => {
            if (selectedSection !== section.id) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
          onClick={() => setSelectedSection(section.id)}
        >
          {section.sectionNumber} {section.title}
        </button>
        {section.subsections?.map((sub: any) => renderSection(sub, level + 1))}
      </div>
    );

    return (
      <div style={{ 
        marginTop: ODLTheme.spacing[2],
        minWidth: '180px' 
      }}>
        {activeDocument.sections.map(section => renderSection(section))}
      </div>
    );
  };

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: ODLTheme.colors.white,
      position: 'relative'
    }}>
      {/* Header */}
      <Header variant="build" userName="John Doe" />

      {/* Main Layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Navigation Rail */}
        <div style={{ 
          height: '100%', 
          borderRight: `1px solid ${ODLTheme.colors.border}` 
        }}>
          <NavigationRail
            currentPath={currentPath}
            onNavigate={setCurrentPath}
            menuItems={leftMenuItems}
            collapsed={isLeftCollapsed}
            position="left"
            theme="light"
            showHelpIcon={true}
            showCollapseToggle={true}
            onCollapseToggle={setIsLeftCollapsed}
            showTooltips={true}
            style={{ height: '100%' }}
          />
        </div>

        {/* Table of Contents Panel */}
        {showTOC && (
          <div style={{
            minWidth: '200px',
            maxWidth: '400px',
            width: 'fit-content',
            height: '100%',
            borderRight: `1px solid ${ODLTheme.colors.border}`,
            background: ODLTheme.colors.white,
            overflowY: 'auto',
            padding: ODLTheme.spacing[4]
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: ODLTheme.spacing[4]
            }}>
              <h2 style={{
                fontSize: ODLTheme.typography.fontSize.lg,
                fontWeight: ODLTheme.typography.fontWeight.semibold,
                color: ODLTheme.colors.primary,
                margin: 0
              }}>
                Table of Contents
              </h2>
              <Button
                variant="ghost"
                size="small"
                onClick={() => setShowTOC(false)}
              >
                <Icon name="close" size={16} />
              </Button>
            </div>
            {renderTableOfContents()}
          </div>
        )}

        {/* Main Content Area */}
        <div style={{ 
          flex: 1, 
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: ODLTheme.colors.white 
        }}>
          {/* Header Area - Condensed for reading tabs */}
          <div style={{ 
            background: ODLTheme.colors.white,
            transition: 'all 0.3s ease-in-out',
            overflow: 'hidden'
          }}>
            {/* Breadcrumb and Title - Animated */}
            <div style={{
              opacity: (activeTab === 'document' || activeTab === 'checklist') ? 0 : 1,
              maxHeight: (activeTab === 'document' || activeTab === 'checklist') ? '0px' : '200px',
              transition: 'opacity 0.3s ease-in-out, max-height 0.3s ease-in-out',
              padding: (activeTab === 'document' || activeTab === 'checklist') ? '0' : `${ODLTheme.spacing[6]} ${ODLTheme.spacing[6]} 0`,
              transform: (activeTab === 'document' || activeTab === 'checklist') ? 'translateY(-20px)' : 'translateY(0)',
              pointerEvents: (activeTab === 'document' || activeTab === 'checklist') ? 'none' : 'auto'
            }}>
              <Breadcrumb 
                items={[
                  { label: 'Home', path: '/' },
                  { label: 'Applications', path: '/applications' },
                  { label: bcNumber || 'New Checklist' }
                ]}
                onNavigate={(path) => console.log('Navigate to:', path)}
              />
              
              <h1 style={{ 
                fontSize: ODLTheme.typography.fontSize.lg, 
                fontWeight: ODLTheme.typography.fontWeight.semibold, 
                color: ODLTheme.colors.text.primary, 
                margin: `${ODLTheme.spacing[4]} 0 ${ODLTheme.spacing[2]} 0` 
              }}>
                {checklistTitle}
              </h1>
              
              <p style={{ 
                fontSize: ODLTheme.typography.fontSize.base, 
                color: ODLTheme.colors.text.secondary, 
                margin: `0 0 ${ODLTheme.spacing[4]} 0` 
              }}>
                {bcNumber ? `Building Consent: ${bcNumber}` : `Based on ${activeDocument?.title || 'NSW legislation'}`}
              </p>
            </div>

            {/* Tabs Container - Always Visible */}
            <div style={{ 
              padding: `${(activeTab === 'document' || activeTab === 'checklist') ? ODLTheme.spacing[3] : ODLTheme.spacing[4]} ${ODLTheme.spacing[6]} 0`,
              transition: 'padding 0.3s ease-in-out'
            }}>
              {/* ODL Styled Tabs with Zoom Controls */}
              <div style={{ 
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: `1px solid ${ODLTheme.colors.border}`
              }}>
                <div style={{ 
                  display: 'flex', 
                  gap: 0,
                  flex: 1,
                  position: 'relative'
                }}>
                  {tabItems.map((tab) => {
                    const isActive = tab.id === activeTab;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        style={{
                          position: 'relative',
                          background: 'none',
                          border: 'none',
                          fontFamily: 'inherit',
                          fontSize: ODLTheme.typography.fontSize.sm,
                          fontWeight: isActive ? 500 : 400,
                          color: isActive ? ODLTheme.colors.primary : ODLTheme.colors.text.secondary,
                          cursor: 'pointer',
                          padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
                          borderRadius: 0,
                          outline: 'none',
                          transition: 'all 0.2s ease',
                          whiteSpace: 'nowrap',
                          minWidth: 0,
                          flexShrink: 0
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[2] }}>
                          {tab.icon && (
                            <Icon name={tab.icon} size={16} />
                          )}
                          <span>{tab.label}</span>
                        </div>
                        {isActive && (
                          <div style={{
                            position: 'absolute',
                            bottom: '-1px',
                            left: 0,
                            right: 0,
                            height: '2px',
                            backgroundColor: ODLTheme.colors.primary,
                            borderRadius: '1px'
                          }} />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Zoom Controls - Only show on document and checklist tabs */}
                {(activeTab === 'document' || activeTab === 'checklist') && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: ODLTheme.spacing[2],
                    marginLeft: ODLTheme.spacing[4],
                    opacity: (activeTab === 'document' || activeTab === 'checklist') ? 1 : 0,
                    transform: (activeTab === 'document' || activeTab === 'checklist') ? 'translateX(0)' : 'translateX(20px)',
                    transition: 'all 0.3s ease-in-out'
                  }}>
                    <span style={{
                      fontSize: ODLTheme.typography.fontSize.xs,
                      color: ODLTheme.colors.text.secondary,
                      fontWeight: ODLTheme.typography.fontWeight.medium
                    }}>
                      {zoomLevel}%
                    </span>
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => handleZoom(Math.max(50, zoomLevel - 10))}
                      disabled={zoomLevel <= 50}
                      style={{ 
                        padding: '4px',
                        minWidth: '28px',
                        height: '28px'
                      }}
                      title="Zoom Out"
                    >
                      <Icon name="subtract" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => handleZoom(100)}
                      style={{ 
                        padding: '4px',
                        minWidth: '28px',
                        height: '28px'
                      }}
                      title="Reset Zoom"
                    >
                      <Icon name="refresh" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => handleZoom(Math.min(150, zoomLevel + 10))}
                      disabled={zoomLevel >= 150}
                      style={{ 
                        padding: '4px',
                        minWidth: '28px',
                        height: '28px'
                      }}
                      title="Zoom In"
                    >
                    </Button>
                  </div>
                )}

                {/* Export Options - Only show on review tab */}
                {activeTab === 'review' && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: ODLTheme.spacing[2],
                    marginLeft: ODLTheme.spacing[4],
                    marginTop: '-4px',
                    opacity: activeTab === 'review' ? 1 : 0,
                    transform: activeTab === 'review' ? 'translateX(0)' : 'translateX(20px)',
                    transition: 'all 0.3s ease-in-out'
                  }}>
                    <Button variant="ghost" onClick={() => exportChecklist('pdf')} size="small" style={{ gap: ODLTheme.spacing[4] }}>
                      <Icon name="document-pdf" size={14} />
                      PDF
                    </Button>
                    <Button variant="ghost" onClick={() => exportChecklist('excel')} size="small" style={{ gap: ODLTheme.spacing[4] }}>
                      <Icon name="data-table" size={14} />
                      Excel
                    </Button>
                    <Button variant="ghost" onClick={() => exportChecklist('json')} size="small" style={{ gap: ODLTheme.spacing[4] }}>
                      <Icon name="code" size={14} />
                      JSON
                    </Button>
                    <Button variant="ghost" onClick={() => console.log('Print preview...')} size="small" style={{ gap: ODLTheme.spacing[4] }}>
                      <Icon name="print" size={14} />
                      Print
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div style={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            background: 'var(--odl-surface)'
          }}>
              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  <ChecklistOverview 
                    items={checklist.items.filter(item => !removedItems.has(item.id))} 
                    preSelectedItems={preSelectedItems}
                    title={checklistTitle}
                    onTitleChange={setChecklistTitle}
                  />
                </div>
              )}

              {activeTab === 'document' && (
                <div style={{ 
                  flex: 1,
                  display: 'flex',
                  overflow: 'hidden'
                }}>
                  {/* Document Content Column */}
                  <div style={{ 
                    flex: 1, 
                    display: 'flex', 
                    flexDirection: 'column',
                    overflow: 'hidden'
                  }}>
                    {/* Document Header */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: ODLTheme.spacing[4],
                      borderBottom: `1px solid ${ODLTheme.colors.border}`,
                      background: ODLTheme.colors.white
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[3] }}>
                      {selections.length > 0 && (
                        <span style={{
                          background: ODLTheme.colors.primaryLight,
                          color: ODLTheme.colors.primary,
                          padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`,
                          borderRadius: ODLTheme.borders.radius.sm,
                          fontSize: ODLTheme.typography.fontSize.sm,
                          fontWeight: ODLTheme.typography.fontWeight.medium
                        }}>
                          {selections.length} selected
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '0' }}>
                      {!showTOC && (
                        <Button
                          variant="ghost"
                          size="small"
                          onClick={() => setShowTOC(true)}
                          style={{ marginRight: ODLTheme.spacing[2] }}
                        >
                          <Icon name="list" size={20} />
                          Show Contents
                        </Button>
                      )}
                      {selections.length > 0 && (
                        <div style={{ display: 'flex', gap: '0' }}>
                          <Button
                            variant="primary"
                            size="small"
                            onClick={() => handleCreateChecklistItem('item')}
                            style={{ borderRadius: '2px 0 0 2px', borderRight: `1px solid ${ODLTheme.colors.border}` }}
                          >
                            <Icon name="add" size={16} />
                            Add to Checklist
                          </Button>
                          <Button
                            variant="ghost"
                            size="small"
                            onClick={clearSelections}
                            style={{ borderRadius: '0 2px 2px 0', borderLeft: `1px solid ${ODLTheme.colors.border}` }}
                          >
                            <Icon name="close" size={16} />
                            Clear
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Selection Controls - Disabled for clean row selection */}
                  {/* 
                  <SelectionToolbar
                    selections={selections}
                    onCreateItem={() => handleCreateChecklistItem('item')}
                    onCreateHeading={() => handleCreateChecklistItem('heading')}
                    onMergeSelections={handleMergeSelections}
                    onClearSelections={clearSelections}
                  />

                  <SelectionPreview
                    selections={selections}
                    onRemoveSelection={removeSelection}
                  />
                  */}
                  
                  {/* Document Content - Scrollable with Zoom */}
                  <div 
                    data-zoom-container="document"
                    style={{ 
                      flex: 1, 
                      overflowY: 'auto',
                      position: 'relative'
                    }}>
                    <div style={{
                      transform: `scale(${zoomLevel / 100})`,
                      transformOrigin: 'top center',
                      transition: 'transform 0.3s ease-in-out',
                      minHeight: `${100 / (zoomLevel / 100)}%`,
                      width: `${100 / (zoomLevel / 100)}%`,
                      margin: '0 auto'
                    }}>
                    <DocumentViewer
                      document={activeDocument}
                      selections={selections}
                      onSelection={handleSelection}
                      onBlockSelect={handleBlockSelection}
                      selectedSection={selectedSection}
                      usedItems={usedItems}
                      preSelectedItems={preSelectedItems}
                    />
                    </div>
                  </div>
                  
                  {/* Checklist Info Sidebar */}
                  <div style={{
                    width: '350px',
                    borderLeft: `1px solid ${ODLTheme.colors.border}`,
                    background: ODLTheme.colors.white,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                  }}>
                    {/* Sidebar Header */}
                    <div style={{
                      padding: ODLTheme.spacing[4],
                      borderBottom: `1px solid ${ODLTheme.colors.border}`,
                      background: ODLTheme.colors.surface
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        <h3 style={{
                          fontSize: ODLTheme.typography.fontSize.base,
                          fontWeight: ODLTheme.typography.fontWeight.semibold,
                          color: ODLTheme.colors.text.primary,
                          margin: 0
                        }}>
                          Current Checklist
                        </h3>
                        <span style={{
                          fontSize: ODLTheme.typography.fontSize.sm,
                          color: ODLTheme.colors.text.secondary,
                          background: ODLTheme.colors.primaryLight,
                          padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`,
                          borderRadius: ODLTheme.borders.radius.sm
                        }}>
                          {getVisibleItemsCount()} items
                        </span>
                      </div>
                    </div>
                    
                    {/* Checklist Items */}
                    <div style={{ flex: 1, overflow: 'auto', padding: ODLTheme.spacing[2] }}>
                      {getVisibleItemsCount() === 0 ? (
                        <div style={{
                          textAlign: 'center',
                          padding: ODLTheme.spacing[6],
                          color: ODLTheme.colors.text.secondary
                        }}>
                          <Icon name="document" size={48} style={{ opacity: 0.3, marginBottom: ODLTheme.spacing[3] }} />
                          <p style={{ margin: 0, fontSize: ODLTheme.typography.fontSize.sm }}>
                            No checklist items yet
                          </p>
                          <p style={{ margin: `${ODLTheme.spacing[1]} 0 0`, fontSize: ODLTheme.typography.fontSize.xs }}>
                            Select text and press C, H, or M to add items
                          </p>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: ODLTheme.spacing[2] }}>
                          {getFilteredItems().map((item, index) => (
                            <div
                              key={item.id}
                              style={{
                                padding: ODLTheme.spacing[3],
                                background: ODLTheme.colors.white,
                                border: `1px solid ${ODLTheme.colors.border}`,
                                borderRadius: ODLTheme.borders.radius.sm,
                                boxShadow: ODLTheme.shadows.sm
                              }}
                            >
                              <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                                marginBottom: ODLTheme.spacing[2]
                              }}>
                                <span style={{
                                  fontSize: ODLTheme.typography.fontSize.xs,
                                  fontWeight: ODLTheme.typography.fontWeight.medium,
                                  color: ODLTheme.colors.primary,
                                  background: ODLTheme.colors.primaryLight,
                                  padding: '2px 6px',
                                  borderRadius: '4px'
                                }}>
                                  #{index + 1}
                                </span>
                                <button
                                  onClick={() => handleRemoveItem(item.id)}
                                  style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: ODLTheme.colors.text.secondary,
                                    padding: '2px'
                                  }}
                                  title="Remove from checklist"
                                >
                                  <Icon name="close" size={14} />
                                </button>
                              </div>
                              <p style={{
                                fontSize: ODLTheme.typography.fontSize.sm,
                                lineHeight: '1.4',
                                color: ODLTheme.colors.text.primary,
                                margin: `0 0 ${ODLTheme.spacing[2]} 0`
                              }}>
                                {item.content}
                              </p>
                              {item.sourceRef && (
                                <div style={{
                                  fontSize: ODLTheme.typography.fontSize.xs,
                                  color: ODLTheme.colors.text.secondary,
                                  display: 'flex',
                                  gap: ODLTheme.spacing[2],
                                  flexWrap: 'wrap'
                                }}>
                                  <span>§ {item.sourceRef.sectionNumber}</span>
                                  {item.sourceRef.clause && <span>[{item.sourceRef.clause}]</span>}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Sidebar Footer */}
                    <div style={{
                      padding: ODLTheme.spacing[3],
                      borderTop: `1px solid ${ODLTheme.colors.border}`,
                      background: ODLTheme.colors.surface
                    }}>
                      <Button
                        variant="secondary"
                        size="small"
                        onClick={() => setActiveTab('checklist')}
                        style={{ width: '100%' }}
                      >
                        <Icon name="list" size={16} />
                        View Full Checklist
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'checklist' && (
                <div style={{ 
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}>
                  {/* Header Controls */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: ODLTheme.spacing[4],
                    borderBottom: `1px solid ${ODLTheme.colors.border}`,
                    background: ODLTheme.colors.white
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[4] }}>
                      <div style={{
                        fontSize: ODLTheme.typography.fontSize.sm,
                        fontWeight: ODLTheme.typography.fontWeight.medium,
                        color: ODLTheme.colors.text.secondary,
                        margin: 0
                      }}>
                        {getVisibleItemsCount()} items
                      </div>
                      
                      {/* View Mode Toggle */}
                      <div style={{
                        display: 'flex',
                        background: ODLTheme.colors.surface,
                        borderRadius: ODLTheme.borders.radius.sm,
                        padding: '2px'
                      }}>
                        <button
                          onClick={() => setChecklistViewMode('editor')}
                          style={{
                            padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`,
                            background: checklistViewMode === 'editor' ? ODLTheme.colors.white : 'transparent',
                            color: checklistViewMode === 'editor' ? ODLTheme.colors.primary : ODLTheme.colors.text.secondary,
                            border: 'none',
                            borderRadius: ODLTheme.borders.radius.sm,
                            fontSize: ODLTheme.typography.fontSize.sm,
                            fontWeight: checklistViewMode === 'editor' ? ODLTheme.typography.fontWeight.medium : ODLTheme.typography.fontWeight.normal,
                            cursor: 'pointer',
                            transition: ODLTheme.transitions.base,
                            display: 'flex',
                            alignItems: 'center',
                            gap: ODLTheme.spacing[1]
                          }}
                        >
                          <Icon name="edit" size={14} />
                          Editor View
                        </button>
                        <button
                          onClick={() => setChecklistViewMode('document')}
                          style={{
                            padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`,
                            background: checklistViewMode === 'document' ? ODLTheme.colors.white : 'transparent',
                            color: checklistViewMode === 'document' ? ODLTheme.colors.primary : ODLTheme.colors.text.secondary,
                            border: 'none',
                            borderRadius: ODLTheme.borders.radius.sm,
                            fontSize: ODLTheme.typography.fontSize.sm,
                            fontWeight: checklistViewMode === 'document' ? ODLTheme.typography.fontWeight.medium : ODLTheme.typography.fontWeight.normal,
                            cursor: 'pointer',
                            transition: ODLTheme.transitions.base,
                            display: 'flex',
                            alignItems: 'center',
                            gap: ODLTheme.spacing[1]
                          }}
                        >
                          <Icon name="document" size={14} />
                          Document View
                        </button>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: ODLTheme.spacing[2] }}>
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

                  {/* Content Area with Zoom */}
                  <div style={{ 
                    flex: 1, 
                    overflowY: 'auto',
                    position: 'relative'
                  }}>
                    <div style={{
                      transform: `scale(${zoomLevel / 100})`,
                      transformOrigin: 'top center',
                      transition: 'transform 0.3s ease-in-out',
                      minHeight: `${100 / (zoomLevel / 100)}%`,
                      width: `${100 / (zoomLevel / 100)}%`,
                      margin: '0 auto'
                    }}>
                    {checklistViewMode === 'editor' ? (
                      <ChecklistEditor
                        items={checklist.items.filter(item => !removedItems.has(item.id))}
                        onUpdateItem={updateItem}
                        onDeleteItem={handleRemoveItem}
                        title={checklistTitle}
                        onTitleChange={setChecklistTitle}
                      />
                    ) : (
                      <ChecklistDocumentView
                        document={activeDocument}
                        checklistItems={checklist.items.filter(item => !removedItems.has(item.id))}
                        onRemoveItem={handleRemoveItem}
                        onCreateItem={handleCreateFromSelection}
                        title={checklistTitle}
                        onTitleChange={setChecklistTitle}
                      />
                    )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'review' && (
                <div style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}>
                  {/* Header */}
                  <div style={{
                    padding: ODLTheme.spacing[4],
                    borderBottom: `1px solid ${ODLTheme.colors.border}`,
                    background: ODLTheme.colors.white
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: ODLTheme.spacing[4]
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: ODLTheme.spacing[4]
                      }}>
                        <div style={{
                          fontSize: ODLTheme.typography.fontSize.sm,
                          color: ODLTheme.colors.text.secondary
                        }}>
                          {getVisibleItemsCount()} items ready
                        </div>
                        
                        {/* View Toggle */}
                        <div style={{
                          display: 'flex',
                          background: ODLTheme.colors.surface,
                          borderRadius: ODLTheme.borders.radius.sm,
                          border: `1px solid ${ODLTheme.colors.border}`
                        }}>
                          <button
                            onClick={() => setReviewViewMode('grouped')}
                            style={{
                              background: reviewViewMode === 'grouped' ? ODLTheme.colors.primary : 'transparent',
                              color: reviewViewMode === 'grouped' ? 'white' : ODLTheme.colors.text.secondary,
                              border: 'none',
                              padding: '4px 8px',
                              fontSize: ODLTheme.typography.fontSize.xs,
                              fontWeight: ODLTheme.typography.fontWeight.medium,
                              borderRadius: `${ODLTheme.borders.radius.sm} 0 0 ${ODLTheme.borders.radius.sm}`,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Icon name="list" size={12} />
                            Grouped
                          </button>
                          <button
                            onClick={() => setReviewViewMode('table')}
                            style={{
                              background: reviewViewMode === 'table' ? ODLTheme.colors.primary : 'transparent',
                              color: reviewViewMode === 'table' ? 'white' : ODLTheme.colors.text.secondary,
                              border: 'none',
                              padding: '4px 8px',
                              fontSize: ODLTheme.typography.fontSize.xs,
                              fontWeight: ODLTheme.typography.fontWeight.medium,
                              borderRadius: `0 ${ODLTheme.borders.radius.sm} ${ODLTheme.borders.radius.sm} 0`,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Icon name="data-table" size={12} />
                            Table
                          </button>
                        </div>
                        
                      </div>
                      <Button 
                        variant="primary" 
                        onClick={() => {
                          // Placeholder for publishing to compliance table
                          console.log('Publishing to compliance table...');
                        }}
                        style={{ minWidth: '160px' }}
                      >
                        <Icon name="send" size={16} />
                        Publish to Compliance
                      </Button>
                    </div>
                  </div>

                  {/* Grouped Checklist Items */}
                  <div style={{ 
                    flex: 1, 
                    overflow: 'auto', 
                    background: 'var(--odl-surface-light)',
                    padding: ODLTheme.spacing[4]
                  }}>
                    {getVisibleItemsCount() === 0 ? (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '200px',
                        color: ODLTheme.colors.text.secondary,
                        textAlign: 'center'
                      }}>
                        <Icon name="document" size={48} style={{ marginBottom: ODLTheme.spacing[2], opacity: 0.5 }} />
                        <h3 style={{ margin: `0 0 ${ODLTheme.spacing[1]} 0`, color: ODLTheme.colors.text.primary }}>
                          No checklist items
                        </h3>
                        <p style={{ margin: 0 }}>
                          Add items from the document view to see them here
                        </p>
                      </div>
                    ) : reviewViewMode === 'grouped' ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: ODLTheme.spacing[6] }}>
                        {/* Group items by legislation */}
                        {(() => {
                          const groupedItems = new Map<string, any[]>();
                          
                          // Only process visible items (not removed)
                          checklist.items.filter(item => !removedItems.has(item.id)).forEach(item => {
                            const key = item.sourceRef?.documentTitle || 'Other Requirements';
                            if (!groupedItems.has(key)) {
                              groupedItems.set(key, []);
                            }
                            groupedItems.get(key)?.push(item);
                          });
                          
                          return Array.from(groupedItems.entries()).map(([legislationTitle, items]) => (
                            <div key={legislationTitle} style={{
                              background: ODLTheme.colors.white,
                              borderRadius: ODLTheme.borders.radius.md,
                              border: `1px solid ${ODLTheme.colors.border}`,
                              overflow: 'hidden',
                              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                            }}>
                              {/* Legislation Header */}
                              <div style={{
                                background: ODLTheme.colors.surface,
                                padding: ODLTheme.spacing[4],
                                borderBottom: `1px solid ${ODLTheme.colors.border}`
                              }}>
                                <div style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between'
                                }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[2] }}>
                                    <Icon name="document-multiple" size={20} style={{ color: ODLTheme.colors.primary }} />
                                    <div>
                                      <h3 style={{
                                        fontSize: ODLTheme.typography.fontSize.base,
                                        fontWeight: ODLTheme.typography.fontWeight.semibold,
                                        color: ODLTheme.colors.text.primary,
                                        margin: 0
                                      }}>
                                        {legislationTitle}
                                      </h3>
                                      <div style={{
                                        fontSize: ODLTheme.typography.fontSize.sm,
                                        color: ODLTheme.colors.text.secondary,
                                        marginTop: '2px'
                                      }}>
                                        {items.length} requirement{items.length !== 1 ? 's' : ''} • {items.filter(i => i.status === 'compliant').length} compliant • {items.filter(i => i.status === 'pending').length} pending
                                      </div>
                                    </div>
                                  </div>
                                  <div style={{
                                    background: items.filter(i => i.status === 'compliant').length === items.length ? 'var(--odl-success-light)' :
                                               items.filter(i => i.status === 'non-compliant').length > 0 ? 'var(--odl-error-light)' : 'var(--odl-warning-light)',
                                    color: items.filter(i => i.status === 'compliant').length === items.length ? 'var(--odl-success-dark)' :
                                           items.filter(i => i.status === 'non-compliant').length > 0 ? 'var(--odl-error-dark)' : 'var(--odl-warning-dark)',
                                    padding: '4px 8px',
                                    borderRadius: '12px',
                                    fontSize: ODLTheme.typography.fontSize.xs,
                                    fontWeight: ODLTheme.typography.fontWeight.medium
                                  }}>
                                    {items.filter(i => i.status === 'compliant').length === items.length ? 'COMPLETE' :
                                     items.filter(i => i.status === 'non-compliant').length > 0 ? 'ISSUES' : 'IN PROGRESS'}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Items List */}
                              <div style={{ padding: ODLTheme.spacing[4] }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: ODLTheme.spacing[3] }}>
                                  {items.map((item, index) => (
                                    <div key={item.id} style={{
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                      gap: ODLTheme.spacing[3],
                                      padding: ODLTheme.spacing[3],
                                      background: item.status === 'compliant' ? 'var(--odl-success-light)' :
                                                 item.status === 'non-compliant' ? 'var(--odl-error-light)' :
                                                 item.status === 'pending' ? 'var(--odl-warning-light)' : ODLTheme.colors.surface,
                                      borderRadius: ODLTheme.borders.radius.sm,
                                      border: `1px solid ${item.status === 'compliant' ? 'var(--odl-success-border)' :
                                                           item.status === 'non-compliant' ? 'var(--odl-error-border)' :
                                                           item.status === 'pending' ? 'var(--odl-warning-border)' : ODLTheme.colors.border}`
                                    }}>
                                      {/* Status Indicator */}
                                      <div style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: item.status === 'compliant' ? 'var(--odl-success)' :
                                                   item.status === 'non-compliant' ? 'var(--odl-error)' :
                                                   item.status === 'pending' ? 'var(--odl-warning)' : ODLTheme.colors.text.secondary,
                                        color: 'white',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        flexShrink: 0,
                                        marginTop: '2px'
                                      }}>
                                        {item.status === 'compliant' ? '✓' :
                                         item.status === 'non-compliant' ? '✕' :
                                         item.status === 'pending' ? '•' : '?'}
                                      </div>
                                      
                                      {/* Content */}
                                      <div style={{ flex: 1 }}>
                                        <div style={{
                                          fontSize: ODLTheme.typography.fontSize.sm,
                                          fontWeight: ODLTheme.typography.fontWeight.medium,
                                          color: ODLTheme.colors.text.primary,
                                          marginBottom: ODLTheme.spacing[1],
                                          lineHeight: '1.4'
                                        }}>
                                          {item.content}
                                        </div>
                                        
                                        {/* Source Reference */}
                                        {item.sourceRef && (
                                          <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: ODLTheme.spacing[2],
                                            fontSize: ODLTheme.typography.fontSize.xs,
                                            color: ODLTheme.colors.text.secondary,
                                            marginBottom: ODLTheme.spacing[1]
                                          }}>
                                            <span>§ {item.sourceRef.sectionNumber}</span>
                                            {item.sourceRef.clause && <span>[{item.sourceRef.clause}]</span>}
                                            <span>Lines {item.sourceRef.lineNumbers?.join('-')}</span>
                                          </div>
                                        )}
                                        
                                        {/* Creator and Date */}
                                        <div style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: ODLTheme.spacing[2],
                                          fontSize: ODLTheme.typography.fontSize.xs,
                                          color: ODLTheme.colors.text.secondary
                                        }}>
                                          <span>{item.createdBy}</span>
                                          <span>•</span>
                                          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                        </div>
                                      </div>
                                      
                                      {/* Type Badge */}
                                      <div style={{
                                        background: item.type === 'heading' ? 'var(--odl-info-light)' :
                                                   item.type === 'merged' ? 'var(--odl-primary-light)' : ODLTheme.colors.surface,
                                        color: item.type === 'heading' ? 'var(--odl-info-dark)' :
                                               item.type === 'merged' ? 'var(--odl-primary-dark)' : ODLTheme.colors.text.secondary,
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        fontSize: ODLTheme.typography.fontSize.xs,
                                        fontWeight: ODLTheme.typography.fontWeight.medium,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.025em',
                                        flexShrink: 0
                                      }}>
                                        {item.type}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ));
                        })()}
                      </div>
                    ) : (
                      <div>
                        {/* Column Filters */}
                        <div style={{
                          background: ODLTheme.colors.white,
                          border: `1px solid ${ODLTheme.colors.border}`,
                          borderRadius: ODLTheme.borders.radius.sm,
                          padding: ODLTheme.spacing[4],
                          marginBottom: ODLTheme.spacing[4],
                          display: 'flex',
                          gap: ODLTheme.spacing[4],
                          alignItems: 'center',
                          flexWrap: 'wrap'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: ODLTheme.spacing[2]
                          }}>
                            <Icon name="filter" size={16} style={{ color: ODLTheme.colors.primary }} />
                            <span style={{
                              fontSize: ODLTheme.typography.fontSize.sm,
                              fontWeight: ODLTheme.typography.fontWeight.medium,
                              color: ODLTheme.colors.text.primary
                            }}>
                              Filters:
                            </span>
                          </div>
                          
                          {/* Type Filter */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: ODLTheme.spacing[2]
                          }}>
                            <label style={{
                              fontSize: ODLTheme.typography.fontSize.sm,
                              color: ODLTheme.colors.text.secondary
                            }}>Type:</label>
                            <select
                              value={tableFilters.type}
                              onChange={(e) => setTableFilters({...tableFilters, type: e.target.value})}
                              style={{
                                padding: '4px 8px',
                                border: `1px solid ${ODLTheme.colors.border}`,
                                borderRadius: ODLTheme.borders.radius.sm,
                                fontSize: ODLTheme.typography.fontSize.sm,
                                background: ODLTheme.colors.white
                              }}
                            >
                              <option value="all">All Types</option>
                              <option value="item">Items</option>
                              <option value="heading">Headings</option>
                              <option value="merged">Merged</option>
                            </select>
                          </div>
                          
                          {/* Status Filter */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: ODLTheme.spacing[2]
                          }}>
                            <label style={{
                              fontSize: ODLTheme.typography.fontSize.sm,
                              color: ODLTheme.colors.text.secondary
                            }}>Status:</label>
                            <select
                              value={tableFilters.status}
                              onChange={(e) => setTableFilters({...tableFilters, status: e.target.value})}
                              style={{
                                padding: '4px 8px',
                                border: `1px solid ${ODLTheme.colors.border}`,
                                borderRadius: ODLTheme.borders.radius.sm,
                                fontSize: ODLTheme.typography.fontSize.sm,
                                background: ODLTheme.colors.white
                              }}
                            >
                              <option value="all">All Status</option>
                              <option value="pending">Pending</option>
                              <option value="compliant">Compliant</option>
                              <option value="non-compliant">Non-Compliant</option>
                              <option value="not-applicable">Not Applicable</option>
                            </select>
                          </div>
                          
                          {/* Source Filter */}
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: ODLTheme.spacing[2]
                          }}>
                            <label style={{
                              fontSize: ODLTheme.typography.fontSize.sm,
                              color: ODLTheme.colors.text.secondary
                            }}>Source:</label>
                            <select
                              value={tableFilters.source}
                              onChange={(e) => setTableFilters({...tableFilters, source: e.target.value})}
                              style={{
                                padding: '4px 8px',
                                border: `1px solid ${ODLTheme.colors.border}`,
                                borderRadius: ODLTheme.borders.radius.sm,
                                fontSize: ODLTheme.typography.fontSize.sm,
                                background: ODLTheme.colors.white
                              }}
                            >
                              <option value="all">All Sources</option>
                              <option value="sepp">SEPP Housing</option>
                              <option value="environmental">EPA Act</option>
                              <option value="construction">Construction Code</option>
                              <option value="disability">Disability Act</option>
                              <option value="work">Work Safety Act</option>
                            </select>
                          </div>
                          
                          {/* Clear Filters */}
                          {(tableFilters.type !== 'all' || tableFilters.status !== 'all' || tableFilters.source !== 'all') && (
                            <Button
                              variant="ghost"
                              size="small"
                              onClick={() => setTableFilters({ type: 'all', status: 'all', source: 'all' })}
                              style={{ gap: ODLTheme.spacing[1] }}
                            >
                              <Icon name="close" size={14} />
                              Clear
                            </Button>
                          )}
                          
                          {/* Results count */}
                          <div style={{
                            marginLeft: 'auto',
                            fontSize: ODLTheme.typography.fontSize.sm,
                            color: ODLTheme.colors.text.secondary
                          }}>
                            {getFilteredItems().length} of {getVisibleItemsCount()} items
                          </div>
                        </div>
                        
                        {/* Table */}
                        <div style={{
                          background: ODLTheme.colors.white,
                          border: `1px solid ${ODLTheme.colors.border}`,
                          borderRadius: ODLTheme.borders.radius.sm,
                          overflow: 'hidden'
                        }}>
                        <table style={{
                          width: '100%',
                          borderCollapse: 'collapse',
                          fontSize: ODLTheme.typography.fontSize.sm,
                          fontFamily: ODLTheme.typography.fontFamily
                        }}>
                          <thead style={{
                            backgroundColor: ODLTheme.colors.surface,
                            borderBottom: `1px solid ${ODLTheme.colors.border}`
                          }}>
                            <tr>
                              <th style={{
                                padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
                                textAlign: 'center',
                                fontWeight: ODLTheme.typography.fontWeight.semibold,
                                color: ODLTheme.colors.text.secondary,
                                fontSize: ODLTheme.typography.fontSize.sm,
                                width: '40px'
                              }}></th>
                              <th style={{
                                padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
                                textAlign: 'left',
                                fontWeight: ODLTheme.typography.fontWeight.semibold,
                                color: ODLTheme.colors.text.secondary,
                                fontSize: ODLTheme.typography.fontSize.sm,
                                width: '60px'
                              }}>#</th>
                              <th style={{
                                padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
                                textAlign: 'left',
                                fontWeight: ODLTheme.typography.fontWeight.semibold,
                                color: ODLTheme.colors.text.secondary,
                                fontSize: ODLTheme.typography.fontSize.sm,
                                width: '100px'
                              }}>Type</th>
                              <th style={{
                                padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
                                textAlign: 'left',
                                fontWeight: ODLTheme.typography.fontWeight.semibold,
                                color: ODLTheme.colors.text.secondary,
                                fontSize: ODLTheme.typography.fontSize.sm
                              }}>Requirement</th>
                              <th style={{
                                padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
                                textAlign: 'left',
                                fontWeight: ODLTheme.typography.fontWeight.semibold,
                                color: ODLTheme.colors.text.secondary,
                                fontSize: ODLTheme.typography.fontSize.sm,
                                width: '120px'
                              }}>Status</th>
                              <th style={{
                                padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
                                textAlign: 'left',
                                fontWeight: ODLTheme.typography.fontWeight.semibold,
                                color: ODLTheme.colors.text.secondary,
                                fontSize: ODLTheme.typography.fontSize.sm,
                                width: '200px'
                              }}>Source Reference</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getFilteredItems().map((item, index) => {
                              const isExpanded = expandedRows.has(item.id);
                              const hasChildren = item.children && item.children.length > 0;
                              
                              return (
                                <React.Fragment key={item.id}>
                                  <tr style={{
                                    borderBottom: `1px solid ${ODLTheme.colors.border}`,
                                    backgroundColor: index % 2 === 1 ? ODLTheme.colors.surface : ODLTheme.colors.white,
                                    transition: ODLTheme.transitions.base
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = ODLTheme.colors.primaryLight;
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = index % 2 === 1 ? ODLTheme.colors.surface : ODLTheme.colors.white;
                                  }}
                                  >
                                    {/* Expand/Collapse Column */}
                                    <td style={{
                                      padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[2]}`,
                                      textAlign: 'center',
                                      width: '40px'
                                    }}>
                                      {hasChildren && (
                                        <button
                                          onClick={() => toggleRowExpansion(item.id)}
                                          style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '4px',
                                            borderRadius: ODLTheme.borders.radius.sm,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transition: ODLTheme.transitions.base
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                          }}
                                          aria-label={isExpanded ? 'Collapse merged items' : 'Expand merged items'}
                                        >
                                          <Icon 
                                            name={isExpanded ? 'chevron-down' : 'chevron-right'} 
                                            size={14} 
                                            style={{ color: ODLTheme.colors.primary }}
                                          />
                                        </button>
                                      )}
                                    </td>
                                    
                                    {/* Index Column */}
                                    <td style={{
                                      padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
                                      color: ODLTheme.colors.text.secondary,
                                      fontSize: ODLTheme.typography.fontSize.sm,
                                      fontWeight: ODLTheme.typography.fontWeight.medium,
                                      textAlign: 'center'
                                    }}>
                                      {index + 1}
                                    </td>
                                    
                                    {/* Type Column */}
                                    <td style={{
                                      padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
                                      color: ODLTheme.colors.text.primary,
                                      fontSize: ODLTheme.typography.fontSize.sm
                                    }}>
                                      <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: ODLTheme.spacing[2]
                                      }}>
                                        <div style={{
                                          padding: '2px 8px',
                                          borderRadius: '12px',
                                          fontSize: '10px',
                                          fontWeight: '500',
                                          textAlign: 'center',
                                          display: 'inline-block',
                                          backgroundColor: item.type === 'heading' || item.isHeaderOnly ? 'var(--odl-info-light)' : 
                                                         item.type === 'merged' ? 'var(--odl-primary-light)' : ODLTheme.colors.surface,
                                          color: item.type === 'heading' || item.isHeaderOnly ? 'var(--odl-info-dark)' :
                                                 item.type === 'merged' ? 'var(--odl-primary-dark)' : ODLTheme.colors.text.primary
                                        }}>
                                          {item.type === 'heading' || item.isHeaderOnly ? 'Heading' : 
                                           item.type === 'merged' ? 'Merged' : 'Item'}
                                        </div>
                                        {hasChildren && (
                                          <div style={{
                                            fontSize: ODLTheme.typography.fontSize.xs,
                                            color: ODLTheme.colors.text.secondary,
                                            background: ODLTheme.colors.surface,
                                            padding: '1px 4px',
                                            borderRadius: '8px'
                                          }}>
                                            {item.children!.length} items
                                          </div>
                                        )}
                                      </div>
                                    </td>
                                    
                                    {/* Content Column */}
                                    <td style={{
                                      padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
                                      color: ODLTheme.colors.text.primary,
                                      fontSize: ODLTheme.typography.fontSize.sm,
                                      maxWidth: '300px',
                                      fontWeight: item.type === 'heading' || item.isHeaderOnly ? 'bold' : 'normal'
                                    }}>
                                      <div style={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                      }} title={item.content}>
                                        {item.content}
                                      </div>
                                    </td>
                                    
                                    {/* Status Column */}
                                    <td style={{
                                      padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
                                      color: ODLTheme.colors.text.primary,
                                      fontSize: ODLTheme.typography.fontSize.sm
                                    }}>
                                      <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: ODLTheme.spacing[2]
                                      }}>
                                        <div style={{
                                          width: '8px',
                                          height: '8px',
                                          borderRadius: '50%',
                                          backgroundColor: 
                                            item.status === 'compliant' ? 'var(--odl-success)' :
                                            item.status === 'non-compliant' ? 'var(--odl-error)' :
                                            item.status === 'pending' ? 'var(--odl-warning)' :
                                            ODLTheme.colors.text.secondary
                                        }} />
                                        <span style={{
                                          textTransform: 'capitalize',
                                          fontSize: ODLTheme.typography.fontSize.xs
                                        }}>
                                          {item.status.replace('-', ' ')}
                                        </span>
                                      </div>
                                    </td>
                                    
                                    {/* Source Reference Column */}
                                    <td style={{
                                      padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
                                      color: ODLTheme.colors.text.secondary,
                                      fontSize: ODLTheme.typography.fontSize.sm
                                    }}>
                                      {item.sourceRef ? `${item.sourceRef.sectionNumber} (Lines ${item.sourceRef.lineNumbers.join('-')})` : '-'}
                                    </td>
                                  </tr>
                                  
                                  {/* Expanded Child Rows */}
                                  {isExpanded && hasChildren && item.children!.map((child, childIndex) => (
                                    <tr key={child.id} style={{
                                      backgroundColor: ODLTheme.colors.primaryLight,
                                      borderBottom: `1px solid ${ODLTheme.colors.border}`
                                    }}>
                                      <td style={{ padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[2]}` }}>
                                        <div style={{ paddingLeft: ODLTheme.spacing[4] }}>
                                          <Icon name="arrow-right" size={12} style={{ color: ODLTheme.colors.primary }} />
                                        </div>
                                      </td>
                                      <td style={{
                                        padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[4]}`,
                                        color: ODLTheme.colors.text.secondary,
                                        fontSize: ODLTheme.typography.fontSize.sm,
                                        fontWeight: ODLTheme.typography.fontWeight.medium,
                                        textAlign: 'center'
                                      }}>
                                        {childIndex + 1}
                                      </td>
                                      <td style={{
                                        padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[4]}`,
                                        color: ODLTheme.colors.text.primary,
                                        fontSize: ODLTheme.typography.fontSize.sm
                                      }}>
                                        <div style={{
                                          padding: '1px 6px',
                                          borderRadius: '8px',
                                          fontSize: '9px',
                                          fontWeight: '500',
                                          textAlign: 'center',
                                          display: 'inline-block',
                                          backgroundColor: ODLTheme.colors.surface,
                                          color: ODLTheme.colors.text.secondary
                                        }}>
                                          Child Item
                                        </div>
                                      </td>
                                      <td style={{
                                        padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[4]}`,
                                        color: ODLTheme.colors.text.primary,
                                        fontSize: ODLTheme.typography.fontSize.sm,
                                        maxWidth: '300px',
                                        paddingLeft: ODLTheme.spacing[6]
                                      }}>
                                        <div style={{
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                          whiteSpace: 'nowrap',
                                          fontStyle: 'italic'
                                        }} title={child.content}>
                                          {child.content}
                                        </div>
                                      </td>
                                      <td style={{
                                        padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[4]}`,
                                        color: ODLTheme.colors.text.primary,
                                        fontSize: ODLTheme.typography.fontSize.sm
                                      }}>
                                        <div style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: ODLTheme.spacing[2]
                                        }}>
                                          <div style={{
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: '50%',
                                            backgroundColor: 
                                              child.status === 'compliant' ? 'var(--odl-success)' :
                                              child.status === 'non-compliant' ? 'var(--odl-error)' :
                                              child.status === 'pending' ? 'var(--odl-warning)' :
                                              ODLTheme.colors.text.secondary
                                          }} />
                                          <span style={{
                                            textTransform: 'capitalize',
                                            fontSize: ODLTheme.typography.fontSize.xs,
                                            opacity: 0.8
                                          }}>
                                            {child.status.replace('-', ' ')}
                                          </span>
                                        </div>
                                      </td>
                                      <td style={{
                                        padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[4]}`,
                                        color: ODLTheme.colors.text.secondary,
                                        fontSize: ODLTheme.typography.fontSize.xs
                                      }}>
                                        {child.sourceRef ? `${child.sourceRef.sectionNumber} (Lines ${child.sourceRef.lineNumbers.join('-')})` : '-'}
                                      </td>
                                    </tr>
                                  ))}
                                </React.Fragment>
                              );
                            })}
                          </tbody>
                        </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Right Navigation Rail */}
        <div style={{ 
          height: '100%', 
          borderLeft: `1px solid ${ODLTheme.colors.border}` 
        }}>
          <NavigationRail
            currentPath={currentPath}
            onNavigate={setCurrentPath}
            menuItems={getRightMenuItems()}
            collapsed={isRightCollapsed}
            position="right"
            theme="light"
            showCollapseToggle={true}
            onCollapseToggle={setIsRightCollapsed}
            showTooltips={true}
            style={{ height: '100%' }}
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default ComplianceChecklistPage;