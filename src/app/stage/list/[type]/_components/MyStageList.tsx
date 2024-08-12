'use client'

import { useQuery } from '@tanstack/react-query'

import { privateApi } from '@/api/config/privateApi.ts'
import StageCard from '@/app/(home)/search/_components/StageCard.tsx'
import { EventType } from '@/features/event/types/Event.ts'
import { StageCategory } from '@/features/event/types/StageCategory.ts'

interface ExtendedEventType extends EventType {
  ovenName: string
  date: string
  category: StageCategory
}

export default function MyStageList() {
  const { data: myStageList } = useQuery({
    queryKey: ['list_my'],
    queryFn: async () => {
      const response = await privateApi.get(
        `/api/event/main/liked-events?category=all`,
      )
      const stageList = response.data
      const updatedStageList = stageList.map((stage: ExtendedEventType) => {
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
    <div className="w-full h-full flex flex-col gap-8 py-10 px-7">
      {myStageList?.map((stage: ExtendedEventType) => (
        <StageCard
          key={stage.id}
          id={stage.id}
          title={stage.title}
          location={stage.location}
          time={stage.date}
          category={stage.category}
          image={stage.image}
          status={stage.status}
        />
      ))}
    </div>
  )
}
