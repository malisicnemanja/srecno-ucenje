// Types for franchise application system

export interface FranchiseFieldValidation {
  minLength?: number
  maxLength?: number
  pattern?: string
  customErrorMessage?: string
}

export interface FranchiseFieldOption {
  label: string
  value: string
}

export interface FranchiseConditionalLogic {
  showIf?: {
    fieldId: string
    operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than'
    value: string
  }
}

export interface FranchiseField {
  _id: string
  label: string
  fieldId: string
  type: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'url' | 'file'
  placeholder?: string
  helpText?: string
  isRequired: boolean
  validation?: FranchiseFieldValidation
  options?: FranchiseFieldOption[]
  order: number
  width: 'full' | 'half' | 'third' | 'quarter'
  conditionalLogic?: FranchiseConditionalLogic
  isActive: boolean
}

export interface FranchiseSectionValidation {
  minRequiredFields?: number
  customValidationMessage?: string
}

export interface FranchiseSection {
  _id: string
  title: string
  subtitle?: string
  description?: string
  sectionId: string
  icon?: 'user' | 'briefcase' | 'target' | 'lightbulb' | 'chart' | 'trophy' | 'location' | 'phone' | 'clipboard' | 'star'
  fields: FranchiseField[]
  order: number
  isRequired: boolean
  progressWeight: number
  helpText?: string
  validationRules?: FranchiseSectionValidation
  isActive: boolean
}

export interface FranchiseStatistic {
  number: string
  label: string
  icon: 'franchise' | 'users' | 'educators' | 'growth' | 'rating' | 'certificates' | 'awards' | 'cities'
  suffix?: string
}

export interface FranchiseTestimonial {
  name: string
  location: string
  quote: string
  image?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  role?: string
  rating: number
}

export interface FranchiseBenefit {
  title: string
  description?: string
  icon: 'education' | 'support' | 'marketing' | 'business' | 'tools' | 'brand' | 'finance' | 'network'
}

export interface FranchiseCTASection {
  title: string
  description?: string
  primaryButton: {
    text: string
    action: 'open_form' | 'scroll_to_form' | 'next_section'
  }
  secondaryButton?: {
    text: string
    link: string
  }
}

export interface FranchiseFAQItem {
  question: string
  answer: string
}

export interface FranchiseFAQSection {
  title: string
  items: FranchiseFAQItem[]
}

export interface FranchiseMotivationalContent {
  _id: string
  title: string
  subtitle?: string
  description?: string
  heroImage?: {
    asset: {
      _id: string
      url: string
      metadata?: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
    alt?: string
  }
  statistics: FranchiseStatistic[]
  testimonials: FranchiseTestimonial[]
  benefits: FranchiseBenefit[]
  ctaSection: FranchiseCTASection
  faqSection: FranchiseFAQSection
  isActive: boolean
}

export interface FranchiseSuccessMessage {
  title: string
  message: string
  nextSteps: string[]
}

export interface FranchiseFormSettings {
  submitButtonText: string
  requiredFieldsNote: string
  privacyNote: string
}

export interface FranchiseSEO {
  title: string
  description: string
  keywords: string[]
}

export interface FranchiseApplication {
  _id: string
  title: string
  subtitle?: string
  description?: string
  slug: {
    current: string
  }
  sections: FranchiseSection[]
  motivationalContent?: FranchiseMotivationalContent
  successMessage: FranchiseSuccessMessage
  formSettings: FranchiseFormSettings
  seo: FranchiseSEO
  isActive: boolean
}

// Form submission types
export interface FranchiseFormData {
  [fieldId: string]: string | string[] | boolean | number
}

export interface FranchiseSubmission {
  sectionId: string
  data: FranchiseFormData
  isComplete: boolean
  lastModified: Date
}

export interface FranchiseApplicationSubmission {
  applicationId: string
  sections: FranchiseSubmission[]
  totalProgress: number
  isSubmitted: boolean
  submittedAt?: Date
  applicantEmail?: string
  applicantName?: string
}

// Validation result types
export interface FieldValidationResult {
  fieldId: string
  isValid: boolean
  error?: string
}

export interface SectionValidationResult {
  sectionId: string
  isValid: boolean
  fieldResults: FieldValidationResult[]
  progress: number
  completedRequiredFields: number
  totalRequiredFields: number
}

export interface ApplicationValidationResult {
  isValid: boolean
  sections: SectionValidationResult[]
  totalProgress: number
  canSubmit: boolean
  errors: string[]
}

// API response types
export interface FranchiseAPIResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface FranchiseSubmissionResponse extends FranchiseAPIResponse {
  submissionId?: string
  nextSteps?: string[]
}

// Form component props
export interface FranchiseFormProps {
  application: FranchiseApplication
  onSectionComplete?: (sectionId: string, data: FranchiseFormData) => void
  onSubmit?: (data: FranchiseApplicationSubmission) => Promise<FranchiseSubmissionResponse>
  initialData?: Partial<FranchiseApplicationSubmission>
  showProgress?: boolean
  allowSaveAndContinue?: boolean
}

export interface FranchiseSectionFormProps {
  section: FranchiseSection
  data?: FranchiseFormData
  onUpdate: (data: FranchiseFormData) => void
  onComplete?: () => void
  validationResult?: SectionValidationResult
}

export interface FranchiseFieldProps {
  field: FranchiseField
  value?: string | string[] | boolean | number
  onChange: (value: string | string[] | boolean | number) => void
  error?: string
  disabled?: boolean
  allFormData?: FranchiseFormData
}