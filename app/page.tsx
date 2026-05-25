import type { Metadata } from 'next'
import Link from 'next/link'
import { calculators, categoryLabels } from '@/lib/registry'

export const metadata: Metadata = {
  title: 'CalcHub India — Free Financial Calculators for EMI, SIP, Tax & More',
  description: 'India\'s most accurate free financial calculators. Calculate EMI, SIP returns, income tax, GST, salary take-home, PPF, FD maturity and more — instantly.',
}

const categories = ['loan', 'investment', 'tax', 'salary', 'utility']

const categoryColors: Record<string, string> = {
  loan: 'bg-blue-50 text-blue-700 border-blue-100',
  investment: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  tax: 'bg-purple-50 text-purple-700 border-purple-100',
  salary: 'bg-orange-50 text-orange-700 border-orange-100',
  utility: 'bg-gray-50 text-gray-700 border-gray-200',
}

const categoryHero: Record<string, { bg: string; desc: string }> = {
  loan: { bg: 'from-blue-600 to-blue-700', desc: 'EMI, eligibility & prepayment' },
  investment: { bg: 'from-emerald-600 to-emerald-700', desc: 'SIP, FD, PPF & mutual funds' },
  tax: { bg: 'from-purple-600 to-purple-700', desc: 'Income tax, GST & HRA' },
  salary: { bg: 'from-orange-500 to-orange-600', desc: 'CTC, NPS & gratuity' },
  utility: { bg: 'from-gray-600 to-gray-700', desc: 'CAGR, inflation & more' },
}

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Free Financial Calculators<br />
          <span className="text-blue-600">Built for India</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Accurate, fast, and free. Calculate EMI, SIP returns, income tax, salary, and 15+ more — no signup required.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-gray-500">
          <span className="bg-gray-50 px-3 py-1 rounded-full border">✓ New tax regime 2025-26</span>
          <span className="bg-gray-50 px-3 py-1 rounded-full border">✓ Indian number format (Lakhs/Crores)</span>
          <span className="bg-gray-50 px-3 py-1 rounded-full border">✓ Amortization schedules</span>
          <span className="bg-gray-50 px-3 py-1 rounded-full border">✓ No signup needed</span>
        </div>
      </div>

      {/* Categories with calculator grids */}
      {categories.map(cat => {
        const calcs = calculators.filter(c => c.category === cat)
        if (!calcs.length) return null
        const hero = categoryHero[cat]
        return (
          <section key={cat} className="mb-12">
            <div className={`bg-gradient-to-r ${hero.bg} rounded-2xl px-6 py-4 mb-5 flex items-center justify-between`}>
              <div>
                <h2 className="text-white font-bold text-lg">{categoryLabels[cat]} Calculators</h2>
                <p className="text-white/70 text-sm">{hero.desc}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {calcs.map(calc => (
                <Link
                  key={calc.slug}
                  href={`/calculators/${calc.slug}`}
                  className={`group flex flex-col gap-2 p-4 rounded-xl border transition-all hover:shadow-md hover:-translate-y-0.5 ${categoryColors[calc.category]}`}
                >
                  <span className="text-2xl">{calc.icon}</span>
                  <span className="font-semibold text-sm leading-tight">{calc.title}</span>
                  <span className="text-xs opacity-70 line-clamp-2">{calc.description.split('.')[0]}</span>
                </Link>
              ))}
            </div>
          </section>
        )
      })}

      {/* Trust signals */}
      <section className="mt-12 bg-gray-50 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Why use CalcHub?</h2>
        <p className="text-gray-500 text-sm mb-6">Built specifically for Indian financial requirements</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: '🎯', title: 'Accurate formulas', desc: 'Based on RBI guidelines and Indian tax laws' },
            { icon: '⚡', title: 'Instant results', desc: 'Real-time calculation as you type' },
            { icon: '🆓', title: 'Always free', desc: 'No hidden fees, no signup required' },
            { icon: '📱', title: 'Mobile friendly', desc: 'Works perfectly on any device' },
          ].map(f => (
            <div key={f.title}>
              <div className="text-3xl mb-2">{f.icon}</div>
              <h3 className="font-semibold text-sm text-gray-800 mb-1">{f.title}</h3>
              <p className="text-xs text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}