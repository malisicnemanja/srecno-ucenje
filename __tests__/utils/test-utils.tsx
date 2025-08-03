import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { ErrorProvider } from '@/components/common/ErrorProvider'

// Custom render function with providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorProvider>
      {children}
    </ErrorProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

// Mock data generators
export const mockCalculatorSettings = {
  franchiseModels: [
    { name: 'Osnovni paket', basePrice: 15000 },
    { name: 'Premium paket', basePrice: 25000 }
  ],
  cities: [
    { name: 'Beograd', priceMultiplier: 1.2, demandLevel: 'high' },
    { name: 'Novi Sad', priceMultiplier: 1.0, demandLevel: 'medium' }
  ],
  spaceRequirements: {
    minSquareMeters: 50,
    optimalSquareMeters: 150,
    maxSquareMeters: 300
  },
  renovationCosts: {
    basic: 200,
    standard: 350,
    premium: 500
  },
  operationalCosts: {
    monthlyMarketing: 500,
    monthlyUtilities: 300,
    monthlyOther: 200,
    staffSalaryPerPerson: 800
  },
  revenueSettings: {
    averageChildrenPerGroup: 10,
    groupsPerDay: 4,
    pricePerChild: 50,
    workingDaysPerMonth: 22
  }
}

export const mockQuizData = {
  title: 'Test kviz',
  description: 'Test opis kviza',
  questions: [
    {
      question: 'Test pitanje 1?',
      type: 'boolean' as const,
      weight: 1
    },
    {
      question: 'Test pitanje 2?',
      type: 'multiple_choice' as const,
      answers: [
        { text: 'Odgovor 1', value: 5 },
        { text: 'Odgovor 2', value: 10 }
      ],
      weight: 1
    }
  ],
  results: [
    {
      minScore: 0,
      maxScore: 10,
      title: 'Početnik',
      description: 'Potrebno je više rada',
      recommendations: ['Preporuka 1', 'Preporuka 2']
    },
    {
      minScore: 11,
      maxScore: 20,
      title: 'Ekspert',
      description: 'Odličan rezultat!',
      recommendations: ['Preporuka za eksperte']
    }
  ]
}