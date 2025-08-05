'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useSanityQuery } from '@/hooks/useSanity'
import { siteSettingsQuery, navigationQuery } from '@/lib/sanity.queries'

interface SiteSettingsContextType {
  siteSettings: any
  navigation: any
  isLoading: boolean
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined)

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const { data: siteSettings, isLoading: settingsLoading } = useSanityQuery(siteSettingsQuery)
  const { data: navigation, isLoading: navLoading } = useSanityQuery(navigationQuery)
  
  const isLoading = settingsLoading || navLoading
  
  return (
    <SiteSettingsContext.Provider value={{ siteSettings, navigation, isLoading }}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext)
  if (context === undefined) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider')
  }
  return context
}