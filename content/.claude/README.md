# ODL Automatic Compliance Checking

This directory contains the Claude Code configuration for automatic ODL (Open Design Library) compliance checking.

## Features

✅ **Automatic Compliance Checking** - Runs after every file edit/write
✅ **File Pattern Matching** - Only checks ODL component files  
✅ **Proactive Agent System** - Uses specialized ODL compliance agent
✅ **Hooks Integration** - Triggers on file changes and tool usage
✅ **Debounced Execution** - Prevents spam, runs max every 5 minutes per file

## Configuration Files

- `config.json` - Main proactive agent and hooks configuration
- `hooks.json` - File change and tool usage hooks
- `agents.json` - ODL compliance agent settings
- `settings.json` - Project settings and compliance rules

## How It Works

1. **File Monitoring**: Watches `src/components/**/*.tsx` and `src/pages/**/*.tsx`
2. **Trigger Events**: Activates on Edit, Write, MultiEdit tool usage
3. **Agent Execution**: Runs ODL compliance agent automatically
4. **Compliance Report**: Provides specific fixes needed or confirms compliance
5. **Cooldown**: 5-minute cooldown prevents excessive checking

## Compliance Checks

The agent automatically verifies:
- ✅ ODL Theme imports (`import ODLTheme from '../../styles/ODLTheme'`)
- ✅ Color compliance (`ODLTheme.colors.*` instead of hex codes)
- ✅ Spacing compliance (`ODLTheme.spacing[]` instead of px/rem values)
- ✅ Typography compliance (`ODLTheme.typography.*`)
- ✅ Border compliance (`ODLTheme.borders.*`)
- ✅ Shadow compliance (`ODLTheme.shadows.*`)
- ✅ Transition compliance (`ODLTheme.transitions.*`)
- ✅ Carbon icon usage (`<Icon name="..." size={...} />`)

## Usage

Once configured, the system works automatically:

1. Edit any component file in `src/components/` or `src/pages/`
2. Save the file
3. ODL compliance agent automatically runs
4. Receive compliance report with specific fixes if needed
5. Apply fixes and save again for re-checking

## Manual Testing

To test the system, try editing a component file and introducing a compliance issue:

```tsx
// This will trigger ODL compliance checking
const BadComponent = () => (
  <div style={{ color: '#ff0000', padding: '16px' }}>
    Bad hardcoded values
  </div>
);
```

The agent should automatically detect and report these issues.

## Status

🟢 **Active** - Automatic ODL compliance checking is enabled
🔄 **Monitoring** - Watching component files for changes
⚡ **Ready** - Agent configured and ready to run