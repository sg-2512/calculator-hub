export interface CalculatorMeta {
  slug: string
  title: string
  shortTitle: string
  description: string
  category: 'loan' | 'investment' | 'tax' | 'salary' | 'utility'
  icon: string         // emoji fallback
  keywords: string[]
  relatedProducts: string[]
  relatedCalculators: string[]
  faqs: { q: string; a: string }[]
}

export interface Product {
  id: string
  name: string
  tagline: string
  cta: string
  href: string
  badge?: string
  color: string        // tailwind bg color class
  highlightFor: string[]
}