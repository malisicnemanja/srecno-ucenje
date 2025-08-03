'use client'

import dynamic from 'next/dynamic'

const NextStudioComponent = dynamic(
  () => import('next-sanity/studio').then(mod => mod.NextStudio),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-screen">
        <p>Loading Sanity Studio...</p>
      </div>
    )
  }
)

export default function StudioPage() {
  const config = require('@/sanity.config').default
  return <NextStudioComponent config={config} />
}