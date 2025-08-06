import { Metadata } from 'next'
import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { FloatingLetters, PulseButton } from '@/components/animations'
import { getExperienceBySlug, getRelatedExperiences, getAllExperiences, type Experience } from '@/sanity/queries/experience'
import { Calendar, Car, Droplet, Shirt, DollarSign, Smartphone, Utensils, Hotel, FileText, Zap, MapPin, Clock, Lightbulb, Edit3 } from 'lucide-react'

interface Props {
  params: { slug: string }
}

// Generate static params for all experiences
export async function generateStaticParams() {
  const experiences = await getAllExperiences()
  return experiences.map((experience: Experience) => ({
    slug: experience.slug.current,
  }))
}

// Generate metadata for each experience
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const experience = await getExperienceBySlug(params.slug)
  
  if (!experience) {
    return {
      title: 'Iskustvo nije pronađeno',
    }
  }

  return {
    title: experience.seo?.metaTitle || `${experience.title} | Iskustva`,
    description: experience.seo?.metaDescription || experience.excerpt,
    keywords: experience.seo?.keywords,
    openGraph: {
      title: experience.title,
      description: experience.excerpt,
      images: experience.seo?.ogImage?.asset?.url ? [experience.seo.ogImage.asset.url] : [experience.heroImage.asset.url],
    },
  }
}

export default async function ExperiencePage({ params }: Props) {
  const experience = await getExperienceBySlug(params.slug)

  if (!experience) {
    notFound()
  }

  // Get related experiences
  const relatedExperiences = await getRelatedExperiences(experience._id)

  const difficultyConfig = {
    easy: { color: 'bg-green-100 text-green-700', label: 'Lako' },
    moderate: { color: 'bg-yellow-100 text-yellow-700', label: 'Umereno' },
    challenging: { color: 'bg-red-100 text-red-700', label: 'Izazovno' }
  }

  const tipIcons: Record<string, React.ReactNode> = {
    calendar: <Calendar size={24} />,
    car: <Car size={24} />,
    water: <Droplet size={24} />,
    clothing: <Shirt size={24} />,
    money: <DollarSign size={24} />,
    tech: <Smartphone size={24} />,
    food: <Utensils size={24} />,
    accommodation: <Hotel size={24} />,
    documents: <FileText size={24} />,
    energy: <Zap size={24} />
  }

  return (
    <main className="relative">
      {/* Hero sekcija */}
      <section className="relative min-h-screen bg-gradient-to-br from-primary-600 to-secondary-600 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={experience.heroImage.asset.url}
            alt={experience.heroImage.alt || experience.title}
            fill
            className="object-cover opacity-30"
            placeholder="blur"
            blurDataURL={experience.heroImage.asset.metadata.lqip}
          />
        </div>
        
        <FloatingLetters 
          className="opacity-20"
          count={15}
          speed="slow"
          colors={['#ffffff']}
        />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-white">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-white/80 text-sm mb-8">
              <SafeLink href="/iskustva" className="hover:text-white transition-colors">
                Iskustva
              </SafeLink>
              <span>•</span>
              <span className="text-white/60">{experience.destination}</span>
            </nav>
            
            {/* Destination badge */}
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium">
                <MapPin size={20} className="inline mr-1" /> {experience.destination}
              </span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              {experience.title}
            </h1>
            
            {/* Excerpt */}
            <p className="text-xl lg:text-2xl leading-relaxed mb-8 opacity-90">
              {experience.excerpt}
            </p>
            
            {/* Meta grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm text-white/70 mb-1">Trajanje</div>
                <div className="font-semibold text-lg">{experience.metadata.duration}</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm text-white/70 mb-1">Najbolje vreme</div>
                <div className="font-semibold text-lg">{experience.metadata.bestTime}</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-sm text-white/70 mb-1">Nivo težine</div>
                <div className="flex items-center gap-2">
                  <span>{difficultyConfig[experience.metadata.difficulty].icon}</span>
                  <span className="font-semibold">{difficultyConfig[experience.metadata.difficulty].label}</span>
                </div>
              </div>
            </div>
            
            {/* Author info */}
            <div className="flex items-center gap-4 text-white/80">
              {experience.authorInfo.image && (
                <Image
                  src={experience.authorInfo.image.asset.url}
                  alt={experience.authorInfo.name}
                  width={56}
                  height={56}
                  className="rounded-full border-2 border-white/20"
                  placeholder="blur"
                  blurDataURL={experience.authorInfo.image.asset.metadata.lqip}
                />
              )}
              <div>
                <p className="font-medium text-white text-lg">{experience.authorInfo.name}</p>
                <p className="text-sm text-white/70">
                  {new Date(experience.publishedDate).toLocaleDateString('sr-RS', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Glavni sadržaj */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              {experience.content && (
                <PortableText 
                  value={experience.content}
                  components={{
                    block: {
                      h1: ({children}) => <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-12">{children}</h1>,
                      h2: ({children}) => <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-10">{children}</h2>,
                      h3: ({children}) => <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">{children}</h3>,
                      normal: ({children}) => <p className="text-gray-700 leading-relaxed mb-6">{children}</p>,
                    },
                    marks: {
                      strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
                      em: ({children}) => <em className="italic">{children}</em>,
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Poglavlja */}
      {experience.chapters && experience.chapters.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                Poglavlja
              </h2>
              
              <div className="space-y-12">
                {experience.chapters.map((chapter, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-bold">{index + 1}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {chapter.title}
                      </h3>
                    </div>
                    
                    <div className="prose prose-lg max-w-none">
                      <PortableText 
                        value={chapter.content}
                        components={{
                          block: {
                            normal: ({children}) => <p className="text-gray-700 leading-relaxed mb-4">{children}</p>,
                          },
                          marks: {
                            strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
                            em: ({children}) => <em className="italic">{children}</em>,
                          }
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Galerija */}
      {experience.gallery && experience.gallery.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                Galerija
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experience.gallery.map((image, index) => (
                  <div key={index} className="relative aspect-square overflow-hidden rounded-xl group">
                    <Image
                      src={image.asset.url}
                      alt={image.alt || `Galerija slika ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      placeholder="blur"
                      blurDataURL={image.asset.metadata.lqip}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Praktični saveti */}
      {experience.tips && experience.tips.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
                Praktični saveti
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {experience.tips.map((tip, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        {tipIcons[tip.icon] || <Lightbulb size={24} />}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {tip.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* O autoru */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-start gap-6">
                {experience.authorInfo.image && (
                  <Image
                    src={experience.authorInfo.image.asset.url}
                    alt={experience.authorInfo.name}
                    width={100}
                    height={100}
                    className="rounded-full"
                    placeholder="blur"
                    blurDataURL={experience.authorInfo.image.asset.metadata.lqip}
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    O autoru: {experience.authorInfo.name}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {experience.authorInfo.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Povezana iskustva */}
      {relatedExperiences && relatedExperiences.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Povezana iskustva
                </h2>
                <p className="text-lg text-gray-600">
                  Istražite više iskustava iz našse kolekcije
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedExperiences.map((relatedExperience) => (
                  <SafeLink                     key={relatedExperience._id}
                    href={`/iskustva/${relatedExperience.slug?.current || 'no-slug'}`}
                    className="group"
                  >
                    <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:transform group-hover:scale-105">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={relatedExperience.heroImage.asset.url}
                          alt={relatedExperience.heroImage.alt || relatedExperience.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          placeholder="blur"
                          blurDataURL={relatedExperience.heroImage.asset.metadata.lqip}
                        />
                        
                        <div className="absolute top-4 left-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700">
                            <MapPin size={16} className="inline mr-1" /> {relatedExperience.destination}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                          {relatedExperience.title}
                        </h3>
                        
                        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                          {relatedExperience.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span><Edit3 size={14} className="inline mr-1" /> {relatedExperience.authorInfo.name}</span>
                          <span><Clock size={14} className="inline mr-1" /> {relatedExperience.metadata.duration}</span>
                        </div>
                      </div>
                    </article>
                  </SafeLink>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA sekcija */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 relative overflow-hidden">
        <FloatingLetters 
          className="opacity-10"
          count={20}
          speed="medium"
          colors={['#ffffff']}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Istražite više iskustava
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Otkrijte još priča i iskustava koja inspirišu
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SafeLink href="/iskustva">
                <PulseButton 
                  variant="accent"
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100"
                >
                  Sva iskustva
                </PulseButton>
              </SafeLink>
              
              <SafeLink href="/kontakt">
                <PulseButton 
                  variant="secondary"
                  size="lg"
                  className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-900"
                >
                  Podelite svoje iskustvo
                </PulseButton>
              </SafeLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}