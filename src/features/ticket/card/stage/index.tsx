import { DUMMY_STAGE_DETAIL } from '@/constants/stage/index.ts'

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
      {DUMMY_STAGE_DETAIL.content.map((stage: ContentType) => {
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
                <span>티켓 N개 남음</span>
              </div>
              <button
                type="button"
                onClick={() => setIsCalendar(stage.id)}
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
