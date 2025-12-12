# ODL Design System

A comprehensive, accessible React component library for building modern government and enterprise applications.

[![Storybook](https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=white)](https://content-steamfrog2012s-projects.vercel.app)
[![WCAG AA](https://img.shields.io/badge/WCAG-AA%20Compliant-green)](https://www.w3.org/WAI/WCAG21/quickref/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)](https://reactjs.org/)

## Live Demo

**Storybook:** [content-steamfrog2012s-projects.vercel.app](https://content-steamfrog2012s-projects.vercel.app)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook

# Build for production
npm run build

# Build Storybook
npm run build-storybook
```

## Features

- **51 Production-Ready Components** - Buttons, Tables, Cards, Graphs, FileUpload, and more
- **41 Storybook Stories** - Interactive documentation for all components
- **WCAG AA Compliant** - Full accessibility support with keyboard navigation and screen readers
- **TypeScript** - Complete type safety with exported types
- **Design Tokens** - Consistent theming via ODLTheme system
- **Zero External CSS** - Self-contained styles, no global CSS conflicts
- **Responsive** - Mobile-first design for all screen sizes

## Component Categories

### Data Display
| Component | Description | Storybook |
|-----------|-------------|-----------|
| Table | Sorting, filtering, pagination, selection | Yes |
| AdvancedTable | Virtual scrolling, column resize, export | Yes |
| Cards | Grid/list layouts, selection, actions | Yes |
| Graph | 9 chart types (area, bar, line, pie, etc.) | Yes |
| StatsCard | KPI display with trends | Yes |
| StatsGrid | Dashboard metrics layout | Yes |
| ChartCard | Cards with embedded visualizations | Yes |
| Treemap | Hierarchical data visualization | Yes |
| DocumentTreemap | Document structure visualization | Yes |

### Navigation
| Component | Description | Storybook |
|-----------|-------------|-----------|
| NavigationRail | Collapsible side navigation | Yes |
| Breadcrumb | Navigation trail with overflow | Yes |
| Tabs / SimpleTabs | Tab navigation with icons | Yes |
| TreeNavigation | Hierarchical tree navigation | Yes |
| MillerColumns | Finder-style column browser | Yes |
| Header | Product-branded app headers | - |

### Forms & Input
| Component | Description | Storybook |
|-----------|-------------|-----------|
| Input | Text, email, password, textarea, date | Yes |
| Dropdown | Single/multi-select, search, groups | Yes |
| Button | Primary, secondary, ghost, destructive | Yes |
| Chip | Tags with actions | Yes |
| FileUpload | Drag-drop, progress, AI analysis ready | - |
| Stepper | Multi-step form wizard | Yes |

### Feedback & Overlay
| Component | Description | Storybook |
|-----------|-------------|-----------|
| Modal | Dialog overlays with sizes | Yes |
| Drawer | Slide-out panels | Yes |
| Popover | Contextual popovers | Yes |
| AlertBanner | Status messages | Yes |
| AlertPanel | Inline alerts | - |

### Layout
| Component | Description | Storybook |
|-----------|-------------|-----------|
| Accordion | Expandable sections | Yes |
| CollapsibleCard | Cards with expand/collapse | Yes |
| DualPaneExplorer | Split-pane layout | Yes |
| PageTemplate | Page layout wrapper | - |
| Kanban | Drag-drop board | Yes |

## Design System

All components use the ODLTheme system for consistent styling:

```tsx
import { ODLTheme } from '@odl/design-system';

// Colors
ODLTheme.colors.primary      // #3560C1
ODLTheme.colors.success      // #24A148
ODLTheme.colors.error        // #DA1E28
ODLTheme.colors.warning      // #B07C0C (WCAG AA compliant)

// Spacing (4px increments)
ODLTheme.spacing[1]  // 4px
ODLTheme.spacing[2]  // 8px
ODLTheme.spacing[4]  // 16px

// Typography
ODLTheme.typography.fontSize.sm    // 12px
ODLTheme.typography.fontSize.base  // 14px
ODLTheme.typography.fontSize.lg    // 18px
```

### CSS Variables

Components also expose CSS custom properties:

```css
--odl-primary: #3560C1;
--odl-success: #24A148;
--odl-error: #DA1E28;
--odl-spacing-1: 4px;
--odl-spacing-2: 8px;
--odl-font-size-sm: 12px;
```

## Accessibility

All components are built with accessibility in mind:

- **Keyboard Navigation** - Full keyboard support for all interactive elements
- **Screen Reader Support** - Proper ARIA labels and live regions
- **Focus Management** - Visible focus indicators meeting WCAG 2.1 AA
- **Color Contrast** - All text meets 4.5:1 contrast ratio
- **Touch Targets** - Minimum 44px touch targets on mobile

### Testing

```bash
# Run accessibility tests
npm run test:a11y
```

## Project Structure

```
content/
├── src/
│   ├── components/     # 51 React components
│   ├── pages/          # Demo pages
│   ├── styles/         # ODLTheme and global styles
│   ├── hooks/          # Custom React hooks
│   ├── templates/      # Page templates
│   └── index.ts        # Main exports
├── example/            # HTML entry points for demos
├── .storybook/         # Storybook configuration
└── package.json
```

## Usage

### Installation

```bash
npm install @odl/design-system
```

### Import Components

```tsx
import { Button, Table, Modal, Graph } from '@odl/design-system';
import '@odl/design-system/styles.css';

function App() {
  return (
    <Button variant="primary" size="md">
      Click me
    </Button>
  );
}
```

### Import Theme

```tsx
import { ODLTheme, ODLColors } from '@odl/design-system';

const customStyles = {
  backgroundColor: ODLTheme.colors.primaryLight,
  padding: ODLTheme.spacing[4],
};
```

## Recent Updates

### v1.3.0 (December 2024)
- Added FileUpload component with drag-drop, progress tracking, and AI analysis support
- Full WCAG AA accessibility compliance audit completed
- Added 41 Storybook stories for interactive documentation
- Deployed to Vercel for live preview
- Fixed color contrast issues for warning states
- Added keyboard navigation to all interactive components

### v1.2.0
- Added Stepper, Drawer, AlertBanner components
- Added 9 chart types via Graph component
- Improved responsive design across all components

### v1.1.0
- Added comprehensive Table with sorting/filtering
- Added Modal component with multiple sizes
- Added SimpleTabs with icon support

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run storybook` | Start Storybook on port 6006 |
| `npm run build` | Build component library |
| `npm run build-storybook` | Build static Storybook |
| `npm run type-check` | Run TypeScript compiler |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Contributing

1. Follow the ODL Style Guide
2. Use ODLTheme for all styling (no hardcoded colors)
3. Ensure WCAG AA accessibility compliance
4. Add TypeScript types for all props
5. Create Storybook stories for new components
6. Test keyboard navigation and screen reader support

## License

MIT - Objective Corporation

---

Built with React, TypeScript, and the ODL Design System
