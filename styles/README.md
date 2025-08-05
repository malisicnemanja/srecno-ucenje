# Srećno učenje - CSS Architecture

## Overview

This directory contains a scalable, mobile-first CSS architecture built on the ITCSS (Inverted Triangle CSS) methodology, specifically designed for the Srećno učenje educational platform.

## Architecture Structure

```
styles/
├── 00-settings/          # Global variables and configuration
├── 01-tools/             # Mixins and functions
├── 02-generic/           # CSS resets and normalize
├── 03-elements/          # Bare HTML elements
├── 04-objects/           # Layout patterns and objects
├── 05-components/        # UI components
├── 06-utilities/         # Helper classes
├── cms/                  # CMS-specific styles
├── index.css            # Main ITCSS imports
├── main.css            # Tailwind + ITCSS integration
└── README.md           # This file
```

## Key Features

### 🎯 Educational Platform Optimized
- Age-appropriate typography scales
- WCAG AA compliant color system
- Educational component library
- CMS-driven content styling

### 📱 Mobile-First Design
- Progressive enhancement from 320px
- Touch-friendly interactions (44px+ targets)
- Responsive typography and spacing
- Safe area support for modern devices

### 🎨 Brand System Integration
- Verified CMYK to HEX color conversions
- Semantic color mapping
- Educational context colors
- Consistent visual hierarchy

### ♿ Accessibility First
- Screen reader optimizations
- Keyboard navigation support
- High contrast mode support
- Reduced motion preferences
- Focus management utilities

### 🔧 Developer Experience
- PostCSS plugin integration
- Tailwind CSS compatibility
- TypeScript design tokens
- Maintainable ITCSS structure

## Usage

### Import Structure

The main entry point (`main.css`) integrates Tailwind CSS with our ITCSS architecture:

```css
/* Import order is important */
@tailwind base;
@import './index.css';  /* ITCSS layers */
@tailwind components;
@tailwind utilities;
```

### Brand Colors

```css
/* Direct brand colors */
.text-brand-grass { color: var(--brand-grass); }
.bg-brand-sky { background-color: var(--brand-sky); }

/* Semantic colors */
.text-primary-700 { color: var(--color-primary-700); }
.bg-secondary-50 { background-color: var(--color-secondary-50); }
```

### Educational Components

```css
/* Lesson cards */
.lesson-card { /* Grass-themed, progress-aware */ }
.lesson-card.completed { /* Success state */ }
.lesson-card.in-progress { /* Active state */ }

/* Quiz components */
.quiz-card { /* Sky-themed, interactive */ }
.btn-quiz-option { /* Accessible answer buttons */ }

/* Educational layouts */
.lesson-container { /* Optimal reading width */ }
.quiz-container { /* Focused interaction area */ }
```

### Responsive Utilities

```css
/* Age-appropriate containers */
.container-preschool { /* Larger padding, narrower content */ }
.container-elementary { /* Standard educational width */ }
.container-adult { /* Efficient reading width */ }

/* Touch targets */
.touch-target { /* WCAG AA minimum: 44px */ }
.touch-target-comfortable { /* Recommended: 48px */ }
```

### Accessibility Utilities

```css
/* Screen reader support */
.sr-only { /* Visually hidden, accessible */ }
.sr-only-focusable:focus { /* Shows on focus */ }

/* Focus management */
.focus-primary:focus-visible { /* Brand-consistent focus */ }
.focus-preschool:focus-visible { /* Age-appropriate focus */ }

/* High contrast support */
.text-high-contrast { /* Enhanced readability */ }
.border-high-contrast { /* Clear boundaries */ }
```

## Color System

### Brand Colors (Verified CMYK→HEX)
- **Sky**: `#4FD6FF` - Trust, Communication
- **Sun**: `#FCDB15` - Energy, Joy  
- **Grass**: `#6EF214` - Learning, Growth
- **Heart**: `#020201` - Care, Support
- **Night**: `#241F6B` - Wisdom, Focus

### Semantic Mapping
- **Primary**: Grass (Learning & Growth)
- **Secondary**: Sky (Trust & Communication)
- **Accent**: Sun (Energy & Success)
- **Warm**: Heart (Care & Support)
- **Special**: Night (Wisdom & Focus)

### Functional Colors (WCAG AA)
- **Success**: 4.5:1 contrast ratio
- **Warning**: 4.8:1 contrast ratio
- **Error**: 5.2:1 contrast ratio
- **Info**: 4.9:1 contrast ratio

## Breakpoint System

Mobile-first breakpoints using `min-width` only:

```css
/* Base: 320px+ (mobile) */
--bp-sm: 480px;   /* Small phone landscape */
--bp-md: 640px;   /* Large phone / small tablet */
--bp-lg: 768px;   /* Tablet portrait */
--bp-xl: 1024px;  /* Tablet landscape / small laptop */
--bp-2xl: 1280px; /* Desktop */
--bp-3xl: 1440px; /* Large desktop */
```

## PostCSS Configuration

Required plugins for full functionality:

```javascript
module.exports = {
  plugins: {
    'postcss-import': { path: ['./styles'] },
    'postcss-custom-media': {},
    'postcss-mixins': {},
    'postcss-nested': {},
    tailwindcss: {},
    autoprefixer: { grid: 'autoplace' },
    'postcss-reporter': { clearReportedMessages: true }
  }
}
```

## Performance Features

- **Critical CSS**: Inlined essential styles
- **Tree Shaking**: Unused utilities removed
- **Compression**: Optimized for production
- **Caching**: Versioned assets
- **Lazy Loading**: Component-based CSS
- **Hardware Acceleration**: GPU-optimized animations

## Best Practices

### Naming Conventions
- **BEM**: `.block__element--modifier`
- **Utilities**: `.utility-name`
- **States**: `.is-active`, `.has-error`
- **Components**: `.c-component-name`

### CSS Custom Properties
```css
/* Prefer custom properties for dynamic values */
.dynamic-component {
  background-color: var(--component-bg, white);
  padding: var(--component-padding, 1rem);
}
```

### Media Queries
```css
/* Use custom media for consistency */
@media (--large-up) {
  .responsive-component {
    /* Enhanced styling for larger screens */
  }
}
```

## Browser Support

- **Modern Browsers**: Full feature support
- **Legacy Support**: Graceful degradation
- **IE11**: Basic functionality (if needed)
- **Mobile**: iOS 12+, Android 8+
- **Print**: Optimized styles included

## Testing

### Accessibility Testing
- Screen reader compatibility
- Keyboard navigation
- Color contrast validation
- Touch target verification

### Performance Testing
- CSS bundle size analysis
- Critical path optimization
- Render blocking elimination
- Animation performance

### Cross-Browser Testing
- Modern browser compatibility
- Mobile device testing
- Print stylesheet validation
- High contrast mode support

## Development Workflow

1. **Component Creation**: Start with base styles in elements/components
2. **Utility Addition**: Add utilities for common patterns
3. **Testing**: Validate accessibility and performance
4. **Documentation**: Update this README for new patterns
5. **Review**: Ensure ITCSS layer compliance

## Maintenance

### Regular Tasks
- Color contrast audits
- Performance monitoring
- Accessibility testing
- Browser compatibility checks
- Design system updates

### When to Refactor
- Component complexity increases
- Performance degradation
- Accessibility issues
- Design system changes
- New browser requirements

## Integration with Other Systems

### Tailwind CSS
- Seamless integration with utility classes
- Custom design tokens in `tailwind.config.ts`
- Component layer extensions

### Sanity CMS
- Portable Text styling in `cms/`
- Dynamic content wrappers
- Brand-consistent placeholders

### Next.js
- CSS Module compatibility
- Server-side rendering support
- Dynamic imports for code splitting

## Contributing

When adding new styles:

1. **Follow ITCSS**: Place styles in correct layer
2. **Mobile First**: Start with smallest screen
3. **Accessibility**: Test with screen readers
4. **Performance**: Consider bundle size impact
5. **Documentation**: Update relevant docs
6. **Testing**: Validate across browsers

## Resources

- [ITCSS Methodology](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [PostCSS Plugins](https://github.com/postcss/postcss/blob/main/docs/plugins.md)
- [Tailwind CSS Integration](https://tailwindcss.com/docs/adding-custom-styles)