#!/bin/bash

# ODL Design System Cleanup Script
# Removes application-specific files to create a pure design system

echo "🧹 Starting ODL Design System cleanup..."
echo "This will remove application-specific files and keep only design system essentials."
echo ""

# Backup warning
echo "⚠️  WARNING: This will permanently delete files!"
echo "Press Ctrl+C to cancel, or Enter to continue..."
read

# Navigate to content directory
cd /Users/andrewk/Documents/ODL-Library/odl-design-system/content

# Create backup first
echo "📦 Creating backup..."
tar -czf ../odl-backup-$(date +%Y%m%d-%H%M%S).tar.gz .

echo "🗑️  Removing application-specific pages..."

# Remove application-specific pages
rm -f src/pages/Applications.tsx
rm -f src/pages/ApplicationsPage.tsx
rm -f src/pages/ApplicationSummaryPage.tsx
rm -f src/pages/BrisbanePropertyPanel.tsx
rm -f src/pages/CityPlanHomepage.tsx
rm -f src/pages/ComplianceChecklistPage*.tsx
rm -f src/pages/ComplianceReport.tsx
rm -f src/pages/Consultation.tsx
rm -f src/pages/CouncilDashboard.tsx
rm -f src/pages/EditingPage.tsx
rm -f src/pages/ImportGuide.tsx
rm -f src/pages/InternalReferrals.tsx
rm -f src/pages/LoginPage.tsx
rm -f src/pages/PlanDetails.tsx
rm -f src/pages/PlanningExport.tsx
rm -f src/pages/PropertyMapViewer.tsx
rm -f src/pages/PublicContact.tsx
rm -f src/pages/PublicHome.tsx
rm -f src/pages/PublicServices.tsx
rm -f src/pages/SubmissionInbox.tsx
rm -f src/pages/TopSecretFilesDemo.tsx
rm -f src/pages/TotalDocumentsDemo.tsx
rm -f src/pages/Page1Demo.tsx

echo "🗑️  Removing non-essential files..."

# Remove application-specific documentation
rm -f ISOVIST_CONTEXT.md
rm -f ODL_COMPLIANCE_GUIDE.md
rm -f SERVER_FIX_DOCUMENTATION.md
rm -f PLAYWRIGHT.md

# Remove server and deployment files
rm -f simple-express-server.js
rm -f start-compliance-demo.sh
rm -f start-server.sh
rm -f startup.sh
rm -f com.odl.server.plist
rm -f run-demo.js
rm -f check-console-errors.js
rm -f temp_check.js

# Remove auto-commit scripts
rm -f start-auto-commit.sh
rm -f stop-auto-commit.sh
rm -f .auto-commit-enabled
rm -f .auto-commit.pid

# Remove test artifacts
rm -rf test-results
rm -rf playwright-report

# Remove application images
rm -f applications-page.png

# Remove ngrok binary
rm -f ngrok

# Remove agents directory (application-specific)
rm -rf agents

echo "🧹 Cleaning up example directory..."
# Keep only essential examples
cd example
find . -type f ! -name "*.html" ! -name "index.html" -delete 2>/dev/null
cd ..

echo "✅ Cleanup complete!"
echo ""
echo "📋 Summary:"
echo "- Kept: All *Demo.tsx files for component documentation"
echo "- Kept: Core design system components in src/components"
echo "- Kept: Design tokens in src/design-system"
echo "- Kept: Utility functions in src/utils"
echo "- Kept: Hooks in src/hooks"
echo "- Removed: Application-specific pages and business logic"
echo "- Removed: Server configurations and deployment scripts"
echo ""
echo "🎨 Your ODL Design System is now clean and focused!"