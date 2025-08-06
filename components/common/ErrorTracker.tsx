'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ErrorTracker() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Store original console.error
      const originalError = console.error
      
      // Override console.error to catch Link href errors
      console.error = function(...args) {
        const errorString = args[0]?.toString?.() || ''
        
        if (errorString.includes('href') || errorString.includes('Link')) {
          console.log('🔴 LINK ERROR DETECTED:', {
            error: errorString,
            pathname: pathname,
            timestamp: new Date().toISOString()
          })
          
          // Find all problematic links on the page
          const links = document.querySelectorAll('a')
          const problematicLinks: any[] = []
          
          links.forEach((link, index) => {
            const href = link.getAttribute('href')
            if (!href || href === 'null' || href === 'undefined' || href === '') {
              problematicLinks.push({
                index,
                href: href,
                text: link.textContent?.substring(0, 50),
                className: link.className,
                parent: link.parentElement?.tagName,
                parentClass: link.parentElement?.className
              })
            }
          })
          
          if (problematicLinks.length > 0) {
            console.log('🔍 PROBLEMATIC LINKS FOUND:', problematicLinks)
            
            // Visual indicator in development
            if (process.env.NODE_ENV === 'development') {
              problematicLinks.forEach((linkInfo, i) => {
                const link = links[linkInfo.index]
                if (link) {
                  link.style.outline = '3px dashed red'
                  link.style.outlineOffset = '2px'
                  link.title = `Missing href: ${linkInfo.href}`
                }
              })
            }
          }
        }
        
        // Call original console.error
        originalError.apply(console, args)
      }
      
      // Cleanup on unmount
      return () => {
        console.error = originalError
      }
    }
  }, [pathname])
  
  return null
}