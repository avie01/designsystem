# Storybook Numbering System

This document outlines the complete numbering system for the ODL Design System Storybook. All story files are numbered (01-53), and individual stories within each file are also numbered sequentially.

**Navigation Structure:** All components are organized under a single **"Design System"** parent container in the Storybook sidebar:

```
Design System (parent)
├── Components (alphabetical, 45 items)
│   ├── Accordion
│   ├── AdvancedTable
│   ├── AlertBanner
│   ├── ... (all components in alphabetical order)
│   └── YellowFolder
├── Legacy (3 legacy stories)
├── ODLTheme (design tokens)
└── Templates (page templates)
```

**File Numbering (Internal):** Story files are still numbered 01-53 to control the ordering:
- Files named `01-ODLTheme.stories.tsx`, `02-Header.stories.tsx`, etc.
- These numbers control Storybook's sidebar order but are hidden from the display
- Components are shown alphabetically within their category

## File-Level Organization (01-53)

### 01 - Foundations
- **01-ODLTheme.stories.tsx** (Design System/ODLTheme)
  - 01 Color Palette
  - 02 Typography
  - 03 Spacing
  - 04 Border Radius
  - 05 Shadows
  - 06 Transitions
  - 07 Z Index
  - 08 Breakpoints
  - 09 Component Presets
  - 10 Complete Reference

### 02-13 - Core Components (Layout, Navigation, Data)
- **02-Header.stories.tsx** (Design System/Components/Header)
  - 01 Build
  - 02 Connect
  - 03 Keystone
  - 04 With Notifications

- **03-NavigationRail.stories.tsx** (Design System/Components/NavigationRail)
  - 01 Default
  - 02 Collapsed
  - 03 With Toggle Button
  - 04 Right Position
  - 05 With Disabled Items
  - 06 No Tooltips

- **04-Drawer.stories.tsx** (Design System/Components/Drawer)
  - 01 Right Drawer
  - 02 Left Drawer
  - 03 Top Drawer
  - 04 Bottom Drawer
  - 05 All Sizes
  - 06 With Footer
  - 07 Without Overlay
  - 08 With Error
  - 09 Half Width
  - 10 Custom Dimensions
  - 11 No Close On Backdrop
  - 12 No Close On Escape
  - 13 All Positions
  - 14 Playground

- **05-PageTemplate.stories.tsx** (Design System/Components/PageTemplate)
  - 01 Default
  - 02 With Left Navigation
  - 03 Minimal Header
  - 04 With Subtitle
  - 05 With Alerts
  - 06 Custom Colors
  - 07 Long Breadcrumbs

- **06-Card.stories.tsx** (Design System/Components/Card)
  - 01 Default
  - 02 Hoverable
  - 03 Clickable
  - 04 No Border
  - 05 Small Padding
  - 06 Card Grid

- **07-Cards.stories.tsx** (Design System/Components/Cards)
  - 01 Default
  - 02 All States
  - 03 Sizes
  - 04 Interactive Features
  - 05 Icon Variations
  - 06 Real World Examples
  - 07 Accessibility Focus
  - 08 Edge Cases
  - 09 Playground

- **08-Breadcrumb.stories.tsx** (Design System/Components/Breadcrumb)
  - 01 Default
  - 02 Short
  - 03 Long Trail
  - 04 Application Context
  - 05 File System
  - 06 Dashboard
  - 07 Settings
  - 08 All Clickable
  - 09 Display Only
  - 10 Custom Styling
  - 11 Slash Separator
  - 12 Arrow Separator
  - 13 Pipe Separator
  - 14 Double Chevron Separator
  - 15 Dot Separator
  - 16 Playground
  - 17 With Chips

- **09-BreadcrumbGrid.stories.tsx** (Design System/Components/BreadcrumbGrid)
  - 01 Default
  - 02 Compact View
  - 03 With Callbacks
  - 04 Empty Folder
  - 05 Files Only
  - 06 With Status And Priority

- **10-Tabs.stories.tsx** (Design System/Components/Tabs)
  - 01 Default
  - 02 Compact Variant
  - 03 Without Content
  - 04 Controlled Tabs
  - 05 Many Tabs
  - 06 With Disabled Tabs
  - 07 Long Labels
  - 08 Both Variants
  - 09 Playground

- **11-SimpleTabs.stories.tsx** (Design System/Components/SimpleTabs)
  - 01 Default
  - 02 Compact Variant
  - 03 Full Width
  - 04 With Left Icons
  - 05 With Right Icons
  - 06 Without Content
  - 07 With Disabled Tabs
  - 08 Controlled Tabs
  - 09 Many Tabs
  - 10 All Variants
  - 11 Playground

- **12-Stepper.stories.tsx** (Design System/Components/Stepper)
  - 01 Horizontal Default
  - 02 Vertical Default
  - 03 With Icons
  - 04 With Error
  - 05 Small Size
  - 06 Large Size
  - 07 Compact
  - 08 With Expanded Content
  - 09 Clickable Steps
  - 10 All Completed
  - 11 Long Vertical Stepper
  - 12 Disabled

- **13-TreeNavigation.stories.tsx** (Design System/Components/TreeNavigation)
  - 01 Default
  - 02 With Documents
  - 03 Deep Nesting
  - 04 No Filter
  - 05 With Selection

### 14-19 - Input & Form Components
- **14-Button.stories.tsx** (Design System/Components/Button)
  - 01 Default
  - 02 All Variants
  - 03 Sizes
  - 04 With Left Icon
  - 05 With Right Icon
  - 06 Icon Only
  - 07 States
  - 08 Common Patterns
  - 09 Button Groups
  - 10 Playground

- **15-Input.stories.tsx** (Design System/Components/Input)
  - 01 Default
  - 02 With Helper Text
  - 03 Error State
  - 04 Disabled
  - 05 Required
  - 06 Textarea

- **16-Dropdown.stories.tsx** (Design System/Components/Dropdown)
  - 01 Default
  - 02 With Value
  - 03 Searchable
  - 04 Required
  - 05 Error State
  - 06 Disabled

- **17-FileUpload.stories.tsx** (Design System/Components/FileUpload)
  - 01 Default
  - 02 Dropzone Small
  - 03 Dropzone Large
  - 04 Button
  - 05 Button Multiple
  - 06 Compact
  - 07 Compact In Drawer
  - 08 Picture Card
  - 09 Picture Card Single
  - 10 With AI Analysis
  - 11 Compact With AI
  - 12 With Error
  - 13 Disabled
  - 14 Compact Disabled
  - 15 With Progress
  - 16 All Variants

- **18-Popover.stories.tsx** (Design System/Components/Popover)
  - 01 Bottom Start
  - 02 Top Center
  - 03 Left Align
  - 04 Right Align
  - 05 With Icon Trigger
  - 06 With List
  - 07 With Form
  - 08 User Profile
  - 09 Rich Content
  - 10 Color Picker

- **19-SimpleEditor.stories.tsx** (Design System/Components/SimpleEditor)
  - 01 Default
  - 02 With Initial Content
  - 03 Empty Editor
  - 04 Document Editor
  - 05 With Image Handler
  - 06 Formatting Showcase
  - 07 Minimal Setup
  - 08 Playground

### 20-26 - Data Display & Visualization
- **20-Table.stories.tsx** (Design System/Components/Table)
  - 01 Default
  - 02 Striped
  - 03 Hoverable
  - 04 Sortable
  - 05 Empty State

- **21-AdvancedTable.stories.tsx** (Design System/Components/AdvancedTable)
  - 01 Default
  - 02 With Selection
  - 03 With Bulk Actions
  - 04 Projects Table
  - 05 Compact Table
  - 06 Without Pagination
  - 07 Custom Export
  - 08 Clickable Rows
  - 09 Minimal Features
  - 10 All Features Enabled
  - 11 Resizable Columns
  - 12 Playground

- **22-Graph.stories.tsx** (Design System/Components/Graph)
  - 01 Line Chart
  - 02 Line Chart Multi Series
  - 03 Bar Chart
  - 04 Bar Chart Stacked
  - 05 Area Chart
  - 06 Area Chart With Gradient
  - 07 Area Chart Stacked
  - 08 Pie Chart
  - 09 Radar Chart
  - 10 Scatter Chart
  - 11 Composed Chart
  - 12 Radial Bar Chart
  - 13 All Chart Types
  - 14 Compact Charts
  - 15 Customization Options
  - 16 Playground

- **23-List.stories.tsx** (Design System/Components/List)
  - 01 Default
  - 02 Sizes
  - 03 With Captions
  - 04 Hierarchical
  - 05 Multiple Selection
  - 06 Single Selection
  - 07 With Disabled Items
  - 08 Non Selectable
  - 09 File Explorer
  - 10 Navigation Menu
  - 11 File Explorer
  - 12 Playground

- **24-Kanban.stories.tsx** (Design System/Components/Kanban)
  - 01 Default
  - 02 With Drag And Drop
  - 03 Development Workflow
  - 04 Table View
  - 05 Priority Tracking
  - 06 Empty Board

- **25-MillerColumns.stories.tsx** (Design System/Components/MillerColumns)
  - 01 Default
  - 02 Organization Chart
  - 03 Product Catalog
  - 04 Wide Columns
  - 05 Narrow Columns
  - 06 Without Icons
  - 07 Tall View

- **26-DualPaneExplorer.stories.tsx** (Design System/Components/DualPaneExplorer)
  - 01 Default
  - 02 Code Explorer
  - 03 Document Library
  - 04 With Selected File
  - 05 Wide Left Pane
  - 06 Narrow Left Pane
  - 07 Custom Title
  - 08 Without Metadata
  - 09 With Click Handler
  - 10 With Click Handler

### 27-37 - Cards & Display Components
- **27-StatsCard.stories.tsx** (Design System/Components/StatsCard)
  - 01 Default
  - 02 All Colors
  - 03 Business Metrics
  - 04 Application Stats
  - 05 Project Management
  - 06 Content Metrics
  - 07 Ecommerce Metrics
  - 08 Large Numbers
  - 09 Percentage Values
  - 10 Compact Grid
  - 11 With Custom Styling
  - 12 Playground

- **28-StatsGrid.stories.tsx** (Design System/Components/StatsGrid)
  - 01 Default
  - 02 Two Columns
  - 03 Three Columns
  - 04 Four Columns
  - 05 Custom Gap
  - 06 Custom Min Width
  - 07 Business Dashboard
  - 08 Project Management
  - 09 Application Metrics
  - 10 Ecommerce Dashboard
  - 11 Content Management
  - 12 Multiple Grids
  - 13 Playground

- **29-ChartCard.stories.tsx** (Design System/Components/ChartCard)
  - 01 Default
  - 02 With Line Sparkline
  - 03 With Bar Sparkline
  - 04 With Area Sparkline
  - 05 With Custom Chart
  - 06 With Custom Area Chart
  - 07 Trend Indicators
  - 08 With Action Buttons
  - 09 Dashboard
  - 10 Different Sizes
  - 11 Minimal Cards
  - 12 Full Featured
  - 13 Color Variations
  - 14 Playground

- **30-ApplicationDetailCard.stories.tsx** (Design System/Components/ApplicationDetailCard)
  - 01 Default
  - 02 Commercial Application
  - 03 Subdivision
  - 04 Minor Works
  - 05 With Custom Class Name

- **31-DocumentLibraryCard.stories.tsx** (Design System/Components/DocumentLibraryCard)
  - 01 Default
  - 02 With On View
  - 03 Planning Documents
  - 04 Application Files
  - 05 Technical Reports
  - 06 Compliance Certificates
  - 07 Building Plans
  - 08 With Custom Class Name

- **32-DocumentTreemap.stories.tsx** (Design System/Components/DocumentTreemap)
  - 01 Default
  - 02 With Click Handler
  - 03 Large Dataset
  - 04 Small Dataset
  - 05 Single Classification
  - 06 Department Heavy

- **33-UserCard.stories.tsx** (Design System/Components/UserCard)
  - 01 Default
  - 02 With Avatar
  - 03 With Initials
  - 04 With Tags
  - 05 With Actions
  - 06 Offline Status
  - 07 Away Status
  - 08 Saved
  - 09 Minimal Info
  - 10 Fully Featured
  - 11 With Custom Class Name

- **34-UserAvatar.stories.tsx** (Design System/Components/UserAvatar)
  - 01 Default
  - 02 Small
  - 03 Large
  - 04 With Avatar
  - 05 Without Popup
  - 06 Multiple Users

- **35-CollapsibleCard.stories.tsx** (Design System/Components/CollapsibleCard)
  - 01 Default
  - 02 Default Expanded
  - 03 With Rich Content
  - 04 Multiple Cards
  - 05 FAQ Section
  - 06 With Nested Content
  - 07 With Table
  - 08 With Form
  - 09 Dashboard Panels
  - 10 Playground

- **36-StatusCard.stories.tsx** (Design System/Components/StatusCard)
  - 01 Default
  - 02 All Variants
  - 03 With Trends
  - 04 Business Metrics
  - 05 Application Metrics
  - 06 Without Comparison
  - 07 Without Icon
  - 08 Clickable
  - 09 Large Numbers
  - 10 Playground

- **37-YellowFolder.stories.tsx** (Design System/Components/YellowFolder)
  - 01 Default
  - 02 Small
  - 03 Large
  - 04 Extra Large
  - 05 Sizes
  - 06 In Context

### 38-42 - Feedback & Messaging
- **38-AlertBanner.stories.tsx** (Design System/Components/AlertBanner)
  - 01 Info
  - 02 Success
  - 03 Warning
  - 04 Error
  - 05 Dismissible

- **39-AlertPanel.stories.tsx** (Design System/Components/AlertPanel)
  - 01 Default
  - 02 All Unread
  - 03 All Read
  - 04 Empty
  - 05 Single Alert
  - 06 Mixed Alert Types

- **40-Modal.stories.tsx** (Design System/Components/Modal)
  - 01 Default
  - 02 Confirmation
  - 03 Large Content

- **41-Accordion.stories.tsx** (Design System/Components/Accordion)
  - 01 Default
  - 02 Single Expand
  - 03 Without Icons
  - 04 Bordered Variant
  - 05 Filled Variant
  - 06 Nested Accordion
  - 07 Deep Nesting
  - 08 Long Content

- **42-BackToTop.stories.tsx** (Design System/Components/BackToTop)
  - 01 Default
  - 02 With Instructions
  - 03 Long Article
  - 04 Multiple Scrollable Areas
  - 05 Product Catalog

### 43-45 - Icons & Chips
- **43-Icon.stories.tsx** (Design System/Components/Icon)
  - 01 Default
  - 02 Sizes
  - 03 Colors
  - 04 Interactive
  - 05 In Buttons
  - 06 Common Icons
  - 07 Icon Gallery
  - 08 Loading States
  - 09 Accessibility

- **44-CarbonIcons.stories.tsx** (Design System/Components/CarbonIcons)
  - 01 All Icons
  - 02 Categorized View
  - 03 Icon Sizes
  - 04 Color Variations
  - 05 Commonly Used

- **45-ChipMUI.stories.tsx** (Design System/Components/Chip)
  - 01 Default
  - 02 All Variants
  - 03 Sizes
  - 04 With Icons
  - 05 Clickable
  - 06 Deletable
  - 07 Status Chips
  - 08 Tag Chips

### 46-48 - Specialized Components
- **46-ColumnSelectionTree.stories.tsx** (Design System/Components/ColumnSelectionTree)
  - 01 Default
  - 02 None Selected
  - 03 All Selected
  - 04 Without Icons
  - 05 Single Group
  - 06 All Expanded

- **47-Treemap.stories.tsx** (Design System/Components/Treemap)
  - 01 Default
  - 02 Sales Regions
  - 03 Heat Map Scheme
  - 04 Cool Scheme
  - 05 Rainbow Scheme
  - 06 Custom Colors
  - 07 Labels Only
  - 08 Values Only
  - 09 No Labels
  - 10 With Click Handler
  - 11 Tall Layout
  - 12 Short Layout
  - 13 Small Dataset
  - 14 Large Dataset
  - 15 Storage Usage

- **48-ErrorBoundary.stories.tsx** (Design System/Components/ErrorBoundary)
  - 01 Default
  - 02 Component Level
  - 03 Section Level
  - 04 Page Level
  - 05 Custom Fallback
  - 06 With Error Handler
  - 07 Auto Reset On Key Change
  - 08 Multiple Error Boundaries
  - 09 Nested Error Boundaries
  - 10 Async Error
  - 11 Form Validation Error
  - 12 Playground

### 49-50 - Templates
- **49-ODLPageTemplates.stories.tsx** (Design System/Templates/ODLPageTemplates)
  - 01 Dashboard
  - 02 Table Page
  - 03 Form Page
  - 04 Detail Page
  - 05 Cards Grid
  - 06 App Shell
  - 07 All Templates

- **50-PageTemplates.stories.tsx** (Design System/Templates/PageTemplates)
  - 01 Basic Page
  - 02 Dashboard
  - 03 Table List
  - 04 Two Column
  - 05 Form Page
  - 06 Cards Grid
  - 07 All Templates

### 51-53 - Legacy Stories
- **51-Button.stories.ts** (Legacy)
  - 01 Primary
  - 02 Secondary
  - 03 Large
  - 04 Small

- **52-Header.stories.ts** (Legacy)
  - 01 Logged In
  - 02 Logged Out

- **53-Page.stories.ts** (Legacy)
  - 01 Logged Out
  - 02 Logged In

---

## Quick Reference

**Total Files:** 53
**Total Stories:** 400+

### How to Use This Numbering System

1. **File Organization:** Files are numbered 01-53 and appear in order in the Storybook left navigation
2. **Story Organization:** Individual stories within files are numbered sequentially (01-XX)
3. **Navigation Structure:** All components are numbered and appear in a flat `Components` category:
   - ✅ `Components/14 Button`
   - ✅ `Components/06 Card`
   - ✅ `Components/41 Accordion`
   - ✅ `Components/22 Graph`
   - ✅ `Components/33 UserCard`
   - ❌ ~~Components/Feedback/Accordion~~ (removed - now `41 Accordion`)
   - ❌ ~~Components/Cards/Card~~ (removed - now `06 Card`)
   - ❌ ~~Components/Navigation/Breadcrumb~~ (removed - now `08 Breadcrumb`)

4. **Finding Components:** Use the file number (01-53) and story number (01-XX) to quickly locate components

### File Categories (Logical Organization)

- **01:** Foundations (Design Tokens)
- **02-13:** Core Components (Layout, Navigation, Templates)
- **14-19:** Input & Form Components
- **20-26:** Data Display & Visualization
- **27-37:** Cards & Display Components
- **38-42:** Feedback & Messaging
- **43-45:** Icons & Chips
- **46-48:** Specialized Components
- **49-50:** Templates
- **51-53:** Legacy Stories

---

Last Updated: 2025-12-15
