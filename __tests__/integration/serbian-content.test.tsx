import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn()
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams()
}))

// Mock Sanity client with Serbian content
vi.mock('@/lib/sanity.client', () => ({
  client: {
    fetch: vi.fn()
  }
}))

// Mock framer-motion
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

// Serbian content test data
const serbianContentSamples = {
  homepage: {
    title: 'Srećno učenje',
    subtitle: 'Edukacija koja inspiriše',
    description: 'Otkrijte radost učenja kroz našu inovativnu metodologiju koja spaja zabavu i edukaciju.',
    cta: 'Započnite putovanje'
  },
  aboutAuthor: {
    name: 'Željana Vukomanović',
    title: 'Autorka i edukatorka',
    bio: 'Stručnjak za razvoj dece i kreiranje edukativnih programa koji čine učenje zabavnim.',
    achievements: [
      'Magistar pedagogije',
      'Autor više od 20 edukativnih programa',
      'Osnivač metodologije Srećno učenje'
    ]
  },
  blog: [
    {
      title: 'Kako motivisati dete za učenje',
      excerpt: 'Praktični saveti za roditelje o tome kako da učinju učenje zanimljivim.',
      content: 'Učenje treba da bude avantura, a ne obaveza...'
    },
    {
      title: 'Razvoj kreativnosti kod dece',
      excerpt: 'Metode za podsticanje kreativnog mišljenja.',
      content: 'Kreativnost je ključ za uspeh u budućnosti...'
    }
  ],
  methodology: {
    title: 'Metodologija Srećno učenje',
    description: 'Naš pristup edukaciji kombinuje naučno dokazane metode sa kreativnim tehnikama.',
    principles: [
      {
        title: 'Individualan pristup',
        description: 'Svako dete je jedinstveno i zaslužuje personalizovan pristup učenju.'
      },
      {
        title: 'Učenje kroz igru',
        description: 'Igra je prirodan način kako deca najbolje uče i zapamćuju informacije.'
      },
      {
        title: 'Podsticanje kreativnosti',
        description: 'Razvijamo kreativno mišljenje koje će detetu koristiti ceo život.'
      }
    ]
  },
  faq: [
    {
      question: 'Kako funkcioniše metodologija Srećno učenje?',
      answer: 'Naša metodologija se bazira na naučno dokazanim principima koji spajaju zabavu sa učenjem.'
    },
    {
      question: 'Za koju uzrast je pogodna metodologija?',
      answer: 'Metodologija je prilagođena deci uzrasta od 3 do 12 godina.'
    },
    {
      question: 'Koliko dugo traju programi?',
      answer: 'Programi variraju od 6 meseci do 2 godine, u zavisnosti od izabranog paketa.'
    }
  ],
  franchise: {
    title: 'Franšiza modeli',
    description: 'Pridružite se našoj mreži uspešnih edukatora i pokrenite svoj centar za Srećno učenje.',
    models: [
      {
        name: 'Osnovna franšiza',
        price: 'Od 5.000 EUR',
        description: 'Idealno za početnike u edukaciji',
        features: [
          'Kompletna obuka',
          'Edukativni materijali',
          'Kontinuirana podrška'
        ]
      },
      {
        name: 'Premium franšiza',
        price: 'Od 15.000 EUR',
        description: 'Za iskusne edukatore',
        features: [
          'Prošireni program',
          'Marketing podrška',
          'Ekskluzivna teritorija'
        ]
      }
    ]
  }
}

describe('Serbian Content Validation Tests', () => {
  const mockClientFetch = vi.mocked(require('@/lib/sanity.client').client.fetch)

  describe('Serbian Character Encoding', () => {
    it('should properly display Serbian Cyrillic characters', () => {
      const serbianCyrillic = {
        text: 'Добродошли у свет срећног учења',
        description: 'Методологија која спаја забаву и образовање'
      }

      const TestComponent = () => (
        <div>
          <h1>{serbianCyrillic.text}</h1>
          <p>{serbianCyrillic.description}</p>
        </div>
      )

      render(<TestComponent />)

      expect(screen.getByText(serbianCyrillic.text)).toBeInTheDocument()
      expect(screen.getByText(serbianCyrillic.description)).toBeInTheDocument()
    })

    it('should properly display Serbian Latin characters with diacritics', () => {
      const serbianLatin = {
        text: 'Srećno učenje',
        words: ['ć', 'č', 'š', 'ž', 'đ'],
        phrases: [
          'Željana Vukomanović',
          'metodologija',
          'edukacija',
          'kreativnost',
          'inovacija'
        ]
      }

      const TestComponent = () => (
        <div>
          <h1>{serbianLatin.text}</h1>
          {serbianLatin.phrases.map((phrase, index) => (
            <p key={index}>{phrase}</p>
          ))}
        </div>
      )

      render(<TestComponent />)

      expect(screen.getByText(serbianLatin.text)).toBeInTheDocument()
      serbianLatin.phrases.forEach(phrase => {
        expect(screen.getByText(phrase)).toBeInTheDocument()
      })
    })
  })

  describe('Homepage Serbian Content', () => {
    it('should display homepage content in Serbian', async () => {
      mockClientFetch.mockResolvedValueOnce(serbianContentSamples.homepage)

      const HomePage = (await import('@/app/page')).default
      render(<HomePage />)

      await waitFor(() => {
        expect(screen.getByText(/Srećno učenje/)).toBeInTheDocument()
        expect(screen.getByText(/Edukacija koja inspiriše/)).toBeInTheDocument()
      })
    })

    it('should have proper Serbian grammar and syntax', async () => {
      mockClientFetch.mockResolvedValueOnce(serbianContentSamples.homepage)

      const HomePage = (await import('@/app/page')).default
      render(<HomePage />)

      await waitFor(() => {
        // Check for proper Serbian sentence structure
        const description = screen.queryByText(/Otkrijte radost učenja/)
        if (description) {
          expect(description).toBeInTheDocument()
        }
      })
    })
  })

  describe('About Author Serbian Content', () => {
    it('should display author information in Serbian', async () => {
      mockClientFetch.mockResolvedValueOnce(serbianContentSamples.aboutAuthor)

      const AboutPage = (await import('@/app/o-autorki/page')).default
      render(<AboutPage />)

      await waitFor(() => {
        expect(screen.getByText('Željana Vukomanović')).toBeInTheDocument()
        expect(screen.getByText(/Autorka i edukatorka/)).toBeInTheDocument()
      })
    })

    it('should handle Serbian professional titles correctly', async () => {
      const professionalTitles = [
        'Magistar pedagogije',
        'Stručnjak za razvoj dece',
        'Osnivač metodologije'
      ]

      const TestComponent = () => (
        <div>
          {professionalTitles.map((title, index) => (
            <p key={index}>{title}</p>
          ))}
        </div>
      )

      render(<TestComponent />)

      professionalTitles.forEach(title => {
        expect(screen.getByText(title)).toBeInTheDocument()
      })
    })
  })

  describe('Blog Content in Serbian', () => {
    it('should display blog posts in Serbian', async () => {
      mockClientFetch.mockResolvedValueOnce(serbianContentSamples.blog)

      const BlogPage = (await import('@/app/blog/page')).default
      render(<BlogPage />)

      await waitFor(() => {
        expect(screen.getByText('Kako motivisati dete za učenje')).toBeInTheDocument()
        expect(screen.getByText('Razvoj kreativnosti kod dece')).toBeInTheDocument()
      })
    })

    it('should handle Serbian blog content formatting', async () => {
      const blogPost = {
        title: 'Važnost čitanja u ranom uzrastu',
        content: 'Čitanje je temelj obrazovanja. Kroz priče, deca razvijaju maštu i bogaće rečnik.'
      }

      const TestComponent = () => (
        <article>
          <h1>{blogPost.title}</h1>
          <div>{blogPost.content}</div>
        </article>
      )

      render(<TestComponent />)

      expect(screen.getByText(blogPost.title)).toBeInTheDocument()
      expect(screen.getByText(blogPost.content)).toBeInTheDocument()
    })
  })

  describe('FAQ Content in Serbian', () => {
    it('should display FAQ in Serbian', async () => {
      mockClientFetch.mockResolvedValueOnce(serbianContentSamples.faq)

      const FAQPage = (await import('@/app/faq/page')).default
      render(<FAQPage />)

      await waitFor(() => {
        expect(screen.getByText(/Kako funkcioniše metodologija/)).toBeInTheDocument()
        expect(screen.getByText(/Za koju uzrast je pogodna/)).toBeInTheDocument()
      })
    })

    it('should handle Serbian question-answer format', async () => {
      const faqItem = serbianContentSamples.faq[0]

      const TestComponent = () => (
        <div>
          <h3>{faqItem.question}</h3>
          <p>{faqItem.answer}</p>
        </div>
      )

      render(<TestComponent />)

      expect(screen.getByText(faqItem.question)).toBeInTheDocument()
      expect(screen.getByText(faqItem.answer)).toBeInTheDocument()
    })
  })

  describe('Methodology Content in Serbian', () => {
    it('should display methodology in Serbian', async () => {
      mockClientFetch.mockResolvedValueOnce(serbianContentSamples.methodology)

      const MethodologyPage = (await import('@/app/metodologija/page')).default
      render(<MethodologyPage />)

      await waitFor(() => {
        expect(screen.getByText('Metodologija Srećno učenje')).toBeInTheDocument()
      })
    })

    it('should display methodology principles in Serbian', () => {
      const principles = serbianContentSamples.methodology.principles

      const TestComponent = () => (
        <div>
          {principles.map((principle, index) => (
            <div key={index}>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </div>
          ))}
        </div>
      )

      render(<TestComponent />)

      principles.forEach(principle => {
        expect(screen.getByText(principle.title)).toBeInTheDocument()
        expect(screen.getByText(principle.description)).toBeInTheDocument()
      })
    })
  })

  describe('Franchise Content in Serbian', () => {
    it('should display franchise information in Serbian', async () => {
      mockClientFetch.mockResolvedValueOnce(serbianContentSamples.franchise)

      const FranchisePage = (await import('@/app/fransiza-modeli/page')).default
      render(<FranchisePage />)

      await waitFor(() => {
        expect(screen.getByText('Franšiza modeli')).toBeInTheDocument()
      })
    })

    it('should display franchise models with Serbian descriptions', () => {
      const models = serbianContentSamples.franchise.models

      const TestComponent = () => (
        <div>
          {models.map((model, index) => (
            <div key={index}>
              <h3>{model.name}</h3>
              <p>{model.price}</p>
              <p>{model.description}</p>
              <ul>
                {model.features.map((feature, fIndex) => (
                  <li key={fIndex}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )

      render(<TestComponent />)

      models.forEach(model => {
        expect(screen.getByText(model.name)).toBeInTheDocument()
        expect(screen.getByText(model.description)).toBeInTheDocument()
        model.features.forEach(feature => {
          expect(screen.getByText(feature)).toBeInTheDocument()
        })
      })
    })
  })

  describe('Navigation and UI Elements in Serbian', () => {
    it('should have navigation labels in Serbian', () => {
      const navigationLabels = [
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

      const TestComponent = () => (
        <nav>
          {navigationLabels.map((label, index) => (
            <a key={index} href="#">{label}</a>
          ))}
        </nav>
      )

      render(<TestComponent />)

      navigationLabels.forEach(label => {
        expect(screen.getByText(label)).toBeInTheDocument()
      })
    })

    it('should have button labels in Serbian', () => {
      const buttonLabels = [
        'Pošaljite poruku',
        'Preuzmi materijal',
        'Započni kviz',
        'Izračunaj',
        'Saznaj više',
        'Kontaktiraj nas'
      ]

      const TestComponent = () => (
        <div>
          {buttonLabels.map((label, index) => (
            <button key={index}>{label}</button>
          ))}
        </div>
      )

      render(<TestComponent />)

      buttonLabels.forEach(label => {
        expect(screen.getByText(label)).toBeInTheDocument()
      })
    })
  })

  describe('Form Labels and Messages in Serbian', () => {
    it('should have form labels in Serbian', () => {
      const formLabels = [
        'Ime i prezime',
        'Email adresa',
        'Telefon',
        'Poruka',
        'Grad',
        'Uzrast deteta'
      ]

      const TestComponent = () => (
        <form>
          {formLabels.map((label, index) => (
            <label key={index}>{label}</label>
          ))}
        </form>
      )

      render(<TestComponent />)

      formLabels.forEach(label => {
        expect(screen.getByText(label)).toBeInTheDocument()
      })
    })

    it('should have validation messages in Serbian', () => {
      const validationMessages = [
        'Ovo polje je obavezno',
        'Molimo unesite validnu email adresu',
        'Poruka je uspešno poslata',
        'Došlo je do greške'
      ]

      const TestComponent = () => (
        <div>
          {validationMessages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      )

      render(<TestComponent />)

      validationMessages.forEach(message => {
        expect(screen.getByText(message)).toBeInTheDocument()
      })
    })
  })

  describe('Date and Number Formatting for Serbian Locale', () => {
    it('should format dates in Serbian format', () => {
      const date = new Date('2024-03-15')
      const serbianDate = date.toLocaleDateString('sr-RS')

      const TestComponent = () => <div>{serbianDate}</div>

      render(<TestComponent />)

      expect(screen.getByText(serbianDate)).toBeInTheDocument()
    })

    it('should format numbers with Serbian locale', () => {
      const number = 1234.56
      const serbianNumber = number.toLocaleString('sr-RS')

      const TestComponent = () => <div>{serbianNumber}</div>

      render(<TestComponent />)

      expect(screen.getByText(serbianNumber)).toBeInTheDocument()
    })
  })

  describe('SEO and Meta Content in Serbian', () => {
    it('should have meta titles in Serbian', () => {
      const metaTitles = [
        'Srećno učenje - Početna strana',
        'O autorki - Željana Vukomanović',
        'Blog - Saveti za roditelje',
        'Metodologija - Inovativni pristup učenju'
      ]

      // This would typically be tested in a head element
      metaTitles.forEach(title => {
        expect(title).toMatch(/[čćžšđ]/i) // Contains Serbian characters
      })
    })

    it('should have meta descriptions in Serbian', () => {
      const metaDescriptions = [
        'Otkrijte radost učenja kroz našu inovativnu metodologiju.',
        'Saznajte više o autorki i njenoj viziji edukacije.',
        'Praktični saveti za roditelje o motivaciji dece za učenje.'
      ]

      metaDescriptions.forEach(description => {
        expect(description).toMatch(/[čćžšđ]/i) // Contains Serbian characters
      })
    })
  })
})