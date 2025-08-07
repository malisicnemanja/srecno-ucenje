'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, MessageCircle, BookOpen, HelpCircle, Settings, Home, Search } from 'lucide-react'

interface FABAction {
  id: string
  icon: React.ReactNode
  label: string
  onClick: () => void
  color?: string
  disabled?: boolean
}

interface FABProps {
  actions?: FABAction[]
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'bottom-center'
  variant?: 'default' | 'educational' | 'minimal'
  mainIcon?: React.ReactNode
  mainAction?: () => void
  size?: 'sm' | 'md' | 'lg'
  className?: string
  tooltip?: string
  disabled?: boolean
  hideOnScroll?: boolean
  expandDirection?: 'up' | 'down' | 'left' | 'right' | 'auto'
}

const FAB: React.FC<FABProps> = ({
  actions = [],
  position = 'bottom-right',
  variant = 'default',
  mainIcon,
  mainAction,
  size = 'md',
  className = '',
  tooltip,
  disabled = false,
  hideOnScroll = false,
  expandDirection = 'auto'
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const fabRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)

  // Handle scroll hiding
  useEffect(() => {
    if (!hideOnScroll) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollY.current
      
      setIsVisible(!isScrollingDown || currentScrollY < 100)
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hideOnScroll])

  // Close FAB when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isExpanded])

  const getPositionClasses = () => {
    const positions = {
      'bottom-right': 'bottom-6 right-6',
      'bottom-left': 'bottom-6 left-6',
      'top-right': 'top-6 right-6',
      'top-left': 'top-6 left-6',
      'bottom-center': 'bottom-6 left-1/2 transform -translate-x-1/2'
    }
    return positions[position]
  }

  const getSizeClasses = () => {
    const sizes = {
      sm: {
        main: 'w-12 h-12',
        action: 'w-10 h-10',
        icon: 'w-5 h-5',
        actionIcon: 'w-4 h-4'
      },
      md: {
        main: 'w-14 h-14',
        action: 'w-12 h-12',
        icon: 'w-6 h-6',
        actionIcon: 'w-5 h-5'
      },
      lg: {
        main: 'w-16 h-16',
        action: 'w-14 h-14',
        icon: 'w-7 h-7',
        actionIcon: 'w-6 h-6'
      }
    }
    return sizes[size]
  }

  const getExpandDirection = () => {
    if (expandDirection !== 'auto') return expandDirection
    
    // Auto-detect based on position
    if (position.includes('bottom')) return 'up'
    if (position.includes('top')) return 'down'
    if (position.includes('right')) return 'left'
    return 'right'
  }

  const getActionPositions = (index: number) => {
    const direction = getExpandDirection()
    const spacing = size === 'sm' ? 60 : size === 'lg' ? 80 : 70
    const offset = spacing * (index + 1)

    const positions = {
      up: { x: 0, y: -offset },
      down: { x: 0, y: offset },
      left: { x: -offset, y: 0 },
      right: { x: offset, y: 0 }
    }

    return positions[direction]
  }

  const getVariantStyles = () => {
    const variants = {
      default: {
        bg: 'bg-blue-600 hover:bg-blue-700',
        shadow: 'shadow-lg hover:shadow-xl',
        text: 'text-white'
      },
      educational: {
        bg: 'bg-green-600 hover:bg-green-700',
        shadow: 'shadow-lg hover:shadow-xl',
        text: 'text-white'
      },
      minimal: {
        bg: 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700',
        shadow: 'shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700',
        text: 'text-gray-700 dark:text-gray-300'
      }
    }
    return variants[variant]
  }

  const sizeClasses = getSizeClasses()
  const variantStyles = getVariantStyles()

  const handleMainClick = () => {
    if (actions.length > 0) {
      setIsExpanded(!isExpanded)
    } else if (mainAction) {
      mainAction()
    }
  }

  const handleActionClick = (action: FABAction) => {
    action.onClick()
    setIsExpanded(false)
  }

  const getDefaultIcon = () => {
    if (mainIcon) return mainIcon
    if (actions.length > 0) {
      return isExpanded ? <X className={sizeClasses.icon} /> : <Plus className={sizeClasses.icon} />
    }
    return <Plus className={sizeClasses.icon} />
  }

  const fabVariants = {
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25
      }
    },
    hidden: {
      scale: 0.3,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  }

  const actionVariants = {
    hidden: (index: number) => ({
      scale: 0,
      opacity: 0,
      ...getActionPositions(index)
    }),
    visible: (index: number) => ({
      scale: 1,
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
        delay: index * 0.05
      }
    }),
    exit: (index: number) => ({
      scale: 0,
      opacity: 0,
      ...getActionPositions(index),
      transition: {
        duration: 0.15,
        delay: (actions.length - index - 1) * 0.03
      }
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={fabRef}
          className={`fixed z-50 ${getPositionClasses()} ${className}`}
          variants={fabVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Action Buttons */}
          <AnimatePresence>
            {isExpanded && actions.map((action, index) => (
              <motion.div
                key={action.id}
                className="absolute"
                custom={index}
                variants={actionVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  transformOrigin: 'center center',
                  ...getActionPositions(index)
                }}
              >
                {/* Action Button */}
                <button
                  onClick={() => handleActionClick(action)}
                  disabled={action.disabled}
                  className={`
                    relative ${sizeClasses.action} rounded-full
                    ${action.color || 'bg-white dark:bg-gray-800'}
                    shadow-lg border border-gray-200 dark:border-gray-700
                    hover:shadow-xl transform hover:scale-110
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200
                    flex items-center justify-center
                    text-gray-700 dark:text-gray-300
                  `}
                  title={action.label}
                >
                  <span className={sizeClasses.actionIcon}>
                    {action.icon}
                  </span>
                </button>

                {/* Action Label */}
                <div className={`
                  absolute whitespace-nowrap px-3 py-1 bg-gray-900 dark:bg-gray-700 
                  text-white text-xs rounded-lg shadow-lg pointer-events-none
                  ${position.includes('right') ? 'right-full mr-3' : 'left-full ml-3'}
                  top-1/2 transform -translate-y-1/2
                `}>
                  {action.label}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Main FAB Button */}
          <motion.button
            onClick={handleMainClick}
            disabled={disabled}
            className={`
              relative ${sizeClasses.main} rounded-full
              ${variantStyles.bg} ${variantStyles.shadow} ${variantStyles.text}
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300 ease-out
              flex items-center justify-center
              transform-gpu
              ${isExpanded ? 'rotate-45' : 'rotate-0'}
              ${isHovered ? 'scale-110' : 'scale-100'}
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: disabled ? 1 : 1.1 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            title={tooltip}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {getDefaultIcon()}
            </motion.div>

            {/* Ripple effect */}
            <motion.div
              className={`absolute inset-0 rounded-full ${variantStyles.bg} opacity-0`}
              animate={isHovered ? { scale: [1, 1.4], opacity: [0, 0.3, 0] } : {}}
              transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
            />
          </motion.button>

          {/* Main Tooltip */}
          {tooltip && !isExpanded && (
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className={`
                    absolute whitespace-nowrap px-3 py-1 bg-gray-900 dark:bg-gray-700 
                    text-white text-xs rounded-lg shadow-lg pointer-events-none z-10
                    ${position.includes('right') ? 'right-full mr-3' : 'left-full ml-3'}
                    top-1/2 transform -translate-y-1/2
                  `}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  {tooltip}
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Backdrop for expanded state */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsExpanded(false)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Predefined educational FAB configurations
export const EducationalFAB: React.FC<Omit<FABProps, 'variant' | 'actions'>> = (props) => {
  const educationalActions: FABAction[] = [
    {
      id: 'help',
      icon: <HelpCircle className="w-full h-full" />,
      label: 'Get Help',
      onClick: () => console.log('Help clicked')
    },
    {
      id: 'search',
      icon: <Search className="w-full h-full" />,
      label: 'Search Lessons',
      onClick: () => console.log('Search clicked')
    },
    {
      id: 'lessons',
      icon: <BookOpen className="w-full h-full" />,
      label: 'My Lessons',
      onClick: () => console.log('Lessons clicked')
    }
  ]

  return (
    <FAB
      {...props}
      variant="educational"
      actions={educationalActions}
      tooltip="Learning Tools"
    />
  )
}

export const SupportFAB: React.FC<Omit<FABProps, 'variant' | 'mainIcon' | 'mainAction'>> = (props) => (
  <FAB
    {...props}
    variant="default"
    mainIcon={<MessageCircle className="w-6 h-6" />}
    mainAction={() => console.log('Support chat opened')}
    tooltip="Contact Support"
  />
)

export default FAB