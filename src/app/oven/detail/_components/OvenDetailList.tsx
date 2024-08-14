/* eslint-disable no-nested-ternary */
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { publicApi } from '@/api/config/publicApi.ts'
import OvenDetailCard from '@/app/oven/detail/OvenDetailCard.tsx'
import Loader from '@/components/loader/index.tsx'
import { useMinimumLoadingTime } from '@/hooks/useMinimumLoadingTime.ts'

export default function OvenDetailList() {
  const loaderRef = useRef<HTMLDivElement>(null)
  const params = useSearchParams()
  const searchParams = params.get('keyword')
  const sortParams = params.get('sort')

  const {
    data: ovenDetailList,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['oven-detail-list', searchParams, sortParams],
    queryFn: async ({ pageParam = null }) => {
      const keywordParam = searchParams ? `&keyword=${searchParams}` : ''
      const sortParam = sortParams ? `&sort=${sortParams}` : ''
      const cursorParam = pageParam ? `&cursor=${pageParam}` : ''

      const response = await publicApi.get(
        `/api/oven/search?${cursorParam}${keywordParam}${sortParam}`,
      )
      return response.data
    },
    getNextPageParam: (lastPage) => {
      return lastPage.cursor === -1 ? null : lastPage.cursor
    },
    initialPageParam: null,
    select: (data) => (data?.pages ?? []).flatMap((page) => page.content),
  })
  const showLoading = useMinimumLoadingTime(isLoading, 400)

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
    <div className="w-full flex flex-wrap items-center justify-between gap-y-3 gap-x-3 px-5 py-3">
      {showLoading ? (
        <div className="w-full flex flex-wrap items-center justify-center gap-[.625rem]">
          {Array.from({ length: 12 }, (_, index) => (
            <div
              key={`skeleton-${index}`}
              className="w-[30%] flex flex-col items-center gap-3 px-[.625rem] py-3 animate-pulse"
            >
              <div
                role="presentation"
                className="w-[8.75rem] h-[8.75rem] relative rounded-xl overflow-hidden cursor-pointer bg-gray-200"
              >
                <div className="w-full h-full aspect-square bg-gray-200" />
              </div>
              <div className="w-3/4 h-4 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      ) : Array.isArray(ovenDetailList) && ovenDetailList.length > 0 ? (
        <>
          {ovenDetailList.map((oven) => (
            <OvenDetailCard
              key={oven.id}
              src={oven.image}
              name={oven.ovenName}
            />
          ))}
          {Array.from(
            { length: (3 - (ovenDetailList.length % 3)) % 3 },
            (_, index) => (
              <div key={`empty-${index}`} className="w-[30%]" />
            ),
          )}
        </>
      ) : (
        !showLoading &&
        (ovenDetailList?.length === 0 || ovenDetailList === undefined) && (
          <div className="flex justify-center items-center w-full h-[25rem] text-xl text-disabled font-normal">
            검색 결과가 없습니다
          </div>
        )
      )}
      <div ref={loaderRef}>{isFetchingNextPage && <Loader />}</div>
    </div>
  )
}
