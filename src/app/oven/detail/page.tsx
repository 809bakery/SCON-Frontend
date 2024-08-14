'use client'

import Filter from '@/app/(home)/search/_components/Filter.tsx'
import OvenDetailList from '@/app/oven/detail/_components/OvenDetailList.tsx'
import SearchBar from '@/components/Searchbar/index.tsx'
import { OvenDetailFilterList } from '@/constants/search/index.ts'

export default function Navbar() {
  return (
    <div className="flex flex-col">
      <div className="pt-8 px-7">
        <SearchBar />
      </div>
      <div className="px-7 pt-6 pb-8 relative flex flex-col items-end">
        <Filter filterList={OvenDetailFilterList} />
        <div className="w-full flex flex-wrap items-center justify-center py-3 gap-[.625rem] mt-8">
          <OvenDetailList />
        </div>
      </div>
    </div>
  )
}
