'use client'

import { useState } from 'react'
import FAQList from '@/components/cms/FAQList'
import HeroSection from '@/components/cms/HeroSection'

export default function FAQPage() {
  return (
    <div className="min-h-screen">
      <HeroSection
        title="Često Postavljana Pitanja"
        subtitle="Odgovori na najčešće nedoumice o našim programima"
        gradient="from-gray-50 to-white"
      />

      <div className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <FAQList />
        </div>
      </div>
    </div>
  )
}