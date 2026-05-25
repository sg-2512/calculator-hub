import Link from 'next/link'
import { calculators, categoryLabels } from '@/lib/registry'

const categories = ['loan', 'investment', 'tax', 'salary', 'utility'] as const

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <span className="text-2xl">🧮</span> CalcHub
            </Link>
            <p className="text-sm leading-relaxed">
              Free, accurate financial calculators for every Indian. No signup, no ads popup, no nonsense.
            </p>
          </div>
          {categories.map(cat => {
            const calcs = calculators.filter(c => c.category === cat)
            if (!calcs.length) return null
            return (
              <div key={cat}>
                <h3 className="text-white text-sm font-semibold mb-3">{categoryLabels[cat]}</h3>
                <ul className="space-y-2">
                  {calcs.map(c => (
                    <li key={c.slug}>
                      <Link href={`/calculators/${c.slug}`} className="text-sm hover:text-white transition-colors">
                        {c.shortTitle} Calculator
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs">© {new Date().getFullYear()} CalcHub India. All calculators are for informational purposes only.</p>
          <div className="flex gap-4 text-xs">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
