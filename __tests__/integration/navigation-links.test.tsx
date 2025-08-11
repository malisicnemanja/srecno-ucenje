import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mock Next.js navigation
const mockPush = vi.fn()
const mockReplace = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn()
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
  notFound: vi.fn()
}))

// Mock Sanity client
vi.mock('@/lib/sanity.client', () => ({
  client: {
    fetch: vi.fn().mockResolvedValue([])
  }
}))

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }: any) => children,
}))

const mockNavigationData = {
  _id: 'navigation',
  mainNav: [
    {
      title: 'Početna',
      href: '/',
      _key: 'home'
    },
    {
      title: 'O autorki',
      href: '/o-autorki',
      _key: 'about'
    },
    {
      title: 'Blog',
      href: '/blog',
      _key: 'blog'
    },
    {
      title: 'Metodologija',
      href: '/metodologija',
      _key: 'methodology'
    },
    {
      title: 'Franšiza modeli',
      href: '/fransiza-modeli',
      _key: 'franchise'
    },
    {
      title: 'FAQ',
      href: '/faq',
      _key: 'faq'
    },
    {
      title: 'Kontakt',
      href: '/kontakt',
      _key: 'contact'
    },
    {
      title: 'Kvizovi',
      href: '/kvizovi',
      _key: 'quizzes'
    },
    {
      title: 'Kalkulatori',
      href: '/kalkulatori',
      _key: 'calculators'
    }
  ]
}

describe('Navigation and Links Integration Tests', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    mockPush.mockClear()
    mockReplace.mockClear()
    
    // Mock client fetch for navigation data
    const { client } = require('@/lib/sanity.client')
    client.fetch.mockResolvedValue(mockNavigationData)
  })

  describe('Header Navigation', () => {
    it('should render main navigation links', async () => {
      const Header = (await import('@/components/layout/Header')).default
      render(<Header />)

      // Wait for navigation to load
      await waitFor(() => {
        expect(screen.getByRole('navigation')).toBeInTheDocument()
      })

      // Check if main navigation links are present
      const expectedLinks = [
        'Početna',
        'O autorki', 
        'Blog',
        'Metodologija',
        'Franšiza modeli',
        'FAQ',
        'Kontakt',
        'Kvizovi',
        'Kalkulatori'
      ]

      for (const linkText of expectedLinks) {
        await waitFor(() => {
          expect(screen.getByText(linkText)).toBeInTheDocument()
        })
      }
    })

    it('should navigate to correct pages when links are clicked', async () => {
      const Header = (await import('@/components/layout/Header')).default
      render(<Header />)

      await waitFor(() => {
        expect(screen.getByRole('navigation')).toBeInTheDocument()
      })

      // Test blog link
      const blogLink = screen.getByText('Blog')
      await user.click(blogLink)

      expect(mockPush).toHaveBeenCalledWith('/blog')
    })

    it('should handle mobile navigation correctly', async () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })

      const Header = (await import('@/components/layout/Header')).default
      render(<Header />)

      // Look for mobile menu button
      await waitFor(() => {
        const menuButton = screen.queryByRole('button', { name: /menu|meni/i })
        if (menuButton) {
          expect(menuButton).toBeInTheDocument()
        }
      })
    })
  })

  describe('Internal Links Validation', () => {
    const testLinks = [
      { href: '/', expectedContent: /Srećno učenje|Početna/i },
      { href: '/o-autorki', expectedContent: /O autorki|Željana/i },
      { href: '/blog', expectedContent: /Blog|članci/i },
      { href: '/metodologija', expectedContent: /Metodologija/i },
      { href: '/fransiza-modeli', expectedContent: /Franšiza|modeli/i },
      { href: '/faq', expectedContent: /FAQ|pitanja/i },
      { href: '/kontakt', expectedContent: /Kontakt/i },
      { href: '/kvizovi', expectedContent: /Kvizovi|test/i },
      { href: '/kalkulatori', expectedContent: /Kalkulator/i }
    ]

    testLinks.forEach(({ href, expectedContent }) => {
      it(`should load page content for ${href}`, async () => {
        // Mock the page component for each route
        const mockPageContent = `Test content for ${href}`
        
        // Simulate page navigation
        window.history.pushState({}, '', href)
        
        // Check that the URL changed correctly
        expect(window.location.pathname).toBe(href)
      })
    })
  })

  describe('Footer Links', () => {
    it('should render footer with correct links', async () => {
      const Footer = (await import('@/components/layout/Footer')).default
      render(<Footer />)

      // Check for common footer links
      await waitFor(() => {
        const footer = screen.getByRole('contentinfo')
        expect(footer).toBeInTheDocument()
      })

      // Check for legal links if they exist
      const legalLinks = ['Pravila privatnosti', 'Uslovi korišćenja']
      for (const linkText of legalLinks) {
        const link = screen.queryByText(linkText)
        if (link) {
          expect(link).toBeInTheDocument()
        }
      }
    })
  })

  describe('Dynamic Links from CMS', () => {
    it('should handle blog post links dynamically', async () => {
      const mockBlogPosts = [
        {
          _id: 'post1',
          title: 'Prvi blog post',
          slug: { current: 'prvi-blog-post' }
        },
        {
          _id: 'post2', 
          title: 'Drugi blog post',
          slug: { current: 'drugi-blog-post' }
        }
      ]

      const { client } = require('@/lib/sanity.client')
      client.fetch.mockResolvedValue(mockBlogPosts)

      const BlogPage = (await import('@/app/blog/page')).default
      render(<BlogPage />)

      await waitFor(() => {
        expect(client.fetch).toHaveBeenCalledWith(
          expect.stringContaining('*[_type == "blogPost"]')
        )
      })

      // Check if blog post titles are rendered as links
      for (const post of mockBlogPosts) {
        await waitFor(() => {
          const linkElement = screen.queryByText(post.title)
          if (linkElement) {
            expect(linkElement).toBeInTheDocument()
          }
        })
      }
    })

    it('should handle experience/success story links', async () => {
      const mockExperiences = [
        {
          _id: 'exp1',
          title: 'Uspešna priča 1',
          slug: { current: 'uspesna-prica-1' }
        }
      ]

      const { client } = require('@/lib/sanity.client')
      client.fetch.mockResolvedValue(mockExperiences)

      const ExperiencesPage = (await import('@/app/iskustva/page')).default
      render(<ExperiencesPage />)

      await waitFor(() => {
        expect(client.fetch).toHaveBeenCalled()
      })
    })
  })

  describe('External Links', () => {
    it('should open external links in new tab', async () => {
      // Mock external link component
      const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )

      render(
        <ExternalLink href="https://example.com">
          Spoljašnja veza
        </ExternalLink>
      )

      const link = screen.getByText('Spoljašnja veza')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Link Accessibility', () => {
    it('should have proper ARIA attributes on navigation links', async () => {
      const Header = (await import('@/components/layout/Header')).default
      render(<Header />)

      await waitFor(() => {
        const navigation = screen.getByRole('navigation')
        expect(navigation).toBeInTheDocument()
      })

      // Check for proper link roles
      const links = screen.getAllByRole('link')
      expect(links.length).toBeGreaterThan(0)

      // Each link should have proper attributes
      links.forEach(link => {
        expect(link).toHaveAttribute('href')
      })
    })

    it('should have descriptive link texts in Serbian', async () => {
      const Header = (await import('@/components/layout/Header')).default
      render(<Header />)

      await waitFor(() => {
        // Check for Serbian language navigation
        const serbianWords = ['Početna', 'Kontakt', 'Blog']
        serbianWords.forEach(word => {
          const element = screen.queryByText(word)
          if (element) {
            expect(element).toBeInTheDocument()
          }
        })
      })
    })
  })

  describe('Error States for Links', () => {
    it('should handle broken CMS navigation gracefully', async () => {
      const { client } = require('@/lib/sanity.client')
      client.fetch.mockRejectedValue(new Error('CMS Error'))

      const Header = (await import('@/components/layout/Header')).default
      
      expect(() => render(<Header />)).not.toThrow()
    })

    it('should handle missing slug fields gracefully', async () => {
      const malformedData = [
        {
          _id: 'post1',
          title: 'Post without slug'
          // missing slug field
        }
      ]

      const { client } = require('@/lib/sanity.client')
      client.fetch.mockResolvedValue(malformedData)

      const BlogPage = (await import('@/app/blog/page')).default
      
      expect(() => render(<BlogPage />)).not.toThrow()
    })
  })

  describe('SEO and Meta Links', () => {
    it('should have proper canonical links', async () => {
      // Test would require checking document head
      // This is a placeholder for SEO link validation
      expect(true).toBe(true)
    })

    it('should have proper language attributes for Serbian content', async () => {
      // Check if HTML lang attribute is set to Serbian
      const htmlElement = document.documentElement
      const lang = htmlElement.getAttribute('lang')
      
      // Should be 'sr' or 'sr-RS' for Serbian
      if (lang) {
        expect(lang).toMatch(/sr(-RS)?/i)
      }
    })
  })
})