import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Monucet | Monad Faucet',
  description: 'Monad Testnet Faucet By Berzan',
  metadataBase: new URL('https://monucet.xyz'),
  twitter: {
    card: 'summary_large_image',
    site: '@berzanorg',
    creator: '@berzanorg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} antialiased flex flex-col min-h-svh text-[white] bg-[#141126] bg-[linear-gradient(#141126,_#08070f_50%)] items-center`}
      >
        {children}
      </body>
    </html>
  )
}
