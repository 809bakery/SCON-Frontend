'use client'

import { useState } from 'react'

import { StageCategory } from '@/features/event/types/StageCategory.ts'
import DummySVG from '@/static/svg/dummy-contents.svg'

export default function RecommendStage() {
  const [category, setCategory] = useState<StageCategory>('all')

  const handleClick = (cat: StageCategory) => {
    setCategory(cat)
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-2.5xl">SCON’S PICK</h1>
        <h2 className="font-medium text-base">
          스코니님을 위한 추천 스테이지 정보들을 모아봤어요!
        </h2>
      </div>
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
    </div>
  )
}
