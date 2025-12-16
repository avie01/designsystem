/* Global Stylesheet Imports */
import './styles/globals.css';
import './styles/accessibility-fonts.css';
import './styles/accessibility-overrides.css';

/* Component Exports */
// Design System
export { default as DesignTokens, DesignTokensProvider } from './design-system/DesignTokens';
export { default as Icon } from './components/Icon/Icon';
// export { default as IconBrowser } from './components/Icon/IconUtils';
export { default as Header } from './components/Header/Header';
export { default as NavigationRail } from './components/NavigationRail/NavigationRail';
export { default as RightNavigationRail } from './components/NavigationRail/RightNavigationRail';
export { default as CustomRightNavigationRail } from './components/NavigationRail/CustomRightNavigationRail';
export { default as PageTemplate } from './components/PageTemplate/PageTemplate';
export { default as PageManager } from './components/PageManager/PageManager';
export { default as LayoutSwitcher } from './components/PageManager/LayoutSwitcher';
export { default as Breadcrumb } from './components/Breadcrumb/Breadcrumb';
export { default as TreeNavigation } from './components/TreeNavigation/TreeNavigation';
export { default as Table } from './components/Table/Table';
export { default as Chip } from './components/Chip/Chip';
export { default as UserAvatar } from './components/UserAvatar/UserAvatar';
export { default as UserAvatarDropdown } from './components/UserAvatar/UserAvatarDropdown';
export { default as Button } from './components/Button/Button';
export { default as Input } from './components/Input/Input';
export { default as AccessibilityPanel } from './components/AccessibilityPanel/AccessibilityPanel';
export { default as AlertBanner } from './components/AlertBanner/AlertBanner';
export { default as Tabs } from './components/Tabs/Tabs';
export { default as Cards } from './components/Cards/Cards';
export { default as DocumentTreemap } from './components/DocumentTreemap/DocumentTreemap';
export { default as DemoNavigation } from './components/DemoNavigation';
export { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext';

// Demo Pages
export { default as AlertBannerDemo } from './pages/AlertBannerDemo';
export { default as CardsDemo } from './pages/CardsDemo';
export { default as UserAvatarDropdownDemo } from './pages/UserAvatarDropdownDemo';

// Headers
export * from './components/Headers';

// Types - temporarily commented out due to build issues
// export type { IconProps } from './components/Icon/Icon';
// export type { HeaderProps } from './components/Header/Header';
// export type { NavigationRailProps, MenuItem } from './components/NavigationRail/NavigationRail';
// export type { RightNavigationRailProps } from './components/NavigationRail/RightNavigationRail';
// export type { PageTemplateProps } from './components/PageTemplate/PageTemplate';
// export type { PageLayout, PageManagerProps } from './components/PageManager/PageManager';
// export type { LayoutSwitcherProps } from './components/PageManager/LayoutSwitcher';
// export type { BreadcrumbProps, BreadcrumbItem } from './components/Breadcrumb/Breadcrumb';
// export type { TreeNavigationProps, TreeNode } from './components/TreeNavigation/TreeNavigation';
// export type { TableProps, TableColumn } from './components/Table/Table';
// export type { ChipProps } from './components/Chip/Chip';
// export type { UserAvatarProps, UserInfo } from './components/UserAvatar/UserAvatar';
// export type { UserAvatarDropdownProps, DropdownItem } from './components/UserAvatar/UserAvatarDropdown';
// export type { ButtonProps } from './components/Button/Button';
// export type { InputProps } from './components/Input/Input';
// export type { AlertBannerProps } from './components/AlertBanner/AlertBanner';
// export type { TabsProps, TabItem } from './components/Tabs/Tabs';
// export type { CardsProps } from './components/Cards/Cards';
// export type { DocumentTreemapProps } from './components/DocumentTreemap/DocumentTreemap';
// export type { AccessibilitySettings, HighContrastCustomization } from './context/AccessibilityContext';

// Design tokens
export { designTokens } from './design-system/tokens';