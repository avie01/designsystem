# ODL Design System

A comprehensive React component library for building modern, accessible web applications with consistent design patterns.

[![Storybook](https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=white)](https://content-steamfrog2012s-projects.vercel.app)
[![WCAG AA](https://img.shields.io/badge/WCAG-AA%20Compliant-green)](https://www.w3.org/WAI/WCAG21/quickref/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)](https://reactjs.org/)

## 📖 Storybook - Single Source of Truth

**Live Documentation:** [content-steamfrog2012s-projects.vercel.app](https://content-steamfrog2012s-projects.vercel.app)

Storybook serves as the primary documentation and interactive playground for all components in the ODL Design System. Browse component stories, interact with different states and variants, and view accessibility features in the live environment.

## 🚀 Quick Start

```bash
cd content
npm install
npm run storybook
```

Then view the interactive component documentation at:
- **Live (Deployed):** [https://content-steamfrog2012s-projects.vercel.app](https://content-steamfrog2012s-projects.vercel.app)
- **Local:** `http://localhost:6006` (after running `npm run storybook`)

## 🔗 Resources

- **Interactive Stories:** All 48 component stories available in Storybook
- **Getting Started Guide:** Available in Storybook with Claude Code integration examples
- **Component Reference:** Each story includes component props, variants, and accessibility details

## 📦 What's Inside

### Components (44 Production-Ready)
The ODL Design System includes 44 production-ready React components with complete Storybook documentation:

- **Data Display** - Tables, Graphs, Charts, Treemaps
- **Navigation** - Headers, Breadcrumbs, Navigation Rails, Tree Navigation
- **Forms & Input** - Buttons, Inputs, Dropdowns, Text Areas
- **Layout** - Cards, Grids, Templates, Page Layouts
- **Feedback** - Modals, Alerts, Drawers, Notifications
- **Display** - Chips, Avatars, Lists, Status Indicators

### Storybook Stories (48 Interactive Stories)
Each component has interactive Storybook stories showcasing:
- Different component variants and states
- Props documentation and controls
- Interactive examples
- Accessibility features (WCAG 2.1 AA)

## 🎨 Design Philosophy

The ODL Design System follows these core principles:

1. **Consistency** - Uniform patterns across all components
2. **Accessibility** - WCAG 2.1 AA compliant
3. **Performance** - Optimized bundle sizes and rendering
4. **Flexibility** - Composable and customizable components
5. **Developer Experience** - TypeScript support and clear documentation

## 🚀 Recent Updates (Latest Session - AdvancedTable Responsive Redesign)

### AdvancedTable Component Complete Rewrite
- ✅ **MUI DataGrid Integration** - Replaced custom table implementation with enterprise-grade MUI DataGrid
- ✅ **Responsive Layout** - Implemented fully responsive column distribution using flexbox `flex: 1` property
- ✅ **No Horizontal Scroll** - Columns automatically shrink to fit container without horizontal scrolling
- ✅ **All Features Enabled** - Sorting, filtering, pagination, search, column visibility, bulk selection, custom rendering
- ✅ **ODL Theme Integration** - Complete theming with ODLTheme design tokens for colors, spacing, typography
- ✅ **12 Story Variations** - Default, With Selection, With Bulk Actions, Projects Table, Compact Table, Without Pagination, Custom Export, Clickable Rows, Minimal Features, All Features Enabled, Resizable Columns, Playground
- ✅ **Avatar Rendering** - Custom employee avatar render with proper alignment and sizing (24px circles with initials)
- ✅ **Performance Indicators** - Progress bars, status chips, and other custom cell renderers
- ✅ **50+ Rows Demo** - Pagination and virtual scrolling for efficient large dataset handling

### Previous Sessions: Component Refinements & Features

#### NavigationRail Improvements
- ✅ **Layout Decorator Fix** - Removed global meta decorator that was creating duplicate content areas in stories
- ✅ **Left/Right Positioning** - Updated Default story to support dynamic left/right positioning via props
- ✅ **Story Layout Management** - All stories (Default, Collapsed, WithDisabledItems, NoTooltips) now self-manage their layouts
- ✅ **Verified in Production** - Left/right positioning working correctly in deployed Storybook

#### Dropdown Component Enhancements
- ✅ **Emoji Flag Support** - Both approaches working perfectly:
  - **Approach 1:** Emoji in label: `{ label: '🇺🇸 United States' }`
  - **Approach 2:** Emoji as icon: `{ label: 'United States', icon: '🇺🇸' }`
- ✅ **New Story Added** - "03 With Emoji Flags" story showcasing 8 countries with flag emojis
- ✅ **List Component Integration** - Built-in emoji detection and rendering in List component
- ✅ **Updated Country Options** - All Dropdown country examples now include emoji flags

#### Accordion Component Refinements
- ✅ **Chevron Icon Color** - Updated from grey400 to grey700 for better contrast and visibility
- ✅ **Transition Animation** - Increased transition duration from 0.2s to 0.5s ease for smoother expand/collapse
- ✅ **Improved UX** - Slower animation provides better visual feedback

#### Storybook & Deployment
- ✅ **Getting Started Page** - Comprehensive home page with Claude Code integration guides (3 approaches)
- ✅ **Component Organization** - Created CardComponents folder with 10 reorganized card-related components
- ✅ **AlertBanner Fix** - Added explicit opacity: 1 to ensure solid non-transparent display

#### Accessibility Remediation (WCAG 2.1 AA Compliance Complete)
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

### Viewing Component Stories in Storybook

**Option 1: Live Deployed Version**
- Visit [https://content-steamfrog2012s-projects.vercel.app](https://content-steamfrog2012s-projects.vercel.app)
- No installation needed, always up-to-date

**Option 2: Local Development**
```bash
cd content
npm install
npm run storybook
```
Then open `http://localhost:6006` in your browser

### Storybook Features

- **Interactive Component Stories** - See all variants and states
- **Accessibility Addon** - WCAG compliance verification
- **Props Documentation** - Full component API reference
- **Live Editing** - Modify props in real-time with Storybook controls
- **Search** - Find components quickly by name
- **Responsive Testing** - Test components at different screen sizes

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