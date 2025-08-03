// Demo sadržaj za Sanity CMS
// Ovaj fajl je samo primer strukture podataka
// U pravom okruženju, podatke unosite kroz Sanity Studio

export const demoSiteSettings = {
  _type: 'siteSettings',
  siteName: 'Srećno učenje',
  siteDescription: 'Centar za brzočitanje i mentalnu aritmetiku koji razvija pune potencijale vašeg deteta',
  email: 'info@srecno-ucenje.rs',
  phone: '+381 60 123 4567',
  address: 'Bulevar oslobođenja 123, 21000 Novi Sad',
  workingHours: [
    { day: 'Ponedeljak - Petak', hours: '09:00 - 20:00' },
    { day: 'Subota', hours: '10:00 - 18:00' },
    { day: 'Nedelja', hours: '10:00 - 16:00' },
  ],
  socialLinks: [
    { platform: 'Facebook', url: 'https://facebook.com/srecnoucenje' },
    { platform: 'Instagram', url: 'https://instagram.com/srecnoucenje' },
    { platform: 'YouTube', url: 'https://youtube.com/srecnoucenje' },
  ],
}

export const demoPrograms = [
  {
    _type: 'program',
    title: 'Brzočitanje',
    slug: { current: 'brzocitanje' },
    icon: 'book',
    description: 'Ovladajte veštinom brzog čitanja uz potpuno razumevanje pročitanog teksta',
    ageRange: '7-16 godina',
    duration: '6 meseci',
    groupSize: '6-8 učenika',
    benefits: [
      'Čitanje 3-5 puta brže',
      'Bolje razumevanje pročitanog',
      'Poboljšana koncentracija',
      'Veće samopouzdanje',
      'Bolje ocene u školi'
    ],
  },
  {
    _type: 'program',
    title: 'Mentalna aritmetika',
    slug: { current: 'mentalna-aritmetika' },
    icon: 'calculator',
    description: 'Naučite da računate brže od kalkulatora koristeći moć vizualizacije',
    ageRange: '5-14 godina',
    duration: '12 meseci',
    groupSize: '6-8 učenika',
    benefits: [
      'Brže mentalno računanje',
      'Razvoj oba hemisfera mozga',
      'Poboljšana memorija',
      'Bolja logika i analitičko mišljenje',
      'Veća kreativnost'
    ],
  },
]

export const demoFAQs = [
  {
    _type: 'faq',
    question: 'Koliko dugo traje program brzočitanja?',
    answer: 'Program brzočitanja traje 6 meseci sa redovnim časovima 2 puta nedeljno. Nakon završetka osnovnog programa, učenici mogu nastaviti sa naprednim tehnikama.',
    category: 'programs',
    order: 1,
  },
  {
    _type: 'faq',
    question: 'Od koje godine dete može da krene sa mentalnom aritmetikom?',
    answer: 'Preporučujemo da deca krenu sa mentalnom aritmetikom od 5. godine, kada već poznaju brojeve i osnovne matematičke operacije.',
    category: 'programs',
    order: 2,
  },
  {
    _type: 'faq',
    question: 'Da li postoji probni čas?',
    answer: 'Da, nudimo besplatan probni čas kako bi vaše dete moglo da se upozna sa našim metodama i instruktorima pre upisa.',
    category: 'enrollment',
    order: 3,
  },
]

export const demoSuccessStories = [
  {
    _type: 'successStory',
    studentName: 'Marko Petrović',
    age: '12 godina',
    testimonial: 'Pre kursa sam izbegavao da čitam knjige. Sada pročitam 2-3 knjige nedeljno! Moje ocene iz srpskog jezika su se drastično poboljšale.',
    results: [
      { metric: '300%', label: 'Brže čitanje' },
      { metric: 'Sa 3 na 5', label: 'Ocena iz srpskog' },
      { metric: '2h → 45min', label: 'Vreme učenja' },
    ],
    featured: true,
  },
  {
    _type: 'successStory',
    studentName: 'Ana Nikolić',
    age: '10 godina',
    testimonial: 'Matematika mi je sada omiljeni predmet! Mogu da računam brže od svih u razredu. Osvojila sam prvo mesto na školskom takmičenju!',
    results: [
      { metric: '1. mesto', label: 'Školsko takmičenje' },
      { metric: '100%', label: 'Tačnost računanja' },
      { metric: '5', label: 'Ocena iz matematike' },
    ],
    featured: true,
  },
]

export const demoBlogCategories = [
  { _type: 'blogCategory', title: 'Brzočitanje', slug: { current: 'brzocitanje' } },
  { _type: 'blogCategory', title: 'Mentalna aritmetika', slug: { current: 'mentalna-aritmetika' } },
  { _type: 'blogCategory', title: 'Saveti za roditelje', slug: { current: 'saveti-za-roditelje' } },
  { _type: 'blogCategory', title: 'Edukacija', slug: { current: 'edukacija' } },
]

export const demoAuthors = [
  {
    _type: 'author',
    name: 'Dr. Milica Jovanović',
    slug: { current: 'dr-milica-jovanovic' },
    title: 'Stručnjak za brzočitanje',
    bio: 'Doktor pedagoških nauka sa 15 godina iskustva u radu sa decom.',
  },
  {
    _type: 'author',
    name: 'Prof. Stefan Nikolić',
    slug: { current: 'prof-stefan-nikolic' },
    title: 'Instruktor mentalne aritmetike',
    bio: 'Profesor matematike i sertifikovani instruktor mentalne aritmetike.',
  },
]

console.log('Demo podaci su spremni za unos kroz Sanity Studio!')
console.log('Pristupite http://localhost:3001/studio da unesete podatke.')