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
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">{title}</h2>
        {subtitle && (
          <p className="text-lg text-gray-600 text-center mb-12">{subtitle}</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg p-8 relative transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1 ${
                plan.featured
                  ? 'ring-2 ring-brand-grass scale-105'
                  : 'border border-gray-100'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-grass text-white px-4 py-1 rounded-full text-sm font-medium">
                  Najpopularniji
                </div>
              )}
              <h3 className="text-xl font-semibold mb-4 text-center">{plan.name}</h3>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600 ml-1">{plan.currency || 'RSD'}</span>
                {plan.period && (
                  <span className="block text-sm text-gray-500">/{plan.period}</span>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full mr-3 mt-0.5 text-white text-sm ${
                      plan.featured ? 'bg-brand-grass' : 'bg-gray-400'
                    }`}>
                      ✓
                    </span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href={ctaLink || '/'}
                className={`w-full block text-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  plan.featured
                    ? 'bg-brand-grass text-white hover:bg-opacity-90 hover:transform hover:-translate-y-0.5'
                    : 'border border-brand-grass text-brand-grass hover:bg-brand-grass hover:text-white'
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