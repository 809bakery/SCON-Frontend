'use client'

import { useEffect, useState } from 'react'
import Calendar from 'react-calendar'

import { DUMMY_STAGE_DETAIL } from '@/constants/stage/index.ts'
import StageScheduleCard from '@/features/ticket/card/stage/index.tsx'

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

function TicketCalendar() {
  const [clickedDate, setClickedDate] = useState<Value>()
  const [stageList, setStageList] = useState<Date[]>()

  useEffect(() => {
    setStageList(
      DUMMY_STAGE_DETAIL.content.map((stage) => new Date(stage.time)),
    )

    setClickedDate(new Date(DUMMY_STAGE_DETAIL.content[0].time))
  }, [])

  const handleDisabledDate = ({ date }: { date: Date }) => {
    if (date.getDay() === null) {
      return false
    }
    if (stageList) {
      return !stageList.some((stage) => {
        const year1 = date.getFullYear()
        const month1 = date.getMonth()
        const day1 = date.getDate()

        const year2 = stage.getFullYear()
        const month2 = stage.getMonth()
        const day2 = stage.getDate()

        return year1 === year2 && month1 === month2 && day1 === day2
      })
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
      {clickedDate && <StageScheduleCard date={clickedDate as Date} />}
    </>
  )
}

export default TicketCalendar
