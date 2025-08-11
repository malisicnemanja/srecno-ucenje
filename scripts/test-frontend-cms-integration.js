/**
 * TEST FRONTEND-CMS INTEGRACIJE
 * 
 * Testira da li frontend može da pristupi svim potrebnim podacima iz CMS-a.
 */

const { sanityClient, validateClient } = require('./sanity-client');

/**
 * FUNKCIJE ZA TESTIRANJE FRONTEND INTEGRACIJE
 */

async function testHomePageData() {
  console.log('\n🏠 Testiram HomePage podatke...');
  
  try {
    const homePage = await sanityClient.fetch(`*[_type == "homePage"][0] {
      _id,
      enhancedHero {
        title,
        subtitle,
        description
      },
      statistics[] {
        value,
        label,
        description
      },
      differentiators {
        sectionTitle,
        items[] {
          title,
          description,
          icon
        }
      },
      franchiseSteps {
        sectionTitle,
        steps[] {
          title,
          description,
          stepNumber,
          icon
        }
      },
      franchiseModels {
        sectionTitle,
        models[] {
          name,
          price,
          description,
          features[],
          isPopular,
          cta
        }
      },
      successStories {
        sectionTitle,
        featuredVideo,
        stories[] {
          name,
          role,
          location,
          story,
          yearStarted,
          metric {
            value,
            label
          },
          image {
            alt
          }
        }
      },
      homeFaqs {
        sectionTitle,
        faqs[]-> {
          _id,
          question,
          answer,
          category-> {
            name
          }
        }
      },
      seo {
        title,
        description
      }
    }`);

    if (!homePage) {
      console.log('   ❌ HomePage ne postoji');
      return false;
    }

    console.log('   ✅ HomePage podaci učitani');
    
    // Detaljne provere
    const checks = {
      franchiseModels: homePage.franchiseModels?.models?.length >= 3,
      successStories: homePage.successStories?.stories?.length >= 3,
      homeFaqs: homePage.homeFaqs?.faqs?.length >= 6,
      seo: homePage.seo?.title && homePage.seo?.description
    };

    Object.entries(checks).forEach(([key, passed]) => {
      const status = passed ? '✅' : '❌';
      console.log(`   ${status} ${key}`);
    });

    return Object.values(checks).every(check => check);

  } catch (error) {
    console.error('   ❌ Greška:', error.message);
    return false;
  }
}

async function testBlogData() {
  console.log('\n📝 Testiram Blog podatke...');
  
  try {
    // Test blog listing
    const blogPosts = await sanityClient.fetch(`*[_type == "blogPost"] | order(publishedAt desc) [0...10] {
      _id,
      title,
      slug {
        current
      },
      excerpt,
      publishedAt,
      category-> {
        title,
        slug {
          current
        }
      },
      seo {
        title,
        description
      }
    }`);

    console.log(`   ✅ Blog listing: ${blogPosts.length} postova`);

    if (blogPosts.length === 0) {
      console.log('   ❌ Nema blog postova');
      return false;
    }

    // Test pojedinačnog blog posta
    const singlePost = await sanityClient.fetch(`*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug {
        current
      },
      excerpt,
      content,
      publishedAt,
      category-> {
        title,
        slug {
          current
        }
      },
      seo {
        title,
        description
      }
    }`, { slug: blogPosts[0]?.slug?.current });

    if (singlePost) {
      console.log(`   ✅ Blog post detalj: "${singlePost.title}"`);
    } else {
      console.log('   ❌ Ne mogu da učitam pojedinačni post');
    }

    // Test blog kategorija
    const categories = await sanityClient.fetch(`*[_type == "blogCategory"] {
      _id,
      title,
      slug {
        current
      },
      description
    }`);

    console.log(`   ✅ Blog kategorije: ${categories.length} kategorija`);

    return blogPosts.length > 0 && singlePost && categories.length > 0;

  } catch (error) {
    console.error('   ❌ Greška:', error.message);
    return false;
  }
}

async function testFAQData() {
  console.log('\n❓ Testiram FAQ podatke...');
  
  try {
    // Test FAQ kategorija
    const categories = await sanityClient.fetch(`*[_type == "faqCategory"] | order(order asc) {
      _id,
      name,
      slug {
        current
      },
      description,
      order
    }`);

    console.log(`   ✅ FAQ kategorije: ${categories.length} kategorija`);

    // Test FAQ pitanja
    const faqs = await sanityClient.fetch(`*[_type == "faq" && isActive == true] | order(order asc) {
      _id,
      question,
      answer,
      category-> {
        name,
        slug {
          current
        }
      },
      tags[],
      order
    }`);

    console.log(`   ✅ FAQ pitanja: ${faqs.length} aktivnih pitanja`);

    // Test FAQ po kategorijama
    const faqsByCategory = await sanityClient.fetch(`*[_type == "faqCategory"] | order(order asc) {
      _id,
      name,
      slug {
        current
      },
      "faqs": *[_type == "faq" && references(^._id) && isActive == true] | order(order asc) {
        _id,
        question,
        answer,
        order
      }
    }`);

    let totalCategorizedFAQs = 0;
    faqsByCategory.forEach(category => {
      totalCategorizedFAQs += category.faqs?.length || 0;
    });

    console.log(`   ✅ FAQ po kategorijama: ${totalCategorizedFAQs} pitanja kategorizovano`);

    return categories.length > 0 && faqs.length > 0 && totalCategorizedFAQs > 0;

  } catch (error) {
    console.error('   ❌ Greška:', error.message);
    return false;
  }
}

async function testSiteSettings() {
  console.log('\n⚙️  Testiram Site Settings...');
  
  try {
    const settings = await sanityClient.fetch(`*[_type == "siteSettings"][0] {
      title,
      description,
      keywords[],
      author,
      logo {
        alt
      },
      favicon {
        alt
      },
      socialMedia {
        facebook,
        instagram,
        youtube,
        linkedin
      },
      contactInfo {
        phone,
        email,
        address
      },
      seo {
        title,
        description,
        image {
          alt
        }
      }
    }`);

    if (!settings) {
      console.log('   ❌ Site Settings ne postoje');
      return false;
    }

    console.log('   ✅ Site Settings učitani');
    
    const checks = {
      basicInfo: settings.title && settings.description && settings.author,
      contact: settings.contactInfo?.phone && settings.contactInfo?.email,
      social: settings.socialMedia?.facebook || settings.socialMedia?.instagram,
      seo: settings.seo?.title && settings.seo?.description
    };

    Object.entries(checks).forEach(([key, passed]) => {
      const status = passed ? '✅' : '❌';
      console.log(`   ${status} ${key}`);
    });

    return Object.values(checks).every(check => check);

  } catch (error) {
    console.error('   ❌ Greška:', error.message);
    return false;
  }
}

async function testNavigation() {
  console.log('\n🧭 Testiram Navigation...');
  
  try {
    const navigation = await sanityClient.fetch(`*[_type == "navigation"][0] {
      mainMenu[] {
        title,
        url,
        order,
        children[] {
          title,
          url
        }
      },
      footerMenu[] {
        title,
        links[] {
          title,
          url
        }
      }
    }`);

    if (!navigation) {
      console.log('   ❌ Navigation ne postoji');
      return false;
    }

    console.log('   ✅ Navigation učitana');
    console.log(`   📋 Main menu: ${navigation.mainMenu?.length || 0} stavki`);
    console.log(`   📋 Footer menu: ${navigation.footerMenu?.length || 0} sekcija`);

    const hasMainMenu = navigation.mainMenu?.length > 0;
    const hasFooterMenu = navigation.footerMenu?.length > 0;

    return hasMainMenu && hasFooterMenu;

  } catch (error) {
    console.error('   ❌ Greška:', error.message);
    return false;
  }
}

async function testAboutAuthorAndMethodology() {
  console.log('\n👩‍🏫 Testiram About Author i Metodologiju...');
  
  try {
    // About Author
    const author = await sanityClient.fetch(`*[_type == "aboutAuthor"][0] {
      name,
      title,
      biography,
      experience[],
      education[],
      achievements[],
      image {
        alt
      },
      seo {
        title,
        description
      }
    }`);

    if (author) {
      console.log('   ✅ About Author učitan');
      console.log(`   👤 ${author.name} - ${author.title}`);
    } else {
      console.log('   ❌ About Author ne postoji');
    }

    // Metodologija
    const methodology = await sanityClient.fetch(`*[_type == "methodology"][0] {
      title,
      subtitle,
      introduction,
      principles[] {
        title,
        description,
        icon
      },
      techniques[] {
        name,
        description,
        benefits[]
      },
      results[] {
        metric,
        description
      },
      scientificBasis,
      seo {
        title,
        description
      }
    }`);

    if (methodology) {
      console.log('   ✅ Metodologija učitana');
      console.log(`   🎯 ${methodology.title}`);
      console.log(`   📊 Principi: ${methodology.principles?.length || 0}`);
      console.log(`   🛠️  Tehnike: ${methodology.techniques?.length || 0}`);
      console.log(`   📈 Rezultati: ${methodology.results?.length || 0}`);
    } else {
      console.log('   ❌ Metodologija ne postoji');
    }

    return author && methodology;

  } catch (error) {
    console.error('   ❌ Greška:', error.message);
    return false;
  }
}

async function testAPIPerformance() {
  console.log('\n⚡ Testiram performanse API poziva...');
  
  const tests = [
    {
      name: 'HomePage fetch',
      query: '*[_type == "homePage"][0]'
    },
    {
      name: 'Blog listing',
      query: '*[_type == "blogPost"] | order(publishedAt desc) [0...10]'
    },
    {
      name: 'FAQ listing',
      query: '*[_type == "faq" && isActive == true] | order(order asc)'
    },
    {
      name: 'Site Settings',
      query: '*[_type == "siteSettings"][0]'
    }
  ];

  const results = [];

  for (const test of tests) {
    const startTime = Date.now();
    try {
      await sanityClient.fetch(test.query);
      const endTime = Date.now();
      const duration = endTime - startTime;
      results.push({ name: test.name, duration, success: true });
      console.log(`   ✅ ${test.name}: ${duration}ms`);
    } catch (error) {
      results.push({ name: test.name, duration: null, success: false });
      console.log(`   ❌ ${test.name}: Greška`);
    }
  }

  const avgTime = results
    .filter(r => r.success && r.duration)
    .reduce((sum, r) => sum + r.duration, 0) / results.filter(r => r.success).length;

  console.log(`   📊 Prosečno vreme odgovora: ${avgTime.toFixed(0)}ms`);

  return results.every(r => r.success) && avgTime < 2000;
}

/**
 * GLAVNA FUNKCIJA ZA TESTIRANJE
 */
async function testFrontendIntegration() {
  console.log('🧪 TEST FRONTEND-CMS INTEGRACIJE');
  console.log('=================================');

  try {
    // Validacija klijenta
    const isClientValid = await validateClient();
    if (!isClientValid) {
      throw new Error('Sanity client nije valjan');
    }

    console.log('🔗 Testiranje frontend-CMS integracije...');

    const results = {
      homePage: await testHomePageData(),
      blog: await testBlogData(),
      faq: await testFAQData(),
      siteSettings: await testSiteSettings(),
      navigation: await testNavigation(),
      aboutAndMethodology: await testAboutAuthorAndMethodology(),
      performance: await testAPIPerformance()
    };

    console.log('\n📊 REZULTATI TESTIRANJA');
    console.log('=======================');
    
    const totalTests = Object.keys(results).length;
    const passedTests = Object.values(results).filter(r => r).length;
    
    Object.entries(results).forEach(([test, passed]) => {
      const status = passed ? '✅' : '❌';
      const name = test.charAt(0).toUpperCase() + test.slice(1);
      console.log(`${status} ${name}`);
    });

    console.log(`\n🎯 Uspešnost: ${passedTests}/${totalTests} testova prošlo`);
    
    if (passedTests === totalTests) {
      console.log('\n🎉 SVI TESTOVI USPEŠNI!');
      console.log('Frontend aplikacija može potpuno da komunicira sa CMS-om.');
      
      console.log('\n📝 SLEDEĆI KORACI:');
      console.log('1. Pokretanje frontend aplikacije: npm run dev');
      console.log('2. Testiranje svih stranica u browseru');
      console.log('3. Optimizacija slika i sadržaja');
      console.log('4. SEO provera');
      console.log('5. Production deployment');
    } else {
      console.log('\n⚠️  NEKI TESTOVI NISU USPEŠNI');
      console.log('Proverite greške gore i popravite ih pre production deployment-a.');
    }

    return passedTests === totalTests;

  } catch (error) {
    console.error('\n❌ GREŠKA TOKOM TESTIRANJA:', error.message);
    process.exit(1);
  }
}

// Pokretanje samo ako je script pozvan direktno
if (require.main === module) {
  testFrontendIntegration();
}

module.exports = { testFrontendIntegration };