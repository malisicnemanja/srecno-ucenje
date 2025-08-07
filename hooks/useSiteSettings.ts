import { useSanityQuery } from '@/hooks/useSanity'
import { siteSettingsQuery } from '@/lib/sanity.queries'

interface SiteSettings {
  siteName: string
  siteSubtitle: string
  siteDescription: string
  logo: string | null
  email: string
  phone: string
  address: string
  workingHours: Array<{ day: string; hours: string }>
  socialLinks: Array<{ platform: string; url: string }>
  colorPalette: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    warmColor: string
  }
  navigationSettings: any
  defaultSeo: any
}

export function useSiteSettings() {
  const { data, isLoading, error } = useSanityQuery<SiteSettings>(siteSettingsQuery)
  
  // Provide fallback values for critical settings
  const siteSettings = {
    siteName: data?.siteName || 'Srećno učenje',
    siteSubtitle: data?.siteSubtitle || 'Centar za brzo čitanje',
    siteDescription: data?.siteDescription || 'Franšiza obrazovne metodologije za brzo čitanje i mentalnu aritmetiku',
    email: data?.email || 'carobnoselo@gmail.com',
    phone: data?.phone || '063.394.251',
    address: data?.address || '',
    workingHours: data?.workingHours || [],
    socialLinks: data?.socialLinks || [],
    colorPalette: {
      primaryColor: data?.colorPalette?.primaryColor || '#22c55e',
      secondaryColor: data?.colorPalette?.secondaryColor || '#3498db',
      accentColor: data?.colorPalette?.accentColor || '#f39c12',
      warmColor: data?.colorPalette?.warmColor || '#e74c3c',
    },
    navigationSettings: data?.navigationSettings || null,
    defaultSeo: data?.defaultSeo || null,
    logo: data?.logo || null,
  }
  
  return {
    siteSettings,
    isLoading,
    error,
    rawData: data
  }
}

export default useSiteSettings