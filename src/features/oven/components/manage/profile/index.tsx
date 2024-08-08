import Image from 'next/image'

import { DUMMY_OVEN_INFO } from '@/constants/oven/manage/index.ts'
import { DUMMY_OVEN_PROFILE } from '@/constants/oven/manage/profile/index.ts'
import OvenProfileCard from '@/features/oven/components/manage/profile/card/index.tsx'

function OvenProfile() {
  return (
    <div className="px-8 py-11 flex flex-col gap-y-8">
      <div className="mx-8 p-5 border rounded-xl border-border">
        {DUMMY_OVEN_INFO.ovenDetail}
      </div>

      <h3 className="text-2xl font-bold">기본정보</h3>
      <div className="py-2 border border-border rounded-xl flex flex-col px-6">
        <p className="p-2 flex items-center">
          <span className="w-[6.25rem]">팔로우</span>
          <span className="flex-1">{DUMMY_OVEN_INFO.followCount}</span>
        </p>
        <p className="p-2 flex items-center">
          <span className="w-[6.25rem]">오븐 개시일</span>
          <span className="flex-1">
            {new Date(DUMMY_OVEN_INFO.createdAt).toLocaleDateString('ko-kr')}
          </span>
        </p>
        <p className="p-2 flex items-center">
          <span className="w-[6.25rem]">스테이지 분야</span>
          <span className="flex-1">{DUMMY_OVEN_INFO.wishCategory}</span>
        </p>
      </div>

      <h3 className="text-2xl font-bold">스테이지</h3>
      <div className="flex flex-col gap-y-8">
        {DUMMY_OVEN_PROFILE.map((item) => (
          <OvenProfileCard key={item.createdAt}>
            <Image
              src={item.image}
              alt={item.title}
              className="w-40 object-cover rounded-xl"
            />

            <div className="flex-1 flex flex-col">
              {/* tags */}
              <div className="pb-4 text-sm flex gap-x-3 items-center">
                {/* 예매중 vs 예매마감 */}
                {item.status === 'Progress' && (
                  <div className="bg-primary rounded-xl py-1 px-2">예매중</div>
                )}
                {item.status === 'Done' && (
                  <div className="border border-disabled rounded-xl py-1 px-2">
                    예매마감
                  </div>
                )}
                {/* 최신등록  -> 30일 이내 */}
                {new Date().getTime() - new Date(item.createdAt).getTime() <
                  1000 * 60 * 60 * 24 * 30 && (
                  <div className="border border-primary rounded-xl py-1 px-2">
                    최신등록
                  </div>
                )}
                {/* 공연임박 7일 이내 */}
                {new Date(item.startDate).getTime() - new Date().getTime() >
                  0 &&
                  new Date(item.startDate).getTime() - new Date().getTime() <
                    1000 * 60 * 60 * 24 * 7 && (
                    <div className="border border-primary rounded-xl py-1 px-2">
                      공연임박
                    </div>
                  )}
              </div>

              <div>
                <h3 className="pb-4 text-2xl font-bold">{item.title}</h3>
                <p className="py-2 font-bold text-disabled">{item.location}</p>
                <p className="text-xs text-disabled">
                  {new Date(item.startDate).toLocaleDateString('ko-kr')}
                </p>
              </div>
            </div>
          </OvenProfileCard>
        ))}
      </div>
    </div>
  )
}

export default OvenProfile
