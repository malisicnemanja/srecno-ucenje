'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AnimatedHeadlineProps {
  text: string
  highlightText: string
  variants?: string[]
  className?: string
  underlineColor?: string
}

export default function AnimatedHeadline({
  text,
  highlightText,
  variants = [],
  className = '',
  underlineColor = 'text-secondary-500'
}: AnimatedHeadlineProps) {
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    if (variants.length > 0) {
      const interval = setInterval(() => {
        setCurrentVariantIndex((prev) => (prev + 1) % variants.length)
      }, 3000)
      
      return () => clearInterval(interval)
    }
  }, [variants.length])

  // Razdelimo tekst da možemo da podvučemo deo
  const parts = text.split(highlightText)
  const hasHighlight = parts.length > 1

  return (
    <h1 className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight ${className}`}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {hasHighlight ? (
          <>
            {parts[0]}
            <span className="relative inline-block">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentVariantIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                >
                  {variants.length > 0 ? variants[currentVariantIndex] : highlightText}
                </motion.span>
              </AnimatePresence>
              
              {/* Animirana podvlaka kao četkica */}
              <motion.svg
                className={`absolute -bottom-2 left-0 w-full h-8 ${underlineColor}`}
                viewBox="0 0 300 20"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              >
                <motion.path
                  d="M5,10 Q50,5 100,10 T200,10 T295,10"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                />
                <motion.path
                  d="M10,12 Q60,8 110,12 T210,12 T290,12"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                />
                <motion.path
                  d="M15,14 Q70,10 120,14 T220,14 T285,14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                />
              </motion.svg>
            </span>
            {parts[1]}
          </>
        ) : (
          text
        )}
      </motion.span>
    </h1>
  )
}

// Komponenta za animirani podnaslov
export function AnimatedSubheadline({ 
  text, 
  className = '',
  delay = 0.3 
}: { 
  text: string
  className?: string
  delay?: number 
}) {
  return (
    <motion.p
      className={`text-lg md:text-xl lg:text-2xl text-gray-600 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {text}
    </motion.p>
  )
}