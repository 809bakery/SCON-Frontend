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
      className={`${pretendard.variable} text-[12px] sm:text-[16px]`}
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
        className={`${pretendard.className} w-full h-full min-h-dvh flex justify-center items-center`}
      >
        <div className="w-full h-full max-w-[600px] sm:border-l-2 sm:border-r-2 border-border">
          <Provider>{children}</Provider>
        </div>
      </body>
    </html>
  )
}
