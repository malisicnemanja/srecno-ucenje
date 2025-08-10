'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AcademicCapIcon, StarIcon, ClockIcon } from '@heroicons/react/24/outline'
import { urlFor } from '@/lib/sanity'

interface EducatorCardProps {
  educator: {
    firstName: string
    lastName: string
    slug: string
    title?: string
    photo: any
    shortBio?: string
    specializations?: string[]
    experience?: {
      yearsTotal?: number
      yearsWithCompany?: number
    }
    centers?: Array<{
      name: string
      shortName?: string
      city: {
        name: string
      }
    }>
    availability?: string
  }
  variant?: 'default' | 'compact' | 'featured'
  href?: string
}

export function EducatorCard({ 
  educator, 
  variant = 'default',
  href
}: EducatorCardProps) {
  const fullName = `${educator.firstName} ${educator.lastName}`
  const linkHref = href || `/edukatori/${educator.slug}`
  
  const specializationLabels = {
    'preschool': 'Predškolski uzrast',
    'elementary': 'Mladi školski uzrast', 
    'middle-school': 'Stariji školski uzrast',
    'high-school': 'Srednja škola',
    'adults': 'Odrasli',
    'speed-reading': 'Brzo čitanje',
    'mental-arithmetic': 'Mentalna aritmetika',
    'concentration': 'Koncentracija',
    'creative-writing': 'Kreativno pisanje',
    'developmental-psychology': 'Razvojna psihologija',
    'special-needs': 'Posebne potrebe',
    'online-teaching': 'Online nastava'
  }

  const availabilityLabels = {
    'full-time': 'Puno vreme',
    'part-time': 'Skraćeno',
    'freelance': 'Honorarno',
    'temporarily-unavailable': 'Nedostupan',
    'on-leave': 'Na odsustvu'
  }

  if (variant === 'compact') {
    return (
      <Link href={linkHref}>
        <div className="bg-white rounded-lg border hover:shadow-md transition-shadow p-4 group">
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 flex-shrink-0">
              {educator.photo ? (
                <Image
                  src={urlFor(educator.photo).width(48).height(48).url()}
                  alt={fullName}
                  fill
                  className="object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm font-medium">
                    {educator.firstName[0]}{educator.lastName[0]}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                {fullName}
              </h4>
              {educator.title && (
                <p className="text-sm text-gray-600 truncate">{educator.title}</p>
              )}
              {educator.experience?.yearsTotal && (
                <p className="text-xs text-gray-500">
                  {educator.experience.yearsTotal} god. iskustva
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    )
  }

  const cardClasses = {
    'default': 'bg-white border-gray-200',
    'featured': 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 ring-1 ring-blue-200'
  }

  return (
    <Link href={linkHref}>
      <div className={`rounded-lg border-2 hover:shadow-lg transition-all duration-300 overflow-hidden group ${cardClasses[variant === 'featured' ? 'featured' : 'default']}`}>
        {/* Photo */}
        <div className="relative h-64 overflow-hidden">
          {educator.photo ? (
            <Image
              src={urlFor(educator.photo).width(300).height(300).url()}
              alt={fullName}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <AcademicCapIcon className="h-16 w-16 mx-auto mb-2" />
                <div className="text-2xl font-bold">
                  {educator.firstName[0]}{educator.lastName[0]}
                </div>
              </div>
            </div>
          )}
          
          {/* Featured Badge */}
          {variant === 'featured' && (
            <div className="absolute top-3 right-3">
              <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                <StarIcon className="h-3 w-3 mr-1" />
                Istaknut
              </div>
            </div>
          )}
          
          {/* Availability Badge */}
          {educator.availability && educator.availability !== 'full-time' && (
            <div className="absolute top-3 left-3">
              <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                <ClockIcon className="h-3 w-3 mr-1" />
                {availabilityLabels[educator.availability] || educator.availability}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {fullName}
            </h3>
            
            {educator.title && (
              <p className="text-sm text-gray-600 mt-1">{educator.title}</p>
            )}
          </div>

          {/* Bio */}
          {educator.shortBio && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              {educator.shortBio}
            </p>
          )}

          {/* Experience */}
          {educator.experience && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              {educator.experience.yearsTotal && (
                <div className="text-center p-2 bg-gray-50 rounded">
                  <div className="text-lg font-semibold text-gray-900">
                    {educator.experience.yearsTotal}
                  </div>
                  <div className="text-xs text-gray-600">god. iskustva</div>
                </div>
              )}
              
              {educator.experience.yearsWithCompany && (
                <div className="text-center p-2 bg-blue-50 rounded">
                  <div className="text-lg font-semibold text-blue-600">
                    {educator.experience.yearsWithCompany}
                  </div>
                  <div className="text-xs text-gray-600">godina sa nama</div>
                </div>
              )}
            </div>
          )}

          {/* Centers */}
          {educator.centers && educator.centers.length > 0 && (
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-2">Radi u:</div>
              <div className="space-y-1">
                {educator.centers.slice(0, 2).map((center, index) => (
                  <div key={index} className="text-sm text-gray-600">
                    {center.shortName || center.name}
                    <span className="text-gray-400 ml-1">({center.city.name})</span>
                  </div>
                ))}
                {educator.centers.length > 2 && (
                  <div className="text-sm text-gray-500">
                    +{educator.centers.length - 2} više
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Specializations */}
          {educator.specializations && educator.specializations.length > 0 && (
            <div>
              <div className="text-xs text-gray-500 mb-2">Specijalnosti:</div>
              <div className="flex flex-wrap gap-1">
                {educator.specializations.slice(0, 3).map((spec, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                    {specializationLabels[spec] || spec}
                  </span>
                ))}
                {educator.specializations.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    +{educator.specializations.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}