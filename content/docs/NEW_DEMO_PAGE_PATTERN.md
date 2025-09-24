# New Demo Page Pattern

When creating a new demo page for a component, follow these steps:

## Required Steps

1. **Create HTML file**: `{component}-demo.html`
   - Location: `/example/` folder
   - Must include the consistent font stack used across all demos

2. **Create entry file**: `{Component}DemoEntry.tsx`
   - Location: `/example/` folder
   - Imports the demo component from `/src/pages/`

3. **Create demo component**: `{Component}Demo.tsx`
   - Location: `/src/pages/` folder
   - Contains the actual demo implementation
   - Must import and include DemoBreadcrumb and BackToTop components:
   ```tsx
   import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
   import BackToTop from '../components/BackToTop/BackToTop';
   import styles from './TableDemo.module.css';
   
   // In component:
   <DemoBreadcrumb componentName="Component Name" />
   // ... content ...
   <BackToTop />
   ```
   - Must include View Code button in header with code examples:
   ```tsx
   const [showCode, setShowCode] = useState(false);
   
   // In header:
   <div className={styles.headerActions}>
     <Button
       variant={showCode ? 'primary' : 'secondary'}
       size="small"
       onClick={() => setShowCode(!showCode)}
     >
       {showCode ? 'Hide Code' : 'View Code'}
     </Button>
   </div>
   
   // After demo content:
   {showCode && (
     <div className={styles.codePanel}>
       <h3>Code Example</h3>
       <pre className={styles.codeBlock}>
         <code>{getCodeExample(selectedDemo)}</code>
       </pre>
     </div>
   )}
   ```

4. **Update showcase link**: 
   - Add component entry to `ComponentsShowcaseSimple.tsx`
   - Update path to point to `/{component}-demo.html`

5. **All required files must be in /example folder**:
   - HTML entry file and TSX entry file MUST be created in `/example/` folder
   - This ensures the demo works correctly with the build system
   - Script src in HTML should use relative path: `./ComponentDemoEntry.tsx`

6. **Verify font consistency**:
   - Check that the font stack matches other demo pages
   - Standard font stack:
   ```css
   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
     'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
     sans-serif;
   ```

7. **Include demo selector tabs at the top**:
   - Add demo selector tabs below the header for different demo variations
   - Use state to track selected demo: `const [selectedDemo, setSelectedDemo] = useState<'basic' | 'advanced' | ...>('basic')`
   - Each tab should have: icon, label, and description
   - Use the TableDemo.module.css styles for consistent styling
   - Example structure:
   ```tsx
   const [selectedDemo, setSelectedDemo] = useState<'basic' | 'advanced'>('basic');
   
   // In render:
   <div className={styles.demoSelector}>
     <div className={styles.demoTabs}>
       {[
         { key: 'basic', label: 'Basic', desc: 'Simple examples', icon: '🎨' },
         { key: 'advanced', label: 'Advanced', desc: 'Complex features', icon: '⚡' }
       ].map(demo => (
         <button
           key={demo.key}
           className={`${styles.demoTab} ${selectedDemo === demo.key ? styles.active : ''}`}
           onClick={() => setSelectedDemo(demo.key as any)}
         >
           <span className={styles.demoIcon}>{demo.icon}</span>
           <div className={styles.demoTabContent}>
             <span className={styles.demoLabel}>{demo.label}</span>
             <span className={styles.demoDesc}>{demo.desc}</span>
           </div>
         </button>
       ))}
     </div>
   </div>
   ```

8. **Include features showcase cards at the bottom**:
   - Add a features showcase section at the bottom of the page
   - Use `className={styles.featuresShowcase}` for the container
   - Include a grid of feature cards using `className={styles.featureGrid}`
   - Each card should use `className={styles.featureCategory}`
   - Organize features into logical categories (Core Features, Advanced, Customization, Performance, Accessibility, Use Cases)
   - Example structure:
   ```tsx
   {/* Features Showcase */}
   <div className={styles.featuresShowcase}>
     <div className={styles.sectionHeader}>
       <h3>[Component] Component Features</h3>
       <p>Everything you need for [description]</p>
     </div>
     
     <div className={styles.featureGrid}>
       <div className={styles.featureCategory}>
         <h4>🎨 Core Features</h4>
         <ul>
           <li>✓ Feature 1</li>
           <li>✓ Feature 2</li>
         </ul>
       </div>
       // ... more categories
     </div>
   </div>
   ```

## File Structure Example

```
/example/
  ├── button-demo.html         # HTML entry point
  ├── ButtonDemoEntry.tsx      # TSX entry point
  └── ...

/src/pages/
  ├── ButtonDemo.tsx           # Demo component implementation
  └── ...
```

## Common Issues to Avoid

- ❌ Don't place HTML files in the root `/Build/` directory
- ❌ Don't use absolute paths like `/example/Entry.tsx` in script src
- ❌ Don't forget to add the consistent font styling
- ✅ Always use relative paths in HTML script src: `./Entry.tsx`
- ✅ Always place both HTML and Entry files in `/example/`
- ✅ Always verify font consistency with existing demos