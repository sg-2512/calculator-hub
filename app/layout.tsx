// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'CalcHub India — Free Financial Calculators',
    template: '%s | CalcHub India',
  },
  description: 'Free online financial calculators for India — EMI, SIP, income tax, GST, salary, PPF, FD, and more.',
  keywords: ['financial calculator india', 'emi calculator', 'sip calculator', 'income tax calculator india'],
  metadataBase: new URL('https://calculator-hub-brown.vercel.app'),
  openGraph: {
    siteName: 'CalcHub India',
    type: 'website',
    locale: 'en_IN',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900 antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}