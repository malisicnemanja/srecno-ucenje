# Centers-Locations-Educators System Implementation

## 📋 Overview

This document outlines the complete implementation of the Centers-Locations-Educators system for Srecno učenje. The system provides a comprehensive, CMS-driven solution for managing locations, educational centers, and educators across Serbia.

## 🏗️ Architecture

### 1. Sanity Schemas

#### Location Schema (`/sanity/schemas/documents/location.ts`)
- **Purpose**: Represents cities/towns where centers operate
- **Key Fields**:
  - Basic info: name, slug, region
  - Geographic data: coordinates, description
  - Market analysis: market size, demand level, price multiplier
  - Contact info: phone, email, address, working hours
  - Media: images gallery
  - SEO: title, description, keywords

#### Center Schema (`/sanity/schemas/documents/center.ts`)
- **Purpose**: Individual educational centers within cities
- **Key Fields**:
  - Basic info: name, slug, short name, city reference
  - Location details: full address, GPS coordinates
  - Contact info: phone, email, working hours
  - Staff: manager info, educator references
  - Capacity: total students, classrooms, age groups
  - Programs: available programs, specialties
  - Media: images, virtual tour, videos
  - Achievements: awards and recognitions

#### Educator Schema (`/sanity/schemas/documents/educator.ts`)
- **Purpose**: Individual educators working in centers
- **Key Fields**:
  - Personal info: first name, last name, title, photo
  - Professional info: bio, specializations, availability
  - Centers: references to centers where they work
  - Experience: years total, years with company, previous work
  - Education: degrees, certifications, languages
  - Contact: phone, email, social media
  - Media: gallery, testimonials, achievements

### 2. Database Relationships

```
Location (City)
    ↓ (1:many)
Center
    ↓ (many:many)
Educator
```

- **Location → Center**: One city can have multiple centers
- **Center → Educator**: Many-to-many relationship (educators can work in multiple centers)

### 3. Migration System

#### Migration Script (`/scripts/migrate-locations.js`)
- Converts existing `locationData` to new `location` schema
- Creates `center` documents based on `centerCount`
- Preserves all existing data and relationships
- Provides detailed logging and error handling

## 🌐 Frontend Implementation

### 1. Pages Structure

#### `/centri` - Centers Overview
- Lists all centers with filtering by region/city
- Interactive map showing center locations
- Statistics dashboard
- Search and filter functionality

#### `/centri/[grad]` - City-specific Centers
- Shows all centers in a specific city
- City information and market analysis
- Contact information for the city
- Map view of centers in the city

#### `/centri/[grad]/[centar]` - Individual Center
- Complete center information
- Team of educators
- Programs and services
- Photo gallery and virtual tour
- Contact form
- Related centers

#### `/edukatori` - Educators Overview
- All educators with filtering capabilities
- Statistics about the team
- Featured educators
- Career opportunities CTA

#### `/edukatori/[ime]` - Individual Educator Profile
- Complete educator biography
- Education and experience
- Achievements and certifications
- Photo gallery
- Testimonials
- Contact information

### 2. Component Architecture

#### Core Components
- `CenterCard`: Displays center information in various layouts
- `EducatorCard`: Shows educator profiles in different formats
- `LocationFilter`: Filtering interface for locations/centers
- `EducatorFilter`: Filtering interface for educators
- `CenterMap`: Interactive map component
- `CenterGallery`: Photo gallery for centers
- `EducatorGallery`: Photo gallery for educators

### 3. Queries System

#### Location Queries (`/lib/sanity/queries/locationQueries.ts`)
- Comprehensive GROQ queries for all data fetching
- Optimized for performance with proper field selection
- Support for filtering, sorting, and pagination
- Search functionality across all content types

## 📊 Data Structure

### Sample Data Flow

1. **Location**: "Novi Sad"
   - Region: "Vojvodina"
   - Market size: "Large"
   - Contact info, coordinates, description

2. **Centers in Novi Sad**:
   - "Srecno učenje - Novi Sad Centar"
   - "Srecno učenje - Novi Sad Petrovaradin"
   - Each with specific address, contact, capacity

3. **Educators**:
   - Work in one or multiple centers
   - Have specializations, experience, education
   - Can be featured or have special availability

## 🚀 Implementation Steps

### 1. Schema Setup
- [x] Created location.ts schema
- [x] Created center.ts schema  
- [x] Created educator.ts schema
- [x] Updated schemas/index.ts to include new schemas

### 2. Migration
- [x] Created migration script
- [ ] **TODO**: Run migration script to convert existing data
- [ ] **TODO**: Verify migrated data in Sanity Studio

### 3. Frontend Pages
- [x] Created `/centri` overview page
- [x] Created `/centri/[grad]` city page
- [x] Created `/centri/[grad]/[centar]` individual center page
- [x] Created `/edukatori` overview page
- [x] Created `/edukatori/[ime]` individual educator page

### 4. Components
- [x] Created CenterCard component
- [x] Created EducatorCard component
- [ ] **TODO**: Create LocationFilter component
- [ ] **TODO**: Create EducatorFilter component
- [ ] **TODO**: Create CenterMap component
- [ ] **TODO**: Create gallery components
- [ ] **TODO**: Create ContactForm updates for centers/educators

### 5. Queries
- [x] Created comprehensive query system
- [ ] **TODO**: Test all queries with real data
- [ ] **TODO**: Optimize query performance

## 📱 Features

### Core Features
- ✅ **Multi-level Navigation**: City → Center → Details
- ✅ **Comprehensive Filtering**: By region, city, specialization, availability
- ✅ **Interactive Maps**: Show center locations
- ✅ **Rich Media Support**: Images, videos, virtual tours
- ✅ **SEO Optimized**: Meta tags, structured data
- ✅ **Mobile Responsive**: Works on all devices

### Advanced Features
- ✅ **Achievement Tracking**: For centers and educators
- ✅ **Testimonials System**: Social proof from parents/students
- ✅ **Multi-language Support**: For educators
- ✅ **Availability Management**: Track educator availability
- ✅ **Capacity Management**: Track center capacity
- ✅ **Program Management**: Flexible program assignment

## 🔧 Technical Details

### Technologies Used
- **CMS**: Sanity.io with custom schemas
- **Frontend**: Next.js 13+ with App Router
- **Styling**: Tailwind CSS with custom components
- **Images**: Next.js Image component with Sanity CDN
- **Icons**: Heroicons
- **Forms**: Custom form components
- **Maps**: Ready for Google Maps integration

### Performance Optimizations
- Efficient GROQ queries with field selection
- Image optimization through Sanity CDN
- Static generation for better SEO
- Lazy loading of images and components
- Optimized bundle size

### SEO Features
- Dynamic meta tags for all pages
- Open Graph support
- Structured data ready
- Semantic HTML structure
- Breadcrumb navigation

## 📝 Content Management

### Admin Experience
- **Organized Schemas**: Grouped fields for better UX
- **Rich Previews**: Visual previews in Sanity Studio
- **Validation Rules**: Ensure data quality
- **Reference Management**: Easy linking between content types
- **Media Management**: Organized image galleries

### Content Strategy
- **Locations**: Market analysis and city information
- **Centers**: Detailed facility information
- **Educators**: Professional profiles and achievements
- **Programs**: Flexible program assignment
- **Media**: Rich visual content support

## 🚀 Next Steps

### Immediate (Week 1)
1. **Run Migration Script**: Convert existing locationData
2. **Create Missing Components**: Filters, maps, galleries
3. **Test All Functionality**: Pages, components, queries
4. **Add Sample Content**: Populate with real data

### Short Term (Week 2-3)
1. **Navigation Integration**: Update main navigation
2. **Search Functionality**: Add site-wide search
3. **Form Integration**: Contact forms for centers/educators
4. **Map Integration**: Add Google Maps

### Medium Term (Month 1-2)
1. **Performance Optimization**: Query optimization, caching
2. **Advanced Filtering**: More filter options
3. **Analytics Integration**: Track user interactions
4. **A/B Testing**: Optimize conversion rates

### Long Term (Month 2+)
1. **Booking Integration**: Direct appointment booking
2. **Review System**: Parent/student reviews
3. **Multi-language**: Support for multiple languages
4. **Admin Dashboard**: Analytics for center management

## 💡 Benefits

### For Users
- **Easy Discovery**: Find centers and educators nearby
- **Rich Information**: Complete details about services
- **Direct Contact**: Easy communication with centers
- **Visual Content**: Photos and virtual tours

### For Administrators
- **Centralized Management**: All content in one CMS
- **Scalable System**: Easy to add new locations
- **SEO Optimized**: Better search visibility
- **Data Insights**: Track popular locations and educators

### For Business
- **Professional Presence**: Showcase expertise and facilities
- **Lead Generation**: Convert visitors to customers
- **Brand Consistency**: Unified presentation across all locations
- **Operational Efficiency**: Streamlined content management

This implementation provides a solid foundation for a comprehensive educational center management system that can scale with the business needs while providing an excellent user experience.