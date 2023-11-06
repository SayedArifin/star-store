import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/ssr/Navbar'
import Footer from '@/components/ssr/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Star Store',
  description: 'We make your wallet cry',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="p-6 max-w-7xl m-auto min-w-[300px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
