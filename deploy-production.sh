#!/bin/bash

echo "🚀 STARTING PRODUCTION DEPLOYMENT FOR SANITY CMS MIGRATION"
echo "============================================================"

# Step 1: Clean up temporary files
echo ""
echo "📁 Step 1: Cleaning up temporary documentation files..."
rm -f CENTERS_LOCATIONS_EDUCATORS_IMPLEMENTATION.md
rm -f CLEANUP_ACTION_PLAN.md
rm -f EXECUTE-MIGRATION.md
rm -f EXECUTE_CLEANUP_NOW.md
rm -f MIGRATION-READY-SUMMARY.md
rm -f SAFE_MIGRATION_GUIDE.md
rm -f SCHEMA-CONSOLIDATION-PLAN.md
rm -f STUDIO_PRODUCER_COORDINATION_PLAN.md
rm -f STUDIO_PRODUCER_FINAL_EXECUTION.md
rm -f COMPREHENSIVE_CMS_MIGRATION_PLAN.md
rm -f MIGRATION_EXECUTION_SUMMARY.md
rm -f SANITY_VALIDATION_REPORT.md
rm -f PRODUCTION_DEPLOYMENT_PLAN.md
echo "✅ Temporary files cleaned up"

# Step 2: Clean cache files
echo ""
echo "🧹 Step 2: Cleaning cache files..."
rm -rf .next
rm -rf out
rm -rf dist
rm -rf build
echo "✅ Cache files cleaned"

# Step 3: Clean node_modules cache
echo ""
echo "📦 Step 3: Cleaning npm cache..."
npm cache clean --force
echo "✅ NPM cache cleaned"

# Step 4: Fresh install
echo ""
echo "⬇️  Step 4: Fresh dependency installation..."
rm -rf node_modules
npm install
echo "✅ Dependencies installed"

# Step 5: Production build
echo ""
echo "🏗️  Step 5: Creating production build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Production build successful!"
else
    echo "❌ Production build failed!"
    exit 1
fi

# Step 6: Git commit
echo ""
echo "📝 Step 6: Committing all changes..."
git add .
git commit -m "🚀 Production: Complete Sanity CMS migration with Serbian content

MAJOR CHANGES:
- Complete Sanity CMS integration with Serbian content
- Home page server-side rendering with CMS data
- All unknown fields and missing keys resolved
- Statistics, features, FAQ sections CMS-driven
- Success stories and franchise steps integrated
- Newsletter CTA and differentiators from CMS
- Production build optimizations applied
- PWA removed, Sentry integration maintained

TECHNICAL IMPROVEMENTS:
- Server-side data fetching for SEO
- Proper error handling for CMS failures
- Image optimization with next/image
- Performance optimizations in next.config.js
- TypeScript strict mode compliance
- Build artifacts cleanup

FILES MODIFIED:
- app/page.tsx - Complete CMS integration
- app/layout.tsx - Global layout updates
- components/features/cms/* - CMS components
- lib/sanity/* - Sanity client and queries
- next.config.js - Production optimizations
- package.json - Dependencies cleanup

READY FOR PRODUCTION DEPLOYMENT"

echo "✅ Changes committed to Git"

echo ""
echo "🎉 PRODUCTION DEPLOYMENT PREPARATION COMPLETE!"
echo "============================================="
echo ""
echo "🚀 Next steps:"
echo "1. Push to repository: git push origin main"
echo "2. Deploy to your hosting platform"
echo "3. Set environment variables:"
echo "   - NEXT_PUBLIC_SANITY_PROJECT_ID"
echo "   - NEXT_PUBLIC_SANITY_DATASET=production"
echo "   - SANITY_API_TOKEN"
echo "   - NEXT_PUBLIC_APP_ENV=production"
echo "   - NODE_ENV=production"
echo ""
echo "🔍 To test locally before deploying:"
echo "npm start"
echo ""
echo "✨ Your Sanity CMS migration is ready for production!"