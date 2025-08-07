#!/usr/bin/env node

/**
 * Performance Check Script for Srećno učenje Website
 * Monitors bundle sizes, assets, and key performance metrics
 */

const fs = require('fs');
const path = require('path');

const PERFORMANCE_THRESHOLDS = {
  maxBundleSize: 500 * 1024, // 500KB
  maxAssetSize: 250 * 1024,  // 250KB
  maxImageSize: 32 * 1024 * 1024, // 32MB total
  maxServiceWorkerSize: 50 * 1024, // 50KB
};

function getDirectorySize(dirPath) {
  let totalSize = 0;
  
  try {
    const files = fs.readdirSync(dirPath);
    
    files.forEach(file => {
      const filePath = path.join(dirPath, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        totalSize += getDirectorySize(filePath);
      } else {
        totalSize += stats.size;
      }
    });
  } catch (error) {
    console.warn(`Could not read directory: ${dirPath}`);
  }
  
  return totalSize;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function checkPerformance() {
  console.log('🔍 Performance Check - Srećno učenje Website');
  console.log('================================================\n');

  // Check build output
  const buildPath = path.join(process.cwd(), '.next');
  const publicPath = path.join(process.cwd(), 'public');

  let issues = 0;
  let improvements = [];

  // 1. Check if build exists
  if (!fs.existsSync(buildPath)) {
    console.log('❌ No build found. Run "npm run build" first.');
    return;
  }

  // 2. Check static assets in public directory
  console.log('📁 Static Assets Analysis:');
  if (fs.existsSync(publicPath)) {
    const publicSize = getDirectorySize(publicPath);
    console.log(`   Total public directory size: ${formatBytes(publicSize)}`);
    
    // Check images directory specifically
    const imagesPath = path.join(publicPath, 'images');
    if (fs.existsSync(imagesPath)) {
      const imagesSize = getDirectorySize(imagesPath);
      console.log(`   Images directory size: ${formatBytes(imagesSize)}`);
      
      if (imagesSize > PERFORMANCE_THRESHOLDS.maxImageSize) {
        issues++;
        console.log(`   ⚠️  Images directory exceeds recommended size (${formatBytes(PERFORMANCE_THRESHOLDS.maxImageSize)})`);
        improvements.push('Optimize images using WebP/AVIF formats');
        improvements.push('Implement responsive images');
      } else {
        console.log('   ✅ Images directory size is within limits');
      }
    }

    // Check service worker files
    const swFiles = fs.readdirSync(publicPath).filter(file => file.startsWith('sw'));
    console.log(`   Service worker files found: ${swFiles.length}`);
    swFiles.forEach(file => {
      const swPath = path.join(publicPath, file);
      const swSize = fs.statSync(swPath).size;
      console.log(`   - ${file}: ${formatBytes(swSize)}`);
      
      if (swSize > PERFORMANCE_THRESHOLDS.maxServiceWorkerSize) {
        issues++;
        improvements.push(`Optimize ${file} - current size: ${formatBytes(swSize)}`);
      }
    });
  }

  // 3. Check TypeScript/JavaScript files count
  console.log('\n📊 Code Analysis:');
  const tsFiles = [];
  
  function findTSFiles(dir) {
    try {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && !file.includes('node_modules') && !file.includes('.next')) {
          findTSFiles(filePath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
          tsFiles.push(filePath);
        }
      });
    } catch (error) {
      // Ignore errors
    }
  }
  
  findTSFiles(process.cwd());
  console.log(`   Total TypeScript/React files: ${tsFiles.length}`);

  // Check for Framer Motion usage
  let framerMotionFiles = 0;
  let chartJSFiles = 0;
  
  tsFiles.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('framer-motion')) {
        framerMotionFiles++;
      }
      if (content.includes('chart.js') || content.includes('react-chartjs')) {
        chartJSFiles++;
      }
    } catch (error) {
      // Ignore errors
    }
  });

  console.log(`   Files using Framer Motion: ${framerMotionFiles}`);
  console.log(`   Files using Chart.js: ${chartJSFiles}`);

  if (framerMotionFiles > 20) {
    issues++;
    improvements.push(`Reduce Framer Motion usage (${framerMotionFiles} files found)`);
  } else {
    console.log('   ✅ Framer Motion usage is reasonable');
  }

  // 4. Check build output sizes
  console.log('\n🏗️  Build Output Analysis:');
  const staticPath = path.join(buildPath, 'static');
  if (fs.existsSync(staticPath)) {
    const staticSize = getDirectorySize(staticPath);
    console.log(`   Static build size: ${formatBytes(staticSize)}`);
    
    if (staticSize > PERFORMANCE_THRESHOLDS.maxBundleSize * 2) {
      issues++;
      improvements.push('Implement code splitting and dynamic imports');
    }
  }

  // 5. Performance recommendations
  console.log('\n🎯 Performance Recommendations:');
  if (improvements.length === 0) {
    console.log('   ✅ No critical performance issues found!');
  } else {
    improvements.forEach((improvement, index) => {
      console.log(`   ${index + 1}. ${improvement}`);
    });
  }

  // 6. Quick performance tips
  console.log('\n💡 Quick Performance Tips:');
  console.log('   • Use dynamic imports for heavy components');
  console.log('   • Optimize images with next/image component');
  console.log('   • Enable gzip compression in production');
  console.log('   • Use React.memo for expensive components');
  console.log('   • Implement service worker caching');

  // 7. Performance score
  console.log('\n📈 Performance Score:');
  const score = Math.max(0, 100 - (issues * 15));
  const grade = score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : 'D';
  console.log(`   Current score: ${score}/100 (${grade})`);
  console.log(`   Issues found: ${issues}`);

  if (score >= 95) {
    console.log('   🎉 Excellent performance! You\'re ready for production.');
  } else if (score >= 85) {
    console.log('   🚀 Good performance, minor optimizations recommended.');
  } else {
    console.log('   ⚠️  Performance improvements needed before production.');
  }

  console.log('\n================================================');
  console.log('💻 Run "npm run build" to update build analysis');
  console.log('🔍 Run "npm run perf:analyze" for detailed bundle analysis');
  console.log('================================================\n');
}

// Run the performance check
checkPerformance();