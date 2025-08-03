'use client'

import { motion } from 'framer-motion'
import { QuizQuestion as QuizQuestionType, QuizAnswerValue } from '@/types/quiz'

interface QuizQuestionProps {
  question: QuizQuestionType
  questionIndex: number
  totalQuestions: number
  onAnswer: (answer: QuizAnswerValue) => void
  currentAnswer?: QuizAnswerValue
}

export default function QuizQuestion({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
  currentAnswer
}: QuizQuestionProps) {
  const handleMultipleChoice = (answer: {text: string, value: number, category?: string}) => {
    onAnswer(answer.value)
  }

  const handleScale = (value: number) => {
    onAnswer(value)
  }

  const handleBoolean = (value: boolean) => {
    onAnswer(value)
  }

  const handleMultipleSelect = (answer: {text: string, value: number, category?: string}) => {
    const current = Array.isArray(currentAnswer) ? currentAnswer : []
    const exists = current.some((item) => 
      typeof item === 'object' && 'value' in item && item.value === answer.value
    )
    
    if (exists) {
      onAnswer(current.filter((item) => 
        typeof item === 'object' && 'value' in item && item.value !== answer.value
      ))
    } else {
      onAnswer([...current, answer])
    }
  }

  const isSelected = (answer: {text: string, value: number, category?: string}) => {
    if (question.type === 'multiple_select') {
      return Array.isArray(currentAnswer) && 
             currentAnswer.some((item) => 
               typeof item === 'object' && 'value' in item && item.value === answer.value
             )
    }
    return currentAnswer === answer.value
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question counter */}
      <div className="text-sm text-gray-500 font-medium">
        Pitanje {questionIndex + 1} od {totalQuestions}
      </div>

      {/* Question text */}
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {question.question}
      </h3>

      {/* Answer options */}
      <div className="space-y-3">
        {question.type === 'multiple_choice' && question.answers?.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleMultipleChoice(answer)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
              isSelected(answer)
                ? 'border-green-500 bg-green-50 text-green-900'
                : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{answer.text}</span>
              {isSelected(answer) && (
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        ))}

        {question.type === 'scale' && (
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => handleScale(value)}
                className={`w-12 h-12 rounded-full border-2 font-bold transition-all duration-200 ${
                  currentAnswer === value
                    ? 'border-green-500 bg-green-500 text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-green-300'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        )}

        {question.type === 'boolean' && (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleBoolean(true)}
              className={`p-4 rounded-lg border-2 font-medium transition-all duration-200 ${
                currentAnswer === true
                  ? 'border-green-500 bg-green-50 text-green-900'
                  : 'border-gray-200 bg-white hover:border-green-300'
              }`}
            >
              Da
            </button>
            <button
              onClick={() => handleBoolean(false)}
              className={`p-4 rounded-lg border-2 font-medium transition-all duration-200 ${
                currentAnswer === false
                  ? 'border-green-500 bg-green-50 text-green-900'
                  : 'border-gray-200 bg-white hover:border-green-300'
              }`}
            >
              Ne
            </button>
          </div>
        )}

        {question.type === 'multiple_select' && question.answers?.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleMultipleSelect(answer)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
              isSelected(answer)
                ? 'border-green-500 bg-green-50 text-green-900'
                : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{answer.text}</span>
              <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                isSelected(answer) ? 'border-green-500 bg-green-500' : 'border-gray-300'
              }`}>
                {isSelected(answer) && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  )
}