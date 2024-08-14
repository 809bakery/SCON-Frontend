import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

import { privateApi } from '@/api/config/privateApi.ts'
import { publicApi } from '@/api/config/publicApi.ts'
import Loader from '@/components/loader/index.tsx'
import { SCON_COMMENT_DATA } from '@/constants/stage/comment/index.ts'
import StageDetailCommentCard from '@/features/stage/detail/components/card/comment/index.tsx'
import StageCommentInputCard from '@/features/stage/detail/components/card/comment/input/index.tsx'
import StageDetailCard from '@/features/stage/detail/components/card/index.tsx'

interface StageTabCommentProps {
  id: string
  isReview: boolean
}

interface CommentType {
  eventBoardId: number
  nickname: string
  image: string
  content: string
  createdAt: string
  likeCount: number
  author: boolean
  like: boolean
}

function StageTabComment(props: StageTabCommentProps) {
  const { id, isReview } = props
  const { data: user } = useQuery({
    queryKey: ['user-info'],
    queryFn: async () => {
      const response = await privateApi.get('/api/user/info')
      return response.data
    },
  })

  const { data: stageDetail } = useQuery({
    queryKey: ['stage-detail', id],
    queryFn: async () => {
      let response
      if (user) {
        response = await privateApi.get(`/api/event/${id}`)
      } else {
        response = await publicApi.get(`/api/event/${id}`)
      }
      return response.data
    },
  })

  const loaderRef = useRef(null)
  const {
    data: expectedCommentList,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['list_stage_expected_comments', id, isReview],
    queryFn: async ({ pageParam = null }) => {
      const cursorParam = pageParam ? `&cursor=${pageParam}` : ''
      const categoryParam = isReview ? 'review' : 'expect'
      const response = await privateApi.get(
        `/api/board/${stageDetail?.eventResponseDto.eventId}/list?category=${categoryParam}${cursorParam}`,
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

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="w-full px-7 py-5 flex flex-col gap-y-5">
      <StageDetailCard title="@주의사항" content={SCON_COMMENT_DATA.caution} />
      <StageCommentInputCard id={id} isReview={isReview} />
      {expectedCommentList ? (
        expectedCommentList?.map((comment: CommentType) => (
          <StageDetailCommentCard
            id={id}
            boardId={comment.eventBoardId}
            isReview={isReview}
            key={comment.createdAt}
            comment={comment.content}
            createdAt={comment.createdAt}
            liked={comment.likeCount}
            user={{
              nickname: comment.nickname,
              profile: comment.image,
              isWrite: comment.author,
              isLike: comment.like,
            }}
          />
        ))
      ) : (
        <div className="w-full border border-border rounded-xl p-5 flex items-center justify-center text-disabled">
          코멘트가 존재하지 않습니다.
        </div>
      )}

      <div ref={loaderRef}>{isFetchingNextPage && <Loader />}</div>
    </div>
  )
}

export default StageTabComment
