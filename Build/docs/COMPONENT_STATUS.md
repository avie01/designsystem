# ODL Component Library - Tailwind Migration Status

## ✅ Components Using Tailwind with ODL Styling

These components have been fully migrated to use Tailwind CSS with ODL design tokens:

1. **Button** (`ButtonTW.tsx`)
   - All variants: primary, secondary, tertiary, ghost, destructive
   - All sizes: xs, sm, md, lg
   - Uses ODL colors: `bg-odl-primary`, `hover:bg-odl-primary-hover`, etc.

2. **Cards** (`CardsTW.tsx`)
   - All variants: default, elevated, outlined, stat, image
   - Responsive layouts with Tailwind utilities
   - ODL colors for borders and text

3. **Input** (`InputTW.tsx`)
   - All input types including textarea
   - Error states with ODL error colors
   - Focus states with ODL primary colors

4. **Chip** (`ChipTW.tsx`)
   - All variants with ODL status colors
   - Closeable chips with icon support
   - Selected states with ring utilities

5. **Breadcrumb** (`BreadcrumbTW.tsx`)
   - Multiple separator styles
   - Hover and focus states with ODL colors
   - Responsive sizing

6. **Table** (`Table.tsx`)
   - Already uses Tailwind, updated with ODL colors
   - Selection states use `bg-odl-primary-light`
   - Borders use `border-odl-border`

## 🔧 Components Partially Using Tailwind

These need minor updates to fully adopt ODL tokens:

- **Icon** - Mostly inline styles, works as-is
- **DemoBreadcrumb** - Uses some Tailwind classes

## ❌ Components Still Using Inline Styles

These components need to be migrated to Tailwind:

1. **Header** - Complex component with inline styles
2. **NavigationRail** - Uses inline styles for theming
3. **Modal** - Inline styles for positioning
4. **Dropdown** - Complex positioning logic
5. **Drawer** - Slide animations with inline styles
6. **Tabs** - Inline styles for active states
7. **Stepper** - Progress indicators
8. **Graph** - Chart library (Recharts) based
9. **AlertBanner** - Status colors in inline styles
10. **Popover** - Positioning with inline styles
11. **BackToTop** - Simple button with inline styles
12. **UserAvatar** - Avatar styles inline

## 🎨 ODL Design Tokens in Tailwind

All migrated components use these ODL color classes:

```css
/* Primary Palette */
bg-odl-primary (#3560C1)
bg-odl-primary-hover (#2A4FA3)
bg-odl-primary-light (#E0F3FE)
bg-odl-primary-dark (#1E3A8A)

/* Status Colors */
bg-odl-success (#24A148)
bg-odl-error (#DA1E28)
bg-odl-warning (#F1C21B)
bg-odl-info (#0F62FE)

/* Neutral Colors */
bg-odl-background (#FAFAFA)
bg-odl-surface (#F4F4F4)
border-odl-border (#E0E0E0)
text-odl-text-primary (#161616)
text-odl-text-secondary (#525252)
text-odl-text-tertiary (#8D8D8D)
```

## 📦 How to Use

The main `src/index.ts` automatically exports the Tailwind versions:

```typescript
import { Button, Cards, Input, Chip, Breadcrumb } from 'odl-component-library';

// These are all Tailwind versions with ODL styling
```

## 🚀 Next Steps

1. Migrate remaining high-priority components (Header, NavigationRail, Modal)
2. Add dark mode support using Tailwind's dark mode feature
3. Add responsive variants for all components
4. Create Storybook stories for all Tailwind components
5. Update documentation with Tailwind utility classes