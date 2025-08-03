'use client'

import { GeneralIcon } from '@/components/icons/GeneralIcon'

interface FranchiseStep {
  stepNumber: number
  title: string
  description: string
  duration?: string
  icon: string
}

interface FranchiseStepsSectionProps {
  sectionTitle: string
  steps: FranchiseStep[]
}

export default function FranchiseStepsSection({
  sectionTitle,
  steps,
}: FranchiseStepsSectionProps) {
  const iconMap: Record<string, string> = {
    phone: 'phone',
    document: 'document',
    meeting: 'users',
    contract: 'document',
    training: 'education',
    launch: 'rocket',
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
          {sectionTitle}
        </h2>

        {/* Mobile Timeline */}
        <div className="block lg:hidden">
          {steps.map((step, index) => (
            <div key={index} className="flex mb-8">
              {/* Step number */}
              <div className="flex-shrink-0 flex flex-col items-center mr-4">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {step.stepNumber}
                </div>
                {index < steps.length - 1 && (
                  <div className="w-1 h-full bg-green-200 mt-2" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <GeneralIcon
                    icon={iconMap[step.icon] || 'star'}
                    className="w-6 h-6 text-green-600 mr-2"
                  />
                  <h3 className="font-bold text-lg">{step.title}</h3>
                </div>
                <p className="text-gray-600 mb-2">{step.description}</p>
                {step.duration && (
                  <span className="text-sm text-green-600 font-semibold">
                    {step.duration}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Timeline line */}
          <div className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-green-200 via-green-400 to-green-200" />

          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector dot */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-green-600 rounded-full z-10" />

                {/* Card */}
                <div className="mt-8 bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  {/* Step number badge */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.stepNumber}
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-4 mt-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <GeneralIcon
                        icon={iconMap[step.icon] || 'star'}
                        className="w-6 h-6 text-green-600"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg text-center mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-center text-sm mb-3">
                    {step.description}
                  </p>

                  {/* Duration */}
                  {step.duration && (
                    <div className="text-center">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        {step.duration}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}