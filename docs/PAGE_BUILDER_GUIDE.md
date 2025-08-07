# PageBuilder System - Kompletna dokumentacija

PageBuilder je dinamički sistem za renderovanje CMS sekcija koji omogućava kreiranje fleksibilnih stranica kroz modularne komponente sa automatskim color rotation sistemom.

## 🚀 Ključne funkcionalnosti

- ✅ **Dinamičko mapiranje** CMS sekcija na React komponente
- ✅ **Automatski color rotation** kroz sekcije
- ✅ **Lazy loading** za performanse
- ✅ **Error boundaries** za graceful failure handling
- ✅ **Preview mode** podrška za Sanity
- ✅ **TypeScript podrška** sa kompletnim tipovima
- ✅ **Analytics tracking** i performance monitoring
- ✅ **Responsive design** optimizovan za mobile

## 📁 Struktura fajlova

```
/components/features/cms/
├── PageBuilder.tsx           # Glavni builder komponenta
├── SectionRenderer.tsx       # Renderer pojedinačnih sekcija
├── HeroSection.tsx          # Hero sekcija (4 varijante)
├── CardsGridSection.tsx     # Cards grid layout
├── TimelineSection.tsx      # Timeline/stepper komponenta
├── TestimonialsSection.tsx  # Testimonials sekcija
├── FAQSection.tsx           # FAQ accordion/grid
├── CTASection.tsx           # Call-to-action sekcije
├── StatsSection.tsx         # Statistike sa animacijama
├── GallerySection.tsx       # Image gallery sa lightbox
├── ContentSection.tsx       # Rich text content
├── PricingSection.tsx       # Pricing table
└── UnknownSection.tsx       # Fallback komponenta

/lib/sanity/
└── section-mapper.ts        # Mapiranje i utilities

/types/
└── sections.ts              # TypeScript tipovi

/styles/05-components/
└── page-builder.css         # Stilovi za PageBuilder
```

## 🎯 Osnovano korišćenje

### Kreiranje PageBuilder stranice

```tsx
import PageBuilder from '@/components/features/cms/PageBuilder'
import { SanitySection } from '@/types/sections'

const MyPage = ({ sections }: { sections: SanitySection[] }) => {
  return (
    <PageBuilder
      sections={sections}
      pageType="franchise"
      isPreview={false}
    />
  )
}
```

### Dodavanje nove sekcije

1. **Kreiraj tip u `types/sections.ts`:**

```typescript
export interface MyCustomSectionProps extends BaseSectionProps {
  _type: 'myCustomSection'
  customField: string
  customData: any[]
}
```

2. **Dodaj u union tip:**

```typescript
export type SanitySection = 
  | HeroSectionProps
  | CardsGridSectionProps
  // ... ostale sekcije
  | MyCustomSectionProps  // Nova sekcija
```

3. **Kreiraj komponentu:**

```tsx
// /components/features/cms/MyCustomSection.tsx
const MyCustomSection: React.FC<MyCustomSectionProps> = ({
  customField,
  customData,
  backgroundColor = 'sky',
  // ... ostali props
}) => {
  const bgColor = brandColors[backgroundColor]
  const textColor = getContrastColor(backgroundColor)

  return (
    <section style={{ backgroundColor: bgColor.hex }}>
      {/* Tvoj sadržaj */}
    </section>
  )
}

export default MyCustomSection
```

4. **Registruj u `section-mapper.ts`:**

```typescript
const MyCustomSection = lazy(() => import('@/components/features/cms/MyCustomSection'))

const COMPONENT_MAP = {
  // ... postojeće komponente
  myCustomSection: MyCustomSection,
}

export const SUPPORTED_SECTION_TYPES = [
  // ... postojeći tipovi
  'myCustomSection',
] as const
```

## 🎨 Color Rotation sistem

PageBuilder automatski rotira boje kroz sekcije koristeći `color-rotation.ts`:

### Dostupne boje

```typescript
type BrandColor = 'sky' | 'sun' | 'grass' | 'heart' | 'night'
```

- **Sky** (#5DBFDB) - Poverenje, početak, stabilnost
- **Sun** (#F4C950) - Optimizam, energija, rast  
- **Grass** (#91C733) - Priroda, učenje, razvoj
- **Heart** (#E53935) - Strast, ljubav, posvećenost
- **Night** (#1E293B) - Autoritet, sofisticiranost

### Page Types i color schemes

```typescript
export const pageColorSchemes = {
  franchise: ['sky', 'sun', 'heart', 'grass', 'night'],
  education: ['grass', 'sky', 'sun', 'heart', 'night'], 
  about: ['heart', 'grass', 'sky', 'sun', 'night'],
  calculator: ['sun', 'sky', 'grass', 'heart', 'night'],
  location: ['grass', 'heart', 'sky', 'sun', 'night']
}
```

### Korišćenje u komponenti

```tsx
import { brandColors, getContrastColor } from '@/lib/color-rotation'

const MySection = ({ backgroundColor }) => {
  const bgColor = brandColors[backgroundColor]
  const textColor = getContrastColor(backgroundColor)
  
  return (
    <section style={{ 
      backgroundColor: bgColor.hex,
      color: textColor === 'white' ? '#ffffff' : '#1E293B'
    }}>
      {/* Sadržaj */}
    </section>
  )
}
```

## 📝 Podržani tipovi sekcija

### 1. Hero Section

4 layout varijante sa floating elementima i statistikama:

```typescript
interface HeroSectionProps {
  layout: 'split-left' | 'split-right' | 'centered' | 'full-stats'
  title: string
  alternatingWords?: string[]
  buttons?: ButtonProps[]
  visual?: VisualProps
  floatingElements?: FloatingElement[]
  stats?: StatItem[]
}
```

### 2. Cards Grid Section

Fleksibilni grid layout sa različitim card stilovima:

```typescript
interface CardsGridSectionProps {
  cards: CardItem[]
  layout: 'grid-2' | 'grid-3' | 'grid-4' | 'masonry'
  cardStyle: 'elevated' | 'outlined' | 'minimal' | 'gradient'
}
```

### 3. Timeline Section

Timeline/stepper komponenta sa 3 layout varijante:

```typescript
interface TimelineSectionProps {
  steps: TimelineStep[]
  layout: 'vertical' | 'horizontal' | 'alternating'
  showConnectors?: boolean
}
```

### 4. Stats Section

Statistike sa animovanim brojevima i trend indikatorima:

```typescript
interface StatsSectionProps {
  stats: StatItem[]
  layout: 'horizontal' | 'grid' | 'featured'
  showTrends?: boolean
}
```

### 5. FAQ Section

Pitanja sa pretragom i kategorijama:

```typescript
interface FAQSectionProps {
  faqs: FAQItem[]
  layout: 'accordion' | 'grid' | 'tabs'
  searchable?: boolean
  categories?: string[]
}
```

### 6. CTA Section

Call-to-action sa urgency opcijama:

```typescript
interface CTASectionProps {
  layout: 'banner' | 'split' | 'centered' | 'card'
  buttons: ButtonProps[]
  urgency?: UrgencyOptions
}
```

### 7. Gallery Section

Image gallery sa lightbox i filterovanjem:

```typescript
interface GallerySectionProps {
  images: GalleryImage[]
  layout: 'grid' | 'masonry' | 'slider' | 'lightbox'
  filterable?: boolean
  categories?: string[]
}
```

### 8. Content Section

Rich text sa sidebar opcijama:

```typescript
interface ContentSectionProps {
  content: any // Portable Text
  layout: 'single-column' | 'two-column' | 'sidebar-left' | 'sidebar-right'
  sidebar?: SidebarOptions
}
```

### 9. Pricing Section

Pricing table sa toggle opcijama:

```typescript
interface PricingSectionProps {
  plans: PricingPlan[]
  layout: 'cards' | 'table' | 'toggle'
  billingToggle?: boolean
}
```

## 🔧 Advanced Features

### Error Boundaries

Svaka sekcija je wrap-ovana u Error Boundary sa custom fallback-om:

```tsx
<ErrorBoundary
  FallbackComponent={SectionErrorFallback}
  onError={handleSectionError}
  resetKeys={[section._id, section._type]}
>
  <SectionComponent {...section} />
</ErrorBoundary>
```

### Lazy Loading

Sve komponente se učitavaju lazy sa Suspense fallback-om:

```tsx
const HeroSection = lazy(() => import('@/components/features/cms/HeroSection'))

<Suspense fallback={<SectionLoadingFallback />}>
  <HeroSection {...props} />
</Suspense>
```

### Analytics Integration

Automatski tracking za svaku sekciju:

```typescript
const analytics = getSectionAnalytics(section, index)

// Tracking events:
// - section_view
// - section_interact  
// - section_complete
```

### Preview Mode

Razvoj i debug podrška sa analytics panel-om:

```tsx
<PageBuilder 
  sections={sections}
  isPreview={true}  // Omogućava preview mode
/>
```

### Performance Monitoring

```typescript
const performanceHints = getSectionPerformanceHints(section)

// Hints:
// - priority: 'high' | 'normal' | 'low'
// - preload: boolean
// - lazy: boolean  
// - prefetch: boolean
```

## 🎨 Stilizovanje

PageBuilder koristi CSS custom properties i ITCSS arhitekturu:

```css
.section-wrapper {
  --section-primary: var(--color-sky);
  --section-index: 0;
}

.section-wrapper[data-section-color="heart"] {
  --section-primary: var(--color-heart);
}
```

### Responsive Design

Svi layouts su mobile-first:

```css
/* Mobile first */
.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }

/* Tablet */
@media (min-width: 768px) {
  .md:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop */  
@media (min-width: 1024px) {
  .lg:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
}
```

## 📊 Performance najbolje prakse

### 1. Image optimization
```tsx
<img 
  src={image.src}
  alt={image.alt}
  loading="lazy"
  decoding="async"
/>
```

### 2. Code splitting
```tsx
const SectionComponent = lazy(() => 
  import(`@/components/features/cms/${section._type}Section`)
)
```

### 3. Intersection Observer za analytics
```tsx
const observer = new IntersectionObserver(handleSectionView, {
  threshold: 0.1,
  rootMargin: '0px 0px -10% 0px'
})
```

## 🐛 Debugging

### Development mode

Omogućava debug informacije:

```typescript
if (process.env.NODE_ENV === 'development') {
  console.log('Section debug:', getDebugInfo(section, index))
}
```

### Preview analytics panel

Pokazuje real-time informacije o sekcijama:

- Section count i tipovi
- Color rotation pregled  
- Performance metrics
- Error details

## 📱 Mobile optimizacije

- **Touch gestures** za gallery i slider komponente
- **Reduced motion** podrška za accessibility
- **Viewport optimizacije** za različite device veličine
- **Performance budgets** za mobile-first loading

## 🔒 Security najbolje prakse

- **Input sanitization** za user-generated content
- **XSS protection** kroz proper escaping
- **Safe rendering** za dynamic content
- **Content Security Policy** compliance

---

## 🚀 Quick Start primer

```tsx
import PageBuilder from '@/components/features/cms/PageBuilder'
import { mockSections } from '@/components/examples/PageBuilderExample'

export default function MyPage() {
  return (
    <PageBuilder
      sections={mockSections}
      pageType="franchise"
      isPreview={process.env.NODE_ENV === 'development'}
    />
  )
}
```

PageBuilder sistem je spreman za produkciju i potpuno testiran sa više tipova sekcija, color rotation sistemom i performance optimizacijama! 🎉