'use client'

import Link from 'next/link'

interface Book {
  id: string
  title: string
  description: string
  season: string
  fairy: string
  color: string
  imageUrl: string
  slug: string
}

interface BooksInteractiveProps {
  books: Book[]
}

export function BookButtons({ book }: { book: Book }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Link 
        href={`/knjige/${book.slug || 'no-slug'}`}
        className="group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 w-full sm:w-auto text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl transition-all duration-300"></div>
        <span className="relative text-white">Saznaj više</span>
      </Link>
      
      <Link 
        href={`/knjige/${book.slug || 'no-slug'}#order`}
        className="group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 w-full sm:w-auto text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl transition-all duration-300"></div>
        <span className="relative text-white">Poruči knjigu</span>
      </Link>
    </div>
  )
}

export function AuthorButton({ linkToAbout }: { linkToAbout: string }) {
  return (
    <Link 
      href={linkToAbout}
      className="group relative inline-block px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 mx-auto text-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl transition-all duration-300"></div>
      <span className="relative text-white">Saznaj više o autorki</span>
    </Link>
  )
}

export function HeroButtons() {
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id)
    section?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button 
        onClick={() => scrollToSection('books-carousel')}
        className="group relative px-8 py-4 text-lg rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 w-full sm:w-auto overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl transition-all duration-300"></div>
        <span className="relative text-white">Istražite knjige</span>
      </button>
      
      <button 
        onClick={() => scrollToSection('about-series')}
        className="group relative px-8 py-4 text-lg rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 w-full sm:w-auto overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl transition-all duration-300"></div>
        <span className="relative text-white">Saznajte više</span>
      </button>
    </div>
  )
}

export function CTAButtons({ primaryButton, secondaryButton }: { 
  primaryButton: { text: string; url: string }
  secondaryButton: { text: string; url: string }
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link 
        href={primaryButton.url}
        className="group relative px-8 py-4 text-lg rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 w-full sm:w-auto text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-xl transition-all duration-300"></div>
        <span className="relative text-white">{primaryButton.text}</span>
      </Link>
      
      <Link 
        href={secondaryButton.url}
        className="group relative px-8 py-4 text-lg rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 w-full sm:w-auto text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-white border-2 border-gray-200 transition-all duration-300"></div>
        <div className="absolute inset-0 bg-gray-50 border-2 border-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        <span className="relative text-gray-700">{secondaryButton.text}</span>
      </Link>
    </div>
  )
}