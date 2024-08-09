/* eslint-disable jsx-a11y/control-has-associated-label */

'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

import Filter from '@/app/(home)/search/_components/Filter.tsx'
import OvenCard from '@/app/(home)/search/_components/OvenCard.tsx'
import StageCard from '@/app/(home)/search/_components/StageCard.tsx'
import Tabs from '@/app/(home)/search/_components/Tabs.tsx'
import Loader from '@/components/loader/index.tsx'
import SearchBar from '@/components/Searchbar/index.tsx'
import {
  OvenList,
  SearchFilterList,
  StageList,
} from '@/constants/search/index.ts'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [filterQuery, setFilterQuery] = useState<string | undefined>(undefined)

  return (
    <Suspense fallback={<Loader />}>
      <div className="flex flex-col">
        {/* 검색바 */}
        <div className="pt-8 pb-6 px-7">
          <SearchBar />
        </div>
        {/* 탭 분류 */}
        <div className="w-full flex">
          <Tabs />
        </div>
        {/* 탭 === 오븐 */}
        {searchParams.get('tab') === 'oven' && (
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
        {searchParams.get('tab') === 'stage' && (
          <div className="w-full flex flex-col items-end pt-6 pb-8 px-7 relative">
            <Filter
              filterQuery={filterQuery}
              setFilterQuery={setFilterQuery}
              filterList={SearchFilterList}
            />
            <div className="w-full h-full flex flex-col gap-8 mt-8">
              {StageList.map((stage) => (
                <StageCard
                  key={stage.id}
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
    </Suspense>
  )
}
