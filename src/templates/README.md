# Page Templates

Simple wireframe templates with content borders and placeholder content. These templates provide the basic page structure - you just need to replace the placeholder content with your components.

## Available Templates

### 1. BasicPageTemplate
- Simple page with content border
- Just the wrapper, ready for any content

### 2. DashboardTemplate
- Status cards row at top (4 cards)
- Main content area below
- Good for overview/summary pages

### 3. TableListTemplate
- Action/filter bar at top
- Table area below
- Good for list views, data tables

### 4. TwoColumnTemplate
- Main content area on left
- Sidebar widgets on right (350px)
- Good for detailed views with supplementary info

### 5. FormPageTemplate
- Multiple form sections
- Action buttons at bottom
- Good for data entry, settings pages

### 6. CardsGridTemplate
- Responsive grid of cards
- Good for galleries, item selections

## How to Use

1. Import the template you need:
```tsx
import { DashboardTemplate } from '../templates/PageTemplates';
```

2. Copy the template code into your component

3. Replace placeholder content with your actual components

4. Keep the content wrapper structure (grey outer frame, white inner)

## Content Border Structure

All templates use this pattern:
```tsx
<div style={{ 
  background: '#EDF1F5',      // Grey outer frame
  borderRadius: '16px',
  padding: '24px',
  minHeight: '100vh'
}}>
  <div style={{ 
    background: 'white',       // White inner content
    borderRadius: '8px',
    padding: '24px'
  }}>
    {/* Your content here */}
  </div>
</div>
```

Sub-sections use light grey (#f8f9fa) with borders for visual hierarchy.