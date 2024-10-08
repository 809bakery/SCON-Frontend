'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { FilterType } from '@/constants/search/index.ts'
import ArrowRight from '@/static/svg/arrow-right-icon.svg'

interface FilterProps {
  filterList: FilterType[]
}

export default function Filter({ filterList }: FilterProps) {
  const filterRef = useRef<HTMLDivElement>(null)
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const { replace } = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const [filterQuery, setFilterQuery] = useState<string>(
    filterList.find((f) => f.name === params.get('sort'))?.label ||
      filterList[0].label,
  )

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

  useEffect(() => {
    function handleFilter(filter: string | null) {
      const urlParams = new URLSearchParams(params)
      const selectedFilter = filterList.find((f) => f.label === filter)
      if (selectedFilter) {
        urlParams.set('sort', selectedFilter?.name as string)
      } else {
        urlParams.delete('sort')
      }

      replace(`${pathname}?${urlParams.toString()}`)
    }

    handleFilter(filterQuery)
  }, [filterQuery, filterList, pathname, replace, params])

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
        <span className="">{filterQuery || filterList[0].label}</span>
        <ArrowRight className="w-4 h-4 rotate-90 mb-[.125rem]" />
      </div>
      <div
        className={`flex flex-col absolute top-16 z-50 divide-solid divide-y border-x border-b bg-white  ${!openFilter && 'hidden'}`}
      >
        {openFilter &&
          filterList.map((filter) => (
            <button
              type="button"
              key={filter.id}
              className="w-[7.5rem] h-[2.5rem] font-bold sm:font-medium flex leading-6 items-center justify-center cursor-pointer px-[.375rem]  hover:bg-lightgray-1"
              onClick={() => handleChangeFilter(filter.label)}
            >
              {filter.label}
            </button>
          ))}
      </div>
    </div>
  )
}
