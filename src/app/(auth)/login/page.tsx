import Link from 'next/link'

import A2HSModal from '@/components/a2hs/index.tsx'
import GoogleSVG from '@/static/svg/google-login.svg'
import KakaoSVG from '@/static/svg/kakao-login.svg'
import LogoSVG from '@/static/svg/main-icon.svg'
import NaverSVG from '@/static/svg/naver-login.svg'
import SconSVG from '@/static/svg/scon-login.svg'

export default function LoginPage() {
  return (
    <div className="w-full flex flex-col gap-[5.75rem] items-center">
      <div className="w-full flex flex-col items-center gap-11">
        <p className="text-center font-bold mt-[15.25rem] text-2xl">
          스테이지와 관객을 잇는 플랫폼,
          <br />
          <span className="text-primary">스콘</span>입니다.
        </p>
        <LogoSVG className="w-80 h-24" />
      </div>
      <div className="w-full px-7 flex flex-col gap-4">
        <Link
          href={`https://kauth.kakao.com/oauth/authorize?
response_type=${process.env.KAKAO_RESPONSE_TYPE}&client_id=${process.env.KAKAO_CLIENT_ID}
&redirect_uri=${process.env.KAKAO_REDIRECT_URI}`}
        >
          <KakaoSVG className="w-full cursor-pointer" />
        </Link>

        <Link
          href={`https://nid.naver.com/oauth2.0/authorize?
client_id=${process.env.NAVER_CLIENT_ID}&response_type=${process.env.NAVER_RESPONSE_TYPE}
&redirect_uri=${process.env.NAVER_REDIRECT_URI}&state=${process.env.NAVER_STATE}`}
        >
          <NaverSVG className="w-full cursor-pointer" />
        </Link>

        <Link
          href={`https://accounts.google.com/o/oauth2/v2/auth?
client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_RIDIRECT_URI}
&response_type=${process.env.GOOGLE_RESPONSE_TYPE}&scope=${process.env.GOOGLE_SCOPE}`}
        >
          <GoogleSVG className="w-full cursor-pointer" />
        </Link>
        <Link href="/login/email">
          <SconSVG className="cursor-pointer" />
        </Link>
        <div className="text-[#A0A0A0] text-xl flex items-center justify-end">
          <span className="cursor-pointer">아이디·비밀번호 찾기</span>
        </div>
      </div>

      <div className="text-[#A0A0A0] text-xl mb-[13.25rem] flex gap-x-2 justify-between items-center">
        <span>아직 스콘의 회원이 아니시라면?</span>
        <strong className="font-bold cursor-pointer">회원가입</strong>
      </div>

      <A2HSModal />
    </div>
  )
}
