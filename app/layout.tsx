import './globals.css'
import { Inter, Quicksand } from 'next/font/google'
import HeaderWrapper from '@/components/common/HeaderWrapper'
import Footer from '@/components/common/Footer'
import GoogleAnalytics from '@/components/common/GoogleAnalytics'
import { Providers } from './providers'
import AnalyticsProvider from '@/components/common/AnalyticsProvider'
import ConversionElements from '@/components/features/conversion/ConversionElements'
import PerformanceMonitor from '@/components/common/PerformanceMonitor'
import NotificationBarWrapper from '@/components/common/NotificationBarWrapper'
import ErrorTracker from '@/components/common/ErrorTracker'
import MobileOptimizations from '@/components/common/MobileOptimizations'
import SkipNavigation from '@/components/common/SkipNavigation'
import AccessibilityAudit from '@/components/common/AccessibilityAudit'
import AccessibilityValidator from '@/components/common/AccessibilityValidator'
import { Metadata } from 'next'
import { defaultTitle, defaultDescription, seoKeywords, baseUrl, siteName } from '@/lib/seo-config'

// Educational platform fonts - optimized loading
const inter = Inter({ 
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

const quicksand = Quicksand({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  preload: true,
  variable: '--font-quicksand',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: defaultTitle,
    template: '%s - Srećno učenje'
  },
  description: defaultDescription,
  keywords: seoKeywords,
  authors: [{ name: 'Željana Radojičić Lukić', url: `${baseUrl}/o-autorki` }],
  creator: siteName,
  publisher: siteName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      'sr-RS': baseUrl,
      'en-US': `${baseUrl}/en`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'sr_RS',
    alternateLocale: ['en_US'],
    url: baseUrl,
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: '/og-images/home.jpg',
        width: 1200,
        height: 630,
        alt: 'Srećno učenje - Franšiza obrazovne metodologije',
        type: 'image/jpeg',
      },
      {
        url: '/og-images/logo.png',
        width: 400,
        height: 400,
        alt: 'Srećno učenje logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@srecno_ucenje',
    creator: '@srecno_ucenje',
    title: defaultTitle,
    description: defaultDescription,
    images: ['/og-images/home.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'education',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr-RS" className={`${inter.variable} ${quicksand.variable}`}>
      <head>
        <GoogleAnalytics />
        
        {/* Enhanced Accessibility and Mobile Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover" />
        <meta name="color-scheme" content="light" />
        <meta name="format-detection" content="telephone=yes, date=no, email=yes, address=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="geo.region" content="RS" />
        <meta name="geo.country" content="Serbia" />
        <meta name="geo.placename" content="Belgrade" />
        <meta name="ICBM" content="44.787197, 20.457273" />
        <meta name="language" content="Serbian" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Favicons and Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#3B82F6" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#1F2937" />
        <meta name="apple-mobile-web-app-title" content="Srećno učenje" />
        <meta name="application-name" content="Srećno učenje" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//cdn.sanity.io" />
        
        {/* Canonical URL - will be overridden by page-specific metadata */}
        <link rel="canonical" href={baseUrl} />
        
        {/* Alternate language versions */}
        <link rel="alternate" hrefLang="sr" href={baseUrl} />
        <link rel="alternate" hrefLang="en" href={`${baseUrl}/en`} />
        <link rel="alternate" hrefLang="x-default" href={baseUrl} />
      </head>
      <body className="flex flex-col min-h-screen antialiased" lang="sr-RS" style={{'--vh': '1vh'}}>
        <Providers>
          <AnalyticsProvider>
            <ErrorTracker />
            <PerformanceMonitor />
            <MobileOptimizations />
            <SkipNavigation />
            <NotificationBarWrapper />
            <HeaderWrapper />
            <main id="main-content" className="flex-grow pt-20" role="main" aria-label="Glavni sadržaj">
              {children}
            </main>
            <Footer />
            <ConversionElements />
            <AccessibilityAudit />
            <AccessibilityValidator />
          </AnalyticsProvider>
        </Providers>
      </body>
    </html>
  )
}
