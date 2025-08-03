import './globals.css'
import { Inter } from 'next/font/google'
import StickyHeader from '@/components/common/StickyHeader'
import Footer from '@/components/common/Footer'
import GoogleAnalytics from '@/components/common/GoogleAnalytics'
import { Providers } from './providers'
import AnalyticsProvider from '@/components/common/AnalyticsProvider'
import ConversionElements from '@/components/features/conversion/ConversionElements'
import PerformanceMonitor from '@/components/common/PerformanceMonitor'
import NotificationBarWrapper from '@/components/common/NotificationBarWrapper'
import { Metadata } from 'next'

// Optimize font loading
const inter = Inter({ 
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://srecno-ucenje.rs'),
  title: 'Srećno učenje - Franšiza obrazovne metodologije',
  description: 'Postanite deo mreže koja je već inspirisala 20.000+ dece da uče srcem',
  keywords: 'franšiza, obrazovanje, brzo čitanje, mentalna aritmetika, učenje, deca',
  authors: [{ name: 'Željana Radojičić Lukić' }],
  creator: 'Srećno učenje',
  publisher: 'Srećno učenje',
  openGraph: {
    type: 'website',
    locale: 'sr_RS',
    url: 'https://srecno-ucenje.rs',
    siteName: 'Srećno učenje',
    title: 'Srećno učenje - Franšiza obrazovne metodologije',
    description: 'Postanite deo mreže koja je već inspirisala 20.000+ dece da uče srcem',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Srećno učenje',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Srećno učenje - Franšiza obrazovne metodologije',
    description: 'Postanite deo mreže koja je već inspirisala 20.000+ dece da uče srcem',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr" className={inter.className}>
      <head>
        <GoogleAnalytics />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Srećno učenje" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <AnalyticsProvider>
            <PerformanceMonitor />
            <NotificationBarWrapper />
            <StickyHeader />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <ConversionElements />
          </AnalyticsProvider>
        </Providers>
      </body>
    </html>
  )
}
