import { StructureBuilder, StructureResolverContext } from 'sanity/structure'
import { 
  BookIcon, 
  StarIcon, 
  UserIcon, 
  DocumentsIcon, 
  FolderIcon,
  HomeIcon,
  CogIcon,
  UsersIcon,
  ComposeIcon,
  BillIcon,
  CalendarIcon,
  MenuIcon,
  HelpCircleIcon,
  TagIcon,
  TrendUpwardIcon,
  BulbOutlineIcon,
  EarthGlobeIcon,
  PinIcon,
  EnvelopeIcon,
  ChartUpwardIcon,
  BellIcon,
  RocketIcon
} from '@sanity/icons'

export const deskStructure = (S: StructureBuilder, context: StructureResolverContext) =>
  S.list()
    .title('Upravljanje franšizom - Admin Panel')
    .items([
      // HITNO - Nove prijave i važne akcije (PRIORITET)
      S.listItem()
        .title('HITNO - Nove prijave')
        .icon(BellIcon)
        .child(
          S.list()
            .title('Hitno za pregled - sve novo')
            .items([
              S.listItem()
                .title('NOVE PRIJAVE ZA FRANŠIZU')
                .icon(EnvelopeIcon)
                .child(S.documentTypeList('franchiseApplicationSubmission')
                  .title('Nove prijave za franšizu')
                  .defaultOrdering([{field: '_createdAt', direction: 'desc'}])),
              S.listItem()
                .title('Nove konsultacije')
                .icon(CalendarIcon)
                .child(S.documentTypeList('booking')
                  .title('Zakazane konsultacije')
                  .defaultOrdering([{field: '_createdAt', direction: 'desc'}])),
              S.listItem()
                .title('Novi newsletter pretplatnici')
                .icon(UsersIcon)
                .child(S.documentTypeList('newsletterSubscriber')
                  .title('Novi pretplatnici')
                  .defaultOrdering([{field: '_createdAt', direction: 'desc'}])),
            ])
        ),

      S.divider(),

      // UPRAVLJANJE FRANŠIZOM - Glavni fokus
      S.listItem()
        .title('Upravljanje franšizom')
        .icon(TrendUpwardIcon)
        .child(
          S.list()
            .title('Upravljanje franšizom - sve opcije')
            .items([
              // Upravljanje prijavama - NAJVAŽNIJE
              S.listItem()
                .title('Upravljanje prijavama (PRIORITET)')
                .icon(ComposeIcon)
                .child(
                  S.list()
                    .title('Upravljanje prijavama - prioritet')
                    .items([
                      S.listItem()
                        .title('SVE PRIJAVE - najnovije na vrhu')
                        .icon(EnvelopeIcon)
                        .child(S.documentTypeList('franchiseApplicationSubmission')
                          .title('Sve prijave za franšizu')
                          .defaultOrdering([{field: '_createdAt', direction: 'desc'}])),
                      S.divider(),
                      S.listItem()
                        .title('Podešavanje forme prijave')
                        .child(S.documentTypeList('franchiseApplication').title('Osnovna forma')),
                      S.listItem()
                        .title('Sekcije forme')
                        .child(S.documentTypeList('franchiseSection').title('Sekcije forme')),
                      S.listItem()
                        .title('Polja forme')
                        .child(S.documentTypeList('franchiseField').title('Polja forme')),
                      S.listItem()
                        .title('Motivacioni sadržaj')
                        .icon(StarIcon)
                        .child(S.documentTypeList('franchiseMotivational').title('Motivacioni sadržaj')),
                    ])
                ),
              
              S.divider(),
              
              // Sadržaj o franšizi
              S.listItem()
                .title('Informacije o franšizi')
                .child(
                  S.list()
                    .title('Sve informacije o franšizi')
                    .items([
                      S.listItem()
                        .title('Paketi franšize - ponuda')
                        .child(S.documentTypeList('franchisePackage').title('Paketi franšize')),
                      S.listItem()
                        .title('Modeli franšize - tipovi')
                        .child(S.documentTypeList('franchiseModelsPage').title('Modeli franšize')),
                      S.listItem()
                        .title('Kako se pridružiti - uputstvo')
                        .child(S.documentTypeList('howToJoinPage').title('Kako se pridružiti')),
                      S.listItem()
                        .title('Koraci do franšize')
                        .child(S.documentTypeList('franchiseSteps').title('Koraci franšize')),
                      S.divider(),
                      S.listItem()
                        .title('Naše škole')
                        .icon(BookIcon)
                        .child(S.documentTypeList('school').title('Sve škole')),
                      S.listItem()
                        .title('Stranica sa školama')
                        .child(S.documentTypeList('schoolsPage').title('Stranica škola')),
                    ])
                ),

              S.divider(),
              
              // Finansijski kalkulatori
              S.listItem()
                .title('Finansijski kalkulatori')
                .icon(BillIcon)
                .child(
                  S.list()
                    .title('Finansijski alati i kalkulatori')
                    .items([
                      S.listItem()
                        .title('Stranica kalkulatora')
                        .child(S.documentTypeList('financialCalculatorPage').title('Stranica kalkulatora')),
                      S.listItem()
                        .title('Podešavanja - brojevi i formule')
                        .icon(CogIcon)
                        .child(S.document().schemaType('calculatorSettings').documentId('calculatorSettings')),
                      S.listItem()
                        .title('Rezultati koje su korisnici dobili')
                        .icon(ChartUpwardIcon)
                        .child(S.documentTypeList('calculatorResult')
                          .title('Rezultati kalkulatora')
                          .defaultOrdering([{field: '_createdAt', direction: 'desc'}])),
                    ])
                ),
            ])
        ),

      S.divider(),

      // SADRŽAJ SAJTA
      S.listItem()
        .title('Sadržaj sajta')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Sadržaj sajta - sve stranice i postovi')
            .items([
              // Blog
              S.listItem()
                .title('Blog')
                .icon(ComposeIcon)
                .child(
                  S.list()
                    .title('Blog - postovi i kategorije')
                    .items([
                      S.listItem()
                        .title('Blog postovi')
                        .child(S.documentTypeList('blogPost').title('Blog postovi')),
                      S.listItem()
                        .title('Kategorije bloga')
                        .icon(TagIcon)
                        .child(S.documentTypeList('blogCategory').title('Kategorije bloga')),
                    ])
                ),

              // Obrazovni sadržaj
              S.listItem()
                .title('Obrazovni sadržaj')
                .icon(BookIcon)
                .child(
                  S.list()
                    .title('Obrazovni sadržaj - metodologija, programi')
                    .items([
                      S.listItem()
                        .title('Metodologija')
                        .child(S.document().schemaType('methodology').documentId('methodology')),
                      S.listItem()
                        .title('Programi')
                        .child(S.documentTypeList('program').title('Programi')),
                      S.listItem()
                        .title('Programi obuke')
                        .child(S.documentTypeList('trainingProgram').title('Programi obuke')),
                      S.listItem()
                        .title('3D Virtuelna učionica')
                        .child(S.document().schemaType('virtualClassroom').documentId('virtualClassroom')),
                      S.listItem()
                        .title('Resursi za preuzimanje')
                        .child(S.documentTypeList('resource').title('Resursi')),
                    ])
                ),

              // Knjige i publikacije
              S.listItem()
                .title('Knjige i publikacije')
                .icon(BookIcon)
                .child(
                  S.list()
                    .title('Knjige i publikacije')
                    .items([
                      S.listItem()
                        .title('Sve knjige')
                        .child(S.documentTypeList('book').title('Knjige')),
                      S.listItem()
                        .title('Landing stranica knjiga')
                        .child(S.document().schemaType('booksLanding').documentId('booksLanding')),
                      S.listItem()
                        .title('Publikacije')
                        .child(S.documentTypeList('publications').title('Publikacije')),
                    ])
                ),
            ])
        ),

      S.divider(),

      // PREPORUKE I TIM
      S.listItem()
        .title('Preporuke i naš tim')
        .icon(UsersIcon)
        .child(
          S.list()
            .title('Ljudi, preporuke i priče uspeha')
            .items([
              // Informacije o autorki
              S.listItem()
                .title('O autorki')
                .icon(UserIcon)
                .child(
                  S.list()
                    .title('Sve o autorki')
                    .items([
                      S.listItem()
                        .title('Biografija autorke')
                        .child(S.document().schemaType('author').documentId('author')),
                      S.listItem()
                        .title('Stranica o autorki')
                        .child(S.documentTypeList('aboutAuthor').title('O autorki')),
                      S.listItem()
                        .title('Vremenska linija')
                        .child(S.documentTypeList('authorTimeline').title('Timeline')),
                      S.listItem()
                        .title('Dostignuća')
                        .icon(StarIcon)
                        .child(S.documentTypeList('authorAchievements').title('Dostignuća')),
                    ])
                ),

              // Tim
              S.listItem()
                .title('Naš tim')
                .icon(UsersIcon)
                .child(S.documentTypeList('teamMember').title('Članovi tima')),

              // Priče uspeha i preporuke
              S.listItem()
                .title('Priče uspeha i preporuke')
                .icon(StarIcon)
                .child(
                  S.list()
                    .title('Priče uspeha i preporuke')
                    .items([
                      S.listItem()
                        .title('Priče uspeha')
                        .child(S.documentTypeList('successStory').title('Priče uspeha')),
                      S.listItem()
                        .title('Preporuke')
                        .child(S.documentTypeList('testimonial').title('Preporuke')),
                    ])
                ),
            ])
        ),

      S.divider(),

      // KOMUNIKACIJA SA KLIJENTIMA
      S.listItem()
        .title('Komunikacija sa klijentima')
        .icon(EnvelopeIcon)
        .child(
          S.list()
            .title('Komunikacija - konsultacije, FAQ, newsletter')
            .items([
              // Konsultacije i zakazivanje
              S.listItem()
                .title('Konsultacije - zakazivanje')
                .icon(CalendarIcon)
                .child(
                  S.list()
                    .title('Konsultacije i zakazivanje termina')
                    .items([
                      S.listItem()
                        .title('SVE ZAKAZANE KONSULTACIJE')
                        .child(S.documentTypeList('booking')
                          .title('Sve konsultacije')
                          .defaultOrdering([{field: '_createdAt', direction: 'desc'}])),
                      S.listItem()
                        .title('Podešavanje stranice za booking')
                        .child(S.documentTypeList('bookingPage').title('Booking stranica')),
                    ])
                ),

              // Newsletter
              S.listItem()
                .title('Newsletter pretplate')
                .icon(EnvelopeIcon)
                .child(
                  S.list()
                    .title('Newsletter - svi pretplatnici')
                    .items([
                      S.listItem()
                        .title('SVI PRETPLATNICI - najnoviji na vrhu')
                        .child(S.documentTypeList('newsletterSubscriber')
                          .title('Newsletter pretplatnici')
                          .defaultOrdering([{field: '_createdAt', direction: 'desc'}])),
                    ])
                ),

              // FAQ i podrška
              S.listItem()
                .title('Česta pitanja (FAQ)')
                .icon(HelpCircleIcon)
                .child(
                  S.list()
                    .title('Često postavljana pitanja i podrška')
                    .items([
                      S.listItem()
                        .title('Sva pitanja i odgovori')
                        .child(S.documentTypeList('faq').title('FAQ pitanja')),
                      S.listItem()
                        .title('Kategorije FAQ pitanja')
                        .icon(FolderIcon)
                        .child(S.documentTypeList('faqCategory').title('FAQ Kategorije')),
                    ])
                ),
            ])
        ),

      S.divider(),

      // LOKACIJE
      S.listItem()
        .title('Lokacije i putovanja')
        .icon(EarthGlobeIcon)
        .child(
          S.list()
            .title('Lokacije, putovanja i iskustva')
            .items([
              // Lokacije
              S.listItem()
                .title('Lokacije')
                .icon(PinIcon)
                .child(
                  S.list()
                    .title('Sve lokacije')
                    .items([
                      S.listItem()
                        .title('Stranica lokacija')
                        .child(
                          S.document()
                            .schemaType('page')
                            .documentId('locations-page')
                            .title('Lokacije stranica')
                        ),
                      S.listItem()
                        .title('Podaci o lokacijama')
                        .child(S.documentTypeList('locationData').title('Podaci o lokacijama')),
                    ])
                ),

              // Putovanja i iskustva
              S.listItem()
                .title('Putovanja i iskustva')
                .icon(EarthGlobeIcon)
                .child(S.documentTypeList('experience').title('Putovanja i iskustva')),
            ])
        ),

      S.divider(),
      
      // OSNOVNO PODEŠAVANJE SAJTA
      S.listItem()
        .title('Osnovna podešavanja sajta')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Osnovna podešavanja - važno!')
            .items([
              S.listItem()
                .title('GLAVNA STRANICA')
                .icon(HomeIcon)
                .child(S.document().schemaType('homePage').documentId('homePage')),
              S.listItem()
                .title('Osnovna podešavanja sajta')
                .icon(CogIcon)
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.listItem()
                .title('Meni navigacija')
                .icon(MenuIcon)
                .child(S.document().schemaType('navigation').documentId('navigation')),
              S.listItem()
                .title('Obaveštenja na sajtu')
                .icon(BulbOutlineIcon)
                .child(S.documentTypeList('notificationBar').title('Obaveštenja')),
              S.divider(),
              S.listItem()
                .title('Ostale stranice sajta')
                .child(
                  S.documentTypeList('page')
                    .title('Opšte stranice')
                    .filter('_type == "page" && !(_id in ["locations-page", "drafts.locations-page"])')
                ),
              S.listItem()
                .title('Legal stranice (uslovi, privatnost)')
                .child(S.documentTypeList('legalPage').title('Legal stranice')),
              S.listItem()
                .title('Error stranice (404, 500)')
                .child(S.documentTypeList('errorPage').title('Error stranice')),
            ])
        ),

      // Napredne opcije samo za tehničke korisnike (skriveno od glavnog pogleda)
      // Sve ostale sheme su organizovane u gornje kategorije za lakše korišćenje
    ])

// Napomene za franchise vlasnike:
// 1. 'HITNO' sekcija - ovde ćete naći sve nove prijave
// 2. 'Upravljanje franšizom' - glavni alat za vaš posao
// 3. 'Osnovna podešavanja' - menjajte samo ako ste sigurni
// 4. Sve ostalo je organizovano intuitivno sa jasnim imenima