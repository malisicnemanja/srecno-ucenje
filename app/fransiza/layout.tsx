import { Metadata } from 'next'
import { baseUrl } from '@/lib/seo-config'

export const metadata: Metadata = {
  title: 'Franšiza - Srećno učenje',
  description: 'Pridružite se uspešnoj franšiznoj mreži Srećno učenje. Kompletna podrška, dokazani rezultati i mogućnost pokretanja obrazovnog centra.',
  keywords: ['franšiza', 'franšiza obrazovanje', 'franšiza Srbija', 'poslovni partner', 'brzo čitanje franšiza'],
  openGraph: {
    title: 'Franšiza - Srećno učenje',
    description: 'Kompletna franšizna podrška za pokretanje obrazovnog centra',
    url: `${baseUrl}/fransiza`,
    type: 'website'
  }
}

export default function FranchiseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}