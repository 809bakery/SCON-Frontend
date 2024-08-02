'use client'

import Image, { StaticImageData } from 'next/image'
import { useState } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import QRCode from 'react-qr-code'

import Timer from '@/components/timer.tsx'
import { DAY_MAP } from '@/constants/stage/info/index.ts'
import { DUMMY_RESERVED_STAGE } from '@/constants/ticket/index.ts'
import FilpSVG from '@/static/svg/ticket/ticket-flip-icon.svg'

interface StageType {
  rNum: string
  title: string
  image: string | StaticImageData
  reservedDate: string
  location: string
  stageDate: string
  status: string
  cost: number
  isEnd: boolean
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

      <div className="w-full relative">
        <Image
          src={stage.image}
          alt={stage.title}
          objectFit="cover"
          fill
          className={`!relative rounded-xl transition-all duration-300 cursor-pointer ${isFlipped && 'opacity-0'}`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        />

        <div
          className={`w-full h-full absolute top-0 p-9 flex flex-col items-center justify-center gap-y-10 border border-border  rounded-xl transition-all duration-300 ${!isFlipped && 'opacity-0'} bg-lightgray-1`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="text-warning font-bold text-2xl">
              {isFlipped && <Timer />}
            </div>
            <span>후에 새로고침됩니다.</span>
          </div>

          <QRCode value={stage.rNum} className="w-64 h-64" />
          <div className="text-xl flex flex-col items-center justify-center">
            <span>{stage.rNum}</span>
            <span>박상우</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsFlipped(!isFlipped)}
          className="p-2 z-10 rounded-tl-xl rounded-br-xl bg-[rgba(0,0,0,0.5)] flex items-center justify-center absolute top-0"
        >
          {' '}
          <FilpSVG className="w-6 h-6" />
        </button>
      </div>

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
