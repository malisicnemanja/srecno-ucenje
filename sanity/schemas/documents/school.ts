import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export default defineType({
  name: 'school',
  title: 'Školice',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Naziv školice',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL putanja',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'city',
      title: 'Grad',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'address',
      title: 'Adresa',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'coordinates',
      title: 'Koordinate',
      type: 'object',
      fields: [
        {
          name: 'lat',
          title: 'Latitude',
          type: 'number',
          validation: Rule => Rule.required()
        },
        {
          name: 'lng',
          title: 'Longitude',
          type: 'number',
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'contact',
      title: 'Kontakt informacije',
      type: 'object',
      fields: [
        { name: 'phone', title: 'Telefon', type: 'string', validation: Rule => Rule.required() },
        { name: 'email', title: 'Email', type: 'string', validation: Rule => Rule.required().email() },
        { name: 'website', title: 'Website', type: 'url' },
        { name: 'socialMedia', title: 'Društvene mreže', type: 'object', fields: [
          { name: 'facebook', title: 'Facebook', type: 'url' },
          { name: 'instagram', title: 'Instagram', type: 'url' },
          { name: 'youtube', title: 'YouTube', type: 'url' }
        ]}
      ]
    }),
    defineField({
      name: 'workingHours',
      title: 'Radno vreme',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'day', title: 'Dan', type: 'string', options: {
              list: [
                { title: 'Ponedeljak', value: 'monday' },
                { title: 'Utorak', value: 'tuesday' },
                { title: 'Sreda', value: 'wednesday' },
                { title: 'Četvrtak', value: 'thursday' },
                { title: 'Petak', value: 'friday' },
                { title: 'Subota', value: 'saturday' },
                { title: 'Nedelja', value: 'sunday' }
              ]
            }, validation: Rule => Rule.required() },
            { name: 'openTime', title: 'Vreme otvaranja', type: 'string' },
            { name: 'closeTime', title: 'Vreme zatvaranja', type: 'string' },
            { name: 'closed', title: 'Zatvoreno', type: 'boolean', initialValue: false }
          ]
        }
      ]
    }),
    defineField({
      name: 'franchisee',
      title: 'Franšizer',
      type: 'object',
      fields: [
        { name: 'name', title: 'Ime i prezime', type: 'string', validation: Rule => Rule.required() },
        { name: 'photo', title: 'Fotografija', type: 'image', options: { hotspot: true } },
        { name: 'bio', title: 'Biografija', type: 'array', of: [{ type: 'block' }] },
        { name: 'experience', title: 'Iskustvo', type: 'text' },
        { name: 'education', title: 'Obrazovanje', type: 'text' },
        { name: 'specializations', title: 'Specijalnosti', type: 'array', of: [{ type: 'string' }] },
        { name: 'achievements', title: 'Dostignuti rezultati', type: 'array', of: [
          {
            type: 'object',
            fields: [
              { name: 'title', title: 'Naslov', type: 'string', validation: Rule => Rule.required() },
              { name: 'description', title: 'Opis', type: 'text' },
              { name: 'date', title: 'Datum', type: 'date' }
            ]
          }
        ]},
        { name: 'quote', title: 'Lični citat', type: 'text' }
      ]
    }),
    defineField({
      name: 'schoolInfo',
      title: 'Informacije o školici',
      type: 'object',
      fields: [
        { name: 'capacity', title: 'Kapacitet', type: 'number' },
        { name: 'establishedDate', title: 'Datum osnivanja', type: 'date' },
        { name: 'spaceSize', title: 'Veličina prostora (m²)', type: 'number' },
        { name: 'numberOfRooms', title: 'Broj soba', type: 'number' },
        { name: 'parking', title: 'Parking', type: 'boolean', initialValue: false },
        { name: 'accessibility', title: 'Prilaz za osobe sa invaliditetom', type: 'boolean', initialValue: false }
      ]
    }),
    defineField({
      name: 'programs',
      title: 'Dostupni programi',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'program' } }]
    }),
    defineField({
      name: 'specialties',
      title: 'Specijalnosti',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Preškolski program', value: 'preschool' },
          { title: 'Školski program', value: 'school' },
          { title: 'Rad sa decom sa teškoćama', value: 'special-needs' },
          { title: 'Pripremna nastava', value: 'preparation' },
          { title: 'Individualne konsultacije', value: 'individual' },
          { title: 'Rođendani', value: 'birthdays' },
          { title: 'Letnji kamp', value: 'summer-camp' },
          { title: 'Zimski kamp', value: 'winter-camp' },
          { title: 'Radionice za roditelje', value: 'parent-workshops' }
        ]
      }
    }),
    defineField({
      name: 'images',
      title: 'Fotografije',
      type: 'object',
      fields: [
        { name: 'featured', title: 'Glavna slika', type: 'image', options: { hotspot: true }, validation: Rule => Rule.required() },
        { name: 'gallery', title: 'Galerija', type: 'array', of: [
          {
            type: 'object',
            fields: [
              { name: 'image', title: 'Slika', type: 'image', options: { hotspot: true }, validation: Rule => Rule.required() },
              { name: 'caption', title: 'Opis', type: 'string' },
              { name: 'category', title: 'Kategorija', type: 'string', options: {
                list: [
                  { title: 'Enterijer', value: 'interior' },
                  { title: 'Eksterijer', value: 'exterior' },
                  { title: 'Aktivnosti', value: 'activities' },
                  { title: 'Tim', value: 'team' },
                  { title: 'Oprema', value: 'equipment' }
                ]
              }}
            ]
          }
        ]}
      ]
    }),
    defineField({
      name: 'successStories',
      title: 'Priče uspeha',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'childName', title: 'Ime deteta (inicijali)', type: 'string', validation: Rule => Rule.required() },
            { name: 'age', title: 'Uzrast', type: 'number' },
            { name: 'challenge', title: 'Izazov', type: 'text', validation: Rule => Rule.required() },
            { name: 'solution', title: 'Rešenje', type: 'text', validation: Rule => Rule.required() },
            { name: 'result', title: 'Rezultat', type: 'text', validation: Rule => Rule.required() },
            { name: 'parentTestimonial', title: 'Preporuka roditelja', type: 'text' },
            { name: 'duration', title: 'Vreme rada', type: 'string' },
            { name: 'photo', title: 'Fotografija', type: 'image', options: { hotspot: true } }
          ]
        }
      ]
    }),
    defineField({
      name: 'testimonials',
      title: 'Preporuke',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'testimonial' } }]
    }),
    defineField({
      name: 'pricing',
      title: 'Cenovnik',
      type: 'object',
      fields: [
        { name: 'programs', title: 'Programi', type: 'array', of: [
          {
            type: 'object',
            fields: [
              { name: 'name', title: 'Naziv programa', type: 'string', validation: Rule => Rule.required() },
              { name: 'price', title: 'Cena', type: 'number', validation: Rule => Rule.required() },
              { name: 'currency', title: 'Valuta', type: 'string', initialValue: 'RSD' },
              { name: 'duration', title: 'Trajanje', type: 'string' },
              { name: 'sessions', title: 'Broj časova', type: 'number' },
              { name: 'description', title: 'Opis', type: 'text' }
            ]
          }
        ]},
        { name: 'packages', title: 'Paketi', type: 'array', of: [
          {
            type: 'object',
            fields: [
              { name: 'name', title: 'Naziv paketa', type: 'string', validation: Rule => Rule.required() },
              { name: 'originalPrice', title: 'Originalna cena', type: 'number' },
              { name: 'discountedPrice', title: 'Cena sa popustom', type: 'number', validation: Rule => Rule.required() },
              { name: 'savings', title: 'Ušteda', type: 'string' },
              { name: 'includes', title: 'Šta obuhvata', type: 'array', of: [{ type: 'string' }] },
              { name: 'validUntil', title: 'Važi do', type: 'date' }
            ]
          }
        ]}
      ]
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Aktivna', value: 'active' },
          { title: 'Uskoro', value: 'coming-soon' },
          { title: 'U pripremi', value: 'in-preparation' },
          { title: 'Zatvorena', value: 'closed' }
        ]
      },
      initialValue: 'active',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'featured',
      title: 'Istaknuta',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'order',
      title: 'Redosled prikaza',
      type: 'number',
      initialValue: 0
    }),
    defineField({
      name: 'seo',
      title: 'SEO podešavanja',
      type: 'seo'
    })
  ],
  orderings: [
    {
      title: 'Po redosledu',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    },
    {
      title: 'Po gradu',
      name: 'cityAsc',
      by: [{ field: 'city', direction: 'asc' }]
    },
    {
      title: 'Po datumu osnivanja',
      name: 'establishedDesc',
      by: [{ field: 'schoolInfo.establishedDate', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'city',
      status: 'status',
      media: 'images.featured',
      featured: 'featured'
    },
    prepare({ title, subtitle, status, media, featured }) {
      const statusLabel = {
        'active': 'Aktivna',
        'coming-soon': 'Uskoro',
        'in-preparation': 'U pripremi',
        'closed': 'Zatvorena'
      }
      return {
        title: `${title} ${featured ? '(Istaknuta)' : ''}`,
        subtitle: `${subtitle} - ${statusLabel[status as keyof typeof statusLabel] || status}`,
        media
      }
    }
  }
})