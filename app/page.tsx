import { PartnershipIcon, TrendingUpIcon } from '@/components/icons'
import { homePageQuery } from '@/lib/sanity.queries'
import { sanityFetch } from '@/lib/sanity.client'

export default async function HomePage() {
  // Fetch data from Sanity
  const data = await sanityFetch({ query: homePageQuery })
  
  // Fallback data if Sanity is empty
  const fallbackData = {
    hero: {
      title: "Otvori vrata svojoj učionici iz snova",
      subtitle: "Postanite deo mreže koja je već inspirisala 20.000+ dece da uče srcem kroz metodologiju Srećnog učenja",
      buttons: [
        { text: "Zakaži 30-min poziv", link: "/kontakt", variant: "primary" },
        { text: "Preuzmi info-paket", link: "/kako-se-pridruziti", variant: "outline" }
      ]
    },
    features: [
      { icon: "✓", title: "Testiran model", description: "20.000+ dece u 10 zemalja" },
      { icon: "partnership", title: "Kompletna podrška", description: "Obuke, mentorstvo, materijali" },
      { icon: "🌱", title: "Podsticajna sredina", description: "Prostor koji razvija vrline" },
      { icon: "trending", title: "Dokazana uspešnost", description: "Merljivi rezultati" }
    ]
  }
  
  const pageData = data || fallbackData
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {pageData.hero?.title || fallbackData.hero.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {pageData.hero?.subtitle || fallbackData.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {(pageData.hero?.buttons || fallbackData.hero.buttons).map((button: any, i: number) => (
              <a 
                key={i}
                href={button.link} 
                className={button.variant === 'primary' ? 'btn-primary' : 'btn-outline-primary'}
              >
                {button.text}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {(pageData.features || fallbackData.features).map((feature: any, i: number) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon === 'partnership' ? (
                    <PartnershipIcon size={32} className="text-primary" />
                  ) : feature.icon === 'trending' ? (
                    <TrendingUpIcon size={32} className="text-primary" />
                  ) : (
                    <span className="text-3xl">{feature.icon}</span>
                  )}
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
