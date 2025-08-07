'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'
import { prefersReducedMotion } from '@/lib/animation-utils'

interface FloatingShape {
  id: number
  x: number
  y: number
  size: number
  color: string
  speed: number
  direction: number
}

interface FloatingShapesProps {
  count?: number
  colors?: string[]
  sizes?: { min: number; max: number }
  speed?: { min: number; max: number }
  className?: string
  theme?: 'educational' | 'abstract' | 'geometric'
}

// Floating shapes component
export const FloatingShapes = ({
  count = 6,
  colors = ['#3B82F6', '#8B5CF6', '#EF4444', '#10B981', '#F59E0B'],
  sizes = { min: 20, max: 80 },
  speed = { min: 20, max: 50 },
  className = '',
  theme = 'educational'
}: FloatingShapesProps) => {
  const [shapes, setShapes] = useState<FloatingShape[]>([])

  // Generate shapes based on theme
  const generateShapes = useMemo(() => {
    if (prefersReducedMotion()) return []

    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
      size: Math.random() * (sizes.max - sizes.min) + sizes.min,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * (speed.max - speed.min) + speed.min,
      direction: Math.random() * Math.PI * 2
    }))
  }, [count, colors, sizes, speed])

  useEffect(() => {
    setShapes(generateShapes)
  }, [generateShapes])

  const getShapeComponent = (shape: FloatingShape) => {
    const shapeProps = {
      width: shape.size,
      height: shape.size,
      style: { color: shape.color, opacity: 0.3 }
    }

    switch (theme) {
      case 'educational':
        // Educational themed shapes (books, lightbulbs, stars, etc.)
        const educationalShapes = ['📚', '💡', '⭐', '🎯', '🧠', '📝']
        return (
          <span className="text-2xl" style={{ fontSize: shape.size }}>
            {educationalShapes[shape.id % educationalShapes.length]}
          </span>
        )
      
      case 'geometric':
        const geometricShapes = [
          <div key="circle" className="rounded-full" style={{ ...shapeProps, backgroundColor: shape.color }} />,
          <div key="square" style={{ ...shapeProps, backgroundColor: shape.color }} />,
          <div key="triangle" style={{
            width: 0,
            height: 0,
            borderLeft: `${shape.size / 2}px solid transparent`,
            borderRight: `${shape.size / 2}px solid transparent`,
            borderBottom: `${shape.size}px solid ${shape.color}`,
            opacity: 0.3
          }} />
        ]
        return geometricShapes[shape.id % geometricShapes.length]
      
      default:
        return (
          <div 
            className="rounded-full blur-sm" 
            style={{ 
              ...shapeProps, 
              backgroundColor: shape.color,
              filter: 'blur(2px)'
            }} 
          />
        )
    }
  }

  if (prefersReducedMotion()) return null

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          initial={{ x: shape.x, y: shape.y }}
          animate={{
            x: [shape.x, shape.x + Math.cos(shape.direction) * 200, shape.x],
            y: [shape.y, shape.y + Math.sin(shape.direction) * 200, shape.y]
          }}
          transition={{
            duration: shape.speed,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 5
          }}
          style={{ willChange: 'transform' }}
        >
          {getShapeComponent(shape)}
        </motion.div>
      ))}
    </div>
  )
}

// Particle system component
interface ParticleSystemProps {
  particleCount?: number
  particleColor?: string
  particleSize?: number
  speed?: number
  className?: string
}

export const ParticleSystem = ({
  particleCount = 50,
  particleColor = '#3B82F6',
  particleSize = 2,
  speed = 1,
  className = ''
}: ParticleSystemProps) => {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    vx: number
    vy: number
  }>>([])

  useEffect(() => {
    if (prefersReducedMotion()) return

    const generateParticles = () => {
      return Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * (window?.innerWidth || 1200),
        y: Math.random() * (window?.innerHeight || 800),
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed
      }))
    }

    setParticles(generateParticles())

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        // Wrap around screen edges
        ...(particle.x > (window?.innerWidth || 1200) && { x: 0 }),
        ...(particle.x < 0 && { x: window?.innerWidth || 1200 }),
        ...(particle.y > (window?.innerHeight || 800) && { y: 0 }),
        ...(particle.y < 0 && { y: window?.innerHeight || 800 })
      })))
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [particleCount, speed])

  if (prefersReducedMotion()) return null

  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`}>
      <svg className="w-full h-full">
        {particles.map(particle => (
          <circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r={particleSize}
            fill={particleColor}
            opacity={0.6}
          />
        ))}
      </svg>
    </div>
  )
}

// Wave pattern component
interface WavePatternProps {
  amplitude?: number
  frequency?: number
  speed?: number
  color?: string
  className?: string
  position?: 'top' | 'bottom'
}

export const WavePattern = ({
  amplitude = 20,
  frequency = 0.02,
  speed = 0.5,
  color = '#3B82F6',
  className = '',
  position = 'bottom'
}: WavePatternProps) => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const interval = setInterval(() => {
      setTime(prev => prev + 0.1)
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const generateWavePath = () => {
    const width = 1200 // Default width
    const points = []
    
    for (let x = 0; x <= width; x += 5) {
      const y = amplitude * Math.sin(frequency * x + time * speed)
      points.push(`${x},${y}`)
    }
    
    return `M0,0 L${points.join(' L')} L${width},100 L0,100 Z`
  }

  if (prefersReducedMotion()) {
    return (
      <div 
        className={`absolute left-0 right-0 h-20 ${position === 'top' ? 'top-0' : 'bottom-0'} ${className}`}
        style={{ backgroundColor: color, opacity: 0.1 }}
      />
    )
  }

  return (
    <div 
      className={`absolute left-0 right-0 h-20 ${position === 'top' ? 'top-0' : 'bottom-0'} ${className}`}
      style={{ overflow: 'hidden' }}
    >
      <svg className="w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
        <motion.path
          d={generateWavePath()}
          fill={color}
          opacity={0.1}
          animate={{ d: generateWavePath() }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </svg>
    </div>
  )
}

// Animated gradient background
interface AnimatedGradientProps {
  colors?: string[]
  duration?: number
  className?: string
}

export const AnimatedGradient = ({
  colors = ['#3B82F6', '#8B5CF6', '#EC4899'],
  duration = 8,
  className = ''
}: AnimatedGradientProps) => {
  if (prefersReducedMotion()) {
    return (
      <div 
        className={`absolute inset-0 ${className}`}
        style={{
          background: `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`
        }}
      />
    )
  }

  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      animate={{
        background: [
          `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`,
          `linear-gradient(90deg, ${colors[1]}, ${colors[2]})`,
          `linear-gradient(135deg, ${colors[2]}, ${colors[0]})`,
          `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`
        ]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      style={{ willChange: 'background' }}
    />
  )
}

// Constellation effect
interface ConstellationProps {
  starCount?: number
  connectionDistance?: number
  starColor?: string
  lineColor?: string
  className?: string
}

export const Constellation = ({
  starCount = 100,
  connectionDistance = 150,
  starColor = '#ffffff',
  lineColor = '#ffffff',
  className = ''
}: ConstellationProps) => {
  const [stars, setStars] = useState<Array<{
    id: number
    x: number
    y: number
    connections: number[]
  }>>([])

  useEffect(() => {
    if (prefersReducedMotion()) return

    const generateStars = () => {
      const width = window?.innerWidth || 1200
      const height = window?.innerHeight || 800
      
      const newStars = Array.from({ length: starCount }, (_, i) => ({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        connections: []
      }))

      // Calculate connections
      newStars.forEach((star, i) => {
        newStars.forEach((otherStar, j) => {
          if (i !== j) {
            const distance = Math.sqrt(
              Math.pow(star.x - otherStar.x, 2) + 
              Math.pow(star.y - otherStar.y, 2)
            )
            if (distance < connectionDistance) {
              star.connections.push(j)
            }
          }
        })
      })

      return newStars
    }

    setStars(generateStars())
  }, [starCount, connectionDistance])

  if (prefersReducedMotion()) return null

  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`}>
      <svg className="w-full h-full">
        {/* Render connections */}
        {stars.map(star => 
          star.connections.map(connectionId => (
            <motion.line
              key={`${star.id}-${connectionId}`}
              x1={star.x}
              y1={star.y}
              x2={stars[connectionId]?.x}
              y2={stars[connectionId]?.y}
              stroke={lineColor}
              strokeWidth={0.5}
              opacity={0.3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: Math.random() * 2 }}
            />
          ))
        )}
        
        {/* Render stars */}
        {stars.map(star => (
          <motion.circle
            key={star.id}
            cx={star.x}
            cy={star.y}
            r={1}
            fill={starColor}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.5, 1, 0.5] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: 'easeInOut'
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default {
  FloatingShapes,
  ParticleSystem,
  WavePattern,
  AnimatedGradient,
  Constellation
}