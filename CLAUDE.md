# ODL Design System - AI Assistant Guide

## 🎯 Quick Reference

**Primary Documentation:** Storybook (Single Source of Truth)
- **Live:** https://content-steamfrog2012s-projects.vercel.app
- **Local:** `http://localhost:6006` (after running `npm run storybook`)

**Start Storybook:**
```bash
cd content
npm run storybook
```

## ⚠️ IMPORTANT RULES

**NEVER:**
- Hardcode colors or pixel values - use `ODLTheme.*` or CSS variables
- Use `/* */` comments in code
- Create new files in `/src/components` without careful consideration
- Add application-specific business logic to the design system
- Install packages without checking if they already exist

**ALWAYS:**
- Use `ODLTheme.colors.*`, `ODLTheme.spacing[*]`, etc.
- Use CSS variables: `var(--odl-primary)`, `var(--odl-spacing-4)`
- Copy patterns from existing `*Demo.tsx` files
- Include standard props: `size`, `disabled`, `error`, `className`
- Check existing components before creating new ones

## 📊 Table Component Usage

**IMPORTANT:** Always use `/src/components/Table/Table.tsx` for ALL tables.

Features:
- Sorting, pagination, selection
- Search with SearchLocate icon
- Column resize and visibility toggle
- Filtered data patterns
- Small chips (`size="sm"`) for status columns

Reference: `/src/pages/TableDemo.tsx`

## 🔍 Finding Components

**Storybook is the primary reference for all components:**
1. Browse stories in Storybook at https://content-steamfrog2012s-projects.vercel.app
2. Each component has multiple stories showing different variants
3. Use Storybook's search to quickly find components by name
4. View props, accessibility features, and usage patterns in each story
5. Source files are in `/content/src/components/[ComponentName]/[ComponentName].stories.tsx`

## 💻 Common Patterns

```tsx
// Creating a new page
// Add to: /src/pages/YourPage.tsx
// No need to update routing - demos are standalone

// Using theme values
import { ODLTheme } from '../styles/ODLTheme';
style={{ 
  color: ODLTheme.colors.primary,
  padding: ODLTheme.spacing[4] 
}}

// CSS variables
className="bg-[var(--odl-primary)]"

// Input with textarea
<Input 
  type="textarea" 
  value={value} 
  onChange={setValue} 
  rows={4}
/>

// Graph component
<Graph 
  type="area|bar|pie" 
  data={data} 
  dataKeys={['value']} 
  xAxisKey="x"
/>

// Icon usage
<Icon name="folder" size={20} />

// Standard wrapper
<div style={{background:'#EDF1F5',padding:'24px'}}>
  <div style={{background:'white',padding:'24px'}}>
    {/* Content */}
  </div>
</div>
```

## 🎨 Design Tokens

- **Colors:** primary, success, warning, error, neutral
- **Spacing:** 0-12 (4px increments)
- **Typography:** fontSize (xs, sm, base, lg, xl, 2xl)
- **Shadows:** sm, md, lg, xl
- **Border Radius:** sm, md, lg, full

## 📁 Project Structure

```
content/
├── .storybook/         # Storybook configuration
├── src/
│   ├── components/     # 44 components with .stories.tsx files
│   ├── pages/          # Legacy demo pages (being phased out)
│   ├── styles/         # Global styles, themes, ODLTheme
│   ├── utils/          # Utility functions
│   ├── hooks/          # Custom React hooks
│   └── types/          # TypeScript type definitions
├── example/            # Legacy HTML entry points (being phased out)
├── package.json        # Dependencies
└── vite.config.ts      # Vite build configuration
```

**Note:** Storybook is now the primary documentation. Legacy demo pages will be deprecated.

## 🛠️ Troubleshooting

**Vite errors:**
```bash
rm -rf node_modules/.vite
npm run dev
```

**Port in use:**
```bash
pkill -f "node.*vite"
npm run dev
```

**Missing styles:**
- Check that `/src/styles/index.css` exists
- Verify it imports all necessary CSS modules
- Carbon styles are NOT installed (by design)

## 📋 Component Status

**Total Components:** 44
**Storybook Stories:** 48 (multiple stories per component showing different variants)
**Categories:** Data, Navigation, Input, Display, Feedback, Layout
**Documentation:** 100% of components documented in Storybook

## 🚀 Creating Storybook Stories

**All new component documentation should be added to Storybook, not legacy demo pages.**

1. Create stories file: `/content/src/components/ComponentName/NN-ComponentName.stories.tsx`
   - Use numbering scheme (01-, 02-, etc.) to organize in Storybook
2. Follow existing story patterns from other components
3. Export Meta object with title and component:
```tsx
const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
};
export default meta;
```
4. Create story variants (Default, WithProps, States, etc.)
5. Stories will automatically appear in Storybook at http://localhost:6006

**Example story structure:**
```tsx
export const Default: Story = {
  args: {
    // default props
  },
};

export const WithCustomProps: Story = {
  args: {
    // custom props
  },
};
```

## 🎯 Key Components

### Most Used:
- **Button** - All button variants
- **Input** - Text fields and textareas  
- **Table** - Data tables with all features
- **Modal** - Dialog overlays
- **Dropdown** - Select menus
- **Cards** - Content containers
- **Header** - Application headers
- **Graph** - Charts and visualizations

### Advanced:
- **NavigationRail** - Side navigation
- **Kanban** - Drag-drop boards
- **TreeNavigation** - Hierarchical navigation
- **HierarchyVisualizations** - Data visualization
- **SimpleEditor** - Rich text editing

## 📝 Notes

- This is a pure design system - no business logic
- All components are accessibility compliant (WCAG 2.1 AA)
- TypeScript is required for all new components
- Components use inline styles or Tailwind classes
- Carbon icons are dynamically imported for performance

---
Last Updated: 2025-12-17 (Storybook as Single Source of Truth)