import { pdf } from '@react-pdf/renderer'
import { saveAs } from 'file-saver'
import { getPDFTheme } from './theme'
import { 
  QuizResultsPDF, 
  CalculatorResultsPDF, 
  ConsultationConfirmationPDF 
} from './templates'
import QRCode from 'qrcode'

export interface DownloadOptions {
  filename?: string
  openInNewTab?: boolean
  track?: boolean
}

export class DownloadManager {
  private static instance: DownloadManager
  
  private constructor() {}
  
  static getInstance(): DownloadManager {
    if (!DownloadManager.instance) {
      DownloadManager.instance = new DownloadManager()
    }
    return DownloadManager.instance
  }

  // Track download analytics
  private trackDownload(type: string, metadata?: Record<string, any>) {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'pdf_download', {
        pdf_type: type,
        ...metadata,
      })
    }
  }

  // Generate PDF blob
  private async generatePDFBlob(element: React.ReactElement): Promise<Blob> {
    const pdfDoc = pdf(element)
    return await pdfDoc.toBlob()
  }

  // Download PDF
  private async downloadPDF(
    element: React.ReactElement,
    filename: string,
    options: DownloadOptions = {}
  ) {
    try {
      const blob = await this.generatePDFBlob(element)
      
      if (options.openInNewTab) {
        const url = URL.createObjectURL(blob)
        window.open(url, '_blank')
        // Clean up after a delay
        setTimeout(() => URL.revokeObjectURL(url), 10000)
      } else {
        saveAs(blob, filename)
      }

      if (options.track !== false) {
        this.trackDownload(filename.split('-')[0], { filename })
      }

      return { success: true, filename }
    } catch (error) {
      console.error('Error generating PDF:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
    }
  }

  // Quiz Results Download
  async downloadQuizResults(data: {
    quizTitle: string
    score: number
    totalQuestions: number
    answers: Array<{
      question: string
      userAnswer: string
      correctAnswer: string
      isCorrect: boolean
    }>
    recommendations: string[]
  }, options: DownloadOptions = {}) {
    const theme = getPDFTheme()
    const timestamp = new Date()
    const filename = options.filename || `kviz-rezultati-${timestamp.getTime()}.pdf`

    const element = QuizResultsPDF({
      theme,
      ...data,
      timestamp,
    })

    return this.downloadPDF(element, filename, options)
  }

  // Calculator Results Download
  async downloadCalculatorResults(data: {
    calculatorType: string
    inputs: Record<string, any>
    results: Record<string, any>
    chartData?: any
  }, options: DownloadOptions = {}) {
    const theme = getPDFTheme()
    const timestamp = new Date()
    const filename = options.filename || `${data.calculatorType}-rezultati-${timestamp.getTime()}.pdf`

    const element = CalculatorResultsPDF({
      theme,
      ...data,
      timestamp,
    })

    return this.downloadPDF(element, filename, options)
  }

  // Consultation Confirmation Download
  async downloadConsultationConfirmation(data: {
    consultationType: string
    date: Date
    time: string
    duration: string
    location?: string
    meetingLink?: string
    clientInfo: {
      name: string
      email: string
      phone?: string
    }
    notes?: string
  }, options: DownloadOptions = {}) {
    const theme = getPDFTheme()
    const timestamp = new Date()
    const filename = options.filename || `konsultacija-potvrda-${timestamp.getTime()}.pdf`

    // Generate QR code with consultation details
    let qrCode: string | undefined
    try {
      const qrData = {
        type: 'consultation',
        date: data.date.toISOString(),
        time: data.time,
        clientName: data.clientInfo.name,
      }
      qrCode = await QRCode.toDataURL(JSON.stringify(qrData))
    } catch (error) {
      console.warn('Failed to generate QR code:', error)
    }

    const element = ConsultationConfirmationPDF({
      theme,
      ...data,
      qrCode,
      timestamp,
    })

    return this.downloadPDF(element, filename, options)
  }

  // Generic document download (for future use)
  async downloadDocument(
    content: React.ReactElement,
    filename: string,
    options: DownloadOptions = {}
  ) {
    return this.downloadPDF(content, filename, options)
  }

  // Batch download multiple PDFs
  async downloadBatch(
    downloads: Array<{
      type: 'quiz' | 'calculator' | 'consultation'
      data: any
      options?: DownloadOptions
    }>
  ) {
    const results = []
    
    for (const download of downloads) {
      let result
      
      switch (download.type) {
        case 'quiz':
          result = await this.downloadQuizResults(download.data, download.options)
          break
        case 'calculator':
          result = await this.downloadCalculatorResults(download.data, download.options)
          break
        case 'consultation':
          result = await this.downloadConsultationConfirmation(download.data, download.options)
          break
      }
      
      results.push(result)
      
      // Add a small delay between downloads to prevent browser issues
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    return results
  }
}

// Export singleton instance
export const downloadManager = DownloadManager.getInstance()