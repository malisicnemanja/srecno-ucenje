import { PartnershipIcon, TrendingUpIcon } from '@/components/icons'
import { homePageQuery } from '@/lib/sanity.queries'
import { sanityFetch } from '@/lib/sanity.client'
import HeroSection from '@/components/features/cms/HeroSection'
import type { HeroSectionProps } from '@/components/features/cms/HeroSection'

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
          subtitle={pageData.enhancedHero.subtitle}
          ctaText={pageData.enhancedHero.buttons?.[0]?.text}
          ctaLink={pageData.enhancedHero.buttons?.[0]?.link}
          secondaryCtaText={pageData.enhancedHero.buttons?.[1]?.text}
          secondaryCtaLink={pageData.enhancedHero.buttons?.[1]?.link}
          gradient="bg-brand-sky bg-opacity-90"
        />
      )}

      {/* Statistics Section */}
      {pageData.statistics && pageData.statistics.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-sky-500 via-sky-600 to-sky-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {pageData.statistics.map((stat: any, i: number) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/80 text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
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
                  key={i} 
                  className={`group relative p-6 ${colors.bg} ${colors.border} border-2 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer`}
                >
                  {/* Hover accent */}
                  <div className={`absolute top-0 left-6 w-12 h-1 ${colors.accent} rounded-b-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 ${colors.accent} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon === 'partnership' ? (
                      <PartnershipIcon size={24} className="text-white" />
                    ) : feature.icon === 'trending' ? (
                      <TrendingUpIcon size={24} className="text-white" />
                    ) : (
                      <span className="text-2xl text-white">{feature.icon}</span>
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
    </>
  )
}
