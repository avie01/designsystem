# ODL Design System - AI Assistant Guide

## 🎯 Quick Reference

**Project Location:** `/Users/andrewk/Documents/ODL-Library/odl-design-system/content`

**Main Landing Page:** http://localhost:3000/components-showcase.html

**Start Dev Server:**
```bash
cd /Users/andrewk/Documents/ODL-Library/odl-design-system/content
npm run dev
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

To find component examples:
1. Look for `*-demo.html` files in `/example/`
2. Find corresponding `*Demo.tsx` in `/src/pages/`
3. Check the Components Showcase at http://localhost:3000/components-showcase.html

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
├── src/
│   ├── components/     # 53 components - avoid modifying
│   ├── pages/          # Demo pages - add new demos here
│   ├── styles/         # Global styles and themes
│   ├── utils/          # Utility functions
│   └── hooks/          # Custom React hooks
├── example/            # HTML entry points for demos
└── package.json        # Dependencies
```

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

**Total Components:** 53
**Demo Pages:** 28
**Categories:** Data, Navigation, Input, Display, Feedback, Layout

## 🚀 Creating New Demos

1. Create `/src/pages/NewDemo.tsx`
2. Create `/example/new-demo.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Demo</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="NewDemoEntry.tsx"></script>
</body>
</html>
```
3. Create `/example/NewDemoEntry.tsx`:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import NewDemo from '../src/pages/NewDemo';
import '../src/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NewDemo />
  </React.StrictMode>
);
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
Last Updated: 2025-09-08