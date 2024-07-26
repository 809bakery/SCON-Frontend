'use client'

import { useState } from 'react'

import { DUMMY_POSTER_DATA } from '@/constants/dummy.ts'
import Card from '@/features/event/components/stage/Card/index.tsx'
import { StageCategory } from '@/features/event/types/StageCategory.ts'

export default function RecommendStage() {
  const [category, setCategory] = useState<StageCategory>('all')

  const handleClick = (cat: StageCategory) => {
    setCategory(cat)
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-2.5xl">SCON’S PICK</h1>
        <h2 className="font-medium text-base flex items-center justify-between">
          <span>스코니님을 위한 추천 스테이지 정보들을 모아봤어요!</span>
          <button
            type="button"
            className="text-disabled text-base font-medium px-4 py-1 rounded-xl leading-6"
          >
            더보기 &gt;
          </button>
        </h2>
      </div>
      <div className="w-full flex space-x-4 justify-start text-xl mt-5">
        <button
          type="button"
          onClick={() => handleClick('all')}
          className={`${category === 'all' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-6 rounded-full min-w-max`}
        >
          전체
        </button>
        <button
          type="button"
          onClick={() => handleClick('performance')}
          className={`${category === 'performance' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-6 rounded-full min-w-max`}
        >
          공연
        </button>
        <button
          type="button"
          onClick={() => handleClick('lecture')}
          className={`${category === 'lecture' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-6 rounded-full min-w-max`}
        >
          강연
        </button>
        <button
          type="button"
          onClick={() => handleClick('club')}
          className={`${category === 'club' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-6 rounded-full min-w-max`}
        >
          소모임
        </button>
        <button
          type="button"
          onClick={() => handleClick('etc')}
          className={`${category === 'etc' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-6 rounded-full min-w-max`}
        >
          기타
        </button>
      </div>
      <div className="mt-9 flex flex-wrap items-center justify-between gap-y-8 gap-x-3">
        {DUMMY_POSTER_DATA.map((data) => {
          return (
            <Card
              key={data.title}
              title={data.title}
              isEnd={data.isEnd}
              location={data.location}
              sDate={data.startDate}
              content={data.content}
              posterUrl={data.posterUrl}
            />
          )
        })}
      </div>
    </div>
  )
}
