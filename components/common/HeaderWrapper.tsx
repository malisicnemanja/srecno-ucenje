import { client } from '@/lib/sanity.client'
import { siteSettingsQuery } from '@/lib/sanity.queries'
import Header from './Header'

export default async function HeaderWrapper() {
  // Fetch site settings on the server during build
  const siteSettings = await client.fetch(siteSettingsQuery)
  
  return <Header initialSiteSettings={siteSettings} />
}