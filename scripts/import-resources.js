const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skYc1dLdlL4lEIKyyuy39qoANTkDFMlnL8IUaKYcyiJ31DsmSBJWyWLA5vWBKcGRAtDcVsB5DPKn4I8NheeBOG75VBTuWZSDEjFGewZFaypQtvaSIQEVmb1EQEOOtrYhKZvseL1xw9QRJcvQmkUo3HE2ze29bGx5hmL0Yj4mzJduq0WxNrPV',
  useCdn: false
})

async function importResources() {
  console.log('📝 Kreiram resurse...')

  const resources = [
    {
      _type: 'resource',
      title: 'Kompletan vodič za franšizu - 2024',
      slug: { current: 'kompletan-vodic-fransizu-2024' },
      category: 'franchise_guide',
      description: 'Sve što trebate znati o pokretanju Srećno učenje franšize. Od prvog koraka do otvaranja centra.',
      resourceType: 'pdf',
      fileSize: 3.5,
      pages: 45,
      requiresLead: true,
      featured: true,
      tags: ['franšiza', 'vodič', 'početnici', '2024'],
    },
    {
      _type: 'resource',
      title: 'Finansijski kalkulator - Excel template',
      slug: { current: 'finansijski-kalkulator-excel' },
      category: 'business_plans',
      description: 'Detaljni Excel template za projekciju prihoda i rashoda vašeg centra.',
      resourceType: 'excel',
      fileSize: 1.2,
      requiresLead: true,
      tags: ['finansije', 'excel', 'kalkulator', 'biznis plan'],
    },
    {
      _type: 'resource',
      title: 'Metodologija Srećno učenje - Pregled',
      slug: { current: 'metodologija-srecno-ucenje-pregled' },
      category: 'methodology',
      description: 'Detaljan pregled naše obrazovne metodologije sa primerima iz prakse.',
      resourceType: 'pdf',
      fileSize: 2.8,
      pages: 32,
      requiresLead: false,
      featured: true,
      tags: ['metodologija', 'obrazovanje', 'deca', 'učenje'],
    },
    {
      _type: 'resource',
      title: 'Marketing priručnik za franšizere',
      slug: { current: 'marketing-prirucnik-fransizere' },
      category: 'marketing',
      description: 'Kompletan set marketing materijala i strategija za promociju vašeg centra.',
      resourceType: 'pdf',
      fileSize: 4.2,
      pages: 56,
      requiresLead: true,
      tags: ['marketing', 'promocija', 'strategija', 'franšiza'],
    },
    {
      _type: 'resource',
      title: 'Studija slučaja - Centar Novi Sad',
      slug: { current: 'studija-slucaja-novi-sad' },
      category: 'case_studies',
      description: 'Kako je naš partner u Novom Sadu dostigao profitabilnost za 8 meseci.',
      resourceType: 'pdf',
      fileSize: 1.8,
      pages: 18,
      requiresLead: true,
      featured: true,
      tags: ['studija slučaja', 'uspeh', 'Novi Sad', 'profitabilnost'],
    },
    {
      _type: 'resource',
      title: 'Pravni okvir franšize - Checklist',
      slug: { current: 'pravni-okvir-checklist' },
      category: 'legal',
      description: 'Lista svih pravnih dokumenata i procedura potrebnih za otvaranje centra.',
      resourceType: 'checklist',
      fileSize: 0.5,
      pages: 8,
      requiresLead: false,
      tags: ['pravni', 'dokumenti', 'checklist', 'franšiza'],
    },
    {
      _type: 'resource',
      title: 'Video prezentacija - Dan u centru',
      slug: { current: 'video-prezentacija-dan-u-centru' },
      category: 'training',
      description: 'Video snimak tipičnog radnog dana u našem centru sa komentarima.',
      resourceType: 'video',
      fileSize: 125,
      requiresLead: true,
      tags: ['video', 'trening', 'dan u centru', 'edukacija'],
    },
    {
      _type: 'resource',
      title: 'Infografika - ROI u 12 meseci',
      slug: { current: 'infografika-roi-12-meseci' },
      category: 'business_plans',
      description: 'Vizuelni prikaz povrata investicije tokom prve godine poslovanja.',
      resourceType: 'infographic',
      fileSize: 0.8,
      requiresLead: false,
      tags: ['ROI', 'infografika', 'investicija', 'prva godina'],
    },
    {
      _type: 'resource',
      title: 'Priručnik za rad sa decom',
      slug: { current: 'prirucnik-rad-sa-decom' },
      category: 'training',
      description: 'Osnove pedagogije i praktični saveti za rad sa decom različitih uzrasta.',
      resourceType: 'pdf',
      fileSize: 3.2,
      pages: 42,
      requiresLead: true,
      tags: ['edukacija', 'deca', 'pedagogija', 'priručnik'],
    },
    {
      _type: 'resource',
      title: 'Template biznis plana',
      slug: { current: 'template-biznis-plana' },
      category: 'business_plans',
      description: 'Prilagođen template za kreiranje biznis plana vašeg Srećno učenje centra.',
      resourceType: 'presentation',
      fileSize: 2.5,
      pages: 28,
      requiresLead: true,
      featured: true,
      tags: ['biznis plan', 'template', 'prezentacija', 'franšiza'],
    }
  ]

  try {
    for (const resource of resources) {
      const created = await client.create(resource)
      console.log(`✅ Kreiran resurs: ${resource.title}`)
    }
    
    console.log('\n✅ Svi resursi su uspešno kreirani!')
    console.log('Možete ih videti u Sanity Studio-u.')
    
  } catch (error) {
    console.error('❌ Greška:', error)
  }
}

// Pokreni import
importResources()