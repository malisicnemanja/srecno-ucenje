# Arhivirane 3D/Three.js komponente

Ove komponente su arhivirane jer zauzimaju previše prostora u bundle-u (~61MB).

## Komponente:

1. **InteractiveClassroom.tsx** - 3D prikaz učionice sa Three.js
2. **SpaceViewer3D.tsx** - 3D prikaz prostora
3. **SpaceViewer2D.tsx** - 2D canvas prikaz prostora  
4. **Book3DPreview.tsx** - 3D preview knjiga

## Kako re-aktivirati:

### 1. Instaliraj potrebne pakete:
```bash
npm install three@^0.179.1 @react-three/fiber@^8.18.0 @react-three/drei@^9.122.0
```

### 2. Kopiraj komponente nazad:
```bash
cp _archived_components/3d-ucionica/InteractiveClassroom.tsx components/features/3d/
cp _archived_components/3d-ucionica/SpaceViewer3D.tsx components/features/3d/
cp _archived_components/3d-ucionica/SpaceViewer2D.tsx components/features/2d/
cp _archived_components/3d-ucionica/Book3DPreview.tsx components/features/books/
```

### 3. Dodaj export u components/features/index.ts:
```javascript
export { default as InteractiveClassroom } from './3d/InteractiveClassroom'
export { default as SpaceViewer3D } from './3d/SpaceViewer3D'
export { default as SpaceViewer2D } from './2d/SpaceViewer2D'
export { default as Book3DPreview } from './books/Book3DPreview'
```

### 4. Koristi komponente sa dynamic import:
```javascript
const InteractiveClassroom = dynamic(
  () => import('@/components/features/3d/InteractiveClassroom'),
  { ssr: false }
)
```

## Razlog arhiviranja:
- Three.js paketi dodaju ~61MB na bundle size
- Komponente nisu bile u aktivnoj upotrebi
- Jednostavniji placeholder pruža bolje performanse

Datum arhiviranja: August 2025