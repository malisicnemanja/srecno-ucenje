'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Award, Trophy, Target, Zap, BookOpen, Users, Clock, Flame } from 'lucide-react'

export type BadgeType = 
  | 'first-lesson' 
  | 'quiz-master' 
  | 'streak-keeper' 
  | 'course-complete'
  | 'perfect-score'
  | 'fast-learner'
  | 'helping-hand'
  | 'time-keeper'
  | 'explorer'
  | 'champion'
  | 'custom'

export type BadgeLevel = 'bronze' | 'silver' | 'gold' | 'platinum'

interface AchievementBadgeProps {
  type: BadgeType
  level: BadgeLevel
  title?: string
  description?: string
  progress?: number // 0-100 for progress-based achievements
  maxProgress?: number
  unlocked?: boolean
  isNew?: boolean
  showProgress?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  onClick?: () => void
  className?: string
  customIcon?: React.ReactNode
  customColor?: string
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  type,
  level,
  title,
  description,
  progress = 0,
  maxProgress = 100,
  unlocked = false,
  isNew = false,
  showProgress = false,
  size = 'md',
  onClick,
  className = '',
  customIcon,
  customColor
}) => {
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false)
  const [hasBeenUnlocked, setHasBeenUnlocked] = useState(unlocked)

  useEffect(() => {
    if (unlocked && !hasBeenUnlocked) {
      setShowUnlockAnimation(true)
      setHasBeenUnlocked(true)
      const timer = setTimeout(() => setShowUnlockAnimation(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [unlocked, hasBeenUnlocked])

  const getBadgeConfig = () => {
    const configs = {
      'first-lesson': {
        icon: <BookOpen className="w-full h-full" />,
        title: 'First Steps',
        description: 'Completed your first lesson',
        color: {
          bronze: 'from-amber-400 to-amber-600',
          silver: 'from-gray-300 to-gray-500',
          gold: 'from-yellow-300 to-yellow-500',
          platinum: 'from-purple-300 to-purple-500'
        }
      },
      'quiz-master': {
        icon: <Target className="w-full h-full" />,
        title: 'Quiz Master',
        description: 'Mastered quiz challenges',
        color: {
          bronze: 'from-orange-400 to-orange-600',
          silver: 'from-gray-300 to-gray-500',
          gold: 'from-yellow-300 to-yellow-500',
          platinum: 'from-purple-300 to-purple-500'
        }
      },
      'streak-keeper': {
        icon: <Flame className="w-full h-full" />,
        title: 'Streak Keeper',
        description: 'Maintained learning streak',
        color: {
          bronze: 'from-red-400 to-red-600',
          silver: 'from-gray-300 to-gray-500',
          gold: 'from-yellow-300 to-yellow-500',
          platinum: 'from-purple-300 to-purple-500'
        }
      },
      'course-complete': {
        icon: <Trophy className="w-full h-full" />,
        title: 'Course Champion',
        description: 'Completed entire course',
        color: {
          bronze: 'from-amber-400 to-amber-600',
          silver: 'from-gray-300 to-gray-500',
          gold: 'from-yellow-300 to-yellow-500',
          platinum: 'from-purple-300 to-purple-500'
        }
      },
      'perfect-score': {
        icon: <Star className="w-full h-full" />,
        title: 'Perfect Score',
        description: 'Achieved perfect results',
        color: {
          bronze: 'from-blue-400 to-blue-600',
          silver: 'from-gray-300 to-gray-500',
          gold: 'from-yellow-300 to-yellow-500',
          platinum: 'from-purple-300 to-purple-500'
        }
      },
      'fast-learner': {
        icon: <Zap className="w-full h-full" />,
        title: 'Fast Learner',
        description: 'Completed lessons quickly',
        color: {
          bronze: 'from-cyan-400 to-cyan-600',
          silver: 'from-gray-300 to-gray-500',
          gold: 'from-yellow-300 to-yellow-500',
          platinum: 'from-purple-300 to-purple-500'
        }
      },
      'helping-hand': {
        icon: <Users className="w-full h-full" />,
        title: 'Helping Hand',
        description: 'Helped other learners',
        color: {
          bronze: 'from-green-400 to-green-600',
          silver: 'from-gray-300 to-gray-500',
          gold: 'from-yellow-300 to-yellow-500',
          platinum: 'from-purple-300 to-purple-500'
        }
      },
      'time-keeper': {
        icon: <Clock className="w-full h-full" />,
        title: 'Time Keeper',
        description: 'Consistent daily learning',
        color: {
          bronze: 'from-indigo-400 to-indigo-600',
          silver: 'from-gray-300 to-gray-500',
          gold: 'from-yellow-300 to-yellow-500',
          platinum: 'from-purple-300 to-purple-500'
        }
      },
      'explorer': {
        icon: <BookOpen className="w-full h-full" />,
        title: 'Explorer',
        description: 'Explored multiple courses',
        color: {
          bronze: 'from-teal-400 to-teal-600',
          silver: 'from-gray-300 to-gray-500',
          gold: 'from-yellow-300 to-yellow-500',
          platinum: 'from-purple-300 to-purple-500'
        }
      },
      'champion': {
        icon: <Award className="w-full h-full" />,
        title: 'Champion',
        description: 'Outstanding achievement',
        color: {
          bronze: 'from-amber-400 to-amber-600',
          silver: 'from-gray-300 to-gray-500',
          gold: 'from-yellow-300 to-yellow-500',
          platinum: 'from-purple-300 to-purple-500'
        }
      },
      'custom': {
        icon: customIcon || <Star className="w-full h-full" />,
        title: 'Achievement',
        description: 'Custom achievement',
        color: {
          bronze: 'from-gray-400 to-gray-600',
          silver: 'from-gray-300 to-gray-500',
          gold: 'from-yellow-300 to-yellow-500',
          platinum: 'from-purple-300 to-purple-500'
        }
      }
    }

    return configs[type] || configs.custom
  }

  const config = getBadgeConfig()
  const finalTitle = title || config.title
  const finalDescription = description || config.description
  const finalIcon = customIcon || config.icon
  const gradientColor = customColor || config.color[level]

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'w-12 h-12',
          icon: 'w-6 h-6',
          title: 'text-xs',
          description: 'text-xs'
        }
      case 'lg':
        return {
          container: 'w-20 h-20',
          icon: 'w-10 h-10',
          title: 'text-sm',
          description: 'text-xs'
        }
      case 'xl':
        return {
          container: 'w-24 h-24',
          icon: 'w-12 h-12',
          title: 'text-base',
          description: 'text-sm'
        }
      default: // md
        return {
          container: 'w-16 h-16',
          icon: 'w-8 h-8',
          title: 'text-xs',
          description: 'text-xs'
        }
    }
  }

  const sizeClasses = getSizeClasses()
  const progressPercentage = Math.min((progress / maxProgress) * 100, 100)

  const badgeVariants = {
    locked: {
      scale: 1,
      opacity: 0.4,
      filter: 'grayscale(100%)',
    },
    unlocked: {
      scale: 1,
      opacity: 1,
      filter: 'grayscale(0%)',
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  }

  const unlockVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: [0, 1.3, 1],
      rotate: [0, 360],
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  const sparkleVariants = {
    animate: {
      opacity: [0, 1, 0],
      scale: [0.5, 1.5, 0.5],
      rotate: [0, 180, 360],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatDelay: 2
      }
    }
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <motion.div
        className={`relative ${sizeClasses.container} rounded-full p-2 cursor-pointer`}
        variants={badgeVariants}
        initial="locked"
        animate={unlocked ? "unlocked" : "locked"}
        whileHover={unlocked && onClick ? "hover" : undefined}
        whileTap={unlocked && onClick ? "tap" : undefined}
        onClick={unlocked && onClick ? onClick : undefined}
      >
        {/* Background Gradient */}
        <div 
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradientColor} ${
            unlocked ? 'shadow-lg' : 'shadow-sm'
          }`}
        />
        
        {/* Border Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-white dark:border-gray-900 shadow-inner" />
        
        {/* Icon Container */}
        <div className="relative z-10 w-full h-full flex items-center justify-center text-white">
          <div className={sizeClasses.icon}>
            {finalIcon}
          </div>
        </div>

        {/* Progress Ring */}
        {showProgress && !unlocked && (
          <svg 
            className="absolute inset-0 w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="white"
              strokeWidth="6"
              fill="none"
              strokeDasharray={`${progressPercentage * 2.83} 283`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
        )}

        {/* New Badge Indicator */}
        {isNew && unlocked && (
          <motion.div
            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-white text-xs font-bold">!</span>
          </motion.div>
        )}

        {/* Unlock Animation */}
        <AnimatePresence>
          {showUnlockAnimation && (
            <>
              {/* Main unlock animation */}
              <motion.div
                className={`absolute inset-0 ${sizeClasses.container} rounded-full bg-gradient-to-br ${gradientColor}`}
                variants={unlockVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className="absolute inset-0 rounded-full border-4 border-white dark:border-gray-900" />
                <div className="relative z-10 w-full h-full flex items-center justify-center text-white">
                  <div className={sizeClasses.icon}>
                    {finalIcon}
                  </div>
                </div>
              </motion.div>

              {/* Sparkle effects */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    x: `${Math.cos((i * 60) * Math.PI / 180) * 40}px`,
                    y: `${Math.sin((i * 60) * Math.PI / 180) * 40}px`
                  }}
                  variants={sparkleVariants}
                  initial="hidden"
                  animate="animate"
                  exit="hidden"
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tooltip/Label */}
      {(size === 'lg' || size === 'xl') && (
        <div className="mt-2 text-center">
          <p className={`font-medium text-gray-900 dark:text-white ${sizeClasses.title}`}>
            {finalTitle}
          </p>
          <p className={`text-gray-600 dark:text-gray-400 ${sizeClasses.description}`}>
            {finalDescription}
          </p>
          {showProgress && !unlocked && (
            <p className="text-xs text-gray-500 mt-1">
              {progress}/{maxProgress}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default AchievementBadge