// app/calculators/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { calculators, getCalculatorBySlug, categoryLabels } from '@/lib/registry'
import { getProductsForCalculator } from '@/lib/products'
import ProductPromo from '@/components/ui/ProductPromo'
import AdSlot from '@/components/layout/AdSlot'
import CalculatorWidget from '@/components/calculators/CalculatorWidget'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return calculators.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const calc = getCalculatorBySlug(slug)
  if (!calc) return {}
  return {
    title: `${calc.title} — Free Online Calculator India`,
    description: calc.description,
    keywords: calc.keywords,
    alternates: {
      canonical: `https://calculator-hub-brown.vercel.app/calculators/${calc.slug}`,
    },
    openGraph: {
      title: calc.title,
      description: calc.description,
      type: 'website',
    },
  }
}

export default async function CalculatorPage({ params }: PageProps) {
  const { slug } = await params
  const meta = getCalculatorBySlug(slug)
  if (!meta) notFound()

  const products = getProductsForCalculator(meta.slug)
  const relatedCalcs = calculators.filter(c => meta.relatedCalculators.includes(c.slug))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.title,
    description: meta.description,
    url: `https://calculator-hub-brown.vercel.app/calculators/${meta.slug}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    ...(meta.faqs.length > 0 && {
      mainEntity: {
        '@type': 'FAQPage',
        mainEntity: meta.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
    }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>›</span>
          <span className="text-gray-700 capitalize">{categoryLabels[meta.category]}</span>
          <span>›</span>
          <span className="text-gray-700">{meta.title}</span>
        </nav>

        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {meta.icon} {meta.title}
          </h1>
          <p className="text-gray-500 text-lg">{meta.description}</p>
        </div>

        <AdSlot slot="top-banner" className="mb-6" />

        <CalculatorWidget slug={meta.slug} />

        {products.length > 0 && (
          <section className="mt-10">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Recommended for you
              <span className="text-xs font-normal text-gray-400 ml-2">Sponsored</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {products.map(p => (
                <ProductPromo key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        <AdSlot slot="mid-content" className="my-10" />

        {meta.faqs.length > 0 && (
          <section className="mt-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently asked questions</h2>
            <div className="space-y-3">
              {meta.faqs.map((faq, i) => (
                <details key={i} className="group border border-gray-100 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-gray-800 hover:bg-gray-50 list-none">
                    {faq.q}
                    <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform text-lg">▾</span>
                  </summary>
                  <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-50">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {relatedCalcs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related calculators</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {relatedCalcs.map(c => (
                <Link
                  key={c.slug}
                  href={`/calculators/${c.slug}`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group"
                >
                  <span className="text-xl">{c.icon}</span>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">{c.shortTitle}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <AdSlot slot="bottom-banner" className="mt-10" />
      </div>
    </>
  )
}