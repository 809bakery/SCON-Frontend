'use client'

import { useEffect, useRef, useState } from 'react'

import Loader from '@/components/loader/index.tsx'
import SearchBar from '@/components/Searchbar/index.tsx'
import { DUMMY_POSTER_DATA } from '@/constants/dummy.ts'
import Card from '@/features/event/components/stage/Card/index.tsx'
import { StageCategory } from '@/features/event/types/StageCategory.ts'

export default function AllStageList() {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
  const [category, setCategory] = useState<StageCategory>('all')
  const [loading, setLoading] = useState(false)
  const loaderRef = useRef(null)

  const handleClick = (cat: StageCategory) => {
    setCategory(cat)
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0]
      if (first.isIntersecting) {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 1500)
      }
    })

    const currentLoader = loaderRef.current
    if (currentLoader) {
      observer.observe(currentLoader)
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader)
      }
    }
  }, [])

  return (
    <div className="flex flex-col py-8 px-7 items-center gap-5">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="w-full flex space-x-4 text-xl justify-center">
        <button
          type="button"
          onClick={() => handleClick('all')}
          className={`${category === 'all' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-5 rounded-full min-w-max`}
        >
          전체
        </button>
        <button
          type="button"
          onClick={() => handleClick('performance')}
          className={`${category === 'performance' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-5 rounded-full min-w-max`}
        >
          공연
        </button>
        <button
          type="button"
          onClick={() => handleClick('lecture')}
          className={`${category === 'lecture' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-5 rounded-full min-w-max`}
        >
          강연
        </button>
        <button
          type="button"
          onClick={() => handleClick('club')}
          className={`${category === 'club' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-5 rounded-full min-w-max`}
        >
          소모임
        </button>
        <button
          type="button"
          onClick={() => handleClick('etc')}
          className={`${category === 'etc' ? 'bg-primary border border-primary' : 'border border-border'} py-2 px-5 rounded-full min-w-max`}
        >
          기타
        </button>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-3 px-5 py-3">
        {DUMMY_POSTER_DATA.map((data) => {
          return (
            <Card
              key={data.title}
              title={data.title}
              location={data.location}
              sDate={data.startDate}
              content={data.content}
              posterUrl={data.posterUrl}
            />
          )
        })}
        {DUMMY_POSTER_DATA.map((data) => {
          return (
            <Card
              key={data.title}
              title={data.title}
              location={data.location}
              sDate={data.startDate}
              content={data.content}
              posterUrl={data.posterUrl}
            />
          )
        })}
        {DUMMY_POSTER_DATA.map((data) => {
          return (
            <Card
              key={data.title}
              title={data.title}
              location={data.location}
              sDate={data.startDate}
              content={data.content}
              posterUrl={data.posterUrl}
            />
          )
        })}
      </div>
      <div ref={loaderRef}>{loading && <Loader />}</div>
    </div>
  )
}
