'use client'

import { useEffect, useState } from 'react'
import { 
  validateLinks, 
  validateNavigationData, 
  validateBlogPost,
  validateBook,
  validatePageData,
  validateBatch
} from '@/utils/cmsValidator'

type DataType = 'navigation' | 'links' | 'blog' | 'book' | 'page' | 'general'

export const useSafeCMSData = <T = any>(
  data: T, 
  type: DataType = 'general'
): T => {
  const [safeData, setSafeData] = useState<T>(data)
  
  useEffect(() => {
    if (!data) {
      setSafeData(null as T)
      return
    }
    
    let validated: any
    
    switch(type) {
      case 'navigation':
        validated = validateNavigationData(data)
        break
      case 'links':
        validated = validateLinks(data)
        break
      case 'blog':
        if (Array.isArray(data)) {
          validated = validateBatch(data, 'blog')
        } else {
          validated = validateBlogPost(data)
        }
        break
      case 'book':
        if (Array.isArray(data)) {
          validated = validateBatch(data, 'book')
        } else {
          validated = validateBook(data)
        }
        break
      case 'page':
        validated = validatePageData(data)
        break
      default:
        validated = data
    }
    
    setSafeData(validated)
  }, [data, type])
  
  return safeData
}

// Hook for validating all links on a page
export const useValidatePageLinks = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const validateAllLinks = () => {
      const links = document.querySelectorAll('a')
      let invalidCount = 0
      
      links.forEach(link => {
        const href = link.getAttribute('href')
        if (!href || href === 'null' || href === 'undefined') {
          invalidCount++
          if (process.env.NODE_ENV === 'development') {
            console.warn('Invalid link found:', {
              text: link.textContent,
              href: href,
              element: link
            })
          }
        }
      })
      
      if (invalidCount > 0 && process.env.NODE_ENV === 'development') {
        console.warn(`⚠️ Found ${invalidCount} invalid links on this page`)
      }
    }
    
    // Run validation after a short delay to ensure DOM is ready
    const timer = setTimeout(validateAllLinks, 500)
    
    return () => clearTimeout(timer)
  }, [])
}

// Export a provider component for app-wide validation
export const CMSDataValidator: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useValidatePageLinks()
  return <>{children}</>
}