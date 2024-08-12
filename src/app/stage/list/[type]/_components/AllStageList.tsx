/* eslint-disable no-nested-ternary */

'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { publicApi } from '@/api/config/publicApi.ts'
import CategoryList from '@/components/CategoryList.tsx'
import Loader from '@/components/loader/index.tsx'
import SearchBar from '@/components/Searchbar/index.tsx'
import Card from '@/features/event/components/stage/Card/index.tsx'

interface StageType {
  id: number
  title: string
  image: string
  detail: string
  startDate: string
  endDate: string
  status: string
  createdAt: string
  location: string
  subTitle: string
  reserveLimit: number
}

export default function AllStageList() {
  const params = useSearchParams()
  const searchParams = params.get('keyword')
  const category = params.get('category') ?? 'all'

  const loaderRef = useRef(null)
  const {
    data: stageList,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['list_all_detail', category, searchParams],
    queryFn: async ({ pageParam = null }) => {
      const keywordParam = searchParams ? `&keyword=${searchParams}` : ''
      const cursorParam = pageParam ? `&cursor=${pageParam}` : ''
      const response = await publicApi.get(
        `/api/event/search?category=${category}${cursorParam}${keywordParam}`,
      )
      return response.data
    },
    getNextPageParam: (lastPage) => {
      return lastPage.cursor === -1 ? null : lastPage.cursor
    },
    initialPageParam: null,
    select: (data) => (data?.pages ?? []).flatMap((page) => page.content),
  })

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const first = entries[0]
      if (first.isIntersecting && hasNextPage) {
        fetchNextPage()
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
  }, [hasNextPage, fetchNextPage])

  return (
    <div className="flex flex-col py-8 px-7 items-center gap-5">
      <SearchBar />
      <div className="w-full flex space-x-4 text-xl justify-center">
        <CategoryList />
      </div>
      <div className="w-full flex flex-wrap items-center justify-between gap-y-3 gap-x-3 px-5 py-3">
        {isLoading ? (
          <>
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={`skeleton-${index}`}
                className="w-[30%] rounded-xl shrink-0 flex flex-col gap-y-3 cursor-pointer animate-pulse"
              >
                <div className="relative animate-pulse w-full h-[13.75rem] rounded-xl bg-gray-200" />
                <div className="w-full flex flex-col items-start justify-center gap-y-1 px-2">
                  <div className="w-full h-4 bg-gray-200 rounded" />
                  <div className="w-full h-3 bg-gray-200 rounded" />
                  <div className="w-full h-3 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </>
        ) : Array.isArray(stageList) && stageList.length > 0 ? (
          <>
            {stageList.map((stage: StageType) => (
              <Card
                key={stage.id}
                id={stage.id}
                title={stage.title}
                location={stage.location}
                sDate={stage.startDate}
                eDate={stage.endDate}
                posterUrl={stage.image}
              />
            ))}
            {Array.from(
              { length: (3 - (stageList.length % 3)) % 3 },
              (_, index) => (
                <div key={`empty-${index}`} className="w-[30%]" />
              ),
            )}
          </>
        ) : (
          !isLoading &&
          (stageList?.length === 0 || stageList === undefined) && (
            <p>스테이지 정보가 없습니다.</p>
          )
        )}
      </div>
      <div ref={loaderRef}>{isFetchingNextPage && <Loader />}</div>
    </div>
  )
}
