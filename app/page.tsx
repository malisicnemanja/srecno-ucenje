import { PartnershipIcon, TrendingUpIcon, BrainIcon, HeartIcon } from '@/components/icons'
import { homePageQuery } from '@/lib/sanity.queries'
import { sanityFetch } from '@/lib/sanity.client'
import HeroSection from '@/components/features/cms/HeroSection'
import type { HeroSectionProps } from '@/components/features/cms/HeroSection'
import Link from 'next/link'
import { Metadata } from 'next'
import { 
  Users, MapPin, TrendingUp, Calendar, 
  Phone, Check, Book, Rocket,
  Brain, HeartHandshake, Award, Heart,
  ChevronDown, ArrowRight
} from 'lucide-react'

// Generate metadata from CMS data
export async function generateMetadata(): Promise<Metadata> {
  try {
    const pageData = await sanityFetch({ query: homePageQuery })
    
    return {
      title: pageData?.seo?.metaTitle || pageData?.enhancedHero?.title || 'Srećno učenje - Franšiza',
      description: pageData?.seo?.metaDescription || pageData?.enhancedHero?.subtitle || 'Pokrenite obrazovnu franšizu Srećno učenje',
      keywords: pageData?.seo?.keywords || 'franšiza, obrazovanje, deca, učenje',
      openGraph: {
        title: pageData?.seo?.metaTitle || pageData?.enhancedHero?.title || 'Srećno učenje',
        description: pageData?.seo?.metaDescription || pageData?.enhancedHero?.subtitle || 'Pokrenite obrazovnu franšizu',
        images: pageData?.seo?.ogImage ? [{ url: pageData.seo.ogImage }] : [],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Srećno učenje - Franšiza',
      description: 'Pokrenite obrazovnu franšizu Srećno učenje'
    }
  }
}

export default async function HomePage() {
  // Fetch all content from CMS on server side
  let pageData: any = null
  
  try {
    pageData = await sanityFetch({ query: homePageQuery })
  } catch (error) {
    console.error('Error fetching CMS data:', error)
  }

  // Show error state if no CMS data
  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">CMS podaci nisu dostupni</h1>
          <p className="text-gray-600">Molimo pokušajte ponovo kasnije ili kontaktirajte podršku.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section - CMS Driven */}
      {pageData.enhancedHero && (
        <HeroSection 
          title={pageData.enhancedHero.title}
          subtitle={pageData.enhancedHero.subtitle || pageData.enhancedHero.description}
          ctaText={pageData.enhancedHero.buttons?.[0]?.text}
          ctaLink={pageData.enhancedHero.buttons?.[0]?.link}
          secondaryCtaText={pageData.enhancedHero.buttons?.[1]?.text}
          secondaryCtaLink={pageData.enhancedHero.buttons?.[1]?.link}
          backgroundImage={pageData.enhancedHero.image}
          gradient="bg-gradient-to-br from-sky-600 to-sky-700"
        />
      )}

      {/* Statistics Section */}
      {pageData.statistics && pageData.statistics.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-sky-500 via-sky-600 to-sky-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {pageData.statistics.map((stat: any, index: number) => {
                const IconComponent = stat.icon === 'users' ? Users :
                  stat.icon === 'location' ? MapPin :
                  stat.icon === 'chart' ? TrendingUp :
                  stat.icon === 'calendar' ? Calendar :
                  Award;
                
                return (
                  <div key={stat._key || stat.number} className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="flex justify-center mb-3">
                      <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                        <IconComponent size={32} className="text-white" />
                      </div>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2 animate-pulse">
                      {stat.number || stat.value}
                    </div>
                    <div className="text-white/90 text-sm md:text-base font-medium">
                      {stat.label}
                    </div>
                    {stat.description && (
                      <div className="text-white/70 text-xs mt-1">
                        {stat.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Features Grid - Updated to use solid colors */}
      <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
        {/* Background decorations - No gradients */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-sky-100 rounded-full opacity-30 animate-gentle-float"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-sun-100 rounded-full opacity-30 animate-float-delayed"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header - CMS driven */}
          <div className="text-center mb-16">
            <h2 className="text-h2-mobile md:text-h2-tablet lg:text-h2-desktop font-bold text-night-700 mb-4">
              {pageData.differentiators?.sectionTitle || 'Naše prednosti'}
            </h2>
            {pageData.differentiators?.subtitle && (
              <p className="text-body-mobile md:text-body-tablet text-gray-600 max-w-2xl mx-auto">
                {pageData.differentiators.subtitle}
              </p>
            )}
          </div>
          
          {/* Features Grid - Mobile responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {pageData.differentiators?.items?.map((feature: any, i: number) => {
              const colors = [
                { bg: 'bg-sky-50', border: 'border-sky-200', icon: 'text-sky-600', accent: 'bg-sky-500' },
                { bg: 'bg-grass-50', border: 'border-grass-200', icon: 'text-grass-600', accent: 'bg-grass-500' },
                { bg: 'bg-sun-50', border: 'border-sun-200', icon: 'text-sun-600', accent: 'bg-sun-500' },
                { bg: 'bg-heart-50', border: 'border-heart-200', icon: 'text-heart-600', accent: 'bg-heart-500' }
              ][i % 4]
              
              return (
                <div 
                  key={feature._key || i} 
                  className={`group relative p-6 ${colors.bg} ${colors.border} border-2 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer`}
                >
                  {/* Hover accent */}
                  <div className={`absolute top-0 left-6 w-12 h-1 ${colors.accent} rounded-b-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 ${colors.accent} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon === 'partnership' ? (
                      <HeartHandshake size={24} className="text-white" />
                    ) : feature.icon === 'trending' ? (
                      <TrendingUp size={24} className="text-white" />
                    ) : feature.icon === 'brain' ? (
                      <Brain size={24} className="text-white" />
                    ) : feature.icon === 'heart' ? (
                      <Heart size={24} className="text-white" />
                    ) : (
                      <Award size={24} className="text-white" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-h3-mobile font-bold text-night-700 mb-2 group-hover:text-sky-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-small-mobile md:text-body-tablet text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Decorative dot */}
                  <div className={`absolute bottom-4 right-4 w-2 h-2 ${colors.accent} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
              )
            })}
          </div>
          
          {/* Call to Action - CMS driven */}
          {pageData.newsletterCTA && (
            <div className="text-center mt-16">
              <div className="inline-flex items-center gap-4 px-6 py-3 bg-sky-50 rounded-full border border-sky-200">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`w-8 h-8 bg-${['sky', 'sun', 'grass', 'heart'][i-1]}-400 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                      {i}
                    </div>
                  ))}
                </div>
                <div className="text-sm font-medium text-night-700">{pageData.newsletterCTA.title}</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Franchise Steps Timeline */}
      {pageData.franchiseSteps && pageData.franchiseSteps.steps && (
        <section className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-h2-mobile md:text-h2-tablet lg:text-h2-desktop font-bold text-night-700 mb-4">
                {pageData.franchiseSteps.sectionTitle}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {pageData.franchiseSteps.steps.map((step: any, index: number) => {
                const colors = [
                  { bg: 'bg-sky-500', light: 'bg-sky-50', border: 'border-sky-200' },
                  { bg: 'bg-grass-500', light: 'bg-grass-50', border: 'border-grass-200' },
                  { bg: 'bg-sun-500', light: 'bg-sun-50', border: 'border-sun-200' },
                  { bg: 'bg-heart-500', light: 'bg-heart-50', border: 'border-heart-200' }
                ][index % 4]
                
                return (
                  <div key={step._key || index} className="text-center relative">
                    {/* Step Number */}
                    <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-6 relative z-10`}>
                      <span className="text-2xl font-bold text-white">{step.number || index + 1}</span>
                    </div>
                    
                    {/* Connecting line (for desktop) */}
                    {index < pageData.franchiseSteps.steps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-300 -z-10" 
                           style={{ transform: 'translateX(50%)' }} />
                    )}
                    
                    {/* Content */}
                    <div className={`${colors.light} ${colors.border} border-2 rounded-xl p-6`}>
                      {step.icon && (
                        <div className="mb-4 flex justify-center">
                          {step.icon === 'phone' ? (
                            <Phone size={32} className="text-sky-600" />
                          ) : step.icon === 'check' ? (
                            <Check size={32} className="text-grass-600" />
                          ) : step.icon === 'book' ? (
                            <Book size={32} className="text-sun-600" />
                          ) : step.icon === 'rocket' ? (
                            <Rocket size={32} className="text-heart-600" />
                          ) : (
                            <Award size={32} className="text-sky-600" />
                          )}
                        </div>
                      )}
                      <h3 className="text-h3-mobile font-bold text-night-700 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-small-mobile md:text-body-tablet text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Success Stories */}
      {pageData.successStories && pageData.successStories.stories && pageData.successStories.stories.length > 0 && (
        <section className="py-20 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-h2-mobile md:text-h2-tablet lg:text-h2-desktop font-bold text-night-700 mb-4">
                {pageData.successStories.sectionTitle}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pageData.successStories.stories.slice(0, 3).map((story: any, index: number) => (
                <div key={story._key || index} className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                  {story.image && (
                    <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
                      <img 
                        src={story.image} 
                        alt={story.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="text-center mb-4">
                    <h3 className="text-h3-mobile font-bold text-night-700 mb-1">{story.name}</h3>
                    <p className="text-sm text-gray-600">
                      {story.role} • {story.location}
                    </p>
                    {story.yearStarted && (
                      <p className="text-xs text-gray-500 mt-1">Od {story.yearStarted}</p>
                    )}
                  </div>
                  
                  <p className="text-small-mobile text-gray-700 mb-4 italic">
                    "{story.story}"
                  </p>
                  
                  {story.metric && (
                    <div className="text-center pt-4 border-t border-gray-100">
                      <div className="text-2xl font-bold text-sky-600">{story.metric.value}</div>
                      <div className="text-xs text-gray-600">{story.metric.label}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {pageData.homeFaqs && pageData.homeFaqs.faqs && pageData.homeFaqs.faqs.length > 0 && (
        <section className="py-20 lg:py-32 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-h2-mobile md:text-h2-tablet lg:text-h2-desktop font-bold text-night-700 mb-4">
                {pageData.homeFaqs.sectionTitle}
              </h2>
            </div>
            
            <div className="space-y-4">
              {pageData.homeFaqs.faqs.slice(0, 6).map((faq: any, index: number) => (
                <details key={faq._id || index} className="bg-white rounded-xl border border-gray-200 group">
                  <summary className="p-6 cursor-pointer hover:bg-gray-50 rounded-xl transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-h3-mobile font-semibold text-night-700 pr-4">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0 w-6 h-6 text-sky-600">
                        <ChevronDown className="w-full h-full transform group-open:rotate-180 transition-transform duration-200" />
                      </div>
                    </div>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-body-mobile text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                href="/cesta-pitanja" 
                className="inline-flex items-center px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 transition-colors duration-200"
              >
                Pogledajte sva pitanja
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      {pageData.newsletterCTA && (
        <section className="py-20 bg-gradient-to-br from-sky-600 to-sky-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-h2-mobile md:text-h2-tablet text-white font-bold mb-4">
              {pageData.newsletterCTA.title}
            </h2>
            {pageData.newsletterCTA.description && (
              <p className="text-body-mobile md:text-body-tablet text-white/90 mb-6">
                {pageData.newsletterCTA.description}
              </p>
            )}
            {pageData.newsletterCTA.incentive && (
              <p className="text-small-mobile md:text-body-tablet text-white/80 mb-8">
                {pageData.newsletterCTA.incentive}
              </p>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Vaša email adresa" 
                className="flex-1 px-4 py-3 rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-300"
              />
              <button className="px-8 py-3 bg-white text-sky-700 font-semibold rounded-lg hover:bg-gray-50 hover:scale-105 transition-all duration-200 flex items-center justify-center group">
                {pageData.newsletterCTA.ctaText || 'Prijavite se'}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
