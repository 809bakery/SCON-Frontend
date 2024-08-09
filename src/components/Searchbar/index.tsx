/* eslint-disable jsx-a11y/control-has-associated-label */

'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import useDebounce from '@/hooks/useDebounce.ts'
import SearchSVG from '@/static/svg/search-icon.svg'

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('')
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const debouncedValue = useDebounce<string>(searchQuery, 200)

  useEffect(() => {
    function handleSearch(keyword: string) {
      const params = new URLSearchParams(searchParams)
      if (keyword) {
        params.set('keyword', keyword)
      } else {
        params.delete('keyword')
      }

      replace(`${pathname}?${params.toString()}`)
    }
    handleSearch(debouncedValue)
  }, [debouncedValue, pathname, replace, searchParams])

  return (
    <div className="w-full border-2 border-border  rounded-xl focus-within:border-primary flex justify-between items-center px-3  py-3">
      <input
        type="text"
        name="search"
        autoComplete="off"
        placeholder="검색어를 입력해주세요."
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        className="w-full px-5 text-2xl rounded-xl outline-none"
      />
      <div className="min-w-min">
        <SearchSVG className="w-7 h-7" />
      </div>
    </div>
  )
}
