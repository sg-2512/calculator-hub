import type { Product } from '@/types/calculator'

export default function ProductPromo({ product }: { product: Product }) {
  return (
    <a
      href={product.href}
      target="_blank"
      rel="noopener sponsored"
      className={`flex flex-col rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all hover:-translate-y-0.5 ${product.color}`}
    >
      {product.badge && (
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full w-fit mb-3">
          {product.badge}
        </span>
      )}
      <p className="font-bold text-sm text-gray-900 mb-1">{product.name}</p>
      <p className="text-xs text-gray-500 mb-4 flex-1 leading-relaxed">{product.tagline}</p>
      <span className="text-sm font-semibold text-blue-600 flex items-center gap-1">
        {product.cta}
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </span>
    </a>
  )
}
