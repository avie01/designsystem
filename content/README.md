# ODL Component Library

A comprehensive React component library for building government and enterprise applications with a consistent design system.

## 🚀 Quick Start

```bash
# Start the development server
npm run dev

# View component showcase (server will auto-select available port)
# Default: http://localhost:3000/components-showcase.html
# If 3000 is taken: http://localhost:3001/ or http://localhost:3002/
```

## 📚 Documentation

- **[Component Registry](./ODL_COMPONENT_REGISTRY.md)** - Complete list of all components and their status
- **[Style Guide](./src/styles/ODL_STYLE_GUIDE.md)** - ODL design system and theming guidelines
- **[Use Case Patterns](./ODL_USE_CASE_PATTERNS.md)** - Common patterns for rapid development
- **[Claude Instructions](./CLAUDE.md)** - AI assistant guidelines for this project

## ✨ Features

- **30+ Production-Ready Components** - Buttons, Tables, Cards, Graphs, Modals, and more
- **9 Chart Types** - Powered by Recharts with responsive sizing
- **Multiple Product Themes** - Build, Connect, Keystone, Nexus, Regworks, 3Sixty
- **Accessibility First** - WCAG compliant with screen reader support
- **TypeScript** - Full type safety and IntelliSense support
- **Self-Contained** - No external CSS dependencies, all styles included
- **Responsive** - Mobile-first design that works on all devices

## 🎨 Component Demos

Each component has a dedicated demo page showcasing all variants and features:

| Component | Demo URL | Description |
|-----------|----------|-------------|
| **Graph** | `/graph-demo.html` | 9 chart types with animations |
| **Table** | `/table-demo.html` | Advanced sorting, filtering, pagination |
| **Cards** | `/cards-demo.html` | Multiple layouts and selection patterns |
| **Modal** | `/modal-demo.html` | Various sizes and content types |
| **Stepper** | `/stepper-demo.html` | Multi-step process with validation |
| **Drawer** | `/drawer-demo.html` | Slide-out panels with tabs |
| **Header** | `/header-demo.html` | Product-specific navigation headers |
| **Tabs** | `/tabs-demo.html` | Icon support, compact variants |
| **Dropdown** | `/dropdown-demo.html` | Search, multi-select, groups |
| **Input** | `/input-demo.html` | Validation, calendar picker |
| **Button** | `/button-demo.html` | All variants, sizes, states |
| **Alert Banner** | `/alert-banner-demo.html` | Severity levels, dismissible |
| **Breadcrumb** | `/breadcrumb-demo.html` | Navigation trails |

## 🏗️ Full Application Examples

- **Multipage Example** (`/multipage-example.html`) - Complete application with navigation rail
- **Council Dashboard** (`/council-dashboard.html`) - Dashboard with tabs and data visualization
- **Development Applications** (`/development-applications-dashboard.html`) - KPI cards and workflow management
- **Internal Referrals** (`/internal-referrals.html`) - Referral management for council planners

## 🎯 Key Components

### Data Visualization (Graph)
```tsx
import Graph from '../components/Graph/Graph';

<Graph
  type="area"
  data={[
    { month: 'Jan', value: 145 },
    { month: 'Feb', value: 162 }
  ]}
  dataKeys={['value']}
  xAxisKey="month"
  height={200}
  animated={true}
  gradient={true}
/>
```

### Navigation
```tsx
<Header variant="build" user={currentUser} />
<NavigationRail items={navItems} collapsed={false} />
<Breadcrumb items={breadcrumbs} />
```

### Forms & Input
```tsx
<Stepper steps={['Details', 'Review', 'Submit']} currentStep={1} />
<Input type="email" validation="email" required />
<Dropdown options={options} searchable multiple />
```

### Data Display
```tsx
<Table columns={columns} data={data} sortable filterable />
<Cards items={items} selectable onSelect={handleSelect} />
<Chip label="Active" variant="green" />
```

## 🎨 Design System

The ODL Theme provides consistent styling across all components:

```tsx
import ODLTheme from '../styles/ODLTheme';

// Always use theme constants
const styles = {
  color: ODLTheme.colors.primary,
  padding: ODLTheme.spacing[4],
  fontSize: ODLTheme.typography.fontSize.base
};
```

### Chart Colors
Modern, vibrant colors optimized for data visualization:
- Blue (#3B82F6), Emerald (#10B981), Violet (#8B5CF6)
- Rose (#F43F5E), Amber (#F59E0B), Cyan (#06B6D4)

## 🛠️ Development

### Project Structure
```
/Build
  /example           # HTML entry files, demo entries, and MultiPageExample
    *.html          # HTML entry points for all demos
    *Entry.tsx      # Entry components for demos
    MultiPageExample.tsx  # Main multi-page application
  /src
    /components     # Reusable components
    /pages         # Demo page components and full page examples
    /styles        # ODL theme and design system
    /hooks         # Custom React hooks
    /types         # TypeScript definitions
    /Images        # Logos and assets
  vite.config.ts   # Vite configuration (root: 'example')
  server.mjs       # Development server with auto-port selection
```

**Important:** All HTML files and their entry points are in the `/example` folder for proper Vite resolution.

### Running Locally
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Creating New Components
1. Create component in `/src/components/{ComponentName}/`
2. Use ODLTheme for all styling
3. Create demo page following the pattern
4. Add to Component Registry
5. Update documentation

## 📊 Recent Updates

### v1.2.1 (Current)
- ✅ Replaced all sparklines with interactive Graph components
- ✅ Added 9 chart types with Recharts integration
- ✅ Improved responsive sizing for compact displays
- ✅ Enhanced status cards with embedded visualizations

### v1.2.0
- Added Stepper component for multi-step workflows
- Added Drawer component with document preview
- Added AlertBanner with severity levels
- Improved accessibility with panel controls

### v1.1.0
- Added comprehensive Table with sorting/filtering
- Added Modal component with multiple sizes
- Added SimpleTabs with icon support
- Fixed dropdown and calendar z-index issues

## 🤝 Contributing

1. Follow the ODL Style Guide for consistency
2. Ensure components are self-contained
3. Add proper TypeScript types
4. Include demo page for new components
5. Test accessibility with screen readers

## 📝 License

Proprietary - Objective Corporation

## 🆘 Support

For issues or questions:
- Check the [Component Registry](./ODL_COMPONENT_REGISTRY.md)
- Review [Use Case Patterns](./ODL_USE_CASE_PATTERNS.md)
- Consult the [Style Guide](./src/styles/ODL_STYLE_GUIDE.md)

---

Built with ❤️ using React, TypeScript, and the ODL Design System