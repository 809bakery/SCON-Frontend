import '@/app/globals.css'
import type { Metadata } from 'next'

import localFont from 'next/font/local'

import Provider from '@/app/providers.tsx'

const pretendard = localFont({
  src: '../static/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

export const metadata: Metadata = {
  title: 'SCON',
  description: '당신만의 스테이지, 스콘이 연결합니다.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="kr" className={`${pretendard.variable}`}>
      <body
        className={`${pretendard.className} w-full flex justify-center items-center `}
      >
        <div className="max-w-[600px] min-w-[600px] border-l-2 border-r-2 border-[#f9f9f9]">
          <Provider>{children}</Provider>
        </div>
      </body>
    </html>
  )
}
