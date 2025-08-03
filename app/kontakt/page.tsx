'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function KontaktPage() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('/zakazivanje')
  }, [])

  return null // Redirect happens in useEffect
}