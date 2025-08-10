#!/usr/bin/env tsx

/**
 * SAFE SANITY MIGRATION SCRIPT
 * 
 * This script safely migrates content WITHOUT overwriting existing data
 * Creates new franchise-related documents based on exported content
 * 
 * SAFETY FEATURES:
 * - Never overwrites existing documents
 * - Creates new documents with franchise-specific schemas
 * - Preserves original data integrity
 * - Detailed logging and verification
 * - Rollback capability
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

// Sanity client configuration
const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

interface MigrationResult {
  success: boolean
  documentsCreated: number
  errors: Array<{ type: string; error: string }>
  createdDocuments: Array<{ _id: string; _type: string; title?: string }>
}

interface MigrationPlan {
  sourceType: string
  targetType: string
  transformer: (doc: any) => any
  dependencies: string[]
  batchSize: number
  priority: number
}

class SafeMigrator {
  private results: MigrationResult = {
    success: true,
    documentsCreated: 0,
    errors: [],
    createdDocuments: []
  }

  private migrationPlans: MigrationPlan[] = [
    // Phase 1: Core franchise structures
    {
      sourceType: 'locationData',
      targetType: 'school',
      transformer: this.transformLocationToSchool.bind(this),
      dependencies: [],
      batchSize: 10,
      priority: 1
    },
    
    // Phase 2: Franchise packages
    {
      sourceType: 'program', // If programs exist that can become packages
      targetType: 'franchisePackage',
      transformer: this.transformProgramToPackage.bind(this),
      dependencies: [],
      batchSize: 5,
      priority: 2
    },

    // Phase 3: FAQ migration
    {
      sourceType: 'faq',
      targetType: 'modernFranchiseFAQ',
      transformer: this.transformFAQ.bind(this),
      dependencies: ['faqCategory'],
      batchSize: 20,
      priority: 3
    },

    // Phase 4: Enhanced pages
    {
      sourceType: 'homePage',
      targetType: 'franchiseModelsPage',
      transformer: this.transformToFranchiseModelsPage.bind(this),
      dependencies: ['school', 'franchisePackage'],
      batchSize: 1,
      priority: 4
    },

    {
      sourceType: 'page',
      targetType: 'howToJoinPage',
      transformer: this.transformToHowToJoinPage.bind(this),
      dependencies: ['franchisePackage'],
      batchSize: 1,
      priority: 4
    }
  ]

  private exportDir: string

  constructor(exportDir?: string) {
    const exportsDir = path.join(process.cwd(), 'sanity-exports')
    
    if (exportDir) {
      this.exportDir = exportDir
    } else {
      // Find most recent backup
      const backupDirs = fs.readdirSync(exportsDir)
        .filter(dir => dir.startsWith('backup-'))
        .sort()
        .reverse()
      
      if (backupDirs.length === 0) {
        throw new Error('No export directories found. Run export script first.')
      }
      
      this.exportDir = path.join(exportsDir, backupDirs[0])
    }
    
    console.log(`🛡️  Safe migration from: ${this.exportDir}`)
  }

  private loadExportData(): Record<string, any> {
    const files = fs.readdirSync(this.exportDir)
      .filter(file => file.endsWith('.json') && !file.includes('MANIFEST') && !file.includes('ANALYSIS'))
    
    const data: Record<string, any> = {}
    
    for (const file of files) {
      const filePath = path.join(this.exportDir, file)
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      const type = file.replace('.json', '')
      data[type] = content
    }
    
    return data
  }

  // Transformation functions
  private transformLocationToSchool(locationDoc: any): any {
    return {
      _type: 'school',
      _id: `school-${uuidv4()}`,
      name: locationDoc.city || `Škola ${locationDoc._id}`,
      address: {
        street: locationDoc.contactInfo?.address || '',
        city: locationDoc.city || '',
        postalCode: locationDoc.contactInfo?.postalCode || '',
        country: 'Serbia'
      },
      contact: {
        phone: locationDoc.contactInfo?.phone || '',
        email: locationDoc.contactInfo?.email || '',
        website: locationDoc.contactInfo?.website || ''
      },
      coordinates: locationDoc.coordinates ? {
        lat: locationDoc.coordinates.lat,
        lng: locationDoc.coordinates.lng
      } : null,
      status: locationDoc.status || 'active',
      establishedDate: new Date().toISOString(),
      description: locationDoc.description || `Škola srećnog učenja u gradu ${locationDoc.city}`,
      capacity: locationDoc.marketSize || 50,
      programs: [], // Will be linked later
      staff: [],
      facilities: [],
      isActive: locationDoc.isActive !== false,
      metadata: {
        migratedFrom: 'locationData',
        originalId: locationDoc._id,
        migrationDate: new Date().toISOString()
      }
    }
  }

  private transformProgramToPackage(programDoc: any): any {
    // Base price calculation from program features
    const basePrice = this.calculatePackagePrice(programDoc)
    
    return {
      _type: 'franchisePackage',
      _id: `franchise-package-${uuidv4()}`,
      name: programDoc.title || 'Franšiza pakket',
      tagline: programDoc.description || 'Kompletna franšiza solucija',
      price: {
        amount: basePrice,
        currency: 'RSD',
        period: 'mesečno',
        displayText: `${basePrice.toLocaleString()} RSD/mesec`
      },
      features: (programDoc.features || []).map((feature: string) => ({
        text: feature,
        included: true,
        highlight: false,
        tooltip: null
      })),
      benefits: [
        'Kompletna podrška',
        'Obuka osoblja',
        'Marketing podrška',
        'Kontinuirano praćenje'
      ],
      target: programDoc.ageGroup ? `Uzrast: ${programDoc.ageGroup}` : 'Svi uzrasti',
      investment: {
        initial: basePrice * 12, // Annual fee as initial
        monthly: basePrice,
        royalty: Math.round(basePrice * 0.1), // 10% royalty
        marketingFee: Math.round(basePrice * 0.05) // 5% marketing
      },
      support: {
        training: ['Početna obuka', 'Kontinuirana podrška'],
        marketing: ['Brendiranje', 'Online prisutnost'],
        operational: ['Administrativna podrška', 'Tehnička pomoć']
      },
      timeline: [
        { phase: 'Priprema', duration: '2-4 nedelje', description: 'Početna obuka i priprema' },
        { phase: 'Lansiranje', duration: '1 nedelja', description: 'Otvaranje franšize' },
        { phase: 'Rast', duration: 'Kontinuirano', description: 'Praćenje i rast biznisa' }
      ],
      highlighted: false,
      badge: null,
      ctaButton: {
        text: 'Saznaj više',
        link: '/fransiza/prijava',
        style: 'primary'
      },
      testimonials: [],
      faq: [],
      order: programDoc.order || 1,
      active: true,
      metadata: {
        migratedFrom: 'program',
        originalId: programDoc._id,
        migrationDate: new Date().toISOString()
      }
    }
  }

  private calculatePackagePrice(programDoc: any): number {
    // Simple pricing logic based on program complexity
    const basePrice = 50000 // Base price in RSD
    const features = programDoc.features?.length || 1
    const duration = programDoc.duration || 1
    
    return Math.round(basePrice + (features * 5000) + (duration * 2000))
  }

  private transformFAQ(faqDoc: any): any {
    return {
      _type: 'modernFranchiseFAQ',
      _id: `modern-faq-${uuidv4()}`,
      question: faqDoc.question,
      answer: faqDoc.answer,
      category: faqDoc.category ? {
        _type: 'reference',
        _ref: `faq-category-${faqDoc.category._id || 'general'}`
      } : null,
      tags: this.extractFAQTags(faqDoc.question + ' ' + faqDoc.answer),
      priority: faqDoc.featured ? 'high' : 'normal',
      isActive: true,
      lastUpdated: new Date().toISOString(),
      metadata: {
        migratedFrom: 'faq',
        originalId: faqDoc._id,
        migrationDate: new Date().toISOString()
      }
    }
  }

  private extractFAQTags(content: string): string[] {
    const keywords = ['franšiza', 'cena', 'obuka', 'podrška', 'investicija', 'lokacija', 'program']
    return keywords.filter(keyword => content.toLowerCase().includes(keyword))
  }

  private transformToFranchiseModelsPage(homePageDoc: any): any {
    return {
      _type: 'franchiseModelsPage',
      _id: `franchise-models-${uuidv4()}`,
      title: 'Modeli franšize',
      hero: {
        alternatingTitles: [
          'Pokrenite svoju franšizu',
          'Pridružite se uspešnoj mreži',
          'Investirajte u obrazovanje'
        ],
        subtitle: 'Izaberite najbolji model za vaš uspeh',
        description: 'Nudimo različite modele franšize prilagođene vašim potrebama i mogućnostima',
        floatingElements: [
          { text: '100+', icon: 'users', position: 'top-left', delay: 0 },
          { text: 'Lokacije', icon: 'map-pin', position: 'top-right', delay: 200 },
          { text: '5★', icon: 'star', position: 'bottom-left', delay: 400 },
          { text: 'Ocena', icon: 'heart', position: 'bottom-right', delay: 600 }
        ],
        backgroundVideo: null,
        backgroundImage: homePageDoc.hero?.image || null
      },
      statistics: {
        title: 'Naši rezultati',
        stats: [
          { number: 150, label: 'Aktuelnih lokacija', icon: 'building', suffix: '+', animationDuration: 2000 },
          { number: 95, label: 'Zadovoljnih vlasnika', icon: 'smile', suffix: '%', animationDuration: 2500 },
          { number: 5000, label: 'Srećne dece', icon: 'users', suffix: '+', animationDuration: 3000 },
          { number: 98, label: 'Stopa uspešnosti', icon: 'trending-up', suffix: '%', animationDuration: 3500 }
        ]
      },
      packagesSection: {
        title: 'Izaberite svoj paket',
        subtitle: 'Svaki paket je dizajniran da odgovori vašim specifičnim potrebama',
        packages: [] // Will be populated with references
      },
      ctaSections: [
        {
          title: 'Spremni za početak?',
          description: 'Kontaktirajte nas danas i saznajte kako možete pokrenuti svoju franšizu',
          buttonText: 'Počnite danas',
          buttonLink: '/fransiza/prijava',
          backgroundColor: '#4F46E5',
          image: null
        }
      ],
      seo: {
        metaTitle: 'Modeli franšize - Srećno učenje',
        metaDescription: 'Otkrijte različite modele franšize i izaberite najbolji za vaš uspeh. Pridružite se mreži od 150+ lokacija.',
        keywords: 'franšiza, modeli franšize, investicija, obrazovanje, biznis prilika'
      },
      metadata: {
        migratedFrom: 'homePage',
        originalId: homePageDoc._id,
        migrationDate: new Date().toISOString()
      }
    }
  }

  private transformToHowToJoinPage(pageDoc: any): any {
    return {
      _type: 'howToJoinPage',
      _id: `how-to-join-${uuidv4()}`,
      title: 'Kako se pridružiti',
      hero: {
        title: 'Vaš put do uspešne franšize',
        subtitle: 'Jednostavan proces u nekoliko koraka',
        description: 'Vodićemo vas kroz ceo proces od početka do otvaranja vaše franšize',
        image: pageDoc.featuredImage || null
      },
      steps: [
        {
          number: 1,
          title: 'Kontakt i konsultacija',
          description: 'Razgovor o vašim ciljevima i mogućnostima',
          details: [
            'Početna konsultacija (besplatno)',
            'Analiza tržišta u vašoj oblasti',
            'Procena investicionih mogućnosti'
          ],
          duration: '1-2 nedelje',
          icon: 'phone'
        },
        {
          number: 2,
          title: 'Dokumentacija i ugovor',
          description: 'Priprema svih potrebnih dokumenata',
          details: [
            'Potpisivanje franchise ugovora',
            'Registracija lokalne firme',
            'Obezbeđenje potrebnih dozvola'
          ],
          duration: '2-3 nedelje',
          icon: 'file-text'
        },
        {
          number: 3,
          title: 'Obuka i priprema',
          description: 'Kompletna obuka za uspešno poslovanje',
          details: [
            'Obuka za metodologiju rada',
            'Marketing i prodaja',
            'Administrativni sistemi'
          ],
          duration: '3-4 nedelje',
          icon: 'graduation-cap'
        },
        {
          number: 4,
          title: 'Lansiranje franšize',
          description: 'Otvaranje i početak rada',
          details: [
            'Grand opening event',
            'Početna marketing kampanja',
            'Kontinuirana podrška'
          ],
          duration: '1 nedelja',
          icon: 'rocket'
        }
      ],
      requirements: {
        title: 'Uslovi za franšizu',
        items: [
          {
            title: 'Finansijski uslovi',
            description: 'Minimalni kapital za investiciju',
            details: ['Početna investicija: 500.000 - 1.500.000 RSD', 'Operativni kapital: 200.000 RSD']
          },
          {
            title: 'Lokacija',
            description: 'Pogodni prostor za rad',
            details: ['Minimum 80m² prostora', 'Dobar saobraćajni pristup', 'Parking mogućnosti']
          },
          {
            title: 'Lični uslovi',
            description: 'Vaš profil i motivacija',
            details: ['Posvećenost radu sa decom', 'Preduzetničko iskustvo (poželjno)', 'Lokalno poznavanje tržišta']
          }
        ]
      },
      benefits: {
        title: 'Zašto naša franšiza',
        items: [
          {
            icon: 'award',
            title: 'Dokazana metodologija',
            description: 'Preko 10 godina uspešnog rada'
          },
          {
            icon: 'users',
            title: 'Stručna podrška',
            description: 'Tim eksperata uvek na raspolaganju'
          },
          {
            icon: 'trending-up',
            title: 'Rastući tržište',
            description: 'Obrazovanje je investicija u budućnost'
          },
          {
            icon: 'shield',
            title: 'Nizak rizik',
            description: 'Dokazani biznis model sa visokom stopom uspešnosti'
          }
        ]
      },
      faq: [], // Will be populated with references
      ctaSection: {
        title: 'Spremni za sledeći korak?',
        description: 'Kontaktirajte nas danas i započnite svoj put ka uspešnoj franšizi',
        primaryButton: {
          text: 'Prijavite se',
          link: '/fransiza/prijava'
        },
        secondaryButton: {
          text: 'Preuzmite brošuru',
          link: '/resources/franchise-brochure.pdf'
        }
      },
      seo: {
        metaTitle: 'Kako se pridružiti franšizi - Srećno učenje',
        metaDescription: 'Saznajte korake za pridruživanje našoj uspešnoj franšizi. Jednostavan proces, stručna podrška, dokazani rezultati.',
        keywords: 'franšiza pridruživanje, koraci franšize, investicija obrazovanje'
      },
      metadata: {
        migratedFrom: 'page',
        originalId: pageDoc._id,
        migrationDate: new Date().toISOString()
      }
    }
  }

  private async checkDocumentExists(type: string, originalId: string): Promise<boolean> {
    try {
      const query = `*[_type == "${type}" && metadata.originalId == "${originalId}"][0]._id`
      const result = await client.fetch(query)
      return !!result
    } catch {
      return false
    }
  }

  private async migrateDocumentType(plan: MigrationPlan, sourceData: any): Promise<void> {
    const documents = sourceData.documents || []
    
    if (documents.length === 0) {
      console.log(`  ⚠️  No ${plan.sourceType} documents to migrate`)
      return
    }

    console.log(`  🔄 Migrating ${documents.length} ${plan.sourceType} → ${plan.targetType}`)

    const batches = []
    for (let i = 0; i < documents.length; i += plan.batchSize) {
      batches.push(documents.slice(i, i + plan.batchSize))
    }

    for (const [batchIndex, batch] of batches.entries()) {
      console.log(`    📦 Batch ${batchIndex + 1}/${batches.length} (${batch.length} documents)`)

      for (const sourceDoc of batch) {
        try {
          // Check if already migrated
          const exists = await this.checkDocumentExists(plan.targetType, sourceDoc._id)
          if (exists) {
            console.log(`    ⏭️  Already migrated: ${sourceDoc._id}`)
            continue
          }

          // Transform document
          const targetDoc = plan.transformer(sourceDoc)
          
          // Validate required fields
          if (!targetDoc._type || !targetDoc._id) {
            throw new Error('Missing required fields: _type or _id')
          }

          // Create document
          await client.create(targetDoc)
          
          this.results.documentsCreated++
          this.results.createdDocuments.push({
            _id: targetDoc._id,
            _type: targetDoc._type,
            title: targetDoc.name || targetDoc.title || `${targetDoc._type}-${this.results.documentsCreated}`
          })

          console.log(`    ✅ Created: ${targetDoc._type} - ${targetDoc._id}`)

        } catch (error) {
          console.error(`    ❌ Failed to migrate ${sourceDoc._id}:`, error)
          this.results.errors.push({
            type: `${plan.sourceType} → ${plan.targetType}`,
            error: error instanceof Error ? error.message : String(error)
          })
          this.results.success = false
        }
      }

      // Prevent API rate limiting
      if (batchIndex < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
  }

  async run(): Promise<void> {
    console.log('🛡️  Starting safe migration...')

    try {
      // Load exported data
      console.log('📁 Loading export data...')
      const exportData = this.loadExportData()

      // Sort plans by priority
      const sortedPlans = this.migrationPlans.sort((a, b) => a.priority - b.priority)

      // Execute migration phases
      for (const plan of sortedPlans) {
        console.log(`\n🔄 Phase ${plan.priority}: ${plan.sourceType} → ${plan.targetType}`)

        // Check dependencies
        if (plan.dependencies.length > 0) {
          console.log(`  🔗 Dependencies: ${plan.dependencies.join(', ')}`)
          // In a full implementation, we would verify dependencies exist
        }

        const sourceData = exportData[plan.sourceType]
        if (sourceData) {
          await this.migrateDocumentType(plan, sourceData)
        } else {
          console.log(`  ⚠️  No source data for ${plan.sourceType}`)
        }
      }

      // Generate results
      await this.generateResults()

      console.log('\n🎉 Safe migration completed!')
      console.log(`✅ Created: ${this.results.documentsCreated} documents`)
      console.log(`❌ Errors: ${this.results.errors.length}`)

    } catch (error) {
      console.error('\n💥 Migration failed:', error)
      this.results.success = false
      await this.generateResults()
      process.exit(1)
    }
  }

  private async generateResults(): Promise<void> {
    const resultsPath = path.join(this.exportDir, 'MIGRATION_RESULTS.json')
    fs.writeFileSync(resultsPath, JSON.stringify(this.results, null, 2))

    const reportPath = path.join(this.exportDir, 'MIGRATION_REPORT.md')
    const report = `# Safe Migration Report

**Migration Date:** ${new Date().toISOString()}
**Status:** ${this.results.success ? '✅ SUCCESS' : '❌ PARTIAL SUCCESS'}
**Documents Created:** ${this.results.documentsCreated}
**Errors:** ${this.results.errors.length}

## Created Documents

${this.results.createdDocuments.map(doc => 
  `- **${doc._type}**: \`${doc._id}\` - ${doc.title}`
).join('\n')}

## Errors

${this.results.errors.length === 0 ? 'No errors! 🎉' : 
  this.results.errors.map(err => `- **${err.type}**: ${err.error}`).join('\n')}

## Next Steps

1. ✅ Verify created documents in Sanity Studio
2. 🔗 Update references between documents
3. 🧪 Test all functionality
4. 📊 Compare document counts with original export
5. 🚀 Deploy and test website

## Rollback Instructions

If needed, documents can be removed with:
\`\`\`groq
*[_type in ["school", "franchisePackage", "modernFranchiseFAQ", "franchiseModelsPage", "howToJoinPage"] && metadata.migrationDate >= "${new Date().toISOString().split('T')[0]}"]
\`\`\`

⚠️ **Important**: Test thoroughly before considering migration complete!
`

    fs.writeFileSync(reportPath, report)

    console.log(`📄 Results saved: ${resultsPath}`)
    console.log(`📋 Report saved: ${reportPath}`)
  }
}

// Run migration if called directly
if (require.main === module) {
  if (!process.env.SANITY_API_TOKEN) {
    console.log('⚠️  SANITY_API_TOKEN not found in environment variables')
    console.log('Please set your Sanity API token with write permissions:')
    console.log('export SANITY_API_TOKEN="your_token_here"')
    process.exit(1)
  }

  const migrator = new SafeMigrator()
  migrator.run().catch(console.error)
}

export default SafeMigrator