'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import SafeLink from '@/components/common/SafeLink'
import { GeneralIcon } from '@/components/icons/GeneralIcon'

interface TrustBadge {
  icon: string
  value: string
  label: string
}

interface EnhancedHeroProps {
  title: string
  subtitle: string
  animatedNumber?: {
    target: number
    suffix: string
    duration?: number
  }
  primaryCta: {
    text: string
    link: string
  }
  secondaryCta: {
    text: string
    link: string
  }
  videoUrl?: string
  posterImage?: string
  mobileVideoUrl?: string
  trustBadges?: TrustBadge[]
}

export default function EnhancedHeroSection({
  title,
  subtitle,
  animatedNumber,
  primaryCta,
  secondaryCta,
  videoUrl,
  posterImage,
  mobileVideoUrl,
  trustBadges,
}: EnhancedHeroProps) {
  const [count, setCount] = useState(0)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Animated counter effect
  useEffect(() => {
    if (!animatedNumber) return

    const duration = animatedNumber.duration || 2000
    const target = animatedNumber.target
    const increment = target / (duration / 16) // 60fps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [animatedNumber])

  // Determine which video to use based on screen size
  useEffect(() => {
    const checkScreenSize = () => {
      if (videoRef.current) {
        const isMobile = window.innerWidth < 768
        const videoSrc = isMobile && mobileVideoUrl ? mobileVideoUrl : videoUrl
        if (videoSrc && videoRef.current.src !== videoSrc) {
          videoRef.current.src = videoSrc
        }
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [videoUrl, mobileVideoUrl])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      {videoUrl && (
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster={posterImage}
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
      )}

      {/* Fallback gradient if no video */}
      {!videoUrl && (
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-orange-50" />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated number */}
        {animatedNumber && (
          <div className="mb-6 animate-fade-in-up">
            <span className={`text-5xl sm:text-6xl lg:text-7xl font-bold ${
              videoUrl ? 'text-white' : 'text-green-600'
            }`}>
              {count.toLocaleString()}
              <span className="text-3xl sm:text-4xl lg:text-5xl">
                {animatedNumber.suffix}
              </span>
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up animation-delay-200 ${
          videoUrl ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h1>

        {/* Subtitle */}
        <p className={`text-xl sm:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-400 ${
          videoUrl ? 'text-gray-100' : 'text-gray-600'
        }`}>
          {subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up animation-delay-600">
          <SafeLink             href={primaryCta.link || '/'}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            {primaryCta.text}
          </SafeLink>
          <SafeLink             href={secondaryCta.link || '/'}
            className={`inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-200 ${
              videoUrl
                ? 'text-white border-2 border-white hover:bg-white hover:text-gray-900'
                : 'text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-white'
            }`}
          >
            {secondaryCta.text}
          </SafeLink>
        </div>

        {/* Trust Badges */}
        {trustBadges && trustBadges.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in-up animation-delay-800">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className={`flex flex-col items-center p-4 rounded-lg ${
                  videoUrl ? 'bg-white/10 backdrop-blur-sm' : 'bg-white shadow-md'
                }`}
              >
                <GeneralIcon
                  icon={badge.icon}
                  className={`w-8 h-8 mb-2 ${
                    videoUrl ? 'text-white' : 'text-green-600'
                  }`}
                />
                <div className={`text-2xl font-bold ${
                  videoUrl ? 'text-white' : 'text-gray-900'
                }`}>
                  {badge.value}
                </div>
                <div className={`text-sm ${
                  videoUrl ? 'text-gray-200' : 'text-gray-600'
                }`}>
                  {badge.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className={`w-6 h-6 ${videoUrl ? 'text-white' : 'text-gray-600'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}