import { defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export default defineType({
  name: 'modernFranchiseLocation',
  title: 'Franchise Location',
  type: 'document',
  icon: HomeIcon,
  fields: [
    {
      name: 'name',
      title: 'Location Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Location Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Opening Soon', value: 'opening_soon' },
          { title: 'Planned', value: 'planned' },
          { title: 'Closed', value: 'closed' },
        ],
      },
      initialValue: 'active',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'franchisePackage',
      title: 'Franchise Package',
      type: 'reference',
      to: [{ type: 'modernFranchisePackage' }],
      description: 'Which package this location is based on',
    },
    {
      name: 'franchisee',
      title: 'Franchisee Information',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Franchisee Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'email',
          title: 'Email',
          type: 'email',
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        },
        {
          name: 'bio',
          title: 'Franchisee Bio',
          type: 'array',
          of: [{ type: 'block' }],
          description: 'Brief bio of the franchisee',
        },
        {
          name: 'photo',
          title: 'Franchisee Photo',
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
          name: 'qualifications',
          title: 'Qualifications',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Educational qualifications and certifications',
        },
        {
          name: 'experience',
          title: 'Experience',
          type: 'text',
          description: 'Professional experience relevant to education',
        },
      ],
    },
    {
      name: 'contact',
      title: 'Location Contact',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Location Email',
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
          name: 'website',
          title: 'Location Website',
          type: 'url',
        },
        {
          name: 'socialMedia',
          title: 'Social Media',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'socialLink',
              fields: [
                {
                  name: 'platform',
                  title: 'Platform',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Facebook', value: 'facebook' },
                      { title: 'Instagram', value: 'instagram' },
                      { title: 'LinkedIn', value: 'linkedin' },
                      { title: 'YouTube', value: 'youtube' },
                    ],
                  },
                },
                {
                  name: 'url',
                  title: 'Profile URL',
                  type: 'url',
                },
              ],
            },
          ],
        },
      ],
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
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'city',
          title: 'City',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'municipality',
          title: 'Municipality',
          type: 'string',
        },
        {
          name: 'postalCode',
          title: 'Postal Code',
          type: 'string',
        },
        {
          name: 'region',
          title: 'Region/State',
          type: 'string',
        },
        {
          name: 'country',
          title: 'Country',
          type: 'string',
          initialValue: 'Serbia',
        },
        {
          name: 'coordinates',
          title: 'GPS Coordinates',
          type: 'object',
          fields: [
            {
              name: 'latitude',
              title: 'Latitude',
              type: 'number',
              validation: (Rule) => Rule.min(-90).max(90),
            },
            {
              name: 'longitude',
              title: 'Longitude',
              type: 'number',
              validation: (Rule) => Rule.min(-180).max(180),
            },
          ],
          description: 'GPS coordinates for map display',
        },
      ],
    },
    {
      name: 'services',
      title: 'Services Offered',
      type: 'object',
      fields: [
        {
          name: 'programs',
          title: 'Educational Programs',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'program' }] }],
          description: 'Programs offered at this location',
        },
        {
          name: 'ageGroups',
          title: 'Age Groups Served',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'ageGroup',
              fields: [
                {
                  name: 'name',
                  title: 'Age Group Name',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'minAge',
                  title: 'Minimum Age',
                  type: 'number',
                  validation: (Rule) => Rule.min(0).max(18),
                },
                {
                  name: 'maxAge',
                  title: 'Maximum Age',
                  type: 'number',
                  validation: (Rule) => Rule.min(0).max(18),
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                },
              ],
              preview: {
                select: {
                  name: 'name',
                  minAge: 'minAge',
                  maxAge: 'maxAge',
                },
                prepare({ name, minAge, maxAge }) {
                  const ageRange = minAge && maxAge ? ` (${minAge}-${maxAge} years)` : ''
                  return {
                    title: name || 'Age Group',
                    subtitle: `${ageRange}`,
                  }
                },
              },
            },
          ],
        },
        {
          name: 'specialServices',
          title: 'Special Services',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Additional services like tutoring, workshops, etc.',
        },
        {
          name: 'capacity',
          title: 'Student Capacity',
          type: 'number',
          description: 'Maximum number of students',
        },
      ],
    },
    {
      name: 'schedule',
      title: 'Operating Schedule',
      type: 'object',
      fields: [
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
                  name: 'openTime',
                  title: 'Opening Time',
                  type: 'string',
                  description: 'Format: HH:MM (24-hour)',
                },
                {
                  name: 'closeTime',
                  title: 'Closing Time',
                  type: 'string',
                  description: 'Format: HH:MM (24-hour)',
                },
                {
                  name: 'closed',
                  title: 'Closed',
                  type: 'boolean',
                  description: 'Is this location closed on this day?',
                  initialValue: false,
                },
              ],
              preview: {
                select: {
                  day: 'day',
                  openTime: 'openTime',
                  closeTime: 'closeTime',
                  closed: 'closed',
                },
                prepare({ day, openTime, closeTime, closed }) {
                  const hours = closed ? 'Closed' : `${openTime || '?'} - ${closeTime || '?'}`
                  return {
                    title: day || 'Day',
                    subtitle: hours,
                  }
                },
              },
            },
          ],
        },
        {
          name: 'holidaySchedule',
          title: 'Holiday Schedule',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'holiday',
              fields: [
                {
                  name: 'name',
                  title: 'Holiday Name',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'date',
                  title: 'Date',
                  type: 'date',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: 'closed',
                  title: 'Closed',
                  type: 'boolean',
                  initialValue: true,
                },
                {
                  name: 'alternativeHours',
                  title: 'Alternative Hours',
                  type: 'string',
                  description: 'If not closed, what are the alternative hours?',
                  hidden: ({ parent }) => parent?.closed,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'images',
      title: 'Location Images',
      type: 'object',
      fields: [
        {
          name: 'featured',
          title: 'Featured Image',
          type: 'image',
          description: 'Main image for the location',
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
          name: 'gallery',
          title: 'Image Gallery',
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
                  title: 'Caption',
                  type: 'string',
                },
              ],
            },
          ],
        },
        {
          name: 'exterior',
          title: 'Exterior Photos',
          type: 'array',
          of: [
            {
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
        {
          name: 'interior',
          title: 'Interior Photos',
          type: 'array',
          of: [
            {
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'testimonials',
      title: 'Location Testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
      description: 'Testimonials specific to this location',
    },
    {
      name: 'achievements',
      title: 'Location Achievements',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'achievement',
          fields: [
            {
              name: 'title',
              title: 'Achievement Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
            {
              name: 'date',
              title: 'Date Achieved',
              type: 'date',
            },
            {
              name: 'icon',
              title: 'Achievement Icon',
              type: 'string',
              description: 'Lucide React icon name',
            },
            {
              name: 'badge',
              title: 'Achievement Badge',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
          preview: {
            select: {
              title: 'title',
              date: 'date',
              media: 'badge',
            },
          },
        },
      ],
    },
    {
      name: 'statistics',
      title: 'Location Statistics',
      type: 'array',
      of: [{ type: 'statistic' }],
      description: 'Key statistics for this location',
    },
    {
      name: 'openingDate',
      title: 'Opening Date',
      type: 'date',
      description: 'When did this location open?',
    },
    {
      name: 'featured',
      title: 'Featured Location',
      type: 'boolean',
      description: 'Highlight this location on the website',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order for displaying locations (lower numbers first)',
      initialValue: 0,
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'order',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Location Name',
      name: 'name',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'City',
      name: 'city',
      by: [{ field: 'address.city', direction: 'asc' }],
    },
    {
      title: 'Status',
      name: 'status',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      city: 'address.city',
      status: 'status',
      franchiseeName: 'franchisee.name',
      featured: 'featured',
      media: 'images.featured',
    },
    prepare({ title, city, status, franchiseeName, featured, media }) {
      const badges = []
      if (featured) badges.push('FEATURED')
      const badgeText = badges.length > 0 ? `[${badges.join(', ')}] ` : ''
      
      return {
        title: `${badgeText}${title}`,
        subtitle: `${city || 'Unknown City'} • ${status} • ${franchiseeName || 'No franchisee'}`,
        media,
      }
    },
  },
})
