# ODL Design System Integration Guide
## Proven Setup Process to Avoid Common Issues

### ⚡ Quick Setup Checklist
```bash
# 1. Create project structure
mkdir -p src/odl/{components,styles}
mkdir -p public/fonts

# 2. Copy components locally (avoid module resolution issues)
cp -r ../odl-design-system/content/src/components/* src/odl/components/

# 3. Symlink styles for live updates
ln -sf ../../../odl-design-system/content/src/styles src/odl/styles

# 4. Copy ODLTheme.ts (Vite doesn't follow TS symlinks)
cp ../Isovist/src/styles/ODLTheme.ts src/odl/styles/

# 5. Install Playwright for testing
npm install -D @playwright/test
```

---

## 🚨 CRITICAL ISSUES & SOLUTIONS

### 1. TypeScript Import Errors
**Problem**: `Failed to resolve import "./odl/styles/ODLTheme"`
**Root Cause**: Vite doesn't follow symlinks for TypeScript files
**Solution**: Copy ODLTheme.ts instead of symlinking
```bash
# DON'T: ln -s ../../../odl/ODLTheme.ts src/odl/styles/ODLTheme.ts
# DO: cp ../path/to/ODLTheme.ts src/odl/styles/ODLTheme.ts
```

### 2. Modal Component API Mismatch
**Problem**: Modal doesn't appear when clicked
**Root Cause**: Component expects `isOpen` prop, not conditional rendering
**Solution**: Always pass `isOpen` prop
```tsx
// WRONG
{showModal && <Modal />}

// CORRECT
<Modal isOpen={showModal} />
```

### 3. Button Text Color Issues
**Problem**: Primary button text not white
**Root Cause**: Using undefined `--odl-text-inverse` variable
**Solution**: Use `--odl-white` for button text
```css
/* WRONG */
.button--primary {
  color: var(--odl-text-inverse); /* Doesn't exist! */
}

/* CORRECT */
.button--primary {
  color: var(--odl-white);
}
```

### 4. Font Loading Issues
**Problem**: Noto Sans not loading from Google Fonts
**Root Cause**: External dependencies, network issues
**Solution**: Use local font files
```css
/* Create src/fonts.css with @font-face declarations */
@font-face {
  font-family: 'Noto Sans';
  font-weight: 400;
  src: url('/fonts/NotoSans-Regular.ttf') format('truetype');
}
/* Import in main.tsx BEFORE index.css */
```

### 5. CSS Variables Not Loading
**Problem**: Styles appear broken, no colors
**Root Cause**: Missing CSS imports or wrong import order
**Solution**: Proper import order in App.tsx
```tsx
// Correct import order
import './odl/styles/globals.css'
import './odl/styles/design-tokens.css'
import './odl/styles/accessibility-fonts.css'
```

---

## ✅ CORRECT PROJECT STRUCTURE

```
Nexus/
├── public/
│   └── fonts/                 # Local font files
│       ├── NotoSans-Regular.ttf
│       └── ...
├── src/
│   ├── odl/
│   │   ├── components/        # COPIED (not symlinked)
│   │   │   ├── Button/
│   │   │   ├── Modal/
│   │   │   └── ...
│   │   └── styles/            # SYMLINKED (except ODLTheme.ts)
│   │       ├── design-tokens.css → ../../../odl/...
│   │       ├── globals.css → ../../../odl/...
│   │       └── ODLTheme.ts    # COPIED (not symlinked)
│   ├── fonts.css              # Local @font-face declarations
│   ├── index.css              # Minimal base styles
│   ├── App.tsx                # Main app with proper imports
│   └── main.tsx               # Entry with fonts.css import
├── tests/
│   └── odl-integration.spec.ts
└── playwright.config.ts
```

---

## 📝 ESSENTIAL FILES

### 1. **src/main.tsx** - Entry Point
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts.css'        // MUST be before index.css
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### 2. **src/index.css** - Minimal Reset
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans', -apple-system, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
}
```

### 3. **src/App.tsx** - Import Order Matters!
```tsx
// ODL styles (order is important!)
import './odl/styles/globals.css'
import './odl/styles/design-tokens.css'
import './odl/styles/accessibility-fonts.css'

// ODL components
import Button from './odl/components/Button/Button'
import Modal from './odl/components/Modal/Modal'

// ODL TypeScript theme
import { ODLColors, ODLSpacing } from './odl/styles/ODLTheme'
```

---

## 🧪 PLAYWRIGHT TEST SETUP

### Install & Configure
```bash
npm install -D @playwright/test
npx playwright install chromium  # Headless browser
```

### Create playwright.config.ts
```typescript
export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:5175',
    headless: true,  // Headless by default
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5175',
    reuseExistingServer: true,
  },
});
```

### Essential Test Coverage
```typescript
// tests/odl-integration.spec.ts
test('should load without errors', async ({ page }) => {
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  await page.goto('/');
  expect(consoleErrors).toHaveLength(0);
});
```

---

## 🔥 VITE CONFIGURATION

### Handle Symlinks (if needed)
```javascript
// vite.config.ts
export default defineConfig({
  resolve: {
    preserveSymlinks: true  // Only if having symlink issues
  }
})
```

---

## 🎨 ODL CSS VARIABLES REFERENCE

### Essential Variables to Use
```css
/* Colors */
--odl-primary: #3560C1;
--odl-white: #FFFFFF;        /* Use for button text */
--odl-text-primary: #161616;
--odl-text-secondary: #525252;

/* Spacing (8px grid) */
--odl-spacing-2: 8px;
--odl-spacing-4: 16px;
--odl-spacing-6: 24px;

/* Typography */
--odl-font-family-sans: 'Noto Sans', ...;
--odl-font-size-base: 14px;
--odl-font-weight-medium: 500;

/* Borders */
--odl-border-width-thin: 1px;
--odl-border-radius-sm: 2px;
```

### Variables That DON'T Exist (Don't Use!)
```css
--odl-text-inverse  /* Use --odl-white instead */
--odl-primary-dark  /* Use --odl-primary-hover instead */
```

---

## 🐛 DEBUGGING COMMANDS

```bash
# Check symlinks
ls -la src/odl/styles/

# Test with Playwright
npx playwright test --reporter=list

# Clear Vite cache if having issues
rm -rf node_modules/.vite

# Check what's running on ports
lsof -i :5173-5175

# Kill all dev servers
pkill -f "node.*dev"
```

---

## ⚠️ COMMON MISTAKES TO AVOID

1. **DON'T** symlink TypeScript files - Vite won't resolve them
2. **DON'T** use `/* */` comments in production code
3. **DON'T** hardcode colors or pixel values
4. **DON'T** create new files in `/src/components` - use `/src/odl/components`
5. **DON'T** rely on Google Fonts - use local files
6. **DON'T** forget to import fonts.css before index.css
7. **DON'T** use conditional rendering for Modal - use `isOpen` prop
8. **DON'T** use undefined CSS variables - check design-tokens.css first

---

## 🎨 ODL COMPONENT LIBRARY

### Available Components (53 Total)
```
src/odl/components/
├── Core Components
│   ├── Button/          # Primary, Secondary, Tertiary variants
│   ├── Input/           # Text, textarea, password, with validation
│   ├── Modal/           # Dialogs with backdrop, sizes: sm/md/lg/full
│   ├── Table/           # ALWAYS USE THIS - has sorting, pagination, search
│   └── Cards/           # Grid layout, selectable, with render props
├── Navigation
│   ├── Header/          # App header with logo, search, user menu
│   ├── Tabs/            # Tab navigation with panels
│   ├── NavigationRail/  # Side navigation
│   └── TreeNavigation/  # Hierarchical nav
├── Data Display
│   ├── Graph/           # Charts: area, bar, pie, line
│   ├── Kanban/          # Drag-drop board
│   └── HierarchyVisualizations/  # Tree/org charts
├── Feedback
│   ├── AlertBanner/     # Success, warning, error, info alerts
│   ├── Toast/           # Temporary notifications
│   └── Skeleton/        # Loading placeholders
└── Form Controls
    ├── Dropdown/        # Select with search
    ├── Checkbox/        # Single and group
    ├── Radio/           # Radio button groups
    └── Toggle/          # Switch control
```

### Component Usage Patterns

#### 1. Button Component
```tsx
import Button from './odl/components/Button/Button'

// All variants
<Button variant="primary" size="medium" disabled={false}>
  Primary Action
</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>

// With icon
<Button icon={<Icon name="add" size={16} />}>
  Add Item
</Button>

// Button states
<Button loading={true}>Loading...</Button>
<Button disabled={true}>Disabled</Button>
<Button error={true}>Error State</Button>
```

#### 2. Table Component (CRITICAL - ALWAYS USE)
```tsx
import Table from './odl/components/Table/Table'

// FEATURES: sorting, pagination, search, column resize, column visibility
<Table
  data={data}
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'status', label: 'Status', render: (row) => 
      <Chip size="sm" variant={row.status}>{row.status}</Chip>
    }
  ]}
  searchable={true}
  paginated={true}
  selectable={true}
  onSelectionChange={(selected) => console.log(selected)}
/>

// NEVER create custom tables - use this component!
```

#### 3. Modal Component
```tsx
import Modal from './odl/components/Modal/Modal'

// CORRECT USAGE (with isOpen prop)
<Modal
  isOpen={showModal}        // REQUIRED - don't use conditional rendering
  title="Dialog Title"
  size="medium"              // small | medium | large | full
  onClose={() => setShowModal(false)}
  onAction={() => handleAction()}
  actionLabel="Confirm"
  cancelLabel="Cancel"
>
  <p>Modal content here</p>
</Modal>

// WRONG - DON'T DO THIS
{showModal && <Modal />}  // Missing isOpen prop!
```

#### 4. Input Component
```tsx
import Input from './odl/components/Input/Input'

// Text input
<Input
  label="Username"
  value={value}
  onChange={(val) => setValue(val)}
  placeholder="Enter username"
  error={errors.username}
  helperText="Must be unique"
  required={true}
/>

// Textarea
<Input
  type="textarea"
  label="Description"
  value={description}
  onChange={setDescription}
  rows={4}
/>

// With validation
<Input
  type="email"
  label="Email"
  value={email}
  onChange={setEmail}
  error={!isValidEmail(email)}
  errorText="Invalid email format"
/>
```

#### 5. Graph Component
```tsx
import Graph from './odl/components/Graph/Graph'

<Graph
  type="area"              // area | bar | pie | line
  data={data}
  dataKeys={['sales', 'revenue']}
  xAxisKey="month"
  height={300}
  showLegend={true}
  showGrid={true}
/>
```

### Component Props Standards
Every ODL component accepts these standard props:
```typescript
interface StandardProps {
  className?: string;      // Additional CSS classes
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;      // Disabled state
  error?: boolean;        // Error state styling
  loading?: boolean;      // Loading state
  'data-testid'?: string; // For testing
  'aria-label'?: string;  // Accessibility
}
```

### Icon System
```tsx
import Icon from './odl/components/Icon/Icon'

// Using Carbon icons
<Icon name="add" size={20} />
<Icon name="folder" size={16} color={ODLColors.primary} />
<Icon name="search" size={24} />

// Common icons:
// add, edit, delete, search, folder, file, 
// settings, user, home, close, check, warning
```

---

## 📏 ODL DESIGN PRINCIPLES

### 1. Spacing System (8px Grid)
```tsx
// ALWAYS use 8px grid multiples
padding: ODLSpacing[2]  // 8px
padding: ODLSpacing[4]  // 16px
padding: ODLSpacing[6]  // 24px
padding: ODLSpacing[8]  // 32px

// NEVER use arbitrary values
padding: '13px'  // WRONG!
```

### 2. Typography Hierarchy
```css
/* Heading styles */
h1 { font-size: var(--odl-font-size-2xl); }  /* 24px */
h2 { font-size: var(--odl-font-size-xl); }   /* 20px */
h3 { font-size: var(--odl-font-size-lg); }   /* 18px */
h4 { font-size: var(--odl-font-size-md); }   /* 16px */
p  { font-size: var(--odl-font-size-base); } /* 14px */
small { font-size: var(--odl-font-size-sm); } /* 12px */
```

### 3. Color Usage Rules
```tsx
// Semantic color usage
ODLColors.primary      // Primary actions, links
ODLColors.success      // Success states, confirmations
ODLColors.error        // Errors, destructive actions
ODLColors.warning      // Warnings, cautions
ODLColors.info         // Information, tips

// Text colors by importance
ODLColors.text.primary    // Main content
ODLColors.text.secondary  // Supporting text
ODLColors.text.tertiary   // Subtle text
ODLColors.text.disabled   // Disabled state

// NEVER use for text on dark backgrounds
ODLColors.text.inverse  // DOESN'T EXIST - use ODLColors.white
```

### 4. Accessibility Requirements
- **WCAG 2.1 AA Compliance**
- Text contrast: 4.5:1 minimum
- UI elements: 3:1 minimum
- Focus indicators: 2px solid border
- Keyboard navigation: All interactive elements

### 5. Responsive Design
```tsx
// Breakpoints (if needed)
const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px'
}

// Components auto-responsive
<Cards columns={{ mobile: 1, tablet: 2, desktop: 3 }} />
```

---

## 🏗️ CREATING NEW COMPONENTS

### Component Template
```tsx
// src/odl/components/NewComponent/NewComponent.tsx
import React from 'react';
import { ODLColors, ODLSpacing } from '../../styles/ODLTheme';
import './NewComponent.css';

interface NewComponentProps {
  // Standard props
  className?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  error?: boolean;
  
  // Component-specific props
  variant?: 'primary' | 'secondary';
  children?: React.ReactNode;
  onClick?: () => void;
}

const NewComponent: React.FC<NewComponentProps> = ({
  className = '',
  size = 'medium',
  disabled = false,
  error = false,
  variant = 'primary',
  children,
  onClick,
}) => {
  return (
    <div 
      className={`new-component new-component--${variant} new-component--${size} ${className}`}
      onClick={!disabled ? onClick : undefined}
      aria-disabled={disabled}
      data-error={error}
    >
      {children}
    </div>
  );
};

export default NewComponent;
```

### Component CSS Template
```css
/* src/odl/components/NewComponent/NewComponent.css */
.new-component {
  /* Use ODL variables only */
  padding: var(--odl-spacing-3);
  border-radius: var(--odl-border-radius-base);
  font-family: var(--odl-font-family-sans);
  transition: var(--odl-transition-base);
}

.new-component--primary {
  background-color: var(--odl-primary);
  color: var(--odl-white);  /* NOT --odl-text-inverse */
}

.new-component--small {
  padding: var(--odl-spacing-2);
  font-size: var(--odl-font-size-sm);
}

.new-component[aria-disabled="true"] {
  opacity: var(--odl-opacity-disabled);
  cursor: not-allowed;
}
```

---

## 📚 QUICK REFERENCE

### Component Props Pattern
```tsx
// All ODL components should have these props
interface ComponentProps {
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  error?: boolean;
  className?: string;
}
```

### Using ODL Theme in TypeScript
```tsx
import { ODLColors, ODLSpacing } from './odl/styles/ODLTheme'

// Use in styles
style={{
  backgroundColor: ODLColors.primary,
  padding: ODLSpacing[4],  // 16px
}}
```

### Using ODL CSS Variables
```css
.component {
  background: var(--odl-primary);
  padding: var(--odl-spacing-4);
  color: var(--odl-white);  /* NOT --odl-text-inverse */
}
```

---

## 🚀 COMPLETE SETUP SCRIPT

Save this as `setup-odl.sh`:
```bash
#!/bin/bash

# Create directories
mkdir -p src/odl/{components,styles}
mkdir -p public/fonts
mkdir -p tests

# Copy components
cp -r ../odl-design-system/content/src/components/* src/odl/components/

# Symlink styles (except ODLTheme.ts)
ln -sf ../../../odl-design-system/content/src/styles src/odl/styles

# Copy ODLTheme.ts (Vite issue with TS symlinks)
cp ../Isovist/src/styles/ODLTheme.ts src/odl/styles/

# Extract fonts if zip exists
if [ -f "../Cabin,Noto_Sans.zip" ]; then
  unzip -j ../Cabin,Noto_Sans.zip '*.ttf' -d public/fonts/
fi

# Install Playwright
npm install -D @playwright/test

echo "✅ ODL Setup Complete!"
echo "📝 Remember to:"
echo "  1. Import fonts.css in main.tsx"
echo "  2. Import ODL styles in App.tsx"
echo "  3. Use --odl-white for button text"
echo "  4. Pass isOpen prop to Modal"
```

---

## 📞 SUPPORT

If you encounter issues not covered here:
1. Run Playwright tests first: `npx playwright test --reporter=list`
2. Check browser console for specific errors
3. Verify symlinks: `ls -la src/odl/styles/`
4. Clear Vite cache: `rm -rf node_modules/.vite`

---

Last Updated: 2025-09-08
Tested with: Vite 7.1.4, React 19.1.1, TypeScript 5.8.3