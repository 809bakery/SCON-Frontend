'use client'

import Image from 'next/image'
import { useState } from 'react'

import { DUMMY_OVEN_INFO } from '@/constants/oven/manage/index.ts'
import OvenCommunity from '@/features/oven/components/manage/community/index.tsx'
import OvenProfile from '@/features/oven/components/manage/profile/index.tsx'
import OvenSetting from '@/features/oven/components/manage/setting/index.tsx'
import OvenTalk from '@/features/oven/components/manage/talk/index.tsx'

export default function OvenPage() {
  const [tab, setTab] = useState<number>(0)
  return (
    <div>
      {/* header */}
      <div className="px-10 py-5 flex justify-between items-center gap-x-14">
        <Image
          src={DUMMY_OVEN_INFO.image}
          alt="oven-profile"
          className="rounded-xl w-40 h-40 object-cover"
        />
        <div className="flex flex-col gap-y-5 flex-1">
          <h3 className="text-3xl font-bold">이세계 아이돌</h3>
          <div className="flex flex-col gap-y-2">
            <p className="flex items-center">
              <span className="w-[30%]">멤버수</span>
              <span className="flex-1">{DUMMY_OVEN_INFO.headCount}명</span>
            </p>
            <p className="flex items-center">
              <span className="w-[30%]">대표</span>
              <span className="flex-1">{DUMMY_OVEN_INFO.leader}</span>
            </p>
          </div>
        </div>
      </div>

      {/* tab */}
      <div className="w-full flex justify-between items-center border-b border-border">
        <button
          type="button"
          onClick={() => setTab(0)}
          className={`py-5 text-disabled flex-1 flex items-center justify-center border-b-[.3125rem] border-transparent ${tab === 0 && 'font-bold !text-black !border-primary'}`}
        >
          프로필
        </button>
        <button
          type="button"
          onClick={() => setTab(1)}
          className={`py-5 text-disabled flex-1 flex items-center justify-center border-b-[.3125rem] border-transparent ${tab === 1 && 'font-bold !text-black !border-primary'}`}
        >
          커뮤니티
        </button>
        <button
          type="button"
          onClick={() => setTab(2)}
          className={`py-5 text-disabled flex-1 flex items-center justify-center border-b-[.3125rem] border-transparent ${tab === 2 && 'font-bold !text-black !border-primary'}`}
        >
          오븐톡
        </button>
        <button
          type="button"
          onClick={() => setTab(3)}
          className={`py-5 text-disabled flex-1 flex items-center justify-center border-b-[.3125rem] border-transparent ${tab === 3 && 'font-bold !text-black !border-primary'}`}
        >
          오븐 관리
        </button>
      </div>
      {tab === 0 && <OvenProfile />}
      {tab === 1 && <OvenCommunity />}
      {tab === 2 && <OvenTalk />}
      {tab === 3 && <OvenSetting />}
    </div>
  )
}
