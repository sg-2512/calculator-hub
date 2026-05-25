// ── INCOME TAX ────────────────────────────────────────────────────

export interface TaxSlabDetail {
  range: string
  rate: string
  taxable: number
  tax: number
}

export interface IncomeTaxResult {
  taxableIncome: number
  basicTax: number
  cess: number
  totalTax: number
  effectiveRate: number
  slabDetails: TaxSlabDetail[]
}

export function calcIncomeTaxNewRegime(grossIncome: number): IncomeTaxResult {
  const standardDeduction = 75000
  const taxableIncome = Math.max(0, grossIncome - standardDeduction)

  const slabs = [
    { limit: 400000, rate: 0, label: '0 – 4L' },
    { limit: 800000, rate: 0.05, label: '4L – 8L' },
    { limit: 1200000, rate: 0.10, label: '8L – 12L' },
    { limit: 1600000, rate: 0.15, label: '12L – 16L' },
    { limit: 2000000, rate: 0.20, label: '16L – 20L' },
    { limit: Infinity, rate: 0.30, label: '20L+' },
  ]

  let tax = 0
  let prev = 0
  const slabDetails: TaxSlabDetail[] = []

  for (const slab of slabs) {
    if (taxableIncome <= prev) break
    const taxableInSlab = Math.min(taxableIncome, slab.limit) - prev
    const taxInSlab = taxableInSlab * slab.rate
    tax += taxInSlab
    if (taxableInSlab > 0) {
      slabDetails.push({
        range: slab.label,
        rate: `${slab.rate * 100}%`,
        taxable: taxableInSlab,
        tax: Math.round(taxInSlab),
      })
    }
    prev = slab.limit
  }

  // Section 87A rebate: if taxable income ≤ 7L, tax = 0
  if (taxableIncome <= 700000) tax = 0

  const cess = Math.round(tax * 0.04)
  const totalTax = Math.round(tax + cess)

  return {
    taxableIncome,
    basicTax: Math.round(tax),
    cess,
    totalTax,
    effectiveRate: grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0,
    slabDetails,
  }
}

export function calcIncomeTaxOldRegime(
  grossIncome: number,
  deductions80C = 0,
  deductions80D = 0,
  hra = 0,
  homeLoanInterest = 0,
  otherDeductions = 0
): IncomeTaxResult {
  const standardDeduction = 50000
  const totalDeductions = Math.min(deductions80C, 150000) + Math.min(deductions80D, 25000) +
    hra + Math.min(homeLoanInterest, 200000) + otherDeductions + standardDeduction
  const taxableIncome = Math.max(0, grossIncome - totalDeductions)

  const slabs = [
    { limit: 250000, rate: 0, label: '0 – 2.5L' },
    { limit: 500000, rate: 0.05, label: '2.5L – 5L' },
    { limit: 1000000, rate: 0.20, label: '5L – 10L' },
    { limit: Infinity, rate: 0.30, label: '10L+' },
  ]

  let tax = 0
  let prev = 0
  const slabDetails: TaxSlabDetail[] = []

  for (const slab of slabs) {
    if (taxableIncome <= prev) break
    const taxableInSlab = Math.min(taxableIncome, slab.limit) - prev
    const taxInSlab = taxableInSlab * slab.rate
    tax += taxInSlab
    if (taxableInSlab > 0) {
      slabDetails.push({ range: slab.label, rate: `${slab.rate * 100}%`, taxable: taxableInSlab, tax: Math.round(taxInSlab) })
    }
    prev = slab.limit
  }

  if (taxableIncome <= 500000) tax = 0

  const cess = Math.round(tax * 0.04)
  const totalTax = Math.round(tax + cess)

  return {
    taxableIncome,
    basicTax: Math.round(tax),
    cess,
    totalTax,
    effectiveRate: grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0,
    slabDetails,
  }
}

// ── GST ───────────────────────────────────────────────────────────

export interface GSTResult {
  baseAmount: number
  gstAmount: number
  totalAmount: number
  cgst: number
  sgst: number
  igst: number
}

export function calculateGST(amount: number, rate: number, isInclusive: boolean, isInterState: boolean): GSTResult {
  const baseAmount = isInclusive ? amount / (1 + rate / 100) : amount
  const gstAmount = baseAmount * (rate / 100)
  const totalAmount = baseAmount + gstAmount

  return {
    baseAmount: Math.round(baseAmount * 100) / 100,
    gstAmount: Math.round(gstAmount * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    cgst: isInterState ? 0 : Math.round(gstAmount / 2 * 100) / 100,
    sgst: isInterState ? 0 : Math.round(gstAmount / 2 * 100) / 100,
    igst: isInterState ? Math.round(gstAmount * 100) / 100 : 0,
  }
}

// ── HRA ───────────────────────────────────────────────────────────

export interface HRAResult {
  actualHRA: number
  rentMinus10Percent: number
  percentOfBasic: number
  exemption: number
  taxableHRA: number
}

export function calculateHRA(basic: number, hraReceived: number, rentPaid: number, isMetro: boolean): HRAResult {
  const rentMinus10Percent = Math.max(0, rentPaid - 0.1 * basic)
  const percentOfBasic = basic * (isMetro ? 0.5 : 0.4)
  const exemption = Math.min(hraReceived, rentMinus10Percent, percentOfBasic)
  return {
    actualHRA: hraReceived,
    rentMinus10Percent,
    percentOfBasic,
    exemption: Math.round(exemption),
    taxableHRA: Math.round(hraReceived - exemption),
  }
}

// ── GRATUITY ──────────────────────────────────────────────────────

export interface GratuityResult {
  gratuity: number
  taxExempt: number
  taxable: number
}

export function calculateGratuity(lastBasicPlusDA: number, yearsOfService: number): GratuityResult {
  const gratuity = (lastBasicPlusDA * 15 * yearsOfService) / 26
  const taxExempt = Math.min(gratuity, 2000000)
  return {
    gratuity: Math.round(gratuity),
    taxExempt: Math.round(taxExempt),
    taxable: Math.round(Math.max(0, gratuity - 2000000)),
  }
}