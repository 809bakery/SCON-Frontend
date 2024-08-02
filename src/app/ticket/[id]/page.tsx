'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { DUMMY_STAGE_DETAIL } from '@/constants/stage/index.ts'
import TicketCalendar from '@/features/ticket/calendar/index.tsx'
import TicketPurchase from '@/features/ticket/purchase/index.tsx'

interface ContentType {
  id: number
  episodeNumber: number
  time: string
  status: string
}

function TicketBookPage() {
  const [isCalendar, setIsCalendar] = useState<number | undefined>(undefined)
  const [stage, setStage] = useState<ContentType>()

  useEffect(() => {
    setStage(DUMMY_STAGE_DETAIL.content.find((item) => item.id === isCalendar))
  }, [isCalendar])

  return (
    <div className="w-full pb-[12.5rem]">
      <div className="min-h-[15rem] relative">
        <Image
          src={DUMMY_STAGE_DETAIL.image}
          alt="background stage poster"
          layout="fill"
          objectFit="cover"
          className="opacity-30 absolute top-0"
        />

        <div className="w-full px-7 py-9 gap-y-2 flex flex-col">
          <div className="p-3 text-2xl font-bold">{`${DUMMY_STAGE_DETAIL.title} ${DUMMY_STAGE_DETAIL.detail && `- ${DUMMY_STAGE_DETAIL.detail}`}`}</div>

          <div className="p-3 flex flex-col">
            <span>{DUMMY_STAGE_DETAIL.location}</span>
            <span>
              {`${new Date(
                DUMMY_STAGE_DETAIL.content[0].time,
              ).toLocaleDateString('ko-kr')} - ${new Date(
                DUMMY_STAGE_DETAIL.content[
                  DUMMY_STAGE_DETAIL.content.length - 1
                ].time,
              ).toLocaleDateString('ko-kr')}`}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full px-7 pt-3">
        {isCalendar ? (
          stage && (
            <TicketPurchase stage={stage} setIsCalendar={setIsCalendar} />
          )
        ) : (
          <TicketCalendar setIsCalendar={setIsCalendar} />
        )}
      </div>
    </div>
  )
}

export default TicketBookPage
