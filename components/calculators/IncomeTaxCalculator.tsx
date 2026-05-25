'use client'
import { useState, useMemo } from 'react'
import { calcIncomeTaxNewRegime, calcIncomeTaxOldRegime } from '@/lib/calculators/tax'
import { formatINRFull, formatINR } from '@/lib/format'
import InputField from '@/components/ui/InputField'
import ResultCard from '@/components/ui/ResultCard'

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState(1200000)
  const [deductions80C, set80C] = useState(150000)
  const [deductions80D, set80D] = useState(25000)
  const [hra, setHra] = useState(180000)
  const [homeLoan, setHomeLoan] = useState(0)

  const newRegime = useMemo(() => calcIncomeTaxNewRegime(income), [income])
  const oldRegime = useMemo(() => calcIncomeTaxOldRegime(income, deductions80C, deductions80D, hra, homeLoan), [income, deductions80C, deductions80D, hra, homeLoan])

  const betterRegime = newRegime.totalTax <= oldRegime.totalTax ? 'new' : 'old'
  const savings = Math.abs(newRegime.totalTax - oldRegime.totalTax)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Inputs */}
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-6">Your income details (FY 2025-26)</h2>
          <InputField label="Annual gross income (CTC)" value={income} onChange={setIncome} min={300000} max={10000000} step={50000} prefix="₹" formatValue={v => (v / 100000).toFixed(1) + 'L'} />

          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 mt-4">Old regime deductions</p>
          <div className="space-y-1">
            <InputField label="80C (PF + ELSS + LIC + PPF)" value={deductions80C} onChange={set80C} min={0} max={150000} step={5000} prefix="₹" />
            <InputField label="80D (health insurance)" value={deductions80D} onChange={set80D} min={0} max={100000} step={5000} prefix="₹" />
            <InputField label="HRA exemption" value={hra} onChange={setHra} min={0} max={600000} step={10000} prefix="₹" />
            <InputField label="Home loan interest (24b)" value={homeLoan} onChange={setHomeLoan} min={0} max={200000} step={10000} prefix="₹" />
          </div>
        </div>

        {/* Results */}
        <div className="p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">Tax comparison</h2>

          {/* Recommendation banner */}
          <div className={`rounded-xl p-4 mb-5 ${betterRegime === 'new' ? 'bg-emerald-50 border border-emerald-200' : 'bg-blue-50 border border-blue-200'}`}>
            <p className="font-bold text-sm text-gray-800">
              {betterRegime === 'new' ? '✅ New regime saves you more' : '✅ Old regime saves you more'}
            </p>
            <p className="text-xs text-gray-600 mt-0.5">You save <strong>{formatINR(savings)}</strong> per year by choosing the {betterRegime} regime</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className={`rounded-xl p-4 border-2 ${betterRegime === 'new' ? 'border-emerald-400 bg-emerald-50' : 'border-gray-100 bg-gray-50'}`}>
              <p className="text-xs font-semibold text-gray-500 mb-1">NEW REGIME</p>
              <p className="text-xl font-bold text-gray-900">{formatINR(newRegime.totalTax)}</p>
              <p className="text-xs text-gray-500">Effective: {newRegime.effectiveRate.toFixed(1)}%</p>
              <p className="text-xs text-gray-500">Monthly TDS: {formatINR(newRegime.totalTax / 12)}</p>
            </div>
            <div className={`rounded-xl p-4 border-2 ${betterRegime === 'old' ? 'border-blue-400 bg-blue-50' : 'border-gray-100 bg-gray-50'}`}>
              <p className="text-xs font-semibold text-gray-500 mb-1">OLD REGIME</p>
              <p className="text-xl font-bold text-gray-900">{formatINR(oldRegime.totalTax)}</p>
              <p className="text-xs text-gray-500">Effective: {oldRegime.effectiveRate.toFixed(1)}%</p>
              <p className="text-xs text-gray-500">Monthly TDS: {formatINR(oldRegime.totalTax / 12)}</p>
            </div>
          </div>

          {/* Slab breakdown */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-600 mb-3">New regime slab breakdown</p>
            {newRegime.slabDetails.map((s, i) => (
              <div key={i} className="flex justify-between text-xs py-1 border-b border-gray-100 last:border-0">
                <span className="text-gray-500">{s.range} @ {s.rate}</span>
                <span className="font-medium">{formatINR(s.tax)}</span>
              </div>
            ))}
            <div className="flex justify-between text-xs font-semibold pt-2 text-gray-700">
              <span>4% Cess</span>
              <span>{formatINR(newRegime.cess)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold pt-2 border-t border-gray-200 mt-1">
              <span>Total tax</span>
              <span>{formatINR(newRegime.totalTax)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
