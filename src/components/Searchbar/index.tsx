/* eslint-disable jsx-a11y/control-has-associated-label */

'use client'

import SearchSVG from '@/static/svg/search-icon.svg'

interface SearchBarProps {
  searchQuery: string | undefined
  setSearchQuery: (value: string) => void
}

export default function SearchBar({
  searchQuery,
  setSearchQuery,
}: SearchBarProps) {
  return (
    <div className="mt-8 mx-7 border-2 border-border  rounded-xl focus-within:border-primary flex justify-between items-center px-3  py-4">
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
