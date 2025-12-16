# Tab Component Consistency Rules

## Purpose
This document defines the standardized rules for implementing tabs across the ODL Component Library to ensure visual and functional consistency.

## Core Rules

### 1. Spacing Standards
- **Default Variant**: Use `px-4 py-3 text-sm` for standard tabs
- **Compact Variant**: Use `px-3 py-2 text-xs` for space-constrained areas
- **Container Padding**: Tab containers should have `p-4` padding from parent elements
- **Content Padding**: Tab content areas should have consistent `py-4` padding

### 2. Visual Consistency
- **Border**: All tabs must have `border-b border-gray-200` for the navigation bar
- **Active Indicator**: Blue underline (2px) for active tab using `after:h-0.5 after:bg-blue-600`
- **Text Colors**: 
  - Default: `text-gray-600`
  - Active: `text-blue-600 font-medium`
  - Disabled: `text-gray-400 opacity-60`
- **Hover State**: `hover:bg-gray-100` (following global hover gray-100 rule)

### 3. Layout Rules
- **Gap**: No gap between tab items (`gap-0`)
- **Alignment**: Tabs align to the left by default
- **Width**: Full width container (`w-full`)
- **Overflow**: Use `whitespace-nowrap` to prevent text wrapping

### 4. Implementation Examples

#### Standard Implementation (Default Variant)
```tsx
<div className="bg-white p-4 rounded-lg border">
  <h2 className="text-base font-semibold mb-4">Section Title</h2>
  <Tabs 
    tabs={tabItems}
    variant="default"
  />
</div>
```

#### Compact Implementation
```tsx
<div className="bg-white p-4 rounded-lg border">
  <Tabs 
    tabs={tabItems}
    variant="compact"
  />
</div>
```

### 5. Accessibility Requirements
- All tabs must have proper ARIA attributes
- Keyboard navigation support (Arrow keys, Home, End)
- Focus indicators must be visible
- Tab panels must be properly associated with tab buttons

### 6. When to Use Each Variant
- **Default**: Main content areas, primary navigation within pages
- **Compact**: Sidebars, cards, space-limited containers

### 7. Consistency Checklist
- [ ] Container has proper padding (p-4 or equivalent)
- [ ] Title above tabs has mb-4 spacing
- [ ] Tabs use correct variant for context
- [ ] Active tab has blue indicator
- [ ] Hover states use gray-100
- [ ] Content area has py-4 padding
- [ ] ARIA attributes are present
- [ ] Keyboard navigation works

## Enforcement
These rules should be enforced through:
1. Code reviews
2. Component documentation
3. Storybook examples
4. Design system guidelines

## Version History
- v1.0.0 - Initial rules established
- Last updated: Current session