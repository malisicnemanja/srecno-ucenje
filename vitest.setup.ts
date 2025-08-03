import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))

// Mock Next.js image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return { type: 'img', props: { src, alt, ...props } }
  },
}))

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    span: 'span',
    button: 'button',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    p: 'p',
  },
  AnimatePresence: ({ children }: any) => children,
}))

// Mock analytics
vi.mock('@/lib/analytics', () => ({
  trackEvent: vi.fn(),
  trackLeadCapture: vi.fn(),
  trackPDFDownload: vi.fn(),
  trackCalculatorCompletion: vi.fn(),
  trackCalculatorUse: vi.fn(),
}))

// Mock PDF generator
vi.mock('@/lib/pdf-generator', () => ({
  generateCalculatorPDF: vi.fn().mockResolvedValue(undefined),
  generateQuizPDF: vi.fn().mockResolvedValue(undefined),
  generateConsultationPDF: vi.fn().mockResolvedValue(undefined),
  generateNewsletterWelcomePDF: vi.fn().mockResolvedValue(undefined),
  generateFilename: vi.fn((name: string) => `${name}-${Date.now()}.pdf`),
}))

// Mock Sanity client
vi.mock('@/hooks/useSanity', () => ({
  useSanityQuery: vi.fn(() => ({
    data: null,
    isLoading: false,
    error: null,
  })),
}))

// Mock services
vi.mock('@/services/sanity.service', () => ({
  saveCalculatorResult: vi.fn().mockResolvedValue({ success: true }),
  saveBooking: vi.fn().mockResolvedValue({ success: true }),
  saveQuizResult: vi.fn().mockResolvedValue({ success: true }),
  subscribeToNewsletter: vi.fn().mockResolvedValue({ success: true }),
  trackResourceDownload: vi.fn().mockResolvedValue({ success: true }),
}))

// Global test utilities
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock window.alert
window.alert = vi.fn()

// Mock window.scrollTo
window.scrollTo = vi.fn()

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock as any