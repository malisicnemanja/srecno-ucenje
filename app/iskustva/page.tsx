import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FloatingLetters, AnimatedTitle, PulseButton } from '@/components/animations'
import { getAllExperiences, getFeaturedExperiences, type Experience } from '@/sanity/queries/experience'
import { StarIcon, LocationIcon, ClockIcon, CalendarIcon, PlaneIcon, DifficultyEasyIcon, DifficultyMediumIcon, DifficultyHardIcon } from '@/components/icons/SimpleIcons'

export const metadata: Metadata = {
  title: 'Iskustva | Srećno učenje',
  description: 'Putovanja, iskustva i priče iz sveta koje inspirišu i obogaćuju obrazovni proces.',
  keywords: ['iskustva', 'putovanja', 'edukacija', 'kultura', 'inspiracija'],
}

export default async function ExperiencesPage() {
  // Fetch data using our new queries
  const [experiences, featuredExperiences] = await Promise.all([
    getAllExperiences(),
    getFeaturedExperiences()
  ])

  const featuredExperience = featuredExperiences?.[0] || null

  const difficultyConfig = {
    easy: { color: 'bg-green-100 text-green-700', label: 'Lako', icon: DifficultyEasyIcon },
    moderate: { color: 'bg-yellow-100 text-yellow-700', label: 'Umereno', icon: DifficultyMediumIcon },
    challenging: { color: 'bg-red-100 text-red-700', label: 'Izazovno', icon: DifficultyHardIcon }
  }

  return (
    <main className="relative">
      {/* Hero sekcija */}
      <section className="relative min-h-[60vh] bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 overflow-hidden">
        <FloatingLetters 
          className="opacity-20"
          count={15}
          speed="slow"
          letters={['С', 'В', 'Е', 'Т']}
        />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedTitle 
              text="Iskustva iz sveta"
              className="text-4xl lg:text-6xl font-bold mb-6"
            />
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
              Putovanja, iskustva i priče iz sveta koje inspirišu i obogaćuju obrazovni proces
            </p>
            
            <PulseButton 
              variant="primary"
              size="lg"
              onClick={() => {
                const experiencesSection = document.getElementById('all-experiences')
                experiencesSection?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Istražite iskustva
            </PulseButton>
          </div>
        </div>
      </section>

      {/* Istaknuto iskustvo */}
      {featuredExperience && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Istaknuto iskustvo
                </h2>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Slika */}
                  <div className="relative h-64 lg:h-auto">
                    <Image
                      src={featuredExperience.heroImage.asset.url}
                      alt={featuredExperience.heroImage.alt || featuredExperience.title}
                      fill
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={featuredExperience.heroImage.asset.metadata.lqip}
                    />
                    
                    {/* Featured badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-accent-500 text-white">
                        <StarIcon size={16} color="white" />
                        <span>Istaknuto iskustvo</span>
                      </span>
                    </div>
                    
                    {/* Difficulty badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                        difficultyConfig[featuredExperience.metadata.difficulty].color
                      }`}>
                        {React.createElement(difficultyConfig[featuredExperience.metadata.difficulty].icon, { size: 16 })}
                        <span>{difficultyConfig[featuredExperience.metadata.difficulty].label}</span>
                      </span>
                    </div>
                  </div>
                  
                  {/* Sadržaj */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="mb-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
                        <LocationIcon size={16} />
                        <span>{featuredExperience.destination}</span>
                      </span>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                      {featuredExperience.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {featuredExperience.excerpt}
                    </p>
                    
                    {/* Meta informacije */}
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-6">
                      <div>
                        <span className="font-medium text-gray-700">Trajanje:</span>
                        <br />
                        {featuredExperience.metadata.duration}
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Najbolje vreme:</span>
                        <br />
                        {featuredExperience.metadata.bestTime}
                      </div>
                    </div>
                    
                    {/* Autor */}
                    <div className="flex items-center gap-3 mb-6">
                      {featuredExperience.authorInfo.image && (
                        <Image
                          src={featuredExperience.authorInfo.image.asset.url}
                          alt={featuredExperience.authorInfo.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                          placeholder="blur"
                          blurDataURL={featuredExperience.authorInfo.image.asset.metadata.lqip}
                        />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{featuredExperience.authorInfo.name}</p>
                        <p className="text-sm text-gray-500">Autor iskustva</p>
                      </div>
                    </div>
                    
                    <PulseButton 
                      variant="primary"
                      size="lg"
                      onClick={() => window.location.href = `/iskustva/${featuredExperience.slug.current}`}
                    >
                      Pročitajte više
                    </PulseButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sva iskustva */}
      <section id="all-experiences" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Sva iskustva
              </h2>
              <p className="text-lg text-gray-600">
                Istražite našu kolekciju iskustava iz različitih delova sveta
              </p>
            </div>
            
            {experiences && experiences.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {experiences
                  .filter(experience => !experience.featured) // Ne prikazuj istaknuto iskustvo ponovo
                  .map((experience) => (
                    <Link
                      key={experience._id}
                      href={`/iskustva/${experience.slug.current}`}
                      className="group"
                    >
                      <article className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group-hover:transform group-hover:scale-105">
                        {/* Slika iskustva */}
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={experience.heroImage.asset.url}
                            alt={experience.heroImage.alt || experience.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            placeholder="blur"
                            blurDataURL={experience.heroImage.asset.metadata.lqip}
                          />
                          
                          {/* Destination overlay */}
                          <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-700">
                              <LocationIcon size={14} />
                              <span>{experience.destination}</span>
                            </span>
                          </div>
                          
                          {/* Difficulty overlay */}
                          <div className="absolute top-4 right-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              difficultyConfig[experience.metadata.difficulty].color
                            }`}>
                              {React.createElement(difficultyConfig[experience.metadata.difficulty].icon, { size: 14 })}
                            </span>
                          </div>
                        </div>
                        
                        {/* Sadržaj */}
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                            {experience.title}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                            {experience.excerpt}
                          </p>
                          
                          {/* Meta */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <ClockIcon size={12} />
                                <span>{experience.metadata.duration}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <CalendarIcon size={12} />
                                <span>{experience.metadata.bestTime}</span>
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>{experience.authorInfo.name}</span>
                              <span>•</span>
                              <span>{new Date(experience.publishedDate).toLocaleDateString('sr-RS')}</span>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="flex justify-center mb-4">
                  <PlaneIcon size={64} color="#6B7280" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Nema objavljenih iskustava
                </h3>
                <p className="text-gray-500">
                  Prvi članci o iskustvima će biti objavljeni uskoro. Pratite nas!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter sekcija */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 relative overflow-hidden">
        <FloatingLetters 
          className="opacity-10"
          count={20}
          speed="medium"
          colors={['#ffffff']}
          letters={['П', 'У', 'Т', 'О', 'В', 'А', 'Њ', 'Е']}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Podelite svoja iskustva
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Imate zanimljivo putovanje ili iskustvo koje bi moglo da inspiriše druge?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PulseButton 
                variant="accent"
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-100"
                onClick={() => window.location.href = '/kontakt'}
              >
                Kontaktirajte nas
              </PulseButton>
              
              <PulseButton 
                variant="secondary"
                size="lg"
                className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary-600"
                onClick={() => {
                  const newsletterSection = document.getElementById('newsletter')
                  newsletterSection?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Prijavite se na newsletter
              </PulseButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}