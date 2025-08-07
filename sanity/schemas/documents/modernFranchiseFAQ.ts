import { defineType } from 'sanity'
import { QuestionMarkIcon } from '@sanity/icons'

export default defineType({
  name: 'modernFranchiseFAQ',
  title: 'Franchise FAQ',
  type: 'document',
  icon: QuestionMarkIcon,
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'FAQ Category',
      type: 'string',
      options: {
        list: [
          { title: 'General Information', value: 'general' },
          { title: 'Investment & Costs', value: 'investment' },
          { title: 'Application Process', value: 'application' },
          { title: 'Training & Support', value: 'training' },
          { title: 'Business Operations', value: 'operations' },
          { title: 'Territory & Location', value: 'territory' },
          { title: 'Marketing & Sales', value: 'marketing' },
          { title: 'Legal & Contracts', value: 'legal' },
          { title: 'Technology & Systems', value: 'technology' },
          { title: 'Educational Programs', value: 'programs' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'packageSpecific',
      title: 'Package Specific',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'modernFranchisePackage' }] }],
      description: 'If this FAQ applies only to specific packages',
    },
    {
      name: 'priority',
      title: 'Priority',
      type: 'string',
      options: {
        list: [
          { title: 'High (Most Important)', value: 'high' },
          { title: 'Medium (Common Questions)', value: 'medium' },
          { title: 'Low (Detailed Information)', value: 'low' },
        ],
      },
      initialValue: 'medium',
      description: 'High priority FAQs appear first',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords for filtering and searching FAQs',
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'relatedDocuments',
      title: 'Related Documents',
      type: 'object',
      description: 'Link to related content for more information',
      fields: [
        {
          name: 'packages',
          title: 'Related Packages',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'modernFranchisePackage' }] }],
        },
        {
          name: 'pages',
          title: 'Related Pages',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'modernPage' }] }],
        },
        {
          name: 'blogPosts',
          title: 'Related Blog Posts',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
        },
      ],
    },
    {
      name: 'showInWidget',
      title: 'Show in FAQ Widget',
      type: 'boolean',
      description: 'Display this FAQ in sidebar widgets or quick access areas',
      initialValue: false,
    },
    {
      name: 'featured',
      title: 'Featured FAQ',
      type: 'boolean',
      description: 'Highlight this FAQ as important',
      initialValue: false,
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
      description: 'When was this FAQ last reviewed and updated?',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order within category (lower numbers first)',
      initialValue: 0,
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'When was this FAQ first published?',
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Is this FAQ currently active and visible?',
      initialValue: true,
    },
  ],
  orderings: [
    {
      title: 'Priority & Order',
      name: 'priorityOrder',
      by: [
        { field: 'priority', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
    {
      title: 'Category',
      name: 'category',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
    {
      title: 'Last Updated',
      name: 'lastUpdated',
      by: [{ field: 'lastUpdated', direction: 'desc' }],
    },
    {
      title: 'Question A-Z',
      name: 'question',
      by: [{ field: 'question', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      question: 'question',
      category: 'category',
      priority: 'priority',
      featured: 'featured',
      isActive: 'isActive',
    },
    prepare({ question, category, priority, featured, isActive }) {
      const badges = []
      if (featured) badges.push('FEATURED')
      if (!isActive) badges.push('INACTIVE')
      if (priority === 'high') badges.push('HIGH PRIORITY')
      const badgeText = badges.length > 0 ? `[${badges.join(', ')}] ` : ''
      
      return {
        title: `${badgeText}${question}`,
        subtitle: `${category} • Priority: ${priority}`,
      }
    },
  },
})
