'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FloatingLetters, AnimatedTitle, PulseButton } from '@/components/animations'
import { Experience } from '@/sanity/queries/experience'

interface ExperiencesClientProps {
  experiences: Experience[]
  featuredExperiences: Experience[]
}

export default function ExperiencesClient({ experiences, featuredExperiences }: ExperiencesClientProps) {
  const featuredExperience = featuredExperiences[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-secondary-50 to-warm-50 opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <FloatingLetters text="Iskustva" className="text-primary-600" />
            
            <AnimatedTitle 
              text="Putovanja i priče iz sveta" 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            />
            
            <p className="text-xl text-gray-600 mb-8">
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

      {/* Featured Experience */}
      {featuredExperience && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Izdvojeno iskustvo
                </h2>
                <p className="text-gray-600">
                  Najnovija priča iz naših putovanja
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl overflow-hidden shadow-xl">
                <div className="grid lg:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-64 lg:h-full">
                    {featuredExperience.featuredImage?.asset?.url && (
                      <Image
                        src={featuredExperience.featuredImage.asset.url}
                        alt={featuredExperience.featuredImage?.alt || featuredExperience.title}
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                        {featuredExperience.location}
                      </span>
                      {featuredExperience.duration && (
                        <span className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium">
                          {featuredExperience.duration}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                      {featuredExperience.title}
                    </h3>

                    <p className="text-gray-600 mb-6">
                      {featuredExperience.excerpt}
                    </p>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-sm text-gray-500">
                        {new Date(featuredExperience.date).toLocaleDateString('sr-RS', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>

                    <Link href={`/iskustva/${featuredExperience.slug?.current || 'no-slug'}`}>
                      <PulseButton 
                        variant="primary"
                        size="lg"
                      >
                        Pročitajte više
                      </PulseButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Experiences Grid */}
      <section id="all-experiences" className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sva iskustva
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Istražite našu kolekciju putovanja, radionica i posebnih događaja
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((experience) => (
              <Link
                key={experience._id}
                href={`/iskustva/${experience.slug?.current || 'no-slug'}`}
                className="group"
              >
                <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    {experience.featuredImage?.asset?.url ? (
                      <Image
                        src={experience.featuredImage.asset.url}
                        alt={experience.featuredImage?.alt || experience.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100" />
                    )}
                    
                    {/* Location badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700">
                        {experience.location}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-primary-600 font-medium">
                        {experience.experienceType === 'travel' && '✈️ Putovanje'}
                        {experience.experienceType === 'workshop' && '🎨 Radionica'}
                        {experience.experienceType === 'conference' && '🎓 Konferencija'}
                        {experience.experienceType === 'event' && '🎉 Događaj'}
                      </span>
                      {experience.duration && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{experience.duration}</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {experience.title}
                    </h3>

                    <p className="text-gray-600 line-clamp-2 mb-4">
                      {experience.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {new Date(experience.date).toLocaleDateString('sr-RS', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      
                      <span className="text-primary-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Čitaj više
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-secondary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Imate priču sa putovanja?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Podelite svoja iskustva sa našom zajednicom i inspirišite druge
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakt">
              <PulseButton 
                variant="primary"
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100"
              >
                Podelite iskustvo
              </PulseButton>
            </Link>
            
            <PulseButton 
              variant="secondary"
              size="lg"
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-900"
              onClick={() => {
                window.open('/newsletter', '_blank')
              }}
            >
              Prijavite se za novosti
            </PulseButton>
          </div>
        </div>
      </section>
    </div>
  )
}