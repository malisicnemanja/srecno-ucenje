// Export all UI components

// Button System - Complete brand-aligned design system
export { Button, type ButtonProps } from './Button'

// Icon System - Professional animated SVG icon library
export {
  // Obrazovanje ikone
  BookIcon,
  PencilIcon,
  GraduationIcon,
  SchoolIcon,
  BackpackIcon,
  
  // Navigacija ikone
  ArrowRightIcon,
  ChevronDownIcon,
  MenuIcon,
  CloseIcon,
  
  // Franšiza ikone
  LocationIcon,
  GraphIcon,
  PeopleIcon,
  TrophyIcon,
  HandshakeIcon,
  
  // Komunikacija ikone
  PhoneIcon,
  EmailIcon,
  ChatIcon,
  VideoIcon,
  
  // UI elementi ikone
  CheckIcon,
  StarIcon,
  HeartIcon,
  InfoIcon,
  WarningIcon,
  
  // Complete Icons collection
  Icons,
  default as IconsDefault
} from './Icons'

// Animation components
export { default as BookOpeningAnimation } from './BookOpeningAnimation'
export { default as FloatingLetters, AnimatedLetter, AnimatedTitle } from './FloatingLetters'
export { default as PulseButton, PulseIconButton, FloatingActionButton } from './PulseButton'

// Core UI components
export { default as Toast, ToastProvider, useToast } from './Toast'
export { default as SkeletonLoader } from './SkeletonLoader'
export { default as LoadingSpinner } from './LoadingSpinner'
export { default as LoadingButton } from './LoadingButton'
export { default as BottomSheet } from './BottomSheet'
export { default as FormProgress } from './FormProgress'
export { default as EmptyState } from './EmptyState'
export { default as AchievementBadge } from './AchievementBadge'
export { default as ProgressRing, LessonProgressRing, CourseProgressRing, QuizScoreRing, SkillProgressRing } from './ProgressRing'
export { default as FAB, EducationalFAB, SupportFAB } from './FAB'
export { default as AlternatingText, type AlternatingTextProps, type BrandColor, type AnimationMode } from './AlternatingText'

// Educational components
export { default as QuizCard } from '../educational/QuizCard'