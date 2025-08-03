import { groq } from 'next-sanity'

// Site Settings Query
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    siteName,
    siteDescription,
    logo,
    email,
    phone,
    address,
    workingHours,
    socialLinks,
    googleMapsApiKey,
    googleAnalyticsId,
    facebookPixelId,
    recaptchaSiteKey,
    defaultSeo,
    navigationSettings,
    colorPalette
  }
`

// Postojeći queries...
export const homePagesQuery = groq`
  *[_type == "homePage"][0] {
    _id,
    enhancedHero,
    statistics,
    differentiators,
    franchiseSteps,
    franchiseModels,
    successStories,
    homeFaqs,
    interactiveClassroom,
    leadMagnets,
    newsletter,
    seo
  }
`

export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    author->{
      name,
      title,
      bio,
      image
    },
    category->{
      title,
      slug
    },
    publishedAt,
    featured,
    readTime
  }
`

export const blogPostQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    author->{
      name,
      title,
      bio,
      image
    },
    category->{
      _id,
      title,
      slug
    },
    content,
    publishedAt,
    readTime,
    seo
  }
`

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    author->{
      name,
      title,
      bio,
      image
    },
    category->{
      title,
      slug
    },
    content,
    publishedAt,
    readTime,
    seo
  }
`

export const relatedPostsQuery = groq`
  *[_type == "blogPost" && category._ref == $category && _id != $currentPostId] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category->{
      title,
      slug
    },
    publishedAt,
    readTime
  }
`

export const featuredBlogPostQuery = groq`
  *[_type == "blogPost" && featured == true] | order(publishedAt desc)[0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    author->{
      name,
      title,
      bio,
      image
    },
    category->{
      title,
      slug
    },
    publishedAt,
    readTime
  }
`

export const blogCategoriesQuery = groq`
  *[_type == "blogCategory"] | order(title asc) {
    _id,
    title,
    slug,
    description
  }
`

export const methodologyQuery = groq`
  *[_type == "methodology"][0] {
    _id,
    hero,
    introduction,
    methods,
    timeline,
    comparison,
    seo
  }
`

export const calculatorSettingsQuery = groq`
  *[_type == "calculatorSettings"][0] {
    _id,
    franchiseModels,
    cities,
    renovationCosts,
    equipmentCosts,
    spaceRequirements
  }
`

export const faqsQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order,
    featured
  }
`


export const duplicateSiteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    siteName,
    siteUrl,
    description,
    logo,
    favicon,
    contactInfo,
    socialMedia,
    seo
  }
`

// Novi queries za author podatke
export const authorTimelineQuery = groq`
  *[_type == "authorTimeline" && isActive == true] | order(order asc) {
    _id,
    year,
    title,
    description,
    order,
    isHighlight,
    color
  }
`

export const authorAchievementsQuery = groq`
  *[_type == "authorAchievements" && isActive == true] | order(order asc) {
    _id,
    number,
    label,
    description,
    icon,
    color,
    order,
    animationDuration
  }
`

export const publicationsQuery = groq`
  *[_type == "publications" && isActive == true] | order(order asc) {
    _id,
    title,
    subtitle,
    year,
    description,
    type,
    coverImage,
    isbn,
    publisher,
    pages,
    targetAudience,
    downloadLink,
    previewLink,
    order,
    featured
  }
`

export const trainingProgramQuery = groq`
  *[_type == "trainingProgram" && isActive == true][0] {
    _id,
    title,
    slug,
    hero,
    programFeatures,
    programStructure,
    trainingModules,
    mentorshipSteps,
    successStories,
    ctaFeatures
  }
`

export const locationDataQuery = groq`
  *[_type == "locationData" && isActive == true] | order(order asc) {
    _id,
    city,
    centerCount,
    status,
    coordinates,
    region,
    description,
    contactInfo,
    demandLevel,
    priceMultiplier,
    marketSize,
    order
  }
`

export const franchiseStepsQuery = groq`
  *[_type == "franchiseSteps" && isActive == true] | order(order asc) {
    _id,
    title,
    description,
    icon,
    color,
    duration,
    order,
    actionButton,
    requirements
  }
`

export const faqCategoriesQuery = groq`
  *[_type == "faqCategory" && isActive == true] | order(order asc) {
    _id,
    name,
    slug,
    description,
    icon,
    color,
    order
  }
`

export const faqsWithCategoriesQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category->{
      _id,
      name,
      slug,
      icon,
      color
    },
    order
  }
`

export const navigationQuery = groq`
  *[_type == "navigation"][0] {
    _id,
    mainMenu[] {
      label,
      href,
      subItems[] {
        label,
        href,
        description
      }
    },
    ctaButton {
      text,
      href,
      style
    }
  }
`

// Programs Query
export const programsQuery = groq`
  *[_type == "program"] | order(order asc) {
    _id,
    title,
    description,
    icon,
    color,
    duration,
    ageGroup,
    features[]
  }
`

// Success Stories Query
export const successStoriesQuery = groq`
  *[_type == "successStory"] | order(publishedAt desc) {
    _id,
    title,
    excerpt,
    content,
    studentName,
    studentAge,
    location,
    achievement,
    beforeAfterData,
    testimonial,
    image,
    publishedAt
  }
`

// Testimonials Query
export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(createdAt desc) {
    _id,
    authorName,
    authorRole,
    content,
    rating,
    location,
    image,
    featured,
    createdAt
  }
`