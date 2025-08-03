'use client'

import { GeneralIcon } from '@/components/icons/GeneralIcon'

interface Differentiator {
  icon: string
  title: string
  description: string
  highlight?: string
}

interface DifferentiatorsSectionProps {
  sectionTitle: string
  items: Differentiator[]
}

export default function DifferentiatorsSection({
  sectionTitle,
  items,
}: DifferentiatorsSectionProps) {
  const iconMap: Record<string, string> = {
    quality: 'quality',
    innovation: 'rocket',
    support: 'support',
    results: 'chart',
    community: 'community',
    method: 'book',
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
          {sectionTitle}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Highlight badge */}
              {item.highlight && (
                <div className="absolute -top-4 -right-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                  {item.highlight}
                </div>
              )}

              {/* Icon */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors duration-300">
                <GeneralIcon
                  icon={iconMap[item.icon] || 'star'}
                  className="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-300"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>

              {/* Decorative element */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-orange-500 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}