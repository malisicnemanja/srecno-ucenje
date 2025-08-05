import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config()

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
})

async function updateNavigation() {
  console.log('🔧 Updating navigation menu...')

  try {
    // Get site settings document
    const siteSettings = await client.fetch(`*[_type == "siteSettings"][0]`)
    
    if (!siteSettings) {
      console.log('❌ No site settings document found')
      return
    }

    console.log('📝 Current site settings ID:', siteSettings._id)

    // New main menu without duplicate Konsultacije
    const updatedMainMenu = {
      hideHomeLink: false,
      maxItems: 7,
      items: [
        {
          _key: 'nav1',
          label: 'O nama',
          link: '/o-nama'
        },
        {
          _key: 'nav2',
          label: 'Franšiza',
          link: '#',
          dropdown: [
            {
              _key: 'drop1',
              label: 'Modeli franšize',
              link: '/fransiza-modeli'
            },
            {
              _key: 'drop2',
              label: 'Kako se pridružiti',
              link: '/kako-se-pridruziti'
            },
            {
              _key: 'drop3',
              label: 'Lokacije',
              link: '/lokacije'
            },
            {
              _key: 'drop4',
              label: 'Kalkulator ROI',
              link: '/kalkulator'
            }
          ]
        },
        {
          _key: 'nav3',
          label: 'Metodologija',
          link: '/metodologija'
        },
        {
          _key: 'nav4',
          label: 'Priče uspeha',
          link: '/uspeh'
        },
        {
          _key: 'nav5',
          label: 'Resursi',
          link: '#',
          dropdown: [
            {
              _key: 'drop5',
              label: 'Blog',
              link: '/blog'
            },
            {
              _key: 'drop6',
              label: 'Knjige',
              link: '/knjige'
            },
            {
              _key: 'drop7',
              label: 'FAQ',
              link: '/faq'
            },
            {
              _key: 'drop8',
              label: 'Besplatni materijali',
              link: '/resursi'
            }
          ]
        },
        {
          _key: 'nav6',
          label: 'Kontakt',
          link: '/kontakt'
        }
      ]
    }

    // Update navigation
    await client
      .patch(siteSettings._id)
      .set({
        'navigationSettings.mainMenu': updatedMainMenu
      })
      .commit()
    
    console.log('✅ Successfully updated main menu')
    console.log('\n📊 New navigation structure:')
    console.log('- O nama')
    console.log('- Franšiza (dropdown: Modeli, Kako se pridružiti, Lokacije, Kalkulator)')
    console.log('- Metodologija')
    console.log('- Priče uspeha')
    console.log('- Resursi (dropdown: Blog, Knjige, FAQ, Besplatni materijali)')
    console.log('- Kontakt')
    console.log('\n❌ Removed: Konsultacije (duplicate with Započni sada button)')

    // Also ensure the CTA button exists
    const ctaButton = {
      text: 'Započni sada',
      href: '/zakazivanje',
      style: 'primary',
      highlighted: true
    }

    await client
      .patch(siteSettings._id)
      .set({
        'navigationSettings.ctaButton': ctaButton
      })
      .commit()
    
    console.log('✅ CTA button configured: "Započni sada" -> /zakazivanje')
    
  } catch (error) {
    console.error('❌ Error updating navigation:', error)
    process.exit(1)
  }
}

// Run the update
updateNavigation().then(() => {
  console.log('\n✨ Navigation menu updated successfully!')
})