'use client'

import Link from 'next/link'

import AlertButton from '@/components/AlertButton/index.tsx'
import LogoSVG from '@/static/svg/logo/logo-icon.svg'
import GoogleSVG from '@/static/svg/social/google-login.svg'
import KakaoSVG from '@/static/svg/social/kakao-login.svg'
import NaverSVG from '@/static/svg/social/naver-login.svg'
import SconSVG from '@/static/svg/social/scon-login.svg'

export default function LoginPage() {
  return (
    <div className="w-full flex flex-col gap-23 items-center">
      <div className="w-full flex flex-col items-center gap-11">
        <p className="text-center font-bold mt-49 text-2xl">
          스테이지와 관객을 잇는 플랫폼,
          <br />
          <span className="text-primary">스콘</span>입니다.
        </p>
        <LogoSVG className="w-80 h-24" />
      </div>
      {/* 로그인 */}
      <div className="w-full px-7 flex flex-col gap-4">
        <Link
          href={`https://kauth.kakao.com/oauth/authorize?
response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}
&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`}
        >
          <KakaoSVG className="w-full h-[4.8125rem] cursor-pointer" />
        </Link>

        <Link
          href={`https://nid.naver.com/oauth2.0/authorize?
client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&response_type=code
&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}&state=1`}
        >
          <NaverSVG className="w-full h-[4.8125rem] cursor-pointer" />
        </Link>

        <Link
          href={`https://accounts.google.com/o/oauth2/v2/auth?
client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}
&response_type=code&scope=email+profile`}
        >
          <GoogleSVG className="w-full h-[4.8125rem] cursor-pointer" />
        </Link>
        <Link href="/login/email">
          <SconSVG className="w-full h-[4.8125rem] cursor-pointer" />
        </Link>
        <div className="text-disabled text-xl flex items-center justify-end">
          <AlertButton text="아이디·비밀번호 찾기" />
        </div>
      </div>
      <div className="text-disabled text-xl mb-36 flex gap-x-2 justify-between items-center">
        <span>아직 스콘의 회원이 아니시라면?</span>
        <Link href="/signup/basic" className="font-bold cursor-pointer">
          회원가입
        </Link>
      </div>
    </div>
  )
}
