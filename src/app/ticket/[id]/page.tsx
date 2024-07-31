'use client'

import Image from 'next/image'

import { DUMMY_STAGE_DETAIL } from '@/constants/stage/index.ts'
import TicketCalendar from '@/features/ticket/calendar/index.tsx'

function TicketBookPage() {
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
        <TicketCalendar />
      </div>
    </div>
  )
}

export default TicketBookPage
