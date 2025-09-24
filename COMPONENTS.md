# ODL Design System - Component Inventory

Complete list of all 53 components available in the ODL Design System.

## 📊 Components with Demo Pages (28)

These components have dedicated demo pages accessible via the dev server:

| Component | Demo URL | Description |
|-----------|----------|-------------|
| **AccessibilityPanel** | `/accessibility-panel-demo.html` | Accessibility settings and controls |
| **AlertBanner** | `/alert-banner-demo.html` | Notification banners and alerts |
| **Breadcrumb** | `/breadcrumb-demo.html` | Navigation breadcrumbs |
| **Button** | `/button-demo.html` | All button variants and states |
| **Cards** | `/cards-demo.html` | Card layouts and containers |
| **Chip** | `/chip-demo.html` | Tags and status indicators |
| **Drawer** | `/drawer-demo.html` | Sliding panel overlays |
| **Dropdown** | `/dropdown-demo.html` | Select menus with search |
| **Graph** | `/graph-demo.html` | Charts and data visualizations |
| **Header** | `/header-demo.html` | Application headers |
| **HierarchyVisualizations** | `/hierarchy-visualizations-demo.html` | Tree maps and org charts |
| **Input** | `/input-demo.html` | Text fields and form inputs |
| **Kanban** | `/kanban-demo.html` | Drag-and-drop board layouts |
| **List** | `/list-demo.html` | Interactive lists |
| **Modal** | `/modal-demo.html` | Dialog overlays |
| **NavigationRail** | `/navigation-rail-demo.html` | Vertical navigation sidebar |
| **Stepper** | `/stepper-demo.html` | Multi-step process indicators |
| **Table** | `/table-demo.html` | Advanced data tables |
| **Tabs** | `/tabs-demo.html` | Tabbed content |
| **TreeNavigation** | `/tree-navigation-demo.html` | Hierarchical folder navigation |
| **UserAvatar** | `/user-avatar-demo.html` | Profile avatars |

## 🔧 Additional Components (25)

These components are available but don't have dedicated demo pages:

### Layout Components
- **Accordion** - Expandable/collapsible content sections
- **BackToTop** - Scroll to top button
- **CollapsibleCard** - Cards with expand/collapse functionality
- **DualPaneExplorer** - Split-pane file explorer
- **PageManager** - Page state management
- **PageTemplate** - Base page layouts
- **SimpleTabs** - Basic tab component

### Data Display
- **AdvancedTable** - Enhanced table with more features
- **ApplicationDetailCard** - Application info cards
- **ChartCard** - Cards with embedded charts
- **DocumentLibraryCard** - Document display cards
- **DocumentTreemap** - Visual document hierarchy
- **MillerColumns** - Multi-column navigation
- **StatsCard** - Statistics display cards
- **StatsGrid** - Grid layout for stats
- **StatusCard** - Status indicator cards
- **Treemap** - Data visualization component
- **UserCard** - User profile cards

### Utility Components
- **AccessibilitySettings** - Accessibility configuration
- **BreadcrumbGrid** - Grid-based breadcrumb layout
- **ColumnSelectionTree** - Column selector with tree structure
- **ErrorBoundary** - React error handling
- **Icon** - Dynamic Carbon icon loader
- **LazyWrapper** - Lazy loading wrapper
- **Popover** - Tooltip/popover component
- **SimpleEditor** - Rich text editor
- **YellowFolder** - Folder visualization component

### Navigation Components
- **DemoBreadcrumb** - Demo-specific breadcrumb
- **DemoNavigation** - Demo navigation component

## 📦 Component Categories

### By Complexity
- **Basic:** Button, Input, Chip, Icon
- **Intermediate:** Table, Modal, Dropdown, Cards
- **Advanced:** Kanban, HierarchyVisualizations, AdvancedTable

### By Usage Frequency
- **Most Used:** Button, Input, Table, Modal, Dropdown
- **Common:** Cards, Header, Tabs, NavigationRail
- **Specialized:** Kanban, TreeNavigation, SimpleEditor

## 🎨 Component Features

### Common Props
Most components support these standard props:
- `className` - Additional CSS classes
- `style` - Inline styles
- `disabled` - Disabled state
- `size` - Component size (small, medium, large)
- `error` - Error state
- `onChange` - Change handler
- `onClick` - Click handler

### Accessibility
All components include:
- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Focus management
- WCAG 2.1 AA compliance

## 🚀 Using Components

### Import Example
```tsx
import { Button, Input, Table } from '../components';
```

### Basic Usage
```tsx
<Button variant="primary" size="medium" onClick={handleClick}>
  Click Me
</Button>

<Input 
  type="text" 
  value={value} 
  onChange={setValue}
  error={hasError}
/>

<Table 
  data={tableData}
  columns={columns}
  sortable
  paginated
/>
```

## 📝 Notes

- Components are located in `/content/src/components/`
- Each component is a self-contained folder with its own styles
- TypeScript definitions are included for all components
- Components use ODLTheme for consistent styling
- Carbon icons are dynamically imported when needed

---

For live examples, start the dev server and visit:
**http://localhost:3000/components-showcase.html**