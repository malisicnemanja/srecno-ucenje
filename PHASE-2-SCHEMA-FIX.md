# PHASE 2 - SCHEMA ERROR FIX

## ❌ PROBLEM
SchemaError in Sanity Studio when loading new schemas

## ✅ SOLUTION APPLIED

### 1. Fixed `geopoint` type in center.ts
**Problem**: `type: 'geopoint'` nije uvek dostupan
**Solution**: Zamenjen sa object tipom:
```typescript
type: 'object',
fields: [
  { name: 'lat', type: 'number' },
  { name: 'lng', type: 'number' }
]
```

### 2. Server restarted
- Killed existing process
- Restarted with `npm run dev`
- Studio now accessible (HTTP 200)

## 📝 CHANGES MADE
- Modified: `sanity/schemas/documents/center.ts`
- Changed geopoint to object with lat/lng fields
- Added validation for coordinates (-90 to 90 for lat, -180 to 180 for lng)

## ✅ NEXT STEPS
1. Otvori http://localhost:3000/studio ponovo
2. Proveri da li se učitava bez grešaka
3. Verifikuj da se novi tipovi pojavljuju u meniju
4. Kreiraj test dokumente

## 🚨 AKO JOŠ UVEK IMA GREŠKU

1. Proveri browser konzolu za specifičnu grešku
2. Pokreni: `npm run build` da vidiš TypeScript greške
3. Privremeno zakomentariši nove tipove u `sanity/schemas/index.ts`
4. Restartuj server ponovo

## 💡 COMMON SCHEMA ERRORS

1. **Missing imports**: Proveri da li su svi custom tipovi importovani
2. **Undefined types**: blockContent, geopoint, etc.
3. **Duplicate names**: Dva schema sa istim imenom
4. **Invalid field types**: Korišćenje nepostojećih tipova
5. **Circular dependencies**: Schema A referencira Schema B koji referencira Schema A