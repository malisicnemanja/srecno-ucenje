import React from 'react'
import { pdf } from '@react-pdf/renderer'
import { CalculatorPDFTemplate } from './templates/CalculatorPDFTemplate'
import { QuizPDFTemplate } from './templates/QuizPDFTemplate'
import { BookingPDFTemplate } from './templates/BookingPDFTemplate'
import { saveAs } from 'file-saver'

interface CalculatorData {
  title: string
  date: string
  results: any
  inputs: any
}

interface QuizData {
  title: string
  score: number
  answers: any[]
  recommendations?: string[]
}

interface ConsultationData {
  name: string
  email: string
  date: string
  time: string
  type: string
  message?: string
}

interface PDFOptions {
  autoDownload?: boolean
  filename?: string
}

// Pomoćna funkcija za formatiranje datuma
export const generateFilename = (prefix: string): string => {
  const date = new Date().toISOString().split('T')[0]
  return `${prefix}-${date}.pdf` // Dodaj .pdf ekstenziju
}

// Pomoćna funkcija za download PDF-a
const downloadPDF = async (document: React.ReactElement, filename: string) => {
  try {
    const blob = await pdf(document).toBlob()
    saveAs(blob, filename)
  } catch (error) {
    console.error('Greška pri generisanju PDF-a:', error)
    throw error
  }
}

// Generator funkcije - sada generišu prave PDF-ove
export const generateCalculatorPDF = async (
  type: 'roi' | 'investment', 
  data: any, 
  options?: any
): Promise<void> => {
  const calculatorData = {
    type,
    inputs: data.inputs || data,
    results: data.results || data
  }
  
  const document = <CalculatorPDFTemplate data={calculatorData} />
  const filename = generateFilename(
    type === 'roi' ? 'roi-analiza' : 'investicija-projekcija'
  )
  
  await downloadPDF(document, filename)
}

export const generateQuizPDF = async (data: QuizData, options?: any): Promise<void> => {
  const quizData = {
    title: data.title,
    score: data.score,
    totalQuestions: data.answers?.length || 0,
    answers: data.answers || [],
    recommendations: data.recommendations || [
      'Nastavite sa vežbanjem svaki dan',
      'Fokusirajte se na oblasti gde imate slabije rezultate',
      'Koristite dodatne materijale za učenje'
    ]
  }
  
  const document = <QuizPDFTemplate data={quizData} />
  const filename = generateFilename('rezultati-kviza')
  
  await downloadPDF(document, filename)
}

export const generateConsultationPDF = async (data: ConsultationData, options?: any): Promise<void> => {
  const bookingData = {
    name: data.name,
    email: data.email,
    date: data.date,
    time: data.time,
    type: data.type,
    message: data.message,
    phone: (data as any).phone,
    childName: (data as any).childName,
    childAge: (data as any).childAge
  }
  
  const document = <BookingPDFTemplate data={bookingData} />
  const filename = generateFilename('potvrda-konsultacije')
  
  await downloadPDF(document, filename)
}

export const generateNewsletterWelcomePDF = async (data: any, options?: any): Promise<void> => {
  // Za newsletter ćemo koristiti booking template sa prilagođenim podacima
  const welcomeData = {
    name: data.name || 'Poštovani roditelju',
    email: data.email,
    date: new Date().toLocaleDateString('sr-RS'),
    time: '',
    type: 'Newsletter dobrodošlica',
    message: 'Hvala vam što ste se prijavili na naš newsletter! Očekujte korisne savete i informacije o našim programima.'
  }
  
  const document = <BookingPDFTemplate data={welcomeData} />
  const filename = generateFilename('dobrodoslica')
  
  await downloadPDF(document, filename)
}

// Export downloadPDF funkciju ukoliko je potrebna drugde
export { downloadPDF }