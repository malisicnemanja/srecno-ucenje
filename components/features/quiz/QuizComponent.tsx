'use client'

import { useState, useRef } from 'react'
import { saveQuizResult } from '@/services/sanity.service'
import { trackEvent, trackLeadCapture } from '@/lib/analytics'
import { motion, AnimatePresence } from 'framer-motion'
import { generateQuizPDF, generateFilename } from '@/lib/pdf-generator'
import { QuizProps, QuizResult, QuizAnswers, QuizLeadInfo } from '@/types/quiz'
import QuizQuestion from './QuizQuestion'
import QuizResults from './QuizResults'
import QuizLeadForm from './QuizLeadForm'

export default function QuizComponent({ quizData, quizType }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})
  const [showResults, setShowResults] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [result, setResult] = useState<QuizResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const startTimeRef = useRef<number>(Date.now())

  const handleAnswer = (answer: any) => {
    const newAnswers = { ...answers, [currentQuestion]: answer }
    setAnswers(newAnswers)

    // Track answer
    trackEvent({
      category: 'Quiz',
      action: 'answer',
      label: `${quizType}_q${currentQuestion + 1}`,
    })

    // Auto-advance for single-choice questions
    if (quizData.questions[currentQuestion].type !== 'multiple_select') {
      if (currentQuestion < quizData.questions.length - 1) {
        setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300)
      } else {
        calculateResults(newAnswers)
      }
    }
  }

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResults(answers)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateResults = (finalAnswers: QuizAnswers) => {
    let totalScore = 0
    let maxScore = 0

    // Calculate score based on answers
    Object.entries(finalAnswers).forEach(([questionIndex, answer]) => {
      const question = quizData.questions[parseInt(questionIndex)]
      if (!question) return

      maxScore += question.weight

      if (question.type === 'scale') {
        totalScore += (answer as number) * question.weight
      } else if (question.type === 'boolean') {
        totalScore += (answer ? 10 : 0) * question.weight
      } else if (question.type === 'multiple_choice') {
        totalScore += answer * question.weight
      } else if (question.type === 'multiple_select') {
        const selectedAnswers = Array.isArray(answer) ? answer : []
        const averageValue = selectedAnswers.reduce((sum: number, a: any) => sum + a.value, 0) / 
                           (selectedAnswers.length || 1)
        totalScore += averageValue * question.weight
      }
    })

    // Find matching result
    const matchingResult = quizData.results.find(r => 
      totalScore >= r.minScore && totalScore <= r.maxScore
    ) || quizData.results[0]

    setResult(matchingResult)
    setShowResults(true)

    // Track quiz completion
    trackEvent({
      category: 'Quiz',
      action: 'complete',
      label: quizType,
      value: totalScore
    })
  }

  const handleGetResults = () => {
    setShowLeadForm(true)
  }

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setResult(null)
    startTimeRef.current = Date.now()
  }

  const handleLeadSubmit = async (leadInfo: QuizLeadInfo) => {
    setIsSubmitting(true)

    try {
      const leadScore = calculateLeadScore()
      
      // Save to Sanity
      await saveQuizResult(quizType, answers, result, leadInfo, leadScore)

      // Track lead capture
      trackLeadCapture(quizType as any, leadScore)

      // Generate PDF
      try {
        const pdfData = {
          quizType: quizType,
          name: leadInfo.name,
          answers: Object.entries(answers).map(([questionIndex, answer]) => ({
            question: quizData.questions[parseInt(questionIndex)].question,
            answer: formatAnswerForDisplay(answer),
          })),
          result: result || {
            title: 'Rezultat',
            description: 'Nema dostupan rezultat',
            recommendations: []
          },
          completionTime: new Date().toLocaleTimeString('sr-RS')
        }

        await generateQuizPDF(pdfData, {
          autoDownload: true,
          filename: generateFilename(`srecno-ucenje-${quizType}-rezultati`)
        })
        
        setShowLeadForm(false)
        alert('Vaši rezultati kviza su uspešno generisani i preuzeti!')
      } catch (pdfError) {
        console.error('Error generating PDF:', pdfError)
        alert('Došlo je do greške pri generisanju PDF-a. Molimo pokušajte ponovo.')
      }
    } catch (error) {
      console.error('Error saving quiz result:', error)
      alert('Greška pri slanju. Molimo pokušajte ponovo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatAnswerForDisplay = (answer: any): string => {
    if (typeof answer === 'boolean') return answer ? 'Da' : 'Ne'
    if (typeof answer === 'number') return answer.toString()
    if (Array.isArray(answer)) return answer.map(a => a.text || a).join(', ')
    if (typeof answer === 'object' && answer.text) return answer.text
    return answer.toString()
  }

  const calculateLeadScore = (): number => {
    let score = 50 // Base score
    
    if (quizType === 'readiness' && result) {
      if (result.title.toLowerCase().includes('spreman')) score += 30
      else if (result.title.toLowerCase().includes('potencijal')) score += 20
    }
    
    const positiveAnswers = Object.values(answers).filter(a => 
      typeof a === 'boolean' ? a : typeof a === 'number' ? a > 7 : true
    ).length
    
    score += (positiveAnswers / quizData.questions.length) * 20
    
    return Math.min(score, 100)
  }

  const isQuestionAnswered = (questionIndex: number): boolean => {
    const answer = answers[questionIndex]
    return answer !== undefined && answer !== null && answer !== ''
  }

  const canProceed = (): boolean => {
    return isQuestionAnswered(currentQuestion)
  }

  if (showResults && result) {
    return (
      <div className="max-w-2xl mx-auto">
        <QuizResults 
          result={result} 
          onGetResults={handleGetResults}
          onRetakeQuiz={handleRetakeQuiz}
        />
        {showLeadForm && (
          <QuizLeadForm
            onSubmit={handleLeadSubmit}
            onCancel={() => setShowLeadForm(false)}
            isSubmitting={isSubmitting}
            title={quizData.leadMagnet?.title}
            description={quizData.leadMagnet?.description}
          />
        )}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Quiz header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          {quizData.title}
        </h2>
        <p className="text-gray-600">
          {quizData.description}
        </p>
      </div>

      {/* Question content */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <AnimatePresence mode="wait">
          <QuizQuestion
            key={currentQuestion}
            question={quizData.questions[currentQuestion]}
            questionIndex={currentQuestion}
            totalQuestions={quizData.questions.length}
            onAnswer={handleAnswer}
            currentAnswer={answers[currentQuestion]}
          />
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Nazad
          </button>

          <div className="text-sm text-gray-500">
            {currentQuestion + 1} od {quizData.questions.length}
          </div>

          {quizData.questions[currentQuestion].type === 'multiple_select' && (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {currentQuestion === quizData.questions.length - 1 ? 'Završi' : 'Sledeće'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}