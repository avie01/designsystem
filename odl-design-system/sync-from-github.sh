#!/bin/bash

# Safe sync script - pulls latest files from GitHub without modifying git
# Usage: ./sync-from-github.sh

REPO="steamfrog2012/ODL"
BRANCH="main"
GITHUB_RAW="https://raw.githubusercontent.com/$REPO/$BRANCH"
CONTENT_DIR="/Users/andrewk/Documents/ODL-Library/odl-design-system/content"

echo "🔄 Syncing files from GitHub..."
echo "Repository: $REPO"
echo "Branch: $BRANCH"
echo ""

# Files to sync (paths as they appear in GitHub)
FILES_TO_SYNC=(
    "src/components/AlertBanner/AlertBanner.css"
    "src/components/AlertBanner/AlertBanner.tsx"
    "src/components/Button/ButtonTW.tsx"
    "src/components/Switch/Switch.tsx"
    "src/components/Switch/Switch.css"
    "odl-design-system/content/.storybook/main.js"
    "odl-design-system/content/.storybook/preview.ts"
    "src/types/common.ts"
)

UPDATED=0
FAILED=0

for file in "${FILES_TO_SYNC[@]}"; do
    # Strip odl-design-system/content/ prefix if present for local path
    LOCAL_FILE=${file#odl-design-system/content/}
    FILE_PATH="$CONTENT_DIR/$LOCAL_FILE"

    echo -n "Syncing $(basename "$FILE_PATH")... "

    # Create parent directory if needed
    mkdir -p "$(dirname "$FILE_PATH")"

    # Get file from git (odl-new/main branch)
    if cd /Users/andrewk/Documents/ODL-Library && git show odl-new/main:"$file" > "$FILE_PATH.tmp" 2>/dev/null; then
        if [ -s "$FILE_PATH.tmp" ]; then
            # File retrieved successfully and has content
            mv "$FILE_PATH.tmp" "$FILE_PATH"
            echo "✅"
            ((UPDATED++))
        else
            echo "❌ (empty file from GitHub)"
            rm "$FILE_PATH.tmp"
            ((FAILED++))
        fi
    else
        echo "❌ (not found on GitHub)"
        rm -f "$FILE_PATH.tmp"
        ((FAILED++))
    fi
done

echo ""
echo "📊 Summary:"
echo "  Updated: $UPDATED files"
echo "  Failed: $FAILED files"
echo ""

if [ $UPDATED -gt 0 ]; then
    echo "✅ Sync complete! Restart Storybook to see changes:"
    echo "   npm run storybook"
else
    echo "⚠️  No files were updated"
fi
