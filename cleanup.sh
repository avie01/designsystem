#!/bin/bash

# ODL Design System Cleanup Script
# This script removes safe-to-delete files to reduce project size

echo "======================================"
echo "ODL Design System Cleanup Script"
echo "======================================"
echo ""

# Get initial size
INITIAL_SIZE=$(du -sh . | cut -f1)
echo "Initial project size: $INITIAL_SIZE"
echo ""

# Function to remove directory and report size saved
remove_dir() {
    local dir=$1
    if [ -d "$dir" ]; then
        SIZE=$(du -sh "$dir" 2>/dev/null | cut -f1)
        echo "  Removing $dir ($SIZE)..."
        rm -rf "$dir"
        echo "    ✓ Removed"
    else
        echo "  - $dir not found (skipping)"
    fi
}

# Function to remove file and report size saved
remove_file() {
    local file=$1
    if [ -f "$file" ]; then
        SIZE=$(du -sh "$file" 2>/dev/null | cut -f1)
        echo "  Removing $file ($SIZE)..."
        rm -f "$file"
        echo "    ✓ Removed"
    else
        echo "  - $file not found (skipping)"
    fi
}

echo "Starting cleanup..."
echo ""

# 1. Remove backup and archive files (143MB total)
echo "1. Removing backup and archive files..."
remove_file "odl-backup-20250908-131338.tar.gz"
remove_file "Archive.zip"
remove_file "content/src/Images/construction-crane-vector-industry-design-engineering-icon-equipment-builder-helmet-indust.zip"
echo ""

# 2. Remove node_modules directories (491MB)
echo "2. Removing node_modules directories..."
remove_dir "content/node_modules"
remove_dir "node_modules"
echo ""

# 3. Remove build/dist directories
echo "3. Removing build artifacts..."
remove_dir "content/dist"
remove_dir "dist"
remove_dir "build"
remove_dir "content/build"
echo ""

# 4. Remove cache directories
echo "4. Removing cache directories..."
remove_dir ".cache"
remove_dir ".parcel-cache"
remove_dir ".vite"
remove_dir ".turbo"
remove_dir ".next"
remove_dir ".nuxt"
remove_dir "content/.cache"
remove_dir "content/.vite"
echo ""

# 5. Remove test artifacts
echo "5. Removing test artifacts..."
remove_dir "coverage"
remove_dir "test-results"
remove_dir "playwright-report"
remove_dir "playwright-screenshots"
remove_dir "content/coverage"
remove_dir "content/test-results"
echo ""

# 6. Remove temporary files
echo "6. Removing temporary files..."
# Remove .DS_Store files (macOS)
find . -name ".DS_Store" -type f -delete 2>/dev/null
echo "  ✓ Removed .DS_Store files"
# Remove log files
find . -name "*.log" -type f -delete 2>/dev/null
echo "  ✓ Removed log files"
echo ""

# Get final size
echo "======================================"
FINAL_SIZE=$(du -sh . | cut -f1)
echo "Final project size: $FINAL_SIZE"
echo "Reduced from $INITIAL_SIZE to $FINAL_SIZE"
echo ""
echo "Cleanup complete!"
echo ""
echo "To restore dependencies, run:"
echo "  cd content && npm install"
echo ""
echo "Note: This script removed:"
echo "  - Backup/archive files (can be re-downloaded if needed)"
echo "  - node_modules (reinstall with npm install)"
echo "  - Build artifacts (regenerated with npm run build)"
echo "  - Cache directories (regenerated automatically)"
echo "  - Test artifacts (regenerated when tests run)"
echo "======================================"