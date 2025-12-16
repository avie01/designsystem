# ODL Design System Style Guide

## 🎨 IMPORTANT: Always Use ODL Design System

**NEVER hardcode colors, spacing, or styles directly in components!**

Always import and use the ODL theme constants to ensure consistency across all components.

## Quick Start

```tsx
import ODLTheme from '../styles/ODLTheme';

// Use theme constants
const styles = {
  color: ODLTheme.colors.primary,
  padding: ODLTheme.spacing[4],
  fontSize: ODLTheme.typography.fontSize.base,
  borderRadius: ODLTheme.borders.radius.md,
};
```

## Core Principles

### 1. Colors
```tsx
// ❌ WRONG - Never hardcode colors
<div style={{ color: '#3560C1' }}>

// ✅ CORRECT - Use theme colors
<div style={{ color: ODLTheme.colors.primary }}>
```

### 2. Spacing
```tsx
// ❌ WRONG - Never hardcode spacing
<div style={{ padding: '16px' }}>

// ✅ CORRECT - Use theme spacing
<div style={{ padding: ODLTheme.spacing[4] }}>
```

### 3. Typography
```tsx
// ❌ WRONG - Never hardcode font sizes
<div style={{ fontSize: '14px' }}>

// ✅ CORRECT - Use theme typography
<div style={{ fontSize: ODLTheme.typography.fontSize.base }}>
```

## Component Examples

### Button Example
```tsx
import ODLTheme from '../styles/ODLTheme';

const MyButton = () => (
  <button style={{
    ...ODLTheme.components.button.base,
    ...ODLTheme.components.button.variants.primary,
    ...ODLTheme.components.button.sizes.medium,
  }}>
    Click Me
  </button>
);
```

### Card Example
```tsx
import ODLTheme from '../styles/ODLTheme';

const MyCard = ({ selected, hover }) => (
  <div style={{
    ...ODLTheme.components.card.base,
    ...(hover && ODLTheme.components.card.hover),
    ...(selected && ODLTheme.components.card.selected),
  }}>
    Card Content
  </div>
);
```

### Status Indicators
```tsx
import ODLTheme from '../styles/ODLTheme';

const StatusBadge = ({ status }) => (
  <span style={{
    color: ODLTheme.getStatusColor(status),
    backgroundColor: ODLTheme.getStatusBackground(status),
    ...ODLTheme.components.badge.base,
  }}>
    {status}
  </span>
);
```

## Color Palette

### Primary Colors
- **Primary Blue**: `ODLTheme.colors.primary` (#3560C1)
- **Primary Hover**: `ODLTheme.colors.primaryHover` (#2A4FA3)
- **Primary Light**: `ODLTheme.colors.primaryLight` (#E0F3FE)

### Status Colors
- **Success**: `ODLTheme.colors.success` (#24A148)
- **Error**: `ODLTheme.colors.error` (#DA1E28)
- **Warning**: `ODLTheme.colors.warning` (#F1C21B)
- **Info**: `ODLTheme.colors.info` (#0F62FE)

### Text Colors
- **Primary Text**: `ODLTheme.colors.text.primary` (#161616)
- **Secondary Text**: `ODLTheme.colors.text.secondary` (#525252)
- **Tertiary Text**: `ODLTheme.colors.text.tertiary` (#8D8D8D)

### Chart Colors
Modern, vibrant colors optimized for data visualization:
- **Blue**: `ODLTheme.colors.charts.blue` (#3B82F6)
- **Emerald**: `ODLTheme.colors.charts.emerald` (#10B981)
- **Violet**: `ODLTheme.colors.charts.violet` (#8B5CF6)
- **Rose**: `ODLTheme.colors.charts.rose` (#F43F5E)
- **Amber**: `ODLTheme.colors.charts.amber` (#F59E0B)
- **Cyan**: `ODLTheme.colors.charts.cyan` (#06B6D4)
- **Indigo**: `ODLTheme.colors.charts.indigo` (#6366F1)
- **Lime**: `ODLTheme.colors.charts.lime` (#84CC16)
- **Orange**: `ODLTheme.colors.charts.orange` (#EA580C)

```tsx
// Using chart colors in Graph component
import { chartColors } from '../components/Graph/Graph';

<Graph
  colors={[chartColors.blue, chartColors.emerald, chartColors.violet]}
/>
```

## Spacing Scale

Use consistent spacing from the theme:
- `spacing[1]`: 4px
- `spacing[2]`: 8px
- `spacing[3]`: 12px
- `spacing[4]`: 16px
- `spacing[5]`: 20px
- `spacing[6]`: 24px
- `spacing[8]`: 32px

## Border Radius

Use consistent border radius:
- `borders.radius.sm`: 2px
- `borders.radius.base`: 4px
- `borders.radius.md`: 8px
- `borders.radius.lg`: 12px
- `borders.radius.xl`: 16px

## Shadows

Use consistent shadows:
- `shadows.sm`: Subtle shadow
- `shadows.base`: Default shadow
- `shadows.md`: Medium shadow
- `shadows.lg`: Large shadow
- `shadows.focus`: Focus ring shadow

## Z-Index Layers

Use consistent z-index values:
- `zIndex.dropdown`: 1000
- `zIndex.modal`: 1300
- `zIndex.popover`: 1400
- `zIndex.tooltip`: 1500
- `zIndex.notification`: 2000

## Transitions

Use consistent transitions:
- `transitions.fast`: 0.15s
- `transitions.base`: 0.2s
- `transitions.slow`: 0.3s

## Utility Functions

### Apply Multiple Styles
```tsx
const styles = ODLTheme.applyStyles(
  ODLTheme.components.card.base,
  isHovered && ODLTheme.components.card.hover,
  isSelected && ODLTheme.components.card.selected
);
```

### Get Status Colors
```tsx
const color = ODLTheme.getStatusColor('success');
const background = ODLTheme.getStatusBackground('success');
```

## Checklist for New Components

When creating new components, ensure you:

- [ ] Import `ODLTheme` from `'../styles/ODLTheme'`
- [ ] Use theme colors instead of hardcoded hex values
- [ ] Use theme spacing instead of hardcoded pixel values
- [ ] Use theme typography for font sizes and weights
- [ ] Use theme borders for radius and widths
- [ ] Use theme shadows for elevation
- [ ] Use theme transitions for animations
- [ ] Use theme z-index for layering
- [ ] Test with different theme variations

## Migration Guide

To migrate existing components:

1. **Find hardcoded values**:
   - Search for hex colors (#...)
   - Search for pixel values (px)
   - Search for font sizes

2. **Replace with theme values**:
   ```tsx
   // Before
   color: '#3560C1'
   padding: '16px'
   fontSize: '14px'
   
   // After
   color: ODLTheme.colors.primary
   padding: ODLTheme.spacing[4]
   fontSize: ODLTheme.typography.fontSize.base
   ```

3. **Test the component** to ensure it looks correct

## Component-Specific Patterns

### Graph Components

#### Responsive Sizing
Graph components automatically adjust based on container height:
```tsx
// Compact mode (< 150px height)
<Graph height={60} ... />  // Hides axes, minimal margins

// Standard mode (>= 150px height)
<Graph height={200} ... />  // Full axes, legends, labels
```

#### Chart Type Selection
Choose appropriate chart types for your data:
- **Line/Area**: Trends over time
- **Bar**: Comparisons between categories
- **Pie**: Part-to-whole relationships
- **Radar**: Multi-dimensional comparisons
- **Scatter**: Correlations
- **Radial**: KPI progress indicators

#### Color Schemes
```tsx
// Use default chart colors
import { defaultChartColors } from '../components/Graph/Graph';

// Or specify custom colors from theme
<Graph colors={[
  ODLTheme.colors.charts.blue,
  ODLTheme.colors.charts.emerald
]} />
```

#### Sparkline Replacement Pattern
Replace old SVG sparklines with Graph components:
```tsx
// Old sparkline pattern
<Sparkline data={[1,2,3,4,5]} color="#3B82F6" />

// New Graph pattern
<Graph
  type="area"
  data={[
    {month: 'Jan', value: 1},
    {month: 'Feb', value: 2}
  ]}
  dataKeys={['value']}
  xAxisKey="month"
  height={60}
  showLegend={false}
  showGrid={false}
  gradient={true}
/>
```

### Alert Banners with Actions

When creating alert banners with action elements, follow these established patterns:

#### Action Hierarchy
```tsx
// ✅ CORRECT - Use chips for alert actions
<AlertBanner variant="warning" title="Unsaved Changes" actions={
  <>
    <Chip 
      label="Discard" 
      variant="grey" 
      clickable 
      style={{ backgroundColor: 'transparent', color: '#525252' }}
    />
    <Chip label="Save Changes" variant="yellow" clickable />
  </>
}>
```

#### Color Mapping for Alert Actions
- **Warning alerts**: Yellow primary action, transparent secondary
- **Error alerts**: Burgundy primary action, transparent secondary  
- **Info alerts**: Primary blue (#3560C1) primary action, transparent secondary
- **Success alerts**: Dark green primary action, transparent secondary

#### Visual Hierarchy Rules
1. **Primary actions**: Use colored chip backgrounds that complement the alert variant
2. **Secondary actions**: Use transparent backgrounds with dark gray text (#525252)
3. **Icons**: Include relevant Carbon icons when appropriate (e.g., "renew" for retry actions)

```tsx
// Example for each alert type
<AlertBanner variant="warning">
  <Chip label="Secondary" style={{ backgroundColor: 'transparent' }} />
  <Chip label="Primary" variant="yellow" />
</AlertBanner>

<AlertBanner variant="error">
  <Chip label="Secondary" style={{ backgroundColor: 'transparent' }} />
  <Chip label="Primary" variant="burgundy" />
</AlertBanner>

<AlertBanner variant="info">
  <Chip label="Secondary" style={{ backgroundColor: 'transparent' }} />
  <Chip label="Primary" style={{ backgroundColor: ODLTheme.colors.primary, color: 'white' }} />
</AlertBanner>

<AlertBanner variant="success">
  <Chip label="Secondary" style={{ backgroundColor: 'transparent' }} />
  <Chip label="Primary" variant="darkGreen" />
</AlertBanner>
```

#### Auto-dismiss Patterns
- Include countdown timers in alert messages for auto-dismiss functionality
- Use proper cleanup for intervals to prevent memory leaks
- Format: "Action will complete in **X** second(s)"

## Remember

**The ODL Design System ensures:**
- ✅ Consistency across all components
- ✅ Easy theme changes and updates
- ✅ Accessibility compliance
- ✅ Professional appearance
- ✅ Maintainable code

**Always use `ODLTheme` for all styling decisions!**