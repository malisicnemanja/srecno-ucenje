'use client'

import PulseButton from '@/components/ui/PulseButton'
import Link from 'next/link'

export function HeroButtons() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <PulseButton 
        variant="primary" 
        size="lg"
        onClick={() => scrollToSection('timeline')}
      >
        Životni put
      </PulseButton>
      
      <PulseButton 
        variant="secondary" 
        size="lg"
        onClick={() => scrollToSection('books')}
      >
        Dela
      </PulseButton>
    </div>
  )
}

export function BooksButton() {
  return (
    <Link href="/knjige">
      <PulseButton 
        variant="primary"
        size="lg"
      >
        Sva dela autorke
      </PulseButton>
    </Link>
  )
}

export function CTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href="/kontakt">
        <PulseButton 
          variant="accent"
          size="lg"
          className="bg-white text-primary-600 hover:bg-gray-100"
        >
          Kontakt
        </PulseButton>
      </Link>
      
      <Link href="/knjige">
        <PulseButton 
          variant="secondary"
          size="lg"
          className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary-600"
        >
          Istražite knjige
        </PulseButton>
      </Link>
    </div>
  )
}