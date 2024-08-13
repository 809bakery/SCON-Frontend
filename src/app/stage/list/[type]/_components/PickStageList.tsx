'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { publicApi } from '@/api/config/publicApi.ts'
import { RecommendEventType } from '@/features/event/types/Event.ts'

export default function PickStageList() {
  const router = useRouter()
  const { data: recommendStageList } = useQuery({
    queryKey: ['list_pick'],
    queryFn: async () => {
      const response = await publicApi.get(
        `/api/event/main/recommended-events?category=all`,
      )
      const stageList = response.data

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updatedStageList = stageList.map((stage: any) => {
        const formatStartDate = stage.startDate
          .split('T')[0]
          .replace(/-/g, '. ')
        const formatEndDate = stage.endDate.split('T')[0].replace(/-/g, '. ')

        const date =
          formatStartDate === formatEndDate
            ? formatStartDate
            : `${formatStartDate} - ${formatEndDate}`

        return {
          ...stage,
          date,
        }
      })
      return updatedStageList
    },
  })

  return (
    <div className="flex flex-col">
      <div className="relative">
        <Image
          src="/images/stage-pick-thumbnail.jpg"
          width={600}
          height={280}
          alt="thumbnail"
          className="object-cover h-[17.5rem]"
        />
        <div className="absolute bottom-2 left-4 flex flex-col">
          <span className="text-2xl font-bold leading-8 text-white">
            강렬하게 마음을 두드리는 멜로디!
          </span>
          <span className="text-3xl font-bold leading-10 text-white">
            스콘의 추천 스테이지 10개 ✨
          </span>
        </div>
      </div>
      <div className="py-10 px-7 flex flex-col gap-5">
        {recommendStageList?.map((stage: RecommendEventType) => (
          <div
            role="presentation"
            key={stage.id}
            onClick={() => router.push(`/stage/detail/${stage?.id}`)}
            className="w-full rounded-xl border border-border cursor-pointer"
          >
            <Image
              src={stage?.image}
              width={600}
              height={220}
              alt="thumbnail"
              className="object-cover rounded-t-xl w-full h-[13.75rem]"
            />
            <div className="flex flex-col gap-3 px-5 py-4">
              <div className="flex flex-col">
                <span className="text-base font-medium leading-6 text-disabled">
                  {stage.location}
                </span>
                <span className="text-2xl font-bold leading-8">
                  {stage.title}
                </span>
              </div>
              <span className="text-base font-medium leading-6 text-disabled">
                {stage?.ovenName} | {stage?.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
