import { defineType } from 'sanity'
import { MenuIcon } from '@sanity/icons'

export default defineType({
  name: 'modernNavigation',
  title: 'Navigation Menu',
  type: 'document',
  icon: MenuIcon,
  __experimental_actions: [
    'update',
    'publish',
    /* 'create', 'delete' */
  ],
  fields: [
    {
      name: 'title',
      title: 'Navigation Title',
      type: 'string',
      description: 'Internal title for organization',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'menuType',
      title: 'Menu Type',
      type: 'string',
      options: {
        list: [
          { title: 'Main Navigation', value: 'main' },
          { title: 'Footer Navigation', value: 'footer' },
          { title: 'Mobile Menu', value: 'mobile' },
          { title: 'Sidebar Menu', value: 'sidebar' },
        ],
      },
      initialValue: 'main',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'menuItems',
      title: 'Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'menuItem',
          fields: [
            {
              name: 'title',
              title: 'Menu Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
              description: 'Optional subtitle for mega menu items',
            },
            {
              name: 'link',
              title: 'Link',
              type: 'object',
              fields: [
                {
                  name: 'linkType',
                  title: 'Link Type',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Internal Page', value: 'internal' },
                      { title: 'External URL', value: 'external' },
                      { title: 'Section Anchor', value: 'anchor' },
                      { title: 'No Link (Menu Parent)', value: 'none' },
                    ],
                  },
                  initialValue: 'internal',
                },
                {
                  name: 'page',
                  title: 'Page',
                  type: 'reference',
                  to: [
                    { type: 'modernPage' },
                    { type: 'page' },
                    { type: 'blogPost' },
                  ],
                  hidden: ({ parent }) => parent?.linkType !== 'internal',
                },
                {
                  name: 'externalUrl',
                  title: 'External URL',
                  type: 'url',
                  hidden: ({ parent }) => parent?.linkType !== 'external',
                },
                {
                  name: 'anchor',
                  title: 'Section ID',
                  type: 'string',
                  description: 'ID of section to scroll to (without #)',
                  hidden: ({ parent }) => parent?.linkType !== 'anchor',
                },
                {
                  name: 'openInNewTab',
                  title: 'Open in New Tab',
                  type: 'boolean',
                  initialValue: false,
                  hidden: ({ parent }) => parent?.linkType === 'none' || parent?.linkType === 'anchor',
                },
              ],
            },
            {
              name: 'icon',
              title: 'Menu Icon',
              type: 'string',
              description: 'Lucide React icon name (optional)',
            },
            {
              name: 'badge',
              title: 'Menu Badge',
              type: 'object',
              description: 'Optional badge like "New", "Hot", etc.',
              fields: [
                {
                  name: 'text',
                  title: 'Badge Text',
                  type: 'string',
                },
                {
                  name: 'color',
                  title: 'Badge Color',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Sky Blue', value: 'sky' },
                      { title: 'Sun Yellow', value: 'sun' },
                      { title: 'Grass Green', value: 'grass' },
                      { title: 'Heart Pink', value: 'heart' },
                      { title: 'Night Purple', value: 'night' },
                      { title: 'Red', value: 'red' },
                    ],
                  },
                  initialValue: 'sky',
                },
              ],
            },
            {
              name: 'submenu',
              title: 'Submenu Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'submenuItem',
                  fields: [
                    {
                      name: 'title',
                      title: 'Submenu Title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'description',
                      title: 'Description',
                      type: 'string',
                      description: 'Brief description for mega menu',
                    },
                    {
                      name: 'link',
                      title: 'Link',
                      type: 'object',
                      fields: [
                        {
                          name: 'linkType',
                          title: 'Link Type',
                          type: 'string',
                          options: {
                            list: [
                              { title: 'Internal Page', value: 'internal' },
                              { title: 'External URL', value: 'external' },
                              { title: 'Section Anchor', value: 'anchor' },
                            ],
                          },
                          initialValue: 'internal',
                        },
                        {
                          name: 'page',
                          title: 'Page',
                          type: 'reference',
                          to: [
                            { type: 'modernPage' },
                            { type: 'page' },
                            { type: 'blogPost' },
                          ],
                          hidden: ({ parent }) => parent?.linkType !== 'internal',
                        },
                        {
                          name: 'externalUrl',
                          title: 'External URL',
                          type: 'url',
                          hidden: ({ parent }) => parent?.linkType !== 'external',
                        },
                        {
                          name: 'anchor',
                          title: 'Section ID',
                          type: 'string',
                          description: 'ID of section to scroll to (without #)',
                          hidden: ({ parent }) => parent?.linkType !== 'anchor',
                        },
                      ],
                    },
                    {
                      name: 'icon',
                      title: 'Submenu Icon',
                      type: 'string',
                      description: 'Lucide React icon name',
                    },
                    {
                      name: 'image',
                      title: 'Submenu Image',
                      type: 'image',
                      description: 'Optional image for mega menu',
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
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      description: 'description',
                      media: 'image',
                    },
                    prepare({ title, description, media }) {
                      return {
                        title: title || 'Submenu Item',
                        subtitle: description,
                        media,
                      }
                    },
                  },
                },
              ],
            },
            {
              name: 'megaMenu',
              title: 'Mega Menu Configuration',
              type: 'object',
              description: 'Advanced mega menu settings',
              fields: [
                {
                  name: 'enabled',
                  title: 'Enable Mega Menu',
                  type: 'boolean',
                  description: 'Show this item as a mega menu',
                  initialValue: false,
                },
                {
                  name: 'columns',
                  title: 'Number of Columns',
                  type: 'number',
                  options: {
                    list: [2, 3, 4],
                  },
                  initialValue: 3,
                  hidden: ({ parent }) => !parent?.enabled,
                },
                {
                  name: 'showImages',
                  title: 'Show Images',
                  type: 'boolean',
                  description: 'Show images in mega menu items',
                  initialValue: true,
                  hidden: ({ parent }) => !parent?.enabled,
                },
                {
                  name: 'featuredContent',
                  title: 'Featured Content',
                  type: 'object',
                  description: 'Special featured section in mega menu',
                  fields: [
                    {
                      name: 'title',
                      title: 'Featured Title',
                      type: 'string',
                    },
                    {
                      name: 'description',
                      title: 'Featured Description',
                      type: 'text',
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
                      name: 'link',
                      title: 'Featured Link',
                      type: 'button',
                    },
                  ],
                  hidden: ({ parent }) => !parent?.enabled,
                },
              ],
            },
            {
              name: 'styling',
              title: 'Menu Item Styling',
              type: 'object',
              fields: [
                {
                  name: 'highlighted',
                  title: 'Highlight Menu Item',
                  type: 'boolean',
                  description: 'Show with special styling (e.g., button style)',
                  initialValue: false,
                },
                {
                  name: 'color',
                  title: 'Highlight Color',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Sky Blue', value: 'sky' },
                      { title: 'Sun Yellow', value: 'sun' },
                      { title: 'Grass Green', value: 'grass' },
                      { title: 'Heart Pink', value: 'heart' },
                      { title: 'Night Purple', value: 'night' },
                    ],
                  },
                  initialValue: 'sky',
                  hidden: ({ parent }) => !parent?.highlighted,
                },
              ],
            },
            {
              name: 'visibility',
              title: 'Visibility Settings',
              type: 'object',
              fields: [
                {
                  name: 'showOnDesktop',
                  title: 'Show on Desktop',
                  type: 'boolean',
                  initialValue: true,
                },
                {
                  name: 'showOnMobile',
                  title: 'Show on Mobile',
                  type: 'boolean',
                  initialValue: true,
                },
                {
                  name: 'requireAuth',
                  title: 'Require Authentication',
                  type: 'boolean',
                  description: 'Only show to logged-in users',
                  initialValue: false,
                },
                {
                  name: 'userRoles',
                  title: 'Show to User Roles',
                  type: 'array',
                  of: [{ type: 'string' }],
                  description: 'Show only to specific user roles',
                  options: {
                    list: [
                      { title: 'Admin', value: 'admin' },
                      { title: 'Franchisee', value: 'franchisee' },
                      { title: 'Teacher', value: 'teacher' },
                      { title: 'Parent', value: 'parent' },
                    ],
                  },
                  hidden: ({ parent }) => !parent?.requireAuth,
                },
              ],
            },
            {
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Order in menu (lower numbers first)',
              initialValue: 0,
            },
          ],
          preview: {
            select: {
              title: 'title',
              hasSubmenu: 'submenu',
              highlighted: 'styling.highlighted',
              megaMenuEnabled: 'megaMenu.enabled',
              order: 'order',
            },
            prepare({ title, hasSubmenu, highlighted, megaMenuEnabled, order }) {
              const badges = []
              if (hasSubmenu?.length > 0) badges.push('SUBMENU')
              if (megaMenuEnabled) badges.push('MEGA MENU')
              if (highlighted) badges.push('HIGHLIGHTED')
              const badgeText = badges.length > 0 ? ` [${badges.join(', ')}]` : ''
              
              return {
                title: `${order}. ${title}${badgeText}`,
              }
            },
          },
        },
      ],
    },
    {
      name: 'settings',
      title: 'Menu Settings',
      type: 'object',
      fields: [
        {
          name: 'sticky',
          title: 'Sticky Navigation',
          type: 'boolean',
          description: 'Keep navigation visible when scrolling',
          initialValue: true,
        },
        {
          name: 'showSearch',
          title: 'Show Search',
          type: 'boolean',
          description: 'Include search functionality',
          initialValue: true,
        },
        {
          name: 'showLogo',
          title: 'Show Logo',
          type: 'boolean',
          description: 'Display site logo in navigation',
          initialValue: true,
        },
        {
          name: 'showSocialLinks',
          title: 'Show Social Links',
          type: 'boolean',
          description: 'Display social media links',
          initialValue: false,
        },
        {
          name: 'ctaButton',
          title: 'CTA Button',
          type: 'button',
          description: 'Call-to-action button in navigation',
        },
      ],
    },
    {
      name: 'isActive',
      title: 'Active Menu',
      type: 'boolean',
      description: 'Is this menu currently active?',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      menuType: 'menuType',
      itemsCount: 'menuItems.length',
      isActive: 'isActive',
    },
    prepare({ title, menuType, itemsCount, isActive }) {
      const status = isActive ? 'Active' : 'Inactive'
      return {
        title: title || 'Navigation Menu',
        subtitle: `${menuType} • ${itemsCount || 0} items • ${status}`,
      }
    },
  },
})
