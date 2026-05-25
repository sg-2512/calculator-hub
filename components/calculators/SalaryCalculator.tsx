'use client'
import { useState, useMemo } from 'react'
import { calculateSalary } from '@/lib/calculators/salary'
import { formatINR, formatINRFull } from '@/lib/format'
import InputField from '@/components/ui/InputField'

export default function SalaryCalculator() {
  const [ctc, setCtc] = useState(1200000)
  const [basicPercent, setBasicPercent] = useState(40)

  const result = useMemo(() => calculateSalary(ctc, basicPercent), [ctc, basicPercent])

  const rows = [
    { label: 'Basic salary', value: result.basic / 12, annual: result.basic, type: 'earning' },
    { label: 'HRA', value: result.hra / 12, annual: result.hra, type: 'earning' },
    { label: 'Special allowance', value: result.specialAllowance / 12, annual: result.specialAllowance, type: 'earning' },
    { label: 'Gross salary', value: result.grossSalary / 12, annual: result.grossSalary, type: 'subtotal' },
    { label: 'Employee PF (12% of basic)', value: result.employeePF / 12, annual: result.employeePF, type: 'deduction' },
    { label: 'Professional tax', value: result.professionalTax / 12, annual: result.professionalTax, type: 'deduction' },
    { label: 'TDS (income tax)', value: result.tds / 12, annual: result.tds, type: 'deduction' },
  ]

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-6">Enter your CTC</h2>
          <InputField
            label="Annual CTC"
            value={ctc}
            onChange={setCtc}
            min={300000}
            max={10000000}
            step={50000}
            prefix="₹"
            formatValue={v => (v / 100000).toFixed(1) + 'L'}
          />
          <InputField
            label="Basic salary as % of CTC"
            value={basicPercent}
            onChange={setBasicPercent}
            min={30}
            max={60}
            step={5}
            suffix="%"
          />

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="bg-emerald-50 rounded-xl p-4 text-center">
              <p className="text-xs text-emerald-600 font-medium mb-1">Monthly in-hand</p>
              <p className="text-xl font-bold text-emerald-700">{formatINR(result.inHandMonthly)}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-xs text-blue-600 font-medium mb-1">Annual in-hand</p>
              <p className="text-xl font-bold text-blue-700">{formatINR(result.inHandAnnual)}</p>
            </div>
          </div>

          <div className="mt-4 bg-gray-50 rounded-xl p-3 text-xs text-gray-500">
            <p>Take-home = <strong>{((result.inHandAnnual / ctc) * 100).toFixed(0)}%</strong> of CTC</p>
            <p className="mt-1">Employer PF contribution: {formatINR(result.employerPF)}/yr (included in CTC, not in-hand)</p>
          </div>
        </div>

        <div className="p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">Salary breakdown</h2>
          <div className="space-y-1">
            {rows.map((row, i) => (
              <div
                key={i}
                className={`flex justify-between items-center px-3 py-2.5 rounded-lg text-sm ${
                  row.type === 'subtotal' ? 'bg-gray-100 font-semibold' :
                  row.type === 'deduction' ? 'text-red-600' : ''
                }`}
              >
                <span className={row.type === 'deduction' ? 'text-red-500' : 'text-gray-700'}>
                  {row.type === 'deduction' ? '− ' : ''}{row.label}
                </span>
                <div className="text-right">
                  <span className="font-semibold">{formatINR(row.value)}/mo</span>
                  <span className="text-xs text-gray-400 ml-2 hidden sm:inline">({formatINR(row.annual)}/yr)</span>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center px-3 py-3 bg-blue-600 rounded-lg text-white font-bold mt-2">
              <span>Net take-home</span>
              <div className="text-right">
                <span>{formatINR(result.inHandMonthly)}/mo</span>
                <span className="text-xs text-blue-200 ml-2 hidden sm:inline">({formatINR(result.inHandAnnual)}/yr)</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">* Calculated under new tax regime with standard deduction ₹75,000. Actual TDS may vary.</p>
        </div>
      </div>
    </div>
  )
}