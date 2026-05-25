// ── SIP ──────────────────────────────────────────────────────────

export interface SIPResult {
  maturity: number
  invested: number
  gains: number
  yearlyData: { year: number; invested: number; value: number }[]
}

export function calculateSIP(monthly: number, annualRate: number, years: number): SIPResult {
  const n = years * 12
  const r = annualRate / 12 / 100
  const maturity = r === 0
    ? monthly * n
    : monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)

  const yearlyData = Array.from({ length: years }, (_, i) => {
    const y = i + 1
    const mn = y * 12
    const val = r === 0 ? monthly * mn : monthly * ((Math.pow(1 + r, mn) - 1) / r) * (1 + r)
    return { year: y, invested: monthly * mn, value: Math.round(val) }
  })

  return {
    maturity: Math.round(maturity),
    invested: monthly * n,
    gains: Math.round(maturity - monthly * n),
    yearlyData,
  }
}

// ── LUMPSUM ───────────────────────────────────────────────────────

export interface LumpsumResult {
  maturity: number
  gains: number
  yearlyData: { year: number; value: number }[]
}

export function calculateLumpsum(principal: number, annualRate: number, years: number): LumpsumResult {
  const r = annualRate / 100
  const maturity = principal * Math.pow(1 + r, years)
  const yearlyData = Array.from({ length: years }, (_, i) => ({
    year: i + 1,
    value: Math.round(principal * Math.pow(1 + r, i + 1)),
  }))
  return { maturity: Math.round(maturity), gains: Math.round(maturity - principal), yearlyData }
}

// ── PPF ───────────────────────────────────────────────────────────

export interface PPFResult {
  maturity: number
  totalInvested: number
  totalInterest: number
  yearlyData: { year: number; invested: number; interest: number; balance: number }[]
}

export function calculatePPF(yearlyInvestment: number, years = 15, rate = 7.1): PPFResult {
  let balance = 0
  let totalInvested = 0
  let totalInterest = 0
  const yearlyData = []

  for (let y = 1; y <= years; y++) {
    balance += yearlyInvestment
    totalInvested += yearlyInvestment
    const interest = Math.round(balance * rate / 100)
    balance += interest
    totalInterest += interest
    yearlyData.push({ year: y, invested: totalInvested, interest: totalInterest, balance })
  }

  return { maturity: balance, totalInvested, totalInterest, yearlyData }
}

// ── FD ────────────────────────────────────────────────────────────

export interface FDResult {
  maturity: number
  interest: number
  effectiveRate: number
}

export function calculateFD(principal: number, annualRate: number, years: number, compoundingFreq = 4): FDResult {
  const r = annualRate / 100
  const maturity = principal * Math.pow(1 + r / compoundingFreq, compoundingFreq * years)
  const interest = maturity - principal
  const effectiveRate = (Math.pow(1 + r / compoundingFreq, compoundingFreq) - 1) * 100
  return { maturity: Math.round(maturity), interest: Math.round(interest), effectiveRate }
}

// ── RD ────────────────────────────────────────────────────────────

export interface RDResult {
  maturity: number
  invested: number
  interest: number
}

export function calculateRD(monthly: number, annualRate: number, months: number): RDResult {
  const r = annualRate / 4 / 100
  let maturity = 0
  for (let i = 1; i <= months; i++) {
    const quartersRemaining = Math.ceil((months - i + 1) / 3)
    maturity += monthly * Math.pow(1 + r, quartersRemaining)
  }
  const invested = monthly * months
  return { maturity: Math.round(maturity), invested, interest: Math.round(maturity - invested) }
}

// ── CAGR ──────────────────────────────────────────────────────────

export function calculateCAGR(startValue: number, endValue: number, years: number): number {
  return (Math.pow(endValue / startValue, 1 / years) - 1) * 100
}

export function calculateFutureValue(present: number, cagr: number, years: number): number {
  return present * Math.pow(1 + cagr / 100, years)
}

// ── INFLATION ─────────────────────────────────────────────────────

export interface InflationResult {
  futureValue: number
  realValueOfFutureMoney: number
  purchasingPowerLoss: number
}

export function calculateInflation(present: number, inflationRate: number, years: number): InflationResult {
  const futureValue = present * Math.pow(1 + inflationRate / 100, years)
  const realValueOfFutureMoney = present / Math.pow(1 + inflationRate / 100, years)
  return {
    futureValue: Math.round(futureValue),
    realValueOfFutureMoney: Math.round(realValueOfFutureMoney),
    purchasingPowerLoss: Math.round(present - realValueOfFutureMoney),
  }
}