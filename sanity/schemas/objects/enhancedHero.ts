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
          validation: (Rule) => Rule.required(),
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
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'videoBackground',
      title: 'Video Background',
      type: 'videoBackground',
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