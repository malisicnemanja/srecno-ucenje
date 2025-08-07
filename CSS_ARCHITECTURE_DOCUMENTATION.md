# Srećno Učenje - CSS Architecture Documentation

## 🏗️ Architecture Overview

The Srećno Učenje platform utilizes a **hybrid ITCSS + Tailwind CSS architecture** designed for maximum maintainability, performance, and scalability. This approach combines the organizational benefits of ITCSS (Inverted Triangle CSS) with the utility-first approach of Tailwind CSS.

### Architecture Philosophy

- **Mobile-First**: All styles start from 320px viewport and progressively enhance
- **Performance-Focused**: Optimized for educational content delivery
- **Brand-Consistent**: Comprehensive brand color system without gradients
- **Accessible**: WCAG AA compliant throughout
- **Scalable**: Modular approach supporting growth and feature additions

## 📁 File Structure

```
styles/
├── 00-settings/          # Global variables and configuration
│   ├── variables.css     # CSS custom properties
│   ├── breakpoints.css   # Responsive breakpoint definitions
│   ├── colors.css        # Brand color definitions
│   ├── typography.css    # Font scale and typography settings
│   └── spacing.css       # Spacing scale definitions
│
├── 01-tools/             # Mixins and functions
│   ├── mixins.css        # Reusable CSS mixins
│   └── functions.css     # CSS functions and calculations
│
├── 02-generic/           # CSS resets and normalize
│   ├── reset.css         # Custom CSS reset
│   ├── normalize.css     # Browser normalization
│   └── box-sizing.css    # Box model settings
│
├── 03-elements/          # Bare HTML elements
│   ├── page.css          # Body and html styles
│   ├── headings.css      # h1-h6 element styles
│   ├── text.css          # Paragraph and text elements
│   ├── links.css         # Anchor element styles
│   ├── forms.css         # Form element styles
│   ├── buttons.css       # Button element styles
│   └── images.css        # Image element styles
│
├── 04-objects/           # Layout patterns and grids
│   ├── container.css     # Container layouts
│   ├── grid.css          # Grid systems
│   ├── grid-extended.css # Extended grid utilities
│   ├── layout.css        # General layout patterns
│   ├── media.css         # Media object patterns
│   └── list.css          # List layout patterns
│
├── 05-components/        # UI components
│   ├── header.css        # Header component styles
│   ├── navigation.css    # Navigation component styles
│   ├── hero.css          # Hero section styles
│   ├── card.css          # Card component styles
│   ├── buttons.css       # Button component styles
│   ├── forms.css         # Form component styles
│   ├── modal.css         # Modal component styles
│   ├── toast.css         # Toast notification styles
│   ├── skeleton.css      # Loading skeleton styles
│   ├── bottom-sheet.css  # Bottom sheet mobile component
│   ├── form-progress.css # Form progress indicators
│   ├── loader.css        # Loading indicator styles
│   ├── quiz.css          # Quiz component styles
│   ├── lesson.css        # Educational lesson styles
│   ├── footer.css        # Footer component styles
│   └── micro-interactions.css # Subtle interaction effects
│
├── 06-utilities/         # Helper classes
│   ├── display.css       # Display utilities
│   ├── spacing.css       # Spacing utilities
│   ├── spacing-extended.css # Extended spacing utilities
│   ├── typography.css    # Typography utilities
│   ├── headings.css      # Heading utilities
│   ├── colors.css        # Color utilities
│   ├── brand-colors.css  # Brand color utilities
│   ├── layout.css        # Layout utilities
│   ├── accessibility.css # Accessibility helpers
│   └── animations.css    # Animation utilities
│
├── 99-overrides/         # Final overrides
│   ├── link-overrides.css # Link system overrides
│   └── gradient-removal.css # Gradient cleanup
│
├── cms/                  # CMS-specific styles
│   ├── placeholders.css  # CMS placeholder styles
│   ├── content-wrappers.css # Content wrapper styles
│   └── portable-text.css # Portable text styles
│
├── main.css             # Main entry point (Tailwind integration)
├── index.css            # ITCSS structure imports
└── animations.css       # Global animation definitions
```

## 🎨 Brand Color System

### Core Brand Colors

The platform uses a comprehensive 5-color brand system:

```css
:root {
  /* === CORE BRAND COLORS === */
  --brand-sky: #5DBFDB;        /* Sky: Trust, Communication, Openness */
  --brand-sun: #FDD835;        /* Sun: Energy, Joy, Success */
  --brand-grass: #7CB342;      /* Grass: Learning, Growth, Life */
  --brand-heart: #E53935;      /* Heart: Care, Support, Passion */
  --brand-night: #3E4C59;      /* Night: Wisdom, Focus, Calm */
}
```

### Semantic Color Mapping

```css
/* Primary: Grass (Education & Growth) */
--color-primary: var(--brand-grass);
--color-primary-50: #F3F8F1;
--color-primary-100: #E7F0DD;
/* ... full scale from 50-900 */

/* Secondary: Sky (Trust & Communication) */
--color-secondary: var(--brand-sky);
/* ... full scale */

/* Accent: Sun (Energy & Success) */
--color-accent: var(--brand-sun);
/* ... full scale */

/* Warm: Heart (Care & Support) */
--color-warm: var(--brand-heart);
/* ... full scale */

/* Night: Wisdom & Focus */
--color-night: var(--brand-night);
/* ... full scale */
```

### Brand Compliance

- **No Gradients**: All brand colors use solid colors only
- **WCAG AA Compliant**: All color combinations meet accessibility standards
- **High Contrast Support**: Enhanced contrast for accessibility needs
- **Color Blind Friendly**: Visual indicators supplement color information

## 📱 Mobile-First Responsive System

### Breakpoint Strategy

```css
/* Mobile First Approach */
/* Base: 320px+ (default, no media query) */
/* Small: 480px+ (enhanced mobile) */
/* Medium: 640px+ (tablets portrait) */
/* Large: 768px+ (tablets landscape) */
/* XL: 1024px+ (desktop) */
/* 2XL: 1280px+ (large desktop) */
```

### Typography Scale

**Mobile-First Typography (320px+):**
- h1: 24px (1.5rem)
- h2: 20px (1.25rem)
- h3: 18px (1.125rem)
- h4: 16px (1rem)
- h5: 14px (0.875rem)

**Progressive Enhancement:**
- Each breakpoint increases typography sizes
- Maintains readability across all devices
- Optimized for educational content

### Touch Targets

- **Minimum 44px × 44px** on all devices
- **48px × 48px** on small mobile screens
- Enhanced focus states for keyboard navigation

## 🎭 Animation System

### Performance-Optimized Animations

```css
/* Subtle Educational Animations */
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  33% { transform: translateY(-10px) rotate(-1deg); }
  66% { transform: translateY(-5px) rotate(1deg); }
}

@keyframes textReveal {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Animation Classes

- `.float-animation` - Gentle floating effect for illustrations
- `.text-reveal` - Progressive text appearance
- `.hover-lift` - Interactive card hover effects
- `.subtle-pulse` - Attention-drawing pulse effects

### Performance Considerations

- **Hardware Acceleration**: Uses `transform` and `opacity` properties
- **Reduced Motion Support**: Respects `prefers-reduced-motion`
- **Mobile Optimized**: Shorter durations on mobile devices

## 🧩 Component System

### Button System

**Brand Button Variants:**
- `.btn-primary` (Grass) - Primary actions
- `.btn-secondary` (Sky) - Secondary actions  
- `.btn-accent` (Sun) - Accent actions
- `.btn-warm` (Heart) - Warm actions
- `.btn-night` (Night) - Professional actions

**Outline Variants:**
- `.btn-outline-primary`
- `.btn-outline-secondary`
- `.btn-outline-accent`
- `.btn-outline-warm`

### Form System

**Modern Input Components:**
- `.input-modern` - Standard input styling
- `.input-floating` - Floating label inputs
- `.select-modern` - Custom select dropdowns
- `.checkbox-modern` - Custom checkboxes
- `.radio-modern` - Custom radio buttons

### Card System

```css
.card-modern {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--space-lg);
  transition: all var(--transition-base);
  border: 1px solid var(--color-gray-100);
}
```

## 🎯 Performance Metrics

### Build Output Analysis

```
Route (app)                    Size     First Load JS
┌ ○ /                         6.27 kB   654 kB
├ ○ /faq                      7.58 kB   665 kB
├ ○ /metodologija             5.01 kB   665 kB
├ ○ /kvizovi                  15.3 kB   1.15 MB
└ ○ /kalkulatori              82.7 kB   1.22 MB
```

### CSS Architecture Benefits

- **63 CSS files** organized in ITCSS structure
- **Modular loading** - only necessary styles loaded
- **Optimized bundling** with Tailwind purging
- **Zero unused CSS** in production build

### Performance Optimizations

1. **Critical CSS Inlined** - Above-the-fold content styled immediately
2. **Progressive Loading** - Non-critical CSS loaded asynchronously
3. **Component Chunking** - Large components split into separate chunks
4. **Service Worker Caching** - CSS files cached for offline use

## 🔧 Tailwind Integration

### Hybrid Approach Benefits

1. **Best of Both Worlds**: ITCSS organization + Tailwind utilities
2. **Custom Components**: Complex components use ITCSS, simple styling uses Tailwind
3. **Brand Consistency**: Custom properties ensure brand compliance
4. **Developer Experience**: IntelliSense support for both approaches

### Integration Points

```css
@layer components {
  /* Ensure our custom buttons work with Tailwind */
  .btn {
    @apply inline-flex items-center justify-center;
  }
  
  /* Container integration */
  .container-modern {
    @apply w-full mx-auto px-4;
  }
}
```

## 🎓 Educational Platform Specific Features

### CMS Integration

```css
.cms-placeholder {
  @apply rounded-xl p-6 text-center relative overflow-hidden;
  background: var(--color-primary-50);
  border: 2px dashed var(--color-gray-300);
  min-height: 120px;
}
```

### Learning Components

- **Lesson Cards**: Progress indicators and status styling
- **Quiz Components**: Interactive question and result styling
- **Progress Indicators**: Visual learning progress representation

### Accessibility Features

- **Focus Management**: Keyboard navigation optimized
- **Screen Reader Support**: Proper semantic markup
- **High Contrast**: Alternative color schemes available
- **Touch Friendly**: All interactive elements meet touch target requirements

## 🔮 Future Scalability

### Architecture Benefits for Growth

1. **Modular Structure**: Easy to add new components without conflicts
2. **Brand System**: Consistent styling across new features
3. **Performance**: Optimized loading for additional content
4. **Maintainability**: Clear file organization for team development

### Recommended Practices

1. **Follow ITCSS Layers**: Maintain proper CSS cascade order
2. **Use Brand Colors**: Always use CSS custom properties for colors
3. **Mobile First**: Start with mobile styles, enhance for larger screens
4. **Test Performance**: Monitor bundle sizes and loading times
5. **Accessibility First**: Ensure all new components meet WCAG standards

---

**Created**: August 2024  
**Status**: Production Ready  
**Maintenance**: Active Development  
**Next Review**: September 2024