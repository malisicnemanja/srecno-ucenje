// Queries for franchise application system

// Get complete franchise application with all sections and fields
export const getFranchiseApplication = `
  *[_type == "franchiseApplication" && isActive == true][0] {
    _id,
    title,
    subtitle,
    description,
    slug,
    sections[]-> {
      _id,
      title,
      subtitle,
      description,
      sectionId,
      icon,
      order,
      isRequired,
      progressWeight,
      helpText,
      validationRules,
      fields[]-> {
        _id,
        label,
        fieldId,
        type,
        placeholder,
        helpText,
        isRequired,
        validation,
        options[] {
          label,
          value
        },
        order,
        width,
        conditionalLogic,
        isActive
      } | order(order asc)
    } | order(order asc),
    motivationalContent-> {
      _id,
      title,
      subtitle,
      description,
      heroImage {
        asset-> {
          _id,
          url
        },
        alt
      },
      statistics[] {
        number,
        label,
        icon,
        suffix
      },
      testimonials[] {
        name,
        location,
        quote,
        image {
          asset-> {
            _id,
            url
          },
          alt
        },
        role,
        rating
      },
      benefits[] {
        title,
        description,
        icon
      },
      ctaSection {
        title,
        description,
        primaryButton {
          text,
          action
        },
        secondaryButton {
          text,
          link
        }
      },
      faqSection {
        title,
        items[] {
          question,
          answer
        }
      }
    },
    successMessage {
      title,
      message,
      nextSteps[]
    },
    formSettings {
      submitButtonText,
      requiredFieldsNote,
      privacyNote
    },
    seo {
      title,
      description,
      keywords[]
    }
  }
`

// Get franchise sections only (for step-by-step forms)
export const getFranchiseSections = `
  *[_type == "franchiseSection" && isActive == true] | order(order asc) {
    _id,
    title,
    subtitle,
    description,
    sectionId,
    icon,
    order,
    isRequired,
    progressWeight,
    helpText,
    validationRules,
    fields[]-> {
      _id,
      label,
      fieldId,
      type,
      placeholder,
      helpText,
      isRequired,
      validation,
      options[] {
        label,
        value
      },
      order,
      width,
      conditionalLogic,
      isActive
    } | order(order asc)
  }
`

// Get motivational content only (for marketing landing pages)
export const getFranchiseMotivationalContent = `
  *[_type == "franchiseMotivational" && isActive == true][0] {
    _id,
    title,
    subtitle,
    description,
    heroImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions
        }
      },
      alt
    },
    statistics[] {
      number,
      label,
      icon,
      suffix
    },
    testimonials[] {
      name,
      location,
      quote,
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      role,
      rating
    },
    benefits[] {
      title,
      description,
      icon
    },
    ctaSection {
      title,
      description,
      primaryButton {
        text,
        action
      },
      secondaryButton {
        text,
        link
      }
    },
    faqSection {
      title,
      items[] {
        question,
        answer
      }
    }
  }
`

// Get franchise fields by section ID (for dynamic form generation)
export const getFranchiseFieldsBySection = `
  *[_type == "franchiseSection" && sectionId == $sectionId && isActive == true][0] {
    _id,
    title,
    fields[]-> {
      _id,
      label,
      fieldId,
      type,
      placeholder,
      helpText,
      isRequired,
      validation,
      options[] {
        label,
        value
      },
      order,
      width,
      conditionalLogic,
      isActive
    } | order(order asc)
  }
`

// Get franchise statistics for displays
export const getFranchiseStatistics = `
  *[_type == "franchiseMotivational" && isActive == true][0].statistics[] {
    number,
    label,
    icon,
    suffix
  }
`

// Get franchise testimonials
export const getFranchiseTestimonials = `
  *[_type == "franchiseMotivational" && isActive == true][0].testimonials[] {
    name,
    location,
    quote,
    image {
      asset-> {
        _id,
        url
      },
      alt
    },
    role,
    rating
  }
`

// Get franchise benefits
export const getFranchiseBenefits = `
  *[_type == "franchiseMotivational" && isActive == true][0].benefits[] {
    title,
    description,
    icon
  }
`

// Get franchise FAQ
export const getFranchiseFAQ = `
  *[_type == "franchiseMotivational" && isActive == true][0].faqSection {
    title,
    items[] {
      question,
      answer
    }
  }
`

// Utility query to get field by ID (for form validation)
export const getFranchiseFieldById = `
  *[_type == "franchiseField" && fieldId == $fieldId && isActive == true][0] {
    _id,
    label,
    fieldId,
    type,
    placeholder,
    helpText,
    isRequired,
    validation,
    options[] {
      label,
      value
    },
    width,
    conditionalLogic
  }
`

// Query for admin - get all franchise applications with submission data
export const getAllFranchiseApplications = `
  *[_type == "franchiseApplication"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    isActive,
    _createdAt,
    _updatedAt,
    "sectionsCount": count(sections),
    sections[]-> {
      title,
      "fieldsCount": count(fields)
    }
  }
`