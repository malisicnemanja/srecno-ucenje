# Migracija na Produkcijski Sanity CMS

## Status Implementacije ✅

Sav statički sadržaj je uspešno migriran u CMS strukture. Projekat trenutno koristi **mock Sanity store** koji simulira pravi CMS.

## Šta je Urađeno

### 1. CMS Struktura
- ✅ Kreirane sve Sanity sheme (documents i objects)
- ✅ Implementiran mock store sa svim podacima sa sajta
- ✅ Kreiran Sanity client sa mock funkcionalnostima

### 2. CMS Komponente
- ✅ `HeroSection` - za hero sekcije
- ✅ `StatisticsSection` - za statistike
- ✅ `ProgramsList` - za programe
- ✅ `FAQList` - za FAQ
- ✅ `SuccessStoriesSection` - za priče o uspehu
- ✅ `TestimonialsSection` - za iskustva
- ✅ `PricingSection` - za cene
- ✅ `BlogPostCard` - za blog članke
- ✅ `ContactInfo` - za kontakt informacije

### 3. Integrisane Stranice
- ✅ Početna (`/`)
- ✅ FAQ (`/faq`)
- ✅ Franšiza modeli (`/fransiza-modeli`)
- ✅ Uspeh (`/uspeh`)
- ✅ Blog (`/blog`)
- ✅ Kontakt (`/kontakt`)

## Prelazak na Pravi Sanity

### 1. Kreiranje Sanity Projekta

```bash
# Instalirajte Sanity CLI
npm install -g @sanity/cli

# Kreirajte novi projekat
sanity init

# Izaberite:
# - Create new project
# - Project name: srecno-ucenje
# - Dataset: production
# - Template: Clean project
```

### 2. Kopirajte Sheme

Kopirajte celokupan `sanity/schemas` folder u novi Sanity projekat.

### 3. Deploy Sanity Studio

```bash
# U Sanity projektu
sanity deploy

# Izaberite URL, npr: srecno-ucenje
# Studio će biti dostupan na: https://srecno-ucenje.sanity.studio
```

### 4. Ažurirajte Kredencijale

U `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-real-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-read-token
```

### 5. Prebacite na Pravi Client

U `lib/sanity.client.ts`, promenite:
```typescript
// Promenite ovo
const USE_MOCK = true

// Na ovo
const USE_MOCK = false
```

### 6. Unesite Podatke u Sanity Studio

1. Pristupite vašem Sanity Studio
2. Počnite sa **Site Settings**
3. Zatim unesite redom:
   - Programe
   - FAQ pitanja
   - Blog kategorije i autore
   - Blog članke
   - Priče o uspehu
   - Testimonijale
   - Članove tima

## Mock Podaci za Unos

Svi podaci su dostupni u `lib/sanity-mock-store.ts`. Jednostavno kopirajte vrednosti u Sanity Studio.

### Prioritet Unosa:
1. **Site Settings** - kontakt info, radno vreme
2. **Programi** - 3 osnovna programa
3. **FAQ** - 6 najčešćih pitanja
4. **Blog kategorije** - 6 kategorija
5. **Autori** - 3 autora
6. **Blog postovi** - bar 3-6 članaka
7. **Priče o uspehu** - 3 priče
8. **Testimonijali** - 2-3 iskustva

## Verifikacija

Nakon migracije, proverite:
- [ ] Homepage prikazuje podatke iz CMS-a
- [ ] FAQ stranica učitava pitanja
- [ ] Blog lista prikazuje članke
- [ ] Kontakt info se prikazuje iz CMS-a
- [ ] Slike se pravilno učitavaju

## Pomoć

Ako naiđete na probleme:
1. Proverite da li su svi environment variable pravilno podešeni
2. Proverite CORS postavke u Sanity dashboardu
3. Testirajte queries u Sanity Vision pluginu
4. Konsultujte `README-CMS.md` za dodatne informacije

## Napomene

- Mock store će i dalje raditi ako Sanity nije dostupan
- Sve komponente imaju fallback na statičke podatke
- Ne zaboravite da isključite mock mode u produkciji