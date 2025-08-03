import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aboutAuthor',
  title: 'O autorki',
  type: 'document',
  groups: [
    {
      name: 'hero',
      title: 'Hero sekcija',
    },
    {
      name: 'content',
      title: 'Sadržaj',
    },
    {
      name: 'timeline',
      title: 'Vremenska linija',
    },
    {
      name: 'achievements',
      title: 'Dostignuća',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // Hero sekcija
    defineField({
      name: 'heroTitle',
      title: 'Hero naslov',
      type: 'string',
      group: 'hero',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero podnaslov',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero slika',
      type: 'image',
      group: 'hero',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt tekst',
        }
      ],
    }),
    defineField({
      name: 'heroBackground',
      title: 'Hero pozadinska slika',
      type: 'image',
      group: 'hero',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt tekst',
        }
      ],
    }),
    
    // Glavni sadržaj sekcije
    defineField({
      name: 'sections',
      title: 'Sekcije sadržaja',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Naslov sekcije',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'content',
              title: 'Sadržaj',
              type: 'array',
              of: [{ type: 'block' }],
            },
            {
              name: 'image',
              title: 'Slika',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alt tekst',
                }
              ],
            },
            {
              name: 'imagePosition',
              title: 'Pozicija slike',
              type: 'string',
              options: {
                list: [
                  { title: 'Levo', value: 'left' },
                  { title: 'Desno', value: 'right' },
                ],
              },
              initialValue: 'right',
            },
            {
              name: 'backgroundColor',
              title: 'Boja pozadine',
              type: 'string',
              options: {
                list: [
                  { title: 'Bela', value: '#FFFFFF' },
                  { title: 'Svetlo žuta', value: '#FFF9E6' },
                  { title: 'Svetlo plava', value: '#E3F2FD' },
                  { title: 'Svetlo ljubičasta', value: '#F3E5F5' },
                  { title: 'Svetlo narandžasta', value: '#FFF3E0' },
                  { title: 'Svetlo zelena', value: '#E8F5E9' },
                ],
              },
              initialValue: '#FFFFFF',
            },
            {
              name: 'decorativeElement',
              title: 'Dekorativni element',
              type: 'string',
              options: {
                list: [
                  { title: 'Plutajuće knjige', value: 'floating-books' },
                  { title: 'Biljka rasta', value: 'growth-plant' },
                  { title: 'Magijske zvezde', value: 'magic-sparkles' },
                  { title: 'Otvorena knjiga', value: 'open-book' },
                  { title: 'Zvezde nagrada', value: 'award-stars' },
                  { title: 'Nema', value: 'none' },
                ],
              },
              initialValue: 'none',
            },
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
        },
      ],
    }),
    
    // Vremenska linija
    defineField({
      name: 'timeline',
      title: 'Vremenska linija',
      type: 'array',
      group: 'timeline',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'year',
              title: 'Godina',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'title',
              title: 'Naslov događaja',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'description',
              title: 'Opis',
              type: 'text',
            },
            {
              name: 'icon',
              title: 'Ikona',
              type: 'string',
              options: {
                list: [
                  { title: 'Rođenje', value: 'birth' },
                  { title: 'Podučavanje', value: 'teaching' },
                  { title: 'Selo', value: 'village' },
                  { title: 'Vlada', value: 'government' },
                  { title: 'Knjige', value: 'books' },
                  { title: 'Nagrada', value: 'award' },
                  { title: 'Putovanje', value: 'travel' },
                ],
              },
            },
            {
              name: 'featured',
              title: 'Istaknuto',
              type: 'boolean',
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'year',
            },
          },
        },
      ],
    }),
    
    // Dostignuća
    defineField({
      name: 'achievements',
      title: 'Dostignuća',
      type: 'array',
      group: 'achievements',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Naslov',
              type: 'string',
              validation: Rule => Rule.required(),
            },
            {
              name: 'description',
              title: 'Opis',
              type: 'text',
            },
            {
              name: 'icon',
              title: 'Ikona',
              type: 'string',
              options: {
                list: [
                  { title: 'Globus', value: 'globe' },
                  { title: 'Medalja', value: 'medal' },
                  { title: 'Partnerstvo', value: 'partnership' },
                  { title: 'Festival', value: 'festival' },
                  { title: 'Knjiga', value: 'book' },
                  { title: 'Zvezda', value: 'star' },
                ],
              },
            },
            {
              name: 'color',
              title: 'Boja',
              type: 'string',
              options: {
                list: [
                  { title: 'Plava', value: '#3498DB' },
                  { title: 'Crvena', value: '#E74C3C' },
                  { title: 'Narandžasta', value: '#F39C12' },
                  { title: 'Zelena', value: '#27AE60' },
                  { title: 'Ljubičasta', value: '#9B59B6' },
                  { title: 'Roze', value: '#E91E63' },
                ],
              },
              initialValue: '#3498DB',
            },
            {
              name: 'year',
              title: 'Godina',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'year',
            },
          },
        },
      ],
    }),
    
    // Istaknuti citat
    defineField({
      name: 'featuredQuote',
      title: 'Istaknuti citat',
      type: 'object',
      group: 'content',
      fields: [
        {
          name: 'text',
          title: 'Tekst citata',
          type: 'text',
          validation: Rule => Rule.required(),
        },
        {
          name: 'context',
          title: 'Kontekst',
          type: 'string',
        },
        {
          name: 'image',
          title: 'Pozadinska slika',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt tekst',
            }
          ],
        },
      ],
    }),
    
    // Povezane knjige (reference na postojeće knjige)
    defineField({
      name: 'featuredBooks',
      title: 'Istaknute knjige',
      type: 'array',
      group: 'content',
      of: [
        {
          type: 'reference',
          to: [{ type: 'book' }],
        },
      ],
      validation: Rule => Rule.max(4),
    }),
    
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO podešavanja',
      type: 'object',
      group: 'seo',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta naslov',
          type: 'string',
          validation: Rule => Rule.max(60),
        },
        {
          name: 'metaDescription',
          title: 'Meta opis',
          type: 'text',
          validation: Rule => Rule.max(160),
        },
        {
          name: 'keywords',
          title: 'Ključne reči',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'ogImage',
          title: 'Open Graph slika',
          type: 'image',
          description: 'Slika za društvene mreže (1200x630px)',
        },
      ],
    }),
  ],
  
  preview: {
    select: {
      title: 'heroTitle',
      media: 'heroImage',
    },
  },
})