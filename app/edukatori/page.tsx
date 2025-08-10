import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { client, getAllEducatorsQuery, urlFor } from '@/lib/sanity'
import { Container } from '@/components/layout/Container'
import HeroSection from '@/components/features/cms/HeroSection'
import { 
  AcademicCapIcon, 
  MapPinIcon, 
  ClockIcon,
  UserGroupIcon 
} from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'Naši edukatori - Srećno učenje',
  description: 'Upoznajte naš tim stručnih edukatora koji će vašoj deci omogućiti da postanu uspešniji, samouvereniji i motivovaniji za učenje.',
  keywords: ['edukatori', 'tim', 'srecno ucenje', 'nastava', 'obrazovanje']
}

interface Educator {
  _id: string
  firstName: string
  lastName: string
  slug: string
  title?: string
  photo: any
  shortBio?: string
  specializations: string[]
  centers: Array<{
    name: string
    slug: string
    shortName?: string
    city: {
      name: string
      slug: string
    }
  }>
  experience?: {
    yearsTotal?: number
    yearsWithCompany?: number
  }
  availability: string
  featured: boolean
}

export default async function EducatorsPage() {
  const educators = await client.fetch<Educator[]>(getAllEducatorsQuery)

  // Separate featured and regular educators
  const featuredEducators = educators.filter(educator => educator.featured)
  const regularEducators = educators.filter(educator => !educator.featured)

  // Labels for specializations and availability
  const specializationLabels = {
    'preschool': 'Predškolski uzrast',
    'elementary': 'Mladi školski uzrast',
    'middle-school': 'Stariji školski uzrast',
    'high-school': 'Srednja škola',
    'adults': 'Odrasli',
    'speed-reading': 'Brzo čitanje',
    'mental-arithmetic': 'Mentalna aritmetika',
    'concentration': 'Koncentracija i pažnja',
    'creative-writing': 'Kreativno pisanje',
    'developmental-psychology': 'Razvojna psihologija',
    'special-needs': 'Rad sa decom sa posebnim potrebama',
    'online-teaching': 'Online nastava'
  }

  const availabilityLabels = {
    'full-time': 'Puno radno vreme',
    'part-time': 'Skraćeno radno vreme',
    'freelance': 'Honorarno',
    'temporarily-unavailable': 'Privremeno nedostupan',
    'on-leave': 'Na odsustvu'
  }

  return (
    <>
      <HeroSection
        title="Naši edukatori"
        subtitle="Upoznajte naš tim stručnih edukatora koji će vašoj deci omogućiti da postanu uspešniji, samouvereniji i motivovaniji za učenje."
        ctaText="Zakažite konsultacije"
        ctaLink="/kontakt"
        secondaryCtaText="Saznajte više o našoj metodologiji"
        secondaryCtaLink="/metodologija"
      />

      <Container className="py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserGroupIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{educators.length}</div>
            <div className="text-gray-600">Ukupno edukatora</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AcademicCapIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {Math.round(educators.reduce((sum, e) => sum + (e.experience?.yearsTotal || 0), 0) / educators.length)}
            </div>
            <div className="text-gray-600">Prosečno godina iskustva</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPinIcon className="h-8 w-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {[...new Set(educators.flatMap(e => e.centers.map(c => c.city.name)))].length}
            </div>
            <div className="text-gray-600">Gradova</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ClockIcon className="h-8 w-8 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {educators.filter(e => e.availability === 'full-time').length}
            </div>
            <div className="text-gray-600">Puno radno vreme</div>
          </div>
        </div>

        {/* Featured Educators */}
        {featuredEducators.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Naši istaknuti edukatori
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Edukatori sa dugogodišnjim iskustvom i posebnim stručnostima
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEducators.map((educator) => (
                <EducatorCard key={educator._id} educator={educator} featured />
              ))}
            </div>
          </section>
        )}

        {/* All Educators */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Svi edukatori
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kompletna lista naših stručnih edukatora
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {regularEducators.map((educator) => (
              <EducatorCard key={educator._id} educator={educator} />
            ))}
          </div>
        </section>
      </Container>
    </>
  )
}

// Educator Card Component
function EducatorCard({ educator, featured = false }: { educator: Educator; featured?: boolean }) {
  const fullName = `${educator.firstName} ${educator.lastName}`

  const specializationLabels = {
    'preschool': 'Predškolski uzrast',
    'elementary': 'Mladi školski uzrast',
    'middle-school': 'Stariji školski uzrast',
    'high-school': 'Srednja škola',
    'adults': 'Odrasli',
    'speed-reading': 'Brzo čitanje',
    'mental-arithmetic': 'Mentalna aritmetika',
    'concentration': 'Koncentracija i pažnja',
    'creative-writing': 'Kreativno pisanje',
    'developmental-psychology': 'Razvojna psihologija',
    'special-needs': 'Rad sa decom sa posebnim potrebama',
    'online-teaching': 'Online nastava'
  }

  const availabilityLabels = {
    'full-time': 'Puno radno vreme',
    'part-time': 'Skraćeno radno vreme',
    'freelance': 'Honorarno',
    'temporarily-unavailable': 'Privremeno nedostupan',
    'on-leave': 'Na odsustvu'
  }

  return (
    <Link
      href={`/edukatori/${educator.slug}`}
      className={`block bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group ${
        featured ? 'ring-2 ring-blue-200' : 'hover:shadow-md'
      }`}
    >
      {featured && (
        <div className="bg-blue-600 text-white text-sm font-medium px-4 py-2 text-center">
          Istaknuti edukator
        </div>
      )}
      
      <div className="p-6">
        {/* Photo and Basic Info */}
        <div className="flex items-start space-x-4 mb-4">
          {educator.photo && (
            <div className="w-16 h-16 relative flex-shrink-0">
              <Image
                src={urlFor(educator.photo).width().height().url()}
                alt={fullName}
                fill
                className="object-cover rounded-full"
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {fullName}
            </h3>
            {educator.title && (
              <p className="text-gray-600 text-sm">{educator.title}</p>
            )}
            {educator.experience?.yearsTotal && (
              <p className="text-gray-500 text-sm mt-1">
                {educator.experience.yearsTotal} godina iskustva
              </p>
            )}
          </div>
        </div>

        {/* Short Bio */}
        {educator.shortBio && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {educator.shortBio}
          </p>
        )}

        {/* Centers */}
        {educator.centers && educator.centers.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <MapPinIcon className="h-4 w-4 mr-1" />
              <span>Radi u centrima:</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {educator.centers.slice(0, 3).map((center, index) => (
                <span key={center.slug} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {center.shortName || center.name} ({center.city.name})
                </span>
              ))}
              {educator.centers.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{educator.centers.length - 3} više
                </span>
              )}
            </div>
          </div>
        )}

        {/* Specializations */}
        {educator.specializations && educator.specializations.length > 0 && (
          <div className="mb-4">
            <div className="text-gray-500 text-sm mb-2">Specijalnosti:</div>
            <div className="flex flex-wrap gap-1">
              {educator.specializations.slice(0, 3).map((spec, index) => (
                <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {specializationLabels[spec] || spec}
                </span>
              ))}
              {educator.specializations.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{educator.specializations.length - 3} više
                </span>
              )}
            </div>
          </div>
        )}

        {/* Availability */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-500">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>{availabilityLabels[educator.availability] || educator.availability}</span>
          </div>
          
          <span className="text-blue-600 group-hover:text-blue-700 font-medium">
            Pogledaj profil →
          </span>
        </div>
      </div>
    </Link>
  )
}