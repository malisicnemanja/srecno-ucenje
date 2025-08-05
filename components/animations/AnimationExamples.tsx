'use client'

/**
 * SREĆNO UČENJE - ANIMATION EXAMPLES
 * Demonstration of performant animation components
 * These examples show best practices for educational platform animations
 */

import React, { useState } from 'react'
import {
  AnimatedHeroText,
  AnimatedCard,
  AnimatedButton,
  FloatingElement,
  QuizQuestion,
  Celebration,
  StaggeredList,
  LoadingSkeleton,
  AnimatedProgress,
  OptimizedAnimatedCounter,
  StatCounter,
  PercentageCounter,
  CurrencyCounter,
  OptimizedPulseButton,
  OptimizedIconButton,
  OptimizedFloatingActionButton,
  OptimizedCTAButton,
  ScrollTrigger,
  FadeInOnScroll,
  SlideUpOnScroll
} from './index'

// Example page component showcasing all animations
export default function AnimationExamples() {
  const [quizAnswer, setQuizAnswer] = useState<boolean | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [progress, setProgress] = useState(0)

  return (
    <div className="animation-examples min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 space-y-16">
        
        {/* Hero Section */}
        <section className="text-center">
          <AnimatedHeroText 
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            brushStroke={true}
          >
            Srećno učenje animacije
          </AnimatedHeroText>
          
          <div className="flex gap-4 justify-center mb-8">
            <FloatingElement animation="gentle" delay={500}>
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">
                ☀️
              </div>
            </FloatingElement>
            
            <FloatingElement animation="bounce" delay={1000}>
              <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center text-2xl">
                ☁️
              </div>
            </FloatingElement>
            
            <FloatingElement animation="letters" delay={1500}>
              <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center text-2xl">
                🌱
              </div>
            </FloatingElement>
          </div>
        </section>

        {/* Statistics Counter Section */}
        <FadeInOnScroll>
          <section className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-8">Naši rezultati</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <StatCounter 
                value={5000} 
                label="Zadovoljna deca"
                icon="👶"
                delay={0}
              />
              <StatCounter 
                value={250} 
                label="Edukatori"
                icon="👩‍🏫"
                delay={200}
              />
              <StatCounter 
                value={98} 
                label="Uspešnost (%)"
                icon="⭐"
                delay={400}
              />
            </div>
          </section>
        </FadeInOnScroll>

        {/* Interactive Cards Section */}
        <SlideUpOnScroll>
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">Interaktivne kartice</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <AnimatedCard variant="lift" className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    📚
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Čitanje</h3>
                  <p className="text-gray-600">Zabavno učenje čitanja kroz interaktivne priče</p>
                </div>
              </AnimatedCard>

              <AnimatedCard variant="scale" className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    🔢
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Matematika</h3>
                  <p className="text-gray-600">Igranje brojeva i logično razmišljanje</p>
                </div>
              </AnimatedCard>

              <AnimatedCard variant="glow" className="bg-white p-6 rounded-xl shadow-md">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    🎨
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Kreativnost</h3>
                  <p className="text-gray-600">Razvijanje mašte kroz umetnost i igru</p>
                </div>
              </AnimatedCard>
            </div>
          </section>
        </SlideUpOnScroll>

        {/* Button Examples */}
        <section className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Animirana dugmad</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <OptimizedPulseButton 
              variant="primary"
              animation="pulse"
              intensity="medium"
            >
              Osnovno dugme
            </OptimizedPulseButton>

            <OptimizedIconButton 
              icon="📖"
              variant="secondary"
              animation="glow"
            >
              Sa ikonom
            </OptimizedIconButton>

            <OptimizedCTAButton 
              urgent={true}
              onClick={() => setShowCelebration(true)}
            >
              Hitno dugme
            </OptimizedCTAButton>

            <OptimizedCTAButton 
              success={true}
            >
              Uspešno dugme
            </OptimizedCTAButton>
          </div>
        </section>

        {/* Quiz Example */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Kviz animacija</h2>
          <div className="max-w-2xl mx-auto">
            <QuizQuestion
              isCorrect={quizAnswer}
              showFeedback={quizAnswer !== null}
              onFeedbackComplete={() => setQuizAnswer(null)}
              className="mb-4"
            >
              <h3 className="text-xl font-semibold mb-4">Koliko je 2 + 2?</h3>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => setQuizAnswer(false)}
                >
                  3
                </button>
                <button 
                  className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => setQuizAnswer(true)}
                >
                  4
                </button>
                <button 
                  className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => setQuizAnswer(false)}
                >
                  5
                </button>
                <button 
                  className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => setQuizAnswer(false)}
                >
                  6
                </button>
              </div>
            </QuizQuestion>
          </div>
        </section>

        {/* Progress Animation */}
        <section className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Napredak</h2>
          <div className="max-w-md mx-auto space-y-6">
            <AnimatedProgress 
              progress={progress}
              showPercentage={true}
              duration={1500}
            />
            
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => setProgress(Math.min(100, progress + 25))}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                +25%
              </button>
              <button 
                onClick={() => setProgress(0)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
            </div>

            <div className="text-center">
              <PercentageCounter percentage={progress} size="lg" />
            </div>
          </div>
        </section>

        {/* Staggered List */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Staggered lista</h2>
          <StaggeredList
            animation="slideUp"
            staggerDelay={150}
            className="max-w-2xl mx-auto"
          >
            {[
              'Prva stavka se pojavljuje prva',
              'Druga stavka dolazi posle kratke pauze', 
              'Treća stavka nastavlja ritam',
              'Četvrta stavka završava sekvencu'
            ].map((text, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
                <p className="text-gray-800">{text}</p>
              </div>
            ))}
          </StaggeredList>
        </section>

        {/* Loading States */}
        <section className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">Loading animacije</h2>
          <div className="max-w-md mx-auto">
            <LoadingSkeleton 
              lines={4}
              width={['100%', '90%', '70%', '45%']}
              className="mb-6"
            />
            
            <div className="text-center">
              <div className="inline-block animate-dots text-primary-600 text-lg font-semibold">
                Učitava
              </div>
            </div>
          </div>
        </section>

        {/* Celebration Component */}
        <Celebration 
          trigger={showCelebration}
          onComplete={() => setShowCelebration(false)}
          confetti={true}
        >
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-primary-600">Čestitamo!</h2>
            <p className="text-gray-600 mt-2">Uspešno ste završili animaciju!</p>
          </div>
        </Celebration>

        {/* Floating Action Button */}
        <OptimizedFloatingActionButton 
          icon="❤️"
          variant="accent"
          position="bottom-right"
          onClick={() => alert('Volimo animacije!')}
        />
      </div>
    </div>
  )
}

// Individual component examples for testing
export function HeroTextExample() {
  return (
    <div className="p-8 text-center">
      <AnimatedHeroText brushStroke={true}>
        Dobrodošli u svet učenja
      </AnimatedHeroText>
    </div>
  )
}

export function CounterExample() {
  return (
    <div className="p-8 grid md:grid-cols-3 gap-8">
      <OptimizedAnimatedCounter end={1250} suffix=" učenika" />
      <PercentageCounter percentage={95} />
      <CurrencyCounter amount={50000} currency="RSD" />
    </div>
  )
}

export function CardsExample() {
  return (
    <div className="p-8 grid md:grid-cols-3 gap-6">
      <AnimatedCard variant="lift" className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-2">Lift Effect</h3>
        <p>Kartica se podiže na hover</p>
      </AnimatedCard>
      
      <AnimatedCard variant="scale" className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-2">Scale Effect</h3>
        <p>Kartica se uvećava na hover</p>
      </AnimatedCard>
      
      <AnimatedCard variant="glow" className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-2">Glow Effect</h3>
        <p>Kartica svetli na hover</p>
      </AnimatedCard>
    </div>
  )
}