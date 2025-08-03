# Site Audit Report - Srećno učenje

## 📋 KOMPLETNA LISTA STRANICA

### ✅ Stranice vidljive kroz navigaciju (Header)
1. `/` - Početna
2. `/fransiza-modeli` - Franšiza Modeli
3. `/metodologija` - Metodologija
4. `/ucionica` - Učionica
5. `/obuka-mentorstvo` - Obuka & Mentorstvo
6. `/uspeh` - Uspeh (Priče uspeha)
7. `/blog` - Blog
8. `/faq` - FAQ
9. `/kontakt` - Kontakt

### ✅ Stranice vidljive kroz Footer
1. `/metodologija` - Metodologija
2. `/fransiza-modeli` - Modeli
3. `/obuka-mentorstvo` - Obuka
4. `/uspeh` - Priče uspeha

### ⚠️ ORPHAN STRANICE (nisu povezane kroz navigaciju)
1. `/kako-se-pridruziti` - Kako se pridružiti
2. `/knjige` - Preporučene knjige
3. `/3d-ucionica` - 3D interaktivna učionica
4. `/kalkulatori` - Finansijski kalkulatori
5. `/kvizovi` - Edukativni kvizovi
6. `/resursi` - Resource center
7. `/zakazivanje` - Booking sistem
8. `/lokacije` - Mapa lokacija
9. `/legal/privatnost` - Politika privatnosti
10. `/legal/uslovi-koriscenja` - Uslovi korišćenja

### 🔧 Sistemske stranice
1. `/studio` - Sanity CMS Studio
2. `/[locale]` - Internacionalizacija (nije aktivna)

## 📊 ANALIZA NAVIGACIJE

### Trenutni glavni meni ima previše stavki (9):
- Početna (redundantno - logo već vodi na home)
- Blog, FAQ, Kontakt - mogu u footer

### Orphan stranice koje treba integrisati:
- Kalkulatori, Kvizovi, Resursi - važni conversion tools
- 3D učionica - napredna funkcionalnost
- Lokacije - korisno za potencijalne franšizere
- Zakazivanje - booking sistem

## 🎯 CTA ANALIZA

### Home page CTA dugmići:
1. **Hero sekcija**: 
   - "Započnite Danas" → `/kontakt` ✅
   - "Saznajte Više" → `/metodologija` ✅

2. **Franšiza sekcija**:
   - "Istražite Modele" → `/fransiza-modeli` ✅
   - Svaki model card → `/fransiza-modeli` ✅

3. **Success Stories**:
   - "Sve Priče Uspeha" → `/uspeh` ✅

4. **FAQ sekcija**:
   - "Sva Pitanja i Odgovori" → `/faq` ✅

5. **CTA sekcija**:
   - "Zakažite Razgovor" → `/kontakt` ✅

### Ostale stranice - glavni CTA:
- `/metodologija` → "Zakaži demo čas" → `/kontakt` ✅
- `/3d-ucionica` → "Zakaži obilazak" → `/kontakt` ✅
- `/kalkulatori` → "Zakaži konsultacije" → `/kontakt` ✅
- `/kvizovi` → Različiti CTA na osnovu rezultata
- `/resursi` → Download resursa (lead capture)
- `/lokacije` → "Saznaj više o franšizi" → `/fransize` ❌ (ne postoji)

### ❌ BROKEN LINKS:
1. `/fransize` - referenced in `/lokacije` page
2. `/price-uspesne` - referenced in Smart CTA Bar
3. `/dogadjaji` - referenced in quiz results
4. `/newsletter` - referenced in quiz results

## 🔄 PREPORUKE ZA REORGANIZACIJU

### NOVI GLAVNI MENI (5 stavki):
1. **Metodologija** → `/metodologija`
2. **Franšiza** → dropdown:
   - Modeli → `/fransiza-modeli`
   - Kalkulatori → `/kalkulatori`
   - Kvizovi → `/kvizovi`
3. **Učionica** → dropdown:
   - Virtualna → `/ucionica`
   - 3D Tour → `/3d-ucionica`
4. **Resursi** → `/resursi`
5. **Konsultacije** → `/zakazivanje`

### FOOTER (sve ostalo):
**Kolona 1 - O nama:**
- Metodologija
- Priče uspeha
- O autorki
- Blog

**Kolona 2 - Franšiza:**
- Modeli franšize
- Kako se pridružiti
- Lokacije
- FAQ

**Kolona 3 - Resursi:**
- Preuzmi materijale
- Knjige
- Obuka & Mentorstvo
- Kontakt

**Kolona 4 - Pravno:**
- Privatnost
- Uslovi korišćenja
- © 2024 Info

### QUICK FIXES potrebni:
1. Kreirati redirect `/fransize` → `/fransiza-modeli`
2. Kreirati redirect `/price-uspesne` → `/uspeh`
3. Kreirati redirect `/dogadjaji` → `/kontakt`
4. Kreirati redirect `/newsletter` → `/kontakt`
5. Ukloniti "Početna" iz glavnog menija
6. Integrisati orphan stranice u navigaciju