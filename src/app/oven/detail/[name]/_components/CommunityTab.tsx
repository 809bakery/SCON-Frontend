/* eslint-disable no-nested-ternary */

'use client'

import { useQuery } from '@tanstack/react-query'

import { publicApi } from '@/api/config/publicApi.ts'
import CommunityContentCard from '@/app/oven/detail/[name]/_components/CommunityContentCard.tsx'
import Loader from '@/components/loader/index.tsx'
import { useMinimumLoadingTime } from '@/hooks/useMinimumLoadingTime.ts'

export default function CommunityTab({ id }: { id: string }) {
  const {
    data: communityContent,
    refetch: refetchOvenCommunity,
    isLoading,
  } = useQuery({
    queryKey: ['list_oven_community', id],
    queryFn: async () => {
      const response = await publicApi.get(`/api/oven/community?ovenId=${id}`)
      return response.data
    },
  })

  const showLoading = useMinimumLoadingTime(isLoading, 400)

  return (
    <div className="flex flex-col gap-3 py-14 px-7">
      {communityContent?.content.length !== 0 ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        communityContent?.content?.map((data: any) => (
          <CommunityContentCard
            key={data.ovenCommunityId}
            communityId={data.ovenCommunityId}
            content={data.content}
            image={data.image || ''}
            bestCount={data.bestCount || 0}
            expectCount={data.expectCount || 0}
            congratulationCount={data.congratulationCount || 0}
            tearCount={data.tearCount || 0}
            cheerCount={data.cheerCount || 0}
            createdAt={data.createdAt}
            nickname={data.nickname}
            profile={data.profile}
            reaction={data.reaction}
            refetchOvenCommunity={refetchOvenCommunity}
          />
        ))
      ) : showLoading ? (
        <Loader />
      ) : (
        <div className="flex justify-center items-center w-full h-[25rem] text-xl text-disabled font-normal">
          등록된 커뮤니티 글이 없습니다.
        </div>
      )}
    </div>
  )
}
