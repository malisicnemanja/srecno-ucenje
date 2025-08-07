'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  BookOpen, 
  AlertCircle, 
  Wifi, 
  RefreshCw, 
  Plus,
  BookX,
  GraduationCap,
  Target,
  Users
} from 'lucide-react'

export type EmptyStateVariant = 
  | 'no-data' 
  | 'no-search-results' 
  | 'no-lessons' 
  | 'no-quizzes'
  | 'no-progress'
  | 'no-achievements'
  | 'no-students'
  | 'error' 
  | 'offline' 
  | 'loading-error'
  | 'custom'

interface EmptyStateAction {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  icon?: React.ReactNode
}

interface EmptyStateProps {
  variant: EmptyStateVariant
  title?: string
  description?: string
  icon?: React.ReactNode
  illustration?: React.ReactNode
  actions?: EmptyStateAction[]
  className?: string
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

const EmptyState: React.FC<EmptyStateProps> = ({
  variant,
  title,
  description,
  icon,
  illustration,
  actions = [],
  className = '',
  size = 'md',
  animated = true
}) => {
  const getDefaultContent = () => {
    switch (variant) {
      case 'no-data':
        return {
          icon: <BookOpen className="w-12 h-12" />,
          title: 'No Data Available',
          description: 'There is no content to display at the moment. Check back later or try refreshing the page.'
        }
      
      case 'no-search-results':
        return {
          icon: <Search className="w-12 h-12" />,
          title: 'No Results Found',
          description: 'We couldn\'t find any content matching your search. Try adjusting your search terms or filters.'
        }
      
      case 'no-lessons':
        return {
          icon: <BookOpen className="w-12 h-12" />,
          title: 'No Lessons Available',
          description: 'There are no lessons in this course yet. New content will be added soon!'
        }
      
      case 'no-quizzes':
        return {
          icon: <Target className="w-12 h-12" />,
          title: 'No Quizzes Available',
          description: 'There are no quizzes available for this lesson. Complete the lesson content first.'
        }
      
      case 'no-progress':
        return {
          icon: <GraduationCap className="w-12 h-12" />,
          title: 'No Progress Yet',
          description: 'Start your learning journey! Your progress will be tracked as you complete lessons and quizzes.'
        }
      
      case 'no-achievements':
        return {
          icon: <span className="text-6xl">🏆</span>,
          title: 'No Achievements Yet',
          description: 'Keep learning to unlock achievements! Complete lessons, ace quizzes, and maintain streaks to earn badges.'
        }
      
      case 'no-students':
        return {
          icon: <Users className="w-12 h-12" />,
          title: 'No Students Enrolled',
          description: 'This course doesn\'t have any enrolled students yet. Share your course to start building your learning community.'
        }
      
      case 'error':
        return {
          icon: <AlertCircle className="w-12 h-12" />,
          title: 'Something Went Wrong',
          description: 'We encountered an error while loading the content. Please try again or contact support if the problem persists.'
        }
      
      case 'offline':
        return {
          icon: <Wifi className="w-12 h-12" />,
          title: 'You\'re Offline',
          description: 'Please check your internet connection and try again. Some features may not be available while offline.'
        }
      
      case 'loading-error':
        return {
          icon: <RefreshCw className="w-12 h-12" />,
          title: 'Failed to Load',
          description: 'We couldn\'t load the content. This might be a temporary issue. Try refreshing the page.'
        }
      
      default:
        return {
          icon: <BookX className="w-12 h-12" />,
          title: 'Nothing Here',
          description: 'There\'s nothing to display right now.'
        }
    }
  }

  const defaultContent = getDefaultContent()
  const finalTitle = title || defaultContent.title
  const finalDescription = description || defaultContent.description
  const finalIcon = icon || defaultContent.icon

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'py-8 px-4',
          icon: 'mb-3',
          title: 'text-base font-semibold mb-2',
          description: 'text-sm',
          actions: 'mt-4 space-y-2 space-x-0 flex-col'
        }
      case 'lg':
        return {
          container: 'py-16 px-8',
          icon: 'mb-6',
          title: 'text-2xl font-bold mb-4',
          description: 'text-lg',
          actions: 'mt-8 space-y-0 space-x-4 flex-row'
        }
      default: // md
        return {
          container: 'py-12 px-6',
          icon: 'mb-4',
          title: 'text-xl font-semibold mb-3',
          description: 'text-base',
          actions: 'mt-6 space-y-0 space-x-3 flex-row'
        }
    }
  }

  const sizeClasses = getSizeClasses()

  const getIconColor = () => {
    switch (variant) {
      case 'error':
      case 'loading-error':
        return 'text-red-400'
      case 'offline':
        return 'text-orange-400'
      case 'no-achievements':
        return 'text-yellow-500'
      case 'no-progress':
        return 'text-blue-400'
      case 'no-lessons':
      case 'no-quizzes':
        return 'text-green-400'
      default:
        return 'text-gray-400 dark:text-gray-500'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  const getActionButtonClasses = (action: EmptyStateAction) => {
    const baseClasses = "inline-flex items-center justify-center px-4 py-2 border rounded-lg font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
    
    switch (action.variant) {
      case 'primary':
        return `${baseClasses} border-transparent bg-green-600 text-white hover:bg-green-700 focus:ring-green-500`
      case 'secondary':
        return `${baseClasses} border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500`
      case 'outline':
        return `${baseClasses} border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800`
      default:
        return `${baseClasses} border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700`
    }
  }

  return (
    <motion.div
      className={`flex flex-col items-center justify-center text-center ${sizeClasses.container} ${className}`}
      variants={animated ? containerVariants : undefined}
      initial={animated ? "hidden" : undefined}
      animate={animated ? "visible" : undefined}
    >
      {/* Illustration or Icon */}
      {illustration ? (
        <motion.div
          className={sizeClasses.icon}
          variants={animated ? itemVariants : undefined}
        >
          {illustration}
        </motion.div>
      ) : (
        <motion.div
          className={`${getIconColor()} ${sizeClasses.icon}`}
          variants={animated ? itemVariants : undefined}
        >
          {finalIcon}
        </motion.div>
      )}

      {/* Title */}
      <motion.h3
        className={`${sizeClasses.title} text-gray-900 dark:text-white`}
        variants={animated ? itemVariants : undefined}
      >
        {finalTitle}
      </motion.h3>

      {/* Description */}
      <motion.p
        className={`${sizeClasses.description} text-gray-500 dark:text-gray-400 max-w-md`}
        variants={animated ? itemVariants : undefined}
      >
        {finalDescription}
      </motion.p>

      {/* Actions */}
      {actions.length > 0 && (
        <motion.div
          className={`flex ${sizeClasses.actions}`}
          variants={animated ? itemVariants : undefined}
        >
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={getActionButtonClasses(action)}
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default EmptyState