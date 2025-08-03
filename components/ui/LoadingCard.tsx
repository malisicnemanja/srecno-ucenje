'use client'

import { motion } from 'framer-motion'

interface LoadingCardProps {
  variant?: 'default' | 'calculator' | 'quiz' | 'resource' | 'blog'
  className?: string
}

const shimmer = {
  hidden: { opacity: 0.3 },
  visible: { 
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: 'reverse' as const,
      duration: 1.5,
      ease: 'easeInOut'
    }
  }
}

export default function LoadingCard({ variant = 'default', className = '' }: LoadingCardProps) {
  const renderContent = () => {
    switch (variant) {
      case 'calculator':
        return (
          <>
            {/* Calculator Header */}
            <motion.div 
              className="h-8 bg-gray-200 rounded mb-4" 
              variants={shimmer}
              initial="hidden"
              animate="visible"
            />
            
            {/* Input Fields */}
            <div className="space-y-4 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <motion.div 
                    className="h-4 bg-gray-200 rounded w-1/3 mb-2"
                    variants={shimmer}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: i * 0.1 }}
                  />
                  <motion.div 
                    className="h-12 bg-gray-200 rounded"
                    variants={shimmer}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: i * 0.1 + 0.05 }}
                  />
                </div>
              ))}
            </div>
            
            {/* Results Section */}
            <motion.div 
              className="h-64 bg-gray-200 rounded"
              variants={shimmer}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            />
          </>
        )
        
      case 'quiz':
        return (
          <>
            {/* Progress Bar */}
            <motion.div 
              className="h-2 bg-gray-200 rounded-full mb-4"
              variants={shimmer}
              initial="hidden"
              animate="visible"
            />
            
            {/* Question Counter */}
            <motion.div 
              className="h-4 bg-gray-200 rounded w-24 mb-6"
              variants={shimmer}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            />
            
            {/* Question */}
            <motion.div 
              className="h-6 bg-gray-200 rounded mb-6"
              variants={shimmer}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            />
            
            {/* Answer Options */}
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <motion.div 
                  key={i}
                  className="h-12 bg-gray-200 rounded"
                  variants={shimmer}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 + i * 0.1 }}
                />
              ))}
            </div>
          </>
        )
        
      case 'resource':
        return (
          <>
            {/* Resource Thumbnail */}
            <motion.div 
              className="h-48 bg-gray-200 rounded mb-4"
              variants={shimmer}
              initial="hidden"
              animate="visible"
            />
            
            {/* Title */}
            <motion.div 
              className="h-6 bg-gray-200 rounded mb-2"
              variants={shimmer}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            />
            
            {/* Description */}
            <div className="space-y-2 mb-4">
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i}
                  className="h-4 bg-gray-200 rounded"
                  variants={shimmer}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 + i * 0.05 }}
                />
              ))}
            </div>
            
            {/* Metadata */}
            <div className="flex justify-between items-center">
              <motion.div 
                className="h-4 bg-gray-200 rounded w-16"
                variants={shimmer}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
              />
              <motion.div 
                className="h-8 bg-gray-200 rounded w-24"
                variants={shimmer}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.45 }}
              />
            </div>
          </>
        )
        
      case 'blog':
        return (
          <>
            {/* Featured Image */}
            <motion.div 
              className="h-48 bg-gray-200 rounded mb-4"
              variants={shimmer}
              initial="hidden"
              animate="visible"
            />
            
            {/* Category */}
            <motion.div 
              className="h-4 bg-gray-200 rounded w-20 mb-2"
              variants={shimmer}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            />
            
            {/* Title */}
            <motion.div 
              className="h-6 bg-gray-200 rounded mb-3"
              variants={shimmer}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
            />
            
            {/* Excerpt */}
            <div className="space-y-2 mb-4">
              {[1, 2].map((i) => (
                <motion.div 
                  key={i}
                  className="h-4 bg-gray-200 rounded"
                  variants={shimmer}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 + i * 0.05 }}
                />
              ))}
            </div>
            
            {/* Meta info */}
            <div className="flex items-center space-x-4">
              <motion.div 
                className="w-8 h-8 bg-gray-200 rounded-full"
                variants={shimmer}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              />
              <motion.div 
                className="h-4 bg-gray-200 rounded w-32"
                variants={shimmer}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.35 }}
              />
            </div>
          </>
        )
        
      default:
        return (
          <>
            <motion.div 
              className="h-6 bg-gray-200 rounded mb-4"
              variants={shimmer}
              initial="hidden"
              animate="visible"
            />
            <div className="space-y-2 mb-4">
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i}
                  className="h-4 bg-gray-200 rounded"
                  variants={shimmer}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </div>
            <motion.div 
              className="h-10 bg-gray-200 rounded"
              variants={shimmer}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            />
          </>
        )
    }
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {renderContent()}
    </div>
  )
}