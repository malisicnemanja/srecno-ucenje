# Srećno Učenje - Animation System

A comprehensive, performant animation system designed specifically for educational platforms. Built with React, Framer Motion, and optimized for mobile devices with accessibility in mind.

## Features

### 🎯 **Performance First**
- GPU-accelerated animations
- Automatic reduced motion support
- Mobile-optimized durations
- 60fps smooth animations
- Bundle size optimized

### 📱 **Mobile Optimized**
- Touch-friendly gestures
- Reduced animation complexity on low-end devices
- Battery-conscious animations
- Network-aware loading states

### ♿ **Accessibility Built-in**
- Respects `prefers-reduced-motion`
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

### 🎨 **Educational Focus**
- Subject-themed animations
- Progress tracking animations
- Quiz feedback systems
- Achievement celebrations
- Learning progress indicators

## Quick Start

```tsx
import { 
  ScrollReveal, 
  WordByWordReveal, 
  AnimatedButton 
} from '@/components/animations'

function MyComponent() {
  return (
    <div>
      <ScrollReveal direction="up">
        <h1>Welcome to Learning!</h1>
      </ScrollReveal>
      
      <WordByWordReveal>
        This text appears word by word
      </WordByWordReveal>
      
      <AnimatedButton 
        variant="primary"
        animation="invert"
        onClick={() => console.log('Clicked!')}
      >
        Start Learning
      </AnimatedButton>
    </div>
  )
}
```

## Component Categories

### 1. Page Transitions

```tsx
import { PageTransition, RouteTransition } from '@/components/animations'

// Basic page transition
<PageTransition transitionType="fade" duration={0.3}>
  <YourPageContent />
</PageTransition>

// Route-specific transitions
<RouteTransition>
  <YourApp />
</RouteTransition>
```

### 2. Scroll Animations

```tsx
import { ScrollReveal, StaggeredReveal } from '@/components/animations'

// Individual element reveal
<ScrollReveal direction="up" delay={200}>
  <Card>Content here</Card>
</ScrollReveal>

// Staggered list animation
<StaggeredReveal staggerDelay={0.1}>
  {items.map(item => <ListItem key={item.id} {...item} />)}
</StaggeredReveal>
```

### 3. Text Animations

```tsx
import { 
  WordByWordReveal, 
  LetterByLetterReveal,
  NumberCounter,
  TypewriterText 
} from '@/components/animations'

// Word by word reveal
<WordByWordReveal delay={500}>
  Your educational content here
</WordByWordReveal>

// Typewriter effect
<TypewriterText 
  text="Welcome to Srećno Učenje!"
  speed={50}
  cursor={true}
/>

// Animated counter
<NumberCounter 
  from={0} 
  to={95} 
  suffix="% complete"
  duration={2}
/>
```

### 4. Interactive Elements

```tsx
import { AnimatedButton, AnimatedCard } from '@/components/animations'

// Animated button with ripple effect
<AnimatedButton 
  variant="primary"
  animation="invert"
  onClick={handleClick}
>
  Submit Answer
</AnimatedButton>

// Card with hover effects
<AnimatedCard 
  variant="lift"
  onClick={handleCardClick}
>
  <CardContent />
</AnimatedCard>
```

### 5. Educational Animations

```tsx
import { 
  QuizQuestion, 
  Celebration, 
  AnimatedProgress 
} from '@/components/animations'

// Quiz with feedback
<QuizQuestion
  isCorrect={userAnswer === correctAnswer}
  showFeedback={showResult}
  onFeedbackComplete={() => setShowResult(false)}
>
  <QuizContent />
</QuizQuestion>

// Success celebration
<Celebration 
  trigger={completed}
  confetti={true}
  onComplete={() => setCompleted(false)}
>
  <SuccessMessage />
</Celebration>

// Progress bar
<AnimatedProgress 
  progress={75} 
  showPercentage={true}
  color="#3b82f6"
/>
```

### 6. Background Effects

```tsx
import { 
  FloatingShapes, 
  WavePattern, 
  ParticleSystem 
} from '@/components/animations'

// Educational floating shapes
<FloatingShapes 
  theme="educational"
  count={8}
  className="opacity-30"
/>

// Wave pattern
<WavePattern 
  position="bottom"
  color="#3b82f6"
  amplitude={20}
/>

// Particle system
<ParticleSystem 
  particleCount={30}
  particleColor="#3b82f6"
  speed={1}
/>
```

## Interactive Hooks

### Touch and Hover Effects

```tsx
import { 
  useTiltEffect, 
  useRippleEffect, 
  useTouchFeedback 
} from '@/hooks/useInteractiveAnimations'

function InteractiveCard() {
  const tiltRef = useTiltEffect({ maxTilt: 15, glare: true })
  const rippleRef = useRippleEffect()
  
  return (
    <div ref={tiltRef} className="card">
      <button ref={rippleRef}>
        Click me for ripple effect
      </button>
    </div>
  )
}
```

### Mobile Gestures

```tsx
import { 
  useSwipeGesture,
  usePullToRefresh,
  useLongPress 
} from '@/hooks/useMobileGestures'

function MobileComponent() {
  const swipeRef = useSwipeGesture((result) => {
    console.log('Swiped:', result.direction)
  })
  
  const { ref: refreshRef, isRefreshing } = usePullToRefresh({
    onRefresh: async () => {
      await fetchNewData()
    }
  })
  
  const longPressRef = useLongPress(() => {
    showContextMenu()
  }, { delay: 500 })
  
  return (
    <div ref={refreshRef}>
      <div ref={swipeRef}>Swipe me</div>
      <button ref={longPressRef}>Long press me</button>
    </div>
  )
}
```

## CSS Utilities

The system includes ready-to-use CSS classes:

### Animation Classes
```css
.animate-pulse          /* Pulsing animation */
.animate-bounce         /* Bounce effect */
.animate-shimmer        /* Loading shimmer */
.animate-float          /* Gentle floating */
.animate-glow           /* Glowing effect */
```

### Educational Classes
```css
.animate-progress       /* Progress bar fill */
.animate-celebration    /* Success celebration */
.animate-achievement    /* Achievement unlock */
.animate-quiz-correct   /* Correct answer feedback */
.animate-quiz-incorrect /* Wrong answer feedback */
```

### Hover Effects
```css
.hover-lift             /* Lift on hover */
.hover-scale            /* Scale on hover */
.card-interactive       /* Interactive card */
```

### Micro-interactions
```css
.btn                    /* Animated button */
.link-animated          /* Animated link */
.checkbox-animated      /* Animated checkbox */
.radio-animated         /* Animated radio */
.switch-toggle          /* Toggle switch */
```

## Performance Guidelines

### GPU Acceleration
- Use `transform` and `opacity` for animations
- Avoid animating `width`, `height`, `top`, `left`
- Add `will-change: transform` for complex animations

### Mobile Optimization
```tsx
// Animations automatically adapt to mobile
const duration = isMobile() ? 200 : 500
const complexity = isMobile() ? 'simple' : 'complex'
```

### Reduced Motion
All animations respect user preferences:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01s !important;
    transition-duration: 0.01s !important;
  }
}
```

## Best Practices

### 1. Educational Context
- Use animations to reinforce learning concepts
- Provide visual feedback for user actions
- Keep decorative animations subtle
- Focus on content readability

### 2. Performance
- Limit concurrent animations
- Use `transform` and `opacity` only
- Implement lazy loading for heavy animations
- Monitor frame rates in development

### 3. Accessibility
- Always test with screen readers
- Provide reduced motion alternatives
- Ensure keyboard navigation works
- Use semantic HTML with animations

### 4. Mobile Experience
- Touch-friendly interaction areas (minimum 44px)
- Gesture support for navigation
- Battery-conscious animation choices
- Network-aware loading states

## Browser Support

- **Modern browsers**: Full feature support
- **Safari iOS**: Optimized touch interactions
- **Chrome Android**: GPU acceleration enabled
- **IE11**: Graceful degradation (no animations)

## Examples

Check out `components/examples/AnimationShowcase.tsx` for a comprehensive demonstration of all animation features.

## Contributing

When adding new animations:
1. Follow performance guidelines
2. Add accessibility features
3. Test on mobile devices
4. Include educational context
5. Document usage examples
6. Respect reduced motion preferences

---

Built with ❤️ for Srećno Učenje educational platform.