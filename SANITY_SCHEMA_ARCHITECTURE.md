# Sanity CMS Schema Architecture - Srećno učenje

## Pregled Kreiranih Schema

Kreirana je kompletna Sanity CMS schema struktura za Srećno učenje sajt sa modernim pristupom i fleksibilnom arhitekturom.

## Kreiranje Fajlovi

### Objects (Gradivni Blokovi)

1. **`/sanity/schemas/objects/button.ts`**
   - Univerzalni button component
   - Podržava 5 boja (sky, sun, grass, heart, night)
   - Različite varijante (filled, outline, text, ghost)
   - Link tipovi: internal, external, email, phone, scroll
   - Ikonice i pozicioniranje

2. **`/sanity/schemas/objects/modernHero.ts`**
   - 4 layout varijante (split-left, split-right, centered, full-stats)
   - Alternating text animacije
   - Brush underline opcije
   - Visual opcije (photo, illustration, video, animation)
   - Floating elementi sa animacijama
   - Kompletne background opcije

3. **`/sanity/schemas/objects/pageSection.ts`**
   - Page builder sistem
   - 16 tipova sekcija (hero, cardsGrid, timeline, testimonials, faq, cta, stats, itd.)
   - Fleksibilno konfiguracija za svaki tip
   - Spacing i styling opcije

4. **`/sanity/schemas/objects/franchiseProcess.ts`**
   - Definisanje procesa korak po korak
   - Različiti vizuelni stilovi (timeline, cards, progress)
   - Requirements i deliverables za svaki korak
   - Progress tracking

5. **`/sanity/schemas/objects/modernPricingPlan.ts`**
   - Kompletan pricing sistem
   - Multiple currencies (RSD, EUR, USD)
   - Različiti billing periodi
   - Features sa included/excluded logikom
   - Trial periodi i discounts

6. **`/sanity/schemas/objects/modernTestimonial.ts`**
   - Detaljni testimonial sistem
   - Author informacije sa social proof
   - Kategorije (parent, franchisee, student, itd.)
   - Video testimonials
   - Before/after rezultati

### Documents (Glavni Sadržaj)

1. **`/sanity/schemas/documents/modernPage.ts`**
   - Fleksibilna page builder arhitektura
   - Koristi pageSection objekta
   - SEO optimizacija
   - Navigation integracijska
   - Multiple page tipovi

2. **`/sanity/schemas/documents/modernFranchisePackage.ts`**
   - Kompletan franchise package sistem
   - Pricing sa payment planovima
   - Features kategorisati
   - Requirements po tipovima
   - Training i support informacije
   - Territory managements

3. **`/sanity/schemas/documents/modernFranchiseLocation.ts`**
   - Detaljne informacije o lokacijama
   - Franchisee profili
   - Contact informacije
   - Address sa GPS koordinatama
   - Services i age groups
   - Schedule sa holiday support
   - Gallery i achievements

4. **`/sanity/schemas/documents/modernFranchiseFAQ.ts`**
   - Kategorizovani FAQ sistem
   - Priority nivoi
   - Package-specific FAQs
   - Related documents linking
   - Advanced filtering opcije

5. **`/sanity/schemas/documents/modernSiteSettings.ts`**
   - Globalne site postavke
   - Logo managements (light/dark)
   - Navigation konfiguracija sa mega menu
   - Footer sa social links
   - Contact informacije
   - SEO defaults
   - Third-party integrations

6. **`/sanity/schemas/documents/modernNavigation.ts`**
   - Advanced navigation sistem
   - Mega menu support
   - Submenu sa opisima
   - Badge sistem
   - Visibility controls (desktop/mobile, auth-based)
   - Featured content u mega menu

## Ključne Karakteristike

### 1. Hero Section Varijante
- **Split Left**: Tekst levo, slika desno
- **Split Right**: Slika levo, tekst desno  
- **Centered**: Centriran sadržaj
- **Full Stats**: Sa statistikama

### 2. Page Builder Sekcije
- Hero Section
- Cards Grid (1-4 kolone)
- Timeline
- Testimonials (grid/carousel/masonry)
- FAQ Accordion
- CTA Section
- Stats Section
- Content Block
- Image Gallery
- Video Section
- Contact Form
- Pricing Table
- Team Section
- Features Grid
- Blog Posts
- Newsletter Signup

### 3. Button Sistem
- **Boje**: Sky, Sun, Grass, Heart, Night
- **Varijante**: Filled, Outline, Text, Ghost
- **Veličine**: SM, MD, LG, XL
- **Link Tipovi**: Internal, External, Email, Phone, Scroll

### 4. Franchise Management
- **Package Types**: Starter, Professional, Premium, Enterprise, Custom
- **Process Tracking**: Application, Onboarding, Training, Launch
- **Location Management**: Sa kompletnim informacijama
- **FAQ Kategorije**: 10 različitih kategorija

### 5. SEO Optimizacija
- Meta titles i descriptions
- Social share images
- Structured data support
- Sitemap generacija

## Integracija

Schema su integrisana u glavni `/sanity/schemas/index.ts` fajl sa jasnim kategorizacijom:

- Legacy schemas (za migraciju)
- Modern CMS Architecture (novi sistem)
- Objects (gradivni blokovi)
- Documents (glavni sadržaj)

## Prednosti Nove Arhitekture

1. **Fleksibilnost**: Page builder pristup omogućava kreiranje bilo koje stranice
2. **Skalabilnost**: Modularni pristup olakšava dodavanje novih features
3. **User Experience**: Intuitivni interface za content managere
4. **SEO Friendly**: Built-in SEO optimizacije
5. **Multi-language Ready**: Priprema za internacionalizaciju
6. **Performance**: Optimizovan za brže loading
7. **Maintenance**: Lakše održavanje i updates

## Sledeći Koraci

1. **Migration Strategy**: Postupna migracija sa legacy schemas
2. **Content Training**: Obuka za content managere
3. **Frontend Integration**: Implementacija u Next.js components
4. **Testing**: Komprehensivno testiranje svih features
5. **Documentation**: Detaljno dokumentovanje za developere

Ova arhitektura omogućava kreiranje modernog, fleksibilnog i skalabilnog CMS sistema koji može da podrži sve potrebe Srećno učenje sajta.