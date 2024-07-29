'use client'

import { useState } from 'react'

import StageList from '@/features/event/components/stage/StageList.tsx'
import { StageCategory } from '@/features/event/types/StageCategory.ts'

export default function AllStage() {
  const [category, setCategory] = useState<StageCategory>('all')

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-2.5xl">STAGE</h1>
        <h2 className="font-medium text-base flex items-center justify-between">
          <span>등록된 스테이지 정보를 확인할 수 있어요!</span>
          <button
            type="button"
            className="text-disabled text-base font-medium px-4 py-1 rounded-xl leading-6"
          >
            더보기 &gt;
          </button>
        </h2>
      </div>
      <StageList category={category} setCategory={setCategory} />
    </div>
  )
}
