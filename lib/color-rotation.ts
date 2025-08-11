/**
 * Color Rotation System for Srećno učenje
 * 
 * Automatski rotira brand boje kroz sekcije sajta
 * kako bi svaka stranica bila jedinstvena ali povezana
 */

export type BrandColor = 'sky' | 'sun' | 'grass' | 'heart' | 'night'

export const brandColors = {
  sky: {
    name: 'sky',
    hex: '#5DBFDB',
    rgb: 'rgb(93, 191, 219)',
    className: 'brand-sky',
    meaning: 'poverenje, početak, stabilnost',
    usage: 'početak puta, forma, kontakt'
  },
  sun: {
    name: 'sun',
    hex: '#F4C950',
    rgb: 'rgb(244, 201, 80)',
    className: 'brand-sun',
    meaning: 'optimizam, energija, rast',
    usage: 'popularni izbori, uspeh, motivacija'
  },
  grass: {
    name: 'grass',
    hex: '#91C733',
    rgb: 'rgb(145, 199, 51)',
    className: 'brand-grass',
    meaning: 'priroda, učenje, razvoj',
    usage: 'edukacija, prirodno učenje, napredak'
  },
  heart: {
    name: 'heart',
    hex: '#E53935',
    rgb: 'rgb(229, 57, 53)',
    className: 'brand-heart',
    meaning: 'strast, ljubav, posvećenost',
    usage: 'premium, emotivna veza, urgentnost'
  },
  night: {
    name: 'night',
    hex: '#1E293B',
    rgb: 'rgb(30, 41, 59)',
    className: 'brand-night',
    meaning: 'autoritet, sofisticiranost, dostignuće',
    usage: 'završetak, premium, profesionalizam'
  }
}

/**
 * Osnovna rotacija boja kroz sekcije
 */
export const getColorByIndex = (index: number): BrandColor => {
  const colors: BrandColor[] = ['sky', 'sun', 'grass', 'heart', 'night']
  return colors[index % colors.length]
}

/**
 * Tematska rotacija za različite tipove stranica
 */
export const pageColorSchemes = {
  franchise: ['sky', 'sun', 'heart', 'grass', 'night'], // Franšiza put
  education: ['grass', 'sky', 'sun', 'heart', 'night'], // Edukacija fokus
  about: ['heart', 'grass', 'sky', 'sun', 'night'],     // Emotivna veza
  calculator: ['sun', 'sky', 'grass', 'heart', 'night'], // Optimizam i analiza
  location: ['grass', 'heart', 'sky', 'sun', 'night']    // Lokalna zajednica
}

/**
 * Dobijanje boje za sekciju na osnovu stranice i indeksa
 */
export const getSectionColor = (
  pageType: keyof typeof pageColorSchemes,
  sectionIndex: number
): BrandColor => {
  const scheme = pageColorSchemes[pageType] || pageColorSchemes.franchise
  return scheme[sectionIndex % scheme.length]
}

/**
 * Boje za različite UI elemente
 */
export const elementColorMappings = {
  // Dugmići po prioritetu
  primaryAction: 'sky',    // Glavni CTA
  secondaryAction: 'sun',  // Sekundarni CTA
  successAction: 'grass',  // Potvrda, uspeh
  warningAction: 'heart',  // Važno, urgentno
  neutralAction: 'night',  // Info, detalji
  
  // Stanja
  loading: 'sky',
  success: 'grass',
  warning: 'sun',
  error: 'heart',
  info: 'night',
  
  // Sekcije po tipu
  hero: 'sky',         // Hero uvek počinje sa sky
  features: 'sun',     // Features sa sun (optimizam)
  testimonials: 'heart', // Testimonials sa heart (emotivno)
  stats: 'grass',      // Statistike sa grass (rast)
  cta: 'night'         // CTA sekcija sa night (autoritet)
}

/**
 * Hook za React komponente
 */
export const useColorRotation = (pageType: keyof typeof pageColorSchemes) => {
  const getNextColor = (currentIndex: number): BrandColor => {
    return getSectionColor(pageType, currentIndex + 1)
  }
  
  const getPreviousColor = (currentIndex: number): BrandColor => {
    const scheme = pageColorSchemes[pageType]
    const prevIndex = currentIndex - 1 < 0 ? scheme.length - 1 : currentIndex - 1
    return scheme[prevIndex % scheme.length]
  }
  
  const getColorPalette = (startIndex: number, count: number): BrandColor[] => {
    return Array.from({ length: count }, (_, i) => 
      getSectionColor(pageType, startIndex + i)
    )
  }
  
  return {
    getNextColor,
    getPreviousColor,
    getColorPalette,
    getSectionColor: (index: number) => getSectionColor(pageType, index)
  }
}

/**
 * Utility funkcije za Tailwind klase
 */
export const getColorClasses = (color: BrandColor) => ({
  bg: `bg-${color}-500`,
  bgLight: `bg-${color}-50`,
  bgDark: `bg-${color}-600`,
  text: `text-${color}-500`,
  textDark: `text-${color}-600`,
  border: `border-${color}-500`,
  borderLight: `border-${color}-200`,
  hover: `hover:bg-${color}-500`,
  hoverText: `hover:text-${color}-500`,
  focus: `focus:ring-${color}-500`,
  focusRing: `focus:ring-2 focus:ring-${color}-500 focus:ring-opacity-50`
})

/**
 * Generisanje CSS custom properties za temu
 */
export const generateColorVariables = (color: BrandColor) => {
  const colorData = brandColors[color]
  return {
    '--brand-primary': colorData.hex,
    '--brand-primary-rgb': colorData.rgb,
    '--brand-primary-name': colorData.name
  }
}

/**
 * Color contrast checker za accessibility
 */
export const getContrastColor = (bgColor: BrandColor): 'white' | 'night' => {
  // Sky, grass, heart, night → white text
  // Sun → night text (bolje kontrast)
  return bgColor === 'sun' ? 'night' : 'white'
}

/**
 * Smart color pairing za komplementarne kombinacije
 */
export const getComplementaryColor = (color: BrandColor): BrandColor => {
  const complements: Record<BrandColor, BrandColor> = {
    sky: 'sun',      // Plavo + žuto
    sun: 'night',    // Žuto + tamno
    grass: 'heart',  // Zeleno + crveno  
    heart: 'grass',  // Crveno + zeleno
    night: 'sun'     // Tamno + žuto
  }
  return complements[color]
}

/**
 * Export za CSS-in-JS
 */
export const colorRotationStyles = `
  /* Brand color CSS variables */
  :root {
    --color-sky: #5DBFDB;
    --color-sun: #F4C950;
    --color-grass: #91C733;
    --color-heart: #E53935;
    --color-night: #1E293B;
  }
  
  /* Color rotation classes */
  .section-sky { --section-color: var(--color-sky); }
  .section-sun { --section-color: var(--color-sun); }
  .section-grass { --section-color: var(--color-grass); }
  .section-heart { --section-color: var(--color-heart); }
  .section-night { --section-color: var(--color-night); }
  
  /* Auto-rotation */
  section:nth-child(5n+1) { --section-color: var(--color-sky); }
  section:nth-child(5n+2) { --section-color: var(--color-sun); }
  section:nth-child(5n+3) { --section-color: var(--color-grass); }
  section:nth-child(5n+4) { --section-color: var(--color-heart); }
  section:nth-child(5n+5) { --section-color: var(--color-night); }
`

const colorRotation = {
  brandColors,
  getColorByIndex,
  getSectionColor,
  elementColorMappings,
  useColorRotation,
  getColorClasses,
  generateColorVariables,
  getContrastColor,
  getComplementaryColor
}

export default colorRotation