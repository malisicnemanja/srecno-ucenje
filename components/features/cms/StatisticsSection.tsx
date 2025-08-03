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
  backgroundColor = 'bg-white' 
}: StatisticsSectionProps) {
  return (
    <section className={`py-16 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {statistics.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              {stat.icon && (
                <div className="text-4xl mb-2">{stat.icon}</div>
              )}
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}