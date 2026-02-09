# ODL Dark Theme Colors

Dark mode is activated by setting `data-theme="dark"` on a parent element.

## Base Colors

| Token | Value | Description |
|-------|-------|-------------|
| `--odl-white` | `#161616` | Base dark |
| `--odl-background` | `#161616` | Page background |
| `--odl-wave` | `#262626` | Content wrapper background |
| `--odl-surface` | `#262626` | Surface background |
| `--odl-surface-hover` | `#393939` | Surface hover state |
| `--odl-border` | `#525252` | Border color |
| `--odl-primary` | `#78A9FF` | Primary blue (lighter for dark bg) |
| `--odl-primary-hover` | `#A6C8FF` | Primary hover |
| `--odl-primary-light` | `#002D5C` | Primary light background |

## Text Colors

| Token | Value | Description |
|-------|-------|-------------|
| `--odl-text-primary` | `#F4F4F4` | Primary text |
| `--odl-text-secondary` | `#C6C6C6` | Secondary text |
| `--odl-text-tertiary` | `#8D8D8D` | Tertiary text |
| `--odl-text-disabled` | `#525252` | Disabled text |

## Status Colors

| Token | Value | Description |
|-------|-------|-------------|
| `--odl-error` | `#FF8389` | Error (pink-red) |
| `--odl-warning` | `#FFB784` | Warning (light orange) |
| `--odl-success` | `#42BE65` | Success (green) |
| `--odl-info` | `#78A9FF` | Info (light blue) |

## Status Light Backgrounds

| Token | Value | Description |
|-------|-------|-------------|
| `--odl-success-light` | `#044317` | Success background |
| `--odl-warning-light` | `#5E3B00` | Warning background |
| `--odl-info-light` | `#002D5C` | Info background |
| `--odl-error-light` | `#520408` | Error background |

## Usage

```css
/* Apply dark theme to entire app */
html[data-theme="dark"] {
  /* Colors automatically switch */
}

/* Or apply to a specific container */
.dark-container[data-theme="dark"] {
  /* Dark theme applies within */
}
```

```tsx
/* Toggle dark mode in React */
document.documentElement.setAttribute('data-theme', 'dark');
```

## Source

These colors are defined in `src/styles/design-tokens.css` under the `[data-theme="dark"]` selector.
