import { defineField, defineType } from 'sanity'

// Helper function to calculate reading time
function calculateReadingTime(content: any[]): number {
  if (!content) return 1
  
  const wordsPerMinute = 200 // Average reading speed
  const textBlocks = content.filter(block => block._type === 'block')
  const wordCount = textBlocks.reduce((count, block) => {
    const text = block.children?.map((child: any) => child.text).join(' ') || ''
    return count + text.split(' ').filter(word => word.length > 0).length
  }, 0)
  
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

export default defineType({
  name: 'blogPost',
  title: 'Blog Članak',
  type: 'document',
  icon: () => '📝',
  groups: [
    { name: 'content', title: 'Sadržaj' },
    { name: 'meta', title: 'Meta Podaci' },
    { name: 'seo', title: 'SEO' }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov Članka',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content'
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) => input
          .toLowerCase()
          .replace(/š/g, 's')
          .replace(/č/g, 'c')
          .replace(/ć/g, 'c')
          .replace(/ž/g, 'z')
          .replace(/đ/g, 'dj')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      },
      validation: (Rule) => Rule.required(),
      group: 'content'
    }),
    defineField({
      name: 'excerpt',
      title: 'Kratak Opis',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
      description: 'Kratak opis koji će se prikazati na listing stranici',
      group: 'content'
    }),
    defineField({
      name: 'featuredImage',
      title: 'Glavna Slika',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      description: 'Slika koja će se prikazati kao cover članka',
      group: 'content'
    }),
    defineField({
      name: 'content',
      title: 'Sadržaj Članka',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
      group: 'content'
    }),
    defineField({
      name: 'category',
      title: 'Kategorija',
      type: 'reference',
      to: { type: 'blogCategory' },
      validation: (Rule) => Rule.required(),
      group: 'meta'
    }),
    defineField({
      name: 'tags',
      title: 'Tagovi',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
      description: 'Dodajte relevantne tagove za lakše pronalaženje',
      group: 'meta'
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: { type: 'author' },
      validation: (Rule) => Rule.required(),
      group: 'meta'
    }),
    defineField({
      name: 'publishedDate',
      title: 'Datum Objavljivanja',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
      group: 'meta'
    }),
    defineField({
      name: 'isFeatured',
      title: 'Istaknut Članak',
      type: 'boolean',
      initialValue: false,
      description: 'Da li će se članak prikazati kao istaknut na početnoj strani',
      group: 'meta'
    }),
    defineField({
      name: 'readingTime',
      title: 'Vreme Čitanja (min)',
      type: 'number',
      readOnly: true,
      description: 'Automatski izračunato na osnovu sadržaja',
      group: 'meta'
    }),
    defineField({
      name: 'seo',
      title: 'SEO Podešavanja',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Naslov',
          type: 'string',
          validation: (Rule) => Rule.max(60),
          description: 'Naslov za search engines (max 60 karaktera)'
        },
        {
          name: 'metaDescription',
          title: 'Meta Opis',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.max(160),
          description: 'Opis za search engines (max 160 karaktera)'
        }
      ],
      group: 'seo'
    })
  ],
  
  // Auto-calculate reading time when content changes
  initialValue: () => ({
    publishedDate: new Date().toISOString(),
    isFeatured: false,
    readingTime: 1
  }),
  
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'featuredImage',
      date: 'publishedDate',
      category: 'category.name',
      featured: 'isFeatured'
    },
    prepare(selection) {
      const { author, date, category, featured } = selection
      const featuredBadge = featured ? ' ⭐' : ''
      
      return {
        ...selection,
        title: `${selection.title}${featuredBadge}`,
        subtitle: `${category || 'Bez kategorije'} • ${author || 'Bez autora'} • ${
          date ? new Date(date).toLocaleDateString('sr-RS') : 'Bez datuma'
        }`
      }
    }
  },
  
  orderings: [
    {
      title: 'Datum objavljivanja (najnoviji)',
      name: 'publishedDateDesc',
      by: [
        { field: 'publishedDate', direction: 'desc' }
      ]
    },
    {
      title: 'Naslov (A-Z)',
      name: 'titleAsc',
      by: [
        { field: 'title', direction: 'asc' }
      ]
    }
  ]
})