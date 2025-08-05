import { defineField, defineType } from 'sanity'
import { BookIcon } from '@sanity/icons'

export default defineType({
  name: 'publications',
  title: 'Publikacije',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov',
      type: 'string',
      validation: Rule => Rule.required().max(100)
    }),
    defineField({
      name: 'subtitle',
      title: 'Podnaslov',
      type: 'string',
      validation: Rule => Rule.max(150)
    }),
    defineField({
      name: 'year',
      title: 'Godina izdanja',
      type: 'number',
      validation: Rule => Rule.required().min(1990).max(new Date().getFullYear() + 5)
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'type',
      title: 'Tip publikacije',
      type: 'string',
      options: {
        list: [
          { title: 'Knjiga', value: 'book' },
          { title: 'Priručnik', value: 'manual' },
          { title: 'Radna sveska', value: 'workbook' },
          { title: 'Vodič', value: 'guide' },
          { title: 'Studija', value: 'study' },
          { title: 'Članak', value: 'article' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'coverImage',
      title: 'Slika korica',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'isbn',
      title: 'ISBN',
      type: 'string',
      validation: Rule => Rule.regex(/^(?:\d{10}|\d{13})$/, {
        name: 'ISBN',
        invert: false
      })
    }),
    defineField({
      name: 'publisher',
      title: 'Izdavač',
      type: 'string'
    }),
    defineField({
      name: 'pages',
      title: 'Broj stranica',
      type: 'number',
      validation: Rule => Rule.min(1)
    }),
    defineField({
      name: 'targetAudience',
      title: 'Ciljna grupa',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Deca (3-6 godina)', value: 'preschool' },
          { title: 'Školski uzrast (7-14)', value: 'school' },
          { title: 'Tinejdžeri (15-18)', value: 'teens' },
          { title: 'Roditelji', value: 'parents' },
          { title: 'Nastavnici', value: 'teachers' },
          { title: 'Stručnjaci', value: 'professionals' }
        ]
      }
    }),
    defineField({
      name: 'downloadLink',
      title: 'Link za preuzimanje',
      type: 'url',
      description: 'Link za besplatno preuzimanje ili kupovinu'
    }),
    defineField({
      name: 'previewLink',
      title: 'Link za pregled',
      type: 'url',
      description: 'Link za pregled delova knjige'
    }),
    defineField({
      name: 'order',
      title: 'Redosled prikaza',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    }),
    defineField({
      name: 'featured',
      title: 'Istaknuto',
      type: 'boolean',
      initialValue: false,
      description: 'Da li se prikazuje kao istaknuta publikacija'
    }),
    defineField({
      name: 'isActive',
      title: 'Aktivno',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      type: 'type',
      media: 'coverImage',
      featured: 'featured'
    },
    prepare({ title, year, type, media, featured }) {
      const typeMap: Record<string, string> = {
        book: 'Knjiga',
        manual: 'Priručnik',
        workbook: 'Radna sveska',
        guide: 'Vodič',
        study: 'Studija',
        article: 'Članak'
      }
      
      return {
        title: `${title} (${year})`,
        subtitle: `${typeMap[type] || 'Publikacija'} ${featured ? ' - Istaknuto' : ''}`,
        media
      }
    }
  },
  orderings: [
    {
      title: 'Po godini (najnovije)',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }]
    },
    {
      title: 'Po redosledu',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
})