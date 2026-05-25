'use client'
import { useState, useMemo } from 'react'
import { calculateFD } from '@/lib/calculators/investment'
import { formatINR } from '@/lib/format'
import InputField from '@/components/ui/InputField'
import ResultCard from '@/components/ui/ResultCard'

const compoundingOptions = [
  { label: 'Monthly', value: 12 },
  { label: 'Quarterly', value: 4 },
  { label: 'Half-yearly', value: 2 },
  { label: 'Yearly', value: 1 },
]

export default function FDCalculator() {
  const [principal, setPrincipal] = useState(500000)
  const [rate, setRate] = useState(7.0)
  const [years, setYears] = useState(3)
  const [compFreq, setCompFreq] = useState(4)

  const result = useMemo(() => calculateFD(principal, rate, years, compFreq), [principal, rate, years, compFreq])

  const popularRates = [
    { bank: 'SBI', rate: 6.8 },
    { bank: 'HDFC', rate: 7.1 },
    { bank: 'ICICI', rate: 7.1 },
    { bank: 'AU Small Finance', rate: 8.0 },
    { bank: 'Ujjivan', rate: 8.25 },
  ]

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-6">FD details</h2>
          <InputField label="Principal amount" value={principal} onChange={setPrincipal} min={10000} max={10000000} step={10000} prefix="₹" />
          <InputField label="Annual interest rate" value={rate} onChange={setRate} min={3} max={12} step={0.05} suffix="%" />
          <InputField label="Tenure" value={years} onChange={setYears} min={1} max={10} suffix=" yrs" />

          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700 block mb-2">Compounding frequency</label>
            <div className="grid grid-cols-2 gap-2">
              {compoundingOptions.map(o => (
                <button
                  key={o.value}
                  onClick={() => setCompFreq(o.value)}
                  className={`py-2 rounded-lg text-sm font-medium transition-colors ${compFreq === o.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs font-semibold text-gray-500 mb-2">Current bank FD rates (approx)</p>
            <div className="space-y-1">
              {popularRates.map(r => (
                <div key={r.bank} className="flex justify-between text-xs">
                  <span className="text-gray-600">{r.bank}</span>
                  <button
                    onClick={() => setRate(r.rate)}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    {r.rate}%
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">FD returns</h2>
          <div className="grid grid-cols-1 gap-3 mb-5">
            <ResultCard label="Maturity amount" value={formatINR(result.maturity)} highlight />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Principal" value={formatINR(principal)} />
              <ResultCard label="Interest earned" value={formatINR(result.interest)} subLabel="Effective rate" subValue={`${result.effectiveRate.toFixed(2)}%`} />
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl p-4 text-sm border border-amber-100">
            <p className="font-semibold text-amber-800 mb-2">⚠️ Tax on FD interest</p>
            <p className="text-xs text-amber-700">FD interest is fully taxable as per your income tax slab. TDS is deducted at 10% if interest exceeds ₹40,000/year (₹50,000 for senior citizens). Submit Form 15G/15H to avoid TDS if income is below taxable limit.</p>
          </div>

          <div className="mt-4 bg-blue-50 rounded-xl p-4 text-sm">
            <p className="font-semibold text-blue-800 mb-1">💡 Consider SIP instead?</p>
            <p className="text-xs text-blue-700">
              Same ₹{(principal / 100000).toFixed(0)}L in SIP at 12% for {years} years →{' '}
              <strong>{formatINR(principal * Math.pow(1.12, years))}</strong> maturity (vs {formatINR(result.maturity)} in FD). Market risk applies.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}