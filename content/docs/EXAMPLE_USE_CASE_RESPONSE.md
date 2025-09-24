# Example: How I Create Designs from Use Cases

## Sample Use Case Request:
"I need a regulatory compliance dashboard for Regworks that shows pending reviews, compliance status by region, and recent regulatory changes"

## What I Would Create:

### 1. Component Selection
- **Header**: Regworks variant (teal #00928F)
- **Metric Cards**: For KPIs (pending reviews, compliance rate, alerts)
- **SimpleTabs**: To organize different views
- **Table**: For detailed compliance data
- **Dropdown**: For region and date filters
- **Button**: For actions like "Export Report"

### 2. Layout Structure
```
RegworksHeader
├── DashboardTitle
├── MetricCardsRow
│   ├── Pending Reviews (32)
│   ├── Compliance Rate (94%)
│   ├── Active Alerts (5)
│   └── Recent Changes (12)
├── FilterBar
│   ├── Region Dropdown
│   ├── Date Range Picker
│   └── Status Filter
├── SimpleTabs
│   ├── Overview Tab
│   │   ├── Compliance Chart
│   │   └── Regional Summary Cards
│   ├── Pending Reviews Tab
│   │   └── Table with sortable columns
│   ├── Recent Changes Tab
│   │   └── Timeline/List view
│   └── Reports Tab
│       └── Export options
└── BackToTop
```

### 3. I Would Generate:
- Complete React component code
- All styling using ODL theme
- Interactive elements with proper state management
- Responsive layout that works on all devices
- Accessibility features (ARIA labels, keyboard nav)
- Sample data for demonstration

### 4. Key Features Included:
- ✅ Real-time data updates
- ✅ Sortable/filterable tables
- ✅ Export functionality
- ✅ Drill-down capabilities
- ✅ Status indicators with colors
- ✅ Action buttons for quick tasks
- ✅ Search within results
- ✅ Pagination for large datasets

## The Result:
A fully functional, production-ready dashboard that follows ODL standards and can be immediately integrated into the Regworks product.

---

## More Examples I Can Create:

### Property Management System (Keystone)
- Property listings with filters
- Tenant management interface
- Maintenance request tracker
- Financial reporting dashboard

### Application Builder (Build)
- Component palette
- Drag-and-drop interface
- Properties panel
- Preview/publish workflow

### Integration Platform (Connect)
- Connection manager
- Data mapping interface
- Workflow designer
- API documentation viewer

### 360° View Platform (3Sixty)
- Customer profile view
- Interaction timeline
- Related entities graph
- Analytics dashboard

### Enterprise Portal (Nexus)
- Application launcher
- User directory
- Resource library
- System administration

Just describe your needs, and I'll create the complete implementation!