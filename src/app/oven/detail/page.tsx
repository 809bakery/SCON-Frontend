'use client'

import { useState } from 'react'

import Filter from '@/app/(home)/search/_components/Filter.tsx'
import OvenDetailCard from '@/app/oven/detail/OvenDetailCard.tsx'
import SearchBar from '@/components/Searchbar/index.tsx'
import { DUMMY_OVEN_DETAIL_DATA } from '@/constants/dummy.ts'
import { OvenDetailFilterList } from '@/constants/search/index.ts'

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
  const [filterQuery, setFilterQuery] = useState<string | undefined>(undefined)

  return (
    <div className="flex flex-col">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="px-7 pt-6 pb-8 relative flex flex-col items-end">
        <Filter
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
          filterList={OvenDetailFilterList}
        />
        <div className="w-full flex flex-wrap items-center justify-center py-3 gap-[.625rem] mt-8">
          {DUMMY_OVEN_DETAIL_DATA.map((data) => {
            return <OvenDetailCard src={data.image} name={data.ovenName} />
          })}
        </div>
      </div>
    </div>
  )
}
