/* Global Stylesheet Imports */
import './styles/globals.css';
import './styles/accessibility-fonts.css';
import './styles/accessibility-overrides.css';

/* Component Exports */
// Design System
export * from './design-system/designTokens';
export { default as Icon } from './components/Icon/Icon';
// export { default as IconBrowser } from './components/Icon/IconUtils';
export { default as Header } from './components/Header/Header';
export { default as NavigationRail } from './components/NavigationRail/NavigationRail';
export { default as BuildNavigationRail } from './components/NavigationRail/BuildNavigationRail';
export { default as CustomRightNavigationRail } from './components/NavigationRail/CustomRightNavigationRail';
export { default as PageTemplate } from './components/PageTemplate/PageTemplate';
// PageManager removed - use Header and NavigationRail components directly
// export { default as PageManager } from './components/PageManager/PageManager';
// export { default as LayoutSwitcher } from './components/PageManager/LayoutSwitcher';
// Using Tailwind versions where available
export { default as Button } from './components/Button/ButtonTW';
export { default as Input } from './components/Input/InputTW';
export { default as Cards } from './components/Cards/CardsTW';
export { default as Chip } from './components/Chip/ChipTW';
export { default as Breadcrumb } from './components/Breadcrumb/BreadcrumbTW';

// Components with existing styles
export { default as TreeNavigation } from './components/TreeNavigation/TreeNavigation';
export { default as Table } from './components/Table/Table';
export { default as UserAvatar } from './components/UserAvatar/UserAvatar';
export { default as UserAvatarDropdown } from './components/UserAvatar/UserAvatarDropdown';

// Still using original versions (to be migrated)
export { default as Dropdown } from './components/Dropdown/Dropdown';
export { default as AccessibilityPanel } from './components/AccessibilityPanel/AccessibilityPanel';
export { default as AlertBanner } from './components/AlertBanner/AlertBanner';
export { default as Tabs } from './components/Tabs/Tabs';
export { default as DocumentTreemap } from './components/DocumentTreemap/DocumentTreemap';
export { default as DemoNavigation } from './components/DemoNavigation';
export { default as Modal } from './components/Modal/Modal';
export { default as Drawer } from './components/Drawer/Drawer';
export { default as ApplicationDetailCard } from './components/ApplicationDetailCard/ApplicationDetailCard';
export { default as DocumentLibraryCard } from './components/DocumentLibraryCard/DocumentLibraryCard';
export { default as CollapsibleCard } from './components/CollapsibleCard/CollapsibleCard';
export { default as ErrorBoundary, withErrorBoundary, useErrorHandler } from './components/ErrorBoundary/ErrorBoundary';
export { withLazyLoading, createLazyComponent, LoadingSpinner, LazyErrorBoundary } from './components/LazyWrapper';
export { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext';

// Utility functions
export { cn } from './utils/classNames';

// Demo Pages
export { default as AlertBannerDemo } from './pages/AlertBannerDemo';
export { default as CardsDemo } from './pages/CardsDemo';
export { default as UserAvatarDropdownDemo } from './pages/UserAvatarDropdownDemo';
export { default as ApplicationsPage } from './pages/ApplicationsPage';
export { default as ApplicationSummaryPage } from './pages/ApplicationSummaryPage';

// Headers
export * from './components/Headers';

// Type Exports
export type { IconProps } from './components/Icon/Icon';
export type { HeaderProps } from './components/Header/Header';
export type { NavigationRailProps, MenuItem } from './components/NavigationRail/NavigationRail';
export type { BuildNavigationRailProps, BuildMenuItem } from './components/NavigationRail/BuildNavigationRail';
export type { PageTemplateProps } from './components/PageTemplate/PageTemplate';
// PageManager types removed - use Header and NavigationRail components directly
// export type { PageLayout, PageManagerProps } from './components/PageManager/PageManager';
// export type { LayoutSwitcherProps } from './components/PageManager/LayoutSwitcher';
export type { BreadcrumbProps, BreadcrumbItem } from './components/Breadcrumb/Breadcrumb';
export type { TreeNavigationProps, TreeNode } from './components/TreeNavigation/TreeNavigation';
export type { TableProps, TableColumn } from './components/Table/Table';
export type { ChipProps } from './components/Chip/Chip';
export type { UserAvatarProps, UserInfo } from './components/UserAvatar/UserAvatar';
export type { UserAvatarDropdownProps, DropdownItem } from './components/UserAvatar/UserAvatarDropdown';
export type { ButtonProps } from './components/Button/Button';
export type { InputProps } from './components/Input/Input';
export type { DropdownProps, DropdownOption } from './components/Dropdown/Dropdown';
export type { AlertBannerProps } from './components/AlertBanner/AlertBanner';
export type { TabsProps, TabItem } from './components/Tabs/Tabs';
export type { CardsProps } from './components/Cards/Cards';
export type { DocumentTreemapProps } from './components/DocumentTreemap/DocumentTreemap';
export type { ModalProps } from './components/Modal/Modal';
export type { ErrorBoundaryProps } from './components/ErrorBoundary/ErrorBoundary';
export type { AccessibilitySettings, HighContrastCustomization } from './context/AccessibilityContext';

// Common Types
export * from './types/common';

// Design tokens
export { designTokens } from './design-system/tokens';