'use client'

import Image from 'next/image'
import { useState } from 'react'

import Tab from '@/app/(home)/search/_components/Tab.tsx'
import CommunityTab from '@/app/oven/detail/[name]/_components/CommunityTab.tsx'
import FollowButton from '@/app/oven/detail/[name]/_components/FollowButton.tsx'
import InfoTab from '@/app/oven/detail/[name]/_components/InfoTab.tsx'
import { DUMMY_OVEN_DETAIL_DATA } from '@/constants/dummy.ts'
import { OvenDetailTabList } from '@/constants/search/index.ts'

type OvenDetailProps = {
  params: {
    name: string
  }
}

export default function OvenDetail({ params }: OvenDetailProps) {
  const [follow, setFollow] = useState(false)
  const [activeTab, setActiveTab] = useState<string>('info')
  const name = decodeURIComponent(params.name)
  const user = DUMMY_OVEN_DETAIL_DATA.find((data) => data.ovenName === name)
  return (
    <div className="w-full">
      <div className="w-full flex flex-col px-9 py-5">
        {/* 팔로우버튼 */}
        <div className="w-full flex justify-end">
          <FollowButton follow={follow} setFollow={setFollow} />
        </div>
        {/* 오븐 프로필 */}
        <div className="flex flex-col items-center gap-6">
          <Image
            src={user?.image ?? ''}
            alt={user?.ovenName ?? 'profile'}
            width={200}
            className="aspect-square object-cover rounded-full"
          />
          <span className="font-bold text-4xl">{user?.ovenName}</span>
        </div>
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
      {activeTab === 'info' && <InfoTab />}
      {activeTab === 'community' && <CommunityTab user={user} />}
    </div>
  )
}
