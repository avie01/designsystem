import { useState, useCallback, useRef, useEffect } from 'react';
import { LegislationDocument, ChecklistItem } from '../types';

interface ChecklistState {
  activeDocument: LegislationDocument | null;
  activeTab: 'overview' | 'document' | 'checklist' | 'review';
  showTOC: boolean;
  selectedSection: string | null;
  usedItems: Set<string>;
  removedItems: Set<string>;
  checklistTitle: string;
  checklistViewMode: 'editor' | 'document';
  reviewViewMode: 'grouped' | 'table';
  zoomLevel: number;
  tableFilters: {
    type: string;
    status: string;
    source: string;
  };
  expandedRows: Set<string>;
}

export const useComplianceChecklistState = () => {
  // Ref for timeout cleanup
  const zoomTimeoutRef = useRef<NodeJS.Timeout>();
  const [activeDocument, setActiveDocument] = useState<LegislationDocument | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'document' | 'checklist' | 'review'>('overview');
  const [showTOC, setShowTOC] = useState(true);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [usedItems, setUsedItems] = useState<Set<string>>(new Set());
  const [removedItems, setRemovedItems] = useState<Set<string>>(new Set());
  const [checklistTitle, setChecklistTitle] = useState<string>('Compliance Checklist - Draft');
  const [checklistViewMode, setChecklistViewMode] = useState<'editor' | 'document'>('editor');
  const [reviewViewMode, setReviewViewMode] = useState<'grouped' | 'table'>('grouped');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  
  const [tableFilters, setTableFilters] = useState({
    type: 'all',
    status: 'all',
    source: 'all'
  });
  
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const handleZoom = useCallback((newZoomLevel: number) => {
    // Clear any existing timeout to prevent memory leaks
    if (zoomTimeoutRef.current) {
      clearTimeout(zoomTimeoutRef.current);
    }
    
    const documentContainer = document.querySelector('[data-zoom-container="document"]') as HTMLElement;
    const checklistContainer = document.querySelector('[data-zoom-container="checklist"]') as HTMLElement;
    
    const container = activeTab === 'document' ? documentContainer : checklistContainer;
    
    if (!container) {
      setZoomLevel(newZoomLevel);
      return;
    }
    
    // Cache DOM measurements to avoid multiple reflows
    const currentScrollTop = container.scrollTop;
    const currentScrollLeft = container.scrollLeft;
    const containerHeight = container.clientHeight;
    const containerWidth = container.clientWidth;
    
    const centerY = currentScrollTop + containerHeight / 2;
    const centerX = currentScrollLeft + containerWidth / 2;
    
    const zoomRatio = newZoomLevel / zoomLevel;
    const newCenterY = centerY * zoomRatio;
    const newCenterX = centerX * zoomRatio;
    
    setZoomLevel(newZoomLevel);
    
    // Use ref to store timeout for cleanup
    zoomTimeoutRef.current = setTimeout(() => {
      const newScrollTop = newCenterY - containerHeight / 2;
      const newScrollLeft = newCenterX - containerWidth / 2;
      
      container.scrollTo({
        top: Math.max(0, newScrollTop),
        left: Math.max(0, newScrollLeft),
        behavior: 'auto'
      });
      
      // Clear ref after execution
      zoomTimeoutRef.current = undefined;
    }, 50);
  }, [zoomLevel, activeTab]);

  const toggleRowExpansion = useCallback((id: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const addUsedItem = useCallback((itemId: string) => {
    setUsedItems(prev => new Set(prev).add(itemId));
  }, []);

  const removeUsedItem = useCallback((itemId: string) => {
    setUsedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  }, []);

  const addRemovedItem = useCallback((itemId: string) => {
    setRemovedItems(prev => new Set(prev).add(itemId));
  }, []);

  const removeRemovedItem = useCallback((itemId: string) => {
    setRemovedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (zoomTimeoutRef.current) {
        clearTimeout(zoomTimeoutRef.current);
      }
    };
  }, []);

  return {
    // State
    activeDocument,
    activeTab,
    showTOC,
    selectedSection,
    usedItems,
    removedItems,
    checklistTitle,
    checklistViewMode,
    reviewViewMode,
    zoomLevel,
    tableFilters,
    expandedRows,
    
    // Setters
    setActiveDocument,
    setActiveTab,
    setShowTOC,
    setSelectedSection,
    setChecklistTitle,
    setChecklistViewMode,
    setReviewViewMode,
    setTableFilters,
    
    // Functions
    handleZoom,
    toggleRowExpansion,
    addUsedItem,
    removeUsedItem,
    addRemovedItem,
    removeRemovedItem
  };
};