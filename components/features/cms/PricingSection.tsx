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
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-night-900">{title}</h2>
        {subtitle && (
          <p className="text-lg sm:text-xl text-night-600 text-center mb-8 sm:mb-12">{subtitle}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-lg p-6 sm:p-8 transition-all duration-300 ${
                plan.featured
                  ? 'bg-grass-600 text-white transform scale-100 sm:scale-105 ring-4 ring-sun-400 ring-opacity-50'
                  : 'bg-white hover:shadow-xl'
              }`}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="text-2xl sm:text-3xl font-bold mb-6">
                {plan.price} {plan.currency || 'RSD'}
                {plan.period && (
                  <span className="text-sm sm:text-base font-normal">/{plan.period}</span>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className={`mr-2 mt-0.5 ${plan.featured ? 'text-sun-300' : 'text-grass-500'}`}>
                      ✓
                    </span>
                    <span className="text-sm sm:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={ctaLink}
                className={`block text-center py-3 rounded-lg font-semibold transition-all duration-200 ${
                  plan.featured
                    ? 'bg-white text-grass-600 hover:bg-sun-50 hover:text-grass-700 shadow-md'
                    : 'bg-grass-600 text-white hover:bg-grass-700 hover:shadow-lg transform hover:-translate-y-0.5'
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