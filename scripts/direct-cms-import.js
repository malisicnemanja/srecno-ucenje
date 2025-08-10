/**
 * DIRECT CMS IMPORT SCRIPT
 * 
 * Direktno popunjava Sanity CMS sa srpskim sadržajem
 * Potreban je SANITY_AUTH_TOKEN environment varijabla
 */

const { createClient } = require('@sanity/client');
const { cmsData } = require('./generate-cms-json-data');

// Kreiranje Sanity klijenta
const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-08-01',
  token: process.env.SANITY_AUTH_TOKEN
});

// Funkcija za kreiranje FAQ kategorija
async function createFAQCategories() {
  console.log('🏷️  Kreiram FAQ kategorije...');
  
  const categoryRefs = {};
  
  for (const category of cmsData.faqCategories) {
    try {
      const result = await client.create(category);
      categoryRefs[category.slug.current] = result._id;
      console.log(`  ✅ Kreirana kategorija: ${category.name} (${result._id})`);
    } catch (error) {
      console.error(`  ❌ Greška pri kreiranju kategorije ${category.name}:`, error.message);
    }
  }
  
  return categoryRefs;
}

// Funkcija za kreiranje FAQ pitanja
async function createFAQs(categoryRefs) {
  console.log('❓ Kreiram FAQ pitanja...');
  
  const faqRefs = [];
  
  for (const faq of cmsData.faqs) {
    try {
      // Pronalaženje kategorije
      const categorySlug = faq.category.replace('REF_TO_CATEGORY_', '');
      const categoryId = categoryRefs[categorySlug];
      
      if (!categoryId) {
        console.warn(`  ⚠️  Kategorija ${categorySlug} nije pronađena za pitanje: ${faq.question}`);
        continue;
      }
      
      const faqDoc = {
        _type: 'faq',
        question: faq.question,
        answer: faq.answer,
        category: {
          _type: 'reference',
          _ref: categoryId
        },
        order: faq.order
      };
      
      const result = await client.create(faqDoc);
      faqRefs.push(result._id);
      console.log(`  ✅ Kreirano pitanje: ${faq.question.substring(0, 50)}... (${result._id})`);
    } catch (error) {
      console.error(`  ❌ Greška pri kreiranju FAQ:`, error.message);
    }
  }
  
  console.log(`📊 Ukupno kreirano ${faqRefs.length} FAQ pitanja`);
  return faqRefs;
}

// Funkcija za kreiranje Home Page
async function createOrUpdateHomePage(faqRefs) {
  console.log('🏠 Kreiram/ažuriram Home Page sadržaj...');
  
  try {
    // Proveriti da li već postoji home page
    const existingHomePage = await client.fetch('*[_type == "homePage"][0]');
    
    // Priprema sadržaja sa FAQ referencama
    const homePageData = {
      ...cmsData.homePage,
      homeFaqs: {
        sectionTitle: 'Česta pitanja',
        faqs: faqRefs.slice(0, 10).map(id => ({
          _type: 'reference',
          _ref: id,
          _key: id
        }))
      }
    };
    
    if (existingHomePage) {
      console.log('  ℹ️  Home Page već postoji, ažuriram sadržaj...');
      
      await client
        .patch(existingHomePage._id)
        .set(homePageData)
        .commit();
      
      console.log(`  ✅ Home Page uspešno ažuriran (${existingHomePage._id})`);
    } else {
      console.log('  ➕ Kreiram novi Home Page...');
      
      const result = await client.create(homePageData);
      console.log(`  ✅ Novi Home Page uspešno kreiran (${result._id})`);
    }
  } catch (error) {
    console.error('  ❌ Greška pri kreiranju Home Page:', error.message);
    throw error;
  }
}

// Glavna funkcija
async function main() {
  console.log('🚀 Počinje direktan uvoz sadržaja u Sanity CMS...\n');
  
  // Proverava da li postoji auth token
  if (!process.env.SANITY_AUTH_TOKEN) {
    console.error('❌ SANITY_AUTH_TOKEN environment varijabla nije postavljena!');
    console.error('\nPokrenite script ovako:');
    console.error('SANITY_AUTH_TOKEN="your-token-here" node scripts/direct-cms-import.js');
    console.error('\nIli postavite trajno:');
    console.error('export SANITY_AUTH_TOKEN="your-token-here"');
    console.error('\nAuth token možete dobiti na: https://sanity.io/manage');
    process.exit(1);
  }
  
  try {
    // Test konekcije
    await client.fetch('*[_type == "homePage"] | order(_createdAt desc) [0]');
    console.log('✅ Konekcija sa Sanity CMS je uspešna\n');
    
    // 1. Kreiranje FAQ kategorija
    console.log('🎯 Korak 1: Kreiranje FAQ kategorija');
    const categoryRefs = await createFAQCategories();
    console.log(`✅ Kreirane kategorije: ${Object.keys(categoryRefs).length}\n`);
    
    // 2. Kreiranje FAQ pitanja
    console.log('🎯 Korak 2: Kreiranje FAQ pitanja');
    const faqRefs = await createFAQs(categoryRefs);
    console.log(`✅ Kreirano FAQ pitanja: ${faqRefs.length}\n`);
    
    // 3. Kreiranje Home Page
    console.log('🎯 Korak 3: Kreiranje Home Page');
    await createOrUpdateHomePage(faqRefs);
    console.log('✅ Home Page je spreman\n');
    
    // Završni izveštaj
    console.log('🎉 USPEŠNO ZAVRŠENO!');
    console.log('📊 Uvezen sadržaj:');
    console.log(`   • ${Object.keys(categoryRefs).length} FAQ kategorija`);
    console.log(`   • ${faqRefs.length} FAQ pitanja`);
    console.log('   • 1 kompletna Home Page sa svim sekcijama');
    console.log('   • 4 statističke vrednosti');
    console.log('   • 3 ključne prednosti (differentiators)');
    console.log('   • 4 koraka franšiza procesa');
    console.log('   • 3 franšiza modela (Starter, Professional, Master)');
    console.log('   • 3 priče uspešnih partnera');
    console.log('   • 3 besplatna resursa (lead magnets)');
    console.log('   • Newsletter CTA sekcija');
    console.log('   • SEO optimizovani sadržaj');
    
    console.log('\n🎯 Sledeći koraci:');
    console.log('1. Idite u Sanity Studio (/studio) da pregledate sadržaj');
    console.log('2. Dodajte slike za hero sekciju i priče partnera');
    console.log('3. Prilagodite sadržaj prema potrebama');
    console.log('4. Testirajte home page na frontendu');
    
  } catch (error) {
    console.error('💥 Kritična greška:', error.message);
    
    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      console.error('\n🔐 Problem sa autentifikacijom:');
      console.error('1. Proverite da li je SANITY_AUTH_TOKEN postavljen');
      console.error('2. Proverite da li token ima write permissions');
      console.error('3. Token možete kreirati na: https://sanity.io/manage');
    } else if (error.message.includes('403')) {
      console.error('\n🚫 Problem sa dozvolama:');
      console.error('1. Token možda nema dozvole za pisanje');
      console.error('2. Proverite dataset permissions u Sanity Console');
    }
    
    console.error('\nStack trace:', error.stack);
    process.exit(1);
  }
}

// Pokretanje skripte
if (require.main === module) {
  main();
}

module.exports = {
  createFAQCategories,
  createFAQs,
  createOrUpdateHomePage,
  main
};