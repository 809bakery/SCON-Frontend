import GoogleSVG from '@/static/svg/google-login.svg'
import KakaoSVG from '@/static/svg/kakao-login.svg'
import LogoSVG from '@/static/svg/main-icon.svg'
import NaverSVG from '@/static/svg/naver-login.svg'
import SconSVG from '@/static/svg/scon-login.svg'

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-[92px] items-center">
      <div className="w-full flex flex-col items-center gap-11">
        <p className="text-center font-bold text-2xl mt-[200px]">
          스테이지와 관객을 잇는 플랫폼,
          <br />
          <span className="text-primary">스콘</span>입니다.
        </p>
        <LogoSVG />
      </div>
      <div className="flex flex-col gap-4">
        <KakaoSVG />
        <NaverSVG />
        <GoogleSVG />
        <SconSVG />
      </div>
    </div>
  )
}
