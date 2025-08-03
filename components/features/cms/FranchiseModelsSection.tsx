'use client'

interface FranchiseModel {
  name: string
  price: string
  features: string[]
  highlighted?: boolean
  badge?: string
}

interface FranchiseModelsSectionProps {
  sectionTitle: string
  models: FranchiseModel[]
}

export default function FranchiseModelsSection({
  sectionTitle,
  models,
}: FranchiseModelsSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
          {sectionTitle}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 flex flex-col h-full ${
                model.highlighted
                  ? 'bg-gradient-to-br from-green-600 to-green-700 text-white shadow-2xl'
                  : 'bg-white shadow-lg hover:shadow-xl'
              }`}
            >
              {/* Badge */}
              {model.badge && (
                <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 rounded-bl-lg text-sm font-semibold z-10">
                  {model.badge}
                </div>
              )}

              <div className="p-8 flex flex-col h-full">
                {/* Model name */}
                <h3 className={`text-2xl font-bold mb-2 ${
                  model.highlighted ? 'text-white' : 'text-gray-900'
                }`}>
                  {model.name}
                </h3>

                {/* Price */}
                <div className={`text-3xl font-bold mb-6 ${
                  model.highlighted ? 'text-white' : 'text-green-600'
                }`}>
                  {model.price}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {model.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg
                        className={`w-5 h-5 mr-3 flex-shrink-0 mt-0.5 ${
                          model.highlighted ? 'text-green-300' : 'text-green-500'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className={model.highlighted ? 'text-white' : 'text-gray-600'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button - Enhanced styling and prominence */}
                <button
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    model.highlighted
                      ? 'bg-white text-green-600 hover:bg-gray-50 shadow-md hover:shadow-xl'
                      : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-2xl'
                  }`}
                  onClick={() => {
                    // Track analytics event
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'franchise_model_click', {
                        model_name: model.name,
                        model_price: model.price,
                      })
                    }
                  }}
                >
                  <span className="flex items-center justify-center">
                    Saznajte više
                    <svg 
                      className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison note */}
        <p className="text-center text-gray-600 mt-8">
          Svi modeli uključuju kompletnu obuku, materijale i kontinuiranu podršku
        </p>
      </div>
    </section>
  )
}