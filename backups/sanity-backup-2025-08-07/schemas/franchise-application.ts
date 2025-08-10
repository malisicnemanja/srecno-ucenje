import { defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export default defineType({
  name: 'franchiseApplication',
  title: 'Prijava za franšizu',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov stranice',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Podnaslov',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text'
    }),
    defineField({
      name: 'slug',
      title: 'URL putanja',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'sections',
      title: 'Sekcije aplikacije',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'franchiseSection' } }],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'motivationalContent',
      title: 'Motivacioni sadržaj',
      type: 'reference',
      to: { type: 'franchiseMotivational' }
    }),
    defineField({
      name: 'successMessage',
      title: 'Poruka uspešne prijave',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Naslov',
          type: 'string'
        }),
        defineField({
          name: 'message',
          title: 'Poruka',
          type: 'text'
        }),
        defineField({
          name: 'nextSteps',
          title: 'Sledeći koraci',
          type: 'array',
          of: [{ type: 'string' }]
        })
      ]
    }),
    defineField({
      name: 'formSettings',
      title: 'Podešavanja forme',
      type: 'object',
      fields: [
        defineField({
          name: 'submitButtonText',
          title: 'Tekst dugmeta za slanje',
          type: 'string',
          initialValue: 'Pošalji prijavu'
        }),
        defineField({
          name: 'requiredFieldsNote',
          title: 'Napomena o obaveznim poljima',
          type: 'string',
          initialValue: '* Sva polja označena zvezdicom su obavezna'
        }),
        defineField({
          name: 'privacyNote',
          title: 'Napomena o privatnosti',
          type: 'text',
          initialValue: 'Vaši podaci su bezbedni i neće biti prosleđivani trećim licima.'
        })
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO podešavanja',
      type: 'seo'
    }),
    defineField({
      name: 'isActive',
      title: 'Aktivna aplikacija',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      isActive: 'isActive'
    },
    prepare({ title, isActive }) {
      return {
        title: title || 'Prijava za franšizu',
        subtitle: isActive ? 'Aktivna' : 'Neaktivna'
      }
    }
  }
})