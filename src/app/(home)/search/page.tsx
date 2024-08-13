/* eslint-disable jsx-a11y/control-has-associated-label */

'use client'

import { useSearchParams } from 'next/navigation'

import Filter from '@/app/(home)/search/_components/Filter.tsx'
import OvenList from '@/app/(home)/search/_components/OvenList.tsx'
import StageList from '@/app/(home)/search/_components/StageList.tsx'
import Tabs from '@/app/(home)/search/_components/Tabs.tsx'
import SearchBar from '@/components/Searchbar/index.tsx'
import { SearchFilterList } from '@/constants/search/index.ts'

export default function SearchPage() {
  const searchParams = useSearchParams()

  return (
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
          <OvenList />
        </div>
      )}
      {/* 탭 === 스테이지 */}
      {searchParams.get('tab') === 'stage' && (
        <div className="w-full flex flex-col items-end pt-6 pb-8 px-7 relative">
          <Filter filterList={SearchFilterList} />
          <div className="w-full h-full flex flex-col gap-8 mt-8">
            <StageList />
          </div>
        </div>
      )}
    </div>
  )
}
