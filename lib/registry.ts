import type { CalculatorMeta } from '@/types/calculator'

export const calculators: CalculatorMeta[] = [
  // ── LOAN ──────────────────────────────────────────────────────
  {
    slug: 'emi-calculator',
    title: 'EMI Calculator',
    shortTitle: 'EMI',
    description: 'Calculate your monthly EMI for home loan, car loan, or personal loan instantly with amortization schedule.',
    category: 'loan',
    icon: '🏠',
    keywords: ['emi calculator', 'home loan emi calculator', 'loan emi calculator india', 'monthly emi calculator'],
    relatedProducts: ['hdfc-home-loan', 'sbi-home-loan', 'bajaj-finance'],
    relatedCalculators: ['sip-calculator', 'income-tax-calculator', 'salary-calculator'],
    faqs: [
      { q: 'What is EMI?', a: 'EMI (Equated Monthly Instalment) is the fixed amount you pay every month to repay a loan. It includes both principal repayment and interest.' },
      { q: 'How is EMI calculated?', a: 'EMI = [P × R × (1+R)^N] / [(1+R)^N – 1], where P = principal amount, R = monthly interest rate (annual rate ÷ 12 ÷ 100), N = tenure in months.' },
      { q: 'Does part prepayment reduce EMI or tenure?', a: 'Most banks allow you to choose. Reducing tenure saves more interest overall. Reducing EMI improves monthly cash flow.' },
      { q: 'What is a good EMI to income ratio?', a: 'Banks typically prefer your total EMI burden to be under 40–50% of your net monthly income.' },
    ]
  },
  {
    slug: 'sip-calculator',
    title: 'SIP Calculator',
    shortTitle: 'SIP',
    description: 'Calculate your SIP returns and see how your monthly investment grows into wealth over time.',
    category: 'investment',
    icon: '📈',
    keywords: ['sip calculator', 'sip returns calculator', 'mutual fund sip calculator india', 'monthly sip calculator'],
    relatedProducts: ['zerodha', 'groww', 'coin-zerodha'],
    relatedCalculators: ['lumpsum-calculator', 'ppf-calculator', 'emi-calculator'],
    faqs: [
      { q: 'What is SIP?', a: 'SIP (Systematic Investment Plan) lets you invest a fixed amount in mutual funds every month, building wealth through compounding over time.' },
      { q: 'How much should I invest in SIP to get ₹1 crore?', a: 'To accumulate ₹1 crore in 15 years at 12% expected returns, you need to invest approximately ₹20,000/month via SIP.' },
      { q: 'Is SIP better than FD?', a: 'SIP in equity mutual funds historically delivers 12–15% returns over long periods, much higher than FD rates of 6–7%. However SIP carries market risk.' },
      { q: 'Can I increase my SIP amount every year?', a: 'Yes — this is called Step-Up SIP. Increasing by 10–15% annually dramatically accelerates wealth creation.' },
    ]
  },
  {
    slug: 'lumpsum-calculator',
    title: 'Lumpsum Calculator',
    shortTitle: 'Lumpsum',
    description: 'Calculate returns on a one-time lumpsum investment in mutual funds or other instruments.',
    category: 'investment',
    icon: '💰',
    keywords: ['lumpsum calculator', 'one time investment calculator', 'lumpsum investment returns india'],
    relatedProducts: ['zerodha', 'groww'],
    relatedCalculators: ['sip-calculator', 'fd-calculator', 'cagr-calculator'],
    faqs: [
      { q: 'Lumpsum vs SIP — which is better?', a: 'Lumpsum is better when markets are low. SIP is better for averaging cost over time. Most experts recommend SIP for salaried investors.' },
      { q: 'What is the average return for lumpsum investment?', a: 'Equity mutual funds have historically delivered 12–15% CAGR over 10+ year periods in India.' },
    ]
  },
  {
    slug: 'ppf-calculator',
    title: 'PPF Calculator',
    shortTitle: 'PPF',
    description: 'Calculate your PPF maturity amount and year-by-year growth at the current interest rate of 7.1%.',
    category: 'investment',
    icon: '🏛️',
    keywords: ['ppf calculator', 'ppf maturity calculator', 'public provident fund calculator india'],
    relatedProducts: ['hdfc-bank', 'sbi-ppf'],
    relatedCalculators: ['fd-calculator', 'nps-calculator', 'sip-calculator'],
    faqs: [
      { q: 'What is the current PPF interest rate?', a: 'The current PPF interest rate is 7.1% per annum, compounded annually. It is declared by the Government of India every quarter.' },
      { q: 'How much can I invest in PPF per year?', a: 'Minimum ₹500 and maximum ₹1.5 lakh per financial year.' },
      { q: 'Is PPF interest tax-free?', a: 'Yes — PPF enjoys EEE (Exempt-Exempt-Exempt) status. Investment, interest, and maturity are all tax-free.' },
    ]
  },
  {
    slug: 'fd-calculator',
    title: 'FD Calculator',
    shortTitle: 'FD',
    description: 'Calculate Fixed Deposit maturity amount for any bank with quarterly or monthly compounding.',
    category: 'investment',
    icon: '🏦',
    keywords: ['fd calculator', 'fixed deposit calculator', 'fd interest calculator india', 'bank fd calculator'],
    relatedProducts: ['hdfc-bank', 'sbi-fd'],
    relatedCalculators: ['rd-calculator', 'ppf-calculator', 'sip-calculator'],
    faqs: [
      { q: 'How is FD interest calculated?', a: 'FD interest = P × (1 + R/N)^(N×T) where P = principal, R = annual rate/100, N = compounding frequency per year, T = years.' },
      { q: 'Which bank offers the highest FD rate?', a: 'Small finance banks like AU Small Finance Bank and Ujjivan typically offer 8–9% FD rates, higher than major banks.' },
    ]
  },
  {
    slug: 'rd-calculator',
    title: 'RD Calculator',
    shortTitle: 'RD',
    description: 'Calculate Recurring Deposit maturity amount for any tenure and interest rate.',
    category: 'investment',
    icon: '🔁',
    keywords: ['rd calculator', 'recurring deposit calculator', 'rd maturity calculator india'],
    relatedProducts: ['hdfc-bank', 'sbi-rd'],
    relatedCalculators: ['fd-calculator', 'sip-calculator', 'ppf-calculator'],
    faqs: [
      { q: 'What is the difference between RD and SIP?', a: 'RD is a bank product with fixed, guaranteed returns (typically 6–7%). SIP is a mutual fund product with market-linked, historically higher returns (12–15%).' },
    ]
  },
  // ── TAX ───────────────────────────────────────────────────────
  {
    slug: 'income-tax-calculator',
    title: 'Income Tax Calculator',
    shortTitle: 'Income Tax',
    description: 'Calculate your income tax for FY 2025-26 under both new and old tax regime and find which saves more.',
    category: 'tax',
    icon: '📋',
    keywords: ['income tax calculator', 'income tax calculator 2025-26', 'new tax regime calculator', 'old vs new tax regime'],
    relatedProducts: ['cleartax', 'tax-spanner', 'zerodha-coin'],
    relatedCalculators: ['hra-calculator', 'salary-calculator', 'nps-calculator'],
    faqs: [
      { q: 'Which tax regime is better — old or new?', a: 'New regime is better if you have fewer deductions. If you claim 80C (₹1.5L), 80D, HRA, and home loan interest totalling ₹3L+, the old regime usually saves more tax.' },
      { q: 'What is the income tax slab for ₹12 lakh salary?', a: 'Under the new regime with standard deduction, effective tax on ₹12L gross salary is approximately ₹80,000 after cess.' },
      { q: 'Is standard deduction available in new tax regime?', a: 'Yes — ₹75,000 standard deduction is available for salaried individuals under the new tax regime from FY 2024-25.' },
    ]
  },
  {
    slug: 'gst-calculator',
    title: 'GST Calculator',
    shortTitle: 'GST',
    description: 'Add or remove GST from any amount. Calculate CGST, SGST, and IGST for all GST rates.',
    category: 'tax',
    icon: '🧾',
    keywords: ['gst calculator', 'gst calculator india', 'add gst calculator', 'remove gst calculator'],
    relatedProducts: ['cleartax', 'zoho-books'],
    relatedCalculators: ['income-tax-calculator', 'salary-calculator'],
    faqs: [
      { q: 'What are the GST rates in India?', a: 'GST rates are 0%, 5%, 12%, 18%, and 28%. Most services are at 18%. Essential goods are at 0–5%.' },
      { q: 'What is the difference between CGST, SGST, and IGST?', a: 'For intra-state transactions: CGST + SGST each = half the GST rate. For inter-state: IGST = full GST rate.' },
    ]
  },
  {
    slug: 'hra-calculator',
    title: 'HRA Exemption Calculator',
    shortTitle: 'HRA',
    description: 'Calculate your HRA (House Rent Allowance) tax exemption under section 10(13A).',
    category: 'tax',
    icon: '🏡',
    keywords: ['hra calculator', 'hra exemption calculator', 'house rent allowance calculator india'],
    relatedProducts: ['cleartax', 'housing-com'],
    relatedCalculators: ['income-tax-calculator', 'salary-calculator', 'emi-calculator'],
    faqs: [
      { q: 'How is HRA exemption calculated?', a: 'HRA exempt = minimum of: (1) actual HRA received, (2) rent paid − 10% of basic salary, (3) 50% of basic for metro cities or 40% for non-metro.' },
      { q: 'Is HRA available in new tax regime?', a: 'No — HRA exemption is only available under the old tax regime.' },
    ]
  },
  // ── SALARY ────────────────────────────────────────────────────
  {
    slug: 'salary-calculator',
    title: 'Take-Home Salary Calculator',
    shortTitle: 'Salary',
    description: 'Calculate your exact in-hand salary from CTC. Includes PF, professional tax, and TDS deductions.',
    category: 'salary',
    icon: '💼',
    keywords: ['salary calculator india', 'ctc to take home calculator', 'in hand salary calculator', 'net salary calculator india'],
    relatedProducts: ['cleartax', 'zerodha'],
    relatedCalculators: ['income-tax-calculator', 'hra-calculator', 'nps-calculator'],
    faqs: [
      { q: 'How is take-home salary calculated from CTC?', a: 'In-hand = Gross salary − Employee PF (12% of basic) − Professional tax − TDS. Gross = CTC − Employer PF − Employer ESI (if applicable).' },
      { q: 'What percentage of CTC is take-home?', a: 'Typically 65–80% of CTC is take-home, depending on your tax slab, city, and company structure.' },
    ]
  },
  {
    slug: 'nps-calculator',
    title: 'NPS Calculator',
    shortTitle: 'NPS',
    description: 'Calculate NPS corpus at retirement and monthly pension. Includes tax saving of up to ₹2 lakh.',
    category: 'salary',
    icon: '👴',
    keywords: ['nps calculator', 'national pension scheme calculator', 'nps returns calculator india'],
    relatedProducts: ['hdfc-nps', 'sbi-nps'],
    relatedCalculators: ['ppf-calculator', 'income-tax-calculator', 'sip-calculator'],
    faqs: [
      { q: 'How much tax can I save with NPS?', a: 'Up to ₹2 lakh — ₹1.5L under 80C + extra ₹50,000 under 80CCD(1B). At 30% bracket this saves ₹62,400/year in taxes.' },
      { q: 'What is the expected return from NPS?', a: 'NPS equity (E) fund has delivered 12–14% CAGR historically. Balanced portfolios (50E:50C) average 10–12%.' },
    ]
  },
  {
    slug: 'gratuity-calculator',
    title: 'Gratuity Calculator',
    shortTitle: 'Gratuity',
    description: 'Calculate your gratuity amount based on last salary and years of service as per the Payment of Gratuity Act.',
    category: 'salary',
    icon: '🎁',
    keywords: ['gratuity calculator', 'gratuity calculator india', 'gratuity amount calculator'],
    relatedProducts: ['cleartax'],
    relatedCalculators: ['salary-calculator', 'income-tax-calculator'],
    faqs: [
      { q: 'How is gratuity calculated?', a: 'Gratuity = (Last drawn basic salary + DA) × 15/26 × number of years of service. Applicable after minimum 5 years.' },
      { q: 'Is gratuity taxable?', a: 'Gratuity up to ₹20 lakh is fully exempt from income tax for private sector employees under the Gratuity Act.' },
    ]
  },
  // ── UTILITY ───────────────────────────────────────────────────
  {
    slug: 'cagr-calculator',
    title: 'CAGR Calculator',
    shortTitle: 'CAGR',
    description: 'Calculate Compound Annual Growth Rate of any investment. Find CAGR from start and end values.',
    category: 'investment',
    icon: '📊',
    keywords: ['cagr calculator', 'compound annual growth rate calculator', 'investment cagr calculator india'],
    relatedProducts: ['zerodha', 'groww'],
    relatedCalculators: ['sip-calculator', 'lumpsum-calculator', 'fd-calculator'],
    faqs: [
      { q: 'What is a good CAGR for investments?', a: 'Equity mutual funds: 12–15% CAGR is considered good. FDs: 6–7%. Real estate: 8–10% in India historically.' },
    ]
  },
  {
    slug: 'inflation-calculator',
    title: 'Inflation Calculator',
    shortTitle: 'Inflation',
    description: 'Find the real value of money after inflation. Calculate how much ₹1 lakh today will be worth in future.',
    category: 'utility',
    icon: '📉',
    keywords: ['inflation calculator india', 'real value of money calculator', 'purchasing power calculator'],
    relatedProducts: ['zerodha', 'groww'],
    relatedCalculators: ['sip-calculator', 'ppf-calculator', 'nps-calculator'],
    faqs: [
      { q: 'What is India\'s average inflation rate?', a: 'India\'s long-term average CPI inflation is around 5–6% per year. Recent years have seen 4–7%.' },
    ]
  },
]

export const categoryLabels: Record<string, string> = {
  loan: 'Loan',
  investment: 'Investment',
  tax: 'Tax',
  salary: 'Salary & HR',
  utility: 'Tools',
}

export function getCalculatorBySlug(slug: string) {
  return calculators.find(c => c.slug === slug)
}