import { useQuery } from '@tanstack/react-query'

import { publicApi } from '@/api/config/publicApi.ts'
import StageCard from '@/app/(home)/search/_components/StageCard.tsx'
import InfoField from '@/app/oven/detail/[name]/_components/InfoField.tsx'
import {
  StageCategory,
  StageCategoryMap,
} from '@/features/event/types/StageCategory.ts'

export default function InfoTab({ id }: { id: string }) {
  const { data: ovenDetail } = useQuery({
    queryKey: ['oven-detail', id],
    queryFn: async () => {
      const response = await publicApi.get(`/api/oven/${id}`)
      return response.data
    },
  })

  const { data: ovenStageList } = useQuery({
    queryKey: ['oven-stage-list', id],
    queryFn: async () => {
      const response = await publicApi.get(`/api/event/oven/${id}`)
      return response.data
    },
  })

  function mapAndFormatWishCategory(wishCategory: string[]) {
    const formattedCategories = wishCategory?.map(
      (category) =>
        StageCategoryMap[category.toLowerCase() as StageCategory] || '',
    )
    return formattedCategories?.join(', ')
  }

  function formatWishCategory(wishCategory: string[]) {
    if (Array.isArray(wishCategory) && wishCategory?.length === 0) {
      return '선택한 스테이지 분야가 없습니다.'
    }
    return mapAndFormatWishCategory(wishCategory)
  }

  return (
    <div className="w-full px-7 py-9 flex flex-col items-center">
      {/* 자기소개 */}
      <div
        className={`${ovenDetail?.ovenDetail ? 'w-[30rem]' : 'w-[28.75rem] text-disabled'} border border-border rounded-xl p-5 text-center text-base font-medium`}
      >
        <span>
          {ovenDetail &&
            (ovenDetail?.ovenDetail || '아직 작성된 자기소개가 없습니다.')}
        </span>
      </div>
      {/* 기본정보 */}
      <div className="w-full flex flex-col gap-7 mt-8">
        <h2 className="font-bold leading-8 text-2xl">기본정보</h2>
        <div className="w-full flex flex-col border border-border rounded-xl px-6 py-3 text-base font-medium leading-8">
          <InfoField label="팔로우" data={ovenDetail?.followCount} />
          <InfoField label="오븐 개시일" data={ovenDetail?.createdAt} />
          <InfoField
            label="스테이지 분야"
            data={formatWishCategory(ovenDetail?.wishCategory)}
          />
        </div>
      </div>
      {/* 스테이지 */}
      <div className="w-full flex flex-col gap-7 mt-10">
        <h2 className="font-bold leading-8 text-2xl">스테이지</h2>
        <div className="w-full h-full flex flex-col gap-8">
          {/* 등록한 스테이지가 없는 경우 */}
          {ovenStageList?.length === 0 && (
            <div className="w-full h-[16.25rem] rounded-xl border-0.5 border-border flex items-center justify-center text-base font-medium text-disabled">
              등록된 스테이지가 없습니다.
            </div>
          )}

          {ovenStageList &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ovenStageList?.map((stage: any) => (
              <StageCard
                key={stage.id}
                id={stage.id}
                title={stage.title}
                location={stage.location}
                time={stage.time}
                image={stage.image}
                category={stage.category}
                status={stage.status}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
