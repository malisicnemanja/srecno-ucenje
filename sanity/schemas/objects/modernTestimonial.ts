import { defineType } from 'sanity'

export default defineType({
  name: 'modernTestimonial',
  title: 'Modern Testimonial',
  type: 'object',
  fields: [
    {
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      validation: (Rule) => Rule.required().max(500),
      description: 'The main testimonial content',
    },
    {
      name: 'author',
      title: 'Author Information',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Author Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'title',
          title: 'Author Title/Role',
          type: 'string',
          description: 'e.g., "Parent", "Franchisee", "Teacher"',
        },
        {
          name: 'company',
          title: 'Company/School',
          type: 'string',
          description: 'Name of company or school if relevant',
        },
        {
          name: 'location',
          title: 'Location',
          type: 'string',
          description: 'City or region of the author',
        },
        {
          name: 'photo',
          title: 'Author Photo',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        {
          name: 'socialProof',
          title: 'Social Proof',
          type: 'object',
          description: 'Additional credibility indicators',
          fields: [
            {
              name: 'linkedIn',
              title: 'LinkedIn Profile',
              type: 'url',
            },
            {
              name: 'verified',
              title: 'Verified Testimonial',
              type: 'boolean',
              description: 'Mark if this testimonial has been verified',
              initialValue: false,
            },
            {
              name: 'relationshipDuration',
              title: 'Relationship Duration',
              type: 'string',
              description: 'How long they have been a customer/franchisee',
            },
          ],
        },
      ],
    },
    {
      name: 'rating',
      title: 'Star Rating',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      description: 'Star rating from 1 to 5',
    },
    {
      name: 'category',
      title: 'Testimonial Category',
      type: 'string',
      options: {
        list: [
          { title: 'Parent Testimonial', value: 'parent' },
          { title: 'Franchisee Success Story', value: 'franchisee' },
          { title: 'Student Achievement', value: 'student' },
          { title: 'Teacher/Educator', value: 'educator' },
          { title: 'Business Partner', value: 'partner' },
          { title: 'Community Leader', value: 'community' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'context',
      title: 'Context Information',
      type: 'object',
      description: 'Additional context about the testimonial',
      fields: [
        {
          name: 'program',
          title: 'Related Program',
          type: 'reference',
          to: [{ type: 'program' }],
          description: 'Which program this testimonial relates to',
        },
        {
          name: 'franchiseLocation',
          title: 'Franchise Location',
          type: 'reference',
          to: [{ type: 'modernFranchiseLocation' }],
          description: 'Which franchise location this relates to',
        },
        {
          name: 'results',
          title: 'Specific Results',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Specific achievements or improvements mentioned',
        },
        {
          name: 'beforeAfter',
          title: 'Before & After',
          type: 'object',
          fields: [
            {
              name: 'before',
              title: 'Before Description',
              type: 'string',
              description: 'Situation before using our services',
            },
            {
              name: 'after',
              title: 'After Description',
              type: 'string',
              description: 'Situation after using our services',
            },
          ],
        },
      ],
    },
    {
      name: 'media',
      title: 'Additional Media',
      type: 'object',
      fields: [
        {
          name: 'video',
          title: 'Video Testimonial',
          type: 'object',
          fields: [
            {
              name: 'url',
              title: 'Video URL',
              type: 'url',
              description: 'YouTube, Vimeo, or other video platform URL',
            },
            {
              name: 'thumbnail',
              title: 'Custom Thumbnail',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'duration',
              title: 'Video Duration',
              type: 'string',
              description: 'e.g., "2:30"',
            },
          ],
        },
        {
          name: 'additionalImages',
          title: 'Additional Images',
          type: 'array',
          of: [
            {
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Alternative Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'caption',
                  title: 'Image Caption',
                  type: 'string',
                },
              ],
            },
          ],
          description: 'Photos showing results, certificates, achievements, etc.',
        },
      ],
    },
    {
      name: 'displayOptions',
      title: 'Display Options',
      type: 'object',
      fields: [
        {
          name: 'featured',
          title: 'Featured Testimonial',
          type: 'boolean',
          description: 'Highlight this testimonial prominently',
          initialValue: false,
        },
        {
          name: 'showOnHomepage',
          title: 'Show on Homepage',
          type: 'boolean',
          description: 'Display this testimonial on the homepage',
          initialValue: false,
        },
        {
          name: 'showAuthorPhoto',
          title: 'Show Author Photo',
          type: 'boolean',
          description: 'Display the author photo with the testimonial',
          initialValue: true,
        },
        {
          name: 'showRating',
          title: 'Show Star Rating',
          type: 'boolean',
          description: 'Display the star rating',
          initialValue: true,
        },
        {
          name: 'layout',
          title: 'Testimonial Layout',
          type: 'string',
          options: {
            list: [
              { title: 'Card Layout', value: 'card' },
              { title: 'Quote Layout', value: 'quote' },
              { title: 'Story Layout', value: 'story' },
              { title: 'Video Layout', value: 'video' },
            ],
          },
          initialValue: 'card',
        },
      ],
    },
    {
      name: 'dateCollected',
      title: 'Date Collected',
      type: 'date',
      description: 'When was this testimonial collected?',
    },
    {
      name: 'consentGiven',
      title: 'Consent for Publication',
      type: 'boolean',
      description: 'Has the author given consent to publish this testimonial?',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order for displaying testimonials (lower numbers first)',
      initialValue: 0,
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Is this testimonial currently active and visible?',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      quote: 'quote',
      authorName: 'author.name',
      authorTitle: 'author.title',
      category: 'category',
      rating: 'rating',
      featured: 'displayOptions.featured',
      media: 'author.photo',
    },
    prepare({ quote, authorName, authorTitle, category, rating, featured, media }) {
      const truncatedQuote = quote ? quote.substring(0, 60) + (quote.length > 60 ? '...' : '') : 'No quote'
      const author = authorName || 'Anonymous'
      const title = authorTitle ? ` • ${authorTitle}` : ''
      const stars = rating ? ` • ${'★'.repeat(rating)}` : ''
      const featuredBadge = featured ? '[FEATURED] ' : ''
      
      return {
        title: `${featuredBadge}"${truncatedQuote}"`,
        subtitle: `${author}${title}${stars} • ${category}`,
        media,
      }
    },
  },
})
