import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

import { privateApi } from '@/api/config/privateApi.ts'
import { publicApi } from '@/api/config/publicApi.ts'

import useTicketPurchaseStore from '@/store/PurchaseTicketStore.ts'

interface StageScheduleCardProps {
  date: Date
  setIsCalendar: (isCalendar: number) => void
}

interface ContentType {
  id: number
  episodeNumber: number
  time: string
  status: string
}

function StageScheduleCard(props: StageScheduleCardProps) {
  const { date, setIsCalendar } = props
  const params = useParams()
  const setSubEventIdState = useTicketPurchaseStore(
    (state) => state.setSubEventId,
  )

  const { data: stageDetail } = useQuery({
    queryKey: ['stage-detail', params.id],
    queryFn: async () => {
      let response
      if (loginUser) {
        response = await privateApi.get(`/api/event/${params.id}`)
      } else {
        response = await publicApi.get(`/api/event/${params.id}`)
      }
      return response.data
    },
  })

  const { data: loginUser } = useQuery({
    queryKey: ['user-info'],
    queryFn: async () => {
      const response = await privateApi.get('/api/user/info')
      return response.data
    },
  })

  const handleCalendar = (id: number, episodeId: number) => {
    setIsCalendar(id)
    setSubEventIdState(episodeId)
  }

  const parseDate = (time: string) => {
    const hour =
      new Date(time).getHours() < 12
        ? new Date(time).getHours()
        : new Date(time).getHours() - 12
    const min = new Date(time).getMinutes()

    const meridiem = new Date(time).getHours() < 12 ? '오전' : '오후'

    return `${meridiem} ${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`
  }
  return (
    <div className="w-full flex flex-col gap-y-3">
      {stageDetail?.eventResponseDto?.content.map((stage: ContentType) => {
        const stageDate = new Date(stage.time)
        if (
          date.getFullYear() === stageDate.getFullYear() &&
          date.getMonth() === stageDate.getMonth() &&
          date.getDate() === stageDate.getDate()
        ) {
          return (
            <div
              key={stage.id}
              className="w-full p-5 flex items-center justify-between border border-border rounded-xl"
            >
              <div className="text-xl font-bold px-2 py-3">
                {parseDate(stage.time)}
              </div>
              <div className="flex-1 gap-x-5 flex items-center justify-center">
                <span>전석 자유석</span>
                <span>{stageDetail?.eventResponseDto?.cost}원</span>
              </div>
              <button
                type="button"
                onClick={() => handleCalendar(stage.id, stage.episodeNumber)}
                className="text-white bg-primary py-1 px-7 rounded-xl"
              >
                선택
              </button>
            </div>
          )
        }

        return null
      })}
    </div>
  )
}

export default StageScheduleCard
