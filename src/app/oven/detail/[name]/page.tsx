'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { privateApi } from '@/api/config/privateApi.ts'
import { publicApi } from '@/api/config/publicApi.ts'
import Tab from '@/app/(home)/search/_components/Tab.tsx'
import CommunityTab from '@/app/oven/detail/[name]/_components/CommunityTab.tsx'
import FollowButton from '@/app/oven/detail/[name]/_components/FollowButton.tsx'
import InfoTab from '@/app/oven/detail/[name]/_components/InfoTab.tsx'
import { OvenDetailTabList } from '@/constants/search/index.ts'
import { useMinimumLoadingTime } from '@/hooks/useMinimumLoadingTime.ts'
import { getAccessToken } from '@/utils/cookie/index.ts'

export default function OvenDetail() {
  const urlParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<string>('info')
  const ovenId = urlParams.get('id')

  const {
    data: ovenDatil,
    refetch: refetchOvenDetail,
    isLoading,
  } = useQuery({
    queryKey: ['oven-detail', ovenId],
    queryFn: async () => {
      const response = await publicApi.get(`/api/oven/${ovenId}`)
      return response.data
    },
    enabled: !!ovenId,
  })

  const { data: isFollow, refetch: refetchFollow } = useQuery({
    queryKey: ['follow'],
    queryFn: async () => {
      try {
        const response = await privateApi.get(`/api/follow`)
        if (response.status === 200) {
          const followList = response.data
          // eslint-disable-next-line @typescript-eslint/no-explicit-any, eqeqeq
          return followList.some((follow: any) => follow.ovenId == ovenId)
        }
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error)
      }
      return false
    },
    enabled: !!getAccessToken(),
  })

  const showLoading = useMinimumLoadingTime(isLoading, 400)

  return (
    <div className="w-full">
      <div className="w-full flex flex-col px-9 py-5">
        {/* 팔로우버튼 */}
        <div className="w-full flex justify-end">
          {getAccessToken() && (
            <FollowButton
              id={ovenDatil?.ovenId}
              ovenName={ovenDatil?.ovenName}
              isFollow={isFollow}
              refetchFollow={refetchFollow}
              refetchOvenDetail={refetchOvenDetail}
            />
          )}
        </div>
        {/* 오븐 프로필 */}
        {showLoading ? (
          <div className="flex flex-col items-center gap-6">
            <div className="w-[12.5rem] h-[12.5rem] bg-gray-300 rounded-full animate-pulse" />
            <div className="h-10 w-48 bg-gray-300 rounded animate-pulse" />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <Image
              src={ovenDatil?.image ?? ''}
              alt={ovenDatil?.ovenName ?? 'profile'}
              width={200}
              height={200}
              className="aspect-square object-cover rounded-full"
            />
            <span className="font-bold text-4xl">{ovenDatil?.ovenName}</span>
          </div>
        )}
      </div>
      <div className="w-full flex">
        {/* 탭 분류 */}
        {OvenDetailTabList.map((tab) => (
          <Tab
            key={tab.id}
            name={tab.name}
            label={tab.label}
            tabCount={OvenDetailTabList.length}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ))}
      </div>
      {/* 탭 별 컨텐츠 */}
      {activeTab === 'info' && <InfoTab id={ovenDatil?.ovenId} />}
      {activeTab === 'community' && <CommunityTab id={ovenDatil?.ovenId} />}
    </div>
  )
}
