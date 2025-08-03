'use client'

import { useSanityQuery } from '@/hooks/useSanity'
import { siteSettingsQuery } from '@/lib/sanity.queries'

interface WorkingHours {
  day: string
  hours: string
}

interface SiteSettings {
  email?: string
  phone?: string
  address?: string
  workingHours?: WorkingHours[]
}

export default function ContactInfo() {
  const { data: settings, isLoading } = useSanityQuery<SiteSettings>(siteSettingsQuery)

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-2/3"></div>
      </div>
    )
  }

  const contactInfo = settings || {
    email: 'info@srecno-ucenje.rs',
    phone: '+381 60 123 4567',
    address: 'Bulevar oslobođenja 123, 21000 Novi Sad'
  }

  return (
    <div className="space-y-4">
      {contactInfo.email && (
        <div>
          <h3 className="font-semibold mb-1">Email</h3>
          <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:underline">
            {contactInfo.email}
          </a>
        </div>
      )}
      
      {contactInfo.phone && (
        <div>
          <h3 className="font-semibold mb-1">Telefon</h3>
          <a href={`tel:${contactInfo.phone}`} className="text-blue-600 hover:underline">
            {contactInfo.phone}
          </a>
        </div>
      )}
      
      {contactInfo.address && (
        <div>
          <h3 className="font-semibold mb-1">Adresa</h3>
          <p className="text-gray-700">{contactInfo.address}</p>
        </div>
      )}
      
      {contactInfo.workingHours && contactInfo.workingHours.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Radno Vreme</h3>
          <div className="space-y-1">
            {contactInfo.workingHours.map((schedule, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{schedule.day}</span>
                <span className="text-gray-600">{schedule.hours}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}