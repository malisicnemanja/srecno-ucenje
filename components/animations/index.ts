/**
 * SREĆNO UČENJE - ANIMATION COMPONENTS
 * Performant, accessible animation components for educational platform
 * All components respect reduced motion preferences and optimize for mobile
 */

// Core animation components
export { default as ScrollTrigger, FadeInOnScroll, SlideUpOnScroll, ScaleInOnScroll, StaggeredList, useScrollTrigger } from './ScrollTrigger'

// Page transitions
export { default as PageTransition, RouteTransition, usePageTransition } from './PageTransition'

// Scroll reveal animations
export { default as ScrollReveal, StaggeredReveal, FadeInList, ImageReveal, useScrollReveal } from './ScrollReveal'

// Text animations (enhanced)
export {
  WordByWordReveal,
  LetterByLetterReveal,
  HighlightAnimation,
  NumberCounter,
  SplitTextReveal,
  GradientText,
  RotatingText,
  TypewriterText
} from './TextAnimations'

// Brush stroke animations
export { BrushUnderline, BrushStrokeText } from './BrushUnderline'

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

// Background effects
export {
  FloatingShapes,
  ParticleSystem,
  WavePattern,
  AnimatedGradient,
  Constellation
} from './BackgroundEffects'

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

// Interactive animation hooks (re-export from hooks)
export {
  useTiltEffect,
  useRippleEffect,
  useDragAnimation,
  useTouchFeedback
} from '@/hooks/useInteractiveAnimations'

// Mobile gesture hooks (re-export from hooks)
export {
  useSwipeGesture,
  usePullToRefresh,
  useLongPress,
  usePinchZoom,
  useMobileGestures
} from '@/hooks/useMobileGestures'

// Example and showcase components
export { default as AnimationShowcase } from '@/components/examples/AnimationShowcase'

// Type exports
export type {
  AnimationOptions,
  ScrollTriggerOptions,
  ConfettiOptions
} from '@/lib/animation-utils'

// Note: Additional types are available directly from their respective hook modules
// Import them directly when needed:
// import type { SwipeOptions } from '@/hooks/useMobileGestures'
// import type { TiltOptions } from '@/hooks/useInteractiveAnimations'