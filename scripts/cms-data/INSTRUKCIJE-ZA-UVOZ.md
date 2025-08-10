# Instrukcije za uvoz CMS sadržaja

## Generirani fajlovi:

1. **faq-categories.json** - 5 FAQ kategorija
2. **faqs.json** - 24 kvalitetna pitanja i odgovora
3. **home-page.json** - Kompletna home page sa svim sekcijama
4. **complete-cms-data.json** - Sav sadržaj u jednom fajlu

## Način uvoza u Sanity Studio:

### Opcija 1: Manuelni uvoz preko Studio interfejsa
1. Otvorite Sanity Studio (/studio)
2. Kreirajte FAQ kategorije prvo (kopirajte sadržaj iz faq-categories.json)
3. Zatim kreirajte FAQ pitanja (kopirajte sadržaj iz faqs.json)
4. Konačno kreirajte/ažurirajte Home Page (kopirajte sadržaj iz home-page.json)

### Opcija 2: Programski uvoz (potreban je Sanity auth token)
```bash
# Postavite environment varijable
export SANITY_AUTH_TOKEN="your-auth-token"
export NEXT_PUBLIC_SANITY_PROJECT_ID="08ctxj6y"

# Pokrenite script za uvoz
node ../populate-serbian-cms-content.js
```

### Opcija 3: Sanity CLI Import
```bash
# Instalirajte Sanity CLI ako ga nemate
npm install -g @sanity/cli

# Uvezite podatke
sanity dataset import complete-cms-data.ndjson production --replace
```

## Napomene:

- Sav sadržaj je na srpskom jeziku
- Optimizovan za SEO
- Profesionalan marketing copy
- Reference između FAQ kategorija i pitanja su označene kao "REF_TO_CATEGORY_slug"
- Nakon uvoza možda ćete morati da ručno povežete reference

## Sadržaj uključuje:

### Home Page:
- ✅ Enhanced Hero sa animacijama
- ✅ 4 statistike
- ✅ 3 ključne prednosti
- ✅ 4 koraka franšiza procesa
- ✅ 3 franšiza modela (Starter, Professional, Master)
- ✅ 3 priče uspešnih partnera
- ✅ 3 besplatna resursa (lead magnets)
- ✅ Newsletter CTA sekcija
- ✅ SEO optimizovani sadržaj

### FAQ sistem:
- ✅ 5 tematskih kategorija
- ✅ 24 detaljnih pitanja i odgovora
- ✅ Pokriva sve aspekte franšize

Sav sadržaj je kreiran profesionalno i optimizovan za konverzije!
