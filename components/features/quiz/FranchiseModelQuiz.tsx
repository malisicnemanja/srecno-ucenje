'use client'

import QuizComponent from './QuizComponent'

const franchiseModelQuizData = {
  title: 'Koji franšizni model je za vas?',
  description: 'Pronađite idealan franšizni paket koji odgovara vašem budžetu, ciljevima i iskustvu.',
  questions: [
    {
      question: 'Koliki je vaš raspoloživi budžet za investiciju?',
      type: 'multiple_choice' as const,
      answers: [
        { text: 'Do 20.000 EUR', value: 3, category: 'starter' },
        { text: '20.000 - 35.000 EUR', value: 6, category: 'professional' },
        { text: '35.000 - 50.000 EUR', value: 9, category: 'premium' },
        { text: 'Preko 50.000 EUR', value: 10, category: 'premium' },
      ],
      weight: 2,
    },
    {
      question: 'Kakvo je vaše poslovno iskustvo?',
      type: 'multiple_choice' as const,
      answers: [
        { text: 'Nemam poslovno iskustvo', value: 2, category: 'starter' },
        { text: 'Imam osnovno poslovno iskustvo', value: 5, category: 'starter' },
        { text: 'Vodio/la sam mali biznis', value: 7, category: 'professional' },
        { text: 'Imam bogato iskustvo u vođenju biznisa', value: 10, category: 'premium' },
      ],
      weight: 1.5,
    },
    {
      question: 'Koliko vremena možete posvetiti vođenju centra?',
      type: 'multiple_choice' as const,
      answers: [
        { text: 'Part-time (20 sati nedeljno)', value: 3, category: 'starter' },
        { text: 'Pola radnog vremena (30 sati)', value: 6, category: 'professional' },
        { text: 'Puno radno vreme (40+ sati)', value: 10, category: 'premium' },
      ],
      weight: 1,
    },
    {
      question: 'Koji su vaši poslovni ciljevi?',
      type: 'multiple_select' as const,
      answers: [
        { text: 'Dodatni izvor prihoda', value: 2, category: 'starter' },
        { text: 'Glavni izvor prihoda', value: 3, category: 'professional' },
        { text: 'Izgradnja lanca centara', value: 3, category: 'premium' },
        { text: 'Društveni uticaj u zajednici', value: 2, category: 'professional' },
        { text: 'Brzi povrat investicije', value: 2, category: 'premium' },
      ],
      weight: 1,
    },
    {
      question: 'Koliko vam je važna podrška franšizera?',
      type: 'scale' as const,
      weight: 1.5,
    },
    {
      question: 'Da li planirate da sami radite sa decom ili zaposlite edukatora?',
      type: 'multiple_choice' as const,
      answers: [
        { text: 'Sam/a ću raditi sa decom', value: 5, category: 'starter' },
        { text: 'Kombinacija - i ja i zaposleni', value: 7, category: 'professional' },
        { text: 'Zaposliću edukatora od početka', value: 10, category: 'premium' },
      ],
      weight: 1,
    },
    {
      question: 'Koliko brzo želite da otvorite centar?',
      type: 'multiple_choice' as const,
      answers: [
        { text: 'Što pre (u naredna 2 meseca)', value: 8, category: 'starter' },
        { text: 'Za 3-6 meseci', value: 10, category: 'professional' },
        { text: 'Za 6-12 meseci', value: 7, category: 'premium' },
        { text: 'Nisam u žurbi', value: 5, category: 'premium' },
      ],
      weight: 0.5,
    },
    {
      question: 'Da li imate prostor ili treba da ga pronađete?',
      type: 'multiple_choice' as const,
      answers: [
        { text: 'Imam adekvatan prostor', value: 10 },
        { text: 'Imam prostor ali treba adaptacija', value: 7 },
        { text: 'Treba mi pomoć u pronalaženju', value: 5 },
        { text: 'Tek ću tražiti prostor', value: 3 },
      ],
      weight: 1,
    },
  ],
  results: [
    {
      minScore: 75,
      maxScore: 100,
      title: 'Premium paket je idealan za vas!',
      description: 'Imate resurse, iskustvo i ambiciju za najveći uspeh. Premium paket vam pruža ekskluzivnu teritoriju, kompletnu podršku i najbolje uslove za brz rast.',
      recommendations: [
        'Ekskluzivna prava na teritoriju',
        'VIP obuka i mentoring program',
        'Kompletna oprema i softver',
        'Marketing podrška prve godine',
        'Pomoć pri zapošljavanju i obuci tima',
      ],
      ctaText: 'Rezervišite Premium paket',
      ctaLink: '/kontakt?paket=premium',
    },
    {
      minScore: 50,
      maxScore: 74,
      title: 'Professional paket savršeno vam odgovara!',
      description: 'Imate dobru osnovu za uspeh i ambiciju za rast. Professional paket pruža optimalnu ravnotežu podrške i samostalnosti.',
      recommendations: [
        'Napredna obuka (5 dana)',
        'Kompletan set materijala',
        'Softver za upravljanje centrom',
        'Marketing paketi i predlošci',
        'Godišnja podrška i konsultacije',
      ],
      ctaText: 'Izaberite Professional paket',
      ctaLink: '/kontakt?paket=professional',
    },
    {
      minScore: 25,
      maxScore: 49,
      title: 'Starter paket je pravi izbor za početak!',
      description: 'Počinjete svoju preduzetničku priču i trebate sigurnu osnovu. Starter paket vam omogućava ulazak u svet franšize sa minimalnim rizikom.',
      recommendations: [
        'Osnovna obuka (3 dana)',
        'Početni set materijala',
        'Online podrška 6 meseci',
        'Pristup osnovnim resursima',
        'Mogućnost nadogradnje paketa',
      ],
      ctaText: 'Počnite sa Starter paketom',
      ctaLink: '/kontakt?paket=starter',
    },
    {
      minScore: 0,
      maxScore: 24,
      title: 'Potrebno vam je više pripreme',
      description: 'Pre nego što uđete u franšizu, razmislite o dodatnoj pripremi. Možda je bolje početi kao partner ili prvo steći više iskustva.',
      recommendations: [
        'Prisustvujte našoj besplatnoj prezentaciji',
        'Razgovarajte sa postojećim franšizerima',
        'Razmotrite partnerski model',
        'Dodatno istražite svoje opcije',
      ],
      ctaText: 'Saznajte više',
      ctaLink: '/fransize',
    },
  ],
  leadMagnet: {
    enabled: true,
    title: 'Preuzmite detaljan vodič za franšize',
    description: 'Dobićete personalizovan vodič sa kompletnom analizom koji paket najbolje odgovara vašim ciljevima.',
    resource: 'guide',
  },
}

export default function FranchiseModelQuiz() {
  return <QuizComponent quizData={franchiseModelQuizData} quizType="franchise_model" />
}