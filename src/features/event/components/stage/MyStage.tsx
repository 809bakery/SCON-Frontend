'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { StageCategory } from '@/features/event/types/StageCategory.ts'
import DummySVG from '@/static/svg/dummy/dummy-stage-contents.svg'

const USER = {
  nickname: '민정',
}

export default function MyStage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [category, setCategory] = useState<StageCategory>('all')

  const handleClick = (cat: StageCategory) => {
    setCategory(cat)
  }

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true'
    setIsAuthenticated(authStatus)
  }, [])

  const handleNavigateLogin = () => {
    if (!isAuthenticated) {
      localStorage.setItem('isAuthenticated', 'true')
      router.push('/login')
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-2.5xl">
          {isAuthenticated ? `${USER?.nickname}'s` : 'MY'} STAGE
        </h1>
        <h2 className="font-medium text-base">
          스코니님이 좋아요를 누른 스테이지들을 한 눈에 확인할 수 있어요!
        </h2>
      </div>
      {isAuthenticated ? (
        <>
          <div className="w-full flex space-x-5 justify-start pl-2 text-2xl font-normal mt-3">
            <button
              type="button"
              onClick={() => handleClick('all')}
              className={`${category === 'all' ? 'bg-primary border-2 border-primary' : 'border-2 border-[#CECCCC]'} py-2 px-5 rounded-full min-w-max`}
            >
              전체
            </button>
            <button
              type="button"
              onClick={() => handleClick('performance')}
              className={`${category === 'performance' ? 'bg-primary border-2 border-primary' : 'border-2 border-[#CECCCC]'} py-2 px-5 rounded-full min-w-max`}
            >
              공연
            </button>
            <button
              type="button"
              onClick={() => handleClick('lecture')}
              className={`${category === 'lecture' ? 'bg-primary border-2 border-primary' : 'border-2 border-[#CECCCC]'} py-2 px-5 rounded-full min-w-max`}
            >
              강연
            </button>
            <button
              type="button"
              onClick={() => handleClick('club')}
              className={`${category === 'club' ? 'bg-primary border-2 border-primary' : 'border-2 border-[#CECCCC]'} py-2 px-5 rounded-full min-w-max`}
            >
              소모임
            </button>
            <button
              type="button"
              onClick={() => handleClick('etc')}
              className={`${category === 'etc' ? 'bg-primary border-2 border-primary' : 'border-2 border-[#CECCCC]'} py-2 px-5 rounded-full min-w-max`}
            >
              기타
            </button>
          </div>
          <DummySVG className="w-full mt-9" />
          <div className="w-full flex justify-end mt-6">
            <button
              type="button"
              className="bg-lightgray-2 text-base font-medium px-4 py-1 rounded-xl leading-6"
            >
              더보기
            </button>
          </div>
        </>
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
