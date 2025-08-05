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

async function fixHomepageSchema() {
  console.log('🔧 Fixing homepage schema issues...')

  try {
    // Get the homepage document
    const homepage = await client.fetch(`*[_type == "homePage"][0]`)
    
    if (!homepage) {
      console.log('❌ No homepage document found')
      return
    }

    console.log('📝 Current homepage ID:', homepage._id)

    // Fix hero section CTA fields
    const updates: any = {}

    // Fix primary CTA
    if (homepage.heroSekcija?.primaryCta?.href && !homepage.heroSekcija?.primaryCta?.link) {
      updates['heroSekcija.primaryCta.link'] = homepage.heroSekcija.primaryCta.href
      console.log('✅ Migrating primaryCta.href to primaryCta.link')
    }

    // Fix secondary CTA
    if (homepage.heroSekcija?.secondaryCta?.href && !homepage.heroSekcija?.secondaryCta?.link) {
      updates['heroSekcija.secondaryCta.link'] = homepage.heroSekcija.secondaryCta.href
      console.log('✅ Migrating secondaryCta.href to secondaryCta.link')
    }

    // Set default background pattern
    if (homepage.heroSekcija?.backgroundType === 'pattern' && !homepage.heroSekcija?.backgroundPattern) {
      updates['heroSekcija.backgroundPattern'] = 'dots'
      console.log('✅ Setting default background pattern')
    }

    // Add sample data for empty sections
    if (!homepage.heroSekcija?.titleVariants || homepage.heroSekcija?.titleVariants?.length === 0) {
      updates['heroSekcija.titleVariants'] = [
        'najuspešnije obrazovne franšize',
        'najboljeg obrazovnog sistema',
        'Srećnog učenja porodice'
      ]
      console.log('✅ Adding title variants')
    }

    if (!homepage.heroSekcija?.trustBadges || homepage.heroSekcija?.trustBadges?.length === 0) {
      updates['heroSekcija.trustBadges'] = [
        {
          _key: 'badge1',
          _type: 'trustBadge',
          icon: 'certificate',
          text: 'Sertifikovana metodologija',
          link: '/metodologija'
        },
        {
          _key: 'badge2',
          _type: 'trustBadge',
          icon: 'shield',
          text: '10 godina iskustva',
          link: '/o-nama'
        },
        {
          _key: 'badge3',
          _type: 'trustBadge',
          icon: 'award',
          text: '50+ uspešnih centara',
          link: '/lokacije'
        }
      ]
      console.log('✅ Adding trust badges')
    }

    // Add FAQ items if empty
    if (!homepage.homeFaq?.faqs || homepage.homeFaq?.faqs?.length === 0) {
      updates['homeFaq.faqs'] = [
        {
          _key: 'faq1',
          _type: 'object',
          question: 'Kolika je početna investicija?',
          answer: 'Početna investicija zavisi od modela franšize koji izaberete. Naš Basic model počinje od 5.000€, dok Premium model sa potpunom podrškom iznosi 15.000€.'
        },
        {
          _key: 'faq2',
          _type: 'object',
          question: 'Kada mogu očekivati povrat investicije?',
          answer: 'Naši partneri u proseku ostvaruju povrat investicije za 12-18 meseci, zavisno od lokacije i angažovanja.'
        },
        {
          _key: 'faq3',
          _type: 'object',
          question: 'Da li je potrebno pedagoško iskustvo?',
          answer: 'Pedagoško iskustvo je prednost ali nije obavezno. Pružamo kompletnu obuku i kontinuiranu podršku svim partnerima.'
        }
      ]
      console.log('✅ Adding FAQ items')
    }

    // Add resources if empty
    if (!homepage.freeResources?.resources || homepage.freeResources?.resources?.length === 0) {
      updates['freeResources.resources'] = [
        {
          _key: 'resource1',
          _type: 'object',
          title: 'Priručnik metodologije',
          description: 'Kompletan vodič kroz našu pedagošku metodologiju',
          fileUrl: '/downloads/metodologija-prirucnik.pdf',
          icon: 'book'
        },
        {
          _key: 'resource2',
          _type: 'object',
          title: 'Biznis plan template',
          description: 'Excel template za planiranje vašeg centra',
          fileUrl: '/downloads/biznis-plan-template.xlsx',
          icon: 'chart'
        },
        {
          _key: 'resource3',
          _type: 'object',
          title: 'Video prezentacija',
          description: '30-minutna prezentacija franšize',
          fileUrl: 'https://youtube.com/watch?v=example',
          icon: 'video'
        }
      ]
      console.log('✅ Adding free resources')
    }

    // Apply updates if any
    if (Object.keys(updates).length > 0) {
      await client
        .patch(homepage._id)
        .set(updates)
        .commit()
      
      console.log('✅ Successfully updated homepage document')
      console.log('📊 Applied updates:', Object.keys(updates))
    } else {
      console.log('ℹ️ No updates needed')
    }

  } catch (error) {
    console.error('❌ Error fixing homepage schema:', error)
    process.exit(1)
  }
}

// Run the fix
fixHomepageSchema().then(() => {
  console.log('✨ Schema fix completed!')
})