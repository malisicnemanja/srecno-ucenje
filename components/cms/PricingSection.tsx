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
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">{title}</h2>
        {subtitle && (
          <p className="text-xl text-gray-600 text-center mb-12">{subtitle}</p>
        )}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-lg p-8 ${
                plan.featured
                  ? 'bg-blue-600 text-white transform scale-105'
                  : 'bg-white'
              }`}
            >
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="text-3xl font-bold mb-6">
                {plan.price} {plan.currency || 'RSD'}
                {plan.period && (
                  <span className="text-base font-normal">/{plan.period}</span>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <span className={`mr-2 ${plan.featured ? 'text-white' : 'text-green-500'}`}>
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={ctaLink || '/'}
                className={`block text-center py-3 rounded-lg font-semibold transition ${
                  plan.featured
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
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