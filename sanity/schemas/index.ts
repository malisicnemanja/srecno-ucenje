// Document types
import siteSettings from './documents/siteSettings'
import page from './documents/page'
import blogPost from './documents/blogPost'
import blogCategory from './documents/blogCategory'
import author from './documents/author'
import successStory from './documents/successStory'
import program from './documents/program'
import faq from './documents/faq'
import faqCategory from './documents/faqCategory'
import testimonial from './documents/testimonial'
import teamMember from './documents/teamMember'
import homePage from './documents/homePage'
import methodology from './documents/methodology'
import calculatorSettings from './documents/calculatorSettings'
import calculatorResult from './documents/calculatorResult'
import resource from './documents/resource'
import booking from './documents/booking'
import newsletterSubscriber from './documents/newsletterSubscriber'
import notificationBar from './notificationBar'
import navigation from './documents/navigation'
import authorTimeline from './authorTimeline'
import authorAchievements from './authorAchievements'
import publications from './publications'
import trainingProgram from './trainingProgram'

// Comprehensive franchise schemas (clean, modern versions)
import franchiseModelsPage from './documents/franchiseModelsPage'
import franchisePackage from './documents/franchisePackage'
import howToJoinPage from './documents/howToJoinPage'
import franchiseApplicationPage from './documents/franchiseApplicationPage'
import financialCalculatorPage from './documents/financialCalculatorPage'
import school from './documents/school'
import schoolsPage from './documents/schoolsPage'
import enhancedFranchiseField from './documents/enhancedFranchiseField'
import migrationStrategy from './documents/migrationStrategy'

// Centers-Locations-Educators System
import location from './documents/location'
import center from './documents/center'
import educator from './documents/educator'

// Modern CMS Architecture (core admin functionality)
import modernPage from './documents/modernPage'
import modernFranchisePackage from './documents/modernFranchisePackage'
import modernFranchiseLocation from './documents/modernFranchiseLocation'
import modernFranchiseFAQ from './documents/modernFranchiseFAQ'
import modernSiteSettings from './documents/modernSiteSettings'
import modernNavigation from './documents/modernNavigation'

// Legacy schemas (preserved for data integrity)
import locationData from './locationData'
import franchiseSteps from './franchiseSteps'
import franchiseApplication from './franchise-application'
import franchiseSection from './franchise-sections'
import franchiseField from './franchise-fields'
import franchiseMotivational from './franchise-motivational'
import franchiseApplicationSubmission from './franchise-application-submission'
import book from './documents/book'
import booksLanding from './documents/booksLanding'
import experience from './documents/experience'
import aboutAuthor from './documents/aboutAuthor'
import errorPage from './documents/errorPages'
import legalPage from './documents/legalPages'
import bookingPage from './documents/bookingPage'
import virtualClassroom from './documents/virtualClassroom'

// Object types (core building blocks)
import hero from './objects/hero'
import cta from './objects/cta'
import feature from './objects/feature'
import statistic from './objects/statistic'
import pricingPlan from './objects/pricingPlan'
import seo from './objects/seo'
import blockContent from './objects/blockContent'
import videoBackground from './objects/videoBackground'
import trustBadge from './objects/trustBadge'
import differentiator from './objects/differentiator'
import franchiseStep from './objects/franchiseStep'
import franchiseModel from './objects/franchiseModel'
import leadMagnet from './objects/leadMagnet'
import enhancedHero from './objects/enhancedHero'
import pageBuilder from './objects/pageBuilder'
import navigationSettings from './objects/navigationSettings'
import validationRules from './objects/validationRules'

// Modern CMS Objects (enhanced UI components)
import button from './objects/button'
import modernHero from './objects/modernHero'
import pageSection from './objects/pageSection'
import franchiseProcess from './objects/franchiseProcess'
import modernPricingPlan from './objects/modernPricingPlan'
import modernTestimonial from './objects/modernTestimonial'

export const schemaTypes = [
  // === CORE DOCUMENTS (Essential for admin operation) ===
  siteSettings,
  homePage,
  navigation,
  notificationBar,
  
  // === LOCATIONS AND CENTERS SYSTEM ===
  // New comprehensive system
  location,
  center,
  educator,
  
  // === FRANCHISE MANAGEMENT (Primary business focus) ===
  // Modern franchise architecture
  franchiseModelsPage,
  franchisePackage,
  howToJoinPage,
  franchiseApplicationPage,
  financialCalculatorPage,
  school,
  schoolsPage,
  enhancedFranchiseField,
  migrationStrategy,
  
  // Modern CMS components
  modernPage,
  modernFranchisePackage,
  modernFranchiseLocation,
  modernFranchiseFAQ,
  modernSiteSettings,
  modernNavigation,
  
  // Legacy franchise (preserved for backward compatibility)
  locationData,
  franchiseSteps,
  franchiseApplication,
  franchiseSection,
  franchiseField,
  franchiseMotivational,
  franchiseApplicationSubmission,
  
  // Financial tools
  calculatorSettings,
  calculatorResult,
  
  // === CONTENT MANAGEMENT ===
  // Pages and navigation
  page,
  
  // Blog system
  blogPost,
  blogCategory,
  
  // Educational content
  methodology,
  program,
  trainingProgram,
  virtualClassroom,
  resource,
  
  // Books and publications
  book,
  booksLanding,
  publications,
  
  // === PEOPLE & TESTIMONIALS ===
  // Author information
  author,
  aboutAuthor,
  authorTimeline,
  authorAchievements,
  
  // Team and testimonials
  teamMember,
  successStory,
  testimonial,
  
  // === CUSTOMER INTERACTION ===
  // Bookings and consultations
  booking,
  bookingPage,
  
  // Support and communication
  faq,
  faqCategory,
  newsletterSubscriber,
  
  // === LOCATIONS & EXPERIENCES ===
  experience,
  
  // === ADMINISTRATIVE PAGES ===
  legalPage,
  errorPage,
  
  // === OBJECT TYPES (Building blocks for all documents) ===
  // Core objects
  hero,
  cta,
  feature,
  statistic,
  pricingPlan,
  seo,
  blockContent,
  videoBackground,
  trustBadge,
  differentiator,
  franchiseStep,
  franchiseModel,
  leadMagnet,
  enhancedHero,
  pageBuilder,
  navigationSettings,
  validationRules,
  
  // Modern objects (enhanced UX)
  button,
  modernHero,
  pageSection,
  franchiseProcess,
  modernPricingPlan,
  modernTestimonial,
]

// Export configuration for easy access
export const schemaConfig = {
  // Core categories for admin organization
  categories: {
    core: ['siteSettings', 'homePage', 'navigation', 'notificationBar'],
    locations: ['location', 'center', 'educator'],
    franchise: ['franchisePackage', 'school', 'franchiseApplication', 'calculatorSettings'],
    content: ['blogPost', 'program', 'resource', 'book'],
    people: ['author', 'teamMember', 'testimonial'],
    customer: ['booking', 'faq', 'newsletterSubscriber'],
    pages: ['page', 'legalPage', 'errorPage'],
  },
  
  // Priority schemas for dashboard
  priority: [
    'franchiseApplicationSubmission', // Most important - incoming applications
    'homePage', // Main website entry
    'siteSettings', // Core configuration
    'location', // Cities/Locations
    'center', // Educational centers
    'educator', // Educators
    'franchisePackage', // Business offerings
    'school', // Legacy locations
    'blogPost', // Content marketing
    'testimonial', // Social proof
  ],
  
  // Hidden from main navigation (technical schemas)
  hidden: [
    'migrationStrategy',
    'validationRules',
    'navigationSettings',
    'enhancedFranchiseField',
  ],
}