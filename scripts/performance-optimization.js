#!/usr/bin/env node

/**
 * Performance Optimization Helper Script
 * Srecno Ucenje - Production Performance Analysis
 */

const fs = require('fs');
const path = require('path');

const BUNDLE_SIZE_LIMIT = 500 * 1024; // 500KB
const CHUNK_SIZE_LIMIT = 250 * 1024; // 250KB

class PerformanceAnalyzer {
  constructor() {
    this.buildPath = path.join(process.cwd(), '.next');
    this.staticPath = path.join(this.buildPath, 'static', 'chunks');
  }

  analyzeBundleSizes() {
    console.log('📊 Analyzing bundle sizes...\n');
    
    if (!fs.existsSync(this.staticPath)) {
      console.error('❌ Build not found. Run `npm run build` first.');
      return;
    }

    const chunks = fs.readdirSync(this.staticPath)
      .filter(file => file.endsWith('.js'))
      .map(file => {
        const filePath = path.join(this.staticPath, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          size: stats.size,
          sizeMB: (stats.size / 1024 / 1024).toFixed(2),
          sizeKB: (stats.size / 1024).toFixed(1)
        };
      })
      .sort((a, b) => b.size - a.size);

    // Large bundles analysis
    const largeBundles = chunks.filter(chunk => chunk.size > BUNDLE_SIZE_LIMIT);
    const mediumBundles = chunks.filter(chunk => 
      chunk.size > CHUNK_SIZE_LIMIT && chunk.size <= BUNDLE_SIZE_LIMIT
    );

    console.log('🔴 Large Bundles (>500KB):');
    largeBundles.forEach((chunk, index) => {
      const impact = chunk.size > 2000000 ? '⚠️  CRITICAL' : '📋 HIGH';
      console.log(`${index + 1}. ${chunk.name}: ${chunk.sizeMB}MB ${impact}`);
    });

    console.log('\n🟡 Medium Bundles (250KB-500KB):');
    mediumBundles.slice(0, 10).forEach((chunk, index) => {
      console.log(`${index + 1}. ${chunk.name}: ${chunk.sizeKB}KB`);
    });

    // Summary
    const totalSize = chunks.reduce((sum, chunk) => sum + chunk.size, 0);
    const totalSizeMB = (totalSize / 1024 / 1024).toFixed(2);
    
    console.log(`\n📊 Bundle Summary:`);
    console.log(`   Total JS Size: ${totalSizeMB}MB`);
    console.log(`   Total Chunks: ${chunks.length}`);
    console.log(`   Large Bundles: ${largeBundles.length}`);
    console.log(`   Optimization Potential: ${largeBundles.length > 0 ? 'HIGH' : 'LOW'}\n`);

    return {
      totalSize,
      totalSizeMB,
      chunksCount: chunks.length,
      largeBundles: largeBundles.length,
      recommendations: this.generateRecommendations(largeBundles)
    };
  }

  generateRecommendations(largeBundles) {
    const recommendations = [];

    if (largeBundles.some(b => b.name.includes('sanity'))) {
      recommendations.push({
        priority: 'HIGH',
        type: 'Bundle Splitting',
        description: 'Move Sanity Studio to separate bundle or lazy load',
        implementation: 'Dynamic import or separate entry point',
        expectedGain: '2-3MB reduction'
      });
    }

    if (largeBundles.length > 3) {
      recommendations.push({
        priority: 'MEDIUM',
        type: 'Code Splitting',
        description: 'Implement more granular code splitting',
        implementation: 'React.lazy() and webpack splitChunks',
        expectedGain: '20-40% reduction'
      });
    }

    if (largeBundles.some(b => b.size > 1000000)) {
      recommendations.push({
        priority: 'HIGH',
        type: 'Tree Shaking',
        description: 'Remove unused code from large bundles',
        implementation: 'Webpack bundle analyzer + manual optimization',
        expectedGain: '10-25% reduction'
      });
    }

    return recommendations;
  }

  checkCoreWebVitals() {
    console.log('🎯 Core Web Vitals Assessment:\n');
    
    const analysis = this.analyzeBundleSizes();
    
    // Projections based on bundle sizes
    const projections = {
      LCP: analysis.totalSize > 5000000 ? '2.1-3.5s ⚠️' : '1.2-2.1s ✅',
      FID: analysis.largeBundles > 2 ? '100-300ms ⚠️' : '50-150ms ✅',
      CLS: 'Estimated <0.1 ✅',
      TTI: analysis.totalSize > 5000000 ? '3.5-6.0s ❌' : '2.1-3.5s ✅'
    };

    Object.entries(projections).forEach(([metric, value]) => {
      console.log(`   ${metric}: ${value}`);
    });

    console.log('\n📱 Mobile Impact:');
    if (analysis.totalSize > 3000000) {
      console.log('   ⚠️  Large bundles may cause performance issues on low-end devices');
      console.log('   📊 Estimated 3G load time: 8-15 seconds');
    } else {
      console.log('   ✅ Bundle size is acceptable for mobile devices');
      console.log('   📊 Estimated 3G load time: 3-6 seconds');
    }
  }

  generateOptimizationPlan() {
    console.log('\n🚀 Optimization Action Plan:\n');
    
    const analysis = this.analyzeBundleSizes();
    
    console.log('IMMEDIATE (This Sprint):');
    analysis.recommendations.filter(r => r.priority === 'HIGH').forEach((rec, i) => {
      console.log(`${i + 1}. ${rec.type}: ${rec.description}`);
      console.log(`   Implementation: ${rec.implementation}`);
      console.log(`   Expected Gain: ${rec.expectedGain}\n`);
    });

    console.log('NEXT SPRINT:');
    analysis.recommendations.filter(r => r.priority === 'MEDIUM').forEach((rec, i) => {
      console.log(`${i + 1}. ${rec.type}: ${rec.description}`);
      console.log(`   Implementation: ${rec.implementation}`);
      console.log(`   Expected Gain: ${rec.expectedGain}\n`);
    });

    // Webpack config suggestions
    console.log('📝 Recommended webpack.config.js changes:');
    console.log(`
splitChunks: {
  chunks: 'all',
  maxSize: 500000, // 500KB max chunks
  cacheGroups: {
    sanity: {
      test: /[\\/]node_modules[\\/](@sanity|sanity)[\\/]/,
      name: 'sanity',
      chunks: 'async', // Load Sanity chunks asynchronously
      priority: 10,
    },
    vendor: {
      test: /[\\/]node_modules[\\/]/,
      name: 'vendor',
      chunks: 'all',
      maxSize: 250000, // 250KB vendor chunks
    }
  }
}
    `);
  }

  runFullAnalysis() {
    console.log('🔍 Srecno Ucenje Performance Analysis\n');
    console.log('=====================================\n');
    
    this.analyzeBundleSizes();
    this.checkCoreWebVitals();
    this.generateOptimizationPlan();
    
    console.log('✨ Analysis complete! Check PERFORMANCE_ANALYSIS_REPORT.md for detailed findings.\n');
  }
}

// CLI Interface
const analyzer = new PerformanceAnalyzer();

const command = process.argv[2];
switch (command) {
  case 'bundles':
    analyzer.analyzeBundleSizes();
    break;
  case 'vitals':
    analyzer.checkCoreWebVitals();
    break;
  case 'plan':
    analyzer.generateOptimizationPlan();
    break;
  default:
    analyzer.runFullAnalysis();
}