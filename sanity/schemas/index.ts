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
// DEPRECATED: Remove quiz schemas - functionality moved to franchise application
// import quiz from './documents/quiz'
// import quizResult from './documents/quizResult'
import resource from './documents/resource'
import booking from './documents/booking'
import newsletterSubscriber from './documents/newsletterSubscriber'
import notificationBar from './notificationBar'
import navigation from './documents/navigation'
import authorTimeline from './authorTimeline'
import authorAchievements from './authorAchievements'
import publications from './publications'
import trainingProgram from './trainingProgram'
// New comprehensive franchise schemas
import franchiseModelsPage from './documents/franchiseModelsPage'
import franchisePackage from './documents/franchisePackage'
import howToJoinPage from './documents/howToJoinPage'
import franchiseApplicationPage from './documents/franchiseApplicationPage'
import financialCalculatorPage from './documents/financialCalculatorPage'
import school from './documents/school'
import schoolsPage from './documents/schoolsPage'
import enhancedFranchiseField from './documents/enhancedFranchiseField'
import migrationStrategy from './documents/migrationStrategy'

// Modern CMS Architecture
import modernPage from './documents/modernPage'
import modernFranchisePackage from './documents/modernFranchisePackage'
import modernFranchiseLocation from './documents/modernFranchiseLocation'
import modernFranchiseFAQ from './documents/modernFranchiseFAQ'
import modernSiteSettings from './documents/modernSiteSettings'
import modernNavigation from './documents/modernNavigation'

// Legacy schemas (to be migrated)
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

// Object types
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

// Modern CMS Objects
import button from './objects/button'
import modernHero from './objects/modernHero'
import pageSection from './objects/pageSection'
import franchiseProcess from './objects/franchiseProcess'
import modernPricingPlan from './objects/modernPricingPlan'
import modernTestimonial from './objects/modernTestimonial'

export const schemaTypes = [
  // Documents
  siteSettings,
  page,
  blogPost,
  blogCategory,
  author,
  successStory,
  program,
  faq,
  faqCategory,
  testimonial,
  teamMember,
  homePage,
  methodology,
  calculatorSettings,
  calculatorResult,
  // DEPRECATED: Quiz functionality moved to franchise application
  // quiz,
  // quizResult,
  resource,
  booking,
  newsletterSubscriber,
  notificationBar,
  navigation,
  authorTimeline,
  authorAchievements,
  publications,
  trainingProgram,
  // New franchise CMS architecture
  franchiseModelsPage,
  franchisePackage,
  howToJoinPage,
  franchiseApplicationPage,
  financialCalculatorPage,
  school,
  schoolsPage,
  enhancedFranchiseField,
  migrationStrategy,
  
  // Modern CMS Architecture
  modernPage,
  modernFranchisePackage,
  modernFranchiseLocation,
  modernFranchiseFAQ,
  modernSiteSettings,
  modernNavigation,
  
  // Legacy schemas (to be migrated)
  locationData,
  franchiseSteps,
  franchiseApplication,
  franchiseSection,
  franchiseField,
  franchiseMotivational,
  franchiseApplicationSubmission,
  book,
  booksLanding,
  experience,
  aboutAuthor,
  errorPage,
  legalPage,
  bookingPage,
  virtualClassroom,
  // Objects
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
  
  // Modern CMS Objects
  button,
  modernHero,
  pageSection,
  franchiseProcess,
  modernPricingPlan,
  modernTestimonial,
]