import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'validationRules',
  title: 'Validation Rules',
  type: 'object',
  fields: [
    defineField({
      name: 'required',
      title: 'Required Field',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'minLength',
      title: 'Minimum Length',
      type: 'number',
      validation: Rule => Rule.min(0)
    }),
    defineField({
      name: 'maxLength',
      title: 'Maximum Length',
      type: 'number',
      validation: Rule => Rule.min(1)
    }),
    defineField({
      name: 'minValue',
      title: 'Minimum Value',
      type: 'number'
    }),
    defineField({
      name: 'maxValue',
      title: 'Maximum Value', 
      type: 'number'
    }),
    defineField({
      name: 'pattern',
      title: 'Regex Pattern',
      type: 'string',
      description: 'Regular expression for validation'
    }),
    defineField({
      name: 'customValidation',
      title: 'Custom JavaScript Validation',
      type: 'text',
      description: 'JavaScript function that returns true for valid input'
    }),
    defineField({
      name: 'errorMessage',
      title: 'Custom Error Message',
      type: 'string'
    }),
    defineField({
      name: 'acceptedFileTypes',
      title: 'Accepted File Types',
      type: 'string',
      description: 'Comma-separated list of file extensions (e.g., .pdf,.doc,.jpg)',
      hidden: ({ parent }) => parent?.type !== 'file'
    }),
    defineField({
      name: 'maxFileSize',
      title: 'Maximum File Size (MB)',
      type: 'number',
      validation: Rule => Rule.min(0.1).max(100),
      hidden: ({ parent }) => parent?.type !== 'file'
    })
  ]
})