const { createClient } = require('@sanity/client')

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03'
})

async function testFranchiseData() {
  console.log('🔍 Testiranje franchise podataka...')

  try {
    // Test franchise application
    const applications = await client.fetch(`
      *[_type == "franchiseApplication"] {
        _id,
        title,
        subtitle,
        slug,
        "sectionsCount": count(sections),
        "motivationalContent": motivationalContent->title
      }
    `)
    console.log('\n📋 Aplikacije:', applications.length)
    applications.forEach(app => {
      console.log(`  - ${app.title} (${app.sectionsCount} sekcija)`)
    })

    // Test sections
    const sections = await client.fetch(`
      *[_type == "franchiseSection"] | order(order asc) {
        _id,
        title,
        sectionId,
        order,
        "fieldsCount": count(fields)
      }
    `)
    console.log('\n📑 Sekcije:', sections.length)
    sections.forEach(section => {
      console.log(`  ${section.order}. ${section.title} (${section.fieldsCount} polja)`)
    })

    // Test fields
    const fields = await client.fetch(`
      *[_type == "franchiseField"] | order(order asc) {
        _id,
        label,
        fieldId,
        type,
        order,
        isRequired
      }
    `)
    console.log('\n📝 Polja:', fields.length)
    fields.forEach(field => {
      console.log(`  ${field.order}. ${field.label} (${field.type})${field.isRequired ? ' *' : ''}`)
    })

    // Test motivational content
    const motivational = await client.fetch(`
      *[_type == "franchiseMotivational"][0] {
        _id,
        title,
        "statisticsCount": count(statistics),
        "testimonialsCount": count(testimonials),
        "benefitsCount": count(benefits),
        "faqCount": count(faqSection.items)
      }
    `)
    console.log('\n🎯 Motivacioni sadržaj:')
    if (motivational) {
      console.log(`  - ${motivational.title}`)
      console.log(`  - ${motivational.statisticsCount} statistika`)
      console.log(`  - ${motivational.testimonialsCount} testimonijala`)
      console.log(`  - ${motivational.benefitsCount} prednosti`)
      console.log(`  - ${motivational.faqCount} FAQ pitanja`)
    }

    // Test complete application structure
    const completeApp = await client.fetch(`
      *[_type == "franchiseApplication"][0] {
        title,
        sections[]-> {
          title,
          sectionId,
          order,
          fields[]-> {
            label,
            fieldId,
            type,
            order
          }
        },
        motivationalContent-> {
          statistics[] {
            number,
            label
          },
          testimonials[] {
            name,
            location,
            quote
          }
        }
      }
    `)

    console.log('\n🏗️ Kompletna struktura:')
    if (completeApp) {
      console.log(`📋 Aplikacija: ${completeApp.title}`)
      completeApp.sections.forEach(section => {
        console.log(`  📑 ${section.title} (${section.sectionId})`)
        section.fields.forEach(field => {
          console.log(`    📝 ${field.order}. ${field.label} (${field.type})`)
        })
      })
      
      if (completeApp.motivationalContent) {
        console.log(`  🎯 Statistike: ${completeApp.motivationalContent.statistics.length}`)
        completeApp.motivationalContent.statistics.forEach(stat => {
          console.log(`    📊 ${stat.number} ${stat.label}`)
        })
        
        console.log(`  💬 Testimonijali: ${completeApp.motivationalContent.testimonials.length}`)
        completeApp.motivationalContent.testimonials.forEach(testimonial => {
          console.log(`    👤 ${testimonial.name}, ${testimonial.location}`)
        })
      }
    }

    console.log('\n✅ Test završen uspešno!')
    return { success: true, data: { applications, sections, fields, motivational } }

  } catch (error) {
    console.error('❌ Greška tokom testiranja:', error)
    return { success: false, error }
  }
}

// Run if called directly
if (require.main === module) {
  testFranchiseData()
    .then((result) => {
      if (result.success) {
        console.log('\n🎉 Svi franchise podaci su uspešno učitani!')
        process.exit(0)
      } else {
        console.error('\n💥 Test neuspešan')
        process.exit(1)
      }
    })
    .catch((error) => {
      console.error('💥 Neočekivana greška:', error)
      process.exit(1)
    })
}

module.exports = { testFranchiseData }