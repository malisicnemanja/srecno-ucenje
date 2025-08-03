'use client'

import QuizComponent from './QuizComponent'

const educatorQuizData = {
  title: 'Da li ste rođeni edukator?',
  description: 'Otkrijte da li imate prirodne predispozicije za rad sa decom i vođenje obrazovnog centra.',
  questions: [
    {
      question: 'Koliko uživate u radu sa decom?',
      type: 'scale' as const,
      weight: 2,
    },
    {
      question: 'Da li imate iskustva u obrazovanju ili radu sa decom?',
      type: 'multiple_choice' as const,
      answers: [
        { text: 'Da, profesionalno iskustvo više od 5 godina', value: 10 },
        { text: 'Da, profesionalno iskustvo 1-5 godina', value: 8 },
        { text: 'Imam neformalno iskustvo (volontiranje, porodica)', value: 6 },
        { text: 'Nemam iskustvo ali želim da učim', value: 4 },
        { text: 'Nemam iskustvo', value: 2 },
      ],
      weight: 1.5,
    },
    {
      question: 'Kako reagujete kada dete ne razume nešto nakon prvog objašnjenja?',
      type: 'multiple_choice' as const,
      answers: [
        { text: 'Strpljivo pokušavam različite načine objašnjavanja', value: 10 },
        { text: 'Dajem detetu vreme da razmisli pa pokušavam ponovo', value: 8 },
        { text: 'Tražim pomoć kolege ili materijale', value: 6 },
        { text: 'Frustriram se ali nastavljam', value: 4 },
        { text: 'Lako gubim strpljenje', value: 2 },
      ],
      weight: 2,
    },
    {
      question: 'Da li volite da učite nove metode i pristupe?',
      type: 'boolean' as const,
      weight: 1,
    },
    {
      question: 'Koje od sledećih veština posedate?',
      type: 'multiple_select' as const,
      answers: [
        { text: 'Kreativnost u osmišljavanju aktivnosti', value: 2 },
        { text: 'Organizacione sposobnosti', value: 2 },
        { text: 'Komunikacijske veštine', value: 2 },
        { text: 'Emotivna inteligencija', value: 2 },
        { text: 'Liderske sposobnosti', value: 2 },
      ],
      weight: 1,
    },
    {
      question: 'Koliko ste spremni da investirate vreme u kontinuirano usavršavanje?',
      type: 'scale' as const,
      weight: 1.5,
    },
    {
      question: 'Da li imate viziju kako bi vaš idealan obrazovni centar izgledao?',
      type: 'boolean' as const,
      weight: 1.5,
    },
    {
      question: 'Kako se osećate kada vidite napredak kod deteta?',
      type: 'multiple_choice' as const,
      answers: [
        { text: 'To mi je najveća nagrada i motivacija', value: 10 },
        { text: 'Osećam veliko zadovoljstvo', value: 8 },
        { text: 'Prijatno mi je', value: 6 },
        { text: 'OK je, to je deo posla', value: 4 },
        { text: 'Ne pridajem tome poseban značaj', value: 2 },
      ],
      weight: 2,
    },
  ],
  results: [
    {
      minScore: 80,
      maxScore: 100,
      title: 'Rođeni ste edukator!',
      description: 'Imate sve predispozicije za uspešno vođenje obrazovnog centra. Vaša strast prema radu sa decom, strpljenje i želja za učenjem čine vas idealnim kandidatom.',
      recommendations: [
        'Razmislite o otvaranju Srećno učenje centra',
        'Istražite naše franšizne modele',
        'Zakažite konsultacije sa našim timom',
        'Prisustvujte našoj besplatnoj prezentaciji',
      ],
      ctaText: 'Započnite svoju priču',
      ctaLink: '/kontakt',
    },
    {
      minScore: 60,
      maxScore: 79,
      title: 'Imate veliki potencijal!',
      description: 'Pokazujete značajne predispozicije za rad u obrazovanju. Sa pravom podrškom i obukom, možete postati odličan edukator.',
      recommendations: [
        'Razmotrite našu obuku za franšizere',
        'Posetite neki od naših centara',
        'Razgovarajte sa postojećim partnerima',
        'Istražite materijale o našoj metodologiji',
      ],
      ctaText: 'Saznajte više o obuci',
      ctaLink: '/metodologija',
    },
    {
      minScore: 40,
      maxScore: 59,
      title: 'Imate osnovu za razvoj',
      description: 'Iako nemate sva iskustva, pokazujete interes i volju. Sa adekvatnom pripremom možete razviti potrebne veštine.',
      recommendations: [
        'Počnite sa volontiranjem u obrazovnim institucijama',
        'Pročitajte našu literaturu o metodologiji',
        'Prisustvujte radionicama za edukatore',
        'Razmislite o partnerstvu sa iskusnim edukatorom',
      ],
      ctaText: 'Istražite mogućnosti',
      ctaLink: '/programi',
    },
    {
      minScore: 0,
      maxScore: 39,
      title: 'Razmislite o drugim opcijama',
      description: 'Možda direktan rad sa decom nije vaš put, ali postoje i druge mogućnosti uključivanja u obrazovni sektor.',
      recommendations: [
        'Razmotrite ulogu investitora u franšizi',
        'Istražite administrativne pozicije',
        'Razmislite o partnerstvu sa edukatorom',
        'Pogledajte druge poslovne mogućnosti',
      ],
      ctaText: 'Druge mogućnosti',
      ctaLink: '/fransize',
    },
  ],
  leadMagnet: {
    enabled: true,
    title: 'Dobijte personalizovan plan razvoja',
    description: 'Na osnovu vaših odgovora, pripremićemo detaljan plan kako da razvijete svoje edukatorske veštine.',
    resource: 'report',
  },
}

export default function EducatorQuiz() {
  return <QuizComponent quizData={educatorQuizData} quizType="educator" />
}