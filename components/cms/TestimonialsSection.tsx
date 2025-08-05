'use client'

import { useSanityQuery } from '@/hooks/useSanity'
import { testimonialsQuery } from '@/lib/sanity.queries'

interface Testimonial {
  _id: string
  name: string
  role?: string
  content: string
  rating: number
  image?: any
}

export default function TestimonialsSection() {
  const { data: testimonials, isLoading } = useSanityQuery<Testimonial[]>(testimonialsQuery)

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-6 animate-pulse">
            <div className="h-20 bg-gray-300 rounded mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  const items = testimonials || []

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-sky-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-night-900">
          Šta Kažu Naši Klijenti
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {items.map((testimonial) => (
            <div key={testimonial._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex text-sun-400 mb-4">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
                  <span key={i} className="text-lg sm:text-xl">★</span>
                ))}
              </div>
              <p className="text-night-700 mb-4 italic text-sm sm:text-base">"{testimonial.content}"</p>
              <div className="border-t border-sky-100 pt-4">
                <p className="font-semibold text-night-900">{testimonial.name}</p>
                {testimonial.role && (
                  <p className="text-sm text-night-600">{testimonial.role}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}