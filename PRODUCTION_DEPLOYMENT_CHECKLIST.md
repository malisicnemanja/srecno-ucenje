# 🚀 Production Deployment Checklist

## Pre-Deployment Čišćenje

### 1. Lokalno testiranje
```bash
# Testiraj production build lokalno
npm run build
npm start
```

### 2. Čišćenje keša na produkciji

#### Opcija A: Brzo čišćenje (preporučeno)
```bash
# Obriši samo build i keš
rm -rf .next
rm -rf node_modules/.cache
rm -rf .sanity/dist
npm run build
```

#### Opcija B: Kompletno čišćenje
```bash
# Pokreni skriptu za kompletno čišćenje
chmod +x scripts/clean-production-build.sh
./scripts/clean-production-build.sh
```

### 3. Čišćenje browser keša

Nakon deploya, korisnici treba da:
- Hard refresh: `Ctrl + Shift + R` (Windows/Linux) ili `Cmd + Shift + R` (Mac)
- Ili obriše browser keš za sajt

### 4. Čišćenje CDN keša (ako koristite)

```bash
# Cloudflare
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/purge_cache" \
     -H "Authorization: Bearer {api_token}" \
     -H "Content-Type: application/json" \
     --data '{"purge_everything":true}'

# Vercel (automatski sa novim deploy)
vercel --prod

# Netlify (automatski sa novim deploy)
netlify deploy --prod
```

## 🔍 Razlozi za čišćenje keša

### Zašto je važno nakon ovih promena:

1. **Sanity Studio promene**: 
   - Izmenjene su šeme i konfiguracije
   - React komponente su refaktorisane
   - FAQ struktura je potpuno promenjena

2. **Bundle optimizacije**:
   - Service worker je ažuriran
   - PWA manifest je promenjen
   - JavaScript bundlovi su reorganizovani

3. **Schema migracije**:
   - FAQ podaci su migrirani iz inline u reference
   - TypeScript tipovi su ažurirani
   - GROQ upiti su izmenjeni

## 📋 Post-Deployment Verifikacija

### Testiraj ove kritične funkcionalnosti:

- [ ] Sanity Studio se učitava bez grešaka
- [ ] FAQ sekcija prikazuje podatke
- [ ] Možete kreirati/editovati FAQ u Studiju
- [ ] Blog stranice se učitavaju
- [ ] Kontakt forme rade
- [ ] PWA funkcionalnosti (offline mod)
- [ ] Performanse su poboljšane

## 🛠️ Troubleshooting

### Ako i dalje imate probleme:

1. **503 Service Unavailable**
   ```bash
   # Restartuj Node proces
   pm2 restart all
   # ili
   systemctl restart node-app
   ```

2. **Stale cache problemi**
   ```bash
   # Force rebuild
   rm -rf .next .sanity node_modules/.cache
   npm run build
   ```

3. **Database sync problemi**
   ```bash
   # Re-run migracije
   npm run migrate-faq-complete
   npm run verify-faq
   ```

## 📊 Monitoring nakon deploya

```bash
# Pratite logove
pm2 logs

# Pratite performanse
npm run perf:analyze

# Pratite greške
tail -f /var/log/nginx/error.log
```

## ✅ Finale provere

- Browser Developer Tools → Network tab → Disable cache → Reload
- Lighthouse audit score > 90
- Sve stranice se učitavaju < 3 sekunde
- Nema JavaScript grešaka u konzoli
- Mobile responsiveness radi perfektno

---

**Napomena**: Uvek pravite backup pre velikih promena!

```bash
# Backup baze
npm run backup:sanity

# Backup koda
git tag pre-cleanup-$(date +%Y%m%d)
git push --tags
```