# ODL Component Registry

## Overview
Complete registry of all ODL Library components with their status, demo pages, and usage guidelines.

## Component Status Legend
- ✅ **Production Ready** - Fully tested, documented, with demo page
- 🚧 **In Development** - Partially complete, may have issues
- 📋 **Planned** - Not yet implemented

## Core Components

### Navigation Components

#### NavigationRail ✅
- **Location**: `/src/components/NavigationRail/NavigationRail.tsx`
- **Demo**: Part of `/multipage-example.html`
- **Features**: 
  - Collapsible side navigation
  - Icon-based navigation items
  - Active state indicators
  - Tooltip support on hover
  - Mobile responsive

#### Header ✅
- **Location**: `/src/components/Header/Header.tsx`
- **Demo**: `/header-demo.html`
- **Variants**: Build, Connect, Keystone, Nexus, Regworks, 3Sixty, Custom
- **Features**:
  - Embedded SVG logos for all products
  - User avatar with dropdown
  - Search functionality
  - Notifications
  - Brand-specific color themes

#### Breadcrumb ✅
- **Location**: `/src/components/Breadcrumb/Breadcrumb.tsx`
- **Demo**: `/breadcrumb-demo.html`
- **Features**:
  - Clickable navigation path
  - Current page highlighting
  - Icon support
  - Responsive text truncation

### Input Components

#### Input ✅
- **Location**: `/src/components/Input/Input.tsx`
- **Demo**: `/input-demo.html`
- **Features**:
  - Text, email, password, number types
  - Calendar date picker integration
  - Validation states
  - Helper text
  - Icon support
  - Clear button

#### Dropdown ✅
- **Location**: `/src/components/Dropdown/Dropdown.tsx`
- **Demo**: `/dropdown-demo.html`
- **Features**:
  - Single and multi-select
  - Search/filter capability
  - Icon support in options
  - Group headers
  - Custom placeholder
  - Error states

#### Button ✅
- **Location**: `/src/components/Button/Button.tsx`
- **Demo**: `/button-demo.html`
- **Variants**: Primary, Secondary, Ghost, Destructive
- **Sizes**: XS, Small, Medium, Large
- **Features**:
  - Icon support (left/right)
  - Loading state
  - Disabled state
  - Full width option

### Data Display Components

#### Table ✅
- **Location**: `/src/components/Table/Table.tsx`
- **Demo**: `/table-demo.html`
- **Features**:
  - Sortable columns
  - Filterable data
  - Pagination
  - Row selection
  - Custom cell renderers
  - Responsive design
  - Export functionality

#### Cards ✅
- **Location**: `/src/components/Cards/Cards.tsx`
- **Demo**: `/cards-demo.html`
- **Features**:
  - Multiple layout patterns
  - Selection state
  - Action buttons
  - Status indicators
  - Hover effects
  - Grid layouts

#### Graph ✅
- **Location**: `/src/components/Graph/Graph.tsx`
- **Demo**: `/graph-demo.html`
- **Chart Types**:
  - Line, Area, Bar, Pie
  - Radar, Scatter, Composed
  - Radial, Treemap
- **Features**:
  - Responsive sizing
  - Animated transitions
  - Custom colors
  - Tooltips
  - Legends
  - Gradient fills

#### Badge ✅
- **Location**: `/src/components/Badge/Badge.tsx`
- **Demo**: Part of various demos
- **Variants**: Default, Success, Warning, Error, Info
- **Features**:
  - Icon support
  - Removable
  - Different sizes

#### Chip ✅
- **Location**: `/src/components/Chip/Chip.tsx`
- **Demo**: Part of Table and Cards demos
- **Features**:
  - Status colors
  - Icon support
  - Clickable
  - Removable

### Layout Components

#### Tabs ✅
- **Location**: SimpleTabs in `/src/pages/TabsDemo.tsx`
- **Demo**: `/tabs-demo.html`
- **Features**:
  - Icon support
  - Disabled states
  - Compact variant
  - Vertical orientation
  - Badge indicators

#### Modal ✅
- **Location**: `/src/components/Modal/Modal.tsx`
- **Demo**: `/modal-demo.html`
- **Sizes**: Small, Medium, Large, Full
- **Features**:
  - Header, body, footer sections
  - Close button
  - Backdrop click to close
  - Keyboard support (ESC)
  - Custom content

#### Drawer ✅
- **Location**: `/src/components/Drawer/Drawer.tsx`
- **Demo**: `/drawer-demo.html`
- **Features**:
  - Right-side slide panel
  - Document preview
  - Tabs within drawer
  - Responsive width
  - Overlay backdrop

#### Stepper ✅
- **Location**: `/src/components/Stepper/Stepper.tsx`
- **Demo**: `/stepper-demo.html`
- **Features**:
  - Linear progression
  - Step validation
  - Error states
  - Clickable steps
  - Vertical/horizontal layouts

### Feedback Components

#### AlertBanner ✅
- **Location**: `/src/components/AlertBanner/AlertBanner.tsx`
- **Demo**: `/alert-banner-demo.html`
- **Severities**: Info, Success, Warning, Error
- **Features**:
  - Dismissible
  - Action buttons
  - Icon indicators
  - Auto-dismiss timer

#### Tooltip ✅
- **Location**: `/src/components/Tooltip/Tooltip.tsx`
- **Demo**: Integrated in various components
- **Features**:
  - Multiple positions
  - Dark/light themes
  - HTML content support
  - Hover/click triggers

#### Popover ✅
- **Location**: `/src/components/Popover/Popover.tsx`
- **Demo**: Part of various components
- **Features**:
  - Custom content
  - Multiple positions
  - Click outside to close
  - Controlled/uncontrolled

### Utility Components

#### Icon ✅
- **Location**: `/src/components/Icon/Icon.tsx`
- **Demo**: Used throughout all demos
- **Features**:
  - Full Carbon icon set
  - Custom sizing
  - Color support
  - Rotation

#### BackToTop ✅
- **Location**: `/src/components/BackToTop/BackToTop.tsx`
- **Demo**: Present in all demo pages
- **Features**:
  - Smooth scroll
  - Show on scroll down
  - Fixed positioning

#### AccessibilityPanel ✅
- **Location**: `/src/components/AccessibilityPanel/AccessibilityPanel.tsx`
- **Demo**: `/multipage-example.html`
- **Features**:
  - Font size adjustment
  - High contrast mode
  - Reduced motion
  - Screen reader announcements

#### UserAvatar ✅
- **Location**: `/src/components/UserAvatar/UserAvatar.tsx`
- **Demo**: Part of Header component
- **Features**:
  - Image or initials
  - Status indicator
  - Dropdown menu
  - Multiple sizes

## Complex Page Examples

### Council Dashboard ✅
- **Location**: `/example/CouncilDashboard.tsx`
- **URL**: `/council-dashboard.html`
- **Demonstrates**:
  - Complex layout with tabs
  - Data visualization
  - Status cards
  - Tables with actions

### Development Applications Dashboard ✅
- **Location**: `/example/DevelopmentApplicationsDashboard.tsx`
- **URL**: `/development-applications-dashboard.html`
- **Demonstrates**:
  - KPI cards
  - Charts and graphs
  - Filterable tables
  - Timeline views

### Multipage Example ✅
- **Location**: `/example/MultiPageExample.tsx`
- **URL**: `/multipage-example.html`
- **Demonstrates**:
  - Full application structure
  - Navigation rail
  - Multiple page types
  - Lazy loading
  - Accessibility features

### Applications Page ✅
- **Location**: `/src/pages/ApplicationsPage.tsx`
- **Demo**: Part of multipage example
- **Demonstrates**:
  - Advanced filtering
  - Pagination
  - Status workflows
  - Drawer integration

## Planned Components 📋

### Form Components
- DateRangePicker
- TimePicker
- FileUpload
- RichTextEditor
- FormWizard

### Data Visualization
- Gauge
- Heatmap
- Timeline
- Gantt Chart
- Map

### Advanced Layout
- SplitPane
- Accordion
- TreeView
- Grid Layout
- Masonry

### Collaboration
- Comments
- Mentions
- Activity Feed
- Notifications Center

## Component Development Guidelines

### Creating New Components
1. Create component in `/src/components/{ComponentName}/`
2. Include TypeScript types
3. Use ODLTheme for all styling
4. Create demo page following pattern
5. Add to this registry
6. Update CLAUDE.md

### Demo Page Requirements
- Breadcrumb navigation
- Multiple demo variants
- Code examples
- Feature cards
- Responsive design
- Accessibility support

### Testing Checklist
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Mobile responsive
- [ ] Theme consistency
- [ ] Error states
- [ ] Loading states
- [ ] Edge cases

## Version History
- **v1.0.0** - Initial component set
- **v1.1.0** - Added Graph component with Recharts
- **v1.2.0** - Added Stepper, Drawer, AlertBanner
- **Current** - v1.2.1 - Replaced sparklines with Graph components