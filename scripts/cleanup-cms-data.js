/**
 * Cleanup script to remove duplicates and problematic data from Sanity CMS
 */

const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
});

async function cleanupCMSData() {
  console.log('🧹 Cleaning up CMS data...\n');
  
  try {
    // Clean up locations - keep only the ones with proper data
    console.log('📍 Cleaning up locations...');
    const allLocations = await client.fetch('*[_type == "location"]');
    const duplicateLocations = [];
    const validLocationIds = [
      'location-beograd',
      'location-novi-sad', 
      'location-nis',
      'location-kragujevac',
      'location-subotica',
      'location-pancevo',
      'location-cacak',
      'location-leskovac',
      'location-valjevo',
      'location-zrenjanin'
    ];

    for (const location of allLocations) {
      if (!validLocationIds.includes(location._id) || !location.name || !location.slug) {
        duplicateLocations.push(location._id);
      }
    }

    for (const id of duplicateLocations) {
      await client.delete(id);
      console.log(`  🗑️  Deleted invalid location: ${id}`);
    }

    // Clean up blog posts - remove duplicates
    console.log('\n📝 Cleaning up blog posts...');
    const blogPosts = await client.fetch('*[_type == "blogPost"]');
    const seenTitles = new Set();
    const duplicatePosts = [];

    for (const post of blogPosts) {
      if (seenTitles.has(post.title) || !post.title || !post.slug) {
        duplicatePosts.push(post._id);
      } else {
        seenTitles.add(post.title);
      }
    }

    for (const id of duplicatePosts) {
      await client.delete(id);
      console.log(`  🗑️  Deleted duplicate/invalid blog post: ${id}`);
    }

    // Clean up testimonials - remove invalid ones
    console.log('\n💬 Cleaning up testimonials...');
    const testimonials = await client.fetch('*[_type == "testimonial"]');
    const invalidTestimonials = [];

    for (const testimonial of testimonials) {
      if (!testimonial.name || testimonial.name === 'No name' || !testimonial.testimonial) {
        invalidTestimonials.push(testimonial._id);
      }
    }

    for (const id of invalidTestimonials) {
      await client.delete(id);
      console.log(`  🗑️  Deleted invalid testimonial: ${id}`);
    }

    // Clean up FAQs - remove duplicates
    console.log('\n❓ Cleaning up FAQ entries...');
    const faqs = await client.fetch('*[_type == "faq"]');
    const seenQuestions = new Set();
    const duplicateFaqs = [];

    for (const faq of faqs) {
      if (seenQuestions.has(faq.question) || !faq.question || !faq.answer) {
        duplicateFaqs.push(faq._id);
      } else {
        seenQuestions.add(faq.question);
      }
    }

    for (const id of duplicateFaqs) {
      await client.delete(id);
      console.log(`  🗑️  Deleted duplicate/invalid FAQ: ${id}`);
    }

    console.log('\n🎉 Cleanup completed!');
    
  } catch (error) {
    console.error('❌ Error cleaning up CMS data:', error);
  }
}

if (require.main === module) {
  cleanupCMSData();
}

module.exports = { cleanupCMSData };