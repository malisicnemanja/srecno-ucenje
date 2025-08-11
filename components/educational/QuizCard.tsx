'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, ChevronLeft, ChevronRight, RotateCcw, Award, Clock } from 'lucide-react'

export interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}

export interface QuizQuestion {
  id: string
  question: string
  type: 'multiple-choice' | 'true-false' | 'fill-blank'
  options?: QuizOption[]
  correctAnswer?: string
  explanation?: string
  points: number
  timeLimit?: number // in seconds
}

interface QuizCardProps {
  questions: QuizQuestion[]
  title?: string
  description?: string
  timeLimit?: number // Total quiz time limit in seconds
  showProgress?: boolean
  showExplanations?: boolean
  allowReview?: boolean
  onComplete?: (results: QuizResults) => void
  onQuestionAnswer?: (questionId: string, answer: string, isCorrect: boolean) => void
  className?: string
}

export interface QuizResults {
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: number
  answers: Record<string, { answer: string; isCorrect: boolean; timeSpent: number }>
}

const QuizCard: React.FC<QuizCardProps> = ({
  questions,
  title = 'Quiz',
  description,
  timeLimit,
  showProgress = true,
  showExplanations = true,
  allowReview = true,
  onComplete,
  onQuestionAnswer,
  className = ''
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(timeLimit || 0)
  const [timeSpent, setTimeSpent] = useState(0)
  const [questionTimeSpent, setQuestionTimeSpent] = useState<Record<string, number>>({})
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]

  // Timer effect
  useEffect(() => {
    if (timeLimit && !showResults && !quizCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleQuizComplete()
            return 0
          }
          return prev - 1
        })
        setTimeSpent(prev => prev + 1)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [timeLimit, showResults, quizCompleted, handleQuizComplete])

  // Reset question timer when question changes
  useEffect(() => {
    setQuestionStartTime(Date.now())
    setSelectedAnswer(answers[currentQuestion?.id] || '')
    setShowExplanation(false)
  }, [currentQuestionIndex, currentQuestion?.id, answers])

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId)
  }

  const handleAnswerSubmit = () => {
    if (!selectedAnswer || !currentQuestion) return

    const currentTime = Date.now()
    const questionTime = Math.round((currentTime - questionStartTime) / 1000)
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer
    }))

    setQuestionTimeSpent(prev => ({
      ...prev,
      [currentQuestion.id]: questionTime
    }))

    const isCorrect = checkAnswer(selectedAnswer)
    
    if (onQuestionAnswer) {
      onQuestionAnswer(currentQuestion.id, selectedAnswer, isCorrect)
    }

    if (showExplanations) {
      setShowExplanation(true)
    } else {
      handleNextQuestion()
    }
  }

  const checkAnswer = (answer: string): boolean => {
    if (!currentQuestion) return false

    if (currentQuestion.type === 'multiple-choice') {
      const option = currentQuestion.options?.find(opt => opt.id === answer)
      return option?.isCorrect || false
    } else if (currentQuestion.type === 'true-false') {
      return answer === 'true'
    } else if (currentQuestion.type === 'fill-blank') {
      return answer.toLowerCase().trim() === currentQuestion.correctAnswer?.toLowerCase().trim()
    }

    return false
  }

  const handleNextQuestion = () => {
    setShowExplanation(false)
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      handleQuizComplete()
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleQuizComplete = () => {
    setQuizCompleted(true)
    setShowResults(true)

    const results: QuizResults = {
      score: calculateScore(),
      totalQuestions: questions.length,
      correctAnswers: calculateCorrectAnswers(),
      timeSpent,
      answers: Object.entries(answers).reduce((acc, [questionId, answer]) => {
        const question = questions.find(q => q.id === questionId)
        const isCorrect = question ? checkAnswerForQuestion(question, answer) : false
        acc[questionId] = {
          answer,
          isCorrect,
          timeSpent: questionTimeSpent[questionId] || 0
        }
        return acc
      }, {} as Record<string, { answer: string; isCorrect: boolean; timeSpent: number }>)
    }

    if (onComplete) {
      onComplete(results)
    }
  }

  const checkAnswerForQuestion = (question: QuizQuestion, answer: string): boolean => {
    if (question.type === 'multiple-choice') {
      const option = question.options?.find(opt => opt.id === answer)
      return option?.isCorrect || false
    } else if (question.type === 'true-false') {
      return answer === 'true'
    } else if (question.type === 'fill-blank') {
      return answer.toLowerCase().trim() === question.correctAnswer?.toLowerCase().trim()
    }
    return false
  }

  const calculateScore = (): number => {
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0)
    const earnedPoints = questions.reduce((sum, question) => {
      const answer = answers[question.id]
      if (!answer) return sum
      
      const isCorrect = checkAnswerForQuestion(question, answer)
      return sum + (isCorrect ? question.points : 0)
    }, 0)
    
    return Math.round((earnedPoints / totalPoints) * 100)
  }

  const calculateCorrectAnswers = (): number => {
    return questions.reduce((count, question) => {
      const answer = answers[question.id]
      if (!answer) return count
      
      const isCorrect = checkAnswerForQuestion(question, answer)
      return count + (isCorrect ? 1 : 0)
    }, 0)
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setShowResults(false)
    setTimeRemaining(timeLimit || 0)
    setTimeSpent(0)
    setQuestionTimeSpent({})
    setSelectedAnswer('')
    setShowExplanation(false)
    setQuizCompleted(false)
  }

  if (showResults) {
    const score = calculateScore()
    const correctAnswers = calculateCorrectAnswers()
    
    return (
      <motion.div
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 ${className}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center">
          <motion.div
            className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
          >
            <Award className="w-10 h-10 text-white" />
          </motion.div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Quiz Complete!
          </h3>

          <div className="space-y-3 mb-6">
            <div className="text-3xl font-bold text-green-600">
              {score}%
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {correctAnswers} out of {questions.length} questions correct
            </p>
            {timeLimit && (
              <p className="text-sm text-gray-500">
                Completed in {formatTime(timeSpent)}
              </p>
            )}
          </div>

          <div className="flex gap-3 justify-center">
            {allowReview && (
              <button
                onClick={() => setShowResults(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Review Answers
              </button>
            )}
            <button
              onClick={handleRestart}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Quiz
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
        <p className="text-center text-gray-500 dark:text-gray-400">No questions available</p>
      </div>
    )
  }

  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
          {description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {description}
            </p>
          )}
        </div>
        
        {timeLimit && timeRemaining > 0 && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span className={timeRemaining < 60 ? 'text-red-600 font-semibold' : ''}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {/* Question */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          {currentQuestion.question}
        </h3>

        {/* Multiple Choice Options */}
        {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
          <div className="space-y-3">
            <AnimatePresence>
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === option.id
                const isAnswered = answers[currentQuestion.id] === option.id
                const isCorrect = option.isCorrect
                const showFeedback = showExplanation && isAnswered

                return (
                  <motion.button
                    key={option.id}
                    className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                      showFeedback
                        ? isCorrect
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : isAnswered
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                          : 'border-gray-200 dark:border-gray-600'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                    onClick={() => !showExplanation && handleAnswerSelect(option.id)}
                    disabled={showExplanation}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 dark:text-white">
                        {option.text}
                      </span>
                      {showFeedback && (
                        <div className="ml-2">
                          {isCorrect ? (
                            <Check className="w-5 h-5 text-green-600" />
                          ) : isAnswered ? (
                            <X className="w-5 h-5 text-red-600" />
                          ) : null}
                        </div>
                      )}
                    </div>
                  </motion.button>
                )
              })}
            </AnimatePresence>
          </div>
        )}

        {/* True/False Options */}
        {currentQuestion.type === 'true-false' && (
          <div className="flex gap-4">
            {['true', 'false'].map((value) => {
              const isSelected = selectedAnswer === value
              
              return (
                <button
                  key={value}
                  className={`flex-1 p-4 text-center border-2 rounded-lg transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => !showExplanation && handleAnswerSelect(value)}
                  disabled={showExplanation}
                >
                  <span className="text-gray-900 dark:text-white capitalize">
                    {value}
                  </span>
                </button>
              )
            })}
          </div>
        )}

        {/* Fill in the Blank */}
        {currentQuestion.type === 'fill-blank' && (
          <input
            type="text"
            className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
            placeholder="Type your answer here..."
            value={selectedAnswer}
            onChange={(e) => !showExplanation && setSelectedAnswer(e.target.value)}
            disabled={showExplanation}
          />
        )}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && currentQuestion.explanation && (
          <motion.div
            className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Explanation:
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              {currentQuestion.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        {showExplanation ? (
          <button
            onClick={handleNextQuestion}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleAnswerSubmit}
            disabled={!selectedAnswer}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Submit Answer'}
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default QuizCard