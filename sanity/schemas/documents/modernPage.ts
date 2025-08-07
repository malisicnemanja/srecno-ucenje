import { defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export default defineType({
  name: 'modernPage',
  title: 'Modern Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'Landing Page', value: 'landing' },
          { title: 'Service Page', value: 'service' },
          { title: 'About Page', value: 'about' },
          { title: 'Contact Page', value: 'contact' },
          { title: 'Franchise Page', value: 'franchise' },
          { title: 'General Page', value: 'general' },
        ],
      },
      initialValue: 'general',
    },
    {
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [{ type: 'pageSection' }],
      description: 'Build your page with sections',
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    },
    {
      name: 'settings',
      title: 'Page Settings',
      type: 'object',
      fields: [
        {
          name: 'showInNavigation',
          title: 'Show in Navigation',
          type: 'boolean',
          description: 'Display this page in the main navigation',
          initialValue: false,
        },
        {
          name: 'navigationOrder',
          title: 'Navigation Order',
          type: 'number',
          description: 'Order in navigation (lower numbers first)',
          hidden: ({ parent }) => !parent?.showInNavigation,
        },
        {
          name: 'requireAuth',
          title: 'Require Authentication',
          type: 'boolean',
          description: 'Require users to be logged in to view this page',
          initialValue: false,
        },
        {
          name: 'allowRobots',
          title: 'Allow Search Engine Indexing',
          type: 'boolean',
          description: 'Allow search engines to index this page',
          initialValue: true,
        },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'When was this page first published?',
    },
    {
      name: 'lastModified',
      title: 'Last Modified',
      type: 'datetime',
      description: 'When was this page last updated?',
      readOnly: true,
    },
  ],
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Page Type',
      name: 'pageType',
      by: [{ field: 'pageType', direction: 'asc' }],
    },
    {
      title: 'Last Modified',
      name: 'lastModified',
      by: [{ field: 'lastModified', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      pageType: 'pageType',
      publishedAt: 'publishedAt',
    },
    prepare({ title, slug, pageType, publishedAt }) {
      const status = publishedAt ? 'Published' : 'Draft'
      return {
        title: title || 'Untitled Page',
        subtitle: `/${slug} • ${pageType} • ${status}`,
      }
    },
  },
})
