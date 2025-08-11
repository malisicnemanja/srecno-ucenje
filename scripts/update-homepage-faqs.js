const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || 'your_token_here',
  apiVersion: '2023-01-01'
})

async function updateHomePageFAQs() {
  console.log('🚀 Updating homePage with FAQ references...')
  
  try {
    // Get all FAQs
    const faqs = await client.fetch('*[_type == "faq"] | order(order asc)')
    console.log(`Found ${faqs.length} FAQ documents`)

    // Get homePage document
    const homePage = await client.fetch('*[_type == "homePage"][0]')
    if (!homePage) {
      throw new Error('HomePage document not found')
    }

    console.log('Found homePage:', homePage._id)

    // Create FAQ references
    const faqRefs = faqs.slice(0, 6).map(faq => ({
      _type: 'reference',
      _ref: faq._id
    }))

    // Update homePage with FAQ references
    const updatedHomePage = await client
      .patch(homePage._id)
      .set({
        'homeFaqs.faqs': faqRefs
      })
      .commit()

    console.log('✅ SUCCESS: Updated homePage with FAQ references')
    console.log(`Added ${faqRefs.length} FAQ references`)
    
    return updatedHomePage

  } catch (error) {
    console.error('❌ ERROR updating homepage:', error)
    throw error
  }
}

// Execute immediately
updateHomePageFAQs()
  .then(() => {
    console.log('🎉 DONE! HomePage FAQs are now linked')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 FAILED:', error)
    process.exit(1)
  })