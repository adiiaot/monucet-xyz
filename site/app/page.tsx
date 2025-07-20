'use client'

import { IconLogo } from '@/components/IconLogo'
import { JetBrains_Mono } from 'next/font/google'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
})

export default function Home() {
  const router = useRouter()
  const pathname = usePathname()
  const [wallet, setWallet] = useState<string>('')

  useEffect(() => {
    setWallet(localStorage.getItem('wallet') ?? '')
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const error = params.get('error')
    const result = params.get('result')
    router.replace(pathname)

    if (error) {
      alert(error)
      return
    }

    if (result) {
      const [tx, amount] = result.split('-')

      console.log(tx)

      alert(`You received ${amount} MON!`)
    }
  }, [router, pathname])

  return (
    <>
      <header className='flex flex-col justify-center h-22'>
        <Link href='/'>
          <IconLogo />
        </Link>
      </header>

      <main className='flex flex-col px-6 w-full max-w-xl items-center gap-4 flex-1 justify-center'>
        <h1 className='font-bold text-3xl leading-none'>Claim Testnet Tokens</h1>
        <p>You can claim again every 8 hours.</p>

        <input
          className={`outline-none border font-medium border-[#7666cc] h-12 rounded-full bg-[#6e54ff1a] placeholder:text-white/15 w-full max-w-112 px-5 ${jetbrains.className}`}
          maxLength={42}
          minLength={42}
          placeholder='0x0000000000000000000000000000000000000000'
          pattern='^0x[a-fA-F0-9]{40}$'
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        />

        <div className='flex flex-col text-white/40'>
          <p>• Paste your wallet address</p>
          <p>
            • Follow creator{' '}
            <Link
              className='text-[#836ef9]'
              target='_blank'
              href='https://x.com/berzanorg'
            >
              @berzanorg
            </Link>
          </p>
          <p>• Turn on tweet notifications</p>
        </div>

        <button
          className='bg-[#6e54ff] h-12 px-8 rounded-full font-semibold text-lg w-full max-w-112 cursor-pointer disabled:cursor-not-allowed'
          onClick={() => {
            if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
              alert('Mistaken wallet address!')
            }

            localStorage.setItem('wallet', wallet)

            open(
              `https://discord.com/oauth2/authorize?client_id=1396180220674838591&response_type=code&redirect_uri=https%3A%2F%2Fapi.monucet.xyz%2Fcallback&scope=identify+guilds+guilds.members.read&state=${wallet}`,
              '_self',
            )
          }}
          disabled={wallet.length === 0}
        >
          Claim
        </button>

        <div className='flex flex-col text-white/40 text-center '>
          <p>1% = 10 MON</p>
          <p>4% = 1 MON</p>
          <p>25% = 0.25 MON</p>
          <p>75% = 0.10 MON</p>
        </div>
      </main>

      <footer className='h-22 flex flex-col items-center justify-center text-white/40 '>
        <p>You can donate the faucet.</p>
        <Link
          className='text-[#836ef9] text-sm'
          href='https://testnet.monadexplorer.com/address/0x22cca0357070B1d66b9e1566991836B2a205Bef3'
          target='_blank'
        >
          0x22cca0357070B1d66b9e1566991836B2a205Bef3
        </Link>
      </footer>
    </>
  )
}
