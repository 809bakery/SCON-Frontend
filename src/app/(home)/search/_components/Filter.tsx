'use client'

import { useEffect, useRef, useState } from 'react'

import { FilterList } from '@/constants/search/index.ts'
import ArrowRight from '@/static/svg/arrow-right-icon.svg'

interface FilterProps {
  filterQuery: string | undefined
  setFilterQuery: (value: string) => void
}

export default function Filter({ filterQuery, setFilterQuery }: FilterProps) {
  const filterRef = useRef<HTMLDivElement>(null)
  const [openFilter, setOpenFilter] = useState<boolean>(false)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [filterRef])

  const handleChangeFilter = (filterName: string) => {
    setFilterQuery(filterName)
    setOpenFilter(false)
  }

  return (
    <div ref={filterRef}>
      <div
        role="presentation"
        className={`w-[7.5rem] h-[2.5rem] text-base leading-6 font-bold sm:font-medium border border-primary flex items-center justify-center cursor-pointer pl-1 ${openFilter ? 'rounded-t' : 'rounded'}`}
        onClick={() => setOpenFilter(!openFilter)}
      >
        <span className="">{filterQuery || '판매많은순'}</span>
        <ArrowRight className="w-4 h-4 rotate-90 mb-[.125rem]" />
      </div>
      <div
        className={`flex flex-col absolute top-16 bg-white  ${!openFilter && 'hidden'}`}
      >
        {openFilter &&
          FilterList.map((filter) => (
            <button
              type="button"
              key={filter.id}
              className={`w-[7.5rem] h-[2.5rem] font-bold sm:font-medium flex leading-6 items-center justify-center cursor-pointer px-[.375rem] ${filter.id === 1 ? 'border-r-0.5 border-l-0.5 border-b-0.5' : 'border-0.5'} border-border hover:bg-lightgray-1`}
              onClick={() => handleChangeFilter(filter.label)}
            >
              {filter.label}
            </button>
          ))}
      </div>
    </div>
  )
}
