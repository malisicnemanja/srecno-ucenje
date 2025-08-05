/**
 * SREĆNO UČENJE - ANIMATION COMPONENTS
 * Performant, accessible animation components for educational platform
 * All components respect reduced motion preferences and optimize for mobile
 */

// Core animation components
export { default as ScrollTrigger, FadeInOnScroll, SlideUpOnScroll, ScaleInOnScroll, StaggeredList, useScrollTrigger } from './ScrollTrigger'

// Brush stroke and text animations
export { BrushUnderline, BrushStrokeText } from './BrushUnderline'
export { RotatingText, TypewriterText } from './RotatingText'

// Educational-specific animations
export {
  AnimatedHeroText,
  AnimatedCard,
  AnimatedButton,
  FloatingElement,
  QuizQuestion,
  Celebration,
  StaggeredList as EducationalStaggeredList,
  LoadingSkeleton,
  AnimatedProgress
} from './EducationalAnimations'

// Optimized counter components
export {
  default as OptimizedAnimatedCounter,
  useOptimizedAnimatedCounter,
  StatCounter,
  PercentageCounter,
  CurrencyCounter
} from './OptimizedAnimatedCounter'

// Optimized button components
export {
  default as OptimizedPulseButton,
  OptimizedIconButton,
  OptimizedFloatingActionButton,
  OptimizedCTAButton
} from './OptimizedPulseButton'

// Animation utilities (re-export from lib)
export {
  isMobile,
  prefersReducedMotion,
  getAnimationDuration,
  enableGPUAcceleration,
  disableGPUAcceleration,
  ScrollTrigger as ScrollTriggerClass,
  scrollTrigger,
  staggerChildren,
  addTouchFeedback,
  createConfetti,
  measureAnimationPerformance,
  AnimationQueue,
  animateHeroText,
  celebrateSuccess,
  animateQuizFeedback,
  createSkeletonLoader
} from '@/lib/animation-utils'

// Type exports
export type {
  AnimationOptions,
  ScrollTriggerOptions,
  ConfettiOptions
} from '@/lib/animation-utils'