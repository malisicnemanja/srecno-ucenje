// Performance optimization utilities and configurations

import { NextConfig } from 'next'

// Performance budget configuration
export const performanceBudget = {
  maxAssetSize: 250000, // 250KB
  maxEntrypointSize: 250000, // 250KB
  hints: 'warning' as const,
}

// Critical resource preload configuration
export const criticalResources = [
  {
    href: 'https://cdn.sanity.io',
    rel: 'preconnect',
    crossOrigin: 'anonymous'
  },
  {
    href: 'https://fonts.googleapis.com',
    rel: 'preconnect'
  },
  {
    href: 'https://www.google-analytics.com',
    rel: 'dns-prefetch'
  }
]

// Optimized webpack configuration for performance
export const getOptimizedWebpackConfig = (config: any, { isServer }: { isServer: boolean }) => {
  if (!isServer) {
    // Set performance budget
    config.performance = performanceBudget

    // Advanced chunk splitting strategy
    if (!config.optimization.splitChunks) {
      config.optimization.splitChunks = { chunks: 'all', cacheGroups: {} }
    }

    config.optimization.splitChunks.cacheGroups = {
      ...config.optimization.splitChunks.cacheGroups,
      // Framework chunk (React, Next.js)
      framework: {
        test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
        name: 'framework',
        priority: 40,
        chunks: 'all',
        reuseExistingChunk: true,
      },
      // Heavy libraries chunk - lazy load these
      heavyLibs: {
        test: /[\\/]node_modules[\\/](framer-motion|chart\.js|react-chartjs-2|@react-google-maps)[\\/]/,
        name: 'heavy-libs',
        priority: 30,
        chunks: 'async', // Only load when needed
        reuseExistingChunk: true,
      },
      // Sanity CMS chunk
      sanity: {
        test: /[\\/]node_modules[\\/](@sanity|sanity|next-sanity)[\\/]/,
        name: 'sanity',
        priority: 20,
        chunks: 'all',
        reuseExistingChunk: true,
      },
      // UI libraries chunk
      ui: {
        test: /[\\/]node_modules[\\/](lucide-react|@radix-ui)[\\/]/,
        name: 'ui-libs',
        priority: 15,
        chunks: 'all',
        reuseExistingChunk: true,
      },
      // Default vendor chunk
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        priority: 10,
        chunks: 'all',
        reuseExistingChunk: true,
        minChunks: 2,
      },
    }

    // Tree shaking optimization for Framer Motion
    config.resolve.alias = {
      ...config.resolve.alias,
      'framer-motion': 'framer-motion/dist/framer-motion',
    }

    // Optimize bundle analyzer
    if (process.env.ANALYZE === 'true') {
      const BundleAnalyzerPlugin = require('@next/bundle-analyzer')
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
        })
      )
    }
  }

  return config
}

// Image optimization configuration
export const imageOptimization = {
  formats: ['image/avif', 'image/webp'],
  minimumCacheTTL: 60,
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  imageSizes: [16, 32, 48, 64, 96, 128, 256],
  domains: ['cdn.sanity.io'],
  dangerouslyAllowSVG: true,
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
}

// Caching headers for static assets
export const getOptimizedHeaders = () => [
  {
    source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif|woff2)',
    locale: false,
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
      {
        key: 'Vary',
        value: 'Accept',
      },
    ],
  },
  {
    source: '/_next/static/:path*',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ],
  },
  {
    source: '/_next/image',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ],
  },
  // API routes caching
  {
    source: '/api/:path*',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=300, stale-while-revalidate=60',
      },
    ],
  },
]

// Web Vitals tracking configuration
export const webVitalsConfig = {
  reportWebVitals: (metric: any) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', metric.name, {
        custom_parameter: metric.value,
        event_category: 'Web Vitals',
        non_interaction: true,
      })
    }
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`${metric.name}: ${metric.value}`)
    }
  }
}

// Performance monitoring utilities
export const performanceMonitor = {
  // Track bundle size changes
  trackBundleSize: (size: number, threshold: number = 500000) => {
    if (size > threshold) {
      console.warn(`Bundle size exceeded threshold: ${size} bytes`)
    }
  },

  // Monitor Core Web Vitals
  monitorWebVitals: () => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
          getCLS(webVitalsConfig.reportWebVitals)
          getFID(webVitalsConfig.reportWebVitals)
          getFCP(webVitalsConfig.reportWebVitals)
          getLCP(webVitalsConfig.reportWebVitals)
          getTTFB(webVitalsConfig.reportWebVitals)
        })
      })
    }
  },

  // Performance observer for custom metrics
  observePerformance: () => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Track custom performance metrics
          if (entry.entryType === 'measure') {
            console.log(`${entry.name}: ${entry.duration}ms`)
          }
        })
      })
      
      observer.observe({ entryTypes: ['measure', 'navigation', 'resource'] })
    }
  }
}

// Lazy loading configuration
export const lazyLoadConfig = {
  root: null,
  rootMargin: '50px',
  threshold: 0.1,
}

// Service Worker configuration
export const serviceWorkerConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV !== 'production',
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        networkTimeoutSeconds: 3, // Fast timeout for better UX
      },
    },
    // Cache images with stale-while-revalidate strategy
    {
      urlPattern: /\.(?:png|jpg|jpeg|webp|avif|gif|svg)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
  ],
}

const performanceConfig = {
  performanceBudget,
  criticalResources,
  getOptimizedWebpackConfig,
  imageOptimization,
  getOptimizedHeaders,
  webVitalsConfig,
  performanceMonitor,
  lazyLoadConfig,
  serviceWorkerConfig,
}

export default performanceConfig