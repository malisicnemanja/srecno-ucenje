import { PartnershipIcon, TrendingUpIcon } from '@/components/icons'
import { homePageQuery } from '@/lib/sanity.queries'
import { sanityFetch } from '@/lib/sanity.client'

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
        text: "Zakaži",
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
      {/* Hero Section */}
      <section className="c-hero-home">
        <div className="o-container c-hero-home__container">
          <div className="c-hero-home__content">
            <h1 className="c-hero-home__title">
              {pageData.hero?.title || fallbackData.hero.title}
            </h1>
            <p className="c-hero-home__subtitle">
              {pageData.hero?.subtitle || fallbackData.hero.subtitle}
            </p>
            <div className="c-hero-home__actions">
              <a href="/kontakt" className="btn btn--primary btn-lg">
                Zakaži razgovor
              </a>
              <a href="/o-nama" className="btn btn--outline btn--outline-primary btn-lg">
                Saznaj više
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="l-section bg-white">
        <div className="container">
          <div className="o-grid o-grid--4 o-grid--gap-lg">
            {(pageData.features || fallbackData.features).map((feature: any, i: number) => (
              <div key={i} className="c-feature-item">
                <div className="c-feature-item__icon">
                  {feature.icon === 'partnership' ? (
                    <PartnershipIcon size={32} className="c-feature-item__svg" />
                  ) : feature.icon === 'trending' ? (
                    <TrendingUpIcon size={32} className="c-feature-item__svg" />
                  ) : (
                    <span className="c-feature-item__emoji">{feature.icon}</span>
                  )}
                </div>
                <h3 className="c-feature-item__title">{feature.title}</h3>
                <p className="c-feature-item__description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
