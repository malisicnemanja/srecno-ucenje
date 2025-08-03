import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'navigationSettings',
  title: 'Navigation Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'mainMenu',
      title: 'Main Menu',
      type: 'object',
      fields: [
        {
          name: 'hideHomeLink',
          title: 'Hide Home Link',
          type: 'boolean',
          description: 'Logo serves as home link'
        },
        {
          name: 'maxItems',
          title: 'Maximum Items',
          type: 'number',
          validation: (Rule) => Rule.min(3).max(7)
        },
        {
          name: 'items',
          title: 'Menu Items',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'label',
                title: 'Label',
                type: 'string',
                validation: (Rule) => Rule.required()
              },
              {
                name: 'link',
                title: 'Link',
                type: 'string',
                description: 'Use # for dropdown menus'
              },
              {
                name: 'dropdown',
                title: 'Dropdown Items',
                type: 'array',
                of: [{
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (Rule) => Rule.required()
                    },
                    {
                      name: 'link',
                      title: 'Link',
                      type: 'string',
                      validation: (Rule) => Rule.required()
                    }
                  ]
                }]
              }
            ]
          }]
        }
      ]
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        {
          name: 'columns',
          title: 'Footer Columns',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              {
                name: 'title',
                title: 'Column Title',
                type: 'string',
                validation: (Rule) => Rule.required()
              },
              {
                name: 'colorAccent',
                title: 'Color Accent',
                type: 'string',
                options: {
                  list: [
                    { title: 'Primary (Green)', value: 'primary' },
                    { title: 'Secondary (Blue)', value: 'secondary' },
                    { title: 'Accent (Yellow)', value: 'accent' },
                    { title: 'Warm (Red)', value: 'warm' }
                  ]
                }
              },
              {
                name: 'links',
                title: 'Links',
                type: 'array',
                of: [{
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (Rule) => Rule.required()
                    },
                    {
                      name: 'link',
                      title: 'Link',
                      type: 'string',
                      validation: (Rule) => Rule.required()
                    }
                  ]
                }]
              }
            ]
          }]
        },
        {
          name: 'contactInfo',
          title: 'Contact Information',
          type: 'object',
          fields: [
            {
              name: 'email',
              title: 'Email',
              type: 'string'
            },
            {
              name: 'phone',
              title: 'Phone',
              type: 'string'
            },
            {
              name: 'website',
              title: 'Website',
              type: 'string'
            }
          ]
        }
      ]
    })
  ]
})