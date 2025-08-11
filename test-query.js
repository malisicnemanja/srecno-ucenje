const { createClient } = require('next-sanity');

const client = createClient({
  projectId: '08ctxj6y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false
});

// Copy the actual query from sanity.queries.ts
const homePageQuery = `
  *[_type == "homePage"][0] {
    _id,
    enhancedHero {
      heroLayout,
      title,
      highlightText,
      titleVariants,
      wordsToUnderline,
      animationSettings,
      subtitle,
      animatedNumber,
      badge,
      primaryCTA,
      secondaryCTA,
      features,
      backgroundType,
      backgroundPattern,
      "image": image.asset->url,
      svgBadge,
      trustBadges
    },
    statistics[] {
      _key,
      value,
      label,
      icon,
      suffix,
      animationDuration
    },
    differentiators {
      sectionTitle,
      items[] {
        _key,
        title,
        description,
        icon,
        highlight
      }
    },
    franchiseSteps {
      sectionTitle,
      steps[] {
        _key,
        number,
        icon,
        title,
        description,
        highlight
      }
    },
    franchiseModels {
      sectionTitle,
      models[] {
        _key,
        name,
        price,
        features,
        highlight,
        ctaText
      }
    },
    successStories {
      sectionTitle,
      featuredVideo,
      stories[] {
        _key,
        name,
        role,
        location,
        story,
        yearStarted,
        metric,
        "image": image.asset->url
      }
    },
    homeFaqs {
      sectionTitle,
      faqs[]->{
        _id,
        question,
        answer,
        category->{
          name
        },
        order
      }
    },
    interactiveClassroom {
      sectionTitle,
      description,
      "previewImage": previewImage.asset->url,
      ctaText
    },
    leadMagnets {
      sectionTitle,
      resources[] {
        _key,
        title,
        description,
        fileUrl,
        icon
      }
    },
    newsletterCTA {
      title,
      description,
      incentive,
      ctaText
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      "ogImage": ogImage.asset->url
    }
  }
`;

async function test() {
  try {
    console.log('Testing homePageQuery...');
    const result = await client.fetch(homePageQuery);
    
    if (!result) {
      console.log('❌ No data returned from query');
      return;
    }
    
    console.log('✅ Query returned data');
    console.log('\nData structure:');
    console.log('- _id:', result._id);
    console.log('- enhancedHero:', result.enhancedHero ? '✅ Present' : '❌ Missing');
    console.log('- statistics:', result.statistics ? `✅ ${result.statistics.length} items` : '❌ Missing');
    console.log('- differentiators:', result.differentiators ? '✅ Present' : '❌ Missing');
    console.log('- franchiseSteps:', result.franchiseSteps ? '✅ Present' : '❌ Missing');
    console.log('- franchiseModels:', result.franchiseModels ? '✅ Present' : '❌ Missing');
    console.log('- successStories:', result.successStories ? '✅ Present' : '❌ Missing');
    console.log('- homeFaqs:', result.homeFaqs ? '✅ Present' : '❌ Missing');
    
    if (result.enhancedHero) {
      console.log('\nEnhancedHero details:');
      console.log('- title:', result.enhancedHero.title || '❌ Missing');
      console.log('- subtitle:', result.enhancedHero.subtitle || '❌ Missing');
    }
    
  } catch (error) {
    console.error('❌ Query error:', error.message);
  }
}

test();