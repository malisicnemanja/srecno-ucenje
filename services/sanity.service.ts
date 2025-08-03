import { saveSanityDocument, patchSanityDocument } from '@/lib/sanity-write'
import { 
  BookingFormData, 
  LeadInfo,
  NewsletterSubscriber
} from '@/types'
import { AnyCalculatorInputs, AnyCalculatorResults } from '@/types/calculator'
import { QuizResult, QuizAnswers, QuizAnswerValue } from '@/types/quiz'

// Calculator result service
export const saveCalculatorResult = async (
  type: 'investment' | 'roi',
  inputs: AnyCalculatorInputs,
  results: AnyCalculatorResults,
  leadInfo: LeadInfo,
  leadScore: number
) => {
  return saveSanityDocument('calculatorResult', {
    type,
    email: leadInfo.email,
    phone: leadInfo.phone,
    inputs,
    results: {
      ...results,
      breakdown: typeof results.breakdown === 'object' 
        ? JSON.stringify(results.breakdown) 
        : results.breakdown
    },
    leadScore
  })
}

// Booking service
export const saveBooking = async (
  formData: BookingFormData,
  leadScore: number
) => {
  return saveSanityDocument('booking', {
    ...formData,
    leadScore
  })
}

// Quiz result service
export const saveQuizResult = async (
  quizType: string,
  answers: QuizAnswers,
  result: QuizResult | null,
  leadInfo: LeadInfo & { name: string },
  leadScore: number
) => {
  return saveSanityDocument('quizResult', {
    quizType,
    name: leadInfo.name,
    email: leadInfo.email,
    phone: leadInfo.phone,
    answers,
    totalScore: Object.values(answers).reduce((sum: number, answer: QuizAnswerValue) => {
      return sum + (typeof answer === 'number' ? answer : answer ? 10 : 0)
    }, 0),
    resultCategory: result?.title || '',
    recommendations: result?.recommendations || [],
    leadScore
  })
}

// Newsletter service
export const subscribeToNewsletter = async (
  email: string,
  source: string,
  name?: string,
  interests?: string[]
) => {
  const response = await fetch('/api/newsletter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      name,
      interests,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to subscribe')
  }

  return response.json()
}

// Resource download tracking
export const trackResourceDownload = async (resourceId: string) => {
  return patchSanityDocument(resourceId, {
    inc: { downloadCount: 1 }
  })
}