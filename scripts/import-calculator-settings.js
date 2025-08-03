const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skYc1dLdlL4lEIKyyuy39qoANTkDFMlnL8IUaKYcyiJ31DsmSBJWyWLA5vWBKcGRAtDcVsB5DPKn4I8NheeBOG75VBTuWZSDEjFGewZFaypQtvaSIQEVmb1EQEOOtrYhKZvseL1xw9QRJcvQmkUo3HE2ze29bGx5hmL0Yj4mzJduq0WxNrPV',
  useCdn: false
})

async function importCalculatorSettings() {
  console.log('📝 Kreiram Calculator Settings dokument...')

  try {
    const settings = await client.create({
      _type: 'calculatorSettings',
      franchiseModels: [
        {
          name: 'Starter',
          basePrice: 15000,
          description: 'Osnovni paket za početnike',
          includedItems: [
            'Licenca za korišćenje brenda',
            'Osnovna obuka (3 dana)',
            'Početni set materijala',
            'Online podrška 6 meseci'
          ]
        },
        {
          name: 'Professional',
          basePrice: 25000,
          description: 'Profesionalni paket sa dodatnim resursima',
          includedItems: [
            'Licenca za korišćenje brenda',
            'Napredna obuka (5 dana)',
            'Kompletan set materijala',
            'Online podrška 12 meseci',
            'Marketing paket',
            'Softver za upravljanje'
          ]
        },
        {
          name: 'Premium',
          basePrice: 40000,
          description: 'Premium paket sa potpunom podrškom',
          includedItems: [
            'Ekskluzivna licenca za teritoriju',
            'VIP obuka (7 dana + mentoring)',
            'Premium materijali i oprema',
            'Neograničena podrška',
            'Kompletan marketing sistem',
            'Softver i hardver',
            'Pomoć pri zapošljavanju'
          ]
        }
      ],
      cities: [
        { name: 'Beograd', priceMultiplier: 1.2, demandLevel: 'high' },
        { name: 'Novi Sad', priceMultiplier: 1.0, demandLevel: 'high' },
        { name: 'Niš', priceMultiplier: 0.9, demandLevel: 'medium' },
        { name: 'Kragujevac', priceMultiplier: 0.85, demandLevel: 'medium' },
        { name: 'Subotica', priceMultiplier: 0.8, demandLevel: 'medium' },
        { name: 'Pančevo', priceMultiplier: 0.8, demandLevel: 'low' }
      ],
      spaceRequirements: {
        minSquareMeters: 80,
        optimalSquareMeters: 150,
        pricePerSquareMeter: 10
      },
      renovationCosts: {
        basic: 100,
        standard: 150,
        premium: 250
      },
      operationalCosts: {
        monthlyMarketing: 500,
        monthlyUtilities: 400,
        monthlyOther: 300,
        staffSalaryPerPerson: 800
      },
      revenueSettings: {
        pricePerChild: 50,
        averageChildrenPerGroup: 12,
        groupsPerDay: 4,
        workingDaysPerMonth: 22
      }
    })

    console.log('✅ Calculator Settings kreiran uspešno!')
    console.log('ID:', settings._id)
    
  } catch (error) {
    console.error('❌ Greška:', error)
  }
}

// Pokreni import
importCalculatorSettings()