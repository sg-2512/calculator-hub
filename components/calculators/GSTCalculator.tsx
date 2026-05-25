'use client'
import { useState, useMemo } from 'react'
import { calculateGST } from '@/lib/calculators/tax'

export default function GSTCalculator() {
  const [amount, setAmount] = useState(10000)
  const [rate, setRate] = useState(18)
  const [isInclusive, setIsInclusive] = useState(false)
  const [isInterState, setIsInterState] = useState(false)

  const result = useMemo(() => calculateGST(amount, rate, isInclusive, isInterState), [amount, rate, isInclusive, isInterState])

  const gstRates = [0, 5, 12, 18, 28]

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-6">GST details</h2>

          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700 block mb-1">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700 block mb-2">GST rate</label>
            <div className="flex gap-2 flex-wrap">
              {gstRates.map(r => (
                <button
                  key={r}
                  onClick={() => setRate(r)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${rate === r ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {r}%
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={isInclusive} onChange={e => setIsInclusive(e.target.checked)} className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-gray-700">Amount includes GST (remove GST)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={isInterState} onChange={e => setIsInterState(e.target.checked)} className="w-4 h-4 accent-blue-600" />
              <span className="text-sm text-gray-700">Inter-state transaction (IGST)</span>
            </label>
          </div>
        </div>

        <div className="p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">GST breakdown</h2>
          <div className="space-y-3">
            {[
              { label: 'Base amount (excl. GST)', value: `₹${result.baseAmount.toLocaleString('en-IN')}`, highlight: false },
              !isInterState && { label: `CGST (${rate / 2}%)`, value: `₹${result.cgst.toLocaleString('en-IN')}`, highlight: false },
              !isInterState && { label: `SGST (${rate / 2}%)`, value: `₹${result.sgst.toLocaleString('en-IN')}`, highlight: false },
              isInterState && { label: `IGST (${rate}%)`, value: `₹${result.igst.toLocaleString('en-IN')}`, highlight: false },
              { label: 'Total GST', value: `₹${result.gstAmount.toLocaleString('en-IN')}`, highlight: false },
              { label: 'Total amount (incl. GST)', value: `₹${result.totalAmount.toLocaleString('en-IN')}`, highlight: true },
            ].filter(Boolean).map((row: any, i) => (
              <div key={i} className={`flex justify-between items-center px-4 py-3 rounded-xl ${row.highlight ? 'bg-blue-600 text-white' : 'bg-gray-50'}`}>
                <span className={`text-sm font-medium ${row.highlight ? 'text-blue-100' : 'text-gray-600'}`}>{row.label}</span>
                <span className={`font-bold ${row.highlight ? 'text-white text-lg' : 'text-gray-900'}`}>{row.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 p-4 bg-yellow-50 rounded-xl text-sm text-yellow-800 border border-yellow-100">
            <p className="font-semibold mb-1">💡 Tip</p>
            <p className="text-xs text-yellow-700">GST is applicable on the transaction value. For services, 18% GST applies in most cases. Essential goods like food grains are at 0%.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
