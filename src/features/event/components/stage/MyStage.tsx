'use client'

import { useRouter } from 'next/navigation'

export default function MyStage() {
  const router = useRouter()
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-2xl">MY STAGE</h1>
      <h2 className="font-medium text-base">
        스코니님이 좋아요를 누른 스테이지들을 한눈에 확인할 수 있어요!
      </h2>
      <div className="w-full flex bg-yellow bg-opacity-40 justify-center items-center rounded-xl">
        <div className="flex flex-col items-center py-10 gap-4">
          <p className="font-medium text-base">
            로그인 후 이용 가능한 서비스입니다
          </p>
          <button
            type="button"
            className="bg-primary rounded-xl px-4 py-2 font-normal text-2xl"
            onClick={() => router.push('/login')}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  )
}
