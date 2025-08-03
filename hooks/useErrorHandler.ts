import { useCallback } from 'react'
import { trackEvent } from '@/lib/analytics'

interface ErrorHandlerOptions {
  showAlert?: boolean
  logToConsole?: boolean
  trackAnalytics?: boolean
  fallbackMessage?: string
}

interface ErrorInfo {
  message: string
  code?: string | number
  details?: any
}

export function useErrorHandler(options: ErrorHandlerOptions = {}) {
  const {
    showAlert = true,
    logToConsole = true,
    trackAnalytics = true,
    fallbackMessage = 'Dogodila se neočekivana greška. Molimo pokušajte ponovo.'
  } = options

  const handleError = useCallback((
    error: Error | ErrorInfo | string,
    context?: string
  ) => {
    let errorInfo: ErrorInfo

    if (typeof error === 'string') {
      errorInfo = { message: error }
    } else if (error instanceof Error) {
      errorInfo = { 
        message: error.message,
        details: error.stack 
      }
    } else {
      errorInfo = error
    }

    // Log to console if enabled
    if (logToConsole) {
      console.error(`Error${context ? ` in ${context}` : ''}:`, errorInfo)
    }

    // Track in analytics if enabled
    if (trackAnalytics) {
      trackEvent({
        category: 'Error',
        action: 'handled_error',
        label: context || 'unknown',
        value: errorInfo.code ? Number(errorInfo.code) : undefined
      })
    }

    // Show alert if enabled
    if (showAlert) {
      const displayMessage = errorInfo.message || fallbackMessage
      alert(displayMessage)
    }

    return errorInfo
  }, [showAlert, logToConsole, trackAnalytics, fallbackMessage])

  const handleAsyncError = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    context?: string
  ): Promise<T | null> => {
    try {
      return await asyncFn()
    } catch (error) {
      handleError(error as Error, context)
      return null
    }
  }, [handleError])

  const createErrorHandler = useCallback((context: string) => {
    return (error: Error | ErrorInfo | string) => handleError(error, context)
  }, [handleError])

  return {
    handleError,
    handleAsyncError,
    createErrorHandler
  }
}