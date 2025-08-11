/**
 * CMS STATUS REPORT
 * 
 * Generiše detaljnu analizu stanja CMS-a i pružije brze statistike.
 */

const { sanityClient, validateClient } = require('./sanity-client');

/**
 * FUNKCIJE ZA GENERIRANJE STATISTIKA
 */

async function getContentStatistics() {
  const stats = {};

  try {
    // Osnovni sadržaj
    stats.homePage = await sanityClient.fetch('count(*[_type == "homePage"])');
    stats.siteSettings = await sanityClient.fetch('count(*[_type == "siteSettings"])');
    stats.navigation = await sanityClient.fetch('count(*[_type == "navigation"])');

    // Blog sistem
    stats.blogPosts = await sanityClient.fetch('count(*[_type == "blogPost"])');
    stats.blogCategories = await sanityClient.fetch('count(*[_type == "blogCategory"])');
    stats.publishedPosts = await sanityClient.fetch('count(*[_type == "blogPost" && defined(publishedAt)])');

    // FAQ sistem
    stats.faqCategories = await sanityClient.fetch('count(*[_type == "faqCategory"])');
    stats.faqs = await sanityClient.fetch('count(*[_type == "faq"])');
    stats.activeFaqs = await sanityClient.fetch('count(*[_type == "faq" && isActive == true])');

    // Centri i lokacije
    stats.locations = await sanityClient.fetch('count(*[_type == "location"])');
    stats.centers = await sanityClient.fetch('count(*[_type == "center"])');
    stats.educators = await sanityClient.fetch('count(*[_type == "educator"])');

    // Franšiza
    stats.franchisePackages = await sanityClient.fetch('count(*[_type == "franchisePackage"])');
    stats.schools = await sanityClient.fetch('count(*[_type == "school"])');

    // Ostalo
    stats.aboutAuthor = await sanityClient.fetch('count(*[_type == "aboutAuthor"])');
    stats.methodology = await sanityClient.fetch('count(*[_type == "methodology"])');
    stats.testimonials = await sanityClient.fetch('count(*[_type == "testimonial"])');

  } catch (error) {
    console.error('Greška pri dobijanju statistika:', error.message);
  }

  return stats;
}

async function getRecentActivity() {
  try {
    const recentDocuments = await sanityClient.fetch(`*[_updatedAt > $since] | order(_updatedAt desc) [0...10] {
      _type,
      _id,
      _updatedAt,
      title,
      name,
      question
    }`, { 
      since: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() 
    });

    return recentDocuments;
  } catch (error) {
    console.error('Greška pri dobijanju nedavnih aktivnosti:', error.message);
    return [];
  }
}

async function checkContentHealth() {
  const health = {};

  try {
    // HomePage health
    const homePage = await sanityClient.fetch(`*[_type == "homePage"][0] {
      "hasFranchiseModels": defined(franchiseModels.models),
      "hasSuccessStories": defined(successStories.stories),
      "hasSEO": defined(seo.title)
    }`);
    health.homePage = homePage;

    // Blog health
    const blogHealth = await sanityClient.fetch(`{
      "postsWithoutCategories": count(*[_type == "blogPost" && !defined(category)]),
      "postsWithoutSEO": count(*[_type == "blogPost" && !defined(seo.title)]),
      "draftPosts": count(*[_type == "blogPost" && !defined(publishedAt)])
    }`);
    health.blog = blogHealth;

    // FAQ health
    const faqHealth = await sanityClient.fetch(`{
      "faqsWithoutCategories": count(*[_type == "faq" && !defined(category)]),
      "inactiveFaqs": count(*[_type == "faq" && isActive != true])
    }`);
    health.faq = faqHealth;

  } catch (error) {
    console.error('Greška pri proveri zdravlja sadržaja:', error.message);
  }

  return health;
}

async function generateStatusReport() {
  console.log('📊 CMS STATUS REPORT');
  console.log('====================');
  console.log(`🕒 Vreme genereisanja: ${new Date().toLocaleString('sr-RS')}\n`);

  try {
    // Validacija klijenta
    const isClientValid = await validateClient();
    if (!isClientValid) {
      throw new Error('Sanity client nije valjan');
    }

    // Statistike sadržaja
    console.log('📈 STATISTIKE SADRŽAJA');
    console.log('======================');
    
    const stats = await getContentStatistics();
    
    console.log(`🏠 Osnovno:`);
    console.log(`   HomePage: ${stats.homePage || 0}`);
    console.log(`   Site Settings: ${stats.siteSettings || 0}`);
    console.log(`   Navigation: ${stats.navigation || 0}`);
    
    console.log(`\n📝 Blog:`);
    console.log(`   Ukupno postova: ${stats.blogPosts || 0}`);
    console.log(`   Objavljenih: ${stats.publishedPosts || 0}`);
    console.log(`   Kategorija: ${stats.blogCategories || 0}`);
    
    console.log(`\n❓ FAQ:`);
    console.log(`   Ukupno pitanja: ${stats.faqs || 0}`);
    console.log(`   Aktivnih: ${stats.activeFaqs || 0}`);
    console.log(`   Kategorija: ${stats.faqCategories || 0}`);
    
    console.log(`\n🏢 Lokacije:`);
    console.log(`   Lokacije: ${stats.locations || 0}`);
    console.log(`   Centri: ${stats.centers || 0}`);
    console.log(`   Edukatori: ${stats.educators || 0}`);
    
    console.log(`\n💼 Franšiza:`);
    console.log(`   Paketi: ${stats.franchisePackages || 0}`);
    console.log(`   Škole: ${stats.schools || 0}`);

    console.log(`\n👥 Ostalo:`);
    console.log(`   About Author: ${stats.aboutAuthor || 0}`);
    console.log(`   Metodologija: ${stats.methodology || 0}`);
    console.log(`   Testimonials: ${stats.testimonials || 0}`);

    // Provera zdravlja sadržaja
    console.log('\n🏥 ZDRAVLJE SADRŽAJA');
    console.log('===================');
    
    const health = await checkContentHealth();
    
    if (health.homePage) {
      console.log(`🏠 HomePage:`);
      console.log(`   Franchise modeli: ${health.homePage.hasFranchiseModels ? '✅' : '❌'}`);
      console.log(`   Success stories: ${health.homePage.hasSuccessStories ? '✅' : '❌'}`);
      console.log(`   SEO podaci: ${health.homePage.hasSEO ? '✅' : '❌'}`);
    }
    
    if (health.blog) {
      console.log(`\n📝 Blog:`);
      console.log(`   Postovi bez kategorija: ${health.blog.postsWithoutCategories || 0}`);
      console.log(`   Postovi bez SEO: ${health.blog.postsWithoutSEO || 0}`);
      console.log(`   Draft postovi: ${health.blog.draftPosts || 0}`);
    }
    
    if (health.faq) {
      console.log(`\n❓ FAQ:`);
      console.log(`   Pitanja bez kategorija: ${health.faq.faqsWithoutCategories || 0}`);
      console.log(`   Neaktivna pitanja: ${health.faq.inactiveFaqs || 0}`);
    }

    // Nedavne aktivnosti
    console.log('\n🕒 NEDAVNE AKTIVNOSTI (poslednjih 7 dana)');
    console.log('========================================');
    
    const recentActivity = await getRecentActivity();
    
    if (recentActivity.length === 0) {
      console.log('   📭 Nema nedavnih aktivnosti');
    } else {
      recentActivity.forEach(doc => {
        const date = new Date(doc._updatedAt).toLocaleDateString('sr-RS');
        const time = new Date(doc._updatedAt).toLocaleTimeString('sr-RS', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        const title = doc.title || doc.name || doc.question || doc._id;
        console.log(`   📄 ${doc._type}: "${title}" (${date} ${time})`);
      });
    }

    // Preporuke
    console.log('\n💡 PREPORUKE');
    console.log('============');
    
    const recommendations = [];
    
    if (stats.blogPosts === 0) {
      recommendations.push('Dodajte blog postove za SEO i content marketing');
    }
    
    if (health.blog?.draftPosts > 0) {
      recommendations.push(`Objavite ${health.blog.draftPosts} draft blog postova`);
    }
    
    if (health.blog?.postsWithoutSEO > 0) {
      recommendations.push(`Dodajte SEO podatke za ${health.blog.postsWithoutSEO} blog postova`);
    }
    
    if (stats.locations === 0) {
      recommendations.push('Dodajte lokacije/centri za bolju geografsku pokrivenost');
    }
    
    if (stats.testimonials === 0) {
      recommendations.push('Dodajte testimoniale za povećanje kredibilnosti');
    }

    if (recommendations.length === 0) {
      console.log('   🎉 Sve izgleda odlično! Nema hitnih preporuka.');
    } else {
      recommendations.forEach((rec, index) => {
        console.log(`   ${index + 1}. ${rec}`);
      });
    }

    console.log('\n✅ Izveštaj uspešno generisan!');
    console.log('\n📋 KORISNI LINKOVI:');
    console.log('   • Sanity Studio: https://srecno-ucenje.sanity.studio/');
    console.log('   • Frontend: http://localhost:3000');
    console.log('   • Dokumentacija: ./README.md');

  } catch (error) {
    console.error('\n❌ GREŠKA TOKOM GENERISANJA IZVEŠTAJA:', error.message);
    process.exit(1);
  }
}

// Pokretanje samo ako je script pozvan direktno
if (require.main === module) {
  generateStatusReport();
}

module.exports = { generateStatusReport, getContentStatistics, checkContentHealth };