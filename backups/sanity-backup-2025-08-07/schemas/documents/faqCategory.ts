import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'faqCategory',
  title: 'FAQ Kategorije',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Naziv kategorije',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'ID kategorije',
      type: 'string',
      description: 'Jedinstveni identifikator za kategoriju (npr. "general", "programs")',
      validation: (Rule) => Rule.required().regex(/^[a-z]+$/g, {
        name: 'lowercase letters only',
        invert: false
      }),
    }),
    defineField({
      name: 'description',
      title: 'Opis kategorije',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'icon',
      title: 'Ikonica',
      type: 'string',
      description: 'Emoji ili naziv ikonice',
    }),
    defineField({
      name: 'color',
      title: 'Boja kategorije',
      type: 'string',
      description: 'Hex boja ili naziv Tailwind klase',
      initialValue: 'primary',
    }),
    defineField({
      name: 'order',
      title: 'Redosled prikazivanja',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'isActive',
      title: 'Aktivna kategorija',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Redosled',
      name: 'order',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug',
      media: 'icon',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: media ? `${media} ${title}` : title,
        subtitle: subtitle,
      }
    },
  },
})