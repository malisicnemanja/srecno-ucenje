import { StructureBuilder, StructureResolverContext } from 'sanity/structure'

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
                .title('Statistike')
                .child(S.documentTypeList('statistic').title('Statistike')),
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
              S.listItem()
                .title('O autorki')
                .child(S.document().schemaType('author').documentId('author')),
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
                .title('Resursi za preuzimanje')
                .child(S.documentTypeList('resource').title('Resursi')),
              S.listItem()
                .title('Često postavljana pitanja')
                .child(S.documentTypeList('faq').title('FAQ')),
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
        .child(
          S.document()
            .schemaType('page')
            .documentId('locations-page')
            .title('Lokacije stranica')
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

      // Ostale stranice
      S.listItem()
        .title('Ostale stranice')
        .child(
          S.documentTypeList('page')
            .title('Stranice')
            .filter('_type == "page" && !(_id in ["locations-page", "drafts.locations-page"])')
        ),

      // Skriveni tipovi dokumenta koji se ne prikazuju u glavnoj navigaciji
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'homePage',
            'methodology',
            'author',
            'program',
            'successStory',
            'testimonial',
            'statistic',
            'notificationBar',
            'calculatorSettings',
            'calculatorResult',
            'quiz',
            'quizResult',
            'resource',
            'faq',
            'blogPost',
            'blogCategory',
            'booking',
            'newsletterSubscriber',
            'teamMember',
            'siteSettings',
            'navigationSettings',
            'page',
          ].includes(listItem.getId() ?? '')
      ),
    ])