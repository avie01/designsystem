# SVG to Header Component Conversion Process

## Build.svg Analysis (Template for All Headers)

### SVG Structure Breakdown:
```
- Width: 1440px, Height: 73px
- Brand strip: 5px green (#5DA10C) at top
- Main area: 68px white background below
```

### Key Element Positions (from Build.svg):

1. **Brand Strip**: `y=0, height=5px, fill="#5DA10C"`
2. **Logo Area**: `x=12-202 (~190px wide)` - ODL Build logo
3. **Add Button**: `x=999-1011` (Plus icon) - `path d="M1005.75 38.25V33H1004.25V38.25H999V39.75H1004.25V45H1005.75V39.75H1011V38.25H1005.75Z"`
4. **Search Area**: `x=1029-1131` (New application text)
5. **Help/Question Icon**: `x=1156-1176` (Circle with question mark)
6. **Notification Bell**: `x=1211-1230` (Bell icon)
7. **User Avatar**: `x=1262-1294` (32px circle, green #54622C)
8. **User Name**: `x=1309+` ("Scott Marshall" text)
9. **Dropdown Arrow**: `x=1403-1416` (Chevron down)

## Process Steps for Each Header Variant:

### Step 1: Color Extraction
- Extract brand color from first `<rect fill="...">` 
- Extract user avatar color from user circle
- Note any text colors (#32373F for logos, #525965 for UI text)

### Step 2: Logo/Text Analysis
- Identify logo paths and text content
- Extract brand text (e.g., "Object" for Build)
- Note text positioning and styling

### Step 3: Icon Mapping to Carbon
- Add button → Carbon `add`
- Help/Question → Carbon `help`
- Notification bell → Carbon `notification`
- User dropdown → Carbon `chevron-down`
- Search icon → Carbon `search`

### Step 4: Layout Positioning
- Convert SVG coordinates to CSS flexbox/grid
- Map exact spacing and alignment
- Ensure responsive behavior

### Step 5: Interactive Elements
- Search input field using demo Input component
- Notification dropdown with alerts
- User menu dropdown
- Hover states and transitions

## Implementation Template:

```typescript
interface HeaderVariantConfig {
  name: string;           // "Object Build"
  brandColor: string;     // "#5DA10C"
  logoText: string;       // "Object"
  userAvatarColor: string; // "#54622C"
  hasSearch: boolean;     // true
  searchPlaceholder: string; // "New application"
}

const VARIANT_CONFIG: HeaderVariantConfig = {
  // Extract from SVG analysis
  name: 'Object Build',
  brandColor: '#5DA10C',     // From rect fill
  logoText: 'Object',       // From logo text paths
  userAvatarColor: '#54622C', // From user circle fill
  hasSearch: true,
  searchPlaceholder: 'New application' // From search text
};
```

## Quality Checklist:

- [ ] Brand color strip matches SVG exactly
- [ ] Logo positioning and text correct
- [ ] All icons replaced with Carbon equivalents
- [ ] Search functionality integrated
- [ ] User avatar matches color scheme
- [ ] Notification system working
- [ ] Dropdown positioning correct
- [ ] Hover states implemented
- [ ] Responsive design maintained
- [ ] TypeScript interfaces complete

## Files to Update Per Variant:

1. **Header.tsx** - Add variant configuration
2. **HeaderDemo.tsx** - Add demo section for variant
3. **Test integration** - Verify all functionality

## Application Order:

1. ✅ Build (template) - GREEN #5DA10C - COMPLETED
   - Brand color strip: #5DA10C 
   - Search placeholder: "New application" (extracted from SVG text)
   - User avatar color: #54622C (extracted from SVG circle fill)
   - Exact positioning applied for search and user elements

2. Connect - BLUE #0B77D8  
3. Keystone - TEAL #00928F
4. Nexus - PURPLE #6B46C1
5. Regworks - RED #DC2626

## Build Header Implementation Notes:
- Updated search placeholder from "Workspace" to "New application" based on SVG text content
- Applied user avatar color #54622C from SVG circle fill attribute  
- Positioned search bar with maxWidth: '102px' to match SVG width (x=1029-1131)
- Used exact brand color #5DA10C from SVG rect fill
- All Carbon icons maintained for consistency

This process ensures consistency and completeness across all header variants.