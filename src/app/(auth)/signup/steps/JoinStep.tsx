'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { publicApi } from '@/api/config/publicApi.ts'
import CheckGIF from '@/static/gif/checked.gif'
import LogoSVG from '@/static/svg/logo/logo-icon.svg'
import Step5SVG from '@/static/svg/progress/progress-step5.svg'

import useSignupStore from '@/store/SignupStore.ts'

export default function JoinStep() {
  const email = useSignupStore((state) => state.email)
  const password = useSignupStore((state) => state.password)
  const nickname = useSignupStore((state) => state.nickname)
  const image = useSignupStore((state) => state.image)
  const type = useSignupStore((state) => state.type)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['signup'],
    queryFn: async () => {
      let response
      const body = image
        ? { email, password, nickname, image }
        : { email, password, nickname }
      if (type === 'credentials') {
        response = await publicApi.post('/api/user/sign-up', body)
      } else if (type === 'social') {
        response = await publicApi.post('/api/user/edit/info', body)
      } else {
        throw new Error('Invalid type')
      }

      return response.status
    },
  })

  const router = useRouter()

  const handleMoveToMain = () => {
    localStorage.setItem('isAuthenticated', 'true')
    router.push('/')
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error...</div>
  }

  if (data) {
    return (
      <div className="h-full px-7 flex flex-col pt-14 pb-[12.5rem]">
        {/* 로고 */}
        <div className="flex flex-col gap-7">
          <LogoSVG height={60} width={196} />
          <Step5SVG className="w-80" />
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
}
