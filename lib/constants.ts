// ⚠️ DEPRECATED: Use useSiteSettings() hook for production
// These constants are kept for backward compatibility and development fallbacks
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Srećno učenje'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://srecnoucenje.rs'
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'carobnoselo@gmail.com'
export const CONTACT_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE || '063.394.251'

export const SEASONS = {
  spring: { color: '#66BB6A', name: 'Proleće', fairy: 'Đurđica' },
  summer: { color: '#EF5350', name: 'Leto', fairy: 'Sunčica' },
  autumn: { color: '#FFA726', name: 'Jesen', fairy: 'Bosiljčica' },
  winter: { color: '#42A5F5', name: 'Zima', fairy: 'Božica' },
}
