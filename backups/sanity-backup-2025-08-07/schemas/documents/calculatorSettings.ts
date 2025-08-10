import { defineField, defineType } from 'sanity'

const calculatorSettings = defineType({
  name: 'calculatorSettings',
  title: 'Calculator Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'franchiseModels',
      title: 'Franchise Models',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Model Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'basePrice',
              title: 'Base Price (EUR)',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
            {
              name: 'includedItems',
              title: 'Included Items',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'cities',
      title: 'Cities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'City Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'priceMultiplier',
              title: 'Price Multiplier',
              type: 'number',
              description: '1.0 = standard, 1.2 = 20% more expensive',
              validation: (Rule) => Rule.required().min(0.5).max(2),
            },
            {
              name: 'demandLevel',
              title: 'Demand Level',
              type: 'string',
              options: {
                list: [
                  { title: 'High', value: 'high' },
                  { title: 'Medium', value: 'medium' },
                  { title: 'Low', value: 'low' },
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'spaceRequirements',
      title: 'Space Requirements',
      type: 'object',
      fields: [
        {
          name: 'minSquareMeters',
          title: 'Minimum Square Meters',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: 'optimalSquareMeters',
          title: 'Optimal Square Meters',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: 'pricePerSquareMeter',
          title: 'Average Price per Square Meter',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        },
      ],
    }),
    defineField({
      name: 'renovationCosts',
      title: 'Renovation Costs',
      type: 'object',
      fields: [
        {
          name: 'basic',
          title: 'Basic Renovation (EUR/m²)',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: 'standard',
          title: 'Standard Renovation (EUR/m²)',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: 'premium',
          title: 'Premium Renovation (EUR/m²)',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        },
      ],
    }),
    defineField({
      name: 'operationalCosts',
      title: 'Operational Costs',
      type: 'object',
      fields: [
        {
          name: 'monthlyMarketing',
          title: 'Monthly Marketing (EUR)',
          type: 'number',
        },
        {
          name: 'monthlyUtilities',
          title: 'Monthly Utilities (EUR)',
          type: 'number',
        },
        {
          name: 'monthlyOther',
          title: 'Monthly Other Costs (EUR)',
          type: 'number',
        },
        {
          name: 'staffSalaryPerPerson',
          title: 'Staff Salary per Person (EUR)',
          type: 'number',
        },
      ],
    }),
    defineField({
      name: 'revenueSettings',
      title: 'Revenue Settings',
      type: 'object',
      fields: [
        {
          name: 'pricePerChild',
          title: 'Average Price per Child (EUR)',
          type: 'number',
          validation: (Rule) => Rule.required().min(0),
        },
        {
          name: 'averageChildrenPerGroup',
          title: 'Average Children per Group',
          type: 'number',
          validation: (Rule) => Rule.required().min(1),
        },
        {
          name: 'groupsPerDay',
          title: 'Groups per Day',
          type: 'number',
          validation: (Rule) => Rule.required().min(1),
        },
        {
          name: 'workingDaysPerMonth',
          title: 'Working Days per Month',
          type: 'number',
          validation: (Rule) => Rule.required().min(1).max(31),
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Calculator Settings',
      }
    },
  },
})

export default calculatorSettings