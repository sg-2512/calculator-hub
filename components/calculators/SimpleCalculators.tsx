'use client'
import { useState, useMemo } from 'react'
import { calculateEMI } from '@/lib/calculators/emi'
import { formatINR, formatINRFull } from '@/lib/format'
import InputField from '@/components/ui/InputField'
import ResultCard from '@/components/ui/ResultCard'

// ── SIMPLE INTEREST ───────────────────────────────────────────────
export function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(3)

  const si = useMemo(() => principal * rate * years / 100, [principal, rate, years])
  const total = principal + si

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-6">Simple interest details</h2>
          <InputField label="Principal amount" value={principal} onChange={setPrincipal} min={1000} max={10000000} step={1000} prefix="₹" />
          <InputField label="Annual interest rate" value={rate} onChange={setRate} min={1} max={30} step={0.5} suffix="%" />
          <InputField label="Time period" value={years} onChange={setYears} min={1} max={30} suffix=" yrs" />

          <div className="mt-5 bg-blue-50 rounded-xl p-4 text-xs text-blue-700">
            <p className="font-semibold mb-1">Formula</p>
            <p className="font-mono">SI = (P × R × T) / 100</p>
            <p className="font-mono mt-1">= ({(principal/1000).toFixed(0)}K × {rate} × {years}) / 100</p>
            <p className="font-mono mt-1">= {formatINR(si)}</p>
          </div>
        </div>
        <div className="p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">Results</h2>
          <div className="grid gap-3">
            <ResultCard label="Total amount" value={formatINRFull(total)} highlight />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Principal" value={formatINR(principal)} />
              <ResultCard label="Simple interest" value={formatINR(si)} subLabel="Effective yield" subValue={`${((si / principal) * 100).toFixed(1)}%`} />
            </div>
          </div>
          <div className="mt-5 bg-amber-50 rounded-xl p-4 text-xs text-amber-700">
            <p className="font-semibold mb-1">💡 Simple vs Compound</p>
            <p>With compound interest at {rate}% quarterly, you&apos;d earn {formatINR(principal * (Math.pow(1 + rate/400, years*4) - 1))} — {formatINR(principal * (Math.pow(1 + rate/400, years*4) - 1) - si)} more than simple interest.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── COMPOUND INTEREST ─────────────────────────────────────────────
export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(5)
  const [freq, setFreq] = useState(4)

  const freqOptions = [
    { label: 'Yearly', value: 1 },
    { label: 'Quarterly', value: 4 },
    { label: 'Monthly', value: 12 },
    { label: 'Daily', value: 365 },
  ]

  const maturity = useMemo(() => principal * Math.pow(1 + rate / (freq * 100), freq * years), [principal, rate, years, freq])
  const ci = maturity - principal
  const si = principal * rate * years / 100

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-6">Compound interest details</h2>
          <InputField label="Principal amount" value={principal} onChange={setPrincipal} min={1000} max={10000000} step={1000} prefix="₹" />
          <InputField label="Annual interest rate" value={rate} onChange={setRate} min={1} max={30} step={0.5} suffix="%" />
          <InputField label="Time period" value={years} onChange={setYears} min={1} max={40} suffix=" yrs" />
          <div className="mt-1">
            <label className="text-sm font-medium text-gray-700 block mb-2">Compounding frequency</label>
            <div className="grid grid-cols-2 gap-2">
              {freqOptions.map(o => (
                <button key={o.value} onClick={() => setFreq(o.value)}
                  className={`py-2 rounded-lg text-sm font-medium transition-colors ${freq === o.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">Results</h2>
          <div className="grid gap-3">
            <ResultCard label="Total amount" value={formatINRFull(maturity)} highlight />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Principal" value={formatINR(principal)} />
              <ResultCard label="Compound interest" value={formatINR(ci)} subLabel="vs Simple interest" subValue={`+${formatINR(ci - si)}`} />
            </div>
          </div>
          <div className="mt-5 bg-gray-50 rounded-xl p-4 text-sm">
            <p className="font-semibold text-gray-700 mb-2">Effective annual rate</p>
            <p className="text-2xl font-bold text-blue-600">{((Math.pow(1 + rate/(freq*100), freq) - 1) * 100).toFixed(3)}%</p>
            <p className="text-xs text-gray-500 mt-1">vs nominal rate of {rate}%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── TDS CALCULATOR ────────────────────────────────────────────────
export function TDSCalculator() {
  const [type, setType] = useState<'salary' | 'fd' | 'rent' | 'professional'>('salary')
  const [amount, setAmount] = useState(1000000)

  const tdsRules = {
    salary: { rate: null, label: 'As per slab', note: 'TDS on salary is deducted as per income tax slab. Use our income tax calculator for exact amount.' },
    fd: { rate: 10, threshold: 40000, label: '10%', note: 'TDS @ 10% if annual FD interest > ₹40,000 (₹50,000 for senior citizens). Submit Form 15G/15H if income below taxable limit.' },
    rent: { rate: 10, threshold: 240000, label: '10%', note: 'TDS @ 10% on rent if annual rent > ₹2,40,000. Tenant must deduct and deposit with govt.' },
    professional: { rate: 10, threshold: 30000, label: '10%', note: 'TDS @ 10% on professional/technical fees if payment > ₹30,000 p.a. (₹1L for individuals).' },
  }

  const rule = tdsRules[type]
  const tds = rule.rate ? Math.round(amount * rule.rate / 100) : 0
  const netAmount = amount - tds

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-4">TDS Calculator</h2>
          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700 block mb-2">Payment type</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'salary', label: '💼 Salary' },
                { id: 'fd', label: '🏦 FD Interest' },
                { id: 'rent', label: '🏠 Rent' },
                { id: 'professional', label: '💻 Professional fees' },
              ].map(t => (
                <button key={t.id} onClick={() => setType(t.id as any)}
                  className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-colors text-left ${type === t.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <InputField label="Annual payment amount" value={amount} onChange={setAmount} min={10000} max={10000000} step={10000} prefix="₹" />
          <div className="mt-4 bg-blue-50 rounded-xl p-4 text-xs text-blue-700">
            <p className="font-semibold mb-1">TDS rate: {rule.label}</p>
            <p>{rule.note}</p>
          </div>
        </div>
        <div className="p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">TDS breakdown</h2>
          {type === 'salary' ? (
            <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
              <p className="font-semibold text-amber-800 mb-2">Salary TDS = Income Tax / 12</p>
              <p className="text-sm text-amber-700">TDS on salary depends on your total annual income, deductions, and chosen tax regime. Use our Income Tax Calculator for the exact monthly TDS amount.</p>
              <a href="/calculators/income-tax-calculator" className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:underline">
                → Open Income Tax Calculator
              </a>
            </div>
          ) : (
            <div className="grid gap-3">
              <ResultCard label="TDS deducted" value={formatINR(tds)} highlight />
              <div className="grid grid-cols-2 gap-3">
                <ResultCard label="Gross amount" value={formatINR(amount)} />
                <ResultCard label="Net receivable" value={formatINR(netAmount)} />
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-600">
                <p className="font-semibold mb-1">How to claim TDS refund</p>
                <p>TDS deducted can be claimed as credit when filing your ITR. If your total income is below taxable limit, submit Form 15G (below 60 yrs) or Form 15H (senior citizens) to avoid TDS.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── PF / EPF CALCULATOR ───────────────────────────────────────────
export function PFCalculator() {
  const [basicSalary, setBasicSalary] = useState(30000)
  const [currentAge, setCurrentAge] = useState(28)
  const [currentPFBalance, setCurrentPFBalance] = useState(100000)
  const EPF_RATE = 8.25

  const monthlyEmployeeContrib = Math.min(basicSalary * 0.12, 1800)
  const monthlyEmployerEPF = Math.min(basicSalary * 0.0367, 550)
  const monthlyEmployerEPS = Math.min(basicSalary * 0.0833, 1250)
  const totalMonthlyContrib = monthlyEmployeeContrib + monthlyEmployerEPF

  const yearsToRetirement = 58 - currentAge
  const r = EPF_RATE / 12 / 100
  const n = yearsToRetirement * 12
  const futureFromCurrent = currentPFBalance * Math.pow(1 + EPF_RATE / 100, yearsToRetirement)
  const futureFromContrib = totalMonthlyContrib * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
  const totalCorpus = Math.round(futureFromCurrent + futureFromContrib)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-2">EPF / PF Calculator</h2>
          <div className="flex gap-2 mb-5">
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-semibold">Current EPF rate: 8.25%</span>
          </div>
          <InputField label="Basic salary (monthly)" value={basicSalary} onChange={setBasicSalary} min={5000} max={200000} step={1000} prefix="₹" />
          <InputField label="Current age" value={currentAge} onChange={setCurrentAge} min={18} max={57} suffix=" yrs" />
          <InputField label="Current EPF balance" value={currentPFBalance} onChange={setCurrentPFBalance} min={0} max={5000000} step={10000} prefix="₹" />
        </div>
        <div className="p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">EPF breakdown</h2>
          <div className="space-y-3 mb-5">
            {[
              { label: 'Your monthly contribution (12%)', value: monthlyEmployeeContrib, color: 'text-blue-600' },
              { label: 'Employer EPF (3.67%)', value: monthlyEmployerEPF, color: 'text-emerald-600' },
              { label: 'Employer EPS (8.33% → pension)', value: monthlyEmployerEPS, color: 'text-orange-600' },
              { label: 'Total monthly to EPF account', value: totalMonthlyContrib, color: 'text-gray-900', bold: true },
            ].map((r, i) => (
              <div key={i} className={`flex justify-between items-center px-4 py-2.5 rounded-xl text-sm ${r.bold ? 'bg-blue-50 font-semibold' : 'bg-gray-50'}`}>
                <span className="text-gray-600">{r.label}</span>
                <span className={r.color}>{formatINR(r.value)}/mo</span>
              </div>
            ))}
          </div>
          <ResultCard
            label={`EPF corpus at retirement (age 58)`}
            value={formatINR(totalCorpus)}
            highlight
            subLabel={`${yearsToRetirement} years to grow`}
            subValue={`@ ${EPF_RATE}% p.a.`}
          />
          <p className="text-xs text-gray-400 mt-3">* Assumes constant salary and EPF rate. Actual corpus may vary.</p>
        </div>
      </div>
    </div>
  )
}

// ── CAR LOAN EMI ──────────────────────────────────────────────────
export function CarLoanEMICalculator() {
  const [carPrice, setCarPrice] = useState(800000)
  const [downPayment, setDownPayment] = useState(200000)
  const [rate, setRate] = useState(9.5)
  const [tenure, setTenure] = useState(60)

  const loanAmount = carPrice - downPayment
  const result = useMemo(() => calculateEMI({ principal: loanAmount, annualRate: rate, tenureMonths: tenure }), [loanAmount, rate, tenure])

  const popularCars = [
    { name: 'Maruti Swift', price: 700000 },
    { name: 'Hyundai Creta', price: 1200000 },
    { name: 'Tata Nexon', price: 900000 },
    { name: 'Honda City', price: 1100000 },
  ]

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-4">Car loan details</h2>
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 mb-2">Quick fill popular cars</p>
            <div className="grid grid-cols-2 gap-2">
              {popularCars.map(c => (
                <button key={c.name} onClick={() => setCarPrice(c.price)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-colors text-left border ${carPrice === c.price ? 'border-blue-400 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                  {c.name}<br /><span className="text-gray-400">{formatINR(c.price)}</span>
                </button>
              ))}
            </div>
          </div>
          <InputField label="Car on-road price" value={carPrice} onChange={setCarPrice} min={200000} max={10000000} step={50000} prefix="₹" />
          <InputField label="Down payment" value={downPayment} onChange={setDownPayment} min={0} max={carPrice - 100000} step={25000} prefix="₹" />
          <InputField label="Interest rate" value={rate} onChange={setRate} min={7} max={20} step={0.1} suffix="%" />
          <InputField label="Loan tenure" value={tenure} onChange={setTenure} min={12} max={84} step={12} suffix=" mo" />
        </div>
        <div className="p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">Car loan breakdown</h2>
          <div className="bg-gray-50 rounded-xl p-3 mb-4 text-sm flex justify-between">
            <span className="text-gray-600">Loan amount</span>
            <span className="font-semibold">{formatINR(loanAmount)} ({((loanAmount/carPrice)*100).toFixed(0)}%)</span>
          </div>
          <div className="grid gap-3">
            <ResultCard label="Monthly EMI" value={formatINRFull(result.emi)} highlight />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Total payment" value={formatINR(result.totalPayment)} />
              <ResultCard label="Total interest" value={formatINR(result.totalInterest)} />
            </div>
          </div>
          <div className="mt-4 bg-blue-50 rounded-xl p-4 text-xs text-blue-700">
            <p className="font-semibold mb-1">💡 Car loan tip</p>
            <p>Keep your down payment at 20–30% of car price to reduce EMI burden. Banks typically finance up to 85–90% of on-road price.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── PERSONAL LOAN EMI ─────────────────────────────────────────────
export function PersonalLoanEMICalculator() {
  const [amount, setAmount] = useState(500000)
  const [rate, setRate] = useState(13)
  const [tenure, setTenure] = useState(36)

  const result = useMemo(() => calculateEMI({ principal: amount, annualRate: rate, tenureMonths: tenure }), [amount, rate, tenure])

  const bankRates = [
    { bank: 'HDFC Bank', rate: 10.5 },
    { bank: 'SBI', rate: 11.05 },
    { bank: 'ICICI Bank', rate: 10.8 },
    { bank: 'Bajaj Finance', rate: 11.0 },
    { bank: 'Axis Bank', rate: 10.49 },
  ]

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-6">Personal loan details</h2>
          <InputField label="Loan amount" value={amount} onChange={setAmount} min={50000} max={4000000} step={25000} prefix="₹" />
          <InputField label="Interest rate" value={rate} onChange={setRate} min={9} max={28} step={0.1} suffix="%" />
          <InputField label="Tenure" value={tenure} onChange={setTenure} min={12} max={84} step={12} suffix=" mo" />

          <div className="mt-4 bg-gray-50 rounded-xl p-3">
            <p className="text-xs font-semibold text-gray-500 mb-2">Current bank rates (approx)</p>
            {bankRates.map(b => (
              <div key={b.bank} className="flex justify-between text-xs py-1">
                <span className="text-gray-600">{b.bank}</span>
                <button onClick={() => setRate(b.rate)} className="font-semibold text-blue-600 hover:underline">{b.rate}%</button>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">Loan summary</h2>
          <div className="grid gap-3">
            <ResultCard label="Monthly EMI" value={formatINRFull(result.emi)} highlight />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Total payment" value={formatINR(result.totalPayment)} />
              <ResultCard label="Interest charged" value={formatINR(result.totalInterest)} subLabel="Cost of loan" subValue={`${((result.totalInterest/amount)*100).toFixed(0)}%`} />
            </div>
          </div>
          <div className="mt-4 bg-red-50 rounded-xl p-4 text-xs text-red-700 border border-red-100">
            <p className="font-semibold mb-1">⚠️ Compare before you borrow</p>
            <p>A 1% lower rate on ₹{formatINR(amount)} for {tenure} months saves ₹{formatINR(Math.round(amount * 0.01 * tenure / 12 * 0.6))} in interest. Always compare 3+ lenders.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── HOME LOAN ELIGIBILITY ─────────────────────────────────────────
export function HomeLoanEligibilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(80000)
  const [existingEMI, setExistingEMI] = useState(0)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(240)

  const maxEMI = monthlyIncome * 0.5 - existingEMI
  const r = rate / 12 / 100
  const n = tenure
  const eligibleLoan = maxEMI > 0 ? Math.round(maxEMI * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n))) : 0
  const propertyValue = Math.round(eligibleLoan / 0.8)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 border-b md:border-b-0 md:border-r border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-6">Your financial details</h2>
          <InputField label="Net monthly income" value={monthlyIncome} onChange={setMonthlyIncome} min={20000} max={1000000} step={5000} prefix="₹" />
          <InputField label="Existing monthly EMIs" value={existingEMI} onChange={setExistingEMI} min={0} max={monthlyIncome} step={1000} prefix="₹" />
          <InputField label="Home loan rate (p.a.)" value={rate} onChange={setRate} min={7} max={14} step={0.05} suffix="%" />
          <InputField label="Loan tenure" value={tenure} onChange={setTenure} min={60} max={360} step={12} suffix=" mo" />

          <div className="mt-4 bg-gray-50 rounded-xl p-3 text-xs text-gray-600">
            <p>Banks allow max 50% of income toward total EMIs (FOIR ratio).</p>
            <p className="mt-1">Available EMI capacity: <strong className="text-blue-600">{formatINR(Math.max(0, maxEMI))}/mo</strong></p>
          </div>
        </div>
        <div className="p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">Your eligibility</h2>
          <div className="grid gap-3">
            <ResultCard label="Maximum loan eligible" value={formatINR(eligibleLoan)} highlight />
            <ResultCard label="Property value you can target" value={formatINR(propertyValue)} subLabel="Assuming 80% LTV" subValue="(20% down payment)" />
            <ResultCard label="Your EMI on max loan" value={formatINR(maxEMI > 0 ? maxEMI : 0)} subLabel="= 50% of income" subValue={formatINR(monthlyIncome) + '/mo'} />
          </div>
          <div className="mt-4 bg-emerald-50 rounded-xl p-4 text-xs text-emerald-700">
            <p className="font-semibold mb-1">💡 Increase eligibility</p>
            <ul className="space-y-1">
              <li>→ Add co-applicant (spouse) income</li>
              <li>→ Close existing loans to reduce FOIR</li>
              <li>→ Maintain CIBIL score above 750</li>
              <li>→ Longer tenure = lower EMI = higher eligibility</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
