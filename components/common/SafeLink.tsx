'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useRef, ComponentProps, ReactNode } from 'react'

// Global tracker for development
const linkIssues: any[] = []

interface SafeLinkProps extends Omit<ComponentProps<typeof Link>, 'href'> {
  href?: string | null | undefined | { pathname?: string; query?: any }
  children: ReactNode
  fallback?: string
  warnInDev?: boolean
  component?: 'link' | 'button' | 'span'
  onClick?: () => void
  className?: string
  disabled?: boolean
}

const SafeLink = ({ 
  href, 
  children, 
  fallback = '/',
  warnInDev = true,
  component = 'link',
  onClick,
  className,
  disabled,
  ...props 
}: SafeLinkProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const elementRef = useRef<HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement>(null)
  
  // Aggressive logging in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && warnInDev) {
      if (!href || href === 'null' || href === 'undefined' || href === '') {
        const issue = {
          href: href,
          children: typeof children === 'string' ? children : 'Complex children',
          path: pathname,
          timestamp: new Date().toISOString(),
          stack: new Error().stack
        }
        
        linkIssues.push(issue)
        
        console.warn('🔗 SafeLink Issue Detected:', issue)
        
        // Visual indicator in development
        if (elementRef.current) {
          (elementRef.current as HTMLElement).style.outline = '2px dashed orange'
          ;(elementRef.current as HTMLElement).style.outlineOffset = '2px'
          ;(elementRef.current as HTMLElement).title = `Missing href: ${href}`
        }
      }
    }
  }, [href, children, pathname, warnInDev])
  
  // HREF normalization
  const getSafeHref = (): string | { pathname: string; query?: any } => {
    // Null, undefined, empty string
    if (!href || href === '' || href === 'null' || href === 'undefined') {
      return fallback
    }
    
    // Already valid string
    if (typeof href === 'string' && href.length > 0) {
      // Check for template literal issues
      if (href.includes('undefined') || href.includes('null')) {
        return fallback
      }
      return href
    }
    
    // Object with pathname (Next.js URL object)
    if (typeof href === 'object' && href !== null) {
      if (href.pathname) {
        return href
      }
      return fallback
    }
    
    // Everything else
    return fallback
  }
  
  const safeHref = getSafeHref()
  
  // If component='button' or no valid href
  if (component === 'button' || safeHref === '#') {
    return (
      <button
        ref={elementRef as any}
        onClick={onClick || (() => {
          if (typeof safeHref === 'string') {
            router.push(safeHref)
          }
        })}
        className={className}
        disabled={disabled}
        {...props as any}
      >
        {children}
      </button>
    )
  }
  
  // If component='span' or disabled
  if (component === 'span' || disabled) {
    return (
      <span
        ref={elementRef as any}
        className={className}
        {...props as any}
      >
        {children}
      </span>
    )
  }
  
  // Default - Link component
  return (
    <Link 
      href={safeHref} 
      className={className}
      ref={elementRef as any}
      {...props}
    >
      {children}
    </Link>
  )
}

// Export helper for debug
export const getSafeLinkIssues = () => linkIssues

// Export for global replacement
export default SafeLink