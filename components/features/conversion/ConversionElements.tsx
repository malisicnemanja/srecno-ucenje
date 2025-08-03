'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

// Dynamically import conversion components
const ExitIntentPopup = dynamic(() => import('./ExitIntentPopup'), {
  ssr: false,
})

const SmartCTABar = dynamic(() => import('./SmartCTABar'), {
  ssr: false,
})

export default function ConversionElements() {
  const pathname = usePathname()
  
  // Determine page type for exit intent
  const getPageType = () => {
    if (pathname === '/') return 'home'
    if (pathname.includes('fransize')) return 'franchise'
    if (pathname.includes('kalkulator')) return 'calculator'
    if (pathname.includes('kviz')) return 'quiz'
    return 'default'
  }

  return (
    <>
      <ExitIntentPopup pageType={getPageType()} />
      <SmartCTABar />
    </>
  )
}