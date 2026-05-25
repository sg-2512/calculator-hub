'use client'
import dynamic from 'next/dynamic'

const EMICalculator = dynamic(() => import('./EMICalculator'), { ssr: false })
const SIPCalculator = dynamic(() => import('./SIPCalculator'), { ssr: false })
const IncomeTaxCalculator = dynamic(() => import('./IncomeTaxCalculator'), { ssr: false })
const GSTCalculator = dynamic(() => import('./GSTCalculator'), { ssr: false })
const SalaryCalculator = dynamic(() => import('./SalaryCalculator'), { ssr: false })
const PPFCalculator = dynamic(() => import('./PPFCalculator'), { ssr: false })
const FDCalculator = dynamic(() => import('./FDCalculator'), { ssr: false })
const RDCalculator = dynamic(() => import('./OtherCalculators').then(m => ({ default: m.RDCalculator })), { ssr: false })
const LumpsumCalculator = dynamic(() => import('./OtherCalculators').then(m => ({ default: m.LumpsumCalculator })), { ssr: false })
const CAGRCalculator = dynamic(() => import('./OtherCalculators').then(m => ({ default: m.CAGRCalculator })), { ssr: false })
const InflationCalculator = dynamic(() => import('./OtherCalculators').then(m => ({ default: m.InflationCalculator })), { ssr: false })
const HRACalculator = dynamic(() => import('./OtherCalculators').then(m => ({ default: m.HRACalculator })), { ssr: false })
const GratuityCalculator = dynamic(() => import('./OtherCalculators').then(m => ({ default: m.GratuityCalculator })), { ssr: false })
const NPSCalculator = dynamic(() => import('./OtherCalculators').then(m => ({ default: m.NPSCalculator })), { ssr: false })
const SimpleInterestCalculator = dynamic(() => import('./SimpleCalculators').then(m => ({ default: m.SimpleInterestCalculator })), { ssr: false })
const CompoundInterestCalculator = dynamic(() => import('./SimpleCalculators').then(m => ({ default: m.CompoundInterestCalculator })), { ssr: false })
const TDSCalculator = dynamic(() => import('./SimpleCalculators').then(m => ({ default: m.TDSCalculator })), { ssr: false })
const PFCalculator = dynamic(() => import('./SimpleCalculators').then(m => ({ default: m.PFCalculator })), { ssr: false })
const CarLoanEMICalculator = dynamic(() => import('./SimpleCalculators').then(m => ({ default: m.CarLoanEMICalculator })), { ssr: false })
const PersonalLoanEMICalculator = dynamic(() => import('./SimpleCalculators').then(m => ({ default: m.PersonalLoanEMICalculator })), { ssr: false })
const HomeLoanEligibilityCalculator = dynamic(() => import('./SimpleCalculators').then(m => ({ default: m.HomeLoanEligibilityCalculator })), { ssr: false })

const widgetMap: Record<string, React.ComponentType> = {
  'emi-calculator': EMICalculator,
  'sip-calculator': SIPCalculator,
  'income-tax-calculator': IncomeTaxCalculator,
  'gst-calculator': GSTCalculator,
  'salary-calculator': SalaryCalculator,
  'ppf-calculator': PPFCalculator,
  'fd-calculator': FDCalculator,
  'rd-calculator': RDCalculator,
  'lumpsum-calculator': LumpsumCalculator,
  'cagr-calculator': CAGRCalculator,
  'inflation-calculator': InflationCalculator,
  'hra-calculator': HRACalculator,
  'gratuity-calculator': GratuityCalculator,
  'nps-calculator': NPSCalculator,
  'simple-interest-calculator': SimpleInterestCalculator,
  'compound-interest-calculator': CompoundInterestCalculator,
  'tds-calculator': TDSCalculator,
  'pf-calculator': PFCalculator,
  'car-loan-emi-calculator': CarLoanEMICalculator,
  'personal-loan-emi-calculator': PersonalLoanEMICalculator,
  'home-loan-eligibility-calculator': HomeLoanEligibilityCalculator,
}

export default function CalculatorWidget({ slug }: { slug: string }) {
  const Widget = widgetMap[slug]
  if (!Widget) return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-amber-700 text-sm">
      Calculator coming soon. Check back shortly!
    </div>
  )
  return <Widget />
}
