'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import CheckGIF from '@/static/gif/checked.gif'
import LogoSVG from '@/static/svg/logo/logo-icon.svg'
import Step4SVG from '@/static/svg/progress/progress-step4.svg'

export default function JoinStep() {
  const router = useRouter()

  const handleMoveToMain = () => {
    localStorage.setItem('isAuthenticated', 'true')
    router.push('/')
  }
  return (
    <div className="h-full px-7 flex flex-col pt-14 pb-[12.5rem]">
      {/* 로고 */}
      <div className="flex flex-col gap-7">
        <LogoSVG height={60} width={196} />
        <Step4SVG />
      </div>
      <div className="w-full h-full flex flex-col gap-[12.5rem]">
        <div className="flex flex-col items-center gap-15">
          <Image src={CheckGIF} alt="check" className="mt-[7.5rem]" />
          <div className="w-full flex flex-col items-center gap-3 text-[1.75rem] font-medium leading-8">
            <span>회원가입이 완료되었습니다.</span>
            <span> 스코니가 되신 것을 환영합니다!</span>
          </div>
        </div>
        {/* 다음 단계 버튼 */}
        <button
          type="button"
          onClick={handleMoveToMain}
          className="w-full py-8 bg-primary rounded-xl font-normal text-2xl"
        >
          메인 화면으로 이동하기
        </button>
      </div>
    </div>
  )
}
