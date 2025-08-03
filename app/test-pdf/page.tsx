'use client'

import { useState } from 'react'
// import { generateCalculatorPDF, generateQuizPDF } from '@/lib/pdf-generator'

export default function TestPDFPage() {
  // Temporarily disabled PDF functionality due to build issues
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">PDF Test (Disabled)</h1>
      <p>PDF generation is temporarily disabled.</p>
    </div>
  )
  
  /* 
  const [isGenerating, setIsGenerating] = useState(false)
  const [message, setMessage] = useState('')

  const testInvestmentPDF = async () => {
    setIsGenerating(true)
    setMessage('Generating Investment Calculator PDF...')
    
    try {
      const testData = {
        inputs: {
          model: 'Standardni',
          city: 'Beograd',
          squareMeters: 120,
          renovationLevel: 'Potpuno'
        },
        results: {
          totalInvestment: 45000,
          monthlyRevenue: 8000,
          monthlyExpenses: 4500,
          breakEvenMonths: 18,
          threeYearProjection: 150000,
          breakdown: {
            franchiseFee: 15000,
            renovationCost: 20000,
            equipmentCost: 10000,
            monthlyOperational: 4500
          }
        }
      }

      await generateCalculatorPDF('investment', testData, {
        autoDownload: true,
        filename: 'test-investment-calculator'
      })
      
      setMessage('✅ Investment PDF generated successfully!')
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  const testQuizPDF = async () => {
    setIsGenerating(true)
    setMessage('Generating Quiz Results PDF...')
    
    try {
      const testData = {
        quizTitle: 'Test spreman li ste za franšizu',
        quizType: 'franchise_readiness',
        answers: [
          { question: 'Imate li iskustva u radu sa decom?', answer: 'Da, preko 5 godina', score: 10 },
          { question: 'Koliko sati nedeljno možete posvetiti biznisu?', answer: 'Preko 40 sati', score: 10 },
          { question: 'Da li imate početni kapital?', answer: 'Da, 30.000-50.000 EUR', score: 10 }
        ],
        totalScore: 85,
        maxScore: 100,
        result: {
          title: 'Odličan kandidat za franšizu!',
          description: 'Vaš profil pokazuje da imate sve preduslove za uspešno vođenje Srećno učenje centra.',
          recommendations: [
            'Zakazite konsultacije sa našim timom',
            'Posetite postojeći centar',
            'Pripremite biznis plan'
          ]
        },
        completionTime: new Date().toLocaleTimeString('sr-RS')
      }

      await generateQuizPDF(testData, {
        autoDownload: true,
        filename: 'test-quiz-results'
      })
      
      setMessage('✅ Quiz PDF generated successfully!')
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
      console.error(error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">PDF Generation Test Page</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test PDF Generation</h2>
          <p className="text-gray-600 mb-6">
            Click the buttons below to test PDF generation functionality.
            PDFs will be automatically downloaded to your device.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={testInvestmentPDF}
              disabled={isGenerating}
              className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Test Investment Calculator PDF
            </button>
            
            <button
              onClick={testQuizPDF}
              disabled={isGenerating}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ml-0 sm:ml-4"
            >
              Test Quiz Results PDF
            </button>
          </div>
          
          {message && (
            <div className={`mt-6 p-4 rounded-lg ${
              message.includes('✅') ? 'bg-green-100 text-green-800' : 
              message.includes('❌') ? 'bg-red-100 text-red-800' : 
              'bg-blue-100 text-blue-800'
            }`}>
              {message}
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-3">Implementation Status</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Investment Calculator - PDF download instead of email
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              ROI Calculator - PDF analysis added
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Quiz Results - PDF report generation
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Booking Confirmation - PDF receipt
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Newsletter - Welcome PDF download
            </li>
          </ul>
        </div>
      </div>
    </div>
  ) */
}