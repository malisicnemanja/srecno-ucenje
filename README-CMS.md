# Sanity CMS Integracija - Srećno učenje

## Pregled

Projekat koristi **Sanity CMS** za upravljanje sadržajem. Sanity omogućava ne-tehničkim korisnicima da lako ažuriraju sadržaj sajta kroz intuitivni Studio interface.

## Instalacija i Podešavanje

### 1. Kreiranje Sanity Projekta

1. Idite na [sanity.io](https://www.sanity.io/) i napravite nalog
2. Kreirajte novi projekat
3. Sačuvajte Project ID i Dataset name

### 2. Konfiguracija Environment Varijabli

Ažurirajte `.env.local` sa vašim Sanity kredencijalima:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-sanity-api-token
```

### 3. Deploy Sanity Studio

```bash
# Pokrenite lokalno
npm run dev

# Pristupite Studio-u na
http://localhost:3000/studio
```

## Content Types (Tipovi Sadržaja)

### Dokumenti

1. **Site Settings** - Globalna podešavanja sajta
   - Naziv sajta, logo, kontakt info
   - Društvene mreže
   - SEO podešavanja

2. **Pages** - Stranice sajta
   - Hero sekcija
   - Sadržaj stranice
   - Karakteristike
   - CTA sekcije

3. **Blog Posts** - Blog članci
   - Naslov, sadržaj, autor
   - Kategorije
   - SEO optimizacija

4. **Success Stories** - Priče o uspehu
   - Iskustva učenika
   - Pre/posle rezultati
   - Video testimonijali

5. **Programs** - Programi obuke
   - Brzočitanje
   - Mentalna aritmetika
   - Kombinovani program

6. **FAQ** - Često postavljana pitanja
   - Pitanja po kategorijama
   - Lako pretraživanje

7. **Team Members** - Članovi tima
   - Instruktori i osoblje
   - Biografije i kvalifikacije

### Objekti (Komponente)

- **Hero** - Hero sekcije
- **CTA** - Call-to-action sekcije
- **Feature** - Karakteristike/benefiti
- **Statistic** - Statistike
- **Pricing Plan** - Planovi cena
- **SEO** - SEO metadata

## Kako Koristiti CMS

### Za Ne-tehničke Korisnike

1. **Pristup Studio-u**
   - Idite na `yoursite.com/studio`
   - Ulogujte se sa vašim kredencijalima

2. **Editovanje Sadržaja**
   - Kliknite na tip sadržaja koji želite da menjate
   - Izaberite dokument za editovanje
   - Napravite izmene
   - Kliknite "Publish" da objavite izmene

3. **Dodavanje Novih Članaka**
   - Kliknite "Create new" dugme
   - Popunite sva obavezna polja
   - Dodajte slike kroz drag & drop
   - Objavite kada ste spremni

### Najbolje Prakse

1. **Slike**
   - Koristite optimizovane slike (max 2MB)
   - Dodajte alt text za pristupačnost
   - Koristite hotspot za fokusiranje

2. **SEO**
   - Popunite SEO polja za sve stranice
   - Koristite opisne naslove
   - Dodajte meta opise

3. **Organizacija**
   - Koristite kategorije za blog
   - Održavajte konzistentnost u nazivima
   - Redovno arhivirajte stari sadržaj

## Integracija sa Next.js

### Fetch Podataka

```typescript
// Primer: Dohvatanje blog postova
import { client } from '@/lib/sanity.client'
import { blogPostsQuery } from '@/lib/sanity.queries'

const posts = await client.fetch(blogPostsQuery)
```

### Hook za React Query

```typescript
// Korišćenje useSanityQuery hook-a
import { useSanityQuery } from '@/hooks/useSanity'
import { blogPostsQuery } from '@/lib/sanity.queries'

function BlogList() {
  const { data: posts, isLoading } = useSanityQuery(blogPostsQuery)
  
  if (isLoading) return <div>Učitavanje...</div>
  
  return (
    <div>
      {posts?.map(post => (
        <BlogCard key={post._id} post={post} />
      ))}
    </div>
  )
}
```

## Migracija Postojećeg Sadržaja

1. Pristupite Sanity Studio-u
2. Ručno unesite postojeći sadržaj kroz interface
3. Ili koristite Sanity CLI za bulk import:

```bash
# Instalirajte Sanity CLI
npm install -g @sanity/cli

# Import podataka
sanity dataset import data.ndjson production
```

## Podrška

Za dodatnu pomoć:
- [Sanity dokumentacija](https://www.sanity.io/docs)
- [Next.js + Sanity priručnik](https://www.sanity.io/guides/nextjs-sanity)

## Sigurnosne Napomene

- Nikad ne delite SANITY_API_TOKEN javno
- Koristite read-only token za frontend
- Redovno menjajte API tokene
- Ograničite CORS postavke u Sanity dashboardu