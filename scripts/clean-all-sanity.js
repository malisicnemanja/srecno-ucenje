// Skripta za potpuno čišćenje Sanity baze
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skYc1dLdlL4lEIKyyuy39qoANTkDFMlnL8IUaKYcyiJ31DsmSBJWyWLA5vWBKcGRAtDcVsB5DPKn4I8NheeBOG75VBTuWZSDEjFGewZFaypQtvaSIQEVmb1EQEOOtrYhKZvseL1xw9QRJcvQmkUo3HE2ze29bGx5hmL0Yj4mzJduq0WxNrPV',
  useCdn: false
})

async function cleanAll() {
  console.log('🧹 Započinje potpuno čišćenje Sanity baze...')

  try {
    // Prvo obriši dokumente koji imaju reference
    console.log('📝 Brišem dokumente sa referencama...')
    
    // Redosled brisanja je važan zbog referenci
    const typesToDelete = [
      'successStory',
      'blogPost', 
      'testimonial',
      'teamMember',
      'author',
      'blogCategory',
      'faq',
      'program',
      'siteSettings',
      'page'
    ]

    for (const type of typesToDelete) {
      const docs = await client.fetch(`*[_type == $type]`, { type })
      console.log(`Brišem ${docs.length} ${type} dokumenata...`)
      
      for (const doc of docs) {
        try {
          await client.delete(doc._id)
        } catch (err) {
          console.log(`⚠️ Ne mogu obrisati ${doc._id}: ${err.message}`)
        }
      }
    }

    console.log('✅ Svi dokumenti obrisani!')
    console.log('\nSada možeš ponovo pokrenuti import-to-sanity.js skriptu za čist import.')

  } catch (error) {
    console.error('❌ Greška:', error)
  }
}

// Pokreni čišćenje
cleanAll()