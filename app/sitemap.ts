import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://calculator-hub-brown.vercel.app',
      lastModified: new Date(),
    },
    {
      url: 'https://calculator-hub-brown.vercel.app/calculators/battery-backup',
      lastModified: new Date(),
    },
    {
      url: 'https://calculator-hub-brown.vercel.app/calculators/paint',
      lastModified: new Date(),
    },
  ]
}