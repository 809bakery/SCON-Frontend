import '@/app/globals.css'
import type { Metadata } from 'next'

import localFont from 'next/font/local'

import Provider from '@/app/providers.tsx'
import A2HSModal from '@/components/a2hs/index.tsx'
import Navbar from '@/components/Navbar/index.tsx'

const pretendard = localFont({
  src: '../static/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

export const metadata: Metadata = {
  title: 'SCON',
  description: '당신만의 스테이지, 스콘이 연결합니다.',
  appleWebApp: {
    title: 'SCON',
    statusBarStyle: 'default',
    capable: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="kr"
      className={`${pretendard.variable} text-[10px] sm:text-[16px] w-full min-w-full`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/images/icon192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="512x512"
          href="/images/icon512.png"
        />
        <meta
          content="width=device-width, initial-scale=1, user-scalable=1, minimum-scale=1, maximum-scale=5"
          name="viewport"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body
        className={`${pretendard.className} w-full h-full min-h-dvh flex justify-center`}
      >
        <script src="https://cdn.iamport.kr/v1/iamport.js" async />
        <div className="w-full h-full min-h-screen max-w-[600px] sm:border-l-0.5 sm:border-r-0.5 border-border">
          <Provider>
            <Navbar />
            {children}
          </Provider>

          <A2HSModal />
        </div>
      </body>
    </html>
  )
}
