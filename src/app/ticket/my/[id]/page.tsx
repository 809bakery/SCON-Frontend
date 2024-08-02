'use client'

import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'

import { DAY_MAP } from '@/constants/stage/info/index.ts'
import { DUMMY_RESERVED_STAGE } from '@/constants/ticket/index.ts'

interface StageType {
  rNum: string
  title: string
  image: string | StaticImageData
  reservedDate: string
  location: string
  stageDate: string
  status: string
  cost: number
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
function TicketEnterPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stage, setStage] = useState<StageType>(DUMMY_RESERVED_STAGE[0])
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  //   useEffect(() => {
  //     // params에 해당하는 stage 상세 정보를 가져온다. 지금은 임시로 DUMMY의 0번으로
  //     setStage(DUMMY_RESERVED_STAGE[0])
  //   }, [])

  return (
    <div className="p-20 flex flex-col gap-y-10">
      <h3 className="flex items-center justify-center font-bold text-2xl">
        {stage.title}
      </h3>

      <Image
        width={440}
        height={600}
        src={stage.image}
        alt={stage.title}
        className="rounded-xl"
      />

      <div className="flex justify-between items-center gap-x-10">
        <button
          type="button"
          className="flex-1 bg-primary rounded-xl flex items-center justify-center py-3 text-white font-bold"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {isFlipped ? '포스터 확인하기' : '모바일 티켓 확인하기'}
        </button>
        <button
          type="button"
          className="flex-1 rounded-xl flex items-center justify-center py-3 text-primary font-bold border border-border"
        >
          공연 정보
        </button>
      </div>

      <div className="flex flex-col gap-y-3 items-center justify-center">
        <h3 className="font-bold text-2xl">{`${new Date(stage.stageDate).toLocaleDateString('ko-kr')} (${DAY_MAP[new Date(stage.stageDate).getDay()]}요일) ${parseDate(stage.stageDate)}`}</h3>
        <p className="flex items-center justify-center text-[#A6A6B1]">
          {stage.location}
        </p>
        <p className="flex items-center justify-center text-disabled">{`${stage.rNum} | ${stage.cost.toLocaleString('ko-kr')} | 박상우`}</p>
      </div>
    </div>
  )
}

export default TicketEnterPage
