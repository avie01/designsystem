# ODL Component Library Style Guide

## Form Elements Design Standards

### Universal Properties
All form elements (inputs, dropdowns, buttons, view switchers) follow these standards:

#### Height
- **Standard height**: 44px for all form controls
- Applies to: Input fields, Dropdown selects, Buttons, View mode switchers
- Size variants:
  - Small (sm): 32px
  - Medium (md): 40px (default)
  - Large (lg): 44px

#### Border Styling
- **Border radius**: 0 (flat design, no rounded corners)
- **Border width**: 2px on focus/active states
- **Border color**: 
  - Default: #d1d1d1 (light gray)
  - Focus/Active: #0f62fe (primary blue)
  - Error: #da1e28 (red)

#### Background Colors
- **Default background**: #f5f5f5 (light gray)
- **Hover state**: Slightly darker gray (#e5e5e5)
- **Active/Selected**: #0f62fe (primary blue) with white text
- **Disabled**: #f4f4f4 with #c6c6c6 text

### Input Fields
- Bottom border only in default state (2px)
- Full border (2px) on focus
- Padding: 0.75rem 1rem for large size
- Font size: 0.875rem
- Line height: 1.125rem

### Dropdown Components
- Same styling as input fields
- Dropdown menu specifics:
  - **Border**: 2px solid #0f62fe (blue)
  - **Border radius**: 0 (flat, no rounded corners)
  - **Position**: Connected to bottom border (top: calc(100% - 1px))
  - **No gap**: Menu connects directly to select field
  - **Shadow**: 0 4px 16px rgba(0, 0, 0, 0.12)

#### Dropdown Options
- Default folder icon for all options (using Carbon icon system)
- Light blue background on hover (#f0f4ff)
- Selected state: #e0e9ff background
- Divider lines between options (1px solid #f0f0f0)
- Padding: 0.625rem 1rem per option

### Buttons
- Height: 44px (matching other form elements)
- Border radius: 0 (flat design)
- Primary button: #0f62fe background with white text
- No rounded corners

### View Mode Switcher
- Height: 44px (matching other form elements)
- Border radius: 0
- Bottom border: 2px
- Active state: #0f62fe background with white text
- Inactive state: #f5f5f5 background (matching input fields)

### Layout & Spacing
- Form controls aligned to top (items-start)
- Consistent gap of 0.5rem (gap-2) between elements
- Minimum widths:
  - Status dropdown: 200px
  - Type dropdown: 150px

## Implementation Notes

### CSS Classes
- Use `.custom-input` and `.custom-dropdown` base classes
- Size modifiers: `.input-size--lg`, `.dropdown-size--lg`
- State modifiers: `--error`, `--disabled`, `--open`

### Consistency Rules
1. All interactive form elements must be the same height
2. No border radius on any form elements
3. Consistent color palette across all states
4. Dropdown menus connect seamlessly to their triggers
5. Use Carbon icon system for all icons

## Color Palette

### Primary Colors
- **Blue**: #0f62fe (primary actions, focus states)
- **Gray background**: #f5f5f5 (default input background)
- **Gray border**: #d1d1d1 (default borders)
- **Text**: #161616 (primary text)
- **Gray text**: #6f6f6f (secondary text, icons)

### State Colors
- **Error**: #da1e28
- **Success**: #24a148
- **Warning**: #f1c21b
- **Info**: #0f62fe

### Hover/Selection Colors
- **Light blue hover**: #f0f4ff
- **Light blue selected**: #e0e9ff
- **Blue hover**: #0353e9 (darker blue)

---

*Last updated: 2025-08-06*
*This style guide ensures consistency across all ODL components.*