import { useInfiniteQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { publicApi } from '@/api/config/publicApi.ts'
import StageCard from '@/app/(home)/search/_components/StageCard.tsx'
import Loader from '@/components/loader/index.tsx'

export default function StageList() {
  const loaderRef = useRef<HTMLDivElement>(null)
  const params = useSearchParams()
  const searchParams = params.get('keyword')
  const sortParams = params.get('sort')

  const {
    data: stageList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['stageList', searchParams, sortParams],
    queryFn: async ({ pageParam = null }) => {
      const keywordParam = searchParams ? `&keyword=${searchParams}` : ''
      const sortParam = sortParams ? `&sort=${sortParams}` : ''
      const cursorParam = pageParam ? `&cursor=${pageParam}` : ''

      const response = await publicApi.get(
        `/api/event/search/inf?${cursorParam}${keywordParam}${sortParam}`,
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
    <>
      {(stageList?.length ?? 0) ? (
        stageList?.map((stage) => (
          <StageCard
            key={stage.id}
            title={stage.title}
            location={stage.location}
            time={stage.time}
            image={stage.image}
            category={stage.category}
            id={stage.id}
            status={stage.status}
          />
        ))
      ) : (
        <div className="flex justify-center items-center h-[25rem] text-xl text-disabled font-normal">
          검색 결과가 없습니다
        </div>
      )}
      <div ref={loaderRef}>{isFetchingNextPage && <Loader />}</div>
    </>
  )
}
