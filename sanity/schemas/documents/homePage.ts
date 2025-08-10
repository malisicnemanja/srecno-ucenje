import { defineField, defineType } from 'sanity'

const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'enhancedHero',
      title: 'Enhanced Hero Section',
      type: 'enhancedHero',
    }),
    defineField({
      name: 'statistics',
      title: 'Statistics',
      type: 'array',
      of: [{ type: 'statistic' }],
    }),
    defineField({
      name: 'differentiators',
      title: 'Why Srećno učenje?',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Zašto baš Srećno učenje?',
        },
        {
          name: 'items',
          title: 'Differentiators',
          type: 'array',
          of: [{ type: 'differentiator' }],
          validation: (Rule) => Rule.max(3),
        },
      ],
    }),
    defineField({
      name: 'franchiseSteps',
      title: '4 Steps Timeline',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: '4 koraka do vaše franšize',
        },
        {
          name: 'steps',
          title: 'Steps',
          type: 'array',
          of: [{ type: 'franchiseStep' }],
          validation: (Rule) => Rule.max(4),
        },
      ],
    }),
    defineField({
      name: 'franchiseModels',
      title: 'Franchise Models Comparison',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Naši modeli',
        },
        {
          name: 'models',
          title: 'Models',
          type: 'array',
          of: [{ type: 'franchiseModel' }],
          validation: (Rule) => Rule.max(3),
        },
      ],
    }),
    defineField({
      name: 'successStories',
      title: 'Success Stories Section',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Priče uspeha',
        },
        {
          name: 'featuredVideo',
          title: 'Featured Video URL',
          type: 'url',
        },
        {
          name: 'stories',
          title: 'Success Stories',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'name',
                title: 'Name',
                type: 'string',
                validation: Rule => Rule.required()
              },
              {
                name: 'role',
                title: 'Role',
                type: 'string'
              },
              {
                name: 'location',
                title: 'Location',
                type: 'string'
              },
              {
                name: 'story',
                title: 'Story',
                type: 'text'
              },
              {
                name: 'yearStarted',
                title: 'Year Started',
                type: 'string'
              },
              {
                name: 'metric',
                title: 'Key Metric',
                type: 'object',
                fields: [
                  {
                    name: 'value',
                    title: 'Value',
                    type: 'string'
                  },
                  {
                    name: 'label',
                    title: 'Label',
                    type: 'string'
                  }
                ]
              },
              {
                name: 'image',
                title: 'Image',
                type: 'image',
                options: {
                  hotspot: true
                }
              }
            ]
          }]
        },
      ],
    }),
    defineField({
      name: 'homeFaqs',
      title: 'Home Page FAQs',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Česta pitanja',
        },
        {
          name: 'faqs',
          title: 'FAQs',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'faq' }],
            },
          ],
          validation: (Rule) => Rule.max(10),
        },
      ],
    }),
    defineField({
      name: 'interactiveClassroom',
      title: 'Interactive Classroom Preview',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Interaktivna učionica',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
        },
        {
          name: 'previewImage',
          title: 'Preview Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'ctaText',
          title: 'CTA Text',
          type: 'string',
          initialValue: 'Istražite učionicu',
        },
      ],
    }),
    defineField({
      name: 'leadMagnets',
      title: 'Free Resources',
      type: 'object',
      fields: [
        {
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Besplatni resursi',
        },
        {
          name: 'resources',
          title: 'Resources',
          type: 'array',
          of: [{ type: 'leadMagnet' }],
        },
      ],
    }),
    defineField({
      name: 'newsletter',
      title: 'Newsletter Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Prijavite se na naš newsletter',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
        },
        {
          name: 'incentive',
          title: 'Incentive',
          type: 'string',
          description: 'e.g., "Dobijte 10% popusta na prvu godinu"',
        },
        {
          name: 'ctaText',
          title: 'CTA Text',
          type: 'string',
          initialValue: 'Prijavite se',
        },
      ],
    }),
    defineField({
      name: 'newsletterCTA',
      title: 'Newsletter CTA',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'Budite u toku sa prilikama',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
        },
        {
          name: 'incentive',
          title: 'Incentive',
          type: 'string',
          description: 'e.g., "Besplatan vodič: 10 koraka do uspešne obrazovne franšize"',
        },
        {
          name: 'ctaText',
          title: 'CTA Text',
          type: 'string',
          initialValue: 'Prijavite se',
        },
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
      title: 'enhancedHero.title',
    },
    prepare() {
      return {
        title: 'Home Page',
      }
    },
  },
})

export default homePage