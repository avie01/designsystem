# ODL Use Case Patterns

## Rapid Development Guide

This guide contains common use case patterns for quickly building ODL applications. Simply describe your use case and I can instantly create the appropriate interface.

## Dashboard Patterns

### KPI Dashboard
**Use Case**: "I need a dashboard showing key performance indicators"
**Components Used**:
- Status cards with Graph components
- Grid layout
- Color-coded metrics
- Trend indicators

**Pattern**:
```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
  {kpiData.map(kpi => (
    <StatCard 
      title={kpi.title}
      value={kpi.value}
      trend={kpi.trend}
      graph={<Graph type="area" data={kpi.data} height={60} />}
    />
  ))}
</div>
```

### Application Status Dashboard
**Use Case**: "Show application processing status"
**Components Used**:
- ApplicationStatsCards
- Table with status chips
- Drawer for details
- Filter dropdowns

### Council Operations Dashboard
**Use Case**: "Council meeting and document management"
**Components Used**:
- SimpleTabs for sections
- Cards for meeting items
- Table for documents
- Status indicators

## Form Patterns

### Multi-Step Application Form
**Use Case**: "Create a development application form"
**Components Used**:
- Stepper for progress
- Input fields with validation
- Dropdown for selections
- Modal for confirmations
- AlertBanner for errors

**Pattern**:
```tsx
<Stepper steps={['Details', 'Documents', 'Review', 'Submit']} currentStep={step}>
  {step === 0 && <ApplicationDetails />}
  {step === 1 && <DocumentUpload />}
  {step === 2 && <ReviewSection />}
  {step === 3 && <SubmitConfirmation />}
</Stepper>
```

### Search and Filter Form
**Use Case**: "Search applications with filters"
**Components Used**:
- Input with search icon
- Dropdown filters
- Date pickers
- Chip tags for active filters
- Button for search action

## Table Patterns

### Data Management Table
**Use Case**: "Manage records with actions"
**Components Used**:
- Table with sortable columns
- Row actions (edit, delete)
- Pagination
- Bulk selection
- Export button

**Pattern**:
```tsx
<Table
  columns={[
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'status', label: 'Status', render: (val) => <Chip label={val} /> },
    { key: 'actions', label: '', render: () => <ActionButtons /> }
  ]}
  data={records}
  pagination={true}
  selectable={true}
/>
```

### Report Table
**Use Case**: "Display report data"
**Components Used**:
- Table with grouped headers
- Summary rows
- Export functionality
- Print styling

## Navigation Patterns

### Application with Side Navigation
**Use Case**: "Multi-page application"
**Components Used**:
- Header with user menu
- NavigationRail (collapsible)
- Breadcrumb trail
- Page content area

**Pattern**:
```tsx
<div style={{ display: 'flex', height: '100vh' }}>
  <Header variant="build" />
  <NavigationRail items={navItems} />
  <main style={{ flex: 1, overflow: 'auto' }}>
    <Breadcrumb items={breadcrumbs} />
    {/* Page content */}
  </main>
</div>
```

### Tabbed Interface
**Use Case**: "Multiple related sections"
**Components Used**:
- SimpleTabs
- Content panels
- Lazy loading

## Data Visualization Patterns

### Analytics Dashboard
**Use Case**: "Show data trends and comparisons"
**Components Used**:
- Graph components (various types)
- Date range picker
- Export button
- Responsive grid

**Pattern**:
```tsx
<div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
  <Graph type="line" data={trendData} height={300} />
  <Graph type="pie" data={distributionData} height={300} />
  <Graph type="bar" data={comparisonData} height={200} />
  <Graph type="radial" data={kpiData} height={200} />
</div>
```

### Status Overview
**Use Case**: "System status monitoring"
**Components Used**:
- Status cards with mini graphs
- AlertBanner for issues
- Real-time updates
- Color coding

## Document Management Patterns

### Document Viewer
**Use Case**: "Preview and manage documents"
**Components Used**:
- Drawer with tabs
- Document preview area
- Metadata display
- Action buttons
- Comments section

**Pattern**:
```tsx
<Drawer open={showDocument} onClose={handleClose}>
  <SimpleTabs tabs={[
    { id: 'preview', label: 'Preview', content: <DocumentPreview /> },
    { id: 'details', label: 'Details', content: <DocumentDetails /> },
    { id: 'history', label: 'History', content: <DocumentHistory /> }
  ]} />
</Drawer>
```

## Workflow Patterns

### Approval Workflow
**Use Case**: "Review and approve applications"
**Components Used**:
- Cards for items
- Status chips
- Action buttons
- Modal for decisions
- Timeline for history

**Pattern**:
```tsx
<Cards
  items={applications}
  renderCard={(app) => (
    <>
      <h3>{app.title}</h3>
      <Chip label={app.status} variant={getStatusVariant(app.status)} />
      <div>
        <Button onClick={() => approve(app)}>Approve</Button>
        <Button variant="ghost" onClick={() => reject(app)}>Reject</Button>
      </div>
    </>
  )}
/>
```

## Common Combinations

### Header + Navigation + Content
Most applications use this pattern:
```tsx
<>
  <Header variant="build" user={currentUser} />
  <div style={{ display: 'flex' }}>
    <NavigationRail />
    <main>{/* Your content */}</main>
  </div>
</>
```

### Filter + Table + Actions
For data management interfaces:
```tsx
<>
  <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
    <Input placeholder="Search..." />
    <Dropdown options={filterOptions} />
    <Button>Apply Filters</Button>
  </div>
  <Table data={filteredData} />
  <Pagination />
</>
```

### Stats + Charts + Table
For analytics dashboards:
```tsx
<>
  <StatsCards data={stats} />
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
    <Graph type="line" />
    <Graph type="bar" />
  </div>
  <Table data={details} />
</>
```

## Quick Start Examples

### "I need a user management page"
```tsx
// Instantly creates:
- Header with user menu
- Search bar
- User table with status indicators
- Actions: Edit, Delete, Activate/Deactivate
- Add user button
- Pagination
```

### "I need an application tracking dashboard"
```tsx
// Instantly creates:
- KPI cards (Total, Pending, Approved, Rejected)
- Line graph showing trends
- Recent applications table
- Filter dropdowns
- Export functionality
```

### "I need a document approval workflow"
```tsx
// Instantly creates:
- Document list with status
- Preview drawer
- Approve/Reject buttons
- Comments section
- History timeline
- Email notification options
```

## Product-Specific Patterns

### ODL Build
- Development application forms
- Assessment workflows
- Document management
- Fee calculations

### ODL Connect
- Integration dashboards
- API monitoring
- Data flow visualization
- System health checks

### ODL Keystone
- Council meeting management
- Agenda builder
- Minutes tracking
- Action items

## Tips for Rapid Development

1. **Start with a pattern**: Choose the closest pattern and modify
2. **Use demo components**: Copy from existing demos
3. **Theme consistency**: Always use ODLTheme
4. **Responsive first**: Use grid layouts
5. **Accessibility**: Include ARIA labels
6. **Loading states**: Add skeletons/spinners
7. **Error handling**: Use AlertBanner
8. **User feedback**: Toast notifications

## Common Modifications

### Change product branding
```tsx
<Header variant="connect" />  // Changes to Connect theme
```

### Add custom colors
```tsx
<Graph colors={[ODLTheme.colors.charts.emerald]} />
```

### Adjust layouts
```tsx
// Change from 4 columns to 3
gridTemplateColumns: 'repeat(3, 1fr)'
```

### Add interactions
```tsx
<Cards selectable onSelect={handleSelect} />
```

## Need Something Specific?

Just describe your use case:
- "I need a reporting dashboard with date filters"
- "Create a user profile page with tabs"
- "Build a notification center with categories"
- "Make a settings page with sections"

I'll instantly create the appropriate interface using the established ODL patterns!