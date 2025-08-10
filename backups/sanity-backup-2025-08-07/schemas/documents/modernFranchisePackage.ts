import { defineType } from 'sanity'
import { PackageIcon } from '@sanity/icons'

export default defineType({
  name: 'modernFranchisePackage',
  title: 'Franchise Package',
  type: 'document',
  icon: PackageIcon,
  fields: [
    {
      name: 'name',
      title: 'Package Name',
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
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Brief description of the package',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Detailed description of the franchise package',
    },
    {
      name: 'packageType',
      title: 'Package Type',
      type: 'string',
      options: {
        list: [
          { title: 'Starter Package', value: 'starter' },
          { title: 'Professional Package', value: 'professional' },
          { title: 'Premium Package', value: 'premium' },
          { title: 'Enterprise Package', value: 'enterprise' },
          { title: 'Custom Package', value: 'custom' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'pricing',
      title: 'Pricing Information',
      type: 'object',
      fields: [
        {
          name: 'franchiseFee',
          title: 'Franchise Fee',
          type: 'number',
          description: 'One-time franchise fee in RSD',
        },
        {
          name: 'monthlyFee',
          title: 'Monthly Fee',
          type: 'number',
          description: 'Monthly recurring fee in RSD',
        },
        {
          name: 'royaltyPercentage',
          title: 'Royalty Percentage',
          type: 'number',
          description: 'Percentage of revenue as royalty',
          validation: (Rule) => Rule.min(0).max(100),
        },
        {
          name: 'setupCost',
          title: 'Setup Cost',
          type: 'number',
          description: 'Initial setup and training cost in RSD',
        },
        {
          name: 'totalInvestment',
          title: 'Total Initial Investment',
          type: 'number',
          description: 'Total amount needed to start in RSD',
        },
        {
          name: 'paymentPlans',
          title: 'Payment Plans',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'paymentPlan',
              fields: [
                {
                  name: 'name',
                  title: 'Plan Name',
                  type: 'string',
                },
                {
                  name: 'description',
                  title: 'Plan Description',
                  type: 'text',
                },
                {
                  name: 'installments',
                  title: 'Number of Installments',
                  type: 'number',
                },
                {
                  name: 'downPayment',
                  title: 'Down Payment',
                  type: 'number',
                },
              ],
            },
          ],
        },
        {
          name: 'discounts',
          title: 'Available Discounts',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'discount',
              fields: [
                {
                  name: 'name',
                  title: 'Discount Name',
                  type: 'string',
                },
                {
                  name: 'description',
                  title: 'Discount Description',
                  type: 'text',
                },
                {
                  name: 'amount',
                  title: 'Discount Amount',
                  type: 'number',
                  description: 'Amount in RSD or percentage',
                },
                {
                  name: 'isPercentage',
                  title: 'Is Percentage',
                  type: 'boolean',
                  initialValue: false,
                },
                {
                  name: 'validUntil',
                  title: 'Valid Until',
                  type: 'date',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'features',
      title: 'Package Features',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feature',
          fields: [
            {
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Feature Description',
              type: 'text',
            },
            {
              name: 'icon',
              title: 'Feature Icon',
              type: 'string',
              description: 'Lucide React icon name',
            },
            {
              name: 'included',
              title: 'Included in Package',
              type: 'boolean',
              initialValue: true,
            },
            {
              name: 'category',
              title: 'Feature Category',
              type: 'string',
              options: {
                list: [
                  { title: 'Training & Support', value: 'training' },
                  { title: 'Marketing Materials', value: 'marketing' },
                  { title: 'Technology Platform', value: 'technology' },
                  { title: 'Business Support', value: 'business' },
                  { title: 'Educational Resources', value: 'educational' },
                  { title: 'Ongoing Support', value: 'ongoing' },
                ],
              },
            },
          ],
          preview: {
            select: {
              title: 'title',
              included: 'included',
              category: 'category',
            },
            prepare({ title, included, category }) {
              return {
                title: title || 'Feature',
                subtitle: `${category} • ${included ? 'Included' : 'Not Included'}`,
              }
            },
          },
        },
      ],
    },
    {
      name: 'requirements',
      title: 'Requirements',
      type: 'object',
      fields: [
        {
          name: 'education',
          title: 'Educational Requirements',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'experience',
          title: 'Experience Requirements',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'financial',
          title: 'Financial Requirements',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'space',
          title: 'Space Requirements',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'other',
          title: 'Other Requirements',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    },
    {
      name: 'support',
      title: 'Support & Training',
      type: 'object',
      fields: [
        {
          name: 'initialTraining',
          title: 'Initial Training Program',
          type: 'object',
          fields: [
            {
              name: 'duration',
              title: 'Training Duration',
              type: 'string',
            },
            {
              name: 'format',
              title: 'Training Format',
              type: 'string',
              options: {
                list: [
                  { title: 'Online', value: 'online' },
                  { title: 'In-Person', value: 'inperson' },
                  { title: 'Hybrid', value: 'hybrid' },
                ],
              },
            },
            {
              name: 'topics',
              title: 'Training Topics',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
        },
        {
          name: 'ongoingSupport',
          title: 'Ongoing Support',
          type: 'array',
          of: [
            {
              type: 'object',
              name: 'supportItem',
              fields: [
                {
                  name: 'type',
                  title: 'Support Type',
                  type: 'string',
                },
                {
                  name: 'description',
                  title: 'Description',
                  type: 'text',
                },
                {
                  name: 'frequency',
                  title: 'Frequency',
                  type: 'string',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'territory',
      title: 'Territory Information',
      type: 'object',
      fields: [
        {
          name: 'exclusiveTerritory',
          title: 'Exclusive Territory',
          type: 'boolean',
          description: 'Does this package include exclusive territory rights?',
          initialValue: false,
        },
        {
          name: 'territorySize',
          title: 'Territory Size',
          type: 'string',
          description: 'Description of territory coverage',
          hidden: ({ parent }) => !parent?.exclusiveTerritory,
        },
        {
          name: 'populationRange',
          title: 'Population Range',
          type: 'string',
          description: 'Recommended population range for territory',
        },
        {
          name: 'marketAnalysis',
          title: 'Market Analysis Included',
          type: 'boolean',
          description: 'Is market analysis included in the package?',
          initialValue: false,
        },
      ],
    },
    {
      name: 'timeline',
      title: 'Launch Timeline',
      type: 'franchiseProcess',
      description: 'Step-by-step process from application to launch',
    },
    {
      name: 'faq',
      title: 'Package-Specific FAQ',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'faq' }] }],
      description: 'FAQ items specific to this package',
    },
    {
      name: 'testimonials',
      title: 'Package Testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
      description: 'Testimonials from franchisees who chose this package',
    },
    {
      name: 'gallery',
      title: 'Package Gallery',
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
      description: 'Images showcasing this package',
    },
    {
      name: 'isPopular',
      title: 'Popular Package',
      type: 'boolean',
      description: 'Mark as most popular package',
      initialValue: false,
    },
    {
      name: 'isActive',
      title: 'Active Package',
      type: 'boolean',
      description: 'Is this package currently available?',
      initialValue: true,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order for displaying packages (lower numbers first)',
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
      title: 'Package Name',
      name: 'name',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Package Type',
      name: 'packageType',
      by: [{ field: 'packageType', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'subtitle',
      packageType: 'packageType',
      franchiseFee: 'pricing.franchiseFee',
      isPopular: 'isPopular',
      isActive: 'isActive',
    },
    prepare({ title, subtitle, packageType, franchiseFee, isPopular, isActive }) {
      const price = franchiseFee ? `${franchiseFee.toLocaleString()} RSD` : 'Price TBD'
      const badges = []
      if (isPopular) badges.push('POPULAR')
      if (!isActive) badges.push('INACTIVE')
      const badgeText = badges.length > 0 ? `[${badges.join(', ')}] ` : ''
      
      return {
        title: `${badgeText}${title}`,
        subtitle: `${packageType} • ${price} • ${subtitle || 'No subtitle'}`,
      }
    },
  },
})
