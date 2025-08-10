import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client, getEducatorBySlugQuery } from '@/lib/sanity'
import { Container } from '@/components/layout/Container'
import HeroSection from '@/components/features/cms/HeroSection'
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/components/features/cms/PortableTextComponents'
import { EducatorGallery } from '@/components/educators/EducatorGallery'
import { ContactForm } from '@/components/forms/ContactForm'
import { 
  ArrowLeftIcon, 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  AcademicCapIcon,
  StarIcon,
  ClockIcon,
  BuildingOfficeIcon,
  LanguageIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'
import { urlFor } from '@/lib/sanity'

interface Props {
  params: {
    ime: string
  }
}

interface Educator {
  _id: string
  firstName: string
  lastName: string
  slug: string
  title?: string
  photo: any
  bio: any[]
  shortBio?: string
  centers: Array<{
    name: string
    slug: string
    shortName?: string
    city: {
      name: string
      slug: string
    }
  }>
  specializations: string[]
  experience: {
    yearsTotal?: number
    yearsWithCompany?: number
    previousExperience?: Array<{
      position: string
      organization: string
      duration?: string
      description?: string
    }>
  }
  education: Array<{
    degree: string
    field: string
    institution: string
    year?: number
    thesis?: string
  }>
  certifications?: Array<{
    name: string
    issuer: string
    year?: number
    description?: string
    certificate?: any
  }>
  languages?: Array<{
    language: string
    level: string
  }>
  contact?: {
    phone?: string
    email?: string
    workingHours?: string
  }
  social?: {
    linkedin?: string
    facebook?: string
    instagram?: string
    website?: string
  }
  gallery: Array<{
    asset: any
    alt: string
    caption?: string
    category?: string
  }>
  achievements?: Array<{
    title: string
    description?: string
    date?: string
    issuer?: string
    image?: any
  }>
  testimonials?: Array<{
    quote: string
    author: string
    position?: string
    photo?: any
  }>
  availability: string
  relatedEducators: Array<{
    firstName: string
    lastName: string
    slug: string
    title?: string
    photo: any
    shortBio?: string
  }>
  seo?: {
    title?: string
    description?: string
  }
}

// Generate metadata for the page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const educator = await client.fetch<Educator | null>(
    getEducatorBySlugQuery, 
    { slug: params.ime }
  )

  if (!educator) {
    return {
      title: 'Edukator nije pronađen - Srećno učenje',
      description: 'Traženi edukator nije pronađen.'
    }
  }

  const fullName = `${educator.firstName} ${educator.lastName}`
  const title = educator.seo?.title || `${fullName} - Edukator | Srećno učenje`
  const description = educator.seo?.description || 
    educator.shortBio || 
    `Upoznajte ${fullName}, iskusnog edukatora sa našim timom. ${educator.experience?.yearsTotal || 'Više'} godina iskustva u obrazovanju.`

  return {
    title,
    description,
    keywords: [fullName, 'edukator', 'srecno ucenje', ...educator.specializations],
    openGraph: {
      title,
      description,
      images: educator.photo ? [{
        url: urlFor(educator.photo).width().height().url(),
        alt: fullName
      }] : []
    }
  }
}

export default async function EducatorPage({ params }: Props) {
  const educator = await client.fetch<Educator | null>(
    getEducatorBySlugQuery, 
    { slug: params.ime }
  )

  if (!educator) {
    notFound()
  }

  const fullName = `${educator.firstName} ${educator.lastName}`

  // Labels for various fields
  const degreeLabels = {
    'elementary': 'Osnovno obrazovanje',
    'high-school': 'Srednja škola',
    'college': 'Viša škola',
    'bachelor': 'Bachelor/Osnovne studije',
    'master': 'Master/Diplomske studije',
    'phd': 'Doktorat/PhD',
    'specialization': 'Specijalizacija'
  }

  const languageLevels = {
    'basic': 'Osnovni (A1-A2)',
    'intermediate': 'Srednji (B1-B2)',
    'advanced': 'Napredni (C1-C2)',
    'native': 'Maternji'
  }

  const availabilityLabels = {
    'full-time': 'Puno radno vreme',
    'part-time': 'Skraćeno radno vreme',
    'freelance': 'Honorarno',
    'temporarily-unavailable': 'Privremeno nedostupan',
    'on-leave': 'Na odsustvu'
  }

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

  return (
    <>
      <HeroSection
        title={fullName}
        subtitle={educator.title || 'Edukator'}
        description={educator.shortBio}
        backgroundImage={educator.photo}
      />

      <Container className="py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-600 mb-8">
          <Link 
            href="/edukatori" 
            className="flex items-center hover:text-blue-600 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Svi edukatori
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{fullName}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            {educator.bio && educator.bio.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">O edukatoru</h2>
                <div className="prose prose-gray max-w-none">
                  <PortableText value={educator.bio} components={portableTextComponents} />
                </div>
              </div>
            )}

            {/* Experience */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Iskustvo</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {educator.experience?.yearsTotal && (
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {educator.experience.yearsTotal}
                    </div>
                    <div className="text-sm text-gray-600">Godina ukupno iskustva</div>
                  </div>
                )}
                
                {educator.experience?.yearsWithCompany && (
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {educator.experience.yearsWithCompany}
                    </div>
                    <div className="text-sm text-gray-600">Godina u Srećno učenje</div>
                  </div>
                )}
              </div>

              {educator.experience?.previousExperience && educator.experience.previousExperience.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Prethodno iskustvo</h3>
                  <div className="space-y-4">
                    {educator.experience.previousExperience.map((exp, index) => (
                      <div key={index} className="border-l-4 border-blue-200 pl-4">
                        <h4 className="font-medium">{exp.position}</h4>
                        <div className="text-sm text-gray-600">
                          {exp.organization}
                          {exp.duration && <span className="ml-2">• {exp.duration}</span>}
                        </div>
                        {exp.description && (
                          <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Education */}
            {educator.education && educator.education.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">
                  <AcademicCapIcon className="h-6 w-6 inline mr-2" />
                  Obrazovanje
                </h2>
                
                <div className="space-y-4">
                  {educator.education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-purple-200 pl-4">
                      <h3 className="font-medium">
                        {degreeLabels[edu.degree] || edu.degree} - {edu.field}
                      </h3>
                      <div className="text-sm text-gray-600">
                        {edu.institution}
                        {edu.year && <span className="ml-2">• {edu.year}</span>}
                      </div>
                      {edu.thesis && (
                        <p className="text-sm text-gray-600 mt-1">
                          <span className="font-medium">Tema rada:</span> {edu.thesis}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {educator.certifications && educator.certifications.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">
                  <TrophyIcon className="h-6 w-6 inline mr-2" />
                  Sertifikati i obuke
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {educator.certifications.map((cert, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-medium">{cert.name}</h3>
                      <div className="text-sm text-gray-600">
                        {cert.issuer}
                        {cert.year && <span className="ml-2">• {cert.year}</span>}
                      </div>
                      {cert.description && (
                        <p className="text-sm text-gray-600 mt-1">{cert.description}</p>
                      )}
                      {cert.certificate && (
                        <div className="mt-2">
                          <Image
                            src={urlFor(cert.certificate).width().height().url()}
                            alt="Sertifikat"
                            width={100}
                            height={70}
                            className="rounded object-cover"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {educator.achievements && educator.achievements.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">
                  <StarIcon className="h-6 w-6 inline mr-2" />
                  Postignuća i nagrade
                </h2>
                
                <div className="space-y-4">
                  {educator.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-lg">
                      <StarIcon className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-medium">{achievement.title}</h3>
                        {achievement.issuer && (
                          <p className="text-sm text-gray-600">{achievement.issuer}</p>
                        )}
                        {achievement.description && (
                          <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                        )}
                        {achievement.date && (
                          <p className="text-gray-500 text-xs mt-2">{achievement.date}</p>
                        )}
                      </div>
                      {achievement.image && (
                        <div className="w-16 h-16 relative flex-shrink-0">
                          <Image
                            src={urlFor(achievement.image).width().height().url()}
                            alt="Nagrada"
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonials */}
            {educator.testimonials && educator.testimonials.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Preporuke</h2>
                
                <div className="space-y-6">
                  {educator.testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <blockquote className="text-gray-900 mb-4">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <div className="flex items-center">
                        {testimonial.photo && (
                          <div className="w-10 h-10 relative mr-3">
                            <Image
                              src={urlFor(testimonial.photo).width().height().url()}
                              alt={testimonial.author}
                              fill
                              className="object-cover rounded-full"
                            />
                          </div>
                        )}
                        
                        <div>
                          <div className="font-medium text-sm">{testimonial.author}</div>
                          {testimonial.position && (
                            <div className="text-xs text-gray-600">{testimonial.position}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {educator.gallery && educator.gallery.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Galerija</h2>
                <EducatorGallery images={educator.gallery} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center mb-6">
                {educator.photo && (
                  <div className="w-24 h-24 relative mx-auto mb-4">
                    <Image
                      src={urlFor(educator.photo).width().height().url()}
                      alt={fullName}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                )}
                <h3 className="text-lg font-semibold">{fullName}</h3>
                {educator.title && (
                  <p className="text-gray-600">{educator.title}</p>
                )}
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <ClockIcon className="h-4 w-4 text-gray-400 mr-2" />
                  <span>{availabilityLabels[educator.availability] || educator.availability}</span>
                </div>
                
                {educator.centers && educator.centers.length > 0 && (
                  <div className="flex items-start">
                    <BuildingOfficeIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      {educator.centers.map((center, index) => (
                        <div key={center.slug}>
                          <Link 
                            href={`/centri/${center.city.slug}/${center.slug}`}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            {center.shortName || center.name}
                          </Link>
                          <span className="text-gray-500 text-xs ml-1">
                            ({center.city.name})
                          </span>
                          {index < educator.centers.length - 1 && <br />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Specializations */}
            {educator.specializations && educator.specializations.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Specijalnosti</h3>
                <div className="flex flex-wrap gap-2">
                  {educator.specializations.map((spec, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {specializationLabels[spec] || spec}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {educator.languages && educator.languages.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">
                  <LanguageIcon className="h-5 w-5 inline mr-2" />
                  Jezici
                </h3>
                <div className="space-y-2">
                  {educator.languages.map((lang, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{lang.language}</span>
                      <span className="text-gray-600">
                        {languageLevels[lang.level] || lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact */}
            {educator.contact && (educator.contact.phone || educator.contact.email) && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
                
                <div className="space-y-3">
                  {educator.contact.phone && (
                    <div className="flex items-center">
                      <PhoneIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <a 
                        href={`tel:${educator.contact.phone}`}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        {educator.contact.phone}
                      </a>
                    </div>
                  )}
                  
                  {educator.contact.email && (
                    <div className="flex items-center">
                      <EnvelopeIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <a 
                        href={`mailto:${educator.contact.email}`}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        {educator.contact.email}
                      </a>
                    </div>
                  )}
                  
                  {educator.contact.workingHours && (
                    <div className="flex items-start">
                      <ClockIcon className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                      <span className="text-sm text-gray-600">
                        {educator.contact.workingHours}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Social Links */}
            {educator.social && Object.values(educator.social).some(Boolean) && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Društvene mreže</h3>
                
                <div className="space-y-2">
                  {educator.social.linkedin && (
                    <a 
                      href={educator.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-700 text-sm"
                    >
                      LinkedIn profil →
                    </a>
                  )}
                  
                  {educator.social.website && (
                    <a 
                      href={educator.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Lični sajt →
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Quick Contact */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Kontaktirajte edukatora</h3>
              <ContactForm 
                educatorName={fullName}
                variant="compact"
              />
            </div>

            {/* Related Educators */}
            {educator.relatedEducators && educator.relatedEducators.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Ostali edukatori</h3>
                
                <div className="space-y-3">
                  {educator.relatedEducators.map((relatedEducator) => (
                    <Link 
                      key={relatedEducator.slug}
                      href={`/edukatori/${relatedEducator.slug}`}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      {relatedEducator.photo && (
                        <div className="w-10 h-10 relative flex-shrink-0">
                          <Image
                            src={urlFor(relatedEducator.photo).width().height().url()}
                            alt={`${relatedEducator.firstName} ${relatedEducator.lastName}`}
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm group-hover:text-blue-600">
                          {relatedEducator.firstName} {relatedEducator.lastName}
                        </h4>
                        {relatedEducator.title && (
                          <p className="text-xs text-gray-600 truncate">
                            {relatedEducator.title}
                          </p>
                        )}
                      </div>
                      
                      <ArrowLeftIcon className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transform rotate-180" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  )
}