# Pokretanje Sanity Studio Lokalno

## Brzi Start

### 1. Pokrenite Next.js i Sanity Studio zajedno

```bash
# U root direktorijumu projekta
npm run dev
```

Zatim otvorite:
- **Sajt**: http://localhost:3001
- **Sanity Studio**: http://localhost:3001/studio

## Alternativni Način - Poseban Sanity Projekat

### 1. Kreirajte novi Sanity projekat

```bash
# U novom terminalu, van trenutnog projekta
mkdir sanity-srecno-ucenje
cd sanity-srecno-ucenje

# Inicijalizujte Sanity
npm create sanity@latest -- --project-id demo-project --dataset production

# Kada vas pita za template, izaberite "Clean project with no predefined schemas"
```

### 2. Kopirajte sheme

```bash
# Kopirajte schemas folder iz Next.js projekta
cp -r /path/to/srecno-ucenje/sanity/schemas/* ./schemas/
```

### 3. Pokrenite Sanity Studio

```bash
# U sanity-srecno-ucenje direktorijumu
npm run dev

# Studio će biti na http://localhost:3333
```

## Trenutno Stanje u Projektu

Vaš projekat već ima Sanity Studio konfigurisan na `/studio` ruti!

### Da ga koristite:

1. **Pokrenite projekat**:
   ```bash
   npm run dev
   ```

2. **Otvorite Studio**:
   ```
   http://localhost:3001/studio
   ```

3. **Prijavite se**:
   - Koristite Google, GitHub ili email
   - Ili kliknite "Continue as guest" za lokalni rad

## Demo Mode (Trenutno Aktivno)

Projekat trenutno koristi **mock podatke**. Da vidite kako radi:

1. Otvorite bilo koju stranicu (npr. `/faq`, `/blog`, `/uspeh`)
2. Podaci se učitavaju iz `lib/sanity-mock-store.ts`

## Prebacivanje na Pravi Sanity

1. **Kreirajte Sanity projekat**:
   ```bash
   # Posetite https://www.sanity.io/
   # Kreirajte novi projekat
   # Zapišite Project ID
   ```

2. **Ažurirajte .env.local**:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=vaš-pravi-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

3. **Isključite mock mode**:
   U `lib/sanity.client.ts`:
   ```typescript
   const USE_MOCK = false // promenite sa true
   ```

4. **Restartujte server**:
   ```bash
   npm run dev
   ```

## Troubleshooting

### "Port 3000 is in use"
Server se pokreće na portu 3001 umesto 3000.

### "No authentication credentials"
Normalno za lokalni rad - možete nastaviti kao guest.

### Prazne stranice
Proverite da li je `USE_MOCK = true` u `lib/sanity.client.ts`.

### CORS greške
Dodajte `http://localhost:3001` u CORS origins u Sanity dashboard.

## Korisni Linkovi

- **Lokalni Studio**: http://localhost:3001/studio
- **Lokalni sajt**: http://localhost:3001
- **Sanity dokumentacija**: https://www.sanity.io/docs

## Napomene

- Studio radi u browseru, ne treba dodatna instalacija
- Podaci u mock mode-u se ne čuvaju
- Za produkciju, obavezno kreirajte pravi Sanity projekat