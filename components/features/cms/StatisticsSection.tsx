'use client'

interface Statistic {
  value: string
  label: string
  icon?: string
}

interface StatisticsSectionProps {
  statistics: Statistic[]
  backgroundColor?: string
}

export default function StatisticsSection({ 
  statistics, 
  backgroundColor = 'bg-gradient-to-b from-white to-sky-50' 
}: StatisticsSectionProps) {
  return (
    <section className={`py-12 sm:py-16 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
          {statistics.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {stat.icon && (
                <div className="text-2xl sm:text-3xl lg:text-4xl mb-2">{stat.icon}</div>
              )}
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-grass-600 mb-2">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-night-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}