export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3
    },
    {
      name: 'apiKeys',
      title: 'API Keys',
      type: 'object',
      description: 'External service API keys - keep these secure!',
      fields: [
        {
          name: 'googleMapsApiKey',
          title: 'Google Maps API Key',
          type: 'string',
          description: 'API key for Google Maps integration on locations page',
          validation: (Rule: any) => Rule.required().warning('Google Maps API key is required for map functionality')
        },
        {
          name: 'googleAnalyticsId',
          title: 'Google Analytics ID',
          type: 'string',
          description: 'Google Analytics tracking ID (GA4)',
          placeholder: 'G-XXXXXXXXXX'
        },
        {
          name: 'facebookPixelId',
          title: 'Facebook Pixel ID',
          type: 'string',
          description: 'Facebook Pixel tracking ID'
        }
      ],
      options: {
        collapsible: true,
        collapsed: false
      }
    },
    {
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'mainPhone',
          title: 'Main Phone',
          type: 'string'
        },
        {
          name: 'mainEmail',
          title: 'Main Email',
          type: 'string'
        },
        {
          name: 'address',
          title: 'Main Address',
          type: 'text',
          rows: 2
        },
        {
          name: 'workingHours',
          title: 'Working Hours',
          type: 'string',
          placeholder: 'Pon-Pet: 9:00-17:00'
        }
      ]
    },
    {
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url'
        },
        {
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url'
        },
        {
          name: 'linkedin',
          title: 'LinkedIn URL',
          type: 'url'
        },
        {
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url'
        }
      ]
    },
    {
      name: 'seoSettings',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Default Meta Title',
          type: 'string',
          description: 'Default title for pages without specific SEO settings'
        },
        {
          name: 'metaDescription',
          title: 'Default Meta Description',
          type: 'text',
          rows: 2,
          description: 'Default description for pages without specific SEO settings'
        },
        {
          name: 'keywords',
          title: 'Default Keywords',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Default keywords for SEO'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare(selection: any) {
      return {
        title: selection.title || 'Site Settings'
      }
    }
  }
}