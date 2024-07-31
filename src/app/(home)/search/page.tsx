/* eslint-disable jsx-a11y/control-has-associated-label */

'use client'

import { useState } from 'react'

import Filter from '@/app/(home)/search/_components/Filter.tsx'
import OvenCard from '@/app/(home)/search/_components/OvenCard.tsx'
import StageCard from '@/app/(home)/search/_components/StageCard.tsx'
import Tab from '@/app/(home)/search/_components/Tab.tsx'
import SearchBar from '@/components/Searchbar/index.tsx'
import {
  OvenList,
  SearchFilterList,
  SearchTabList,
  StageList,
} from '@/constants/search/index.ts'

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
  const [activeTab, setActiveTab] = useState<string>('oven')
  const [filterQuery, setFilterQuery] = useState<string | undefined>(undefined)

  return (
    <div className="flex flex-col">
      {/* 검색바 */}
      <div className="pt-8 pb-6 px-7">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      {/* 탭 분류 */}
      <div className="w-full flex">
        {SearchTabList.map((tab) => (
          <Tab
            key={tab.id}
            name={tab.name}
            label={tab.label}
            tabCount={SearchTabList.length}
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
          <Filter
            filterQuery={filterQuery}
            setFilterQuery={setFilterQuery}
            filterList={SearchFilterList}
          />
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
