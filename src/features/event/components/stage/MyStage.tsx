/* eslint-disable no-nested-ternary */

'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { privateApi } from '@/api/config/privateApi.ts'
import StageList from '@/features/event/components/stage/StageList.tsx'
import { StageCategory } from '@/features/event/types/StageCategory.ts'
import { isArrayEmpty } from '@/utils/array/isArrayEmpty.ts'
import { getAccessToken } from '@/utils/cookie/index.ts'

export default function MyStage() {
  const router = useRouter()
  const [category, setCategory] = useState<StageCategory>(
    'all' as StageCategory,
  )
  const { data: user } = useQuery({
    queryKey: ['user-info'],
    queryFn: async () => {
      const response = await privateApi.get(`/api/user/info`)
      return response.data
    },
    enabled: !!getAccessToken(),
  })

  const { data: myStageList, isLoading } = useQuery({
    queryKey: ['list_my', category],
    queryFn: async () => {
      const response = await privateApi.get(
        `/api/event/main/liked-events?category=${category}`,
      )
      return response.data
    },
    enabled: !!user,
  })

  return (
    <div className="flex flex-col">
      {isLoading ? (
        <div className="flex flex-col gap-1 animate-pulse">
          <div className="h-6 bg-gray-300 rounded-md" />
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-300 rounded-md w-3/4" />
            <div className="h-4 bg-gray-300 rounded-md w-1/4" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2.5xl">
            {user ? `${user?.nickname}'s` : 'MY'} STAGE
          </h1>
          <h2 className="font-medium text-base flex items-center justify-between">
            <span>
              스코니님이 좋아요를 누른 스테이지들을 한 눈에 확인할 수 있어요!
            </span>
            {user && !isArrayEmpty(myStageList) && (
              <button
                type="button"
                className="text-disabled text-base font-medium px-4 py-1 rounded-xl leading-6"
                onClick={() => router.push('/stage/list/my')}
              >
                더보기 &gt;
              </button>
            )}
          </h2>
        </div>
      )}
      {user ? (
        <StageList
          category={category}
          setCategory={setCategory}
          isLoading={isLoading}
          data={myStageList}
          type="my"
        />
      ) : (
        <div className="w-full flex bg-yellow bg-opacity-40 justify-center items-center rounded-xl mt-5">
          <div className="flex flex-col items-center py-10 gap-5">
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
      )}
    </div>
  )
}
