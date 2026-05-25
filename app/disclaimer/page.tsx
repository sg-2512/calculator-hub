import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Disclaimer for CalcHub India financial calculators.',
}

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 text-sm text-amber-800">
        <p className="font-semibold mb-1">Important notice</p>
        <p>All calculators on CalcHub India are for informational and educational purposes only. They are not a substitute for professional financial advice.</p>
      </div>

      <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Accuracy</h2>
          <p>We strive to keep our calculators accurate and up-to-date with current tax slabs, RBI guidelines, and interest rates. However, actual results may vary based on individual circumstances, bank policies, and regulatory changes. Always verify results with your bank, financial advisor, or the official Income Tax Department portal.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No financial advice</h2>
          <p>Nothing on this website constitutes financial, investment, tax, or legal advice. The projections and results shown are estimates based on the inputs you provide. Past performance of investments does not guarantee future returns.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Affiliate disclosure</h2>
          <p>Some product recommendations on this site are affiliate links. We may earn a commission if you click through and make a purchase or apply for a product. This does not influence our calculator results or content.</p>
        </section>
      </div>
    </div>
  )
}
