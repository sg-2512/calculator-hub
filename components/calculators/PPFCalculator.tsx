'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { calculatePPF } from '@/lib/calculators/investment'
import { formatINR } from '@/lib/format'
import InputField from '@/components/ui/InputField'
import ResultCard from '@/components/ui/ResultCard'

export default function PPFCalculator() {
  const [yearly, setYearly] = useState(150000)
  const [years, setYears] = useState(15)

  const result = useMemo(() => calculatePPF(yearly, years), [yearly, years])

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-2">PPF details</h2>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-semibold">Current rate: 7.1% p.a.</span>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">EEE Tax-free</span>
          </div>
          <InputField
            label="Yearly investment"
            value={yearly}
            onChange={setYearly}
            min={500}
            max={150000}
            step={5000}
            prefix="₹"
          />
          <InputField
            label="Investment period"
            value={years}
            onChange={setYears}
            min={15}
            max={50}
            step={5}
            suffix=" yrs"
          />

          <div className="mt-6 p-4 bg-emerald-50 rounded-xl text-sm">
            <p className="font-semibold text-emerald-800 mb-2">PPF benefits</p>
            <ul className="space-y-1 text-xs text-emerald-700">
              <li>✓ Interest & maturity fully tax-free</li>
              <li>✓ ₹1.5L deduction under Section 80C</li>
              <li>✓ Govt-backed, zero risk</li>
              <li>✓ Loan facility after 3 years</li>
              <li>✓ Partial withdrawal after 7 years</li>
            </ul>
          </div>
        </div>

        <div className="p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">Maturity summary</h2>
          <div className="grid grid-cols-1 gap-3 mb-5">
            <ResultCard label="Maturity amount" value={formatINR(result.maturity)} highlight />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Total invested" value={formatINR(result.totalInvested)} />
              <ResultCard label="Total interest" value={formatINR(result.totalInterest)} subLabel="Return" subValue={`${((result.totalInterest / result.totalInvested) * 100).toFixed(0)}%`} />
            </div>
          </div>

          <ResponsiveContainer width="100%" height={170}>
            <AreaChart data={result.yearlyData}>
              <XAxis dataKey="year" tick={{ fontSize: 10 }} />
              <YAxis tickFormatter={v => formatINR(v).replace('₹', '')} tick={{ fontSize: 10 }} width={48} />
              <Tooltip formatter={(v) => v != null ? formatINR(Number(v)) : ''} />
              <Legend iconType="square" iconSize={10} />
              <Area type="monotone" dataKey="invested" name="Invested" stackId="1" stroke="#6ee7b7" fill="#d1fae5" />
              <Area type="monotone" dataKey="balance" name="Balance" stackId="2" stroke="#059669" fill="#6ee7b7" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}