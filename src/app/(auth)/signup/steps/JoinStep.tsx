'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { privateApi } from '@/api/config/privateApi.ts'
import { publicApi } from '@/api/config/publicApi.ts'
import Loader from '@/components/loader/index.tsx'
import CheckGIF from '@/static/gif/checked.gif'
import LogoSVG from '@/static/svg/logo/logo-icon.svg'
import Step5SVG from '@/static/svg/progress/progress-step5.svg'
import { setToken } from '@/utils/cookie/index.ts'

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
      const formData = new FormData()
      if (type === 'credentials') {
        formData.append('email', email)
        formData.append('password', password)
      }
      formData.append('nickname', nickname)
      if (image) formData.append('image', image)

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      if (type === 'credentials') {
        response = await publicApi.post('/api/user/sign-up', formData, config)
      } else if (type === 'social') {
        response = await privateApi.patch(
          '/api/user/edit/info',
          formData,
          config,
        )
      } else {
        throw new Error('Invalid type')
      }

      if (response.status === 200) {
        localStorage.removeItem('signupState')
        return response.status
      }
      localStorage.removeItem('signupState')
      throw new Error(`Request failed with status ${response.status}`)
    },
  })

  const router = useRouter()

  const handleMoveToMain = () => {
    if (data) {
      handleLogin()
      router.push('/main')
    } else {
      alert('회원가입에 실패했습니다.')
    }
  }

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <div>Error...</div>
  }

  const handleLogin = async () => {
    const response = await publicApi.post('/api/auth/log-in', {
      email,
      password,
    })

    if (response.status === 200) {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      const accessToken = response.data['Authorization']
      const refreshToken = response.data['Authorization-refresh']
      setToken('ACCESS_TOKEN', accessToken)
      setToken('REFRESH_TOKEN', refreshToken)
    }
  }

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
