# API Keys Setup Guide

Ovaj dokument objašnjava kako sigurno konfigurisati API ključeve za produkciju kroz Sanity CMS.

## 🔒 Bezbednost

API ključevi se **NIKAD** ne stavljaju direktno u kod. Sistem prioritizuje:

1. **CMS konfiguracija** (preporučeno za produkciju)
2. **Environment varijable** (fallback)

## 📋 Podešavanje kroz CMS

### 1. Pristup Sanity Studio

1. Idite na: `https://vash-domen.com/studio`
2. Ulogujte se sa admin nalozima

### 2. Konfiguracija API Ključeva

1. Kliknite na **"Podešavanja Sajta"** (Site Settings)
2. Idite na tab **"API Ključevi"**
3. Unesite sledeće ključeve:

#### Google Maps API Key
- **Polje:** `Google Maps API Ključ`
- **Vrednost:** `AIzaSyDLbe1bX9URTgsnVn8gwYSKUddbZbvfqR8`
- **Opis:** Potreban za mapu na stranici lokacija

#### Google Analytics ID (opciono)
- **Polje:** `Google Analytics ID`
- **Format:** `G-XXXXXXXXXX`
- **Opis:** Za praćenje posetilaca

#### Facebook Pixel ID (opciono)
- **Polje:** `Facebook Pixel ID`
- **Opis:** Za praćenje konverzija

#### reCAPTCHA Site Key (opciono)
- **Polje:** `reCAPTCHA Site Key`
- **Opis:** Za zaštićene kontakt forme

### 3. Sačuvaj Promene

Kliknite **"Publish"** da sačuvate promene.

## 🛠️ Environment Variables (Fallback)

Ako iz nekog razloga CMS nije dostupan, sistem će koristiti environment varijable iz `.env.local`:

```bash
# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyDLbe1bX9URTgsnVn8gwYSKUddbZbvfqR8

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
RECAPTCHA_SECRET_KEY=your-secret-key
```

## 🔄 Kako Sistem Radi

1. **Komponenta zahteva API key**
2. **Hook poziva `/api/config` endpoint**
3. **API čita CMS settings** (sa cache-om od 5 minuta)
4. **Vraća API key** ili koristi env fallback
5. **Komponenta koristi API key**

## 📊 Prednosti ovog pristupa

✅ **Bezbedno** - API ključevi nisu u kodu  
✅ **Fleksibilno** - Lako menjanje bez deploy-a  
✅ **Cache-ovano** - Performanse sa 5min cache  
✅ **Fallback** - Environment varijable kao backup  
✅ **Transparentno** - Jasne poruke o grešci  

## 🚀 Produkcijska Deploy

### Pre Deploy-a:

1. **Uklonite API key iz `.env.local`**:
   ```bash
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
   ```

2. **Konfiguriši kroz CMS** kao što je opisano gore

3. **Deploy aplikacije**

4. **Testiraj mapu** na `/lokacije` stranici

### Verifikacija:

- [ ] Mapa se učitava normalno
- [ ] Nema API ključeva u browser source kodu
- [ ] CMS može da menja ključeve bez redeploy

## 🆘 Troubleshooting

### Mapa se ne učitava

1. **Proverite CMS konfiguraciju**
2. **Proverite browser console za greške**
3. **Verifikujte da li je API key valjan**
4. **Restartujte server** (cache clear)

### API Key eksponiran

- Nikad ne stavljaj API key u:
  - Client-side kod
  - Git repository  
  - Javne fajlove

### Cache problemi

API poziv za config se cache-uje 5 minuta. Za trenutno ažuriranje:
- Restartuj Next.js server
- Ili sačekaj 5 minuta

## 📞 Podrška

Za dodatne probleme kontaktiraj sistem administratora.