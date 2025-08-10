import { defineField, defineType } from 'sanity'

const resource = defineType({
  name: 'resource',
  title: 'Resources',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Franšiza vodič', value: 'franchise_guide' },
          { title: 'Metodologija', value: 'methodology' },
          { title: 'Biznis planovi', value: 'business_plans' },
          { title: 'Marketing materijali', value: 'marketing' },
          { title: 'Obuka i edukacija', value: 'training' },
          { title: 'Pravni dokumenti', value: 'legal' },
          { title: 'Studije slučaja', value: 'case_studies' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'resourceType',
      title: 'Resource Type',
      type: 'string',
      options: {
        list: [
          { title: 'PDF dokument', value: 'pdf' },
          { title: 'Video', value: 'video' },
          { title: 'Prezentacija', value: 'presentation' },
          { title: 'Excel template', value: 'excel' },
          { title: 'Infografika', value: 'infographic' },
          { title: 'Checklist', value: 'checklist' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      options: {
        accept: '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'fileSize',
      title: 'File Size (MB)',
      type: 'number',
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: 'pages',
      title: 'Number of Pages',
      type: 'number',
      description: 'For PDFs and documents',
      validation: (Rule) => Rule.positive(),
    }),
    defineField({
      name: 'requiresLead',
      title: 'Requires Lead Capture',
      type: 'boolean',
      initialValue: true,
      description: 'User must provide email to download',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Resource',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'downloadCount',
      title: 'Download Count',
      type: 'number',
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'thumbnail',
      downloads: 'downloadCount',
    },
    prepare(selection) {
      const { title, category, downloads } = selection
      return {
        title,
        subtitle: `${category} - ${downloads || 0} preuzimanja`,
        media: selection.media,
      }
    },
  },
})

export default resource