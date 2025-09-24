# ODL

**NEVER:** hardcode colors/px | `/* */` comments | `/src/components`  
**ALWAYS:** `ODLTheme.*`/`var(--odl-*)` | copy `/src/pages/*Demo.tsx` | props: size/disabled/error

## TABLE COMPONENT - ALWAYS USE THIS
**IMPORTANT:** Always use `/src/components/Table/Table.tsx` for ALL tables.
- Has sorting, pagination, selection, search, column resize, column visibility
- Header actions with search (SearchLocate icon), filter, settings, DataBin (column toggle)
- Use filtered data pattern with search functionality
- Small chips (size="sm") for status columns
- See `/src/pages/TableDemo.tsx` for implementation examples

```bash
npm run dev                        # start
npm run playwright:visual          # test
pkill -f "node server" && npm run dev  # fix
```

**FIND:** Button|Input|Table|Graph|Modal|Cards|Header|Tabs → `/*-demo.html` → `*Demo.tsx`

```tsx
// NEW PAGE: /src/pages/X.tsx + MultiPageExample: createLazyComponent(()=>import('../src/pages/X'),'X')
// THEME: ODLTheme.colors.primary|spacing[4]|typography.fontSize.base
// CSS: var(--odl-primary|spacing-4|font-size-base)
// TEXTAREA: <Input type="textarea" value={v} onChange={setV} rows={4}/>
// GRAPH: <Graph type="area|bar|pie" data={d} dataKeys={['v']} xAxisKey="x"/>
// ICON: <Icon name="folder" size={20}/>
// WRAP: <div style={{background:'#EDF1F5',padding:'24px'}}><div style={{background:'white',padding:'24px'}}>
// KEYS: onKeyDown={e=>{if(e.key==='Enter'||e.key===' ')fn()}}
// TEST: data-testid="x" aria-label="y" tabIndex={0}
// FONT: "Noto Sans",-apple-system,sans-serif
// WCAG: 4.5:1 text, 3:1 UI
// FIX: @tiptap/react/menus | rm -rf node_modules/.vite
```