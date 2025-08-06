import { StructureBuilder, StructureResolverContext } from 'sanity/structure'
import { BookIcon, StarIcon, UserIcon, DocumentsIcon, FolderIcon } from '@sanity/icons'
import { MapIcon } from 'lucide-react'

export const deskStructure = (S: StructureBuilder, context: StructureResolverContext) =>
  S.list()
    .title('Sadržaj')
    .items([
      // Početna stranica
      S.listItem()
        .title('Početna stranica')
        .child(
          S.list()
            .title('Početna stranica')
            .items([
              S.listItem()
                .title('Hero sekcija')
                .child(S.document().schemaType('homePage').documentId('homePage')),
              S.listItem()
                .title('Obaveštenja')
                .child(S.documentTypeList('notificationBar').title('Obaveštenja')),
              S.listItem()
                .title('Priče uspeha')
                .child(S.documentTypeList('successStory').title('Priče uspeha')),
              S.listItem()
                .title('Preporuke')
                .child(S.documentTypeList('testimonial').title('Preporuke')),
            ])
        ),

      S.divider(),

      // Metodologija
      S.listItem()
        .title('Metodologija')
        .child(
          S.list()
            .title('Metodologija')
            .items([
              S.listItem()
                .title('O metodologiji')
                .child(S.document().schemaType('methodology').documentId('methodology')),
              S.listItem()
                .title('Programi')
                .child(S.documentTypeList('program').title('Programi')),
            ])
        ),

      // O autorki
      S.listItem()
        .title('O autorki')
        .icon(UserIcon)
        .child(
          S.list()
            .title('O autorki')
            .items([
              S.listItem()
                .title('Biografija')
                .child(S.document().schemaType('author').documentId('author')),
              S.listItem()
                .title('Stranica o autorki')
                .child(S.documentTypeList('aboutAuthor').title('O autorki')),
              S.listItem()
                .title('Timeline')
                .child(S.documentTypeList('authorTimeline').title('Timeline')),
              S.listItem()
                .title('Dostignuća')
                .child(S.documentTypeList('authorAchievements').title('Dostignuća')),
              S.listItem()
                .title('Publikacije')
                .child(S.documentTypeList('publications').title('Publikacije')),
            ])
        ),

      // Franšiza
      S.listItem()
        .title('Franšiza')
        .child(
          S.list()
            .title('Franšiza')
            .items([
              S.listItem()
                .title('Kalkulatori')
                .child(
                  S.list()
                    .title('Kalkulatori')
                    .items([
                      S.listItem()
                        .title('Podešavanja kalkulatora')
                        .child(S.document().schemaType('calculatorSettings').documentId('calculatorSettings')),
                      S.listItem()
                        .title('Rezultati kalkulatora')
                        .child(S.documentTypeList('calculatorResult').title('Rezultati kalkulatora')),
                    ])
                ),
              S.listItem()
                .title('Kvizovi')
                .child(
                  S.list()
                    .title('Kvizovi')
                    .items([
                      S.listItem()
                        .title('Pitanja kvizova')
                        .child(S.documentTypeList('quiz').title('Pitanja kvizova')),
                      S.listItem()
                        .title('Rezultati kvizova')
                        .child(S.documentTypeList('quizResult').title('Rezultati kvizova')),
                    ])
                ),
              S.listItem()
                .title('Koraci franšize')
                .child(S.documentTypeList('franchiseSteps').title('Koraci franšize')),
              S.listItem()
                .title('Programi obuke')
                .child(S.documentTypeList('trainingProgram').title('Programi obuke')),
              S.divider(),
              S.listItem()
                .title('Prijava za franšizu')
                .child(
                  S.list()
                    .title('Prijava za franšizu')
                    .items([
                      S.listItem()
                        .title('Glavna aplikacija')
                        .child(S.documentTypeList('franchiseApplication').title('Aplikacije')),
                      S.listItem()
                        .title('Sekcije')
                        .child(S.documentTypeList('franchiseSection').title('Sekcije')),
                      S.listItem()
                        .title('Polja')
                        .child(S.documentTypeList('franchiseField').title('Polja')),
                      S.listItem()
                        .title('Motivacioni sadržaj')
                        .child(S.documentTypeList('franchiseMotivational').title('Motivacioni sadržaj')),
                      S.divider(),
                      S.listItem()
                        .title('Poslate prijave')
                        .child(S.documentTypeList('franchiseApplicationSubmission').title('Poslate prijave')),
                    ])
                ),
            ])
        ),

      // Učionica i resursi
      S.listItem()
        .title('Učionica i resursi')
        .child(
          S.list()
            .title('Učionica i resursi')
            .items([
              S.listItem()
                .title('3D Virtuelna učionica')
                .child(S.document().schemaType('virtualClassroom').documentId('virtualClassroom')),
              S.listItem()
                .title('Resursi za preuzimanje')
                .child(S.documentTypeList('resource').title('Resursi')),
              S.listItem()
                .title('Često postavljana pitanja')
                .child(S.documentTypeList('faq').title('FAQ')),
              S.listItem()
                .title('FAQ Kategorije')
                .icon(FolderIcon)
                .child(S.documentTypeList('faqCategory').title('FAQ Kategorije')),
            ])
        ),

      // Blog
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('Blog postovi')
                .child(S.documentTypeList('blogPost').title('Blog postovi')),
              S.listItem()
                .title('Kategorije')
                .child(S.documentTypeList('blogCategory').title('Kategorije')),
            ])
        ),

      // Knjige
      S.listItem()
        .title('Knjige')
        .icon(BookIcon)
        .child(
          S.list()
            .title('Knjige')
            .items([
              S.listItem()
                .title('Sve knjige')
                .child(S.documentTypeList('book').title('Knjige')),
              S.listItem()
                .title('Landing stranica')
                .child(S.document().schemaType('booksLanding').documentId('booksLanding')),
            ])
        ),

      // Priče o uspehu
      S.listItem()
        .title('Priče o uspehu')
        .icon(StarIcon)
        .child(S.documentTypeList('successStory').title('Priče o uspehu')),
      
      // Putovanja i iskustva
      S.listItem()
        .title('Putovanja')
        .icon(MapIcon)
        .child(S.documentTypeList('experience').title('Putovanja i iskustva')),

      // Kontakt i konsultacije
      S.listItem()
        .title('Kontakt i konsultacije')
        .child(
          S.list()
            .title('Kontakt i konsultacije')
            .items([
              S.listItem()
                .title('Zakazane konsultacije')
                .child(S.documentTypeList('booking').title('Zakazane konsultacije')),
              S.listItem()
                .title('Newsletter pretplatnici')
                .child(S.documentTypeList('newsletterSubscriber').title('Newsletter pretplatnici')),
            ])
        ),

      S.divider(),

      // Tim
      S.listItem()
        .title('Tim')
        .child(S.documentTypeList('teamMember').title('Članovi tima')),

      // Lokacije
      S.listItem()
        .title('Lokacije')
        .icon(MapIcon)
        .child(
          S.list()
            .title('Lokacije')
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

      S.divider(),

      // Podešavanja
      S.listItem()
        .title('Podešavanja')
        .child(
          S.list()
            .title('Podešavanja')
            .items([
              S.listItem()
                .title('Opšta podešavanja')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.listItem()
                .title('Navigacija')
                .child(S.document().schemaType('navigation').documentId('navigation')),
            ])
        ),

      // Stranice
      S.listItem()
        .title('Stranice')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Stranice')
            .items([
              S.listItem()
                .title('Opšte stranice')
                .child(
                  S.documentTypeList('page')
                    .title('Stranice')
                    .filter('_type == "page" && !(_id in ["locations-page", "drafts.locations-page"])')
                ),
              S.listItem()
                .title('Booking stranica')
                .child(S.documentTypeList('bookingPage').title('Booking stranica')),
              S.listItem()
                .title('Legal stranice')
                .child(S.documentTypeList('legalPage').title('Legal stranice')),
              S.listItem()
                .title('Error stranice')
                .child(S.documentTypeList('errorPage').title('Error stranice')),
            ])
        ),

      // Skriveni tipovi dokumenta koji se ne prikazuju u glavnoj navigaciji
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'homePage',
            'methodology',
            'author',
            'aboutAuthor',
            'authorTimeline',
            'authorAchievements',
            'publications',
            'program',
            'successStory',
            'testimonial',
            'notificationBar',
            'calculatorSettings',
            'calculatorResult',
            'quiz',
            'quizResult',
            'resource',
            'faq',
            'faqCategory',
            'blogPost',
            'blogCategory',
            'book',
            'booksLanding',
            'experience',
            'booking',
            'bookingPage',
            'newsletterSubscriber',
            'teamMember',
            'siteSettings',
            'navigation',
            'navigationSettings',
            'page',
            'locationData',
            'franchiseSteps',
            'trainingProgram',
            'franchiseApplication',
            'franchiseSection',
            'franchiseField',
            'franchiseMotivational',
            'franchiseApplicationSubmission',
            'legalPage',
            'errorPage',
            'virtualClassroom',
          ].includes(listItem.getId() ?? '')
      ),
    ])