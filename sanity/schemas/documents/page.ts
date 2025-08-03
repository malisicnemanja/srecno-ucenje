import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Stranice',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero Sekcija',
      type: 'hero',
    }),
    defineField({
      name: 'content',
      title: 'Sadržaj',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'featureReference',
          type: 'reference',
          title: 'Feature Lista',
          to: [{ type: 'feature' }],
        },
        {
          name: 'ctaReference',
          type: 'reference',
          title: 'CTA Sekcija',
          to: [{ type: 'cta' }],
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Karakteristike',
      type: 'array',
      of: [{ type: 'feature' }],
    }),
    defineField({
      name: 'statistics',
      title: 'Statistike',
      type: 'array',
      of: [{ type: 'statistic' }],
    }),
    defineField({
      name: 'cta',
      title: 'CTA Sekcija',
      type: 'cta',
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
      subtitle: 'slug.current',
    },
  },
})