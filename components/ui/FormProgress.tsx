'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Check, Circle, ChevronRight } from 'lucide-react'

export interface FormStep {
  id: string
  title: string
  description?: string
  optional?: boolean
  completed?: boolean
  error?: boolean
}

interface FormProgressProps {
  steps: FormStep[]
  currentStep: number
  variant?: 'horizontal' | 'vertical' | 'compact'
  showLabels?: boolean
  showDescription?: boolean
  className?: string
  onStepClick?: (stepIndex: number) => void
  allowStepNavigation?: boolean
}

const FormProgress: React.FC<FormProgressProps> = ({
  steps,
  currentStep,
  variant = 'horizontal',
  showLabels = true,
  showDescription = false,
  className = '',
  onStepClick,
  allowStepNavigation = false
}) => {
  const getStepStatus = (index: number, step: FormStep) => {
    if (step.error) return 'error'
    if (step.completed || index < currentStep) return 'completed'
    if (index === currentStep) return 'current'
    return 'pending'
  }

  const getStepIcon = (index: number, step: FormStep) => {
    const status = getStepStatus(index, step)
    
    switch (status) {
      case 'completed':
        return <Check className="w-4 h-4" />
      case 'error':
        return <span className="text-xs font-bold">!</span>
      case 'current':
        return <span className="text-xs font-semibold">{index + 1}</span>
      default:
        return <span className="text-xs">{index + 1}</span>
    }
  }

  const getStepClasses = (index: number, step: FormStep) => {
    const status = getStepStatus(index, step)
    const baseClasses = "flex items-center justify-center w-8 h-8 rounded-full border-2 font-medium text-sm transition-all duration-200"
    
    const statusClasses = {
      completed: "bg-green-600 border-green-600 text-white",
      current: "bg-blue-600 border-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900",
      error: "bg-red-600 border-red-600 text-white",
      pending: "bg-gray-100 border-gray-300 text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400"
    }
    
    const clickableClasses = allowStepNavigation && onStepClick ? "cursor-pointer hover:scale-105" : ""
    
    return `${baseClasses} ${statusClasses[status]} ${clickableClasses}`
  }

  const getConnectorClasses = (index: number) => {
    const isCompleted = index < currentStep
    return `h-0.5 transition-all duration-300 ${
      isCompleted 
        ? 'bg-green-600' 
        : 'bg-gray-300 dark:bg-gray-600'
    }`
  }

  const handleStepClick = (index: number, step: FormStep) => {
    if (allowStepNavigation && onStepClick && !step.error) {
      onStepClick(index)
    }
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="flex items-center space-x-1">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Step {currentStep + 1} of {steps.length}
          </span>
          {steps[currentStep]?.title && (
            <>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {steps[currentStep].title}
              </span>
            </>
          )}
        </div>
        <div className="flex-1 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <motion.div
            className="bg-green-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ 
              width: `${((currentStep + 1) / steps.length) * 100}%` 
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>
    )
  }

  if (variant === 'vertical') {
    return (
      <div className={`space-y-4 ${className}`}>
        {steps.map((step, index) => {
          const status = getStepStatus(index, step)
          const isLast = index === steps.length - 1
          
          return (
            <div key={step.id} className="flex items-start">
              {/* Step Indicator */}
              <div className="flex flex-col items-center">
                <motion.button
                  className={getStepClasses(index, step)}
                  onClick={() => handleStepClick(index, step)}
                  disabled={!allowStepNavigation}
                  whileHover={allowStepNavigation ? { scale: 1.05 } : {}}
                  whileTap={allowStepNavigation ? { scale: 0.95 } : {}}
                  aria-label={`Step ${index + 1}: ${step.title}`}
                  aria-current={status === 'current' ? 'step' : undefined}
                >
                  {getStepIcon(index, step)}
                </motion.button>
                
                {/* Vertical Connector */}
                {!isLast && (
                  <motion.div
                    className={`w-0.5 h-12 mt-2 ${getConnectorClasses(index)}`}
                    initial={{ height: 0 }}
                    animate={{ height: 48 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  />
                )}
              </div>

              {/* Step Content */}
              {showLabels && (
                <div className="ml-4 pb-8">
                  <h3 className={`text-sm font-medium ${
                    status === 'current' 
                      ? 'text-blue-600 dark:text-blue-400'
                      : status === 'completed'
                      ? 'text-green-600 dark:text-green-400'
                      : status === 'error'
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.title}
                    {step.optional && (
                      <span className="ml-2 text-xs text-gray-400">(Optional)</span>
                    )}
                  </h3>
                  
                  {showDescription && step.description && (
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {step.description}
                    </p>
                  )}
                  
                  {status === 'error' && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                      Please complete this step to continue
                    </p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // Horizontal variant (default)
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const status = getStepStatus(index, step)
          const isLast = index === steps.length - 1
          
          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Container */}
              <div className="flex flex-col items-center">
                {/* Step Indicator */}
                <motion.button
                  className={getStepClasses(index, step)}
                  onClick={() => handleStepClick(index, step)}
                  disabled={!allowStepNavigation}
                  whileHover={allowStepNavigation ? { scale: 1.05 } : {}}
                  whileTap={allowStepNavigation ? { scale: 0.95 } : {}}
                  aria-label={`Step ${index + 1}: ${step.title}`}
                  aria-current={status === 'current' ? 'step' : undefined}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.2 }}
                >
                  {getStepIcon(index, step)}
                </motion.button>

                {/* Step Label */}
                {showLabels && (
                  <div className="mt-2 text-center max-w-[120px]">
                    <p className={`text-xs font-medium ${
                      status === 'current' 
                        ? 'text-blue-600 dark:text-blue-400'
                        : status === 'completed'
                        ? 'text-green-600 dark:text-green-400'
                        : status === 'error'
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.title}
                      {step.optional && (
                        <span className="block text-gray-400">(Optional)</span>
                      )}
                    </p>
                    
                    {showDescription && step.description && (
                      <p className="mt-1 text-xs text-gray-400">
                        {step.description}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Horizontal Connector */}
              {!isLast && (
                <motion.div
                  className={`flex-1 mx-4 ${getConnectorClasses(index)}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: (index + 1) * 0.1, duration: 0.3 }}
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Overall Progress Bar */}
      <div className="mt-8 w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
        <motion.div
          className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ 
            width: `${((currentStep + 1) / steps.length) * 100}%` 
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Progress Text */}
      <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
        <span>Step {currentStep + 1} of {steps.length}</span>
        <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
      </div>
    </div>
  )
}

export default FormProgress