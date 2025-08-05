'use client'

import { useSanityQuery } from '@/hooks/useSanity'
import { programsQuery } from '@/lib/sanity.queries'
import Link from 'next/link'
import { BookIcon, BrainIcon, SparklesIcon, TargetIcon } from '@/components/icons'

interface Program {
  _id: string
  title: string
  slug: { current: string }
  icon: string
  description: string
  ageRange: string
  duration: string
  groupSize: string
}

// Helper function to get icon based on icon name
const getIconByName = (iconName: string) => {
  const iconProps = { className: "w-12 h-12" }
  switch (iconName?.toLowerCase()) {
    case 'book':
    case 'reading':
      return <BookIcon {...iconProps} />
    case 'brain':
    case 'calculator':
    case 'mental':
      return <BrainIcon {...iconProps} />
    case 'sparkles':
    case 'magic':
      return <SparklesIcon {...iconProps} />
    case 'target':
    case 'combined':
      return <TargetIcon {...iconProps} />
    default:
      return <BookIcon {...iconProps} />
  }
}

export default function ProgramsList() {
  const { data: programs, isLoading, error } = useSanityQuery<Program[]>(programsQuery)

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-100 rounded-lg p-6 animate-pulse">
            <div className="h-12 w-12 bg-gray-300 rounded mb-4"></div>
            <div className="h-6 bg-gray-300 rounded mb-3"></div>
            <div className="h-20 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error || !programs) {
    // Fallback na statički sadržaj ako CMS nije dostupan
    return <StaticProgramsList />
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {programs.map((program) => (
        <div key={program._id} className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            {getIconByName(program.icon)}
          </div>
          <h3 className="text-xl font-semibold mb-3">{program.title}</h3>
          <p className="text-gray-600 mb-4">{program.description}</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Uzrast:</span>
              <span className="font-medium">{program.ageRange}</span>
            </div>
            <div className="flex justify-between">
              <span>Trajanje:</span>
              <span className="font-medium">{program.duration}</span>
            </div>
            <div className="flex justify-between">
              <span>Grupa:</span>
              <span className="font-medium">{program.groupSize}</span>
            </div>
          </div>
          <Link
            href={`/programi/${program.slug?.current || 'no-slug'}`}
            className="mt-4 inline-block text-blue-600 hover:text-blue-700"
          >
            Saznajte više →
          </Link>
        </div>
      ))}
    </div>
  )
}

// Fallback komponenta sa statičkim sadržajem
function StaticProgramsList() {
  const staticPrograms = [
    {
      icon: 'book',
      title: 'Brzočitanje',
      description: 'Ovladajte veštinom brzog čitanja uz potpuno razumevanje',
      ageRange: '7-16 godina',
      duration: '6 meseci',
      groupSize: '6-8 učenika',
    },
    {
      icon: 'calculator',
      title: 'Mentalna Aritmetika',
      description: 'Naučite da računate brže od kalkulatora',
      ageRange: '5-14 godina',
      duration: '12 meseci',
      groupSize: '6-8 učenika',
    },
    {
      icon: 'target',
      title: 'Kombinovani Program',
      description: 'Najbolje iz oba programa za maksimalne rezultate',
      ageRange: '7-14 godina',
      duration: '12 meseci',
      groupSize: '6-8 učenika',
    },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {staticPrograms.map((program, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-4">
            {getIconByName(program.icon)}
          </div>
          <h3 className="text-xl font-semibold mb-3">{program.title}</h3>
          <p className="text-gray-600 mb-4">{program.description}</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Uzrast:</span>
              <span className="font-medium">{program.ageRange}</span>
            </div>
            <div className="flex justify-between">
              <span>Trajanje:</span>
              <span className="font-medium">{program.duration}</span>
            </div>
            <div className="flex justify-between">
              <span>Grupa:</span>
              <span className="font-medium">{program.groupSize}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}