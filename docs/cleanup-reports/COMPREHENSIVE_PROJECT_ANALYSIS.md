# KOMPLETNA ANALIZA PROBLEMA U PROJEKTU

**Datum**: 2025-08-10  
**Status**: KRITIČNO - Više ozbiljnih problema identifikovano  
**Prioritet**: VISOK

## 🚨 GLAVNI PROBLEMI IDENTIFIKOVANI

### 1. HOME PAGE NE UČITAVA CMS SADRŽAJ

#### Problem:
- Home page nalazi CMS dokument u Sanity-u ALI mu nedostaju kritični delovi
- `homePage` dokument postoji sa ID-om "homePage" 
- **KRITIČNO**: Nedostaju `differentiators`, `homeFaqs`, `franchiseSteps`, `successStories`

#### Analiza podataka:
```javascript
// Trenutno u Sanity homePage dokumentu:
{
  _id: 'homePage',
  enhancedHero: ✅ POSTOJI
  statistics: ✅ POSTOJI  
  differentiators: ❌ NEDOSTAJE
  homeFaqs: ❌ NEDOSTAJE
  franchiseSteps: ❌ NEDOSTAJE
  successStories: ❌ NEDOSTAJE
}
```

#### Uzrok:
- Incomplete data population u Sanity CMS
- Schema postoji ali podaci nisu uneti

---

### 2. UNKNOWN FIELDS U SANITY STUDIO

#### FAQ Schema - Nepoznata polja:
- `isActive` - koristi se u query-jima ali ne postoji u schema definiciji
- `tags` - koristi se ali nije definisano u schema

#### BlogPost Schema - Nepoznata polja:
- `category` - referenca na blogCategory
- `featured` - boolean za featured posts
- `publishedDate` - alternativa za publishedAt

#### Navigation Schema - Nepoznata polja:
- `items` - trebalo bi biti `mainMenu`

#### SiteSettings Schema - Nepoznata polja:
```javascript
// Ova polja postoje u CMS-u ali nisu u schema:
'_system', 'address', 'email', 'navigationSettings', 
'phone', 'siteDescription', 'socialLinks', 'workingHours'
```

---

### 3. SCHEMA/DATA MISMATCH ANALIZA

#### Postojeći schema types: 41 u CMS-u
#### Definisanih schema: 81 u kodu

**OGROMNA NEUSKLAĐENOST**: 81 definisanih schema, samo 41 se koristi

#### Kritični nedostajući schema:
- `center` - definisan ali nema dokumenata
- `educator` - definisan ali nema dokumenata 
- `modernFranchisePackage` - definisan ali se ne koristi
- `modernNavigation` - definisan ali se ne koristi

---

### 4. ROUTING I LINKOVI - DETALJNI PROBLEMI

#### Problematični linkovi identifikovani:
```javascript
// Iz navigation mock data:
'/metodologija' - ✅ postoji 
'/fransiza-modeli' - ❌ trebalo bi '/franchise-models'
'/kako-se-pridruziti' - ❌ trebalo bi '/how-to-join'  
'/kalkulatori' - ❌ ne postoji ruta
'/kvizovi' - ❌ ne postoji ruta
'/3d-ucionica' - ❌ ne postoji ruta
'/lokacije' - ❌ ne postoji ruta
'/zakazivanje' - ❌ ne postoji ruta
```

#### Route mismatch:
- Next.js app struktura ne odgovara navigation linkovima
- Mock data koristi srpske URL-ove, kod koristi engleske

---

### 5. STATIC/DYNAMIC CONTENT MIX

#### Problem: Hibridna arhitektura
```javascript
// lib/sanity.client.ts
const USE_MOCK = false // ❌ Mock je isključen ali...

// Mock store se i dalje koristi kada nema CMS podataka
// Rezultat: Nepredvidiva kombinacija mock i real data
```

#### Identifikovan pattern:
1. Pokušava se učitavanje iz Sanity CMS
2. Ako nema podataka, pada na mock
3. Ali mock i CMS imaju različite strukture
4. Home page komponenta očekuje određenu strukturu koja ne postoji ni u CMS ni u mock-u

---

### 6. KONKRETNI TEHNIČKI PROBLEMI

#### HomePageProps interface mismatch:
```typescript
// app/page.tsx očekuje:
pageData.differentiators?.items  // ❌ Ne postoji
pageData.franchiseSteps?.steps   // ❌ Ne postoji
pageData.homeFaqs?.faqs         // ❌ Ne postoji

// Ali CMS vraća:
pageData.enhancedHero // ✅ OK
pageData.statistics   // ✅ OK
```

#### HeroSection component mismatch:
```typescript
// Legacy props se koriste:
ctaText, ctaLink, secondaryCtaText, secondaryCtaLink

// Ali CMS vraća:
enhancedHero.buttons[0].text, enhancedHero.buttons[0].link
```

---

## 📊 STATISTIKE PROBLEMA

### Problemi po kategorijama:
- **Schema definicije**: 40+ orphaned schemas
- **Data population**: 60% nepopulisanih CMS dokumenata  
- **Unknown fields**: 15+ nepoznata polja u različitim schemas
- **Broken links**: 8+ nefunkcionalna linka u navigaciji
- **Component mismatches**: 5+ interface neslaganja

### Rizik kategorizacija:
- 🔴 **HIGH RISK**: Home page ne radi potpuno (nedostaju sekcije)
- 🟡 **MEDIUM RISK**: Unknown fields u Sanity Studio
- 🟢 **LOW RISK**: Orphaned schemas (ne utiču na funkcionalnost)

---

## 🔧 PRIORITIZOVANE AKCIJE ZA REŠAVANJE

### KORAK 1: HITNO - Popravi Home Page (30 min)
```bash
# Dodaj nedostajuće podatke u homePage dokument
1. Otvori Sanity Studio
2. Idi na homePage dokument  
3. Popuni: differentiators, franchiseSteps, homeFaqs, successStories
4. Test home page loading
```

### KORAK 2: SREDNJI PRIORITET - Popravi Schema Fields (1h)
```typescript
// Dodaj nedostajuća polja u FAQ schema:
{
  name: 'isActive',
  title: 'Aktivno',
  type: 'boolean',
  initialValue: true
},
{
  name: 'tags',
  title: 'Tagovi', 
  type: 'array',
  of: [{ type: 'string' }]
}

// Slično za sve ostale schemas...
```

### KORAK 3: DUGOROČNO - Schema Consolidation (4-6h)
- Konsoliduj 81 schema u 18 essential schemas
- Koristi već kreiran migration plan
- Počisti orphaned schemas

### KORAK 4: ROUTING FIX (1h)
```javascript
// Ili promeni navigaciju da koristi postojeće rute:
'/metodologija' -> ✅ već postoji
'/franchise-models' -> dodaj ili promeni nav link
'/o-autorki' -> ✅ već postoji

// Ili dodaj nedostajuće rute
```

---

## 🎯 TRENUTNO STANJE vs ŽELJENO STANJE

### TRENUTNO:
- ❌ Home page ne prikazuje complete content  
- ❌ Sanity Studio pokazuje Unknown field warnings
- ❌ 50% navigation linkova ne radi
- ❌ Mixed mock/real data arhitektura
- ❌ 81 schema definisanih, 41 se koristi

### ŽELJENO (nakon fix-ova):
- ✅ Home page potpuno funkcionalna sa CMS podacima
- ✅ Sanity Studio bez warnings
- ✅ Svi navigation linkovi funkcionalni  
- ✅ Čist real data iz CMS-a
- ✅ 18 konsolidovanih schemas

---

## 🚀 AKCIONI PLAN - NEXT STEPS

### FAZA 1: EMERGENCY FIXES (danas, 2h)
1. **Popuni home page data** u Sanity Studio
2. **Dodaj missing fields** u FAQ i ostale schemas
3. **Test home page** loading

### FAZA 2: ARCHITECTURAL CLEANUP (ove nedelje, 1 dan) 
1. Konsoliduj schemas prema planu
2. Cleanup orphaned definitions
3. Update svih query-ja

### FAZA 3: ROUTING & NAVIGATION (sledeća nedelja)
1. Dodaj missing rute ili update navigation
2. Test svih linkova
3. Update sitemap

---

## 📋 VERIFICATION CHECKLIST

Po završetku fix-ova, proverite:

- [ ] Home page prikazuje sve sekcije (hero, stats, differentiators, steps, stories, FAQ)
- [ ] Sanity Studio nema Unknown field warnings  
- [ ] Svi navigation linkovi rade
- [ ] Nema mix mock/real data
- [ ] Schemas count smanjene na ~18
- [ ] Performance poboljšan (manje schemas)
- [ ] All queries return expected data structure

---

**⚠️ KRITIČNE NAPOMENE:**

1. **Home page problem je P0** - utiče na korisničko iskustvo
2. **Unknown fields nisu kritični** ali zbunjuju admina
3. **Schema consolidation je P1** - utiče na maintainability  
4. **Routing fix je P1** - utiče na navigation UX

**Sledeći korak**: Početi sa FAZA 1 - Emergency fixes