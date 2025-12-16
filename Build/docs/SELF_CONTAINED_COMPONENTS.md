# Self-Contained Components Documentation

This document outlines all the components that have been converted to be self-contained, removing external dependencies while maintaining functionality.

## Overview

All components have been updated to be completely self-contained by:
1. **Inlining the `clsx` dependency** with a simple `classNames` utility function
2. **Creating simple icon components** to replace Carbon icon dependencies
3. **Removing external component dependencies** and creating simplified versions
4. **Maintaining all functionality** while being completely standalone

## Components Updated

### 1. Button Component (`src/components/Button/Button.tsx`)
**Changes:**
- ✅ Removed `clsx` dependency
- ✅ Added self-contained `classNames` utility
- ✅ Updated all styling to use inline Tailwind classes
- ✅ Maintained all button variants and functionality

**Dependencies Removed:**
- `clsx`

### 2. Icon Component (`src/components/Icon/Icon.tsx`)
**Changes:**
- ✅ Removed `clsx` dependency
- ✅ Added self-contained `classNames` utility
- ✅ **Kept Carbon icons dependency as requested**
- ✅ Maintained all icon functionality

**Dependencies Removed:**
- `clsx`

**Dependencies Kept:**
- `@carbon/icons-react` (as requested)

### 3. Table Component (`src/components/Table/Table.tsx`)
**Changes:**
- ✅ Removed `clsx` and `Icon` dependencies
- ✅ Added self-contained `classNames` utility
- ✅ Created simple `SortIcon` component for table sorting
- ✅ Maintained all table functionality including sorting, pagination, and selection

**Dependencies Removed:**
- `clsx`
- `Icon` component

### 4. Chip Component (`src/components/Chip/Chip.tsx`)
**Changes:**
- ✅ Removed `clsx` dependency
- ✅ Added self-contained `classNames` utility
- ✅ Updated color classes to use standard Tailwind colors
- ✅ Maintained all chip variants and functionality

**Dependencies Removed:**
- `clsx`

### 5. UserAvatar Component (`src/components/UserAvatar/UserAvatar.tsx`)
**Changes:**
- ✅ Removed `clsx` dependency
- ✅ Added self-contained `classNames` utility
- ✅ Updated color palette to use standard Tailwind colors
- ✅ Maintained all avatar functionality including hover tooltips

**Dependencies Removed:**
- `clsx`

### 6. Tabs Component (`src/components/Tabs/Tabs.tsx`)
**Changes:**
- ✅ Removed `clsx` dependency and CSS module
- ✅ Added self-contained `classNames` utility
- ✅ Inlined all CSS styles as Tailwind classes
- ✅ Maintained all tab functionality including variants

**Dependencies Removed:**
- `clsx`
- CSS module (`Tabs.module.css`)

### 7. Input Component (`src/components/Input/Input.tsx`)
**Changes:**
- ✅ Removed `clsx` dependency
- ✅ Added self-contained `classNames` utility
- ✅ Updated styling to use standard Tailwind classes
- ✅ Maintained all input functionality including validation states

**Dependencies Removed:**
- `clsx`

### 8. Breadcrumb Component (`src/components/Breadcrumb/Breadcrumb.tsx`)
**Changes:**
- ✅ Removed `clsx` and `Icon` dependencies
- ✅ Added self-contained `classNames` utility
- ✅ Created simple `ChevronIcon` component
- ✅ Maintained all breadcrumb functionality

**Dependencies Removed:**
- `clsx`
- `Icon` component

### 9. AlertBanner Component (`src/components/AlertBanner/AlertBanner.tsx`)
**Changes:**
- ✅ Removed `clsx` and `Icon` dependencies
- ✅ Added self-contained `classNames` utility
- ✅ Created simple icon components (`CheckIcon`, `WarningIcon`, `ErrorIcon`, `InfoIcon`, `CloseIcon`)
- ✅ Maintained all alert functionality including auto-dismiss

**Dependencies Removed:**
- `clsx`
- `Icon` component

### 10. Cards Component (`src/components/Cards/Cards.tsx`)
**Changes:**
- ✅ Removed `clsx` and `Icon` dependencies
- ✅ Added self-contained `classNames` utility
- ✅ Created simple icon components (`FolderIcon`, `InfoIcon`)
- ✅ Maintained all card functionality including hover states

**Dependencies Removed:**
- `clsx`
- `Icon` component

### 11. NavigationRail Component (`src/components/NavigationRail/NavigationRail.tsx`)
**Changes:**
- ✅ Removed `clsx` and design tokens dependencies
- ✅ Added self-contained `classNames` utility
- ✅ Removed design tokens dependency
- ✅ Created simple icon placeholder
- ✅ Maintained all navigation functionality

**Dependencies Removed:**
- `clsx`
- `Icon` component
- Design tokens context

### 12. Header Component (`src/components/Header/Header.tsx`)
**Changes:**
- ✅ Removed `clsx` and `Icon` dependencies
- ✅ Added self-contained `classNames` utility
- ✅ Created simple icon components for notifications and alerts
- ✅ Simplified user avatar to basic implementation
- ✅ Maintained all header functionality

**Dependencies Removed:**
- `clsx`
- `Icon` component
- `UserAvatarDropdown` component

### 13. PageTemplate Component (`src/components/PageTemplate/PageTemplate.tsx`)
**Changes:**
- ✅ Removed `clsx`, `Header`, and `Breadcrumb` dependencies
- ✅ Added self-contained `classNames` utility
- ✅ Created simple `SimpleHeader` and `SimpleBreadcrumb` components
- ✅ Maintained all page template functionality

**Dependencies Removed:**
- `clsx`
- `Header` component
- `Breadcrumb` component

### 14. TreeNavigation Component (`src/components/TreeNavigation/TreeNavigation.tsx`)
**Changes:**
- ✅ Removed `clsx` and `Icon` dependencies
- ✅ Added self-contained `classNames` utility
- ✅ Created simple chevron icon components
- ✅ Maintained all tree navigation functionality

**Dependencies Removed:**
- `clsx`
- `Icon` component

### 15. DocumentTreemap Component (`src/components/DocumentTreemap/DocumentTreemap.tsx`)
**Changes:**
- ✅ Removed `@nivo/treemap` dependency
- ✅ Added self-contained `classNames` utility
- ✅ Created simple CSS Grid-based treemap visualization
- ✅ Maintained all treemap functionality with color coding

**Dependencies Removed:**
- `@nivo/treemap`

### 16. AccessibilityPanel Component (`src/components/AccessibilityPanel/AccessibilityPanel.tsx`)
**Changes:**
- ✅ Removed `clsx`, `Icon`, and accessibility context dependencies
- ✅ Added self-contained `classNames` utility
- ✅ Created simple icon components
- ✅ Simplified to basic accessibility settings
- ✅ Maintained core accessibility functionality

**Dependencies Removed:**
- `clsx`
- `Icon` component
- Accessibility context
- Sub-components (ThemeToggle, FontSelector, etc.)

## Utility Functions Added

All components now include this self-contained utility function:

```typescript
const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};
```

## Benefits of Self-Contained Components

1. **Reduced Bundle Size**: No external dependencies for basic functionality
2. **Faster Loading**: Fewer network requests for dependencies
3. **Easier Maintenance**: All code is visible and self-contained
4. **Better Portability**: Components can be used in any React project
5. **Consistent Styling**: All components use the same utility function

## Carbon Icons Note

As requested, the **Icon component still uses Carbon icons** (`@carbon/icons-react`) to maintain the existing icon system. All other components have been made self-contained with simple SVG icons where needed.

## Usage

All components can now be used independently without any external dependencies (except for the Icon component which still requires Carbon icons). Simply import and use:

```typescript
import Button from './components/Button/Button';
import Table from './components/Table/Table';
// etc.
```

Each component is completely self-contained and will work in any React environment with Tailwind CSS. 