/* eslint-disable no-nested-ternary */
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { publicApi } from '@/api/config/publicApi.ts'
import OvenCard from '@/app/(home)/search/_components/OvenCard.tsx'
import Loader from '@/components/loader/index.tsx'
import { useMinimumLoadingTime } from '@/hooks/useMinimumLoadingTime.ts'

export default function OvenList() {
  const loaderRef = useRef<HTMLDivElement>(null)
  const params = useSearchParams()
  const searchParams = params.get('keyword')

  const {
    data: ovenList,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['ovenList', searchParams],
    queryFn: async ({ pageParam = null }) => {
      const keywordParam = searchParams ? `&keyword=${searchParams}` : ''
      const cursorParam = pageParam ? `&cursor=${pageParam}` : ''

      const response = await publicApi.get(
        `/api/oven/search?${cursorParam}${keywordParam}`,
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
    <>
      {(ovenList?.length ?? 0) > 0 ? (
        ovenList?.map((oven) => (
          <OvenCard
            key={oven.id}
            ovenName={oven.ovenName}
            image={oven.image}
            recentStage={oven.recentStage}
          />
        ))
      ) : !showLoading ? (
        <div className="flex justify-center items-center h-[25rem] text-xl text-disabled font-normal">
          검색 결과가 없습니다
        </div>
      ) : (
        <Loader />
      )}
      <div ref={loaderRef}>{isFetchingNextPage && <Loader />}</div>
    </>
  )
}
