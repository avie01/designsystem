# Auto-Pull Storybook

This script automatically pulls the latest code from GitHub and keeps Storybook running with the most current version.

## How It Works

1. **Auto-pulls from GitHub** - Every 5 minutes (configurable)
2. **Detects changes** - Checks if new commits exist on `odl-new/main`
3. **Restarts Storybook** - When changes are found, kills and restarts the dev server
4. **Keeps it running** - Accessible at `http://localhost:6006`

## Usage

### Quick Start
```bash
cd /Users/andrewk/Documents/ODL-Library/odl-design-system
./auto-storybook.sh
```

### In Background (Recommended)
```bash
cd /Users/andrewk/Documents/ODL-Library/odl-design-system
nohup ./auto-storybook.sh > storybook.log 2>&1 &
```

### Stop It
```bash
pkill -f auto-storybook.sh
```

### View Logs
```bash
tail -f /tmp/storybook.log           # Storybook output
tail -f storybook.log               # Script output
```

## Configuration

Edit `auto-storybook.sh` to change:

```bash
PULL_INTERVAL=300  # Change to 60 for every minute, 3600 for every hour, etc.
```

## What Your Team Sees

- **URL**: `http://localhost:6006` (or your machine's IP)
- **Always current** - Shows latest from GitHub automatically
- **Live updates** - When you push, it pulls and restarts within 5 minutes

## Example Flow

```
09:00 - Script starts, launches Storybook
09:05 - Checks GitHub, no updates, continues
09:10 - You push new changes to GitHub
09:10 - Script detects changes, pulls them
09:10 - Restarts Storybook with new code
09:10 - Team sees changes on localhost:6006
```

## Requirements

- `npm install` already done in `/content`
- Git access to the repository
- Port 6006 available

## Troubleshooting

**Storybook won't start?**
```bash
cd content
npm run storybook  # Test manually
```

**Script not detecting changes?**
```bash
cd /Users/andrewk/Documents/ODL-Library/odl-design-system
git fetch odl-new
git status
```

**Kill stuck processes:**
```bash
pkill -9 node
```
