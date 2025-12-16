# ODL Component Library

A comprehensive React component library for building government and enterprise applications with a consistent design system.

## 🚀 Quick Start

```bash
# Start the development server
npm run dev

# View component showcase
# http://localhost:3000/components-showcase.html
```

## 📚 Documentation

- **[Developer Guide](./CLAUDE.md)** - Complete development instructions and guidelines
- **[Component Registry](./ODL_COMPONENT_REGISTRY.md)** - Complete list of all components
- **[Style Guide](./src/styles/ODL_STYLE_GUIDE.md)** - ODL design system reference

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

## 🎯 Key Components

### Data Visualization
```tsx
<Graph
  type="area"
  data={chartData}
  dataKeys={['value']}
  xAxisKey="month"
  animated={true}
/>
```

### Forms & Navigation
```tsx
<Header variant="build" user={currentUser} />
<Input type="email" validation="email" required />
<Table columns={columns} data={data} sortable />
```

## 🛠️ Development

### Running Locally
```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
```

### Creating New Components
1. Create component in `/src/components/{ComponentName}/`
2. Use ODLTheme for all styling
3. Create demo page following existing patterns
4. Add to Component Registry

## 🤝 Contributing

1. Follow the [Developer Guide](./CLAUDE.md) for all development standards
2. Ensure WCAG 2.1 AA accessibility compliance
3. Add proper TypeScript types and demo pages
4. Test with Playwright before submitting

## 📝 License

Proprietary - Objective Corporation

## 🆘 Support

For issues or questions:
- Check the [Component Registry](./ODL_COMPONENT_REGISTRY.md)
- Review [Use Case Patterns](./ODL_USE_CASE_PATTERNS.md)
- Consult the [Style Guide](./src/styles/ODL_STYLE_GUIDE.md)

---

Built with ❤️ using React, TypeScript, and the ODL Design System