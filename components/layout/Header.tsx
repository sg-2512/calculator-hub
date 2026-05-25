import Link from 'next/link'
import { calculators, categoryLabels } from '@/lib/registry'

const categories = ['loan', 'investment', 'tax', 'salary']

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 text-lg">
            <span className="text-2xl">🧮</span>
            <span>CalcHub</span>
            <span className="text-xs font-normal text-gray-400 hidden sm:block">India</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {categories.map(cat => (
              <div key={cat} className="relative group">
                <button className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors">
                  {categoryLabels[cat]}
                </button>
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                  {calculators.filter(c => c.category === cat).map(c => (
                    <Link
                      key={c.slug}
                      href={`/calculators/${c.slug}`}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                    >
                      <span>{c.icon}</span>
                      {c.shortTitle}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <Link
            href="/"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
          >
            All calculators
          </Link>
        </div>
      </div>
    </header>
  )
}
