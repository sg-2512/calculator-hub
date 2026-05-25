export interface EMIInputs {
  principal: number
  annualRate: number
  tenureMonths: number
}

export interface AmortizationRow {
  month: number
  emi: number
  principal: number
  interest: number
  balance: number
}

export interface EMIResult {
  emi: number
  totalPayment: number
  totalInterest: number
  amortization: AmortizationRow[]
}

export function calculateEMI(inputs: EMIInputs): EMIResult {
  const { principal, annualRate, tenureMonths } = inputs
  const r = annualRate / 12 / 100

  if (r === 0) {
    const emi = principal / tenureMonths
    return { emi, totalPayment: principal, totalInterest: 0, amortization: [] }
  }

  const pow = Math.pow(1 + r, tenureMonths)
  const emi = (principal * r * pow) / (pow - 1)

  let balance = principal
  const amortization: AmortizationRow[] = []

  for (let month = 1; month <= tenureMonths; month++) {
    const interest = balance * r
    const principalPaid = emi - interest
    balance -= principalPaid
    amortization.push({
      month,
      emi: Math.round(emi),
      principal: Math.round(principalPaid),
      interest: Math.round(interest),
      balance: Math.max(0, Math.round(balance)),
    })
  }

  return {
    emi: Math.round(emi),
    totalPayment: Math.round(emi * tenureMonths),
    totalInterest: Math.round(emi * tenureMonths - principal),
    amortization,
  }
}