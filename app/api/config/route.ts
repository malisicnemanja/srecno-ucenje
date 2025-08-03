import { NextResponse } from 'next/server'
import { getClientConfig } from '@/lib/config'

/**
 * API route to securely provide client-side configuration
 * This prevents API keys from being hardcoded in client bundles
 */
export async function GET() {
  try {
    const config = await getClientConfig()
    
    // Only return keys that are safe for client-side use
    const clientSafeConfig = {
      googleMapsApiKey: config.googleMapsApiKey,
      googleAnalyticsId: config.googleAnalyticsId,
      facebookPixelId: config.facebookPixelId,
      recaptchaSiteKey: config.recaptchaSiteKey
    }
    
    return NextResponse.json(clientSafeConfig, {
      // Cache for 5 minutes to reduce CMS API calls
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=60'
      }
    })
  } catch (error) {
    console.error('Failed to fetch client configuration:', error)
    
    // Return fallback configuration
    return NextResponse.json({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
      googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
      facebookPixelId: '',
      recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
    }, { status: 200 })
  }
}