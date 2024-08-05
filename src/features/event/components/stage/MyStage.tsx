'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import StageList from '@/features/event/components/stage/StageList.tsx'
import { StageCategory } from '@/features/event/types/StageCategory.ts'

interface UserType {
  nickname: string
  email: string
  image: string
  isOvener: boolean
}

export default function MyStage() {
  const router = useRouter()
  const [category, setCategory] = useState<StageCategory>('all')
  const [loginUser, setLoginUser] = useState<UserType>()

  useEffect(() => {
    setLoginUser(JSON.parse(sessionStorage.getItem('user')!))
  }, [])

  const handleNavigateLogin = () => {
    if (!loginUser) {
      router.push('/login')
    }
  }

  return (
    <div className="flex flex-col gap-x-3">
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-2.5xl">
          {loginUser ? `${loginUser?.nickname}'s` : 'MY'} STAGE
        </h1>
        <h2 className="font-medium text-base flex items-center justify-between">
          <span>
            스코니님이 좋아요를 누른 스테이지들을 한 눈에 확인할 수 있어요!
          </span>
          <button
            type="button"
            className="text-disabled text-base font-medium px-4 py-1 rounded-xl leading-6"
            onClick={() => router.push('/stage/list/my')}
          >
            더보기 &gt;
          </button>
        </h2>
      </div>
      {loginUser ? (
        <StageList category={category} setCategory={setCategory} />
      ) : (
        <div className="w-full flex bg-yellow bg-opacity-40 justify-center items-center rounded-xl">
          <div className="flex flex-col items-center py-10 gap-5">
            <p className="font-medium text-base">
              로그인 후 이용 가능한 서비스입니다
            </p>
            <button
              type="button"
              className="bg-primary rounded-xl px-4 py-2 font-normal text-2xl"
              onClick={handleNavigateLogin}
            >
              로그인
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
