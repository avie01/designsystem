# ODL (Objective Design Library) Documentation

## Overview

The ODL (Objective Design Library) is a comprehensive React component library built with TypeScript and Carbon Design System icons. It provides a consistent, accessible, and performant set of UI components for building enterprise applications across the Objective suite of products.

## Key Features

- **React + TypeScript**: Type-safe component development with modern React patterns
- **Carbon Design System Icons**: Comprehensive icon set with consistent styling
- **Self-Contained Components**: No external CSS framework dependencies
- **Multiple Product Themes**: Support for Build, Connect, Keystone, Nexus, Regworks, 3Sixty
- **Accessibility First**: WCAG compliant components with keyboard navigation
- **Performance Optimized**: Embedded SVGs, efficient rendering, lazy loading

## Architecture Principles

### 1. Component Structure
Each component follows a consistent structure:
```
/src/components/{ComponentName}/
  ├── {ComponentName}.tsx       # Main component file
  ├── {ComponentName}.module.css # Component-specific styles (optional)
  └── index.ts                   # Export file
```

### 2. Demo Page Pattern
Every component has a corresponding demo page showcasing all variants:
```
/example/
  ├── {component}-demo.html     # HTML entry point
  └── {ComponentName}DemoEntry.tsx # React entry wrapper

/src/pages/
  └── {ComponentName}Demo.tsx   # Demo component with examples
```

### 3. Styling Approach
- **Inline Styles**: Primary approach for component styling
- **CSS Modules**: Used for complex demo pages (TableDemo.module.css)
- **Theme System**: Centralized color and spacing values
- **No External CSS**: Components don't rely on Tailwind, Bootstrap, etc.

## Component Library

### Navigation Components

#### Header
Multi-variant navigation header with product branding, search, and user management.

**Variants:**
- Build (green - #5DA10C)
- Connect (blue - #0B77D8)
- Keystone (teal - #00928F)
- Nexus (blue - #0B77D8)
- Regworks (teal - #00928F)
- 3Sixty (blue - #0B77D8)
- Custom (configurable)

**Key Features:**
- Embedded SVG logos for optimal performance
- Consistent 80px height (except Build at 26px logo)
- Search field or icon based on variant
- User avatar with dropdown menu
- Notification bell with badge
- Fixed positioning dropdowns to prevent clipping

#### Breadcrumb
Navigation breadcrumb component for hierarchical page structures.

**Features:**
- Supports multiple levels
- Interactive navigation
- Responsive text truncation
- Icon support

### Form Components

#### Input
Comprehensive input field with validation and special types.

**Types:**
- Text input with validation states
- Password input with visibility toggle
- Date picker with calendar widget
- Search input with icon
- Multi-line textarea

**Features:**
- Real-time validation
- Error/success states
- Helper text
- Placeholder support
- Accessible labels

#### Dropdown
Advanced select menu with search and multi-select capabilities.

**Features:**
- Single and multi-select modes
- Search/filter functionality
- Icon support for options
- Grouped options
- Custom styling per variant
- Error and disabled states

#### Button
Versatile button component with multiple variants and states.

**Variants:**
- Primary (solid background)
- Secondary (outlined)
- Tertiary (text only)
- Danger (destructive actions)
- Ghost (minimal styling)

**Sizes:**
- Small
- Default
- Large

**Features:**
- Icon support (left/right)
- Loading state
- Disabled state
- Full width option

### Display Components

#### Table
Advanced data table with sorting, filtering, and pagination.

**Features:**
- Column sorting (asc/desc)
- Row selection (single/multi)
- Inline actions
- Pagination controls
- Responsive design
- Custom cell renderers
- Filter inputs per column

#### Cards
Flexible content containers with multiple patterns.

**Types:**
- Basic card with header/content/footer
- Feature card with icon
- Metric card with stats
- Action card with buttons
- Grid layout support

**Features:**
- Selection state
- Hover effects
- Custom actions
- Responsive sizing

#### Tabs
Tab navigation component with icon support.

**Variants:**
- Default tabs
- Compact tabs
- Icon-only tabs
- Tabs with badges

**Features:**
- Controlled/uncontrolled modes
- Lazy loading content
- Keyboard navigation
- Custom styling

### Utility Components

#### Icon
Carbon Design System icon wrapper.

**Usage:**
```tsx
<Icon name="add" size={20} />
<Icon name="search" size={16} color="#0B77D8" />
```

**Features:**
- 100+ available icons
- Customizable size and color
- Accessible labels
- Consistent styling

#### BackToTop
Scroll-to-top button for long pages.

**Features:**
- Appears after scrolling
- Smooth scroll animation
- Fixed positioning
- Customizable threshold

## Demo Pages

All components have comprehensive demo pages showing:
1. **Live Examples**: Interactive component instances
2. **Code Samples**: Copy-paste ready code
3. **Variant Showcase**: All available options
4. **Feature Grid**: Key capabilities listed
5. **API Documentation**: Props and methods

Demo pages follow a consistent pattern:
- DemoBreadcrumb navigation
- Header with View Code toggle
- Demo selector for variants
- Live component preview
- Code block (collapsible)
- Feature showcase cards

## Best Practices

### 1. Component Usage
- Always check demo pages for latest implementations
- Copy components from demos, not /components/ folder
- Use the established patterns for consistency

### 2. Styling
- Never hardcode colors - use theme values
- Maintain consistent spacing with theme system
- Keep styles self-contained within components

### 3. Accessibility
- Include ARIA labels on interactive elements
- Support keyboard navigation (Tab, Enter, Escape)
- Provide focus indicators
- Ensure color contrast meets WCAG standards

### 4. Performance
- Use embedded SVGs for logos and icons
- Implement lazy loading for heavy content
- Minimize re-renders with proper React patterns
- Use CSS transforms for animations

### 5. Testing
- Test all component variants
- Verify keyboard navigation
- Check responsive behavior
- Validate accessibility with screen readers

## Development Workflow

### Setup
```bash
npm install
npm run dev
```

### Creating New Components
1. Create component in `/src/components/{ComponentName}/`
2. Build demo page following the pattern
3. Add HTML entry and React wrapper in `/example/`
4. Update component showcase with link
5. Document props and usage

### Testing Components
- Use demo pages for visual testing
- Check all variants and states
- Test keyboard navigation
- Verify responsive behavior
- Validate with different data sets

## Deployment

Components are built as a library that can be:
- Imported into Objective products
- Used standalone in new applications
- Extended with product-specific customizations

## Version History

### Current Version: 1.0.0
- Complete component library
- 8+ fully functional components
- 6 product header variants
- Comprehensive demo pages
- Full accessibility support

## Future Enhancements

### Planned Components
- Modal/Dialog
- Toast/Notification
- Accordion
- Progress indicators
- File upload
- Rich text editor

### Planned Features
- Dark mode support
- Theme customization UI
- Component playground
- Automated testing suite
- Storybook integration

## Support

For questions or issues:
- Check demo pages for examples
- Review this documentation
- Consult CLAUDE.md for development guidelines
- Follow established patterns from existing components