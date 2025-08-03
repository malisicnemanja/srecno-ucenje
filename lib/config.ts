/**
 * Configuration utilities for secure API key management
 * Prioritizes CMS settings over environment variables
 */

import { client } from './sanity.client'
import { siteSettingsQuery } from './sanity.queries'

// Cache for site settings to avoid repeated API calls
let siteSettingsCache: any = null
let cacheTimestamp = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

/**
 * Get site settings from CMS with caching
 */
export async function getSiteSettings() {
  const now = Date.now()
  
  // Return cached data if still valid
  if (siteSettingsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return siteSettingsCache
  }
  
  try {
    const settings = await client.fetch(siteSettingsQuery)
    siteSettingsCache = settings
    cacheTimestamp = now
    return settings
  } catch (error) {
    console.warn('Failed to fetch site settings from CMS:', error)
    return null
  }
}

/**
 * Get Google Maps API key with fallback hierarchy:
 * 1. CMS setting (preferred for production)
 * 2. Environment variable (fallback)
 */
export async function getGoogleMapsApiKey(): Promise<string> {
  try {
    const settings = await getSiteSettings()
    
    // Prefer CMS setting
    if (settings?.googleMapsApiKey) {
      return settings.googleMapsApiKey
    }
  } catch (error) {
    console.warn('Could not fetch Google Maps API key from CMS:', error)
  }
  
  // Fallback to environment variable
  const envKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  if (envKey && envKey !== 'your-google-maps-api-key') {
    return envKey
  }
  
  console.warn('Google Maps API key not configured in CMS or environment variables')
  return ''
}

/**
 * Get Google Analytics ID with fallback
 */
export async function getGoogleAnalyticsId(): Promise<string> {
  try {
    const settings = await getSiteSettings()
    if (settings?.googleAnalyticsId) {
      return settings.googleAnalyticsId
    }
  } catch (error) {
    console.warn('Could not fetch Google Analytics ID from CMS:', error)
  }
  
  const envId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  return envId || ''
}

/**
 * Get Facebook Pixel ID with fallback
 */
export async function getFacebookPixelId(): Promise<string> {
  try {
    const settings = await getSiteSettings()
    if (settings?.facebookPixelId) {
      return settings.facebookPixelId
    }
  } catch (error) {
    console.warn('Could not fetch Facebook Pixel ID from CMS:', error)
  }
  
  return ''
}

/**
 * Configuration object for client-side use
 */
export interface ClientConfig {
  googleMapsApiKey: string
  googleAnalyticsId: string
  facebookPixelId: string
  recaptchaSiteKey: string
}

/**
 * Get all client-side configuration from CMS with environment fallbacks
 */
export async function getClientConfig(): Promise<ClientConfig> {
  const settings = await getSiteSettings()
  
  return {
    googleMapsApiKey: settings?.googleMapsApiKey || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    googleAnalyticsId: settings?.googleAnalyticsId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
    facebookPixelId: settings?.facebookPixelId || '',
    recaptchaSiteKey: settings?.recaptchaSiteKey || process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
  }
}

/**
 * Clear the settings cache (useful after CMS updates)
 */
export function clearSettingsCache() {
  siteSettingsCache = null
  cacheTimestamp = 0
}