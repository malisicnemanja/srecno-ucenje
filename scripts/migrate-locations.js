/**
 * Migration script to convert locationData to new location and center schemas
 * Run with: node scripts/migrate-locations.js
 */

const { createClient } = require('@sanity/client')
const slugify = require('slugify')

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN, // Write token required
  apiVersion: '2023-01-01',
  useCdn: false
})

// Helper function to create slug from name
function createSlug(name) {
  return slugify(name, {
    lower: true,
    strict: true,
    locale: 'sr' // Serbian locale
  })
}

// Mapping of existing regions to new region values
const regionMapping = {
  'vojvodina': 'vojvodina',
  'belgrade': 'belgrade',
  'sumadija': 'sumadija',
  'juzna-srbija': 'juzna-srbija'
}

// Status mapping
const statusMapping = {
  'active': 'active',
  'coming-soon': 'coming-soon',
  'planned': 'in-preparation',
  'inactive': 'closed'
}

// Convert locationData to new location schema
function convertLocationData(locationData) {
  const slug = createSlug(locationData.city)
  
  return {
    _type: 'location',
    _id: `location-${slug}`,
    name: locationData.city,
    slug: {
      _type: 'slug',
      current: slug
    },
    region: regionMapping[locationData.region] || 'belgrade',
    coordinates: locationData.coordinates,
    description: locationData.description ? [
      {
        _type: 'block',
        _key: 'description',
        style: 'normal',
        children: [{
          _type: 'span',
          text: locationData.description,
          marks: []
        }]
      }
    ] : [],
    marketAnalysis: {
      marketSize: locationData.marketSize || 'medium',
      demandLevel: locationData.demandLevel || 'medium',
      competition: 'medium', // Default value
      priceMultiplier: locationData.priceMultiplier || 1.0
    },
    contactInfo: {
      phone: locationData.contactInfo?.phone || '',
      email: locationData.contactInfo?.email || '',
      address: locationData.contactInfo?.address || '',
      workingHours: 'Pon-Pet: 9:00-17:00'
    },
    featured: locationData.featured || false,
    isActive: locationData.isActive !== false,
    order: locationData.order || 0
  }
}

// Create centers from locationData
function createCentersFromLocation(locationData, locationId) {
  const centers = []
  const centerCount = locationData.centerCount || 0
  
  if (centerCount === 0) {
    return centers
  }
  
  // Create centers based on centerCount
  for (let i = 1; i <= centerCount; i++) {
    const centerName = centerCount === 1 
      ? `Srećno učenje - ${locationData.city}`
      : `Srećno učenje - ${locationData.city} ${i}`
    
    const shortName = centerCount === 1 
      ? locationData.city
      : `${locationData.city} ${i}`
    
    const slug = createSlug(centerName)
    
    const center = {
      _type: 'center',
      _id: `center-${slug}`,
      name: centerName,
      slug: {
        _type: 'slug',
        current: slug
      },
      shortName: shortName,
      city: {
        _type: 'reference',
        _ref: locationId
      },
      status: statusMapping[locationData.status] || 'active',
      address: {
        street: locationData.contactInfo?.address || `Adresa ${i}`,
        city: locationData.city,
        postalCode: '',
        coordinates: locationData.coordinates
      },
      contact: {
        phone: locationData.contactInfo?.phone || '',
        email: locationData.contactInfo?.email || '',
        workingHours: {
          weekdays: 'Ponedeljak - Petak: 08:00 - 20:00',
          saturday: 'Subota: 09:00 - 15:00',
          sunday: 'Nedelja: Zatvoreno'
        }
      },
      capacity: {
        totalStudents: 50, // Default capacity
        classrooms: Math.ceil(50 / 10), // Default: 10 students per classroom
        ageGroups: ['3-4', '5-6', '7-10'] // Default age groups
      },
      programs: [
        'preschool',
        'school',
        'speed-reading',
        'concentration',
        'workshops'
      ], // Default programs
      description: locationData.description ? [
        {
          _type: 'block',
          _key: 'description',
          style: 'normal',
          children: [{
            _type: 'span',
            text: `${centerName} - ${locationData.description}`,
            marks: []
          }]
        }
      ] : [],
      featured: locationData.featured || false,
      isActive: locationData.isActive !== false,
      order: (locationData.order || 0) * 100 + i // Maintain order, suborder by center
    }
    
    centers.push(center)
  }
  
  return centers
}

async function migrateLocations() {
  try {
    console.log('🚀 Starting location migration...')
    
    // Fetch all locationData documents
    const locationDataDocs = await client.fetch('*[_type == "locationData"] | order(order asc)')
    
    console.log(`Found ${locationDataDocs.length} locationData documents`)
    
    const locations = []
    const centers = []
    
    // Convert each locationData to location and centers
    for (const locationData of locationDataDocs) {
      console.log(`Converting: ${locationData.city}`)
      
      // Create location
      const location = convertLocationData(locationData)
      locations.push(location)
      
      // Create centers for this location
      const locationCenters = createCentersFromLocation(locationData, location._id)
      centers.push(...locationCenters)
      
      console.log(`  - Created 1 location and ${locationCenters.length} centers`)
    }
    
    console.log(`\n📊 Migration Summary:`)
    console.log(`  - Locations to create: ${locations.length}`)
    console.log(`  - Centers to create: ${centers.length}`)
    
    // Create all locations first
    if (locations.length > 0) {
      console.log('\n📍 Creating locations...')
      const locationTransaction = client.transaction()
      
      locations.forEach(location => {
        locationTransaction.createOrReplace(location)
      })
      
      await locationTransaction.commit()
      console.log(`✅ Created ${locations.length} locations`)
    }
    
    // Create all centers
    if (centers.length > 0) {
      console.log('\n🏢 Creating centers...')
      const centerTransaction = client.transaction()
      
      centers.forEach(center => {
        centerTransaction.createOrReplace(center)
      })
      
      await centerTransaction.commit()
      console.log(`✅ Created ${centers.length} centers`)
    }
    
    console.log('\n🎉 Migration completed successfully!')
    console.log('\n📋 Next steps:')
    console.log('  1. Check the new location and center documents in Sanity Studio')
    console.log('  2. Add images and additional content as needed')
    console.log('  3. Create educator documents')
    console.log('  4. Update frontend queries to use new schemas')
    console.log('  5. Test all functionality')
    console.log('  6. Once confirmed working, you can delete old locationData documents')
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateLocations()
}

module.exports = { migrateLocations, convertLocationData, createCentersFromLocation }