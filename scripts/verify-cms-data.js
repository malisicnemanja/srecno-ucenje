/**
 * Verification script to check what data was successfully created in Sanity CMS
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
});

async function verifyCMSData() {
  console.log('🔍 Verifying CMS data...\n');
  
  try {
    // Check locations
    const locations = await client.fetch('*[_type == "location"] | order(order asc)');
    console.log(`📍 Locations: ${locations.length}`);
    locations.forEach(loc => console.log(`  ✅ ${loc.name} (${loc.slug?.current || 'no-slug'})`));
    console.log('');

    // Check centers
    const centers = await client.fetch('*[_type == "center"] | order(order asc)');
    console.log(`🏢 Centers: ${centers.length}`);
    centers.forEach(center => console.log(`  ✅ ${center.name} - ${center.status || 'no-status'}`));
    console.log('');

    // Check educators
    const educators = await client.fetch('*[_type == "educator"] | order(order asc)');
    console.log(`👨‍🏫 Educators: ${educators.length}`);
    educators.forEach(edu => console.log(`  ✅ ${edu.firstName || 'No name'} ${edu.lastName || ''} - ${edu.title || 'No title'}`));
    console.log('');

    // Check blog posts
    const blogPosts = await client.fetch('*[_type == "blogPost"] | order(publishedAt desc)');
    console.log(`📝 Blog Posts: ${blogPosts.length}`);
    blogPosts.forEach(post => console.log(`  ✅ ${post.title || 'Untitled'}`));
    console.log('');

    // Check FAQs
    const faqs = await client.fetch('*[_type == "faq"] | order(order asc)');
    console.log(`❓ FAQ Entries: ${faqs.length}`);
    faqs.forEach(faq => console.log(`  ✅ ${faq.question || 'No question'}`));
    console.log('');

    // Check testimonials
    const testimonials = await client.fetch('*[_type == "testimonial"] | order(order asc)');
    console.log(`💬 Testimonials: ${testimonials.length}`);
    testimonials.forEach(test => console.log(`  ✅ ${test.name || 'No name'} - ${test.role || 'No role'}`));
    console.log('');

    // Check site settings
    const siteSettings = await client.fetch('*[_type == "siteSettings"][0]');
    console.log(`⚙️  Site Settings: ${siteSettings ? '✅ Created' : '❌ Missing'}`);
    if (siteSettings) {
      console.log(`  - Site Name: ${siteSettings.siteName}`);
      console.log(`  - Email: ${siteSettings.email}`);
      console.log(`  - Phone: ${siteSettings.phone}`);
    }
    console.log('');

    // Check navigation
    const navigation = await client.fetch('*[_type == "navigation"][0]');
    console.log(`🧭 Navigation: ${navigation ? '✅ Created' : '❌ Missing'}`);
    if (navigation) {
      console.log(`  - Main menu items: ${navigation.items?.length || 0}`);
    }
    console.log('');

    // Check homepage
    const homePage = await client.fetch('*[_type == "homePage"][0]');
    console.log(`🏠 Homepage: ${homePage ? '✅ Created' : '❌ Missing'}`);
    if (homePage) {
      console.log(`  - Hero title: ${homePage.enhancedHero?.title || 'No title'}`);
      console.log(`  - Statistics: ${homePage.statistics.length}`);
    }
    console.log('');

    console.log('🎉 CMS data verification completed!');
    console.log('\n📊 Summary:');
    console.log(`- Locations: ${locations.length}`);
    console.log(`- Centers: ${centers.length}`);
    console.log(`- Educators: ${educators.length}`);
    console.log(`- Blog Posts: ${blogPosts.length}`);
    console.log(`- FAQs: ${faqs.length}`);
    console.log(`- Testimonials: ${testimonials.length}`);
    console.log(`- Site Settings: ${siteSettings ? 1 : 0}`);
    console.log(`- Navigation: ${navigation ? 1 : 0}`);
    console.log(`- Homepage: ${homePage ? 1 : 0}`);

  } catch (error) {
    console.error('❌ Error verifying CMS data:', error);
  }
}

if (require.main === module) {
  verifyCMSData();
}

module.exports = { verifyCMSData };