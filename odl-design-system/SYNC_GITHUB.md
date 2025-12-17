# GitHub Sync Script

This script **safely** pulls the latest files from GitHub without modifying git or risking data loss.

## What It Does

- ✅ Downloads latest files from GitHub
- ✅ Updates your local copies
- ✅ **Never touches git** - completely safe
- ✅ Leaves GitHub untouched
- ✅ You control when it runs

## How to Use

**When your team says changes were made:**

```bash
cd /Users/andrewk/Documents/ODL-Library/odl-design-system
./sync-from-github.sh
```

Then restart Storybook:
```bash
npm run storybook
```

## What Gets Synced

Currently syncs these files:
- `AlertBanner.tsx` & `AlertBanner.css`
- `Button/ButtonTW.tsx`
- `Switch/Switch.tsx` & `Switch.css`
- `.storybook/main.js` & `preview.ts`
- `types/common.ts`

## Adding More Files to Sync

Edit `sync-from-github.sh` and add to the `FILES_TO_SYNC` array:

```bash
FILES_TO_SYNC=(
    "content/src/components/AlertBanner/AlertBanner.css"
    "content/YOUR_NEW_FILE/here.tsx"  # Add new files here
)
```

## Safety

- **No git modifications** - purely file downloads
- **Backup before sync** - script downloads to `.tmp` first, only commits if successful
- **Failed downloads don't overwrite** - if GitHub is down, nothing changes
- **You control timing** - only runs when you explicitly ask

## How to Ask Me to Sync

Just tell me: **"Team member X updated component Y"**

I'll run:
```bash
./sync-from-github.sh
npm run storybook
```

And Storybook will show the latest immediately!

## Troubleshooting

**Script not running?**
```bash
chmod +x sync-from-github.sh
```

**GitHub is down?**
- Script shows ❌ for each failed file
- Your local files remain unchanged
- Try again later

**Want to sync everything?**
```bash
cd content && git pull odl-new main
```
(This is the full git pull, use only if you want full sync)
