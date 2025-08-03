// Quiz related types

export interface QuizQuestion {
  question: string
  type: 'multiple_choice' | 'scale' | 'boolean' | 'multiple_select'
  answers?: {
    text: string
    value: number
    category?: string
  }[]
  weight: number
}

export interface QuizResult {
  minScore: number
  maxScore: number
  title: string
  description: string
  recommendations: string[]
  ctaText?: string
  ctaLink?: string
}

export interface QuizData {
  title: string
  description: string
  questions: QuizQuestion[]
  results: QuizResult[]
  leadMagnet?: {
    enabled: boolean
    title: string
    description: string
    resource: string
  }
}

export interface QuizProps {
  quizData: QuizData
  quizType: 'educator' | 'franchise_model' | 'readiness'
}

// Union type for quiz answer values
export type QuizAnswerValue = boolean | number | string | Array<{text: string, value: number, category?: string}>

export interface QuizAnswers {
  [questionIndex: number]: QuizAnswerValue
}

export interface QuizLeadInfo {
  name: string
  email: string
  phone: string
}