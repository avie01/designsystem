# ODL Design System - Nexus Integration Guide

## Overview
Nexus uses the ODL Design System with a **dual approach**:
1. **CSS Variables** - For runtime theming and flexibility
2. **TypeScript Constants** - For type safety and IDE support

## File Structure
```
src/odl/
├── styles/                    # Symlinked from ODL
│   ├── design-tokens.css     # All CSS variables
│   ├── ODLTheme.ts           # TypeScript constants
│   ├── globals.css           # Global styles
│   └── accessibility-*.css   # Accessibility overrides
└── components/               # Local component copies
    ├── Button/
    ├── Input/
    ├── Cards/
    └── ...
```

## Usage Examples

### 1. Using CSS Variables (Recommended for Styles)
```css
/* In component CSS files */
.button {
  background-color: var(--odl-primary);
  color: var(--odl-text-inverse);
  padding: var(--odl-spacing-3) var(--odl-spacing-5);
  font-size: var(--odl-font-size-base);
  border-radius: var(--odl-border-radius-sm);
  transition: var(--odl-transition-base);
}

.button:hover {
  background-color: var(--odl-primary-hover);
}
```

### 2. Using TypeScript Constants (Recommended for JS/TSX)
```tsx
import { ODLColors, ODLSpacing, ODLTypography } from './odl/styles/ODLTheme';

// In React components
const Component = () => {
  return (
    <div 
      style={{
        backgroundColor: ODLColors.primary,
        padding: ODLSpacing[4],
        fontSize: ODLTypography.fontSize.base,
      }}
    >
      Content
    </div>
  );
};
```

### 3. Mixing Both Approaches
```tsx
// Use TypeScript for dynamic values
const getStatusColor = (status: string) => {
  switch(status) {
    case 'success': return ODLColors.success;
    case 'error': return ODLColors.error;
    case 'warning': return ODLColors.warning;
    default: return ODLColors.info;
  }
};

// Use CSS variables for static styles
<button 
  className="odl-button"
  style={{ 
    backgroundColor: getStatusColor(status) 
  }}
>
  Click me
</button>
```

## Available Design Tokens

### Colors
| CSS Variable | TypeScript | Value | Usage |
|-------------|------------|-------|-------|
| `--odl-primary` | `ODLColors.primary` | #3560C1 | Primary actions |
| `--odl-primary-hover` | `ODLColors.primaryHover` | #2A4FA3 | Hover states |
| `--odl-success` | `ODLColors.success` | #24A148 | Success states |
| `--odl-error` | `ODLColors.error` | #DA1E28 | Error states |
| `--odl-warning` | `ODLColors.warning` | #FF832B | Warnings |
| `--odl-text-primary` | `ODLColors.text.primary` | #161616 | Main text |
| `--odl-text-secondary` | `ODLColors.text.secondary` | #525252 | Secondary text |

### Spacing (8px Grid System)
| CSS Variable | TypeScript | Value | Usage |
|-------------|------------|-------|-------|
| `--odl-spacing-1` | `ODLSpacing[1]` | 4px | Tight spacing |
| `--odl-spacing-2` | `ODLSpacing[2]` | 8px | Base unit |
| `--odl-spacing-3` | `ODLSpacing[3]` | 12px | Small gaps |
| `--odl-spacing-4` | `ODLSpacing[4]` | 16px | Medium gaps |
| `--odl-spacing-6` | `ODLSpacing[6]` | 24px | Large gaps |
| `--odl-spacing-8` | `ODLSpacing[8]` | 32px | Section spacing |

### Typography
| CSS Variable | TypeScript | Value |
|-------------|------------|-------|
| `--odl-font-family-sans` | `ODLTypography.fontFamily.sans` | 'Noto Sans', ... |
| `--odl-font-size-xs` | `ODLTypography.fontSize.xs` | 11px |
| `--odl-font-size-sm` | `ODLTypography.fontSize.sm` | 12px |
| `--odl-font-size-base` | `ODLTypography.fontSize.base` | 14px |
| `--odl-font-size-md` | `ODLTypography.fontSize.md` | 16px |
| `--odl-font-size-lg` | `ODLTypography.fontSize.lg` | 18px |
| `--odl-font-weight-medium` | `ODLTypography.fontWeight.medium` | 500 |
| `--odl-font-weight-semibold` | `ODLTypography.fontWeight.semibold` | 600 |

### Borders & Shadows
| CSS Variable | Value |
|-------------|-------|
| `--odl-border-width-thin` | 1px |
| `--odl-border-width-base` | 2px |
| `--odl-border-radius-sm` | 2px |
| `--odl-border-radius-base` | 4px |
| `--odl-border-radius-lg` | 8px |
| `--odl-shadow-sm` | 0 1px 2px rgba(0,0,0,0.05) |
| `--odl-shadow-md` | 0 4px 8px rgba(0,0,0,0.06) |

## Best Practices

### ✅ DO:
- Use CSS variables for all styling in CSS files
- Use TypeScript constants for dynamic/computed values
- Maintain the 8px grid system for spacing
- Follow WCAG 2.1 AA compliance (4.5:1 text, 3:1 UI)
- Use semantic color names (success, error, warning)

### ❌ DON'T:
- Hardcode colors or pixel values
- Create duplicate variable definitions
- Mix legacy variables with ODL variables
- Override design tokens without good reason
- Use inline styles for static styling

## Theme Switching

### Dark Mode (Future Enhancement)
```css
/* CSS automatically switches with data-theme attribute */
[data-theme="dark"] {
  /* Variables automatically update */
}
```

```tsx
// TypeScript requires conditional logic
const theme = isDarkMode ? ODLColorsDark : ODLColors;
```

## Live Updates
The styles folder is **symlinked** to the ODL design system. Any changes to:
- `/odl-design-system/content/src/styles/design-tokens.css`
- `/odl-design-system/content/src/styles/ODLTheme.ts`

Will **instantly update** in Nexus without rebuilding!

## Migration Guide

### From Hardcoded Values:
```css
/* Before */
.button {
  background-color: #3560C1;
  padding: 12px 20px;
}

/* After */
.button {
  background-color: var(--odl-primary);
  padding: var(--odl-spacing-3) var(--odl-spacing-5);
}
```

### From Tailwind Classes:
```tsx
/* Before */
<button className="bg-blue-500 px-4 py-2">

/* After - CSS approach */
<button className="odl-button-primary">

/* After - TypeScript approach */
<button style={{ 
  backgroundColor: ODLColors.primary,
  padding: `${ODLSpacing[2]}px ${ODLSpacing[4]}px`
}}>
```

## Component Guidelines

### Creating New Components
1. Use CSS variables for all static styles
2. Import ODLTheme for dynamic values
3. Follow existing component patterns
4. Maintain accessibility standards
5. Document prop types with TypeScript

### Example Component Structure
```tsx
// NewComponent.tsx
import React from 'react';
import { ODLColors, ODLSpacing } from '../../styles/ODLTheme';
import './NewComponent.css';

interface NewComponentProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const NewComponent: React.FC<NewComponentProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
}) => {
  // Use TypeScript for dynamic values
  const dynamicColor = disabled 
    ? ODLColors.text.disabled 
    : ODLColors.text.primary;

  return (
    <div 
      className={`new-component new-component--${variant} new-component--${size}`}
      style={{ color: dynamicColor }}
    >
      {/* Component content */}
    </div>
  );
};
```

```css
/* NewComponent.css */
.new-component {
  /* Use CSS variables for static styles */
  padding: var(--odl-spacing-3);
  border-radius: var(--odl-border-radius-base);
  font-family: var(--odl-font-family-sans);
  transition: var(--odl-transition-base);
}

.new-component--primary {
  background-color: var(--odl-primary);
  color: var(--odl-text-inverse);
}

.new-component--secondary {
  background-color: var(--odl-surface);
  color: var(--odl-text-primary);
  border: var(--odl-border-width-thin) solid var(--odl-border);
}
```

## Troubleshooting

### CSS Variables Not Working
1. Ensure `design-tokens.css` is imported in `App.tsx`
2. Check browser DevTools for variable definitions
3. Verify symlinks are working: `ls -la src/odl/styles/`

### TypeScript Errors
1. Import from correct path: `'./odl/styles/ODLTheme'`
2. Use proper object notation: `ODLColors.primary` not `ODLColors['primary']`
3. Check TypeScript config includes the files

### Live Updates Not Working
1. Verify symlinks: `ls -la src/odl/styles/`
2. Check Vite HMR is enabled
3. Ensure you're editing the source files in `/odl-design-system/`

## Resources
- [ODL Design System Docs](/odl-design-system/README.md)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [8px Grid System](https://spec.fm/specifics/8-pt-grid)

---
Last Updated: 2025-09-08