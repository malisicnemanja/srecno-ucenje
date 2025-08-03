'use client'

import { GeneralIcon } from '@/components/icons/GeneralIcon'

interface LeadMagnet {
  title: string
  description: string
  icon: string
  ctaText: string
  formId?: string
}

interface LeadMagnetsSectionProps {
  sectionTitle: string
  resources: LeadMagnet[]
}

export default function LeadMagnetsSection({
  sectionTitle,
  resources,
}: LeadMagnetsSectionProps) {
  const iconMap: Record<string, string> = {
    pdf: 'document',
    video: 'video',
    checklist: 'checklist',
    guide: 'book',
    calculator: 'calculator',
  }

  const handleDownload = (resource: LeadMagnet) => {
    // Track analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'lead_magnet_download', {
        resource_title: resource.title,
        form_id: resource.formId,
      })
    }
    
    // Here you would typically show a modal with a form
    // For now, we'll just log it
    console.log('Download requested:', resource.title)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
          {sectionTitle}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Icon header */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 text-white">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <GeneralIcon
                    icon={iconMap[resource.icon] || 'document'}
                    className="w-8 h-8 text-white"
                  />
                </div>
                <h3 className="text-xl font-bold text-center">
                  {resource.title}
                </h3>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-6 text-center">
                  {resource.description}
                </p>

                <button
                  onClick={() => handleDownload(resource)}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center group"
                >
                  {resource.ctaText}
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}