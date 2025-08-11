/**
 * VALIDACIJA CMS PODATAKA
 * 
 * Ovaj script proverava da li su svi potrebni podaci uspešno unešeni u Sanity CMS.
 */

const { sanityClient, validateClient } = require('./sanity-client');

/**
 * FUNKCIJE ZA VALIDACIJU
 */

async function checkHomePage() {
  console.log('\n🏠 Proveravam HomePage...');
  
  const homePage = await sanityClient.fetch(`*[_type == "homePage"][0] {
    _id,
    franchiseModels,
    successStories,
    homeFaqs {
      sectionTitle,
      faqs[]-> {
        _id,
        question,
        category-> {
          name
        }
      }
    }
  }`);

  if (!homePage) {
    console.log('   ❌ HomePage ne postoji');
    return false;
  }

  console.log('   ✅ HomePage postoji');
  
  // Provera franchise modela
  if (homePage.franchiseModels?.models?.length >= 3) {
    console.log(`   ✅ Franchise modeli: ${homePage.franchiseModels.models.length} modela`);
  } else {
    console.log('   ⚠️  Nedostaju franchise modeli');
  }

  // Provera success stories
  if (homePage.successStories?.stories?.length >= 3) {
    console.log(`   ✅ Success stories: ${homePage.successStories.stories.length} priča`);
  } else {
    console.log('   ⚠️  Nedostaju success stories');
  }

  // Provera FAQ-ova
  if (homePage.homeFaqs?.faqs?.length >= 6) {
    console.log(`   ✅ FAQ-ovi: ${homePage.homeFaqs.faqs.length} pitanja`);
  } else {
    console.log('   ⚠️  Nedostaju FAQ-ovi za homepage');
  }

  return true;
}

async function checkFAQs() {
  console.log('\n❓ Proveravam FAQ sistem...');
  
  // Kategorije
  const categories = await sanityClient.fetch('*[_type == "faqCategory"] | order(order asc)');
  console.log(`   📋 FAQ kategorije: ${categories.length}`);
  
  if (categories.length > 0) {
    categories.forEach(cat => {
      console.log(`      - ${cat.name} (${cat.slug?.current})`);
    });
  }

  // FAQ pitanja
  const faqs = await sanityClient.fetch(`*[_type == "faq"] {
    _id,
    question,
    answer,
    category-> {
      name
    },
    isActive
  }`);

  console.log(`   ❓ FAQ pitanja: ${faqs.length}`);
  
  // Grupisanje po kategorijama
  const faqsByCategory = {};
  faqs.forEach(faq => {
    const catName = faq.category?.name || 'Bez kategorije';
    if (!faqsByCategory[catName]) {
      faqsByCategory[catName] = 0;
    }
    faqsByCategory[catName]++;
  });

  Object.entries(faqsByCategory).forEach(([category, count]) => {
    console.log(`      - ${category}: ${count} pitanja`);
  });

  return faqs.length > 0 && categories.length > 0;
}

async function checkBlog() {
  console.log('\n📝 Proveravam Blog sistem...');
  
  // Blog kategorije
  const categories = await sanityClient.fetch('*[_type == "blogCategory"]');
  console.log(`   📋 Blog kategorije: ${categories.length}`);
  
  if (categories.length > 0) {
    categories.forEach(cat => {
      console.log(`      - ${cat.title} (${cat.slug?.current})`);
    });
  }

  // Blog postovi
  const posts = await sanityClient.fetch(`*[_type == "blogPost"] {
    _id,
    title,
    slug,
    category-> {
      title
    },
    publishedAt
  } | order(publishedAt desc)`);

  console.log(`   📰 Blog postovi: ${posts.length}`);
  
  if (posts.length > 0) {
    posts.slice(0, 5).forEach(post => {
      const category = post.category?.title || 'Bez kategorije';
      console.log(`      - "${post.title}" (${category})`);
    });
    
    if (posts.length > 5) {
      console.log(`      ... i još ${posts.length - 5} postova`);
    }
  }

  return posts.length > 0 && categories.length > 0;
}

async function checkSiteSettings() {
  console.log('\n⚙️  Proveravam Site Settings...');
  
  const settings = await sanityClient.fetch(`*[_type == "siteSettings"][0] {
    title,
    description,
    author,
    contactInfo,
    socialMedia,
    seo
  }`);

  if (!settings) {
    console.log('   ❌ Site Settings ne postoje');
    return false;
  }

  console.log('   ✅ Site Settings postoje');
  console.log(`   📰 Naslov sajta: ${settings.title || 'N/A'}`);
  console.log(`   👤 Autor: ${settings.author || 'N/A'}`);
  console.log(`   📞 Kontakt telefon: ${settings.contactInfo?.phone || 'N/A'}`);
  console.log(`   📧 Kontakt email: ${settings.contactInfo?.email || 'N/A'}`);

  return true;
}

async function checkNavigation() {
  console.log('\n🧭 Proveravam Navigation...');
  
  const navigation = await sanityClient.fetch(`*[_type == "navigation"][0] {
    mainMenu,
    footerMenu
  }`);

  if (!navigation) {
    console.log('   ❌ Navigation ne postoji');
    return false;
  }

  console.log('   ✅ Navigation postoji');
  console.log(`   📋 Main menu stavki: ${navigation.mainMenu?.length || 0}`);
  console.log(`   📋 Footer menu sekcija: ${navigation.footerMenu?.length || 0}`);

  if (navigation.mainMenu?.length > 0) {
    navigation.mainMenu.forEach(item => {
      const childrenCount = item.children?.length || 0;
      console.log(`      - ${item.title} (${item.url})${childrenCount > 0 ? ` + ${childrenCount} podstavki` : ''}`);
    });
  }

  return true;
}

async function checkAboutAuthor() {
  console.log('\n👩‍🏫 Proveravam About Author...');
  
  const author = await sanityClient.fetch(`*[_type == "aboutAuthor"][0] {
    name,
    title,
    biography,
    experience,
    education,
    achievements
  }`);

  if (!author) {
    console.log('   ❌ About Author ne postoji');
    return false;
  }

  console.log('   ✅ About Author postoji');
  console.log(`   👤 Ime: ${author.name || 'N/A'}`);
  console.log(`   💼 Titula: ${author.title || 'N/A'}`);
  console.log(`   📚 Iskustva: ${author.experience?.length || 0} stavki`);
  console.log(`   🎓 Obrazovanje: ${author.education?.length || 0} stavki`);
  console.log(`   🏆 Dostignuća: ${author.achievements?.length || 0} stavki`);

  return true;
}

async function checkMethodology() {
  console.log('\n🎯 Proveravam Metodologija...');
  
  const methodology = await sanityClient.fetch(`*[_type == "methodology"][0] {
    title,
    subtitle,
    introduction,
    principles,
    techniques,
    results
  }`);

  if (!methodology) {
    console.log('   ❌ Metodologija ne postoji');
    return false;
  }

  console.log('   ✅ Metodologija postoji');
  console.log(`   📝 Naslov: ${methodology.title || 'N/A'}`);
  console.log(`   🎯 Principi: ${methodology.principles?.length || 0} stavki`);
  console.log(`   🛠️  Tehnike: ${methodology.techniques?.length || 0} stavki`);
  console.log(`   📊 Rezultati: ${methodology.results?.length || 0} stavki`);

  return true;
}

async function checkContentIntegrity() {
  console.log('\n🔗 Proveravam integritet referenci...');
  
  // Proverava da li FAQ reference u HomePage rade
  const homePageFAQs = await sanityClient.fetch(`*[_type == "homePage"][0] {
    homeFaqs {
      faqs[]-> {
        _id,
        question
      }
    }
  }`);

  if (homePageFAQs?.homeFaqs?.faqs) {
    const validFAQs = homePageFAQs.homeFaqs.faqs.filter(faq => faq._id);
    console.log(`   ✅ HomePage FAQ reference: ${validFAQs.length} validnih referenci`);
  } else {
    console.log('   ⚠️  HomePage FAQ reference nisu postavljene');
  }

  // Proverava blog kategori reference  
  const blogPostsWithCategories = await sanityClient.fetch(`*[_type == "blogPost"] {
    title,
    category-> {
      title
    }
  }`);

  const validBlogRefs = blogPostsWithCategories.filter(post => post.category?.title);
  console.log(`   ✅ Blog kategori reference: ${validBlogRefs.length} validnih referenci`);

  return true;
}

/**
 * GLAVNA FUNKCIJA ZA VALIDACIJU
 */
async function validateCMSData() {
  console.log('🔍 VALIDACIJA CMS PODATAKA');
  console.log('==========================');

  try {
    // Validacija klijenta
    const isClientValid = await validateClient();
    if (!isClientValid) {
      throw new Error('Sanity client nije valjan');
    }

    const results = {
      homePage: await checkHomePage(),
      faqs: await checkFAQs(),
      blog: await checkBlog(),
      siteSettings: await checkSiteSettings(),
      navigation: await checkNavigation(),
      aboutAuthor: await checkAboutAuthor(),
      methodology: await checkMethodology(),
      integrity: await checkContentIntegrity()
    };

    console.log('\n📊 REZIME VALIDACIJE');
    console.log('===================');
    
    const totalChecks = Object.keys(results).length;
    const passedChecks = Object.values(results).filter(r => r).length;
    
    Object.entries(results).forEach(([check, passed]) => {
      const status = passed ? '✅' : '❌';
      const name = check.charAt(0).toUpperCase() + check.slice(1);
      console.log(`${status} ${name}`);
    });

    console.log(`\n🎯 Uspešnost: ${passedChecks}/${totalChecks} provera prošlo`);
    
    if (passedChecks === totalChecks) {
      console.log('\n🎉 SVE JE U REDU! CMS je kompletno popunjen.');
      console.log('\n📝 SLEDEĆI KORACI:');
      console.log('1. Testirajte frontend aplikaciju');
      console.log('2. Dodajte slike za blog postove i success stories');
      console.log('3. Proverite SEO optimizaciju');
      console.log('4. Testirajte forme i funkcionalnosti');
    } else {
      console.log('\n⚠️  POTREBNE SU DODATNE PROVERE');
      console.log('Proverite greške navedene iznad.');
    }

  } catch (error) {
    console.error('\n❌ GREŠKA TOKOM VALIDACIJE:', error.message);
    process.exit(1);
  }
}

// Pokretanje samo ako je script pozvan direktno
if (require.main === module) {
  validateCMSData();
}

module.exports = { validateCMSData };