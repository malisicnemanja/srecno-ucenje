'use client'

import React, { useState } from 'react'
import {
  Toast,
  ToastProvider,
  useToast,
  SkeletonLoader,
  LoadingSpinner,
  LoadingButton,
  BottomSheet,
  FormProgress,
  EmptyState,
  AchievementBadge,
  ProgressRing,
  FAB,
  EducationalFAB,
  QuizCard
} from '../ui'
import { BookOpen, Trophy, Target, Users, Plus, Settings, HelpCircle } from 'lucide-react'

// Demo component that uses the toast context
const ToastDemo: React.FC = () => {
  const { success, error, warning, info, loading, achievement } = useToast()

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold mb-4">Toast Notifications</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <button
          onClick={() => success('Lesson completed successfully!')}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Success Toast
        </button>
        <button
          onClick={() => error('Failed to load content')}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Error Toast
        </button>
        <button
          onClick={() => warning('Internet connection is slow')}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
        >
          Warning Toast
        </button>
        <button
          onClick={() => info('New lesson available')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Info Toast
        </button>
        <button
          onClick={() => loading('Processing quiz results...')}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          Loading Toast
        </button>
        <button
          onClick={() => achievement('🎉 You earned a new badge!', { 
            title: 'Achievement Unlocked',
            duration: 6000 
          })}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Achievement Toast
        </button>
      </div>
    </div>
  )
}

const ComponentShowcase: React.FC = () => {
  const [loadingState, setLoadingState] = useState(false)
  const [buttonSuccess, setButtonSuccess] = useState(false)
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [progress, setProgress] = useState(75)

  const formSteps = [
    { id: 'personal', title: 'Personal Info', description: 'Enter your details' },
    { id: 'education', title: 'Education Level', description: 'Select your level', completed: true },
    { id: 'preferences', title: 'Learning Preferences', description: 'Customize your experience' },
    { id: 'review', title: 'Review & Submit', description: 'Confirm your information' }
  ]

  const quizQuestions = [
    {
      id: '1',
      question: 'What is the capital of France?',
      type: 'multiple-choice' as const,
      options: [
        { id: 'a', text: 'London', isCorrect: false },
        { id: 'b', text: 'Berlin', isCorrect: false },
        { id: 'c', text: 'Paris', isCorrect: true },
        { id: 'd', text: 'Madrid', isCorrect: false }
      ],
      explanation: 'Paris is the capital and most populous city of France.',
      points: 10
    },
    {
      id: '2',
      question: 'Is the Earth round?',
      type: 'true-false' as const,
      correctAnswer: 'true',
      explanation: 'The Earth is approximately spherical in shape.',
      points: 5
    }
  ]

  const handleLoadingButton = async () => {
    setLoadingState(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLoadingState(false)
    setButtonSuccess(true)
    setTimeout(() => setButtonSuccess(false), 2000)
  }

  const fabActions = [
    {
      id: 'help',
      icon: <HelpCircle className="w-full h-full" />,
      label: 'Get Help',
      onClick: () => alert('Help clicked!')
    },
    {
      id: 'settings',
      icon: <Settings className="w-full h-full" />,
      label: 'Settings',
      onClick: () => alert('Settings clicked!')
    }
  ]

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <header className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Srećno Učenje UI Component Showcase
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive library of educational platform components
            </p>
          </header>

          {/* Toast Demo */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <ToastDemo />
          </section>

          {/* Loading States */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Loading States</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Loading Spinners</h4>
                <div className="flex items-center space-x-4">
                  <LoadingSpinner size="sm" />
                  <LoadingSpinner size="md" variant="dots" />
                  <LoadingSpinner size="lg" variant="ring" color="secondary" />
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3">Loading Button</h4>
                <LoadingButton
                  loading={loadingState}
                  success={buttonSuccess}
                  onClick={handleLoadingButton}
                  loadingText="Processing..."
                  successText="Done!"
                >
                  Click Me
                </LoadingButton>
              </div>
            </div>
          </section>

          {/* Skeleton Loaders */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Skeleton Loaders</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkeletonLoader type="card" />
              <SkeletonLoader type="lesson" />
              <SkeletonLoader type="quiz" />
            </div>
          </section>

          {/* Form Progress */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Form Progress</h3>
            <div className="space-y-6">
              <FormProgress
                steps={formSteps}
                currentStep={currentStep}
                onStepClick={setCurrentStep}
                allowStepNavigation
              />
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentStep(Math.min(formSteps.length - 1, currentStep + 1))}
                  disabled={currentStep === formSteps.length - 1}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </section>

          {/* Progress Rings */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Progress Rings</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <ProgressRing progress={progress} showLabel label="Overall" />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Overall Progress</p>
              </div>
              <div>
                <ProgressRing progress={85} variant="educational" size={80} />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Lesson Progress</p>
              </div>
              <div>
                <ProgressRing progress={92} variant="gradient" size={80} />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Quiz Score</p>
              </div>
              <div>
                <ProgressRing progress={67} variant="minimal" size={80} />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Skill Level</p>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-64"
              />
            </div>
          </section>

          {/* Achievement Badges */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Achievement Badges</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6 text-center">
              <AchievementBadge type="first-lesson" level="bronze" unlocked size="lg" />
              <AchievementBadge type="quiz-master" level="silver" unlocked size="lg" />
              <AchievementBadge type="streak-keeper" level="gold" unlocked isNew size="lg" />
              <AchievementBadge type="course-complete" level="platinum" unlocked size="lg" />
              <AchievementBadge type="perfect-score" level="gold" progress={80} showProgress size="lg" />
              <AchievementBadge type="helping-hand" level="bronze" size="lg" />
            </div>
          </section>

          {/* Empty States */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Empty States</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EmptyState
                variant="no-lessons"
                actions={[
                  {
                    label: 'Browse Courses',
                    onClick: () => alert('Browse courses'),
                    variant: 'primary',
                    icon: <BookOpen className="w-4 h-4" />
                  }
                ]}
              />
              <EmptyState
                variant="no-achievements"
                size="sm"
                actions={[
                  {
                    label: 'Start Learning',
                    onClick: () => alert('Start learning'),
                    variant: 'secondary'
                  }
                ]}
              />
            </div>
          </section>

          {/* Quiz Component */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Quiz Component</h3>
            <div className="max-w-2xl">
              <QuizCard
                questions={quizQuestions}
                title="Sample Geography Quiz"
                description="Test your knowledge of world capitals"
                onComplete={(results) => {
                  alert(`Quiz completed! Score: ${results.score}%`)
                }}
              />
            </div>
          </section>

          {/* Bottom Sheet */}
          <section className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Bottom Sheet</h3>
            <button
              onClick={() => setShowBottomSheet(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Open Bottom Sheet
            </button>
            <BottomSheet
              isOpen={showBottomSheet}
              onClose={() => setShowBottomSheet(false)}
              title="Lesson Options"
              snapPoints={[40, 70, 90]}
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span>Continue Reading</span>
                </div>
                <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                  <Target className="w-5 h-5 text-green-600" />
                  <span>Take Quiz</span>
                </div>
                <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span>Join Discussion</span>
                </div>
                <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                  <span>View Achievements</span>
                </div>
              </div>
            </BottomSheet>
          </section>

          {/* Floating Action Button */}
          <FAB
            actions={fabActions}
            position="bottom-right"
            variant="educational"
            tooltip="Quick Actions"
          />
        </div>
      </div>
    </ToastProvider>
  )
}

export default ComponentShowcase