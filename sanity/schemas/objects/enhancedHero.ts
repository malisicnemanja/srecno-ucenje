import { defineField, defineType } from 'sanity'

const enhancedHero = defineType({
  name: 'enhancedHero',
  title: 'Enhanced Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlightText',
      title: 'Highlight Text',
      type: 'string',
      description: 'Text that will be highlighted and animated',
    }),
    defineField({
      name: 'titleVariants',
      title: 'Title Variants',
      type: 'array',
      description: 'Different text variations that will animate in the highlighted part',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(5),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'animatedNumber',
      title: 'Animated Number',
      type: 'object',
      fields: [
        {
          name: 'target',
          title: 'Target Number',
          type: 'number',
          description: 'e.g., 20000',
        },
        {
          name: 'suffix',
          title: 'Suffix',
          type: 'string',
          description: 'e.g., "+ dece"',
        },
        {
          name: 'duration',
          title: 'Animation Duration (ms)',
          type: 'number',
          initialValue: 2000,
        },
      ],
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'Badge text that appears above the title',
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'link',
          title: 'Link',
          type: 'string',
        },
        {
          name: 'href',
          title: 'Link URL',
          type: 'string',
          description: 'Alternative field for link URL',
        },
      ],
    }),
    defineField({
      name: 'ctaPrimary',
      title: 'CTA Primary (Alternative)',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text',
          type: 'string',
        },
        {
          name: 'href',
          title: 'Href',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'link',
          title: 'Link',
          type: 'string',
        },
        {
          name: 'href',
          title: 'Link URL',
          type: 'string',
          description: 'Alternative field for link URL',
        },
      ],
    }),
    defineField({
      name: 'ctaSecondary',
      title: 'CTA Secondary (Alternative)',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Text',
          type: 'string',
        },
        {
          name: 'href',
          title: 'Href',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Icon name (e.g., star, users, chart)',
            },
            {
              name: 'text',
              title: 'Text',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'backgroundType',
      title: 'Background Type',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: 'none' },
          { title: 'Pattern', value: 'pattern' },
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
          { title: 'Gradient', value: 'gradient' },
        ],
      },
      initialValue: 'pattern',
    }),
    defineField({
      name: 'backgroundPattern',
      title: 'Background Pattern',
      type: 'string',
      options: {
        list: [
          { title: 'Dots', value: 'dots' },
          { title: 'Lines', value: 'lines' },
          { title: 'Circles', value: 'circles' },
          { title: 'Waves', value: 'waves' },
        ],
      },
      initialValue: 'dots',
      hidden: ({ parent }) => parent?.backgroundType !== 'pattern',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.backgroundType !== 'image',
    }),
    defineField({
      name: 'videoBackground',
      title: 'Video Background',
      type: 'videoBackground',
      hidden: ({ parent }) => parent?.backgroundType !== 'video',
    }),
    defineField({
      name: 'trustBadges',
      title: 'Trust Badges',
      type: 'array',
      of: [{ type: 'trustBadge' }],
      validation: (Rule) => Rule.max(4),
    }),
  ],
})

export default enhancedHero