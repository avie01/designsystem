# StatsCard & StatsGrid Components

## StatsCard
A card component for displaying statistics with an icon, value, and label.

### Usage Example
```tsx
import StatsCard from '../components/StatsCard/StatsCard';
import StatsGrid from '../components/StatsGrid/StatsGrid';

// Single card
<StatsCard
  value={29}
  label="Total Amendments"
  iconName="list"
  iconColor="#0284c7"
  iconBackground="#e0f2fe"
/>

// Multiple cards in a grid
<StatsGrid>
  <StatsCard
    value={statistics.total}
    label="Total Amendments"
    iconName="list"
    iconColor="#0284c7"
    iconBackground="#e0f2fe"
  />
  <StatsCard
    value={statistics.drafts}
    label="Drafts"
    iconName="edit"
    iconColor="#d97706"
    iconBackground="#fef3c7"
  />
  <StatsCard
    value={statistics.stateInterests}
    label="State Interests"
    iconName="info"
    iconColor="#2563eb"
    iconBackground="#dbeafe"
  />
  <StatsCard
    value={statistics.approved}
    label="Approved"
    iconName="checkmark-filled"
    iconColor="#16a34a"
    iconBackground="#dcfce7"
  />
</StatsGrid>
```

### Props

#### StatsCard
- `value` (number | string): The main value to display
- `label` (string): Description of the value
- `iconName` (string): Icon name from Carbon icon set
- `iconColor` (string): Color of the icon
- `iconBackground` (string): Background color of icon container
- `style` (CSSProperties): Optional custom styles
- `className` (string): Optional CSS class

#### StatsGrid
- `children` (ReactNode): StatsCard components
- `columns` (number): Fixed number of columns (optional)
- `minColumnWidth` (string): Minimum width for auto-fit columns (default: '200px')
- `gap` (string): Gap between cards
- `style` (CSSProperties): Optional custom styles
- `className` (string): Optional CSS class

## Color Palette for Common Stats

- **Total/Count**: Icon: `#0284c7`, Background: `#e0f2fe`
- **Draft/Edit**: Icon: `#d97706`, Background: `#fef3c7`
- **Info/Status**: Icon: `#2563eb`, Background: `#dbeafe`
- **Success/Approved**: Icon: `#16a34a`, Background: `#dcfce7`
- **Error/Rejected**: Icon: `#dc2626`, Background: `#fee2e2`
- **Warning/Pending**: Icon: `#ea580c`, Background: `#fed7aa`