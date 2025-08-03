import { useState, useEffect } from 'react'

interface ClientConfig {
  googleMapsApiKey: string
  googleAnalyticsId: string
  facebookPixelId: string
  recaptchaSiteKey: string
}

/**
 * Hook to fetch client configuration securely from API
 * This prevents API keys from being bundled in client code
 */
export function useConfig() {
  const [config, setConfig] = useState<ClientConfig | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true

    async function fetchConfig() {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/config')
        
        if (!response.ok) {
          throw new Error(`Failed to fetch config: ${response.status}`)
        }

        const configData = await response.json()
        
        if (mounted) {
          setConfig(configData)
        }
      } catch (err) {
        console.error('Failed to fetch client configuration:', err)
        
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'))
          
          // Fallback to environment variables
          setConfig({
            googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
            googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
            facebookPixelId: '',
            recaptchaSiteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''
          })
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    fetchConfig()

    return () => {
      mounted = false
    }
  }, [])

  return { config, isLoading, error }
}

/**
 * Hook specifically for Google Maps API key
 */
export function useGoogleMapsApiKey() {
  const { config, isLoading, error } = useConfig()
  
  return {
    apiKey: config?.googleMapsApiKey || '',
    isLoading,
    error,
    isConfigured: Boolean(config?.googleMapsApiKey)
  }
}