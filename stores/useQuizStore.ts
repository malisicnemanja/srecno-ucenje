import { create } from 'zustand'
import { QuizAnswers, QuizResult, QuizLeadInfo } from '@/types/quiz'

interface QuizState {
  // Current quiz state
  currentQuiz: string | null
  currentQuestion: number
  answers: QuizAnswers
  timeStarted: number | null
  
  // Results
  currentResult: QuizResult | null
  showResults: boolean
  
  // Lead capture
  showLeadForm: boolean
  leadInfo: QuizLeadInfo
  isSubmitting: boolean
  
  // History
  completedQuizzes: CompletedQuiz[]
  
  // Actions
  startQuiz: (quizId: string) => void
  setCurrentQuestion: (question: number) => void
  setAnswer: (questionIndex: number, answer: any) => void
  setResult: (result: QuizResult | null) => void
  setShowResults: (show: boolean) => void
  setShowLeadForm: (show: boolean) => void
  updateLeadInfo: (info: Partial<QuizLeadInfo>) => void
  setSubmitting: (submitting: boolean) => void
  completeQuiz: (result: QuizResult, score: number) => void
  resetQuiz: () => void
  retakeQuiz: () => void
  getQuizHistory: (quizId: string) => CompletedQuiz[]
}

interface CompletedQuiz {
  quizId: string
  completedAt: string
  answers: QuizAnswers
  result: QuizResult
  score: number
  timeSpent: number // in seconds
}

const initialLeadInfo: QuizLeadInfo = {
  name: '',
  email: '',
  phone: ''
}

export const useQuizStore = create<QuizState>((set, get) => ({
  // Initial state
  currentQuiz: null,
  currentQuestion: 0,
  answers: {},
  timeStarted: null,
  
  currentResult: null,
  showResults: false,
  
  showLeadForm: false,
  leadInfo: initialLeadInfo,
  isSubmitting: false,
  
  completedQuizzes: [],
  
  // Actions
  startQuiz: (quizId) => set({
    currentQuiz: quizId,
    currentQuestion: 0,
    answers: {},
    timeStarted: Date.now(),
    currentResult: null,
    showResults: false,
    showLeadForm: false,
    leadInfo: initialLeadInfo,
    isSubmitting: false
  }),
  
  setCurrentQuestion: (currentQuestion) => set({ currentQuestion }),
  
  setAnswer: (questionIndex, answer) => set((state) => ({
    answers: { ...state.answers, [questionIndex]: answer }
  })),
  
  setResult: (currentResult) => set({ currentResult }),
  setShowResults: (showResults) => set({ showResults }),
  setShowLeadForm: (showLeadForm) => set({ showLeadForm }),
  
  updateLeadInfo: (info) => set((state) => ({
    leadInfo: { ...state.leadInfo, ...info }
  })),
  
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  
  completeQuiz: (result, score) => {
    const state = get()
    if (!state.currentQuiz || !state.timeStarted) return
    
    const timeSpent = Math.floor((Date.now() - state.timeStarted) / 1000)
    
    const completedQuiz: CompletedQuiz = {
      quizId: state.currentQuiz,
      completedAt: new Date().toISOString(),
      answers: state.answers,
      result,
      score,
      timeSpent
    }
    
    set((state) => ({
      completedQuizzes: [completedQuiz, ...state.completedQuizzes].slice(0, 50), // Keep last 50
      currentResult: result,
      showResults: true
    }))
  },
  
  resetQuiz: () => set({
    currentQuiz: null,
    currentQuestion: 0,
    answers: {},
    timeStarted: null,
    currentResult: null,
    showResults: false,
    showLeadForm: false,
    leadInfo: initialLeadInfo,
    isSubmitting: false
  }),
  
  retakeQuiz: () => {
    const state = get()
    if (state.currentQuiz) {
      set({
        currentQuestion: 0,
        answers: {},
        timeStarted: Date.now(),
        currentResult: null,
        showResults: false,
        showLeadForm: false,
        leadInfo: initialLeadInfo,
        isSubmitting: false
      })
    }
  },
  
  getQuizHistory: (quizId) => {
    const state = get()
    return state.completedQuizzes.filter(quiz => quiz.quizId === quizId)
  }
}))

// Selector hooks
export const useCurrentQuiz = () => useQuizStore((state) => ({
  currentQuiz: state.currentQuiz,
  currentQuestion: state.currentQuestion,
  answers: state.answers,
  timeStarted: state.timeStarted,
  setCurrentQuestion: state.setCurrentQuestion,
  setAnswer: state.setAnswer,
  startQuiz: state.startQuiz
}))

export const useQuizResults = () => useQuizStore((state) => ({
  result: state.currentResult,
  showResults: state.showResults,
  completedQuizzes: state.completedQuizzes,
  setResult: state.setResult,
  setShowResults: state.setShowResults,
  completeQuiz: state.completeQuiz,
  getQuizHistory: state.getQuizHistory
}))

export const useQuizLeadCapture = () => useQuizStore((state) => ({
  showLeadForm: state.showLeadForm,
  leadInfo: state.leadInfo,
  isSubmitting: state.isSubmitting,
  setShowLeadForm: state.setShowLeadForm,
  updateLeadInfo: state.updateLeadInfo,
  setSubmitting: state.setSubmitting
}))

export const useQuizActions = () => useQuizStore((state) => ({
  resetQuiz: state.resetQuiz,
  retakeQuiz: state.retakeQuiz
}))