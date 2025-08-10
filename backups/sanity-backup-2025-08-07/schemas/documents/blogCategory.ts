import { defineField, defineType } from 'sanity'
import { FolderIcon } from '@sanity/icons'

export default defineType({
  name: 'blogCategory',
  title: 'Blog Kategorija',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Naziv Kategorije',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        slugify: (input) => input
          .toLowerCase()
          .replace(/š/g, 's')
          .replace(/č/g, 'c')
          .replace(/ć/g, 'c')
          .replace(/ž/g, 'z')
          .replace(/đ/g, 'dj')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Opis Kategorije',
      type: 'text',
      rows: 3,
      description: 'Kratak opis kategorije'
    }),
    defineField({
      name: 'color',
      title: 'Boja Kategorije',
      type: 'string',
      options: {
        list: [
          { title: 'Primarna (Plava)', value: 'primary' },
          { title: 'Sekundarna (Zelena)', value: 'secondary' },
          { title: 'Akcent (Žuta)', value: 'accent' },
          { title: 'Topla (Narandžasta)', value: 'warm' },
          { title: 'Crvena', value: 'red' },
          { title: 'Ljubičasta', value: 'purple' }
        ]
      },
      initialValue: 'primary',
      validation: (Rule) => Rule.required()
    })
  ],
  
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      color: 'color'
    },
    prepare(selection) {
      const { title, subtitle } = selection
      
      return {
        title: title,
        subtitle: subtitle
      }
    }
  }
})