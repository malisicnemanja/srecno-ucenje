# SREĆNO UČENJE - DESIGN SYSTEM GUIDE

## BRAND IDENTITY

### Mission
Srećno učenje je obrazovna platforma koja inspiriše decu da uče srcem kroz metodologiju koja je već inspirisala 20.000+ dece u 10 zemalja.

### Target Audiences
- **Teachers**: Professional but approachable design
- **Parents**: Trust, safety, and credibility  
- **Children**: Fun elements without being childish

## BRAND COLORS (CONVERTED FROM CMYK)

### Primary Brand Colors
```css
--color-sky: #4FD6FF     /* C069 M016 Y000 K000 - Trust, clarity */
--color-sun: #FCDB15     /* C002 M017 Y097 K000 - Joy, energy */
--color-grass: #6EF214   /* C057 M005 Y092 K000 - Growth, learning */
--color-heart: #020201   /* C002 M097 Y094 K100 - Strength, focus */
--color-night: #241F6B   /* C087 M085 Y025 K012 - Wisdom, depth */
```

### Color Psychology
- **Sky (Cyan)**: Communication, clarity, trust
- **Sun (Yellow)**: Happiness, creativity, optimism  
- **Grass (Green)**: Growth, nature, harmony
- **Heart (Dark)**: Seriousness, focus, depth
- **Night (Purple-blue)**: Wisdom, mystery, imagination

### Usage Guidelines
- **Primary Actions**: Use Grass (#6EF214)
- **Secondary Actions**: Use Sky (#4FD6FF)  
- **Accent/Highlights**: Use Sun (#FCDB15)
- **Text/Contrast**: Use Heart (#020201) and Night (#241F6B)
- **Backgrounds**: Use 50-100 tints of brand colors

## TYPOGRAPHY SYSTEM

### Font Family
```css
font-family: 'Quicksand', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

**Quicksand** provides:
- Educational warmth and approachability
- Excellent readability for children and adults
- Friendly yet professional character

### Mobile-First Type Scale

#### Mobile (320px+)
- **Display**: 32px / 1.2 line-height
- **H1**: 28px / 1.25 line-height  
- **H2**: 24px / 1.3 line-height
- **H3**: 20px / 1.35 line-height
- **Body**: 16px / 1.6 line-height
- **Small**: 14px / 1.5 line-height
- **Tiny**: 12px / 1.4 line-height

#### Tablet (768px+)
- **Display**: 48px / 1.2 line-height
- **H1**: 40px / 1.25 line-height
- **H2**: 32px / 1.3 line-height
- **H3**: 24px / 1.35 line-height
- **Body**: 18px / 1.6 line-height
- **Small**: 16px / 1.5 line-height
- **Tiny**: 14px / 1.4 line-height

#### Desktop (1024px+)
- **Display**: 64px / 1.2 line-height
- **H1**: 48px / 1.25 line-height
- **H2**: 40px / 1.3 line-height
- **H3**: 32px / 1.35 line-height
- **Body**: 20px / 1.6 line-height
- **Small**: 18px / 1.5 line-height
- **Tiny**: 16px / 1.4 line-height

## COMPONENT SYSTEM

### Buttons

#### Primary Button (Grass)
```css
.btn-primary {
  background-color: #6EF214; /* Grass */
  color: white;
  min-height: 44px; /* Touch target */
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
}
.btn-primary:hover {
  background-color: #5DC40F; /* Darker grass */
}
```

#### Secondary Button (Sky)
```css
.btn-secondary {
  background-color: #4FD6FF; /* Sky */
  color: white;
  min-height: 44px;
}
```

#### Accent Button (Sun)
```css
.btn-accent {
  background-color: #FCDB15; /* Sun */
  color: #241F6B; /* Night text */
  min-height: 44px;
}
```

#### Outline Button
```css
.btn-outline-primary {
  background: transparent;
  border: 2px solid #6EF214; /* Grass */
  color: #6EF214;
  min-height: 44px;
}
```

### Cards
```css
.card-modern {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.25s ease;
}
.card-modern:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

### Form Elements
```css
.input-modern {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #E5E7EB;
  border-radius: 0.5rem;
  font-family: 'Quicksand', sans-serif;
  min-height: 44px; /* Touch target */
}
.input-modern:focus {
  border-color: #6EF214; /* Grass */
  box-shadow: 0 0 0 3px rgba(110, 242, 20, 0.1);
}
```

## MOBILE-FIRST BREAKPOINTS

### Strategy: Min-Width Only
```css
/* Mobile first (320px+) - Base styles */
.container { padding: 0 1rem; }

/* Small mobile (480px+) */
@media (min-width: 480px) {
  .container { padding: 0 1.5rem; }
}

/* Tablet (640px+) */
@media (min-width: 640px) {
  .container { max-width: 640px; padding: 0 2rem; }
}

/* Desktop (768px+) */
@media (min-width: 768px) {
  .container { max-width: 768px; }
}

/* Large desktop (1024px+) */
@media (min-width: 1024px) {
  .container { max-width: 1024px; }
}

/* Extra large (1280px+) */
@media (min-width: 1280px) {
  .container { max-width: 1280px; padding: 0 3rem; }
}
```

## SPACING SYSTEM

### Touch-Friendly Spacing
```css
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
--space-2xl: 3rem;     /* 48px */
--space-3xl: 4rem;     /* 64px */
--space-touch: 2.75rem; /* 44px - minimum touch target */
```

## CMS INTEGRATION GUIDELINES

### Content Placeholders
All hardcoded content should be replaced with CMS fields:

#### Current Static Content to Migrate:
1. **Hero Section**: Title, subtitle, button text
2. **Navigation**: Menu items, dropdown links
3. **Footer**: Company info, contact details, links
4. **Feature Cards**: Icons, titles, descriptions
5. **Contact Information**: Email, phone, address
6. **Social Links**: All social media links
7. **Legal Pages**: Privacy policy, terms of service

#### CMS Placeholder Component:
```css
.cms-placeholder {
  background: #F3F4F6;
  border: 2px dashed #D1D5DB;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
  color: #6B7280;
}
.cms-placeholder::before {
  content: "📝 Sadržaj se učitava iz CMS-a...";
  font-size: 0.875rem;
}
```

## ACCESSIBILITY GUIDELINES

### Touch Targets
- **Minimum size**: 44px x 44px
- **Spacing**: 8px between touch targets
- **Visual feedback**: All interactive elements have hover/focus states

### Color Contrast
- **Text on white**: Use Heart (#020201) or Night (#241F6B)
- **Text on colored backgrounds**: Test contrast ratios
- **Links**: Underlined or clearly distinguished

### Focus States
```css
*:focus-visible {
  outline: 2px solid #6EF214; /* Grass */
  outline-offset: 2px;
  border-radius: 0.25rem;
}
```

## ANIMATION SYSTEM

### Micro-Interactions
```css
/* Subtle hover lift */
.hover-lift {
  transition: transform 0.25s ease;
}
.hover-lift:hover {
  transform: translateY(-2px);
}

/* Button press feedback */
.btn-modern:active {
  transform: translateY(0);
}

/* Card entrance animation */
.animate-slide-up {
  animation: slideUp 0.5s ease-out;
}
```

### Performance Considerations
- Use `transform` and `opacity` for animations
- Avoid animating `width`, `height`, `margin`, `padding`
- Provide `prefers-reduced-motion` alternatives

## VISUAL HIERARCHY

### Information Architecture
1. **Primary**: Hero title, main CTAs
2. **Secondary**: Section headers, key features  
3. **Tertiary**: Body text, descriptions
4. **Supporting**: Captions, metadata

### Content Scanning Pattern
- **F-Pattern**: For text-heavy pages
- **Z-Pattern**: For landing pages
- **Grid Pattern**: For feature/service listings

## BRAND VOICE & TONE

### Voice Characteristics
- **Warm**: Approachable and caring, like a dedicated teacher
- **Professional**: Credible and trustworthy for parents
- **Encouraging**: Motivational and supportive for children
- **Clear**: Simple language, avoiding jargon

### Tone Adaptations
- **Teachers**: Respectful, collaborative, professional
- **Parents**: Reassuring, informative, transparent
- **Children**: Enthusiastic, encouraging, patient

## IMPLEMENTATION CHECKLIST

### Brand Colors ✅
- [x] CMYK to RGB conversion completed
- [x] Color scales generated (50-900)
- [x] CSS custom properties defined
- [x] Tailwind config updated

### Typography ✅
- [x] Quicksand font imported
- [x] Mobile-first scale defined
- [x] Responsive breakpoints set
- [x] Line height optimized

### Components 🔄
- [x] Button variants updated
- [x] Form elements styled
- [x] Card components defined
- [ ] Navigation components need brand color update
- [ ] Footer components need brand color update

### Mobile-First 🔄
- [x] 320px viewport optimization
- [x] Touch target requirements (44px)
- [x] Progressive enhancement strategy
- [ ] Test on actual devices

### CMS Integration 🔄
- [x] Placeholder states designed
- [ ] Static content audit needed
- [ ] CMS field mapping required
- [ ] Content migration plan needed

### Accessibility 🔄
- [x] Focus states defined
- [x] Color contrast guidelines
- [x] Touch target requirements
- [ ] Screen reader testing needed
- [ ] Keyboard navigation testing needed

## NEXT STEPS

1. **Audit existing components** for hardcoded content
2. **Update navigation** to use brand colors
3. **Test mobile experience** on real devices
4. **Create CMS content models** based on current static content
5. **Implement brand color utilities** throughout the codebase
6. **Performance audit** of new typography and colors
7. **Accessibility testing** with screen readers
8. **User testing** with target audiences (teachers, parents, children)

---

*This design system guide should be considered a living document, evolving with the platform's needs and user feedback.*