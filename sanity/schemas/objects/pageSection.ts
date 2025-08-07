import { defineType } from 'sanity'

export default defineType({
  name: 'pageSection',
  title: 'Page Section',
  type: 'object',
  fields: [
    {
      name: 'sectionType',
      title: 'Section Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hero Section', value: 'hero' },
          { title: 'Cards Grid', value: 'cardsGrid' },
          { title: 'Timeline', value: 'timeline' },
          { title: 'Testimonials', value: 'testimonials' },
          { title: 'FAQ Accordion', value: 'faq' },
          { title: 'CTA Section', value: 'cta' },
          { title: 'Stats Section', value: 'stats' },
          { title: 'Content Block', value: 'content' },
          { title: 'Image Gallery', value: 'gallery' },
          { title: 'Video Section', value: 'video' },
          { title: 'Contact Form', value: 'contact' },
          { title: 'Pricing Table', value: 'pricing' },
          { title: 'Team Section', value: 'team' },
          { title: 'Features Grid', value: 'features' },
          { title: 'Blog Posts', value: 'blogPosts' },
          { title: 'Newsletter Signup', value: 'newsletter' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'sectionId',
      title: 'Section ID',
      type: 'slug',
      description: 'Unique identifier for navigation/scrolling',
      options: {
        source: 'sectionType',
        maxLength: 50,
      },
    },
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Internal title for organization (not displayed)',
    },
    {
      name: 'hidden',
      title: 'Hide Section',
      type: 'boolean',
      description: 'Hide this section from the frontend',
      initialValue: false,
    },
    // Hero Section
    {
      name: 'heroContent',
      title: 'Hero Content',
      type: 'modernHero',
      hidden: ({ parent }) => parent?.sectionType !== 'hero',
    },
    // Cards Grid
    {
      name: 'cardsGrid',
      title: 'Cards Grid',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
        },
        {
          name: 'cards',
          title: 'Cards',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'card',
              fields: [
                {
                  name: 'title',
                  title: 'Card Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Card Description',
                  type: 'text',
                },
                {
                  name: 'image',
                  title: 'Card Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: 'alt',
                      title: 'Alternative Text',
                      type: 'string',
                    },
                  ],
                },
                {
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  description: 'Lucide React icon name',
                },
                {
                  name: 'link',
                  title: 'Card Link',
                  type: 'object',
                  fields: [
                    {
                      name: 'url',
                      title: 'URL',
                      type: 'string',
                    },
                    {
                      name: 'text',
                      title: 'Link Text',
                      type: 'string',
                    },
                  ],
                },
              ],
              preview: {
                select: {
                  title: 'title',
                  media: 'image',
                },
                prepare({ title, media }) {
                  return {
                    title: title || 'Card',
                    media,
                  }
                },
              },
            },
          ],
        },
        {
          name: 'columns',
          title: 'Columns',
          type: 'string',
          options: {
            list: [
              { title: '1 Column', value: '1' },
              { title: '2 Columns', value: '2' },
              { title: '3 Columns', value: '3' },
              { title: '4 Columns', value: '4' },
            ],
          },
          initialValue: '3',
        },
      ],
      hidden: ({ parent }) => parent?.sectionType !== 'cardsGrid',
    },
    // Timeline
    {
      name: 'timeline',
      title: 'Timeline',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
        },
        {
          name: 'items',
          title: 'Timeline Items',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'timelineItem',
              fields: [
                {
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'array',
                  of: [{ type: 'block' }],
                },
                {
                  name: 'date',
                  title: 'Date/Step',
                  type: 'string',
                },
                {
                  name: 'icon',
                  title: 'Icon',
                  type: 'string',
                  description: 'Lucide React icon name',
                },
                {
                  name: 'image',
                  title: 'Image',
                  type: 'image',
                  options: {
                    hotspot: true,
                  },
                },
              ],
              preview: {
                select: {
                  title: 'title',
                  subtitle: 'date',
                  media: 'image',
                },
              },
            },
          ],
        },
      ],
      hidden: ({ parent }) => parent?.sectionType !== 'timeline',
    },
    // Testimonials
    {
      name: 'testimonials',
      title: 'Testimonials',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
        },
        {
          name: 'testimonialList',
          title: 'Testimonials',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
        },
        {
          name: 'layout',
          title: 'Layout Style',
          type: 'string',
          options: {
            list: [
              { title: 'Grid', value: 'grid' },
              { title: 'Carousel', value: 'carousel' },
              { title: 'Masonry', value: 'masonry' },
            ],
          },
          initialValue: 'carousel',
        },
      ],
      hidden: ({ parent }) => parent?.sectionType !== 'testimonials',
    },
    // FAQ Section
    {
      name: 'faq',
      title: 'FAQ Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
        },
        {
          name: 'faqList',
          title: 'FAQ Items',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'faq' }] }],
        },
        {
          name: 'category',
          title: 'FAQ Category',
          type: 'reference',
          to: [{ type: 'faqCategory' }],
          description: 'Show FAQs from specific category',
        },
      ],
      hidden: ({ parent }) => parent?.sectionType !== 'faq',
    },
    // CTA Section
    {
      name: 'ctaSection',
      title: 'CTA Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
        },
        {
          name: 'buttons',
          title: 'Action Buttons',
          type: 'array',
          of: [{ type: 'button' }],
          validation: (Rule) => Rule.max(2),
        },
        {
          name: 'background',
          title: 'Background Style',
          type: 'string',
          options: {
            list: [
              { title: 'Gradient', value: 'gradient' },
              { title: 'Solid Color', value: 'solid' },
              { title: 'Image', value: 'image' },
            ],
          },
          initialValue: 'gradient',
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          hidden: ({ parent }) => parent?.background !== 'image',
        },
      ],
      hidden: ({ parent }) => parent?.sectionType !== 'cta',
    },
    // Stats Section
    {
      name: 'stats',
      title: 'Statistics Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Section Description',
          type: 'text',
        },
        {
          name: 'statistics',
          title: 'Statistics',
          type: 'array',
          of: [{ type: 'statistic' }],
          validation: (Rule) => Rule.min(2).max(6),
        },
      ],
      hidden: ({ parent }) => parent?.sectionType !== 'stats',
    },
    // Content Block
    {
      name: 'content',
      title: 'Content Block',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
        },
        {
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{ type: 'block' }],
        },
        {
          name: 'image',
          title: 'Featured Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'layout',
          title: 'Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Text Only', value: 'text' },
              { title: 'Text with Image (Left)', value: 'imageLeft' },
              { title: 'Text with Image (Right)', value: 'imageRight' },
              { title: 'Centered with Image Above', value: 'imageTop' },
            ],
          },
          initialValue: 'text',
        },
      ],
      hidden: ({ parent }) => parent?.sectionType !== 'content',
    },
    // Spacing and Styling
    {
      name: 'spacing',
      title: 'Section Spacing',
      type: 'object',
      fields: [
        {
          name: 'paddingTop',
          title: 'Padding Top',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Small', value: 'sm' },
              { title: 'Medium', value: 'md' },
              { title: 'Large', value: 'lg' },
              { title: 'Extra Large', value: 'xl' },
            ],
          },
          initialValue: 'md',
        },
        {
          name: 'paddingBottom',
          title: 'Padding Bottom',
          type: 'string',
          options: {
            list: [
              { title: 'None', value: 'none' },
              { title: 'Small', value: 'sm' },
              { title: 'Medium', value: 'md' },
              { title: 'Large', value: 'lg' },
              { title: 'Extra Large', value: 'xl' },
            ],
          },
          initialValue: 'md',
        },
      ],
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'White', value: 'white' },
          { title: 'Gray 50', value: 'gray-50' },
          { title: 'Gray 100', value: 'gray-100' },
          { title: 'Sky 50', value: 'sky-50' },
          { title: 'Sun 50', value: 'sun-50' },
          { title: 'Grass 50', value: 'grass-50' },
          { title: 'Heart 50', value: 'heart-50' },
          { title: 'Night 50', value: 'night-50' },
        ],
      },
      initialValue: 'default',
    },
  ],
  preview: {
    select: {
      title: 'title',
      sectionType: 'sectionType',
      hidden: 'hidden',
    },
    prepare({ title, sectionType, hidden }) {
      const sectionTitle = title || sectionType || 'Page Section'
      return {
        title: `${hidden ? '[HIDDEN] ' : ''}${sectionTitle}`,
        subtitle: `Type: ${sectionType}`,
      }
    },
  },
})
