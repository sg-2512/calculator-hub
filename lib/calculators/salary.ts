// ── TAKE-HOME SALARY ──────────────────────────────────────────────

export interface SalaryBreakdown {
  ctc: number
  basic: number
  hra: number
  specialAllowance: number
  employerPF: number
  employerESI: number
  grossSalary: number
  employeePF: number
  professionalTax: number
  tds: number
  totalDeductions: number
  inHandMonthly: number
  inHandAnnual: number
}

export function calculateSalary(ctcAnnual: number, basicPercent = 40): SalaryBreakdown {
  const basic = Math.round(ctcAnnual * (basicPercent / 100) / 12) * 12
  const monthlyBasic = basic / 12

  const employerPFMonthly = Math.min(monthlyBasic * 0.12, 1800)
  const employerPFAnnual = employerPFMonthly * 12

  const grossAnnual = ctcAnnual - employerPFAnnual
  const monthlyGross = grossAnnual / 12

  const hraMonthly = Math.round(monthlyBasic * 0.4)
  const specialAllowanceMonthly = Math.round(monthlyGross - monthlyBasic - hraMonthly)

  const employeePFMonthly = Math.min(monthlyBasic * 0.12, 1800)
  const professionalTaxMonthly = grossAnnual <= 500000 ? 0 : Math.round(2500 / 12)

  // Rough TDS: assume new regime, standard deduction 75K
  const taxableIncome = Math.max(0, grossAnnual - 75000)
  let annualTax = 0
  if (taxableIncome > 700000) {
    const slabs = [
      { limit: 400000, rate: 0 },
      { limit: 800000, rate: 0.05 },
      { limit: 1200000, rate: 0.10 },
      { limit: 1600000, rate: 0.15 },
      { limit: 2000000, rate: 0.20 },
      { limit: Infinity, rate: 0.30 },
    ]
    let prev = 0
    for (const slab of slabs) {
      if (taxableIncome <= prev) break
      annualTax += (Math.min(taxableIncome, slab.limit) - prev) * slab.rate
      prev = slab.limit
    }
    annualTax = annualTax * 1.04 // cess
  }
  const tdsMonthly = Math.round(annualTax / 12)

  const totalDeductionsMonthly = employeePFMonthly + professionalTaxMonthly + tdsMonthly
  const inHandMonthly = Math.round(monthlyGross - totalDeductionsMonthly)

  return {
    ctc: ctcAnnual,
    basic,
    hra: hraMonthly * 12,
    specialAllowance: specialAllowanceMonthly * 12,
    employerPF: employerPFAnnual,
    employerESI: 0,
    grossSalary: grossAnnual,
    employeePF: employeePFMonthly * 12,
    professionalTax: professionalTaxMonthly * 12,
    tds: tdsMonthly * 12,
    totalDeductions: totalDeductionsMonthly * 12,
    inHandMonthly,
    inHandAnnual: inHandMonthly * 12,
  }
}

// ── NPS ───────────────────────────────────────────────────────────

export interface NPSResult {
  corpus: number
  lumpsum: number // 60% of corpus (tax-free)
  annuityAmount: number // monthly pension estimate from 40%
  taxSaving: number
  yearlyData: { year: number; corpus: number }[]
}

export function calculateNPS(
  monthlyContribution: number,
  currentAge: number,
  retirementAge: number,
  expectedReturn: number, // % p.a.
  annuityRate: number, // % p.a.
  taxSlab: number // % e.g. 30
): NPSResult {
  const years = retirementAge - currentAge
  const r = expectedReturn / 12 / 100
  const n = years * 12
  const corpus = monthlyContribution * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)

  const lumpsum = corpus * 0.6
  const annuityCorpus = corpus * 0.4
  const annuityAmount = Math.round((annuityCorpus * annuityRate / 100) / 12)

  const taxSaving = Math.round(50000 * taxSlab / 100) // 80CCD(1B) benefit

  const yearlyData = Array.from({ length: years }, (_, i) => {
    const y = i + 1
    const mn = y * 12
    const val = monthlyContribution * ((Math.pow(1 + r, mn) - 1) / r) * (1 + r)
    return { year: y, corpus: Math.round(val) }
  })

  return {
    corpus: Math.round(corpus),
    lumpsum: Math.round(lumpsum),
    annuityAmount,
    taxSaving,
    yearlyData,
  }
}