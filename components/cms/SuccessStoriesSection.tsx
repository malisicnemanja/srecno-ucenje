'use client'

import { useSanityQuery } from '@/hooks/useSanity'
import { successStoriesQuery } from '@/lib/sanity.queries'

interface Result {
  metric: string
  label: string
}

interface SuccessStory {
  _id: string
  studentName: string
  age: string
  program?: { title: string }
  testimonial: string
  results: Result[]
  featured: boolean
}

export default function SuccessStoriesSection() {
  const { data: stories, isLoading } = useSanityQuery<SuccessStory[]>(successStoriesQuery)

  if (isLoading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-8 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-20 bg-gray-300 rounded mb-4"></div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="h-16 bg-gray-300 rounded"></div>
              <div className="h-16 bg-gray-300 rounded"></div>
              <div className="h-16 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const successStories = stories || []

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Iskustva Naših Učenika
        </h2>
        <div className="space-y-8 max-w-4xl mx-auto">
          {successStories.map((story) => (
            <div key={story._id} className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{story.studentName}</h3>
                  <p className="text-gray-600">
                    {story.age}
                    {story.program && `, ${story.program.title}`}
                  </p>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
              <blockquote className="text-gray-700 italic mb-4">
                "{story.testimonial}"
              </blockquote>
              {story.results && story.results.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Rezultati:</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {story.results.map((result, i) => (
                      <div key={i} className="text-center bg-green-50 rounded p-3">
                        <div className="font-bold text-green-600">{result.metric}</div>
                        <div className="text-sm text-gray-600">{result.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}