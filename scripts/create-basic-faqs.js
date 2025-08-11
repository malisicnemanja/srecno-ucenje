const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || 'your_token_here',
  apiVersion: '2023-01-01'
})

async function createBasicFAQs() {
  console.log('🚀 Creating basic FAQ documents...')
  
  try {
    // First create an FAQ category if it doesn't exist
    let faqCategory
    try {
      faqCategory = await client.fetch('*[_type == "faqCategory"][0]')
      if (!faqCategory) {
        faqCategory = await client.create({
          _type: 'faqCategory',
          name: 'Opšta pitanja',
          slug: { current: 'opsta-pitanja' },
          description: 'Osnovna pitanja o franšizi',
          icon: '❓',
          color: '#0ea5e9',
          order: 1,
          isActive: true
        })
        console.log('✅ Created FAQ category:', faqCategory._id)
      }
    } catch (error) {
      console.log('ℹ️ FAQ category might already exist or schema not ready')
    }

    const faqs = [
      {
        question: 'Kolika je početna investicija za franšizu?',
        answer: 'Početna investicija zavisi od veličine prostora i lokacije, ali kreće se od 15.000 do 30.000 evra za kompletno opremljen centar.',
        order: 1
      },
      {
        question: 'Koliko vremena treba da se vrati investicija?',
        answer: 'Na osnovu iskustva naših partnera, investicija se obično vraća u periodu od 12 do 18 meseci, uz pravilno vođenje centra.',
        order: 2
      },
      {
        question: 'Kakva obuka je uključena u franšizu?',
        answer: 'Obuka traje 2 nedelje i pokriva metodologiju rada, upravljanje centrom, marketing i kontinuiranu podršku.',
        order: 3
      },
      {
        question: 'Da li je potrebno prethodno iskustvo u obrazovanju?',
        answer: 'Nije potrebno prethodno iskustvo. Naša obuka pokriva sve potrebne veštine, a metodologija je dizajnirana da bude jednostavna za primenu.',
        order: 4
      },
      {
        question: 'Kakvu podršku pružate nakon otvaranja?',
        answer: 'Pružamo kontinuiranu podršku kroz redovne edukacije, marketing materijale, online platformu i direktnu komunikaciju sa našim timom.',
        order: 5
      },
      {
        question: 'Koliko dece može da pohađa centar?',
        answer: 'Prosečan centar može da primi 40-60 dece nedeljno, sa maksimalnim grupama od 6-8 dece po terminu.',
        order: 6
      }
    ]

    const createdFAQs = []
    for (const faq of faqs) {
      try {
        const faqDoc = {
          _type: 'faq',
          question: faq.question,
          answer: faq.answer,
          order: faq.order,
          isActive: true
        }

        // Add category reference if category exists
        if (faqCategory && faqCategory._id) {
          faqDoc.category = {
            _type: 'reference',
            _ref: faqCategory._id
          }
        }

        const result = await client.create(faqDoc)
        createdFAQs.push(result)
        console.log(`✅ Created FAQ: ${faq.question.substring(0, 50)}...`)
      } catch (error) {
        console.error(`❌ Failed to create FAQ: ${faq.question}`, error.message)
      }
    }

    console.log(`🎉 SUCCESS: Created ${createdFAQs.length} FAQ documents`)
    return createdFAQs

  } catch (error) {
    console.error('❌ ERROR creating FAQs:', error)
    throw error
  }
}

// Execute immediately
createBasicFAQs()
  .then((faqs) => {
    console.log(`🌟 DONE! Created ${faqs.length} FAQs`)
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 FAILED:', error)
    process.exit(1)
  })