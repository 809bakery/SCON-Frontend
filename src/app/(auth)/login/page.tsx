import Link from 'next/link'

import GoogleSVG from '@/static/svg/google-login.svg'
import KakaoSVG from '@/static/svg/kakao-login.svg'
import LogoSVG from '@/static/svg/main-icon.svg'
import NaverSVG from '@/static/svg/naver-login.svg'
import SconSVG from '@/static/svg/scon-login.svg'

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-[92px] items-center">
      <div className="w-full flex flex-col items-center gap-11">
        <p className="text-center font-bold text-2xl mt-[244px]">
          스테이지와 관객을 잇는 플랫폼,
          <br />
          <span className="text-primary">스콘</span>입니다.
        </p>
        <LogoSVG />
      </div>
      <div className="flex flex-col gap-4">
        <KakaoSVG className="cursor-pointer" />
        <NaverSVG className="cursor-pointer" />
        <GoogleSVG className="cursor-pointer" />
        <Link href="/login/email">
          <SconSVG className="cursor-pointer" />
        </Link>
        <div className="text-[#A0A0A0] text-xl flex items-center justify-end">
          <span className="cursor-pointer">아이디·비밀번호 찾기</span>
        </div>
      </div>

      <div className="text-[#A0A0A0] text-xl mb-[212px] flex gap-x-2 justify-between items-center">
        <span>아직 스콘의 회원이 아니시라면?</span>
        <strong className="font-bold cursor-pointer">회원가입</strong>
      </div>
    </div>
  )
}
