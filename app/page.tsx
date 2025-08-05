import { PartnershipIcon, TrendingUpIcon } from '@/components/icons'
import { homePageQuery } from '@/lib/sanity.queries'
import { sanityFetch } from '@/lib/sanity.client'
import FlexibleHeroSection from '@/components/features/cms/FlexibleHeroSection'

export default async function HomePage() {
  // Fetch data from Sanity
  const data = await sanityFetch({ query: homePageQuery })
  
  // Fallback data if Sanity is empty
  const fallbackData = {
    hero: {
      layout: 'centered',
      title: "Otvori vrata svojoj učionici iz snova",
      subtitle: "Postanite deo mreže koja je već inspirisala 20.000+ dece da uče srcem kroz metodologiju Srećnog učenja",
      titleVariants: ["snova", "budućnosti", "maštanja", "inspiracije"],
      brushStrokeWords: ["vrata", "učionici", "snova"],
      animationSettings: {
        enableBrushStrokes: true,
        enableTextRotation: true,
        brushStrokeColor: '#FDD835',
        rotationSpeed: 3000,
        brushStrokeDelay: 1000
      },
      svgBadge: {
        show: true,
        text: "Proveren pristup",
        color: "green",
        position: "above"
      },
      primaryCta: {
        text: "Zakaži 30-min poziv",
        href: "/kontakt"
      },
      secondaryCta: {
        text: "Preuzmi info-paket",
        href: "/kako-se-pridruziti"
      },
      features: [
        { icon: "✓", text: "20.000+ dece u 10 zemalja" },
        { icon: "✓", text: "Kompletna podrška i obuke" },
        { icon: "✓", text: "Dokazana uspešnost" }
      ],
      backgroundType: 'pattern',
      backgroundPattern: 'dots'
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
      {/* Flexible Hero Section */}
      <FlexibleHeroSection 
        data={pageData.hero || fallbackData.hero}
      />

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
