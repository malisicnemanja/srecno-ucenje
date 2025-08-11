// Safe animation component exports
// Only export components that actually exist

// Re-export from UI components
export { default as FloatingLetters, AnimatedLetter, AnimatedTitle } from '@/components/ui/FloatingLetters'
export { default as PulseButton, PulseIconButton, FloatingActionButton } from '@/components/ui/PulseButton'
export { default as BookOpeningAnimation } from '@/components/ui/BookOpeningAnimation'

// Export brush animations
export { BrushUnderline, BrushStrokeText } from './BrushUnderline'