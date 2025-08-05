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

async function fixNavigationSettings() {
  console.log('🔧 Fixing navigation settings...')

  try {
    // Get site settings document
    const siteSettings = await client.fetch(`*[_type == "siteSettings"][0]`)
    
    if (!siteSettings) {
      console.log('❌ No site settings document found')
      return
    }

    console.log('📝 Current site settings ID:', siteSettings._id)

    // Check if footerMenu exists at wrong level
    if (siteSettings.footerMenu) {
      console.log('✅ Found footerMenu at root level, moving to navigationSettings...')
      
      const updates: any = {
        'navigationSettings.footerMenu': siteSettings.footerMenu
      }
      
      // Apply update
      await client
        .patch(siteSettings._id)
        .set(updates)
        .unset(['footerMenu']) // Remove from root level
        .commit()
      
      console.log('✅ Successfully moved footerMenu to navigationSettings')
    } else if (!siteSettings.navigationSettings?.footerMenu) {
      // If footerMenu doesn't exist anywhere, create default one
      console.log('📝 Creating default footerMenu...')
      
      const defaultFooterMenu = [
        {
          _key: 'fm1',
          title: 'Politika privatnosti',
          url: '/privacy-policy'
        },
        {
          _key: 'fm2',
          title: 'Uslovi korišćenja',
          url: '/terms'
        },
        {
          _key: 'fm3',
          title: 'FAQ',
          url: '/faq'
        },
        {
          _key: 'fm4',
          title: 'Kontakt',
          url: '/kontakt'
        }
      ]
      
      await client
        .patch(siteSettings._id)
        .set({
          'navigationSettings.footerMenu': defaultFooterMenu
        })
        .commit()
      
      console.log('✅ Created default footerMenu')
    } else {
      console.log('ℹ️ footerMenu already exists in correct location')
    }

    // Also ensure mainMenu exists
    if (!siteSettings.navigationSettings?.mainMenu?.items) {
      console.log('📝 Creating default mainMenu...')
      
      const defaultMainMenu = {
        hideHomeLink: false,
        maxItems: 6,
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
            label: 'Blog',
            link: '/blog'
          },
          {
            _key: 'nav6',
            label: 'Kontakt',
            link: '/kontakt'
          }
        ]
      }
      
      await client
        .patch(siteSettings._id)
        .set({
          'navigationSettings.mainMenu': defaultMainMenu
        })
        .commit()
      
      console.log('✅ Created default mainMenu')
    }

    // Ensure footer columns exist
    if (!siteSettings.navigationSettings?.footer?.columns) {
      console.log('📝 Creating default footer columns...')
      
      const defaultFooterColumns = [
        {
          _key: 'col1',
          title: 'O nama',
          colorAccent: 'primary',
          links: [
            { _key: 'l1', label: 'Metodologija', link: '/metodologija' },
            { _key: 'l2', label: 'Priče uspeha', link: '/uspeh' },
            { _key: 'l3', label: 'O autorki', link: '/o-autorki' },
            { _key: 'l4', label: 'Blog', link: '/blog' }
          ]
        },
        {
          _key: 'col2',
          title: 'Franšiza',
          colorAccent: 'secondary',
          links: [
            { _key: 'l5', label: 'Modeli franšize', link: '/fransiza-modeli' },
            { _key: 'l6', label: 'Kako se pridružiti', link: '/kako-se-pridruziti' },
            { _key: 'l7', label: 'Lokacije', link: '/lokacije' },
            { _key: 'l8', label: 'FAQ', link: '/faq' }
          ]
        },
        {
          _key: 'col3',
          title: 'Resursi',
          colorAccent: 'accent',
          links: [
            { _key: 'l9', label: 'Preuzmi materijale', link: '/resursi' },
            { _key: 'l10', label: 'Preporučene knjige', link: '/knjige' },
            { _key: 'l11', label: 'Obuka & Mentorstvo', link: '/obuka-mentorstvo' },
            { _key: 'l12', label: 'Kontakt', link: '/kontakt' }
          ]
        }
      ]
      
      await client
        .patch(siteSettings._id)
        .set({
          'navigationSettings.footer.columns': defaultFooterColumns
        })
        .commit()
      
      console.log('✅ Created default footer columns')
    }

    console.log('\n✨ Navigation settings fixed successfully!')
    
  } catch (error) {
    console.error('❌ Error fixing navigation settings:', error)
    process.exit(1)
  }
}

// Run the fix
fixNavigationSettings().then(() => {
  console.log('✅ All navigation settings have been fixed!')
})