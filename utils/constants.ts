// Application constants

export const SITE_CONFIG = {
  name: 'Srećno učenje',
  url: 'https://srecno-ucenje.rs',
  description: 'Franšiza za decu - obrazovni centar za predškolce',
  defaultOgImage: '/images/og-default.jpg',
}

export const CONSULTATION_TYPES = [
  { value: 'franchise_intro', label: 'Franšiza - Početne informacije', duration: '30 min' },
  { value: 'business_plan', label: 'Biznis plan konsultacije', duration: '60 min' },
  { value: 'location', label: 'Lokacija i prostor', duration: '45 min' },
  { value: 'marketing', label: 'Marketing strategija', duration: '45 min' },
  { value: 'financial', label: 'Finansijske konsultacije', duration: '60 min' },
  { value: 'other', label: 'Ostalo', duration: '30 min' },
]

export const RESOURCE_CATEGORIES = {
  guides: 'Vodiči',
  templates: 'Šabloni',
  checklists: 'Kontrolne liste',
  ebooks: 'E-knjige',
  whitepapers: 'Bele knjige',
} as const

export const QUIZ_TYPES = {
  franchise_readiness: 'Spremnost za franšizu',
  investment_profile: 'Investicioni profil',
  business_knowledge: 'Poslovno znanje',
} as const

export const CITIES = [
  'Beograd',
  'Novi Sad',
  'Niš',
  'Kragujevac',
  'Subotica',
  'Pančevo',
  'Čačak',
  'Kraljevo',
  'Smederevo',
  'Leskovac',
  'Valjevo',
  'Kruševac',
  'Vranje',
  'Šabac',
  'Užice',
  'Sombor',
  'Požarevac',
  'Pirot',
  'Kikinda',
  'Sremska Mitrovica',
]

export const FRANCHISE_MODELS = [
  'Osnovni paket',
  'Standardni paket',
  'Premium paket',
  'Master franšiza',
]

export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
}

export const TRANSITION_DEFAULTS = {
  duration: 0.5,
  ease: 'easeOut',
}