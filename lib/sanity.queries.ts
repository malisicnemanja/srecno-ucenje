import { groq } from 'next-sanity'

// Site Settings Query
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    siteName,
    siteSubtitle,
    siteDescription,
    "logo": logo.asset->url,
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

// Navigation Query
export const navigationQuery = groq`
  *[_type == "navigation"][0] {
    _id,
    title,
    mainMenu[]{
      label,
      href,
      subItems[]{
        label,
        href,
        description
      }
    },
    ctaButton {
      text,
      href,
      style
    },
    mobileMenuOrder
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
    homeFAQ {
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
    studentName,
    age,
    program->{
      _id,
      title
    },
    testimonial,
    results[]{
      metric,
      label
    },
    beforeSkills,
    afterSkills,
    video {
      url,
      thumbnail,
      description
    },
    featured,
    publishedAt
  }
`

// About Author Query
export const aboutAuthorQuery = groq`
  *[_type == "aboutAuthor"][0] {
    _id,
    title,
    content,
    coverImage,
    sections[]{
      title,
      content,
      image,
      imagePosition,
      backgroundColor,
      decorativeElement
    },
    achievements[]{
      icon,
      title,
      description,
      year
    },
    timeline[]{
      year,
      event,
      icon
    },
    publications[]{
      type,
      title,
      publisher,
      year,
      coverImage,
      link
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      ogImage
    }
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

// Home Page Query - Updated to match actual schema - Get the complete document
export const homePageQuery = groq`
  *[_type == "homePage" && _id == "homePage"][0] {
    _id,
    enhancedHero {
      title,
      subtitle,
      description,
      buttons[]{
        _key,
        text,
        link,
        variant
      },
      "image": image.asset->url,
      "videoBackground": videoBackground.asset->url
    },
    statistics[]{
      _key,
      value,
      label,
      icon,
      description,
      color
    },
    differentiators {
      sectionTitle,
      items[] {
        _key,
        title,
        description,
        icon
      }
    },
    franchiseSteps {
      sectionTitle,
      steps[] {
        _key,
        number,
        title,
        description,
        icon
      }
    },
    franchiseModels {
      sectionTitle,
      models[] {
        _key,
        name,
        price,
        features[],
        highlighted
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
        metric {
          value,
          label
        },
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
        downloadUrl,
        "previewImage": previewImage.asset->url
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
`

// Franchise Steps Query
export const franchiseStepsQuery = groq`
  *[_type == "franchiseSteps"] | order(order asc) {
    _id,
    title,
    steps[]{
      number,
      title,
      description,
      icon
    }
  }
`

// Calculator Settings Query
export const calculatorSettingsQuery = groq`
  *[_type == "calculatorSettings"][0] {
    _id,
    roiCalculator {
      title,
      description,
      defaultValues {
        numberOfChildren,
        pricePerChild,
        monthlyCosts
      }
    },
    investmentCalculator {
      title,
      description,
      defaultValues {
        initialInvestment,
        monthlyRevenue,
        monthlyCosts
      }
    },
    features[]{
      title,
      description,
      icon
    }
  }
`

// Quiz Query
export const quizQuery = groq`
  *[_type == "quiz"] | order(order asc) {
    _id,
    title,
    description,
    quizType,
    questions[]{
      question,
      answers,
      correctAnswer,
      explanation
    },
    resultCategories[]{
      minScore,
      maxScore,
      title,
      description,
      recommendations[]
    }
  }
`

// Training Program Query
export const trainingProgramQuery = groq`
  *[_type == "trainingProgram"] | order(order asc) {
    _id,
    title,
    subtitle,
    description,
    duration,
    price,
    curriculum[]{
      module,
      topics[],
      duration
    },
    targetAudience[],
    benefits[],
    certification {
      title,
      description,
      image
    },
    testimonials[]->{
      authorName,
      content
    }
  }
`

// Booking Page Query
export const bookingPageQuery = groq`
  *[_type == "bookingPage"][0] {
    _id,
    hero {
      title,
      subtitle,
      description
    },
    consultationTypes[]{
      title,
      description,
      duration,
      price,
      icon
    },
    process[]{
      step,
      title,
      description
    },
    benefits[]{
      title,
      description,
      icon
    },
    faqs[]{
      question,
      answer
    },
    calendlyUrl
  }
`

// Virtual Classroom Query
export const virtualClassroomQuery = groq`
  *[_type == "virtualClassroom"][0] {
    _id,
    title,
    subtitle,
    description,
    features[]{
      icon,
      title,
      description
    },
    tourHighlights[]{
      location,
      description,
      activities[]
    },
    tips[]{
      tip
    },
    tourUrl,
    embedCode,
    ctaTitle,
    ctaDescription,
    ctaButton {
      text,
      link
    },
    seo {
      metaTitle,
      metaDescription,
      keywords,
      ogImage
    }
  }
`

// Franchise Models Page Query
export const franchiseModelsPageQuery = groq`
  *[_type == "franchiseModelsPage"][0] {
    _id,
    title,
    hero {
      alternatingTitles,
      subtitle,
      description,
      floatingElements[] {
        text,
        icon,
        position,
        delay
      },
      backgroundVideo,
      backgroundImage
    },
    statistics {
      title,
      stats[] {
        number,
        label,
        icon,
        suffix,
        animationDuration
      }
    },
    packagesSection {
      title,
      subtitle,
      packages[]->
    },
    ctaSections[] {
      title,
      description,
      buttonText,
      buttonLink,
      backgroundColor,
      image
    },
    seo
  }
`

// Franchise Package Query
export const franchisePackagesQuery = groq`
  *[_type == "franchisePackage" && active == true] | order(order asc) {
    _id,
    name,
    tagline,
    price {
      amount,
      currency,
      period,
      displayText
    },
    features[] {
      text,
      included,
      highlight,
      tooltip
    },
    benefits,
    target,
    investment {
      initial,
      monthly,
      royalty,
      marketingFee
    },
    support {
      training,
      marketing,
      operational
    },
    timeline[] {
      phase,
      duration,
      description
    },
    highlighted,
    badge,
    ctaButton {
      text,
      link,
      style
    },
    testimonials[]->,
    faq[]->,
    order
  }
`