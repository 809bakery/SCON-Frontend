'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  StageCategory,
  StageCategoryMap,
} from '@/features/event/types/StageCategory.ts'

export default function CategoryList() {
  const [category, setCategory] = useState<StageCategory>(
    'all' as StageCategory,
  )
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    function handleFilter() {
      const params = new URLSearchParams(searchParams)
      if (category) {
        params.set('category', category as string)
      } else {
        params.delete('category')
      }

      replace(`${pathname}?${params.toString()}`)
    }

    handleFilter()
  }, [pathname, replace, searchParams, category])

  const handleClick = (cat: StageCategory) => {
    setCategory(cat)
  }
  return (
    <>
      <button
        type="button"
        onClick={() => handleClick('all' as StageCategory)}
        className={`${category === 'all' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-5 rounded-full min-w-max`}
      >
        {StageCategoryMap.all}
      </button>
      <button
        type="button"
        onClick={() => handleClick('performance' as StageCategory)}
        className={`${category === 'performance' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-5 rounded-full min-w-max`}
      >
        {StageCategoryMap.performance}
      </button>
      <button
        type="button"
        onClick={() => handleClick('lecture' as StageCategory)}
        className={`${category === 'lecture' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-5 rounded-full min-w-max`}
      >
        {StageCategoryMap.lecture}
      </button>
      <button
        type="button"
        onClick={() => handleClick('club' as StageCategory)}
        className={`${category === 'club' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-5 rounded-full min-w-max`}
      >
        {StageCategoryMap.club}
      </button>
      <button
        type="button"
        onClick={() => handleClick('etc' as StageCategory)}
        className={`${category === 'etc' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-5 rounded-full min-w-max`}
      >
        {StageCategoryMap.etc}
      </button>
    </>
  )
}
