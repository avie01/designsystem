# Storybook Broken Props - Quick Reference

## 🔴 Critical Issue (Confirmed Broken)

### **AlertBanner**
**File:** `src/components/AlertBanner/AlertBanner.stories.tsx`
**Line ~44:**
```typescript
children: {
  control: 'text',  // ❌ WRONG - shows text input for ReactNode
  description: 'Alert message content',
  table: {
    type: { summary: 'React.ReactNode' }
  }
}
```

**Fix:**
```typescript
children: {
  control: false,  // ✅ CORRECT - disables control
  description: 'Alert message content',
  table: {
    type: { summary: 'React.ReactNode' }
  }
}
```

---

## 📝 Documentation Issues (Need argTypes)

These components are missing argTypes for ReactNode props. Stories work fine, but props aren't documented in Storybook controls:

### Components to Fix

1. **Accordion** - Add argTypes for `content`, `children` with `control: false`
2. **Stepper** - Add argTypes for `content` with `control: false`
3. **DualPaneExplorer** - Add argTypes for `content`, `children` with `control: false`
4. **TreeNavigation** - Add argTypes for `children` with `control: false`
5. **MillerColumns** - Add argTypes for `children` with `control: false`
6. **BreadcrumbGrid** - Add argTypes for `children` with `control: false`
7. **PageTemplate** - Add argTypes for `children` with `control: false`

### Example Fix Pattern

```typescript
const meta: Meta<typeof YourComponent> = {
  title: 'Components/YourComponent',
  component: YourComponent,
  argTypes: {
    children: {
      control: false,
      description: 'Component children',
      table: {
        type: { summary: 'React.ReactNode' }
      }
    }
  }
};
```

---

## ✅ Good Examples to Follow

### **Popover** - Best Practice ⭐
Uses mapping presets for complex ReactNode props:

```typescript
// Define presets
const triggerPresets: Record<string, React.ReactNode> = {
  'Primary Button': <Button variant="primary">Open Popover</Button>,
  'Secondary Button': <Button variant="secondary">Click Me</Button>,
  'Icon Button': <button><Icon name="help" /></button>,
};

const contentPresets: Record<string, React.ReactNode> = {
  'Simple Text': <div><p>Simple content</p></div>,
  'With Title': <div><h3>Title</h3><p>Description</p></div>,
  'Menu List': <div>...</div>,
};

// Configure argTypes
argTypes: {
  trigger: {
    control: 'select',
    options: Object.keys(triggerPresets),
    mapping: triggerPresets,
    description: 'The element that triggers the popover',
  },
  content: {
    control: 'select',
    options: Object.keys(contentPresets),
    mapping: contentPresets,
    description: 'Content to display inside the popover',
  },
}
```

### **Modal** - Simple Approach
Uses `control: false` since stories define content inline:

```typescript
argTypes: {
  children: {
    control: false,
    description: 'Modal content (use render function)',
    table: {
      type: { summary: 'React.ReactNode' }
    }
  }
}
```

---

## Summary

| Status | Count | Components |
|--------|-------|------------|
| 🔴 Confirmed Broken | 1 | AlertBanner |
| 📝 Missing argTypes | 7 | Accordion, Stepper, DualPaneExplorer, TreeNavigation, MillerColumns, BreadcrumbGrid, PageTemplate |
| ✅ Properly Configured | 11 | Popover, Modal, ErrorBoundary, Tabs, SimpleTabs, List, CollapsibleCard, Button, SimpleEditor, Card |

---

## Quick Fix Checklist

- [ ] Fix AlertBanner `children` control (CRITICAL)
- [ ] Add argTypes to Accordion
- [ ] Add argTypes to Stepper
- [ ] Add argTypes to DualPaneExplorer
- [ ] Add argTypes to TreeNavigation
- [ ] Add argTypes to MillerColumns
- [ ] Add argTypes to BreadcrumbGrid
- [ ] Add argTypes to PageTemplate

---

**Last Updated:** 2025-12-12
