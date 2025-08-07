'use client'

import { useState } from 'react'
import { 
  Button, 
  PrimaryButton, 
  SecondaryButton, 
  AccentButton, 
  DangerButton, 
  NeutralButton,
  IconButton,
  SubjectButton,
  DifficultyButton,
  BookIcon,
  CalculatorIcon,
  ScienceIcon,
  ArtIcon,
  SportsIcon,
  StarIcon,
  TrophyIcon,
  PlayIcon,
  HeartIcon
} from '@/components/ui'
import { brandColors, colorRotation } from '@/lib/design-tokens'

export default function DesignSystemShowcase() {
  const [activeAnimation, setActiveAnimation] = useState<'none' | 'pulse' | 'bounce' | 'scale'>('none')

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-grass via-sky to-sun bg-clip-text text-transparent">
            Srećno učenje Design System
          </h1>
          <p className="text-lg text-night-600 max-w-2xl mx-auto">
            Complete design system with 5 brand colors, professional SVG icons, and educational context
          </p>
        </header>

        {/* Brand Colors Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-night-800">Brand Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {Object.entries(brandColors).map(([name, color]) => (
              <div key={name} className="text-center">
                <div 
                  className="w-24 h-24 rounded-lg shadow-lg mx-auto mb-3"
                  style={{ backgroundColor: color }}
                />
                <h3 className="font-semibold capitalize text-night-800">{name}</h3>
                <p className="text-sm text-night-600">{color}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Button System - All Variants */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-night-800">Button System</h2>
            <p className="text-night-600">5 colors × 2 variants = 10 combinations</p>
          </div>

          {/* Animation Controls */}
          <div className="flex justify-center gap-4 flex-wrap">
            <Button 
              color="night" 
              variant="outline" 
              size="sm"
              onClick={() => setActiveAnimation('none')}
            >
              No Animation
            </Button>
            <Button 
              color="grass" 
              variant="outline" 
              size="sm"
              onClick={() => setActiveAnimation('pulse')}
            >
              Pulse
            </Button>
            <Button 
              color="sky" 
              variant="outline" 
              size="sm"
              onClick={() => setActiveAnimation('bounce')}
            >
              Bounce
            </Button>
            <Button 
              color="sun" 
              variant="outline" 
              size="sm"
              onClick={() => setActiveAnimation('scale')}
            >
              Scale
            </Button>
          </div>

          {/* Solid Buttons */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-night-700">Solid Buttons</h3>
            <div className="flex gap-4 flex-wrap justify-center">
              <Button color="grass" animation={activeAnimation}>Grass</Button>
              <Button color="sky" animation={activeAnimation}>Sky</Button>
              <Button color="sun" animation={activeAnimation}>Sun</Button>
              <Button color="heart" animation={activeAnimation}>Heart</Button>
              <Button color="night" animation={activeAnimation}>Night</Button>
            </div>
          </div>

          {/* Outline Buttons */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-night-700">Outline Buttons</h3>
            <div className="flex gap-4 flex-wrap justify-center">
              <Button color="grass" variant="outline" animation={activeAnimation}>Grass</Button>
              <Button color="sky" variant="outline" animation={activeAnimation}>Sky</Button>
              <Button color="sun" variant="outline" animation={activeAnimation}>Sun</Button>
              <Button color="heart" variant="outline" animation={activeAnimation}>Heart</Button>
              <Button color="night" variant="outline" animation={activeAnimation}>Night</Button>
            </div>
          </div>

          {/* Button Sizes */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-night-700">Button Sizes</h3>
            <div className="flex gap-4 flex-wrap justify-center items-end">
              <Button color="grass" size="sm">Small</Button>
              <Button color="sky" size="md">Medium</Button>
              <Button color="sun" size="lg">Large</Button>
              <Button color="heart" size="xl">Extra Large</Button>
            </div>
          </div>

          {/* Specialized Button Components */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-night-700">Specialized Components</h3>
            <div className="flex gap-4 flex-wrap justify-center">
              <PrimaryButton>Primary</PrimaryButton>
              <SecondaryButton>Secondary</SecondaryButton>
              <AccentButton>Accent</AccentButton>
              <DangerButton>Danger</DangerButton>
              <NeutralButton>Neutral</NeutralButton>
            </div>
          </div>
        </section>

        {/* Icon Buttons */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-night-800">Icon Buttons</h2>
          <div className="flex gap-4 flex-wrap justify-center">
            <IconButton color="grass" icon={<PlayIcon />} aria-label="Play" />
            <IconButton color="sky" icon={<BookIcon />} aria-label="Book" />
            <IconButton color="sun" icon={<StarIcon />} aria-label="Star" />
            <IconButton color="heart" icon={<HeartIcon />} aria-label="Heart" />
            <IconButton color="night" icon={<TrophyIcon />} aria-label="Trophy" />
          </div>
        </section>

        {/* Educational Context Buttons */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-night-800">Educational Context Buttons</h2>
          
          {/* Subject Buttons */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-night-700">Subject Buttons</h3>
            <p className="text-sm text-night-600">Auto-assign colors based on educational context</p>
            <div className="flex gap-4 flex-wrap justify-center">
              <SubjectButton 
                subject="mathematics" 
                icon={<CalculatorIcon />}
                animation={activeAnimation}
              >
                Mathematics
              </SubjectButton>
              <SubjectButton 
                subject="language" 
                icon={<BookIcon />}
                animation={activeAnimation}
              >
                Language
              </SubjectButton>
              <SubjectButton 
                subject="science" 
                icon={<ScienceIcon />}
                animation={activeAnimation}
              >
                Science
              </SubjectButton>
              <SubjectButton 
                subject="arts" 
                icon={<ArtIcon />}
                animation={activeAnimation}
              >
                Arts
              </SubjectButton>
              <SubjectButton 
                subject="sports" 
                icon={<SportsIcon />}
                animation={activeAnimation}
              >
                Sports
              </SubjectButton>
            </div>
          </div>

          {/* Difficulty Buttons */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-night-700">Difficulty Buttons</h3>
            <p className="text-sm text-night-600">Progressive difficulty with appropriate colors</p>
            <div className="flex gap-4 flex-wrap justify-center">
              <DifficultyButton level="beginner" animation={activeAnimation}>
                Beginner
              </DifficultyButton>
              <DifficultyButton level="intermediate" animation={activeAnimation}>
                Intermediate
              </DifficultyButton>
              <DifficultyButton level="advanced" animation={activeAnimation}>
                Advanced
              </DifficultyButton>
              <DifficultyButton level="expert" animation={activeAnimation}>
                Expert
              </DifficultyButton>
              <DifficultyButton level="challenge" animation={activeAnimation}>
                Challenge
              </DifficultyButton>
            </div>
          </div>
        </section>

        {/* SVG Icons Showcase */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-night-800">SVG Icon Library</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 p-6 bg-white rounded-xl shadow-soft">
            <div className="text-center space-y-2">
              <BookIcon size={32} className="mx-auto text-sky" />
              <p className="text-sm text-night-600">Book</p>
            </div>
            <div className="text-center space-y-2">
              <CalculatorIcon size={32} className="mx-auto text-night" />
              <p className="text-sm text-night-600">Calculator</p>
            </div>
            <div className="text-center space-y-2">
              <ScienceIcon size={32} className="mx-auto text-grass" />
              <p className="text-sm text-night-600">Science</p>
            </div>
            <div className="text-center space-y-2">
              <ArtIcon size={32} className="mx-auto text-heart" />
              <p className="text-sm text-night-600">Art</p>
            </div>
            <div className="text-center space-y-2">
              <SportsIcon size={32} className="mx-auto text-sun" />
              <p className="text-sm text-night-600">Sports</p>
            </div>
            <div className="text-center space-y-2">
              <StarIcon size={32} className="mx-auto text-sun" />
              <p className="text-sm text-night-600">Star</p>
            </div>
            <div className="text-center space-y-2">
              <TrophyIcon size={32} className="mx-auto text-grass" />
              <p className="text-sm text-night-600">Trophy</p>
            </div>
            <div className="text-center space-y-2">
              <HeartIcon size={32} className="mx-auto text-heart" />
              <p className="text-sm text-night-600">Heart</p>
            </div>
          </div>
        </section>

        {/* Color Rotation System */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-night-800">Color Rotation System</h2>
          <p className="text-night-600">Dynamic color assignment for lists and repeating elements</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Educational Subjects */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-night-700">Subject Colors</h3>
              <div className="space-y-2">
                {Object.entries(colorRotation.educational.subjects).map(([subject, color]) => (
                  <div key={subject} className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: color }}
                    />
                    <span className="capitalize text-night-700">{subject}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Difficulty Levels */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-night-700">Difficulty Colors</h3>
              <div className="space-y-2">
                {Object.entries(colorRotation.educational.difficulty).map(([level, color]) => (
                  <div key={level} className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: color }}
                    />
                    <span className="capitalize text-night-700">{level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emotional States */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-night-700">Emotion Colors</h3>
              <div className="space-y-2">
                {Object.entries(colorRotation.educational.emotions).map(([emotion, color]) => (
                  <div key={emotion} className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: color }}
                    />
                    <span className="capitalize text-night-700">{emotion}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Examples */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-night-800">Interactive Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Loading States */}
            <div className="space-y-4 p-6 bg-white rounded-xl shadow-soft">
              <h3 className="text-lg font-semibold text-night-700">Loading States</h3>
              <div className="space-y-3">
                <Button color="grass" loading fullWidth>Loading Grass</Button>
                <Button color="sky" loading fullWidth>Loading Sky</Button>
                <Button color="sun" loading fullWidth>Loading Sun</Button>
              </div>
            </div>

            {/* Disabled States */}
            <div className="space-y-4 p-6 bg-white rounded-xl shadow-soft">
              <h3 className="text-lg font-semibold text-night-700">Disabled States</h3>
              <div className="space-y-3">
                <Button color="heart" disabled fullWidth>Disabled Heart</Button>
                <Button color="night" disabled fullWidth>Disabled Night</Button>
                <Button color="grass" variant="outline" disabled fullWidth>Disabled Outline</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-night-600">
          <p>🏆 Srećno učenje Design System - Championship level design</p>
          <p className="text-sm mt-2">
            Built with React, TypeScript, Tailwind CSS, and Framer Motion
          </p>
        </footer>
      </div>
    </div>
  )
}