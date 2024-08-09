'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import CheckGIF from '@/static/gif/checked.gif'

function OvenSignUpSuccessPage() {
  const router = useRouter()
  return (
    <div className="flex flex-col pt-[10rem] pb-[9.125rem]">
      <div className="pb-40 flex flex-col gap-y-14 items-center justify-center">
        <Image src={CheckGIF} alt="완료이미지" />
        <p className="text-3xl">오브너 등록이 완료되었습니다.</p>
      </div>

      <div className="px-9 flex flex-col gap-y-6 text-2xl">
        <button
          type="button"
          onClick={() => router.push('/main')}
          className="py-7 flex items-center justify-center border border-primary rounded-xl"
        >
          홈 화면으로 이동하기
        </button>
        <button
          type="button"
          onClick={() => router.push('/oven/register/profile')}
          className="py-7 flex items-center justify-center bg-primary rounded-xl"
        >
          오븐 등록하러 가기
        </button>
      </div>
    </div>
  )
}

export default OvenSignUpSuccessPage
