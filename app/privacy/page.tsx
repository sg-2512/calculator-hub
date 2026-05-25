import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for CalcHub India.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-8">Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">1. Information we collect</h2>
          <p>CalcHub India does not collect any personal information. All calculations happen entirely in your browser. We do not store your inputs, results, or any financial data you enter into our calculators.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">2. Cookies and analytics</h2>
          <p>We use Google Analytics to understand aggregate traffic patterns (pages visited, time on site). This data is anonymised and does not identify you personally. We may use Google AdSense to display advertisements, which uses cookies to serve relevant ads.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">3. Third-party links</h2>
          <p>Our calculators may display links to third-party financial products (loans, investments, insurance). These are affiliate links and we may earn a referral commission if you apply. We are not responsible for the privacy practices of these third-party websites.</p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-2">4. Contact</h2>
          <p>For any privacy concerns, contact us at privacy@calchub.in</p>
        </section>
      </div>
    </div>
  )
}
