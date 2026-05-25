import { MetadataRoute } from 'next'
import { calculators } from '@/lib/registry'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://calculator-hub-brown.vercel.app'

  const calcUrls = calculators.map(c => ({
    url: `${base}/calculators/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...calcUrls,
  ]
}