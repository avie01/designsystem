import ODLTheme from './ODLTheme';

/**
 * Compliance Checklist Page Styles
 * Centralized styling for compliance checklist components
 */

// Layout Styles
export const pageStyles = {
  container: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: ODLTheme.colors.background
  },
  
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden'
  },
  
  contentWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    padding: ODLTheme.spacing[6],
    overflow: 'auto',
    backgroundColor: ODLTheme.colors.background
  }
};

// Navigation Styles
export const navigationStyles = {
  sidebar: {
    width: '60px',
    transition: 'width 0.3s ease',
    backgroundColor: ODLTheme.colors.surface,
    borderRight: `1px solid ${ODLTheme.colors.border}`
  },
  
  sidebarExpanded: {
    width: '256px'
  }
};

// Tab Styles  
export const tabStyles = {
  tabContainer: {
    display: 'flex',
    gap: ODLTheme.spacing[2],
    borderBottom: `1px solid ${ODLTheme.colors.border}`,
    marginBottom: ODLTheme.spacing[4]
  },
  
  tabButton: (isActive: boolean) => ({
    padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[4]}`,
    border: 'none',
    backgroundColor: isActive ? ODLTheme.colors.primary : 'transparent',
    color: isActive ? ODLTheme.colors.white : ODLTheme.colors.text.secondary,
    fontSize: ODLTheme.typography.fontSize.sm,
    fontWeight: isActive ? ODLTheme.typography.fontWeight.medium : ODLTheme.typography.fontWeight.normal,
    cursor: 'pointer',
    borderRadius: `${ODLTheme.borders.radius.sm} ${ODLTheme.borders.radius.sm} 0 0`,
    transition: ODLTheme.transitions.base,
    display: 'flex',
    alignItems: 'center',
    gap: ODLTheme.spacing[1]
  }),
  
  tabContent: {
    flex: 1,
    overflow: 'auto',
    backgroundColor: ODLTheme.colors.white,
    borderRadius: ODLTheme.borders.radius.md,
    padding: ODLTheme.spacing[6]
  }
};

// Document View Styles
export const documentStyles = {
  container: {
    display: 'flex',
    gap: ODLTheme.spacing[6],
    height: '100%'
  },
  
  splitContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    gap: ODLTheme.spacing[4]
  },
  
  splitToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: ODLTheme.spacing[2],
    marginBottom: ODLTheme.spacing[4]
  },
  
  splitPanels: {
    display: 'flex',
    gap: ODLTheme.spacing[4],
    height: '100%',
    overflow: 'hidden'
  },
  
  splitPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    border: `1px solid ${ODLTheme.colors.border}`,
    borderRadius: ODLTheme.borders.radius.md,
    backgroundColor: ODLTheme.colors.white,
    overflow: 'hidden'
  },
  
  tocPanel: {
    width: '250px',
    flexShrink: 0,
    borderRight: `1px solid ${ODLTheme.colors.border}`,
    paddingRight: ODLTheme.spacing[4],
    overflowY: 'auto' as const
  },
  
  tocTitle: {
    fontSize: ODLTheme.typography.fontSize.md,
    fontWeight: ODLTheme.typography.fontWeight.semibold,
    marginBottom: ODLTheme.spacing[3]
  },
  
  tocButton: (hasSelectedItems: boolean) => ({
    textAlign: 'left' as const,
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
  }),
  
  contentArea: {
    flex: 1,
    overflowY: 'auto' as const,
    paddingRight: ODLTheme.spacing[4]
  },
  
  section: {
    marginBottom: ODLTheme.spacing[6],
    scrollMarginTop: ODLTheme.spacing[4]
  },
  
  sectionHeading: (isSelected: boolean, isInChecklist: boolean) => ({
    fontSize: ODLTheme.typography.fontSize.lg,
    fontWeight: ODLTheme.typography.fontWeight.semibold,
    marginBottom: ODLTheme.spacing[3],
    color: isInChecklist ? ODLTheme.colors.text.disabled : ODLTheme.colors.primary,
    padding: ODLTheme.spacing[2],
    borderRadius: ODLTheme.borders.radius.sm,
    cursor: isInChecklist ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: isInChecklist 
      ? ODLTheme.colors.surface
      : isSelected 
        ? ODLTheme.colors.primaryLight 
        : 'transparent',
    opacity: isInChecklist ? 0.6 : 1,
    userSelect: 'none' as const,
    WebkitUserSelect: 'none' as const,
    MozUserSelect: 'none' as const,
    msUserSelect: 'none' as const,
    position: 'relative' as const
  }),
  
  contentItem: (isSelected: boolean, isInChecklist: boolean, isAdminSelected: boolean) => ({
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
    cursor: isAdminSelected || isInChecklist ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative' as const,
    opacity: isAdminSelected ? 0.5 : isInChecklist ? 0.6 : 1
  }),
  
  lineNumber: {
    fontSize: ODLTheme.typography.fontSize.xs,
    color: ODLTheme.colors.text.tertiary,
    marginRight: ODLTheme.spacing[2]
  },
  
  clauseBadge: {
    fontSize: ODLTheme.typography.fontSize.xs,
    color: ODLTheme.colors.text.primary,
    backgroundColor: ODLTheme.colors.warningLight,
    padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`,
    borderRadius: ODLTheme.borders.radius.sm,
    marginRight: ODLTheme.spacing[2],
    fontWeight: ODLTheme.typography.fontWeight.medium
  },
  
  mandatoryBadge: {
    fontSize: ODLTheme.typography.fontSize.xs,
    color: ODLTheme.colors.text.primary,
    backgroundColor: ODLTheme.colors.errorLight,
    padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`,
    borderRadius: ODLTheme.borders.radius.sm,
    marginRight: ODLTheme.spacing[2],
    fontWeight: ODLTheme.typography.fontWeight.semibold
  },
  
  contentText: {
    margin: `${ODLTheme.spacing[2]} 0 0 0`,
    fontSize: ODLTheme.typography.fontSize.base,
    color: ODLTheme.colors.text.primary
  },
  
  checkmarkIcon: {
    position: 'absolute' as const,
    top: ODLTheme.spacing[2],
    right: ODLTheme.spacing[2],
    color: ODLTheme.colors.success
  },
  
  statusLabel: {
    position: 'absolute' as const,
    top: ODLTheme.spacing[2],
    right: ODLTheme.spacing[10],
    fontSize: ODLTheme.typography.fontSize.xs,
    padding: `2px ${ODLTheme.spacing[2]}`,
    borderRadius: ODLTheme.borders.radius.sm,
    fontWeight: ODLTheme.typography.fontWeight.medium
  }
};

// Checklist View Styles
export const checklistStyles = {
  container: {
    backgroundColor: ODLTheme.colors.white,
    borderRadius: ODLTheme.borders.radius.lg,
    padding: ODLTheme.spacing[6],
    boxShadow: ODLTheme.shadows.md,
    border: `1px solid ${ODLTheme.colors.border}`
  },
  
  tableContainer: {
    backgroundColor: ODLTheme.colors.white,
    borderRadius: ODLTheme.borders.radius.md,
    overflow: 'hidden',
    boxShadow: ODLTheme.shadows.sm,
    border: `1px solid ${ODLTheme.colors.border}`
  },
  
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ODLTheme.spacing[6],
    paddingBottom: ODLTheme.spacing[4],
    borderBottom: `1px solid ${ODLTheme.colors.border}`
  },
  
  title: {
    fontSize: ODLTheme.typography.fontSize.xl,
    fontWeight: ODLTheme.typography.fontWeight.semibold,
    color: ODLTheme.colors.text.primary
  },
  
  viewToggle: {
    display: 'flex',
    gap: ODLTheme.spacing[1],
    padding: ODLTheme.spacing[1],
    backgroundColor: ODLTheme.colors.surface,
    borderRadius: ODLTheme.borders.radius.md
  },
  
  emptyState: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: ODLTheme.spacing[8],
    textAlign: 'center' as const
  },
  
  emptyIcon: {
    opacity: 0.3,
    marginBottom: ODLTheme.spacing[3]
  },
  
  emptyText: {
    color: ODLTheme.colors.text.secondary,
    fontSize: ODLTheme.typography.fontSize.sm
  }
};

// Overview Tab Styles
export const overviewStyles = {
  container: {
    padding: ODLTheme.spacing[6]
  },
  
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: ODLTheme.spacing[4],
    marginBottom: ODLTheme.spacing[6]
  },
  
  statCard: {
    backgroundColor: ODLTheme.colors.white,
    border: `1px solid ${ODLTheme.colors.border}`,
    borderRadius: ODLTheme.borders.radius.md,
    padding: ODLTheme.spacing[4],
    display: 'flex',
    flexDirection: 'column' as const,
    gap: ODLTheme.spacing[2]
  },
  
  statLabel: {
    fontSize: ODLTheme.typography.fontSize.sm,
    color: ODLTheme.colors.text.secondary,
    fontWeight: ODLTheme.typography.fontWeight.medium
  },
  
  statValue: {
    fontSize: ODLTheme.typography.fontSize['3xl'],
    fontWeight: ODLTheme.typography.fontWeight.bold,
    color: ODLTheme.colors.text.primary
  },
  
  statChange: (isPositive: boolean) => ({
    fontSize: ODLTheme.typography.fontSize.xs,
    color: isPositive ? ODLTheme.colors.success : ODLTheme.colors.error,
    display: 'flex',
    alignItems: 'center',
    gap: ODLTheme.spacing[1]
  })
};

// Review Tab Styles
export const reviewStyles = {
  container: {
    backgroundColor: ODLTheme.colors.surface,
    borderRadius: ODLTheme.borders.radius.md,
    padding: ODLTheme.spacing[6]
  },
  
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ODLTheme.spacing[4],
    paddingBottom: ODLTheme.spacing[3],
    borderBottom: `1px solid ${ODLTheme.colors.border}`
  },
  
  groupedSection: {
    marginBottom: ODLTheme.spacing[6],
    backgroundColor: ODLTheme.colors.white,
    borderRadius: ODLTheme.borders.radius.md,
    overflow: 'hidden',
    border: `1px solid ${ODLTheme.colors.border}`
  },
  
  groupHeader: {
    backgroundColor: ODLTheme.colors.surface,
    padding: ODLTheme.spacing[4],
    borderBottom: `1px solid ${ODLTheme.colors.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  
  groupTitle: {
    fontSize: ODLTheme.typography.fontSize.base,
    fontWeight: ODLTheme.typography.fontWeight.semibold,
    color: ODLTheme.colors.text.primary,
    margin: 0
  },
  
  groupItems: {
    padding: ODLTheme.spacing[4]
  },
  
  reviewItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: ODLTheme.spacing[3],
    padding: ODLTheme.spacing[3],
    borderBottom: `1px solid ${ODLTheme.colors.border}`,
    transition: 'background-color 0.2s ease'
  },
  
  statusIndicator: (status: string) => ({
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 
      status === 'compliant' ? ODLTheme.colors.success :
      status === 'non-compliant' ? ODLTheme.colors.error :
      status === 'pending' ? ODLTheme.colors.warning :
      status === 'requires-further-info' ? ODLTheme.colors.purple :
      ODLTheme.colors.text.disabled,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: ODLTheme.colors.white,
    fontSize: '12px',
    fontWeight: 'bold',
    flexShrink: 0,
    marginTop: '2px'
  })
};

// Table Styles
export const tableStyles = {
  wrapper: {
    background: ODLTheme.colors.white,
    border: `1px solid ${ODLTheme.colors.border}`,
    borderRadius: ODLTheme.borders.radius.md,
    overflow: 'hidden',
    boxShadow: ODLTheme.shadows.sm
  },
  
  table: {
    width: '100%',
    borderCollapse: 'separate' as const,
    borderSpacing: 0,
    fontSize: ODLTheme.typography.fontSize.sm,
    fontFamily: ODLTheme.typography.fontFamily
  },
  
  thead: {
    background: `linear-gradient(180deg, ${ODLTheme.colors.white}, ${ODLTheme.colors.surface})`,
    borderBottom: `2px solid ${ODLTheme.colors.primary}`,
    position: 'sticky' as const,
    top: 0,
    zIndex: 10
  },
  
  th: {
    padding: `${ODLTheme.spacing[4]} ${ODLTheme.spacing[4]}`,
    textAlign: 'left' as const,
    fontWeight: ODLTheme.typography.fontWeight.semibold,
    color: ODLTheme.colors.primary,
    fontSize: ODLTheme.typography.fontSize.sm,
    textTransform: 'none' as const,
    letterSpacing: 'normal',
    borderBottom: `2px solid ${ODLTheme.colors.primary}`,
    whiteSpace: 'nowrap' as const
  },
  
  tr: (isEven: boolean, isSelected?: boolean, isDragging?: boolean) => ({
    backgroundColor: isDragging 
      ? `${ODLTheme.colors.primary}15`
      : isSelected 
        ? `${ODLTheme.colors.primary}10` 
        : isEven 
          ? `${ODLTheme.colors.surface}50` 
          : ODLTheme.colors.white,
    borderBottom: `1px solid ${ODLTheme.colors.border}`,
    transition: 'all 0.2s ease',
    cursor: isDragging ? 'grabbing' : 'pointer',
    opacity: isDragging ? 0.9 : 1,
    '&:hover': {
      backgroundColor: `${ODLTheme.colors.primary}05`,
      transform: 'translateY(-1px)',
      boxShadow: ODLTheme.shadows.sm
    }
  }),
  
  td: {
    padding: `${ODLTheme.spacing[4]} ${ODLTheme.spacing[4]}`,
    color: ODLTheme.colors.text.primary,
    fontSize: ODLTheme.typography.fontSize.sm,
    verticalAlign: 'middle' as const,
    borderBottom: `1px solid ${ODLTheme.colors.border}`,
    lineHeight: 1.6
  },
  
  dragHandle: {
    cursor: 'grab',
    padding: ODLTheme.spacing[1],
    color: ODLTheme.colors.text.tertiary,
    transition: ODLTheme.transitions.base,
    borderRadius: ODLTheme.borders.radius.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  dragHandleActive: {
    cursor: 'grabbing',
    color: ODLTheme.colors.primary
  },
  
  expandButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: ODLTheme.borders.radius.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: ODLTheme.transitions.base
  },
  
  typeBadge: (type: string) => ({
    padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`,
    borderRadius: ODLTheme.borders.radius.full,
    fontSize: ODLTheme.typography.fontSize.xs,
    fontWeight: ODLTheme.typography.fontWeight.medium,
    textAlign: 'center' as const,
    display: 'inline-flex',
    alignItems: 'center',
    gap: ODLTheme.spacing[1],
    backgroundColor: 
      type === 'heading' ? `${ODLTheme.colors.info}15` :
      type === 'merged' ? `${ODLTheme.colors.primary}15` : 
      `${ODLTheme.colors.text.secondary}10`,
    color: 
      type === 'heading' ? ODLTheme.colors.info :
      type === 'merged' ? ODLTheme.colors.primary : 
      ODLTheme.colors.text.primary,
    border: `1px solid ${
      type === 'heading' ? `${ODLTheme.colors.info}30` :
      type === 'merged' ? `${ODLTheme.colors.primary}30` : 
      'transparent'
    }`,
    textTransform: 'capitalize' as const,
    letterSpacing: '0.025em'
  }),
  
  statusDot: (status: string) => ({
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 
      status === 'compliant' ? ODLTheme.colors.success :
      status === 'non-compliant' ? ODLTheme.colors.error :
      status === 'pending' ? ODLTheme.colors.warning :
      status === 'requires-further-info' ? ODLTheme.colors.purple :
      ODLTheme.colors.text.secondary,
    boxShadow: `0 0 0 3px ${
      status === 'compliant' ? `${ODLTheme.colors.success}20` :
      status === 'non-compliant' ? `${ODLTheme.colors.error}20` :
      status === 'pending' ? `${ODLTheme.colors.warning}20` :
      status === 'requires-further-info' ? `${ODLTheme.colors.purple}20` :
      `${ODLTheme.colors.text.secondary}20`
    }`,
    display: 'inline-block'
  }),
  
  statusBadge: (status: string) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: ODLTheme.spacing[2],
    padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[3]}`,
    borderRadius: ODLTheme.borders.radius.full,
    fontSize: ODLTheme.typography.fontSize.xs,
    fontWeight: ODLTheme.typography.fontWeight.medium,
    backgroundColor: 
      status === 'compliant' ? `${ODLTheme.colors.success}10` :
      status === 'non-compliant' ? `${ODLTheme.colors.error}10` :
      status === 'pending' ? `${ODLTheme.colors.warning}10` :
      status === 'requires-further-info' ? `${ODLTheme.colors.purple}10` :
      `${ODLTheme.colors.text.secondary}10`,
    color: 
      status === 'compliant' ? ODLTheme.colors.success :
      status === 'non-compliant' ? ODLTheme.colors.error :
      status === 'pending' ? ODLTheme.colors.warning :
      status === 'requires-further-info' ? ODLTheme.colors.purple :
      ODLTheme.colors.text.secondary,
    border: `1px solid ${
      status === 'compliant' ? `${ODLTheme.colors.success}30` :
      status === 'non-compliant' ? `${ODLTheme.colors.error}30` :
      status === 'pending' ? `${ODLTheme.colors.warning}30` :
      status === 'requires-further-info' ? `${ODLTheme.colors.purple}30` :
      `${ODLTheme.colors.text.secondary}30`
    }`,
    textTransform: 'capitalize' as const
  })
};

// Common Button Styles
export const buttonStyles = {
  primary: {
    backgroundColor: ODLTheme.colors.primary,
    color: ODLTheme.colors.white,
    padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[4]}`,
    border: 'none',
    borderRadius: ODLTheme.borders.radius.md,
    fontSize: ODLTheme.typography.fontSize.sm,
    fontWeight: ODLTheme.typography.fontWeight.medium,
    cursor: 'pointer',
    transition: ODLTheme.transitions.base,
    display: 'flex',
    alignItems: 'center',
    gap: ODLTheme.spacing[2]
  },
  
  secondary: {
    backgroundColor: 'transparent',
    color: ODLTheme.colors.primary,
    padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[4]}`,
    border: `1px solid ${ODLTheme.colors.primary}`,
    borderRadius: ODLTheme.borders.radius.md,
    fontSize: ODLTheme.typography.fontSize.sm,
    fontWeight: ODLTheme.typography.fontWeight.medium,
    cursor: 'pointer',
    transition: ODLTheme.transitions.base,
    display: 'flex',
    alignItems: 'center',
    gap: ODLTheme.spacing[2]
  },
  
  ghost: {
    backgroundColor: 'transparent',
    color: ODLTheme.colors.text.secondary,
    padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[3]}`,
    border: 'none',
    borderRadius: ODLTheme.borders.radius.sm,
    fontSize: ODLTheme.typography.fontSize.sm,
    fontWeight: ODLTheme.typography.fontWeight.normal,
    cursor: 'pointer',
    transition: ODLTheme.transitions.base,
    display: 'flex',
    alignItems: 'center',
    gap: ODLTheme.spacing[1]
  }
};

// Modal Styles
export const modalStyles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  
  content: {
    backgroundColor: ODLTheme.colors.white,
    borderRadius: ODLTheme.borders.radius.lg,
    padding: ODLTheme.spacing[6],
    maxWidth: '600px',
    width: '90%',
    maxHeight: '80vh',
    overflow: 'auto',
    boxShadow: ODLTheme.shadows.lg
  },
  
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ODLTheme.spacing[4],
    paddingBottom: ODLTheme.spacing[3],
    borderBottom: `1px solid ${ODLTheme.colors.border}`
  },
  
  title: {
    fontSize: ODLTheme.typography.fontSize.lg,
    fontWeight: ODLTheme.typography.fontWeight.semibold,
    color: ODLTheme.colors.text.primary
  },
  
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: ODLTheme.colors.text.secondary,
    padding: ODLTheme.spacing[1],
    borderRadius: ODLTheme.borders.radius.sm,
    transition: ODLTheme.transitions.base
  },
  
  // Duplicate Detection Modal
  duplicateWarning: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: ODLTheme.spacing[3],
    padding: ODLTheme.spacing[4],
    backgroundColor: ODLTheme.colors.warningLight,
    borderRadius: ODLTheme.borders.radius.md,
    border: `1px solid ${ODLTheme.colors.warning}`,
    marginBottom: ODLTheme.spacing[4]
  },
  
  duplicateIcon: {
    color: ODLTheme.colors.warning,
    flexShrink: 0,
    marginTop: '2px'
  },
  
  duplicateContent: {
    flex: 1
  },
  
  duplicateTitle: {
    fontSize: ODLTheme.typography.fontSize.base,
    fontWeight: ODLTheme.typography.fontWeight.semibold,
    color: ODLTheme.colors.text.primary,
    marginBottom: ODLTheme.spacing[2]
  },
  
  duplicateText: {
    fontSize: ODLTheme.typography.fontSize.sm,
    color: ODLTheme.colors.text.secondary,
    marginBottom: ODLTheme.spacing[3]
  },
  
  duplicateMatch: {
    padding: ODLTheme.spacing[3],
    backgroundColor: ODLTheme.colors.surface,
    borderRadius: ODLTheme.borders.radius.sm,
    border: `1px solid ${ODLTheme.colors.border}`,
    fontSize: ODLTheme.typography.fontSize.sm,
    color: ODLTheme.colors.text.primary,
    fontStyle: 'italic'
  },
  
  modalActions: {
    display: 'flex',
    gap: ODLTheme.spacing[3],
    justifyContent: 'flex-end',
    marginTop: ODLTheme.spacing[6],
    paddingTop: ODLTheme.spacing[4],
    borderTop: `1px solid ${ODLTheme.colors.border}`
  }
};

// Progress Bar Styles
export const progressBarStyles = {
  container: {
    width: '100%',
    backgroundColor: 'var(--odl-surface)',
    borderRadius: ODLTheme.borders.radius.md,
    overflow: 'hidden',
    border: '1px solid var(--odl-border)',
    marginBottom: ODLTheme.spacing[4]
  },
  
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: ODLTheme.spacing[3],
    backgroundColor: 'var(--odl-white)',
    borderBottom: '1px solid var(--odl-border)'
  },
  
  title: {
    fontSize: ODLTheme.typography.fontSize.sm,
    fontWeight: ODLTheme.typography.fontWeight.semibold,
    color: 'var(--odl-text-primary)'
  },
  
  percentage: {
    fontSize: ODLTheme.typography.fontSize.sm,
    fontWeight: ODLTheme.typography.fontWeight.bold,
    color: 'var(--odl-primary)'
  },
  
  barContainer: {
    height: '12px',
    backgroundColor: 'var(--odl-surface)',
    position: 'relative' as const,
    overflow: 'hidden'
  },
  
  progressFill: (percentage: number, status: 'on-track' | 'behind' | 'critical') => ({
    height: '100%',
    width: `${percentage}%`,
    backgroundColor: 
      status === 'critical' ? 'var(--odl-error)' :
      status === 'behind' ? 'var(--odl-warning)' :
      'var(--odl-success)',
    transition: 'width 0.3s ease, background-color 0.3s ease',
    borderRadius: percentage < 100 ? '0' : ODLTheme.borders.radius.sm
  }),
  
  segments: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex'
  },
  
  segment: (width: number, color: string) => ({
    height: '100%',
    width: `${width}%`,
    backgroundColor: color,
    borderRight: '1px solid white'
  }),
  
  legend: {
    display: 'flex',
    gap: ODLTheme.spacing[3],
    padding: ODLTheme.spacing[3],
    backgroundColor: 'var(--odl-white)',
    fontSize: ODLTheme.typography.fontSize.xs
  },
  
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: ODLTheme.spacing[1]
  },
  
  legendDot: (color: string) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: color,
    flexShrink: 0
  }),
  
  legendLabel: {
    color: 'var(--odl-text-secondary)'
  }
};

// Utility function to get status color
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'compliant': return ODLTheme.colors.success;
    case 'non-compliant': return ODLTheme.colors.error;
    case 'pending': return ODLTheme.colors.warning;
    case 'in-progress': return ODLTheme.colors.info;
    case 'requires-further-info': return ODLTheme.colors.purple;
    case 'not-applicable': return ODLTheme.colors.text.disabled;
    default: return ODLTheme.colors.text.tertiary;
  }
};

// Utility function to get status icon name
export const getStatusIcon = (status: string): string => {
  switch (status) {
    case 'compliant': return 'checkmark-filled';
    case 'non-compliant': return 'close-filled';
    case 'pending': return 'time';
    case 'in-progress': return 'in-progress';
    case 'requires-further-info': return 'information';
    case 'not-applicable': return 'subtract';
    default: return 'help';
  }
};

export default {
  pageStyles,
  navigationStyles,
  tabStyles,
  documentStyles,
  checklistStyles,
  overviewStyles,
  reviewStyles,
  tableStyles,
  buttonStyles,
  modalStyles,
  progressBarStyles,
  getStatusColor,
  getStatusIcon
};