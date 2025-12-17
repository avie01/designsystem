# ODL Library - Developer Guide

## Project Overview
Open Design Library (ODL) - React/TypeScript component library with Carbon Design System icons for government and enterprise applications.

**Dev Server:** `npm run dev`
**Component Showcase:** http://localhost:3000/components-showcase.html

---

## 🚀 Quick Development

### Start Development
```bash
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run test:e2e              # Run Playwright tests
npm run test:e2e:ui           # Visual test runner
```

### Adding New Pages to Build App
```tsx
// 1. Create page in /src/pages/YourPage.tsx
// 2. Add to Build (MultiPageExample.tsx):
const LazyYourPage = createLazyComponent(
  () => import('../src/pages/YourPage'),
  'YourPage'
);
// 3. Add to menuItems array and route handling
```

---

## 🎨 ODL Design System

### Always Use ODL Theme
```typescript
import ODLTheme from '../styles/ODLTheme';

const styles = {
  color: ODLTheme.colors.primary,              // NOT '#3560C1'
  padding: ODLTheme.spacing[4],                // NOT '16px'
  fontSize: ODLTheme.typography.fontSize.base, // NOT '14px'
};
```

### CSS Custom Properties (Required Pattern)
```css
:root {
  /* Colors - WCAG 2.1 AA Compliant */
  --odl-primary: #3560C1;              /* 4.59:1 contrast on white */
  --odl-text-primary: #161616;         /* 15.3:1 contrast on white */
  --odl-text-secondary: #525252;       /* 7.0:1 contrast on white */
  --odl-border: #E0E0E0;               /* 3.28:1 contrast for UI */
  
  /* Spacing (8px grid) */
  --odl-spacing-1: 4px;
  --odl-spacing-2: 8px;
  --odl-spacing-4: 16px;
  --odl-spacing-6: 24px;
  
  /* Typography */
  --odl-font-size-base: 14px;
  --odl-font-size-md: 16px;
  --odl-line-height-normal: 1.5;
}
```

---

## 🧩 Component Usage

### Priority Order
1. **Check demo pages** (`/src/pages/*Demo.tsx`) for latest implementations
2. **Copy components** from demo pages (e.g., SimpleTabs from TabsDemo)
3. **Only use `/src/components/`** when creating that component's demo page

### Available Components
- **Button** (`/button-demo.html`) - All variants, sizes, states
- **Input** (`/input-demo.html`) - Includes textarea support
- **Table** (`/table-demo.html`) - Sorting, filtering, pagination
- **Graph** (`/graph-demo.html`) - 9 chart types with Recharts
- **Modal** (`/modal-demo.html`) - Multiple sizes
- **Cards** (`/cards-demo.html`) - Selection, actions
- **Header** (`/header-demo.html`) - All product variants

### Input Component (Textarea Example)
```tsx
<Input
  type="textarea"
  label="Description"
  value={description}
  onChange={(value) => setDescription(value)}
  rows={4}
  resize="vertical"
  helperText={`${description.length}/500`}
/>
```

### Graph Component
```tsx
<Graph
  type="area"
  data={data}
  dataKeys={['value']}
  xAxisKey="month"
  colors={['#3B82F6']}
  animated={true}
  gradient={true}
/>
```
Types: line, area, bar, pie, radar, scatter, composed, radial, treemap

---

## 🎯 Icons System

### Carbon Icons (Primary)
```tsx
import Icon from '../components/Icon/Icon';
<Icon name="folder" size={16} />
<Icon name="chevron-down" size={12} />
```

### Icon Accessibility
```tsx
<Icon 
  name="warning" 
  size={16} 
  aria-label="Warning indicator"
  role="img"
/>
```

---

## ♿ WCAG 2.1 AA Compliance

### Color Contrast Requirements
- **4.5:1 minimum** for normal text (14px+)
- **3:1 minimum** for large text (18px+ or 14px+ bold)
- **3:1 minimum** for UI components

### Focus Indicators
```css
.component:focus {
  outline: 2px solid var(--odl-primary);
  outline-offset: 2px;
}
```

### Keyboard Navigation
```typescript
<button
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleAction();
    }
  }}
  aria-label="Close dialog"
>
```

---

## 🏗️ Component Architecture Standards

### Standard Component Interface
```typescript
export interface ComponentProps {
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  error?: boolean;
  className?: string;
  'aria-label'?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}
```

### Size Variations
```css
.component--sm {
  padding: var(--odl-spacing-2) var(--odl-spacing-3);
  font-size: var(--odl-font-size-sm);
}

.component--md {
  padding: var(--odl-spacing-3) var(--odl-spacing-4);
  font-size: var(--odl-font-size-base);
}
```

### State Management
```css
.component:hover:not(.component--disabled) {
  background-color: var(--odl-surface-hover);
}

.component--disabled {
  color: var(--odl-text-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}

.component--error {
  border-color: var(--odl-error);
  color: var(--odl-error);
}
```

---

## 🧪 Testing with Playwright

### Manual Playwright Control
Playwright tests only run when explicitly requested:

```bash
# Manual control commands
npm run playwright:manual     # Show available commands  
npm run playwright:cleanup    # Clean old screenshots (7+ days)
npm run playwright:visual     # Visual regression tests with UI
npm run playwright:screenshots # Screenshot helper tests with UI
npm run playwright:cityplan   # CityPlan comparison tests with UI
npm run playwright:all        # Cleanup + run all tests with UI

# When user says "Playwright this" - run:
npm run playwright:visual     # Most common use case
```

### Quick Test Commands
```bash
npm run test:e2e:ui          # Visual test runner (recommended)
npm run test:e2e:headed      # See browser in action
npm run test:e2e -- --grep "button"  # Test specific component
```

### Basic Test Template
```typescript
import { test, expect } from '@playwright/test';

test.describe('Component Demo', () => {
  test('should load and show examples', async ({ page }) => {
    await page.goto('/component-demo.html');
    await expect(page).toHaveTitle(/Component Demo/);
    await expect(page.locator('[data-testid="demo-example"]')).toBeVisible();
  });
});
```

### Test Data Attributes
```tsx
<Button data-testid="primary-button">Click Me</Button>
<Input data-testid="email-input" type="email" />
```

---

## 🔧 Troubleshooting

### Dev Server Issues
```bash
# Connection refused errors
pkill -f "node server" && npm run dev

# Port conflicts
lsof -i :3000
npm run dev -- --port 3001

# Clear cache
rm -rf node_modules/.vite && npm run dev
```

### Common Syntax Errors
- **JSX Comments**: Never use `/* */` to comment out JSX - delete it or use `//`
- **Import Issues**: BubbleMenu/FloatingMenu import from `@tiptap/react/menus` not `@tiptap/react`

---

## 🚫 Anti-Patterns to Avoid

### ❌ Hardcoded Values
```typescript
// WRONG
style={{ 
  color: '#333333',
  padding: '16px',
  fontSize: '14px'
}}

// CORRECT
style={{ 
  color: 'var(--odl-text-primary)',
  padding: 'var(--odl-spacing-4)',
  fontSize: 'var(--odl-font-size-base)'
}}
```

### ❌ Missing Standard Props
Every component needs: `disabled`, `error`, `size`

### ❌ Poor Accessibility
- Missing focus indicators
- No ARIA labels
- Insufficient color contrast

---

## 📁 Project Structure

```
/Build
  /example           # HTML entry files and demo entries
    *.html          # Entry points for all demos
    *Entry.tsx      # Entry components
    MultiPageExample.tsx  # Main application
  /src
    /components     # Reusable components
    /pages         # Demo pages and examples
    /styles        # ODL theme and design system
    /hooks         # Custom React hooks
    /types         # TypeScript definitions
```

---

## 🎯 Header Variants

- **Build** - Green (#5DA10C), 26px logo
- **Connect** - Blue (#0B77D8), 42px logo
- **Keystone** - Teal (#00928F), 42px logo
- **Nexus** - Blue (#0B77D8), 42px logo
- **Regworks** - Teal (#00928F), 42px logo
- **3Sixty** - Blue (#0B77D8), 42px logo

---

## 🚨 Related Projects

### Isovist Project
Separate independent project at `/Users/andrewk/Documents/ODL-Library/Isovist/`

**Two Design Systems:**
- **Public pages** (`/src/pages/public/`) - ODL components with custom CSS overrides
- **Admin pages** (`/src/pages/admin/`) - Pure ODL styling, no overrides

---

## ✅ Quick Reference

### Font Stack
```css
font-family: 'Noto Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
```

### Content Border Pattern
```tsx
<div style={{ 
  background: '#EDF1F5',
  borderRadius: '16px',
  padding: '24px'
}}>
  <div style={{ 
    background: 'white',
    borderRadius: '8px',
    padding: '24px'
  }}>
    {/* Content */}
  </div>
</div>
```

### User Terminology
- "Select field" = Dropdown component
- "Content border" = Use content border pattern above

---

**Last Updated:** 2025-08-18
**WCAG Standard:** 2.1 Level AA
**React Version:** 18+
**TypeScript:** Required