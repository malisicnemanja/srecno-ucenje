'use client'

interface PricingPlan {
  name: string
  price: string
  currency?: string
  period?: string
  features: string[]
  featured?: boolean
  buttonText?: string
}

interface PricingSectionProps {
  title: string
  subtitle?: string
  plans: PricingPlan[]
  ctaLink?: string
}

export default function PricingSection({ 
  title, 
  subtitle, 
  plans, 
  ctaLink = '/kontakt' 
}: PricingSectionProps) {
  return (
    <section className="l-section">
      <div className="o-container">
        <h2 className="u-h2 u-text-center u-m-b-md">{title}</h2>
        {subtitle && (
          <p className="u-text-lg u-text-secondary u-text-center u-m-b-xl">{subtitle}</p>
        )}
        <div className="c-pricing-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`c-pricing-card ${
                plan.featured
                  ? 'c-pricing-card--featured'
                  : 'c-pricing-card--default'
              }`}
            >
              <h3 className="c-pricing-card__title">{plan.name}</h3>
              <div className="c-pricing-card__price">
                {plan.price} {plan.currency || 'RSD'}
                {plan.period && (
                  <span className="c-pricing-card__period">/{plan.period}</span>
                )}
              </div>
              <ul className="c-pricing-card__features">
                {plan.features.map((feature, i) => (
                  <li key={i} className="c-pricing-card__feature">
                    <span className={`c-pricing-card__check ${plan.featured ? 'c-pricing-card__check--featured' : 'c-pricing-card__check--default'}`}>
                      ✓
                    </span>
                    <span className="c-pricing-card__feature-text">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={ctaLink || '/'}
                className={`btn ${
                  plan.featured
                    ? 'btn-card-outline'
                    : 'btn-hero-grass'
                }`}
              >
                {plan.buttonText || 'Izaberite Paket'}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}