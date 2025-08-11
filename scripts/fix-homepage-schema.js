const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || 'your_token_here',
  apiVersion: '2023-01-01'
})

async function updateHomePageData() {
  console.log('🚀 EMERGENCY: Fixing homePage schema and data...')
  
  try {
    // Get current homePage
    const homePage = await client.fetch('*[_type == "homePage"][0]')
    if (!homePage) {
      throw new Error('HomePage not found')
    }

    console.log('📋 Current homePage found:', homePage._id)

    // Patch the homePage with properly structured data
    const updateData = {
      // Ensure enhancedHero has proper structure
      'enhancedHero': {
        _type: 'enhancedHero',
        title: 'Pokrenite svoju obrazovnu franšizu',
        subtitle: 'Srećno učenje - Dokazana metodologija koja transformiše način kako deca uče',
        description: 'Pridružite se mreži uspešnih centara koji pomažu deci da otkrivaju radost učenja kroz inovativne programe prilagođene svakom detetu.',
        layout: 'centered',
        backgroundType: 'gradient',
        buttons: [
          {
            _key: 'btn-1',
            _type: 'button',
            text: 'Saznajte više o franšizi',
            link: '/franshiza',
            variant: 'primary'
          },
          {
            _key: 'btn-2', 
            _type: 'button',
            text: 'Rezervišite konsultaciju',
            link: '/rezervacija',
            variant: 'secondary'
          }
        ]
      },

      // Ensure statistics have proper structure
      'statistics': [
        {
          _key: 'stat-1',
          _type: 'statistic',
          value: '200+',
          label: 'Zadovoljnih roditelja',
          icon: '👥',
          color: 'sky'
        },
        {
          _key: 'stat-2',
          _type: 'statistic', 
          value: '15+',
          label: 'Godina iskustva',
          icon: '⭐',
          color: 'sun'
        },
        {
          _key: 'stat-3',
          _type: 'statistic',
          value: '95%',
          label: 'Stopa uspešnosti',
          icon: '📈',
          color: 'grass'
        },
        {
          _key: 'stat-4',
          _type: 'statistic',
          value: '3+',
          label: 'Aktivna centra',
          icon: '🏢',
          color: 'heart'
        }
      ],

      // Ensure differentiators object has proper structure
      'differentiators': {
        _type: 'object',
        sectionTitle: 'Zašto baš Srećno učenje?',
        items: [
          {
            _key: 'diff-1',
            _type: 'differentiator',
            title: 'Dokazana metodologija',
            description: 'Preko 15 godina razvoja i usavršavanja pristupa koji stvarno radi',
            icon: '🎯'
          },
          {
            _key: 'diff-2',
            _type: 'differentiator',
            title: 'Kontinuirana podrška',
            description: 'Potpuna podrška od otvaranja do rasta vašeg centra',
            icon: '🤝'
          },
          {
            _key: 'diff-3',
            _type: 'differentiator',
            title: 'Brz povrat investicije',
            description: 'Optimizovan model za brz rast i profitabilnost',
            icon: '💰'
          },
          {
            _key: 'diff-4',
            _type: 'differentiator',
            title: 'Zadovoljna deca i roditelji',
            description: 'Visok nivo zadovoljstva garantuje lojalnost klijenata',
            icon: '❤️'
          }
        ]
      },

      // Ensure franchise steps has proper structure
      'franchiseSteps': {
        _type: 'object',
        sectionTitle: '4 koraka do vaše franšize',
        steps: [
          {
            _key: 'step-1',
            _type: 'franchiseStep',
            number: '1',
            title: 'Konsultacija',
            description: 'Besplatna konsultacija o mogućnostima franšize',
            icon: '💬'
          },
          {
            _key: 'step-2',
            _type: 'franchiseStep',
            number: '2',
            title: 'Planiranje', 
            description: 'Izrada detaljnog poslovnog plana za vaš centar',
            icon: '📋'
          },
          {
            _key: 'step-3',
            _type: 'franchiseStep',
            number: '3',
            title: 'Obuka',
            description: 'Kompletna obuka za vas i vaš tim',
            icon: '🎓'
          },
          {
            _key: 'step-4',
            _type: 'franchiseStep',
            number: '4',
            title: 'Otvaranje',
            description: 'Podrška pri otvaranju i lansiranju centra',
            icon: '🚀'
          }
        ]
      },

      // Ensure SEO object has proper structure
      'seo': {
        _type: 'seo',
        metaTitle: 'Srećno učenje - Pokrenite obrazovnu franšizu',
        metaDescription: 'Pridružite se mreži uspešnih centara Srećno učenje. Dokazana metodologija, kontinuirana podrška i brz povrat investicije.',
        keywords: 'franšiza, obrazovanje, deca, učenje, Srećno učenje, metodologija'
      }
    }

    // Apply the update
    const result = await client
      .patch(homePage._id)
      .set(updateData)
      .commit()

    console.log('✅ SUCCESS: Updated homePage with proper schema structure')
    console.log('📊 Updated fields:', Object.keys(updateData))
    
    return result

  } catch (error) {
    console.error('❌ ERROR updating homepage schema:', error)
    throw error
  }
}

// Execute immediately
updateHomePageData()
  .then(() => {
    console.log('🎉 DONE! HomePage schema fixed and data updated')
    console.log('🌐 Site should now work without schema errors!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('💥 FAILED:', error)
    process.exit(1)
  })