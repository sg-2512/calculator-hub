'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { calculateEMI } from '@/lib/calculators/emi'
import { formatINR, formatINRFull, formatYears } from '@/lib/format'
import InputField from '@/components/ui/InputField'
import ResultCard from '@/components/ui/ResultCard'

export default function EMICalculator() {
  const [principal, setPrincipal] = useState(2500000)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(240)
  const [showTable, setShowTable] = useState(false)

  const result = useMemo(() => calculateEMI({ principal, annualRate: rate, tenureMonths: tenure }), [principal, rate, tenure])

  const pieData = [
    { name: 'Principal', value: principal },
    { name: 'Interest', value: result.totalInterest },
  ]

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Inputs */}
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-6">Loan details</h2>
          <InputField
            label="Loan amount"
            value={principal}
            onChange={setPrincipal}
            min={100000}
            max={10000000}
            step={50000}
            prefix="₹"
            formatValue={v => (v / 100000).toFixed(1) + 'L'}
          />
          <InputField
            label="Annual interest rate"
            value={rate}
            onChange={setRate}
            min={5}
            max={24}
            step={0.1}
            suffix="%"
          />
          <InputField
            label="Loan tenure"
            value={tenure}
            onChange={setTenure}
            min={12}
            max={360}
            step={12}
            suffix=" mo"
            formatValue={v => formatYears(v)}
          />
        </div>

        {/* Results */}
        <div className="p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">Your EMI breakdown</h2>
          <div className="grid grid-cols-1 gap-3 mb-6">
            <ResultCard label="Monthly EMI" value={formatINRFull(result.emi)} highlight />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Total payment" value={formatINR(result.totalPayment)} />
              <ResultCard label="Total interest" value={formatINR(result.totalInterest)} />
            </div>
          </div>

          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                <Cell fill="#2563eb" />
                <Cell fill="#f97316" />
              </Pie>
              <Tooltip formatter={(v: number) => formatINR(v)} />
              <Legend iconType="circle" iconSize={10} />
            </PieChart>
          </ResponsiveContainer>

          <div className="text-center text-sm text-gray-500 mt-2">
            Interest = {((result.totalInterest / result.totalPayment) * 100).toFixed(1)}% of total payment
          </div>
        </div>
      </div>

      {/* Amortization table toggle */}
      <div className="border-t border-gray-100 px-6 py-4">
        <button
          onClick={() => setShowTable(s => !s)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          {showTable ? '▲ Hide' : '▼ Show'} full amortization schedule
        </button>
        {showTable && (
          <div className="mt-4 overflow-auto max-h-64 rounded-xl border border-gray-100">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  {['Month', 'EMI', 'Principal', 'Interest', 'Balance'].map(h => (
                    <th key={h} className="px-3 py-2 text-left font-semibold text-gray-600">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.amortization.map(row => (
                  <tr key={row.month} className="border-t border-gray-50 hover:bg-gray-50">
                    <td className="px-3 py-2 text-gray-500">{row.month}</td>
                    <td className="px-3 py-2">{formatINR(row.emi)}</td>
                    <td className="px-3 py-2 text-emerald-600">{formatINR(row.principal)}</td>
                    <td className="px-3 py-2 text-orange-600">{formatINR(row.interest)}</td>
                    <td className="px-3 py-2">{formatINR(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
