# ODL Design System

A comprehensive, accessible, and modern design system built with React, TypeScript, and Tailwind CSS. The ODL Design System provides a consistent set of reusable components for building user interfaces across web applications.

## 🚀 Quick Start

### Storybook Documentation
- **Live:** [https://content-steamfrog2012s-projects.vercel.app](https://content-steamfrog2012s-projects.vercel.app)
- **Local:** `http://localhost:6006`

```bash
cd content
npm run storybook
```

### Installation

```bash
npm install @odl/design-system
```

## 📋 Component Categories

### 🔧 Core Components (44 Total)
The ODL Design System includes 44 fully documented components organized into the following categories:

#### **Data Components**
- **Table** - Advanced data tables with sorting, pagination, search, column resize, and selection
- **Cards** - Multiple card variants (Compact, Comfortable, Metadata, User, Workspace, Build, 3Sixty)
- **DashboardCards** - Specialized dashboard components
- **ThumbnailCards** - Image-based card components

#### **Navigation Components**
- **Header** - Application headers with branding and navigation
- **NavigationRail** - Sidebar navigation with collapsible sections
- **Breadcrumb** - Hierarchical navigation breadcrumbs
- **TreeNavigation** - Expandable tree-based navigation
- **Tabs** - Tab-based content organization

#### **Input Components**
- **Button** - Primary, secondary, ghost, and destructive variants
- **Input** - Text fields, textareas, and specialized input types
- **Dropdown** - Select menus and option lists
- **RadioButton** - Single selection radio groups
- **Switch** - Toggle switches with Carbon icons
- **Checkbox** - Selection checkboxes with indeterminate state

#### **Display Components**
- **Modal** - Dialog overlays and popups
- **Popover** - Contextual information displays
- **Chip** - Status indicators and tags with toggle functionality
- **Icon** - 200+ Carbon Design System icons
- **IconButton** - Interactive icon buttons
- **UserAvatar** - User profile images and initials

#### **Feedback Components**
- **AlertBanner** - System notifications and alerts
- **StatusCard** - Status indicators and information cards
- **Graph** - Charts and data visualizations (Area, Bar, Pie)

#### **Layout Components**
- **Accordion** - Collapsible content sections with nested support
- **Drawer** - Slide-out panels and sidebars
- **Stepper** - Multi-step process indicators
- **BackToTop** - Page navigation helper

#### **Specialized Components**
- **FileType** - File type icons and indicators
- **Kanban** - Drag-and-drop task boards
- **HierarchyVisualizations** - Organizational charts and tree views
- **SimpleEditor** - Rich text editing capabilities

## 🎨 Design Tokens & Theming

### Color System
```typescript
// Primary Colors
primary: '#3560C1'           // ODL Primary Blue
primaryHover: '#2A4FA3'      // Hover states
primaryLight: '#E0F3FE'      // Light backgrounds
primaryDark: '#1E3A8A'       // Dark emphasis

// Status Colors
success: '#24A148'           // Success/positive actions
error: '#DA1E28'             // Errors/negative actions  
warning: '#B07C0C'           // Warning states
info: '#0F62FE'              // Information

// Text Colors
textPrimary: '#161616'       // Main content
textSecondary: '#525252'     // Secondary content
textTertiary: '#6B6B6B'      // Tertiary/muted text
textMuted: '#707070'         // Special muted text
textDisabled: '#A0A0A0'      // Disabled states
```

### Typography Scale
```typescript
fontSize: {
  xs: '11px',     // Small labels
  sm: '12px',     // Secondary text
  base: '14px',   // Body text
  md: '16px',     // Large body
  lg: '18px',     // Subheadings
  xl: '20px',     // Headings
  '2xl': '24px',  // Large headings
  '3xl': '32px',  // Display text
  '4xl': '40px'   // Hero text
}
```

### Spacing System
```typescript
spacing: {
  0: '0',      4: '16px',    10: '40px',
  1: '4px',    5: '20px',    12: '48px',
  2: '8px',    6: '24px',    16: '64px',
  3: '12px',   8: '32px',    20: '80px'
}
```

## 🌓 Theme Support

### Available Themes
- **Light Theme** - Default clean interface
- **Dark Theme** - Dark mode for low-light environments  
- **High Contrast** - Enhanced accessibility with increased contrast ratios

### Dynamic Theme Features
- Automatic color adaptation across themes
- Maintains WCAG 2.1 AA compliance
- Seamless theme switching
- CSS variable-based implementation

## 📁 Project Structure

```
ODL/
├── content/                    # Storybook configuration and stories
│   ├── .storybook/            # Storybook setup and theme decorator
│   ├── src/
│   │   ├── components/        # 44 components with .stories.tsx files
│   │   ├── styles/            # Global styles and ODL theme
│   │   ├── utils/             # Utility functions
│   │   ├── hooks/             # Custom React hooks
│   │   └── types/             # TypeScript definitions
│   └── package.json
├── src/
│   ├── components/            # Source component implementations
│   │   ├── Accordion/         # Collapsible content sections
│   │   ├── AlertBanner/       # System notifications
│   │   ├── BackToTop/         # Navigation helper
│   │   ├── Breadcrumb/        # Hierarchical navigation
│   │   ├── Button/            # Action buttons
│   │   ├── CardComponents/    # Card variants and layouts
│   │   ├── Checkbox/          # Selection inputs
│   │   ├── Chip/              # Status and tag components
│   │   ├── DashboardCards/    # Dashboard-specific components
│   │   ├── Drawer/            # Slide-out panels
│   │   ├── Dropdown/          # Select menus
│   │   ├── FileType/          # File type indicators
│   │   ├── Graph/             # Data visualization
│   │   ├── Header/            # Application headers
│   │   ├── HierarchyVisualizations/ # Org charts
│   │   ├── Icon/              # Icon system
│   │   ├── IconButton/        # Interactive icons
│   │   ├── Input/             # Text inputs and forms
│   │   ├── Kanban/            # Task board components
│   │   ├── Modal/             # Dialog components
│   │   ├── NavigationRail/    # Sidebar navigation
│   │   ├── Popover/           # Contextual displays
│   │   ├── RadioButton/       # Radio selection groups
│   │   ├── SimpleEditor/      # Rich text editor
│   │   ├── StatusCard/        # Status displays
│   │   ├── Stepper/           # Multi-step indicators
│   │   ├── Switch/            # Toggle switches
│   │   ├── Table/             # Data tables
│   │   ├── Tabs/              # Tab navigation
│   │   ├── ThumbnailCards/    # Image-based cards
│   │   ├── TreeNavigation/    # Tree-based navigation
│   │   └── UserAvatar/        # User profile components
│   ├── styles/
│   │   ├── ODLTheme.ts        # Main theme configuration
│   │   └── index.css          # Global styles
│   └── utils/                 # Shared utilities
└── package.json
```

## 🔧 Key Features

### Accessibility First
- WCAG 2.1 AA compliant
- Full keyboard navigation support
- Screen reader optimized
- High contrast theme support
- Proper ARIA attributes and roles

### Developer Experience
- **TypeScript** - Full type safety and IntelliSense
- **Storybook** - Interactive component documentation
- **Tree Shaking** - Import only what you need
- **Hot Reload** - Fast development iteration
- **ESLint/Prettier** - Code quality and formatting

### Advanced Component Features
- **Dynamic Theming** - Automatic adaptation to theme changes
- **Responsive Design** - Mobile-first approach
- **Performance Optimized** - Lazy loading and code splitting
- **Internationalization Ready** - i18n support structure
- **Carbon Icons** - 200+ professional icons

### Data Components
- **Advanced Tables** - Sorting, filtering, pagination, selection
- **Search Integration** - Built-in search with SearchLocate icon
- **Column Management** - Resize, reorder, hide/show columns
- **Export Functionality** - Data export capabilities

## 🎯 Component Status

### Ready for Development
Components marked with "Ready for dev" tag in Storybook:
- **Switch** - Toggle switches with full accessibility
- **Cards** - All card variants with enhanced functionality
- **Accordion** - Collapsible sections with nested support
- And more...

### Component Maturity
- **48 Storybook Stories** - Multiple variants per component
- **100% Documentation** - Every component documented in Storybook
- **Type Safe** - Full TypeScript coverage
- **Tested** - Comprehensive testing coverage

## 🚀 Getting Started

### Basic Usage
```tsx
import { Button, Cards, Input, Modal } from '@odl/design-system';
import '@odl/design-system/styles';

function App() {
  return (
    <div>
      <Button variant="primary" size="medium">
        Click me
      </Button>
      <Cards 
        type="comfortable"
        title="Sample Card"
        subtitle="Card description"
        tag="v1.0"
      />
      <Input 
        type="text"
        label="Enter text"
        placeholder="Type here..."
      />
    </div>
  );
}
```

### Advanced Usage with Theming
```tsx
import { useTheme } from '@odl/design-system';

function ThemedComponent() {
  const { colors, spacing, typography } = useTheme();
  
  return (
    <div style={{
      color: colors.textPrimary,
      padding: spacing[4],
      fontSize: typography.fontSize.base
    }}>
      Themed content
    </div>
  );
}
```

## 📚 Documentation

- **Storybook**: Interactive component playground and documentation
- **TypeScript**: Full type definitions and IntelliSense support
- **Examples**: Real-world usage examples in each story
- **Best Practices**: Guidelines for accessibility and performance

## 🔄 Development Workflow

```bash
# Start Storybook for development
npm run storybook

# Build components
npm run build

# Run tests
npm test

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🤝 Contributing

1. Follow the existing component structure
2. Include comprehensive Storybook stories
3. Ensure accessibility compliance
4. Add TypeScript definitions
5. Follow the existing naming conventions
6. Use ODL theme tokens for styling

## 📄 License

MIT License - See LICENSE file for details

---

**ODL Design System** - Building consistent, accessible, and beautiful user interfaces.