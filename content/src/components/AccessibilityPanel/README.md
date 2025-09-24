# AccessibilityPanel Component

A comprehensive accessibility panel component that provides users with tools to customize their viewing experience. Built with WCAG 2.2 AA/AAA compliance in mind.

## Features

### 🎨 Theme Controls
- **Default Theme**: Standard application appearance
- **High Contrast Light**: White background with black text for maximum contrast
- **High Contrast Dark**: Black background with white text for maximum contrast

### 📝 Font Customization
- **Font Size**: Small (12px), Medium (14px), Large (18px), Extra Large (24px)
- **Font Family**: Default, OpenDyslexic, Atkinson Hyperlegible

### 🎯 Focus Management
- **Focus Outline Toggle**: Adds thick focus outlines for better keyboard navigation visibility
- **Keyboard Navigation**: Full Tab, Enter, Space, Escape support
- **Focus Trapping**: Prevents focus from leaving the panel when open

### 👁️ Color Vision Support
- **Color Blind Filters**: Normal, Protanopia (Red-Blind), Deuteranopia (Green-Blind), Tritanopia (Blue-Blind)
- **SVG Filters**: Uses proper SVG color matrix filters for accurate simulation

### 💾 Settings Persistence
- **localStorage**: All settings automatically saved and restored
- **Export/Import**: Settings can be exported and imported as JSON files
- **Reset Functionality**: Quick reset to default settings

## Installation

The component is automatically available throughout the application via the `AccessibilityProvider`.

```tsx
// App.tsx
import { AccessibilityProvider } from './context/AccessibilityContext';

function App() {
  return (
    <AccessibilityProvider>
      {/* Your app content */}
    </AccessibilityProvider>
  );
}
```

## Usage

### Basic Implementation

```tsx
import AccessibilityPanel from '../components/AccessibilityPanel';

function MyComponent() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsPanelOpen(true)}>
        Open Accessibility Panel
      </button>
      
      <AccessibilityPanel
        open={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
      />
    </>
  );
}
```

### Using the Context

```tsx
import { useAccessibility } from '../context/AccessibilityContext';

function MyComponent() {
  const { settings, updateSettings } = useAccessibility();
  
  return (
    <div style={{ 
      fontSize: settings.fontSize,
      fontFamily: settings.fontFamily 
    }}>
      Current theme: {settings.theme}
    </div>
  );
}
```

## Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `open` | `boolean` | Controls panel visibility | `false` |
| `onClose` | `() => void` | Callback when panel is closed | - |

## Accessibility Features

### WCAG 2.2 AA/AAA Compliance
- ✅ **Color Contrast**: All color combinations meet AA/AAA standards
- ✅ **Keyboard Navigation**: Full keyboard accessibility
- ✅ **Screen Reader Support**: Proper ARIA labels and roles
- ✅ **Focus Management**: Clear focus indicators and logical tab order
- ✅ **Semantic HTML**: Proper heading hierarchy and landmarks

### ARIA Implementation
- `role="dialog"` for the panel
- `aria-labelledby` for panel title
- `aria-modal="true"` for modal behavior
- `aria-pressed` for toggle buttons
- `aria-label` for all interactive elements

### Keyboard Support
- **Tab**: Navigate between controls
- **Enter/Space**: Activate buttons and toggles
- **Escape**: Close the panel
- **Arrow Keys**: Navigate within select dropdowns

## File Structure

```
AccessibilityPanel/
├── AccessibilityPanel.tsx      # Main component
├── ThemeToggle.tsx             # Theme selection component
├── FontSelector.tsx            # Font size and family controls
├── FocusOutlineToggle.tsx      # Focus outline toggle
├── ColorBlindFilter.tsx        # Color vision filter controls
├── AccessibilityPanel.module.css # Component styles
├── index.ts                    # Exports
└── README.md                   # This file
```

## Context API

### AccessibilitySettings Interface

```tsx
interface AccessibilitySettings {
  theme: 'default' | 'high-contrast-light' | 'high-contrast-dark';
  fontSize: 'small' | 'medium' | 'large' | 'xlarge';
  fontFamily: 'default' | 'OpenDyslexic' | 'Atkinson Hyperlegible';
  focusOutline: boolean;
  colorBlindFilter: 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia';
}
```

### Context Methods

- `settings`: Current accessibility settings
- `updateSettings(partial)`: Update specific settings
- `resetToDefault()`: Reset all settings to default
- `exportSettings()`: Export settings as JSON file
- `importSettings(settings)`: Import settings from JSON

## Styling

The component uses CSS Modules with comprehensive theming support:

- **Theme-aware styling**: Automatically adapts to selected theme
- **High contrast support**: Enhanced borders and focus indicators
- **Responsive design**: Mobile-friendly layout
- **Reduced motion**: Respects `prefers-reduced-motion`
- **Dark mode**: Supports system dark mode preference

## Browser Support

- ✅ Chrome/Chromium 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Dependencies

- React 18+
- Material-UI 5+
- TypeScript 4.5+

## Contributing

When contributing to this component:

1. Ensure all changes maintain WCAG 2.2 AA/AAA compliance
2. Test with screen readers (NVDA, JAWS, VoiceOver)
3. Verify keyboard navigation works correctly
4. Test with color blind simulation tools
5. Update tests and documentation

## License

This component is part of the ODL Design System and follows the same licensing terms. 