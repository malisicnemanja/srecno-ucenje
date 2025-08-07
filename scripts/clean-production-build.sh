#!/bin/bash

# Production Clean Build Script
# Srećno učenje - Kompletno čišćenje i rebuild

echo "🧹 Starting complete production cleanup and rebuild..."
echo "=================================================="

# Step 1: Stop any running processes
echo "📦 Step 1: Stopping any running Node processes..."
pkill -f "next" || true
pkill -f "node" || true

# Step 2: Clean Next.js cache and build
echo "🗑️  Step 2: Removing Next.js build and cache..."
rm -rf .next
rm -rf node_modules/.cache
rm -rf .sanity/dist

# Step 3: Clean service worker cache
echo "🔧 Step 3: Cleaning service worker and PWA cache..."
rm -rf public/workbox-*.js
rm -rf public/sw.js.map
rm -rf public/workbox-*.js.map

# Step 4: Clean package manager cache
echo "📚 Step 4: Cleaning package manager cache..."
npm cache clean --force

# Step 5: Reinstall dependencies (optional but recommended)
read -p "🔄 Do you want to reinstall all dependencies? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    echo "📦 Reinstalling dependencies..."
    rm -rf node_modules
    rm -f package-lock.json
    npm install
fi

# Step 6: Run production build
echo "🏗️  Step 6: Running production build..."
npm run build

# Step 7: Verify build
if [ -d ".next" ]; then
    echo "✅ Build completed successfully!"
    
    # Show build stats
    echo ""
    echo "📊 Build Statistics:"
    echo "-------------------"
    du -sh .next | awk '{print "Build size: " $1}'
    find .next -name "*.js" | wc -l | awk '{print "JavaScript files: " $1}'
    find .next -name "*.css" | wc -l | awk '{print "CSS files: " $1}'
    
    echo ""
    echo "🚀 Ready for deployment!"
    echo ""
    echo "📝 Next steps:"
    echo "1. Start production server: npm start"
    echo "2. Or use PM2: pm2 start npm --name 'srecno-ucenje' -- start"
    echo "3. Test all critical paths"
    echo "4. Monitor performance metrics"
else
    echo "❌ Build failed! Please check the logs above."
    exit 1
fi

echo ""
echo "=================================================="
echo "✨ Production cleanup and rebuild complete!"