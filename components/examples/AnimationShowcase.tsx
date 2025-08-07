'use client'

import { useState } from 'react'
import {
  // Page transitions
  PageTransition,
  
  // Scroll animations
  ScrollReveal,
  StaggeredReveal,
  
  // Text animations
  WordByWordReveal,
  LetterByLetterReveal,
  NumberCounter,
  GradientText,
  TypewriterText,
  
  // Background effects
  FloatingShapes,
  WavePattern,
  
  // Educational animations
  AnimatedCard,
  AnimatedButton,
  QuizQuestion,
  Celebration,
  AnimatedProgress
} from '@/components/animations'

import {
  // Interactive hooks
  useTiltEffect,
  useRippleEffect,
  useTouchFeedback,
  
  // Mobile gestures
  useSwipeGesture,
  useLongPress
} from '@/hooks/useInteractiveAnimations'

interface AnimationShowcaseProps {
  className?: string
}

export const AnimationShowcase = ({ className = '' }: AnimationShowcaseProps) => {
  const [quizAnswer, setQuizAnswer] = useState<boolean | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [progress, setProgress] = useState(0)
  const [counterValue, setCounterValue] = useState(0)

  // Interactive animation examples
  const tiltRef = useTiltEffect({ maxTilt: 20, glare: true })
  const rippleRef = useRippleEffect({ color: 'rgba(59, 130, 246, 0.3)' })
  const touchRef = useTouchFeedback()
  
  const swipeRef = useSwipeGesture((result) => {
    console.log('Swipe detected:', result.direction)
  })
  
  const longPressRef = useLongPress(() => {
    console.log('Long press detected!')
    setShowCelebration(true)
  })

  const handleQuizAnswer = (correct: boolean) => {
    setQuizAnswer(correct)
    if (correct) {
      setShowCelebration(true)
      setTimeout(() => {
        setProgress(100)
        setCounterValue(95)
      }, 500)
    }
  }

  const demoCards = [
    { title: 'Matematika', icon: '🔢', color: 'bg-blue-500' },
    { title: 'Srpski jezik', icon: '📚', color: 'bg-green-500' },
    { title: 'Priroda i društvo', icon: '🌍', color: 'bg-purple-500' },
    { title: 'Engleski jezik', icon: '🇬🇧', color: 'bg-red-500' }
  ]

  return (
    <div className={`animation-showcase space-y-12 ${className}`}>
      {/* Floating background effects */}
      <FloatingShapes 
        theme="educational" 
        count={8}
        className="opacity-30"
      />
      <WavePattern 
        position="bottom" 
        color="#3b82f6"
        amplitude={15}
      />

      {/* Page transition example */}
      <section className="space-y-6">
        <ScrollReveal direction="up">
          <h2 className="text-3xl font-bold text-center">
            <GradientText colors={['from-blue-600', 'via-purple-600', 'to-pink-600']}>
              Animacija demo platforma
            </GradientText>
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
          <div className="text-center">
            <TypewriterText 
              text="Dobrodošli na interaktivnu demo platformu za animacije!" 
              speed={50}
              className="text-lg text-gray-600"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* Text animations section */}
      <section className="space-y-8">
        <ScrollReveal direction="left">
          <h3 className="text-2xl font-semibold">Animacije teksta</h3>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollReveal direction="up" delay={100}>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h4 className="text-lg font-medium mb-4">Reč po reč</h4>
              <WordByWordReveal className="text-gray-700">
                Svaka reč se pojavljuje postupno i elegantno
              </WordByWordReveal>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={200}>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h4 className="text-lg font-medium mb-4">Slovo po slovo</h4>
              <LetterByLetterReveal className="text-gray-700">
                Animacija slovo po slovo
              </LetterByLetterReveal>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Interactive cards section */}
      <section className="space-y-8">
        <ScrollReveal direction="right">
          <h3 className="text-2xl font-semibold">Interaktivne kartice</h3>
        </ScrollReveal>

        <StaggeredReveal staggerDelay={0.15}>
          {demoCards.map((card, index) => (
            <div key={card.title} className="mb-4">
              <AnimatedCard
                variant="lift"
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                onClick={() => console.log(`Clicked on ${card.title}`)}
              >
                <div 
                  {...tiltRef}
                  className="flex items-center space-x-4"
                >
                  <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center text-white text-2xl`}>
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{card.title}</h4>
                    <p className="text-gray-600">Kliknite za više informacija</p>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          ))}
        </StaggeredReveal>
      </section>

      {/* Interactive buttons section */}
      <section className="space-y-8">
        <ScrollReveal direction="up">
          <h3 className="text-2xl font-semibold">Interaktivni dugmića</h3>
        </ScrollReveal>

        <div className="flex flex-wrap gap-4">
          <div {...rippleRef}>
            <AnimatedButton
              variant="primary"
              animation="invert"
              onClick={() => handleQuizAnswer(true)}
              className="bg-green-500 hover:bg-green-600 border-green-500"
            >
              Tačan odgovor ✓
            </AnimatedButton>
          </div>

          <div {...touchRef}>
            <AnimatedButton
              variant="secondary"
              animation="bounce"
              onClick={() => handleQuizAnswer(false)}
              className="bg-red-500 hover:bg-red-600 border-red-500"
            >
              Netačan odgovor ✗
            </AnimatedButton>
          </div>

          <div {...longPressRef}>
            <AnimatedButton
              variant="accent"
              animation="pulse"
              className="bg-purple-500 hover:bg-purple-600 border-purple-500"
            >
              Držite dugo za iznenađenje
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* Quiz section */}
      <section className="space-y-8">
        <ScrollReveal direction="left">
          <h3 className="text-2xl font-semibold">Kviz animacije</h3>
        </ScrollReveal>

        <QuizQuestion
          isCorrect={quizAnswer}
          showFeedback={quizAnswer !== null}
          onFeedbackComplete={() => {
            setTimeout(() => setQuizAnswer(null), 1000)
          }}
        >
          <div className="text-center">
            <h4 className="text-xl font-medium mb-4">
              Koliko je 2 + 2?
            </h4>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleQuizAnswer(true)}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                4
              </button>
              <button
                onClick={() => handleQuizAnswer(false)}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                5
              </button>
            </div>
          </div>
        </QuizQuestion>
      </section>

      {/* Progress and counters */}
      <section className="space-y-8">
        <ScrollReveal direction="right">
          <h3 className="text-2xl font-semibold">Napredovanje i brojevi</h3>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h4 className="text-lg font-medium mb-4">Progres bar</h4>
            <AnimatedProgress 
              progress={progress} 
              color="#3b82f6"
              showPercentage 
            />
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg text-center">
            <h4 className="text-lg font-medium mb-4">Brojač bodova</h4>
            <div className="text-4xl font-bold text-blue-600">
              <NumberCounter 
                from={0} 
                to={counterValue}
                duration={2}
                suffix=" bodova"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile gestures section */}
      <section className="space-y-8">
        <ScrollReveal direction="up">
          <h3 className="text-2xl font-semibold">Mobilni gestovi</h3>
        </ScrollReveal>

        <div 
          {...swipeRef}
          className="p-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl text-center"
        >
          <h4 className="text-xl font-medium mb-2">Swipe zona</h4>
          <p>Prevucite u bilo kom smeru (levo, desno, gore, dole)</p>
          <p className="text-sm opacity-75 mt-2">Otvorite konzolu da vidite rezultat</p>
        </div>
      </section>

      {/* Celebration component */}
      <Celebration
        trigger={showCelebration}
        onComplete={() => setShowCelebration(false)}
        confetti={true}
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold text-green-600">Bravo!</h3>
          <p className="text-gray-600">Uspešno ste aktivirali animaciju!</p>
        </div>
      </Celebration>

      {/* Performance note */}
      <section className="mt-16">
        <ScrollReveal direction="up">
          <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="text-lg font-semibold text-yellow-800 mb-2">
              Napomena o performansama
            </h4>
            <p className="text-yellow-700">
              Sve animacije poštuju korisničke postavke za smanjeno kretanje 
              (prefers-reduced-motion) i optimizovane su za mobilne uređaje.
              Na slabijim uređajima animacije se automatski pojednostavljuju.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}

export default AnimationShowcase