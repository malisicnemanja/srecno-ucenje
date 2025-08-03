import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Main application state interface
interface AppState {
  // User preferences
  theme: 'light' | 'dark' | 'system'
  language: 'sr' | 'en'
  
  // UI state
  isLoading: boolean
  notifications: Notification[]
  sidebarCollapsed: boolean
  
  // User data (for lead forms, etc.)
  userData: {
    name?: string
    email?: string
    phone?: string
    preferences?: {
      newsletters: boolean
      marketing: boolean
    }
  }
  
  // Calculator state
  calculatorHistory: CalculatorHistoryItem[]
  
  // Quiz state  
  quizProgress: Record<string, QuizProgress>
  
  // Actions
  setTheme: (theme: AppState['theme']) => void
  setLanguage: (language: AppState['language']) => void
  setLoading: (loading: boolean) => void
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  updateUserData: (data: Partial<AppState['userData']>) => void
  addCalculatorHistory: (item: CalculatorHistoryItem) => void
  updateQuizProgress: (quizId: string, progress: QuizProgress) => void
  clearQuizProgress: (quizId: string) => void
  resetState: () => void
}

// Supporting interfaces
interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number // in ms, 0 = persistent
}

interface CalculatorHistoryItem {
  id: string
  type: 'investment' | 'roi'
  inputs: Record<string, any>
  results: Record<string, any>
  timestamp: string
}

interface QuizProgress {
  currentQuestion: number
  answers: Record<number, any>
  startedAt: string
  lastUpdated: string
  completed: boolean
}

// Initial state
const initialState = {
  theme: 'system' as const,
  language: 'sr' as const,
  isLoading: false,
  notifications: [],
  sidebarCollapsed: false,
  userData: {},
  calculatorHistory: [],
  quizProgress: {},
}

// Create the store
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Theme actions
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      
      // UI actions
      setLoading: (isLoading) => set({ isLoading }),
      
      setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
      
      // Notification actions
      addNotification: (notification) => {
        const id = Date.now().toString()
        const newNotification = { ...notification, id }
        
        set((state) => ({
          notifications: [...state.notifications, newNotification]
        }))
        
        // Auto remove after duration (default 5 seconds)
        const duration = notification.duration ?? 5000
        if (duration > 0) {
          setTimeout(() => {
            set((state) => ({
              notifications: state.notifications.filter(n => n.id !== id)
            }))
          }, duration)
        }
      },
      
      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      })),
      
      clearNotifications: () => set({ notifications: [] }),
      
      // User data actions
      updateUserData: (data) => set((state) => ({
        userData: { ...state.userData, ...data }
      })),
      
      // Calculator actions
      addCalculatorHistory: (item) => set((state) => ({
        calculatorHistory: [item, ...state.calculatorHistory].slice(0, 10) // Keep last 10
      })),
      
      // Quiz actions
      updateQuizProgress: (quizId, progress) => set((state) => ({
        quizProgress: {
          ...state.quizProgress,
          [quizId]: progress
        }
      })),
      
      clearQuizProgress: (quizId) => set((state) => {
        const { [quizId]: removed, ...rest } = state.quizProgress
        return { quizProgress: rest }
      }),
      
      // Reset state
      resetState: () => set(initialState),
    }),
    {
      name: 'srecno-ucenje-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        sidebarCollapsed: state.sidebarCollapsed,
        userData: state.userData,
        calculatorHistory: state.calculatorHistory,
        // Don't persist: notifications, isLoading, quizProgress
      }),
    }
  )
)

// Selector hooks for better performance
export const useTheme = () => useAppStore((state) => state.theme)
export const useLanguage = () => useAppStore((state) => state.language)
export const useNotifications = () => useAppStore((state) => state.notifications)
export const useUserData = () => useAppStore((state) => state.userData)
export const useCalculatorHistory = () => useAppStore((state) => state.calculatorHistory)
export const useIsLoading = () => useAppStore((state) => state.isLoading)