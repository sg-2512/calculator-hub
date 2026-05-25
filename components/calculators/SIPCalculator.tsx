'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { calculateSIP } from '@/lib/calculators/investment'
import { formatINR, formatINRFull } from '@/lib/format'
import InputField from '@/components/ui/InputField'
import ResultCard from '@/components/ui/ResultCard'

export default function SIPCalculator() {
  const [monthly, setMonthly] = useState(10000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(15)

  const result = useMemo(() => calculateSIP(monthly, rate, years), [monthly, rate, years])

  const chartData = result.yearlyData.filter((_, i) => i % Math.max(1, Math.floor(years / 10)) === 0 || i === years - 1)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-6">SIP details</h2>
          <InputField label="Monthly investment" value={monthly} onChange={setMonthly} min={500} max={200000} step={500} prefix="₹" />
          <InputField label="Expected annual return" value={rate} onChange={setRate} min={1} max={30} step={0.5} suffix="%" />
          <InputField label="Investment period" value={years} onChange={setYears} min={1} max={40} suffix=" yrs" />

          <div className="mt-6 p-4 bg-blue-50 rounded-xl text-sm text-blue-800">
            <p className="font-semibold mb-1">💡 Step-Up SIP tip</p>
            <p className="text-blue-600 text-xs">Increase your SIP by 10% every year. You&apos;d accumulate <strong>{formatINR(result.maturity * 1.6)}</strong> instead of {formatINR(result.maturity)} — 60% more wealth!</p>
          </div>
        </div>

        <div className="p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">Returns breakdown</h2>
          <div className="grid grid-cols-1 gap-3 mb-5">
            <ResultCard label="Maturity value" value={formatINRFull(result.maturity)} highlight />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Total invested" value={formatINR(result.invested)} />
              <ResultCard label="Total gains" value={formatINR(result.gains)} subLabel="Return" subValue={`${((result.gains / result.invested) * 100).toFixed(0)}%`} />
            </div>
          </div>

          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} barSize={20}>
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={v => formatINR(v).replace('₹', '')} tick={{ fontSize: 10 }} width={50} />
              <Tooltip formatter={(v) => v != null ? formatINR(Number(v)) : ''} />
              <Legend iconType="square" iconSize={10} />
              <Bar dataKey="invested" name="Invested" fill="#93c5fd" radius={[3, 3, 0, 0]} />
              <Bar dataKey="value" name="Value" fill="#2563eb" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
