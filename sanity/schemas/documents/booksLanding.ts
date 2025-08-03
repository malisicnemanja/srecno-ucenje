import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'booksLanding',
  title: 'Knjige - Landing Stranica',
  type: 'document',
  icon: () => '📖',
  groups: [
    { name: 'hero', title: 'Hero Sekcija' },
    { name: 'series', title: 'O Serijalu' },
    { name: 'author', title: 'O Autorki' },
    { name: 'seo', title: 'SEO' }
  ],
  fields: [
    // Hero sekcija
    defineField({
      name: 'heroTitle',
      title: 'Hero Naslov',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Čarobno selo - Luka godišnjih doba',
      group: 'hero'
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Podnaslov',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Obrazovni serijal knjiga Željane Radojičić Lukić',
      group: 'hero'
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Opis',
      type: 'text',
      rows: 3,
      description: 'Kratak opis koji se prikazuje u hero sekciji',
      group: 'hero'
    }),
    defineField({
      name: 'heroBackgroundImage',
      title: 'Hero Pozadinska Slika',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Pozadinska slika za hero sekciju (opciono)',
      group: 'hero'
    }),

    // O serijalu
    defineField({
      name: 'seriesTitle',
      title: 'Naslov Sekcije o Serijalu',
      type: 'string',
      initialValue: 'O serijalu knjiga',
      group: 'series'
    }),
    defineField({
      name: 'seriesDescription',
      title: 'Opis Serijala',
      type: 'array',
      of: [
        {
          type: 'block'
        }
      ],
      validation: (Rule) => Rule.required(),
      group: 'series'
    }),
    defineField({
      name: 'seriesValues',
      title: 'Vrednosti Serijala',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Naziv Vrednosti',
              type: 'string',
              validation: (Rule) => Rule.required()
            },
            {
              name: 'description',
              title: 'Opis',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required()
            },
            {
              name: 'icon',
              title: 'Ikona',
              type: 'string',
              options: {
                list: [
                  { title: '📚 Znanje', value: 'knowledge' },
                  { title: '💎 Vrline', value: 'virtues' },
                  { title: '😊 Radost', value: 'joy' },
                  { title: '🌿 Priroda', value: 'nature' },
                  { title: '🎨 Kreativnost', value: 'creativity' },
                  { title: '🤝 Zajedništvo', value: 'community' }
                ]
              }
            }
          ]
        }
      ],
      validation: (Rule) => Rule.required().min(4).max(6),
      group: 'series'
    }),

    // O autorki sekcija
    defineField({
      name: 'authorSection',
      title: 'Sekcija o Autorki',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Naslov',
          type: 'string',
          initialValue: 'O autorki'
        },
        {
          name: 'description',
          title: 'Opis',
          type: 'array',
          of: [
            {
              type: 'block'
            }
          ],
          validation: (Rule) => Rule.required()
        },
        {
          name: 'image',
          title: 'Slika Autorke',
          type: 'image',
          options: {
            hotspot: true
          },
          validation: (Rule) => Rule.required()
        },
        {
          name: 'linkToAbout',
          title: 'Link ka Stranici o Autorki',
          type: 'string',
          initialValue: '/o-autorki',
          description: 'URL putanja ka detaljnoj stranici o autorki'
        },
        {
          name: 'ctaText',
          title: 'Tekst Dugmeta',
          type: 'string',
          initialValue: 'Saznajte više o autorki'
        }
      ],
      group: 'author'
    }),

    // Dodatne sekcije
    defineField({
      name: 'showBooksCarousel',
      title: 'Prikaži Carousel Knjiga',
      type: 'boolean',
      initialValue: true,
      description: 'Da li da se prikaže carousel sa knjigama'
    }),
    defineField({
      name: 'booksCarouselTitle',
      title: 'Naslov Carousel-a',
      type: 'string',
      initialValue: 'Istražite sve knjige',
      hidden: ({ parent }) => !parent?.showBooksCarousel
    }),

    // Newsletter/CTA sekcija
    defineField({
      name: 'ctaSection',
      title: 'Poziv na Akciju',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Naslov',
          type: 'string',
          initialValue: 'Nabavite komplet knjiga'
        },
        {
          name: 'description',
          title: 'Opis',
          type: 'text',
          rows: 2
        },
        {
          name: 'primaryButton',
          title: 'Glavno Dugme',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Tekst',
              type: 'string',
              initialValue: 'Poručite sada'
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
              description: 'Link za kupovinu ili kontakt'
            }
          ]
        },
        {
          name: 'secondaryButton',
          title: 'Sekundarno Dugme',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Tekst',
              type: 'string',
              initialValue: 'Kontaktirajte nas'
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
              initialValue: '/kontakt'
            }
          ]
        }
      ]
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO Podešavanja',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Naslov',
          type: 'string',
          validation: (Rule) => Rule.max(60),
          initialValue: 'Čarobno selo - Luka godišnjih doba | Knjige Željane Radojičić Lukić'
        },
        {
          name: 'metaDescription',
          title: 'Meta Opis',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.max(160),
          initialValue: 'Obrazovni serijal od četiri knjige koje prate godišnja doba. Spoj bajke i nauke za decu uzrasta 5-12 godina.'
        },
        {
          name: 'ogImage',
          title: 'Social Media Slika',
          type: 'image',
          options: {
            hotspot: true
          },
          description: 'Slika za Facebook, Twitter, itd.'
        },
        {
          name: 'keywords',
          title: 'Ključne Reči',
          type: 'array',
          of: [{ type: 'string' }],
          initialValue: [
            'dečje knjige',
            'obrazovne knjige',
            'godišnja doba',
            'čarobno selo',
            'Željana Radojičić Lukić',
            'vile',
            'bajka i nauka'
          ]
        }
      ],
      group: 'seo'
    })
  ],
  
  preview: {
    select: {
      title: 'heroTitle',
      subtitle: 'heroSubtitle',
      media: 'heroBackgroundImage'
    },
    prepare(selection) {
      return {
        title: selection.title || 'Knjige - Landing Stranica',
        subtitle: selection.subtitle,
        media: selection.media
      }
    }
  }
})