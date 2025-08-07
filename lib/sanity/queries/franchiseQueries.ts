import { groq } from 'next-sanity'

// Franchise Models Page Query
export const franchiseModelsPageQuery = groq`
  *[_type == "franchiseModelsPage"][0] {
    title,
    slug,
    hero {
      alternatingTitles,
      subtitle,
      description,
      floatingElements,
      backgroundVideo {
        asset->
      },
      backgroundImage {
        asset->,
        hotspot,
        crop
      }
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
      packages[]-> {
        _id,
        name,
        slug,
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
        highlighted,
        badge,
        ctaButton {
          text,
          link,
          style
        },
        testimonials[]-> {
          name,
          role,
          content,
          image {
            asset->,
            hotspot,
            crop
          }
        },
        active,
        order
      }
    },
    ctaSections[] {
      title,
      description,
      buttonText,
      buttonLink,
      backgroundColor,
      image {
        asset->,
        hotspot,
        crop
      }
    },
    seo {
      title,
      description,
      keywords,
      image {
        asset->
      }
    }
  }
`

// Franchise Packages Query
export const franchisePackagesQuery = groq`
  *[_type == "franchisePackage" && active == true] | order(order asc, price.amount asc) {
    _id,
    name,
    slug,
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
    testimonials[]-> {
      name,
      role,
      content,
      image {
        asset->,
        hotspot,
        crop
      },
      rating
    },
    faq[]-> {
      question,
      answer,
      category->
    },
    active,
    order
  }
`

// How to Join Page Query
export const howToJoinPageQuery = groq`
  *[_type == "howToJoinPage"][0] {
    title,
    slug,
    hero {
      title,
      subtitle,
      description,
      image {
        asset->,
        hotspot,
        crop
      },
      video {
        asset->
      }
    },
    processSteps {
      title,
      steps[] {
        title,
        shortDescription,
        expandedContent,
        icon,
        duration,
        requirements,
        deliverables,
        tips,
        ctaButton {
          text,
          link
        }
      }
    },
    faqSection {
      title,
      faqs[]-> {
        question,
        answer,
        category-> {
          title
        }
      }
    },
    motivationalCtas[] {
      title,
      description,
      statistics[] {
        number,
        label
      },
      buttonText,
      buttonLink,
      backgroundColor,
      image {
        asset->,
        hotspot,
        crop
      }
    },
    successStories {
      title,
      stories[]-> {
        title,
        summary,
        image {
          asset->,
          hotspot,
          crop
        },
        person {
          name,
          role,
          location
        }
      }
    },
    requirements {
      title,
      categories[] {
        category,
        requirements
      }
    },
    seo {
      title,
      description,
      keywords,
      image {
        asset->
      }
    }
  }
`

// Franchise Application Page Query
export const franchiseApplicationPageQuery = groq`
  *[_type == "franchiseApplicationPage" && active == true][0] {
    title,
    slug,
    formSteps[] {
      stepNumber,
      title,
      description,
      fields[]-> {
        _id,
        name,
        label,
        type,
        placeholder,
        helpText,
        tooltip,
        defaultValue,
        options[] {
          label,
          value,
          description,
          icon,
          disabled
        },
        validation {
          required,
          minLength,
          maxLength,
          minValue,
          maxValue,
          pattern,
          customValidation,
          errorMessage,
          acceptedFileTypes,
          maxFileSize
        },
        conditional {
          enabled,
          dependsOn,
          condition,
          value,
          customLogic
        },
        styling {
          width,
          cssClasses,
          inline
        },
        category,
        order,
        active
      },
      validationRules[] {
        fieldName,
        required,
        minLength,
        maxLength,
        pattern,
        customValidation,
        errorMessage
      },
      progressPercentage,
      nextButtonText,
      prevButtonText
    },
    sidebarContent[] {
      stepNumbers,
      title,
      content,
      image {
        asset->,
        hotspot,
        crop
      },
      statistics[] {
        number,
        label,
        icon
      },
      testimonial-> {
        name,
        role,
        content,
        image {
          asset->,
          hotspot,
          crop
        }
      },
      ctaButton {
        text,
        link,
        style
      }
    },
    successPage {
      title,
      message,
      nextSteps[] {
        title,
        description,
        timeline,
        icon
      },
      contactInfo {
        title,
        phone,
        email,
        workingHours
      },
      additionalResources[] {
        title,
        description,
        link,
        type
      }
    },
    formSettings {
      allowSaveDraft,
      sessionTimeout,
      showProgressBar,
      enableAutoSave,
      autoSaveInterval,
      requiredFieldsNote,
      privacyNote,
      submitButtonText,
      loadingText
    },
    seo {
      title,
      description,
      keywords,
      image {
        asset->
      }
    }
  }
`

// Financial Calculator Page Query
export const financialCalculatorPageQuery = groq`
  *[_type == "financialCalculatorPage"][0] {
    title,
    slug,
    hero {
      title,
      subtitle,
      description,
      image {
        asset->,
        hotspot,
        crop
      }
    },
    calculatorParameters {
      inputFields[] {
        name,
        label,
        type,
        placeholder,
        defaultValue,
        min,
        max,
        step,
        options[] {
          label,
          value
        },
        tooltip,
        required,
        order
      },
      calculationLogic {
        initialInvestment,
        monthlyRevenue,
        monthlyExpenses,
        breakEvenPoint,
        yearlyProfit,
        roi
      }
    },
    resultTemplates[] {
      condition,
      title,
      summary,
      metrics[] {
        label,
        value,
        format,
        icon,
        color
      },
      recommendations,
      warnings,
      nextSteps,
      ctaButton {
        text,
        link
      }
    },
    explanatoryContent {
      howItWorks {
        title,
        steps[] {
          title,
          description,
          icon
        }
      },
      assumptions {
        title,
        items[] {
          category,
          assumptions
        }
      },
      disclaimer {
        title,
        content
      },
      faq {
        title,
        faqs[]-> {
          question,
          answer,
          category->
        }
      }
    },
    seo {
      title,
      description,
      keywords,
      image {
        asset->
      }
    }
  }
`

// Schools Page Query
export const schoolsPageQuery = groq`
  *[_type == "schoolsPage"][0] {
    title,
    slug,
    hero {
      title,
      subtitle,
      description,
      searchPlaceholder,
      backgroundImage {
        asset->,
        hotspot,
        crop
      }
    },
    mapSection {
      title,
      subtitle,
      defaultCenter {
        lat,
        lng
      },
      defaultZoom,
      mapStyle
    },
    filterOptions {
      enableCityFilter,
      enableStatusFilter,
      enableProgramFilter,
      enableSpecialtyFilter,
      sortOptions[] {
        label,
        value,
        default
      }
    },
    schoolListSection {
      title,
      viewToggle,
      defaultView,
      itemsPerPage
    },
    ctaSections[] {
      title,
      description,
      buttonText,
      buttonLink,
      backgroundColor,
      position,
      image {
        asset->,
        hotspot,
        crop
      }
    },
    testimonialSection {
      title,
      subtitle,
      testimonials[]-> {
        name,
        role,
        content,
        image {
          asset->,
          hotspot,
          crop
        },
        rating
      },
      displayCount,
      autoPlay,
      interval
    },
    faqSection {
      title,
      faqs[]-> {
        question,
        answer,
        category-> {
          title
        }
      }
    },
    seo {
      title,
      description,
      keywords,
      image {
        asset->
      }
    }
  }
`

// Schools List Query
export const schoolsListQuery = groq`
  *[_type == "school" && status == "active"] | order(order asc, city asc) {
    _id,
    name,
    slug,
    city,
    address,
    coordinates {
      lat,
      lng
    },
    contact {
      phone,
      email,
      website,
      socialMedia
    },
    workingHours[] {
      day,
      openTime,
      closeTime,
      closed
    },
    franchisee {
      name,
      photo {
        asset->,
        hotspot,
        crop
      },
      bio,
      experience,
      education,
      specializations,
      quote
    },
    schoolInfo {
      capacity,
      establishedDate,
      spaceSize,
      numberOfRooms,
      parking,
      accessibility
    },
    programs[]-> {
      title,
      slug,
      description
    },
    specialties,
    images {
      featured {
        asset->,
        hotspot,
        crop
      },
      gallery[] {
        image {
          asset->,
          hotspot,
          crop
        },
        caption,
        category
      }
    },
    successStories[] {
      childName,
      age,
      challenge,
      solution,
      result,
      parentTestimonial,
      duration,
      photo {
        asset->,
        hotspot,
        crop
      }
    },
    testimonials[]-> {
      name,
      role,
      content,
      image {
        asset->,
        hotspot,
        crop
      },
      rating
    },
    pricing {
      programs[] {
        name,
        price,
        currency,
        duration,
        sessions,
        description
      },
      packages[] {
        name,
        originalPrice,
        discountedPrice,
        savings,
        includes,
        validUntil
      }
    },
    status,
    featured,
    order
  }
`

// Individual School Query
export const schoolBySlugQuery = groq`
  *[_type == "school" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    city,
    address,
    coordinates {
      lat,
      lng
    },
    contact {
      phone,
      email,
      website,
      socialMedia {
        facebook,
        instagram,
        youtube
      }
    },
    workingHours[] {
      day,
      openTime,
      closeTime,
      closed
    },
    franchisee {
      name,
      photo {
        asset->,
        hotspot,
        crop
      },
      bio,
      experience,
      education,
      specializations,
      achievements[] {
        title,
        description,
        date
      },
      quote
    },
    schoolInfo {
      capacity,
      establishedDate,
      spaceSize,
      numberOfRooms,
      parking,
      accessibility
    },
    programs[]-> {
      title,
      slug,
      description,
      ageRange,
      duration,
      price
    },
    specialties,
    images {
      featured {
        asset->,
        hotspot,
        crop
      },
      gallery[] {
        image {
          asset->,
          hotspot,
          crop
        },
        caption,
        category
      }
    },
    successStories[] {
      childName,
      age,
      challenge,
      solution,
      result,
      parentTestimonial,
      duration,
      photo {
        asset->,
        hotspot,
        crop
      }
    },
    testimonials[]-> {
      name,
      role,
      content,
      image {
        asset->,
        hotspot,
        crop
      },
      rating,
      date
    },
    pricing {
      programs[] {
        name,
        price,
        currency,
        duration,
        sessions,
        description
      },
      packages[] {
        name,
        originalPrice,
        discountedPrice,
        savings,
        includes,
        validUntil
      }
    },
    status,
    featured,
    seo {
      title,
      description,
      keywords,
      image {
        asset->
      }
    }
  }
`

// Enhanced Franchise Fields Query
export const franchiseFieldsQuery = groq`
  *[_type == "enhancedFranchiseField" && active == true] | order(order asc) {
    _id,
    name,
    slug,
    label,
    type,
    placeholder,
    helpText,
    tooltip,
    defaultValue,
    options[] {
      label,
      value,
      description,
      icon,
      disabled
    },
    validation {
      required,
      minLength,
      maxLength,
      minValue,
      maxValue,
      pattern,
      customValidation,
      errorMessage,
      acceptedFileTypes,
      maxFileSize
    },
    conditional {
      enabled,
      dependsOn,
      condition,
      value,
      customLogic
    },
    styling {
      width,
      cssClasses,
      inline
    },
    category,
    order,
    dataProcessing {
      storageKey,
      encrypt,
      sensitive,
      export,
      transformFunction
    }
  }
`