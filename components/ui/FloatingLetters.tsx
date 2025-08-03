'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface FloatingLettersProps {
  className?: string
  letters?: string[]
  colors?: string[]
  count?: number
  speed?: 'slow' | 'medium' | 'fast'
}

export default function FloatingLetters({ 
  className = '',
  letters = ['А', 'Б', 'В', 'Г', 'Д', 'Ђ', 'Е', 'Ж', 'З', 'И', 'Ј', 'К', 'Л', 'Љ', 'М', 'Н', 'Њ', 'О', 'П', 'Р', 'С', 'Т', 'Ћ', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Џ', 'Ш'],
  colors = ['#F59E0B', '#3B82F6', '#10B981', '#EF4444', '#8B5CF6', '#F97316'],
  count = 15,
  speed = 'medium'
}: FloatingLettersProps) {
  const [floatingLetters, setFloatingLetters] = useState<Array<{
    id: number
    letter: string
    color: string
    x: number
    y: number
    size: number
    rotation: number
    delay: number
  }>>([])

  const speedConfig = {
    slow: { duration: [8, 12], delay: [0, 3] },
    medium: { duration: [6, 10], delay: [0, 2] },
    fast: { duration: [4, 8], delay: [0, 1] }
  }

  const currentSpeed = speedConfig[speed]

  useEffect(() => {
    const generatedLetters = Array.from({ length: count }, (_, i) => ({
      id: i,
      letter: letters[Math.floor(Math.random() * letters.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 16 + Math.random() * 20,
      rotation: Math.random() * 360,
      delay: Math.random() * currentSpeed.delay[1]
    }))
    
    setFloatingLetters(generatedLetters)
  }, [count, letters, colors, currentSpeed.delay])

  const getRandomDuration = () => 
    currentSpeed.duration[0] + Math.random() * (currentSpeed.duration[1] - currentSpeed.duration[0])

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {floatingLetters.map((letterData) => (
        <motion.div
          key={letterData.id}
          className="absolute font-bold opacity-20 hover:opacity-40 transition-opacity"
          style={{
            left: `${letterData.x}%`,
            top: `${letterData.y}%`,
            color: letterData.color,
            fontSize: `${letterData.size}px`,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
          initial={{
            x: 0,
            y: 0,
            rotate: letterData.rotation,
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            x: [0, 20, -15, 10, 0],
            y: [0, -30, 15, -20, 0],
            rotate: [
              letterData.rotation,
              letterData.rotation + 45,
              letterData.rotation - 30,
              letterData.rotation + 15,
              letterData.rotation
            ],
            opacity: [0, 0.3, 0.2, 0.3, 0],
            scale: [0.8, 1.1, 0.9, 1, 0.8]
          }}
          transition={{
            duration: getRandomDuration(),
            delay: letterData.delay,
            repeat: Infinity,
            repeatDelay: 1 + Math.random() * 2,
            ease: "easeInOut"
          }}
        >
          {letterData.letter}
        </motion.div>
      ))}

      {/* Dodatni efekt - pulsiranje u pozadini */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/10 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "linear"
        }}
      />
    </div>
  )
}

// Komponenta za pojedinačno slovo sa custom animacijom
export function AnimatedLetter({ 
  letter, 
  color = '#3B82F6',
  size = 24,
  animation = 'bounce'
}: {
  letter: string
  color?: string
  size?: number
  animation?: 'bounce' | 'rotate' | 'pulse' | 'wave'
}) {
  const animations = {
    bounce: {
      y: [0, -10, 0],
      transition: { duration: 1, repeat: Infinity, ease: "easeInOut" }
    },
    rotate: {
      rotate: [0, 360],
      transition: { duration: 2, repeat: Infinity, ease: "linear" }
    },
    pulse: {
      scale: [1, 1.2, 1],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    },
    wave: {
      y: [0, -8, 0],
      rotate: [0, 5, -5, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    }
  }

  return (
    <motion.span
      className="inline-block font-bold"
      style={{
        color,
        fontSize: `${size}px`,
        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
      animate={animations[animation]}
    >
      {letter}
    </motion.span>
  )
}

// Komponenta za animirani naslov
export function AnimatedTitle({ 
  text, 
  className = '',
  staggerDelay = 0.1,
  colors = ['#F59E0B', '#3B82F6', '#10B981', '#EF4444']
}: {
  text: string
  className?: string
  staggerDelay?: number
  colors?: string[]
}) {
  const letters = text.split('')

  return (
    <div className={className}>
      {letters.map((letter, index) => (
        <AnimatedLetter
          key={index}
          letter={letter === ' ' ? '\u00A0' : letter}
          color={colors[index % colors.length]}
          animation="wave"
        />
      ))}
    </div>
  )
}