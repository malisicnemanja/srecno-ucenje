import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'object',
  fields: [
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'variant',
          title: 'Variant',
          type: 'string',
          options: {
            list: [
              { title: 'Gradient', value: 'gradient' },
              { title: 'Image', value: 'image' },
              { title: 'Video', value: 'video' },
              { title: 'Animated', value: 'animated' }
            ]
          }
        },
        {
          name: 'primaryColor',
          title: 'Primary Color',
          type: 'string',
          options: {
            list: [
              { title: 'Green (Primary)', value: 'primary' },
              { title: 'Blue (Secondary)', value: 'secondary' },
              { title: 'Yellow (Accent)', value: 'accent' },
              { title: 'Red (Warm)', value: 'warm' }
            ]
          }
        },
        {
          name: 'title',
          title: 'Title',
          type: 'string'
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text'
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          hidden: ({ parent }: any) => parent?.variant !== 'image'
        },
        {
          name: 'videoUrl',
          title: 'Video URL',
          type: 'url',
          hidden: ({ parent }: any) => parent?.variant !== 'video'
        },
        {
          name: 'cta',
          title: 'Call to Action',
          type: 'object',
          fields: [
            { name: 'text', type: 'string', title: 'Button Text' },
            { name: 'link', type: 'string', title: 'Button Link' },
            { name: 'color', type: 'string', title: 'Button Color', 
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                  { title: 'Accent', value: 'accent' },
                  { title: 'Warm', value: 'warm' }
                ]
              }
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'featuresBlock',
          title: 'Features Block',
          fields: [
            {
              name: 'blockType',
              type: 'string',
              initialValue: 'features',
              hidden: true
            },
            {
              name: 'title',
              title: 'Section Title',
              type: 'string'
            },
            {
              name: 'colorScheme',
              title: 'Color Scheme',
              type: 'string',
              options: {
                list: [
                  { title: 'Alternating', value: 'alternating' },
                  { title: 'All Primary', value: 'primary' },
                  { title: 'All Secondary', value: 'secondary' },
                  { title: 'Rainbow', value: 'rainbow' }
                ]
              }
            },
            {
              name: 'items',
              title: 'Feature Items',
              type: 'array',
              of: [{
                type: 'object',
                fields: [
                  { name: 'icon', type: 'string', title: 'Icon' },
                  { name: 'title', type: 'string', title: 'Title' },
                  { name: 'description', type: 'text', title: 'Description' },
                  { name: 'color', type: 'string', title: 'Color Override',
                    options: {
                      list: [
                        { title: 'Primary', value: 'primary' },
                        { title: 'Secondary', value: 'secondary' },
                        { title: 'Accent', value: 'accent' },
                        { title: 'Warm', value: 'warm' }
                      ]
                    }
                  }
                ]
              }]
            }
          ]
        },
        {
          type: 'object',
          name: 'ctaSection',
          title: 'CTA Section',
          fields: [
            {
              name: 'blockType',
              type: 'string',
              initialValue: 'cta',
              hidden: true
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string'
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text'
            },
            {
              name: 'buttonText',
              title: 'Button Text',
              type: 'string'
            },
            {
              name: 'buttonLink',
              title: 'Button Link',
              type: 'string'
            },
            {
              name: 'buttonColor',
              title: 'Button Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Secondary', value: 'secondary' },
                  { title: 'Accent', value: 'accent' },
                  { title: 'Warm', value: 'warm' }
                ]
              }
            },
            {
              name: 'backgroundType',
              title: 'Background Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Gradient Primary', value: 'gradient-primary' },
                  { title: 'Gradient Secondary', value: 'gradient-secondary' },
                  { title: 'Gradient Accent', value: 'gradient-accent' },
                  { title: 'Soft Primary', value: 'soft-primary' },
                  { title: 'Soft Secondary', value: 'soft-secondary' }
                ]
              }
            }
          ]
        },
        {
          type: 'object',
          name: 'testimonialBlock',
          title: 'Testimonial Block',
          fields: [
            {
              name: 'blockType',
              type: 'string',
              initialValue: 'testimonials',
              hidden: true
            },
            {
              name: 'title',
              title: 'Section Title',
              type: 'string'
            },
            {
              name: 'colorPattern',
              title: 'Color Pattern',
              type: 'string',
              options: {
                list: [
                  { title: 'Alternating', value: 'alternating' },
                  { title: 'Random', value: 'random' }
                ]
              }
            },
            {
              name: 'testimonials',
              title: 'Testimonials',
              type: 'array',
              of: [{
                type: 'reference',
                to: [{ type: 'testimonial' }]
              }]
            }
          ]
        },
        {
          type: 'object',
          name: 'imageGallery',
          title: 'Image Gallery',
          fields: [
            {
              name: 'blockType',
              type: 'string',
              initialValue: 'gallery',
              hidden: true
            },
            {
              name: 'title',
              title: 'Section Title',
              type: 'string'
            },
            {
              name: 'layout',
              title: 'Layout',
              type: 'string',
              options: {
                list: [
                  { title: 'Grid', value: 'grid' },
                  { title: 'Masonry', value: 'masonry' },
                  { title: 'Carousel', value: 'carousel' }
                ]
              }
            },
            {
              name: 'images',
              title: 'Images',
              type: 'array',
              of: [{
                type: 'image',
                fields: [
                  { name: 'caption', type: 'string', title: 'Caption' },
                  { name: 'alt', type: 'string', title: 'Alt Text' }
                ]
              }]
            }
          ]
        }
      ]
    })
  ]
})