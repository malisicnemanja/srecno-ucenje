'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface ProgressRingProps {
  progress: number // 0-100
  size?: number
  strokeWidth?: number
  color?: string
  backgroundColor?: string
  showPercentage?: boolean
  showLabel?: boolean
  label?: string
  animated?: boolean
  duration?: number
  className?: string
  children?: React.ReactNode
  variant?: 'default' | 'minimal' | 'gradient' | 'educational'
}

const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 100,
  strokeWidth = 8,
  color = '#10B981', // green-500
  backgroundColor = '#E5E7EB', // gray-200
  showPercentage = true,
  showLabel = false,
  label,
  animated = true,
  duration = 1,
  className = '',
  children,
  variant = 'default'
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(animated ? 0 : progress)

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setAnimatedProgress(progress), 100)
      return () => clearTimeout(timer)
    } else {
      setAnimatedProgress(progress)
    }
  }, [progress, animated])

  const normalizedRadius = (size - strokeWidth) / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference

  const getColorScheme = () => {
    if (variant === 'educational') {
      // Educational progress colors based on completion
      if (animatedProgress >= 90) return '#10B981' // green-500 - excellent
      if (animatedProgress >= 70) return '#3B82F6' // blue-500 - good
      if (animatedProgress >= 50) return '#F59E0B' // amber-500 - okay
      return '#EF4444' // red-500 - needs improvement
    }
    return color
  }

  const getGradientId = () => `progress-gradient-${Math.random().toString(36).substr(2, 9)}`

  const gradientId = getGradientId()
  const finalColor = getColorScheme()

  const getFontSize = () => {
    if (size <= 60) return '14px'
    if (size <= 100) return '16px'
    if (size <= 150) return '20px'
    return '24px'
  }

  const getLabelFontSize = () => {
    if (size <= 60) return '10px'
    if (size <= 100) return '12px'
    if (size <= 150) return '14px'
    return '16px'
  }

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Gradient Definition */}
        {variant === 'gradient' && (
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        )}

        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={normalizedRadius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
          className={variant === 'minimal' ? 'opacity-30' : ''}
        />

        {/* Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={normalizedRadius}
          stroke={variant === 'gradient' ? `url(#${gradientId})` : finalColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: strokeDashoffset }}
          transition={{
            duration: animated ? duration : 0,
            ease: 'easeOut'
          }}
          className={variant === 'educational' ? 'drop-shadow-sm' : ''}
        />

        {/* Inner shadow for depth (educational variant) */}
        {variant === 'educational' && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={normalizedRadius - strokeWidth / 2}
            stroke="none"
            fill="none"
            className="drop-shadow-inner"
          />
        )}
      </svg>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children ? (
          children
        ) : (
          <>
            {showPercentage && (
              <motion.span
                className="font-bold text-gray-900 dark:text-white"
                style={{ fontSize: getFontSize() }}
                initial={animated ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: duration * 0.5, duration: 0.3 }}
              >
                {Math.round(animatedProgress)}%
              </motion.span>
            )}
            
            {showLabel && label && (
              <motion.span
                className="text-gray-600 dark:text-gray-400 text-center leading-tight mt-1"
                style={{ fontSize: getLabelFontSize() }}
                initial={animated ? { opacity: 0 } : { opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ delay: duration * 0.7, duration: 0.3 }}
              >
                {label}
              </motion.span>
            )}
          </>
        )}
      </div>

      {/* Educational variant enhancements */}
      {variant === 'educational' && (
        <>
          {/* Progress milestone indicators */}
          {[25, 50, 75, 100].map((milestone) => {
            const angle = (milestone / 100) * 360 - 90 // -90 to start from top
            const x = size / 2 + (normalizedRadius + strokeWidth / 2 + 4) * Math.cos((angle * Math.PI) / 180)
            const y = size / 2 + (normalizedRadius + strokeWidth / 2 + 4) * Math.sin((angle * Math.PI) / 180)
            
            return (
              <div
                key={milestone}
                className={`absolute w-2 h-2 rounded-full transition-colors duration-300 ${
                  animatedProgress >= milestone 
                    ? 'bg-green-500' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                style={{
                  left: x - 4,
                  top: y - 4,
                }}
              />
            )
          })}

          {/* Achievement glow effect */}
          {animatedProgress >= 100 && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${finalColor}20 0%, transparent 70%)`,
                width: size + 20,
                height: size + 20,
                left: -10,
                top: -10
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                scale: [0.8, 1.2, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
          )}
        </>
      )}
    </div>
  )
}

// Preset configurations for common use cases
export const LessonProgressRing: React.FC<Omit<ProgressRingProps, 'variant' | 'color'>> = (props) => (
  <ProgressRing {...props} variant="educational" color="#10B981" />
)

export const CourseProgressRing: React.FC<Omit<ProgressRingProps, 'variant' | 'color' | 'size'>> = (props) => (
  <ProgressRing {...props} variant="educational" color="#3B82F6" size={120} />
)

export const QuizScoreRing: React.FC<Omit<ProgressRingProps, 'variant' | 'showLabel'> & { score: number }> = ({ 
  score, 
  ...props 
}) => (
  <ProgressRing 
    {...props} 
    variant="educational" 
    progress={score}
    showLabel={true}
    label={score >= 90 ? 'Excellent!' : score >= 70 ? 'Good!' : score >= 50 ? 'Okay' : 'Try Again'}
  />
)

export const SkillProgressRing: React.FC<Omit<ProgressRingProps, 'variant' | 'color'> & { skill: string }> = ({ 
  skill, 
  ...props 
}) => (
  <ProgressRing 
    {...props} 
    variant="minimal" 
    color="#8B5CF6"
    showLabel={true}
    label={skill}
  />
)

export default ProgressRing