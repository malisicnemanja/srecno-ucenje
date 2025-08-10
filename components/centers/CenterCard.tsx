'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPinIcon, PhoneIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { urlFor } from '@/lib/sanity'

interface CenterCardProps {
  center: {
    _id: string
    name: string
    slug: string
    shortName?: string
    city: {
      name: string
      slug: string
      region: string
    }
    status: string
    address: {
      street: string
      city: string
    }
    contact: {
      phone: string
      email: string
    }
    programs: string[]
    capacity?: {
      totalStudents: number
    }
    images: Array<{
      asset: any
      alt: string
    }>
    featured?: boolean
  }
  variant?: 'default' | 'coming-soon' | 'inactive'
  showCity?: boolean
  href?: string
}

export function CenterCard({ 
  center, 
  variant = 'default', 
  showCity = true,
  href 
}: CenterCardProps) {
  const linkHref = href || `/centri/${center.city.slug}/${center.slug}`
  
  const statusLabels = {
    'active': 'Aktivan',
    'coming-soon': 'Uskoro otvaranje',
    'in-preparation': 'U pripremi',
    'closed': 'Zatvoreno',
    'temporarily-closed': 'Privremeno zatvoreno'
  }

  const programLabels = {
    'preschool': 'Predškolski',
    'school': 'Školski',
    'speed-reading': 'Brzo čitanje',
    'concentration': 'Koncentracija',
    'creative-writing': 'Kreativno pisanje',
    'mental-arithmetic': 'Mentalna aritmetika',
    'workshops': 'Radionice',
    'summer-camp': 'Letnji kamp',
    'winter-camp': 'Zimski kamp',
    'birthdays': 'Rođendani',
    'online': 'Online'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'coming-soon':
        return 'bg-blue-100 text-blue-800'
      case 'in-preparation':
        return 'bg-yellow-100 text-yellow-800'
      case 'closed':
      case 'temporarily-closed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const cardClasses = {
    'default': 'bg-white hover:shadow-lg border-gray-200',
    'coming-soon': 'bg-blue-50 hover:shadow-lg border-blue-200',
    'inactive': 'bg-gray-50 hover:shadow-md border-gray-300 opacity-75'
  }

  return (
    <Link href={linkHref}>
      <div className={`rounded-lg border-2 transition-all duration-300 overflow-hidden group ${cardClasses[variant]}`}>
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {center.images?.[0] ? (
            <Image
              src={urlFor(center.images[0].asset).width(400).height(240).url()}
              alt={center.images[0].alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <div className="text-center text-blue-600">
                <UserGroupIcon className="h-12 w-12 mx-auto mb-2" />
                <div className="text-sm font-medium">Sretno učenje</div>
              </div>
            </div>
          )}
          
          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(center.status)}`}>
              {statusLabels[center.status] || center.status}
            </span>
          </div>
          
          {/* Featured Badge */}
          {center.featured && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                ⭐ Istaknut
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
              {center.shortName || center.name}
            </h3>
            
            {showCity && (
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <MapPinIcon className="h-4 w-4 mr-1" />
                {center.city.name}
              </div>
            )}
          </div>

          {/* Address */}
          <div className="text-sm text-gray-600 mb-3">
            {center.address.street}
          </div>

          {/* Contact */}
          {center.contact.phone && (
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <PhoneIcon className="h-4 w-4 mr-2" />
              {center.contact.phone}
            </div>
          )}

          {/* Programs */}
          {center.programs && center.programs.length > 0 && (
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-2">Dostupni programi:</div>
              <div className="flex flex-wrap gap-1">
                {center.programs.slice(0, 3).map((program, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {programLabels[program] || program}
                  </span>
                ))}
                {center.programs.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    +{center.programs.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Capacity */}
          {center.capacity?.totalStudents && (
            <div className="flex items-center text-sm text-gray-600">
              <UserGroupIcon className="h-4 w-4 mr-2" />
              Kapacitet: {center.capacity.totalStudents} učenika
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}