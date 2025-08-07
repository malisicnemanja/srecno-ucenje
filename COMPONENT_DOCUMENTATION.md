# Srećno Učenje - Component Documentation

## 🧩 Component Architecture Overview

The Srećno Učenje platform utilizes a comprehensive component system built with **React + TypeScript**, organized into logical feature-based modules. All components follow modern React patterns with hooks, proper TypeScript definitions, and accessibility best practices.

## 📁 Component Organization

```
components/
├── animations/           # Animation components and effects
├── cms/                 # CMS-connected components  
├── common/              # Shared utility components
├── conversion/          # Conversion optimization components
├── features/            # Feature-specific components
│   ├── author/         # Author-related components
│   ├── booking/        # Appointment booking system
│   ├── books/          # Book showcase components
│   ├── blog/           # Blog-related components
│   ├── calculators/    # ROI and investment calculators
│   ├── cms/            # Feature-rich CMS components
│   ├── conversion/     # Advanced conversion elements
│   ├── newsletter/     # Newsletter management
│   └── quiz/           # Interactive quiz system
├── icons/               # SVG icon components
├── illustrations/       # Educational illustrations
├── newsletter/          # Newsletter components
└── ui/                  # Core UI components
```

## 🎨 Animation Components

### Core Animation Components

#### `ScrollTrigger.tsx`
```typescript
interface ScrollTriggerProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  className?: string;
}
```

**Purpose**: Triggers animations when elements enter viewport  
**Features**: Intersection Observer API, customizable thresholds, performance optimized

#### `EducationalAnimations.tsx` 
Educational-specific animation components for learning engagement:
- **BookOpeningAnimation**: Simulates book page turning
- **FloatingLetters**: Animated letter movements for literacy
- **PulseButton**: Attention-drawing button animations

#### `OptimizedAnimatedCounter.tsx`
```typescript
interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  formatValue?: (value: number) => string;
  trigger?: boolean;
}
```

**Performance Features**:
- RequestAnimationFrame optimization
- Lazy loading with viewport detection
- Smooth easing functions

## 🖼️ CMS Integration Components

### Hero & Landing Components

#### `EnhancedHeroSection.tsx`
**Features**:
- Dynamic CMS content loading
- Responsive image optimization
- Interactive elements with analytics tracking
- Brand-compliant styling

#### `HeroSection.tsx` (Legacy)
Simplified hero component for basic landing pages.

### Content Sections

#### `InteractiveClassroomSection.tsx`
Interactive 3D-style classroom visualization with:
- Student illustrations
- Interactive learning elements
- Mobile-optimized touch interactions

#### `StatisticsSection.tsx`
```typescript
interface StatisticItem {
  number: string;
  label: string;
  description?: string;
  icon?: React.ComponentType;
}
```

**Features**:
- Animated counters
- Brand-consistent styling
- Responsive grid layout

### Educational Content Components

#### `TestimonialsSection.tsx`
- Parent and student testimonials
- Star rating systems
- Photo optimization
- Social proof elements

#### `FAQList.tsx` / `HomeFAQsSection.tsx`
- Accessible accordion patterns
- Search functionality
- Category filtering
- SEO-optimized structure

## 🧮 Feature Components

### Quiz System (`features/quiz/`)

#### `QuizComponent.tsx`
Main quiz orchestrator with:
```typescript
interface QuizProps {
  quizType: 'franchise' | 'readiness' | 'educator';
  onComplete: (results: QuizResults) => void;
  trackingEnabled?: boolean;
}
```

#### `QuizQuestion.tsx`
Individual question component with:
- Multiple question types (single choice, multiple choice, slider)
- Progress tracking
- Validation and error handling

#### `QuizResults.tsx`
Results display with:
- Personalized recommendations
- Lead capture integration
- Social sharing capabilities

#### `QuizLeadForm.tsx`
Lead capture with:
- Multi-step form progression
- Validation with Zod
- CRM integration ready

### Calculator System (`features/calculators/`)

#### `ROICalculator.tsx`
Return on Investment calculator with:
```typescript
interface ROICalculatorProps {
  initialValues?: ROIInputs;
  onCalculate: (results: ROIResults) => void;
  showAdvancedOptions?: boolean;
}
```

**Features**:
- Real-time calculations
- Interactive sliders and inputs
- Visual chart representations
- Export to PDF functionality

#### `InvestmentCalculator.tsx`
Franchise investment calculator with:
- Multi-scenario analysis
- Break-even calculations
- Risk assessment integration

#### `SpaceOptimizer.tsx`
Classroom space optimization tool:
- Interactive floor plan
- Student capacity calculations
- Equipment recommendations

### Booking System (`features/booking/`)

#### `CalendarPicker.tsx`
```typescript
interface CalendarPickerProps {
  availableSlots: TimeSlot[];
  onDateSelect: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  blockedDates?: Date[];
}
```

#### `TimePicker.tsx`
Time slot selection with:
- Available time filtering
- Timezone support
- Booking conflict prevention

### Newsletter System (`features/newsletter/`)

#### `NewsletterForm.tsx`
```typescript
interface NewsletterFormProps {
  variant?: 'inline' | 'modal' | 'sidebar';
  source?: string; // tracking source
  onSuccess?: () => void;
}
```

**Features**:
- Double opt-in support
- Segment targeting
- A/B testing ready
- GDPR compliant

## 🎯 UI Components

### Core UI Components (`ui/`)

#### `OptimizedImage.tsx`
```typescript
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
}
```

**Features**:
- Next.js Image optimization
- WebP format support
- Lazy loading
- Responsive breakpoints

#### `CustomSelect.tsx`
Accessible custom select component:
```typescript
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CustomSelectProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
}
```

#### `Dropdown.tsx`
Multi-purpose dropdown with:
- Keyboard navigation
- Screen reader support
- Portal rendering for z-index issues

#### `LoadingCard.tsx`
Skeleton loading component with brand styling:
```typescript
interface LoadingCardProps {
  variant?: 'hero' | 'card' | 'list';
  count?: number;
}
```

### Animation UI Components

#### `AnimatedCounter.tsx`
```typescript
interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}
```

#### `AnimatedHeadline.tsx`
Typewriter effect component for engaging headlines.

## 🎨 Icon & Illustration System

### Icons (`icons/`)

#### `SimpleIcons.tsx`
Core educational icons:
- BookOpen, GraduationCap, Users, Heart
- Award, Star, CheckCircle, etc.
- Consistent sizing and brand colors

#### `ProgramIcon.tsx`
Program-specific educational icons with:
```typescript
interface ProgramIconProps {
  program: 'math' | 'reading' | 'science' | 'art';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}
```

### Illustrations (`illustrations/`)

#### `ChildIllustrations.tsx`
Educational character illustrations:
- Diverse student representations  
- Age-appropriate styling
- Interactive hover states

## 🔧 Common Utility Components

### Error Handling (`common/`)

#### `ErrorBoundary.tsx`
```typescript
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}
```

#### `AsyncErrorBoundary.tsx`
Specialized for async operations with retry functionality.

#### `ErrorProvider.tsx`
Global error state management with context.

### Performance (`common/`)

#### `LazySection.tsx`
```typescript
interface LazySectionProps {
  children: React.ReactNode;
  threshold?: number;
  fallback?: React.ReactNode;
}
```

Lazy loads heavy components when they enter viewport.

#### `PerformanceMonitor.tsx`
Client-side performance tracking:
- Core Web Vitals monitoring
- User interaction tracking
- Performance API integration

### Analytics (`common/`)

#### `AnalyticsProvider.tsx`
Analytics context provider with:
- Google Analytics 4 integration
- Custom event tracking
- Privacy-compliant data collection

#### `ABTestWrapper.tsx`
A/B testing component with:
```typescript
interface ABTestProps {
  testId: string;
  variants: ABTestVariant[];
  children: (variant: string) => React.ReactNode;
}
```

## 🔄 Conversion Components

### Smart Conversion Elements

#### `SmartCTABar.tsx`
Intelligent call-to-action bar with:
- User behavior tracking
- Dynamic content based on page
- Exit-intent detection

#### `ExitIntentPopup.tsx`
```typescript
interface ExitIntentProps {
  offer: OfferContent;
  maxDisplays?: number;
  cooldownPeriod?: number; // in days
}
```

**Features**:
- Mouse movement detection
- Mobile touch behavior handling
- Frequency capping

## 📱 Mobile Optimizations

### Touch-First Components

All components are optimized for mobile with:
- **Minimum 44px touch targets**
- **Swipe gesture support** where applicable
- **iOS Safari optimization** 
- **Android Chrome optimization**

### Bottom Sheet Components

#### `bottom-sheet.css`
Native-feeling mobile interactions:
- Pull-to-dismiss gestures
- Backdrop blur effects
- Safe area handling

## 🧪 Testing Strategy

### Component Testing

Each component includes:
- **Unit tests** with React Testing Library
- **Accessibility tests** with jest-axe
- **Visual regression tests** with Playwright
- **Performance tests** for heavy components

### Example Test Structure

```typescript
describe('QuizComponent', () => {
  it('renders questions correctly', () => {
    // Test implementation
  });

  it('handles user interactions', () => {
    // Test implementation
  });

  it('meets accessibility standards', async () => {
    // Accessibility tests
  });
});
```

## 🚀 Performance Considerations

### Code Splitting

Large components are split using:
```typescript
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

### Bundle Analysis

Key components and their impact:
- **Quiz System**: ~15kB (lazy loaded)
- **Calculator Components**: ~82kB (lazy loaded)
- **CMS Components**: ~5-10kB each (cached)
- **UI Components**: ~1-3kB each (tree-shaken)

### Optimization Techniques

1. **React.memo()** for expensive renders
2. **useMemo()** and **useCallback()** for computations
3. **Virtualization** for large lists
4. **Image optimization** with Next.js Image
5. **CSS-in-JS** avoided for performance

## 🔧 Development Guidelines

### Component Creation Checklist

- [ ] TypeScript interfaces defined
- [ ] Props documentation with JSDoc
- [ ] Accessibility attributes included
- [ ] Mobile-first responsive design
- [ ] Brand color compliance
- [ ] Error boundary handling
- [ ] Loading states implemented
- [ ] Analytics tracking added (if user-facing)
- [ ] Unit tests written
- [ ] Storybook story created (if applicable)

### Naming Conventions

- **Components**: PascalCase (`QuizComponent.tsx`)
- **Hooks**: camelCase with "use" prefix (`useQuizState.tsx`)
- **Utilities**: camelCase (`formatCurrency.ts`)
- **Types**: PascalCase with descriptive suffix (`QuizResults.ts`)

---

**Created**: August 2024  
**Status**: Production Ready  
**Components Count**: 150+ active components  
**Test Coverage**: 85%+  
**Next Review**: September 2024