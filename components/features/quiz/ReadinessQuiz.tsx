'use client'

import QuizComponent from './QuizComponent'

const readinessQuizData = {
  title: 'Da li ste spremni za franšizu?',
  description: 'Procenite svoju spremnost da postanete deo Srećno učenje franšizne mreže.',
  questions: [
    {
      question: 'Da li ste spremni da sledite utvrđene standarde i procedure franšize?',
      type: 'scale' as const,
      weight: 2,
    },
    {
      question: 'Kako reagujete na promene i nove izazove?',
      type: 'multiple_choice' as const,
      answers: [
        { text: 'Uzbuđen/a sam i jedva čekam', value: 10 },
        { text: 'Prilagođavam se uz malo vremena', value: 7 },
        { text: 'Preferiram stabilnost ali mogu da se prilagodim', value: 5 },
        { text: 'Teško mi je da prihvatim promene', value: 2 },
      ],
      weight: 1.5,
    },
    {
      question: 'Da li imate podršku porodice za ovaj poduhvat?',
      type: 'boolean' as const,
      weight: 1.5,
    },
    {
      question: 'Koliko ste upoznati sa lokalnim tržištem i konkurencijom?',
      type: 'multiple_choice' as const,
      answers: [
        { text: 'Odlično poznajem tržište i imam kontakte', value: 10 },
        { text: 'Solidno sam upoznat/a', value: 7 },
        { text: 'Imam osnovno znanje', value: 5 },
        { text: 'Tek treba da istražim', value: 3 },
      ],
      weight: 1,
    },
    {
      question: 'Koje su vaše jake strane?',
      type: 'multiple_select' as const,
      answers: [
        { text: 'Upornost i posvećenost', value: 2 },
        { text: 'Timski rad', value: 2 },
        { text: 'Finansijska disciplina', value: 2 },
        { text: 'Marketing i prodaja', value: 2 },
        { text: 'Organizacione sposobnosti', value: 2 },
      ],
      weight: 1,
    },
    {
      question: 'Da li ste spremni da radite i vikendom kada je potrebno?',
      type: 'boolean' as const,
      weight: 1,
    },
    {
      question: 'Kako procenjujete svoju finansijsku situaciju?',
      type: 'multiple_choice' as const,
      answers: [
        { text: 'Imam dovoljno sredstava i rezervu', value: 10 },
        { text: 'Imam početnu investiciju i plan za dalje', value: 8 },
        { text: 'Treba mi kredit ali imam dobar plan', value: 6 },
        { text: 'Finansije su mi najveći izazov', value: 3 },
      ],
      weight: 2,
    },
    {
      question: 'Koliko dugo ste razmišljali o pokretanju sopstvenog biznisa?',
      type: 'multiple_choice' as const,
      answers: [
        { text: 'Više od 2 godine, ovo je pravi trenutak', value: 10 },
        { text: '6 meseci do godinu dana', value: 7 },
        { text: 'Nekoliko meseci', value: 5 },
        { text: 'Tek sam počeo/la da razmišljam', value: 3 },
      ],
      weight: 1,
    },
    {
      question: 'Koliko vam je važan balans između poslovnog i privatnog života?',
      type: 'scale' as const,
      weight: 0.5,
    },
    {
      question: 'Da li ste spremni da kontinuirano učite i usavršavate se?',
      type: 'boolean' as const,
      weight: 1.5,
    },
  ],
  results: [
    {
      minScore: 80,
      maxScore: 100,
      title: 'Potpuno ste spremni!',
      description: 'Pokazujete izuzetnu spremnost za ulazak u franšizni sistem. Imate sve predispozicije za uspeh - finansije, motivaciju, podršku i pravo razumevanje franšiznog poslovanja.',
      recommendations: [
        'Odmah zakažite sastanak sa našim timom',
        'Pripremite biznis plan',
        'Počnite tražiti idealan prostor',
        'Upoznajte se sa našim uspešnim franšizerima',
      ],
      ctaText: 'Započnite proces apliciranja',
      ctaLink: '/kontakt',
    },
    {
      minScore: 60,
      maxScore: 79,
      title: 'Vrlo ste blizu spremnosti!',
      description: 'Imate solidnu osnovu ali trebate još malo pripreme. Fokusirajte se na oblasti koje treba ojačati pre konačne odluke.',
      recommendations: [
        'Dodatno istražite finansijske opcije',
        'Posetite naše centre i razgovarajte sa vlasnicima',
        'Prisustvujte Discovery Day događaju',
        'Radite na biznis planu',
      ],
      ctaText: 'Prijavite se za Discovery Day',
      ctaLink: '/kontakt',
    },
    {
      minScore: 40,
      maxScore: 59,
      title: 'Potrebna vam je dodatna priprema',
      description: 'Pokazujete potencijal ali još uvek niste potpuno spremni. Preporučujemo da radite na određenim oblastima pre donošenja odluke.',
      recommendations: [
        'Dodatno istražite franšizni model poslovanja',
        'Radite na finansijskoj stabilnosti',
        'Razgovarajte sa porodicom o podršci',
        'Steknite više znanja o lokalnom tržištu',
      ],
      ctaText: 'Preuzmite vodič za pripremu',
      ctaLink: '/resursi',
    },
    {
      minScore: 0,
      maxScore: 39,
      title: 'Još nije vreme',
      description: 'Trenutno niste spremni za franšizu, ali ne odustajte! Sa pravom pripremom i radom na sebi, možete dostići spremnost.',
      recommendations: [
        'Fokusirajte se na finansijsku stabilnost',
        'Steknite više poslovnog iskustva',
        'Istražite druge opcije saradnje',
        'Pratite naš blog i resurse za učenje',
      ],
      ctaText: 'Ostanite u kontaktu',
      ctaLink: '/kontakt',
    },
  ],
  leadMagnet: {
    enabled: true,
    title: 'Dobijte personalizovan akcioni plan',
    description: 'Na osnovu vaših rezultata, pripremićemo korak-po-korak plan kako da dostignete potpunu spremnost za franšizu.',
    resource: 'report',
  },
}

export default function ReadinessQuiz() {
  return <QuizComponent quizData={readinessQuizData} quizType="readiness" />
}