import { defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export default defineType({
  name: 'modernSiteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  __experimental_actions: [
    'update',
    'publish',
    /* 'create', 'delete' */
  ],
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      description: 'Used for SEO meta description',
      validation: (Rule) => Rule.max(160),
    },
    {
      name: 'url',
      title: 'Site URL',
      type: 'url',
      description: 'The main URL for your site (used for SEO)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Site Logo',
      type: 'object',
      fields: [
        {
          name: 'light',
          title: 'Light Logo',
          type: 'image',
          description: 'Logo for light backgrounds',
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
          name: 'dark',
          title: 'Dark Logo',
          type: 'image',
          description: 'Logo for dark backgrounds',
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
          name: 'favicon',
          title: 'Favicon',
          type: 'image',
          description: 'Site icon (32x32px recommended)',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'navigation',
      title: 'Navigation Settings',
      type: 'object',
      fields: [
        {
          name: 'mainMenu',
          title: 'Main Menu',
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
                  name: 'link',
                  title: 'Link',
                  type: 'object',
                  fields: [
                    {
                      name: 'type',
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
                      to: [{ type: 'modernPage' }, { type: 'blogPost' }],
                      hidden: ({ parent }) => parent?.type !== 'internal',
                    },
                    {
                      name: 'url',
                      title: 'External URL',
                      type: 'url',
                      hidden: ({ parent }) => parent?.type !== 'external',
                    },
                    {
                      name: 'anchor',
                      title: 'Section ID',
                      type: 'string',
                      description: 'ID of section to scroll to (without #)',
                      hidden: ({ parent }) => parent?.type !== 'anchor',
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
                              name: 'type',
                              title: 'Link Type',
                              type: 'string',
                              options: {
                                list: [
                                  { title: 'Internal Page', value: 'internal' },
                                  { title: 'External URL', value: 'external' },
                                ],
                              },
                              initialValue: 'internal',
                            },
                            {
                              name: 'page',
                              title: 'Page',
                              type: 'reference',
                              to: [{ type: 'modernPage' }, { type: 'blogPost' }],
                              hidden: ({ parent }) => parent?.type !== 'internal',
                            },
                            {
                              name: 'url',
                              title: 'External URL',
                              type: 'url',
                              hidden: ({ parent }) => parent?.type !== 'external',
                            },
                          ],
                        },
                        {
                          name: 'icon',
                          title: 'Icon',
                          type: 'string',
                          description: 'Lucide React icon name',
                        },
                      ],
                      preview: {
                        select: {
                          title: 'title',
                          description: 'description',
                        },
                      },
                    },
                  ],
                },
                {
                  name: 'highlighted',
                  title: 'Highlight Menu Item',
                  type: 'boolean',
                  description: 'Show with special styling (e.g., button style)',
                  initialValue: false,
                },
              ],
              preview: {
                select: {
                  title: 'title',
                  hasSubmenu: 'submenu',
                  highlighted: 'highlighted',
                },
                prepare({ title, hasSubmenu, highlighted }) {
                  const badges = []
                  if (hasSubmenu?.length > 0) badges.push('HAS SUBMENU')
                  if (highlighted) badges.push('HIGHLIGHTED')
                  const badgeText = badges.length > 0 ? ` [${badges.join(', ')}]` : ''
                  
                  return {
                    title: `${title}${badgeText}`,
                  }
                },
              },
            },
          ],
        },
        {
          name: 'ctaButton',
          title: 'Navigation CTA Button',
          type: 'button',
          description: 'Call-to-action button in navigation',
        },
        {
          name: 'showSearchIcon',
          title: 'Show Search Icon',
          type: 'boolean',
          description: 'Show search icon in navigation',
          initialValue: true,
        },
        {
          name: 'stickyNavigation',
          title: 'Sticky Navigation',
          type: 'boolean',
          description: 'Keep navigation visible when scrolling',
          initialValue: true,
        },
      ],
    },
    {
      name: 'footer',
      title: 'Footer Settings',
      type: 'object',
      fields: [
        {
          name: 'description',
          title: 'Footer Description',
          type: 'text',
          description: 'Brief description shown in footer',
        },
        {
          name: 'columns',
          title: 'Footer Columns',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'footerColumn',
              fields: [
                {
                  name: 'title',
                  title: 'Column Title',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'links',
                  title: 'Links',
                  type: 'array',
                  of: [
                    {
                      type: 'object',
                      name: 'footerLink',
                      fields: [
                        {
                          name: 'title',
                          title: 'Link Title',
                          type: 'string',
                          validation: (Rule) => Rule.required(),
                        },
                        {
                          name: 'link',
                          title: 'Link',
                          type: 'object',
                          fields: [
                            {
                              name: 'type',
                              title: 'Link Type',
                              type: 'string',
                              options: {
                                list: [
                                  { title: 'Internal Page', value: 'internal' },
                                  { title: 'External URL', value: 'external' },
                                  { title: 'Email', value: 'email' },
                                  { title: 'Phone', value: 'phone' },
                                ],
                              },
                              initialValue: 'internal',
                            },
                            {
                              name: 'page',
                              title: 'Page',
                              type: 'reference',
                              to: [{ type: 'modernPage' }, { type: 'blogPost' }],
                              hidden: ({ parent }) => parent?.type !== 'internal',
                            },
                            {
                              name: 'url',
                              title: 'URL',
                              type: 'url',
                              hidden: ({ parent }) => parent?.type !== 'external',
                            },
                            {
                              name: 'email',
                              title: 'Email',
                              type: 'email',
                              hidden: ({ parent }) => parent?.type !== 'email',
                            },
                            {
                              name: 'phone',
                              title: 'Phone',
                              type: 'string',
                              hidden: ({ parent }) => parent?.type !== 'phone',
                            },
                          ],
                        },
                      ],
                      preview: {
                        select: {
                          title: 'title',
                        },
                      },
                    },
                  ],
                },
              ],
              preview: {
                select: {
                  title: 'title',
                  linksCount: 'links.length',
                },
                prepare({ title, linksCount }) {
                  return {
                    title,
                    subtitle: `${linksCount || 0} links`,
                  }
                },
              },
            },
          ],
        },
        {
          name: 'socialLinks',
          title: 'Social Media Links',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'socialLink',
              fields: [
                {
                  name: 'platform',
                  title: 'Social Platform',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Facebook', value: 'facebook' },
                      { title: 'Instagram', value: 'instagram' },
                      { title: 'Twitter/X', value: 'twitter' },
                      { title: 'LinkedIn', value: 'linkedin' },
                      { title: 'YouTube', value: 'youtube' },
                      { title: 'TikTok', value: 'tiktok' },
                      { title: 'WhatsApp', value: 'whatsapp' },
                      { title: 'Telegram', value: 'telegram' },
                    ],
                  },
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'url',
                  title: 'Profile URL',
                  type: 'url',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'showInHeader',
                  title: 'Show in Header',
                  type: 'boolean',
                  description: 'Also show this social link in the header',
                  initialValue: false,
                },
              ],
              preview: {
                select: {
                  platform: 'platform',
                  url: 'url',
                  showInHeader: 'showInHeader',
                },
                prepare({ platform, url, showInHeader }) {
                  return {
                    title: platform || 'Social Link',
                    subtitle: `${url}${showInHeader ? ' • Also in header' : ''}`,
                  }
                },
              },
            },
          ],
        },
        {
          name: 'copyright',
          title: 'Copyright Text',
          type: 'string',
          description: 'Copyright notice (year will be added automatically)',
        },
        {
          name: 'newsletter',
          title: 'Newsletter Signup',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'Show Newsletter Signup',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'title',
              title: 'Newsletter Title',
              type: 'string',
              hidden: ({ parent }) => !parent?.enabled,
            },
            {
              name: 'description',
              title: 'Newsletter Description',
              type: 'text',
              hidden: ({ parent }) => !parent?.enabled,
            },
            {
              name: 'placeholder',
              title: 'Email Placeholder',
              type: 'string',
              initialValue: 'Enter your email',
              hidden: ({ parent }) => !parent?.enabled,
            },
          ],
        },
      ],
    },
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email Address',
          type: 'email',
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        },
        {
          name: 'whatsapp',
          title: 'WhatsApp Number',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Physical Address',
          type: 'object',
          fields: [
            {
              name: 'street',
              title: 'Street Address',
              type: 'string',
            },
            {
              name: 'city',
              title: 'City',
              type: 'string',
            },
            {
              name: 'postalCode',
              title: 'Postal Code',
              type: 'string',
            },
            {
              name: 'country',
              title: 'Country',
              type: 'string',
            },
          ],
        },
        {
          name: 'workingHours',
          title: 'Working Hours',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'workingDay',
              fields: [
                {
                  name: 'day',
                  title: 'Day',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Monday', value: 'monday' },
                      { title: 'Tuesday', value: 'tuesday' },
                      { title: 'Wednesday', value: 'wednesday' },
                      { title: 'Thursday', value: 'thursday' },
                      { title: 'Friday', value: 'friday' },
                      { title: 'Saturday', value: 'saturday' },
                      { title: 'Sunday', value: 'sunday' },
                    ],
                  },
                },
                {
                  name: 'hours',
                  title: 'Hours',
                  type: 'string',
                  description: 'e.g., "9:00 - 17:00" or "Closed"',
                },
              ],
              preview: {
                select: {
                  day: 'day',
                  hours: 'hours',
                },
                prepare({ day, hours }) {
                  return {
                    title: day || 'Day',
                    subtitle: hours || 'No hours set',
                  }
                },
              },
            },
          ],
        },
      ],
    },
    {
      name: 'seo',
      title: 'Default SEO Settings',
      type: 'object',
      description: 'Default settings for pages without specific SEO configuration',
      fields: [
        {
          name: 'defaultImage',
          title: 'Default Social Share Image',
          type: 'image',
          description: 'Default image for social media sharing (1200x630px recommended)',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'twitterHandle',
          title: 'Twitter Handle',
          type: 'string',
          description: 'Twitter username (without @)',
        },
        {
          name: 'facebookAppId',
          title: 'Facebook App ID',
          type: 'string',
        },
        {
          name: 'gtmId',
          title: 'Google Tag Manager ID',
          type: 'string',
          description: 'Google Tag Manager container ID (GTM-XXXXXXX)',
        },
        {
          name: 'gaMeasurementId',
          title: 'Google Analytics Measurement ID',
          type: 'string',
          description: 'Google Analytics 4 Measurement ID (G-XXXXXXXXXX)',
        },
      ],
    },
    {
      name: 'integrations',
      title: 'Third-party Integrations',
      type: 'object',
      fields: [
        {
          name: 'calendly',
          title: 'Calendly Settings',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'Enable Calendly Integration',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'url',
              title: 'Calendly URL',
              type: 'url',
              description: 'Your Calendly scheduling URL',
              hidden: ({ parent }) => !parent?.enabled,
            },
          ],
        },
        {
          name: 'mailchimp',
          title: 'Mailchimp Settings',
          type: 'object',
          fields: [
            {
              name: 'enabled',
              title: 'Enable Mailchimp Integration',
              type: 'boolean',
              initialValue: false,
            },
            {
              name: 'listId',
              title: 'Mailchimp List ID',
              type: 'string',
              description: 'Newsletter subscriber list ID',
              hidden: ({ parent }) => !parent?.enabled,
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Site Settings',
      }
    },
  },
})
