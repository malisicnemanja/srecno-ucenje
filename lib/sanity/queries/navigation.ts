import { groq } from 'next-sanity'

export const navigationQuery = groq`
  *[_type == "navigation" && _id == "navigation"][0] {
    _id,
    title,
    mainMenu[] {
      label,
      href,
      subItems[] {
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

export interface NavigationItem {
  label: string
  href?: string
  subItems?: {
    label: string
    href: string
    description?: string
  }[]
}

export interface Navigation {
  _id: string
  title: string
  mainMenu: NavigationItem[]
  ctaButton: {
    text: string
    href: string
    style: 'primary' | 'secondary' | 'accent'
  }
  mobileMenuOrder?: string[]
}