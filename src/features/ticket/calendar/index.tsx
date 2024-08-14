'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import Calendar from 'react-calendar'

import { privateApi } from '@/api/config/privateApi.ts'
import { publicApi } from '@/api/config/publicApi.ts'
import StageScheduleCard from '@/features/ticket/card/stage/index.tsx'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

interface TicketCalendarProps {
  setIsCalendar: (isCalendar: number) => void
}

interface StageType {
  id: number
  episodeNumber: number
  time: string
  reserveTime: string
  status: 'Done' | 'Ready' | 'Progress'
}

function TicketCalendar(props: TicketCalendarProps) {
  const params = useParams()
  const [clickedDate, setClickedDate] = useState<Value>()
  const { setIsCalendar } = props

  const { data: stageDetail } = useQuery({
    queryKey: ['stage-detail', params.id],
    queryFn: async () => {
      let response
      if (loginUser) {
        response = await privateApi.get(`/api/event/${params.id}`)
      } else {
        response = await publicApi.get(`/api/event/${params.id}`)
      }

      if (response.data) {
        setClickedDate(
          new Date(response.data?.eventResponseDto?.content[0]?.time),
        )
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

  const handleDisabledDate = ({ date }: { date: Date }) => {
    if (date.getDay() === null) {
      return false
    }
    if (stageDetail?.eventResponseDto?.content.length) {
      return !stageDetail?.eventResponseDto?.content.some(
        (stage: StageType) => {
          const tempTime = new Date(stage.time)

          const year1 = date.getFullYear()
          const month1 = date.getMonth()
          const day1 = date.getDate()

          const year2 = tempTime.getFullYear()
          const month2 = tempTime.getMonth()
          const day2 = tempTime.getDate()

          return year1 === year2 && month1 === month2 && day1 === day2
        },
      )
    }
    return false
  }

  return (
    <>
      <div className="w-full p-5 mb-3 border border-border rounded-xl">
        <Calendar
          locale="ko-kr"
          onChange={setClickedDate}
          tileDisabled={handleDisabledDate}
          value={clickedDate}
          next2Label={null}
          prev2Label={null}
          calendarType="hebrew"
          // eslint-disable-next-line @typescript-eslint/no-shadow
          formatDay={(locale, date) =>
            date.toLocaleDateString('en', { day: 'numeric' })
          }
          minDetail="month"
        />
      </div>
      {clickedDate && (
        <StageScheduleCard
          setIsCalendar={setIsCalendar}
          date={clickedDate as Date}
        />
      )}
    </>
  )
}

export default TicketCalendar
