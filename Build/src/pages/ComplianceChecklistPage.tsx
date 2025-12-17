import React, { useState, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { BuildAUHeader } from '../components/Headers';
import NavigationRail from '../components/NavigationRail/NavigationRail';
import Icon from '../components/Icon/Icon';
import Button from '../components/Button/Button';
import Table, { TableColumn } from '../components/Table/Table';
import Dropdown, { DropdownOption } from '../components/Dropdown/Dropdown';
import Drawer from '../components/Drawer/Drawer';
import Graph from '../components/Graph/Graph';
import Modal from '../components/Modal/Modal';
import Chip from '../components/Chip/Chip';
import InlineMetricCard from '../components/InlineMetricCard/InlineMetricCard';
import List, { ListItem } from '../components/List/List';
import ODLTheme from '../styles/ODLTheme';

// Import existing data
import { legislationService } from '../services/legislationService';
import { ComplianceService } from '../services/ComplianceService';
import mockChecklistData from '../data/mockChecklistData.json';

// Style constants - extracted for performance
const STYLES = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100vh',
    backgroundColor: ODLTheme.colors.background
  },
  mainLayout: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden'
  },
  sidebar: {
    width: '60px',
    transition: 'width 0.3s ease',
    backgroundColor: ODLTheme.colors.white,
    borderRight: `1px solid ${ODLTheme.colors.border}`
  },
  sidebarExpanded: {
    width: '256px'
  },
  contentArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden'
  },
  header: {
    padding: ODLTheme.spacing[4],
    backgroundColor: ODLTheme.colors.white,
    borderBottom: `1px solid ${ODLTheme.colors.border}`
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: ODLTheme.spacing[2],
    fontSize: ODLTheme.typography.fontSize.sm,
    color: ODLTheme.colors.text.secondary,
    marginBottom: ODLTheme.spacing[3]
  },
  pageTitle: {
    fontSize: ODLTheme.typography.fontSize.xl,
    fontWeight: ODLTheme.typography.fontWeight.semibold,
    color: ODLTheme.colors.text.primary,
    marginBottom: ODLTheme.spacing[2]
  },
  tabContainer: {
    display: 'flex',
    borderBottom: `1px solid ${ODLTheme.colors.border}`,
    backgroundColor: ODLTheme.colors.white
  },
  tab: {
    padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
    fontSize: ODLTheme.typography.fontSize.sm,
    fontWeight: ODLTheme.typography.fontWeight.regular,
    color: ODLTheme.colors.text.secondary,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    borderBottom: '2px solid transparent',
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
    gap: ODLTheme.spacing[2]
  },
  activeTab: {
    color: ODLTheme.colors.primary,
    fontWeight: ODLTheme.typography.fontWeight.medium,
    borderBottom: `2px solid ${ODLTheme.colors.primary}`
  },
  tabContent: {
    flex: 1,
    padding: 0,
    overflow: 'auto'
  },
  // Statistics cards for Overview tab
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: ODLTheme.spacing[4],
    marginBottom: ODLTheme.spacing[6]
  },
  statCard: {
    padding: ODLTheme.spacing[4],
    backgroundColor: ODLTheme.colors.white,
    border: `1px solid ${ODLTheme.colors.border}`,
    borderRadius: ODLTheme.borders.radius.md,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
  },
  statLabel: {
    fontSize: ODLTheme.typography.fontSize.sm,
    color: ODLTheme.colors.text.secondary,
    marginBottom: ODLTheme.spacing[2],
    fontWeight: ODLTheme.typography.fontWeight.medium
  },
  statValue: {
    fontSize: ODLTheme.typography.fontSize['3xl'],
    fontWeight: ODLTheme.typography.fontWeight.bold,
    color: ODLTheme.colors.text.primary,
    marginBottom: ODLTheme.spacing[1]
  },
  statTrend: {
    fontSize: ODLTheme.typography.fontSize.xs,
    display: 'flex',
    alignItems: 'center',
    gap: ODLTheme.spacing[1]
  },
  // Document viewer styles
  documentContainer: {
    display: 'flex',
    gap: 0,  // No gap - panels should join seamlessly
    height: '100%'
  },
  tocPanel: {
    width: '300px',
    backgroundColor: 'transparent',
    borderTop: `1px solid ${ODLTheme.colors.border}`,
    borderBottom: `1px solid ${ODLTheme.colors.border}`,
    borderLeft: `1px solid ${ODLTheme.colors.border}`,
    borderRight: 'none',
    borderTopLeftRadius: ODLTheme.borders.radius.md,
    borderBottomLeftRadius: ODLTheme.borders.radius.md,
    padding: ODLTheme.spacing[4],
    overflow: 'auto'
  },
  documentContent: {
    flex: 1,
    backgroundColor: 'transparent',
    borderTop: `1px solid ${ODLTheme.colors.border}`,
    borderBottom: `1px solid ${ODLTheme.colors.border}`,
    borderLeft: `1px solid ${ODLTheme.colors.border}`,
    borderRight: `1px solid ${ODLTheme.colors.border}`,
    borderTopRightRadius: ODLTheme.borders.radius.md,
    borderBottomRightRadius: ODLTheme.borders.radius.md,
    padding: ODLTheme.spacing[6],
    overflow: 'auto'
  },
  // Checklist table styles
  table: {
    width: '100%',
    backgroundColor: ODLTheme.colors.white,
    border: `1px solid ${ODLTheme.colors.border}`,
    borderRadius: ODLTheme.borders.radius.md,
    overflow: 'hidden'
  },
  tableHeader: {
    backgroundColor: ODLTheme.colors.surface,
    borderBottom: `2px solid ${ODLTheme.colors.border}`,
    fontWeight: ODLTheme.typography.fontWeight.semibold,
    fontSize: ODLTheme.typography.fontSize.sm
  },
  tableCell: {
    padding: ODLTheme.spacing[3],
    borderBottom: `1px solid ${ODLTheme.colors.border}`,
    fontSize: ODLTheme.typography.fontSize.sm
  }
} as const;

// Status options for dropdown
const statusOptions: DropdownOption[] = [
  { value: 'no-status', label: 'No Status' },
  { value: 'compliant', label: 'Compliant' },
  { value: 'non-compliant', label: 'Non-Compliant' },
  { value: 'pending', label: 'Pending Review' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'not-applicable', label: 'Not Applicable' }
];

// Mock data for demonstration
const mockChecklistItems = mockChecklistData.checklistItems;

type TabType = 'overview' | 'document' | 'checklist' | 'review';

const ComplianceChecklistPage: React.FC = () => {
  const { bcNumber } = useParams<{ bcNumber: string }>();
  
  // State management
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [checklistItems, setChecklistItems] = useState(mockChecklistItems);
  const [selectedContent, setSelectedContent] = useState<Set<string>>(new Set());
  const [showCreateButton, setShowCreateButton] = useState(false);
  const [lastClickedItem, setLastClickedItem] = useState<string | null>(null);
  const [allSelectableItems, setAllSelectableItems] = useState<string[]>([]);
  const [expandedChecklistItems, setExpandedChecklistItems] = useState<Set<string>>(new Set());
  // Pre-selected items by admin (disabled for user interaction)
  const adminPreselectedItems = new Set([
    // Planning considerations
    'planning-considerations:block-setback-requirements',
    'planning-considerations:block-height-limits',
    // Environment & Heritage
    'environment-heritage:division-1-1',
    'environment-heritage:heritage-impact',
    'environment-heritage:heritage-conservation',
    // Hazard Management
    'hazard-management:flood-planning',
    'hazard-management:bushfire-protection',
    // State Environmental Planning Policy (Housing) 2021 - Admin selected
    'affordable-housing:block-affordable-housing-levy',
    'affordable-housing:block-affordable-housing-alternatives',
    'section-1:heading',  // Section 1 heading
    'section-1:block-1-1',  // Policy framework
    'section-1:block-1-2',  // Policy objectives
    'section-1-1:heading',  // Name of Policy heading
    'section-1-1:block-1-1-1',  // Policy name definition
    'section-1-2:heading',  // Commencement heading
    'section-1-2:block-1-2-1'  // Commencement date
  ]);
  
  const [addedToChecklist, setAddedToChecklist] = useState<Set<string>>(adminPreselectedItems);
  const [showAIDrawer, setShowAIDrawer] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
  const [expandedTableRows, setExpandedTableRows] = useState<Set<string>>(new Set());
  const [suggestedItems, setSuggestedItems] = useState<any[]>([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState<Set<string>>(new Set());
  const [aiDescription, setAiDescription] = useState('');
  const [showTextArea, setShowTextArea] = useState(false);
  const [showInsightsModal, setShowInsightsModal] = useState(false);
  const [selectedItemInsights, setSelectedItemInsights] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'table' | 'grid' | 'document'>('table');
  const [statusMenuOpen, setStatusMenuOpen] = useState<string | null>(null);
  const [statusMenuPosition, setStatusMenuPosition] = useState<{ top: number; left: number } | null>(null);
  
  // Close status menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statusMenuOpen && !(event.target as Element).closest('[data-status-menu]')) {
        setStatusMenuOpen(null);
      }
    };
    
    if (statusMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [statusMenuOpen]);
  
  // Calculate statistics
  const statistics = useMemo(() => {
    const total = checklistItems.length;
    const compliant = checklistItems.filter(item => item.status === 'compliant').length;
    const nonCompliant = checklistItems.filter(item => item.status === 'non-compliant').length;
    const pending = checklistItems.filter(item => item.status === 'pending').length;
    const complianceRate = total > 0 ? Math.round((compliant / total) * 100) : 0;
    
    return { total, compliant, nonCompliant, pending, complianceRate };
  }, [checklistItems]);
  
  // Build list of all selectable items for range selection
  React.useEffect(() => {
    const document = legislationService.getDemoDocument();
    const items: string[] = [];
    document.sections.forEach(section => {
      // Add section heading
      items.push(`${section.id}:heading`);
      // Add all selectable content items
      section.content.forEach(content => {
        if (content.selectable) {
          items.push(`${section.id}:${content.id}`);
        }
      });
    });
    setAllSelectableItems(items);
  }, []);
  
  // Tab configuration
  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: 'dashboard' },
    { id: 'document' as const, label: 'Document', icon: 'document' },
    { id: 'checklist' as const, label: `Checklist (${statistics.total})`, icon: 'list' },
    { id: 'review' as const, label: 'Review & Export', icon: 'export' }
  ];
  
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return ODLTheme.colors.success;
      case 'non-compliant': return ODLTheme.colors.error;
      case 'pending': return ODLTheme.colors.warning;
      case 'in-progress': return ODLTheme.colors.info;
      case 'not-applicable': return ODLTheme.colors.text.disabled;
      case 'no-status': 
      default: return ODLTheme.colors.text.tertiary;
    }
  };
  
  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return 'checkmark-filled';
      case 'non-compliant': return 'close-filled';
      case 'pending': return 'time';
      case 'in-progress': return 'in-progress';
      case 'not-applicable': return 'subtract';
      case 'no-status':
      default: return 'help';
    }
  };
  
  // Update status handler
  const handleStatusChange = (itemId: string, newStatus: string) => {
    setChecklistItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, status: newStatus } : item
    ));
  };
  
  // Handle delete checklist item
  const handleDeleteItem = (itemId: string) => {
    setChecklistItems(prev => prev.filter(item => item.id !== itemId));
  };
  
  // Handle edit checklist item
  const handleEditItem = (itemId: string) => {
    const item = checklistItems.find(i => i.id === itemId);
    if (item) {
      const newContent = prompt('Edit checklist item:', item.content);
      if (newContent && newContent.trim()) {
        setChecklistItems(prev =>
          prev.map(i =>
            i.id === itemId ? { ...i, content: newContent.trim() } : i
          )
        );
      }
    }
  };
  
  // Toggle expanded state for table rows
  const toggleRowExpansion = (itemId: string) => {
    setExpandedTableRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };
  
  // Render Overview Tab
  const renderOverviewTab = () => (
    <div style={{
      backgroundColor: ODLTheme.colors.white,
      borderRadius: ODLTheme.borders.radius.md,
      padding: ODLTheme.spacing[6]
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: ODLTheme.spacing[4]
      }}>
        <h2 style={{ 
          fontSize: ODLTheme.typography.fontSize.lg,
          fontWeight: ODLTheme.typography.fontWeight.semibold,
          margin: 0
        }}>
          Compliance Overview
        </h2>
        
        <Button 
          variant="secondary" 
          icon={<Icon name="watson" size={16} />}
          onClick={() => setShowAIDrawer(true)}
        >
          AI Assist
        </Button>
      </div>
      
      {/* Ultra-Compact Inline Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: ODLTheme.spacing[2],
        marginBottom: ODLTheme.spacing[6]
      }}>
        <InlineMetricCard
          icon={statistics.complianceRate >= 80 ? 'growth' : 'arrow-down'}
          iconColor={statistics.complianceRate >= 80 ? ODLTheme.colors.success : statistics.complianceRate >= 60 ? ODLTheme.colors.warning : ODLTheme.colors.error}
          label="Compliance Rate"
          value={`${statistics.complianceRate}%`}
          trend={`${statistics.compliant} of ${statistics.total} compliant`}
          trendColor={statistics.complianceRate >= 80 ? ODLTheme.colors.success : statistics.complianceRate >= 60 ? ODLTheme.colors.warning : ODLTheme.colors.error}
        />
        
        <InlineMetricCard
          icon="checklist"
          iconColor={ODLTheme.colors.primary}
          label="Total Items"
          value={statistics.total}
          trend="Active checklist items"
          trendColor={ODLTheme.colors.primary}
        />
        
        <InlineMetricCard
          icon="warning"
          iconColor={ODLTheme.colors.error}
          label="Non-Compliant"
          value={statistics.nonCompliant}
          trend="Requires attention"
          trendColor={ODLTheme.colors.error}
        />
        
        <InlineMetricCard
          icon="time"
          iconColor={ODLTheme.colors.warning}
          label="Pending Review"
          value={statistics.pending}
          trend="Awaiting assessment"
          trendColor={ODLTheme.colors.warning}
        />
      </div>
      
      {/* Category Breakdown */}
      <h3 style={{
        fontSize: ODLTheme.typography.fontSize.md,
        fontWeight: ODLTheme.typography.fontWeight.semibold,
        marginBottom: ODLTheme.spacing[3]
      }}>
        Compliance by Category
      </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: ODLTheme.spacing[4] 
        }}>
          {['Safety', 'Accessibility', 'Environmental', 'Structural', 'Electrical', 'Plumbing', 'Heritage'].map(category => {
            const categoryItems = checklistItems.filter(item => item.category === category);
            const compliantCount = categoryItems.filter(item => item.status === 'compliant').length;
            const percentage = categoryItems.length > 0 ? Math.round((compliantCount / categoryItems.length) * 100) : 0;
            
            // Get unique legislation sources for this category
            const legislationSources = [...new Set(categoryItems.map(item => {
              if (item.source) {
                // Extract the main legislation name (before the dash)
                const mainLegislation = item.source.split(' - ')[0];
                return mainLegislation;
              }
              return null;
            }).filter(Boolean))];
            
            if (categoryItems.length === 0) return null;
            
            // Determine chip variant based on compliance percentage
            let chipVariant: 'success' | 'warning' | 'error' = 'error';
            if (percentage >= 80) chipVariant = 'success';
            else if (percentage >= 60) chipVariant = 'warning';
            
            return (
              <div key={category} style={{
                padding: ODLTheme.spacing[4],
                backgroundColor: ODLTheme.colors.white,
                borderRadius: ODLTheme.borders.radius.md,
                border: `1px solid ${ODLTheme.colors.border}`,
                boxShadow: ODLTheme.shadows.sm
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: ODLTheme.spacing[3]
                }}>
                  <div>
                    <h4 style={{ 
                      fontWeight: ODLTheme.typography.fontWeight.semibold,
                      fontSize: ODLTheme.typography.fontSize.base,
                      margin: 0,
                      marginBottom: ODLTheme.spacing[1]
                    }}>
                      {category}
                    </h4>
                    <div style={{ 
                      fontSize: ODLTheme.typography.fontSize.sm, 
                      color: ODLTheme.colors.text.secondary 
                    }}>
                      {compliantCount} of {categoryItems.length} items
                    </div>
                  </div>
                  <Chip
                    label={`${percentage}%`}
                    variant={chipVariant}
                    size="sm"
                    aria-label={`${category} compliance: ${percentage}%`}
                  />
                </div>
                
                {/* Legislation Sources */}
                {legislationSources.length > 0 && (
                  <div>
                    <div style={{
                      fontSize: ODLTheme.typography.fontSize.xs,
                      color: ODLTheme.colors.text.secondary,
                      marginBottom: ODLTheme.spacing[2],
                      fontWeight: ODLTheme.typography.fontWeight.medium
                    }}>
                      Applicable Legislation:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: ODLTheme.spacing[1] }}>
                      {legislationSources.map((source, index) => (
                        <Chip
                          key={index}
                          label={source}
                          variant="blue"
                          size="sm"
                          showDocumentIcon={true}
                          aria-label={`Legislation: ${source}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          }).filter(Boolean)}
        </div>
    </div>
  );
  
  // Handle content selection with Shift+Click for range and regular click for toggle
  const handleContentSelection = (contentId: string, sectionId: string, sectionTitle: string, event: React.MouseEvent) => {
    const itemKey = `${sectionId}:${contentId}`;
    let newSelection = new Set(selectedContent);
    
    if (event.shiftKey && lastClickedItem && allSelectableItems.length > 0) {
      // Shift+Click: Select range between last clicked and current item
      const startIndex = allSelectableItems.indexOf(lastClickedItem);
      const endIndex = allSelectableItems.indexOf(itemKey);
      
      if (startIndex !== -1 && endIndex !== -1) {
        const minIndex = Math.min(startIndex, endIndex);
        const maxIndex = Math.max(startIndex, endIndex);
        
        // Add all items in range to selection
        for (let i = minIndex; i <= maxIndex; i++) {
          newSelection.add(allSelectableItems[i]);
        }
      }
    } else {
      // Regular click: Toggle selection of this item
      if (newSelection.has(itemKey)) {
        newSelection.delete(itemKey);
      } else {
        newSelection.add(itemKey);
      }
    }
    
    setSelectedContent(newSelection);
    setShowCreateButton(newSelection.size > 0);
    setLastClickedItem(itemKey);
  };
  
  // Create checklist item from selection
  const createChecklistFromSelection = () => {
    const document = legislationService.getDemoDocument();
    const selectedItems: any[] = [];
    
    // Group selected items by section
    const itemsBySection = new Map<string, any[]>();
    
    selectedContent.forEach(itemKey => {
      const [sectionId, contentId] = itemKey.split(':');
      const section = document.sections.find(s => s.id === sectionId);
      if (section) {
        const content = section.content.find(c => c.id === contentId);
        if (content) {
          if (!itemsBySection.has(sectionId)) {
            itemsBySection.set(sectionId, []);
          }
          itemsBySection.get(sectionId)?.push({
            ...content,
            sectionTitle: section.title,
            sectionNumber: section.sectionNumber
          });
        }
      }
    });
    
    // Create a new checklist item with children
    const newChecklistItem: any = {
      id: `checklist-${Date.now()}`,
      content: `Compliance Requirements (${selectedContent.size} items)`,
      status: 'pending',
      category: 'Compliance',
      source: 'Selected from legislation',
      children: Array.from(itemsBySection.entries()).map(([sectionId, items]) => {
        const section = document.sections.find(s => s.id === sectionId);
        return {
          sectionTitle: section?.title || '',
          sectionNumber: section?.sectionNumber || '',
          items: items.map(item => ({
            id: item.id,
            text: item.text,
            clause: item.metadata?.clause || '',
            mandatory: item.metadata?.emphasis === 'mandatory',
            lineNumber: item.lineNumber
          }))
        };
      })
    };
    
    // Add to checklist items
    setChecklistItems([...checklistItems, newChecklistItem]);
    
    // Mark these items as added to checklist
    setAddedToChecklist(new Set([...addedToChecklist, ...selectedContent]));
    
    // Clear selection and switch to checklist tab
    setSelectedContent(new Set());
    setShowCreateButton(false);
    setActiveTab('checklist');
  };
  
  // Handle TOC navigation
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Render Document Tab
  const renderDocumentTab = () => {
    // Load demo document from legislation service
    const document = legislationService.getDemoDocument();
    
    return (
      <div style={{
        backgroundColor: ODLTheme.colors.white,
        borderRadius: ODLTheme.borders.radius.md,
        padding: ODLTheme.spacing[6]
      }}>
        <div style={STYLES.documentContainer}>
          <div style={STYLES.tocPanel}>
            <h3 style={{
              fontSize: ODLTheme.typography.fontSize.lg,
              fontWeight: ODLTheme.typography.fontWeight.semibold,
              color: ODLTheme.colors.text.primary,
              marginBottom: ODLTheme.spacing[4],
              paddingBottom: ODLTheme.spacing[2],
              borderBottom: `1px solid ${ODLTheme.colors.border}`,
              letterSpacing: '-0.01em'
            }}>
              Table of Contents
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: ODLTheme.spacing[2] }}>
              {document.sections.map(section => {
                // Check if any items from this section are selected
                const hasSelectedItems = Array.from(selectedContent).some(key => key.startsWith(`${section.id}:`));
                
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    style={{
                      textAlign: 'left',
                      padding: ODLTheme.spacing[2],
                      border: 'none',
                      background: hasSelectedItems ? ODLTheme.colors.primaryLight : 'none',
                      cursor: 'pointer',
                      fontSize: ODLTheme.typography.fontSize.sm,
                      color: hasSelectedItems ? ODLTheme.colors.primary : ODLTheme.colors.text.secondary,
                      transition: 'all 0.2s ease',
                      borderRadius: ODLTheme.borders.radius.sm,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderLeft: hasSelectedItems ? `3px solid ${ODLTheme.colors.primary}` : '3px solid transparent',
                      paddingLeft: ODLTheme.spacing[2]
                    }}
                    onMouseEnter={(e) => {
                      if (!hasSelectedItems) {
                        e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
                        e.currentTarget.style.color = ODLTheme.colors.primary;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!hasSelectedItems) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = ODLTheme.colors.text.secondary;
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[1] }}>
                      <span style={{ fontWeight: ODLTheme.typography.fontWeight.medium }}>
                        {section.sectionNumber}.
                      </span>
                      <span>{section.title}</span>
                    </div>
                    {hasSelectedItems && (
                      <Icon name="checkmark" size={14} color={ODLTheme.colors.primary} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div style={STYLES.documentContent}>
            <h2 style={{
              fontSize: ODLTheme.typography.fontSize.xl,
              fontWeight: ODLTheme.typography.fontWeight.semibold,
              marginBottom: ODLTheme.spacing[2]
            }}>
              {document.title}
            </h2>
            <div style={{
              fontSize: ODLTheme.typography.fontSize.sm,
              color: ODLTheme.colors.text.secondary,
              marginBottom: ODLTheme.spacing[4]
            }}>
              Version {document.version} | Effective: {new Date(document.effectiveDate).toLocaleDateString()}
            </div>
            <p style={{
              fontSize: ODLTheme.typography.fontSize.base,
              lineHeight: '1.6',
              color: ODLTheme.colors.text.primary,
              backgroundColor: ODLTheme.colors.info + '20',
              padding: ODLTheme.spacing[3],
              borderRadius: ODLTheme.borders.radius.sm,
              marginBottom: ODLTheme.spacing[4]
            }}>
              📌 Select items from this document to add to your compliance checklist.
              • Click to toggle selection (add/remove items)
              • Shift+Click to select a range of items
            </p>
            
            {/* Render document sections */}
            {document.sections.map(section => (
              <div 
                key={section.id} 
                id={`section-${section.id}`}
                style={{ 
                  marginBottom: ODLTheme.spacing[6],
                  scrollMarginTop: ODLTheme.spacing[4]  // Offset for smooth scrolling
                }}
              >
                <h3 style={{
                  fontSize: ODLTheme.typography.fontSize.lg,
                  fontWeight: ODLTheme.typography.fontWeight.semibold,
                  marginBottom: ODLTheme.spacing[3],
                  color: addedToChecklist.has(`${section.id}:heading`) 
                    ? ODLTheme.colors.text.disabled 
                    : ODLTheme.colors.primary,
                  padding: ODLTheme.spacing[2],
                  borderRadius: ODLTheme.borders.radius.sm,
                  cursor: addedToChecklist.has(`${section.id}:heading`) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: addedToChecklist.has(`${section.id}:heading`)
                    ? ODLTheme.colors.surface
                    : selectedContent.has(`${section.id}:heading`) 
                      ? ODLTheme.colors.primaryLight 
                      : 'transparent',
                  opacity: addedToChecklist.has(`${section.id}:heading`) ? 0.6 : 1,
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none'
                }}
                onMouseEnter={(e) => {
                  if (!selectedContent.has(`${section.id}:heading`) && !addedToChecklist.has(`${section.id}:heading`)) {
                    e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selectedContent.has(`${section.id}:heading`) && !addedToChecklist.has(`${section.id}:heading`)) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
                onClick={(e) => {
                  if (!addedToChecklist.has(`${section.id}:heading`)) {
                    handleContentSelection('heading', section.id, section.title, e);
                  }
                }}
                >
                  {section.sectionNumber}. {section.title}
                  {selectedContent.has(`${section.id}:heading`) && (
                    <Icon name="checkmark" size={16} style={{ marginLeft: ODLTheme.spacing[2], color: ODLTheme.colors.success }} />
                  )}
                </h3>
                {section.content.map(content => {
                  const itemKey = `${section.id}:${content.id}`;
                  const isSelected = selectedContent.has(itemKey);
                  const isInChecklist = addedToChecklist.has(itemKey);
                  const isAdminSelected = adminPreselectedItems.has(itemKey);
                  
                  return (
                    <div
                    key={content.id}
                    style={{
                      padding: ODLTheme.spacing[3],
                      marginBottom: ODLTheme.spacing[2],
                      lineHeight: '1.8',
                      borderLeft: isAdminSelected
                        ? `3px dashed ${ODLTheme.colors.text.tertiary}`
                        : isInChecklist 
                          ? `3px solid ${ODLTheme.colors.border}`
                          : isSelected 
                            ? `3px solid ${ODLTheme.colors.primary}` 
                            : '3px solid transparent',
                      backgroundColor: isAdminSelected
                        ? `${ODLTheme.colors.text.tertiary}15`
                        : isInChecklist
                          ? ODLTheme.colors.surface
                          : isSelected 
                            ? ODLTheme.colors.primaryLight 
                            : 'transparent',
                      cursor: isAdminSelected || isInChecklist ? 'not-allowed' : content.selectable ? 'pointer' : 'default',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      opacity: isAdminSelected ? 0.5 : isInChecklist ? 0.6 : 1,
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (content.selectable && !isSelected && !isInChecklist && !isAdminSelected) {
                        e.currentTarget.style.backgroundColor = ODLTheme.colors.primaryLight + '30';
                        e.currentTarget.style.borderLeft = `3px solid ${ODLTheme.colors.primary}`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected && !isInChecklist && !isAdminSelected) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderLeft = '3px solid transparent';
                      }
                    }}
                    onClick={(e) => {
                      if (content.selectable && !isInChecklist && !isAdminSelected) {
                        handleContentSelection(content.id, section.id, section.title, e);
                      }
                    }}
                  >
                    <span style={{
                      fontSize: ODLTheme.typography.fontSize.xs,
                      color: ODLTheme.colors.text.tertiary,
                      marginRight: ODLTheme.spacing[2]
                    }}>
                      Line {content.lineNumber}
                    </span>
                    {content.metadata?.clause && (
                      <span style={{
                        fontSize: ODLTheme.typography.fontSize.xs,
                        color: ODLTheme.colors.warning,
                        backgroundColor: ODLTheme.colors.warningLight,
                        padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`,
                        borderRadius: ODLTheme.borders.radius.sm,
                        marginRight: ODLTheme.spacing[2],
                        fontWeight: ODLTheme.typography.fontWeight.medium
                      }}>
                        {content.metadata.clause}
                      </span>
                    )}
                    {content.metadata?.emphasis === 'mandatory' && (
                      <span style={{
                        fontSize: ODLTheme.typography.fontSize.xs,
                        color: ODLTheme.colors.error,
                        backgroundColor: ODLTheme.colors.errorLight,
                        padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`,
                        borderRadius: ODLTheme.borders.radius.sm,
                        marginRight: ODLTheme.spacing[2],
                        fontWeight: ODLTheme.typography.fontWeight.semibold
                      }}>
                        MANDATORY
                      </span>
                    )}
                    <p style={{
                      margin: `${ODLTheme.spacing[2]} 0 0 0`,
                      fontSize: ODLTheme.typography.fontSize.base,
                      color: ODLTheme.colors.text.primary
                    }}>
                      {content.text}
                    </p>
                    {(isSelected || isInChecklist) && (
                      <Icon 
                        name={isInChecklist ? "checkmark-outline" : "checkmark-filled"}
                        size={20} 
                        style={{
                          position: 'absolute',
                          top: ODLTheme.spacing[2],
                          right: ODLTheme.spacing[2],
                          color: isInChecklist ? ODLTheme.colors.text.disabled : ODLTheme.colors.success
                        }}
                      />
                    )}
                    {(isInChecklist || isAdminSelected) && (
                      <span style={{
                        position: 'absolute',
                        top: ODLTheme.spacing[2],
                        right: ODLTheme.spacing[10],
                        fontSize: ODLTheme.typography.fontSize.xs,
                        color: isAdminSelected ? ODLTheme.colors.text.tertiary : ODLTheme.colors.text.disabled,
                        backgroundColor: isAdminSelected ? `${ODLTheme.colors.text.tertiary}20` : ODLTheme.colors.surface,
                        padding: `2px ${ODLTheme.spacing[2]}`,
                        borderRadius: ODLTheme.borders.radius.sm,
                        fontWeight: ODLTheme.typography.fontWeight.medium,
                        border: isAdminSelected ? `1px dashed ${ODLTheme.colors.text.tertiary}` : 'none'
                      }}>
                        {isAdminSelected ? 'Admin Pre-selected (Disabled)' : 'In Checklist'}
                      </span>
                    )}
                  </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  // Toggle checklist item expansion
  const toggleChecklistItemExpansion = (itemId: string) => {
    const newExpanded = new Set(expandedChecklistItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedChecklistItems(newExpanded);
  };
  
  // Render Checklist Tab
  const renderChecklistTab = () => {
    // Define table columns with new structure
    const columns: TableColumn<any>[] = [
      {
        key: 'content',
        label: 'Item',
        width: '300px',
        render: (item) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[2], maxWidth: '300px' }}>
            {item.children && item.children.length > 0 && (
              <Icon 
                name={expandedChecklistItems.has(item.id) ? 'chevron-down' : 'chevron-right'} 
                size={16}
                onClick={(e: any) => {
                  e.stopPropagation();
                  toggleChecklistItemExpansion(item.id);
                }}
                style={{ cursor: 'pointer', flexShrink: 0 }}
              />
            )}
            <span style={{ 
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
              fontSize: ODLTheme.typography.fontSize.sm
            }} title={item.content}>
              {item.content}
            </span>
            {item.children && item.children.length > 0 && (
              <span style={{
                fontSize: ODLTheme.typography.fontSize.xs,
                color: ODLTheme.colors.text.secondary,
                backgroundColor: ODLTheme.colors.surface,
                padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`,
                borderRadius: ODLTheme.borders.radius.full,
                flexShrink: 0
              }}>
                {item.children.reduce((acc: number, section: any) => acc + section.items.length, 0)} items
              </span>
            )}
          </div>
        )
      },
      {
        key: 'required',
        label: 'Required',
        width: '180px',
        render: (item) => (
          <div style={{ 
            fontSize: ODLTheme.typography.fontSize.sm,
            lineHeight: '1.4',
            maxWidth: '180px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }} title={item.required || '-'}>
            {item.required || '-'}
          </div>
        )
      },
      {
        key: 'proposed',
        label: 'Proposed',
        width: '160px',
        render: (item) => (
          <div style={{ 
            fontSize: ODLTheme.typography.fontSize.sm,
            lineHeight: '1.4',
            color: ODLTheme.colors.text.secondary,
            maxWidth: '160px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }} title={item.proposed || '-'}>
            {item.proposed || '-'}
          </div>
        )
      },
      {
        key: 'status',
        label: 'Compliance',
        width: '160px',
        render: (item) => (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Dropdown
              options={statusOptions}
              value={item.status}
              onChange={(value) => handleStatusChange(item.id, value)}
              size="sm"
              placeholder="Select compliance"
              style={{ minWidth: '150px' }}
            />
          </div>
        )
      },
      {
        key: 'position',
        label: 'Position',
        render: (item) => (
          <span style={{ fontSize: ODLTheme.typography.fontSize.sm }}>
            {item.position || '-'}
          </span>
        )
      },
      {
        key: 'fileNote',
        label: 'File note',
        width: '80px',
        render: (item) => {
          const fileNote = item.fileNote || item.source;
          if (fileNote && fileNote !== '-') {
            return (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Icon 
                  name="document" 
                  size={20}
                  className=""
                  style={{ 
                    color: ODLTheme.colors.text.secondary,
                    cursor: 'pointer',
                    width: '20px',
                    height: '20px'
                  }}
                  title={fileNote}
                  onClick={() => {
                    setSelectedItemInsights(item);
                    setShowInsightsModal(true);
                  }}
                />
              </div>
            );
          }
          return (
            <span style={{ 
              fontSize: ODLTheme.typography.fontSize.sm, 
              color: ODLTheme.colors.text.secondary,
              textAlign: 'center',
              display: 'block'
            }}>
              -
            </span>
          );
        }
      },
      {
        key: 'actions',
        label: 'Actions',
        width: '100px',
        render: (item) => (
          <div style={{ display: 'flex', gap: ODLTheme.spacing[2], justifyContent: 'center' }}>
            <Button 
              variant="ghost" 
              size="small" 
              icon={<Icon name="edit" size={16} />}
              onClick={() => handleEditItem(item.id)}
              aria-label="Edit item"
              style={{ padding: ODLTheme.spacing[1] }}
            />
            <Button 
              variant="ghost" 
              size="small" 
              icon={<Icon name="trash-can" size={16} />}
              onClick={() => handleDeleteItem(item.id)}
              aria-label="Delete item"
              style={{ padding: ODLTheme.spacing[1] }}
            />
          </div>
        )
      }
    ];

    return (
    <div style={{
      backgroundColor: ODLTheme.colors.white,
      borderRadius: ODLTheme.borders.radius.md,
      padding: ODLTheme.spacing[6]
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: ODLTheme.spacing[4]
      }}>
        <h2 style={{
          fontSize: ODLTheme.typography.fontSize.lg,
          fontWeight: ODLTheme.typography.fontWeight.semibold
        }}>
          Compliance Checklist Items
        </h2>
        <div style={{ display: 'flex', gap: ODLTheme.spacing[3], alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: ODLTheme.spacing[1] }}>
            <Button 
              variant={viewMode === 'table' ? 'tertiary' : 'ghost'} 
              size="small"
              icon={<Icon name="table" size={16} />}
              onClick={() => setViewMode('table')}
            >
              Table
            </Button>
            <Button 
              variant={viewMode === 'grid' ? 'tertiary' : 'ghost'}
              size="small" 
              icon={<Icon name="grid" size={16} />}
              onClick={() => setViewMode('grid')}
            >
              Cards
            </Button>
            <Button 
              variant={viewMode === 'document' ? 'tertiary' : 'ghost'}
              size="small" 
              icon={<Icon name="document" size={16} />}
              onClick={() => setViewMode('document')}
            >
              Document
            </Button>
          </div>
          <Button variant="primary" size="small">
            Add Item
          </Button>
        </div>
      </div>
      
{viewMode === 'table' ? (
        <div style={{ width: '100%', height: '100%' }}>
          <Table
            data={checklistItems}
            columns={columns}
            hoverable={true}
            striped={false}
            bordered={true}
            compact={true}
            paginated={true}
            pageSize={10}
            getRowKey={(item) => item.id}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      ) : viewMode === 'grid' ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: ODLTheme.spacing[4],
          marginTop: ODLTheme.spacing[4]
        }}>
          {checklistItems.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: ODLTheme.colors.white,
                border: `1px solid ${ODLTheme.colors.border}`,
                borderRadius: ODLTheme.borders.radius.md,
                padding: ODLTheme.spacing[4],
                boxShadow: ODLTheme.shadows.sm,
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = ODLTheme.colors.primary;
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = ODLTheme.colors.border;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Card Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: ODLTheme.spacing[3]
              }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    fontSize: ODLTheme.typography.fontSize.sm,
                    fontWeight: ODLTheme.typography.fontWeight.semibold,
                    margin: 0,
                    marginBottom: ODLTheme.spacing[1],
                    lineHeight: '1.4'
                  }}>
                    {item.content}
                  </h4>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: ODLTheme.spacing[2],
                    marginBottom: ODLTheme.spacing[2]
                  }}>
                    <Chip
                      label={item.category || 'General'}
                      variant="blue"
                      size="sm"
                    />
                    <div style={{ position: 'relative' }} data-status-menu>
                      <Chip
                        label={item.status.replace('-', ' ')}
                        variant={
                          item.status === 'compliant' ? 'success' :
                          item.status === 'non-compliant' ? 'error' :
                          item.status === 'pending' ? 'warning' :
                          item.status === 'in-progress' ? 'info' :
                          'grey'
                        }
                        size="sm"
                        iconName={getStatusIcon(item.status)}
                        clickable={true}
                        onClick={(e) => {
                          if (statusMenuOpen === item.id) {
                            setStatusMenuOpen(null);
                          } else {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setStatusMenuPosition({
                              top: rect.bottom + 4,
                              left: rect.left
                            });
                            setStatusMenuOpen(item.id);
                          }
                        }}
                      />
                      
                      {/* Status Menu Popup */}
                      {statusMenuOpen === item.id && statusMenuPosition && (
                        <div style={{
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          zIndex: 9999,
                          pointerEvents: 'none'
                        }}>
                          <div 
                            style={{
                              position: 'absolute',
                              top: `${statusMenuPosition.top}px`,
                              left: `${statusMenuPosition.left}px`,
                              backgroundColor: ODLTheme.colors.white,
                              border: `1px solid ${ODLTheme.colors.border}`,
                              borderRadius: ODLTheme.borders.radius.md,
                              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                              minWidth: '180px',
                              maxHeight: '240px',
                              overflow: 'auto',
                              pointerEvents: 'auto'
                            }}
                          >
                            <List
                              items={statusOptions.map((option): ListItem => ({
                                id: option.value,
                                label: option.label,
                                icon: <Icon name={getStatusIcon(option.value)} size={16} />,
                                selected: item.status === option.value
                              }))}
                              size="sm"
                              selectable={true}
                              onItemClick={(selectedItem) => {
                                handleStatusChange(item.id, selectedItem.id);
                                setStatusMenuOpen(null);
                                setStatusMenuPosition(null);
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: ODLTheme.spacing[1] }}>
                  <Button 
                    variant="ghost" 
                    size="small" 
                    icon={<Icon name="edit" size={14} />}
                    onClick={() => handleEditItem(item.id)}
                    aria-label="Edit item"
                    style={{ padding: ODLTheme.spacing[1] }}
                  />
                  <Button 
                    variant="ghost" 
                    size="small" 
                    icon={<Icon name="trash-can" size={14} />}
                    onClick={() => handleDeleteItem(item.id)}
                    aria-label="Delete item"
                    style={{ padding: ODLTheme.spacing[1] }}
                  />
                </div>
              </div>

              {/* Card Content */}
              <div style={{ marginBottom: ODLTheme.spacing[3] }}>
                {item.required && item.required !== '-' && (
                  <div style={{ marginBottom: ODLTheme.spacing[2] }}>
                    <div style={{
                      fontSize: ODLTheme.typography.fontSize.xs,
                      color: ODLTheme.colors.text.secondary,
                      fontWeight: ODLTheme.typography.fontWeight.semibold,
                      marginBottom: ODLTheme.spacing[1]
                    }}>
                      Required:
                    </div>
                    <div style={{
                      fontSize: ODLTheme.typography.fontSize.sm,
                      color: ODLTheme.colors.text.primary,
                      lineHeight: '1.4'
                    }}>
                      {item.required}
                    </div>
                  </div>
                )}
                {item.proposed && item.proposed !== '-' && (
                  <div style={{ marginBottom: ODLTheme.spacing[2] }}>
                    <div style={{
                      fontSize: ODLTheme.typography.fontSize.xs,
                      color: ODLTheme.colors.text.secondary,
                      fontWeight: ODLTheme.typography.fontWeight.semibold,
                      marginBottom: ODLTheme.spacing[1]
                    }}>
                      Proposed:
                    </div>
                    <div style={{
                      fontSize: ODLTheme.typography.fontSize.sm,
                      color: ODLTheme.colors.text.secondary,
                      lineHeight: '1.4'
                    }}>
                      {item.proposed}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: ODLTheme.spacing[2],
                borderTop: `1px solid ${ODLTheme.colors.border}`
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: ODLTheme.spacing[2]
                }}>
                  <div style={{
                    fontSize: ODLTheme.typography.fontSize.xs,
                    color: ODLTheme.colors.text.secondary
                  }}>
                    {item.position || 'No position'}
                  </div>
                  {(item.fileNote || item.source) && (item.fileNote !== '-' && item.source !== '-') && (
                    <Icon 
                      name="document" 
                      size={16}
                      className=""
                      style={{ 
                        color: ODLTheme.colors.text.secondary,
                        cursor: 'pointer',
                        width: '16px',
                        height: '16px'
                      }}
                      title={item.fileNote || item.source}
                      onClick={() => {
                        setSelectedItemInsights(item);
                        setShowInsightsModal(true);
                      }}
                    />
                  )}
                </div>
                <div style={{
                  fontSize: ODLTheme.typography.fontSize.xs,
                  color: ODLTheme.colors.text.tertiary,
                  fontStyle: 'italic'
                }}>
                  Click status to change
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : viewMode === 'document' ? (
        /* Document View - A4 Page Format */
        <div style={{
          backgroundColor: ODLTheme.colors.surface,
          padding: ODLTheme.spacing[6],
          marginTop: ODLTheme.spacing[4],
          display: 'flex',
          justifyContent: 'center'
        }}>
          {/* A4 Page Container */}
          <div style={{
            backgroundColor: ODLTheme.colors.white,
            width: '794px', // A4 width at 96 DPI (210mm)
            minHeight: '1123px', // A4 height at 96 DPI (297mm)
            padding: '60px 80px', // A4 margins (approximately 20mm each side)
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            fontFamily: ODLTheme.typography.fontFamily.sans,
            lineHeight: 1.6,
            fontSize: '12pt', // Standard document font size
            color: ODLTheme.colors.text.primary,
            position: 'relative'
          }}>
            {/* Document Header */}
            <div style={{
              borderBottom: `2px solid ${ODLTheme.colors.primary}`,
              paddingBottom: ODLTheme.spacing[4],
              marginBottom: ODLTheme.spacing[6]
            }}>
              <h1 style={{
                fontSize: '18pt',
                fontWeight: ODLTheme.typography.fontWeight.bold,
                margin: 0,
                marginBottom: ODLTheme.spacing[2],
                color: ODLTheme.colors.primary
              }}>
                COMPLIANCE CHECKLIST REPORT
              </h1>
              
              <div style={{
                fontSize: '10pt',
                color: ODLTheme.colors.text.secondary,
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: ODLTheme.spacing[2]
              }}>
                <div>
                  <div>Generated: {new Date().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</div>
                  <div style={{ marginTop: ODLTheme.spacing[1] }}>
                    Project: Build Application Assessment
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div>Total Items: {checklistItems.length}</div>
                  <div style={{ marginTop: ODLTheme.spacing[1] }}>
                    Page 1 of 1
                  </div>
                </div>
              </div>
            </div>

            {/* Document Content */}
            <div>
              {/* Executive Summary */}
              <div style={{ marginBottom: ODLTheme.spacing[6] }}>
                <h2 style={{
                  fontSize: '14pt',
                  fontWeight: ODLTheme.typography.fontWeight.semibold,
                  margin: 0,
                  marginBottom: ODLTheme.spacing[3],
                  color: ODLTheme.colors.text.primary
                }}>
                  Executive Summary
                </h2>
                
                <p style={{
                  fontSize: '11pt',
                  lineHeight: 1.6,
                  margin: 0,
                  marginBottom: ODLTheme.spacing[3],
                  textAlign: 'justify'
                }}>
                  This report presents a comprehensive compliance checklist assessment containing {checklistItems.length} items 
                  across multiple regulatory categories. Each item has been evaluated against established compliance criteria 
                  and documented with required and proposed measures where applicable.
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: ODLTheme.spacing[3],
                  marginTop: ODLTheme.spacing[4],
                  fontSize: '10pt'
                }}>
                  {[
                    { label: 'Compliant', count: checklistItems.filter(item => item.status === 'compliant').length, color: ODLTheme.colors.success },
                    { label: 'Pending', count: checklistItems.filter(item => item.status === 'pending').length, color: ODLTheme.colors.warning },
                    { label: 'In Progress', count: checklistItems.filter(item => item.status === 'in-progress').length, color: ODLTheme.colors.info },
                    { label: 'Non-Compliant', count: checklistItems.filter(item => item.status === 'non-compliant').length, color: ODLTheme.colors.error }
                  ].map(stat => (
                    <div key={stat.label} style={{
                      textAlign: 'center',
                      padding: ODLTheme.spacing[2],
                      border: `1px solid ${stat.color}`,
                      backgroundColor: stat.color + '10'
                    }}>
                      <div style={{ fontWeight: 'bold', fontSize: '14pt', color: stat.color }}>
                        {stat.count}
                      </div>
                      <div style={{ color: ODLTheme.colors.text.secondary }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Items */}
              <div>
                <h2 style={{
                  fontSize: '14pt',
                  fontWeight: ODLTheme.typography.fontWeight.semibold,
                  margin: 0,
                  marginBottom: ODLTheme.spacing[4],
                  color: ODLTheme.colors.text.primary,
                  borderTop: `1px solid ${ODLTheme.colors.border}`,
                  paddingTop: ODLTheme.spacing[4]
                }}>
                  Detailed Compliance Items
                </h2>

                {checklistItems.map((item, index) => (
                  <div key={item.id} style={{
                    marginBottom: ODLTheme.spacing[4],
                    padding: ODLTheme.spacing[3],
                    border: `1px solid ${ODLTheme.colors.border}`,
                    backgroundColor: ODLTheme.colors.background,
                    pageBreakInside: 'avoid'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      marginBottom: ODLTheme.spacing[2]
                    }}>
                      <div style={{
                        minWidth: '30px',
                        height: '20px',
                        backgroundColor: getStatusColor(item.status),
                        color: ODLTheme.colors.white,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '9pt',
                        fontWeight: 'bold',
                        marginRight: ODLTheme.spacing[3],
                        borderRadius: ODLTheme.borders.radius.sm
                      }}>
                        {index + 1}
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: '11pt',
                          fontWeight: ODLTheme.typography.fontWeight.semibold,
                          margin: 0,
                          marginBottom: ODLTheme.spacing[2],
                          color: ODLTheme.colors.text.primary
                        }}>
                          {item.content}
                        </h3>
                        
                        <div style={{ 
                          display: 'flex', 
                          gap: ODLTheme.spacing[2], 
                          marginBottom: ODLTheme.spacing[2],
                          fontSize: '9pt'
                        }}>
                          <span style={{
                            padding: `${ODLTheme.spacing[0.5]} ${ODLTheme.spacing[1.5]}`,
                            backgroundColor: ODLTheme.colors.primary + '20',
                            color: ODLTheme.colors.primary,
                            borderRadius: ODLTheme.borders.radius.sm,
                            fontWeight: 'medium'
                          }}>
                            {item.category || 'General'}
                          </span>
                          <span style={{
                            padding: `${ODLTheme.spacing[0.5]} ${ODLTheme.spacing[1.5]}`,
                            backgroundColor: getStatusColor(item.status) + '20',
                            color: getStatusColor(item.status),
                            borderRadius: ODLTheme.borders.radius.sm,
                            fontWeight: 'medium',
                            textTransform: 'capitalize'
                          }}>
                            {item.status.replace('-', ' ')}
                          </span>
                        </div>
                        
                        {(item.required && item.required !== '-') && (
                          <div style={{ 
                            fontSize: '10pt',
                            marginBottom: ODLTheme.spacing[1],
                            lineHeight: 1.4
                          }}>
                            <strong>Required Documentation:</strong>{' '}
                            <span style={{ color: ODLTheme.colors.text.secondary }}>
                              {item.required}
                            </span>
                          </div>
                        )}
                        
                        {(item.proposed && item.proposed !== '-') && (
                          <div style={{ 
                            fontSize: '10pt',
                            marginBottom: ODLTheme.spacing[1],
                            lineHeight: 1.4
                          }}>
                            <strong>Proposed Solution:</strong>{' '}
                            <span style={{ color: ODLTheme.colors.text.secondary }}>
                              {item.proposed}
                            </span>
                          </div>
                        )}
                        
                        {item.position && (
                          <div style={{ 
                            fontSize: '9pt',
                            color: ODLTheme.colors.text.tertiary,
                            marginTop: ODLTheme.spacing[1]
                          }}>
                            <em>Position: {item.position}</em>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Footer */}
            <div style={{
              position: 'absolute',
              bottom: '40px',
              left: '80px',
              right: '80px',
              borderTop: `1px solid ${ODLTheme.colors.border}`,
              paddingTop: ODLTheme.spacing[2],
              fontSize: '9pt',
              color: ODLTheme.colors.text.tertiary,
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <div>
                © {new Date().getFullYear()} Build Application System
              </div>
              <div>
                Confidential - For Internal Use Only
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
  };
  
  // Render Review Tab
  const renderReviewTab = () => (
    <div style={{
      backgroundColor: ODLTheme.colors.white,
      borderRadius: ODLTheme.borders.radius.md,
      padding: ODLTheme.spacing[6]
    }}>
      <h2 style={{
        fontSize: ODLTheme.typography.fontSize.lg,
        fontWeight: ODLTheme.typography.fontWeight.semibold,
        marginBottom: ODLTheme.spacing[4]
      }}>
        Review & Export
      </h2>
      
      <div style={{
        backgroundColor: ODLTheme.colors.white,
        border: `1px solid ${ODLTheme.colors.border}`,
        borderRadius: ODLTheme.borders.radius.md,
        padding: ODLTheme.spacing[4],
        marginBottom: ODLTheme.spacing[4]
      }}>
        <h3 style={{
          fontSize: ODLTheme.typography.fontSize.md,
          fontWeight: ODLTheme.typography.fontWeight.semibold,
          marginBottom: ODLTheme.spacing[3]
        }}>
          Checklist Summary
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: ODLTheme.spacing[2] }}>
          <div>Application: BC-{bcNumber || '2024-001'}</div>
          <div>Total Items: {statistics.total}</div>
          <div>Compliance Rate: {statistics.complianceRate}%</div>
          <div>Last Updated: {new Date().toLocaleDateString()}</div>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: ODLTheme.spacing[3] }}>
        <Button variant="primary" icon={<Icon name="document-pdf" size={16} />}>
          Export as PDF
        </Button>
        <Button variant="secondary" icon={<Icon name="document-export" size={16} />}>
          Export as CSV
        </Button>
        <Button variant="tertiary" icon={<Icon name="email" size={16} />}>
          Email Report
        </Button>
      </div>
    </div>
  );
  
  // Mock AI Analysis functionality
  const runAIAnalysis = () => {
    setAiAnalyzing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const recommendations: string[] = [];
      
      // Generate AI checklist items based on the assessment description
      recommendations.push('Fire Safety Systems - Verify smoke detectors, sprinklers, and fire extinguishers meet current standards');
      recommendations.push('Emergency Exits - Check all exit routes are clearly marked and unobstructed');
      recommendations.push('Accessibility Compliance - Ensure ramps, elevators, and doorways meet disability access requirements');
      recommendations.push('Structural Integrity - Assess load-bearing walls and foundation for renovation compatibility');
      recommendations.push('Electrical Systems - Verify wiring capacity for modern appliances and safety standards');
      recommendations.push('Plumbing Infrastructure - Check water pressure and pipe conditions for code compliance');
      recommendations.push('Asbestos Assessment - Required for 1960s building, test for presence in walls and insulation');
      recommendations.push('Energy Efficiency - Review insulation and window glazing against current standards');
      
      setAiRecommendations(recommendations);
      setAiAnalyzing(false);
    }, 2000);
  };
  
  // Analyze existing checklist
  const analyzeExistingChecklist = () => {
    setAiAnalyzing(true);
    
    setTimeout(() => {
      // Analyze current checklist items and provide insights
      const totalItems = checklistItems.length;
      const compliantItems = checklistItems.filter(item => item.status === 'compliant').length;
      const pendingItems = checklistItems.filter(item => item.status === 'pending').length;
      const nonCompliantItems = checklistItems.filter(item => item.status === 'non-compliant').length;
      
      const recommendations = [];
      
      if (pendingItems > 0) {
        recommendations.push(`${pendingItems} items are pending review - prioritize completion to improve compliance rate`);
      }
      
      if (nonCompliantItems > 0) {
        recommendations.push(`${nonCompliantItems} items are non-compliant - immediate action required for regulatory approval`);
      }
      
      const missingRequired = checklistItems.filter(item => !item.required || item.required === '-').length;
      if (missingRequired > 0) {
        recommendations.push(`${missingRequired} items missing required documentation - update specifications needed`);
      }
      
      const missingProposed = checklistItems.filter(item => !item.proposed || item.proposed === '-').length;
      if (missingProposed > 0) {
        recommendations.push(`${missingProposed} items missing proposed solutions - consider adding alternative approaches`);
      }
      
      if (compliantItems / totalItems >= 0.8) {
        recommendations.push('Strong compliance rate detected - consider expedited review process for remaining items');
      }
      
      recommendations.push('AI suggests grouping related items by category for more efficient review workflow');
      recommendations.push('Consider adding file notes to items without documentation for better tracking');
      
      setAiRecommendations(recommendations);
      setAiAnalyzing(false);
      setShowAIDrawer(false);
    }, 2000);
  };

  // Generate mock property development description based on BC number
  const generatePropertyDescription = (bcNum: string) => {
    const bcId = bcNum || bcNumber || '2024-001';
    const year = bcId.split('-')[0] || '2024';
    const num = bcId.split('-')[1] || '001';
    
    // Generate different property types based on the number
    const propertyTypes = [
      {
        type: 'Mixed-Use Development',
        details: `${Math.floor(Math.random() * 20 + 10)}-story mixed-use tower with retail ground floor and commercial spaces`,
        location: 'Sydney CBD',
        special: 'including heritage facade retention and public plaza'
      },
      {
        type: 'Residential Complex',
        details: `${Math.floor(Math.random() * 150 + 50)}-unit residential apartment complex with underground parking`,
        location: 'Melbourne Inner West',
        special: 'featuring rooftop gardens and communal facilities'
      },
      {
        type: 'Commercial Tower',
        details: `${Math.floor(Math.random() * 30 + 15)}-story Grade A office building with NABERS 6-star target`,
        location: 'Brisbane CBD',
        special: 'incorporating sustainable design and end-of-trip facilities'
      },
      {
        type: 'Industrial Facility',
        details: `${Math.floor(Math.random() * 10000 + 5000)}sqm warehouse and distribution center`,
        location: 'Western Sydney Industrial Zone',
        special: 'with automated logistics systems and solar panel installation'
      },
      {
        type: 'Healthcare Facility',
        details: `${Math.floor(Math.random() * 100 + 50)}-bed private hospital with specialist consulting suites`,
        location: 'Adelaide Metropolitan Area',
        special: 'including emergency department and medical imaging center'
      }
    ];
    
    // Select property type based on the number
    const index = parseInt(num) % propertyTypes.length;
    const property = propertyTypes[index];
    
    // Generate the description
    return `Application BC-${bcId}: ${property.type} located at ${property.location}. 
    
    Project comprises ${property.details}, ${property.special}. 
    
    Development includes comprehensive compliance requirements for DA approval, environmental impact assessment, traffic management plan, and construction management protocols. 
    
    Estimated project value: $${Math.floor(Math.random() * 100 + 50)}M with expected completion in Q${Math.floor(Math.random() * 4 + 1)} ${parseInt(year) + 2}.`;
  };

  // Set description when drawer opens
  React.useEffect(() => {
    if (showAIDrawer && !aiDescription) {
      const description = generatePropertyDescription(bcNumber || '2024-001');
      setAiDescription(description);
    }
  }, [showAIDrawer, bcNumber]);

  // Generate complete checklist
  const generateFullChecklist = () => {
    // Auto-generate description if empty
    if (!aiDescription.trim()) {
      const description = generatePropertyDescription(bcNumber || '2024-001');
      setAiDescription(description);
    }
    
    setAiAnalyzing(true);
    
    setTimeout(() => {
      // Randomly select and vary items from existing data
      const sourceItems = mockChecklistData.checklistItems;
      const randomCount = Math.floor(Math.random() * 8) + 5; // 5-12 items
      const shuffled = [...sourceItems].sort(() => Math.random() - 0.5);
      const selectedItems = shuffled.slice(0, randomCount);
      
      const newItems = selectedItems.map((item, index) => ({
        id: `ai-${Date.now()}-${index + 1}`,
        content: `${item.content} - AI Enhanced`,
        status: 'no-status',
        category: item.category,
        source: `AI Generated - ${item.source}`,
        required: item.required ? `${item.required}, AI compliance verification` : 'AI assessment required',
        proposed: item.proposed ? `${item.proposed}, automated compliance check` : 'AI-powered evaluation',
        position: item.position || `Section ${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 9) + 1}`,
        fileNote: Math.random() > 0.3 ? 'AI Generated Document' : undefined
      }));
      
      // Add to existing checklist
      console.log('Adding AI items:', newItems.length);
      setChecklistItems(prev => {
        const updated = [...prev, ...newItems];
        console.log('Updated checklist items count:', updated.length);
        return updated;
      });
      setAiAnalyzing(false);
      setShowAIDrawer(false);
      setActiveTab('checklist'); // Switch to checklist tab to show new items
    }, 2000);
  };

  return (
    <div style={{ 
      backgroundColor: 'transparent', 
      borderRadius: ODLTheme.borders.radius.lg,
      padding: ODLTheme.spacing[6],
      height: 'fit-content'
    }}>
      <div style={{
        backgroundColor: ODLTheme.colors.white,
        borderRadius: ODLTheme.borders.radius.md,
        padding: ODLTheme.spacing[6]
      }}>
      <div className="w-full">
      {/* Action Buttons - positioned at top right like other pages */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        gap: ODLTheme.spacing[3], 
        marginBottom: 0 
      }}>
        {activeTab === 'document' && showCreateButton && (
          <>
            <div style={{
              backgroundColor: ODLTheme.colors.surface,
              color: ODLTheme.colors.text.secondary,
              padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[3]}`,
              borderRadius: ODLTheme.borders.radius.md,
              fontSize: ODLTheme.typography.fontSize.sm,
              display: 'flex',
              alignItems: 'center'
            }}>
              {selectedContent.size} item{selectedContent.size !== 1 ? 's' : ''} selected
            </div>
            <Button 
              variant="primary" 
              icon={<Icon name="add" size={16} />}
              onClick={createChecklistFromSelection}
            >
              Add to Checklist
            </Button>
          </>
        )}
      </div>
      
      {/* Tabs */}
      <div style={STYLES.tabContainer}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              ...STYLES.tab,
              ...(activeTab === tab.id ? STYLES.activeTab : {})
            }}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div style={STYLES.tabContent}>
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'document' && renderDocumentTab()}
        {activeTab === 'checklist' && renderChecklistTab()}
        {activeTab === 'review' && renderReviewTab()}
      </div>
      
      {/* AI Assistant Drawer */}
      <Drawer
        isOpen={showAIDrawer}
        onClose={() => {
          setShowAIDrawer(false);
          setAiRecommendations([]);
        }}
        position="right"
        size="large"
        title="AI Compliance Assistant"
        className="drawer-no-top-gap"
        closeOnEscape={false}
        closeOnBackdropClick={false}
      >
        <div style={{ padding: ODLTheme.spacing[4] }}>
          <div style={{
            backgroundColor: ODLTheme.colors.info + '20',
            padding: ODLTheme.spacing[4],
            borderRadius: ODLTheme.borders.radius.md,
            marginBottom: ODLTheme.spacing[4],
            border: `1px solid ${ODLTheme.colors.info}`,
            transition: 'all 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[2], marginBottom: ODLTheme.spacing[2] }}>
              <Icon name="watson" size={24} color={ODLTheme.colors.info} />
              <h3 style={{ margin: 0, fontSize: ODLTheme.typography.fontSize.lg, color: ODLTheme.colors.text.primary }}>
                {activeTab === 'checklist' ? 'AI Checklist Analyzer' : 'AI Checklist Generator'}
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.secondary, marginBottom: ODLTheme.spacing[3] }}>
              {activeTab === 'checklist' 
                ? `Analyzing ${checklistItems.length} checklist items for compliance gaps and optimization opportunities.`
                : 'AI-generated property development description based on application ID'
              }
            </p>
            
            {/* Show the generated description */}
            {activeTab !== 'checklist' && aiDescription && (
              <div style={{
                backgroundColor: ODLTheme.colors.white,
                padding: ODLTheme.spacing[3],
                borderRadius: ODLTheme.borders.radius.base,
                marginTop: ODLTheme.spacing[3],
                fontSize: ODLTheme.typography.fontSize.sm,
                lineHeight: 1.6,
                color: ODLTheme.colors.text.primary,
                whiteSpace: 'pre-line'
              }}>
                {aiDescription}
              </div>
            )}
          </div>


          {/* Primary Action */}
          <div style={{ marginBottom: ODLTheme.spacing[4] }}>
            <Button
              variant="primary"
              icon={<Icon name={activeTab === 'checklist' ? "analyze" : "document-add"} size={16} />}
              onClick={activeTab === 'checklist' ? analyzeExistingChecklist : generateFullChecklist}
              style={{ 
                width: '100%',
                padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
                fontSize: ODLTheme.typography.fontSize.base
              }}
            >
              {activeTab === 'checklist' ? 'Analyze Current Checklist' : 'Generate Complete Checklist'}
            </Button>
            <div style={{
              fontSize: ODLTheme.typography.fontSize.xs,
              color: ODLTheme.colors.text.secondary,
              textAlign: 'center',
              marginTop: ODLTheme.spacing[2]
            }}>
              Creates a comprehensive checklist based on your project description
            </div>
          </div>
          
          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: ODLTheme.spacing[4],
            gap: ODLTheme.spacing[3]
          }}>
            <div style={{
              flex: 1,
              height: '1px',
              backgroundColor: ODLTheme.colors.border
            }} />
            <span style={{
              fontSize: ODLTheme.typography.fontSize.xs,
              color: ODLTheme.colors.text.secondary,
              textTransform: 'uppercase',
              fontWeight: ODLTheme.typography.fontWeight.medium
            }}>
              OR
            </span>
            <div style={{
              flex: 1,
              height: '1px',
              backgroundColor: ODLTheme.colors.border
            }} />
          </div>
          
          {/* Secondary Action */}
          <div style={{ marginBottom: ODLTheme.spacing[4] }}>
            <Button
              variant="secondary"
              icon={<Icon name="add" size={16} />}
              onClick={runAIAnalysis}
              style={{ 
                width: '100%',
                padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`
              }}
            >
              Suggest Additional Items
            </Button>
            <div style={{
              fontSize: ODLTheme.typography.fontSize.xs,
              color: ODLTheme.colors.text.secondary,
              textAlign: 'center',
              marginTop: ODLTheme.spacing[2]
            }}>
              Add specific items to your existing checklist
            </div>
          </div>


          {/* AI Recommendations */}
          {aiAnalyzing && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: ODLTheme.spacing[6],
              color: ODLTheme.colors.text.secondary
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  display: 'inline-block',
                  animation: 'spin 1s linear infinite',
                  marginBottom: ODLTheme.spacing[2]
                }}>
                  <Icon name="watson" size={32} />
                </div>
                <p>Analyzing compliance requirements...</p>
              </div>
            </div>
          )}

          {!aiAnalyzing && aiRecommendations.length > 0 && (
            <div>
              <h4 style={{
                fontSize: ODLTheme.typography.fontSize.md,
                fontWeight: ODLTheme.typography.fontWeight.semibold,
                marginBottom: ODLTheme.spacing[3],
                color: ODLTheme.colors.text.primary
              }}>
                Suggested Checklist Items
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: ODLTheme.spacing[2] }}>
                {aiRecommendations.map((recommendation, index) => {
                  const [title, description] = recommendation.split(' - ');
                  return (
                    <div
                      key={index}
                      style={{
                        padding: ODLTheme.spacing[3],
                        backgroundColor: ODLTheme.colors.surface,
                        borderRadius: ODLTheme.borders.radius.md,
                        border: `1px solid ${ODLTheme.colors.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: ODLTheme.spacing[2],
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = ODLTheme.colors.primaryLight;
                        e.currentTarget.style.borderColor = ODLTheme.colors.primary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
                        e.currentTarget.style.borderColor = ODLTheme.colors.border;
                      }}
                    >
                      <input
                        type="checkbox"
                        defaultChecked
                        style={{
                          width: '20px',
                          height: '20px',
                          cursor: 'pointer'
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <p style={{ 
                          margin: 0, 
                          fontSize: ODLTheme.typography.fontSize.sm,
                          fontWeight: ODLTheme.typography.fontWeight.medium,
                          color: ODLTheme.colors.text.primary 
                        }}>
                          {title}
                        </p>
                        {description && (
                          <p style={{ 
                            margin: `${ODLTheme.spacing[1]} 0 0 0`, 
                            fontSize: ODLTheme.typography.fontSize.xs,
                            color: ODLTheme.colors.text.secondary 
                          }}>
                            {description}
                          </p>
                        )}
                      </div>
                      <Icon 
                        name="add" 
                        size={20} 
                        color={ODLTheme.colors.primary}
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div style={{
                marginTop: ODLTheme.spacing[4],
                padding: `${ODLTheme.spacing[3]} 0`,
                borderTop: `1px solid ${ODLTheme.colors.border}`,
                display: 'flex',
                gap: ODLTheme.spacing[2]
              }}>
                <Button
                  variant="primary"
                  icon={<Icon name="checkmark-filled" size={16} />}
                  onClick={() => {
                    // Add selected items to checklist
                    const newItems = aiRecommendations.map((rec, idx) => {
                      const [title] = rec.split(' - ');
                      return {
                        id: `ai-suggested-${Date.now()}-${idx}`,
                        content: rec,
                        status: 'no-status',
                        category: title.includes('Fire') || title.includes('Emergency') ? 'Safety' : 
                                 title.includes('Access') ? 'Accessibility' : 
                                 title.includes('Struct') ? 'Structural' : 
                                 title.includes('Elect') ? 'Electrical' : 
                                 title.includes('Plumb') ? 'Plumbing' : 'General',
                        source: 'AI Suggested'
                      };
                    });
                    setChecklistItems(prev => [...prev, ...newItems]);
                    setShowAIDrawer(false);
                    setAiRecommendations([]);
                    setActiveTab('checklist');
                  }}
                  style={{ 
                    flex: 1,
                    fontSize: ODLTheme.typography.fontSize.sm
                  }}
                >
                  Add All Items ({aiRecommendations.length})
                </Button>
                <Button
                  variant="ghost"
                  icon={<Icon name="close" size={16} />}
                  onClick={() => {
                    setAiRecommendations([]);
                  }}
                  style={{ 
                    fontSize: ODLTheme.typography.fontSize.sm,
                    minWidth: '110px'
                  }}
                >
                  Clear All
                </Button>
              </div>

            </div>
          )}
        </div>
      </Drawer>

      {/* AI Insights Modal */}
      <Modal
        isOpen={showInsightsModal}
        onClose={() => setShowInsightsModal(false)}
        title="AI Insights"
        size="medium"
      >
        {selectedItemInsights && (
          <div>
            <div style={{
              marginBottom: ODLTheme.spacing[4],
              padding: ODLTheme.spacing[4],
              backgroundColor: ODLTheme.colors.info + '10',
              borderRadius: ODLTheme.borders.radius.md,
              border: `1px solid ${ODLTheme.colors.info}`
            }}>
              <h4 style={{
                fontSize: ODLTheme.typography.fontSize.base,
                fontWeight: ODLTheme.typography.fontWeight.semibold,
                marginBottom: ODLTheme.spacing[2],
                color: ODLTheme.colors.text.primary,
                display: 'flex',
                alignItems: 'center',
                gap: ODLTheme.spacing[2]
              }}>
                <Icon name="watson" size={20} />
                {selectedItemInsights.content}
              </h4>
              <div style={{
                fontSize: ODLTheme.typography.fontSize.sm,
                color: ODLTheme.colors.text.secondary,
                marginBottom: ODLTheme.spacing[3]
              }}>
                Category: {selectedItemInsights.category} | Status: {selectedItemInsights.status}
              </div>
            </div>

            <div style={{
              padding: ODLTheme.spacing[4],
              backgroundColor: ODLTheme.colors.warningLight,
              borderRadius: ODLTheme.borders.radius.md,
              border: `1px solid ${ODLTheme.colors.warning}`
            }}>
              <h5 style={{
                fontSize: ODLTheme.typography.fontSize.sm,
                fontWeight: ODLTheme.typography.fontWeight.semibold,
                marginBottom: ODLTheme.spacing[3],
                color: ODLTheme.colors.text.primary
              }}>
                AI Analysis & Recommendations
              </h5>
              <ul style={{ 
                margin: 0, 
                paddingLeft: ODLTheme.spacing[4],
                fontSize: ODLTheme.typography.fontSize.sm,
                color: ODLTheme.colors.text.secondary 
              }}>
                <li style={{ marginBottom: ODLTheme.spacing[1] }}>
                  Compliance Priority: {selectedItemInsights.status === 'compliant' ? 'Maintained - monitor for changes' : selectedItemInsights.status === 'non-compliant' ? 'High - immediate action required' : 'Medium - schedule for review'}
                </li>
                <li style={{ marginBottom: ODLTheme.spacing[1] }}>
                  Documentation: {selectedItemInsights.required ? `Required items available - ${selectedItemInsights.required}` : 'Documentation requirements need clarification'}
                </li>
                <li style={{ marginBottom: ODLTheme.spacing[1] }}>
                  Alternative Approach: {selectedItemInsights.proposed ? selectedItemInsights.proposed : 'Consider standard industry practices for this category'}
                </li>
                <li>
                  Risk Assessment: {selectedItemInsights.category === 'Safety' ? 'High impact - affects occupant safety' : selectedItemInsights.category === 'Structural' ? 'Critical - affects building integrity' : 'Moderate - affects compliance rating'}
                </li>
              </ul>
            </div>
          </div>
        )}
      </Modal>

      </div>
      </div>
    </div>
  );
};

export default ComplianceChecklistPage;