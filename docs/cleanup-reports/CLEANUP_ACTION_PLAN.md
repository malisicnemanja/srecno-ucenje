# 🧹 AKCIONI PLAN ČIŠĆENJA SADRŽAJA

## TRENUTNO STANJE
- **Ukupno dokumenata u Sanity**: ~300+
- **Migrirano novih**: 94
- **Za brisanje**: 46
- **Za preimenovanje**: 10

## ZADACI PO PRIORITETU

### 🔴 HITNO - BRISANJE (46 dokumenata)

#### 1. Kalkulatori (13)
```
✓ Obrisati sve calculator rezultate (test podaci)
```

#### 2. Franchise Fields (12 duplikata)
```
✓ Zadržati samo jedinstvene (12 od 24)
- Ime i prezime (1x)
- Email adresa (1x)
- Broj telefona (1x)
- Trenutno zanimanje (1x)
- Godine iskustva (1x)
- Nivo obrazovanja (1x)
- Dostupno vreme (1x)
- Budžet (1x)
- Lokacija (1x)
- Motivacija (1x)
- Iskustvo sa decom (1x)
- Ciljevi (1x)
```

#### 3. FAQ Kategorije (11 duplikata)
```
Zadržati:
✓ Obuka i podrška (1)
✓ Finansijska pitanja (1)
✓ Operativna pitanja (1)
✓ Opšta pitanja (1)
✓ Franšiza (1)
✓ Programi (1)
```

#### 4. About Author (3 duplikata)
```
✓ Zadržati: EIn1TO6kzkBkpMuRkFy78E (najkompletniji)
✗ Obrisati: about-author, aboutAuthor, drafts.EIn1TO6kzkBkpMuRkFy78E
```

#### 5. Blog postovi za brisanje
```
✗ "5 tehnika brzočitanja..."
✗ Duplikati (3)
✓ Zadržati 6 odabranih
```

### 🟡 SREDNJI - PREIMENOVANJE (10 dokumenata)

#### Škole → Centri
```javascript
Preimenovati sve school dokumente:
- name: "Centar [Grad]"
- type: izmena na "centre"
- Dodati nova polja:
  - centerType: "franchise" | "company" | "partner"
  - capacity: broj dece
  - programs: reference na programe
  - established: datum osnivanja
```

### 🟢 NISKO - PROVERA (30 dokumenata)

#### Testimonijali (20)
```
✓ Zadržati samo franšizne (proceniti po sadržaju)
✗ Obrisati dečije testimonijale
```

#### Success Stories (10)
```
✓ Zadržati sve (odnose se na franšize)
```

## FINALNI REZULTAT

**Pre čišćenja**: ~300 dokumenata
**Posle čišćenja**: ~180 dokumenata (-40%)

### Struktura posle čišćenja:
- 10 centara (ex-škole)
- 3 franšizna paketa
- 6 FAQ kategorija
- 42 FAQ pitanja (bez duplikata)
- 12 franchise polja
- 1 about author
- 6 blog postova
- ~15 franšiznih testimonijala
- 10 success stories
- Ostali sistemski dokumenti

## IMPLEMENTACIJA

1. **Backup pre brisanja**
2. **Izvršiti brisanje duplikata**
3. **Preimenovati škole u centre**
4. **Ažurirati CMS šeme**
5. **Testirati funkcionalnost**