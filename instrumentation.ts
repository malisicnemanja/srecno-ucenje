import * as Sentry from '@sentry/nextjs'

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server instrumentation
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      
      // Define how likely traces are sampled. Adjust this value in production.
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      
      // Set sampling rate for profiling - this is relative to tracesSampleRate
      profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      
      debug: false,
      
      environment: process.env.NODE_ENV,
      
      beforeSend(event) {
        // Filter out common, non-actionable errors
        if (event.exception) {
          const error = event.exception.values?.[0]
          
          // Filter out network errors that aren't our fault
          if (error?.type === 'NetworkError' || 
              error?.value?.includes('fetch')) {
            return null
          }
          
          // Filter out Sanity connection errors in development
          if (process.env.NODE_ENV === 'development' && 
              error?.value?.includes('sanity')) {
            return null
          }
        }
        
        return event
      },
    })
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge runtime instrumentation
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      
      // Define how likely traces are sampled. Adjust this value in production.
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      
      debug: false,
      
      environment: process.env.NODE_ENV,
    })
  }
}