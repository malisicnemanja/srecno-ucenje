'use client'

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/animation-utils'

interface BrushUnderlineProps {
  color?: string | 'primary' | 'secondary' | 'accent' | 'warm' | 'yellow'
  delay?: number
  className?: string
  variant?: 'underline' | 'highlight' | 'circle' | 'arrow'
  thickness?: 'thin' | 'medium' | 'thick'
  style?: 'rough' | 'smooth' | 'wavy' | 'zigzag'
  animate?: boolean
  trigger?: boolean
}

export const BrushUnderline = ({ 
  color = 'yellow', 
  delay = 0,
  className = '',
  variant = 'underline',
  thickness = 'medium',
  style = 'rough',
  animate = true,
  trigger = true
}: BrushUnderlineProps) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  
  const colors = {
    primary: '#10B981',
    secondary: '#3B82F6',
    accent: '#F59E0B',
    warm: '#EF4444',
    yellow: '#FDD835'
  }
  
  const strokeColor = colors[color as keyof typeof colors] || color
  
  const getStrokeWidth = () => {
    switch (thickness) {
      case 'thin': return '2'
      case 'medium': return '3'
      case 'thick': return '5'
      default: return '3'
    }
  }
  
  const getPaths = () => {
    const paths = {
      underline: {
        rough: "M5,8 Q30,3 60,7 T120,6 T180,8 T240,5 T295,7",
        smooth: "M5,8 Q150,5 295,8",
        wavy: "M5,8 Q50,3 100,8 T200,8 T295,8",
        zigzag: "M5,8 L50,3 L100,8 L150,3 L200,8 L250,3 L295,8"
      },
      highlight: {
        rough: "M5,4 Q30,1 60,5 T120,4 T180,6 T240,3 T295,5 Q250,9 200,7 T120,8 T60,9 Q30,11 5,8 Z",
        smooth: "M5,4 Q150,2 295,5 Q150,10 5,8 Z",
        wavy: "M5,4 Q50,1 100,5 T200,5 T295,5 Q200,9 100,8 T5,8 Z",
        zigzag: "M5,4 L50,1 L100,5 L150,1 L200,5 L250,1 L295,5 L250,9 L200,8 L150,9 L100,8 L50,9 L5,8 Z"
      },
      circle: {
        rough: "M20,6 Q60,2 140,4 Q220,6 280,4 Q220,10 140,8 Q60,10 20,6 Z",
        smooth: "M30,6 Q150,2 270,6 Q150,10 30,6 Z",
        wavy: "M30,6 Q80,2 150,6 Q220,2 270,6 Q220,10 150,6 Q80,10 30,6 Z",
        zigzag: "M30,6 L80,2 L150,6 L220,2 L270,6 L220,10 L150,6 L80,10 L30,6 Z"
      },
      arrow: {
        rough: "M5,8 Q30,3 60,7 T120,6 T180,8 T240,5 T280,7 L295,7 L285,3 M295,7 L285,11",
        smooth: "M5,8 Q150,5 280,8 L295,8 L285,4 M295,8 L285,12",
        wavy: "M5,8 Q50,3 100,8 T200,8 T280,8 L295,8 L285,4 M295,8 L285,12",
        zigzag: "M5,8 L50,3 L100,8 L150,3 L200,8 L250,3 L280,8 L295,8 L285,4 M295,8 L285,12"
      }
    }
    return paths[variant][style]
  }
  
  useEffect(() => {
    if (!animate || !trigger || hasAnimated || prefersReducedMotion()) return
    
    const timer = setTimeout(() => {
      if (svgRef.current) {
        const path = svgRef.current.querySelector('path')
        if (path) {
          path.classList.add('animate-brush-stroke')
          setHasAnimated(true)
        }
      }
    }, delay)
    
    return () => clearTimeout(timer)
  }, [animate, trigger, delay, hasAnimated])
  
  const getViewBox = () => {
    switch (variant) {
      case 'circle': return "0 0 300 12"
      case 'highlight': return "0 0 300 12"
      default: return "0 0 300 12"
    }
  }
  
  return (
    <svg 
      ref={svgRef}
      className={`absolute -bottom-1 left-0 w-full h-4 pointer-events-none ${className}`} 
      viewBox={getViewBox()}
      preserveAspectRatio="none"
      style={{ zIndex: -1 }}
    >
      <path
        d={getPaths()}
        stroke={strokeColor}
        strokeWidth={getStrokeWidth()}
        fill={variant === 'highlight' ? strokeColor : 'none'}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={variant === 'highlight' ? '0.3' : '1'}
        style={{
          strokeDasharray: animate ? 1000 : 'none',
          strokeDashoffset: animate && !hasAnimated ? 1000 : 0,
          transition: prefersReducedMotion() ? 'none' : 'stroke-dashoffset 1.5s ease-out'
        }}
      />
    </svg>
  )
}

// Enhanced brush stroke with text integration
interface BrushStrokeTextProps {
  children: React.ReactNode
  wordsToHighlight?: string[]
  brushColor?: string
  brushVariant?: 'underline' | 'highlight' | 'circle'
  brushStyle?: 'rough' | 'smooth' | 'wavy'
  animationDelay?: number
  className?: string
}

export const BrushStrokeText = ({
  children,
  wordsToHighlight = [],
  brushColor = '#FDD835',
  brushVariant = 'underline',
  brushStyle = 'rough',
  animationDelay = 1000,
  className = ''
}: BrushStrokeTextProps) => {
  const [animateTrigger, setAnimateTrigger] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateTrigger(true)
    }, animationDelay)
    
    return () => clearTimeout(timer)
  }, [animationDelay])
  
  const renderTextWithBrushStrokes = () => {
    // Convert children to string safely
    const text = typeof children === 'string' 
      ? children 
      : Array.isArray(children) 
        ? children.join('') 
        : String(children || '')
    
    // If no text or no words to highlight, return as is
    if (!text || wordsToHighlight.length === 0) {
      return text
    }
    
    const words = text.split(' ')
    
    return words.map((word, index) => {
      const shouldHighlight = wordsToHighlight.some(highlightWord => 
        word.toLowerCase().includes(highlightWord.toLowerCase())
      )
      
      if (shouldHighlight) {
        return (
          <span key={index} className="relative inline-block">
            {word}
            <BrushUnderline
              color={brushColor}
              variant={brushVariant}
              style={brushStyle}
              delay={index * 200}
              trigger={animateTrigger}
              className="-bottom-1"
            />
            {index < words.length - 1 && ' '}
          </span>
        )
      }
      
      return (
        <span key={index}>
          {word}
          {index < words.length - 1 && ' '}
        </span>
      )
    })
  }
  
  return (
    <span className={className}>
      {renderTextWithBrushStrokes()}
    </span>
  )
}

export default BrushUnderline