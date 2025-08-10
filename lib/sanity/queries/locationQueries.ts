import { groq } from 'next-sanity'

// Base location fields
export const locationFields = groq`
  _id,
  _type,
  name,
  "slug": slug.current,
  region,
  coordinates,
  description,
  marketAnalysis,
  contactInfo,
  images[] {
    asset,
    alt,
    caption
  },
  featured,
  isActive,
  order,
  seo
`

// Base center fields
export const centerFields = groq`
  _id,
  _type,
  name,
  "slug": slug.current,
  shortName,
  city->{
    name,
    "slug": slug.current,
    region
  },
  status,
  address,
  contact,
  manager,
  educators[]->{
    firstName,
    lastName,
    "slug": slug.current,
    title,
    photo,
    shortBio,
    specializations
  },
  capacity,
  programs,
  specialties,
  description,
  images[] {
    asset,
    alt,
    caption,
    category
  },
  virtualTour,
  achievements,
  featured,
  isActive,
  order,
  seo
`

// Base educator fields
export const educatorFields = groq`
  _id,
  _type,
  firstName,
  lastName,
  "slug": slug.current,
  title,
  photo,
  bio,
  shortBio,
  centers[]->{
    name,
    "slug": slug.current,
    shortName,
    city->{
      name,
      "slug": slug.current
    }
  },
  specializations,
  experience,
  education,
  certifications,
  languages,
  contact,
  social,
  gallery[] {
    asset,
    alt,
    caption,
    category
  },
  achievements,
  testimonials,
  featured,
  isActive,
  availability,
  order,
  seo
`

// Get all locations
export const getAllLocationsQuery = groq`
  *[_type == "location" && isActive == true] | order(order asc) {
    ${locationFields}
  }
`

// Get featured locations
export const getFeaturedLocationsQuery = groq`
  *[_type == "location" && isActive == true && featured == true] | order(order asc) {
    ${locationFields}
  }
`

// Get location by slug
export const getLocationBySlugQuery = groq`
  *[_type == "location" && slug.current == $slug && isActive == true][0] {
    ${locationFields},
    "centersCount": count(*[_type == "center" && references(^._id) && isActive == true]),
    "centers": *[_type == "center" && references(^._id) && isActive == true] | order(order asc) {
      ${centerFields}
    }
  }
`

// Get all centers
export const getAllCentersQuery = groq`
  *[_type == "center" && isActive == true] | order(order asc) {
    ${centerFields}
  }
`

// Get centers by city slug
export const getCentersByCityQuery = groq`
  *[_type == "center" && city->slug.current == $citySlug && isActive == true] | order(order asc) {
    ${centerFields}
  }
`

// Get center by slug
export const getCenterBySlugQuery = groq`
  *[_type == "center" && slug.current == $slug && isActive == true][0] {
    ${centerFields},
    videos,
    "relatedCenters": *[_type == "center" && city->slug.current == ^.city->slug.current && slug.current != ^.slug.current && isActive == true] | order(order asc) [0...3] {
      name,
      "slug": slug.current,
      shortName,
      images[0] {
        asset,
        alt
      }
    }
  }
`

// Get featured centers
export const getFeaturedCentersQuery = groq`
  *[_type == "center" && isActive == true && featured == true] | order(order asc) {
    ${centerFields}
  }
`

// Get all educators
export const getAllEducatorsQuery = groq`
  *[_type == "educator" && isActive == true] | order(order asc) {
    ${educatorFields}
  }
`

// Get educator by slug
export const getEducatorBySlugQuery = groq`
  *[_type == "educator" && slug.current == $slug && isActive == true][0] {
    ${educatorFields},
    "relatedEducators": *[_type == "educator" && count((centers[]._ref)[@ in ^.centers[]._ref]) > 0 && slug.current != ^.slug.current && isActive == true] | order(order asc) [0...3] {
      firstName,
      lastName,
      "slug": slug.current,
      title,
      photo,
      shortBio
    }
  }
`

// Get featured educators
export const getFeaturedEducatorsQuery = groq`
  *[_type == "educator" && isActive == true && featured == true] | order(order asc) {
    ${educatorFields}
  }
`

// Get educators by center
export const getEducatorsByCenterQuery = groq`
  *[_type == "educator" && references($centerId) && isActive == true] | order(order asc) {
    ${educatorFields}
  }
`

// Get locations with center counts
export const getLocationsWithCenterCountsQuery = groq`
  *[_type == "location" && isActive == true] | order(order asc) {
    ${locationFields},
    "centerCount": count(*[_type == "center" && references(^._id) && isActive == true]),
    "activeCenterCount": count(*[_type == "center" && references(^._id) && isActive == true && status == "active"]),
    "comingSoonCenterCount": count(*[_type == "center" && references(^._id) && isActive == true && status == "coming-soon"])
  }
`

// Search locations, centers, and educators
export const searchAllQuery = groq`
  {
    "locations": *[_type == "location" && isActive == true && (name match $searchTerm || pt::text(description) match $searchTerm)] | order(order asc) {
      ${locationFields}
    },
    "centers": *[_type == "center" && isActive == true && (name match $searchTerm || shortName match $searchTerm || pt::text(description) match $searchTerm)] | order(order asc) {
      ${centerFields}
    },
    "educators": *[_type == "educator" && isActive == true && (firstName match $searchTerm || lastName match $searchTerm || title match $searchTerm || pt::text(bio) match $searchTerm)] | order(order asc) {
      ${educatorFields}
    }
  }
`

// Get statistics for dashboard
export const getLocationStatsQuery = groq`
  {
    "totalLocations": count(*[_type == "location" && isActive == true]),
    "totalCenters": count(*[_type == "center" && isActive == true]),
    "activeCenters": count(*[_type == "center" && isActive == true && status == "active"]),
    "comingSoonCenters": count(*[_type == "center" && isActive == true && status == "coming-soon"]),
    "totalEducators": count(*[_type == "educator" && isActive == true]),
    "fullTimeEducators": count(*[_type == "educator" && isActive == true && availability == "full-time"]),
    "locationsByRegion": *[_type == "location" && isActive == true] | order(region asc) {
      region,
      "count": count(*[_type == "location" && isActive == true && region == ^.region])
    } | group(region),
    "centersByStatus": *[_type == "center" && isActive == true] | order(status asc) {
      status,
      "count": count(*[_type == "center" && isActive == true && status == ^.status])
    } | group(status)
  }
`