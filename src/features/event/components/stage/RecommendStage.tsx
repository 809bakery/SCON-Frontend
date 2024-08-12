'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { publicApi } from '@/api/config/publicApi.ts'
import StageList from '@/features/event/components/stage/StageList.tsx'
import { StageCategory } from '@/features/event/types/StageCategory.ts'

export default function RecommendStage() {
  const router = useRouter()
  const [category, setCategory] = useState<StageCategory>(
    'all' as StageCategory,
  )
  const { data, isLoading } = useQuery({
    queryKey: ['list_recommend', category],
    queryFn: async () => {
      const response = await publicApi.get(
        `/api/event/main/recommended-events?category=${category}`,
      )
      return response.data
    },
  })

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-2.5xl">SCON’S PICK</h1>
        <h2 className="font-medium text-base flex items-center justify-between">
          <span>스코니님을 위한 추천 스테이지 정보들을 모아봤어요!</span>
          <button
            type="button"
            onClick={() => router.push('/stage/list/pick')}
            className="text-disabled text-base font-medium px-4 py-1 rounded-xl leading-6"
          >
            더보기 &gt;
          </button>
        </h2>
      </div>

      <StageList
        category={category}
        setCategory={setCategory}
        data={data}
        isLoading={isLoading}
      />
    </div>
  )
}
