'use client'
import { useState, useMemo } from 'react'
import { calculateRD, calculateLumpsum, calculateCAGR, calculateFutureValue, calculateInflation } from '@/lib/calculators/investment'
import { calculateHRA, calculateGratuity } from '@/lib/calculators/tax'
import { calculateNPS } from '@/lib/calculators/salary'
import { formatINR, formatINRFull } from '@/lib/format'
import InputField from '@/components/ui/InputField'
import ResultCard from '@/components/ui/ResultCard'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

// ── RD ────────────────────────────────────────────────────────────
export function RDCalculator() {
  const [monthly, setMonthly] = useState(5000)
  const [rate, setRate] = useState(6.5)
  const [months, setMonths] = useState(36)
  const result = useMemo(() => calculateRD(monthly, rate, months), [monthly, rate, months])

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-6">RD details</h2>
          <InputField label="Monthly deposit" value={monthly} onChange={setMonthly} min={100} max={100000} step={500} prefix="₹" />
          <InputField label="Annual interest rate" value={rate} onChange={setRate} min={4} max={10} step={0.25} suffix="%" />
          <InputField label="Tenure" value={months} onChange={setMonths} min={6} max={120} step={6} suffix=" mo" />
        </div>
        <div className="p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">RD returns</h2>
          <div className="grid gap-3">
            <ResultCard label="Maturity amount" value={formatINR(result.maturity)} highlight />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Total deposited" value={formatINR(result.invested)} />
              <ResultCard label="Interest earned" value={formatINR(result.interest)} />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4">* Interest compounded quarterly as per Indian banking norms</p>
        </div>
      </div>
    </div>
  )
}

// ── LUMPSUM ───────────────────────────────────────────────────────
export function LumpsumCalculator() {
  const [principal, setPrincipal] = useState(500000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)
  const result = useMemo(() => calculateLumpsum(principal, rate, years), [principal, rate, years])

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-6">Lumpsum details</h2>
          <InputField label="Investment amount" value={principal} onChange={setPrincipal} min={10000} max={10000000} step={10000} prefix="₹" />
          <InputField label="Expected annual return" value={rate} onChange={setRate} min={1} max={30} step={0.5} suffix="%" />
          <InputField label="Investment period" value={years} onChange={setYears} min={1} max={40} suffix=" yrs" />
        </div>
        <div className="p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">Returns</h2>
          <div className="grid gap-3 mb-4">
            <ResultCard label="Maturity value" value={formatINR(result.maturity)} highlight />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Invested" value={formatINR(principal)} />
              <ResultCard label="Gains" value={formatINR(result.gains)} subLabel="Multiple" subValue={`${(result.maturity / principal).toFixed(1)}x`} />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={result.yearlyData}>
              <XAxis dataKey="year" tick={{ fontSize: 10 }} />
              <YAxis tickFormatter={v => formatINR(v).replace('₹', '')} tick={{ fontSize: 10 }} width={48} />
              <Tooltip formatter={(v: number) => formatINR(v)} />
              <Area type="monotone" dataKey="value" name="Value" stroke="#2563eb" fill="#dbeafe" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

// ── CAGR ──────────────────────────────────────────────────────────
export function CAGRCalculator() {
  const [mode, setMode] = useState<'findCAGR' | 'findFuture'>('findCAGR')
  const [startVal, setStartVal] = useState(100000)
  const [endVal, setEndVal] = useState(250000)
  const [years, setYears] = useState(5)
  const [cagr, setCAGR] = useState(12)
  const [present, setPresent] = useState(100000)

  const cagrResult = useMemo(() => mode === 'findCAGR' ? calculateCAGR(startVal, endVal, years) : null, [mode, startVal, endVal, years])
  const futureResult = useMemo(() => mode === 'findFuture' ? calculateFutureValue(present, cagr, years) : null, [mode, present, cagr, years])

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6">
        <h2 className="font-bold text-gray-800 text-lg mb-4">CAGR Calculator</h2>
        <div className="flex gap-2 mb-6">
          {[{ id: 'findCAGR', label: 'Find CAGR %' }, { id: 'findFuture', label: 'Find future value' }].map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === m.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {mode === 'findCAGR' ? (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <InputField label="Initial investment" value={startVal} onChange={setStartVal} min={1000} max={10000000} step={1000} prefix="₹" />
              <InputField label="Final value" value={endVal} onChange={setEndVal} min={1000} max={100000000} step={1000} prefix="₹" />
              <InputField label="Period (years)" value={years} onChange={setYears} min={1} max={30} suffix=" yrs" />
            </div>
            <div className="flex flex-col justify-center items-center text-center bg-blue-50 rounded-2xl p-8">
              <p className="text-sm text-blue-600 font-medium mb-2">CAGR</p>
              <p className="text-5xl font-bold text-blue-700">{cagrResult?.toFixed(2)}%</p>
              <p className="text-xs text-blue-500 mt-2">per annum</p>
              <p className="text-xs text-gray-500 mt-4">Your investment grew <strong>{(endVal / startVal).toFixed(2)}x</strong> in {years} years</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <InputField label="Present value" value={present} onChange={setPresent} min={1000} max={10000000} step={1000} prefix="₹" />
              <InputField label="Expected CAGR" value={cagr} onChange={setCAGR} min={1} max={50} step={0.5} suffix="%" />
              <InputField label="Period (years)" value={years} onChange={setYears} min={1} max={40} suffix=" yrs" />
            </div>
            <div className="flex flex-col justify-center items-center text-center bg-blue-50 rounded-2xl p-8">
              <p className="text-sm text-blue-600 font-medium mb-2">Future value</p>
              <p className="text-4xl font-bold text-blue-700">{formatINR(futureResult ?? 0)}</p>
              <p className="text-xs text-gray-500 mt-4">Growth: <strong>{formatINR((futureResult ?? 0) - present)}</strong></p>
              <p className="text-xs text-gray-500">Multiple: <strong>{((futureResult ?? 0) / present).toFixed(2)}x</strong></p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── INFLATION ─────────────────────────────────────────────────────
export function InflationCalculator() {
  const [amount, setAmount] = useState(100000)
  const [inflationRate, setInflationRate] = useState(6)
  const [years, setYears] = useState(10)
  const result = useMemo(() => calculateInflation(amount, inflationRate, years), [amount, inflationRate, years])

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-6">Inflation calculator</h2>
          <InputField label="Current amount" value={amount} onChange={setAmount} min={1000} max={10000000} step={1000} prefix="₹" />
          <InputField label="Expected inflation rate" value={inflationRate} onChange={setInflationRate} min={1} max={20} step={0.5} suffix="%" />
          <InputField label="Time period" value={years} onChange={setYears} min={1} max={40} suffix=" yrs" />
          <p className="text-xs text-gray-400 mt-4">India's long-term average inflation: ~5–6% p.a.</p>
        </div>
        <div className="p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">Inflation impact</h2>
          <div className="grid gap-3">
            <div className="bg-red-50 rounded-xl p-4 border border-red-100">
              <p className="text-xs font-medium text-red-500 mb-1">What {formatINR(amount)} today will cost in {years} years</p>
              <p className="text-2xl font-bold text-red-700">{formatINR(result.futureValue)}</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
              <p className="text-xs font-medium text-orange-500 mb-1">Real value of {formatINR(amount)} after {years} years</p>
              <p className="text-2xl font-bold text-orange-700">{formatINR(result.realValueOfFutureMoney)}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-medium text-gray-500 mb-1">Purchasing power lost</p>
              <p className="text-2xl font-bold text-gray-700">{formatINR(result.purchasingPowerLoss)}</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">💡 Your investments must beat {inflationRate}% p.a. just to preserve wealth.</p>
        </div>
      </div>
    </div>
  )
}

// ── HRA ───────────────────────────────────────────────────────────
export function HRACalculator() {
  const [basic, setBasic] = useState(600000)
  const [hraReceived, setHraReceived] = useState(240000)
  const [rentPaid, setRentPaid] = useState(300000)
  const [isMetro, setIsMetro] = useState(true)
  const result = useMemo(() => calculateHRA(basic, hraReceived, rentPaid, isMetro), [basic, hraReceived, rentPaid, isMetro])

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-6">HRA details (annual)</h2>
          <InputField label="Basic salary (annual)" value={basic} onChange={setBasic} min={100000} max={3000000} step={10000} prefix="₹" />
          <InputField label="HRA received (annual)" value={hraReceived} onChange={setHraReceived} min={0} max={1000000} step={5000} prefix="₹" />
          <InputField label="Rent paid (annual)" value={rentPaid} onChange={setRentPaid} min={0} max={1500000} step={5000} prefix="₹" />
          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700 block mb-2">City type</label>
            <div className="flex gap-3">
              {[{ label: 'Metro (50%)', val: true }, { label: 'Non-metro (40%)', val: false }].map(o => (
                <button
                  key={String(o.val)}
                  onClick={() => setIsMetro(o.val)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${isMetro === o.val ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">HRA exemption</h2>
          <div className="space-y-3 mb-5">
            {[
              { label: '1. Actual HRA received', value: result.actualHRA },
              { label: `2. Rent paid − 10% of basic`, value: result.rentMinus10Percent },
              { label: `3. ${isMetro ? '50' : '40'}% of basic salary`, value: result.percentOfBasic },
            ].map((r, i) => (
              <div key={i} className={`flex justify-between px-4 py-3 rounded-xl text-sm ${r.value === result.exemption ? 'bg-emerald-100 border border-emerald-200 font-semibold' : 'bg-gray-50'}`}>
                <span className="text-gray-700">{r.label}</span>
                <span>{formatINR(r.value)}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="HRA exemption (min of above)" value={formatINR(result.exemption)} highlight />
            <ResultCard label="Taxable HRA" value={formatINR(result.taxableHRA)} />
          </div>
          <p className="text-xs text-gray-400 mt-3">The highlighted value is the minimum of the three — that is your tax-exempt HRA.</p>
        </div>
      </div>
    </div>
  )
}

// ── GRATUITY ──────────────────────────────────────────────────────
export function GratuityCalculator() {
  const [lastSalary, setLastSalary] = useState(80000)
  const [yearsOfService, setYearsOfService] = useState(8)
  const result = useMemo(() => calculateGratuity(lastSalary, yearsOfService), [lastSalary, yearsOfService])

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-6">Gratuity details</h2>
          <InputField label="Last drawn basic + DA (monthly)" value={lastSalary} onChange={setLastSalary} min={10000} max={500000} step={1000} prefix="₹" />
          <InputField label="Years of service" value={yearsOfService} onChange={setYearsOfService} min={5} max={40} suffix=" yrs" />
          <div className="mt-6 p-4 bg-blue-50 rounded-xl text-xs text-blue-700">
            <p className="font-semibold mb-1">Formula used</p>
            <p className="font-mono">Gratuity = (Basic+DA × 15 × years) ÷ 26</p>
            <p className="mt-2">Minimum 5 years of continuous service required. Each completed year counts; 6+ months rounds up.</p>
          </div>
        </div>
        <div className="p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">Gratuity amount</h2>
          <div className="grid gap-3">
            <ResultCard label="Gratuity payable" value={formatINR(result.gratuity)} highlight />
            <ResultCard label="Tax-exempt portion" value={formatINR(result.taxExempt)} subLabel="Max exempt" subValue="₹20L" />
            <ResultCard label="Taxable gratuity" value={formatINR(result.taxable)} subLabel={result.taxable > 0 ? 'Added to income' : 'Fully exempt'} subValue={result.taxable > 0 ? 'Yes' : '✓'} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── NPS ───────────────────────────────────────────────────────────
export function NPSCalculator() {
  const [monthly, setMonthly] = useState(5000)
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(60)
  const [expectedReturn, setExpectedReturn] = useState(10)
  const [annuityRate, setAnnuityRate] = useState(6)
  const [taxSlab, setTaxSlab] = useState(30)

  const result = useMemo(
    () => calculateNPS(monthly, currentAge, retirementAge, expectedReturn, annuityRate, taxSlab),
    [monthly, currentAge, retirementAge, expectedReturn, annuityRate, taxSlab]
  )

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-6">NPS details</h2>
          <InputField label="Monthly contribution" value={monthly} onChange={setMonthly} min={500} max={100000} step={500} prefix="₹" />
          <InputField label="Current age" value={currentAge} onChange={setCurrentAge} min={18} max={59} suffix=" yrs" />
          <InputField label="Retirement age" value={retirementAge} onChange={setRetirementAge} min={currentAge + 1} max={70} suffix=" yrs" />
          <InputField label="Expected return" value={expectedReturn} onChange={setExpectedReturn} min={6} max={20} step={0.5} suffix="%" />
          <InputField label="Annuity rate" value={annuityRate} onChange={setAnnuityRate} min={4} max={10} step={0.5} suffix="%" />
          <div className="mt-2">
            <label className="text-sm font-medium text-gray-700 block mb-2">Your tax slab</label>
            <div className="flex gap-2">
              {[5, 20, 30].map(s => (
                <button key={s} onClick={() => setTaxSlab(s)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${taxSlab === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{s}%</button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">Retirement projection</h2>
          <div className="grid gap-3">
            <ResultCard label="Total NPS corpus" value={formatINR(result.corpus)} highlight />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Tax-free lumpsum (60%)" value={formatINR(result.lumpsum)} subLabel="At retirement" subValue="Tax free" />
              <ResultCard label="Monthly pension (est.)" value={formatINR(result.annuityAmount)} subLabel="From annuity" subValue={`${annuityRate}% p.a.`} />
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
              <p className="text-xs font-semibold text-emerald-700 mb-1">Annual tax saving with NPS</p>
              <p className="text-2xl font-bold text-emerald-700">{formatINR(result.taxSaving)}</p>
              <p className="text-xs text-emerald-600 mt-1">₹50,000 extra deduction under 80CCD(1B) at {taxSlab}% slab + 4% cess</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
