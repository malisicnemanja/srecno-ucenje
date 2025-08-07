import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'financialCalculatorPage',
  title: 'Finansijski kalkulator stranica',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov stranice',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL putanja',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'hero',
      title: 'Hero sekcija',
      type: 'object',
      fields: [
        { name: 'title', title: 'Naslov', type: 'string', validation: Rule => Rule.required() },
        { name: 'subtitle', title: 'Podnaslov', type: 'text' },
        { name: 'description', title: 'Opis', type: 'array', of: [{ type: 'block' }] },
        { name: 'image', title: 'Slika', type: 'image', options: { hotspot: true } }
      ]
    }),
    defineField({
      name: 'calculatorParameters',
      title: 'Parametri kalkulatora',
      type: 'object',
      fields: [
        defineField({
          name: 'inputFields',
          title: 'Input polja',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', title: 'Naziv polja', type: 'string', validation: Rule => Rule.required() },
                { name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required() },
                { name: 'type', title: 'Tip polja', type: 'string', options: {
                  list: [
                    { title: 'Broj', value: 'number' },
                    { title: 'Select', value: 'select' },
                    { title: 'Range slider', value: 'range' },
                    { title: 'Checkbox', value: 'checkbox' }
                  ]
                }, validation: Rule => Rule.required() },
                { name: 'placeholder', title: 'Placeholder', type: 'string' },
                { name: 'defaultValue', title: 'Default vrednost', type: 'string' },
                { name: 'min', title: 'Minimalna vrednost', type: 'number' },
                { name: 'max', title: 'Maksimalna vrednost', type: 'number' },
                { name: 'step', title: 'Korak', type: 'number' },
                { name: 'options', title: 'Opcije (za select)', type: 'array', of: [
                  {
                    type: 'object',
                    fields: [
                      { name: 'label', title: 'Label', type: 'string' },
                      { name: 'value', title: 'Vrednost', type: 'string' }
                    ]
                  }
                ]},
                { name: 'tooltip', title: 'Tooltip', type: 'text' },
                { name: 'required', title: 'Obavezno polje', type: 'boolean', initialValue: false },
                { name: 'order', title: 'Redosled', type: 'number', initialValue: 0 }
              ]
            }
          ]
        }),
        defineField({
          name: 'calculationLogic',
          title: 'Logika izračunavanja',
          type: 'object',
          fields: [
            { name: 'initialInvestment', title: 'Formula početne investicije', type: 'text', description: 'JavaScript izraz' },
            { name: 'monthlyRevenue', title: 'Formula mesečnih prihoda', type: 'text', description: 'JavaScript izraz' },
            { name: 'monthlyExpenses', title: 'Formula mesečnih troškova', type: 'text', description: 'JavaScript izraz' },
            { name: 'breakEvenPoint', title: 'Formula tačke povraćaja', type: 'text', description: 'JavaScript izraz' },
            { name: 'yearlyProfit', title: 'Formula godišnje dobiti', type: 'text', description: 'JavaScript izraz' },
            { name: 'roi', title: 'Formula ROI', type: 'text', description: 'JavaScript izraz' }
          ]
        })
      ]
    }),
    defineField({
      name: 'resultTemplates',
      title: 'Šabloni rezultata',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'condition', title: 'Uslov prikaza', type: 'text', description: 'JavaScript izraz koji vraća true/false' },
            { name: 'title', title: 'Naslov rezultata', type: 'string', validation: Rule => Rule.required() },
            { name: 'summary', title: 'Sažetak', type: 'text' },
            { name: 'metrics', title: 'Metrije', type: 'array', of: [
              {
                type: 'object',
                fields: [
                  { name: 'label', title: 'Naziv', type: 'string', validation: Rule => Rule.required() },
                  { name: 'value', title: 'Vrednost (formula)', type: 'string', validation: Rule => Rule.required() },
                  { name: 'format', title: 'Format', type: 'string', options: {
                    list: [
                      { title: 'Novac (EUR)', value: 'currency-eur' },
                      { title: 'Procenat', value: 'percentage' },
                      { title: 'Broj', value: 'number' },
                      { title: 'Meseci', value: 'months' }
                    ]
                  }},
                  { name: 'icon', title: 'Ikona', type: 'string' },
                  { name: 'color', title: 'Boja', type: 'string', options: {
                    list: [
                      { title: 'Pozitivna (zelena)', value: 'positive' },
                      { title: 'Negativna (crvena)', value: 'negative' },
                      { title: 'Neutralna (plava)', value: 'neutral' },
                      { title: 'Upozorenje (žuta)', value: 'warning' }
                    ]
                  }}
                ]
              }
            ]},
            { name: 'recommendations', title: 'Preporuke', type: 'array', of: [{ type: 'string' }] },
            { name: 'warnings', title: 'Upozorenja', type: 'array', of: [{ type: 'string' }] },
            { name: 'nextSteps', title: 'Sledeći koraci', type: 'array', of: [{ type: 'string' }] },
            { name: 'ctaButton', title: 'CTA dugme', type: 'object', fields: [
              { name: 'text', title: 'Tekst', type: 'string' },
              { name: 'link', title: 'Link', type: 'string' }
            ]}
          ]
        }
      ]
    }),
    defineField({
      name: 'explanatoryContent',
      title: 'Objašnjavaći sadržaj',
      type: 'object',
      fields: [
        defineField({
          name: 'howItWorks',
          title: 'Kako funkcioniše',
          type: 'object',
          fields: [
            { name: 'title', title: 'Naslov sekcije', type: 'string' },
            { name: 'steps', title: 'Koraci', type: 'array', of: [
              {
                type: 'object',
                fields: [
                  { name: 'title', title: 'Naslov', type: 'string', validation: Rule => Rule.required() },
                  { name: 'description', title: 'Opis', type: 'text' },
                  { name: 'icon', title: 'Ikona', type: 'string' }
                ]
              }
            ]}
          ]
        }),
        defineField({
          name: 'assumptions',
          title: 'Pretpostavke izračuna',
          type: 'object',
          fields: [
            { name: 'title', title: 'Naslov sekcije', type: 'string' },
            { name: 'items', title: 'Pretpostavke', type: 'array', of: [
              {
                type: 'object',
                fields: [
                  { name: 'category', title: 'Kategorija', type: 'string', validation: Rule => Rule.required() },
                  { name: 'assumptions', title: 'Lista pretpostavki', type: 'array', of: [{ type: 'string' }] }
                ]
              }
            ]}
          ]
        }),
        defineField({
          name: 'disclaimer',
          title: 'Odricanje odgovornosti',
          type: 'object',
          fields: [
            { name: 'title', title: 'Naslov', type: 'string' },
            { name: 'content', title: 'Sadržaj', type: 'array', of: [{ type: 'block' }] }
          ]
        }),
        defineField({
          name: 'faq',
          title: 'Česta pitanja',
          type: 'object',
          fields: [
            { name: 'title', title: 'Naslov sekcije', type: 'string' },
            { name: 'faqs', title: 'FAQ lista', type: 'array', of: [{ type: 'reference', to: { type: 'faq' } }] }
          ]
        })
      ]
    }),
    defineField({
      name: 'seo',
      title: 'SEO podešavanja',
      type: 'seo'
    })
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title: title || 'Finansijski kalkulator',
        subtitle: 'ROI kalkulator'
      }
    }
  }
})