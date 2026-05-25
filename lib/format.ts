export function formatINR(amount: number): string {
  if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(2)} Cr`
  if (amount >= 100_000) return `₹${(amount / 100_000).toFixed(2)} L`
  return `₹${Math.round(amount).toLocaleString('en-IN')}`
}

export function formatINRFull(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(amount))
}

export function formatPercent(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`
}

export function formatYears(months: number): string {
  const y = Math.floor(months / 12)
  const m = months % 12
  if (m === 0) return `${y} yr`
  if (y === 0) return `${m} mo`
  return `${y} yr ${m} mo`
}