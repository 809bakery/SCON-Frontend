'use client'

import { useState } from 'react'

import { StageCategory } from '@/features/event/types/StageCategory.ts'
import DummySVG from '@/static/svg/dummy-contents.svg'

export default function AllStage() {
  const [category, setCategory] = useState<StageCategory>('all')

  const handleClick = (cat: StageCategory) => {
    setCategory(cat)
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-2xl">STAGE</h1>
        <h2 className="font-medium text-base">
          등록된 스테이지 정보를 확인할 수 있어요!
        </h2>
      </div>
      <div className="w-full flex space-x-5 justify-start pl-3 text-2xl font-normal pt-5 pb-6">
        <button
          type="button"
          onClick={() => handleClick('all')}
          className={`${category === 'all' ? 'bg-primary' : 'border-2 border-[#CECCCC]'} py-2 px-5 rounded-full`}
        >
          전체
        </button>
        <button
          type="button"
          onClick={() => handleClick('performance')}
          className={`${category === 'performance' ? 'bg-primary' : 'border-2 border-[#CECCCC]'} py-2 px-5 rounded-full`}
        >
          공연
        </button>
        <button
          type="button"
          onClick={() => handleClick('lecture')}
          className={`${category === 'lecture' ? 'bg-primary' : 'border-2 border-[#CECCCC]'} py-2 px-5 rounded-full`}
        >
          강연
        </button>
        <button
          type="button"
          onClick={() => handleClick('club')}
          className={`${category === 'club' ? 'bg-primary' : 'border-2 border-[#CECCCC]'} py-2 px-5 rounded-full`}
        >
          소모임
        </button>
        <button
          type="button"
          onClick={() => handleClick('etc')}
          className={`${category === 'etc' ? 'bg-primary' : 'border-2 border-[#CECCCC]'} py-2 px-5 rounded-full`}
        >
          기타
        </button>
      </div>
      <DummySVG className="w-full" />
    </div>
  )
}
