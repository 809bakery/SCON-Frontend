'use client'

import { useRouter } from 'next/navigation'

import LogoSVG from '@/static/svg/logo/logo-icon.svg'
import Step3SVG from '@/static/svg/progress/progress-step3.svg'
import Required from '@/static/svg/required-star.svg'

export default function MoreInfoStep() {
  const router = useRouter()
  return (
    <div className="h-full px-7 flex flex-col justify-between pt-14 pb-[7.5rem]">
      <div>
        {/* 로고 */}
        <div className="flex flex-col gap-7">
          <LogoSVG height={60} width={196} />
          <Step3SVG className="w-80" />
        </div>
        <div className="mt-16 flex flex-col gap-5">
          <h2 className="font-medium text-[2rem]">
            예매 및 공연 진행자로 등록하려면
            <br />
            본인 인증이 필요해요.
          </h2>
          <label htmlFor="email" className="font-normal text-xl flex space-x-1">
            <Required />
            <span>
              본인인증을 해야만 추후 아이디 찾기 기능을 사용할 수 있어요.
            </span>
          </label>
          {/* 다음 단계 버튼 */}
          <div className="flex flex-col mt-[7.5rem] gap-7">
            <button
              type="button"
              className="bg-primary text-2xl font-medium py-14 rounded-xl"
              onClick={() => router.push('/signup/push')}
            >
              일단 둘러볼게요!
            </button>
            <button
              type="button"
              className="border border-primary text-2xl font-medium py-14 rounded-xl"
              onClick={() => alert('준비 중 입니다🍪')}
            >
              본인인증하기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
