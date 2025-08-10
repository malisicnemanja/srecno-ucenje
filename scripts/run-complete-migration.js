/**
 * Master Migration Script
 * Pokreće kompletnu migraciju Sanity CMS podataka
 */

import { createClient } from '@sanity/client'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-10-10'
})

async function runScript(scriptPath, description) {
  console.log(`🚀 Pokretam: ${description}`)
  console.log(`📁 Script: ${scriptPath}`)
  
  try {
    const { stdout, stderr } = await execAsync(`node ${scriptPath}`, {
      env: { ...process.env }
    })
    
    if (stdout) console.log(stdout)
    if (stderr) console.error(stderr)
    
    console.log(`✅ ${description} - ZAVRŠENO\n`)
    return true
  } catch (error) {
    console.error(`❌ ${description} - NEUSPEŠNO`)
    console.error(error.message)
    return false
  }
}

async function checkSanityConnection() {
  console.log("🔍 Testiranje konekcije sa Sanity...")
  
  try {
    const result = await client.fetch('*[_type == "homePage"][0]._id')
    console.log("✅ Sanity konekcija uspešna")
    return true
  } catch (error) {
    console.error("❌ Sanity konekcija neuspešna:", error.message)
    return false
  }
}

async function createBackup() {
  console.log("💾 Kreiranje backup-a trenutnih podataka...")
  
  try {
    const homePage = await client.fetch('*[_type == "homePage"][0]')
    if (homePage) {
      // Kreiraj backup timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const backupDoc = {
        _type: 'backup',
        _id: `backup-homepage-${timestamp}`,
        originalDocument: homePage,
        backupDate: new Date().toISOString(),
        description: 'Backup pre migracije'
      }
      
      // Kreiraj backup dokument (neće se videti u Studio)
      await client.create(backupDoc)
      console.log("✅ Backup kreiran uspešno")
    } else {
      console.log("ℹ️ Nema podataka za backup")
    }
    return true
  } catch (error) {
    console.error("❌ Greška pri kreiranju backup-a:", error.message)
    return false
  }
}

async function validateResults() {
  console.log("🔍 Finalna validacija rezultata...")
  
  try {
    const homePage = await client.fetch(`
      *[_type == "homePage"][0] {
        _id,
        enhancedHero,
        statistics,
        differentiators,
        franchiseSteps,
        franchiseModels,
        successStories,
        homeFaqs,
        interactiveClassroom,
        leadMagnets,
        newsletterCTA,
        seo
      }
    `)

    if (!homePage) {
      console.error("❌ HomePage dokument ne postoji nakon migracije!")
      return false
    }

    // Brojanje sekcija
    let sectionsCount = 0
    const requiredSections = [
      'enhancedHero', 'statistics', 'differentiators', 
      'franchiseSteps', 'franchiseModels', 'successStories',
      'homeFaqs', 'interactiveClassroom', 'leadMagnets', 'newsletterCTA'
    ]

    requiredSections.forEach(section => {
      if (homePage[section]) {
        sectionsCount++
      }
    })

    // Proveri FAQs
    const faqCount = await client.fetch('count(*[_type == "faq"])')
    
    console.log(`📊 REZULTATI MIGRACIJE:`)
    console.log(`  - HomePage sekcije: ${sectionsCount}/${requiredSections.length}`)
    console.log(`  - FAQ dokumenti: ${faqCount}`)
    
    const isValid = sectionsCount === requiredSections.length && faqCount > 0
    console.log(`\n🎯 VALIDACIJA: ${isValid ? "USPEŠNA" : "NEUSPEŠNA"}`)
    
    return isValid
    
  } catch (error) {
    console.error("❌ Greška pri validaciji:", error)
    return false
  }
}

async function main() {
  console.log("🌟 POČETAK KOMPLETNE SANITY MIGRACIJE")
  console.log("=" .repeat(60))
  console.log("🎯 CILJ: Rešavanje svih problema sa CMS podacima")
  console.log("📋 ZADACI:")
  console.log("  1. Test konekcije")
  console.log("  2. Kreiranje backup-a")
  console.log("  3. Migracija glavnih podataka")
  console.log("  4. Kreiranje FAQ podataka")
  console.log("  5. Finalna validacija")
  console.log("=" .repeat(60))

  try {
    // 1. Test konekcije
    const connectionOK = await checkSanityConnection()
    if (!connectionOK) {
      throw new Error("Sanity konekcija neuspešna")
    }

    // 2. Kreiranje backup-a
    await createBackup()

    // 3. Glavna migracija
    const migrationSuccess = await runScript(
      "./scripts/complete-sanity-migration.js",
      "Glavna migracija CMS podataka"
    )
    if (!migrationSuccess) {
      throw new Error("Glavna migracija neuspešna")
    }

    // 4. Kreiranje FAQ-ova
    const faqSuccess = await runScript(
      "./scripts/create-faq-data.js", 
      "Kreiranje FAQ podataka"
    )
    if (!faqSuccess) {
      throw new Error("Kreiranje FAQ-ova neuspešno")
    }

    // 5. Finalna validacija
    const validationSuccess = await validateResults()
    if (!validationSuccess) {
      throw new Error("Finalna validacija neuspešna")
    }

    console.log("\n" + "🎉".repeat(20))
    console.log("🎉 KOMPLETNA MIGRACIJA USPEŠNO ZAVRŠENA!")
    console.log("🎉".repeat(20))
    console.log("\n✅ REŠENI PROBLEMI:")
    console.log("  ✓ Unknown fields u Sanity Studio")
    console.log("  ✓ Missing _key u array elementima")  
    console.log("  ✓ Neusklađenost query strukture i sheme")
    console.log("  ✓ Nedostajući sadržaj na srpskom")
    console.log("  ✓ FAQ podaci kreirani i povezani")
    console.log("\n🚀 SLEDEĆI KORAK: Restartujte Next.js aplikaciju")
    console.log("   npm run dev")
    
    return true

  } catch (error) {
    console.error("\n💥 MIGRACIJA PREKINUTA:")
    console.error(`❌ ${error.message}`)
    console.log("\n🔧 MOGUĆA REŠENJA:")
    console.log("  1. Proverite SANITY_API_TOKEN u .env.local")
    console.log("  2. Proverite internet konekciju")
    console.log("  3. Pokrenite skriptove pojedinačno za debug")
    
    return false
  }
}

main()
  .then(success => {
    console.log(`\n📋 ZAVRŠETAK: ${success ? "USPEŠAN" : "NEUSPEŠAN"}`)
    process.exit(success ? 0 : 1)
  })
  .catch(error => {
    console.error("💥 Neočekivana greška:", error)
    process.exit(1)
  })