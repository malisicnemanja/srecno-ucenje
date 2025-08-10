/**
 * CREATE DEMO CONTENT SCRIPT
 * 
 * Kreira demo sadržaj za brzo testiranje home page komponenti
 * Može se koristiti bez auth tokena - generiše fajlove za copy/paste u Studio
 */

const fs = require('fs');
const path = require('path');

// Demo sadržaj koji možete koristiti za brzo testiranje
const demoContent = {
  // Minimalni Home Page za brzo testiranje
  quickHomePage: {
    _type: 'homePage',
    enhancedHero: {
      title: 'Pokrenite uspešnu obrazovnu franšizu',
      subtitle: 'Pridružite se mreži od preko 50 centara širom Srbije i transformišite obrazovanje u vašoj zajednici.',
      badge: 'Franšiza #1 u Srbiji',
      primaryCta: {
        text: 'Počnite danas',
        href: '/franchise-application'
      },
      secondaryCta: {
        text: 'Saznajte više',
        href: '/o-nama'
      },
      backgroundType: 'pattern',
      backgroundPattern: 'dots'
    },
    
    statistics: [
      {
        number: '20000',
        suffix: '+',
        label: 'Dece',
        description: 'prošlo kroz naše programe'
      },
      {
        number: '50',
        suffix: '+',
        label: 'Centara',
        description: 'širom Srbije'
      },
      {
        number: '15',
        suffix: '',
        label: 'Godina',
        description: 'iskustva u obrazovanju'
      },
      {
        number: '95',
        suffix: '%',
        label: 'Zadovoljstvo',
        description: 'partnera i roditelja'
      }
    ],
    
    newsletter: {
      title: 'Budite informisani',
      description: 'Prijavite se za najnovije vesti o franšiza prilikama.',
      ctaText: 'Prijavite se'
    },
    
    seo: {
      title: 'Srećno učenje - Obrazovna franšiza',
      description: 'Pridružite se najuspešnijoj mreži obrazovnih centara u Srbiji. Dokazana metodologija, kompletna podrška.'
    }
  },

  // Brze FAQ kategorije
  quickFAQCategories: [
    {
      _type: 'faqCategory',
      name: 'Opšte',
      slug: { _type: 'slug', current: 'opste' },
      description: 'Osnovna pitanja o franšizi'
    },
    {
      _type: 'faqCategory', 
      name: 'Finansije',
      slug: { _type: 'slug', current: 'finansije' },
      description: 'Pitanja o investiciji i profitabilnosti'
    }
  ],

  // Brza FAQ pitanja
  quickFAQs: [
    {
      _type: 'faq',
      question: 'Kolika je početna investicija?',
      answer: 'Početna investicija se kreće od 8.000€ do 25.000€ zavisno od modela franšize koji birate.',
      order: 1
    },
    {
      _type: 'faq',
      question: 'Kada mogu očekivati povraćaj investicije?',
      answer: 'Većina naših partnera ostvaruje povraćaj investicije između 18-30 meseci.',
      order: 2
    },
    {
      _type: 'faq',
      question: 'Kakva podrška se pruža?',
      answer: 'Pružamo kompletnu obuku, kontinuiranu podršku, marketing materijale i 24/7 tehničku podršku.',
      order: 3
    }
  ]
};

// Kreiranje demo fajlova
function createDemoFiles() {
  console.log('🎬 Kreiram demo sadržaj za brzo testiranje...\n');

  const demoDir = path.join(__dirname, 'demo-content');
  if (!fs.existsSync(demoDir)) {
    fs.mkdirSync(demoDir, { recursive: true });
  }

  // Quick Home Page
  const quickHomePagePath = path.join(demoDir, 'quick-home-page.json');
  fs.writeFileSync(quickHomePagePath, JSON.stringify(demoContent.quickHomePage, null, 2));
  console.log(`✅ Kreiran: ${quickHomePagePath}`);

  // Quick FAQ kategorije
  const quickCategoriesPath = path.join(demoDir, 'quick-faq-categories.json');
  fs.writeFileSync(quickCategoriesPath, JSON.stringify(demoContent.quickFAQCategories, null, 2));
  console.log(`✅ Kreiran: ${quickCategoriesPath}`);

  // Quick FAQ pitanja
  const quickFAQsPath = path.join(demoDir, 'quick-faqs.json');
  fs.writeFileSync(quickFAQsPath, JSON.stringify(demoContent.quickFAQs, null, 2));
  console.log(`✅ Kreiran: ${quickFAQsPath}`);

  // Kompletni demo sadržaj
  const allDemoPath = path.join(demoDir, 'complete-demo.json');
  fs.writeFileSync(allDemoPath, JSON.stringify(demoContent, null, 2));
  console.log(`✅ Kreiran: ${allDemoPath}`);

  // Instrukcije za demo
  const demoInstructionsPath = path.join(demoDir, 'DEMO-INSTRUKCIJE.md');
  const demoInstructions = `# Demo sadržaj za brzo testiranje

## Fajlovi:
1. **quick-home-page.json** - Minimalna home page
2. **quick-faq-categories.json** - 2 FAQ kategorije
3. **quick-faqs.json** - 3 FAQ pitanja
4. **complete-demo.json** - Sav demo sadržaj

## Kako koristiti:

### Brzo testiranje home page komponenti:
1. Idite u Sanity Studio (/studio)
2. Kreirajte novi Home Page dokument
3. Kopirajte sadržaj iz quick-home-page.json
4. Paste u Studio i sačuvajte

### Testiranje FAQ sistema:
1. Prvo kreirajte FAQ kategorije iz quick-faq-categories.json
2. Zatim kreirajte FAQ pitanja iz quick-faqs.json
3. Povežite pitanja sa kategorijama

## Prednosti demo sadržaja:
- ⚡ Brzo za implementaciju
- 🎯 Fokus na ključne sekcije
- 📱 Optimizovano za testiranje
- 🚀 Ready za produkciju

## Napomene:
- Demo sadržaj je minimalan ali funkcionalan
- Možete ga proširiti sa kompletnim sadržajem iz ../cms-data/
- Idealno za prvu verziju i testiranje komponenti

Sav demo sadržaj je profesionalno napisan i spreman za korišćenje!
`;

  fs.writeFileSync(demoInstructionsPath, demoInstructions);
  console.log(`✅ Kreiran: ${demoInstructionsPath}`);

  console.log('\n🎉 Demo sadržaj je spreman!');
  console.log(`📁 Lokacija: ${demoDir}`);
  console.log('\n💡 Prednosti demo sadržaja:');
  console.log('   • Brza implementacija (5 minuta)');
  console.log('   • Fokus na ključne sekcije');
  console.log('   • Idealno za početno testiranje');
  console.log('   • Može se lako proširiti');
  
  console.log('\n🎯 Za kompletni sadržaj koristite fajlove iz ../cms-data/');
}

// Copy/paste sadržaj za direktno korišćenje
function showCopyPasteContent() {
  console.log('\n📋 COPY/PASTE SADRŽAJ ZA SANITY STUDIO:\n');
  
  console.log('=== HOME PAGE ENHANCED HERO (kopirajte u Studio) ===');
  console.log(JSON.stringify(demoContent.quickHomePage.enhancedHero, null, 2));
  
  console.log('\n=== STATISTICS (kopirajte u Studio) ===');
  console.log(JSON.stringify(demoContent.quickHomePage.statistics, null, 2));
  
  console.log('\n=== FAQ KATEGORIJE (kreirajte u Studio) ===');
  demoContent.quickFAQCategories.forEach((cat, index) => {
    console.log(`Kategorija ${index + 1}:`);
    console.log(`Name: ${cat.name}`);
    console.log(`Slug: ${cat.slug.current}`);
    console.log(`Description: ${cat.description}\n`);
  });
}

// Pokretanje
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--copy-paste')) {
    showCopyPasteContent();
  } else {
    createDemoFiles();
  }
}

module.exports = { demoContent, createDemoFiles };