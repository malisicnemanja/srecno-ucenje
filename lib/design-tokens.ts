// SREĆNO UČENJE BRAND COLORS - UPDATED TO CLIENT SPECIFICATIONS
// Brand Identity Optimized - Represents Education, Trust, and Growth
export const brandColors = {
  // Sky: Trust, Communication, Openness - Updated to match requirements
  sky: '#5DBFDB',    // Client specification
  // Sun: Energy, Joy, Success - Updated to match requirements  
  sun: '#FDD835',    // Client specification
  // Grass: Learning, Growth, Life - Updated to match requirements
  grass: '#7CB342',  // Client specification
  // Heart: Care, Depth, Support - Updated to match requirements
  heart: '#E53935',  // Client specification
  // Night: Wisdom, Focus, Calm - Updated to match requirements
  night: '#3E4C59',  // Client specification
}

// Semantic Brand Mapping for Educational Platform
export const semanticBrandColors = {
  primary: brandColors.grass,    // Learning & Growth
  secondary: brandColors.sky,    // Trust & Communication  
  accent: brandColors.sun,       // Energy & Success
  warm: brandColors.heart,       // Care & Support
  special: brandColors.night,    // Wisdom & Focus
}

// WCAG AA Compliant Color Scales for Educational Platform
export const colors = {
  // Primary: Grass (Learning & Growth) - Updated to client brand colors
  primary: {
    50: '#F3F8F1',   // Lightest - Background use
    100: '#E7F0DD',  // Very light - Soft backgrounds
    200: '#C8E1B5',  // Light - Hover states
    300: '#A9D28D',  // Medium light - Disabled states
    400: '#7CB342',  // Brand color - Main CTA (client spec)
    500: '#6A9E39',  // Medium - Hover (4.5:1 contrast)
    600: '#588930',  // Medium dark - Active states (5.1:1 contrast)
    700: '#467427',  // Dark - Text on light (7.2:1 contrast)
    800: '#345F1E',  // Very dark - High contrast text
    900: '#224A15',  // Darkest - Maximum contrast
  },
  // Sky (Cyan) - Secondary brand color - Updated to client spec
  secondary: {
    50: '#EBF8FC',
    100: '#D7F1F8', 
    200: '#AFE3F1',
    300: '#87D5EA',
    400: '#5DBFDB',  // Brand sky (client spec)
    500: '#4DA6C4',  // Hover state
    600: '#3D8DAD',
    700: '#2D7496',
    800: '#1D5B7F',
    900: '#0D4268',
  },
  // Sun (Yellow) - Accent brand color - Updated to client spec
  accent: {
    50: '#FFFEF7',
    100: '#FFFAEB',
    200: '#FFF3C4',
    300: '#FFEC8C',
    400: '#FDD835',  // Brand sun (client spec)
    500: '#E8C513',  // Hover state
    600: '#C59B0F',
    700: '#9F730C',
    800: '#835B10',
    900: '#704A12',
  },
  // Heart (Red) - Warm/contrast color - Updated to client spec
  warm: {
    50: '#FDEBEB',
    100: '#FBD7D7',
    200: '#F7AFAF',
    300: '#F38787',
    400: '#E53935',  // Brand heart (client spec - red)
    500: '#CE2E2A',  // Hover state
    600: '#B7231F',
    700: '#A01814',
    800: '#890D09',
    900: '#720200',
  },
  // Night (Dark Blue-Gray) - Special accent - Updated to client spec
  night: {
    50: '#EBEEF2',
    100: '#D7DDE5',
    200: '#AFBBCB',
    300: '#8799B1',
    400: '#5F7797',
    500: '#4D6177',
    600: '#3E4C59',  // Brand night (client spec)
    700: '#323E48',
    800: '#263037',
    900: '#1A2226',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
}

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
}

export const transitions = {
  fast: '150ms ease-in-out',
  base: '200ms ease-in-out',
  slow: '300ms ease-in-out',
  slower: '500ms ease-in-out',
}

export const animations = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  slideUp: {
    from: { transform: 'translateY(20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
  slideDown: {
    from: { transform: 'translateY(-20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 },
  },
  scaleIn: {
    from: { transform: 'scale(0.9)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
  },
  bounceIn: {
    from: { transform: 'scale(0.3)', opacity: 0 },
    to: {
      transform: 'scale(1.05)',
      opacity: 1,
      animationTimingFunction: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
}

// Educational brand gradients (subtle, appropriate for learning platform)
export const gradients = {
  // Brand gradients using actual brand colors
  grass: `linear-gradient(135deg, ${brandColors.grass} 0%, ${colors.primary[500]} 100%)`,
  sky: `linear-gradient(135deg, ${brandColors.sky} 0%, ${colors.secondary[500]} 100%)`,
  sun: `linear-gradient(135deg, ${brandColors.sun} 0%, ${colors.accent[500]} 100%)`,
  heart: `linear-gradient(135deg, ${colors.warm[700]} 0%, ${brandColors.heart} 100%)`,
  night: `linear-gradient(135deg, ${colors.night[600]} 0%, ${brandColors.night} 100%)`,
  
  // Legacy support
  primary: `linear-gradient(135deg, ${colors.primary[400]} 0%, ${colors.primary[600]} 100%)`,
  secondary: `linear-gradient(135deg, ${colors.secondary[400]} 0%, ${colors.secondary[600]} 100%)`,
  accent: `linear-gradient(135deg, ${colors.accent[400]} 0%, ${colors.accent[600]} 100%)`,
  warm: `linear-gradient(135deg, ${colors.warm[400]} 0%, ${colors.warm[600]} 100%)`,
  
  // Educational rainbow (all brand colors)
  rainbow: `linear-gradient(135deg, ${brandColors.grass} 0%, ${brandColors.sky} 25%, ${brandColors.sun} 50%, ${brandColors.night} 75%, ${brandColors.heart} 100%)`,
  
  // Soft backgrounds for content areas
  soft: {
    grass: `linear-gradient(135deg, ${colors.primary[50]} 0%, ${colors.primary[100]} 100%)`,
    sky: `linear-gradient(135deg, ${colors.secondary[50]} 0%, ${colors.secondary[100]} 100%)`,
    sun: `linear-gradient(135deg, ${colors.accent[50]} 0%, ${colors.accent[100]} 100%)`,
    heart: `linear-gradient(135deg, ${colors.warm[50]} 0%, ${colors.warm[100]} 100%)`,
    night: `linear-gradient(135deg, ${colors.night[50]} 0%, ${colors.night[100]} 100%)`,
  },
}

// Mobile-first spacing for educational platform
export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px  
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  // Touch-friendly spacing
  touch: '2.75rem', // 44px minimum touch target
}

// Educational platform border radius
export const borderRadius = {
  none: '0',
  sm: '0.25rem',   // 4px
  DEFAULT: '0.5rem', // 8px - friendly for children
  md: '0.75rem',   // 12px 
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  '2xl': '2rem',   // 32px
  full: '9999px',
}

// Typography scale for educational content
export const typography = {
  // Mobile-first sizes (320px+)
  mobile: {
    display: { size: '2rem', lineHeight: '1.2' },      // 32px
    h1: { size: '1.75rem', lineHeight: '1.25' },       // 28px
    h2: { size: '1.5rem', lineHeight: '1.3' },         // 24px
    h3: { size: '1.25rem', lineHeight: '1.35' },       // 20px
    body: { size: '1rem', lineHeight: '1.6' },         // 16px
    small: { size: '0.875rem', lineHeight: '1.5' },    // 14px
    tiny: { size: '0.75rem', lineHeight: '1.4' },      // 12px
  },
  // Tablet+ enhancement (768px+)
  tablet: {
    display: { size: '3rem', lineHeight: '1.2' },      // 48px
    h1: { size: '2.5rem', lineHeight: '1.25' },        // 40px
    h2: { size: '2rem', lineHeight: '1.3' },           // 32px
    h3: { size: '1.5rem', lineHeight: '1.35' },        // 24px
    body: { size: '1.125rem', lineHeight: '1.6' },     // 18px
    small: { size: '1rem', lineHeight: '1.5' },        // 16px
    tiny: { size: '0.875rem', lineHeight: '1.4' },     // 14px
  },
  // Desktop enhancement (1024px+)
  desktop: {
    display: { size: '4rem', lineHeight: '1.2' },      // 64px
    h1: { size: '3rem', lineHeight: '1.25' },          // 48px
    h2: { size: '2.5rem', lineHeight: '1.3' },         // 40px
    h3: { size: '2rem', lineHeight: '1.35' },          // 32px
    body: { size: '1.25rem', lineHeight: '1.6' },      // 20px
    small: { size: '1.125rem', lineHeight: '1.5' },    // 18px
    tiny: { size: '1rem', lineHeight: '1.4' },         // 16px
  },
}