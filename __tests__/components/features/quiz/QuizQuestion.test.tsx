import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '../../../utils/test-utils'
import QuizQuestion from '@/components/features/quiz/QuizQuestion'
import { QuizQuestion as QuizQuestionType } from '@/types/quiz'

const mockBooleanQuestion: QuizQuestionType = {
  question: 'Da li ste spremni za franšizu?',
  type: 'boolean',
  weight: 1
}

const mockMultipleChoiceQuestion: QuizQuestionType = {
  question: 'Koliko iskustva imate?',
  type: 'multiple_choice',
  answers: [
    { text: 'Malo', value: 1 },
    { text: 'Srednje', value: 5 },
    { text: 'Mnogo', value: 10 }
  ],
  weight: 1
}

const mockScaleQuestion: QuizQuestionType = {
  question: 'Ocenite svoje znanje (1-5)?',
  type: 'scale',
  weight: 1
}

describe('QuizQuestion', () => {
  const mockOnAnswer = vi.fn()

  beforeEach(() => {
    mockOnAnswer.mockClear()
  })

  it('renders question text correctly', () => {
    render(
      <QuizQuestion
        question={mockBooleanQuestion}
        questionIndex={0}
        totalQuestions={5}
        onAnswer={mockOnAnswer}
      />
    )
    
    expect(screen.getByText('Da li ste spremni za franšizu?')).toBeInTheDocument()
  })

  it('shows correct progress', () => {
    render(
      <QuizQuestion
        question={mockBooleanQuestion}
        questionIndex={2}
        totalQuestions={5}
        onAnswer={mockOnAnswer}
      />
    )
    
    expect(screen.getByText('Pitanje 3 od 5')).toBeInTheDocument()
  })

  it('renders boolean question with Da/Ne options', () => {
    render(
      <QuizQuestion
        question={mockBooleanQuestion}
        questionIndex={0}
        totalQuestions={1}
        onAnswer={mockOnAnswer}
      />
    )
    
    expect(screen.getByText('Da')).toBeInTheDocument()
    expect(screen.getByText('Ne')).toBeInTheDocument()
  })

  it('handles boolean answer selection', () => {
    render(
      <QuizQuestion
        question={mockBooleanQuestion}
        questionIndex={0}
        totalQuestions={1}
        onAnswer={mockOnAnswer}
      />
    )
    
    fireEvent.click(screen.getByText('Da'))
    expect(mockOnAnswer).toHaveBeenCalledWith(true)
    
    fireEvent.click(screen.getByText('Ne'))
    expect(mockOnAnswer).toHaveBeenCalledWith(false)
  })

  it('renders multiple choice options', () => {
    render(
      <QuizQuestion
        question={mockMultipleChoiceQuestion}
        questionIndex={0}
        totalQuestions={1}
        onAnswer={mockOnAnswer}
      />
    )
    
    expect(screen.getByText('Malo')).toBeInTheDocument()
    expect(screen.getByText('Srednje')).toBeInTheDocument()
    expect(screen.getByText('Mnogo')).toBeInTheDocument()
  })

  it('handles multiple choice selection', () => {
    render(
      <QuizQuestion
        question={mockMultipleChoiceQuestion}
        questionIndex={0}
        totalQuestions={1}
        onAnswer={mockOnAnswer}
      />
    )
    
    fireEvent.click(screen.getByText('Srednje'))
    expect(mockOnAnswer).toHaveBeenCalledWith(5)
  })

  it('renders scale question with 1-5 options', () => {
    render(
      <QuizQuestion
        question={mockScaleQuestion}
        questionIndex={0}
        totalQuestions={1}
        onAnswer={mockOnAnswer}
      />
    )
    
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument()
    }
  })

  it('handles scale selection', () => {
    render(
      <QuizQuestion
        question={mockScaleQuestion}
        questionIndex={0}
        totalQuestions={1}
        onAnswer={mockOnAnswer}
      />
    )
    
    fireEvent.click(screen.getByText('3'))
    expect(mockOnAnswer).toHaveBeenCalledWith(3)
  })

  it('shows selected state for boolean question', () => {
    render(
      <QuizQuestion
        question={mockBooleanQuestion}
        questionIndex={0}
        totalQuestions={1}
        onAnswer={mockOnAnswer}
        currentAnswer={true}
      />
    )
    
    const daButton = screen.getByText('Da').closest('button')
    expect(daButton).toHaveClass('border-green-500', 'bg-green-50')
  })

  it('shows selected state for multiple choice', () => {
    render(
      <QuizQuestion
        question={mockMultipleChoiceQuestion}
        questionIndex={0}
        totalQuestions={1}
        onAnswer={mockOnAnswer}
        currentAnswer={5}
      />
    )
    
    const srednjeButton = screen.getByText('Srednje').closest('button')
    expect(srednjeButton).toHaveClass('border-green-500', 'bg-green-50')
  })
})