import { Metadata } from 'next'
import SuccessStoriesClient from './SuccessStoriesClient'
import { client } from '@/lib/sanity.client'
import { groq } from 'next-sanity'

export const metadata: Metadata = {
  title: 'Priče Uspeha | Transformacija kroz učenje',
  description: 'Otkrijte neverovatne transformacije naših učenika - od prvog dana do vrhunskih rezultata. Priče koje inspirišu i motivišu.',
  keywords: ['priče uspeha', 'transformacija', 'rezultati', 'brzo čitanje', 'memorija', 'koncentracija', 'iskustva učenika'],
  openGraph: {
    title: 'Priče Uspeha - Transformacija kroz učenje',
    description: 'Otkrijte neverovatne transformacije naših učenika kroz inspiratvne priče o uspehu',
    type: 'website',
  }
}

const successStoriesQuery = groq`
  *[_type == "successStory"] | order(publishedAt desc) {
    _id,
    studentName,
    age,
    program->{
      _id,
      title
    },
    testimonial,
    results[]{
      metric,
      label
    },
    beforeSkills,
    afterSkills,
    video{
      url,
      thumbnail{
        asset->{
          _id,
          url
        }
      },
      description
    },
    featured,
    publishedAt,
    location
  }
`

const statsQuery = groq`
  {
    "totalStudents": count(*[_type == "successStory"]),
    "averageImprovement": 85,
    "programsOffered": count(*[_type == "program"]),
    "satisfactionRate": 98
  }
`

export default async function SuccessStoriesPage() {
  const [successStories, stats] = await Promise.all([
    client.fetch(successStoriesQuery),
    client.fetch(statsQuery)
  ])

  return <SuccessStoriesClient successStories={successStories} stats={stats} />
}