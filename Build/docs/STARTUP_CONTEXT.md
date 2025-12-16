# ODL Library - Startup Context for New Sessions

## Purpose
This file should be read at the start of every new Claude Code session to establish essential context about the ODL Library project.

## Files to Read in Order

### 1. Core Instructions
```
/Users/andrewk/Documents/ODL-Library/Build/CLAUDE.md
```
**Why:** Contains all critical rules, patterns, and common mistakes to avoid.

### 2. Design System
```
/Users/andrewk/Documents/ODL-Library/Build/src/styles/ODLTheme.ts
```
**Why:** Defines all colors, spacing, typography tokens. Prevents hardcoded values.

### 3. Component Registry
```
/Users/andrewk/Documents/ODL-Library/Build/docs/ODL_COMPONENT_REGISTRY.md
```
**Why:** Complete list of available components and their locations.

### 4. Demo Page Pattern
```
/Users/andrewk/Documents/ODL-Library/Build/docs/NEW_DEMO_PAGE_PATTERN.md
```
**Why:** Required structure for creating demo pages correctly.

### 5. Main Application Structure
```
/Users/andrewk/Documents/ODL-Library/Build/example/MultiPageExample.tsx
```
**Why:** Understanding how pages integrate into the Build application.

### 6. Component Status
```
/Users/andrewk/Documents/ODL-Library/Build/docs/COMPONENT_STATUS.md
```
**Why:** Know what's complete vs in-progress to avoid duplicate work.

### 7. Use Case Patterns
```
/Users/andrewk/Documents/ODL-Library/Build/docs/ODL_USE_CASE_PATTERNS.md
```
**Why:** Common UI patterns and implementations.

## Quick Command to Read All

For Claude: "Please read the startup context files listed in /docs/STARTUP_CONTEXT.md"

## Key Reminders After Reading

✅ **ALWAYS:**
- Run `npm run dev` after changes
- Use ODLTheme for all colors/spacing
- Copy components from demo pages, not /src/components
- Use Carbon icons via `<Icon name="..." />`
- Add new pages to MultiPageExample.tsx

❌ **NEVER:**
- Hardcode colors or spacing values
- Create standalone entry files
- Move files from /example folder
- Import outdated component versions
- Use non-Carbon icons

## Project Structure
```
Build/
├── src/               # Source code
│   ├── components/    # Component definitions
│   ├── pages/         # Demo pages
│   └── styles/        # ODLTheme and styles
├── example/           # Entry points and demos
├── docs/              # Documentation
├── dist/              # Build output
└── public/            # Static assets
```

## Development Commands
```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Build for production
npm run storybook    # Start Storybook (port 6006)
npm run share        # Share online via ngrok
```

## Access Points
- Main App: http://localhost:3000/multipage-example.html
- Components: http://localhost:3000/components-showcase.html
- Table Demo: http://localhost:3000/table-demo.html
- Storybook: http://localhost:6006

## Last Updated
- Date: August 12, 2025
- Recent work: Cleaned up folder structure, organized documentation
- Active components: Breadcrumb, BreadcrumbGrid, Treemap, MillerColumns