// Validation utilities for franchise forms

import { 
  FranchiseField, 
  FranchiseSection, 
  FranchiseFormData,
  FieldValidationResult,
  SectionValidationResult,
  ApplicationValidationResult,
  FranchiseApplication
} from '../types/franchise'

/**
 * Validate a single field value
 */
export function validateField(field: FranchiseField, value: any, allFormData?: FranchiseFormData): FieldValidationResult {
  const result: FieldValidationResult = {
    fieldId: field.fieldId,
    isValid: true
  }

  // Check if field should be shown based on conditional logic
  if (field.conditionalLogic?.showIf && allFormData) {
    const { fieldId: dependentFieldId, operator, value: expectedValue } = field.conditionalLogic.showIf
    const dependentValue = allFormData[dependentFieldId]
    
    let shouldShow = false
    switch (operator) {
      case 'equals':
        shouldShow = dependentValue === expectedValue
        break
      case 'not_equals':
        shouldShow = dependentValue !== expectedValue
        break
      case 'contains':
        shouldShow = String(dependentValue).includes(expectedValue)
        break
      case 'greater_than':
        shouldShow = Number(dependentValue) > Number(expectedValue)
        break
      case 'less_than':
        shouldShow = Number(dependentValue) < Number(expectedValue)
        break
    }
    
    // If field shouldn't be shown, it's automatically valid
    if (!shouldShow) {
      return result
    }
  }

  // Required field validation
  if (field.isRequired && (!value || value === '' || (Array.isArray(value) && value.length === 0))) {
    result.isValid = false
    result.error = field.validation?.customErrorMessage || `${field.label} je obavezno polje`
    return result
  }

  // Skip other validations if field is empty and not required
  if (!value || value === '') {
    return result
  }

  const stringValue = String(value)

  // Length validations
  if (field.validation?.minLength && stringValue.length < field.validation.minLength) {
    result.isValid = false
    result.error = `${field.label} mora imati najmanje ${field.validation.minLength} karaktera`
    return result
  }

  if (field.validation?.maxLength && stringValue.length > field.validation.maxLength) {
    result.isValid = false
    result.error = `${field.label} ne sme imati više od ${field.validation.maxLength} karaktera`
    return result
  }

  // Type-specific validations
  switch (field.type) {
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(stringValue)) {
        result.isValid = false
        result.error = 'Unesite valjan email format'
      }
      break

    case 'tel':
      const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/
      if (!phoneRegex.test(stringValue)) {
        result.isValid = false
        result.error = 'Unesite valjan broj telefona'
      }
      break

    case 'url':
      try {
        new URL(stringValue)
      } catch {
        result.isValid = false
        result.error = 'Unesite valjan URL'
      }
      break

    case 'number':
      if (isNaN(Number(stringValue))) {
        result.isValid = false
        result.error = 'Unesite valjan broj'
      }
      break
  }

  // Custom pattern validation
  if (field.validation?.pattern && result.isValid) {
    const regex = new RegExp(field.validation.pattern)
    if (!regex.test(stringValue)) {
      result.isValid = false
      result.error = field.validation.customErrorMessage || `${field.label} ne odgovara potrebnom formatu`
    }
  }

  return result
}

/**
 * Validate all fields in a section
 */
export function validateSection(section: FranchiseSection, data: FranchiseFormData): SectionValidationResult {
  const fieldResults: FieldValidationResult[] = []
  let validFields = 0
  let requiredFields = 0
  let completedRequiredFields = 0

  section.fields.forEach(field => {
    const fieldResult = validateField(field, data[field.fieldId], data)
    fieldResults.push(fieldResult)
    
    if (fieldResult.isValid) {
      validFields++
    }
    
    if (field.isRequired) {
      requiredFields++
      if (fieldResult.isValid && data[field.fieldId]) {
        completedRequiredFields++
      }
    }
  })

  // Check section-specific validation rules
  let sectionIsValid = fieldResults.every(r => r.isValid)
  
  if (section.validationRules?.minRequiredFields) {
    const minRequired = section.validationRules.minRequiredFields
    if (completedRequiredFields < minRequired) {
      sectionIsValid = false
    }
  }

  const progress = requiredFields > 0 ? (completedRequiredFields / requiredFields) * 100 : 100

  return {
    sectionId: section.sectionId,
    isValid: sectionIsValid,
    fieldResults,
    progress,
    completedRequiredFields,
    totalRequiredFields: requiredFields
  }
}

/**
 * Validate entire application
 */
export function validateApplication(application: FranchiseApplication, allData: Record<string, FranchiseFormData>): ApplicationValidationResult {
  const sectionResults: SectionValidationResult[] = []
  let totalProgress = 0
  let totalWeight = 0
  const errors: string[] = []

  application.sections.forEach(section => {
    const sectionData = allData[section.sectionId] || {}
    const sectionResult = validateSection(section, sectionData)
    sectionResults.push(sectionResult)
    
    // Calculate weighted progress
    const sectionProgress = sectionResult.progress * (section.progressWeight / 100)
    totalProgress += sectionProgress
    totalWeight += section.progressWeight
    
    // Collect errors
    sectionResult.fieldResults.forEach(fieldResult => {
      if (!fieldResult.isValid && fieldResult.error) {
        errors.push(fieldResult.error)
      }
    })
    
    if (!sectionResult.isValid && section.validationRules?.customValidationMessage) {
      errors.push(section.validationRules.customValidationMessage)
    }
  })

  // Normalize progress to 100
  if (totalWeight > 0) {
    totalProgress = (totalProgress / totalWeight) * 100
  }

  const isValid = sectionResults.every(r => r.isValid)
  const canSubmit = isValid && totalProgress >= 90 // Allow submission at 90% completion

  return {
    isValid,
    sections: sectionResults,
    totalProgress: Math.round(totalProgress),
    canSubmit,
    errors
  }
}

/**
 * Check if a field should be visible based on conditional logic
 */
export function shouldShowField(field: FranchiseField, allFormData: FranchiseFormData): boolean {
  if (!field.conditionalLogic?.showIf) {
    return true
  }

  const { fieldId: dependentFieldId, operator, value: expectedValue } = field.conditionalLogic.showIf
  const dependentValue = allFormData[dependentFieldId]
  
  switch (operator) {
    case 'equals':
      return dependentValue === expectedValue
    case 'not_equals':
      return dependentValue !== expectedValue
    case 'contains':
      return String(dependentValue).includes(expectedValue)
    case 'greater_than':
      return Number(dependentValue) > Number(expectedValue)
    case 'less_than':
      return Number(dependentValue) < Number(expectedValue)
    default:
      return true
  }
}

/**
 * Format field value for display
 */
export function formatFieldValue(field: FranchiseField, value: any): string {
  if (!value && value !== 0) return ''

  switch (field.type) {
    case 'select':
    case 'radio':
      const option = field.options?.find(opt => opt.value === value)
      return option?.label || String(value)
    
    case 'checkbox':
      if (Array.isArray(value)) {
        return value
          .map(v => field.options?.find(opt => opt.value === v)?.label || v)
          .join(', ')
      }
      return String(value)
    
    case 'date':
      try {
        return new Date(value).toLocaleDateString('sr-RS')
      } catch {
        return String(value)
      }
    
    default:
      return String(value)
  }
}

/**
 * Sanitize form data before submission
 */
export function sanitizeFormData(data: FranchiseFormData): FranchiseFormData {
  const sanitized: FranchiseFormData = {}
  
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      // Trim string values
      if (typeof value === 'string') {
        sanitized[key] = value.trim()
      } else {
        sanitized[key] = value
      }
    }
  })
  
  return sanitized
}

/**
 * Calculate section completion percentage
 */
export function calculateSectionCompletion(section: FranchiseSection, data: FranchiseFormData): number {
  const requiredFields = section.fields.filter(f => f.isRequired)
  if (requiredFields.length === 0) return 100

  const completedFields = requiredFields.filter(field => {
    const value = data[field.fieldId]
    return value !== undefined && value !== null && value !== ''
  })

  return Math.round((completedFields.length / requiredFields.length) * 100)
}