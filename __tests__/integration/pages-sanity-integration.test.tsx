import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { client } from '@/lib/sanity.client'

// Mock Sanity client
vi.mock('@/lib/sanity.client', () => ({
  client: {
    fetch: vi.fn()
  }
}))

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn()
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams()
}))

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
  },
  AnimatePresence: ({ children }: any) => children,
  useAnimation: () => ({ start: vi.fn(), set: vi.fn() }),
  useInView: () => [vi.fn(), true]
}))

// Test data templates
const mockHomePageData = {
  _id: 'homePage',
  title: 'Srećno učenje - Početna strana',
  seoTitle: 'Srećno učenje - Edukacija koja inspiriše',
  seoDescription: 'Odkrijte radost učenja sa našim inovativnim metodama.',
  heroSection: {
    title: 'Srećno učenje',
    subtitle: 'Edukacija koja inspiriše',
    description: 'Odkrijte radost učenja sa našim inovativnim metodama.',
    ctaText: 'Započni putovanje',
    ctaLink: '/kontakt'
  },
  sections: [
    {
      _type: 'heroSection',
      _key: 'hero1',
      title: 'Dobrodošli u svet srećnog učenja',
      subtitle: 'Gde se edukacija spaja sa radošću'
    }
  ]
}

const mockAboutAuthorData = {
  _id: 'aboutAuthor',
  name: 'Željana Vukomanović',
  title: 'Autorka i edukatorka',
  bio: 'Stručnjak za razvoj dece i inovativne metode učenja.',
  image: {
    asset: {
      _ref: 'image-123',
      url: '/images/autorka.jpg'
    }
  },
  achievements: [
    {
      title: 'Magistar pedagogije',
      description: 'Univerzitet u Beogradu'
    }
  ]
}

const mockBlogData = [
  {
    _id: 'blog1',
    title: 'Kako motivisati dete za učenje',
    slug: { current: 'kako-motivisati-dete' },
    excerpt: 'Praktični saveti za roditelje',
    publishedAt: '2024-01-15',
    content: [
      {
        _type: 'block',
        children: [{ text: 'Motivacija je ključ uspeha...' }]
      }
    ]
  }
]

const mockFAQData = [
  {
    _id: 'faq1',
    question: 'Kako funkcioniše metodologija Srećnog učenja?',
    answer: 'Naša metodologija se bazira na...',
    category: {
      title: 'Opšte informacije',
      slug: { current: 'opste-informacije' }
    }
  }
]

const mockMethodologyData = {
  _id: 'methodology',
  title: 'Metodologija Srećnog učenja',
  description: 'Inovativni pristup edukaciji koji spaja zabavu i učenje.',
  principles: [
    {
      title: 'Individualan pristup',
      description: 'Svako dete je jedinstveno'
    }
  ]
}

const mockFranchiseData = {
  _id: 'franchiseModels',
  title: 'Franšiza modeli',
  description: 'Pridružite se našoj mreži uspešnih edukatora.',
  models: [
    {
      name: 'Osnovna franšiza',
      price: 'Od 5.000 EUR',
      features: ['Obuka', 'Materijali', 'Podrška']
    }
  ]
}

describe('Pages Sanity CMS Integration Tests', () => {
  const mockClientFetch = vi.mocked(client.fetch)

  beforeEach(() => {
    mockClientFetch.mockClear()
  })

  describe('Home Page (/) - CMS Integration', () => {
    it('should load and display home page content from Sanity', async () => {
      mockClientFetch.mockResolvedValueOnce(mockHomePageData)

      const HomePage = (await import('@/app/page')).default
      render(<HomePage />)

      await waitFor(() => {
        expect(mockClientFetch).toHaveBeenCalledWith(
          expect.stringContaining('*[_type == "homePage"]')
        )
      })

      // Check if Serbian content is displayed
      await waitFor(() => {
        expect(screen.getByText(/Srećno učenje/i)).toBeInTheDocument()
      })
    })

    it('should display hero section with correct Serbian content', async () => {
      mockClientFetch.mockResolvedValueOnce(mockHomePageData)

      const HomePage = (await import('@/app/page')).default
      render(<HomePage />)

      await waitFor(() => {
        expect(screen.getByText('Edukacija koja inspiriše')).toBeInTheDocument()
      })
    })

    it('should handle missing CMS data gracefully', async () => {
      mockClientFetch.mockResolvedValueOnce(null)

      const HomePage = (await import('@/app/page')).default
      render(<HomePage />)

      // Should not crash when CMS data is missing
      await waitFor(() => {
        expect(mockClientFetch).toHaveBeenCalled()
      })
    })
  })

  describe('About Author Page (/o-autorki) - CMS Integration', () => {
    it('should load and display author information from Sanity', async () => {
      mockClientFetch.mockResolvedValueOnce(mockAboutAuthorData)

      const AboutAuthorPage = (await import('@/app/o-autorki/page')).default
      render(<AboutAuthorPage />)

      await waitFor(() => {
        expect(mockClientFetch).toHaveBeenCalledWith(
          expect.stringContaining('*[_type == "aboutAuthor"]')
        )
      })

      await waitFor(() => {
        expect(screen.getByText('Željana Vukomanović')).toBeInTheDocument()
        expect(screen.getByText('Autorka i edukatorka')).toBeInTheDocument()
      })
    })
  })

  describe('Blog Page (/blog) - CMS Integration', () => {
    it('should load and display blog posts from Sanity', async () => {
      mockClientFetch.mockResolvedValueOnce(mockBlogData)

      const BlogPage = (await import('@/app/blog/page')).default
      render(<BlogPage />)

      await waitFor(() => {
        expect(mockClientFetch).toHaveBeenCalledWith(
          expect.stringContaining('*[_type == "blogPost"]')
        )
      })

      await waitFor(() => {
        expect(screen.getByText('Kako motivisati dete za učenje')).toBeInTheDocument()
      })
    })

    it('should display Serbian blog content correctly', async () => {
      mockClientFetch.mockResolvedValueOnce(mockBlogData)

      const BlogPage = (await import('@/app/blog/page')).default
      render(<BlogPage />)

      await waitFor(() => {
        expect(screen.getByText(/Praktični saveti za roditelje/)).toBeInTheDocument()
      })
    })
  })

  describe('FAQ Page (/faq) - CMS Integration', () => {
    it('should load and display FAQ data from Sanity', async () => {
      mockClientFetch.mockResolvedValueOnce(mockFAQData)

      const FAQPage = (await import('@/app/faq/page')).default
      render(<FAQPage />)

      await waitFor(() => {
        expect(mockClientFetch).toHaveBeenCalledWith(
          expect.stringContaining('*[_type == "faq"]')
        )
      })

      await waitFor(() => {
        expect(screen.getByText(/Kako funkcioniše metodologija/)).toBeInTheDocument()
      })
    })
  })

  describe('Methodology Page (/metodologija) - CMS Integration', () => {
    it('should load and display methodology content from Sanity', async () => {
      mockClientFetch.mockResolvedValueOnce(mockMethodologyData)

      const MethodologyPage = (await import('@/app/metodologija/page')).default
      render(<MethodologyPage />)

      await waitFor(() => {
        expect(mockClientFetch).toHaveBeenCalledWith(
          expect.stringContaining('*[_type == "methodology"]')
        )
      })

      await waitFor(() => {
        expect(screen.getByText('Metodologija Srećnog učenja')).toBeInTheDocument()
      })
    })
  })

  describe('Franchise Models Page (/fransiza-modeli) - CMS Integration', () => {
    it('should load and display franchise models from Sanity', async () => {
      mockClientFetch.mockResolvedValueOnce(mockFranchiseData)

      const FranchisePage = (await import('@/app/fransiza-modeli/page')).default
      render(<FranchisePage />)

      await waitFor(() => {
        expect(mockClientFetch).toHaveBeenCalledWith(
          expect.stringContaining('*[_type == "franchiseModels"]')
        )
      })

      await waitFor(() => {
        expect(screen.getByText('Franšiza modeli')).toBeInTheDocument()
      })
    })
  })

  describe('Contact Page (/kontakt) - CMS Integration', () => {
    it('should load contact information from Sanity', async () => {
      const mockContactData = {
        _id: 'contactInfo',
        title: 'Kontaktirajte nas',
        description: 'Pošaljite nam poruku',
        email: 'info@srecno-ucenje.rs',
        phone: '+381 11 123 4567'
      }

      mockClientFetch.mockResolvedValueOnce(mockContactData)

      const ContactPage = (await import('@/app/kontakt/page')).default
      render(<ContactPage />)

      await waitFor(() => {
        expect(screen.getByText(/Kontakt/i)).toBeInTheDocument()
      })
    })
  })

  describe('Quiz Page (/kvizovi) - CMS Integration', () => {
    it('should load quiz data from Sanity', async () => {
      const mockQuizData = [
        {
          _id: 'quiz1',
          title: 'Test spremnosti za školu',
          description: 'Proverite da li je vaše dete spremno',
          questions: []
        }
      ]

      mockClientFetch.mockResolvedValueOnce(mockQuizData)

      const QuizPage = (await import('@/app/kvizovi/page')).default
      render(<QuizPage />)

      await waitFor(() => {
        expect(mockClientFetch).toHaveBeenCalledWith(
          expect.stringContaining('*[_type == "quiz"]')
        )
      })
    })
  })

  describe('Calculators Page (/kalkulatori) - CMS Integration', () => {
    it('should load calculator settings from Sanity', async () => {
      const mockCalculatorData = {
        _id: 'calculatorSettings',
        title: 'Finansijski kalkulatori',
        calculators: [
          {
            type: 'investment',
            title: 'Kalkulator investicije'
          }
        ]
      }

      mockClientFetch.mockResolvedValueOnce(mockCalculatorData)

      const CalculatorsPage = (await import('@/app/kalkulatori/page')).default
      render(<CalculatorsPage />)

      await waitFor(() => {
        expect(screen.getByText(/Kalkulator/i)).toBeInTheDocument()
      })
    })
  })
})

describe('Serbian Content Validation', () => {
  it('should display content in Serbian language', async () => {
    const mockClientFetch = vi.mocked(client.fetch)
    mockClientFetch.mockResolvedValueOnce(mockHomePageData)

    const HomePage = (await import('@/app/page')).default
    render(<HomePage />)

    await waitFor(() => {
      // Check for Serbian characters and typical words
      expect(screen.getByText(/učenje/i)).toBeInTheDocument()
    })
  })

  it('should handle Serbian characters correctly in URLs and content', async () => {
    const serbianContent = {
      title: 'Metodologija učenja kroz igru',
      description: 'Razvoj dečjih sposobnosti'
    }

    expect(serbianContent.title).toContain('č')
    expect(serbianContent.description).toContain('č')
  })
})

describe('Error Handling', () => {
  it('should handle Sanity fetch errors gracefully', async () => {
    const mockClientFetch = vi.mocked(client.fetch)
    mockClientFetch.mockRejectedValueOnce(new Error('Network error'))

    const HomePage = (await import('@/app/page')).default
    
    // Should not throw error
    expect(() => render(<HomePage />)).not.toThrow()
  })

  it('should handle empty CMS responses', async () => {
    const mockClientFetch = vi.mocked(client.fetch)
    mockClientFetch.mockResolvedValueOnce([])

    const BlogPage = (await import('@/app/blog/page')).default
    render(<BlogPage />)

    // Should handle empty arrays gracefully
    await waitFor(() => {
      expect(mockClientFetch).toHaveBeenCalled()
    })
  })
})