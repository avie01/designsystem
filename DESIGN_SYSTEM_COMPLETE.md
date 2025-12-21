# Design System Documentation

This document contains the complete design system specifications including typography, colors, and component guidelines.

## Typography System

All text uses **Noto Sans** font family exclusively with specific weights and sizes.

### Font Family
```css
font-family: "Noto Sans", sans-serif;
```

### Typography Scale

#### Headings

| Element | Font Size | Line Height | Font Weight | Usage |
|---------|-----------|-------------|-------------|--------|
| **H1** | 20px | 1.5em | 600 (Semi-Bold) | Main page titles |
| **H2** | 18px | 1.5em | 600 (Semi-Bold) | Section headings |
| **H3** | 16px | 1.5em | 600 (Semi-Bold) | Subsection headings |
| **H4** | 14px | 1.5em | 700 (Bold) | Component titles |
| **H5** | 14px | 1.5em | 600 (Semi-Bold) | Minor headings |
| **H6** | 12px | 1.5em | 700 (Bold) | Small labels |

#### Body Text

| Type | Font Size | Line Height | Font Weight | Usage |
|------|-----------|-------------|-------------|--------|
| **Subtitle1** | 18px | 1.5em | 400 (Regular) | Large descriptive text |
| **Body1** | 16px | 1.5em | 400 (Regular) | Default body text |
| **Body2** | 14px | 1.5em | 400 (Regular) | Secondary content |

#### Button Text

| Type | Font Size | Line Height | Font Weight | Usage |
|------|-----------|-------------|-------------|--------|
| **Button Large** | 16px | 1.5em | 500 (Medium) | Large buttons |
| **Button Small** | 14px | 1.5em | 500 (Medium) | Medium/small buttons |

### Text Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| **Primary** | `#32373F` | Main text, headings |
| **Secondary** | `#525965` | Secondary text |
| **Muted** | `#707070` | Disabled text, captions |
| **Disabled** | `#ACACAC` | Disabled state text |

---

## Spacing System

### Padding & Margins

| Name | Value (px) | CSS Variable | Usage |
|------|------------|--------------|-------|
| **Zero** | 0px | `--spacing-0` | No spacing |
| **XS** | 4px | `--spacing-xs` | Minimal spacing, icon gaps |
| **S** | 8px | `--spacing-s` | Tight spacing, inline elements |
| **M** | 12px | `--spacing-m` | Default component padding |
| **L** | 16px | `--spacing-l` | Standard content spacing |
| **XL** | 24px | `--spacing-xl` | Section spacing |
| **XXL** | 32px | `--spacing-xxl` | Large section gaps |
| **XXXL** | 48px | `--spacing-xxxl` | Page-level spacing |

### CSS Variables

```css
/* Spacing */
--spacing-0: 0px;
--spacing-xs: 4px;
--spacing-s: 8px;
--spacing-m: 12px;
--spacing-l: 16px;
--spacing-xl: 24px;
--spacing-xxl: 32px;
--spacing-xxxl: 48px;
```

---

## Color Palette

All colors support light, dark, and high contrast modes.

### Primary Colors

| Color Name | Light Mode | Dark Mode | High Contrast |
|------------|------------|-----------|---------------|
| **Primary Night** | `#32373F` | `#FFFFFF` | `#000000` |
| **Primary Twilight** | `#525965` | `#E1E7F2` | `#000000` |

### Grey Scale

| Color Name | Light Mode | Dark Mode | High Contrast |
|------------|------------|-----------|---------------|
| **Grey 700** | `#707070` | `#96A5BD` | `#000000` |
| **Grey 600** | `#ACACAC` | `#6C7789` | `#ACACAC` |
| **Grey 500** | `#D1D1D1` | `#8A9AB3` | `#000000` |
| **Grey 400** | `#E8E8E8` | `#38393B` | `#E8E8E8` |
| **Grey 300** | `#F5F5F5` | `#3C3D3F` | `#F5F5F5` |
| **Grey 200** | `#F7F7F7` | `#6F7073` | `#F7F7F7` |
| **Grey 100** | `#F8F8F8` | `#88898C` | `#F8F8F8` |
| **Grey 50** | `#FAFAFA` | `#CCCDCE` | `#FAFAFA` |

### Base Colors

| Color Name | Light Mode | Dark Mode | High Contrast |
|------------|------------|-----------|---------------|
| **Paper** | `#FFFFFF` | `#28292B` | `#FFFFFF` |
| **Default** | `#EDF1F5` | `#1D1D1D` | `#EDF1F5` |

### State Colors

#### Success
| Color Name | Light Mode | Dark Mode | High Contrast |
|------------|------------|-----------|---------------|
| **Success Light** | `#DFF8DF` | `#1B4A25` | `#DFF8DF` |
| **Success Main** | `#2A7D2A` | `#40D6BD` | `#2A7D2A` |

#### Warning
| Color Name | Light Mode | Dark Mode | High Contrast |
|------------|------------|-----------|---------------|
| **Warning Light** | `#FDEED3` | `#4A481B` | `#FDEED3` |
| **Warning Main** | `#F3AD2E` | `#F3BE5F` | `#F3AD2E` |

#### Error
| Color Name | Light Mode | Dark Mode | High Contrast |
|------------|------------|-----------|---------------|
| **Error Light** | `#F7E4E6` | `#4A1B18` | `#F7E4E6` |
| **Error Main** | `#D0000A` | `#FC98A5` | `#D0000A` |

#### Info
| Color Name | Light Mode | Dark Mode | High Contrast |
|------------|------------|-----------|---------------|
| **Info** | `#E0F3FF` | `#1B2E4A` | `#E0F3FF` |

### Primary Variants

| Color Name | Light Mode | Dark Mode | High Contrast |
|------------|------------|-----------|---------------|
| **Primary Main** | `#3560C1` | `#A7C2FD` | `#000000` |
| **Primary Light** | `#0037B1` | `#D3E1FE` | `#0037B1` |
| **Primary Dark** | `#00277F` | `#7C9FFC` | `#00277F` |

### Secondary Variants

| Color Name | Light Mode | Dark Mode | High Contrast |
|------------|------------|-----------|---------------|
| **Secondary Light** | `#DAE8FF` | `#464F62` | `#DAE8FF` |
| **Secondary Main** | `#CCDBFE` | `#62697A` | `#CCDBFE` |
| **Secondary Dark** | `#B2CAFE` | `#7C9FFC` | `#B2CAFE` |

### Chip Colors

| Color Name | Light Mode | Dark Mode | High Contrast |
|------------|------------|-----------|---------------|
| **Chip Blue** | `#E5F5FE` | `#082A78` | `#E5F5FE` |
| **Chip Pink** | `#F7E2F9` | `#9C27B0` | `#F7E2F9` |
| **Chip Red** | `#F8E8EA` | `#C2185B` | `#F8E8EA` |
| **Chip Orange** | `#FCEEDA` | `#C93713` | `#FCEEDA` |
| **Chip Yellow** | `#FFFBCE` | `#A15202` | `#FFFBCE` |
| **Chip Olive** | `#DAE3BF` | `#54622C` | `#DAE3BF` |
| **Chip Mint** | `#D0FAF7` | `#1F787A` | `#D0FAF7` |
| **Chip Brown** | `#E1D5C7` | `#4F3E34` | `#E1D5C7` |
| **Chip Purple** | `#D6C8F6` | `#381A93` | `#D6C8F6` |
| **Chip Green** | `#E4F7E4` | `#31622C` | `#E4F7E4` |

### Folder Colors (Static)

| Color Name | Hex Code |
|------------|----------|
| **Folder Yellow** | `#FF9B00` |
| **Folder Red** | `#E91E63` |
| **Folder Burgundy** | `#C2185B` |
| **Folder Purple** | `#9C27B0` |
| **Folder Lavender** | `#6A31D4` |
| **Folder Deep Blue** | `#5255F3` |
| **Folder Ocean** | `#2769B0` |
| **Folder Sky** | `#57ACDC` |
| **Folder Teal** | `#57DCBE` |
| **Folder Green** | `#60C689` |
| **Folder Grey** | `#CFD8DC` |

### Brand Colors (Static)

| Color Name | Hex Code |
|------------|----------|
| **Brand Office** | `#D83B00` |
| **Brand Perform** | `#BD2841` |
| **Brand Teams** | `#5558AF` |
| **Brand Build** | `#5DA10C` |
| **Brand Content Solutions** | `#0B77D8` |
| **Brand Regtech** | `#00928F` |

### Chart Colors - Nivo Rocks (Static)

| Color Name | Hex Code |
|------------|----------|
| **Light Green** | `#B3DE8E` |
| **Crimson** | `#E11F27` |
| **Thistle** | `#CAB3D5` |
| **Sienna** | `#B0592F` |
| **Steel Blue** | `#2679B2` |
| **Light Coral** | `#F99B9B` |
| **Dark Orange** | `#FD7F23` |
| **Goldenrod** | `#F1E15B` |
| **Light Blue** | `#A8CEE2` |
| **Forest Green** | `#399F34` |
| **Sandy Brown** | `#FCBE75` |
| **Dark Slate Blue** | `#6A4198` |

---

## Component Guidelines

### Button Components

#### Primary Button

**Large Size:**
- Height: 44px
- Padding: 10px 14px
- Font Size: 16px (Button Large)
- Background: #3560C1
- Border Radius: 2px
- Gap: 6px

**Medium Size:**
- Height: 32px
- Padding: 6px 12px
- Font Size: 14px (Button Small)
- Background: #3560C1
- Border Radius: 2px
- Gap: 6px

**States:**
- Default: #3560C1
- Hover: #0037B1
- Active: #00277F
- Disabled: #ACACAC

#### Secondary Button

**Large Size:**
- Height: 44px
- Padding: 10px 14px
- Font Size: 16px (Button Large)
- Background: #FFFFFF
- Border: 1px solid #D1D1D1
- Border Radius: 2px
- Gap: 6px

**Medium Size:**
- Height: 32px
- Padding: 6px 12px
- Font Size: 14px (Button Small)
- Background: #FFFFFF
- Border: 1px solid #D1D1D1
- Border Radius: 2px
- Gap: 6px

**States:**
- Default: Background #FFFFFF, Border #D1D1D1
- Hover: Background #F5F5F5, Border #707070
- Active: Background #E8E8E8, Border #525965
- Disabled: Background #F5F5F5, Border #ACACAC, Text #ACACAC

#### Tertiary Button

**Large Size:**
- Height: 44px
- Padding: 10px 14px
- Font Size: 16px (Button Large)
- Background: #DAE8FF
- Border Radius: 2px
- Gap: 6px

**Medium Size:**
- Height: 32px
- Padding: 6px 12px
- Font Size: 14px (Button Small)
- Background: #DAE8FF
- Border Radius: 2px
- Gap: 6px

**States:**
- Default: #DAE8FF
- Hover: #CCDBFE
- Active: #B2CAFE
- Disabled: #F5F5F5, Text #ACACAC

#### Destructive Button

**Large Size:**
- Height: 44px
- Padding: 10px 14px
- Font Size: 16px (Button Large)
- Background: #FFFFFF
- Text Color: #D0000A
- Border: 1px solid #D0000A
- Border Radius: 2px
- Gap: 6px

**Medium Size:**
- Height: 32px
- Padding: 6px 12px
- Font Size: 14px (Button Small)
- Background: #FFFFFF
- Text Color: #D0000A
- Border: 1px solid #D0000A
- Border Radius: 2px
- Gap: 6px

**States:**
- Default: Background #FFFFFF, Text #D0000A, Border #D0000A
- Hover: Background #F7E4E6, Text #D0000A, Border #D0000A
- Active: Background #D0000A, Text #FFFFFF, Border #D0000A
- Disabled: Background #F5F5F5, Text #ACACAC, Border #ACACAC

---

## Implementation

### CSS Variables Usage

```css
/* Typography */
--font-family: "Noto Sans", sans-serif;
--text-primary: #32373f;
--text-secondary: #525965;
--text-muted: #707070;
--text-disabled: #ACACAC;

/* Spacing */
--spacing-0: 0px;
--spacing-xs: 4px;
--spacing-s: 8px;
--spacing-m: 12px;
--spacing-l: 16px;
--spacing-xl: 24px;
--spacing-xxl: 32px;
--spacing-xxxl: 48px;

/* Primary Colors */
--primary-main: #3560C1;
--primary-light: #0037B1;
--primary-dark: #00277F;

/* Secondary Colors */
--secondary-light: #DAE8FF;
--secondary-main: #CCDBFE;
--secondary-dark: #B2CAFE;

/* Error Colors */
--error-light: #F7E4E6;
--error-main: #D0000A;

/* Base Colors */
--paper: #FFFFFF;
--grey-700: #707070;
--grey-600: #ACACAC;
--grey-500: #D1D1D1;
--grey-400: #E8E8E8;
--grey-300: #F5F5F5;
```

### Component Usage

```jsx
// Primary Button
<PrimaryButton size="large" icon={<Add />}>
  Add Item
</PrimaryButton>

// Secondary Button
<SecondaryButton size="medium" disabled>
  Cancel
</SecondaryButton>

// Tertiary Button
<TertiaryButton size="large">
  Learn More
</TertiaryButton>

// Destructive Button
<DestructiveButton size="medium">
  Delete
</DestructiveButton>
```

### Typography Classes

```css
.h1 { font-size: 20px; line-height: 1.5em; font-weight: 600; }
.h2 { font-size: 18px; line-height: 1.5em; font-weight: 600; }
.h3 { font-size: 16px; line-height: 1.5em; font-weight: 600; }
.h4 { font-size: 14px; line-height: 1.5em; font-weight: 700; }
.h5 { font-size: 14px; line-height: 1.5em; font-weight: 600; }
.h6 { font-size: 12px; line-height: 1.5em; font-weight: 700; }

.subtitle1 { font-size: 18px; line-height: 1.5em; font-weight: 400; }
.body1 { font-size: 16px; line-height: 1.5em; font-weight: 400; }
.body2 { font-size: 14px; line-height: 1.5em; font-weight: 400; }

.button-large { font-size: 16px; line-height: 1.5em; font-weight: 500; }
.button-small { font-size: 14px; line-height: 1.5em; font-weight: 500; }
```

### Spacing Classes

```css
/* Padding */
.p-0 { padding: 0px; }
.p-xs { padding: 4px; }
.p-s { padding: 8px; }
.p-m { padding: 12px; }
.p-l { padding: 16px; }
.p-xl { padding: 24px; }
.p-xxl { padding: 32px; }
.p-xxxl { padding: 48px; }

/* Margin */
.m-0 { margin: 0px; }
.m-xs { margin: 4px; }
.m-s { margin: 8px; }
.m-m { margin: 12px; }
.m-l { margin: 16px; }
.m-xl { margin: 24px; }
.m-xxl { margin: 32px; }
.m-xxxl { margin: 48px; }

/* Gap (for flexbox/grid) */
.gap-0 { gap: 0px; }
.gap-xs { gap: 4px; }
.gap-s { gap: 8px; }
.gap-m { gap: 12px; }
.gap-l { gap: 16px; }
.gap-xl { gap: 24px; }
.gap-xxl { gap: 32px; }
.gap-xxxl { gap: 48px; }
```

---

## Design Constraints

### Strict Requirements

1. **Typography**: Only use Noto Sans font family
2. **Colors**: Only use colors from the approved theme palette
3. **Icons**: Only use IBM Carbon icons
4. **Spacing**: Only use values from the spacing scale (0, 4, 8, 12, 16, 24, 32, 48)
5. **Consistency**: Follow the exact specifications for spacing, sizing, and weights

### Accessibility

- All color combinations meet WCAG contrast standards
- Font sizes are accessible and readable
- Interactive elements have clear hover and focus states
- Support for high contrast mode included
