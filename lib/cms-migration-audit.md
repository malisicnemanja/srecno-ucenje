# CMS MIGRATION AUDIT - SREĆNO UČENJE

## OVERVIEW
This document identifies all hardcoded content that needs to be migrated to CMS for proper content management.

## STATIC CONTENT INVENTORY

### 1. HOME PAGE (/app/page.tsx)

#### Hero Section - NEEDS CMS MIGRATION ❌
```typescript
// Currently hardcoded fallback data:
const fallbackData = {
  hero: {
    title: "Otvori vrata svojoj učionici iz snova",
    subtitle: "Postanite deo mreže koja je već inspirisala 20.000+ dece da uče srcem kroz metodologiju Srećnog učenja",
    buttons: [
      { text: "Zakaži 30-min poziv", link: "/kontakt", variant: "primary" },
      { text: "Preuzmi info-paket", link: "/kako-se-pridruziti", variant: "outline" }
    ]
  }
}
```

**CMS Fields Needed:**
- `hero.title` (Text)
- `hero.subtitle` (Text) 
- `hero.buttons` (Array of Button objects)
  - `text` (Text)
  - `link` (URL)
  - `variant` (Select: primary, secondary, accent, outline)

#### Features Grid - NEEDS CMS MIGRATION ❌
```typescript
features: [
  { icon: "✓", title: "Testiran model", description: "20.000+ dece u 10 zemalja" },
  { icon: "partnership", title: "Kompletna podrška", description: "Obuke, mentorstvo, materijali" },
  { icon: "🌱", title: "Podsticajna sredina", description: "Prostor koji razvija vrline" },
  { icon: "trending", title: "Dokazana uspešnost", description: "Merljivi rezultati" }
]
```

**CMS Fields Needed:**
- `features` (Array of Feature objects)
  - `icon` (Text or Icon picker)
  - `title` (Text)
  - `description` (Text)

### 2. STICKY HEADER (/components/common/StickyHeader.tsx)

#### Navigation Menu - PARTIALLY CMS READY ✅/❌
```typescript
// Has CMS integration BUT fallback data is hardcoded:
const navigation: NavItem[] = navigationData?.mainMenu?.map(...) || [
  { 
    name: 'Metodologija', 
    href: '/metodologija',
    dropdown: [
      { name: 'Naša Metodologija', href: '/metodologija' },
      { name: 'Knjige', href: '/knjige' },
      { name: 'O autorki', href: '/o-autorki' }
    ]
  },
  // ... more hardcoded menu items
]
```

**CMS Fields Needed (Already Structured):**
- `mainMenu` (Array of Menu Items) ✅
- `ctaButton` (Button object) ✅

**Issues:**
- Fallback navigation is hardcoded ❌
- Logo text is hardcoded: "Centar za brzo čitanje i mentalnu aritmetiku" ❌

#### Site Settings - PARTIALLY CMS READY ✅/❌
```typescript
// Logo and site name from CMS ✅
<span className="text-2xl lg:text-3xl font-bold">
  {siteSettings?.siteName || 'Srećno učenje'}
</span>
<span className="text-xs lg:text-sm text-gray-500 font-medium">
  Centar za brzo čitanje i mentalnu aritmetiku {/* HARDCODED ❌ */}
</span>
```

**CMS Fields Needed:**
- `siteSettings.tagline` (Text) - for subtitle under logo

### 3. FOOTER (/components/common/Footer.tsx)

#### Footer Columns - PARTIALLY CMS READY ✅/❌
```typescript
// Has CMS structure but hardcoded fallback:
const footerColumns = siteSettings?.navigationSettings?.footer?.columns || [
  {
    title: "O nama",
    colorAccent: "primary",
    links: [
      { label: "Metodologija", link: "/metodologija" },
      { label: "Priče uspeha", link: "/uspeh" },
      // ... more hardcoded links
    ]
  }
]
```

**Issues:**
- Fallback footer data is hardcoded ❌
- Legal links are hardcoded ❌
- Copyright text is hardcoded ❌

#### Contact Information - PARTIALLY CMS READY ✅/❌
```typescript
// Mixed CMS and hardcoded data:
<span>{siteSettings?.email || 'carobnoselo@gmail.com'}</span> {/* Hardcoded fallback ❌ */}
<span>{siteSettings?.phone || '063.394.251'}</span> {/* Hardcoded fallback ❌ */}
<span>{...footer?.contactInfo?.website || 'www.carobnoselo.edu.rs'}</span> {/* Hardcoded fallback ❌ */}
```

#### Copyright - NEEDS CMS MIGRATION ❌
```typescript
<p className="text-gray-400 text-sm">
  © 2024 Srećno učenje. Sva prava zadržana. {/* HARDCODED ❌ */}
</p>
```

### 4. LAYOUT METADATA (/app/layout.tsx)

#### SEO & Meta Data - NEEDS CMS MIGRATION ❌
```typescript
export const metadata: Metadata = {
  title: 'Srećno učenje - Franšiza obrazovne metodologije', // HARDCODED ❌
  description: 'Postanite deo mreže koja je već inspirisala 20.000+ dece da uče srcem', // HARDCODED ❌
  keywords: 'franšiza, obrazovanje, brzo čitanje, mentalna aritmetika, učenje, deca', // HARDCODED ❌
  authors: [{ name: 'Željana Radojičić Lukić' }], // HARDCODED ❌
  // ... more hardcoded SEO data
}
```

**CMS Fields Needed:**
- `seo.title` (Text)
- `seo.description` (Text)
- `seo.keywords` (Text)
- `seo.author` (Text)
- `seo.ogImage` (Image)
- `seo.twitterImage` (Image)

## COMPONENT ANALYSIS

### Design System Issues Found

#### 1. Inconsistent Color Usage
- Header uses `green-50`, `green-600` - should use brand `grass` colors
- Footer uses generic color classes instead of brand colors
- Buttons reference old color system

#### 2. Typography Issues
- Header doesn't use Quicksand font
- Hardcoded text sizes instead of responsive typography scale

#### 3. Mobile-First Issues
- Some components don't follow 320px-first approach
- Touch targets not consistently 44px minimum

## PRIORITY MIGRATION PLAN

### HIGH PRIORITY (Immediate) 🔴

1. **Hero Section Content**
   - Title, subtitle, buttons
   - Impact: First impression on homepage

2. **Site Settings**
   - Site name, tagline, logo
   - Contact information
   - Impact: Consistent branding

3. **SEO Metadata**  
   - Page titles, descriptions
   - Impact: Search engine visibility

### MEDIUM PRIORITY (Next Sprint) 🟡

1. **Navigation Menu**
   - Remove hardcoded fallback navigation
   - Ensure all menu items come from CMS

2. **Footer Content**
   - Column links and titles
   - Legal links
   - Copyright text

3. **Feature Cards**
   - Icons, titles, descriptions
   - Allow content editors to modify

### LOW PRIORITY (Future) 🟢

1. **Component Styling**
   - Update to use brand colors consistently
   - Implement responsive typography scale

2. **Advanced CMS Features**
   - Page builder components
   - Dynamic layouts
   - A/B testing content

## RECOMMENDED CMS STRUCTURE

### Content Types Needed:

#### 1. Site Settings
```typescript
{
  siteName: string,
  tagline: string,
  logo: Image,
  email: string,
  phone: string,
  address: string,
  socialLinks: SocialLink[],
  seo: {
    title: string,
    description: string,
    keywords: string,
    author: string,
    ogImage: Image,
    twitterImage: Image
  }
}
```

#### 2. Homepage
```typescript
{
  hero: {
    title: string,
    subtitle: string,
    buttons: Button[]
  },
  features: Feature[],
  sections: Section[] // For future page builder
}
```

#### 3. Navigation
```typescript
{
  mainMenu: MenuItem[],
  ctaButton: Button,
  footer: {
    columns: FooterColumn[],
    legalLinks: Link[],
    copyright: string
  }
}
```

#### 4. Component Types
```typescript
interface Button {
  text: string,
  link: string,
  variant: 'primary' | 'secondary' | 'accent' | 'outline',
  external?: boolean
}

interface Feature {
  icon: string | IconComponent,
  title: string,
  description: string,
  link?: string
}

interface MenuItem {
  label: string,
  href?: string,
  subItems?: SubMenuItem[]
}
```

## IMPLEMENTATION STEPS

### Phase 1: Core Content Migration
1. Create CMS content types
2. Migrate hero section to CMS
3. Migrate site settings
4. Remove hardcoded fallbacks

### Phase 2: Navigation & Footer
1. Complete navigation CMS integration
2. Migrate footer content
3. Add legal pages to CMS

### Phase 3: SEO & Metadata
1. Create SEO content type
2. Implement dynamic metadata
3. Add Open Graph images

### Phase 4: Brand Color Update
1. Update all components to use brand colors
2. Implement responsive typography
3. Test mobile-first experience

### Phase 5: Advanced Features
1. Page builder components
2. Multi-language support (if needed)
3. A/B testing capabilities

## TESTING CHECKLIST

### Content Management
- [ ] All text content editable in CMS
- [ ] Images uploadable and optimized
- [ ] Navigation menus fully editable
- [ ] SEO metadata customizable

### Design System
- [ ] Brand colors used consistently
- [ ] Typography scales responsive
- [ ] Touch targets minimum 44px
- [ ] Mobile-first approach verified

### Performance
- [ ] No hardcoded fallbacks slowing CMS queries
- [ ] Images optimized for web
- [ ] Fonts loading efficiently

### User Experience
- [ ] Content editors can easily update
- [ ] Preview functionality works
- [ ] Rollback capabilities available
- [ ] No broken links or missing content

---

## CONCLUSION

The Srećno učenje platform has a good foundation with partial CMS integration, but approximately 60% of visible content is still hardcoded. The migration should prioritize user-facing content (hero, navigation, contact info) before moving to backend optimizations.

The new brand color system and mobile-first typography improvements should be implemented alongside the content migration for maximum impact and efficiency.