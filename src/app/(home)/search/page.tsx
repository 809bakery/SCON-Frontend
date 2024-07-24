/* eslint-disable jsx-a11y/control-has-associated-label */

'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Filter from '@/app/(home)/search/_components/Filter.tsx'
import OvenCard from '@/app/(home)/search/_components/OvenCard.tsx'
import SearchBar from '@/app/(home)/search/_components/SearchBar.tsx'
import StageCard from '@/app/(home)/search/_components/StageCard.tsx'
import Tab from '@/app/(home)/search/_components/Tab.tsx'
import { OvenList, StageList, TabList } from '@/constants/search/index.ts'
import BackSVG from '@/static/svg/arrow-left-icon.svg'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
  const [activeTab, setActiveTab] = useState<'oven' | 'stage'>('oven')
  const [filterQuery, setFilterQuery] = useState<string | undefined>(undefined)
  const router = useRouter()

  return (
    <div className="flex flex-col">
      {/* 상단바 */}
      <div className="w-full h-[60px] relative flex items-center justify-center py-[14px] border-b border-[#d6d5d5] text-center text-[#565551]">
        <button
          type="button"
          onClick={() => router.back()}
          className="absolute left-7 cursor-pointer"
        >
          <BackSVG className="w-8 h-8 min-w-[24px] min-h-[24px]" />
        </button>
        <span className="font-bold text-[1.5rem]">검색</span>
      </div>
      {/* 검색바 */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {/* 탭 분류 */}
      <div className="w-full flex">
        {TabList.map((tab) => (
          <Tab
            key={tab.id}
            name={tab.name}
            label={tab.label}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      </div>
      {/* 탭 === 오븐 */}
      {activeTab === 'oven' && (
        <div className="w-full h-full px-7 pt-6 pb-8 flex flex-col gap-3">
          {OvenList.map((oven) => (
            <OvenCard
              key={oven.id}
              name={oven.name}
              image={oven.image}
              recentStage={oven.recentStage}
            />
          ))}
        </div>
      )}
      {/* 탭 === 스테이지 */}
      {activeTab === 'stage' && (
        <div className="w-full flex flex-col items-end pt-6 pb-8 px-7 relative">
          <Filter filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
          <div className="w-full h-full flex flex-col gap-8 mt-8">
            {StageList.map((stage) => (
              <StageCard
                title={stage.title}
                location={stage.location}
                time={stage.time}
                image={stage.image}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
