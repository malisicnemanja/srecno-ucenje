import { describe, it, expect } from 'vitest'
import { render, screen } from '../../utils/test-utils'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders without crashing', () => {
    render(<LoadingSpinner />)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('displays loading text when provided', () => {
    render(<LoadingSpinner text="Učitavanje..." />)
    expect(screen.getByText('Učitavanje...')).toBeInTheDocument()
  })

  it('applies correct size classes', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />)
    let spinner = screen.getByTestId('loading-spinner')
    expect(spinner).toHaveClass('w-4', 'h-4')

    rerender(<LoadingSpinner size="lg" />)
    spinner = screen.getByTestId('loading-spinner')
    expect(spinner).toHaveClass('w-8', 'h-8')
  })

  it('applies correct color classes', () => {
    const { rerender } = render(<LoadingSpinner color="primary" />)
    let spinner = screen.getByTestId('loading-spinner')
    expect(spinner).toHaveClass('text-green-600')

    rerender(<LoadingSpinner color="white" />)
    spinner = screen.getByTestId('loading-spinner')
    expect(spinner).toHaveClass('text-white')
  })

  it('applies custom className', () => {
    render(<LoadingSpinner className="custom-class" />)
    const container = screen.getByTestId('loading-spinner').closest('div')
    expect(container).toHaveClass('custom-class')
  })
})