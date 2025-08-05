import { Metadata } from 'next'
import { getAllExperiences, getFeaturedExperiences } from '@/sanity/queries/experience'
import ExperiencesClient from './ExperiencesClient'

export const metadata: Metadata = {
  title: 'Iskustva | Putovanja i priče iz sveta',
  description: 'Putovanja, radionice i posebni događaji koji obogaćuju naš obrazovni proces. Istražite priče iz sveta obrazovanja.',
  keywords: ['iskustva', 'putovanja', 'radionice', 'obrazovni događaji', 'konferencije', 'međunarodna saradnja'],
  openGraph: {
    title: 'Iskustva iz sveta obrazovanja',
    description: 'Priče sa putovanja i događaja koji inspirišu i obogaćuju obrazovni proces',
    type: 'website',
  }
}

export default async function ExperiencesPage() {
  const [experiences, featuredExperiences] = await Promise.all([
    getAllExperiences(),
    getFeaturedExperiences()
  ])

  return <ExperiencesClient experiences={experiences} featuredExperiences={featuredExperiences} />
}