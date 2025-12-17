# Tailwind CSS Migration Guide

## Overview
This document tracks the migration of ODL components from inline styles to Tailwind CSS classes.

## Migration Status

### ✅ Completed Components
- [x] **Button** (`ButtonTW.tsx`) - Uses ODL color tokens with Tailwind
- [x] **Cards** (`CardsTW.tsx`) - Fully styled with Tailwind classes
- [x] **Input** (`InputTW.tsx`) - Form inputs with Tailwind styling
- [x] **Utility** (`classNames.ts`) - Helper function for conditional classes

### 🚧 In Progress
- [ ] **Table** - Already uses Tailwind, needs ODL color updates
- [ ] **Header** - Convert inline styles to Tailwind
- [ ] **NavigationRail** - Convert inline styles to Tailwind
- [ ] **Dropdown** - Convert inline styles to Tailwind
- [ ] **Modal** - Convert inline styles to Tailwind

### 📋 Pending Components
- [ ] Alert
- [ ] Breadcrumb
- [ ] Chip
- [ ] Drawer
- [ ] Graph
- [ ] Icon
- [ ] Popover
- [ ] Stepper
- [ ] Tabs
- [ ] BackToTop
- [ ] DemoBreadcrumb

## ODL Design Tokens in Tailwind

### Colors (defined in tailwind.config.js)
```javascript
// Primary
'odl-primary': '#3560C1'
'odl-primary-hover': '#2A4FA3'
'odl-primary-light': '#E0F3FE'
'odl-primary-dark': '#1E3A8A'

// Status
'odl-success': '#24A148'
'odl-error': '#DA1E28'
'odl-warning': '#F1C21B'
'odl-info': '#0F62FE'

// Neutral
'odl-background': '#FAFAFA'
'odl-surface': '#F4F4F4'
'odl-border': '#E0E0E0'
'odl-text-primary': '#161616'
'odl-text-secondary': '#525252'
'odl-text-tertiary': '#8D8D8D'
'odl-text-disabled': '#C6C6C6'
```

## Usage Guidelines

### Component Structure
```tsx
import { cn } from '../../utils/classNames';

const Component = ({ variant, size, className, ...props }) => {
  const styles = cn(
    // Base styles
    'base-tailwind-classes',
    
    // Conditional styles
    variant === 'primary' && 'variant-specific-classes',
    
    // Size variations
    sizeStyles[size],
    
    // Custom classes
    className
  );
  
  return <div className={styles}>...</div>;
};
```

### Common Patterns

#### Buttons
```tsx
// Primary button
className="bg-odl-primary hover:bg-odl-primary-hover text-white"

// Secondary button
className="bg-white border border-odl-border hover:bg-odl-surface"

// Ghost button
className="bg-transparent hover:bg-odl-surface"
```

#### Cards
```tsx
// Default card
className="bg-white rounded-lg shadow-sm border border-odl-border p-6"

// Elevated card
className="bg-white rounded-lg shadow-lg p-6"
```

#### Forms
```tsx
// Input field
className="border border-odl-border focus:border-odl-primary rounded px-4 py-2"

// Error state
className="border-odl-error focus:ring-odl-error-light"
```

## Migration Steps

1. **Create TW version**: Create a new file with `TW` suffix (e.g., `ButtonTW.tsx`)
2. **Import utilities**: Import `cn` helper and any required dependencies
3. **Convert styles**: Replace inline styles with Tailwind classes
4. **Use ODL colors**: Use custom ODL color classes (e.g., `bg-odl-primary`)
5. **Test component**: Ensure all variants and states work correctly
6. **Update exports**: Update main index to export new version
7. **Update demos**: Update demo pages to use new components

## Benefits of Tailwind Migration

1. **Consistency**: All components use the same design tokens
2. **Performance**: Smaller bundle size with PurgeCSS
3. **Maintainability**: Easier to update styles across all components
4. **Developer Experience**: Familiar Tailwind utilities
5. **Responsive Design**: Built-in responsive modifiers
6. **Dark Mode**: Easy theme switching with Tailwind

## Next Steps

1. Complete migration of core components (Table, Header, NavigationRail)
2. Update all demo pages to import Tailwind CSS
3. Configure PurgeCSS for production builds
4. Add dark mode support using Tailwind's dark mode feature
5. Create comprehensive component documentation