import { Metadata } from 'next'
import FAQPageClient from '@/components/features/faq/FAQPageClient'
import { baseUrl } from '@/lib/seo-config'

// SEO metadata for FAQ page
export const metadata: Metadata = {
  title: 'Česta pitanja - Srećno učenje | Sve o franšizi i programima',
  description: 'Odgovori na najčešća pitanja o franšizi Srećno učenje, programima brzog čitanja, investiciji i poslovanju. Saznajte sve što vas zanima!',
  keywords: ['česta pitanja', 'FAQ franšiza', 'Srećno učenje pitanja', 'franšiza odgovori', 'brzo čitanje pitanja'],
  openGraph: {
    title: 'Česta pitanja - Srećno učenje',
    description: 'Pronađite odgovore na sva vaša pitanja o franšizi i programima Srećnog učenja',
    url: `${baseUrl}/faq`,
    type: 'website'
  }
}

export default function FAQPage() {
  return <FAQPageClient />
}