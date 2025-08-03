import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'errorPage',
  title: 'Error stranice',
  type: 'document',
  fields: [
    defineField({
      name: 'errorCode',
      title: 'Error kod',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: '404 - Stranica nije pronađena', value: '404' },
          { title: '500 - Server greška', value: '500' },
          { title: '403 - Zabranjen pristup', value: '403' },
          { title: 'General - Opšta greška', value: 'general' },
        ],
      },
    }),
    defineField({
      name: 'title',
      title: 'Naslov',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Glavni naslov error stranice',
    }),
    defineField({
      name: 'subtitle',
      title: 'Podnaslov',
      type: 'string',
      description: 'Kratko objašnjenje greške',
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
      rows: 3,
      description: 'Detaljniji opis sa humorističkim pristupom',
    }),
    defineField({
      name: 'image',
      title: 'Ilustracija',
      type: 'image',
      options: { hotspot: true },
      description: 'SVG ili PNG ilustracija za error stranicu',
    }),
    defineField({
      name: 'buttons',
      title: 'Dugmad',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Tekst dugmeta',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'npr. / za početnu ili /kontakt',
            }),
            defineField({
              name: 'variant',
              title: 'Varijanta',
              type: 'string',
              options: {
                list: [
                  { title: 'Primarno', value: 'primary' },
                  { title: 'Sekundarno', value: 'secondary' },
                  { title: 'Outline', value: 'outline' },
                ],
              },
              initialValue: 'primary',
            }),
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'href',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(3),
    }),
    defineField({
      name: 'searchSuggestion',
      title: 'Predlog pretrage',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Omogući pretragu',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'text',
          title: 'Tekst iznad pretrage',
          type: 'string',
          description: 'npr. "Možda tražite:"',
        }),
        defineField({
          name: 'suggestions',
          title: 'Predlozi',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Lista predloga za brze linkove',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      errorCode: 'errorCode',
      media: 'image',
    },
    prepare({ title, errorCode, media }) {
      return {
        title: `${errorCode} - ${title}`,
        media,
      }
    },
  },
})