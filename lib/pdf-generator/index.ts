import { pdf } from '@react-pdf/renderer'
import { CalculatorResultsPDF } from './templates/CalculatorResults'
import { QuizResultsPDF } from './templates/QuizResults'
import { ConsultationConfirmationPDF } from './templates/ConsultationConfirmation'
import { NewsletterWelcomePDF } from './templates/NewsletterWelcome'
import { PDFTheme, defaultPDFTheme } from './theme'

export interface PDFGeneratorOptions {
  theme?: PDFTheme
  filename?: string
  autoDownload?: boolean
}

// Calculator PDF generation
export async function generateCalculatorPDF(
  type: 'investment' | 'roi',
  data: any,
  options: PDFGeneratorOptions = {}
): Promise<Blob> {
  const { theme = defaultPDFTheme } = options
  
  const document = CalculatorResultsPDF({ type, data, theme })
  const blob = await pdf(document).toBlob()
  
  if (options.autoDownload) {
    downloadPDF(blob, options.filename || `${type}-calculator-results.pdf`)
  }
  
  return blob
}

// Quiz PDF generation
export async function generateQuizPDF(
  data: any,
  options: PDFGeneratorOptions = {}
): Promise<Blob> {
  const { theme = defaultPDFTheme } = options
  
  const document = QuizResultsPDF({ data, theme })
  const blob = await pdf(document).toBlob()
  
  if (options.autoDownload) {
    downloadPDF(blob, options.filename || 'quiz-results.pdf')
  }
  
  return blob
}

// Consultation confirmation PDF generation
export async function generateConsultationPDF(
  data: any,
  options: PDFGeneratorOptions = {}
): Promise<Blob> {
  const { theme = defaultPDFTheme } = options
  
  const document = ConsultationConfirmationPDF({ data, theme })
  const blob = await pdf(document).toBlob()
  
  if (options.autoDownload) {
    downloadPDF(blob, options.filename || 'consultation-confirmation.pdf')
  }
  
  return blob
}

// Helper function to trigger PDF download
export function downloadPDF(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Helper function to convert blob to base64 (for email sending if needed)
export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1]
      resolve(base64String)
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

// Format date for filename
export function getDateString(): string {
  const now = new Date()
  return now.toISOString().split('T')[0]
}

// Generate filename with date
export function generateFilename(prefix: string, extension: string = 'pdf'): string {
  return `${prefix}-${getDateString()}.${extension}`
}

// Newsletter welcome PDF generation
export async function generateNewsletterWelcomePDF(
  data: any,
  options: PDFGeneratorOptions = {}
): Promise<Blob> {
  const { theme = defaultPDFTheme } = options
  
  const document = NewsletterWelcomePDF({ data, theme })
  const blob = await pdf(document).toBlob()
  
  if (options.autoDownload) {
    downloadPDF(blob, options.filename || 'dobrodosli-srecno-ucenje.pdf')
  }
  
  return blob
}

// Export all templates and theme
export * from './theme'
export * from './templates/BaseTemplate'
export * from './templates/CalculatorResults'
export * from './templates/QuizResults'
export * from './templates/ConsultationConfirmation'
export * from './templates/NewsletterWelcome'