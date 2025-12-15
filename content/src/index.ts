/**
 * ODL Design System
 * A comprehensive React component library for building modern, accessible web applications
 *
 * @packageDocumentation
 */

// ============================================
// STYLES - Import global styles
// ============================================
import './styles/globals.css';
import './styles/base-components.css';
import './styles/design-tokens.css';

// ============================================
// THEME & DESIGN TOKENS
// ============================================
export { default as ODLTheme } from './styles/ODLTheme';
export {
  ODLColors,
  ODLTypography,
  ODLSpacing,
  ODLBorders,
  ODLShadows,
  ODLZIndex,
  ODLTransitions,
  ODLBreakpoints,
  ODLComponentStyles,
  applyODLStyles,
  getStatusColor,
  getStatusBackground,
} from './styles/ODLTheme';

export * from './design-system/designTokens';
export { designTokens } from './design-system/tokens';

// ============================================
// CORE COMPONENTS
// ============================================

// Layout & Navigation
export { default as Header } from './components/Header/Header';
export { default as NavigationRail } from './components/NavigationRail/NavigationRail';
export { default as BuildNavigationRail } from './components/NavigationRail/BuildNavigationRail';
export { default as CustomRightNavigationRail } from './components/NavigationRail/CustomRightNavigationRail';
export { default as PageTemplate } from './components/PageTemplate/PageTemplate';
export { default as Breadcrumb } from './components/Breadcrumb/BreadcrumbTW';
export { default as Tabs } from './components/Tabs/Tabs';
export { default as SimpleTabs } from './components/SimpleTabs/SimpleTabs';
export { default as Stepper } from './components/Stepper/Stepper';
export { default as TreeNavigation } from './components/TreeNavigation/TreeNavigation';
export { default as MillerColumns } from './components/MillerColumns/MillerColumns';
export { default as BackToTop } from './components/BackToTop/BackToTop';

// Form Components
export { default as Button } from './components/Button/ButtonTW';
export { default as Input } from './components/Input/InputTW';
export { default as Dropdown } from './components/Dropdown/Dropdown';
export { default as SimpleEditor } from './components/SimpleEditor/SimpleEditor';
export { default as FileUpload } from './components/FileUpload/FileUpload';

// Data Display
export { default as Table } from './components/Table/Table';
export { default as AdvancedTable } from './components/AdvancedTable/AdvancedTable';
export { default as Cards } from './components/CardComponents/Cards/CardsTW';
export { default as Card } from './components/CardComponents/Card/Card';
export { default as Chip } from './components/Chip/ChipTW';
export { default as List } from './components/List/List';
export { default as Icon } from './components/Icon/Icon';
export { default as UserAvatar } from './components/UserAvatar/UserAvatar';
export { default as UserAvatarDropdown } from './components/UserAvatar/UserAvatarDropdown';
export { default as UserCard } from './components/CardComponents/UserCard/UserCard';
export { default as StatusCard } from './components/CardComponents/StatusCard/StatusCard';
export { default as StatsCard } from './components/CardComponents/StatsCard/StatsCard';
export { default as StatsGrid } from './components/StatsGrid/StatsGrid';

// Charts & Visualization
export { default as Graph } from './components/Graph/Graph';
export { default as ChartCard } from './components/CardComponents/ChartCard/ChartCard';
export { default as DocumentTreemap } from './components/DocumentTreemap/DocumentTreemap';
export { default as Treemap } from './components/Treemap/Treemap';

// Cards & Containers
export { default as ApplicationDetailCard } from './components/CardComponents/ApplicationDetailCard/ApplicationDetailCard';
export { default as DocumentLibraryCard } from './components/CardComponents/DocumentLibraryCard/DocumentLibraryCard';
export { default as CollapsibleCard } from './components/CardComponents/CollapsibleCard/CollapsibleCard';

// Overlays & Feedback
export { default as Modal } from './components/Modal/Modal';
export { default as Drawer } from './components/Drawer/Drawer';
export { default as Popover } from './components/Popover/Popover';
export { default as AlertBanner } from './components/AlertBanner/AlertBanner';
export { default as AlertPanel } from './components/AlertPanel/AlertPanel';
export type { Alert } from './components/AlertPanel/AlertPanel';

// Advanced Components
export { default as Kanban } from './components/Kanban/Kanban';
export { default as DualPaneExplorer } from './components/DualPaneExplorer/DualPaneExplorer';
export { default as Accordion } from './components/Accordion/Accordion';
export { default as ColumnSelectionTree } from './components/ColumnSelectionTree/ColumnSelectionTree';

// Error Handling
export { default as ErrorBoundary, withErrorBoundary, useErrorHandler } from './components/ErrorBoundary/ErrorBoundary';
export { withLazyLoading, createLazyComponent, LoadingSpinner, LazyErrorBoundary } from './components/LazyWrapper';

// Headers Collection
export * from './components/Headers';

// ============================================
// UTILITIES
// ============================================
export { cn } from './utils/classNames';

// ============================================
// CONTEXT PROVIDERS
// ============================================
export { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext';

// ============================================
// TYPE EXPORTS
// ============================================

// Layout & Navigation Types
export type { HeaderProps } from './components/Header/Header';
export type { NavigationRailProps, MenuItem } from './components/NavigationRail/NavigationRail';
export type { BuildNavigationRailProps, BuildMenuItem } from './components/NavigationRail/BuildNavigationRail';
export type { PageTemplateProps } from './components/PageTemplate/PageTemplate';
export type { BreadcrumbProps, BreadcrumbItem } from './components/Breadcrumb/BreadcrumbTW';
export type { TabsProps, TabItem } from './components/Tabs/Tabs';
export type { TreeNavigationProps, TreeNode } from './components/TreeNavigation/TreeNavigation';

// Form Component Types
export type { ButtonProps } from './components/Button/ButtonTW';
export type { InputProps } from './components/Input/InputTW';
export type { DropdownProps, DropdownOption } from './components/Dropdown/Dropdown';
export type { FileUploadProps, UploadedFile, AIAnalysisResult, FileUploadVariant, FileStatus } from './components/FileUpload/FileUpload';

// Data Display Types
export type { TableProps, TableColumn } from './components/Table/Table';
export type { CardsProps } from './components/CardComponents/Cards/CardsTW';
export type { ChipProps } from './components/Chip/ChipTW';
export type { IconProps } from './components/Icon/Icon';
export type { UserAvatarProps, UserInfo } from './components/UserAvatar/UserAvatar';
export type { UserAvatarDropdownProps, DropdownItem } from './components/UserAvatar/UserAvatarDropdown';

// Visualization Types
export type { DocumentTreemapProps } from './components/DocumentTreemap/DocumentTreemap';

// Overlay Types
export type { ModalProps } from './components/Modal/Modal';
export type { AlertBannerProps } from './components/AlertBanner/AlertBanner';

// Error Handling Types
export type { ErrorBoundaryProps } from './components/ErrorBoundary/ErrorBoundary';

// Context Types
export type { AccessibilitySettings, HighContrastCustomization } from './context/AccessibilityContext';

// Common Types
export * from './types/common';
