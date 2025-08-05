'use client'

import { PulseButton } from '@/components/animations'

interface BookCTAButtonsProps {
  hasPurchaseLinks: boolean
}

export default function BookCTAButtons({ hasPurchaseLinks }: BookCTAButtonsProps) {
  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <PulseButton 
        variant="accent"
        size="lg"
        intensity="medium"
        className="bg-white text-gray-900 hover:bg-gray-100"
        onClick={() => handleScrollToSection('about-book')}
      >
        Saznajte više
      </PulseButton>
      
      {hasPurchaseLinks && (
        <PulseButton 
          variant="secondary"
          size="lg"
          intensity="subtle"
          className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-900"
          onClick={() => handleScrollToSection('purchase')}
        >
          Kupite knjigu
        </PulseButton>
      )}
    </div>
  )
}