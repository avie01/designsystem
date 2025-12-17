# ODL Build Project - Pages Documentation

## Overview
The Build project contains **36 pages** serving as both a component library showcase and real application examples for council/government planning systems.

---

## 🏢 Core Application Pages

These pages represent actual application functionality for council/planning management systems.

### 1. ApplicationsPage.tsx
- **Purpose**: Main applications dashboard showing building/development applications
- **Features**: 
  - Table view with sorting and filtering
  - Application status tracking
  - Pagination controls
  - Search functionality
- **Data Elements**: BC numbers, project names, applicants, addresses, status, dates

### 2. ApplicationSummaryPage.tsx
- **Purpose**: Detailed view of a single application
- **Features**: 
  - Tab navigation (Summary/Detail/Site History)
  - Internal referrals tracking
  - Task management
  - Document library
  - Notes and comments
- **Components**: Planning summary, key dates, internal referrals, contacts, map view

### 3. CouncilDashboard.tsx
- **Purpose**: Council planning dashboard with stats and metrics
- **Features**: 
  - Application statistics
  - Priority indicators
  - Workflow tracking
  - Performance metrics

### 4. TasksSchedulingPage.tsx
- **Purpose**: Task management and scheduling for planning officers
- **Features**: 
  - Multiple view modes (Kanban, List, Calendar, Timeline)
  - Task details modal
  - Priority and status management
  - Drag-and-drop functionality
- **Views**: Kanban board, List view, Calendar view, Timeline/Gantt view

---

## 🎨 Component Demo Pages

Individual component demonstrations showcasing all variants and states.

### Layout & Navigation
- **ComponentsShowcase.tsx** - Gallery/catalog of all available components
- **NavigationRailDemo.tsx** - Side navigation rail patterns (collapsible, tooltips, nested)
- **HeaderDemo.tsx** - Application header variations for different products
- **BreadcrumbDemo.tsx** - Navigation breadcrumb patterns with icons
- **TreeNavigationDemo.tsx** - Hierarchical tree navigation with expandable nodes

### Input Components
- **ButtonDemo.tsx** - All button variants (Primary, Secondary, Ghost, Error)
- **InputDemo.tsx** - Input field variations (text, password, email, textarea)
- **DropdownDemo.tsx** - Dropdown/select component (single, multi, searchable)
- **ChipDemo.tsx** - Chip/tag components (selectable, closable, with icons)

### Display Components
- **TableDemo.tsx** - Table component with sorting, filtering, pagination
- **CardsDemo.tsx** - Card variations (basic, with actions, selectable)
- **TabsDemo.tsx** - Tab navigation patterns with icons and states

### Feedback Components
- **ModalDemo.tsx** - Modal dialogs (small, medium, large sizes)
- **DrawerDemo.tsx** - Side drawer/panel (left, right positions)
- **AlertBannerDemo.tsx** - Alert and notification banners (info, success, warning, error)
- **StepperDemo.tsx** - Step-by-step process indicators

### Data Visualization
- **GraphDemo.tsx** - Charts and graphs (line, bar, pie, area, scatter)
- **HierarchyVisualizationsDemo.tsx** - Organizational/data hierarchy displays

### User Components
- **UserAvatarDemo.tsx** - User avatar variations with status indicators
- **UserAvatarDropdownDemo.tsx** - Avatar with dropdown menu for user actions

---

## 🔧 Specialized Feature Pages

Complex feature demonstrations combining multiple components.

### Workflow & Process
- **KanbanDemo.tsx** - Kanban board with drag-and-drop functionality
- **ActiveWorkflowsDemo.tsx** - Workflow status and process visualization
- **InternalReferrals.tsx** - Internal referral management and tracking

### Data Management
- **ColumnSelectionDemo.tsx** - Table column customization (show/hide, reorder)
- **TotalDocumentsDemo.tsx** - Document management overview
- **TopSecretFilesDemo.tsx** - Secure document handling with access control

### Accessibility & Settings
- **AccessibilityPanelDemo.tsx** - Accessibility settings panel
- **SecurityStatusDemo.tsx** - Security dashboard and status display

---

## 📚 Utility & Documentation Pages

Style guides, templates, and documentation pages.

- **ODLStyleShowcase.tsx** - Design system style guide (colors, typography, spacing)
- **TemplatesDemo.tsx** - Common page layout templates
- **ImportGuide.tsx** - Component import documentation with usage examples
- **Page1Demo.tsx** - Generic page template example

---

## Page Organization Structure

```
src/pages/
├── Core Application Pages (4)
│   ├── ApplicationsPage.tsx
│   ├── ApplicationSummaryPage.tsx
│   ├── CouncilDashboard.tsx
│   └── TasksSchedulingPage.tsx
│
├── Component Demos (19)
│   ├── Input Components
│   ├── Display Components
│   ├── Feedback Components
│   └── Navigation Components
│
├── Feature Demos (8)
│   ├── Workflow Features
│   ├── Data Management
│   └── Visualization
│
└── Utility Pages (5)
    ├── Documentation
    ├── Style Guides
    └── Templates
```

---

## Design Patterns

All pages follow consistent patterns:

1. **Demo Pages Structure**:
   - Header with component name and description
   - Interactive examples section
   - Props/configuration showcase
   - Code examples
   - Features grid

2. **Application Pages Structure**:
   - Header with navigation and actions
   - Main content area with data
   - Sidebar or auxiliary panels
   - Footer with pagination/actions

3. **Common Elements**:
   - All use ODLTheme for consistent styling
   - Icon component from Carbon Design System
   - Responsive layouts
   - Accessibility features
   - TypeScript interfaces for type safety

---

## Technical Stack

- **Framework**: React 18+ with TypeScript
- **Styling**: ODLTheme design system
- **Icons**: Carbon Design System icons
- **State Management**: React hooks (useState, useEffect, useCallback)
- **Data**: JSON mock data and API integration ready
- **Build Tool**: Vite

---

## Key Features Across Pages

- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: Code splitting and lazy loading
- **Theming**: Consistent design tokens
- **Type Safety**: Full TypeScript coverage
- **Testing Ready**: Component structure supports unit/integration tests

---

*Last Updated: August 2024*
*Version: 1.0.0*