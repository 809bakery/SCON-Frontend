'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { publicApi } from '@/api/config/publicApi.ts'
import StageList from '@/features/event/components/stage/StageList.tsx'
import { StageCategory } from '@/features/event/types/StageCategory.ts'

export default function AllStage() {
  const router = useRouter()
  const [category, setCategory] = useState<StageCategory>(
    'all' as StageCategory,
  )
  const { data, isLoading } = useQuery({
    queryKey: ['list_all', category],
    queryFn: async () => {
      const response = await publicApi.get(
        `/api/event/list?category=${category}`,
      )
      return response.data.content
    },
  })

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-2.5xl">STAGE</h1>
        <h2 className="font-medium text-base flex items-center justify-between">
          <span>등록된 스테이지 정보를 확인할 수 있어요!</span>
          <button
            type="button"
            onClick={() => router.push('/stage/list/all')}
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
        type="all"
      />
    </div>
  )
}
