// Script to seed franchise models
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: 'skYc1dLdlL4lEIKyyuy39qoANTkDFMlnL8IUaKYcyiJ31DsmSBJWyWLA5vWBKcGRAtDcVsB5DPKn4I8NheeBOG75VBTuWZSDEjFGewZFaypQtvaSIQEVmb1EQEOOtrYhKZvseL1xw9QRJcvQmkUo3HE2ze29bGx5hmL0Yj4mzJduq0WxNrPV'
})

async function seedFranchiseModels() {
  try {
    const models = [
      {
        _type: 'franchiseModel',
        name: 'Starter paket',
        description: 'Idealno za početnike koji žele da testiraju franšizu',
        price: 15000,
        features: [
          'Osnovna obuka',
          'Početni materijali',
          'Podrška 6 meseci',
          'Online platforma',
          'Marketing materijali'
        ],
        isRecommended: false,
        color: 'blue',
        order: 1
      },
      {
        _type: 'franchiseModel',
        name: 'Professional paket',
        description: 'Najbolji izbor za ozbiljne preduzetnike',
        price: 25000,
        features: [
          'Kompletna obuka',
          'Svi materijali',
          'Podrška 12 meseci',
          'Online + offline platforma',
          'Marketing kampanja',
          'Mentor podrška',
          'Tehnička podrška'
        ],
        isRecommended: true,
        color: 'green',
        order: 2
      },
      {
        _type: 'franchiseModel',
        name: 'Premium paket',
        description: 'Za one koji žele maksimalni uspeh',
        price: 40000,
        features: [
          'VIP obuka',
          'Premium materijali',
          'Doživotna podrška',
          'Sve platforme',
          'Premium marketing',
          'Lični mentor',
          'Prioritetna podrška',
          'Ekskluzivni sadržaj'
        ],
        isRecommended: false,
        color: 'purple',
        order: 3
      }
    ]

    for (const model of models) {
      const created = await client.create(model)
      console.log(`Created franchise model: ${model.name} (${created._id})`)
    }

    console.log('✅ All franchise models created successfully!')
    
  } catch (error) {
    console.error('Error seeding franchise models:', error)
  }
}

seedFranchiseModels()