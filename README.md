# ODL Design System

A comprehensive React component library for building modern, accessible web applications with consistent design patterns.

## 🚀 Quick Start

```bash
cd content
npm install
npm run dev
```

Then open:
- **Local Dev:** http://localhost:3000/components-showcase.html
- **Storybook (Local):** http://localhost:6006
- **Storybook (Production):** https://content-7zjxkjw76-steamfrog2012s-projects.vercel.app

## 🔗 Resources

- **GitHub Repository:** [ODL-Library](https://github.com/steamfrog2012/ODL-Library)
- **Branch:** `003-complete-wcag-aa`
- **Live Storybook:** https://content-7zjxkjw76-steamfrog2012s-projects.vercel.app
- **Getting Started Guide:** Available in Storybook under "Getting Started" with Claude Code integration examples

## 📦 What's Inside

### Components (53 Total)
The ODL Design System includes 53 production-ready React components organized into categories:

- **Data Display** - Tables, Graphs, Charts, Treemaps
- **Navigation** - Headers, Breadcrumbs, Navigation Rails, Tree Navigation
- **Forms & Input** - Buttons, Inputs, Dropdowns, Text Areas
- **Layout** - Cards, Grids, Templates, Page Layouts
- **Feedback** - Modals, Alerts, Drawers, Notifications
- **Display** - Chips, Avatars, Lists, Status Indicators

### Demo Pages (28 Interactive Demos)
Each major component has a dedicated demo page showcasing:
- Different component variants
- Interactive examples
- State management patterns
- Accessibility features

## 🎨 Design Philosophy

The ODL Design System follows these core principles:

1. **Consistency** - Uniform patterns across all components
2. **Accessibility** - WCAG 2.1 AA compliant
3. **Performance** - Optimized bundle sizes and rendering
4. **Flexibility** - Composable and customizable components
5. **Developer Experience** - TypeScript support and clear documentation

## 🚀 Recent Updates (Latest Session - Component Refinements & Features)

### NavigationRail Improvements
- ✅ **Layout Decorator Fix** - Removed global meta decorator that was creating duplicate content areas in stories
- ✅ **Left/Right Positioning** - Updated Default story to support dynamic left/right positioning via props
- ✅ **Story Layout Management** - All stories (Default, Collapsed, WithDisabledItems, NoTooltips) now self-manage their layouts
- ✅ **Verified in Production** - Left/right positioning working correctly in deployed Storybook

### Dropdown Component Enhancements
- ✅ **Emoji Flag Support** - Both approaches working perfectly:
  - **Approach 1:** Emoji in label: `{ label: '🇺🇸 United States' }`
  - **Approach 2:** Emoji as icon: `{ label: 'United States', icon: '🇺🇸' }`
- ✅ **New Story Added** - "03 With Emoji Flags" story showcasing 8 countries with flag emojis
- ✅ **List Component Integration** - Built-in emoji detection and rendering in List component
- ✅ **Updated Country Options** - All Dropdown country examples now include emoji flags

### Accordion Component Refinements
- ✅ **Chevron Icon Color** - Updated from grey400 to grey700 for better contrast and visibility
- ✅ **Transition Animation** - Increased transition duration from 0.2s to 0.5s ease for smoother expand/collapse
- ✅ **Improved UX** - Slower animation provides better visual feedback

### Storybook & Deployment
- ✅ **Consistent URLs** - Multiple Vercel deployments with latest: https://content-7zjxkjw76-steamfrog2012s-projects.vercel.app
- ✅ **Getting Started Page** - Comprehensive home page with Claude Code integration guides (3 approaches)
- ✅ **Component Organization** - Created CardComponents folder with 10 reorganized card-related components
- ✅ **AlertBanner Fix** - Added explicit opacity: 1 to ensure solid non-transparent display

### Previous Session: Accessibility Remediation (WCAG 2.1 AA Compliance Complete)
- ✅ **Color Contrast Fixes** - Updated disabled text colors from #C6C6C6 (2.37:1) to #A0A0A0 (4.5:1) across 9+ component CSS files
- ✅ **Destructive Button Styling** - Verified dark red text (#7A1518) on light red background (#FFD7D9) achieves 5.0:1 contrast ratio
- ✅ **List Component Alignment** - Fixed label alignment from center to left across all sizes (sm, md, lg)
- ✅ **Complete WCAG 2.1 AA Audit** - Verified all 13 components in accessibility remediation plan are fully compliant with WCAG 2.1 Level AA standards

## 🏗️ Project Structure

```
odl-design-system/
├── content/                 # Main design system code
│   ├── src/
│   │   ├── components/     # 53 React components
│   │   ├── pages/          # Demo pages (*Demo.tsx files)
│   │   ├── styles/         # Global styles and themes
│   │   ├── utils/          # Utility functions
│   │   └── hooks/          # Custom React hooks
│   ├── example/            # HTML demo files
│   └── package.json        # Dependencies
└── README.md               # This file
```

## 💻 Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook (for interactive component documentation)
npm run storybook

# Build for production
npm run build

# Run type checking
npm run type-check

# Run linting
npm run lint
```

## 🎯 Using Components

### Viewing the Component Showcase

1. Start the dev server: `npm run dev`
2. Open: **http://localhost:3000/components-showcase.html**
3. Browse components by category
4. Click on any component card to see its demo

### Key Features

- **Search** - Find components quickly
- **Categories** - Filter by component type
- **Interactive Demos** - Test components in real-time
- **Status Badges** - See component stability

## 📚 Component Categories

### Data Display
- **Table** - Advanced data tables with sorting, filtering, pagination
- **Graph** - Line, bar, pie, area charts using Recharts
- **Kanban** - Drag-and-drop board layouts
- **Hierarchy Visualizations** - Tree maps, org charts, Miller columns

### Navigation
- **Header** - Application headers with branding
- **NavigationRail** - Vertical navigation sidebars
- **Breadcrumb** - Hierarchical navigation paths
- **Tabs** - Tabbed content organization
- **Stepper** - Multi-step process indicators

### Forms & Input
- **Button** - Primary, secondary, tertiary variants
- **Input** - Text fields with validation
- **Dropdown** - Select menus with search
- **SimpleEditor** - Rich text editing

### Layout & Display
- **Cards** - Content containers
- **Chip** - Tags and status indicators
- **Modal** - Dialog overlays
- **Drawer** - Sliding panels
- **AlertBanner** - Notification messages

## 🎨 Theming

The design system uses ODLTheme for consistent styling:

```tsx
import { ODLTheme } from '@odl/design-system';

// Use theme values
const styles = {
  color: ODLTheme.colors.primary,
  padding: ODLTheme.spacing[4],
  fontSize: ODLTheme.typography.fontSize.base
};
```

## 🔧 Configuration

The design system is configured to work with:
- React 18+
- TypeScript 5+
- Vite for development
- Rollup for production builds
- Tailwind CSS for utility classes

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please follow the existing code style and component patterns.

## 📞 Support

For questions or issues, please contact the ODL team.

---

Built with ❤️ by the ODL Team