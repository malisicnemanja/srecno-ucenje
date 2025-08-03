'use client'

import { useState, useEffect, useRef } from 'react'
import { saveQuizResult } from '@/services/sanity.service'
import { saveSanityDocument } from '@/lib/sanity-write'
import { trackEvent, trackLeadCapture } from '@/lib/analytics'
import { motion, AnimatePresence } from 'framer-motion'
// import { generateQuizPDF, generateFilename } from '@/lib/pdf-generator'
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
  const [leadInfo, setLeadInfo] = useState<QuizLeadInfo>({
    name: '',
    email: '',
    phone: ''
  })
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

  const handleMultiSelectNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResults(answers)
    }
  }

  const calculateResults = (allAnswers: Record<number, any>) => {
    let totalScore = 0
    const answerDetails: any[] = []

    quizData.questions.forEach((question, index) => {
      const answer = allAnswers[index]
      if (!answer) return

      let score = 0
      if (question.type === 'scale') {
        score = answer * (question.weight || 1)
      } else if (question.type === 'boolean') {
        score = answer ? 10 * (question.weight || 1) : 0
      } else if (question.type === 'multiple_choice' && question.answers) {
        const selectedAnswer = question.answers.find(a => a.text === answer)
        score = (selectedAnswer?.value || 0) * (question.weight || 1)
      } else if (question.type === 'multiple_select' && Array.isArray(answer) && question.answers) {
        answer.forEach((selected: string) => {
          const selectedAnswer = question.answers!.find(a => a.text === selected)
          score += (selectedAnswer?.value || 0)
        })
        score *= (question.weight || 1)
      }

      totalScore += score
      answerDetails.push({
        question: question.question,
        answer: answer.toString(),
        score,
      })
    })

    // Find matching result
    const matchedResult = quizData.results.find(
      r => totalScore >= r.minScore && totalScore <= r.maxScore
    )

    if (matchedResult) {
      setResult(matchedResult)
      
      // Track completion
      trackEvent({
        category: 'Quiz',
        action: 'complete',
        label: quizType,
        value: totalScore,
      })
    }

    setShowResults(true)
    if (quizData.leadMagnet?.enabled) {
      setShowLeadForm(true)
    }
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Calculate lead score based on quiz results
      const leadScore = calculateLeadScore()

      await saveSanityDocument('quizResult', {
        quizType,
        name: leadInfo.name,
        email: leadInfo.email,
        phone: leadInfo.phone,
        answers: Object.entries(answers).map(([questionIndex, answer]) => ({
          question: quizData.questions[parseInt(questionIndex)].question,
          answer: answer.toString(),
          score: 0, // Already calculated above
        })),
        totalScore: Object.values(answers).reduce((sum: number, answer: any) => {
          // Simplified scoring for storage
          return sum + (typeof answer === 'number' ? answer : answer ? 10 : 0)
        }, 0),
        resultCategory: result?.title || '',
        recommendations: result?.recommendations || [],
        leadScore,
      })

      // Track lead capture
      trackLeadCapture(quizType as any, leadScore)

      // Generate and download PDF
      try {
        const pdfData = {
          quizTitle: quizData.title,
          quizType: quizType,
          answers: Object.entries(answers).map(([questionIndex, answer]) => ({
            question: quizData.questions[parseInt(questionIndex)].question,
            answer: answer.toString(),
          })),
          totalScore: Object.values(answers).reduce((sum: number, answer: any) => {
            return sum + (typeof answer === 'number' ? answer : answer ? 10 : 0)
          }, 0),
          maxScore: quizData.questions.length * 10, // Simplified max score
          result: {
            title: result?.title || '',
            description: result?.description || '',
            recommendations: result?.recommendations || []
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

  const calculateLeadScore = () => {
    let score = 50 // Base score
    
    // Score based on quiz type and results
    if (quizType === 'readiness' && result) {
      if (result.title.toLowerCase().includes('spreman')) score += 30
      else if (result.title.toLowerCase().includes('potencijal')) score += 20
    }
    
    // Additional scoring based on answers
    const positiveAnswers = Object.values(answers).filter(a => 
      typeof a === 'boolean' ? a : typeof a === 'number' ? a > 7 : true
    ).length
    
    score += (positiveAnswers / quizData.questions.length) * 20
    
    return Math.min(Math.round(score), 100)
  }

  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100

  return (
    <div className="max-w-4xl mx-auto p-6">
      {!showResults ? (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Pitanje {currentQuestion + 1} od {quizData.questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                {quizData.questions[currentQuestion].question}
              </h2>

              {/* Multiple Choice */}
              {quizData.questions[currentQuestion].type === 'multiple_choice' && (
                <div className="space-y-3">
                  {quizData.questions[currentQuestion].answers?.map((answer, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(answer.text)}
                      className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all duration-200"
                    >
                      {answer.text}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Scale */}
              {quizData.questions[currentQuestion].type === 'scale' && (
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Potpuno se ne slažem</span>
                    <span>Potpuno se slažem</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                      <motion.button
                        key={value}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAnswer(value)}
                        className={`w-12 h-12 rounded-full font-semibold transition-all duration-200 ${
                          answers[currentQuestion] === value
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                      >
                        {value}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Yes/No */}
              {quizData.questions[currentQuestion].type === 'boolean' && (
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(true)}
                    className="flex-1 p-6 rounded-lg border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all duration-200"
                  >
                    <span className="text-2xl mb-2">✅</span>
                    <p className="font-semibold">Da</p>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(false)}
                    className="flex-1 p-6 rounded-lg border-2 border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all duration-200"
                  >
                    <span className="text-2xl mb-2">❌</span>
                    <p className="font-semibold">Ne</p>
                  </motion.button>
                </div>
              )}

              {/* Multiple Select */}
              {quizData.questions[currentQuestion].type === 'multiple_select' && (
                <div>
                  <p className="text-sm text-gray-600 mb-4">Izaberite sve što važi</p>
                  <div className="space-y-3 mb-6">
                    {quizData.questions[currentQuestion].answers?.map((answer, index) => {
                      const currentAnswer = answers[currentQuestion]
                      const isSelected = Array.isArray(currentAnswer) && currentAnswer.some((a: any) => 
                        typeof a === 'string' ? a === answer.text : a.text === answer.text
                      )
                      return (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            const current = Array.isArray(answers[currentQuestion]) ? answers[currentQuestion] : []
                            if (isSelected) {
                              handleAnswer(current.filter((a: any) => 
                                typeof a === 'string' ? a !== answer.text : a.text !== answer.text
                              ))
                            } else {
                              handleAnswer([...current, answer])
                            }
                          }}
                          className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                            isSelected
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-green-300'
                          }`}
                        >
                          <div className="flex items-center">
                            <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                              isSelected ? 'bg-green-600 border-green-600' : 'border-gray-400'
                            }`}>
                              {isSelected && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            {answer.text}
                          </div>
                        </motion.button>
                      )
                    })}
                  </div>
                  <button
                    onClick={handleMultiSelectNext}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Sledeće pitanje
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                currentQuestion === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            >
              Prethodno
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Results */}
          {!showLeadForm ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Vaši Rezultati</h2>
                <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4">
                  <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              {result && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{result.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{result.description}</p>
                  </div>

                  {result.recommendations.length > 0 && (
                    <div>
                      <h4 className="text-xl font-semibold mb-4 text-gray-900">Preporuke za vas:</h4>
                      <ul className="space-y-3">
                        {result.recommendations.map((rec, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start"
                          >
                            <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="text-gray-700">{rec}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.ctaText && result.ctaLink && (
                    <div className="text-center mt-8">
                      <a
                        href={result.ctaLink}
                        className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors transform hover:scale-105"
                      >
                        {result.ctaText}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            /* Lead Form */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">
                {quizData.leadMagnet?.title || 'Preuzmite Personalizovan Izveštaj'}
              </h3>
              <p className="text-gray-600 text-center mb-8">
                {quizData.leadMagnet?.description || 'Ostavite svoje podatke za preuzimanje detaljne analize rezultata.'}
              </p>

              <form onSubmit={handleLeadSubmit} className="space-y-4 max-w-md mx-auto">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ime i prezime
                  </label>
                  <input
                    type="text"
                    required
                    value={leadInfo.name}
                    onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email adresa
                  </label>
                  <input
                    type="email"
                    required
                    value={leadInfo.email}
                    onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefon (opciono)
                  </label>
                  <input
                    type="tel"
                    value={leadInfo.phone}
                    onChange={(e) => setLeadInfo({ ...leadInfo, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Generisanje...' : 'Preuzmi rezultate'}
                </button>
              </form>

              <button
                onClick={() => setShowLeadForm(false)}
                className="mt-4 text-gray-600 hover:text-gray-800 text-sm underline block mx-auto"
              >
                Preskoči
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}